/**
* Imports
*/
import React from 'react';
import {Link} from 'react-router';

// Required components
import Breakpoint from '../../../core/Breakpoint';
import IntlStore from '../../../../stores/Application/IntlStore';
import Heading from '../../typography/Heading';
/**
* Module's default component
*/
class HeaderPageText extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  };

  componentDidMount() {

    // Component styles
    require('./HeaderPageText.scss');
  }

  render() {
    return (
      <div className="header-page-text">

        <div className="header-page-text_description static-page__quotation">
        <div className="static-page__title">
          <Heading size="large">
            {this.props.title}
          </Heading>
        </div>
          <p>
            {this.props.description}
          </p>
        </div>

        <div className="header-page-text_contimage static-page__image">
          <img className="header-page-text_image" src={this.props.image} />
        </div>
      </div>
    )
  }
}

/**
* Exports
*/
export default HeaderPageText;
