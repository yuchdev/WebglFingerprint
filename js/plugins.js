/* js-cookie v2.2.0 | MIT */
!function (a) {
    var b = !1;
    if ("function" == typeof define
        && define.amd
        && (define(a), b = !0), "object" == typeof exports
        && (module.exports = a(), b = !0), !b) {

        var c = window.Cookies, d = window.Cookies = a();
        d.noConflict = function () {
            return window.Cookies = c, d
        }
    }
}
(function () {

    function a() {
        for (var a = 0, b = {}; a < arguments.length; a++) {
            var c = arguments[a];
            for (var d in c) {
                b[d] = c[d]
            }
        }
        return b
    }

    function b(c) {

        function d(b, e, f) {

            var g;
            if ("undefined" != typeof document) {

                if (arguments.length > 1) {

                    if ("number" == typeof (f = a({ path: "/" }, d.defaults, f)).expires) {
                        var h = new Date;
                        h.setMilliseconds(h.getMilliseconds() + 864e5 * f.expires), f.expires = h
                    }

                    f.expires = f.expires
                        ? f.expires.toUTCString()
                        : "";

                    try {
                        g = JSON.stringify(e), /^[\{\[]/.test(g) && (e = g)
                    }
                    catch (a) {
                        // suppress exception
                    }
                    e = c.write

                    ? c.write(e, b)
                    : encodeURIComponent(e + "")
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
                            , b = (b = (b = encodeURIComponent(b + ""))
                        .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent))
                        .replace(/[\(\)]/g, escape);
                    
                    var i = "";

                    for (var j in f) 
                        f[j] && (i += "; " + j, !0 !== f[j] && (i += "=" + f[j]));

                    return document.cookie = b + "=" + e + i
                } // if(arguments.length>1)

                b || (g = {});

                for (var k = document.cookie
                    ? document.cookie.split("; ")
                    : [], l = /(%[0-9A-Z]{2}) + /g, m = 0; m < k.length; m++) {

                    var n = k[m].split("="), o = n.slice(1).join("=");
                    this.json || '"' !== o.charAt(0) || (o = o.slice(1, -1));

                    try {
                        var p = n[0].replace(l, decodeURIComponent);
                        if (o = c.read ? c.read(o, p) : c(o, p) || o.replace(l, decodeURIComponent), this.json) {

                            try {
                                o = JSON.parse(o)
                            }
                            catch (a) { }
                        }

                        if (b === p) {
                            g = o;
                            break;
                        }
                        b || (g[p] = o)
                    }
                    catch (a) { }
                }
                return g
            }
        }
        return d.set = d, d.get = function (a) {

            return d.call(d, a)

        }
        , d.getJSON = function () {
                return d.apply({ json: !0 }, [].slice.call(arguments))
            }
            , d.defaults = {}, d.remove = function (b, c) {
                d(b, "", a(c, { expires: -1 }))
            }
            , d.withConverter = b, d
        }
    return b(function () { })
});

/* https://browserleaks.com/js/plugins.js */
function clck(a) {
    if (!location.hash.length)
        return !1;
    if (!new RegExp("^#[0-9a-zA-Z-+]+$").test(location.hash))
        return console.warn(":("), history.replaceState(null, null, window.location.pathname), !1;
    var b = $(location.hash);
    b.length && b.hasClass("warn-help") && (void 0 !== a && b.click(), b[0].scrollIntoView())
}

$(function () {
    
    function a(a) {
        "function" == typeof history.replaceState 
            && (a.length || (a = window.location.pathname), history.replaceState(null, null, a))
    }
    $("footer").on("mouseover", function () {
        $("#bdo").text($("#bdo").text().split("").reverse().join("")), $("footer").off()
    }), $(".code li:odd").addClass("odd");

    var b = $(".warn-help");

    b.each(function () {
        $(this).hasClass("warn-help-enabled") || $(this).next().toggleClass("none"), $(this).click(
        function (c) {
                
            if (c.preventDefault()
                , $(this).toggleClass("warn-help-enabled")
                , $(this).next().toggleClass("none")
                , $(this).hasClass("warn-help-enabled")) {

                a("#" + $(this).attr("id"));
            }
            else {

                a("");
                var d, e = $(this).attr("id");
                b.each(function () {
                    if ((d = $(this).attr("id")) != e && $(this).hasClass("warn-help-enabled")) {
                        return a("#" + d), !1
                    }
                })
            }
        })
    })
    , $(window).bind("hashchange", function () { clck(1) })
    , clck(1)
    , $(".twwt").attr("title", "Tweet this!").click(
    function () {
        window.open("https://twitter.com/intent/tweet?url="
            + encodeURI(location.href)
            + "&text="
            + encodeURI(document.title)
                , "tst"
                , "scrollbars=0,resizable=1,menubar=0,toolbar=0,status=0,width=550,height=420,left="
            + (screen.width ? screen.width / 2 - 275 : 100)
            + ",top="
            + (screen.height ? screen.height / 2 - 210 : 100))
    });

    var c = ($(".ping"), $("#subject"));
    ping = [ping >>> 24, ping >>> 16 & 255, ping >>> 8 & 255, 255 & ping].join("."), c.text() && $(".ping").val(c.text());
    var d = $("body"), e = $("#nav-menu");
    $("#nav-pin").click(function () {
        var a = $("#nav-pin-submit"), b = $("#content"), c = $("#logo a"), f = $("#hand");
        d.hasClass("pinned") ? (e.stop().animate({ width: "24px" }, 350), e.addClass("bs"), b.stop().animate({ marginLeft: "68px" }, 350), c.stop().animate({ marginLeft: "92px" }, 350), f.stop().fadeOut(350), a.attr("title", "Pin Menu"), d.removeClass("pinned"), Cookies.remove("bl_pinned")) : (e.stop().animate({ width: "200px" }, 350), e.removeClass("bs"), b.stop().animate({ marginLeft: "246px" }, 350), c.stop().animate({ marginLeft: "340px" }, 350), f.addClass("hand_img").stop().fadeIn(350), a.attr("title", "Unpin Menu"), d.addClass("pinned"), Cookies.set("bl_pinned", 1, { expires: 90 }))
    })
    , e.removeClass("css")
    , $("#nav-hover").hover(function () { d.hasClass("pinned") || e.stop().animate({ width: "200px" }, 200) }
    , function () { d.hasClass("pinned") || e.stop().animate({ width: "24px" }, 200) })
    , $("#nav-hover a,#nav-hover span").on("focus"
    , function () { d.hasClass("pinned") || e.stop().animate({ width: "200px" }, 200) })
    , $("#nav-hover a,#nav-hover span").on("focusout"
    , function () { d.hasClass("pinned") || e.stop().animate({ width: "24px" }, 200) });
    
    var f = $("#dsq_autoload_input"); 
    Cookies.get("bl_dsq") 
        ? f.prop("checked", !1) 
        : f.prop("checked", !0), f.on("click",  function () {
            $(this).prop("checked")
                ? Cookies.remove("bl_dsq") 
                : Cookies.set("bl_dsq", 1, { expires: 90 }) 
            });
    var g = $("#comments");
    g.hasClass("comments-locked") || g.on("click", function () {
        
        if (1 == window.disqus) {
            return !1;
        }
        
        a(""), g.addClass("comments-locked"), $.ajax({
            url: "https://browserleaks.disqus.com/embed.js", dataType: "script", cache: !0 }
        ).success(function (a) {
            window.disqus = !0, g.off("click") 
        }) 
    })    
    , $("#lookup-form form #data").keypress( function (a) {
        if (13 == a.which) {
            return $("#lookup-submit").click(), !1 
        }
    })
    , $("#lookup-submit").on("click", function (a) {
        var b = $.trim($("#data").val());
        if (b == ping || "" == b) {
            return a.preventDefault(), window.location.href = "/ip", !1;
        }
        $("#lookup-form").submit()
    })
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