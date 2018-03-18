import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

import CssBaseline from 'material-ui/CssBaseline';

import App from '../App';

export default class Root extends Component {
  static contextTypes = {
    window: PropTypes.any,
    document: PropTypes.any,
  };

  generateClassName = createGenerateClassName();
  jss = null;
  iframeNode = null;

  componentWillMount() {
    const { window: iframeWindow, document: iframeDocument } = this.context;

    // Save reference to the iframe DOM note while we have enough context
    const allIframeNodes = window.document.querySelectorAll('iframe');
    this.iframeNode = Array.from(allIframeNodes).find((node) => {
      return iframeWindow === node.contentWindow;
    });

    const styleNode = iframeDocument.createComment("jss-insertion-point");
    iframeDocument.head.insertBefore(styleNode, iframeDocument.head.firstChild);

    this.jss = create(jssPreset());
    this.jss.options.insertionPoint = styleNode;
  }

  componentDidMount() {
    this.adjustFrameDimentions();
  }

  componentDidUpdate() {
    this.adjustFrameDimentions();
  }

  adjustFrameDimentions = () => {
    // Control outer iframe style
    const { document: iframeDocument } = this.context;

    this.iframeNode.style.height = `${iframeDocument.body.scrollHeight}px`;
    this.iframeNode.style.width = `${iframeDocument.body.scrollWidth}px`;
  };

  render() {
    return (
      <div>
        <JssProvider
          jss={this.jss}
          generateClassName={this.generateClassName}
        >
          <div>
            <CssBaseline />
            <App />
          </div>
        </JssProvider>
      </div>
    );
  }
}
