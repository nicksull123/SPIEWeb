import React from 'react';
import AppNav from '../components/appnav.jsx';
import AppState from '../model/appstate.js';
import SpxClient from '../managers/spxclient.js';
import SpieClient from '../managers/spieclient.js';
import Loadable from '../components/loadable.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.appState = AppState.instance;
        this.state = {
            isLoading: false
        };

        Object.assign(this.state, this.state, this.stateFromAppState());
    }

    render() {
        let containerDeps = {
            navigate: this.navigate,
            setCompany: this.setCompany,
            setSessionInfo: this.setSessionInfo,
            clearSession: this.clearSession,
            spxClient: new SpxClient(this.state.selectedCompany, this.unauthHandler, this.state.authToken),
            spieClient: new SpieClient(),
            sessionInfo: {
                selectedCompany: this.state.selectedCompany,
                companyList: this.state.companyList,
                authToken: this.state.authToken
            }
        };

        return (
            <div>
                <div>
                    <AppNav deps={containerDeps}/>
                </div>
                <Loadable isLoading={this.state.isLoading}>
                    {React.cloneElement(this.props.children, {deps: containerDeps})}
                </Loadable>
            </div>
        );
    }

    stateFromAppState() {
        let nState = {
            selectedCompany: this.appState.selectedCompany,
            companyList: this.appState.companyList,
            authToken: this.appState.authToken
        };

        return nState;
    }

    navigate = (dest) => {
        this.context.router.push(dest);
    };

    setCompany = async(company) => {
        this.appState.selectedCompany = null;
        this.appState.persist();
        this.setState(this.stateFromAppState());
        this.setState({isLoading: true});
        let client = new SpxClient(this.appState.selectedCompany, null, this.appState.authToken);
        let result = await client.create('User/SelectCompany/' + company.Id, {});
        this.setState({isLoading: false});

        if (!result.error) {
            this.appState.selectedCompany = company;
            this.appState.persist();
            this.setState(this.stateFromAppState());
        } else {
            alert('Could not select company');
        }
    };

    setSessionInfo = async(authToken, companies) => {
        this.appState.authToken = authToken;
        this.appState.companyList = companies;
        this.appState.persist();
        this.setState(this.stateFromAppState());
    };

    clearSession = () => {
        this.appState.clear();
        this.appState.persist();
        this.setState(this.stateFromAppState());
    };

    unauthHandler = () => {
        this.clearSession();
        this.navigate('/login');
    };
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default App;
