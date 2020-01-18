import React from "react";
import { Table, Modal, Form } from "react-bootstrap";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Purchase, ProductCategoryEnum } from '../../api/api';
import PurchaseDetailsComponent from "./PurchaseDetailsComponent";
import ExpenseDetailsComponent from "./ExpenseDetailsComponent";


type PurchaseTableProps = {
    isShown: Function,
    onHide: Function,
    purchaseEntries: Purchase[]
};

type PurchaseTableState = {
    enabledPurchases: Purchase[],
    activePurchase: Purchase
    individualExpenses: Map<string, number>
};


class PurchaseTableComponent extends React.Component<PurchaseTableProps, PurchaseTableState> {
    constructor(props: PurchaseTableProps) {
        super(props);

        this.state = {
            enabledPurchases: [],
            activePurchase: {},
            individualExpenses: new Map<string, number>()
        }

        this.togglePrimaryCare = this.togglePrimaryCare.bind(this);
    }

    componentDidUpdate() {
        if (this.state.enabledPurchases !== this.props.purchaseEntries) {
            this.setState({
                ...this.state,
                enabledPurchases: this.props.purchaseEntries.sort(this.compareDates)
            });
        }
    }

    compareDates(a: Purchase, b: Purchase) {
        return new Date(+(b.dateBought || 0)).getTime() - new Date(+(a.dateBought || 0)).getTime();
    }

    computeIndividualExpenses(purchases: Purchase[]): Map<string, number> {
        let expenses = new Map<string, number>();
        purchases.forEach((purchase: Purchase) => {
            if (!purchase || !purchase.buyer || !purchase.price) {
                return;
            }
            const previousSum = expenses.get(purchase.buyer);
            if (previousSum) {
                expenses.set(purchase.buyer, previousSum + purchase.price);
            } else {
                expenses.set(purchase.buyer, purchase.price);
            }
        });
        return expenses;
    }

    togglePrimaryCare() {
        if (this.props.purchaseEntries === this.state.enabledPurchases) {
            // excluding primary care

            const isNotPrimaryCare = (element: Purchase) => element.productCategory !== ProductCategoryEnum.PRIMARYCARE;
            this.setState({
                ...this.state,
                enabledPurchases: this.props.purchaseEntries.filter(isNotPrimaryCare).sort(this.compareDates)
            });
        } else {
            // Including primary care
            
            this.setState({
                ...this.state,
                enabledPurchases: this.props.purchaseEntries.sort(this.compareDates)
            });
        }
    }

    areExpenseDetailsVisible(): boolean {
        return this.state.individualExpenses.size > 0;
    }

    arePurchaseDetailsVisible(): boolean {
        return !this.areExpenseDetailsVisible() && Object.keys(this.state.activePurchase).length > 0;
    }

    isMainTableShown(): boolean {
        return !this.areExpenseDetailsVisible() && !this.arePurchaseDetailsVisible() && this.props.isShown();
    }

    render() {
        return (
            <>
                <Modal show={this.isMainTableShown()} onHide={() => this.props.onHide()} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>List of all purchases</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Check type="checkbox" label="Exclude Primary Care" onChange={() => this.togglePrimaryCare()}/>
                        <Table striped bordered responsive = "sm">
                            <thead>
                                <tr>
                                    <th>Buyer</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{cursor: 'pointer'}} onClick={() => this.setState({...this.state, individualExpenses: this.computeIndividualExpenses(this.state.enabledPurchases)})}>
                                    <td colSpan={2} align="right">
                                        Σ
                                    </td>
                                    <td>
                                        {
                                            this.state.enabledPurchases
                                                .reduce((a: number, b: Purchase) => a + (b.price || 0), 0)
                                                .toFixed(2)
                                        }
                                    </td>
                                </tr>
                                {
                                    this.state.enabledPurchases.map((entry: Purchase) => {
                                        return (
                                            <tr style={{cursor: 'pointer'}} onClick={() => this.setState({...this.state, activePurchase: entry})}>
                                                <td>{entry.buyer}</td>
                                                <td>{entry.productName}</td>
                                                <td>{entry.price?.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>

                <PurchaseDetailsComponent
                    isShown={() => this.arePurchaseDetailsVisible()}
                    onHide={() => this.setState({...this.state, activePurchase: {}})}
                    purchase={this.state.activePurchase}
                    />
                
                <ExpenseDetailsComponent
                    isShown={() => this.areExpenseDetailsVisible()}
                    onHide={() => this.setState({...this.state, individualExpenses: new Map<string, number>()})}
                    expenseMap={this.state.individualExpenses} />
            </>
        );
    }
}

export default PurchaseTableComponent;