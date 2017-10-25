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
class AboutUsPage extends React.Component {

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
    require('./AboutUsPage.scss');
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

      return (
        <div className="static-page">

          <div className="static-page__content">

            <HeaderPageText image="/static/elparaisorojo-sexshop-sobre-nosotros-pareja.jpg" title="Sobre Nosotros" description="“El instinto erótico pertenece a la naturaleza original del hombre. Está relacionado con la más alta forma de espíritu”"/>

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
                    En
                    El Paraíso Rojo
                    estamos convencidos de que el erotismo es una forma sublime de arte, por ello nos esforzamos siempre en ofrecer productos de altísimia calidad superando la barrera de la tienda erótica tradicional; queremos que todos nuestros clientes se adentren en una experiencia en la que al visitar cada una de nuestras secciones se sorprendan, se antojen y den rienda suelta a sus pasiones, sin culpas, y con la elegancia y erotismo que nos caracteriza porque todos somos dueños de nuestra lujuria. Para ésto y más  estamos convencidos de que el erotismo es una forma sublime de arte, por ello nos esforzamos siempre en ofrecer productos de altísimia calidad superando la barrera de la tienda erótica tradicional; queremos que todos nuestros clientes se adentren en una experiencia en la que al visitar cada una de nuestras secciones se sorprendan, se antojen y den rienda suelta a sus pasiones, sin culpas, y con la elegancia y erotismo que nos caracteriza porque todos somos dueños de nuestra lujuria. Para ésto y más 
                    El Paraíso Rojo
                    pone a tu disposicion increíbles productos, máxima comodidad, total discreción  y asesoría personalizada para acompañarte a vivir todas tus experiencias al máximo haciendo de cada una algo maravilloso e inolvidable. Activa tus sentidos y haz realidad tus fantasías de nuestra mano, te aseguramos que no te arrepentirás...
                  </p>
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
    export default AboutUsPage;
