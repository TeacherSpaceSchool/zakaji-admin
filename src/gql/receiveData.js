import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';

export const getReceivedDatas = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: arg,
                query: gql`
                    query ($search: String!, $filter: String!, $organization: ID!) {
                        receivedDatas(search: $search, filter: $filter, organization: $organization) {
                            _id
                            createdAt
                            guid
                            name
                            addres
                            agent
                            phone
                            type
                            position
                            status
                            organization {name}
                        }
                        filterReceivedData {
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

export const deleteReceivedData = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_ids: ids},
            mutation : gql`
                    mutation ($_ids: [ID]!) {
                        deleteReceivedData(_ids: $_ids) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addReceivedDataClient = async(id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id: id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        addReceivedDataClient(_id: $_id) {
                             data
                        }
                    }`})
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const clearAllReceivedDatas = async(organization)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {organization: organization},
            mutation : gql`
                    mutation($organization: ID!) {
                        clearAllReceivedDatas(organization: $organization) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}