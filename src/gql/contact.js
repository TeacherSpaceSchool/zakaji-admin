import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getContact = async(client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        contact {
                            name
                            image
                            address
                            email
                            phone
                            info
                            social
                            warehouse
                          }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const setContact = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($warehouse: String!, $name: String!, $image: Upload, $address: [String]!, $email: [String]!, $phone: [String]!, $info: String!, $social: [String]!) {
                        setContact(warehouse: $warehouse, name: $name, image: $image, address: $address, email: $email, phone: $phone, info: $info, social: $social) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}