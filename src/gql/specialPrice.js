import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getSpecialPriceClients = async({client, organization}, _client)=>{
    try{
        _client = _client? _client : new SingletonApolloClient().getClient()
        let res = await _client
            .query({
                variables: {client, organization},
                query: gql`
                    query ($client: ID!, $organization: ID) {
                        specialPriceClients(client: $client, organization: $organization) {
                            _id
                            createdAt
                            client {_id name address}
                            price
                            organization {_id name}
                            item {_id name}
                          }
                    }`,
            })
        return res.data.specialPriceClients
    } catch(err){
        console.error(err)
    }
}

export const getItemsForSpecialPriceClients = async({client, organization}, _client)=>{
    try{
        _client = _client? _client : new SingletonApolloClient().getClient()
        let res = await _client
            .query({
                variables: {client, organization},
                query: gql`
                    query ($client: ID!, $organization: ID) {
                        itemsForSpecialPriceClients(client: $client, organization: $organization) {
                            _id
                            name
                          }
                    }`,
            })
        return res.data.itemsForSpecialPriceClients
    } catch(err){
        console.error(err)
    }
}

export const deleteSpecialPriceClient = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteSpecialPriceClient(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addSpecialPriceClient = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($client: ID!, $organization: ID!, $price: Float!, $item: ID!) {
                        addSpecialPriceClient(client: $client, organization: $organization, price: $price, item: $item) {
                            _id
                            createdAt
                            client {_id name address}
                            price
                            organization {_id name}
                            item {_id name}
                        }
                    }`})
        return res.data.addSpecialPriceClient
    } catch(err){
        console.error(err)
    }
}

export const setSpecialPriceClient = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $price: Float!) {
                        setSpecialPriceClient(_id: $_id, price: $price) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}