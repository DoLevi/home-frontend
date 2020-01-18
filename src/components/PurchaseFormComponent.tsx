import React from "react";
import { ProductCategoryEnum, RestPurchase } from '../api/api';
import { Form, Button } from "react-bootstrap";


type PurchaseFormProps = {
    handlePurchaseSubmission: Function
};


type PurchaseFormState = {
    newPurchase: RestPurchase
};

class PurchaseFormComponent extends React.Component<PurchaseFormProps, PurchaseFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            newPurchase: new RestPurchase()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            newPurchase: {
                ...this.state.newPurchase,
                [event.target.name]: event.target.value                
            }
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

    handleFormSubmit(event: any) {
        event.preventDefault();        
        this.props.handlePurchaseSubmission(this.state.newPurchase);
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
                        value={this.state.newPurchase.buyer}
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
                        value={this.state.newPurchase.market}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date bought: </Form.Label>
                    <Form.Control
                        type="date"
                        name="dateBought"
                        defaultValue={''}
                        value={this.state.newPurchase.dateBought}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Category: </Form.Label>
                    <Form.Control
                        as="select"
                        name="productCategory"
                        value={this.state.newPurchase.productCategory?.toString()}
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
                        value={this.state.newPurchase.productName}
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
                        value={this.state.newPurchase.price?.toString()}
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Button variant="success" name="finalSubmit" type="submit">Submit</Button>
            </Form>
        );
    }
}

export default PurchaseFormComponent;