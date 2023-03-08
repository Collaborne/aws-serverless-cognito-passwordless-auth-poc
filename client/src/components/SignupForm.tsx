import AuthForm from './AuthForm';

export default ({
	onSubmit,
}: {
	onSubmit: (email: string) => Promise<void>;
}) => {
	return (
		<AuthForm heading="Sign up" onSubmit={onSubmit} buttonText="Sign up" />
	);
};
