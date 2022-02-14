import React from 'react';
import cardCategoryStyle from '../../src/styleMUI/notificationStatistic/cardNotificationStatistic'
import Skeleton from '@material-ui/lab/Skeleton';

const CardNotificationStatisticPlaceholder = React.memo((props) => {
    const classes = cardCategoryStyle();
    const { height } = props;
    return (
        <div className={classes.card} style={{height: height}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardNotificationStatisticPlaceholder