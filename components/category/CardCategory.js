import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardCategoryStyle from '../../src/styleMUI/category/cardCategory'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { onoffCategory, addCategory, setCategory, deleteCategory } from '../../src/gql/category'
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as snackbarActions from '../../redux/actions/snackbar'
import Confirmation from '../dialog/Confirmation'


const CardCategory = React.memo((props) => {
    const classes = cardCategoryStyle();
    const { element, setList, list, idx } = props;
    const { profile } = props.user;
    const { isMobileApp } = props.app;
    //addCard
    let [preview, setPreview] = useState(element?element.image:'/static/add.png');
    let [image, setImage] = useState(undefined);
    let handleChangeImage = ((event) => {
        if(event.target.files[0].size/1024/1024<50){
            setImage(event.target.files[0])
            setPreview(URL.createObjectURL(event.target.files[0]))
        } else {
            showSnackBar('Файл слишком большой')
        }
    })
    let [status, setStatus] = useState(element?element.status:'active');
    let [name, setName] = useState(element?element.name:'');
    let handleName =  (event) => {
        setName(event.target.value)
    };
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    return (
        <div>
            {
                name!=='Не задано'&&setList!=='all'&&profile.role === 'admin' ?
                    <Card className={isMobileApp?classes.cardM:classes.cardD}>
                        <CardActionArea>
                        <CardContent>
                            <div className={classes.line}>
                                <label htmlFor={element?element._id:'add'}>
                                    <img
                                        className={classes.media}
                                        src={preview}
                                        alt={'Изменить'}
                                    />
                                </label>
                               <TextField
                                   label='Имя'
                                   value={name}
                                   className={isMobileApp?classes.inputM:classes.inputD}
                                   onChange={handleName}
                                   inputProps={{
                                       'aria-label': 'description',
                                   }}
                               />
                            </div>
                        </CardContent>
                    </CardActionArea>
                        <CardActions>
                            {
                                element!==undefined?
                                <>
                                <Button onClick={async()=>{
                                        let editElement = {_id: element._id}
                                        if(name.length>0&&name!==element.name)editElement.name = name
                                        if(image!==undefined)editElement.image = image
                                        const action = async() => {
                                            await setCategory(editElement)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }} size='small' color='primary'>
                                        Сохранить
                                    </Button>
                                    <Button onClick={async()=>{
                                        const action = async() => {
                                            await onoffCategory([element._id])
                                            setStatus(status==='active'?'deactive':'active')
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }} size='small' color={status==='active'?'primary':'secondary'}>
                                        {status==='active'?'Отключить':'Включить'}
                                    </Button>
                                    <Button size='small' color='secondary' onClick={()=>{
                                        const action = async() => {
                                            await deleteCategory([element._id])
                                            let _list = [...list]
                                            _list.splice(idx, 1)
                                            setList(_list)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }}>
                                        Удалить
                                    </Button>
                            <Link href='/subcategory/[id]' as={`/subcategory/${element._id}`}>
                                <Button size='small' color='primary'>
                                    Перейти
                                </Button>
                            </Link>
                        </>:
                        <Button onClick={async()=> {
                            if (image !== undefined && name.length > 0) {
                                setImage(undefined)
                                setPreview('/static/add.png')
                                setName('')
                                const action = async() => {
                                    setList([(await addCategory({image: image, name: name})).addCategory, ...list])
                                }
                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                showMiniDialog(true)
                            } else
                                showSnackBar('Заполните все поля')

                        }
                        } size='small' color='primary'>
                            Добавить
                        </Button>}
                        </CardActions>
                        <input
                            accept='image/*'
                            style={{ display: 'none' }}
                            id={element?element._id:'add'}
                            type='file'
                            onChange={handleChangeImage}
                        />
                    </Card>

                    :
                    name!=='Не задано'?
                        <Link href='/subcategory/[id]' as={`/subcategory/${element._id}`}>
                            <Card className={isMobileApp?classes.cardM:classes.cardD}>
                            <CardActionArea>
                            <CardContent>
                                    <div className={classes.line}>
                                        <label htmlFor='contained-button-file'>
                                            <img
                                                className={classes.media}
                                                src={element.image}
                                                alt={element.name}
                                            />
                                        </label>
                                        <h3 className={isMobileApp?classes.inputM:classes.inputD}>
                                            {element.name}
                                        </h3>
                                    </div>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                </Link>
                        :
                        name==='Не задано'&&profile.role === 'admin'?
                            <Link href='/subcategory/[id]' as={`/subcategory/${element._id}`}>
                                <Card className={isMobileApp?classes.cardM:classes.cardD}>
                                <CardActionArea>
                                <CardContent>
                                        <div className={classes.line}>
                                            <label htmlFor='contained-button-file'>
                                                <img
                                                    className={classes.media}
                                                    src={'/static/add.png'}
                                                    alt={element.name}
                                                />
                                            </label>
                                            <h3 className={isMobileApp?classes.inputM:classes.inputD}>
                                                {element.name}
                                            </h3>
                                        </div>
                                </CardContent>
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