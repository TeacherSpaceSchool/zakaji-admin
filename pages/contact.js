import Head from 'next/head';
import React, { useState } from 'react';
import App from '../layouts/App';
import { connect } from 'react-redux'
import { getContact, setContact } from '../src/gql/contact'
import contactStyle from '../src/styleMUI/contact'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import * as snackbarActions from '../redux/actions/snackbar'
import Remove from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Confirmation from '../components/dialog/Confirmation'
import AddSocial from '../components/dialog/AddSocial'
import Geo from '../components/dialog/Geo'
import { urlMain } from '../redux/constants/other'
import { getClientGqlSsr } from '../src/getClientGQL'
import initialApp from '../src/initialApp'


const Contact = React.memo((props) => {
    const classes = contactStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    const { showSnackBar } = props.snackbarActions;
    let [name, setName] = useState(data.contact.name);
    let [address, setAddress] = useState(data.contact.address);
    let [newAddress, setNewAddress] = useState('');
    let addAddress = ()=>{
        address = [...address, newAddress]
        setAddress(address)
        setNewAddress('')
    };
    let editAddress = (event, idx)=>{
        address[idx] = event.target.value
        setAddress([...address])
    };
    let deleteAddress = (idx)=>{
        address.splice(idx, 1);
        setAddress([...address])
    };
    let [warehouse, setWarehouse] = useState(data.contact.warehouse);
    let [email, setEmail] = useState(data.contact.email);
    let [newEmail, setNewEmail] = useState('');
    let addEmail = ()=>{
        email = [...email, newEmail]
        setEmail(email)
        setNewEmail('')
    };
    let editEmail = (event, idx)=>{
        email[idx] = event.target.value
        setEmail([...email])
    };
    let deleteEmail = (idx)=>{
        email.splice(idx, 1);
        setEmail([...email])
    };
    let [phone, setPhone] = useState(data.contact.phone);
    let [newPhone, setNewPhone] = useState('');
    let addPhone = ()=>{
        phone = [...phone, newPhone]
        setPhone(phone)
        setNewPhone('')
    };
    let editPhone = (event, idx)=>{
        phone[idx] = event.target.value
        setPhone([...phone])
    };
    let deletePhone = (idx)=>{
        phone.splice(idx, 1);
        setPhone([...phone])
    };
    let [social, setSocial] = useState(data.contact.social);
    let addSocial = (value, idx)=>{
        social[idx] = value
        setSocial([...social])
    };
    let [info, setInfo] = useState(data.contact.info);
    let [preview, setPreview] = useState(data.contact.image===''?'/static/add.png':data.contact.image);
    let [image, setImage] = useState(undefined);
    let handleChangeImage = ((event) => {
        if(event.target.files[0].size/1024/1024<50){
            setImage(event.target.files[0])
            setPreview(URL.createObjectURL(event.target.files[0]))
        } else {
            showSnackBar('Файл слишком большой')
        }
    })
    const { profile } = props.user;
    const { setMiniDialog, showMiniDialog, setFullDialog, showFullDialog } = props.mini_dialogActions;
    return (
        <App filters={data.filterSubCategory} sorts={data.sortSubCategory} pageName='Контакты'>
            <Head>
                <title>Контакты</title>
                <meta name='description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:title' content='Азык - электронный склад связывающий производителя с торговой точкой' />
                <meta property='og:description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/contact`} />
                <link rel='canonical' href={`${urlMain}/contact`}/>
            </Head>
            <Card className={classes.page}>
                    <CardContent className={isMobileApp?classes.column:classes.row}>
                        {
                            profile.role==='admin'?
                                <>
                                    <div className={classes.column}>
                                        <label htmlFor='contained-button-file'>
                                            <img
                                                className={isMobileApp?classes.mediaM:classes.mediaD}
                                                src={preview}
                                                alt={'Добавить'}
                                            />
                                        </label>
                                        <br/>
                                        <div className={classes.geo} style={{color: warehouse&&warehouse.length>0?'#004C3F':'red'}} onClick={()=>{
                                            setFullDialog('Геолокация', <Geo change={true} geo={warehouse} setAddressGeo={setWarehouse}/>)
                                            showFullDialog(true)
                                        }}>
                                            Склад
                                        </div>
                                        Наши страницы
                                        <div className={classes.row}>
                                            <img src='/static/instagram.svg' onClick={()=>{
                                                setMiniDialog('Instagram', <AddSocial social={social[0]} action={addSocial} idx={0}/>)
                                                showMiniDialog(true)
                                            }} className={classes.mediaSocial}/>
                                            <img src='/static/facebook.svg' onClick={()=>{
                                                setMiniDialog('Facebook', <AddSocial social={social[1]} action={addSocial} idx={1}/>)
                                                showMiniDialog(true)
                                            }} className={classes.mediaSocial}/>
                                            <img src='/static/twitter.svg' onClick={()=>{
                                                setMiniDialog('Twitter', <AddSocial social={social[2]} action={addSocial} idx={2}/>)
                                                showMiniDialog(true)
                                            }} className={classes.mediaSocial}/>
                                            <img src='/static/telegram.svg' onClick={()=>{
                                                setMiniDialog('Telegram', <AddSocial social={social[3]} action={addSocial} idx={3}/>)
                                                showMiniDialog(true)
                                            }} className={classes.mediaSocial}/>
                                        </div>
                                    </div>
                                    <div>
                                        <TextField
                                                label='Имя'
                                                value={name}
                                                className={classes.input}
                                                onChange={(event)=>{setName(event.target.value)}}
                                                inputProps={{
                                                    'aria-label': 'description',
                                                }}
                                            />
                                        {address.map((element, idx)=>
                                            <FormControl  key={`address${idx}`} className={classes.input}>
                                                <InputLabel>Адрес</InputLabel>
                                                <Input
                                                    placeholder='Адрес'
                                                    value={element}
                                                    onChange={(event)=>{editAddress(event, idx)}}
                                                    inputProps={{
                                                        'aria-label': 'description',
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={()=>{
                                                                    deleteAddress(idx)
                                                                }}
                                                                aria-label='toggle password visibility'
                                                            >
                                                                <Remove/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                        <Button onClick={async()=>{
                                            addAddress()
                                        }} size='small' color='primary'>
                                            Добавить адрес
                                        </Button>
                                        <br/>
                                        <br/>
                                        {email.map((element, idx)=>
                                            <FormControl  key={`email${idx}`} className={classes.input}>
                                                <InputLabel>Email</InputLabel>
                                                <Input
                                                    value={element}
                                                    onChange={(event)=>{editEmail(event, idx)}}
                                                    inputProps={{
                                                        'aria-label': 'description',
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={()=>{
                                                                    deleteEmail(idx)
                                                                }}
                                                                aria-label='toggle password visibility'
                                                            >
                                                                <Remove/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                        <Button onClick={async()=>{
                                            addEmail()
                                        }} size='small' color='primary'>
                                            Добавить email
                                        </Button>
                                        <br/>
                                        <br/>
                                        {phone.map((element, idx)=>
                                            <FormControl key={`phone${idx}`} className={classes.input}>
                                                <InputLabel>Телефон</InputLabel>
                                                <Input
                                                    value={element}
                                                    onChange={(event)=>{editPhone(event, idx)}}
                                                    inputProps={{
                                                        'aria-label': 'description',
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={()=>{
                                                                    deletePhone(idx)
                                                                }}
                                                                aria-label='toggle password visibility'
                                                            >
                                                                <Remove/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                        <Button onClick={async()=>{
                                            addPhone()
                                        }} size='small' color='primary'>
                                            Добавить телефон
                                        </Button>
                                        <br/>
                                        <br/>
                                        <TextField
                                            multiline={true}
                                            label='Информация'
                                            value={info}
                                            className={classes.input}
                                            onChange={(event)=>{setInfo(event.target.value)}}
                                            inputProps={{
                                                'aria-label': 'description',
                                            }}
                                        />
                                        <div className={classes.row}>
                                            <Button onClick={async()=>{
                                                let editElement = {
                                                    name: name,
                                                    address: address,
                                                    email: email,
                                                    phone: phone,
                                                    social: social,
                                                    info: info,
                                                    warehouse: warehouse
                                                }
                                                if(image!==undefined)editElement.image = image
                                                const action = async() => {
                                                    await setContact(editElement)
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            }} size='small' color='primary'>
                                                Сохранить
                                            </Button>
                                        </div>
                                    </div>
                                    </>
                                :
                                <>
                                <div className={classes.column}>
                                    <img
                                        className={isMobileApp?classes.mediaM:classes.mediaD}
                                        src={preview}
                                        alt={name}
                                    />
                                    {
                                        social[0].length>0||social[1].length>0||social[2].length>0||social[3].length>0?
                                            <>
                                        Наши страницы
                                        <div className={classes.row}>
                                            {
                                                social[0].length>0?
                                                    <a href={social[0]}>
                                                        <img src='/static/instagram.svg' className={classes.mediaSocial}/>
                                                    </a>
                                                    :
                                                    null
                                            }
                                            {
                                                social[1].length>0?
                                                    <a href={social[1]}>
                                                        <img src='/static/facebook.svg' className={classes.mediaSocial}/>
                                                    </a>
                                                    :
                                                    null
                                            }
                                            {
                                                social[2].length>0?
                                                    <a href={social[2]}>
                                                        <img src='/static/twitter.svg' className={classes.mediaSocial}/>
                                                    </a>
                                                    :
                                                    null
                                            }
                                            {
                                                social[3].length>0?
                                                    <a href={social[3]}>
                                                        <img src='/static/telegram.svg' className={classes.mediaSocial}/>
                                                    </a>
                                                    :
                                                    null

                                            }
                                        </div>
                                        </>
                                            :
                                            null
                                    }
                                </div>
                                            <div>
                                                <div className={classes.name}>
                                                    {name}
                                                </div>
                                                <br/>
                                                <div className={classes.row}>
                                                    <div className={classes.nameField}>
                                                        Адрес:&nbsp;
                                                    </div>
                                                    <div className={classes.column}>
                                                        {address.map((element, idx)=>
                                                            <div key={`address${idx}`} className={classes.value}>
                                                                {element}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={classes.row}>
                                                    <div className={classes.nameField}>
                                                        Телефон:&nbsp;
                                                    </div>
                                                    <div className={classes.column}>
                                                        {phone.map((element, idx)=>{
                                                            let tel = ''
                                                            for(let i=0; i<element.length; i++){
                                                                if('0123456789+'.includes(element[i]))
                                                                    tel+=element[i]
                                                            }
                                                            if(tel.length>11)
                                                                return (
                                                                    <a href={`tel:${tel}`} key={`phone${idx}`} className={classes.value}>
                                                                        {element}
                                                                    </a>
                                                                )
                                                            else
                                                                return (
                                                                    <div key={`phone${idx}`} className={classes.value}>
                                                                        {element}
                                                                    </div>
                                                                )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className={classes.row}>
                                                    <div className={classes.nameField}>
                                                        E-mail:&nbsp;
                                                    </div>
                                                    <div className={classes.column}>
                                                        {email.map((element, idx)=>
                                                            <a href={`mailto:${element}`} key={`email${idx}`} className={classes.value}>
                                                                {element}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={classes.info}>
                                                    {info}
                                                </div>
                                            </div>
                                            </>
                        }
                        </CardContent>
                </Card>
            <input
                accept='image/*'
                style={{ display: 'none' }}
                id='contained-button-file'
                type='file'
                onChange={handleChangeImage}
            />
        </App>
    )
})

Contact.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    return {
        data: {
            ...await getContact(ctx.req?await getClientGqlSsr(ctx.req):undefined)
        }

    };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);