import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Veiculos from './pages/Veiculos';
import Destinos from './pages/Destinos';
import Traslado from './pages/Traslado';
import NewTraslado from './pages/NewTraslado';
import UsersProfile from './pages/UsersProfile';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/veiculos" component={Veiculos} />
                <Route path="/destinos" component={Destinos} />
                <Route path="/traslado" exact component={Traslado} />
                <Route path="/traslado/new" component={NewTraslado} />
                <Route path="/usersprofile" component={UsersProfile} />
            </Switch>
        </BrowserRouter>
    );
}