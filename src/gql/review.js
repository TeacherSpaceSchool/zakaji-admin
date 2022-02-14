import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';

export const getReviews = async(element, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: element,
                query: gql`
                    query ($organization: ID, $skip: Int, $filter: String) {
                        reviews(organization: $organization, skip: $skip, filter: $filter) {
                            _id
                            createdAt
                            organization {_id name}
                            client {_id name}
                            taken
                            type
                            text
                        }
                        filterReview {
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

export const addReview = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($organization: ID!, $text: String!, $type: String!) {
                        addReview(organization: $organization, text: $text, type: $type) {
                            _id
                            createdAt
                            organization {_id name}
                            client {_id name}
                            taken
                            type
                            text
                        }
                    }`})
        return res.data.addReview
    } catch(err){
        console.error(err)
    }
}

export const acceptReview = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!) {
                        acceptReview(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteReview = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteReview(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}