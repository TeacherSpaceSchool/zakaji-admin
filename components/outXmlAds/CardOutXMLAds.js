import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardPageListStyle from '../../src/styleMUI/blog/cardBlog'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { deleteOutXMLAdsShoro, addOutXMLAdsShoro, setOutXMLAdsShoro } from '../../src/gql/outxmladszakaji'
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as snackbarActions from '../../redux/actions/snackbar'
import Confirmation from '../dialog/Confirmation'
import Autocomplete from '@material-ui/lab/Autocomplete';


const CardOutXMLAds = React.memo((props) => {
    const classes = cardPageListStyle();
    const { element, setList, districts, idx, list, organization } = props;
    const { isMobileApp } = props.app;
    //addCard
    let [guid, setGuid] = useState(element?element.guid:'');
    let handleGuid =  (event) => {
        setGuid(event.target.value)
    };
    let [district, setDistrict] = useState(element?element.district:{})
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
                    <CardActionArea>
                        <CardContent>
                            <TextField
                                style={{width: '100%'}}
                                label='GUID'
                                value={guid}
                                className={classes.input}
                                onChange={handleGuid}
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                            />
                            <br/>
                            <br/>
                            <Autocomplete
                                className={classes.input}
                                options={districts}
                                getOptionLabel={option => option.name}
                                value={district}
                                onChange={(event, newValue) => {
                                    setDistrict(newValue)
                                }}
                                noOptionsText='Ничего не найдено'
                                renderInput={params => (
                                    <TextField {...params} label='Район' fullWidth />
                                )}
                            />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {
                            element!==undefined?
                                <>
                                <Button onClick={async()=>{
                                    if (district !== undefined && district._id && guid.length > 0) {
                                        let editElement = {_id: element._id}
                                        if (guid.length > 0 && guid !== element.guid) editElement.guid = guid
                                        if (district !== undefined && district._id !== element.district._id) editElement.district = district._id
                                        const action = async () => {
                                            await setOutXMLAdsShoro(editElement)
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    } else {
                                        showSnackBar('Заполните все поля')
                                    }
                                }} size='small' color='primary'>
                                    Сохранить
                                </Button>
                                <Button onClick={async()=>{
                                    const action = async() => {
                                        await deleteOutXMLAdsShoro([element._id])
                                        list.splice(idx, 1);
                                        setList([...list])
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} size='small' color='secondary'>
                                    Удалить
                                </Button>
                                </>
                                :
                                <Button onClick={async()=> {
                                    if (district !== undefined && district._id && guid.length > 0) {
                                        const action = async() => {
                                            setList()
                                            setList([
                                                (await addOutXMLAdsShoro({organization: organization, guid: guid, district: district._id})).addOutXMLAdsShoro,
                                                ...list
                                            ])
                                            setDistrict({})
                                            setGuid('')
                                        }
                                        setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                        showMiniDialog(true)
                                    } else {
                                        showSnackBar('Заполните все поля')
                                    }
                                }
                                } size='small' color='primary'>
                                    Добавить
                                </Button>
                        }
                    </CardActions>
            </Card>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardOutXMLAds)