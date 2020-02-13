import React, {ChangeEvent, FC, useContext, useState} from "react";
import {AuthContext} from "../api/Loading";
import {Box, Flex, Text} from "rebass";
import styled from "styled-components";
import {actionColor, shadowColor} from "../styles/Colors";
import {ButtonWithShadow} from "../styles/Components";
import {userApi} from "../api/Loading";
import {notify} from "react-notify-toast";
import {Route} from "../App";


const BoxWithShadow = styled(Box)`
  box-shadow: 0 0 5px ${shadowColor};
  border-radius: 4px;
`;

interface AuthenticationProps {
    setRoute: (route: Route) => void;
}

const Authentication: FC<AuthenticationProps> = (props: AuthenticationProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const authContext = useContext(AuthContext);

    const setUsernameFromEventValue = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    };

    const setPasswordFromEventValue = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const attemptLogin = () => {
        userApi.isAuthorizedUsingPOST({username: username, password: password}).then((response) => {
            if (response.response.statusCode === 200) {
                if (response.body) {
                    authContext.setAuthType(username, password);
                    notify.show('Login successful!', 'success', 1000);
                    props.setRoute('list');
                } else {
                    notify.show('Wrong credentials!', 'error', 5000);
                }
            } else {
                notify.show('Application error.', 'error', 5000);
            }
        }).catch((reject) => {
            notify.show('Server/Network/Application error.', 'error', 5000);
        });
    };


    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            attemptLogin();
        }}>
            <Flex flexDirection="column" p={2}>
                <BoxWithShadow my={2} p={2}>
                    <Flex justifyContent="center">
                        <Box>
                            <Text>Username</Text>
                            <input required type="text" placeholder="Username" onChange={setUsernameFromEventValue}/>
                        </Box>
                    </Flex>
                </BoxWithShadow>
                <BoxWithShadow my={2} p={2}>
                    <Flex justifyContent="center">
                        <Box>
                            <Text>Password</Text>
                            <input required type="password" placeholder="Password" onChange={setPasswordFromEventValue}/>
                        </Box>
                    </Flex>
                </BoxWithShadow>
                <Box p={1}>
                    <ButtonWithShadow type="submit" bg={actionColor} >
                        Login
                    </ButtonWithShadow>
                </Box>
            </Flex>
        </form>
    );
};

export default Authentication;