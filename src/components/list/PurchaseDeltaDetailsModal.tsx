import React, {FC} from "react";
import Modal from "react-responsive-modal";
import {modalStyle} from "../../styles/ComponentStyles";
import {Box, Flex, Text} from "rebass";
import PurchaseDeltaDetails from "./PurchaseDeltaDetails";


interface PurchaseDeltaDetailsModalProps {
    isVisible: boolean;
    onHide: () => void;
    purchaseSum: number;
    mapping: {[consumerName: string]: number};
}

const PurchaseDeltaDetailsModal: FC<PurchaseDeltaDetailsModalProps> = (props: PurchaseDeltaDetailsModalProps) => {
    if (!props.isVisible) {
        return <></>;
    }
    return (
        <Modal open={props.isVisible} onClose={props.onHide} showCloseIcon animationDuration={750} styles={modalStyle}>
            <Flex flexWrap="wrap">
                <Box>
                    <Text mb={2}><b>Your expense delta</b></Text>
                    <PurchaseDeltaDetails mapping={props.mapping}/>
                    <Text mt={2}><u>Your</u> total expenses: {props.purchaseSum.toFixed(2)}</Text>
                </Box>
            </Flex>
        </Modal>
    );
};

export default PurchaseDeltaDetailsModal;