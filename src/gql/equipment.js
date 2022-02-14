import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getEquipments = async({organization: organization, search: search, sort: sort, filter: filter}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {organization: organization, search: search, sort: sort, filter: filter},
                query: gql`
                    query ($organization: ID!, $search: String!, $sort: String!) {
                        equipments(organization: $organization, search: $search, sort: $sort) {
                            _id
                            number
                            name
                            createdAt
                            client 
                                {_id address name}
                            organization 
                                {_id name}
                          }
                          sortEquipment {
                           name
                            field
                          }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getEquipment = async({_id: _id}, client)=> {
    try {
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id: _id},
                query: gql`
                    query ($_id: ID!) {
                        equipment(_id: $_id) {
                            _id
                            number
                            name
                            createdAt
                            client 
                                {_id address name}
                            organization 
                                {_id name}
                        }
                    }`,
            })
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const getRepairEquipments = async({organization, search, filter}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {organization, search, filter},
                query: gql`
                    query ($organization: ID!, $search: String!, $filter: String!) {
                        repairEquipments(organization: $organization, search: $search, filter: $filter) {
                            _id
                            createdAt
                            number
                            status
                            equipment
                                {_id number name client {name _id address}}
                            repairMan
                                {_id name}
                            agent
                                {_id name}
                            organization
                                {_id name}
                            accept
                            done
                            cancel
                            defect
                            repair
                            dateRepair
                        }
                        filterRepairEquipment {
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

export const getRepairEquipment = async({_id: _id}, client)=> {
    try {
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id: _id},
                query: gql`
                    query ($_id: ID!) {
                        repairEquipment(_id: $_id) {
                            _id
                            createdAt
                            number
                            status
                            equipment
                                {_id number name client {name _id address}}
                            repairMan
                                {_id name}
                            agent
                                {_id name}
                            organization
                                {_id name}
                            accept
                            done
                            cancel
                            defect
                            repair
                            dateRepair
                        }
                    }`,
            })
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export const deleteEquipment = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteEquipment(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteRepairEquipment = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteRepairEquipment(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const setEquipment = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $name: String, $number: String, $client: ID) {
                        setEquipment(_id: $_id, name: $name, number: $number, client: $client) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const setRepairEquipment = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $accept: Boolean, $done: Boolean, $cancel: Boolean, $defect: [String], $repair: [String]) {
                        setRepairEquipment(_id: $_id, accept: $accept, done: $done, cancel: $cancel, defect: $defect, repair: $repair) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addEquipment = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($name: String!, $number: String!, $organization: ID, $client: ID) {
                        addEquipment(name: $name, number: $number, organization: $organization, client: $client) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addRepairEquipment = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($organization: ID, $equipment: ID!, $defect: [String]) {
                        addRepairEquipment(organization: $organization, equipment: $equipment, defect: $defect) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}