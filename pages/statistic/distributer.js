import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import pageListStyle from '../../src/styleMUI/statistic/statistic'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Router from 'next/router'
import { urlMain } from '../../redux/constants/other'
import initialApp from '../../src/initialApp'
import Table from '../../components/app/Table'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { getStatisticDistributer } from '../../src/gql/statistic'
import { getDistributers } from '../../src/gql/distributer'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as appActions from '../../redux/actions/app'
import { pdDatePicker } from '../../src/lib'

const DistributerStatistic = React.memo((props) => {

    const classes = pageListStyle();
    const { data } = props;
    const { isMobileApp, date, filter, city } = props.app;
    const { profile } = props.user;
    let [dateType, setDateType] = useState('day');
    let [statistic, setStatistic] = useState(undefined);
    let [showStat, setShowStat] = useState(false);
    let [organization, setOrganization] = useState(undefined);
    let [distributer, setDistributer] = useState(profile.organization?{distributer: {_id: profile.organization}}:undefined);
    let handleDistributer = ((value) => {
        setDistributer(value)
    })
    const { showLoad } = props.appActions;
    useEffect(()=>{
        (async()=>{
            if(distributer) {
                await showLoad(true)
                setStatistic((await getStatisticDistributer({
                    distributer: distributer.distributer._id,
                    organization: organization ? organization._id : undefined,
                    type: filter,
                    dateStart: date ? date : null,
                    dateType: dateType,
                    city: city
                })).statisticDistributer)
                await showLoad(false)
            }
        })()
    },[organization, date, dateType, filter, distributer, city])
    useEffect(()=>{
        if(process.browser){
            let appBody = document.getElementsByClassName('App-body')
            appBody[0].style.paddingBottom = '0px'
        }
    },[process.browser])

    const filters = [{name: 'Организации', value: 'all'}, {name: 'Районы', value: 'districts'}, {name: 'Агенты', value: 'agents'}]
    return (
        <App cityShow pageName='Статистика дистрибьюторов' dates={true} filters={filters}>
            <Head>
                <title>Статистика дистрибьюторов</title>
                <meta name='description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:title' content='Статистика дистрибьюторов'/>
                <meta property='og:description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/statistic/distributer`} />
                <link rel='canonical' href={`${urlMain}/statistic/distributer`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    <div className={classes.row}>
                        <Button style={{width: 50, margin: 5}} variant='contained' onClick={()=>setDateType('day')} size='small' color={dateType==='day'?'primary':''}>
                            День
                        </Button>
                        <Button style={{width: 50, margin: 5}} variant='contained' onClick={()=>setDateType('week')} size='small' color={dateType==='week'?'primary':''}>
                            Неделя
                        </Button>
                        <Button style={{width: 50, margin: 5}} variant='contained' onClick={()=>setDateType('month')} size='small' color={dateType==='month'?'primary':''}>
                            Месяц
                        </Button>
                        <Button style={{width: 50, margin: 5}} variant='contained' onClick={()=>setDateType('year')} size='small' color={dateType==='year'?'primary':''}>
                            Год
                        </Button>
                    </div>
                    {
                        profile.role === 'admin' ?
                            <div className={classes.row}>
                                <Autocomplete
                                    className={classes.input}
                                    options={data.distributers}
                                    getOptionLabel={option => option.distributer.name}
                                    value={distributer}
                                    onChange={(event, newValue) => {
                                        handleDistributer(newValue)
                                    }}
                                    noOptionsText='Ничего не найдено'
                                    renderInput={params => (
                                        <TextField {...params} label='Дистрибьютор' fullWidth/>
                                    )}
                                />
                                <Autocomplete
                                    className={classes.input}
                                    options={distributer?distributer.sales:[]}
                                    getOptionLabel={option => option.name}
                                    value={organization}
                                    onChange={(event, newValue) => {
                                        setOrganization(newValue)
                                    }}
                                    noOptionsText='Ничего не найдено'
                                    renderInput={params => (
                                        <TextField {...params} label='Организация' fullWidth />
                                    )}
                                />
                            </div>
                            :
                            null
                    }
                    {
                        statistic?
                            <Table type='item' row={(statistic.row).slice(1)} columns={statistic.columns}/>
                            :null
                    }
                </CardContent>
            </Card>
            <div className='count' onClick={()=>setShowStat(!showStat)}>
                {
                    statistic?
                        <>
                        <div className={classes.rowStatic}>{`${'Агентов'}: ${statistic.row[0].data[0]}`}</div>
                        {
                            showStat?
                                <>
                                <div className={classes.rowStatic}>{`Всего выручка: ${statistic.row[0].data[1]} сом`}</div>
                                <div className={classes.rowStatic}>{`Выполнено: ${statistic.row[0].data[2]} шт`}</div>
                                <div className={classes.rowStatic}>{`Отказов: ${statistic.row[0].data[3]} сом`}</div>
                                <div className={classes.rowStatic}>{`Конс: ${statistic.row[0].data[4]} сом`}</div>
                                </>
                                :
                                null
                        }
                        </>
                        :null
                }
            </div>
        </App>
    )
})

DistributerStatistic.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    ctx.store.getState().app.filter = 'all'
    ctx.store.getState().app.date = pdDatePicker(new Date())
    if(!['admin', 'суперорганизация'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/contact'
            })
            ctx.res.end()
        } else
            Router.push('/contact')
    let distributers = (await getDistributers({search: '', sort: 'name'},ctx.req?await getClientGqlSsr(ctx.req):undefined)).distributers
    distributers = distributers.filter(distributer=>distributer.sales.length>0)
    return {
        data: {
            distributers: distributers
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

        appActions: bindActionCreators(appActions, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributerStatistic);