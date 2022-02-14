import React from 'react';
import { connect } from 'react-redux'
import cardCategoryStyle from '../../src/styleMUI/subscriber/cardSubscriber'
import Skeleton from '@material-ui/lab/Skeleton';

const CardSubscriberPlaceholder = React.memo((props) => {
    const classes = cardCategoryStyle();
    const { height } = props;
    return (
        <div className={classes.card} style={{height: height}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardSubscriberPlaceholder)