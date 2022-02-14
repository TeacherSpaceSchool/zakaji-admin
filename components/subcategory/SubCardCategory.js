import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardCategoryStyle from '../../src/styleMUI/subcategory/cardSubcategory'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { onoffSubCategory, addSubCategory, setSubCategory, deleteSubCategory} from '../../src/gql/subcategory'
import Link from 'next/link';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as snackbarActions from '../../redux/actions/snackbar'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../dialog/Confirmation'

const CardCategory = React.memo((props) => {
    const classes = cardCategoryStyle();
    const { element, setList, idx, categorys, list } = props;
    const { profile } = props.user;
    const { isMobileApp } = props.app;
    //addCard
    let [name, setName] = useState(element?element.name:'');
    let handleName =  (event) => {
        setName(event.target.value)
    };
    let [selectCategory, setSelectCategory] = useState(element?element.category:{});
    let handleSelectCategory =  (event) => {
        setSelectCategory({_id: event.target.value, name: event.target.name})
    };
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    let [status, setStatus] = useState(element?element.status:'');
    return (
        <div>
            {
                profile.role === 'admin' && (!element||(element._id!=='all'&&name!=='Не задано')) ?
                    <Card className={isMobileApp?classes.cardM:classes.cardD}>
                        <CardActionArea>
                            <CardContent>
                                <TextField
                                    label='Имя'
                                    value={name}
                                    className={classes.input}
                                    onChange={handleName}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <br/>
                                <br/>
                                <FormControl className={classes.input}>
                                    <InputLabel>Категория</InputLabel>
                                    <Select
                                        value={selectCategory._id}
                                        onChange={handleSelectCategory}
                                    >
                                        {categorys?categorys.map((element)=>
                                            <MenuItem key={element._id} value={element._id} ola={element.name}>{element.name}</MenuItem>
                                        ):null}
                                    </Select>
                                </FormControl>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {
                                element!==undefined?
                                    <>
                                    <Button onClick={async()=>{
                                        let editElement = {_id: element._id}
                                        if(name.length>0&&name!==element.name)editElement.name = name
                                        if(selectCategory._id!==undefined&&selectCategory._id!==element.category._id)editElement.category = selectCategory._id
                                        const action = async() => {
                                            await setSubCategory(editElement)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }} size='small' color='primary'>
                                        Сохранить
                                    </Button>
                                    <Button onClick={async()=>{
                                        const action = async() => {
                                            await onoffSubCategory([element._id])
                                            setStatus(status==='active'?'deactive':'active')
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }} size='small' color={status==='active'?'primary':'secondary'}>
                                        {status==='active'?'Отключить':'Включить'}
                                    </Button>
                                    <Button size='small' color='secondary' onClick={()=>{
                                        const action = async() => {
                                            await deleteSubCategory([element._id])
                                            let _list = [...list]
                                            _list.splice(idx, 1)
                                            setList(_list)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }}>
                                        Удалить
                                    </Button>
                            <Link href='/items/[id]' as={`/items/${element._id}`}>
                                <Button size='small' color='primary'>
                                    Перейти
                                </Button>
                            </Link>
                                    </>:
                                    <Button onClick={async()=> {
                                        if (name.length > 0&&selectCategory._id) {
                                            setName('')
                                            const action = async() => {
                                                setList([
                                                    (await addSubCategory({name: name}, selectCategory._id)).addSubCategory,
                                                    ...list
                                                ])
                                            }
                                            setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        } else {
                                            showSnackBar('Заполните все поля')
                                        }
                                    }} size='small' color='primary'>
                                        Добавить
                                    </Button>}
                        </CardActions>
                    </Card>
                    :
                    element!==undefined?
                        <Link href='/items/[id]' as={`/items/${element._id}`}>
                        <Card className={isMobileApp?classes.cardM:classes.cardD}>
                            <CardActionArea>
                                   <div className={classes.line}>
                                        <h3 className={classes.input}>
                                            {element.name}
                                        </h3>
                                    </div>
                            </CardActionArea>
                        </Card>
                </Link>
                        :null
            }
            </div>
    );
})

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCategory)