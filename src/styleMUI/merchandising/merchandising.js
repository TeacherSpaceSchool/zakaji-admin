import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
    page: {
        margin: '10px'
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    slider1:{
        marginBottom: 25,
        marginLeft: 10,
        width: '300px !important',
    },
    box:{
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
    value: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: '1rem',
        fontFamily: 'Roboto',
        wordBreak: 'break-all'
    },
    input: {
        marginBottom: 10,
        width: '100%',
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
    gridList: {
        flexWrap: 'nowrap !important',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: 'white',
    },
    titleBar: {
        background: 'rgba(0,0,0,0.5)'
    },

}))