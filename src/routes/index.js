import { useCallback } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux'

import ProtectedRoutes from './protected';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import { Login, SignUp, ForgotPassword, ResetPassPassword } from '../screens';

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

                <PublicRoute
                    path="/forgot"
                    isAuthenticated={isAuthenticated}
                >
                    <ForgotPassword />
                </PublicRoute>

                <PublicRoute
                    path="/reset"
                    isAuthenticated={isAuthenticated}
                >
                    <ResetPassPassword />
                </PublicRoute>

                <PrivateRoute
                    path="/"
                    isAuthenticated={isAuthenticated}
                >
                    <ProtectedRoutes />
                </PrivateRoute>
            </Switch>
    );
};

export default Routes;