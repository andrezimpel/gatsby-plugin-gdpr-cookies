# gatsby-plugin-gdpr-cookies

Gatsby plugin to add Google Analytics (V4 is supported), Google Tag Manager and Facebook Pixel in a GDPR form to your site.

**Important:** It now supports tracking right away without reloading the page. [See here](#initialize-and-track).

## Install

`yarn add gatsby-plugin-gdpr-cookies`
or
`npm install --save gatsby-plugin-gdpr-cookies`

## How to use

```javascript
// in your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
          allowAdFeatures: false // default
        },
        googleTagManager: {
          trackingId: 'YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        facebookPixel: {
          pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-facebook-pixel', // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development']
      },
    },
  ],
}
```

## How it works

First of all the plugin checks in which environment your site is running. If it's currently running in one of your defined environments it will add the tracking code by default to the `<head>/<body>` of your site. It will not be activated or initialized by this.

By default this plugin will not send any data to Google or Facebook to make it GDPR compliant. The user first needs to accept your cookie policy. By accepting that you need to set cookies for the tracker you want to use - `gatsby-gdpr-google-analytics`, `gatsby-gdpr-google-tagmanager`, `gatsby-gdpr-facebook-pixel`. Depending on the user input the value of each of the cookies should be `true` or `false`.

If the `gatsby-gdpr-google-analytics` cookie is set to true, Google Analytics will be initialized `onClientEntry`. Same is for the Google Tag Manager and Facebook Pixel. The plugin will check if cookies for Google Analytics or Facebook Pixel have been set between route changes on `onRouteUpdate`. Reloading the page after setting the cookies is not required anymore.

The page view will be tracked on `onRouteUpdate`.

**Important:** read below about using the plugin with Google Tag Manager.

## Options

### Google Analytics

#### `trackingId`

Here you place your Google Analytics tracking ID. Analytics 4 is supported by the plugin beginning with v1.0.12.

#### `cookieName`

You can use a custom cookie name if you need to!

#### `allowAdFeatures`

The default value is false.

#### `anonymize`

Some countries (such as Germany) require you to use the
[\_anonymizeIP](https://support.google.com/analytics/answer/2763052) function for Google Analytics. Otherwise you are not allowed to use it. The option adds two blocks to the code:

```javascript
ga('set', 'anonymizeIp', 1);
```

#### `opt-out`
Your visitors should be able to opt-out for analytics tracking. By setting the Google Analytics cookie to false tracking will be stopped. Alternatively you can also set the corresponding window variable to false:

```javascript
window[`ga-disable-YOUR_TRACKING_ID_HERE`] = true
```

### Google Tag Manager

#### `trackingId`

Here you place your Google Tag Manager tracking ID.

#### `cookieName`

You can use a custom cookie name if you need to!

#### `dataLayerName`

Data layer name

#### `routeChangeEvent`

The name of the event which will be triggered when route changes
Defaults to `gatsbyRouteChange`

#### `gtmAuth`

Google Tag Manager environment auth string

#### `gtmPreview`

Google Tag Manager environment preview name

#### `defaultDataLayer`

Data layer to be set before GTM is loaded. Should be an object or a function that is executed in the browser, e.g.:

```javascript
  defaultDataLayer: { platform: "gatsby" }
```

```javascript
  defaultDataLayer: function() {
    return {
      pageType: window.pageType,
    }
  }
```

#### Tracking routes

Out of the box this plugin will simply load Google Tag Manager on the initial page/app load. It’s up to you to fire tags based on changes in your app.

This plugin will fire a new event called `gatsbyRouteChange` (by default) on Gatsby's `onRouteUpdate` (only if the consent was given by a visitor). To record this in Google Tag Manager, we will need to add a trigger to the desired tag to listen for the event:

In order to do that, go to _Tags_. Under _Triggering_ click the pencil icon, then the ”+” button to add a new trigger. In the _Choose a trigger_ window, click on the ”+” button again. Choose the trigger type by clicking the pencil button and clicking _Custom event_. For event name, enter `gatsbyRouteChange`. This tag will now catch every route change in Gatsby, and you can add Google tag services as you wish to it.

### Facebook Pixel

#### `pixelId`

Here you place your Facebook Pixel ID.

#### `cookieName`

You can use a custom cookie name if you need to!

## Initialize and track
This gatsby plugin now supports initializing and tracking right after a user accepts the cookie consent.

```javascript
// in your cookie banner
import { useLocation } from "@reach/router" // this helps tracking the location
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
```
Then you can execute `initializeAndTrack(location)` in your cookie banner callback. This will initialize the plugin with your options from the `gatsby-config.js` and then starts tracking the user based on the cookies/services are accepted.

```javascript
// in your cookie banner
initializeAndTrack(location)
```

## Contributors

Thanks goes to these wonderful people who helped shaping this project.

[Simon Vanherweghe](https://github.com/SimonVanherweghe)

[Stefan Tertan](https://github.com/ColdFire87)

[Osvaldas Valutis](https://github.com/osvaldasvalutis)

[Théo](https://github.com/3theochp)

[Paul Brickles](https://github.com/pbrickles)

[Ferran Buireu](https://github.com/fbuireu)
