import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    page: {
        margin: '10px'
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
    row:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    column:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
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
    mediaM: {
        objectFit: 'cover',
        height: 'calc((100vw - 20px) / 2)',
        width: 'calc(100vw - 20px)'
    },
    mediaD: {
        objectFit: 'cover',
        height: 'calc((100vw - 392px) / 2)',
        width: '100%'
    },
    mediaPrize: {
        objectFit: 'cover',
        height: 50,
        width: 50,
        marginRight: 10,
    },
    input: {
        width: '100%',
    },
    inputPrize: {
        marginBottom: 20,
        marginRight: 10,
        width: 'calc((100% - 154px)/2)',
    },
    inputPhotoReports: {
        marginBottom: 20,
        marginRight: 10,
        width: 'calc(100% - 154px)',
    },
    fab: {
        position: 'fixed!important',
        bottom: '20px',
        right: '20px'
    },
    countdown: {
        fontSize: '0.75rem',
        fontWeight: 'bold',
        width: 'calc(100% - 121px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})