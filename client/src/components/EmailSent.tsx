const DEFAULT_MESSAGE = 'A login link has been sent to your email';

export default ({ message = DEFAULT_MESSAGE }: { message?: string }) => {
	return <h2>{message}</h2>;
};
