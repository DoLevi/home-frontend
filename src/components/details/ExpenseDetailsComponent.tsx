import React from "react";
import { Modal, Table } from "react-bootstrap";


type ExpenseDetailsProps = {
    isShown: Function,
    onHide: Function,
    expenseMap: Map<string, number>
};

type ExpenseDetailsState = {
    average: number
};

class ExpenseDetailsComponent extends React.Component<ExpenseDetailsProps, ExpenseDetailsState> {
    constructor(props: ExpenseDetailsProps) {
        super(props);

        this.state = {
            average: 0
        }
    }

    componentDidUpdate(prevProps: ExpenseDetailsProps) {
        if (prevProps !== this.props) {
            let sum = 0;
            this.props.expenseMap.forEach((value: number,_key: string) => {
                sum += value;
            });
    
            this.setState({
                average: sum / this.props.expenseMap.size
            });
        }

    }

    render() {
        return (
            <Modal show={this.props.isShown()} onHide={() => this.props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggregated Expense Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Table borderless size="sm">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Expense Total</td>
                                <td>Delta to average</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.from(this.props.expenseMap).map(([key, value]) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{value.toFixed(2)}</td>
                                            <td>{(+value - +this.state.average).toFixed(2)}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    <Modal.Footer>
                        Average: {this.state.average.toFixed(2)}
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ExpenseDetailsComponent;