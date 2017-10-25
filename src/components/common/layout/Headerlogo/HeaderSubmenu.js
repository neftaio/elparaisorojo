/**
* Imports
*/
import React from 'react';
import {Link} from 'react-router';

import IntlStore from '../../../../stores/Application/IntlStore';
import Text from '../../typography/Text';

/**
* Module's default component
*/
class HeaderSubmenu extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  };

  componentDidMount() {

    // Component styles
    require('./HeaderSubmenu.scss');
  }

  render () {

    let intlStore = this.context.getStore(IntlStore);
    let routeParams = {locale: intlStore.getCurrentLocale()};

    let submenuLinks = [
      {name:'Inicio', link:{to:'homepage', params: routeParams}},
      {name:'Productos', link:{to:'products', params: routeParams}},
      {name:'Como comprar', link:{to:'how-buy', params: routeParams}},
      {name:'Contacto', link:{to:'contact-us', params: routeParams}},
      {name:'Productos especiales', link:{to:'products-specials', params: routeParams}},
      {name:'Promociones', link:{to:'homepage', params: routeParams}},
      {name:'Sobre nosotros', link:{to:'aboutus', params: routeParams}},
      {name:'Blog', link:{to:'homepage', params: routeParams}},
    ]

    // Return a content block's items
    let blockItems = (items) => {
      return items.map(function (item, idx) {
        return (
          <li key={idx} className="headersubmenu__list-item">
            <Link className="headersubmenu__link" to={item.link.to} params={item.link.params}>
              <Text size="xsmall">{item.name}</Text>
            </Link>
          </li>
        );
      });
    };

  // Return template
    return (
      <div className="desktop-header-submenu">
        <div>
      <ul className="desktop-header-submenu__list">
        {blockItems(submenuLinks)}
      </ul>
      </div>
      </div>
    )

  }

}

/**
* Exports
*/
export default HeaderSubmenu;
