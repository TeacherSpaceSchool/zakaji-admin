import React from 'react';
import cardStyle from '../../src/styleMUI/item/cardItem'
import Skeleton from '@material-ui/lab/Skeleton';

const CardOrderPlaceholder = React.memo(() => {
    const classes = cardStyle();
    return (
        <div className={classes.card} style={{height: 377}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardOrderPlaceholder