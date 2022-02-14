import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';

export const getConnectionApplications = async(element, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: element,
                query: gql`
                    query ($skip: Int, $filter: String) {
                        connectionApplications(skip: $skip, filter: $filter) {
                            _id
                            createdAt
                            name
                            phone
                            address
                            whereKnow
                            taken
                        }
                        filterConnectionApplication {
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

export const getConnectionApplicationsSimpleStatistic = async(element, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: element,
                query: gql`
                    query ($filter: String) {
                        connectionApplicationsSimpleStatistic(filter: $filter) 
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const addConnectionApplication = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($name: String!, $phone: String!, $address: String!, $whereKnow: String!) {
                        addConnectionApplication(name: $name, phone: $phone, address: $address, whereKnow: $whereKnow) {
                            data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const acceptConnectionApplication = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!) {
                        acceptConnectionApplication(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteConnectionApplication = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteConnectionApplication(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}