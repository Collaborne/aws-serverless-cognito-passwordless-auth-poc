import jwtDecode from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TokenValidationProps {
	token: string;
	validateToken: (email: string, token: string) => Promise<void>;
}

export default ({ token, validateToken }: TokenValidationProps) => {
	const [error, setError] = useState<unknown>(null);

	const navigate = useNavigate();

	const finishSignIn = useCallback(
		async (token: string) => {
			try {
				const { email } = jwtDecode<{ email: string }>(token);
				// TODO: validate that the token hasn't expired; ("exp" in decoded token)

				if (!email) {
					return navigate('/sign-in');
				}

				await validateToken(email, token);
				navigate('/');
			} catch (error) {
				setError(error);
			}
		},
		[navigate, validateToken],
	);

	useEffect(() => {
		void finishSignIn(token);
	}, [token, finishSignIn]);

	if (error) {
		return (
			<>
				<h1>Link is invalid or expired</h1>
				<pre>{JSON.stringify(error, null, 2)}</pre>
			</>
		);
	}

	return <p>Signing you in...</p>;
};
