import React from 'react';
import cardStyle from '../../src/styleMUI/returned/cardReturned'
import Skeleton from '@material-ui/lab/Skeleton';

const CardReturnedPlaceholder = React.memo(() => {
    const classes = cardStyle();
    return (
        <div className={classes.card} style={{height: 225}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardReturnedPlaceholder