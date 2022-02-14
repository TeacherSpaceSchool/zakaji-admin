export let urlGQL
export let urlGQLws
export let urlMain
export let urlSubscribe
export let applicationKey
export let urlGQLSSR
if(process.env.URL==='azyk.store') {
    urlGQLSSR = `http://localhost:4000/graphql`
    urlGQL = `https://${process.env.URL}:3000/graphql`
    urlGQLws = `wss://${process.env.URL}:3000/graphql`
    urlSubscribe = `https://${process.env.URL}:3000/subscribe`
    urlMain = `https://${process.env.URL}`
    applicationKey = 'BDbYgfB_0iu1aqu7AHHTervMZnvSjYQtZsm-kKCQ9NH58DU-iRKDk0U-tiio1NzHi25ceaatYrM4c6Oqj1KvnXM'
}
else {
    urlGQLSSR = `http://localhost:3000/graphql`
    urlGQL = `http://${process.env.URL}:3000/graphql`
    urlGQLws = `ws://${process.env.URL}:3000/graphql`
    urlMain = `http://${process.env.URL}`
    urlSubscribe = `http://${process.env.URL}:3000/subscribe`
    applicationKey = 'BK-3F2fhksf0HPhIXEp9gZ0y1jaR7pyq_i3mEIIimN1IIEwsAeZBz6Iv7WZRhKMr7o-3spBGpZ0XY1WlwCD7Sfc'
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
