import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';

export const getLotterys = async(client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        lotterys {
                            image
                            text
                            date
                            _id
                          }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getLottery = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        lottery(_id: $_id) {
                            _id
                            createdAt
                            image
                            organization
                                {_id name}
                            status
                            text
                            date
                            prizes
                                {_id image name count}
                            photoReports
                                {_id image text}
                            tickets
                                {status number client {_id name address} prize}
                          }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const deleteLottery = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteLottery(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addLottery = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($image: Upload, $organization: ID, $text: String, $date: Date, $prizes: [LotteryPrizeInput]) {
                        addLottery(image: $image, organization: $organization, text: $text, date: $date, prizes: $prizes) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const getClientsForLottery = async(arg, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: arg,
                query: gql`
                    query ($lottery: ID, $search: String!) {
                        clientsForLottery(lottery: $lottery, search: $search) {
                            _id
                            image
                            createdAt
                            name
                            email
                            address
                            lastActive
                            device
                            notification
                            info
                            reiting
                            city
                            category
                            phone
                            organization 
                                {_id name}
                            user 
                                {_id role status login}
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const setLottery = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $image: Upload, $text: String, $date: Date, $tickets: [LotteryTicketInput], $prizes: [LotteryPrizeInput], $photoReports: [LotteryPhotoReportInput]) {
                        setLottery(_id: $_id, image: $image, text: $text, date: $date, tickets: $tickets, prizes: $prizes, photoReports: $photoReports) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const checkWinners = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!) {
                        checkWinners(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}