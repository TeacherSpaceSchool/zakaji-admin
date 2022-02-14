import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import CardOfflineOrder from '../../components/offlineorder/CardOfflineOrder';
import pageListStyle from '../../src/styleMUI/offlineorder/offlineOrderList'
import { connect } from 'react-redux'
import { urlMain } from '../../redux/constants/other'
import LazyLoad from 'react-lazyload';
import CardOfflineOrderPlaceholder from '../../components/offlineorder/CardOfflineOrderPlaceholder'
import initialApp from '../../src/initialApp'
import Router from 'next/router'
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Clear';
import Confirmation from '../../components/dialog/Confirmation'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { clearAllOfflineOrders, getAllOfflineOrders } from '../../src/service/idb/offlineOrders';

const OfflineOrder = React.memo((props) => {
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const classes = pageListStyle();
    let [list, setList] = useState([]);
    useEffect(()=>{
        (()=>{
            if(process.browser) {
                setTimeout(async ()=>{
                    setList(await getAllOfflineOrders())
                }, 1000)
            }
        })()
    },[process.browser])
    return (
        <App pageName='Оффлайн заказы'>
            <Head>
                <title>Оффлайн заказы</title>
                <meta name='description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:title' content='Оффлайн заказы' />
                <meta property='og:description' content='Азык – это онлайн платформа для заказа товаров оптом, разработанная специально для малого и среднего бизнеса.  Она объединяет производителей и торговые точки напрямую, сокращая расходы и повышая продажи. Азык предоставляет своим пользователям мощные технологии для масштабирования и развития своего бизнеса.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property="og:url" content={`${urlMain}/statistic/offlineorder`} />
                <link rel='canonical' href={`${urlMain}/statistic/offlineorder`}/>
            </Head>
            <div className={classes.page}>
                {list?
                    <>
                    <div className='count'>
                        {`Всего сбоев: ${list.length}`}
                    </div>
                    {
                        list.map((element, idx) =>
                            <LazyLoad scrollContainer={'.App-body'} key={element._id} height={120} offset={[120, 0]}
                                      debounce={0} once={true} placeholder={<CardOfflineOrderPlaceholder/>}>
                                <CardOfflineOrder idx={idx} element={element} list={list} setList={setList}/>
                            </LazyLoad>
                        )
                    }
                    </>
                    :
                    null}
            </div>
            <Fab onClick={async()=>{
                    const action = async() => {
                        await clearAllOfflineOrders()
                        setList([])
                    }
                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                    showMiniDialog(true)
                }} color='primary' aria-label='add' className={classes.fab}>
                <RemoveIcon />
            </Fab>
        </App>
    )
})

OfflineOrder.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!ctx.store.getState().user.profile.role.includes('агент'))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/contact'
            })
            ctx.res.end()
        } else
            Router.push('/contact')
    return {};
};

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineOrder);