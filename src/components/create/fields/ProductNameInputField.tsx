import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";
import styled from "styled-components";


interface ProductNameInputProps {
    initialProductName?: string;
    setProductName: (productName: string) => void;
}

const FullWidthInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 26px;
`;

const ProductNameInputField: FC<ProductNameInputProps> = (props: ProductNameInputProps) => {
    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Product Name</Text>
            </Box>
            <Box my={2}>
                <FullWidthInput type="text" required placeholder="Product Name" defaultValue={props.initialProductName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => props.setProductName(event.target.value)}/>
            </Box>
        </Flex>
    );
};

export default ProductNameInputField;