const { validYandexMetrikaTrackingId, getCookie } = require('../helper');

exports.addYandexMetrika = (options) => {
    return new Promise((resolve, reject) => {
        if (window.gatsbyPluginGDPRCookiesYandexMetrikaAdded)
            return resolve(true)

        const metrikaSrc = options.useCDN
        ? `https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js`
        : `https://mc.yandex.ru/metrika/tag.js`

        // Lighthouse recommends pre-connecting to an analytics domain.
        const preConnectLink = document.createElement(`link`)
        preConnectLink.rel = `preconnect dns-prefetch`
        preConnectLink.key = `preconnect-yandex-metrika`
        preConnectLink.href= `${ options.useCDN ? "https://cdn.jsdelivr.net" : "https://mc.yandex.ru" }`

        const head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(preConnectLink)

        const addInitScript = () => {
            const initScript = document.createElement('script');
            initScript.key = `gatsby-plugin-gdpr-cookies-yandex-metrika`
            initScript.async = true
            initScript.type = `text/javascript`;

            const code = `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],${options.defer ? "k.defer=1" : "k.async=1"},k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "${metrikaSrc}", "ym");
                ym(${options.trackingId}, "init", {
                    accurateTrackBounce: ${options.accurateTrackBounce},
                    childIframe: ${options.childIframe},
                    clickmap: ${options.clickmap},
                    defer: ${options.defer},
                    ecommerce: ${options.ecommerce},
                    trackHash: ${options.trackHash},
                    trackLinks: ${options.trackLinks},
                    trustedDomains: ${options.trustedDomains},
                    type: ${options.type},
                    webvisor: ${options.webvisor},
                    triggerEvent: ${options.triggerEvent},
                });
            `;

            try {
                initScript.appendChild(document.createTextNode(code));
                document.body.appendChild(initScript)
            } catch (e) {
                initScript.text = code;
                document.body.appendChild(initScript)
            }
        }
        window.onload = addInitScript()
     
        const noscriptEl = document.createElement(`noscript`)
        const divEl = document.createElement('div')
        const imgEl = document.createElement(`img`)
                imgEl.src = `https://mc.yandex.ru/watch/${options.trackingId}`
                imgEl.style = `position: absolute; left: -9999px;`
                imgEl.alt=""
     
        const nestEles = () => {
            let nodes = [ divEl, imgEl]
         
            for(var i=0; i<nodes.length; i++) {
              noscriptEl.appendChild(nodes[i]);
            }
            
            for(var j=0; j<1; j++) {
              nodes[j].appendChild(nodes[j+1])
            }
        }
          
        nestEles()
        
        document.body.insertBefore(noscriptEl, document.body.firstChild)

       
        window.gatsbyPluginGDPRCookiesYandexMetrikaAdded = true

        resolve(true)
    })
}

exports.initializeYandexMetrika = (options) => {
    if (!window.gatsbyPluginGDPRCookiesYandexMetrikaInitialized &&
        getCookie(options.cookieName) === `true` &&
        validYandexMetrikaTrackingId(options)
        ) {
            window.gatsbyPluginGDPRCookiesYandexMetrikaInitialized = true
        }
}

exports.trackYandexMetrika = (options, location) => {
    if (
        getCookie(options.cookieName) === `true` &&
        validYandexMetrikaTrackingId(options) &&
        typeof window.ym !== `undefined`
    ) {
        const pagePath = location ? location.pathname + location.search + location.hash : undefined
        window.ym(options.trackingId, "hit", pagePath)
    }
  }