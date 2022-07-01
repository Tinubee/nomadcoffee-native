import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const TOKEN = "token";
const USERNAME = "username";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const usernameVar = makeVar("");

export const logUserIn = async (token, username) => {
  try {
    //await AsyncStorage.setItem(TOKEN, token);
    await AsyncStorage.multiSet([
      [TOKEN, token],
      [USERNAME, username],
    ]);
    isLoggedInVar(true);
    tokenVar(token);
    usernameVar(username);
  } catch (error) {
    console.error(error);
  }
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN, USERNAME]);
    client.clearStore();
    isLoggedInVar(false);
    tokenVar(null);
    usernameVar(null);
  } catch (error) {
    console.log(error);
  }
};
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: offsetLimitPagination(),
      },
    },
    User: {
      keyFields: (obj) => `User:${obj.username}`,
    },
  },
});

const uploadHttpLink = createUploadLink({
  uri: "https://tinubee-nomadcoffee-backend.herokuapp.com/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
