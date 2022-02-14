import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addReturned } from '../../src/gql/returned'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import Router from 'next/router'
import Confirmation from './Confirmation'
import Link from 'next/link';
import { addAgentHistoryGeo } from '../../src/gql/agentHistoryGeo'
import {getGeoDistance} from '../../src/lib'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const ReturnedConfirmed =  React.memo(
    (props) =>{
        const { isMobileApp } = props.app;
        const { client, allPrice, organization, items, geo } = props;
        const { showMiniDialog, setMiniDialog } = props.mini_dialogActions;
        const { classes } = props;
        const width = isMobileApp? (window.innerWidth-112) : 500
        let [coment, setComent] = useState('');
        let [inv, setInv] = useState(false);
        let handleComent =  (event) => {
            setComent(event.target.value)
        };
        return (
            <div className={classes.main}>
                <div style={{width: width}} className={classes.itogo}><b>Адрес доставки: &nbsp;</b>{client.address[0][0]}</div>
                <Link href={'client/[id]'} as={`/client/${client._id}`}>
                    Изменить адрес
                </Link>
                <br/>
                <Input
                    style={{width: width}}
                    placeholder='Комментарий'
                    value={coment}
                    className={isMobileApp?classes.inputM:classes.inputD}
                    onChange={handleComent}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                />
                <br/>
                <FormControlLabel
                    style={{width: width}}
                    onChange={(e)=>{
                        setInv(e.target.checked)
                    }}
                    control={<Checkbox/>}
                    label={'Cчет фактура'}
                />
                <div style={{width: width}} className={classes.itogo}><b>Итого:</b>{` ${allPrice} сом`}</div>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={async()=>{
                        const action = async () => {
                            if (geo&&client.address[0][1].includes(', ')) {
                                let distance = getGeoDistance(geo.coords.latitude, geo.coords.longitude, ...(client.address[0][1].split(', ')))
                                if(distance<1000){
                                    await addAgentHistoryGeo({client: client._id, geo: `${geo.coords.latitude}, ${geo.coords.longitude}`})
                                }
                            }

                            await addReturned({
                                inv,
                                info: coment,
                                address: client.address[0],
                                organization: organization._id,
                                client: client._id,
                                items: Object.values(items)
                            })
                            Router.push('/returneds')
                            showMiniDialog(false);
                        }
                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                    }} className={classes.button}>
                        Добавить
                    </Button>
                    <Button variant='contained' color='secondary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
                        Закрыть
                    </Button>
                </div>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

ReturnedConfirmed.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(ReturnedConfirmed));