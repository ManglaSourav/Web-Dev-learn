import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard(props) {
  const onClick = () => {
    //redirecting to displayContact along with relevant data
    props.history.push({
      pathname: "/contactDisplay",
      state: { contact: props.contact }
    });
  };
  const classes = useStyles();

  return (
    <div className='cardd'>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {props.contact.name}
          </Typography>
          {/* <Typography className={classes.title} color="textSecondary" gutterBottom>9899755799 </Typography> */}
        </CardContent>
        <CardActions>
          <Button
            size='small'
            variant='outlined'
            color='secondary'
            className={classes.button}
            onClick={onClick}>
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
