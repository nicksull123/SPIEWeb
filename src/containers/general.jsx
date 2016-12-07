import React from 'react';
import BaseContainer from './basecontainer.jsx';
import Loadable from '../components/loadable.jsx';

import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText
} from 'reactstrap';

export default class GeneralContainer extends BaseContainer {
    constructor(props) {
        super(true, props);
        this.state = {
            isLoading: true,
            integration: 'Unknown',
            spieVersion: 'Unknown'
        };
    }

    async loadState() {
        this.setState({isLoading: true, integration: 'Unknown', spieVersion: 'Unknown'});
        let response = await this.props.deps.spxClient.get('Settings');
        if (!response.error) {
            let integration = response.val.d.results[0].Integration;
            integration = integration
                ? integration
                : 'None';
            this.setState({integration: integration});
        }

        let apiKey = await this.props.deps.spxClient.apiKey();
        if (!apiKey.error) {
            let spieVersion = await this.props.deps.spieClient.get('CompanyConfig/GetConfig/' + apiKey.val);
            if (!spieVersion.error) {
                let integrationVersion = spieVersion.val
                    ? spieVersion.val.IntegrationEngineVersion
                    : 'Default';
                this.setState({spieVersion: integrationVersion});
            }
        }

        this.setState({isLoading: false});
    }

    renderContainer() {
        return (
            <Loadable isLoading={this.state.isLoading}>
                <Container style={{
                    padding: "20px"
                }}>
                    <Row>
                        <Col md={{
                            size: 4
                        }}>
                            <Card block inverse color="primary">
                                <CardTitle>Integration Engine Version</CardTitle>
                                <CardText>{this.state.spieVersion}</CardText>
                            </Card>
                        </Col>
                        <Col md={{
                            size: 4
                        }}>
                            <Card block inverse color="success">
                                <CardTitle>Core Version</CardTitle>
                                <CardText>{this.props.deps.sessionInfo.selectedCompany.CompanyVersionNumber}</CardText>
                            </Card>
                        </Col>
                        <Col md={{
                            size: 4
                        }}>
                            <Card block inverse color="danger">
                                <CardTitle>Integration</CardTitle>
                                <CardText>{this.state.integration}</CardText>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Loadable>
        );
    }
}
