import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/Auth';

export default () => {
	const [session, setSession] = useState<unknown>(null);

	const { signOut, getUserSession, isLoggedIn } = useAuth();

	const handleSignOut = async () => await signOut();

	useEffect(() => {
		setSession(getUserSession());
	}, [getUserSession, isLoggedIn]);

	return (
		<>
			<h1>Hi, user!</h1>

			<p>You're now signed in. Awesome, right?</p>
			<button onClick={handleSignOut}>Sign out</button>

			<p>Session object:</p>
			<div style={{ maxWidth: '700px', overflow: 'auto' }}>
				<pre>{JSON.stringify(session, null, 2)}</pre>
			</div>
		</>
	);
};
