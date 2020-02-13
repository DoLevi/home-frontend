import React, {FC, useContext, useState} from "react";
import {Box, Flex} from "rebass";
import PurchaseForm from "./PurchaseForm";
import {RestPurchase} from "../../api/api";
import {AuthContext, purchaseApi} from "../../api/Loading";
import {notify} from "react-notify-toast";


interface CreatePageProps {
    availableBuyers: string[];
}

const CreatePage: FC<CreatePageProps> = (props: CreatePageProps) => {
    const authContext = useContext(AuthContext);
    const [initialPurchase, setInitialPurchase] = useState<RestPurchase>(new RestPurchase());

    const postPurchases = (purchases: RestPurchase[]): void => {
        purchaseApi.createPurchaseUsingPOST({
            'authType': authContext.getAuthType(),
            'requestObject': purchases,
        }).then((response) => {
            if (response.response.statusCode === 200) {
                // Reset form on success (somehow doesn't work)
                setInitialPurchase(new RestPurchase());
                notify.show('Purchase was registered.', 'success', 1500);
            } else if (response.response.statusCode === 401) {
                notify.show('Invalid credentials. Please re-log.', 'error', 5000);
            } else {
                notify.show('Server/Network/Application error when registering purchase.', 'error', 5000);
            }
        }).catch(() => {
            notify.show('Server/Network/Application error when registering purchase.', 'error', 5000);
        });
    };

    return (
        <Flex justifyContent="center">
            <Box>
                <PurchaseForm availableBuyers={props.availableBuyers} setPurchases={postPurchases}
                              initialPurchase={initialPurchase} />
            </Box>
        </Flex>
    );
};

export default CreatePage;