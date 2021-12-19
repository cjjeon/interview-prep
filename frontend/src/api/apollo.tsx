import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { API_URL } from "../constant/configs"
import { setContext } from "@apollo/client/link/context"
import { useAuth0 } from "@auth0/auth0-react"

const httpLink = createHttpLink({
    uri: `${API_URL}/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
    const { getAccessTokenSilently } = useAuth0()
    const token = getAccessTokenSilently()

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    }
})

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
})
