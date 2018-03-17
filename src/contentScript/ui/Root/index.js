import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

import App from '../App';

export default class Root extends Component {
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
  }

  render() {
    return (
      <JssProvider
        jss={this.jss}
        generateClassName={this.generateClassName}
      >
        <App />
      </JssProvider>
    );
  }
}
