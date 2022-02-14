import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    pageM: {
        margin: '10px',
        position: 'relative',
        paddingBottom: 100
    },
    pageD: {
        margin: '10px',
        position: 'relative',
        paddingBottom: 100
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
    },
    column:{
        display: 'flex',
        flexDirection: 'column',
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
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '16px',
        fontFamily: 'Roboto',
        color: '#A0A0A0'
    },
    input: {
        margin: 10,
        width: 'calc(100% - 20px)',
    },
    inputHalf: {
        margin: 10,
        width: 'calc(50% - 20px)'
    },
    inputThird: {
        margin: 10,
        width: 'calc((100% / 3) - 20px)'
    },
    status: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 4,
        borderRadius: 10,
        fontSize: '0.815rem',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto',
    },
    selectType: {
        width: 100,
        textAlign: 'center',
        margin: 10,
        padding: 4,
        cursor: 'pointer',
        borderRadius: 10,
        fontSize: '1rem',
        color: 'black',
        fontFamily: 'Roboto',
        border: '1px solid black'
    },
    bottomRouteD: {
        width: 'calc(100vw - 300px)',
        borderTop: '1px #aeaeae solid',
        background: '#fff',
        height: 70,
        position: 'fixed',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 16,
        paddingRight: 16,
        zIndex: 10000
    },
    bottomRouteM: {
        width: '100vw',
        borderTop: '1px #aeaeae solid',
        background: '#fff',
        height: 70,
        position: 'fixed',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 16,
        paddingRight: 16,
        zIndex: 10000
    },
    fab: {
        position: 'fixed!important',
        bottom: '20px',
        right: '20px'
    },
    listInvoices: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
    },
})