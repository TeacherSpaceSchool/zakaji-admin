import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    page: {
        margin: '10px'
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
    },
    column:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    geo: {
        width: 50,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 20,
        fontSize: '1rem',
        fontFamily: 'Roboto',
        whiteSpace: 'pre-wrap',
        cursor: 'pointer',
        borderBottom: '1px dashed #ffb300'
    },
    media: {
        objectFit: 'cover',
        maxHeight: 'calc(100vw - 72px)',
        maxWidth: 'calc(100vw - 72px)',
        height: 300,
        width: 300,
        marginRight: 10,
        marginBottom: 10,
        cursor: 'pointer'
    },
    name: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '20px',
        fontFamily: 'Roboto'
    },
    value: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: '16px',
        fontFamily: 'Roboto',
        wordBreak: 'break-all'
    },
    nameField: {
        minWidth: 80,
        maxWidth: 130,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '16px',
        fontFamily: 'Roboto',
        color: '#A0A0A0'
    },
    info: {
        color: '#455A64',
        marginBottom: 10,
        fontSize: '16px',
        fontFamily: 'Roboto',
        whiteSpace: 'pre-wrap'
    },
    inputM: {
        marginBottom: 10,
        width: 'calc(100vw - 82px)',
    },
    inputD: {
        marginBottom: 10,
        width: 'calc(100vw - 700px)'
    },
    inputDF: {
        marginBottom: 10,
        width: 'calc(100vw - 382px)'
    },

})