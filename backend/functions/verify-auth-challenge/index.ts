import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

/**
 * A blog post showing use of `VerifyAuthChallengeResponseTriggerHandler`
 */
export const handler: VerifyAuthChallengeResponseTriggerHandler =
	async event => {
		console.debug(JSON.stringify(event));
		const authToken = event.request.privateChallengeParameters.challenge;

		try {
			// Verifies the validity of the token (e.g expiring)
			jwt.verify(authToken, TOKEN_SECRET as string);
			event.response.answerCorrect =
				event.request.challengeAnswer === authToken;
		} catch (err) {
			event.response.answerCorrect = false;
		}

		return event;
	};
