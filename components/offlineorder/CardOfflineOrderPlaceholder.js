import React from 'react';
import { connect } from 'react-redux'
import cardCategoryStyle from '../../src/styleMUI/offlineorder/cardOfflineOrder'
import Skeleton from '@material-ui/lab/Skeleton';

const CardOfflineOrderPlaceholder = React.memo((props) => {
    const classes = cardCategoryStyle();
    const { isMobileApp } = props.app;
    return (
        <div className={isMobileApp?classes.cardM:classes.cardD} style={{height: 120}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardOfflineOrderPlaceholder)