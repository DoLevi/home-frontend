import React, {FC} from "react";
import {RestPurchase} from "../../api/api";
import styled from "styled-components";
import {ButtonWithShadow} from "../../styles/Components";
import {actionColor} from "../../styles/Colors";

interface PurchaseDetailsProps {
    purchase: RestPurchase;
    triggerEdit: () => void;
}

const dateStringToDisplayable = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const FixedTable = styled.table`
  table-layout: fixed;
`;

const DetailsTh = styled.th`
  text-align: left;
`;

const PurchaseDetails: FC<PurchaseDetailsProps> = (props: PurchaseDetailsProps) => {
    const sumOfShares = Object.keys(props.purchase.purchaseMapping!).reduce((prev, current) => {
        return prev + props.purchase.purchaseMapping![current];
    }, 0);

    return (
        <FixedTable>
            <tbody>
            <tr>
                <DetailsTh>Buyer</DetailsTh>
                <td>{props.purchase.buyer}</td>
            </tr>
            <tr>
                <DetailsTh>Date bought</DetailsTh>
                <td>{dateStringToDisplayable(props.purchase.dateBought!)}</td>
            </tr>
            <tr>
                <DetailsTh>Market</DetailsTh>
                <td>{props.purchase.market}</td>
            </tr>
            <tr>
                <DetailsTh>Price</DetailsTh>
                <td>{props.purchase.price}</td>
            </tr>
            <tr>
                <DetailsTh>Product Category</DetailsTh>
                <td>{props.purchase.productCategory}</td>
            </tr>
            <tr>
                <DetailsTh>Product Name</DetailsTh>
                <td>{props.purchase.productName}</td>
            </tr>
            <tr>
                <DetailsTh>Purchase Mapping</DetailsTh>
            </tr>
            {
                Object.keys(props.purchase.purchaseMapping!).map((username: string) => {
                    const absoluteShare = props.purchase.purchaseMapping![username];
                    const relativeShare = absoluteShare / sumOfShares;
                    const userExpense = props.purchase.price! * relativeShare;
                    return (
                        <tr key={username}>
                            <td>{username}</td>
                            <td>{`${absoluteShare} (${(100 * relativeShare).toFixed(2)}% / ${userExpense.toFixed(2)})`}</td>
                        </tr>
                    );
                })
            }
                <tr>
                    <td colSpan={2}>
                        <ButtonWithShadow bg={actionColor} onClick={props.triggerEdit}>Edit Purchase</ButtonWithShadow>
                    </td>
                </tr>
            </tbody>
        </FixedTable>
    );
};

export default PurchaseDetails;