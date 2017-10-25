/**
* Imports
*/
import React from 'react';
import {Link} from 'react-router';

// Required components
import Breakpoint from '../../../core/Breakpoint';
import IntlStore from '../../../../stores/Application/IntlStore';
import HeaderSubmenu from './HeaderSubmenu';

/**
* Module's default component
*/
class Headerlogo extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  };

  componentDidMount() {

    // Component styles
    require('./Headerlogo.scss');
  }

  // Template
  render () {
    // Helper variables
    let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

    return (
      <div className="desktop-header-logo" >

        {/* Header with centred logo */}
        {/* <div className="desktop-header-fulllogo__container">
          <Link className="desktop-header-fulllogo__logo-link" to='homepage' params={routeParams}>
            <div className="desktop-header-fulllogo__logo"></div>
          </Link>
        </div> */}

        {/* Header with submenu only in  */}
        <Breakpoint point="wide-screens">
          <HeaderSubmenu/>
        </Breakpoint>

      </div>
    )
  }
}

/**
* Exports
*/
export default Headerlogo;
