import React from 'react';
import Button from 'react-bootstrap/Button';

import {
    PurchaseControllerApi,
    Purchase,
    AuthorizedRequestobject,
    AuthorizedRequestRestPurchase,
    RestPurchase
} from '../api/api';
import AuthFormComponent from './AuthFormComponent';
import PurchaseFormComponent from './PurchaseFormComponent';
import PurchaseTableComponent from './details/PurchaseTableComponent';
import { Container, Row, Col } from 'react-bootstrap';


type BillingFormComponentProps = {};

type BillingFormComponentState = {
    newPurchases: RestPurchase[],
    submissionResponse: any,
    showFullListAuth: boolean,
    fullPurchaseList: []
}

const api = new PurchaseControllerApi();


class BillingFormComponent extends React.Component<BillingFormComponentProps, BillingFormComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            newPurchases: [],
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

    handleSubmit(event: any, newPurchases: Purchase[]) {
        this.setState({
            ...this.state,
            newPurchases: newPurchases
        });
    }

    handleSubmissionResponse(response: any) {
        if (response.body !== undefined) {
            alert(`Purchase '${response.body.productName}' (${response.body.price}) has been saved.`);
        } else if (response.statusCode === 401) {
            // TODO: a toast should appear here
            alert('You have entered incorrect credentials!');
        } else {
            alert('There has been an error .-.');
        }
    }

    handleFullListResponse(response: any) {
        console.log(response);

        if (response.body && Array.isArray(response.body)) {
            const listInResponse = response.body.filter((entry: any) => entry instanceof Purchase);

            this.setState({
                ...this.state,
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
                        <PurchaseFormComponent handlePurchaseSubmission={(event: any, newPurchases: Purchase[]) => this.handleSubmit(event, newPurchases)} />
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
                isShown = {() => this.state.newPurchases.length > 0}
                hide = {() => this.setState({...this.state, newPurchases: []})}
                getRequestObject = {() => this.state.newPurchases}
                requestMethod = {(requestBody: AuthorizedRequestRestPurchase) => api.createPurchaseUsingPOST(requestBody)}
                handleResponse = {(response: any) => this.handleSubmissionResponse(response)}
                />

            <AuthFormComponent
                isShown = {() => this.state.showFullListAuth}
                hide = {() => this.setState({...this.state, showFullListAuth: false})}
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