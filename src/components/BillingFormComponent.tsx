import React from 'react';
import Button from 'react-bootstrap/Button';

import {
    PurchaseControllerApi,
    Purchase,
    AuthorizedRequestobject,
    RestPurchase,
    AuthorizedRequestListRestPurchase
} from '../api/api';
import AuthFormComponent from './AuthFormComponent';
import PurchaseFormComponent from './PurchaseFormComponent';
import PurchaseTableComponent from './details/PurchaseTableComponent';
import { Container, Row, Col, Modal } from 'react-bootstrap';


type BillingFormComponentProps = {};

type BillingFormComponentState = {
    newPurchase: RestPurchase,
    submissionResponse: any,
    showFullListAuth: boolean,
    fullPurchaseList: []
}

const api = new PurchaseControllerApi();


class BillingFormComponent extends React.Component<BillingFormComponentProps, BillingFormComponentState> {
    constructor(props: BillingFormComponentProps) {
        super(props);

        this.state = {
            newPurchase: new RestPurchase(),
            submissionResponse: {},
            showFullListAuth: false,
            fullPurchaseList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmissionResponse = this.handleSubmissionResponse.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(newPurchase: RestPurchase) {
        this.setState({
            ...this.state,
            newPurchase: newPurchase
        });
    }

    handleSubmissionResponse(response: any) {
        alert(response);
        this.setState({
            ...this.state,
            newPurchase: new RestPurchase()
        });
    }

    handleFullListResponse(response: any) {
        if (response.body && Array.isArray(response.body)) {
            const listInResponse = response.body.filter((entry: any) => entry instanceof Purchase);

            this.setState({
                ...this.state,
                showFullListAuth: false,
                fullPurchaseList: listInResponse
            });
        }
    }
    
    render() {
        return (
            <>
            <Container>
                <Row>
                    <Col>
                        <PurchaseFormComponent handlePurchaseSubmission={(newPurchase: RestPurchase) => this.handleSubmit(newPurchase)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="outline-info"
                            type="button"
                            style={{marginTop: '1.0rem'}}
                            onClick={() => this.setState({...this.state, showFullListAuth: true})}
                            >
                                Show all
                        </Button>
                    </Col>
                </Row>
            </Container>

            <AuthFormComponent 
                isShown = {() => Boolean(this.state.newPurchase.buyer)}  // TODO: make this less hacky
                onHide = {() => { return; }}
                getRequestObject = {() => [this.state.newPurchase]}
                requestMethod = {(requestBody: AuthorizedRequestListRestPurchase) => api.createPurchaseUsingPOST(requestBody)}
                handleResponse = {(response: any) => this.handleSubmissionResponse(response)}
                />

            <AuthFormComponent
                isShown = {() => this.state.showFullListAuth}
                onHide = {() => this.setState({...this.state, showFullListAuth: false})}
                getRequestObject = {() => undefined}
                requestMethod = {(requestBody: AuthorizedRequestobject) => api.getAllPurchasesUsingPOST(requestBody)}
                handleResponse = {(response: any) => this.handleFullListResponse(response)}
                />
                
            <PurchaseTableComponent
                isShown = {() => this.state.fullPurchaseList.length > 0}
                onHide = {() => this.setState({...this.state, fullPurchaseList: []})}
                purchaseEntries = {this.state.fullPurchaseList}
                />
            </>
        );
    }
}

export default BillingFormComponent;