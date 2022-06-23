import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    page: {
        margin: '10px'
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
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
        width: 80,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'Roboto',
        color: '#A0A0A0'
    },
    info: {
        color: '#455A64',
        marginBottom: 10,
        fontSize: '1rem',
        fontFamily: 'Roboto',
        whiteSpace: 'pre-wrap'
    },
    geo: {
        width: 170,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 20,
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

})