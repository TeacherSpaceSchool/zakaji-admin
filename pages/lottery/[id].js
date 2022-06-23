import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getLottery, deleteLottery, checkWinners } from '../../src/gql/lottery'
import itemStyle from '../../src/styleMUI/lotterys/lottery'
import { useRouter } from 'next/router'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as appActions from '../../redux/actions/app'
import Confirmation from '../../components/dialog/Confirmation'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { countdown } from '../../src/lib'
import TextLottery from '../../components/dialog/TextLottery'
import WinnerListLottery from '../../components/dialog/WinnerListLottery'
import Confetti from 'react-confetti'
import Lightbox from 'react-awesome-lightbox';


const LotteryEdit = React.memo((props) => {
    const classes = itemStyle();
    const { data } = props;
    const router = useRouter()
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    const { setMiniDialog, showMiniDialog, setFullDialog, showFullDialog } = props.mini_dialogActions;
    const { showAppBar } = props.appActions;
    let [countdownData, setCountdownData] = useState({hours: 0, days: 0});
    let [tickets, setTickets] = useState([]);
    const [photoReportsIndex, setPhotoReportsIndex] = useState(0);
    const [photoReportsOpen, setPhotoReportsOpen] = useState(false);
    const [photoReportsImage, setPhotoReportsImage] = useState([]);
    const [photoReportsText, setPhotoReportsText] = useState([]);
    const [prizesIndex, setPrizesIndex] = useState(0);
    const [prizesOpen, setPrizesOpen] = useState(false);
    const [prizesImage, setPrizesImage] = useState([]);
    const [prizesName, setPrizesName] = useState([]);
    const [confetti, setConfetti] = useState(false);
    useEffect(()=>{
        setCountdownData(countdown(data.lottery.date))
        if(profile.role==='client'){
            tickets = []
            for(let i=0; i<data.lottery.tickets.length; i++){
                if(data.lottery.tickets[i].client._id===profile.client)
                    tickets.push(data.lottery.tickets[i])
            }
            setTickets([...tickets])
        }
        if(data.lottery.prizes.length) {
            for (let i = 0; i < data.lottery.prizes.length; i++) {
                prizesImage.push(data.lottery.prizes[i].image)
                prizesName.push(`${data.lottery.prizes[i].name}: ${data.lottery.prizes[i].count} шт`)
                setPrizesImage([...prizesImage])
                setPrizesName([...prizesName])
            }
        }
        if(data.lottery.photoReports.length) {
            for (let i = 0; i < data.lottery.photoReports.length; i++) {
                photoReportsImage.push(data.lottery.photoReports[i].image)
                photoReportsText.push(data.lottery.photoReports[i].text)
                setPhotoReportsImage([...photoReportsImage])
                setPhotoReportsText([...photoReportsText])
            }
        }
        setTimeout(async()=>{
            setConfetti(true)
        }, 1000)
    }, []);
    const [color, setColor] = useState('#000000');
    useEffect(()=>{
        let black = true
        let countdownRef = setInterval(() => {
            setColor(black?'#004C3F':'#000000')
            black = !black
        }, 1000)
        return ()=>{
            clearInterval(countdownRef)
        }
    }, []);
    return (
        <div>
        <App pageName='Лотерея'>
            <Head>
                <title>Лотерея</title>
                <meta name='description' content={data.lottery?data.lottery.text:'Ничего не найдено'} />
                <meta property='og:title' content='Лотерея' />
                <meta property='og:description' content={data.lottery?data.lottery.text:'Ничего не найдено'} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={data.lottery.image} />
                <meta property='og:url' content={`${urlMain}/lottery/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/lottery/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                {
                    data.lottery!==null?
                        <>
                        <img
                            className={isMobileApp?classes.mediaM:classes.mediaD}
                            src={data.lottery.image}
                            alt={'Добавить'}
                        />
                        <div className={classes.row} style={{margin: 10}}>
                            <Button variant='outlined' onClick={async()=>{
                                setMiniDialog('Подробности', <TextLottery text={data.lottery.text}/>)
                                showMiniDialog(true)
                            }} size='small' color='primary'>
                                Подробности
                            </Button>
                            <div className={classes.countdown}>
                                {
                                    data.lottery.status === 'разыграна' ?
                                        <div style={{color: color}}>Разыграна</div>
                                        :
                                        countdownData.days > 0 ?
                                            <div style={{color: color}}>{countdownData.days} дней {countdownData.hours} часов {countdownData.minutes} минут</div>

                                            :
                                            countdownData.hours > 0 ?
                                                <div style={{color: color}}>{countdownData.hours} часов {countdownData.minutes} минут</div>
                                                :
                                                countdownData.minutes > 0 ?
                                                    <div style={{color: color}}>{countdownData.minutes} минут</div>
                                                    :
                                                    <div style={{color: color}}>Сегодня</div>
                                }
                            </div>
                        </div>
                        <CardContent className={classes.column}>
                            {
                                tickets.length?
                                    tickets.map((ticket, idx)=>
                                        <center key={`prize${idx}`}>
                                            <div className="cardWrap">
                                                <div className={`${ticket.status==='победитель'?'cardWin':'card'} cardLeft`}>
                                                    <h1>{ticket.status==='проигравший'?'попробуй еще':ticket.status}</h1>
                                                    <div className="title">
                                                        <h2>{ticket.number}</h2>
                                                        <span>номер</span>
                                                    </div>
                                                    {
                                                        ticket.prize?
                                                            <div className="name">
                                                                <h2>{ticket.prize}</h2>
                                                                <span>приз</span>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div className={`${ticket.status==='победитель'?'cardWin':'card'} cardRight`}>
                                                </div>
                                            </div>
                                        </center>
                                    )
                                    :
                                    null
                            }
                            {
                                data.lottery.status==='разыграна'&&(profile.role==='admin'||(['суперорганизация', 'организация'].includes(profile.role)&&data.lottery.organization._id===profile.organization)||tickets.length)?
                                    <>
                                    <div style={{background: 'url(https://png.pngtree.com/thumb_back/fw800/background/20191228/pngtree-firework-celebration-party-new-year-background-image_325773.jpg) center center no-repeat'}} className='buttonPrize' onClick={()=>{
                                        setFullDialog('Победители', <WinnerListLottery tickets={data.lottery.tickets}/>)
                                        showFullDialog(true)
                                    }}>
                                        <span>Победители</span>
                                    </div>
                                    <br/>
                                    </>
                                    :
                                    null
                            }
                            {
                                photoReportsImage.length?
                                    <>
                                    <div style={{background: 'url(https://klike.net/uploads/posts/2018-07/1531820435_2.jpg) center center no-repeat'}} className='buttonPrize' onClick={()=>{
                                        setPhotoReportsOpen(true)
                                        showAppBar(false)
                                    }}>
                                        <span>{`Фотоотчет: ${photoReportsImage.length}`}</span>
                                    </div>
                                    {
                                        photoReportsOpen?
                                            <Lightbox
                                                images={photoReportsImage}
                                                startIndex={photoReportsIndex}
                                                onClose={() => {showAppBar(true); setPhotoReportsOpen(false)}}
                                            />
                                            :
                                            null
                                    }
                                    <br/>
                                    </>
                                    :
                                    null
                            }
                            {
                                prizesImage.length?
                                    <>
                                    <div style={{background: 'url(https://ak.picdn.net/shutterstock/videos/610861/thumb/1.jpg) center center no-repeat'}} className='buttonPrize' onClick={()=>{
                                        setPrizesOpen(true)
                                        showAppBar(false)
                                    }}>
                                        <span>{`Призы: ${prizesImage.length}`}</span>
                                    </div>
                                    {
                                        prizesOpen?
                                            <Lightbox
                                                mainSrc={prizesImage[prizesIndex]}
                                                nextSrc={prizesImage[(prizesIndex + 1) % prizesImage.length]}
                                                prevSrc={prizesImage[(prizesIndex + prizesImage.length - 1) % prizesImage.length]}
                                                onCloseRequest={() => {showAppBar(true); setPrizesOpen(false)}}
                                                onMovePrevRequest={() => setPrizesIndex((prizesIndex + prizesImage.length - 1) % prizesImage.length)}
                                                onMoveNextRequest={() => setPrizesIndex((prizesIndex + 1) % prizesImage.length)}
                                                imageCaption={prizesName[prizesIndex]}
                                            />
                                            :
                                            null
                                    }
                                    </>
                                    :
                                    null
                            }
                        </CardContent>
                        </>
                        :
                        'Ничего не найдено'
                }
            </Card>
            {profile.role==='admin'||(['суперорганизация', 'организация'].includes(profile.role)&&data.lottery.organization._id===profile.organization)?
                <div className={isMobileApp?classes.bottomRouteM:classes.bottomRouteD}>
                    {
                        data.lottery.status!=='разыграна'?
                            <Button onClick={async()=>{
                                const action = async() => {
                                    await checkWinners({_id: data.lottery._id})
                                    Router.push(`/lottery/${data.lottery._id}`)
                                }
                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                showMiniDialog(true);
                            }} size='small' color='primary'>
                                Разыграть
                            </Button>
                            :
                            null
                    }
                    <Button onClick={async()=>{
                        Router.push(`/lottery/edit/${data.lottery._id}`)
                    }} size='small' color='primary'>
                        Редактировать
                    </Button>
                    <Button onClick={async()=>{
                        const action = async() => {
                            await deleteLottery([data.lottery._id])
                            Router.push('/lotterys')
                        }
                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                        showMiniDialog(true);
                    }} size='small' color='secondary'>
                        Удалить
                    </Button>
                </div>
                :
                null
            }
        </App>
            {
                process.browser&&confetti?
                    <Confetti
                        numberOfPieces={50}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                    :
                    null
            }
        </div>
    )
})

LotteryEdit.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!ctx.store.getState().user.profile.role)
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/contact'
            })
            ctx.res.end()
        } else
            Router.push('/contact')
    return {
        data: await getLottery({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
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
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LotteryEdit);