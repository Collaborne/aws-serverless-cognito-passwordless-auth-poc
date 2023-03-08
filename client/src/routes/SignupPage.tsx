import { useState } from 'react';

import EmailSent from '../components/EmailSent';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../contexts/Auth';

type Status = 'form' | 'sent';

export default () => {
	const [status, setStatus] = useState<Status>('form');
	const [loginMessage, setLoginMessage] = useState<string | undefined>(
		undefined,
	);

	const { signUp } = useAuth();

	const handleSubmit = async (email: string) => {
		const message = await signUp(email);
		setLoginMessage(message);
		setStatus('sent');
	};

	switch (status) {
		case 'sent':
			return <EmailSent message={loginMessage} />;
		case 'form':
			return <SignupForm onSubmit={handleSubmit} />;
		default:
			return null;
	}
};
