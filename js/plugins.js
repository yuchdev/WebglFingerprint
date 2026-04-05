/**
 * Modernized plugins.js
 */

const Cookies = (function () {
    'use strict';

    function extend() {
        let result = {};
        for (let i = 0; i < arguments.length; i++) {
            let attributes = arguments[i];
            for (let key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            if (typeof document === 'undefined') {
                return;
            }

            // Write
            if (arguments.length > 1) {
                attributes = extend({ path: '/' }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    let expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e5);
                    attributes.expires = expires;
                }

                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    let result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                value = converter.write
                    ? converter.write(value, key)
                    : encodeURIComponent(String(value)).replace(
                          /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                          decodeURIComponent
                      );

                key = encodeURIComponent(String(key))
                    .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                    .replace(/[\(\)]/g, escape);

                let stringifiedAttributes = '';
                for (let attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
                }

                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read
            let result = key ? undefined : {};
            let cookies = document.cookie ? document.cookie.split('; ') : [];
            let rdecode = /(%[0-9A-Z]{2})+/g;

            for (let i = 0; i < cookies.length; i++) {
                let parts = cookies[i].split('=');
                let cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    let name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = (converter.read || converter)(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

                    if (api.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = (key) => api.call(api, key);
        api.getJSON = function () {
            return api.apply({ json: true }, [].slice.call(arguments));
        };
        api.defaults = {};
        api.remove = (key, attributes) => api(key, '', extend(attributes, { expires: -1 }));
        api.withConverter = init;

        return api;
    }

    return init(() => {});
})();

window.Cookies = Cookies;

function clck(a) {
    if (!location.hash.length) return false;
    if (!new RegExp('^#[0-9a-zA-Z-+]+$').test(location.hash)) {
        console.warn(':(');
        history.replaceState(null, null, window.location.pathname);
        return false;
    }
    const b = document.querySelector(location.hash);
    if (b && b.classList.contains('warn-help')) {
        if (void 0 !== a) b.click();
        b.scrollIntoView();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function updateHash(hash) {
        if (typeof history.replaceState === 'function') {
            if (!hash.length) hash = window.location.pathname;
            history.replaceState(null, null, hash);
        }
    }

    const footer = document.querySelector('footer');
    if (footer) {
        const mouseOverHandler = () => {
            const bdo = document.getElementById('bdo');
            if (bdo) bdo.textContent = bdo.textContent.split('').reverse().join('');
            footer.removeEventListener('mouseover', mouseOverHandler);
        };
        footer.addEventListener('mouseover', mouseOverHandler);
    }

    document.querySelectorAll('.code li:nth-child(odd)').forEach((el) => el.classList.add('odd'));

    const warnHelpElements = document.querySelectorAll('.warn-help');

    warnHelpElements.forEach((el) => {
        if (!el.classList.contains('warn-help-enabled')) {
            const nextEl = el.nextElementSibling;
            if (nextEl) nextEl.classList.toggle('none');
        }
        el.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('warn-help-enabled');
            const nextEl = this.nextElementSibling;
            if (nextEl) nextEl.classList.toggle('none');

            if (this.classList.contains('warn-help-enabled')) {
                updateHash('#' + this.getAttribute('id'));
            } else {
                updateHash('');
                const id = this.getAttribute('id');
                warnHelpElements.forEach((innerEl) => {
                    const innerId = innerEl.getAttribute('id');
                    if (innerId !== id && innerEl.classList.contains('warn-help-enabled')) {
                        updateHash('#' + innerId);
                    }
                });
            }
        });
    });

    window.addEventListener('hashchange', () => clck(1));
    clck(1);

    document.querySelectorAll('.twwt').forEach((el) => {
        el.setAttribute('title', 'Tweet this!');
        el.addEventListener('click', () => {
            window.open(
                'https://twitter.com/intent/tweet?url=' +
                    encodeURI(location.href) +
                    '&text=' +
                    encodeURI(document.title),
                'tst',
                'scrollbars=0,resizable=1,menubar=0,toolbar=0,status=0,width=550,height=420,left=' +
                    (screen.width ? screen.width / 2 - 275 : 100) +
                    ',top=' +
                    (screen.height ? screen.height / 2 - 210 : 100)
            );
        });
    });

    const subject = document.getElementById('subject');
    if (typeof ping !== 'undefined') {
        const pingStr = [(ping >>> 24) & 255, (ping >>> 16) & 255, (ping >>> 8) & 255, ping & 255].join('.');
        if (subject && subject.textContent) {
            document.querySelectorAll('.ping').forEach((el) => (el.value = subject.textContent));
        }
    }

    const body = document.body;
    const navMenu = document.getElementById('nav-menu');
    const navPin = document.getElementById('nav-pin');

    if (navPin && navMenu) {
        navPin.addEventListener('click', () => {
            const navPinSubmit = document.getElementById('nav-pin-submit');
            const content = document.getElementById('content');
            const logoA = document.querySelector('#logo a');
            const hand = document.getElementById('hand');

            if (body.classList.contains('pinned')) {
                navMenu.style.transition = 'width 0.35s';
                navMenu.style.width = '24px';
                navMenu.classList.add('bs');
                if (content) {
                    content.style.transition = 'margin-left 0.35s';
                    content.style.marginLeft = '68px';
                }
                if (logoA) {
                    logoA.style.transition = 'margin-left 0.35s';
                    logoA.style.marginLeft = '92px';
                }
                if (hand) {
                    hand.style.transition = 'opacity 0.35s';
                    hand.style.opacity = '0';
                    setTimeout(() => {
                        if (hand.style.opacity === '0') hand.style.display = 'none';
                    }, 350);
                }
                if (navPinSubmit) navPinSubmit.setAttribute('title', 'Pin Menu');
                body.classList.remove('pinned');
                Cookies.remove('bl_pinned');
            } else {
                navMenu.style.transition = 'width 0.35s';
                navMenu.style.width = '200px';
                navMenu.classList.remove('bs');
                if (content) {
                    content.style.transition = 'margin-left 0.35s';
                    content.style.marginLeft = '246px';
                }
                if (logoA) {
                    logoA.style.transition = 'margin-left 0.35s';
                    logoA.style.marginLeft = '340px';
                }
                if (hand) {
                    hand.style.display = 'block';
                    hand.classList.add('hand_img');
                    setTimeout(() => {
                        hand.style.transition = 'opacity 0.35s';
                        hand.style.opacity = '1';
                    }, 10);
                }
                if (navPinSubmit) navPinSubmit.setAttribute('title', 'Unpin Menu');
                body.classList.add('pinned');
                Cookies.set('bl_pinned', 1, { expires: 90 });
            }
        });
    }

    if (navMenu) {
        navMenu.classList.remove('css');
        const navHover = document.getElementById('nav-hover');
        if (navHover) {
            navHover.addEventListener('mouseenter', () => {
                if (!body.classList.contains('pinned')) {
                    navMenu.style.transition = 'width 0.2s';
                    navMenu.style.width = '200px';
                }
            });
            navHover.addEventListener('mouseleave', () => {
                if (!body.classList.contains('pinned')) {
                    navMenu.style.transition = 'width 0.2s';
                    navMenu.style.width = '24px';
                }
            });
        }
        document.querySelectorAll('#nav-hover a, #nav-hover span').forEach((el) => {
            el.addEventListener('focus', () => {
                if (!body.classList.contains('pinned')) {
                    navMenu.style.transition = 'width 0.2s';
                    navMenu.style.width = '200px';
                }
            });
            el.addEventListener('focusout', () => {
                if (!body.classList.contains('pinned')) {
                    navMenu.style.transition = 'width 0.2s';
                    navMenu.style.width = '24px';
                }
            });
        });
    }

    const dsqAutoloadInput = document.getElementById('dsq_autoload_input');
    if (dsqAutoloadInput) {
        dsqAutoloadInput.checked = !Cookies.get('bl_dsq');
        dsqAutoloadInput.addEventListener('click', function () {
            this.checked ? Cookies.remove('bl_dsq') : Cookies.set('bl_dsq', 1, { expires: 90 });
        });
    }

    const comments = document.getElementById('comments');
    if (comments && !comments.classList.contains('comments-locked')) {
        comments.addEventListener('click', function handler() {
            if (window.disqus === 1) return false;

            updateHash('');
            comments.classList.add('comments-locked');

            fetch('https://browserleaks.disqus.com/embed.js', { cache: 'force-cache' })
                .then((response) => response.text())
                .then((scriptText) => {
                    const script = document.createElement('script');
                    script.text = scriptText;
                    document.head.appendChild(script);
                    window.disqus = true;
                    comments.removeEventListener('click', handler);
                });
        });
    }

    const dataInput = document.querySelector('#lookup-form form #data');
    if (dataInput) {
        dataInput.addEventListener('keypress', (e) => {
            if (e.which === 13) {
                const submitBtn = document.getElementById('lookup-submit');
                if (submitBtn) submitBtn.click();
                e.preventDefault();
                return false;
            }
        });
    }

    const lookupSubmit = document.getElementById('lookup-submit');
    if (lookupSubmit) {
        lookupSubmit.addEventListener('click', (e) => {
            const dataEl = document.getElementById('data');
            const val = dataEl ? dataEl.value.trim() : '';
            if (typeof pingStr !== 'undefined' && (val === pingStr || val === '')) {
                e.preventDefault();
                window.location.href = '/ip';
                return false;
            }
            const lookupForm = document.getElementById('lookup-form');
            if (lookupForm) lookupForm.submit();
        });
    }
});

var x = "amp_js_init,xtsite,Xt_,ActOn,pbjs,adriver,adroll_,ct_tag,addthis,a2apage_init,"
    "_cfEmails,gbWhVer,advst_is_above_the_fold,ados,AlgoliaSearch,AUI,ngMaterial,Wicket,"
    "ArtifactoryUpdates,ArvanCloud,asciidoc,bitbucket,jira,avng8_,bablic,Backdrop,bitt,"
    "Bizweb,bouncex,appquery,BugSense,BugSnag,_bsa,CKEDITOR,fn_compare_strings,Captchme,"
    "_carbonads,catberry,Chart,_sf_endpt,ch_client,clickHeat,ClickTale,clicky,Clipboard,"
    "CloudFlare,CodeMirror,CoinHive,Comandia,CCM_IMAGE_PATH,CE2,criteo,crsspxl,CryptoLoot,"
    "Cufon,DotNetNuke,dle_root,phpdebugbar,DedeContainer,dpd,Discourse,discuz_uid,DISQUS,"
    "dojo,Drupal,ef,EPJS_menu_template,elqLoad,Ember,enyo,Epom,padimpexp,Exhibit,Ext,"
    "Fingerprint,foswiki,FTB_,_fusion,galleryAuthToken,gm_session_id,_gauges,gerrit_,"
    "GSFN,GitLab,_gostats,google_ad_,gaGlobal,__gvizguard__,prettyPrint,WebFonts,googletag,"
    "__gwt_,Gravatar,GravityInsights,Hammer,Haravan,head,heap,HelloBar,Highcharts,Hogan,"
    "HotLeadfactory,_hsq,szmvars,ipb_var,Immutable,Inferno,Intercom,JSChart,$jit,jimdo_Data,"
    "jirafe,joDOM,Jobber,jseMine,K2RatingURL,KM_COOKIE_DOMAIN,k_track,Kamva,kendo,Kinetic,"
    "_klarnaCheckout,ko,kmPageInfo,ego_domains,Liferay,LS_JSON,List,LITHIUM,LiveAgent,"
    "LIVESTREET,fyre,Luigis,MODX_MEDIA_PATH,setMRefURL,Mage,Marionette,Munchkin,MathJax,"
    "mm_user,mejs,eidosBase,_spBodyOnLoadCalled,Mint,Mixpanel,Mobify,MochiKit,Modernizr,"
    "show_switch2gui,moment,_monoTracker,MooTools,moodle,Mustache,MyBB,nv,nvg9,sitestat,"
    "neon,netmonitor,NETO,Nette,NREUM,__NEXT_DATA__,oxTopMenu,BWEUM,OneStat,OAS_AD,owa_,"
    "optimizely,OB_releaseVer,IsOwaPremiumBrowser,PDFJS,piAId,PARSELY,braintree,PAYPAL,"
    "penguin,petrojs,Phaser,PianoMedia,pligg_,Plotly,pwidget_config,Polymer,Posterous,"
    "PrefixFree,freeProductTranslation,Prism,pw_adloader,ProjectPoi,Prototype,protovis,"
    "__change,quantserve,Quill,RDStation,rainloop,Raphael,Rayo,reddit,reinvigorate,requirejs,"
    "Reveal,Rickshaw,RightJS,riot,_robin_getRobinJs,rcube_,Rx,smf_,SWFObject,SFDCApp,"
    "dwAnalytics,Sazito,analytics,Shapecss,SHARETHIS,ShellInABox,SSsdk,Shopalize,shptUrl,"
    "Shopify,shoptet,s_INST,SmartAdServer,Snap,snoobi,SobiProUrl,io,ACPuzzle,SonarRequest,"
    "BaconPlayer,DOCUMENTATION_OPTIONS,Squarespace,squirrelmail_loginpage_onload,Stackla,"
    "stacklaSocialHub,Stripe,sublimevideo,swal,Swiftype,SyntaxHighlighter,taigaConfig,TeaLeaf,"
    "TEALIUMENABLED,Telescope,tiddler,Timeplot,tinyMCE,titan,AjaxShoppingCart,TrackJs,TweenMax,"
    "twemoji,flight,typeahead,TypechoComment,Typekit,ucCatalog,Umbraco,usabilla_live,UserEngage,"
    "_usrp,UserVoice,Ushahidi,vivvo,Veoxa_,VideoJS,vglnk,VWGEventArgs,volusion,Vue,WEBXPAY,webix,"
    "webtrekk,WebTrends,wink,wixData,woocommerce_params,xliteConfig,xoops,XRegExp,adxinserthtml,"
    "YStore,YWA,yandex_partner_id,yandex_metrika,yii,zbxCallPostScripts,zanox,Zepto,"
    "actionheroClient,AmCharts,basket,COMSCORE,esyndicat,JetshopData,jQT,mathjs,phpbb_,phpcms,"
    "pma_absolute_uri,pp_titles,Recaptcha,Scriptaculous,Shine,THREE,vB_Q,xChart,Raychat,MauticTrackingObject";