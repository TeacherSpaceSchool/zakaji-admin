import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import cardCategoryStyle from '../../src/styleMUI/subcategory/cardSubcategory'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { inputFloat } from '../../src/lib'

const CardCategory = React.memo((props) => {
    const classes = cardCategoryStyle();
    const { element, idx, setList, list } = props;
    const { isMobileApp } = props.app;
    //addCard
    let [costPrice, setCostPrice] = useState('');
    let handleCostPrice =  (event) => {
        list[idx].costPrice = inputFloat(event.target.value)
        setList([...list])
    };
    useEffect(()=>{
        (async()=>{
            if(list[idx])
                setCostPrice(list[idx].costPrice)
        })()
    },[list])
    return (
        element&&list[idx]?
            <Card className={isMobileApp?classes.cardM:classes.cardD}>
                <CardContent>
                    <div className={classes.row}>
                        <div className={classes.nameField}>Товар:&nbsp;</div>
                        <div className={classes.value}>{element.name}</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.nameField}>Цена:&nbsp;</div>
                        <div className={classes.value}>{element.price} сом</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.nameField}>Себестоимость:&nbsp;</div>
                        <div className={classes.value}>{list[idx].costPrice} сом</div>
                    </div>
                    <TextField
                        label='Себестоимость'
                        value={costPrice}
                        type={ isMobileApp?'number':'text'}
                        className={classes.input}
                        onChange={handleCostPrice}
                        inputProps={{
                            'aria-label': 'description',
                        }}
                    />
                </CardContent>
            </Card>
            :
            null
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardCategory)