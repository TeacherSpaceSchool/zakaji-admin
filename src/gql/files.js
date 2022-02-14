import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';

export const getFiles = async(filter, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {filter},
                query: gql`
                    query ($filter: String!) {
                        files(filter: $filter) {
                            name
                            url
                            size
                            createdAt
                            active
                            owner
                        }
                        filterFile {
                            name
                           value
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const clearAllDeactiveFiles = async()=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            mutation : gql`
                    mutation {
                        clearAllDeactiveFiles {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}
