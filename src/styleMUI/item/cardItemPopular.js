import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    card: {
        height: 152,
        margin: 10,
        position: 'relative',
        background: 'white',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15
    },
    mediaPopular: {
        height: 100,
        objectFit: 'contain',
        marginBottom: 10,
        cursor: 'pointer'
    },
    namePopular: {
        color: 'black',
        fontSize: '0.6875rem',
        fontFamily: 'Roboto',
        height: 33,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        textAlign: 'center',
        cursor: 'pointer',
        marginBottom: 3
    },
    chipList: {
        position: 'absolute',
        top: 5,
        left: 5,
        display: 'flex',
        flexDirection: 'column'
    },
    chip: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontFamily: 'Roboto',
        width: 60,
        height: 16,
        marginBottom: 5
    },
})