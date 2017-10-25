/**
 * Imports
 */
import React from 'react';

import InputField from './InputField';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';


class SearchProduct extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        // Component styles
        require('./SearchProduct.scss');
    }


    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        // Define form for search
        let searchform = () => {
          return (
            <form action="" method="post" name="search-product-form" target="_blank" noValidate>
              <input type="text" className="search-product-form__text" name="search-string-product" id="search-string-product" required />
            </form>
          )
        }

        // Return template
        return (
          <div className="desktop-header__container-left-column desktop-header__search-container">
          <i className="material-icons desktop-header__search-icon">search</i>
          <div className="search-product">
            {searchform()}
          </div>
          </div>
        )
    }

}

/**
 * Exports
 */
export default SearchProduct;
