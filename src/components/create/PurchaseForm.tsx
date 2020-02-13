import React, {FC, FormEvent, useState} from "react";

import {ProductCategoryEnum, RestPurchase} from "../../api/api";
import BuyerInputField from "./fields/BuyerInputField";
import DateBoughtInputField from "./fields/DateBoughtInputField";
import MarketInputField from "./fields/MarketInputField";
import PriceInputField from "./fields/PriceInputField";
import ProductCategoryInputField from "./fields/ProductCategoryInputField";
import ProductNameInputField from "./fields/ProductNameInputField";
import ExpenseMappingInputField from "./fields/ExpenseMappingInputField";
import {Box} from "rebass";
import {notify} from "react-notify-toast";
import {ButtonWithShadow} from "../../styles/Components";
import {confirmColor} from "../../styles/Colors";


interface PurchaseFormProps {
    initialPurchase?: RestPurchase;
    availableBuyers: string[];
    setPurchases: (purchase: RestPurchase[]) => void;
}

const PurchaseForm: FC<PurchaseFormProps> = (props: PurchaseFormProps) => {
    const [localAvailableBuyers] = useState<string[]>(props.availableBuyers);
    const [selectedBuyer, setSelectedBuyer] = useState<string>();
    const [dateBought, setDateBought] = useState<Date>();
    const [market, setMarket] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [productCategory, setProductCategory] = useState<ProductCategoryEnum>();
    const [productName, setProductName] = useState<string>();
    const [purchaseMapping] = useState<{ [key: string]: number; }>({});

    const buildPurchase = (): RestPurchase => {
        const purchase = {
            'buyer': selectedBuyer || props.initialPurchase!.buyer,
            'dateBought': dateBought?.toISOString() || props.initialPurchase!.dateBought,
            'market': market || props.initialPurchase!.market,
            'price': price || props.initialPurchase!.price,
            'productCategory': productCategory || props.initialPurchase!.productCategory,
            'productName': productName || props.initialPurchase!.productName,
            'purchaseMapping': purchaseMapping || props.initialPurchase!.purchaseMapping,
        };
        if (props.initialPurchase) {
            return {
                ...purchase,
                id: props.initialPurchase.id
            };
        }
        return purchase;
    };

    const submitForm = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const sum = Object.keys(purchaseMapping).reduce((prev: number, currentKey: string) => {
            return prev + (purchaseMapping[currentKey] || 0);
        }, 0);
        if (sum > 0) {
            props.setPurchases([buildPurchase()]);
        } else {
            notify.show('Mapping must sum up to > 0!', 'error', 5000);
        }
    };

    return (
        <form onSubmit={(event) => submitForm(event)}>
            <Box px={4} pb={4}>
            {
                props.initialPurchase ? (
                    <>
                        <BuyerInputField availableBuyers={localAvailableBuyers} setSelectedBuyer={setSelectedBuyer}
                                         initialBuyer={props.initialPurchase.buyer}/>
                        <DateBoughtInputField setDateBought={setDateBought}
                                              initialDateBought={props.initialPurchase.dateBought}/>
                        <MarketInputField setMarket={setMarket}
                                          initialMarket={props.initialPurchase.market}/>
                        <PriceInputField setPrice={setPrice}
                                         initialPrice={props.initialPurchase.price}/>
                        <ProductCategoryInputField setProductCategory={setProductCategory}
                                                   initialProductCategory={props.initialPurchase.productCategory}/>
                        <ProductNameInputField setProductName={setProductName}
                                               initialProductName={props.initialPurchase.productName}/>
                        <ExpenseMappingInputField availableBuyers={localAvailableBuyers}
                                                  setExpenseMappingValue={(username: string, share: number, initial: boolean) => {
                                                      if (!initial || !(username in purchaseMapping)) {
                                                          purchaseMapping[username] = share;
                                                      }
                                                  }}
                                                  initialExpenseMapping={props.initialPurchase?.purchaseMapping}/>
                    </>
                ) : (
                    <>
                        <BuyerInputField availableBuyers={localAvailableBuyers} setSelectedBuyer={setSelectedBuyer}/>
                        <DateBoughtInputField setDateBought={setDateBought}/>
                        <MarketInputField setMarket={setMarket}/>
                        <PriceInputField setPrice={setPrice}/>
                        <ProductCategoryInputField setProductCategory={setProductCategory}/>
                        <ProductNameInputField setProductName={setProductName}/>
                        <ExpenseMappingInputField availableBuyers={localAvailableBuyers}
                                                  setExpenseMappingValue={(username: string, share: number, initial: boolean) => {
                                                      if (!initial || !(username in purchaseMapping)) {
                                                          purchaseMapping[username] = share;
                                                      }
                                                  }}/>
                    </>
                )
            }
                <ButtonWithShadow type="submit" bg={confirmColor}>Submit</ButtonWithShadow>
            </Box>
        </form>
    );
};

export default PurchaseForm;