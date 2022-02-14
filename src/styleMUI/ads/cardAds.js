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
        height: 'calc((100vw - 20px) / 3)',
        width: 'calc(100vw - 20px)'
    },
    inputHalf: {
        marginRight: 10,
        marginLeft: 10,
        width: 'calc(50% - 20px)'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    mediaD: {
        objectFit: 'cover',
        height: 200,
        width: 600,
        cursor: 'pointer'
    },
    input: {
        width: '100%',
    },
})