import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getTemplateForms = async({search, organization, skip}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, organization, skip},
                query: gql`
                    query ($search: String!, $organization: ID, $skip: Int) {
                        templateForms(search: $search, organization: $organization, skip: $skip) {
                            _id
                            createdAt
                            title
                            organization
                                {_id name}
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getTemplateForm = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        templateForm(_id: $_id) {
                            _id
                            createdAt
                            title
                            organization
                                {_id name}
                            editorEmployment
                            editorClient
                            edit
                            questions
                                {formType question answers obligatory}
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getAnalysisForms = async({templateForm}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {templateForm},
                query: gql`
                    query ($templateForm: ID!) {
                        analysisForms(templateForm: $templateForm) {
                            editor
                                {_id name count}
                            questions
                                {_id answers {_id count}}
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getForms = async({templateForm, search, skip}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {templateForm, search, skip},
                query: gql`
                    query ($templateForm: ID!, $search: String!, $skip: Int) {
                        forms(templateForm: $templateForm, search: $search, skip: $skip) {
                            _id
                            createdAt
                            client
                                {_id name address}
                            agent
                                {_id name}
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const getForm = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        form(_id: $_id) {
                            _id
                            createdAt
                            client
                                {_id name}
                            questions
                                {formType question answer answers obligatory}
                        }
                    }`,
            })
        return res.data
    } catch(err){
        console.error(err)
    }
}

export const deleteTemplateForm = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteTemplateForm(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteForm = async(ids)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id: ids},
            mutation : gql`
                    mutation ($_id: [ID]!) {
                        deleteForm(_id: $_id) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addTemplateForm = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($title: String!, $organization: ID!, $editorEmployment: Boolean!, $editorClient: Boolean!, $edit: Boolean!, $questions: [QuestionFormInput]!) {
                        addTemplateForm(title: $title, organization: $organization, editorEmployment: $editorEmployment, editorClient: $editorClient, edit: $edit, questions: $questions) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const setTemplateForm = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $title: String, $editorEmployment: Boolean, $editorClient: Boolean, $edit: Boolean, $questions: [QuestionFormInput]!) {
                        setTemplateForm(_id: $_id, title: $title, editorEmployment: $editorEmployment, editorClient: $editorClient, edit: $edit, questions: $questions) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addForm = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($templateForm: ID!, $client: ID!, $questions: [QuestionFormInput]!) {
                        addForm(templateForm: $templateForm, client: $client, questions: $questions) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const setForm = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $questions: [QuestionFormInput]!) {
                        setForm(_id: $_id, questions: $questions) {
                             data
                        }
                    }`})
    } catch(err){
        console.error(err)
    }
}
