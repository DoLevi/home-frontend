import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";
import styled from "styled-components";


interface ExpenseMappingInputProps {
    initialExpenseMapping?: {[ key: string ]: number};
    availableBuyers: string[];
    setExpenseMappingValue: (user: string, share: number, initial: boolean) => void;
}

const FullWidthTable = styled.table`
  width: 100%;
`;

const FullWidthInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 26px;
`;

const UserNameTd = styled.td`
  white-space: nowrap;
`;

const MappingTd = styled.td`
  width: 99%;
`;

const ExpenseMappingInputField: FC<ExpenseMappingInputProps> = (props: ExpenseMappingInputProps) => {
    const localAvailableBuyers = props.initialExpenseMapping
        ? props.availableBuyers
            .concat(Object.keys(props.initialExpenseMapping)
                .filter((item: string) => props.availableBuyers.indexOf(item) < 0))
        : props.availableBuyers;
    localAvailableBuyers.forEach((username: string) => props.setExpenseMappingValue(username, 1, true));

    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Expense Mapping</Text>
                <Text>(enter 0 to un-relate)</Text>
            </Box>
            <Box my={2}>
                <FullWidthTable>
                    <tbody>
                    {
                        localAvailableBuyers.map((username: string) => {
                            return (
                                <tr>
                                    <UserNameTd>{username}</UserNameTd>
                                    <MappingTd>
                                        {
                                            props.initialExpenseMapping ? (
                                                <FullWidthInput required type="number" step={1} min={0} defaultValue={
                                                    Object.keys(props.initialExpenseMapping).indexOf(username) > -1
                                                        ? (props.initialExpenseMapping[username])
                                                        : 0
                                                }
                                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                                    props.setExpenseMappingValue(username, event.target.valueAsNumber, false)}/>
                                            ) : (
                                                <FullWidthInput required type="number" step={1} min={0} defaultValue={1}
                                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                                    props.setExpenseMappingValue(username, event.target.valueAsNumber, false)}/>
                                            )
                                        }
                                    </MappingTd>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </FullWidthTable>
            </Box>
        </Flex>
    );
};

export default ExpenseMappingInputField;