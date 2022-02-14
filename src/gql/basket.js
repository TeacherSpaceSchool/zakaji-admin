import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const deleteBasketAll = async(client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        await client.mutate({
            mutation : gql`
                    mutation{
                        deleteBasketAll{
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addBasket = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($item: ID!, $count: Int!, $consignment: Int) {
                        addBasket(item: $item, count: $count, consignment: $consignment) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}