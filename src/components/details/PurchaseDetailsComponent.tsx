import React from "react";
import { Modal, Table } from "react-bootstrap";
import { Purchase } from '../../api/api';


type PurchaseDetailsProps = {
    isShown: Function,
    onHide: Function,
    purchase: Purchase
};

type PurchaseDetailsState = {};


const toDateString = (timeString: string | undefined) => {
    if (timeString !== undefined) {
        const date = new Date(+timeString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    return (<i>Date unknown</i>);
};


class PurchaseDetailsComponent extends React.Component<PurchaseDetailsProps, PurchaseDetailsState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.isShown()} onHide={() => this.props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Information for Purchase #{this.props.purchase.id}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Table borderless size="sm">
                        <tbody>
                            <tr>
                                <th>Purchase #:</th>
                                <th>{this.props.purchase.id}</th>
                            </tr>
                            <tr>
                                <th>Buyer:</th>
                                <th>{this.props.purchase.buyer}</th>
                            </tr>
                            <tr>
                                <th>Market:</th>
                                <th>{this.props.purchase.market}</th>
                            </tr>
                            <tr>
                                <th>Date Bought:</th>
                                <th>{toDateString(this.props.purchase.dateBought)}</th>
                            </tr>
                            <tr>
                                <th>Product Category:</th>
                                <th>{this.props.purchase.productCategory}</th>
                            </tr>
                            <tr>
                                <th>Product Name:</th>
                                <th>{this.props.purchase.productName}</th>
                            </tr>
                            <tr>
                                <th>Price:</th>
                                <th>{this.props.purchase.price}</th>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PurchaseDetailsComponent;