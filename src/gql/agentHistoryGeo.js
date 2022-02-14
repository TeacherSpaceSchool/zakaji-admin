import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';

export const getAgentHistoryGeos = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: arg,
                query: gql`
                    query ($organization: ID, $agent: ID, $date: String) {
                        agentHistoryGeos(organization: $organization, agent: $agent, date: $date) {
                            columns
                            row 
                                {_id data}
                          }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const addAgentHistoryGeo = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($client: ID!, $geo: String!) {
                        addAgentHistoryGeo(client: $client, geo: $geo) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}