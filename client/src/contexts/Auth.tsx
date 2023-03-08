import { Auth } from 'aws-amplify';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

const { VITE_LOGIN_API_ENDPOINT } = import.meta.env;

interface AuthContextParams {
	isLoggedIn: boolean;
	signIn: (email: string) => Promise<string>;
	signUp: (email: string) => Promise<string>;
	answerCustomChallenge: (email: string, token: string) => Promise<void>;
	signOut: typeof Auth.signOut;
	getUserSession: () => unknown;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextParams>({
	isLoggedIn: false,
	signIn: () => Promise.resolve(''),
	answerCustomChallenge: () => Promise.resolve(),
	signOut: () => Promise.resolve(),
	signUp: () => Promise.resolve(''),
	getUserSession: () => null,
});

const AuthProvider = (props: AuthProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const userSessionRef = useRef<unknown>(null);

	const isAuthenticated = useCallback(async () => {
		try {
			const user = await Auth.currentSession();
			userSessionRef.current = user;
			setIsLoggedIn(true);
		} catch (error) {
			setIsLoggedIn(false);
		}
	}, []);

	const getUserSession = useCallback(() => userSessionRef.current, []);

	useEffect(() => {
		void isAuthenticated();
	}, [isAuthenticated]);

	const signIn = useCallback(async (email: string): Promise<string> => {
		const response = await fetch(VITE_LOGIN_API_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify({ email }),
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.errorDetail);
		}

		return responseData.message;
	}, []);

	const signUp = useCallback(
		async (email: string) => {
			await Auth.signUp({
				username: email,
				password: `password${Math.random().toString().slice(0, 8)}`,
			});

			return signIn(email);
		},
		[signIn],
	);

	const answerCustomChallenge = useCallback(
		async (email: string, token: string) => {
			const cognitoUser = await Auth.signIn(email);
			await Auth.sendCustomChallengeAnswer(cognitoUser, token);
			await isAuthenticated();
		},
		[isAuthenticated],
	);

	const signOut = useCallback(async () => {
		await Auth.signOut();
		setIsLoggedIn(false);
		userSessionRef.current = null;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				signIn,
				signUp,
				answerCustomChallenge,
				signOut,
				getUserSession,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
