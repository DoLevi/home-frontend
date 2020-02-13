import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";
import styled from "styled-components";


interface BuyerInputProps {
    initialBuyer?: string;
    availableBuyers: string[];
    setSelectedBuyer: (username: string) => void;
}

const FullWidthSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
  height: 26px;
`;

const BuyerInputField: FC<BuyerInputProps> = (props: BuyerInputProps) => {
    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Buyer</Text>
            </Box>
            <Box my={2}>
                <FullWidthSelect required placeholder="Buyer"
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => props.setSelectedBuyer(event.target.value)}>
                    <option value={props.initialBuyer}>{props.initialBuyer}</option>
                    {
                        props.availableBuyers.filter((username: string) => username !== props.initialBuyer)
                            .map((username: string) => {
                            return (
                                <option value={username}>{username}</option>
                            );
                        })
                    }
                </FullWidthSelect>
            </Box>
        </Flex>
    );
};

export default BuyerInputField;