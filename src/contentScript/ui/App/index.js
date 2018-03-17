import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

const styles = {
  root: {},
};

@withStyles(styles)
export default class App extends Component {
  static contextTypes = {
    window: PropTypes.any,
    document: PropTypes.any,
  };

  generateClassName = createGenerateClassName();
  jss = null;

  componentWillMount() {
    const { window, document } = this.context;

    console.log('window', window);
    console.log('document', document);

    const styleNode = document.createComment("jss-insertion-point");
    document.head.insertBefore(styleNode, document.head.firstChild);

    this.jss = create(jssPreset());
    this.jss.options.insertionPoint = styleNode;

    console.log('this.jss', this.jss);
  }

  render() {
    const { classes } = this.props;

    return (
      <JssProvider jss={this.jss} generateClassName={this.generateClassName}>
        <div className={classes.root}>
          <Typography
            variant="display1"
          >
            Hello, React!
          </Typography>
        </div>
      </JssProvider>
    );
  }
}
