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
import {Link} from 'react-router';
import InlineItems from '../../common/forms/InlineItems';
import InputField from '../../common/forms/InputField';
import HeaderPageText from '../../common/layout/HeaderPageText';
import ProductList from '../../common/products/ProductList';

// Translation data for this component
import intlData from './Staticpage.intl';


/**
* Component
*/
class ContactUsPage extends React.Component {

  //*** Page Title and Snippets ***//
  static pageTitleAndSnippets = function (context, params, query) {
    return {
      title: 'Contactanos'
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
    require('./ContactUsPage.scss');
  }

  render() {

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

        <div className="static-page__content">

          <HeaderPageText image="/static/elparaisorojo-sexshop-contactanos-telefonos.jpg" title="Contáctanos" description="...Donde poder hacer tus fantasias realidad siempre es posible..."/>

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

                <div className="static-page_info-container">

            <ul>
              <li className="static-page__steps__item text-center">
                <span className="static-page__steps__item__number">1. </span>
                <span className="static-page__steps__item__description">Escribenos </span>
                <div>
                  Llena el siguiente formulario
                </div>
                <div>
                  {contactForm()}
                </div>
              </li>
              <li className="static-page__steps__item text-center">
                <span className="static-page__steps__item__number">2. </span>
                <span className="static-page__steps__item__description">Llamanos </span>
                <div>
                  Llama al siguitente número o escribe por Whatsapp
                </div>
                <div className="text-center">
                  <div className="static-page__steps__item__container">
                    <a href="tel:3176505861" className="static-page__steps__item__link">
                      <img src="/static/elparaisorojo-telefono-whatsapp-sexshop.jpg" className="static-page__steps__item__image"/>
                      <div className="static-page__steps__item__text">
                        3176505861
                      </div>
                    </a>
                  </div>
                </div>

              </li>
              <li className="static-page__steps__item text-center">
                <span className="static-page__steps__item__number">3. </span>
                <span className="static-page__steps__item__description">Envíanos un email </span>
                <div>
                  Envianos un correo electronico con tus dudas o preguntas a
                </div>
                <div className="text-center">
                  <div className="static-page__steps__item__container">
                    <a href="mailto:elparaisorojo.shop@gmail.com" className="static-page__steps__item__link">
                      <img src="/static/elparaisorojo-email-contactanos-sexshop.jpg" className="static-page__steps__item__image"/>
                      <div className="static-page__steps__item__text">
                        elparaisorojo.shop@gmail.com
                      </div>
                    </a>
                  </div>
                </div>
              </li>

              <li className="static-page__steps__item text-center">
                <span className="static-page__steps__item__number">4. </span>
                <span className="static-page__steps__item__description">Nuestras redes sociales</span>
                <div>
                  Visitanos o escribenos en Facebook
                </div>
                <div className="text-center">
                  <div className="static-page__steps__item__container">
                    <a href="https://www.facebook.com/leparadiserose/" className="static-page__steps__item__link" target="_blank">
                      <img src="/static/elparaisorojo-redessociales-facebook-sexshop.png" className="static-page__steps__item__image"/>
                      <div className="static-page__steps__item__text">
                          https://www.facebook.com/leparadiserose/
                      </div>
                    </a>
                  </div>
                </div>
              </li>

            </ul>
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
export default ContactUsPage;
