import React, {ChangeEvent, FC} from "react";
import {Box, Flex, Text} from "rebass";


interface DateBoughtInputProps {
    initialDateBought?: string;
    setDateBought: (date: Date) => void;
}

const DateBoughtInputField: FC<DateBoughtInputProps> = (props: DateBoughtInputProps) => {
    return (
        <Flex flexDirection="column">
            <Box my={2}>
                <Text>Date bought</Text>
            </Box>
            <Box my={2}>
                <input type="date" placeholder="Date bought" required defaultValue={props.initialDateBought}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => props.setDateBought(event.target.valueAsDate!)} />
            </Box>
        </Flex>
    );
};

export default DateBoughtInputField;