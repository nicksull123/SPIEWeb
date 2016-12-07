import React from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Button
} from 'reactstrap';

class LoginBox extends React.Component {
    render() {
        const err = this.props.loginFailed
            ? (
                <FormFeedback
                    style={{
                    textAlign: "center"
                }}>Invalid email or password</FormFeedback>
            )
            : (
                <div></div>
            );

        let inputColor = {};
        if (this.props.loginFailed) {
            inputColor.color = 'danger';
        }

        return (
            <Container style={{
                padding: "20px"
            }}>
                <Row>
                    <Col
                        md={{
                        size: 6,
                        offset: 3
                    }}>
                        <Form action="" onSubmit={this.props.handleLogin}>
                            <h3
                                style={{
                                marginBottom: "50px",
                                textAlign: "center"
                            }}
                                className="text-center">Admin Console Log In</h3>
                            <FormGroup {...inputColor}>
                                <Input type="email" name="email" id="emailInput" placeholder="email"/>
                                <Input
                                    type="password"
                                    name="password"
                                    id="passwordInput"
                                    placeholder="password"/>
                            </FormGroup>

                            {err}
                            <Button color="primary" block>Log in</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

LoginBox.propTypes = {
    handleLogin: React.PropTypes.func.isRequired,
    loginFailed: React.PropTypes.bool.isRequired
};

export default LoginBox;
