import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getEquipment, setEquipment, deleteEquipment, addEquipment} from '../../src/gql/equipment'
import organizationStyle from '../../src/styleMUI/equipment/equipment'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { useRouter } from 'next/router'
import { getActiveOrganization } from '../../src/gql/statistic'
import { getClients } from '../../src/gql/client'
import Router from 'next/router'
import * as snackbarActions from '../../redux/actions/snackbar'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../../components/dialog/Confirmation'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import Autocomplete from '@material-ui/lab/Autocomplete';
import initialApp from '../../src/initialApp'
import CircularProgress from '@material-ui/core/CircularProgress';

const Equipment = React.memo((props) => {
    const { profile } = props.user;
    const classes = organizationStyle();
    const { data } = props;
    const { isMobileApp, city } = props.app;
    const { showSnackBar } = props.snackbarActions;
    const initialRender = useRef(true);
    const [clients, setClients] = useState([]);
    const [inputValue, setInputValue] = React.useState('');
    let [searchTimeOut, setSearchTimeOut] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async()=>{
            if (inputValue.length < 3) {
                setClients([]);
                if (open)
                    setOpen(false)
                if (loading)
                    setLoading(false)
            }
            else {
                if (!loading)
                    setLoading(true)
                if (searchTimeOut)
                    clearTimeout(searchTimeOut)
                searchTimeOut = setTimeout(async () => {
                    setClients((await getClients({search: inputValue, sort: '-name', filter: 'all', city})).clients)
                    if (!open)
                        setOpen(true)
                    setLoading(false)
                }, 500)
                setSearchTimeOut(searchTimeOut)
            }
        })()
    }, [inputValue]);
    const handleChange = event => {
        setInputValue(event.target.value);
    };
    let handleClient =  (client) => {
        setClient(client)
        setOpen(false)
    };
    let [activeOrganization, setActiveOrganization] = useState(data.activeOrganization);
    let [number, setNumber] = useState(data.equipment!==null?data.equipment.number:'');
    let [name, setName] = useState(data.equipment!==null?data.equipment.name:'');
    let [organization, setOrganization] = useState(data.equipment!==null?data.equipment.organization:{});
    let [client, setClient] = useState(data.equipment?data.equipment.client:undefined);
    let handleOrganization =  (organization) => {
        setOrganization(organization)
    };
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const router = useRouter()
    useEffect(()=>{
        (async()=>{
            if(initialRender.current) {
                initialRender.current = false;
                if(profile.organization)
                    setOrganization({_id: profile.organization})
            }
            else {
                setOrganization(undefined)
                setActiveOrganization((await getActiveOrganization(city)).activeOrganization)
            }
        })()
    },[city])
    return (
        <App cityShow={router.query.id==='new'} pageName={data.equipment?router.query.id==='new'?'Добавить':data.equipment.name:'Ничего не найдено'}>
            <Head>
                <title>{data.equipment!==null?router.query.id==='new'?'Добавить':data.equipment.name:'Ничего не найдено'}</title>
                <meta name='description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:title' content={data.equipment!==null?router.query.id==='new'?'Добавить':data.equipment.name:'Ничего не найдено'} />
                <meta property='og:description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property="og:url" content={`${urlMain}/equipment/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/equipment/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                {
                    data.equipment!==null?
                        <>
                        {
                            !profile.organization&&router.query.id==='new'?
                                <Autocomplete
                                    className={classes.input}
                                    options={activeOrganization}
                                    getOptionLabel={option => option.name}
                                    value={organization}
                                    onChange={(event, newValue) => {
                                        handleOrganization(newValue)
                                    }}
                                    noOptionsText='Ничего не найдено'
                                    renderInput={params => (
                                        <TextField {...params} label='Выберите организацию' fullWidth />
                                    )}
                                />
                                :
                                organization&&!profile.organization?
                                    <TextField
                                        label='Организация'
                                        value={organization.name}
                                        className={classes.input}
                                        inputProps={{
                                            'aria-label': 'description',
                                            readOnly: true,
                                        }}
                                    />
                                    :
                                    null
                        }
                        <TextField
                            label='Номер'
                            value={number}
                            className={classes.input}
                            onChange={(event)=>{setNumber(event.target.value)}}
                            inputProps={{
                                'aria-label': 'description',
                                readOnly: !['admin', 'суперорганизация', 'организация', 'агент'].includes(profile.role),
                            }}
                        />
                        <TextField
                            label='Оборудование'
                            value={name}
                            className={classes.input}
                            onChange={(event)=>{setName(event.target.value)}}
                            inputProps={{
                                'aria-label': 'description',
                                readOnly: !['admin', 'суперорганизация', 'организация', 'агент'].includes(profile.role),
                            }}
                        />
                        {
                            ['admin', 'суперорганизация', 'организация', 'агент'].includes(profile.role)?
                                <Autocomplete
                                    onClose={()=>setOpen(false)}
                                    open={open}
                                    disableOpenOnFocus
                                    className={classes.input}
                                    options={clients}
                                    getOptionLabel={option => `${option.name}${option.address&&option.address[0]?` (${option.address[0][2]?`${option.address[0][2]}, `:''}${option.address[0][0]})`:''}`}
                                    onChange={(event, newValue) => {
                                        handleClient(newValue)
                                    }}
                                    value={client}
                                    noOptionsText='Ничего не найдено'
                                    renderInput={params => (
                                        <TextField {...params} label='Выберите клиента' variant='outlined' fullWidth
                                                   onChange={handleChange}
                                                   InputProps={{
                                                       ...params.InputProps,
                                                       endAdornment: (
                                                           <React.Fragment>
                                                               {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                               {params.InputProps.endAdornment}
                                                           </React.Fragment>
                                                       ),
                                                   }}
                                        />
                                    )}
                                />
                                :
                                <TextField
                                    label='Клиент'
                                    value={`${client.name}${client.address&&client.address[0]?` (${client.address[0][2]?`${client.address[0][2]}, `:''}${client.address[0][0]})`:''}`}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'description',
                                        readOnly: true,
                                    }}
                                />
                        }
                        <div className={classes.row}>
                            {
                                ['admin', 'суперорганизация', 'организация', 'агент'].includes(profile.role)?
                                    router.query.id==='new'?
                                        <Button onClick={async()=>{
                                            if (name.length>0&&number.length>0) {
                                                const action = async() => {
                                                    let equipment = {
                                                        name: name,
                                                        number: number,
                                                        organization: organization._id
                                                    }
                                                    if(client&&client._id)
                                                        equipment.client = client._id
                                                    await addEquipment(equipment)
                                                    Router.push(`/equipments/${organization._id}`)
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            } else {
                                                showSnackBar('Заполните все поля')
                                            }
                                        }} size='small' color='primary'>
                                            Добавить
                                        </Button>
                                        :
                                        <>
                                        <Button onClick={async()=>{
                                            let editElement = {_id: data.equipment._id}
                                            if(name.length>0&&name!==data.equipment.name)editElement.name = name
                                            if(number.length>0&&number!==data.equipment.number)editElement.number = number
                                            if(client._id&&client._id!==data.equipment.client._id)editElement.client = client._id
                                            const action = async() => {
                                                await setEquipment(editElement)
                                            }
                                            setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }} size='small' color='primary'>
                                            Сохранить
                                        </Button>
                                        <Button onClick={
                                            async()=>{
                                                const action = async() => {
                                                    await deleteEquipment([data.equipment._id])
                                                    Router.push('/equipments')
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            }
                                        } size='small' color='secondary'>
                                            Удалить
                                        </Button>
                                        </>
                                    :
                                    null
                            }
                        </div>
                        </>
                        :
                        'Ничего не найдено'
                }
                </CardContent>
            </Card>
        </App>
    )
})

Equipment.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!(['admin', 'суперорганизация', 'организация', 'менеджер', 'агент', 'ремонтник'].includes(ctx.store.getState().user.profile.role)))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/contact'
            })
            ctx.res.end()
        } else
            Router.push('/contact')
    return {
        data: {
            ...ctx.query.id!=='new'?await getEquipment({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined):{equipment:{name: '',number: '',client: null,organization: null,}},
            activeOrganization: ctx.store.getState().user.profile.organization?[]:[{name: 'AZYK.STORE', _id: 'super'}, ...(await getActiveOrganization(ctx.store.getState().app.city, ctx.req?await getClientGqlSsr(ctx.req):undefined)).activeOrganization]
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

export default connect(mapStateToProps, mapDispatchToProps)(Equipment);