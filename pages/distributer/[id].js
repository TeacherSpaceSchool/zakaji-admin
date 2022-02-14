import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getOrganization } from '../../src/gql/organization'
import { getDistributer, setDistributer, addDistributer } from '../../src/gql/distributer'
import { getOrganizations } from '../../src/gql/organization'
import distributerStyle from '../../src/styleMUI/distributer/distributer'
import { useRouter } from 'next/router'
import Card from '@material-ui/core/Card';
import CardOrganization from '../../components/organization/CardOrganization';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import initialApp from '../../src/initialApp'
import CardOrganizationPlaceholder from '../../components/organization/CardOrganizationPlaceholder'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
const height = 140

const Confirmation = dynamic(() => import('../../components/dialog/Confirmation'))

const Distributer = React.memo((props) => {
    const classes = distributerStyle();
    const { data } = props;
    const router = useRouter()
    const {search, isMobileApp, filter, city } = props.app;
    let [pagination, setPagination] = useState(100);
    const checkPagination = ()=>{
        if(pagination<allOrganizations.length){
            setPagination(pagination+100)
        }
    }
    let [allOrganizations, setAllOrganizations] = useState(data.organizations);
    const organization = router.query.id==='super'?{name: 'AZYK.STORE', _id: 'super'}:data.organization
    let [sales, setSales] = useState(data.distributer?data.distributer.sales:[]);
    let [provider, setProvider] = useState(data.distributer?data.distributer.provider:[]);
    const initialRender = useRef(true);
    useEffect(()=>{
        (async()=>{
            if(initialRender.current) {
                initialRender.current = false;
            } else {
                allOrganizations = (await getOrganizations({search: '', filter: '', city: city})).organizations
                setAllOrganizations(allOrganizations)
                setPagination(100);
                (document.getElementsByClassName('App-body'))[0].scroll({top: 0, left: 0, behavior: 'instant' });
                forceCheck();
            }
        })()
    },[city])
    let [filtredOrganizations, setFiltredOrganizations] = useState([]);
    let [selectType, setSelectType] = useState('Все');
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const _new = !data.distributer||!data.distributer._id
    useEffect(()=>{
        (async()=>{
            if(organization) {
                setPagination(100)
                let filtredOrganizations = []
                if (selectType == 'Все')
                    filtredOrganizations=allOrganizations.filter((element)=>element._id!==organization._id&&element.name.toLowerCase().includes(search.toLowerCase()))
                else if (selectType == 'Свободные')
                    filtredOrganizations=allOrganizations.filter((element)=>(filter==='sales'?!sales.includes(element._id):!provider.includes(element._id))&&element._id!==organization._id&&element.name.toLowerCase().includes(search.toLowerCase()))
                else if (selectType == 'Выбраные')
                    filtredOrganizations=allOrganizations.filter((element)=>(filter==='sales'?sales.includes(element._id):provider.includes(element._id))&&element._id!==organization._id&&element.name.toLowerCase().includes(search.toLowerCase()))
                setFiltredOrganizations([...filtredOrganizations])
            }
        })()
    },[selectType, sales, provider, search, allOrganizations])
    const filters = [
        ...router.query.id==='super'?[]:[{name: 'Отдел продаж', value: 'sales'}],
        {name: 'Поставщик', value: 'provider'},
    ]
    return (
        <App cityShow searchShow={true} filters={filters} checkPagination={checkPagination} pageName={data.district?router.query.id==='new'?'Добавить':data.district.name:'Ничего не найдено'}>
            <Head>
                <title>{organization?organization.name:'Ничего не найдено'}</title>
                <meta name='description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:title' content={organization?organization.name:'Ничего не найдено'} />
                <meta property='og:description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property="og:url" content={`${urlMain}/distributer/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/distributer/${router.query.id}`}/>
            </Head>
            <Card className={isMobileApp?classes.pageM:classes.pageD}>
                {organization?
                    <>
                    <CardContent className={classes.column}>
                            <TextField
                                label='Название'
                                value={organization.name}
                                className={isMobileApp?classes.inputM:classes.inputDF}
                                inputProps={{
                                    'aria-label': 'description',
                                    readOnly: true,
                                }}
                            />
                            <br/>
                            <div style={{ justifyContent: 'center' }} className={classes.row}>
                                <div style={{background: selectType==='Все'?'#ffb300':'#ffffff'}} onClick={()=>{setSelectType('Все')}} className={classes.selectType}>
                                    Все
                                </div>
                                <div style={{background: selectType==='Свободные'?'#ffb300':'#ffffff'}} onClick={()=>{setSelectType('Свободные')}} className={classes.selectType}>
                                    Своб
                                </div>
                                <div style={{background: selectType==='Выбраные'?'#ffb300':'#ffffff'}} onClick={()=>{setSelectType('Выбраные')}} className={classes.selectType}>
                                    Выбр {filter==='sales'?sales.length:provider.length}
                                </div>
                            </div>
                            <br/>
                            <div className={classes.listInvoices}>
                                {filtredOrganizations?filtredOrganizations.map((element, idx)=> {
                                    if (idx <= pagination)
                                        return (
                                            <div key={element._id} style={isMobileApp ? {alignItems: 'baseline'} : {}}
                                                     className={isMobileApp ? classes.column : classes.row}>
                                                    <LazyLoad scrollContainer={'.App-body'} key={element._id}
                                                              height={height} offset={[height, 0]} debounce={0}
                                                              once={true}
                                                              placeholder={<CardOrganizationPlaceholder height={height}/>}>
                                                        <div>
                                                            <Checkbox checked={filter==='sales'?sales.includes(element._id):provider.includes(element._id)}
                                                                      onChange={() => {
                                                                          if (filter==='sales'?!sales.includes(element._id):!provider.includes(element._id)) {
                                                                              (filter==='sales'?sales:provider).push(element._id)
                                                                          } else {
                                                                              (filter==='sales'?sales:provider).splice((filter==='sales'?sales:provider).indexOf(element._id), 1)
                                                                          }
                                                                          filter==='sales'?setSales([...sales]):setProvider([...provider])
                                                                      }}
                                                            />
                                                            <CardOrganization element={element}/>
                                                        </div>
                                                    </LazyLoad>
                                                </div>
                                        )
                                    else return null
                                }):null}
                            </div>
                            <div className={isMobileApp?classes.bottomRouteM:classes.bottomRouteD}>
                                <Button onClick={async()=>{
                                    const action = async() => {
                                        if(_new){
                                            await addDistributer({
                                                distributer: organization._id,
                                                sales: sales,
                                                provider: provider
                                            })
                                        }
                                        else {
                                            let editElement = {
                                                _id: data.distributer._id,
                                                sales: sales,
                                                provider: provider
                                            }
                                            await setDistributer(editElement)
                                        }
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} size='small' color='primary'>
                                    Сохранить
                                </Button>
                            </div>
                    </CardContent>
                    </>
                    :
                    <CardContent className={classes.column}>
                        Ничего не найдено
                    </CardContent>
                }
            </Card>
        </App>
    )
})

Distributer.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    ctx.store.getState().app.filter = ctx.query.id==='super'?'provider':'sales'
    if('admin'!==ctx.store.getState().user.profile.role)
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/contact'
            })
            ctx.res.end()
        } else
                Router.push('/contact')
    let distributer = (await getDistributer({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)).distributer
    let organization = (await getOrganization({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)).organization

    if(distributer){
        distributer.sales = distributer.sales.map(element=>element._id)
        distributer.provider = distributer.provider.map(element=>element._id)
    }
    else {
        distributer = {
            distributer: organization,
            sales: [],
            provider: [],
        }
    }
    return {
        data: {
            distributer: distributer,
            ...await getOrganizations({search: '', filter: '', city: ctx.store.getState().app.city}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
            organization: organization
        }
    };
};

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Distributer);