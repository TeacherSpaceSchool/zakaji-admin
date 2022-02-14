import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getAdss, checkAdss} from '../../src/gql/ads'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import CardAds from '../ads/CardAds'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import Checkbox from '@material-ui/core/Checkbox';

const OrderAdss =  React.memo(
    (props) =>{
        const { classes, organization, setAdss, adss, invoice } = props;
        let [selectedAdss, setSelectedAdss] = useState(adss);
        let [allAdss, setAllAdss] = useState([]);
        useEffect(()=>{
            (async()=>{
                setAllAdss((await getAdss({search: '', organization: organization})).adss)
            })()
        },[])
        const { isMobileApp } = props.app;
        const { profile } = props.user;
        const { showFullDialog } = props.mini_dialogActions;
        return (
            <div className={classes.main}>
                {allAdss?allAdss.map((element)=> {
                    let index=undefined;
                    for(let i=0; i<selectedAdss.length; i++){
                        if(selectedAdss[i]._id===element._id)
                            index = i
                    }
                        if(profile.role!=='client') return (
                            <div key={element._id} style={isMobileApp ? {alignItems: 'baseline'} : {}}
                                 className={isMobileApp ? classes.column : classes.row}>
                                    <div>
                                        <Checkbox checked={index!==undefined}
                                                  onChange={() => {
                                                      if (index===undefined) {
                                                          selectedAdss.push(element)
                                                      } else {
                                                          selectedAdss.splice(index, 1)
                                                      }
                                                      setSelectedAdss([...selectedAdss])
                                                  }}
                                        />
                                        <CardAds element={element}/>
                                    </div>
                            </div>
                        )
                    else if(index!==undefined) return <CardAds element={element}/>
                }):null}
                <br/>
                <center>
                    <Button variant="contained" color="primary" onClick={async()=>{
                        let _checkAdss = (await checkAdss(invoice)).checkAdss
                        for(let i=0; i<_checkAdss.length; i++){
                            let index = selectedAdss.findIndex(element=>element._id===_checkAdss[i])
                            if(index===-1) {
                                selectedAdss.push(allAdss[allAdss.findIndex(element => element._id === _checkAdss[i])])
                                setSelectedAdss([...selectedAdss])
                            }
                        }
                    }} className={classes.button}>
                        Подобрать акции
                    </Button>
                </center>
                <br/>
                <div>
                    {
                        profile.role!=='client'?
                            <Button variant="contained" color="primary" onClick={async()=>{
                                await setAdss(selectedAdss);
                                showFullDialog(false);
                            }} className={classes.button}>
                                Принять
                            </Button>
                            :
                            null
                    }
                    <Button variant="contained" color="secondary" onClick={()=>{showFullDialog(false);}} className={classes.button}>
                        Закрыть
                    </Button>
                </div>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

OrderAdss.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(OrderAdss));