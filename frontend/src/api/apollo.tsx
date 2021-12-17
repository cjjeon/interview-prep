import { ApolloClient, InMemoryCache } from "@apollo/client"
import { API_URL } from "../constant/configs"

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${API_URL}/graphql`,
})
