import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";
import styled from "styled-components";


interface PriceInputProps {
    initialPrice?: number;
    setPrice: (price: number) => void;
}

const FullWidthInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 26px;
`;

const PriceInputField: FC<PriceInputProps> = (props: PriceInputProps) => {
    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Price</Text>
            </Box>
            <Box my={2}>
                <FullWidthInput type="number" step={0.01} placeholder="Price" required defaultValue={props.initialPrice}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => props.setPrice(event.target.valueAsNumber)} />
            </Box>
        </Flex>
    );
};

export default PriceInputField;