import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const CardCatalogPlaceholder = React.memo(() => {
    const height = 153
    return (
        <div style={{width: '100%', height: height}}>
            <Skeleton variant='rect' height='100%'/>
        </div>
    );
})

export default CardCatalogPlaceholder