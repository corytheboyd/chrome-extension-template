import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import { blue } from 'material-ui/colors'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { initialize } from '../../redux/actions/app';
import { isInitialized } from '../../redux/selectors/app';

const styles = theme => ({
  root: {
    height: 400,
    width: 400,
    boxShadow: theme.shadows[1],
    background: blue[300],
  },
});

@connect(
  (state) => ({
    isInitialized: isInitialized(state),
  }),
  {
    initialize,
  },
)
@withStyles(styles)
export default class App extends PureComponent {
  static propTypes = {
    // Redux state
    isInitialized: PropTypes.bool.isRequired,

    // Redux action dispatch
    initialize: PropTypes.func.isRequired,

    // React props
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

    // Redux state
    const { isInitialized } = this.props;

    // Redux action dispatch
    const { initialize } = this.props;

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

        {isInitialized && (
          <Typography
            variant="display2"
          >
            WE ARE FULLY INITIALIZED
          </Typography>
        )}

        <Button
          disabled={isInitialized}
          onClick={() => initialize()}
          variant="raised"
          color="primary"
        >
          Initialize
        </Button>
      </div>
    );
  }
}
