import React from 'react';
import {
    NavDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Navbar,
    NavbarBrand,
    Nav
} from 'reactstrap';

export default class AppNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDropdownOpen: false,
            infoDropdownOpen: false
        };
    }

    render() {
        return this.buildNavBar();
    }

    infoToggle = () => {
        this.setState({
            infoDropdownOpen: !this.state.infoDropdownOpen
        });
    };

    companyToggle = () => {
        this.setState({
            companyDropdownOpen: !this.state.companyDropdownOpen
        });
    };

    buildLink = (dest) => {
        return () => this.props.deps.navigate(dest);
    };

    buildNavBar() {
        return (
            <div>
                <Navbar color="faded">
                    <NavbarBrand href="/">Service Pro Integration</NavbarBrand>
                    <Nav navbar>
                        {this.buildMenu()}
                    </Nav>
                </Navbar>
            </div>
        );
    }

    buildMenu() {
        if (!this.props.deps.sessionInfo.authToken) {
            return (
                <div></div>
            );
        }

        let associatedMenus = (
            <div></div>
        );

        if (this.props.deps.sessionInfo.selectedCompany) {
            associatedMenus = (
                <div>
                    {this.buildInfoDropdown()}
                </div>
            );
        }

        return (
            <div>
                {associatedMenus}
                {this.buildCompanySelect()}
            </div>
        );
    }

    buildInfoDropdown() {
        return (
            <NavDropdown isOpen={this.state.infoDropdownOpen} toggle={this.infoToggle}>
                <DropdownToggle caret>
                    Info
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Info</DropdownItem>
                    <DropdownItem onClick={this.buildLink('/general')}>General</DropdownItem>
                    <DropdownItem onClick={this.buildLink('/schedule')}>Schedules</DropdownItem>
                </DropdownMenu>
            </NavDropdown>
        );
    }

    buildCompanySelect() {
        let buildItems = (company) => {
            let props = {
                disabled: true,
                key: company.Id
            };

            if (!this.props.deps.sessionInfo.selectedCompany || company.id !== this.props.deps.sessionInfo.selectedCompany.Id) {
                props.disabled = false;
                props.onClick = () => this.props.deps.setCompany(company);
            }

            return (
                <DropdownItem {...props}>{company.CompanyName}</DropdownItem>
            );
        };

        let logoutHandler = () => {
            this.props.deps.clearSession();
            this.props.deps.navigate('/login');
        };

        let displayName = this.props.deps.sessionInfo.selectedCompany
            ? this.props.deps.sessionInfo.selectedCompany.CompanyName
            : 'Select Company';

        return (
            <NavDropdown className="float-xs-right" isOpen={this.state.companyDropdownOpen} toggle={this.companyToggle}>
                <DropdownToggle caret>
                    {displayName}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header>Select Company</DropdownItem>
                    {this.props.deps.sessionInfo.companyList.map(buildItems)}
                    <DropdownItem divider/>
                    <DropdownItem header>Actions</DropdownItem>
                    <DropdownItem onClick={logoutHandler}>Logout</DropdownItem>
                </DropdownMenu>
            </NavDropdown>
        );
    }
}
