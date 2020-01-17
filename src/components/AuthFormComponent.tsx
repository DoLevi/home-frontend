import { Modal, Form, Button } from "react-bootstrap";
import React from "react";
import { AuthType } from '../api/api';
import { sha256 } from 'js-sha256';


type AuthFormComponentProps = {
    isShown: Function,
    hide: Function,
    getRequestObject: Function,
    requestMethod: Function,
    handleResponse: Function
};

type AuthFormComponentState = {
    username: string | undefined,
    password: string | undefined
};


class AuthFormComponent extends React.Component<AuthFormComponentProps, AuthFormComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: undefined,
            password: undefined
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    executeRequest(event: any) {
        event.preventDefault();
        
        const requestBody = {
            'authType': {
                'username': this.state.username,
                'password': sha256.update(this.state.password || '').hex()
            } as AuthType,
            'requestObject': this.props.getRequestObject()
        }
        this.props.requestMethod(requestBody).then((response: any) => {
            this.props.handleResponse(response);
        }).catch((rejection: any) => {
            this.props.handleResponse(rejection);
        });
    }

    render() {
        return (
            <Modal show = {this.props.isShown()} onHide = {() => this.props.hide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your credentials</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={(event: any) => this.executeRequest(event)}>
                        <Form.Group>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username || ''}
                                onChange={this.handleChange}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password || ''}
                                onChange={this.handleChange}
                                required />
                        </Form.Group>

                        <Button variant="secondary" type="submit">Confirm</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AuthFormComponent;