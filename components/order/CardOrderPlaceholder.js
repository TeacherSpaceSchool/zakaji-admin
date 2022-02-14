import React from 'react';
import cardStyle from '../../src/styleMUI/orders/cardOrder'
import Skeleton from '@material-ui/lab/Skeleton';

const CardOrderPlaceholder = React.memo(() => {
    const classes = cardStyle();
    return (
        <div className={classes.card} style={{height: 225}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardOrderPlaceholder