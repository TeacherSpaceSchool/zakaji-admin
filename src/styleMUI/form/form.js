import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    page: {
        margin: '10px'
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    question:{
        marginBottom: 15,
        width: '100%',
        border: '1px solid #E0E0E0',
        padding: 10
    },
    line:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    column:{
        display: 'flex',
        flexDirection: 'column',
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
        fontSize: '1.25rem',
        fontFamily: 'Roboto'
    },
    value: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: '1rem',
        fontFamily: 'Roboto',
        wordBreak: 'break-all'
    },
    nameField: {
        width: 150,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'Roboto',
        color: '#A0A0A0'
    },
    info: {
        fontSize: '0.9375rem',
        fontFamily: 'Roboto',
    },
    geo: {
        width: 170,
        textAlign: 'center',
        marginTop: -5,
        marginBottom: 10,
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        whiteSpace: 'pre-wrap',
        cursor: 'pointer',
        borderBottom: '1px dashed #004C3F'
    },
    doc: {
        marginBottom: 10,
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#A0A0A0'
    },
    docUrl: {
        marginBottom: 10,
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    input: {
        marginBottom: 10,
        width: '100%',
    },
    halfInput: {
        marginBottom: 10,
        width: 'calc(100% - 168px)',
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

})