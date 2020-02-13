import React, {FC, useContext, useEffect} from "react";
import {Box, Button, Flex} from "rebass";

import ReloadIcon from '../img/sync-solid.svg';
import {actionColor, shadowColor} from "../styles/Colors";
import styled from "styled-components";
import {RestPurchase, RestUser} from "../api/api";
import {AuthContext, purchaseApi, userApi} from "../api/Loading";
import {notify} from "react-notify-toast";

const ButtonWithShadow = styled(Button)`
  cursor: pointer;
  box-shadow: 0 0 3px ${shadowColor};
`;

interface ReloaderProps {
    setUsers: (users: RestUser[]) => void;
    setAllPurchases: (purchases: RestPurchase[]) => void;
}

const Reloader: FC<ReloaderProps> = (props: ReloaderProps) => {
    const authContext = useContext(AuthContext);

    const reloadUsers = (): void => {
        userApi.getAllUsersUsingPOST(authContext.getAuthType()!).then((response) => {
            if (response.response.statusCode === 200) {
                props.setUsers(response.body);
            } else if (response.response.statusCode === 401) {
                notify.show('Invalid credentials. Please re-log.', 'error', 5000);
            } else {
                notify.show('Server/Network/Application error when loading users.', 'error', 5000);
            }
        }).catch(() => {
            notify.show('Server/Network/Application error when loading users.', 'error', 5000);
        });
    };
    const reloadPurchases = ():void => {
        purchaseApi.getPurchasesUsingPOST(authContext.getAuthType()!).then((response) => {
            if (response.response.statusCode === 200) {
                props.setAllPurchases(response.body);
            } else if (response.response.statusCode === 401) {
                notify.show('Invalid credentials. Please re-log.', 'error', 5000);
            } else {
                notify.show('Server/Network/Application error when loading purchases.', 'error', 5000);
            }
        }).catch(() => {
            notify.show('Server/Network/Application error when loading purchases.', 'error', 5000);
        });
    };

    const reloadAll = (): void => {
        reloadUsers();
        reloadPurchases();
        notify.show('App data has been reloaded.', 'success', 1500);
    };

    useEffect(() => {
        reloadAll();
    }, [authContext]);

    return (
        <Flex p={2}>
            <Box width={1}>
                <ButtonWithShadow width={1} bg={actionColor} onClick={reloadAll}>
                    <img src={ReloadIcon} alt="Reload" width={20} height={20} />
                </ButtonWithShadow>
            </Box>
        </Flex>
    );
};

export default Reloader;