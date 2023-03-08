import { PostAuthenticationTriggerHandler } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognito = new CognitoIdentityServiceProvider();

export const handler: PostAuthenticationTriggerHandler = async event => {
	console.debug(JSON.stringify(event));
	if (event.request.userAttributes?.email_verified !== 'true') {
		const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
			{
				UserPoolId: event.userPoolId,
				UserAttributes: [
					{
						Name: 'email_verified',
						Value: 'true',
					},
				],
				Username: event.userName,
			};
		await cognito.adminUpdateUserAttributes(params).promise();
	}
	return event;
};
