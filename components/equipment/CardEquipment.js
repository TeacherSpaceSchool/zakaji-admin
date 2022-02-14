import React  from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import cardEquipmentStyle from '../../src/styleMUI/equipment/cardEquipment'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Confirmation from '../../components/dialog/Confirmation'
import {deleteEquipment} from '../../src/gql/equipment';
import Link from 'next/link';

const CardEquipment = React.memo((props) => {
    const classes = cardEquipmentStyle();
    const { element, setList, idx, list } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    return (
           <Card className={isMobileApp?classes.cardM:classes.cardD}>
                <Link href='/equipment/[id]' as={`/equipment/${element._id}`}>
                <CardActionArea>
                    <CardContent>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Номер:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.number}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Оборудование:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.name}
                            </div>
                        </div>
                        {
                            element.client?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Клиент:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {`${element.client.name}${element.client.address&&element.client.address[0]?` (${element.client.address[0][2]?`${element.client.address[0][2]}, `:''}${element.client.address[0][0]})`:''}`}
                                    </div>
                                </div>
                                :null
                        }
                    </CardContent>
                </CardActionArea>
                </Link>
                    {
                        ['суперорганизация', 'организация', 'admin'].includes(profile.role) ?
                            <CardActions>
                                <Button onClick={async()=>{
                                    const action = async() => {
                                        await deleteEquipment([element._id])
                                        list.splice(idx, 1)
                                        setList(list)
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
        app: state.app,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardEquipment)