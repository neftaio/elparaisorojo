/**
* Imports.
*/
import React from 'react';
import async from 'async';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import {slugify} from '../../../utils/strings';

// Flux
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import ContentsListStore from '../../../stores/Contents/ContentsListStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductsHomepageStore from '../../../stores/Products/ProductsHomepageStore';

import fetchContents from '../../../actions/Contents/fetchContents';
import fetchHomepageProducts from '../../../actions/Products/fetchHomepageProducts';

// Required components
import ArticleSummary from '../../common/articles/ArticleSummary';
import Carousel from '../../common/images/Carousel';
import ProductList from '../../common/products/ProductList';

import HomepageFeaturedCollection from './HomepageFeaturedCollection';
import Heading from '../../common/typography/Heading';

// Translation data for this component
import intlData from './Homepage.intl';

/**
* Component.
*/
class Homepage extends React.Component {

  static contextTypes = {
    getStore: React.PropTypes.func.isRequired
  };

  //*** Required Data ***//

  static fetchData = function (context, params, query, done) {
    async.parallel([
      function (callback) {
        context.executeAction(fetchContents, {tags: 'homepage'}, callback);
      },
      function (callback) {
        context.executeAction(fetchHomepageProducts, {}, callback);
      }
    ], done);
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
    require('./Homepage.scss');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      banners: nextProps._banners,
      articles: nextProps._articles,
      collections: nextProps._collections,
      featuredProducts: nextProps._featuredProducts,
      featuredCategories: nextProps._featuredCategories,
      featuredCollections: nextProps._featuredCollections
    });
  }



  staticCarouselImages = () => {
    return [
      {src:'/static/carousel/bienvenido-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'bienvenido',
      text:'Te damos la bienvenida a El Paraíso Rojo, la tienda erótica más exclusiva de Colombia, descubre todo lo que tenemos para ti.'},
      {src:'/static/carousel/discrecion-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'discreción',
      text:''},
      {src:'/static/carousel/envios-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'envíos a todo el país',
      text:'Tú encargate de pedir lo que quieras que nosotros nos encargamos de llevarlo a donde necesites.'},
      {src:'/static/carousel/promociones-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'promociones',
      text:'Porque el placer viene de la mano de todo lo que tenemos para tí.'},
      {src:'/static/carousel/contacto-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'contacto',
      text:'Que nada limite tus placeres con nosotros contáctanos a traves de cada uno de los canales que tenemos para tí.'},
      {src:'/static/carousel/novedades-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'novedades',
      'text':''},
      {src:'/static/carousel/nosotros-elparaisorojo-sexshop.jpg',
      link:'#',
      title:'porque somos diferentes',
      text:''}
    ]
  }


  //*** Template ***//

  render() {

    //
    // Helper methods & variables
    //

    let intlStore = this.context.getStore(IntlStore);

    // Base route params
    let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

    // Featured Collections
    let featuredCollections = [null, null, null, null];
    for (let i=0; i<4; i++) {
      if (this.state.collections[i]) {
        let collection = this.state.collections[i];
        featuredCollections[i] = {
          name: collection.name,
          link: {
            to: 'collection-slug',
            params: Object.assign({
              collectionId: collection.id,
              collectionSlug: slugify(intlStore.getMessage(collection.name))
            }, routeParams)
          }
        };
        if (collection.images && collection.images.length > 0) {
          featuredCollections[i].img = {
            src: `//${collection.images[0].url}`,
            alt: intlStore.getMessage(collection.name)
          };
        }
      }
    }

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


      // Define static carousel images
      // let staticCarouselImages = [{src:'/static/carousel/novedades.jpg', link:'google.com'}]

      //
      // Return
      //
      return (

        <div>
          <div className="homepage__cta">
            <div className="homepage__banners">
              <Carousel images={this.staticCarouselImages()} />
            </div>
          </div>


          <div className="homepage">
            {/* <div className="homepage__cta">
            <div className="homepage__banners">
            <Carousel images={staticCarouselImages} />
          </div>
        </div> */}

        {this.state.articles.length > 0 ?
          <div className="homepage__articles">
            {this.state.articles.map((content, idx) => {
              let articleRouteParams = Object.assign({
                contentId: content.id,
                contentSlug: slugify(intlStore.getMessage(content.name))
              }, routeParams);
              return (
                <div key={idx} className="homepage__article-item">
                  <Link className="homepage__article-link" to="article-slug"
                    params={articleRouteParams}>
                    <ArticleSummary key={idx} size="small" content={content} hideLink={true} />
                  </Link>
                </div>
              );
            })}
          </div>
          :
          null
        }

        <div className="homepage__products">
          <ProductList title={featuredProductsTitle()}
            filters={productFilters()}
            products={this.state.featuredProducts} />
          </div>
        </div>

        {/* Pro items */}
        <div className="homepage__plusspoints">
          <div className="homepage__plusspoints-title">
            {/* <div className="homepage__plusspoints-title-text">Conoce</div> */}
            Conoce
            <img className="homepage__plusspoints-title-img" src="static/elparaisorojo-logo-white-sexshop-tienda-erotica.png" />
          </div>
          <ul className="homepage__plusspoints-list">
            <li className="homepage__plusspoints-item-item">
              <div className="homepage__plusspoints-item-icon">
                <i className="material-icons icon-proitems">add_shopping_cart</i>
              </div>
              <div className="homepage__plusspoints-item-description">
                Envíos gratuitos por compras superiores a $150.000 COP.
              </div>
            </li>

            <li className="homepage__plusspoints-item-item">
              <div className="homepage__plusspoints-item-icon">
                <i className="material-icons icon-proitems">redeem</i>
              </div>
              <div className="homepage__plusspoints-item-description">
                Productos especiales para clientes especiales.
              </div>
            </li>

            <li className="homepage__plusspoints-item-item">
              <div className="homepage__plusspoints-item-icon">
                <i className="material-icons icon-proitems">contact_phone</i>
              </div>
              <div className="homepage__plusspoints-item-description">
                Asesoría personalizada para que cada compra se adapte a tus necesidades.
              </div>
            </li>

            <li className="homepage__plusspoints-item-item">
              <div className="homepage__plusspoints-item-icon">
                <i className="material-icons icon-proitems">pages</i>
              </div>
              <div className="homepage__plusspoints-item-description">
                Obsequios por puntos y puntos acumulables para redimir en tus próximas compras.
              </div>
            </li>

          </ul>
        </div>
        {/* ./Pro items */}


        {/* Publicaciones */}
        <div className="homepage__publications">
          <div className="homepage__publications-title">
            <Heading size="large">
              Publicaciones
            </Heading>
          </div>


          <div className="homepage__publications-pubs">
            <ul className="homepage__publications-list">

              <li className="homepage__publications-item">
                <a href="#">
                  <div className="card-cod">
                    <div className="image-cod">
                      <img src="static/elparaisorojo-publicacion-sexshop-sadomasoquismo-informacion-tienda-erotica.png" width="100%" />
                    </div>
                    <div className="text-cod">
                      <h3 className="text-cod-title"> Juguetes sexuales para sadomasoquismo. </h3>
                      <p className="text-cod-description">El sadomasoquismo es un juego erótico que se practica entre alguien que siente excitación humillando y maltratando, y otra a la que le gusta ser vejado o castigado. Bajo este término se engloba una amplia variedad de parafilias o prácticas, como el bondage…</p>
                    </div>
                  </div>
                </a>
              </li>

              <li className="homepage__publications-item">
                <a href="#">
                  <div className="card-cod">
                    <div className="image-cod">
                      <img src="static/elparaisorojo-publicacion-sexshop-juguetes-informacion-tienda-erotica.png" width="100%" />
                    </div>
                    <div className="text-cod">
                      <h3 className="text-cod-title">5 momentos incómodos (pero con solución) durante el sexo</h3>
                      <p className="text-cod-description">Los hay para todos los gustos, desde los más incómodos y preocupantes (rotura del condón, por ejemplo) a los simplemente embarazosos (malditas ventosidades y benditos ataques de risa incontrolables). Son los llamados momentos…</p>
                    </div>
                  </div>
                </a>
              </li>

              <li className="homepage__publications-item">
                <a href="#">
                  <div className="card-cod">
                    <div className="image-cod">
                      <img src="static/elparaisorojo-publicacion-sexshop-orgasmo-informacion-tienda-erotica.png" width="100%" />
                    </div>
                    <div className="text-cod">
                      <h3 className="text-cod-title">¿Sabes como funcionan tus orgasmos?</h3>
                      <p className="text-cod-description">¿Sabes como funcionan tus orgasmos? Si estás teniendo un orgasmo, no te darías cuenta de si tu perro, tu gato, o tu cacatúa están cambiando la distribución de muebles de tu casa. También es poco probable que puedas notar todos los cam…</p>
                    </div>
                  </div>
                </a>
              </li>


            </ul>
          </div>
        </div>
        {/* ./Publicaciones */}

      </div>
    );
  }
}

/**
* Flux
*/
Homepage = connectToStores(Homepage, [CollectionsStore, ProductsHomepageStore], (context) => {
  return {
    _banners: context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
    _articles: context.getStore(ContentsListStore).getOrderedContentsOfType('article', ['homepage'], true),
    _collections: context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
    _featuredCategories: context.getStore(CollectionsStore).getCollections(['category', 'homepage']),
    _featuredCollections: context.getStore(CollectionsStore).getCollections(['collection', 'homepage']),
    _featuredProducts: context.getStore(ProductsHomepageStore).getProducts()
  };
});

/**
* Export.
*/
export default Homepage;
