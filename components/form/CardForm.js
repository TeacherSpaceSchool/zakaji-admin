import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import cardFormStyle from '../../src/styleMUI/form/cardForm'
import { connect } from 'react-redux'
import {pdDDMMYYHHMM} from '../../src/lib'
import Link from 'next/link';

const CardForm = React.memo((props) => {
    const classes = cardFormStyle();
    const { element, templateForm } = props;
    const { isMobileApp } = props.app;
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
            <Link href={{ pathname: '/form/[id]', query: { templateform: templateForm} }} as={`/form/${element._id}?templateform=${templateForm}`}>
                <CardContent>
                    <div className={classes.date}>
                        {pdDDMMYYHHMM(element.createdAt)}
                    </div>
                    <br/>
                    <div className={classes.row}>
                        <div className={classes.nameField}>Клиент:&nbsp;</div>
                        <div className={classes.value}>{`${element.client.name}${element.client.address&&element.client.address[0]?` (${element.client.address[0][2]?`${element.client.address[0][2]}, `:''}${element.client.address[0][0]})`:''}`}</div>
                    </div>
                    {
                        element.agent?
                            <div className={classes.row}>
                                <div className={classes.nameField}>Агент:&nbsp;</div>
                                <div className={classes.value}>{element.agent.name}</div>
                            </div>
                            :
                            null
                    }
                </CardContent>
            </Link>
        </Card>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CardForm)