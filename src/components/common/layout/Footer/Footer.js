/**
* Imports
*/
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import {slugify} from '../../../../utils/strings'

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required Components
import Heading from '../../typography/Heading';
import NewsletterSubscription from '../../forms/NewsletterSubscription';
import Text from '../../typography/Text';

// Translation data for this component
import intlData from './Footer.intl';

/**
* Component
*/
class Footer extends React.Component {

  static contextTypes = {
    getStore: React.PropTypes.func.isRequired
  };

  //*** Component Lifecycle ***//

  componentDidMount() {

    // Component styles
    require('./Footer.scss');
  }

  //*** Template ***//

  render() {

    //
    // Helper methods & variables
    //

    let intlStore = this.context.getStore(IntlStore);
    let routeParams = {locale: intlStore.getCurrentLocale()};

    // Stores
    let storeLinks = [
      {name: 'Arrábida Shopping', link: {to: 'stores', params: routeParams}},
      {name: 'Mar Shopping', link: {to: 'stores', params: routeParams}},
      {name: 'Loja Foz', link: {to: 'stores', params: routeParams}},
      {name: 'Loja Outlet', link: {to: 'stores', params: routeParams}}
    ];

    // Info links
    let infoLinks = [
      {name: 'Apoio ao Cliente', link: {to: 'info', params: routeParams}},
      {name: 'Portes de Envio', link: {to: 'info', params: routeParams}},
      {name: 'Termos e Condições', link: {to: 'info', params: routeParams}}
    ];

    // Links base
    let links_own = [
      {name: 'Nuestra empresa', link: {to: 'info',  params: routeParams}},
      {name: 'Asesoría', link: {to: 'info',  params: routeParams}},
      {name: 'Nuestro productos', link: {to: 'info',  params: routeParams}},
      {name: 'Blog', link: {to: 'info',  params: routeParams}}
    ]

    // Links how
    let links_how = [
      {name: '¿Cómo comprar?', link: {to: 'info',  params: routeParams}},
      {name: '¿Cómo pagar?', link: {to: 'info',  params: routeParams}},
    ]

    // Links explore
    let links_explore = [
      {name: 'Placeres', link: {to: 'info',  params: routeParams}},
      {name: 'Obsequios por compras', link: {to: 'info',  params: routeParams}},
      {name: 'Puntos por compras', link: {to: 'info',  params: routeParams}},
    ]

    // Categories
    let custom_categories = [
      {name: 'Dulce compañía', link: {to: 'Muñecos inflables',  params: routeParams}},
      {name: 'Sedúceme', link: {to: 'Feromonas',  params: routeParams}},
      {name: 'La entrada al cielo', link: {to: 'Masturbadores',  params: routeParams}},
      {name: 'Por la puerta de atras', link: {to: 'Dilatadores anales',  params: routeParams}},
      {name: 'La noche entera', link: {to: 'Pastillas potencializadoras',  params: routeParams}},
      {name: 'Tierras húmedas', link: {to: 'Lubricantes',  params: routeParams}},
      {name: 'Los agrestes', link: {to: 'Sadomasoquismo',  params: routeParams}},
      {name: 'Calor en el ambiente', link: {to: 'Excitantes',  params: routeParams}},
      {name: 'Juergas salvajes', link: {to: 'Juegos eróticos',  params: routeParams}},
      {name: 'Consuélame', link: {to: 'Consoladores',  params: routeParams}},
      {name: 'Octubre sensual', link: {to: 'Disfraces femeninos',  params: routeParams}},
      {name: 'Fusión', link: {to: 'Doble penetración',  params: routeParams}},
    ]

    // Return a content block's items
    let blockItems = (items) => {
      return items.map(function (item, idx) {
        return (
          <li key={idx} className="footer__list-item">
            <Link className="footer__link" to={item.link.to} params={item.link.params}>
              <Text size="xsmall">{item.name}</Text>
            </Link>
          </li>
        );
      });
    };

    // Return a content block's items with icons
    let allcollections = this.props.collections
    let blockItemsFormated = (items) => {
      return items.map(function (item, idx) {
        return allcollections.map((col) => {
          if(col.name.es === item.link.to) {
            let thelink = {
              name: intlStore.getMessage(col.name),
              to: 'collection-slug',
              params: {
                locale: intlStore.getCurrentLocale(),
                collectionId: col.id,
                collectionSlug: slugify(intlStore.getMessage(col.name))
              },
              selected: false
            }
            return (
              <li key={idx} className="footer__list-item">
                <Link className="footer__link" to={thelink.to} params={thelink.params}  query={thelink.query}>
                  <Text size="xsmall">
                    <i className="material-icons text-xsmall footer__list-item-icon">radio_button_checked</i>
                    {item.name}
                  </Text>
                </Link>
              </li>
            )
          }
        })

      })
    }

    // // Return a content block's items with icons
    // let blockItemsFormated = (items) => {
    //   return items.map(function (item, idx) {
    //     return (
    //       <li key={idx} className="footer__list-item">
    //         <Link className="footer__link" to={item.link.to} params={item.link.params}>
    //           <Text size="xsmall">
    //             <i className="material-icons text-xsmall footer__list-item-icon">radio_button_checked</i>
    //             {item.name}
    //           </Text>
    //         </Link>
    //       </li>
    //     )
    //   })
    // }


    //
    // Return
    //

    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__content">

            <div className="footer__block">
              <div className="footer__block-title">
                <Heading size="">
                  <FormattedMessage
                    message={intlStore.getMessage(intlData, 'infoTitle')}
                    locales={intlStore.getCurrentLocale()} />
                  </Heading>
                </div>
                <div className="footer__block-content">
                  <p>
                    El Paraíso Rojo, la tienda erótica más exclusiva de Colombia llegó
                    para conducirte a un viaje por los más profundos placeres,
                    ¿que estás esperando para vivirlos todos junto a nosotros?
                  </p>
                  <br/>
                  <p>
                    Realizamos envios a todo el pais.
                  </p>
                  <ul className="footer__list-social">
                    <li className="footer__list-social-item">
                      <a href="#">
                        <i className="fa fa-facebook-square" aria-hidden="true"></i>
                      </a>
                    </li>

                    <li className="footer__list-social-item">
                      <a href="#">
                        <i className="fa fa-twitter-square" aria-hidden="true"></i>
                      </a>
                    </li>

                  </ul>
                </div>
              </div>

              <div className="footer__block">
                <div className="footer__block-title">
                  <Heading size="">
                    <FormattedMessage
                      message={intlStore.getMessage(intlData, 'linksTitle')}
                      locales={intlStore.getCurrentLocale()} />
                    </Heading>
                  </div>
                  <div className="footer__block-content">
                    <ul>
                      {blockItems(links_own)}
                    </ul>
                    <hr/>
                    <ul>
                      {blockItems(links_how)}
                    </ul>
                    <hr/>
                    <ul>
                      {blockItems(links_explore)}
                    </ul>
                  </div>
                </div>

                <div className="footer__block">
                  <div className="footer__block-title">
                    <Heading size="">
                      <FormattedMessage
                        message={intlStore.getMessage(intlData, 'categoriesTitle')}
                        locales={intlStore.getCurrentLocale()} />
                      </Heading>
                    </div>
                    <div className="footer__block-content">
                      <ul>
                        {blockItemsFormated(custom_categories)}
                      </ul>
                      {/* <ul>
                        <li className="footer__social-item">
                        <div className="footer__social-icon footer__facebook-icon"></div>
                        <div>
                        <a className="footer__link footer__social-link" href="//facebook.com/nicistore" target="_blank">
                        <Text size="small">Facebook</Text>
                      </a>
                    </div>
                  </li>
                  <li className="footer__social-item">
                  <div className="footer__social-icon footer__instagram-icon"></div>
                  <div>
                  <a className="footer__link footer__social-link" href="//instagram.com/nicistore" target="_blank">
                  <Text size="small">Instagram</Text>
                </a>
              </div>
            </li>
            <li className="footer__social-item">
            <div className="footer__social-icon footer__pinterest-icon"></div>
            <div>
            <a className="footer__link footer__social-link" href="//pinterest.com/nicistore" target="_blank">
            <Text size="small">Pinterest</Text>
          </a>
        </div>
      </li>
      <li className="footer__social-item">
      <div className="footer__social-icon footer__twitter-icon"></div>
      <div>
      <a className="footer__link footer__social-link" href="//twitter.com/nicistore" target="_blank">
      <Text size="small">Twitter</Text>
    </a>
  </div>
</li>
</ul> */}
</div>
</div>

{/* <div className="footer__block">
  <div className="footer__block-title">
  <Heading size="small">
  <FormattedMessage
  message={intlStore.getMessage(intlData, 'newsletterTitle')}
  locales={intlStore.getCurrentLocale()} />
</Heading>
</div>
<div className="footer__block-content">
<NewsletterSubscription />
</div>
</div> */}

</div>
<div className="footer__copyright">
  <Text size="small">© {new Date().getFullYear()} El Paraíso Rojo Todos los Derechos Resevados.
    <a className="footer__link" href="tel:3176505861"> 3176505861</a> --
    <a className="footer__link" href="mailto:elparaisorojo.shop@gmail.com"> elparaisorojo.shop@gmail.com</a>
  </Text>

</div>
</div>
</div>
);
}
}

/**
* Exports
*/
export default Footer;
