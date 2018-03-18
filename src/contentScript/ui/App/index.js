import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    setAppRootNode: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Give parent reference to the actual application root.
    //
    // This is the only needed magic sauce to magically resize the iframe based off of the size of
    // the content within it.
    const { setAppRootNode } = this.props;

    setAppRootNode(this.appRootNode);
  }

  render() {
    // HOC
    const { classes } = this.props;

    return (
      <div
        ref={(node) => { this.appRootNode = node; }}
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
