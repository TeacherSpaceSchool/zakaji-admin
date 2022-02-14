import React from 'react';
import { connect } from 'react-redux'
import cardStyle from '../../src/styleMUI/district/cardDistrict'
import Skeleton from '@material-ui/lab/Skeleton';

const CardDistrictPlaceholder = React.memo(() => {
    const classes = cardStyle();
    return (
        <div className={classes.card} style={{height: 210}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardDistrictPlaceholder