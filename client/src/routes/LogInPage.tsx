import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import EmailSent from '../components/EmailSent';
import LoginForm from '../components/LoginForm';
import TokenValidation from '../components/TokenValidation';
import { useAuth } from '../contexts/Auth';

type Status = 'form' | 'sent';

export default () => {
	const [search] = useSearchParams();
	const [status, setStatus] = useState<Status>('form');
	const [loginMessage, setLoginMessage] = useState<string | undefined>(
		undefined,
	);

	const { signIn, answerCustomChallenge } = useAuth();

	const token = search.get('token');

	if (token) {
		return (
			<TokenValidation token={token} validateToken={answerCustomChallenge} />
		);
	}

	const handleSubmit = async (email: string) => {
		const message = await signIn(email);
		setLoginMessage(message);
		setStatus('sent');
	};

	switch (status) {
		case 'sent':
			return <EmailSent message={loginMessage} />;
		case 'form':
			return <LoginForm onSubmit={handleSubmit} />;
		default:
			return null;
	}
};
