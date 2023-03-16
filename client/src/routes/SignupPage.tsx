import AuthForm from '../components/AuthForm';
import { useAuth } from '../contexts/Auth';

export default () => {
	const { signUp } = useAuth();

	return <AuthForm heading="Sign up" onSubmit={signUp} buttonText="Sign up" />;
};
