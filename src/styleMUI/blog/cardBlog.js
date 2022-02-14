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
    inputM: {
        width: '100%'
    },
    shapka: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 'bold',
        width: 'calc(100% - 80px)'
    },
    date: {
        fontSize: '0.875rem',
        color: '#9697a1'
    },
})