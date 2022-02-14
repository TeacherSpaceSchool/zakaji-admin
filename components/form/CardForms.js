import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import cardFormStyle from '../../src/styleMUI/form/cardForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import {pdDDMMYYHHMM} from '../../src/lib'
import Button from '@material-ui/core/Button';
import { deleteTemplateForm } from '../../src/gql/form'
import Confirmation from '../dialog/Confirmation'
import Router from 'next/router'
import Link from 'next/link';

const CardForm = React.memo((props) => {
    const classes = cardFormStyle();
    const { element, setList, list, idx } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
            <Link href={profile.role==='client'?{ pathname: '/form/[id]', query: { templateform: element._id}}:`/forms/[id]`} as={profile.role==='client'?`/form/new?templateform=${element._id}`:`/forms/${element._id}`}>
                <CardContent>
                    <div className={classes.date}>
                        {pdDDMMYYHHMM(element.createdAt)}
                    </div>
                    <h3 className={classes.input}>
                        {element.title}
                    </h3>
                    <div className={classes.row}>
                        <div className={classes.nameField}>Организация:&nbsp;</div>
                        <div className={classes.value}>{element.organization.name}</div>
                    </div>
                </CardContent>
            </Link>
            {['admin', 'суперорганизация', 'организация'].includes(profile.role)?
            <CardActions>
                <Button onClick={async()=>{
                    Router.push(`/forms/analysis/${element._id}`)
                }} size='small' color='primary'>
                    Анализировать
                </Button>
                    <Button onClick={async()=>{
                        Router.push(`/forms/edit/${element._id}`)
                    }} size='small' color='primary'>
                        Редактировать
                    </Button>
                    <Button onClick={async()=>{
                        const action = async() => {
                            await deleteTemplateForm([element._id])
                            list.splice(idx, 1)
                            setList([...list])
                        }
                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                        showMiniDialog(true)
                    }} size='small' color='secondary'>
                        Удалить
                    </Button>
                </CardActions>
                :
                null
            }
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardForm)