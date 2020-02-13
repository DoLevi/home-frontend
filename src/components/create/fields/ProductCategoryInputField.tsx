import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";
import {ProductCategoryEnum} from "../../../api/api";
import styled from "styled-components";


interface ProductCategoryInputProps {
    initialProductCategory?: ProductCategoryEnum;
    setProductCategory: (productCategory: ProductCategoryEnum) => void;
}

const FullWidthSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
  height: 26px;
`;

const ProductCategoryInputField: FC<ProductCategoryInputProps> = (props: ProductCategoryInputProps) => {
    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Product Category</Text>
            </Box>
            <Box my={2}>
                <FullWidthSelect required placeholder="Product Category" defaultValue={props.initialProductCategory}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => props.setProductCategory(event.target.value as unknown as ProductCategoryEnum)}>
                    <option />
                    <option value={ProductCategoryEnum.FOODANDBEVERAGES}>Food & Beverages</option>
                    <option value={ProductCategoryEnum.HYGIENE}>Hygiene</option>
                    <option value={ProductCategoryEnum.ENTERTAINMENT}>Entertainment</option>
                    <option value={ProductCategoryEnum.FURNITURE}>Furniture</option>
                    <option value={ProductCategoryEnum.PRIMARYCARE}>Primary Care</option>
                    <option value={ProductCategoryEnum.OTHER}>Other</option>
                </FullWidthSelect>
            </Box>
        </Flex>
    );
};

export default ProductCategoryInputField;