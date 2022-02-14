import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    cardM: {
        width: 'calc(100vw - 20px)',
        marginBottom: 10,
        position: 'relative'
    },
    cardD: {
        width: 400,
        margin: 10,
        position: 'relative'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
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
    mediaM: {
        objectFit: 'cover',
        height: 'calc((100vw - 20px) / 3)',
        width: 'calc(100vw - 20px)'
    },
    mediaD: {
        objectFit: 'cover',
        height: 200,
        width: 400,
        cursor: 'pointer'
    },
})