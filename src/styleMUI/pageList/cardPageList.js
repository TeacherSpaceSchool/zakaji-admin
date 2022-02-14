import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    cardM: {
        width: 'calc(100vw - 20px)',
        marginBottom: 10
    },
    cardD: {
        width: 400,
        margin: 10
    },
    mediaM: {
        objectFit: 'cover',
        height: 'calc(100vw / 3)',
        width: 'calc(100vw - 20px)'
    },
    mediaD: {
        objectFit: 'cover',
        height: 200,
        width: 400,
        cursor: 'pointer'
    },
    inputM: {
        width: 'calc(100vw - 32px)',
    },
    inputD: {
        width: 400-32,
    },
})