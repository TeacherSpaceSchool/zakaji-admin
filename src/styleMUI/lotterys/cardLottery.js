import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    cardM: {
        width: 'calc(100vw - 20px)',
        marginBottom: 10
    },
    cardD: {
        width: 600,
        margin: 10
    },
    cardDTicket: {
        width: 400,
        margin: 10
    },
    row:{
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        marginBottom: 10,
        width: '100%',
    },
    nameField: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        color: '#A0A0A0'
    },
    value: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        wordBreak: 'break-all'
    },
    column:{
        display: 'flex',
        flexDirection: 'column'
    },
    mediaM: {
        objectFit: 'cover',
        height: 'calc((100vw - 20px) / 2)',
        width: 'calc(100vw - 20px)'
    },
    mediaD: {
        objectFit: 'cover',
        height: 300,
        width: 600,
        cursor: 'pointer'
    },
    title: {
        fontSize: '0,875rem',
        fontWeight: 'bold',
        width: '100%'
    },
})