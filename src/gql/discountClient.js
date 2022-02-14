import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';
import { getReceiveDataByIndex, putReceiveDataByIndex } from '../service/idb/receiveData';

export const getDiscountClients = async({clients, organization}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: { clients: clients, organization: organization },
                query: gql`
                     query ($clients: [ID]!, $organization: ID!) {
                        discountClients(clients: $clients, organization: $organization) {
                            client
                            discount
                            organization
                         }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getDiscountClient = async({client, organization})=>{
    try{
        let res = await (new SingletonApolloClient().getClient())
            .query({
                variables: { client: client, organization: organization },
                query: gql`
                     query ($client: ID!, $organization: ID!) {
                        discountClient(client: $client, organization: $organization) {
                            client
                            discount
                            organization
                         }
                    }`,
            })
        if(new SingletonStore().getStore()&&new SingletonStore().getStore().getState().user.profile.role.includes('агент'))
            await putReceiveDataByIndex(`discountClient(client: ${client}, organization: ${organization})`, res.data)
        return res.data
    } catch(err){
        console.error(err)
        if(new SingletonStore().getStore()&&new SingletonStore().getStore().getState().user.profile.role.includes('агент'))
            return await getReceiveDataByIndex(`discountClient(client: ${client}, organization: ${organization})`)
    }
}

export const saveDiscountClients = async(clients, organization, discount)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: { clients: clients, organization: organization, discount: discount },
            mutation : gql`
                    mutation ($clients: [ID]!, $organization: ID!, $discount: Int!) {
                        setDiscountClients(clients: $clients, organization: $organization, discount: $discount) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}