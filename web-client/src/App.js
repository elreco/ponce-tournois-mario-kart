import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import history from './utils/history';
import { AuthProvider } from './utils/useAuth';
import Header from './components/utils/Header';
import AdminWrapper from './components/admin/AdminWrapper';
import AdminRoute from './components/auth/AdminRoute';
import { SocketProvider } from './utils/useSocket';
import { TracksProvider } from './utils/useTracks';
import PonceParticipations from './components/participations/PonceParticipations';
import UserParticipations from './components/participations/UserParticipations';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './components/utils/Home';
import PonceRaces from './components/races/PonceRaces';
import UserRaces from './components/races/UserRaces';
import Statistics from './components/statistics/Statistics';
import Profile from './components/user/Profile';

function App() {
    return (
        <Router history={history}>
            <SocketProvider>
                <TracksProvider>
                    <AuthProvider>
                        <Header />
                        <Switch>
                            <Route exact path="/signup" component={Signup} />

                            <Route exact path="/" component={Home} />
                            <Route
                                exact
                                path="/history"
                                component={PonceParticipations}
                            />
                            <Route exact path="/races" component={PonceRaces} />
                            <Route
                                exact
                                path="/statistics"
                                component={Statistics}
                            />

                            <PrivateRoute
                                exact
                                path="/profile"
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path="/my-history"
                                component={UserParticipations}
                            />
                            <PrivateRoute
                                exact
                                path="/my-races"
                                component={UserRaces}
                            />

                            <AdminRoute
                                path="/admin"
                                component={AdminWrapper}
                            />
                        </Switch>
                    </AuthProvider>
                </TracksProvider>
            </SocketProvider>
        </Router>
    );
}

export default App;
