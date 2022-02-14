import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    card: {
        width: 280,
        margin: 10,
        position: 'relative'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    media: {
        height: 180,
        width: 180,
        objectFit: 'contain',
        marginBottom: 20,
        cursor: 'pointer'
    },
    name: {
        color: 'black',
        fontSize: '0.95rem',
        fontFamily: 'Roboto',
        height: 40,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: 10,
        wordBreak: 'break-all',
        textAlign: 'center',
        cursor: 'pointer',
    },
    price: {
        fontWeight: 'bold',
        fontSize: '1.3rem',
        fontFamily: 'Roboto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: 10,
        cursor: 'pointer'
    },
    crossedPrice: {
        color: '#C0C0C0',
        textDecoration: 'line-through',
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'Roboto',
        width: 70,
        marginRight: 3,
        marginTop: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'right',
        marginBottom: 10
    },
    button: {
        height: 50,
        width: 50,
        cursor: 'pointer'
    },
    buttonToggle: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 10,
        right: 10,
        cursor: 'pointer'
    },
    chipList: {
        position: 'absolute',
        top: 5,
        left: 5,
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        width: '100%',
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