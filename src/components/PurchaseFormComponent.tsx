import React from "react";
import { ProductCategoryEnum, RestPurchase } from '../api/api';
import { Form, Button } from "react-bootstrap";


type PurchaseFormProps = {
    handlePurchaseSubmission: Function
};


type PurchaseFormState = {
    stashedPurchases: RestPurchase[],
    currentPurchase: RestPurchase
};

class PurchaseFormComponent extends React.Component<PurchaseFormProps, PurchaseFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            stashedPurchases: [],
            currentPurchase: new RestPurchase()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    getProductCategoryName(productCategory: string) {
        const validCategoryStrings = [
            ProductCategoryEnum.OTHER.toString(),
            ProductCategoryEnum.FOODANDBEVERAGES.toString(),
            ProductCategoryEnum.HYGIENE.toString(),
            ProductCategoryEnum.ENTERTAINMENT.toString(),
            ProductCategoryEnum.FURNITURE.toString(),
            ProductCategoryEnum.PRIMARYCARE.toString()
        ]
        if (validCategoryStrings.includes(productCategory)) {
            return productCategory;
        }
        return undefined;
    }

    stashPurchase(): void {
        const newPurchase = this.state.currentPurchase;

        this.setState({
            stashedPurchases: [...this.state.stashedPurchases, newPurchase],
            currentPurchase: new RestPurchase()
        });
    }

    handleFormSubmit(event: any) {
        event.preventDefault();

        switch (event.target.name) {
            case 'nextPurchase':
                this.stashPurchase();
                break;
            case 'finalSubmit':
                console.log('Final submit:');
                console.log(this.state);
                this.props.handlePurchaseSubmission(event, this.state.stashedPurchases);
            default:
                console.log('Some software developer messed up...');
        }
    }

    render() {
        return(
            <Form onSubmit={(event: any) => this.handleFormSubmit(event)}>
                <Form.Group>
                    <Form.Label>Buyer: </Form.Label>
                    <Form.Control
                        type="text"
                        name="buyer"
                        placeholder="Buyer"
                        defaultValue={''}
                        value={this.state.currentPurchase.buyer}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Market: </Form.Label>
                    <Form.Control
                        type="text"
                        name="market"
                        placeholder="Market"
                        defaultValue={''}
                        value={this.state.currentPurchase.market}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date bought: </Form.Label>
                    <Form.Control
                        type="date"
                        name="dateBought"
                        defaultValue={''}
                        value={this.state.currentPurchase.dateBought}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Category: </Form.Label>
                    <Form.Control
                        as="select"
                        name="productCategory"
                        value={this.state.currentPurchase.productCategory?.toString()}
                        onChange={this.handleChange}
                        required>
                        <option key={undefined}></option>
                        {
                            Object.keys(ProductCategoryEnum).map((productCategory) => {
                                const productCategoryString = this.getProductCategoryName(productCategory);
                                if (productCategoryString !== undefined) {
                                    return <option key={productCategory}>{productCategoryString}</option>;
                                }
                                return undefined;
                            })
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Name: </Form.Label>
                    <Form.Control
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        defaultValue={''}
                        value={this.state.currentPurchase.productName}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price: </Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="Price"
                        defaultValue={''}
                        value={this.state.currentPurchase.price?.toString()}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Button variant="success" name="finalSubmit" type="submit">Submit</Button>

                <Button variant="primary" name="nextPurchase" type="submit" style={{float: 'right'}}>Another!</Button>
            </Form>
        );
    }
}

export default PurchaseFormComponent;