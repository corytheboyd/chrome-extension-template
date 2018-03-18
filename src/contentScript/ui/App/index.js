import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import { blue } from 'material-ui/colors'
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    height: 400,
    width: 400,
    boxShadow: theme.shadows[1],
    background: blue[300],
    transition: '250ms',
  },
  bigger: {
    width: 500,
    height: 500,
    boxShadow: theme.shadows[3],
  }
});

@withStyles(styles)
export default class App extends PureComponent {
  static propTypes = {
    setAppRootNode: PropTypes.func.isRequired,
  };

  state = {
    bigger: false,
  };

  componentDidMount() {
    // Give parent reference to the actual application root
    const { setAppRootNode } = this.props;

    setAppRootNode(this.appRootNode);

    setTimeout(() => {
      setInterval(() => this.setState({ bigger: !this.state.bigger }), 1000);
    }, 2000);
  }

  render() {
    // HOC
    const { classes } = this.props;

    return (
      <div
        ref={(node) => { this.appRootNode = node; }}
        className={classNames({
          [classes.root]: true,
          [classes.bigger]: this.state.bigger,
        })}
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
