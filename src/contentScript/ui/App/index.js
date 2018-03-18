import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';

import { blue } from 'material-ui/colors'
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    height: 400,
    width: 400,
    boxShadow: theme.shadows[1],
    background: blue[300],
  },
});

@withStyles(styles)
export default class App extends PureComponent {
  render() {
    // HOC
    const { classes } = this.props;

    return (
      <div
        id="app-root"
        className={classes.root}
      >
        <Typography
          variant="display1"
        >
          Hello, world!
        </Typography>
      </div>
    );
  }
}
