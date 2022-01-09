import { useCallback } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux'

import ProtectedRoutes from './protected';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import { Login, SignUp } from '../screens';

const Routes = () => {
    const accessToken = useSelector((state) => state?.persistedSlice?.accessToken)

    const isAuthenticated = useCallback(() => {
        if (accessToken) {
            return true;
        } else {
            return false;
        }
    }, [accessToken])

    return (
        <Router>
            <Switch>
                <PublicRoute
                    path="/login"
                    isAuthenticated={isAuthenticated}
                >
                    <Login />
                </PublicRoute>

                <PublicRoute
                    path="/register"
                    isAuthenticated={isAuthenticated}
                >
                    <SignUp />
                </PublicRoute>

                <PrivateRoute
                    path="/"
                    isAuthenticated={isAuthenticated}
                >
                    <ProtectedRoutes />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default Routes;