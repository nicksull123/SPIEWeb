import React from 'react';

class BaseContainer extends React.Component {
    constructor(requireAuth, props) {
        super(props);
        this.requireAuth = requireAuth;
    }

    componentDidMount() {
        if (this.shouldRedirect()) {
            this.props.deps.navigate('/login');
            return;
        }

        if (this.loadState && this.props.deps.selectedCompany !== null) {
            this.loadState();
        }
    }

    render() {
        if (this.shouldRedirect() || this.notAssociated()) {
            return (
                <div></div>
            );
        }

        return this.renderContainer();
    }

    shouldRedirect() {
        return this.requireAuth && !this.props.deps.sessionInfo.authToken;
    }

    notAssociated() {
        return this.requireAuth && !this.props.deps.sessionInfo.selectedCompany;
    }

    componentWillReceiveProps(nProps) {
        if (nProps.deps.selectedCompany == null)
            return;

        if (this.props.deps.selectedCompany == null) {
            if (this.loadState) {
                this.loadState();
            }

            return;
        }

        if (this.props.deps.selectedCompany.id != nProps.deps.selectedCompany.id) {
            if (this.loadState) {
                this.loadState();
            }
        }
    }
}

export default BaseContainer;
