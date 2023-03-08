import { Routes, Route } from 'react-router-dom';

import RestrictedRoute from '../components/RestrictedRoute';
import { useAuth } from '../contexts/Auth';

import LoggedInPage from './LoggedInPage';
import LogInPage from './LogInPage';
import SignUpPage from './SignupPage';

export default () => {
	const { isLoggedIn } = useAuth();

	return (
		<Routes>
			<Route
				path="/sign-in"
				element={
					<RestrictedRoute condition={!isLoggedIn} redirectPath="/">
						<LogInPage />
					</RestrictedRoute>
				}
			/>
			<Route
				path="/sign-up"
				element={
					<RestrictedRoute condition={!isLoggedIn} redirectPath="/">
						<SignUpPage />
					</RestrictedRoute>
				}
			/>
			<Route
				path="/"
				element={
					<RestrictedRoute condition={isLoggedIn} redirectPath="/sign-in">
						<LoggedInPage />
					</RestrictedRoute>
				}
			/>
		</Routes>
	);
};
