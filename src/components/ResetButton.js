import React from "react";
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    reset: {
        padding: theme.spacing(0),
    }
}));

class ResetButton extends React.Component {
    render() {
        return (
            <div style={{ width: '4px', height: '4px'}}>
                <IconButton style={{padding: '0px'}} onClick={() => {this.props.reset()}}>
                    <RefreshIcon />
                </IconButton>
            </div >
        );
    } 
}

export default ResetButton;