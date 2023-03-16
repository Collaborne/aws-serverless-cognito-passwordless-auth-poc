import { Navigate } from 'react-router-dom';

interface RestrictRouteProps {
	condition: boolean;
	children: JSX.Element;
	redirectPath: string;
}

export default ({ condition, children, redirectPath }: RestrictRouteProps) => {
	if (!condition) {
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};
