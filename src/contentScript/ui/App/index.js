import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

const styles = {
  root: {},
};

@withStyles(styles)
export default class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="heading-1">Hello, React!</Typography>
      </div>
    );
  }
}
