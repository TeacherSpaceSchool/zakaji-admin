export let urlGQL
export let urlGQLws
export let urlMain
export let urlSubscribe
export let applicationKey
export let urlGQLSSR
if(process.env.URL==='zakaji.kg') {
    urlGQLSSR = `http://localhost:4000/graphql`
    urlGQL = `https://${process.env.URL}:3000/graphql`
    urlGQLws = `wss://${process.env.URL}:3000/graphql`
    urlSubscribe = `https://${process.env.URL}:3000/subscribe`
    urlMain = `https://${process.env.URL}`
    applicationKey = 'BOiWaJnJhA0NXMN0lW8fDtGbSG1cbXXvNt35rHlKMjZxdyizjPZkqKmZSTAGPe8AcX0VsCVqdIgxkoVBcqZVC2I'
}
else {
    urlGQLSSR = `http://localhost:3000/graphql`
    urlGQL = `http://${process.env.URL}:3000/graphql`
    urlGQLws = `ws://${process.env.URL}:3000/graphql`
    urlMain = `http://${process.env.URL}`
    urlSubscribe = `http://${process.env.URL}:3000/subscribe`
    applicationKey = 'BAMP-llC12ev90GZvYhaC6VDANTdFYkfybu-IQfTarHBXgut832yHfJnpu0RDPniVjlwgTOwXmo4puO9zXszeq8'
}

export const validMail = (mail) =>
{
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
}
export const validPhone = (phone) =>
{
    return /^[+]{1}996[0-9]{9}$/.test(phone);
}
export const checkInt = (int) => {
    return isNaN(parseInt(int))?0:parseInt(int)
}
