import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import Button from '@material-ui/core/Button';

const WinnerListLottery =  React.memo(
    (props) =>{
        const { showFullDialog } = props.mini_dialogActions;
        const { classes, tickets } = props;
        return (
            <div className={classes.column}>
                {
                    tickets.map((element, idx)=> {
                            if (element.prize && element.prize.length) {
                                return (
                                    <div className={classes.row} key={`winner${idx}`}>
                                        <div className={classes.nameField}>
                                            {element.client.name}:&nbsp;
                                        </div>
                                        <div className={classes.value}>
                                            {element.prize}
                                        </div>
                                    </div>)
                            }
                        }
                    )
                }
                <br/>
                <br/>
                <center>
                    <Button variant='contained' color='secondary' onClick={()=>{showFullDialog(false);}} className={classes.button}>
                        Закрыть
                    </Button>
                </center>
            </div>
        );
    }
)

function mapStateToProps () {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch)
    }
}

WinnerListLottery.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(WinnerListLottery));