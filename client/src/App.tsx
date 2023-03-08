
import Routes from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { BrowserRouter } from "react-router-dom";

export default () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </AuthProvider>
    );
};
