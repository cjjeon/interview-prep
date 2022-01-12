import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client"
import { API_URL } from "../constant/configs"
import { setContext } from "@apollo/client/link/context"
import { createUploadLink } from "apollo-upload-client"

const AuthApolloProvider: React.FC = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()

    const uploadLink = createUploadLink({
        uri: `${API_URL}/graphql`,
    }) as unknown as ApolloLink

    const authLink = setContext((_, { headers }) => {
        return getAccessTokenSilently()
            .then((token) => {
                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${token}`,
                    },
                }
            })
            .catch((e) => {
                console.error(e)
            })
    })

    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(uploadLink),
    })
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default AuthApolloProvider
