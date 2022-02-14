import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import Button from '@material-ui/core/Button';

const TextLottery =  React.memo(
    (props) =>{
        const { showMiniDialog } = props.mini_dialogActions;
        const { classes, text } = props;
        return (
            <div className={classes.column}>
                <div className={classes.value} style={{fontWeight: '400'}}>
                    {text}
                </div>
                <center>
                    <Button variant='contained' color='secondary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
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

TextLottery.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(TextLottery));