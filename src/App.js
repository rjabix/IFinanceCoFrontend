import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {BackendApiUrlProvider} from "./Contexts";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/welcome/WelcomePage";
import MainDashboard from "./pages/main/MainDashboard";
import LoginPage from "./pages/login/LoginPage";

function App() {
    return (
        <BackendApiUrlProvider
            backendUrl={process.env.REACT_APP_BACKEND_URL || require('../package.json').backendUrl}>

        <Router>
            <Routes>

                    <Route path={'/'} element={<WelcomePage />}/>
                    <Route path={'/login'} element={<LoginPage />}/>

                    <Route element={<ProtectedRoute />}>
                        <Route path={'/dashboard'} element={<MainDashboard />}/>
                    </Route>

                    {/*Default route goes to main*/}
                    <Route path={'*'} element={<Navigate to="/" />}/>
            </Routes>
        </Router>
        </BackendApiUrlProvider>
    );
}

export default App;
