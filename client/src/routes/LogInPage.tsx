import AuthForm from '../components/AuthForm';
import { useAuth } from '../contexts/Auth';

export default () => {
	const { signIn } = useAuth();

	return <AuthForm heading="Sign in" onSubmit={signIn} buttonText="Sign in" />;
};
