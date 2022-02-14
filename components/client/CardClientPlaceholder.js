import React from 'react';
import { connect } from 'react-redux'
import cardStyle from '../../src/styleMUI/client/cardClient'
import Skeleton from '@material-ui/lab/Skeleton';

const CardClientPlaceholder = React.memo((props) => {
    const classes = cardStyle();
    const { isMobileApp } = props.app;
    const height = 140
    return (
        <div className={isMobileApp?classes.cardM:classes.cardD} style={{height: height}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardClientPlaceholder)