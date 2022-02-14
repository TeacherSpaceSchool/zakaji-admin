import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardStyle from '../../src/styleMUI/connectionApplication/cardConnectionApplication'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { addConnectionApplication, acceptConnectionApplication, deleteConnectionApplication} from '../../src/gql/connectionApplication'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as snackbarActions from '../../redux/actions/snackbar'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../dialog/Confirmation';
import { pdDDMMYYHHMM } from '../../src/lib'

const CardConnectionApplication = React.memo((props) => {
    const { profile } = props.user;
    const classes = cardStyle();
    const { element, setList, list, idx } = props;
    const { showSnackBar } = props.snackbarActions;
    const { isMobileApp } = props.app;
    //addCard
    let [name, setName] = useState(element?element.name:'');
    let handleName =  (event) => {
        setName(event.target.value)
    };
    let [phone, setPhone] = useState(element?element.phone:'');
    let handlePhone =  (event) => {
        setPhone(event.target.value)
    };
    let [address, setAddress] = useState(element?element.address:'');
    let handleAddress =  (event) => {
        setAddress(event.target.value)
    };
    let [whereKnow, setWhereKnow] = useState(element?element.whereKnow:'');
    let handleWhereKnow =  (event) => {
        setWhereKnow(event.target.value)
    };
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    return (
        <div>
            <Card className={isMobileApp?classes.cardM:classes.cardD}>
                {
                    element?
                        <CardActionArea>
                            <CardContent>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Время заявки:&nbsp;</div>
                                    <div className={classes.value}>{pdDDMMYYHHMM(element.createdAt)}</div>
                                    <div className={classes.status} style={{background: element.taken?'green':'orange'}}>{element.taken?'принят':'обработка'}</div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Магазин:&nbsp;</div>
                                    <div className={classes.value}>{element.name}</div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Телефон:&nbsp;</div>
                                    <div className={classes.value}>{element.phone}</div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Адрес:&nbsp;</div>
                                    <div className={classes.value}>{element.address}</div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Откуда узнали:&nbsp;</div>
                                    <div className={classes.value}>{element.whereKnow}</div>
                                </div>
                            </CardContent>
                        </CardActionArea>
                        :
                        <CardActionArea>
                            <CardContent>
                                <TextField
                                    style={{width: '100%'}}
                                    label='Магазин'
                                    value={name}
                                    className={classes.input}
                                    onChange={handleName}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <br/>
                                <br/>
                                <TextField
                                    style={{width: '100%'}}
                                    label='Телефон'
                                    value={phone}
                                    className={classes.input}
                                    onChange={handlePhone}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <br/>
                                <br/>
                                <TextField
                                    style={{width: '100%'}}
                                    label='Адрес'
                                    value={address}
                                    className={classes.input}
                                    onChange={handleAddress}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <br/>
                                <br/>
                                <TextField
                                    style={{width: '100%'}}
                                    label='Откуда узнали'
                                    value={whereKnow}
                                    className={classes.input}
                                    onChange={handleWhereKnow}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <br/>
                            </CardContent>
                        </CardActionArea>
                }
                    {
                        element&&profile.role!=='client'&&!element.taken?
                            <CardActions>
                            <Button onClick={async()=>{
                                const action = async() => {
                                    await acceptConnectionApplication({_id: element._id})
                                    let _list = [...list]
                                    _list[idx].taken = true
                                    setList(_list)
                                }
                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                showMiniDialog(true)
                            }} size='small' color='primary'>
                                Принять
                            </Button>
                            {
                                profile.role==='admin'?
                                    <Button onClick={async()=>{
                                        const action = async() => {
                                            await deleteConnectionApplication([element._id])
                                            let _list = [...list]
                                            _list.splice(_list.indexOf(element), 1)
                                            setList(_list)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }} size='small' color='secondary'>
                                        Удалить
                                    </Button>
                                    :
                                    null
                            }
                            </CardActions>
                            :
                            !element&&!profile.role?
                                <CardActions>
                                    <Button onClick={async()=> {
                                    if(name.length>0&&phone.length>0&&address.length>0) {
                                        const action = async () => {
                                            await addConnectionApplication({name, phone, address, whereKnow})
                                            setName('')
                                            setPhone('')
                                            setWhereKnow('')
                                            setAddress('')
                                            showSnackBar('Заявка отправлена')
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }
                                    else
                                        showSnackBar('Заполните все поля')
                                }} size='small' color='primary'>
                                        Отправить
                                    </Button>
                                </CardActions>
                                :
                                null
                    }
                    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardConnectionApplication)