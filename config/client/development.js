// App config the for development environment.
// Do not require this directly. Use ./src/config instead.
export default {
    app: {
        title: 'El Paraíso Rojo - Sex shop, tienda erótica',
        locale: {
            available: ['es', 'en'],
            default: 'es'
        }
    },
    api: {
        atlas: {
            baseUrl: 'http://0.0.0.0:8000/v1'
        }
    },
    googleAnalytics: {
        enabled: false,
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // Development Property
        options: {
            debug: true
        }
    },
    facebookPixel: {
        enabled: false,
        id: process.env.FACEBOOK_PIXEL_ID
    },
    crisp: {
        enabled: false,
        websiteID: process.env.CRISP_WEBSITE_ID // TODO: This is still hardcoded in the vendor file
    },
    mailChimp: {
        signupFormPostURL: process.env.MAILCHIMP_SIGNUP_FORM_POST_URL
    },
    switchPayments: {
        enabled: false,
        environment: 'https://api-test.switchpayments.com/v2/',
        publicKey: process.env.SWITCH_PUBLIC_KEY
    }
};
