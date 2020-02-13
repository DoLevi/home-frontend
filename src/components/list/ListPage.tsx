import React, {ChangeEvent, FC, useContext, useState} from "react";
import {Box, Flex} from "rebass";
import {RestPurchase} from "../../api/api";
import styled from "styled-components";
import PurchaseDetailsModal from "./PurchaseDetailsModal";
import PurchaseDeltaDetailsModal from "./PurchaseDeltaDetailsModal";
import {AuthContext} from "../../api/Loading";


interface ListPageProps {
    availablePurchases: RestPurchase[];
    availableBuyers: string[];
}

const castToDisplayDate = (dateStr: string | undefined): string => {
    if (dateStr) {
        const date = new Date(dateStr);
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    return 'Unknown';
};

const StylableTable = styled.table`
  border-collapse: collapse;
`;

const TableHeadRow = styled.tr`
  border-bottom:  1px solid grey;
`;

const ClickableTr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

const calcFilteredPurchases = (purchases: RestPurchase[], filterValue: string): RestPurchase[] => {
    const year = +filterValue.substr(0, 4);
    const month = +filterValue.substr(5, 2);
    return purchases.filter((purchase: RestPurchase) => {
        const date = new Date(purchase.dateBought!);
        return year === date.getFullYear() && month === (date.getMonth() + 1);
    });
};
const calcPurchaseSum = (username: string, purchases: RestPurchase[]): number => {
    return purchases.reduce((prev, current) => {
        const sumOfShares = Object.keys(current.purchaseMapping!).reduce((prevShare, currentShare) => {
            return prevShare + (current.purchaseMapping![currentShare] || 0);
        }, 0);
        const relativeShare = (current.purchaseMapping![username] || 0) / sumOfShares;

        return prev + current.price! * relativeShare;
    }, 0);
};
const calcExpenseDelta = (purchases: RestPurchase[]): {[key: string]: number} => {
    return purchases.reduce((prev, current) => {
        if (current.buyer! in prev) {
            prev[current.buyer!] += current.price!;
        } else {
            prev[current.buyer!] = current.price!;
        }
        const sumOfShares = Object.keys(current.purchaseMapping!).reduce((prevShare, currentShare) => {
            return prevShare + current.purchaseMapping![currentShare];
        }, 0);

        Object.keys(current.purchaseMapping!).forEach((consumerName: string) => {
            const relativeShare = current.purchaseMapping![consumerName] / sumOfShares;
            if (consumerName in prev) {
                prev[consumerName] -= current.price! * relativeShare;
            } else {
                prev[consumerName] = (-1) * current.price! * relativeShare;
            }
        });
        return prev;
    }, {} as {[key: string]: number});
};

const ListPage: FC<ListPageProps> = (props: ListPageProps) => {
    const [showDelta, setShowDelta] = useState<boolean>(false);
    const [activeDetails, setActiveDetails] = useState<RestPurchase | undefined>();
    const [displayedPurchases, setDisplayedPurchases] = useState<RestPurchase[]>();
    const [displayedPurchaseSum, setDisplayedPurchaseSum] = useState<number>();
    const [displayedExpenseDelta, setDisplayedExpenseDelta] = useState<{[key: string]: number}>();
    const authContext = useContext(AuthContext);

    const sortedPurchases = props.availablePurchases.sort((a, b) =>
        new Date(b.dateBought!).getTime() - new Date(a.dateBought!).getTime());
    const purchaseSum = calcPurchaseSum(authContext.getAuthType()!.username!, sortedPurchases);
    const expenseDelta = calcExpenseDelta(sortedPurchases);

    const availableMonths = sortedPurchases.reduce((prev, current) => {
        const date = new Date(current.dateBought!);
        const monthSignature = `${date.getFullYear()}/${date.getMonth() + 1}`;
        if (prev.indexOf(monthSignature) > -1) {
            return prev;
        } else {
            return prev.concat(monthSignature);
        }
    }, [] as string[]);

    const updateMonthFilter = (filterValue: string): void => {
        console.log(filterValue);
        if (filterValue === 'all') {
            setDisplayedPurchases(undefined);
            setDisplayedPurchaseSum(undefined);
            setDisplayedExpenseDelta(undefined);
        } else {
            const filteredPurchases = calcFilteredPurchases(sortedPurchases, filterValue);
            setDisplayedPurchases(filteredPurchases);
            setDisplayedPurchaseSum(calcPurchaseSum(authContext.getAuthType()!.username!, filteredPurchases));
            setDisplayedExpenseDelta(calcExpenseDelta(filteredPurchases));
        }
    };

    return (
        <Flex flexDirection="column">
            <PurchaseDeltaDetailsModal isVisible={showDelta} onHide={() => setShowDelta(false)}
                                       purchaseSum={(displayedPurchaseSum === undefined ? purchaseSum : displayedPurchaseSum)}
                                       mapping={displayedExpenseDelta || expenseDelta}/>
            <PurchaseDetailsModal purchase={activeDetails} isVisible={!!activeDetails}
                                  availableBuyers={props.availableBuyers}
                                  onHide={() => setActiveDetails(undefined)}/>
            <Box pb={2}>
                <Flex justifyContent="center">
                    <select defaultValue="all" onChange={(event: ChangeEvent<HTMLSelectElement>) => updateMonthFilter(event.target.value)}>
                        <option value="all">Show all</option>
                        {
                            availableMonths.map((month: string) => <option value={month}>{month}</option>)
                        }
                    </select>
                </Flex>
            </Box>
            <Box px={2} pb={2}>
                <Flex justifyContent="center">
                    <StylableTable>
                        <thead>
                        <TableHeadRow>
                            <th>Date bought</th>
                            <th>Product Name</th>
                            <th>Price</th>
                        </TableHeadRow>
                        </thead>
                        <tbody>
                        <ClickableTr onClick={() => setShowDelta(true)}>
                            <td colSpan={2} align="right">
                                Σ
                            </td>
                            <td align="right">
                                {(displayedPurchaseSum === undefined ? purchaseSum : displayedPurchaseSum).toFixed(2)}
                            </td>
                        </ClickableTr>
                        {
                            (displayedPurchases || sortedPurchases).map((purchase) => (
                                <ClickableTr key={purchase.id} onClick={() => setActiveDetails(purchase)}>
                                    <td>{castToDisplayDate(purchase.dateBought)}</td>
                                    <td>{purchase.productName}</td>
                                    <td align="right">{purchase.price?.toFixed(2)}</td>
                                </ClickableTr>
                            ))
                        }
                        </tbody>
                    </StylableTable>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ListPage;