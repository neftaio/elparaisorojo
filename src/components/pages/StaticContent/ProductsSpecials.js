/**
* Imports
*/
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import ContentsListStore from '../../../stores/Contents/ContentsListStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductsHomepageStore from '../../../stores/Products/ProductsHomepageStore';
import {slugify} from '../../../utils/strings';
import TreeMenu from '../../common/navigation/TreeMenu';

// Required components
import Heading from '../../common/typography/Heading';
import HeaderPageText from '../../common/layout/HeaderPageText';
import ProductList from '../../common/products/ProductList';

// Translation data for this component
import intlData from './Staticpage.intl';


/**
* Component
*/
class ProductsSpecials extends React.Component {

  //*** Page Title and Snippets ***//

  static pageTitleAndSnippets = function (context, params, query) {
    return {
      title: 'Sobre Nosotros'
    }
  };

  static contextTypes = {
    getStore: React.PropTypes.func.isRequired
  };


  //*** Initial State ***//

  state = {
    banners: this.context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
    articles: this.context.getStore(ContentsListStore).getOrderedContentsOfType('article', ['homepage'], true),
    collections: this.context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
    featuredCategories: this.context.getStore(CollectionsStore).getCollections(['category', 'homepage']),
    featuredCollections: this.context.getStore(CollectionsStore).getCollections(['collection', 'homepage']),
    featuredProducts: this.context.getStore(ProductsHomepageStore).getProducts()
  };


  //*** Component Lifecycle ***//

  componentDidMount() {

    // Component styles
    require('./ProductsSpecials.scss');
  }

  render () {

    let intlStore = this.context.getStore(IntlStore);

    // Featured Products SideMenu
    let productFilters = () => {
      if (this.state.featuredCategories.length > 0 || this.state.featuredCollections.length > 0) {
        return [
          {
            name: {en: 'Categories', pt: 'Categorias', es: 'Categorias'},
            collections: this.state.featuredCategories
          },
          {
            name: {en: 'Collections', pt: 'Colecções', es: 'Colecciones'},
            collections: this.state.featuredCollections
          }
        ];
      }
    };

    // Fetaured Products Title Component
    let featuredProductsTitle = function() {
      return <FormattedMessage
        message={intlStore.getMessage(intlData, 'productsList')}
        locales={intlStore.getCurrentLocale()} />;
      };

    let contactForm = () => {
      return (
        <form action=""
          method="post" id="contcatus-form" name="contactus-form" target="_blank" noValidate>
          <div id="contactus">
            <div className="contcatus-form-group">
              <label htmlFor="contactus-name">Nombre</label>
              <input type="text" value="" name="contactus-name" id="contactus-name" required />
            </div>

            <div className="contcatus-form-group">
              <label htmlFor="contactus-email">Email</label>
              <input type="email" value="" name="contactus-email" id="contactus-email" required />
            </div>

            <div className="contcatus-form-group">
              <label htmlFor="contactus-phone">Telefono</label>
              <input type="text" value="" name="contactus-phone" id="contactus-phone" />
            </div>

            <div className="contcatus-form-group">
              <label htmlFor="contactus-message">Mensaje</label>
              <textarea name="contactus-message" id="contactus-message" rows="5"></textarea>
            </div>

            <div>
              <input type="submit" className="button button-secondary button-font-medium button-w200" value="Enviar" name="contactus-send" id="contactus-send" />
            </div>
          </div>
        </form>
      )
    }

      return (
        <div className="static-page">
          <div className="static-page__title">
          <Heading size="large">
          Productos Especiales
        </Heading>
      </div>

          <div className="static-page__content">

            {/* <HeaderPageText image="/static/elparaisorojo-sexshop-sobre-nosotros-pareja.jpg" title="Sobre Nosotros" description="“El instinto erótico pertenece a la naturaleza original del hombre. Está relacionado con la más alta forma de espíritu”"/> */}

            <div className="static-page__text">

              {/* Sidebar menu */}
              {productFilters() ?
                <div className="product-list__sidebar">
                  {productFilters().map((item, idx) => {
                    let links = item.collections.map((col) => {
                      return {
                        name: intlStore.getMessage(col.name),
                        to: 'collection-slug',
                        params: {
                          locale: intlStore.getCurrentLocale(),
                          collectionId: col.id,
                          collectionSlug: slugify(intlStore.getMessage(col.name))
                        },
                        selected: this.props.collection ? col.id === this.props.collection.id : false
                      };
                    });
                    if (links.length > 0) {
                      return (
                        <div key={idx} className="product-list__filter">
                          <TreeMenu links={links}>
                            <FormattedMessage
                              message={intlStore.getMessage(item.name)}
                              locales={intlStore.getCurrentLocale()} />
                            </TreeMenu>
                          </div>
                        );
                      }
                    })}
                  </div>
                  :
                  null
                }

                <div className="static-page_info-container static-page__text-shortcentred">
                  <p className="">
                    ¿Deseas un producto especial para cumplir tu fantasia y no lo encuentras en ningún lado?. El paraíso rojo tiene esta sección para ti.
                  </p>

                  <div className="specialsproducts-collage">
                  <p className="specialsproducts-collage-p">
                    Algunos de los productos que solicitan nuestros clientes:
                  </p>
                    <img className="" src="/static/elparaisorojo-productos-especiales-sexshop.jpg" />
                  </div>

              <div className="specialsproducts-bump">
                  <p className="specialsproducts-bump-p">
                    No te limites, conseguiremos cualquier producto que se te pase por la cabeza.
                  </p>
              </div>

  <div className="specialsproducts-contacus">
                  <p className="specialsproducts-contacus-p">
                    No olvides que nos puedes contactar a:
                  </p>
                  <ul>
                    <li className="specialsproducts-contacus-li">
                      <img src="/static/elparaisorojo-telefono-whatsapp-sexshop.jpg" className="specialsproducts-contacus-img"/> (317)6505861,  (304)6365718
                    </li>
                    <li className="specialsproducts-contacus-li">
                      <img src="/static/elparaisorojo-email-contactanos-sexshop.jpg" className="specialsproducts-contacus-img"/> elparaisorojo.shop@gmail.com
                    </li>
                  </ul>
                  <p className="specialsproducts-contacus-p">
                    O puedes escribirnos ahora mismo:
                  </p>
                <div className="specialsproducts-contacus-form">
                  {contactForm()}
                </div>

  </div>


                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    /**
    * Exports
    */
    export default ProductsSpecials;
