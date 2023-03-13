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

interface AuthContextParams {
	isLoggedIn: boolean;
	signIn: (email: string) => Promise<void>;
	signUp: (email: string) => Promise<void>;
	signOut: typeof Auth.signOut;
	getUserSession: () => unknown;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextParams>({
	isLoggedIn: false,
	signIn: () => Promise.resolve(),
	signOut: () => Promise.resolve(),
	signUp: () => Promise.resolve(),
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

	const signIn = useCallback(
		async (email: string) => {
			await Auth.signIn(email, email);

			await isAuthenticated();
		},
		[isAuthenticated],
	);

	const signUp = useCallback(
		async (email: string) => {
			await Auth.signUp({
				username: email,
				password: email,
			});
			await signIn(email);
		},
		[signIn],
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
