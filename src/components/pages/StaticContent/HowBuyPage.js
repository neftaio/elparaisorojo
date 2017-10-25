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
class HowBuyPage extends React.Component {

  //*** Page Title and Snippets ***//
  static pageTitleAndSnippets = function (context, params, query) {
    return {
      title: '¿Cómo comprar?'
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
    require('./HowBuyPage.scss');
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

      return (
        <div className="static-page">
          <div className="static-page__title">
          <Heading size="large">
          ¿Cómo comprar?
        </Heading>
      </div>

      <div className="static-page__content">

        {/* <HeaderPageText image="/static/elparaisorojo-sexshop-pasoscompra.jpg" title="¿Cómo Comprar?" description="Nuestra empresa tiene varios métodos de compra los cuales han sido diseñados para tu comodidad y seguridad, elige el que más se adapte a tus necesidades."/> */}

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
                    // selected: this.props.collection ? col.id === this.props.collection.id : false
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
              <ul className="howbuy-steps">
                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">1</h3>
                        <p className="text-cod-description">Elige el/los productos que deseas comprar y dale click en el boton "COMPRAR".</p>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">2</h3>
                        <p className="text-cod-description">Para encontrar el producto que quieres comprar navega a traves de las categorías o utiliza la barra de busqueda.</p>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">3</h3>
                        <p className="text-cod-description">Una vez elegido un producto puedes continuar compradon y agregando a tu carrito de compras los productos que desees.</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>

              <ul className="howbuy-steps">
                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">4</h3>
                        <p className="text-cod-description">Una vez elegidos todos los productos que quieres comprar haz click en el botón de la parte superiro derecha "Carrito de compras".</p>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">5</h3>
                        <p className="text-cod-description">Verifica (Si así lo aplican los productos) el color, sabor o talla y la cantidad de cada uno.</p>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">6</h3>
                        <p className="text-cod-description">Ingresa tu nombre de usuario y contraseña, sino regístrate dando click Registrarse.</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>

              <ul className="howbuy-steps">
                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">7</h3>
                        <p className="text-cod-description">Diligencia los datos personales y de entrega. Recuerda que todos nuestros paquetes son sellados y no poseen ninguna marca o sticker que revele el interior de su contenido.</p>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="hoybuy-steps-item">
                  <a href="#">
                    <div className="card-cod">
                      <div className="text-cod">
                        <h3 className="text-cod-title hoybuy-steps-item-id">8</h3>
                        <p className="text-cod-description">Elige el método de pago que desees. Puedes pagar con:
                        </p>
                        <ul className="hoybuy-steps-item-list">
                          <li>1. Targeta de credito.</li>
                          <li>2. Targeta debito.</li>
                          <li>3. Transferencia bancaria.</li>
                          <li>4. Efecty.</li>
                        </ul>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>




              {/* <ul>
                <li className="static-page__steps__item">
                <span className="static-page__steps__item__number">1. </span>
                Elige el o los productos que deseas comprar, dirígete a la sección de contacto haciendo click aquí  y escoge el medio con el que te sientas más comodidad.
              </li>
              <li className="static-page__steps__item">
              <span className="static-page__steps__item__number">2. </span>
              Escríbenos por el medio que has elegido enviandonos el nombre del/los productos que desas comprar.
            </li>
            <li className="static-page__steps__item">
            <span className="static-page__steps__item__number">3. </span>
            Te enviaremos el proceso de compra y los costos.
          </li>
          <li className="static-page__steps__item">
          <span className="static-page__steps__item__number">4. </span>
          Para la compra se procederá a hacer envío via Efecty, via Baloto, pago contra entrega, consignación a cuenta bancaria o transacción bancaria.
        </li>
        <li className="static-page__steps__item">
        <span className="static-page__steps__item__number">5. </span>
        Al realizar el pago debes enviarnos en escaner o una foto el comprobante de pago junto con tu nombre, dirección, barrio, ciudad, y número de contacto para así proceder a realizar el envío.
      </li>
      <li className="static-page__steps__item">
      <span className="static-page__steps__item__number">6. </span>
      Inmediatamente sea enviado el paquete con tu pedido se te notificará.El tiempo de envío será de máximo 7 días hábiles, notifícanos si tus productos son de entrega inmediata para coordinar el respectivo proceso.
    </li>
    <li className="static-page__steps__item">
    <span className="static-page__steps__item__number">7. </span>
    Debes estar segur@ de tu pedido, estamos  vendiéndote un artículo totalmente nuevo y de excelente calidad y bajo ninguna circunstancia o motivo  realizamos cambios o devoluciones de dinero.
  </li>
</ul> */}

<div className="hoybuy-paymethods">
  <div className="hoybuy-paymethods-title">
    <Heading size="large">
      Métodos de pago
    </Heading>
  </div>
  <ul>
    <li className="static-page__steps__item">
      <span className="static-page__steps__item__number">1. </span>
      Paga usando nuestra pasarela de pagos completamente segura utilizando tu tarajeta debito/credito.
    </li>

    <li className="static-page__steps__item">
      <span className="static-page__steps__item__number">2. </span>
      Consignacion bancaria.
      <div>
        <ul>
          <li>
            <span className="static-page-bold">Banco:</span> Banco de Bogotá
          </li>
          <li>
            <span className="static-page-bold">Cuenta de ahorros No:</span> 012431524
          </li>
          <li>
            <span className="static-page-bold">A Nombre:</span> Neftali Forero
          </li>
        </ul>
      </div>
    </li>

    <li className="static-page__steps__item">
      <span className="static-page__steps__item__number">3. </span>
      Transferencia Electrónica.
      <div>
        <ul>
          <li>
            <span className="static-page-bold">Banco:</span> Banco de Bogotá
          </li>
          <li>
            <span className="static-page-bold">Cuenta de ahorros No:</span> 012431524
          </li>
          <li>
            <span className="static-page-bold">A Nombre:</span> Neftali Forero
          </li>
        </ul>
      </div>
    </li>

    <li className="static-page__steps__item">
      <span className="static-page__steps__item__number">4. </span>
      Efecty.
      <div>
      </div>
    </li>

  </ul>
</div>

<div className="hoybuy-questions">
  <div className="hoybuy-questions-title">
    <Heading size="large">
      ¿Tienes dudas?
    </Heading>
  </div>
  <div className="hoybuy-questions-content">
    <ul>
      <li>
        Llamanos o contáctanos al 3176505861.
      </li>
      <li>
        Escribenos a elparaisorojo.shop@gmail.com.
      </li>
      <li>
        Dejanos tus inquietudes aquí.
      </li>
      <li>
        Chatea con nosotros.
      </li>
    </ul>
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
export default HowBuyPage;
