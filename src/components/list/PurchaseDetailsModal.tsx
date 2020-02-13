import React, {FC, useContext, useState} from "react";
import {RestPurchase} from "../../api/api";
import Modal from "react-responsive-modal";
import {Box, Flex, Text} from "rebass";
import PurchaseDetails from "./PurchaseDetails";
import PurchaseForm from "../create/PurchaseForm";
import {AuthContext, purchaseApi} from "../../api/Loading";
import {notify} from "react-notify-toast";


interface PurchaseDetailsModalProps {
    isVisible: boolean;
    onHide: () => void;
    purchase: RestPurchase | undefined;
    availableBuyers: string[];
}

const PurchaseDetailsModal: FC<PurchaseDetailsModalProps> = (props: PurchaseDetailsModalProps) => {
    const authContext = useContext(AuthContext);
    const [editingPurchase, setEditingPurchase] = useState<RestPurchase | undefined>(undefined);

    if (!props.isVisible) {
        return <></>;
    }

    const modalStyle = {
        'modal': {
            maxWidth: '90%'
        } as React.CSSProperties
    };

    const updatePurchases = (purchases: RestPurchase[]): void => {
        purchaseApi.updatePurchaseUsingPUT({
            'authType': authContext.getAuthType(),
            'requestObject': purchases,
        }).then((response) => {
            if (response.response.statusCode === 200) {
                // Close form on success
                setEditingPurchase(undefined);
            } if (response.response.statusCode === 401) {
                notify.show('Invalid credentials. Please re-log.', 'error', 5000);
            } else if (response.response.statusCode !== 200) {
                notify.show('Server/Network/Application error when updating purchase.', 'error', 5000);
            }
        }).catch(() => {
            notify.show('Server/Network/Application error when updating purchase.', 'error', 5000);
        });
    };

    return (
        <Modal open={props.isVisible} showCloseIcon animationDuration={750} styles={modalStyle} onClose={() => {
            props.onHide();
            setEditingPurchase(undefined);
        }}>
            <Flex flexWrap="wrap">
                <Box overflow="auto">
                    <Text pb={3}><b>{!!editingPurchase ? 'Edit' : 'Details'} for Purchase #{props.purchase!.id}</b></Text>
                    {
                        !!editingPurchase ? (
                            <PurchaseForm availableBuyers={props.availableBuyers} setPurchases={updatePurchases}
                                          initialPurchase={props.purchase} />
                        ) : (
                            <PurchaseDetails purchase={props.purchase!} triggerEdit={() => setEditingPurchase(props.purchase)}/>
                        )
                    }
                </Box>
            </Flex>
        </Modal>
    );
};

export default PurchaseDetailsModal;