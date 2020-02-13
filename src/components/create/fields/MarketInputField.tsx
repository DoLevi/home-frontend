import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";
import styled from "styled-components";


interface MarketInputProps {
    initialMarket?: string;
    setMarket: (market: string) => void;
}

const FullWidthInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 26px;
`;

const MarketInputField: FC<MarketInputProps> = (props: MarketInputProps) => {
    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Market</Text>
            </Box>
            <Box my={2}>
                <FullWidthInput type="text" placeholder="Market" required defaultValue={props.initialMarket}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => props.setMarket(event.target.value)} />
            </Box>
        </Flex>
    );
};

export default MarketInputField;