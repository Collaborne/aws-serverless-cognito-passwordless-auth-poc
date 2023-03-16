import { PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async event => {
	console.debug(JSON.stringify(event));
	event.response.autoConfirmUser = true;

	return event;
};
