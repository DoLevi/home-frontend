import React, {useContext, useState} from 'react';
import './App.css';
import {Box, Flex, Text} from "rebass";
import Navigator from "./components/Navigator";
import Authentication from "./components/Authentication";
import Reloader from "./components/Reloader";
import Notification from "react-notify-toast";
import CreatePage from "./components/create/CreatePage";
import ListPage from "./components/list/ListPage";
import {AuthContext} from "./api/Loading";
import {RestPurchase, RestUser} from "./api/api";

export type Route = 'login' | 'create' | 'list';

const App = () => {
    const authContext = useContext(AuthContext);

    const [route, setRoute] = useState<Route>('login');
    const [allUsers, setAllUsers] = useState<RestUser[]>([]);
    const [allPurchases, setAllPurchases] = useState<RestPurchase[]>([]);

      return (
          <AuthContext.Provider value={authContext}>
            <Notification />

            <Flex flexWrap="wrap" flexDirection="column">
              <Box>
                <Navigator setRoute={setRoute} />
              </Box>
              {
                  authContext.isAuthorized() &&
                  <Box>
                      <Reloader setUsers={setAllUsers} setAllPurchases={setAllPurchases} />
                  </Box>
              }
              <Box>
                  {
                      route === 'login' || !authContext.isAuthorized() ? (
                          <Authentication setRoute={setRoute} />
                      ) : (route === 'create' ? (
                          <CreatePage availableBuyers={allUsers.map((user: RestUser) => user.username!)} />
                      ) : (route === 'list' ? (
                          <ListPage availablePurchases={allPurchases}
                                    availableBuyers={allUsers.map((user: RestUser) => user.username!)} />
                      ) : (
                          <Text>A programmer made a serious mistake.</Text>
                      )))
                  }

              </Box>
            </Flex>
          </AuthContext.Provider>
      );
};

export default App;
