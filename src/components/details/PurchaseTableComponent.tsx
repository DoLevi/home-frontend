import React from "react";
import { Table, Modal } from "react-bootstrap";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Purchase } from '../../api/api';
import PurchaseDetailsComponent from "./PurchaseDetailsComponent";


type PurchaseTableProps = {
    isShown: Function,
    onHide: Function,
    purchaseEntries: Purchase[]
};

type PurchaseTableState = {
    activePurchase: Purchase
};


const toDateString = (timeString: string | undefined) => {
    if (timeString !== undefined) {
        const date = new Date(+timeString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    return (<i>Date unknown</i>);
};


class PurchaseTableComponent extends React.Component<PurchaseTableProps, PurchaseTableState> {
    constructor(props: any) {
        super(props);

        this.state = {
            activePurchase: {}
        }
    }

    render() {
        return (
            <>
                <Modal show={Object.keys(this.state.activePurchase).length === 0 && this.props.isShown()} onHide={() => this.props.onHide()} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>List of all purchases</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table striped bordered responsive = "sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Buyer</th>
                                    <th>Date Bought</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.purchaseEntries.map((entry: Purchase) => {
                                        return (
                                            <tr>
                                                <td style={{cursor: 'pointer'}} onClick={() => this.setState({...this.state, activePurchase: entry})}>
                                                    <IoIosInformationCircleOutline />
                                                </td>
                                                <td>{entry.buyer}</td>
                                                <td>{toDateString(entry.dateBought)}</td>
                                                <td>{entry.productName}</td>
                                                <td>{entry.price}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>

                <PurchaseDetailsComponent
                    isShown={() => Object.keys(this.state.activePurchase).length > 0}
                    onHide={() => this.setState({...this.state, activePurchase: {}})}
                    purchase={this.state.activePurchase}
                    />
            </>
        );
    }
}

export default PurchaseTableComponent;