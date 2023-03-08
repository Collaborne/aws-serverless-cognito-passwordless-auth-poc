import AuthForm from './AuthForm';

export default ({
	onSubmit,
}: {
	onSubmit: (email: string) => Promise<void>;
}) => {
	return (
		<AuthForm heading="Sign in" onSubmit={onSubmit} buttonText="Sign in" />
	);
};
