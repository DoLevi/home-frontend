import React, {FC, useContext} from "react";
import {AuthContext} from "../../api/Loading";


interface PurchaseDeltaDetailsProps {
    mapping: { [consumerName: string]: number };
}

const PurchaseDeltaDetails: FC<PurchaseDeltaDetailsProps> = (props: PurchaseDeltaDetailsProps) => {
    const authContext = useContext(AuthContext);

    const actualOwes = Object.keys(props.mapping)
        .filter((consumerName) => consumerName !== authContext.getAuthType()?.username);
    const owedByUser = actualOwes
        .reduce((prev, current) => {
            if (props.mapping[current] < 0) {
                prev[current] = props.mapping[current];
            }
            return prev;
        }, {} as { [consumerName: string]: number });
    const owedToUser = actualOwes
        .reduce((prev, current) => {
            if (props.mapping[current] > 0) {
                prev[current] = props.mapping[current];
            }
            return prev;
        }, {} as { [consumerName: string]: number });

    return (
        <table>
            <tbody>
            <tr>
                <td colSpan={2}><b>You are owed</b></td>
            </tr>
            {
                Object.keys(owedByUser).length > 0 ? (
                    Object.keys(owedByUser).map((debtorName: string) => {
                        return (
                            <tr key={debtorName}>
                                <td>{debtorName}</td>
                                <td>{(-owedByUser[debtorName]).toFixed(2)}</td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={2}>Nothing</td>
                    </tr>
                )
            }
            <tr>
                <td colSpan={2}><b>You owe</b></td>
            </tr>
            {
                Object.keys(owedToUser).length > 0 ? (
                    Object.keys(owedToUser).map((creditorName: string) => {
                        return (
                            <tr>
                                <td>{creditorName}</td>
                                <td align="right">{owedToUser[creditorName].toFixed(2)}</td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={2}>Nothing</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

export default PurchaseDeltaDetails;