import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar(props) {
  const onHomeClick = () => {
    props.history.push("/");
  };
  const onListClick = () => {
    props.history.push("/messagesList");
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <div className='brand'>
            <Typography variant='h6' className={classes.title}>
              Contacts &nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
          <BottomNavigation showLabels className={classes.root}>
            <BottomNavigationAction
              label='Contacts'
              onClick={onHomeClick}
              icon={<AccountIcon />}
            />
            <BottomNavigationAction
              label='Messages'
              onClick={onListClick}
              icon={<ListIcon />}
            />
          </BottomNavigation>
        </Toolbar>
      </AppBar>

      <hr />
    </div>
  );
}
