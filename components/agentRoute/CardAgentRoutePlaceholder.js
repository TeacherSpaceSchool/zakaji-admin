import React from 'react';
import { connect } from 'react-redux'
import cardStyle from '../../src/styleMUI/agentRoute/cardAgentRoute'
import Skeleton from '@material-ui/lab/Skeleton';

const CardAgentRoutePlaceholder = React.memo(() => {
    const classes = cardStyle();
    return (
        <div className={classes.card} style={{height: 161}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardAgentRoutePlaceholder)