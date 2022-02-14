import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardStyle from '../../src/styleMUI/review/cardReview'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { addReview, acceptReview, deleteReview} from '../../src/gql/review'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Confirmation from '../dialog/Confirmation';
import { pdDDMMYYHHMM } from '../../src/lib'

const CardReview = React.memo((props) => {
    const { profile } = props.user;
    const classes = cardStyle();
    const { element, setList, organizations, list, idx } = props;
    const { isMobileApp } = props.app;
    //addCard
    let [organization, setOrganization] = useState(element?element.organization:{});
    let handleOrganization =  (event) => {
        setOrganization({_id: event.target.value, name: event.target.name})
    };
    let [text, setText] = useState(element?element.text:'');
    let handleText =  (event) => {
        setText(event.target.value)
    };
    const types = ['агент', 'доставка', 'экспедитор', 'прочее'];
    let [type, setType] = useState(element?element.type:'прочее');
    let handleType =  (event) => {
        setType(event.target.value)
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
                                    <div className={classes.nameField}>Время отзыва:&nbsp;</div>
                                    <div className={classes.value}>{pdDDMMYYHHMM(element.createdAt)}</div>
                                    <div className={classes.status} style={{background: element.taken?'green':'orange'}}>{element.taken?'принят':'обработка'}</div>
                                </div>
                                <a href={`/client/${element.client._id}`} target='_blank'>
                                    <div className={classes.row}>
                                        <div className={classes.nameField}>Клиент:&nbsp;</div>
                                        <div className={classes.value}>{element.client.name}</div>
                                    </div>
                                </a>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Производитель:&nbsp;</div>
                                    <div className={classes.value}>{element.organization.name}</div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Тип:&nbsp;</div>
                                    <div className={classes.value}>{element.type}</div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Отзыв:&nbsp;</div>
                                    <div className={classes.value}>{element.text}</div>
                                </div>
                            </CardContent>
                        </CardActionArea>
                        :
                        <CardActionArea>
                            <CardContent>
                                <FormControl className={classes.input}>
                                    <InputLabel>Организация</InputLabel>
                                    <Select value={organization._id}onChange={handleOrganization}>
                                        {organizations.map((element)=>
                                            <MenuItem key={element._id} value={element._id} ola={element.name}>{element.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <br/>
                                <br/>
                                <FormControl className={classes.input}>
                                    <InputLabel>Тип</InputLabel>
                                    <Select
                                        value={type}
                                        onChange={handleType}
                                    >
                                        {types?types.map((element)=>
                                            <MenuItem key={element} value={element}>{element}</MenuItem>
                                        ):null}
                                    </Select>
                                </FormControl>
                                <br/>
                                <TextField
                                    multiline={true}
                                    style={{width: '100%'}}
                                    label='Текст'
                                    value={text}
                                    className={classes.input}
                                    onChange={handleText}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                            </CardContent>
                        </CardActionArea>
                }
                    {
                        element&&profile.role!=='client'&&!element.taken?
                            <CardActions>
                            <Button onClick={async()=>{
                                const action = async() => {
                                    await acceptReview({_id: element._id})
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
                                            await deleteReview([element._id])
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
                            !element&&profile.role==='client'?
                                <CardActions>
                                    <Button onClick={async()=> {
                                    if(organization._id&&text.length>0) {
                                        const action = async () => {
                                            let element = {organization: organization._id, text: text, type: type}
                                            let res = await addReview(element)
                                            if (res)
                                                setList([res, ...list])
                                        }
                                        setType('прочее')
                                        setOrganization({})
                                        setText('')
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }
                                }} size='small' color='primary'>
                                        Добавить
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
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardReview)