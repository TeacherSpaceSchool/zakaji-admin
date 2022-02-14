import React from 'react';
import { connect } from 'react-redux'
import cardMerchandisingStyle from '../../src/styleMUI/merchandising/cardMerchandising'
import Skeleton from '@material-ui/lab/Skeleton';

const CardMerchandisingPlaceholder = React.memo((props) => {
    const classes = cardMerchandisingStyle();
    const { isMobileApp } = props.app;
    return (
        <div className={isMobileApp?classes.cardM:classes.cardD} style={{height: 130}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardMerchandisingPlaceholder)