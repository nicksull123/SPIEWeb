"use strict";

require('babel-core/register');
require('babel-polyfill');
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import LoginContainer from './containers/login.jsx';
import ScheduleContainer from './containers/schedules.jsx';
import GeneralContainer from './containers/general.jsx';
import App from './containers/app.jsx';

render(
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={GeneralContainer}/>
        <Route path="schedule" component={ScheduleContainer}/>
        <Route path="login" component={LoginContainer}/>
        <Route path="general" component={GeneralContainer}/>
    </Route>
</Router>, document.getElementById('app'));
