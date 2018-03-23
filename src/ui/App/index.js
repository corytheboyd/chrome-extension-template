import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import { blue } from 'material-ui/colors'
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { setName } from '../../redux/contexts/local/actions/app/index';
import { name } from '../../redux/contexts/local/selectors/app/index';

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
    name: name(state),
  }),
  {
    setName,
  },
)
@withStyles(styles)
export default class App extends PureComponent {
  static propTypes = {
    // Redux state
    name: PropTypes.string.isRequired,

    // Redux action dispatch
    setName: PropTypes.func.isRequired,

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

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    // HOC
    const { classes } = this.props;

    // Redux state
    const { name } = this.props;

    // Redux action dispatch
    const { setName } = this.props;

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

        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleFormSubmit}
        >
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </form>
      </div>
    );
  }
}
