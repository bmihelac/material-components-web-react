// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';

export class ButtonBase extends Component {
  rippleActivator = React.createRef();

  init = (el) => {
    if (this.rippleActivator.current) {
      this.props.initRipple(this.rippleActivator.current);
    }
  }

  render() {
    const {
      linkComponent,
      className,
      raised,
      unelevated,
      outlined,
      dense,
      icon,
      children,
      initRipple, // eslint-disable-line no-unused-vars
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    const classes = classnames('mdc-button', className, {
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'mdc-button--outlined': outlined,
      'mdc-button--dense': dense,
    });

    const LinkComponent = linkComponent;

    return (
      <LinkComponent
        className={classes}
        rippleActivator={this.rippleActivator}
        initRipple={initRipple}
        ref={this.init}
        {...otherProps}
      >
        {icon ? this.renderIcon() : null}
        {children}
      </LinkComponent>
    );
  }

  addClassesToElement(classes, element) {
    const propsWithClasses = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, propsWithClasses);
  }

  renderIcon() {
    const {icon} = this.props;
    return this.addClassesToElement('mdc-button__icon', icon);
  }
}

class SemanticButtonInner extends React.Component {
  render() {
    const {rippleActivator, ...props} = this.props;
    const SemanticButton = (props.href) ? 'a' : 'button';
    return (
      <SemanticButton ref={rippleActivator} {...props} />
    );
  }
};

export const Button = (props) => {
  return (
    <ButtonBase linkComponent={SemanticButtonInner} {...props} />
  );
};

SemanticButtonInner.propTypes = {
  rippleActivator: PropTypes.any,
};

ButtonBase.propTypes = {
  linkComponent: PropTypes.node,
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  outlined: PropTypes.bool,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  unbounded: PropTypes.bool,
  initRipple: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
  href: PropTypes.string,
  children: PropTypes.string,
};

ButtonBase.defaultProps = {
  raised: false,
  unelevated: false,
  outlined: false,
  dense: false,
  disabled: false,
  unbounded: false,
  initRipple: () => {},
  className: '',
  icon: null,
  children: '',
};

export default withRipple(Button);
