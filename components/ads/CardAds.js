import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import cardAdsStyle from '../../src/styleMUI/ads/cardAds'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { deleteAds, addAds, setAds, restoreAds } from '../../src/gql/ads'
import { checkInt } from '../../src/lib'
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux'
import * as snackbarActions from '../../redux/actions/snackbar'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Confirmation from '../dialog/Confirmation'
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Remove from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const CardAds = React.memo((props) => {
    const classes = cardAdsStyle();
    const { element, setList, organization, list, items, edit, idx } = props;
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
    let [title, setTitle] = useState(element?element.title:'');
    let handleTitle =  (event) => {
        setTitle(event.target.value)
    };
    let [xid, setXid] = useState(element?element.xid:'');
    let handleXid =  (event) => {
        setXid(event.target.value)
    };
    let [count, setCount] = useState(element?element.count:0);
    let handleCount=  (event) => {
        setCount(checkInt(event.target.value))
    };
    let [xidNumber, setXidNumber] = useState(element?element.xidNumber:0);
    let handleXidNumber=  (event) => {
        setXidNumber(checkInt(event.target.value))
    };
    let [item, setItem] = useState(element?element.item:undefined);
    let [targetItems, setTargetItems ] = useState(element?element.targetItems.map(targetItem=>{return {xids: targetItem.xids, count: targetItem.count, sum: targetItem.sum, type: targetItem.type, targetPrice: targetItem.targetPrice}}):undefined);
    let [targetPrice, setTargetPrice ] = useState(element?element.targetPrice:0);
    let handleTargetPrice =  (event) => {
        setTargetPrice(checkInt(event.target.value))
    };
    let [multiplier , setMultiplier] = useState(element?element.multiplier:false);
    let [targetType, setTargetType] = useState(element?element.targetType:'Цена');
    let handleTargetType =  (event) => {
        setTargetItems([])
        setTargetType(event.target.value)
    };
    const targetTypes = ['Цена', 'Товар']
    const targetItemsTypes = ['Количество', 'Цена']
    let [url, setUrl] = useState(element?element.url:'');
    let handleUrl =  (event) => {
        setUrl(event.target.value)
    };
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    return (
          <> {
                profile.role === 'admin' && edit ?
                    <Card className={isMobileApp?classes.cardM:classes.cardD}>
                        <label htmlFor={element?element._id:'add'}>
                            <img
                                className={isMobileApp?classes.mediaM:classes.mediaD}
                                src={preview}
                                alt={'Изменить'}
                            />
                        </label>
                        <CardContent>
                                <TextField
                                    label='Текст'
                                    value={title}
                                    className={classes.input}
                                    onChange={handleTitle}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <br/>
                                <br/>
                            <TextField
                                label='URL'
                                value={url}
                                className={classes.input}
                                onChange={handleUrl}
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                            />
                            <br/>
                            <br/>
                                <Autocomplete
                                    className={classes.input}
                                    options={items}
                                    getOptionLabel={option => option.name}
                                    value={item}
                                    onChange={(event, newValue) => {
                                        setItem(newValue)
                                    }}
                                    noOptionsText='Ничего не найдено'
                                    renderInput={params => (
                                        <TextField {...params} label='Товар' fullWidth />
                                    )}/>
                                <br/>
                                <TextField
                                    type={ isMobileApp?'number':'text'}
                                    label='Количество'
                                    value={count}
                                    className={classes.input}
                                    onChange={handleCount}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                            <br/>
                            <br/>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={multiplier}
                                        onChange={()=>{setMultiplier(!multiplier)}}
                                        color='primary'
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label='Множитель'
                            />
                            <br/>
                            <br/>
                            <div className={classes.row}>
                                <TextField
                                    label='ID'
                                    value={xid}
                                    className={classes.inputHalf}
                                    onChange={handleXid}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                                <TextField
                                    label='Номер ID'
                                    value={xidNumber}
                                    className={classes.inputHalf}
                                    onChange={handleXidNumber}
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                            </div>
                            <br/>
                            <br/>
                            <FormControl className={classes.input} variant='outlined'>
                                <InputLabel>Цель</InputLabel>
                                <Select
                                    value={targetType}
                                    onChange={handleTargetType}
                                    input={<Input/>}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 226,
                                                width: 250,
                                            },
                                        }
                                    }}
                                >
                                    {targetTypes.map((targetType) => (
                                        <MenuItem key={targetType} value={targetType}>
                                            {targetType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            {
                                targetType==='Цена'?
                                    <>
                                    <TextField
                                        label='Целевая цена'
                                        value={targetPrice}
                                        type={ isMobileApp?'number':'text'}
                                        className={classes.input}
                                        onChange={handleTargetPrice}
                                        inputProps={{
                                            'aria-label': 'description',
                                        }}
                                    />
                                    </>
                                    :
                                    <>
                                    {targetItems?targetItems.map((element, idx)=>{
                                        return(<>
                                            <FormControl className={classes.input} variant='outlined'>
                                                <InputLabel>Целевой товар</InputLabel>
                                                <Select
                                                    multiple
                                                    value={element.xids}
                                                    onChange={(event) => {
                                                        targetItems[idx].xids = event.target.value
                                                        setTargetItems([...targetItems])
                                                    }}
                                                    input={<Input />}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 226,
                                                                width: 250,
                                                            },
                                                        }
                                                    }}
                                                >
                                                    {items?items.map((item) => (
                                                        <MenuItem key={item.name} value={item._id}>
                                                            {item.name}
                                                        </MenuItem>
                                                    )):null}
                                                </Select>
                                            </FormControl>
                                            <br/>
                                            <br/>
                                            <FormControl className={classes.input} variant='outlined'>
                                                <InputLabel>Цель</InputLabel>
                                                <Select
                                                    value={targetItems[idx].type}
                                                    onChange={(event) => {
                                                        targetItems[idx].type = event.target.value
                                                        targetItems[idx].count = 0
                                                        targetItems[idx].targetPrice = 0
                                                        setTargetItems([...targetItems])
                                                    }}
                                                    input={<Input/>}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 226,
                                                                width: 250,
                                                            },
                                                        }
                                                    }}
                                                >
                                                    {targetItemsTypes.map((targetItemsType) => (
                                                        <MenuItem key={targetItemsType} value={targetItemsType}>
                                                            {targetItemsType}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <br/>
                                            <br/>
                                            <div className={classes.row}>
                                                <FormControl className={classes.inputHalf}>
                                                    <InputLabel>{targetItems[idx].type==='Количество'?'Целевое количество':'Целевая цена'}</InputLabel>
                                                    <Input
                                                        placeholder={targetItems[idx].type==='Количество'?'Целевое количество':'Целевая цена'}
                                                        type={ isMobileApp?'number':'text'}
                                                        value={targetItems[idx].type==='Количество'?element.count:element.targetPrice}
                                                        onChange={(event)=>{
                                                            if(targetItems[idx].type==='Количество')
                                                                targetItems[idx].count = checkInt(event.target.value)
                                                            else
                                                                targetItems[idx].targetPrice = checkInt(event.target.value)
                                                            setTargetItems([...targetItems])
                                                        }}
                                                        inputProps={{
                                                            'aria-label': 'description',
                                                        }}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={()=>{
                                                                        targetItems.splice(idx, 1)
                                                                        setTargetItems([...targetItems])
                                                                    }}
                                                                    aria-label='toggle password visibility'
                                                                >
                                                                    <Remove/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControlLabel
                                                    className={classes.inputHalf}
                                                    control={
                                                        <Switch
                                                            checked={element.sum}
                                                            onChange={()=>{
                                                                targetItems[idx].sum = !targetItems[idx].sum
                                                                setTargetItems([...targetItems])
                                                            }}
                                                            color='primary'
                                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        />
                                                    }
                                                    label='Суммировать'
                                                />
                                            </div>
                                            <br/>
                                            <br/>
                                        </>)
                                        }
                                    ):null}
                                    <Button onClick={async()=>{
                                        setTargetItems([...targetItems, {xids: [], count: 0, sum: false, type: 'Количество', targetPrice: 0}])
                                    }} size='small' color='primary'>
                                        Добавить товар
                                    </Button>
                                    </>
                            }
                        </CardContent>
                        <CardActions>
                            {
                                   element!==undefined?
                                        element.del!=='deleted'?
                                        <>
                                        <Button onClick={async()=>{
                                            let editElement = {_id: element._id}
                                            if (title.length > 0 && title !== element.title) editElement.title = title
                                            if (xid.length > 0 && xid !== element.xid) editElement.xid = xid
                                            if (url.length > 0 && url !== element.url) editElement.url = url
                                            if (count !== element.count) editElement.count = count
                                            if (xidNumber !== element.xidNumber) editElement.xidNumber = xidNumber
                                            editElement.targetItems = targetItems
                                            if (targetPrice !== element.targetPrice) editElement.targetPrice = targetPrice
                                            if (multiplier !== element.multiplier) editElement.multiplier = multiplier
                                            if (targetType !== element.targetType) editElement.targetType = targetType
                                            editElement.item = item ? item._id : undefined
                                            if (image) editElement.image = image
                                            const action = async () => {
                                                await setAds(editElement, organization)
                                            }
                                            setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }} size='small' color='primary'>
                                            Сохранить
                                        </Button>
                                        <Button onClick={async()=>{
                                            const action = async() => {
                                                await deleteAds([element._id], organization)
                                                let _list = [...list]
                                                _list.splice(idx, 1)
                                                setList(_list)
                                            }
                                            setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }} size='small' color='secondary'>
                                            Удалить
                                        </Button>
                                        </>
                                            :
                                        <Button onClick={async()=>{
                                            const action = async() => {
                                                await restoreAds([element._id])
                                                let _list = [...list]
                                                _list.splice(_list.indexOf(element), 1)
                                                setList(_list)
                                            }
                                            setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }} size='small' color='primary'>
                                            Восстановить
                                        </Button>
                                        :
                                        <Button onClick={async()=> {
                                            if (item && count && image && url.length > 0 && title.length > 0) {
                                                setImage(undefined)
                                                setPreview('/static/add.png')
                                                setTitle('')
                                                setUrl('')
                                                setXid('')
                                                setCount(0)
                                                setItem(undefined)
                                                const action = async() => {
                                                    setList([
                                                        (await addAds({xidNumber: xidNumber, xid: xid, count: count, item: item?item._id:undefined, organization: organization, image: image, url: url, title: title, targetItems: targetItems, targetPrice: targetPrice, multiplier: multiplier, targetType: targetType})).addAds,
                                                        ...list
                                                    ])
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            } else {
                                                showSnackBar('Заполните все поля')
                                            }
                                        }
                                        } size='small' color='primary'>
                                            Добавить
                                        </Button>
                            }
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
                    element?
                        <Card className={isMobileApp?classes.cardM:classes.cardD}>
                            <CardActionArea>
                                <a href={element.url}>
                                    <img
                                        className={isMobileApp?classes.mediaM:classes.mediaD}
                                        alt={element.title}
                                        src={element.image}
                                    />
                                </a>
                                <div style={{fontSize: '1rem', margin: 20, whiteSpace: 'pre-wrap'}}>
                                    {element.title}
                                </div>
                            </CardActionArea>
                        </Card>
                        :null
            }</>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardAds)