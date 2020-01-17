import React from "react";
import { Toast } from "react-bootstrap";


type StateToastComponentProps = {
    isShown: Function,
    title: string,
    message: string
};

type StateToastComponentState = {};


class StateToastComponent extends React.Component<StateToastComponentProps, StateToastComponentState> {
    render() {
        return (
            <Toast show = {this.props.isShown()}>
                <Toast.Header>
                    <strong>{this.props.title}</strong>
                </Toast.Header>
                <Toast.Body>
                    {this.props.message}
                </Toast.Body>
            </Toast>
        );
    }

}

export default StateToastComponent;