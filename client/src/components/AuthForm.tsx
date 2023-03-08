import {
	Flex,
	Heading,
	TextField,
	Button,
	useTheme,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import '@aws-amplify/ui-react/styles.css';

interface AuthFormProps {
	heading: string;
	onSubmit: (email: string) => Promise<void>;
	buttonText: string;
}

export default ({ onSubmit, heading, buttonText }: AuthFormProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);
	const [email, setEmail] = useState('');

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			setLoading(true);
			await onSubmit(email);
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setError(null);
	};

	const { tokens } = useTheme();

	return (
		<Flex
			as="form"
			direction="column"
			gap={tokens.space.medium}
			style={{ width: '400px' }}
		>
			<>
				<Heading level={3}>{heading}</Heading>
				<TextField
					label="Email"
					name="email"
					autoComplete="email"
					required
					type="email"
					placeholder="sudhons@dev.com"
					value={email}
					onChange={handleChange}
					disabled={loading}
				/>
				<Button type="submit" onClick={handleSubmit} disabled={loading}>
					{buttonText}
				</Button>
				{error && (
					<pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
				)}
			</>
		</Flex>
	);
};
