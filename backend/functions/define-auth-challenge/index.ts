import {
	DefineAuthChallengeTriggerEvent,
	DefineAuthChallengeTriggerHandler,
} from 'aws-lambda';

const isNotCustomChallenge = (event: DefineAuthChallengeTriggerEvent) => {
	return (
		event.request.session &&
		event.request.session.find(
			attempt => attempt.challengeName !== 'CUSTOM_CHALLENGE',
		)
	);
};

const isSuccessfullyAnswered = (event: DefineAuthChallengeTriggerEvent) => {
	if (!event.request.session?.length) {
		return false;
	}
	const session = event.request.session.slice(-1)[0];
	return (
		session.challengeName === 'CUSTOM_CHALLENGE' &&
		session.challengeResult === true
	);
};

/**
 * A blog post showing use of `DefineAuthChallengeTriggerHandler`
 */
export const handler: DefineAuthChallengeTriggerHandler = async event => {
	console.debug(JSON.stringify(event));
	if (isNotCustomChallenge(event)) {
		// We only accept custom challenges; fail auth
		event.response.issueTokens = false;
		event.response.failAuthentication = true;
	} else if (isSuccessfullyAnswered(event)) {
		// The user provided the right answer; succeed auth
		event.response.issueTokens = true;
		event.response.failAuthentication = false;
	} else {
		// The user did not provide a correct answer yet; present challenge
		event.response.issueTokens = false;
		event.response.failAuthentication = false;
		event.response.challengeName = 'CUSTOM_CHALLENGE';
	}

	return event;
};
