import { SES, CognitoIdentityServiceProvider } from 'aws-sdk';
import * as jwt from 'jsonwebtoken';
const cognito = new CognitoIdentityServiceProvider();

const { SES_FROM_ADDRESS, USER_POOL_ID, SIGN_IN_URL, TOKEN_SECRET } =
	process.env;

const ses = new SES();

const generateToken = (email: string) => {
	// Expires token in 15mins
	const token = jwt.sign({ email }, TOKEN_SECRET as string, {
		expiresIn: '15m',
	});

	return token;
};

async function sendEmail(emailAddress: string, loginLink: string) {
	const params: SES.SendEmailRequest = {
		Destination: { ToAddresses: [emailAddress] },
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: `<html><body>
                            <p>This is your login link:</p>
                            <a target="_blank" rel="noopener noreferrer" href="${loginLink}">Click to sign-in</a>
                           </body></html>`,
				},
				Text: {
					Charset: 'UTF-8',
					Data: `Here's your link (copy and paste in the browser): ${loginLink}`,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Your login link',
			},
		},
		Source: SES_FROM_ADDRESS as string,
	};
	await ses.sendEmail(params).promise();
}

export const handler = async (event: { body: string }) => {
	try {
		const { email } = JSON.parse(event.body || '{}');
		if (!email) throw Error('Email is required');

		// Store challenge as a custom attribute in Cognito
		const authChallenge = generateToken(email);
		await cognito
			.adminUpdateUserAttributes({
				UserAttributes: [
					{
						Name: 'custom:authChallenge',
						Value: authChallenge,
					},
				],
				UserPoolId: USER_POOL_ID as string,
				Username: email,
			})
			.promise();

		const tokenValidationUrl = new URL(SIGN_IN_URL as string);
		const searchParams = new URLSearchParams({ token: authChallenge });
		tokenValidationUrl.search = searchParams.toString();
		await sendEmail(email, tokenValidationUrl.toString());

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				message: `A link has been sent to ${email}`,
			}),
		};
	} catch (e) {
		return {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				error: 'Sorry, we could not find your account.',
				message: "Couldn't process the request",
				errorDetail: (e as Error).message,
			}),
		};
	}
};
