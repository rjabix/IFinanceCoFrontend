import React, { useEffect, useState } from 'react';
import { Outlet, Navigate} from 'react-router-dom';
import {checkAuth} from "../utils/BackendHandler";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {

        const check = async () => {
          return (await checkAuth())
        };

        setIsAuthenticated( check());
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or any other loading component
    }

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login" />
    );
};

export default ProtectedRoute;