import React, {FC, useContext} from "react";
import {Box, Flex} from "rebass";
import {actionColor} from "../styles/Colors";
import {ButtonWithShadow} from "../styles/Components";
import {AuthContext} from "../api/Loading";
import {Route} from "../App";

interface NavigatorProps {
    setRoute: (route: Route) => void;
}

const Navigator: FC<NavigatorProps> = (props: NavigatorProps) => {
    const authContext = useContext(AuthContext);

    return (
        <Flex flexWrap="wrap" justifyContent="space-between" mt={2} p={2}>
            <Box>
                <ButtonWithShadow bg={actionColor} onClick={() => {
                    authContext.resetAuthType();
                    props.setRoute('login');
                }}>
                    { authContext.isAuthorized() ? 'Logout' : 'Login' }
                </ButtonWithShadow>
            </Box>
            <Box>
                <ButtonWithShadow bg={actionColor} onClick={() => {
                    if (authContext.isAuthorized()) {
                        props.setRoute('create');
                    }
                }}>
                    Create
                </ButtonWithShadow>
            </Box>
            <Box>
                <ButtonWithShadow bg={actionColor} onClick={() => {
                    if (authContext.isAuthorized()) {
                        props.setRoute('list');
                    }
                }}>
                    List
                </ButtonWithShadow>
            </Box>
        </Flex>
    );
};

export default Navigator;