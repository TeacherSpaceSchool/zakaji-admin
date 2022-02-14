import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getRepairEquipment, setRepairEquipment, deleteRepairEquipment, addRepairEquipment, getEquipments} from '../../src/gql/equipment'
import organizationStyle from '../../src/styleMUI/equipment/equipment'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { useRouter } from 'next/router'
import { getActiveOrganization } from '../../src/gql/statistic'
import Router from 'next/router'
import * as snackbarActions from '../../redux/actions/snackbar'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../../components/dialog/Confirmation'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import Autocomplete from '@material-ui/lab/Autocomplete';
import initialApp from '../../src/initialApp'
import Remove from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const RepairEquipment = React.memo((props) => {
    const { profile } = props.user;
    const classes = organizationStyle();
    const { data } = props;
    const { isMobileApp, city } = props.app;
    const { showSnackBar } = props.snackbarActions;
    const initialRender = useRef(true);
    let [accept, setAccept] = useState(data.repairEquipment?data.repairEquipment.accept:false);
    let [done, setDone] = useState(data.repairEquipment?data.repairEquipment.done:false);
    let [cancel, setCancel] = useState(data.repairEquipment?data.repairEquipment.cancel:false);
    let [equipments, setEquipments] = useState([]);
    let [activeOrganization, setActiveOrganization] = useState(data.activeOrganization);
    let [defect, setDefect] = useState(data.repairEquipment?data.repairEquipment.defect:[]);
    let [repair, setRepair] = useState(data.repairEquipment?data.repairEquipment.repair:[]);
    let [organization, setOrganization] = useState(data.repairEquipment!==null?data.repairEquipment.organization:undefined);
    let [equipment, setEquipment] = useState(data.repairEquipment!==null?data.repairEquipment.equipment:undefined);
    let handleOrganization = async (organization) => {
        setOrganization(organization)
    };
    useEffect(()=>{
        (async()=>{
            if(organization)
                setEquipments((await getEquipments({organization: organization._id, search: '', sort: '-createdAt'})).equipments)
        })()
    },[organization])
    let handleEquipment =  (equipment) => {
        setEquipment(equipment)
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
        <App cityShow={router.query.id==='new'} pageName={data.repairEquipment?router.query.id==='new'?'Добавить':data.repairEquipment.number:'Ничего не найдено'}>
            <Head>
                <title>{data.repairEquipment!==null?router.query.id==='new'?'Добавить':data.repairEquipment.number:'Ничего не найдено'}</title>
                <meta name='description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:title' content={data.repairEquipment!==null?router.query.id==='new'?'Добавить':data.repairEquipment.number:'Ничего не найдено'} />
                <meta property='og:description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/repairEquipment/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/repairEquipment/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                {
                    data.repairEquipment!==null?
                        <>
                        {
                            !profile.organization&& router.query.id==='new'?
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
                                !profile.organization&&organization.name?
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
                        {
                            profile.role!=='ремонтник'&&!data.repairEquipment.accept&&!data.repairEquipment.cancel?
                                <Autocomplete
                                    className={classes.input}
                                    options={equipments}
                                    getOptionLabel={option => `${option.name}, №${option.number}`}
                                    value={equipment}
                                    onChange={(event, newValue) => {
                                        handleEquipment(newValue)
                                    }}
                                    noOptionsText='Ничего не найдено'
                                    renderInput={params => (
                                        <TextField {...params} label='Выберите оборудование' fullWidth />
                                    )}
                                />
                                :
                                <TextField
                                    label='Оборудование'
                                    value={`${data.repairEquipment.equipment.name}, №${data.repairEquipment.equipment.number}`}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'description',
                                        readOnly: true,
                                    }}
                                />
                        }
                        {
                            data.repairEquipment.equipment&&data.repairEquipment.equipment.client?
                                <TextField
                                    label='Клиент'
                                    value={`${data.repairEquipment.equipment.client.name}${data.repairEquipment.equipment.client.address&&data.repairEquipment.equipment.client.address[0]?` (${data.repairEquipment.equipment.client.address[0][2]?`${data.repairEquipment.equipment.client.address[0][2]}, `:''}${data.repairEquipment.equipment.client.address[0][0]})`:''}`}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'description',
                                        readOnly: true,
                                    }}
                                />
                                :
                                null
                        }
                        {
                            data.repairEquipment.agent?
                                <TextField
                                    label='Агент'
                                    value={data.repairEquipment.agent.name}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'description',
                                        readOnly: true,
                                    }}
                                />
                                :
                                null
                        }
                        {
                            data.repairEquipment.repairman?
                                <TextField
                                    label='Ремонтник'
                                    value={data.repairEquipment.repairman.name}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'description',
                                        readOnly: true,
                                    }}
                                />
                                :
                                null
                        }
                        <ExpansionPanel className={classes.input}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <h3>
                                    Неисправностей {defect.length}
                                </h3>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.column}>
                                {defect?defect.map((element, idx)=>
                                    <div className={classes.input} key={`defect${idx}`}>
                                        <FormControl className={classes.input}>
                                            <InputLabel>{`Неисправность ${idx+1}`}</InputLabel>
                                            <Input
                                                placeholder={`Неисправность ${idx+1}`}
                                                value={element}
                                                className={classes.input}
                                                onChange={(event)=>{
                                                    defect[idx] = event.target.value
                                                    setDefect([...defect])
                                                }}
                                                inputProps={{
                                                    'aria-label': 'description',
                                                    readOnly: profile.role==='ремонтник'||data.repairEquipment.accept||data.repairEquipment.cancel
                                                }}
                                                endAdornment={
                                                    profile.role!=='ремонтник'&&!data.repairEquipment.accept&&!data.repairEquipment.cancel?
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={()=>{
                                                                    defect.splice(idx, 1);
                                                                    setDefect([...defect])
                                                                }}
                                                            >
                                                                <Remove/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                        :
                                                        null
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                ): null}
                                {
                                    profile.role!=='ремонтник'&&!data.repairEquipment.accept&&!data.repairEquipment.cancel?
                                        <Button onClick={async()=>{
                                            defect = [...defect, '']
                                            setDefect(defect)
                                        }} size='small' color='primary'>
                                            Добавить неисправность
                                        </Button>
                                        :
                                        null
                                }
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {
                            accept?
                                <ExpansionPanel className={classes.input}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <h3>
                                            Ремонт {repair.length}
                                        </h3>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className={classes.column}>
                                        {repair?repair.map((element, idx)=>
                                            <div className={classes.input} key={`repair${idx}`}>
                                                <FormControl className={classes.input}>
                                                    <InputLabel>{`Ремонт ${idx+1}`}</InputLabel>
                                                    <Input
                                                        placeholder={`Ремонт ${idx+1}`}
                                                        value={element}
                                                        className={classes.input}
                                                        onChange={(event)=>{
                                                            repair[idx] = event.target.value
                                                            setRepair([...repair])
                                                        }}
                                                        inputProps={{
                                                            'aria-label': 'description',
                                                            readOnly: !['admin', 'ремонтник'].includes(profile.role)||data.repairEquipment.done
                                                        }}
                                                        endAdornment={
                                                            ['admin', 'ремонтник'].includes(profile.role)&&!data.repairEquipment.done?
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={()=>{
                                                                            repair.splice(idx, 1);
                                                                            setRepair([...repair])
                                                                        }}
                                                                    >
                                                                        <Remove/>
                                                                    </IconButton>
                                                                </InputAdornment>
                                                                :
                                                                null
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                        ): null}
                                        {
                                            ['admin', 'ремонтник'].includes(profile.role)&&!data.repairEquipment.done ?
                                                <Button onClick={async () => {
                                                    repair = [...repair, '']
                                                    setRepair(repair)
                                                }} size='small' color='primary'>
                                                    Добавить ремонт
                                                </Button>
                                                :
                                                null
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                null
                        }
                        {
                            router.query.id!=='new'?
                                <>
                                <FormControlLabel
                                    disabled={!(['admin', 'ремонтник'].includes(profile.role)&&!cancel&&!done)}
                                    control={
                                        <Checkbox
                                            checked={accept}
                                            onChange={()=>{
                                                setAccept(!accept)
                                            }}
                                            color='primary'
                                        />
                                    }
                                    label={'Заявка принята'}
                                />
                                <FormControlLabel
                                    disabled={!(['admin', 'ремонтник'].includes(profile.role)&&!cancel&&data.repairEquipment.accept&&!data.repairEquipment.done)}
                                    control={
                                        <Checkbox
                                            checked={done}
                                            onChange={()=>{
                                                setDone(!done)
                                            }}
                                            color='primary'
                                        />
                                    }
                                    label={'Заявка выполнена'}
                                />
                                <FormControlLabel
                                    disabled={!(['агент', 'admin', 'суперагент', 'суперорганизация', 'организация'].includes(profile.role)&&!accept)}
                                    control={
                                        <Checkbox
                                            checked={cancel}
                                            onChange={()=>{
                                                setCancel(!cancel)
                                            }}
                                            color='secondary'
                                        />
                                    }
                                    label={'Заявка отменена'}
                                />
                                </>
                                :
                                null
                        }
                        <div className={classes.row}>
                            {
                                router.query.id==='new'?
                                    <Button onClick={async()=>{
                                        if (defect.length>0&&equipment&&equipment._id) {
                                            const action = async() => {
                                                let repairEquipment = {organization: organization._id, equipment: equipment._id, defect: defect}
                                                await addRepairEquipment(repairEquipment)
                                                Router.push(`/repairequipments/${organization&&organization._id?organization._id:profile.organization}`)
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
                                        let editElement = {_id: data.repairEquipment._id}
                                        if(accept!==data.repairEquipment.accept)editElement.accept = accept
                                        if(done!==data.repairEquipment.done)editElement.done = done
                                        if(cancel!==data.repairEquipment.cancel)editElement.cancel = cancel
                                        if(profile.role!=='ремонтник'&&!data.repairEquipment.accept&&!data.repairEquipment.cancel)editElement.defect = defect
                                        if(profile.role!=='ремонтник'&&!data.repairEquipment.accept&&!data.repairEquipment.cancel)editElement.equipment = equipment
                                        if(['admin', 'ремонтник'].includes(profile.role)&&!data.repairEquipment.done&&data.repairEquipment.accept)editElement.repair = repair
                                        const action = async() => {
                                            await setRepairEquipment(editElement)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    }} size='small' color='primary'>
                                        Сохранить
                                    </Button>
                                    {
                                        data.repairEquipment.cancel?
                                            <Button onClick={
                                                async()=>{
                                                    const action = async() => {
                                                        await deleteRepairEquipment([data.equipment._id])
                                                        Router.push(`/repairequipments/${organization._id}`)
                                                    }
                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                    showMiniDialog(true)
                                                }
                                            } size='small' color='secondary'>
                                                Удалить
                                            </Button>
                                            :
                                            null
                                    }
                                    </>
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

RepairEquipment.getInitialProps = async function(ctx) {
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
            ...ctx.query.id!=='new'?await getRepairEquipment({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined):{repairEquipment:{defect: [],repair: [],equipment: undefined,organization: undefined}},
            activeOrganization: ctx.store.getState().user.profile.organization?[]:[{name: 'AZYK.STORE', _id: 'super'}, ...(await getActiveOrganization(ctx.store.getState().app.city, ctx.req?await getClientGqlSsr(ctx.req):undefined)).activeOrganization],
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

export default connect(mapStateToProps, mapDispatchToProps)(RepairEquipment);