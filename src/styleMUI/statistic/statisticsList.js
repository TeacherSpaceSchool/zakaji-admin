import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    page: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    cardM: {
        width: 'calc(100vw - 40px)',
        marginBottom: 20
    },
    cardD: {
        width: 400,
        margin: 10
    },
    input: {
        width: '100%',
    },
    line: {
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})