import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const outXMLShoros = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {...arg},
                query: gql`
                    query ($search: String!, $filter: String!, $skip: Int, $organization: ID!) {
                        outXMLShoros(search: $search, filter: $filter, skip: $skip, organization: $organization) {
                            _id
                            createdAt
                            guid
                            date
                            number
                            client
                            agent
                            forwarder
                            status
                            exc
                        }
                        filterOutXMLShoro {
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

export const statisticOutXMLShoros = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {...arg},
                query: gql`
                    query($organization: ID!){
                        statisticOutXMLShoros(organization: $organization)
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const statisticOutXMLReturnedShoros = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {...arg},
                query: gql`
                    query($organization: ID!){
                        statisticOutXMLReturnedShoros(organization: $organization)
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const outXMLReturnedShoros = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {...arg},
                query: gql`
                    query ($search: String!, $filter: String!, $skip: Int, $organization: ID!) {
                        outXMLReturnedShoros(search: $search, filter: $filter, skip: $skip, organization: $organization) {
                            _id
                            createdAt
                            guid
                            date
                            number
                            client
                            agent
                            forwarder
                            status
                            exc
                        }
                        filterOutXMLShoro {
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

export const restoreOutXMLShoro = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: ID!) {
                        restoreOutXMLShoro(_id: $_id) {
                            _id
                            createdAt
                            guid
                            date
                            number
                            client
                            agent
                            forwarder
                            status
                            exc
                        }
                    }`})
        return res.data.restoreOutXMLShoro
    } catch(err){
        console.error(err)
    }
}

export const setDateOutXMLShoro = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: ID!, $date: String!) {
                        setDateOutXMLShoro(_id: $_id, date: $date) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteOutXMLShoro = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteOutXMLShoro(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteOutXMLShoroAll = async(organization)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {organization: organization},
            mutation : gql`
                    mutation ($organization: ID!) {
                        deleteOutXMLShoroAll(organization: $organization) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const restoreOutXMLReturnedShoro = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: ID!) {
                        restoreOutXMLReturnedShoro(_id: $_id) {
                            _id
                            createdAt
                            guid
                            date
                            number
                            client
                            agent
                            forwarder
                            status
                            exc
                        }
                    }`})
        return res.data.restoreOutXMLReturnedShoro
    } catch(err){
        console.error(err)
    }
}

export const setDateOutXMLReturnedShoro = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: ID!, $date: String!) {
                        setDateOutXMLReturnedShoro(_id: $_id, date: $date) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteOutXMLReturnedShoro = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteOutXMLReturnedShoro(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteOutXMLReturnedShoroAll = async(organization)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {organization: organization},
            mutation : gql`
                    mutation($organization: ID!) {
                        deleteOutXMLReturnedShoroAll(organization: $organization) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}