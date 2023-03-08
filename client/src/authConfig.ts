import { Auth } from '@aws-amplify/auth';

const { VITE_REGION, VITE_USER_POOL_ID, VITE_USER_POOL_WEB_CLIENT_ID } =
	import.meta.env;

export const config = {
	Auth: {
		region: VITE_REGION,
		userPoolId: VITE_USER_POOL_ID,
		userPoolWebClientId: VITE_USER_POOL_WEB_CLIENT_ID,
	},
};

Auth.configure(config);
