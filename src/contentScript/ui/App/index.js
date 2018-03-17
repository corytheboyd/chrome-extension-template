import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

const styles = {
  root: {},
};

@withStyles(styles)
export default class App extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography
          variant="display1"
        >
          Hello, world!
        </Typography>
      </div>
    );
  }
}
