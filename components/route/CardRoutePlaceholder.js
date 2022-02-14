import React from 'react';
import cardStyle from '../../src/styleMUI/route/cardRoute'
import Skeleton from '@material-ui/lab/Skeleton';

const CardRoutePlaceholder = React.memo(() => {
    const classes = cardStyle();
    return (
        <div className={classes.card} style={{height: 210}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardRoutePlaceholder