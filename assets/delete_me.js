var StampedFn =
    StampedFn ||
    (function (G, A) {
        var s,
            P,
            q = {
                DEFAULT_ENDPOINT: G.stamped_ajax_url || "//stamped.io/api",
                SECURE_ENDPOINT: G.stamped_ajax_secure_url || "https://stamped.io/api",
                metafields: G.mainWidgetMetafields || "",
                exclude_main_css: G.stamped_exclude_main_css || !1,
                exclude_font: G.stamped_disable_font || !1,
                disable_single_review: G.stamped_disable_review_single || !1,
                is_preview: G.isStampedLauncherPreview || !1,
                modal_ugc_image_viewer: G.stamped_modal_ugc_viewer_type || "image",
                is_init_rewards: !0,
                is_force_jquery: G.stamped_force_jquery || !1,
                referral_code: null,
                is_rewards_code_copy: !1,
                is_ignore_submit_error: !1,
                slick_options: G.stamped_slick_options || {
                    dots: !1,
                    infinite: !1,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    slide: ".stamped-review",
                    initialSlide: 0,
                    rows: 0,
                    responsive: [
                        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                        { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    ],
                },
                includes_options: { rewards_button_js: !0, rewards_window_js: !0 },
            },
            I = !1,
            r = !1;
        (G.StampedGlobalOptions = {}), (G.isInitializedStamped = !1);
        var O,
            n,
            a,
            l,
            d,
            o,
            p,
            m,
            c,
            u,
            h,
            g,
            v,
            t = [],
            f = [],
            w = [],
            T = {},
            y = "div#stamped-main-widget",
            b = {},
            S =
                "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; }";
        function k() {
            var e,
                t = !1;
            return (
                (e = navigator.userAgent || navigator.vendor || G.opera),
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    e
                ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        e.substr(0, 4)
                    )) &&
                    (t = !0),
                t
            );
        }
        function _(e) {
            if ("click" === e.type) return !0;
            if ("keypress" !== e.type) return !1;
            var t = e.charCode || e.keyCode;
            return 32 === t || 13 === t || void 0;
        }
        function C(e) {
            var t = A.createElement("span");
            t.appendChild(A.createTextNode(e)), (t.id = "tempCopyToClipboard"), A.body.append(t);
            var a = A.createRange();
            a.selectNode(t), G.getSelection().removeAllRanges(), G.getSelection().addRange(a), A.execCommand("copy"), G.getSelection().removeAllRanges(), t.remove();
        }
        function e(e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
            var a = A.createEvent("CustomEvent");
            return a.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), a;
        }
        function R() {
            return (R =
                Object.assign ||
                function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var a = arguments[t];
                        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
                    }
                    return e;
                }).apply(this, arguments);
        }
        (String.prototype.formatStringStamped = function () {
            for (var e = this, t = 0; t < arguments.length; t++) var a = new RegExp("\\{" + t + "\\}", "gi"), e = e.replace(a, arguments[t]);
            return e;
        }),
            "function" != typeof G.CustomEvent && ((e.prototype = G.Event.prototype), (G.CustomEvent = e)),
            (G.lazyLoadOptionsStamped = { elements_selector: ".stamped-lazyload" }),
            G.addEventListener(
                "LazyLoad::Initialized",
                function (e) {
                    G.LazyLoadStamped = e.detail.instance;
                },
                !1
            );
        var E, U, x;
        !(function () {
            "use strict";
            function r(e, t) {
                var a,
                    s = new e(t);
                try {
                    a = new CustomEvent("LazyLoad::Initialized", { detail: { instance: s } });
                } catch (e) {
                    (a = A.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: s });
                }
                try {
                    G.dispatchEvent(a);
                } catch (t) {}
            }
            function m(e, t) {
                return e.getAttribute("data-" + t);
            }
            function i(e, t, a) {
                var s = "data-" + t;
                null !== a ? e.setAttribute(s, a) : e.removeAttribute(s);
            }
            function n(e) {
                return "true" === m(e, "was-processed");
            }
            function c(e, t) {
                return i(e, "ll-timeout", t), 0;
            }
            function u(e) {
                return m(e, "ll-timeout");
            }
            function h(e, t) {
                e && e(t);
            }
            function g(e, t) {
                (e._loadingCount += t), 0 === e._elements.length && 0 === e._loadingCount && h(e._settings.callback_finish);
            }
            function s(e) {
                for (var t, a = [], s = 0; (t = e.children[s]); s += 1) "SOURCE" === t.tagName && a.push(t);
                return a;
            }
            function a(e, t, a) {
                a && e.setAttribute(t, a);
            }
            function d(e, t) {
                a(e, "sizes", m(e, t.data_sizes)), a(e, "srcset", m(e, t.data_srcset)), a(e, "src", m(e, t.data_src));
            }
            function l(e, t) {
                I ? e.classList.add(t) : (e.className += (e.className ? " " : "") + t);
            }
            function o(e, t, a) {
                e.addEventListener(t, a);
            }
            function p(e, t, a) {
                e.removeEventListener(t, a);
            }
            function v(e, t, a) {
                p(e, "load", t), p(e, "loadeddata", t), p(e, "error", a);
            }
            function f(e, t, a) {
                var s,
                    r,
                    i = a._settings,
                    n = t ? i.class_loaded : i.class_error,
                    d = t ? i.callback_loaded : i.callback_error,
                    o = e.target;
                (s = o),
                    (r = i.class_loading),
                    I
                        ? s.classList.remove(r)
                        : (s.className = s.className
                              .replace(new RegExp("(^|\\s+)" + r + "(\\s+|$)"), " ")
                              .replace(/^\s+/, "")
                              .replace(/\s+$/, "")),
                    l(o, n),
                    h(d, o),
                    g(a, -1);
            }
            function w(a, s) {
                function r(e) {
                    f(e, !0, s), v(a, r, n);
                }
                var e,
                    t,
                    i,
                    n = function e(t) {
                        f(t, !1, s), v(a, r, e);
                    };
                (i = n), o((e = a), "load", (t = r)), o(e, "loadeddata", t), o(e, "error", i);
            }
            function y(e, t) {
                var a = t._observer;
                U(e, t), a && t._settings.auto_unobserve && a.unobserve(e);
            }
            function b(e) {
                var t = u(e);
                t && (clearTimeout(t), c(e, null));
            }
            function S(p) {
                return (
                    !!C &&
                    ((p._observer = new IntersectionObserver(
                        function (e) {
                            e.forEach(function (e) {
                                return e.isIntersecting || 0 < e.intersectionRatio
                                    ? ((s = e.target),
                                      (l = (r = p)._settings),
                                      h(l.callback_enter, s),
                                      void (l.load_delay
                                          ? ((i = s),
                                            (d = (n = r)._settings.load_delay),
                                            (o = u(i)) ||
                                                ((o = setTimeout(function () {
                                                    y(i, n), b(i);
                                                }, d)),
                                                c(i, o)))
                                          : y(s, r)))
                                    : ((t = e.target), (a = p._settings), h(a.callback_exit, t), void (a.load_delay && b(t)));
                                var t, a, s, r, i, n, d, o, l;
                            });
                        },
                        { root: (e = p._settings).container === A ? null : e.container, rootMargin: e.thresholds || e.threshold + "px" }
                    )),
                    !0)
                );
                var e;
            }
            function k(e, t) {
                return (
                    (s = e || (a = t).container.querySelectorAll(a.elements_selector)),
                    Array.prototype.slice.call(s).filter(function (e) {
                        return !n(e);
                    })
                );
                var a, s;
            }
            function e(e, t) {
                (this._settings = R({}, O, e)), (this._loadingCount = 0), S(this), this.update(t);
            }
            var t = void 0 !== G,
                _ = (t && !("onscroll" in G)) || ("undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
                C = t && "IntersectionObserver" in G,
                I = t && "classList" in A.createElement("p"),
                O = {
                    elements_selector: "img",
                    container: _ || t ? A : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    class_loading: "stamped-lazyload-loading",
                    class_loaded: "stamped-lazyload-loaded",
                    class_error: "stamped-lazyload-error",
                    load_delay: 0,
                    auto_unobserve: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_reveal: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    use_native: !1,
                },
                T = {
                    IMG: function (e, t) {
                        var a = e.parentNode;
                        a &&
                            "PICTURE" === a.tagName &&
                            s(a).forEach(function (e) {
                                d(e, t);
                            }),
                            d(e, t);
                    },
                    IFRAME: function (e, t) {
                        a(e, "src", m(e, t.data_src));
                    },
                    VIDEO: function (e, t) {
                        s(e).forEach(function (e) {
                            a(e, "src", m(e, t.data_src));
                        }),
                            a(e, "src", m(e, t.data_src)),
                            e.load();
                    },
                },
                E = ["IMG", "IFRAME", "VIDEO"],
                U = function (e, t, a) {
                    var s = t._settings;
                    (!a && n(e)) ||
                        (-1 < E.indexOf(e.tagName) && (w(e, t), l(e, s.class_loading)),
                        (function (e, t) {
                            var a,
                                s,
                                r,
                                i,
                                n,
                                d,
                                o = t._settings,
                                l = e.tagName,
                                p = T[l];
                            if (p)
                                return (
                                    p(e, o),
                                    g(t, 1),
                                    (t._elements =
                                        ((a = t._elements),
                                        (s = e),
                                        a.filter(function (e) {
                                            return e !== s;
                                        })))
                                );
                            (n = m((r = e), (i = o).data_src)), (d = m(r, i.data_bg)), n && (r.style.backgroundImage = 'url("'.concat(n, '")')), d && (r.style.backgroundImage = d);
                        })(e, t),
                        i(e, "was-processed", "true"),
                        h(s.callback_reveal, e),
                        h(s.callback_set, e));
                },
                x = ["IMG", "IFRAME"];
            (e.prototype = {
                update: function (e) {
                    var t,
                        a = this,
                        s = this._settings;
                    (this._elements = k(e, s)),
                        !_ && this._observer
                            ? (s.use_native &&
                                  "loading" in HTMLImageElement.prototype &&
                                  ((t = this)._elements.forEach(function (e) {
                                      -1 !== x.indexOf(e.tagName) && (e.setAttribute("loading", "lazy"), U(e, t));
                                  }),
                                  (this._elements = k(e, s))),
                              this._elements.forEach(function (e) {
                                  a._observer.observe(e);
                              }))
                            : this.loadAll();
                },
                destroy: function () {
                    var t = this;
                    this._observer &&
                        (this._elements.forEach(function (e) {
                            t._observer.unobserve(e);
                        }),
                        (this._observer = null)),
                        (this._elements = null),
                        (this._settings = null);
                },
                load: function (e, t) {
                    U(e, this, t);
                },
                loadAll: function () {
                    var t = this;
                    this._elements.forEach(function (e) {
                        y(e, t);
                    });
                },
            }),
                t &&
                    (function (e, t) {
                        if (t)
                            if (t.length) for (var a, s = 0; (a = t[s]); s += 1) r(e, a);
                            else r(e, t);
                    })(e, G.lazyLoadOptionsStamped);
        })();
        function F(e, t) {
            t ? (Re("Using included jQ"), (P = t), Re((G.jQueryStamped = P))) : (Re("Loaded jQ"), (G.jQueryStamped = P)),
                /msie/.test(G.navigator.userAgent.toLowerCase()) && (P.support.cors = !0),
                1 != q.exclude_font && P("head").append(P("<link/>", { rel: "stylesheet", href: "//fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap", type: "text/css" }));
            var a = xe("stamped_referral_code") || xe("stamped_ref");
            a && (je("stamped_referral_code", { code: a }), (q.referral_code = a));
            var s = Ne("stamped_referral_code");
            s && s.code && (q.referral_code = s.code),
                Re("Library Starting..."),
                P.isReady
                    ? j()
                    : P(A).ready(function () {
                          j();
                      }),
                setTimeout(function () {
                    r || (Re("Library not started, fallback"), j());
                }, 3e3);
        }
        function j() {
            Re("Started library"), We("stamped:init:starting"), N(), L(), (r = !0);
        }
        function N() {
            if ((Re("Starting UGC..."), (O = P(y)).length)) {
                if (P.trim(O.html())) {
                    ee(), oe(), re(), se(), X(), ie();
                    try {
                        G.LazyLoadStamped && LazyLoadStamped.update && LazyLoadStamped.update();
                    } catch (e) {}
                } else Z();
                P(A).on("click keypress", ".stamped-summary-ratings .summary-rating", function (e) {
                    var t, a, s;
                    !0 === _(e) &&
                        ((a = (t = P(this).find(".summary-rating-bar")).attr("data-rating")),
                        (s = t.hasClass("selected")),
                        P(".stamped-summary-ratings .summary-rating").each(function () {
                            P(this).removeClass("selected");
                        }),
                        P(".summary-rating-bar").each(function () {
                            P(this).removeClass("selected");
                        }),
                        a && (s ? (Oe(1), P(".stamped-summary-ratings").removeClass("selected")) : (t.addClass("selected"), P(this).addClass("selected"), P(".stamped-summary-ratings").addClass("selected"), Oe(1, a))));
                }),
                    P(A).on("mouseover mouseout", ".stamped-form-review-rating a.fa", function (e) {
                        var t = e.currentTarget,
                            a = P(t).attr("data-value"),
                            s = P(t).parent();
                        "mouseover" === e.type
                            ? (s
                                  .find("a.fa:lt(" + a + ")")
                                  .removeClass("fa-star-o")
                                  .addClass("fa-star"),
                              s
                                  .find("a.fa:gt(" + (a - 1) + ")")
                                  .removeClass("spr-icon-star-hover")
                                  .addClass("fa-star-o"))
                            : s.find("a.fa").removeClass("fa-star").addClass("fa-star-o");
                    }),
                    P(A).on("click keypress", ".stamped-tabs li", function (e) {
                        !0 === _(e) && ue(this);
                    }),
                    P(A).on("keypress", ".stamped-summary-actions-newreview", function (e) {
                        !0 === _(e) && _e("review");
                    }),
                    P(A).on("keypress", ".stamped-summary-actions-newquestion", function (e) {
                        !0 === _(e) && _e("review");
                    }),
                    P(A).on("keypress", ".stamped-form-input a", function (e) {
                        !0 === _(e) && Ce(this);
                    }),
                    P(A).on(
                        "click keypress",
                        "#shopry-rating-wrapper a.shopry-thumbs-up, #shopry-rating-wrapper a.shopry-thumbs-down, #shopry-rating-holder a.shopry-thumbs-up, #shopry-rating-holder a.shopry-thumbs-down, #stamped-rating-holder a.stamped-thumbs-up, #stamped-rating-holder a.stamped-thumbs-down, .stamped-rating-holder a.stamped-thumbs-up, .stamped-rating-holder a.stamped-thumbs-down",
                        function (e) {
                            var t, a, s, r;
                            !0 === _(e) &&
                                ((t = P(this).attr("data-review-id")),
                                (a = P(this).attr("data-rating")),
                                (s = O.attr("data-product-id")),
                                (r = P(this)).parent().fadeTo("slow", 0.3),
                                r.addClass("disable-link"),
                                P.ajax({
                                    type: "POST",
                                    url: q.SECURE_ENDPOINT + "/reviews/vote",
                                    data: { productId: s, reviewId: t, vote: a, apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl },
                                    success: function (e) {
                                        var t, a;
                                        (1 != e && -1 != e) || ((t = (t = r.find(".stamped-fa").html()).replace("&nbsp;", "").trim()), (a = parseInt(t)), r.find(".stamped-fa").html("&nbsp; " + (a + e))),
                                            r.parent().fadeTo("slow", 1),
                                            r.removeClass("disable-link");
                                    },
                                }));
                        }
                    ),
                    P(A).on("click keypress", ".stamped-share-button,.stamped-share-icon", function (e) {
                        !0 === _(e) && P(this).parent().find(".stamped-share-links").fadeToggle();
                    }),
                    P(A).on("click keypress", ".stamped-summary-actions-mobile-filter", function (e) {
                        var t;
                        !0 === _(e) && ((t = P(".stamped-filters-wrapper")).hasClass("stamped-mobile-visible") ? (t.slideUp(), t.removeClass("stamped-mobile-visible")) : (t.slideDown(), t.addClass("stamped-mobile-visible")));
                    }),
                    P(A).on("click keypress", ".stamped-summary-keywords-list li", function (e) {
                        var t;
                        !0 === _(e) &&
                            ((t = P(this)).hasClass("selected")
                                ? (P(".stamped-summary-keywords-list li").removeClass("selected"), P(O).removeAttr("data-keyword"))
                                : (P(".stamped-summary-keywords-list li").removeClass("selected"), t.addClass("selected"), P(O).attr("data-keyword", t.text().trim())),
                            P(".stamped-summary-actions-clear").show(),
                            Oe(1));
                    }),
                    P(A).on("change keyup", ".stamped-reviews-search-input", function (e) {
                        var t = P(this).val();
                        t ? (P(".stamped-reviews-search-clear").show(), P(".stamped-reviews", O).attr("data-filtered", "true")) : (P(".stamped-reviews-search-clear").hide(), P(".stamped-reviews", O).removeAttr("data-filtered")),
                            13 == e.keyCode && (t = P(this).val()) && (P(O).attr("data-search", t.trim()), P(".stamped-summary-actions-clear").show(), ne(), Oe(1));
                    }),
                    P(A).on("click keypress", ".stamped-reviews-search-button", function (e) {
                        var t;
                        !0 !== _(event) || ((t = P(".stamped-reviews-search-input").val()) && (P(O).attr("data-search", t.trim()), P(".stamped-summary-actions-clear").show(), ne(), Oe(1)));
                    }),
                    P(A).on("click keypress", ".stamped-summary-actions-clear", function (e) {
                        !0 === _(e) && Te();
                    }),
                    P(A).on("click keypress", ".stamped-reviews-search-clear", function (e) {
                        !0 === _(e) && (P(".stamped-reviews-search-clear").hide(), P(".stamped-reviews-search-input").val(""), P(O).removeAttr("data-search"), Oe(1));
                    }),
                    P(A).one("stamped:reviews:loaded", function () {
                        Re("Main Widget event triggered reload once"), ee(), oe(), re(), ie(), xe("write_review") && _e("review"), xe("write_question") && _e("question");
                    }),
                    P(A).on("stamped:reviews:loaded", function (e) {
                        Re("Main Widget event triggered reload"), (w = []), se(), X();
                        try {
                            G.LazyLoadStamped && LazyLoadStamped.update && LazyLoadStamped.update();
                        } catch (e) {}
                    });
            }
            P(A).one("stamped:launcher:loaded", function (e) {
                var t = xe("rewards-launcher");
                P(G).on("hashchange", function () {
                    0 <= location.hash.indexOf("stamped-rewards") && M();
                }),
                    t && ("open" == t && M(), -1 < t.indexOf("view-") && (M(!0), B(t)));
            }),
                te(),
                ae();
            var e,
                t = xe("stamped_r_id");
            t &&
                1 != q.disable_single_review &&
                ((e = t),
                P.ajax({
                    type: "GET",
                    url: q.SECURE_ENDPOINT + "/widget/reviews",
                    data: { reviewIds: e, apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, type: "single", showAvatar: "True", minRating: 1 },
                    success: function (e) {
                        e.data.length && StampedFn.openUGCModal(e.data, 0, A, 1, !1, 0);
                    },
                    error: function (e) {},
                }));
        }
        function L(e) {
            Re("Starting Rewards...");
            var t = P("#stamped-rewards-init");
            if (e && e.customer) return Re("Started Rewards with direct data"), (b = e), void K();
            e
                ? (Re("Started Rewards with JS data"), (b.customer = e), D())
                : 0 < t.length
                ? (Re("Started Rewards with div data"),
                  (b.customer = {
                      customerId: t.data("customer-id"),
                      customerEmail: t.data("customer-email"),
                      customerFirstName: t.data("customer-first-name"),
                      customerLastName: t.data("customer-last-name"),
                      customerTags: t.data("customer-tags"),
                      totalOrders: 0,
                      totalSpent: t.data("customer-total-spent"),
                      isAcceptMarketing: t.data("customer-accepts-marketing"),
                      authToken: t.data("key-auth"),
                  }),
                  D())
                : Re("Started Rewards no init customer data");
        }
        function D() {
            Re("Loading Rewards API init...");
            var e = q.metafields || "";
            b && b.customer && e && (b.customer.metafields = e);
            var t = JSON.stringify(b.customer),
                a = q.is_test;
            P.ajax({
                type: "POST",
                url:
                    q.SECURE_ENDPOINT +
                    "/v2/rewards/init?" +
                    P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, debug: null, isTest: a, isPreview: q.is_preview, referralCode: q.referral_code }),
                xhrFields: { withCredentials: !0 },
                data: t,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (e, t, a) {
                    We("stamped:rewards:init"), (b = e), K();
                },
            });
        }
        function K() {
            var e;
            P("#stamped-rewards-init").length || ((e = A.createElement("div")).setAttribute("id", "stamped-rewards-init"), A.body.appendChild(e)),
                b &&
                    b.html &&
                    ((n = P("#stamped-rewards-init")).html(b.html.main),
                    (function () {
                        (d = P(".stamped-rewards-launcher", n)), (o = P(".stamped-launcher-button", n)), (c = P("<iframe>"));
                        var s = o.html();
                        Re("Func _buildIframeLauncher: width:" + o.width(), 1),
                            Re("Func _buildIframeLauncher: outerWidth:" + o.outerWidth(), 1),
                            Re("Func _buildIframeLauncher: var launcherWidth:" + (v = o.width() + 40), 1),
                            o.width(v),
                            o.html(c),
                            d.hide(),
                            setTimeout(function () {
                                (u = c[0].contentWindow.document), (c[0].contentWindow.StampedFn = StampedFn), (c[0].contentWindow.jQuery = jQuery);
                                var e,
                                    t = P("body", u),
                                    a = P("head", u);
                                t.html(s),
                                    t.append(P("#stamped-rewards-main-css", n).clone()),
                                    a.append(P("<link/>", { rel: "stylesheet", href: "//cdn1.stamped.io/files/rewards-launcher.min.css", type: "text/css" })),
                                    0 != q.includes_options.rewards_button_js &&
                                        (((e = u.createElement("script")).type = "text/javascript"), (e.src = "//kit.fontawesome.com/59de3073ed.js"), e.setAttribute("data-observe-mutations", "true"), u.body.appendChild(e)),
                                    a.append(
                                        "<style>" +
                                            S +
                                            ' body { overflow:hidden; } .stamped-launcher-icon-opened { font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; display:inline-block; width: 100%; margin-top: -2px; text-align:center;}</style>'
                                    ),
                                    k() && t.attr("data-mobile", !0),
                                    (p = P(".stamped-launcher-icon-closed", t)),
                                    (m = P(".stamped-launcher-icon-opened", t)),
                                    setTimeout(function () {
                                        d.fadeIn();
                                    }, 800);
                            }, 800);
                    })(),
                    (function () {
                        (a = P(".stamped-rewards-base", n)), ($launcherCss = P("#stamped-rewards-main-css", n).clone()), (h = P("<iframe>"));
                        var r = a.html();
                        a.html(h),
                            setTimeout(function () {
                                (g = h[0].contentWindow.document), (h[0].contentWindow.StampedFn = StampedFn), (h[0].contentWindow.jQuery = jQuery);
                                var e = P("body", g),
                                    t = P("head", g);
                                e.html(r),
                                    e.append(P("#stamped-rewards-main-css", n).clone()),
                                    t
                                        .append(P("<link/>", { rel: "stylesheet", href: "//cdn1.stamped.io/files/rewards-main.min.css", type: "text/css" }))
                                        .append(P("<link/>", { rel: "stylesheet", href: "//fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap", type: "text/css" })),
                                    t.append("<script>window.FontAwesomeConfig = { searchPseudoElements: true };</script>");
                                var a,
                                    s = g.createElement("script");
                                (s.type = "text/javascript"),
                                    (s.src = "//kit.fontawesome.com/59de3073ed.js"),
                                    s.setAttribute("data-observe-mutations", "true"),
                                    s.setAttribute("data-search-pseudo-elements", "true"),
                                    g.body.appendChild(s),
                                    e.append("<style>" + S + ' .stamped-rewards-window { font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; }</style>'),
                                    k() && e.attr("data-mobile", !0),
                                    b.customer && b.customer.customerEmail ? e.attr("data-logged-in", !0) : e.attr("data-logged-in", !1),
                                    1 == b.branding && e.attr("data-branding", !0),
                                    ($wrapperCards = P("#stamped-rewards-cards", g)),
                                    ($wrapperViews = P("#stamped-rewards-views", g)),
                                    P(g).on("click", ".stamped-rewards-header-close", function () {
                                        M();
                                    }),
                                    P(A).on("touchstart", function () {
                                        a = !0;
                                    }),
                                    P(A).on("touchmove", function () {
                                        a = !1;
                                    }),
                                    P(A).on("click touchend", function (e) {
                                        var t;
                                        "click" === e.type && (a = !0),
                                            a &&
                                                ("stamped-rewards-init" === e.target.id ||
                                                    P(e.target).parents("#stamped-rewards-init").length ||
                                                    P(e.target).parents(".stamped-rewards-base").length ||
                                                    P(e.target).parents(".stamped-rewards-launcher").length ||
                                                    P(e.target).parents("#stamped-rewards-widget").length ||
                                                    ((t = P(".stamped-rewards-base", n).hasClass("opened")),
                                                    setTimeout(function () {
                                                        t && StampedFn.toggleLauncher();
                                                    }, 300)));
                                    }),
                                    P(g).on("click", '[data-campaign-completed="false"] .stamped-reward-card-button-earn', function () {
                                        var e,
                                            t,
                                            s,
                                            r,
                                            a,
                                            i,
                                            n,
                                            d,
                                            o,
                                            l = P(this).parent(".stamped-rewards-card-earn"),
                                            p = l.data("campaign-id"),
                                            m = l.data("event-type");
                                        "AccountBirthday" == m
                                            ? ((e = P(".stamped-rewards-birthday-input-holder", g)).show(),
                                              (t = P(".stamped-rewards-birthday-input-holder input", g).val()) &&
                                                  ((i = P(this)),
                                                  (n = l),
                                                  (d = t),
                                                  (o = function () {
                                                      e.hide();
                                                  }),
                                                  Y(i, "loading", !0),
                                                  P.ajax({
                                                      type: "POST",
                                                      url:
                                                          q.SECURE_ENDPOINT +
                                                          "/v2/rewards/addBirthday?" +
                                                          P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, dateBirthday: d }),
                                                      data: b.customer,
                                                      success: function (e, t, a) {
                                                          Y(i, "active", !0, null, function () {
                                                              n.attr("data-campaign-completed", "true");
                                                          }),
                                                              o && o();
                                                      },
                                                  })))
                                            : "Review" == m || "ReviewPhoto" == m || "ReviewVideo" == m
                                            ? (P('.stamped-rewards-header-menu span[data-target="reviews"]', g).trigger("click"), B("main"))
                                            : ((s = P(this)),
                                              (r = l),
                                              (a = p),
                                              Y(s, "loading", !0),
                                              P.ajax({
                                                  type: "POST",
                                                  url: q.SECURE_ENDPOINT + "/v2/rewards/add?" + P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, campaignId: a }),
                                                  data: b.customer,
                                                  dataType: "json",
                                                  success: function (e, t, a) {
                                                      Y(s, "active", !0, null, function () {
                                                          2 == e && r.attr("data-campaign-completed", "true");
                                                      }),
                                                          z();
                                                  },
                                              }),
                                              ("SocialFollowInstagram" != m && "SocialFollowFacebook" != m && "SocialShareFacebook" != m && "SocialFollowTwitter" != m && "SocialShareTwitter" != m && "SocialYouTube" != m) ||
                                                  (function (e) {
                                                      var t = b.links;
                                                      {
                                                          "SocialFollowInstagram" == e
                                                              ? G.open(t.instagram, "_blank").focus()
                                                              : "SocialFollowFacebook" == e
                                                              ? G.open("https://www.facebook.com/plugins/page.php?href=" + t.facebook, "_blank", "location=yes,height=250,width=340,top=50,left=50,scrollbars=yes,status=yes")
                                                              : "SocialShareFacebook" == e
                                                              ? G.open("https://www.facebook.com/sharer/sharer.php?u=" + t.shop, "_blank", "location=yes,height=500,width=500,top=50,left=50,scrollbars=yes,status=yes")
                                                              : "SocialFollowTwitter" == e
                                                              ? G.open(t.twitter, "_blank").focus()
                                                              : "SocialShareTwitter" == e
                                                              ? G.open("https://twitter.com/intent/tweet?url=" + t.shop, "_blank", "location=yes,height=500,width=500,top=50,left=50,scrollbars=yes,status=yes")
                                                              : "SocialYouTube" == e && G.open(t.youtube, "_blank");
                                                      }
                                                  })(m));
                                    }),
                                    P(g).on("click", '[data-campaign-redeemable="true"] .stamped-reward-card-button-spend', function () {
                                        var e = P(this).parent(".stamped-rewards-card-spend"),
                                            t = e.data("campaign-id");
                                        "Variable" == e.data("coupon-type")
                                            ? B("view-redeem-variable", null, { entityId: t })
                                            : $(P(this), { campaignId: t }, function (e) {
                                                  B("view-coupon", null, e.rewardCampaignCoupon), z();
                                              });
                                    }),
                                    P(g).on("click", ".stamped-reward-referral-platforms button", function () {
                                        var e,
                                            t = P(this).attr("href");
                                        t && ((e = t), G.open(e, "_blank", "location=yes,height=500,width=500,top=50,left=50,scrollbars=yes,status=yes"));
                                    }),
                                    P(g).on("click", ".stamped-rewards-header-menu span", function () {
                                        var e = P(this).attr("data-target");
                                        e != $wrapperCards.attr("data-target") &&
                                            ($wrapperCards.attr("data-target", e),
                                            V(e),
                                            P(".stamped-rewards-content-container", g).scrollTop(0),
                                            P(".stamped-rewards-header-menu .active", g).removeClass("active"),
                                            P(this, g).addClass("active"));
                                    }),
                                    P(".stamped-rewards-content-container", g).on("scroll", function () {
                                        var e = P(".stamped-rewards-content-container", g).scrollTop();
                                        if (e <= 1) return P(".stamped-rewards-background", g).height("200px"), void P(".stamped-rewards-header", g).height("auto");
                                        var t = P(".stamped-rewards-header-content", g).outerHeight() + 15;
                                        P(".stamped-rewards-header", g).css("min-height", "70px");
                                        var a = 200;
                                        (a -= e), P(".stamped-rewards-background", g).height(a);
                                        var s = t;
                                        (s -= e), P(".stamped-rewards-header", g).height(s);
                                    }),
                                    V("rewards"),
                                    We("stamped:launcher:loaded");
                            }, 1e3);
                    })(),
                    (function () {
                        var e = b;
                        e.points &&
                            (P("[id=stamped-rewards-points-placeholder]").html(e.points.points_current_with_name).attr("onclick", "StampedFn.toggleRewardsModal();"),
                            P('[id=stamped-rewards-points-placeholder][data-type="points-only"]').html(e.points.points).attr("onclick", "StampedFn.toggleRewardsModal();"));
                        e.customer && P("[id=stamped-rewards-referral-placeholder]").html(e.customer.urlReferral);
                        {
                            var s, r;
                            0 < P("#stamped-rewards-widget").length &&
                                ((s = []),
                                (r = 1),
                                P("[id=stamped-rewards-widget]").each(function (e) {
                                    var t = P(this);
                                    t.attr("data-element-id", r);
                                    var a = ve(t);
                                    s.push(a), r++;
                                }),
                                fe("rewards", s));
                        }
                    })());
        }
        function M(e) {
            var t = a.hasClass("opened");
            P("body", g).addClass("opened"),
                t
                    ? 1 != e &&
                      (Re("Func _toggleRewardsModal: var launcherWidth:" + v, 1),
                      a.removeClass("opened"),
                      a.fadeOut(),
                      d.removeClass("opened"),
                      p.removeClass("rotateIn"),
                      m.removeClass("fadeOut"),
                      m.addClass("fadeIn"),
                      o.animate({ width: v + "px" }, 0),
                      setTimeout(function () {
                          B("main");
                      }, 1e3),
                      We("stamped:launcher:closed"))
                    : (setTimeout(function () {
                          a.addClass("opened");
                      }, 100),
                      d.addClass("opened"),
                      a.fadeIn(),
                      p.addClass("rotateIn"),
                      p.removeClass("rotateOut"),
                      m.addClass("fadeOut"),
                      m.removeClass("fadeIn"),
                      o.animate({ width: "40px" }, 0),
                      P(".stamped-rewards-content-container", g).scrollTop(0),
                      P(".stamped-rewards-header", g).css("height", "auto"),
                      We("stamped:launcher:opened"),
                      "true" != be("stamped-launcher-opened") &&
                          (P.ajax({
                              type: "POST",
                              url: q.SECURE_ENDPOINT + "/tracking/event?" + P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, source: "launcher", event: "open" }),
                              dataType: "json",
                              success: function (e, t, a) {},
                          }),
                          ye("stamped-launcher-opened", !0, 1)));
        }
        function W(e, t, a) {
            var s = e.search,
                r = e.customOptionTitle ? e.customOptionTitle + "||" + e.customOptionValue : "",
                i = e.topic,
                n = s || i || r,
                d = i ? 3 : r ? 2 : 1;
            P.ajax({
                type: "POST",
                url: q.SECURE_ENDPOINT + "/tracking/event?" + P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, event: "search", source: "m" }),
                data: JSON.stringify({ source: "m", sourceId: t, type: d, text: n, results: a }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (e, t, a) {},
            });
        }
        function z(s) {
            P.ajax({
                type: "POST",
                url: q.SECURE_ENDPOINT + "/v2/rewards/points?" + P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl }),
                data: b.customer,
                dataType: "json",
                success: function (e, t, a) {
                    setTimeout(function () {
                        P(".stamped-rewards-header-main-points, .stamped-rewards-header-small-points", g).html(e.points_current_with_name);
                    }, 5e3),
                        s && s(e);
                },
            });
        }
        function $(s, r, i) {
            Y(s, "loading", !0),
                (r = r || {}),
                P.ajax({
                    type: "POST",
                    url: q.SECURE_ENDPOINT + "/v2/rewards/redeem?" + P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, campaignId: r.campaignId, points: r.points }),
                    data: b.customer,
                    dataType: "json",
                    success: function (e, t, a) {
                        r.campaignId && Y(s, "active", !0, 1), i && i(e);
                    },
                });
        }
        function V(e) {
            $wrapperCards.html(""), P("body", g).attr("data-view", e);
            for (var t = 0; t < b.html.cards.length; t++) {
                var a,
                    s = b.html.cards[t];
                s && s.html && e == s.type && ((a = P(s.html)).attr("data-key", s.key), $wrapperCards.append(a));
            }
        }
        function B(s, e, r) {
            (l = P(".stamped-rewards-window", g)), P(".stamped-rewards-content-container", g).scrollTop(0), P(".stamped-rewards-header-nav", g).attr("onclick", "StampedFn.loadLauncherView('main');"), P("body", g).attr("data-view", s);
            var i = P(e).attr("data-title");
            if (l)
                if ("main" == s) {
                    l.removeClass("stamped-rewards-nav-small"), l.addClass("stamped-rewards-nav-big"), P(".stamped-rewards-header-main, .stamped-rewards-header-menu", g).fadeIn(), P(".stamped-rewards-header-small", g).hide();
                    var t = P(".stamped-rewards-header-content", g).outerHeight() + 15;
                    P(".stamped-rewards-header", g).height(t), P(".stamped-rewards-background", g).height("200"), $wrapperViews.hide(), $wrapperCards.fadeIn();
                } else {
                    var a,
                        n = !1;
                    if (r && 1 == r.reload) n = !1;
                    else
                        for (var d = 0; d < b.html.views.length; d++) {
                            var o = b.html.views[d];
                            o.key == s && (o.title && (i = o.title), (n = !0), H(o.html), Q(s, i, r));
                        }
                    n ||
                        (H(),
                        Q(s, i, r),
                        (a = null),
                        r && r.entityId && (a = r.entityId),
                        P.ajax({
                            type: "POST",
                            url:
                                q.SECURE_ENDPOINT +
                                "/v2/rewards/cardview?" +
                                P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, viewKey: s, entityId: a, referralCode: q.referral_code }),
                            data: b.customer,
                            dataType: "json",
                            success: function (e, t, a) {
                                e && e.html
                                    ? (b.html.views.push(e),
                                      setTimeout(function () {
                                          H(e.html, !1), Q(s, e.title || i, r);
                                      }, 1e3))
                                    : B("main");
                            },
                            error: function () {
                                B("main");
                            },
                        }));
                }
        }
        function H(e, t) {
            var a;
            e
                ? ((a = P(e)), $wrapperViews.html(a), $wrapperViews.removeClass("loading"))
                : ($wrapperViews.html(""), P(".stamped-view-loader", $wrapperViews).length || $wrapperViews.append(P('<div class="stamped-view-loader"></div>')), $wrapperViews.addClass("loading")),
                0 != t &&
                    (l.addClass("stamped-rewards-nav-small"),
                    l.removeClass("stamped-rewards-nav-big"),
                    P(".stamped-rewards-header-main, .stamped-rewards-header-menu", g).hide(),
                    P(".stamped-rewards-header-small", g).fadeIn(),
                    $wrapperCards.hide(),
                    $wrapperViews.fadeIn());
        }
        function Q(e, t, s) {
            var a,
                r,
                i,
                n,
                d,
                o,
                l,
                p = (s ? s.viewTitle : t) || t;
            function m() {
                var e = $selectorInput.val(),
                    t = (e / d) * o,
                    a = new Intl.NumberFormat("en-US", { style: "currency", currency: n });
                P("#redeem-points", $wrapperViews).text(r.formatStringStamped(e, i)), P("#redeem-amount", $wrapperViews).text(a.format(t));
            }
            "view-coupon" == e &&
                (P(".stamped-reward-coupon-code", $wrapperViews).text(s.couponCode),
                P(".stamped-reward-card-title", $wrapperViews).html(s.title),
                P(".stamped-rewards-header-nav", g).attr("onclick", "StampedFn.loadLauncherView('view-your-rewards', null, { reload: true});")),
                "view-earnings" == e &&
                    b &&
                    b.customer &&
                    (a = P('[data-event-type="AccountBirthday"]', g)).length &&
                    (b.customer.dateBirthday
                        ? a.attr("data-birthday", "true")
                        : (a.attr("data-birthday", "false"),
                          a.prepend(P('<div class="stamped-rewards-birthday-input-holder"> Enter your birthday: <input type="date" class="stamped-rewards-birthday-input" placeholder="yyyy-mm-dd" /> </div>').hide()))),
                "view-redeem-variable" == e &&
                    (($selectorInput = P(".range-slider__range", $wrapperViews)),
                    $selectorInput.length &&
                        ((r = $selectorInput.data("format-points")),
                        (i = $selectorInput.data("format-points-name")),
                        (n = $selectorInput.data("currency")),
                        (d = $selectorInput.attr("step")),
                        (o = $selectorInput.data("discount-value")),
                        $selectorInput.on("input", function () {
                            m();
                        }),
                        P(".stamped-rewards-content-action-button ", $wrapperViews).on("click", function () {
                            var e, t, a;
                            (e = this),
                                (t = $selectorInput.val()),
                                (a = { campaignId: s.entityId, points: t }),
                                StampedFn.rewardsRedeem(P(e), a, function (e) {
                                    var t = e.rewardCampaignCoupon.couponCode,
                                        a = e.rewardCampaignCoupon.title;
                                    B("view-coupon", null, { couponCode: t, title: a, viewTitle: a });
                                });
                        }),
                        m())),
                p && ((l = p), P(".stamped-rewards-header-small-title", g).text(l));
        }
        function J(e) {
            var t = P("#stamped-rewards-apply-code", g);
            "active" == e && P(".stamped-rewards-coupons-view", g).attr("data-applied", "true"), Y(t, e);
        }
        function Y(t, e, a, s, r) {
            var i;
            "loading" == e
                ? ((i = t.width()), t.attr("data-original-text", t.text()), t.addClass("stamped-button-disabled"), 10 <= i && t.width(i), t.html('<span class="stamped-button-icon stamped-button-loading"></span>'))
                : (a || t.html('<span class="stamped-button-icon stamped-button-completed"></span>'),
                  setTimeout(function () {
                      var e = t.attr("data-original-text");
                      t.html(e), t.removeClass("stamped-button-disabled"), t.width("auto"), r && r();
                  }, s || 7878));
        }
        function X() {
            Re("Func initWidgetType");
            var e,
                t,
                a,
                s = P(".stamped-container", O).attr("data-widget-style");
            "slider" == s
                ? (Re((x = P(".stamped-reviews", O)), 1),
                  Re("Func initWidgetType: var initialized:" + (e = x && x.hasClass("slick-initialized")), 1),
                  e
                      ? (P(".stamped-reviews > .stamped-review", O).each(function (e, t) {
                            x.slick("slickAdd", t);
                        }),
                        P('.stamped-reviews [class*="stamped-review"]', O).length <= 0 ? P("button.slick-arrow").hide() : P("button.slick-arrow").show())
                      : Fe("https://cdn.shopify.com/s/files/1/0638/7747/files/slick.min.js", function () {
                            x.slick(q.slick_options),
                                x.on("afterChange", function (e, t, a) {
                                    var s;
                                    P(".slick-next.slick-arrow").hasClass("slick-disabled") && (s = P(".stamped-pagination .next a")).length && s.click();
                                });
                        }))
                : "masonry" == s &&
                  ((t = { 1500: 4, 1200: 3, 700: 2, 500: 1 }),
                  G.macyInstanceConfig && G.macyInstanceConfig.breakAt && (t = G.macyInstanceConfig.breakAt),
                  Fe("//s3-us-west-2.amazonaws.com/stamped.io/cdn/js/macy2.js", function () {
                      (G.macyInstanceStamped = Macy({ container: ".stamped-reviews", margin: { x: 15, y: 15 }, breakAt: t })), We("stamped:macy:loaded");
                  })),
                !P(".stamped-sort-select").length ||
                    ((a = O.attr("data-sort") || P(".stamped-container", O).attr("data-widget-sort")) && "none" !== P('.stamped-sort-select option[value="' + a + '"]').css("display") && P(".stamped-sort-select").val(a));
        }
        function Z(e) {
            (O && O.length && !e) || (O = P(y)), pe();
        }
        function ee() {
            Re("Creating Q&A"), ce();
        }
        function te() {
            !(function () {
                var e;
                {
                    Re("Loading Badges..."),
                        !(t = P(".stamped-product-reviews-badge[data-id]")).length ||
                            ((e = P.map(t, function (e) {
                                if (!P.trim(P(e).html()) || P(e).attr("data-type") || P(e).attr("data-product-type") || P(e).attr("data-product-sku") || P(e).attr("data-product-title"))
                                    return {
                                        productId: P(e).attr("data-id"),
                                        productType: P(e).attr("data-product-type"),
                                        productSKU: P(e).attr("data-product-sku") || P(e).attr("data-product-sku2"),
                                        productTitle: P(e).attr("data-product-title"),
                                    };
                            })) &&
                                e.length &&
                                (JSON.stringify(e),
                                P.ajax({
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json",
                                    url: q.SECURE_ENDPOINT + "/widget/badges",
                                    data: JSON.stringify({ productIds: e, apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl }),
                                    success: function (r) {
                                        t.each(function (e) {
                                            var a = P(this).attr("data-id"),
                                                t = P(this).attr("data-type"),
                                                s = P.map(r, function (e, t) {
                                                    if (e.productId == a) return t;
                                                })[0];
                                            0 <= s && (!t || "review" == t) ? P(this).html(r[s].badge) : 0 <= s && "qna" == t && P(this).html(r[s].badgeqna);
                                        }),
                                            We("stamped:badges:loaded");
                                    },
                                    error: function (e) {},
                                })));
                }
                P(".stamped-product-reviews-badge[data-id].stamped-main-badge, .stamped-product-reviews-badge:first").length &&
                    P(A).on("click", ".stamped-product-reviews-badge[data-id].stamped-main-badge, .stamped-product-reviews-badge:first", function () {
                        "qna" === P(this).attr("data-type")
                            ? (P("#stamped-questions-placeholder").length ? ke("#stamped-questions-placeholder") : (ue(null, "questions"), ke(y)),
                              P(".stamped-badge-caption[data-questions]").length && "0" === P(".stamped-badge-caption[data-questions]").attr("data-questions") && P(".new-question-form").show())
                            : (ue(null, "reviews"), ke(y));
                    });
            })();
        }
        function ae() {
            var s,
                r,
                e = P("#stamped-reviews-widget").length;
            Re("Creating display widgets " + e + " found"),
                We("stamped:widget:reloading"),
                0 < e &&
                    ((s = []),
                    (r = 1),
                    P("[id=stamped-reviews-widget]").each(function (e) {
                        var t = P(this);
                        t.attr("data-element-id", r);
                        var a = ve(t);
                        s.push(a), r++;
                    }),
                    fe("ugc", s));
        }
        function se() {
            var i = P(O).attr("data-limit-words") || P(".stamped-container", O).attr("data-widget-limit-words"),
                n = P(O).attr("data-keyword"),
                d = P(O).attr("data-search");
            ((i && 0 < i) || n || d) &&
                P(".stamped-review", O).each(function (e) {
                    var t,
                        a,
                        s,
                        r = P(".stamped-review-content-body:first", this);
                    !r.length ||
                        ((t = P(r).html()).indexOf("stamped-review-read-more") <= -1 &&
                            (n || d
                                ? (n && (a = me(t, n)), d && (a = me(t, d)), P(r).html(a))
                                : (s = t.split(" ")).length > i &&
                                  ((txtTrimmed = s.slice(0, i).join(" ") + "..."),
                                  P(r).html(txtTrimmed),
                                  P(r).append('<a class="stamped-review-read-more" style="margin-left:10px; cursor:pointer;">read more</span>'),
                                  P(r).append('<span class="original-review" style="display:none !important;">' + t + "</span>"))));
                }),
                P(".stamped-review-reply .stamped-review-reply-body, .stamped-review-reply .stamped-review-content-body").each(function () {
                    var e;
                    P(this).attr("data-link-processed") || (P(this).attr("data-link-processed", !0), (e = P(this).html()), P(this).html(e.linkify()));
                });
        }
        function re() {
            var e = P(O).attr("data-keywords");
            if (e) {
                P(".stamped-reviews-filter-label").show(), P(".stamped-summary-keywords").show(), P(O).removeAttr("data-keywords"), P(".stamped-summary-keywords-list", O).html("");
                var t = "",
                    a = e.split(",");
                for (i = 0; i < a.length; i++) t += "<li>" + a[i] + "</li>";
                P(t).appendTo(P(".stamped-summary-keywords-list", O));
            }
        }
        function ie() {
            P(A).on("click keypress", ".stamped-review-read-more", function (e) {
                var t;
                !0 === _(e) &&
                    (P(this).closest(".stamped-review-content-body").find(".stamped-review-read-more").hide(),
                    (t = P(this).closest(".stamped-review-content-body").find(".original-review").html()),
                    P(this).closest(".stamped-review-content-body").html(t),
                    G.macyInstanceStamped && G.macyInstanceStamped.reInit());
            });
        }
        function ne() {
            P(".stamped-summary-ratings").removeClass("selected"),
                P(".stamped-summary-ratings .summary-rating").each(function () {
                    P(this).removeClass("selected");
                }),
                P(".summary-rating-bar").each(function () {
                    P(this).removeClass("selected");
                });
        }
        (E = void 0 !== G ? G : this),
            (U = function () {
                function a(e) {
                    return e instanceof Date
                        ? e
                        : !isNaN(e) || /^\d+$/.test(e)
                        ? new Date(n(e))
                        : ((e = (e || "")
                              .trim()
                              .replace(/\.\d+/, "")
                              .replace(/-/, "/")
                              .replace(/-/, "/")
                              .replace(/(\d)T(\d)/, "$1 $2")
                              .replace(/Z/, " UTC")
                              .replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2")),
                          new Date(e));
                }
                function n(e) {
                    return parseInt(e);
                }
                function o(e, t, a) {
                    t = p[t] ? t : p[a] ? a : "en";
                    for (var s = 0, r = e < 0 ? 1 : 0, i = (e = Math.abs(e)); m[s] <= e && s < 6; s++) e /= m[s];
                    return (0 === (s *= 2) ? 9 : 1) < (e = n(e)) && (s += 1), p[t](e, s, i)[r].replace("%s", e);
                }
                function l(e, t) {
                    return ((t = t ? a(t) : new Date()) - a(e)) / 1e3;
                }
                function i(e, t) {
                    return e.getAttribute ? e.getAttribute(t) : e.attr ? e.attr(t) : void 0;
                }
                function s(e, t) {
                    (this.nowDate = e), (this.defaultLocale = t || "en");
                }
                function e(e, t) {
                    return new s(e, t);
                }
                var r = "second_minute_hour_day_week_month_month".split("_"),
                    d = "秒_分钟_小时_天_周_月_年".split("_"),
                    p = {
                        en: function (e, t) {
                            if (0 === t) return ["just now", "right now"];
                            var a = r[parseInt(t / 2)];
                            return 1 < e && (a += "s"), [e + " " + a + " ago", "in " + e + " " + a];
                        },
                        zh_CN: function (e, t) {
                            if (0 === t) return ["刚刚", "片刻后"];
                            var a = d[parseInt(t / 2)];
                            return [e + a + "前", e + a + "后"];
                        },
                    },
                    m = [60, 60, 24, 7, 365 / 7 / 12, 1],
                    c = "datetime",
                    u = "data-tid",
                    h = {};
                return (
                    (s.prototype.doRender = function (e, t, a) {
                        var s,
                            r,
                            i,
                            n = l(t, this.nowDate),
                            d = this;
                        (e.innerHTML = o(n, a, this.defaultLocale)),
                            (h[
                                (s = setTimeout(
                                    function () {
                                        d.doRender(e, t, a), delete h[s];
                                    },
                                    Math.min(
                                        1e3 *
                                            (function (e) {
                                                for (var t = 1, a = 0, s = Math.abs(e); m[a] <= e && a < 6; a++) (e /= m[a]), (t *= m[a]);
                                                return (s = (s %= t) ? t - s : t), Math.ceil(s);
                                            })(n),
                                        2147483647
                                    )
                                ))
                            ] = 0),
                            (i = s),
                            (r = e).setAttribute ? r.setAttribute(u, i) : r.attr && r.attr(u, i);
                    }),
                    (s.prototype.formatDateString = function (e, t) {
                        return o(l(e, this.nowDate), t, this.defaultLocale);
                    }),
                    (s.prototype.render = function (e, t) {
                        void 0 === e.length && (e = [e]);
                        for (var a, s = 0, r = e.length; s < r; s++) this.doRender(e[s], (a = e[s]).dataset.timeagoStamped ? a.dataset.timeagoStamped : i(a, c), t);
                    }),
                    (s.prototype.setLocale = function (e) {
                        this.defaultLocale = e;
                    }),
                    (e.register = function (e, t) {
                        p[e] = t;
                    }),
                    (e.cancel = function (e) {
                        var t;
                        if (e) (t = i(e, u)) && (clearTimeout(t), delete h[t]);
                        else {
                            for (t in h) clearTimeout(t);
                            h = {};
                        }
                    }),
                    e
                );
            }),
            "object" == typeof module && module.exports ? ((module.exports = U()), (module.exports.default = module.exports)) : (E.timeagoStamped = U());
        var de = 0;
        function oe() {
            var s, g;
            function v(e, t, a) {
                var s = (function (e, t) {
                    for (var a = e.split(","), s = a[0].match(/:(.*?);/)[1], r = atob(a[1]), i = r.length, n = new Uint8Array(i); i--; ) n[i] = r.charCodeAt(i);
                    return new File([n], t, { type: s });
                })(e, a);
                f.push(s);
            }
            G.File && G.FileReader && G.FormData
                ? ((s = P("#stamped-file-uploader-input")).on("change", function (e) {
                      for (var t = e.target.files, a = 0; a < t.length; a++) {
                          var i = t[a],
                              n = new FileReader();
                          if (5 <= de) return void We("stamped:photo:maxed");
                          de++,
                              i.type.match("image")
                                  ? (function (a, s) {
                                        !(function (e, o) {
                                            var t = new FileReader();
                                            (t.onload = function (e) {
                                                var t = new DataView(e.target.result);
                                                if (65496 != t.getUint16(0, !1)) return o(-2);
                                                for (var a = t.byteLength, s = 2; s < a; ) {
                                                    var r = t.getUint16(s, !1);
                                                    if (((s += 2), 65505 == r)) {
                                                        if (1165519206 != t.getUint32((s += 2), !1)) return o(-1);
                                                        var i = 18761 == t.getUint16((s += 6), !1);
                                                        s += t.getUint32(s + 4, i);
                                                        var n = t.getUint16(s, i);
                                                        s += 2;
                                                        for (var d = 0; d < n; d++) if (274 == t.getUint16(s + 12 * d, i)) return o(t.getUint16(s + 12 * d + 8, i));
                                                    } else {
                                                        if (65280 != (65280 & r)) break;
                                                        s += t.getUint16(s, !1);
                                                    }
                                                }
                                                return o(-1);
                                            }),
                                                t.readAsArrayBuffer(e.slice(0, 65536));
                                        })(a, function (e) {
                                            g = e;
                                        });
                                        var r = new FileReader();
                                        (r.onloadend = function () {
                                            var c, u, e, t, h;
                                            (c = r.result),
                                                (u = a.type),
                                                (e = a.name),
                                                (t = s),
                                                ((h = new Image()).src = c),
                                                (h.onload = (function (l, p, m) {
                                                    setTimeout(function () {
                                                        var e,
                                                            t,
                                                            a,
                                                            s,
                                                            r,
                                                            i,
                                                            n,
                                                            d = h.width,
                                                            o = h.height;
                                                        1500 < d || 1500 < o
                                                            ? (o < d ? ((t = o * (1500 / d)), (e = 1500)) : ((e = d * (1500 / o)), (t = 1500)),
                                                              ((a = A.createElement("canvas")).width = e),
                                                              (a.height = t),
                                                              a.getContext("2d").drawImage(p, 0, 0, e, t),
                                                              (c = a.toDataURL(u)),
                                                              P(".stamped-file-holder").append(
                                                                  '<div class="stamped-file-photo" data-index="' +
                                                                      l +
                                                                      '"><img src="' +
                                                                      c +
                                                                      '" width="70" /><span style="display:none;">' +
                                                                      m +
                                                                      '</span><div class="stamped-file-photo-remove" data-index="' +
                                                                      l +
                                                                      '">x</div></div>'
                                                              ),
                                                              g && 1 != g
                                                                  ? ((s = c),
                                                                    (r = g),
                                                                    (i = function (e) {
                                                                        (c = e), console.log(g), v(c, 0, m);
                                                                    }),
                                                                    ((n = new Image()).onload = function () {
                                                                        var e = n.width,
                                                                            t = n.height,
                                                                            a = A.createElement("canvas"),
                                                                            s = a.getContext("2d");
                                                                        switch ((4 < r && r < 9 ? ((a.width = t), (a.height = e)) : ((a.width = e), (a.height = t)), r)) {
                                                                            case 2:
                                                                                s.transform(-1, 0, 0, 1, e, 0);
                                                                                break;
                                                                            case 3:
                                                                                s.transform(-1, 0, 0, -1, e, t);
                                                                                break;
                                                                            case 4:
                                                                                s.transform(1, 0, 0, -1, 0, t);
                                                                                break;
                                                                            case 5:
                                                                                s.transform(0, 1, 1, 0, 0, 0);
                                                                                break;
                                                                            case 6:
                                                                                s.transform(0, 1, -1, 0, t, 0);
                                                                                break;
                                                                            case 7:
                                                                                s.transform(0, -1, -1, 0, t, e);
                                                                                break;
                                                                            case 8:
                                                                                s.transform(0, -1, 1, 0, 0, e);
                                                                        }
                                                                        s.drawImage(n, 0, 0), i(a.toDataURL());
                                                                    }),
                                                                    (n.src = s))
                                                                  : v(c, 0, m))
                                                            : (P(".stamped-file-holder").append(
                                                                  '<div class="stamped-file-photo" data-index="' +
                                                                      l +
                                                                      '"><img src="' +
                                                                      c +
                                                                      '" width="70" /><span style="display:none;">' +
                                                                      m +
                                                                      '</span><div class="stamped-file-photo-remove" data-index="' +
                                                                      l +
                                                                      '">x</div></div>'
                                                              ),
                                                              v(c, 0, m));
                                                    }, 100);
                                                })(t, h, e)),
                                                (h.onerror = function () {
                                                    console.log("There was an error processing your file!");
                                                });
                                        }),
                                            (r.onerror = function () {
                                                console.log("There was an error reading the file!");
                                            }),
                                            r.readAsDataURL(a);
                                    })(i, de)
                                  : ((n.onload = function () {
                                        var e = new Blob([n.result], { type: i.type }),
                                            s = URL.createObjectURL(e),
                                            r = A.createElement("video"),
                                            t = function () {
                                                a() && (r.removeEventListener("timeupdate", t), r.pause());
                                            };
                                        r.addEventListener("loadeddata", function () {
                                            a() && r.removeEventListener("timeupdate", t), f.push(i);
                                        });
                                        var a = function () {
                                            var e = A.createElement("canvas");
                                            (e.width = r.videoWidth), (e.height = r.videoHeight), e.getContext("2d").drawImage(r, 0, 0, e.width, e.height);
                                            var t = e.toDataURL(),
                                                a = 1e5 < t.length;
                                            return (
                                                a &&
                                                    (P(".stamped-file-holder").append(
                                                        '<div class="stamped-file-photo" data-index="' +
                                                            de +
                                                            '"><img src="' +
                                                            t +
                                                            '" width="70" /><span style="display:none;">' +
                                                            i.name +
                                                            '</span><div class="stamped-file-photo-remove" data-index="' +
                                                            de +
                                                            '">x</div></div>'
                                                    ),
                                                    URL.revokeObjectURL(s)),
                                                a
                                            );
                                        };
                                        r.addEventListener("timeupdate", t), (r.preload = "metadata"), (r.src = s), (r.muted = !0), (r.playsInline = !0), r.play();
                                    }),
                                    n.readAsArrayBuffer(i)),
                              i && (/^image\//i.test(i.type) || /^video\//i.test(i.type) ? console.log("is image, begin upload") : (We("stamped:photo:invalid"), console.log("Not a valid image!")));
                      }
                      s.val("");
                  }),
                  P(A).on("click", ".stamped-file-photo-remove", function () {
                      var e = P(this).parent(".stamped-file-photo"),
                          t = e.index();
                      f.splice(t, 1), (de = f.length), e.remove();
                  }))
                : console.log("File upload is not supported!");
        }
        var le = null;
        function pe(p, m, e, t) {
            var a, s, r, i, n, d, o, l, c, u, h, g, v, f, w, y, b, S, k, _, C;
            O.length &&
                !I &&
                (Re("Loading Main Widget..."),
                (a = O.attr("data-product-id")),
                (s = O.attr("data-product-ids")),
                (r = O.attr("data-name")),
                (i = O.attr("data-product-type")),
                (n = O.attr("data-product-sku")),
                (d = O.attr("data-user-reference")),
                (o = O.attr("data-take-reviews")),
                (l = O.attr("data-keyword")),
                (c = O.attr("data-widget-language")),
                (u = O.attr("data-widget-country-iso")),
                (h = O.attr("data-widget-type")),
                (g = O.attr("data-load-type") || P(".stamped-container", O).attr("data-widget-load-type")),
                (v = O.attr("data-search")),
                (f = O.attr("data-cache") || null),
                (w = P(".stamped-container", O).attr("data-widget-style")),
                (y = O.attr("data-tags-exclude")),
                (b = O.attr("data-tags-include")),
                (S = q.metafields),
                "slider" == w && (g = "continue"),
                (r = r && r.replace("!", "")),
                (m = m || O.attr("data-sort") || P(".stamped-container", O).attr("data-widget-sort")),
                "continue" === g && (t = !0),
                P("#stamped-main-widget-placeholder").length && P("#stamped-main-widget-placeholder").append(O),
                (I = !0),
                p && !t && ke(".stamped-reviews"),
                O.addClass("stamped-main-widget-loading"),
                (k = P.param(
                    Se({
                        productId: a,
                        productIds: s,
                        productName: r,
                        productType: i,
                        productSKU: n,
                        userReference: d,
                        page: p || 1,
                        apiKey: G.StampedGlobalOptions.apiKey,
                        sId: G.StampedGlobalOptions.sId,
                        storeUrl: G.StampedGlobalOptions.storeUrl,
                        take: o || 5,
                        sort: m,
                        rating: e,
                        keyword: l,
                        widgetLanguage: c,
                        widgetCountryIso: u,
                        widgetType: h,
                        search: v,
                        isUseCache: f,
                        tagsExclude: y,
                        tagsInclude: b,
                    })
                )),
                P.isEmptyObject(T) || (k += "&" + P.param(T)),
                (C = {
                    type: (_ = S.length) ? "POST" : "GET",
                    data: _ ? JSON.stringify({ metafields: S }) : null,
                    dataType: "json",
                    url: q.SECURE_ENDPOINT + "/widget" + (_ ? "/preview" : "") + "?" + k,
                    success: function (e) {
                        Re("Loaded Main Widget..."), (I = !1), O.removeClass("stamped-main-widget-loading");
                        var t,
                            a,
                            s,
                            r,
                            i,
                            n,
                            d = e.product,
                            o = e.widget,
                            l = P("#stamped-main-widget .stamped-container").length;
                        P(".question-form-wrapper").clone(), P(".stamped-questions").clone();
                        l || O.empty().html(d),
                            (t = "function" == typeof P.parseHTML ? P.parseHTML(o) : P(o)),
                            0 == P(".stamped-content", O).children().length
                                ? P(".stamped-content", O).append(P(t))
                                : ((a = P(".stamped-reviews", O)),
                                  (s = P('[class="stamped-review"]', t)),
                                  ("continue" !== g || (1 === p && p)) && P('.stamped-reviews [class*="stamped-review"]', O).remove(),
                                  (r = P(".stamped-pagination", t).attr("data-page", p)),
                                  (i = P(".stamped-reviews .stamped-pagination", O)).length ? P(s).insertBefore(i) : P(s).appendTo(".stamped-reviews", O),
                                  (n = P(".stamped-tabs", t)),
                                  P(".stamped-tabs", O).replaceWith(n),
                                  r.length ? (i.length ? i.replaceWith(r) : a.append(r)) : i.remove()),
                            m &&
                                P(".stamped-sort-select", O).length &&
                                "none" !== P('.stamped-sort-select option[value="' + m + '"]', O).css("display") &&
                                (P(".stamped-sort-select", O).val(m), P(".stamped-container", O).attr("data-widget-sort", m), P(O).attr("data-sort", m)),
                            P(".new-review-form").hide(),
                            P(".new-question-form").hide(),
                            We("stamped:reviews:loaded");
                    },
                    error: function (e) {},
                }),
                S.length && (C.contentType = "application/json"),
                null != le && le.abort(),
                (le = P.ajax(C))),
                l && W({ topic: l }, a),
                v && W({ search: v }, a);
        }
        function me(e, t) {
            return (e = e.replace(new RegExp(t + "(?!([^<]+)?<)", "gi"), '<span class="stamped-keyword-highlight">$&</span>'));
        }
        function ce(l, e) {
            if ((O = P(y)).length) {
                var e = O.attr("data-product-id"),
                    t = O.attr("data-product-sku"),
                    a = O.attr("data-product-type"),
                    s = O.attr("data-name"),
                    p = O.attr("data-take-questions") || 5;
                if (!e) return;
                Re("Loading Q&A"),
                    P.ajax({
                        type: "GET",
                        url: q.SECURE_ENDPOINT + "/widget/questions",
                        data: { productId: e, productSKU: t, productType: a, productTitle: s, page: l || 1, apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, take: p || 5 },
                        success: function (e) {
                            var t, a, s, r, i, n, d, o;
                            1 == e.a &&
                                P(".stamped-questions").length &&
                                ((t = e.result),
                                (a = e.t),
                                (s = e.form),
                                e.p,
                                (r = e.avatar),
                                P("#tab-questions").text(),
                                P("#tab-questions").attr("data-count", a),
                                (function (e) {
                                    {
                                        var t;
                                        P(".stamped-questions").length && !P(".question-form-wrapper").length && ((t = P('<div class="question-form-wrapper">').html(e)), P(".new-review-form").before(t));
                                    }
                                })(s),
                                (i = P('<div class="stamped-questions">')),
                                P(".stamped-questions").html(""),
                                i.append(t),
                                r && ((n = P(".stamped-review #stamped-review-avatar", i)), (d = P('<img src="' + r + '" width="100">')), n.html(d)),
                                (o = P(".stamped-questions-placeholder")).length
                                    ? (P(".stamped-questions", o).html(""),
                                      P(".stamped-questions", o).replaceWith(i),
                                      P(".stamped-questions", o).length || (P(".stamped-questions").appendTo(o), P(".stamped-questions").replaceWith(i)),
                                      P(".stamped-questions", o).show(),
                                      P("#tab-questions").hide(),
                                      P(".question-form-wrapper").prependTo(o),
                                      P(".stamped-summary-actions-newquestion").prependTo(o))
                                    : (P(".stamped-questions").replaceWith(i), l ? P(".stamped-questions").show() : P(".stamped-questions").hide()),
                                (function (e, t, a) {
                                    var s = !(0 < e) || e / a < 1 ? 1 : Math.ceil(e / a);
                                    if (1 == s) return;
                                    var r =
                                            '<div class="stamped-pagination" id="stamped-pagination-question"><div><span id="stamped-pagination-prev" class="previous"><a onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' +
                                            (t - 1) +
                                            '"><</a></span><span id="pages"></span><span id="stamped-pagination-next" class="next"><a onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' +
                                            (t + 1) +
                                            '">></a></span></div></div>',
                                        i = P(".stamped-questions"),
                                        n = P(".stamped-questions-placeholder");
                                    n.length && (i = P(".stamped-questions", n));
                                    var d = P(".stamped-pagination", i);
                                    d.length ? d.replaceWith(r) : i.append(r);
                                    d = P(".stamped-pagination", i);
                                    var e = s,
                                        t = t,
                                        o = [];
                                    if ((o.push(1), e <= 7)) {
                                        for (p = 2; p < e; p++) o.push(p);
                                        e == t && o.push(t);
                                    }
                                    {
                                        var l;
                                        8 <= e && (1 <= t - 2 && (t - 2 != 1 && o.push(t - 2), o.push(t - 1)), 1 != t && o.push(t), (l = t + 2) <= e && (o.push(t + 1), l != e && o.push(t + 2)));
                                    }
                                    1 == t || 1 == t ? P("#stamped-pagination-prev", d).hide() : P("#stamped-pagination-prev", d).show();
                                    e == t || 1 == e ? P("#stamped-pagination-next", d).hide() : P("#stamped-pagination-next", d).show();
                                    e != t && o.push(e);
                                    for (var p = 0; p < o.length; p++) {
                                        o[p] == t
                                            ? P("#pages", d).append(' <span class="page active"><a style="cursor:pointer;" onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' + o[p] + '">' + o[p] + "</a></span> ")
                                            : P("#pages", d).append(' <span class="page"><a style="cursor:pointer;" onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' + o[p] + '">' + o[p] + "</a></span> ");
                                    }
                                })(a, l || 1, p),
                                o.length ? l && ke(".stamped-questions-placeholder") : l && ke(y),
                                P(".stamped-review-reply-body", i).each(function () {
                                    var e;
                                    P(this).attr("data-link-processed") || (P(this).attr("data-link-processed", !0), (e = P(this).html()), P(this).html(e.linkify()));
                                }),
                                We("stamped:questions:loaded"));
                        },
                    });
            }
        }
        function ue(e, t) {
            P("#stamped-questions-placeholder, .stamped-questions-placeholder").length ||
                (P(".stamped-tabs #tab-reviews").removeClass("active"),
                P(".stamped-tabs #tab-questions").removeClass("active"),
                "questions" == t ? P(".stamped-tabs #tab-questions").addClass("active") : "reviews" == t && P(".stamped-tabs #tab-reviews").addClass("active"),
                e && (P(e).addClass("active"), (t = P(e).data("type"))),
                "reviews" == t
                    ? (P(".stamped-reviews").show(), P(".stamped-reviews-filter").show(), P(".stamped-questions").hide(), P("#stamped-sort-select").show())
                    : "questions" == t && (P(".stamped-reviews").hide(), P(".stamped-reviews-filter").hide(), P(".stamped-questions").show(), P("#stamped-sort-select").hide()),
                P(".new-review-form").hide(),
                P(".new-question-form").hide());
        }
        function he(e) {
            var t = (function (e, t) {
                    for (var a = [], s = 0; s < t; ) a[s++] = e;
                    return a.join("");
                })("★", e.reviewRating),
                a = O.attr("data-image-url") || "",
                s =
                    "https://stamped.io/facebookpost?caption=" +
                    t +
                    " " +
                    encodeURIComponent(e.reviewTitle) +
                    "&name=" +
                    t +
                    " " +
                    encodeURIComponent(e.reviewTitle) +
                    "&description=" +
                    encodeURIComponent(e.reviewMessage) +
                    "&link=" +
                    encodeURIComponent(e.productUrl) +
                    "&picture=" +
                    encodeURIComponent(a.replace("%3F", "?")),
                r =
                    "https://www.facebook.com/dialog/feed?app_id=222664514734026&display=popup&link=" +
                    encodeURIComponent(s) +
                    "&name=" +
                    encodeURIComponent(e.reviewTitle) +
                    "&redirect_uri=https://stamped.io/shares?productId=" +
                    e.productId,
                i = "https://twitter.com/intent/tweet?text=" + t + " " + e.reviewMessage.substr(0, 140) + "&url=" + encodeURIComponent(e.productUrl),
                n = "https://plus.google.com/share?url=" + encodeURIComponent(e.productUrl),
                d = P(".stamped-thank-you .stamped-share-links");
            P(".facebook", d).attr("href", r).attr("target", "_blank"), P(".twitter", d).attr("href", i).attr("target", "_blank"), P(".google", d).attr("href", n).attr("target", "_blank");
        }
        var ge = [];
        function ve(e, t) {
            var a = P(e),
                s = a.attr("data-element-id"),
                r = a.attr("data-widget-type"),
                i = (a.attr("data-widget-persist-data"), a.attr("data-review-id")),
                n = a.attr("data-review-ids") ? a.attr("data-review-ids").toString().split(",") : null,
                d = a.attr("data-product-id"),
                o = a.attr("data-product-ids") ? a.attr("data-product-ids").toString().split(",") : null,
                l = a.attr("data-product-category") || a.attr("data-product-type"),
                p = a.attr("data-product-brand"),
                m = a.attr("data-product-sku"),
                c = (a.attr("data-product-title"), a.attr("data-limit-words")),
                u = a.attr("data-random"),
                h = a.attr("data-show-avatar"),
                g = a.attr("data-take"),
                v = a.attr("data-fill-empty"),
                f = a.attr("data-min-rating"),
                w = a.attr("data-min-length"),
                y = a.attr("data-rating"),
                b = a.attr("data-tags"),
                S = a.attr("data-tags-exclude"),
                k = a.attr("data-syndication") || !0,
                _ = a.data("with-photos"),
                C = a.data("with-videos"),
                I = a.data("sort-reviews"),
                O = a.data("widget-data"),
                T = a.data("widget-language"),
                E = a.data("widget-country-iso"),
                U = a.data("instagram-gallery-id"),
                x = a.data("customer-email"),
                R = a.data("customer-first-name"),
                F = a.data("customer-id"),
                j = -1 < r.indexOf("rewards") ? q.referral_code : null,
                N = a.data("is-preview");
            return {
                type: r,
                reviewId: i,
                reviewIds: n,
                productId: d,
                productIds: o,
                productCategory: l,
                productBrand: p,
                productSKU: m,
                limitWords: c,
                random: u,
                showAvatar: h,
                isFillEmpty: v,
                apiKey: G.StampedGlobalOptions.apiKey,
                sId: G.StampedGlobalOptions.sId,
                storeUrl: G.StampedGlobalOptions.storeUrl,
                page: t,
                skip: g,
                minRating: f,
                minLength: w,
                rating: y,
                isWithPhotos: _,
                isWithVideos: C,
                sortReviews: I,
                instagramGalleryId: U,
                dataType: O,
                widgetLanguage: T,
                widgetCountryIso: E,
                tags: b,
                tagsExclude: S,
                isSyndication: k,
                elementId: s,
                customerEmail: x,
                customerFirstName: R,
                customerExternalId: F,
                referralCode: j,
                isPreview: N,
            };
        }
        function fe(d, e) {
            var t = q.SECURE_ENDPOINT + "/widget/reviews/batch";
            P.ajax({
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ data: e }),
                xhrFields: { withCredentials: !0 },
                url: t,
                success: function (e, t, a) {
                    for (var s, r = e.length, i = 100, n = 0; n < r; n++) {
                        e[n] && ((i += 50), (s = e[n].elementId), we(P("rewards" == d ? '#stamped-rewards-widget[data-element-id="' + s + '"]' : '#stamped-reviews-widget[data-element-id="' + s + '"]'), e[n], e.translations, i));
                    }
                },
            });
        }
        function we(o, l, e, t) {
            setTimeout(function () {
                var e, t, a, s, r, i, n, d;
                l &&
                    ((e = l.template),
                    (t = l.lang),
                    (a = o.attr("data-widget-type")),
                    (s = o.data("widget-persist-data") || !1),
                    P(o).attr("data-lang", t || "en"),
                    "instagram-feed" != a && "instagram-feed-dev" != a && "visual-gallery" != a && 1 != s && P(o).html(""),
                    "single" == a
                        ? (o.append(e), StampedWidgetSingleFn, StampedWidgetSingleFn.init(l.data, o, P))
                        : "full-page" == a || "full-page-nps" == a
                        ? ((r = o.attr("data-rich-snippet")),
                          (i = "/" == location.pathname),
                          0 < l.total &&
                              "true" == r &&
                              !i &&
                              ((n = { "@context": "http://schema.org", "@type": "Product", name: l.shop, aggregateRating: { "@type": "AggregateRating", ratingValue: l.rating, reviewCount: l.total } }),
                              ((d = A.createElement("script")).type = "application/ld+json"),
                              (d.innerHTML = JSON.stringify(n)),
                              A.getElementsByTagName("head")[0].appendChild(d)),
                          o.append(e),
                          StampedWidgetFullPageFn,
                          StampedWidgetFullPageFn.init(l, o, P))
                        : "full-page-multiple" == a
                        ? (o.append(e), StampedWidgetFullPageMultipleFn, StampedWidgetFullPageMultipleFn.init(l, o, P))
                        : "reviews-highlight" == a
                        ? (o.append(e), StampedWidgetReviewsHighlightFn, StampedWidgetReviewsHighlightFn.init(l, o, P))
                        : "people-highlight" == a
                        ? (o.append(e), StampedWidgetPeopleHighlightFn, StampedWidgetPeopleHighlightFn.init(l, o, P))
                        : "drawer" == a
                        ? (o.append(e), StampedWidgetDrawerFn, StampedWidgetDrawerFn.init(l, o, P))
                        : "carousel" == a
                        ? (o.append(e), StampedCarouselFn, StampedCarouselFn.init(l, o, P))
                        : "carousel-nps" == a
                        ? (o.append(e), StampedCarouselNPSFn, StampedCarouselNPSFn.init(l, o, P))
                        : "carousel-checkout-comments" == a
                        ? (o.append(e), StampedCarouselCheckoutCommentFn, StampedCarouselCheckoutCommentFn.init(l, o, P))
                        : "carousel-photos" == a
                        ? (o.append(e), StampedCarouselPhotosFn, StampedCarouselPhotosFn.init(l.data, o, P))
                        : "site-badge" == a
                        ? ((r = o.attr("data-rich-snippet")),
                          (i = "/" == location.pathname),
                          0 < l.total &&
                              "true" == r &&
                              !i &&
                              ((n = { "@context": "http://schema.org", "@type": "Product", name: l.shop, aggregateRating: { "@type": "AggregateRating", ratingValue: l.rating, reviewCount: l.total } }),
                              ((d = A.createElement("script")).type = "application/ld+json"),
                              (d.innerHTML = JSON.stringify(n)),
                              A.getElementsByTagName("head")[0].appendChild(d)),
                          o.append(e),
                          StampedSiteBadgeFn,
                          StampedSiteBadgeFn.init(l, o, P))
                        : "top-rated" == a
                        ? (o.append(e), StampedTopRatedFn, StampedTopRatedFn.init(l, o, P))
                        : "wall-photos" == a
                        ? (o.append(e), StampedWallPhotosFn, StampedWallPhotosFn.init(l, o, P))
                        : "checkout-comments" == a
                        ? (o.append(e), StampedCheckoutCommentsFn, StampedCheckoutCommentsFn.init(l, o, P))
                        : "instagram-feed" == a
                        ? ((G.stampedInstagramDataArr && !P(o).is(":empty")) || o.append(e), StampedInstagramFeedFn, StampedInstagramFeedFn.init(l, o, P))
                        : "instagram-feed-dev" == a
                        ? ((G.stampedInstagramDataArr && !P(o).is(":empty")) || o.append(e), StampedInstagramFeedDevFn, StampedInstagramFeedDevFn.init(l, o, P))
                        : "visual-gallery" == a
                        ? (G.stampedVisualGalleryDataArr || o.append(e), StampedVisualGalleryFeedFn, StampedVisualGalleryFeedFn.init(l, o, P))
                        : "facebook-messenger-optin" == a
                        ? (StampedFacebookMessengerOptinFn, StampedFacebookMessengerOptinFn.init(l, o, P))
                        : "nps-submission-form" == a
                        ? (o.append(e), StampedNPSSubmissionForm, StampedNPSSubmissionForm.init(l, o, P))
                        : "rewards-summary" == a
                        ? (o.append(e), StampedRewardsSummary, StampedRewardsSummary.init(l, o, P))
                        : "rewards-how-it-works" == a
                        ? (o.append(e), StampedRewardsHowItWorks, StampedRewardsHowItWorks.init(l, o, P))
                        : "rewards-referral-modal" == a
                        ? (o.append(e), StampedRewardsReferralModal, StampedRewardsReferralModal.init(l, o, P))
                        : "rewards-referral-claim-modal" == a
                        ? (o.append(e), StampedRewardsReferralClaimModal, StampedRewardsReferralClaimModal.init(l, o, P))
                        : "rewards-earnings" == a
                        ? (o.append(e), StampedRewardsEarnings, StampedRewardsEarnings.init(l, o, P))
                        : "rewards-spendings" == a
                        ? (o.append(e), StampedRewardsSpendings, StampedRewardsSpendings.init(l, o, P))
                        : "rewards-referral" == a
                        ? (o.append(e), StampedRewardsReferral, StampedRewardsReferral.init(l, o, P))
                        : "rewards-redeem-variable-slider" == a
                        ? (o.append(e), StampedRewardsRedeemVariableSlider, StampedRewardsRedeemVariableSlider.init(l, o, P))
                        : "rewards-redeem-select-options" == a
                        ? (o.append(e), StampedRewardsRedeemSelectOptions, StampedRewardsRedeemSelectOptions.init(l, o, P))
                        : "widget-development" == a && (StampedWidgetDevFn, StampedWidgetDevFn.init(l, o, P)),
                    We("stamped:reviews:widget:loaded"));
            }, t);
        }
        function ye(e, t, a) {
            var s, r;
            (r = a ? ((s = new Date()).setTime(s.getTime() + 24 * a * 60 * 60 * 1e3), "; expires=" + s.toGMTString()) : ""), (A.cookie = e + "=" + t + r + "; path=/; SameSite=None; Secure");
        }
        function be(e) {
            for (var t = e + "=", a = A.cookie.split(";"), s = 0; s < a.length; s++) {
                for (var r = a[s]; " " == r.charAt(0); ) r = r.substring(1, r.length);
                if (0 == r.indexOf(t)) return r.substring(t.length, r.length);
            }
            return null;
        }
        function Se(e) {
            for (var t in e) (null !== e[t] && "" !== e[t] && void 0 !== e[t]) || delete e[t];
            return e;
        }
        function ke(e) {
            var t, a, s, r;
            P(e).length &&
                ("false" === (t = P(y).attr("data-animation")) ||
                    ((a = P(e)),
                    (s = P("html, body")),
                    (r = P(y).attr("data-offset") || 1),
                    k() && (r = P(y).attr("data-offset-mobile") || 1),
                    s.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
                        s.stop();
                    }),
                    s.animate({ scrollTop: a.offset().top - r }, t || 1e3, function () {
                        s.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
                    })));
        }
        function _e(e) {
            var t, a;
            "review" == e
                ? (ue(null, "reviews"),
                  (t = P(".new-review-form")),
                  (a = P(".new-question-form")).slideUp(),
                  a.removeClass("stamped-visible"),
                  t.hasClass("stamped-visible")
                      ? (t.slideUp(), t.removeClass("stamped-visible"))
                      : (t.slideDown(400, function () {
                            ke(".new-review-form");
                        }),
                        t.addClass("stamped-visible")))
                : "question" == e &&
                  (ue(null, "questions"),
                  (t = P(".new-question-form")),
                  (a = P(".new-review-form")).slideUp(),
                  a.removeClass("stamped-visible"),
                  t.hasClass("stamped-visible")
                      ? (t.slideUp(), t.removeClass("stamped-visible"))
                      : (t.slideDown(400, function () {
                            ke(".new-question-form");
                        }),
                        t.addClass("stamped-visible")));
        }
        function Ce(e) {
            var t,
                a,
                s = P(e).parents(".new-review-form"),
                r = P(e).attr("data-value"),
                i = P(e).parent();
            s.find("input[name='reviewRating']").val(r),
                (t = r),
                (a = i)
                    .find("a:lt(" + t + ")")
                    .removeClass("fa-star-o")
                    .addClass("fa-star-checked"),
                a
                    .find("a:gt(" + (t - 1) + ")")
                    .removeClass("fa-star-checked")
                    .addClass("fa-star-o");
        }
        function Ie(e, t, a, s) {
            P(y).length &&
                (he(e),
                P(".stamped-user-review", O).hide(),
                P(".stamped-thank-you", O).show(),
                t.reviewRating < 3 ? (P(".stamped-thank-you p", O).hide(), P(".stamped-thank-you .stamped-share-links", O).hide()) : (P(".stamped-thank-you p", O).show(), P(".stamped-thank-you .stamped-share-links", O).show()),
                P(".new-review-form", O).hide(),
                P(".edit-review-form", O).hide(),
                P(".stamped-summary-actions-newreview").hide(),
                P("#stamped-button-submit", O).removeAttr("disabled"),
                s && P("#stamped-button-submit", O).val(s),
                ke(y),
                (function (e, t, a) {
                    if (null != be("stamped-user-reviews")) {
                        for (var s = JSON.parse(be("stamped-user-reviews")), r = !1, i = 0; i < s.length; i++)
                            if (s[i].pid == e) {
                                (r = !0), s[i];
                                break;
                            }
                        !r && e && t && 1 == a && (10 <= s.length && s.splice(0, 1), s.push({ pid: e, v: t }), ye("stamped-user-reviews", JSON.stringify(s), 1));
                    } else {
                        var n;
                        e && t && 1 == a && ((n = [{ pid: e, v: t }]), ye("stamped-user-reviews", JSON.stringify(n), 1));
                    }
                })(a.productId, t.userReference, !0)),
                We("stamped:reviews:submitted");
        }
        function Oe(e, t, a) {
            P || (jQuery && (P = jQuery)), a && P(a).closest(y).length && (O = P(a).closest(y));
            O.attr("data-product-id");
            var s,
                r = P(".stamped-summary-ratings.selected .summary-rating-bar.selected", O).attr("data-rating");
            r && (t = r), P(".stamped-sort-select", O).length && (s = P(".stamped-sort-select", O).val()), pe(e, s, t);
        }
        function Te() {
            var e;
            P("select.stamped-filter-select").each(function () {
                P(this).val("");
            }),
                P(".stamped-summary-keywords-list li").removeClass("selected"),
                P(O).removeAttr("data-keyword"),
                P(".stamped-summary-actions-clear").hide(),
                P(".stamped-reviews", O).removeAttr("data-filtered"),
                P(".stamped-sort-select").length && (e = P(".stamped-sort-select").val()),
                (T = {}),
                P(".stamped-reviews-search-input").val(""),
                P(".stamped-reviews-search-clear").hide(),
                P(O).removeAttr("data-search"),
                ne(),
                pe(1, e, null, !0);
        }
        String.linkify ||
            (String.prototype.linkify = function () {
                return this.replace(/\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim, '<a href="$&">$&</a>')
                    .replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim, '$1<a href="http://$2">$2</a>')
                    .replace(/[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim, '<a href="mailto:$&">$&</a>');
            });
        var Ee = !1,
            Ue = null;
        function xe(e, t) {
            (t = t || G.location.href), (e = e.replace(/[\[\]]/g, "\\$&"));
            var a = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
            return a ? (a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "") : null;
        }
        function Re(e, t) {
            var a = "true" == xe("stamped_debug") || 1 == G.stamped_debug,
                s = G.stamped_debug_level || xe("stamped_debug_level");
            a && (t || console.log("[Stamped.io]", e), t && s && console.log("[Stamped.io level" + s + "]", e));
        }
        function Fe(e, t) {
            ((s = A.createElement("script")).type = "text/javascript"), (s.charset = "UTF-8"), (s.src = e);
            var a = A.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(s, a), (s.onload = s.onreadystatechange = t);
        }
        function je(e, t) {
            return "undefined" != typeof Storage && (localStorage.setItem(e, JSON.stringify(t)), 1);
        }
        function Ne(t) {
            if ("undefined" == typeof Storage) return !1;
            var a;
            try {
                a = JSON.parse(localStorage.getItem(t)) || null;
            } catch (e) {
                a = localStorage.getItem(t);
            }
            return a;
        }
        function Le(e, t) {
            var a,
                s,
                r = "stamped_app_key",
                i = Ne(r);
            i && i.apiKey
                ? (Re(i), We("stamped:init:getAppKey", { detail: i }), Ge(i))
                : (((a = new XMLHttpRequest()).onreadystatechange = function () {
                      var e, t;
                      4 !== a.readyState ||
                          200 !== a.status ||
                          ((e = JSON.parse(a.responseText)) &&
                              e.apiKey &&
                              (je(r, e), We("stamped:init:getAppKey", { detail: e }), !0 === e.skip || ((appKey = e.apiKey), (t = { apiKey: appKey }), "undefined" != typeof Shopify ? (t.storeUrl = Shopify.shop) : (t.sId = e.sId), Ge(t))));
                  }),
                  (s = ""),
                  "shopify" == e ? (s = "shopShopifyDomain=" + t) : "bigcommerce" == e && (s = "storeHash=" + t),
                  a.open("GET", "//stamped.io/api/getappkey?" + s, !0),
                  a.send());
        }
        function Ge(e) {
            if (1 == G.isInitializedStamped) return Re("Already initalized"), StampedFn.loadWidget(!0), void StampedFn.loadDisplayWidgets();
            var t;
            (G.isInitializedStamped = !0),
                e && (G.StampedGlobalOptions = e),
                G.StampedGlobalOptions &&
                    G.StampedGlobalOptions.apiKey &&
                    ((t = "true" == xe("stamped_force_jquery") || q.is_force_jquery),
                    "undefined" == typeof jQuery || 1 == t
                        ? Fe("https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", function () {
                              (P = jQuery.noConflict(!0)), F(), (G.isInitializedStamped = !0);
                          })
                        : (F(0, jQuery), (G.isInitializedStamped = !0)));
        }
        var Ae = A.getElementById("stamped-script-widget"),
            Pe = "";
        (Ae = Ae || A.getElementById("stamped-script-init")) && (Pe = Ae.src);
        var qe,
            De = !1;
        if (
            ((0 < Pe.indexOf("skipCss=true") || 1 == q.exclude_main_css) && (De = !0),
            De ||
                (function (e) {
                    for (var t = A.styleSheets, a = 0, s = t.length; a < s; a++) if (t[a] && t[a].href && -1 < t[a].href.indexOf(e)) return;
                    var r = A.createElement("link");
                    (r.rel = "stylesheet"), (r.href = e), (r.type = "text/css");
                    var i,
                        n = A.getElementsByTagName("link")[0];
                    n ? n.parentNode.insertBefore(r, n) : ((i = A.getElementsByTagName("head")[0]), r.setAttribute("async", ""), i.appendChild(r));
                })("//cdn1.stamped.io/files/widget.min.css"),
            "undefined" != typeof Shopify)
        ) {
            var Ke,
                Me = !1;
            if (
                (Shopify.shop &&
                    (null != Ae && (-1 < Pe.indexOf("skip=true") && (Me = !0), !(Ke = Ae.getAttribute("data-api-key")) && -1 < Pe.indexOf("apiKey") && (Ke = xe("apiKey", Pe)), Ke && ((Me = !0), Ge({ apiKey: Ke, storeUrl: Shopify.shop }))),
                    Me || Le("shopify", Shopify.shop)),
                Shopify.Checkout && "undefined" == typeof StampedShopifyCheckout)
            ) {
                if ("function" == typeof G.StampedShopifyCheckout) return !1;
                Fe("//cdn1.stamped.io/files/shopify-checkout.min.js", function () {
                    We("stamped:script-shopify-checkout:loaded");
                });
            }
        }
        function We(e, t) {
            var a;
            G.CustomEvent ? (a = new CustomEvent(e, t)) : (a = A.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, t);
            try {
                A.dispatchEvent(a);
            } catch (e) {}
        }
        return (
            null == Ae || ((qe = Ae.getAttribute("data-store-hash")) && Le("bigcommerce", qe)),
            {
                init: Ge,
                initRewards: L,
                reloadUGC: N,
                toggleForm: _e,
                setRating: Ce,
                submitForm: function (e) {
                    var t = O.data("label-submitting"),
                        a = P(".new-review-form .stamped-button-primary", O).val(),
                        s = null;
                    if (
                        (r = (function (e) {
                            var t = {};
                            P(e).hasClass("new-review-form") || (e = P(e).parents(".new-review-form"));
                            var a = P("input,textarea,select,radio", e).serializeArray();
                            return (
                                P.each(a, function () {
                                    void 0 !== t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : (t[this.name] = this.value || "");
                                }),
                                t
                            );
                        })(e)).reviewRating &&
                        r.author
                    ) {
                        var r,
                            i = {
                                productName: O.attr("data-name"),
                                productId: O.attr("data-product-id"),
                                productSKU: O.attr("data-product-sku"),
                                productType: O.attr("data-product-type"),
                                productDescription: O.attr("data-description"),
                                productImageUrl: O.attr("data-image-url"),
                                productUrl: O.attr("data-url"),
                                reviewSource: "widget",
                                userReference: O.attr("data-user-reference"),
                            },
                            s = (r = P.extend(r, i)),
                            n = new FormData();
                        for (var d in r) n.append(d, r[d]);
                        var o = 0;
                        for (var l in f) n.append("image" + o, f[o]), (r["image" + o] = f[o]), o++;
                        Re(Object.prototype.toString.call(n)), Re(n);
                        var p = {
                            url: q.SECURE_ENDPOINT + "/reviews3?" + P.param(Se({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl })),
                            cache: !1,
                            processData: !1,
                            contentType: !1,
                            type: "POST",
                            data: n._blob ? n._blob() : n,
                            beforeSend: function (e) {
                                P("#stamped-button-submit", O).attr("disabled", "disabled"), t && P("#stamped-button-submit", O).val(t);
                            },
                            error: function (e) {
                                We("stamped:reviews:submitError"), 1 == q.is_ignore_submit_error ? Ie(s, e, i, a) : (P("#stamped-button-submit", O).removeAttr("disabled"), a && P("#stamped-button-submit", O).val(a));
                            },
                            success: function (e) {
                                Ie(s, e, i, a);
                            },
                        };
                        P.ajax(p);
                    }
                },
                submitQuestionForm: function () {
                    var e,
                        t,
                        a,
                        s,
                        r,
                        i,
                        n = P("#new-question-form"),
                        d = P(y);
                    n.length &&
                        d.length &&
                        ((e = d.data("name")),
                        (t = d.data("description")),
                        (a = d.data("product-sku")),
                        (s = d.data("url")),
                        (r = d.data("image-url")),
                        (i = n.serializeArray()).push({ name: "productName", value: e }),
                        i.push({ name: "productDescription", value: t }),
                        i.push({ name: "productSKU", value: a }),
                        i.push({ name: "productUrl", value: s }),
                        i.push({ name: "productImageUrl", value: r }),
                        i.push({ name: "apiKey", value: G.StampedGlobalOptions.apiKey }),
                        i.push({ name: "sId", value: G.StampedGlobalOptions.sId }),
                        i.push({ name: "storeUrl", value: G.StampedGlobalOptions.storeUrl }),
                        P('input[type="submit"]', n).attr("disabled", "disabled"),
                        P.ajax({
                            type: "POST",
                            url: "//stamped.io/api/questions",
                            data: P.param(i),
                            crossDomain: !0,
                            success: function (e) {
                                P("#new-question-form").hide(), P(".stamped-form-message-success").show(), P("#new-question-form")[0].reset(), P('input[type="submit"]', n).removeAttr("disabled");
                            },
                        }));
                },
                toggleFormEdit: function () {
                    P(".edit-review-form", O).toggle();
                },
                pageQuestions: function (e) {
                    var t = O.attr("data-product-id");
                    ce(P(e).data("page"), t);
                },
                pageReviews: Oe,
                sortReviews: function (e) {
                    O.attr("data-product-id"), e.value && pe(1, e.value, null, !0);
                },
                filterReviews: function (e) {
                    var t = P("option:first-child", e).text(),
                        a = e.value;
                    T = {};
                    var s,
                        r = 1;
                    P("select.stamped-filter-select").each(function () {
                        var e = P("option:first-child", this).text(),
                            t = this.value;
                        (T["qt" + r] = e), (T["qv" + r] = t), r++;
                    }),
                        P(".stamped-summary-actions-clear").show(),
                        P(".stamped-reviews", O).attr("data-filtered", "true"),
                        P(".stamped-sort-select").length && (s = P(".stamped-sort-select").val()),
                        pe(1, s, null, !0),
                        t && a && W({ customOptionTitle: t, customOptionValue: a }, O.attr("data-product-id"));
                },
                filterClear: Te,
                pageWidget: function (e) {
                    var s,
                        t,
                        a,
                        r,
                        i = P(e).data("page"),
                        n = P(e).closest("#stamped-reviews-widget");
                    n.attr("data-page", i),
                        (s = n),
                        (t = i),
                        (a = q.SECURE_ENDPOINT + "/widget/reviews"),
                        (r = ve(s, t)),
                        P.ajax({
                            type: "GET",
                            url: a + "?" + P.param(Se(r)),
                            dataType: "json",
                            success: function (e, t, a) {
                                we(s, e);
                            },
                        });
                },
                loadBadges: te,
                loadWidget: Z,
                loadDisplayWidgets: ae,
                voteReview: function (e, t, a) {
                    var s = P(e);
                    s.parent().fadeTo("slow", 0.3),
                        s.addClass("disable-link"),
                        P.ajax({
                            type: "POST",
                            url: q.SECURE_ENDPOINT + "/reviews/vote",
                            data: { reviewId: t, vote: a, apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl },
                            success: function (e) {
                                var t, a;
                                (1 !== e && -1 !== e) || ((t = s.attr("data-count")), (a = parseInt(t)), s.attr("data-count", a + e)), s.parent().fadeTo("slow", 1), s.removeClass("disable-link");
                            },
                        });
                },
                openUGCModal: function (I, e, t, a, s, O, T, E, r) {
                    var U;
                    (1 !== a && a) ||
                        (I = (function (e, t) {
                            var a = [];
                            for (i = 0; i < e.length; i++) {
                                var s = e[i];
                                if (1 != t || s.reviewUserPhotos || s.reviewUserVideos) {
                                    var r = {
                                        photos: [],
                                        videos: [],
                                        name: s.author,
                                        via: "Photos",
                                        title: s.reviewTitle,
                                        body: s.reviewMessage,
                                        date: s.reviewDate,
                                        reply: s.reviewReply,
                                        dateReplied: s.dateReplied,
                                        dateFull: s.dateCreated,
                                        verifiedType: s.reviewVerifiedType,
                                        rating: s.reviewRating,
                                        products: [{ url: s.productUrl, title: s.productName, imageUrl: s.productImageUrl, imageLargeUrl: s.productImageLargeUrl, productUrl: s.productDirectUrl || "" }],
                                        review_id: s.id,
                                        votes: { up: s.reviewVotesUp, down: s.reviewVotesDown },
                                        options: [],
                                    };
                                    if (s.reviewUserPhotos || s.reviewUserVideos) {
                                        if (s.reviewUserVideos) {
                                            var n = s.reviewUserVideos.split(",");
                                            for (ii = 0; ii < n.length; ii++) {
                                                var d = "//s3.us-west-2.amazonaws.com/stamped.io/uploads/videos/" + n[ii],
                                                    o = "//cdn.stamped.io/uploads/videos/" + n[ii] + ".jpg";
                                                d.indexOf(".mp4") < 0 && (d += ".mp4"), 0 <= d.indexOf("nothumb") && (o = ""), r.photos.push({ videoUrl: d, imageThumbnailUrl: o });
                                            }
                                        }
                                        if (s.reviewUserPhotos) {
                                            var l = s.reviewUserPhotos.split(",");
                                            for (ii = 0; ii < l.length; ii++) r.photos.push({ imageUrl: "//cdn.stamped.io/uploads/photos/" + l[ii], imageThumbnailUrl: "//cdn.stamped.io/uploads/photos/thumb/" + l[ii] });
                                        }
                                    } else r.photos.push({ imageUrl: s.productImageLargeUrl, imageThumbnailUrl: s.productImageUrl });
                                    if (s.reviewOptionsList && s.reviewOptionsList.length)
                                        for (ii = 0; ii < s.reviewOptionsList.length; ii++) r.options.push({ message: s.reviewOptionsList[ii].message, value: s.reviewOptionsList[ii].value });
                                    a.push(r);
                                }
                            }
                            return a;
                        })(I, s)),
                        null != I || I.length || g(e, O);
                    var n,
                        d =
                            '<div class="stamped-ugc-modal" data-lang="' +
                            (T = T || "en") +
                            '"> <div class="stamped-ugc-modal-wrapper" aria-label="Shop our Instagram look"><a href="javascript:void(0)" title="Close" aria-label="Close" role="button" class="stamped-modal-close show-mobile" style="display:none;" tabindex="0">X</a> <div class="stamped-ugc-modal-nav stamped-ugc-modal-nav-previous" data-direction="left" tabindex="0" aria-label="Previous Photo"> <i class="stamped-fa stamped-fa-angle-left"></i> </div> <div class="stamped-ugc-modal-image-wrapper"> <div class="stamped-ugc-modal-image"></div> <ul></ul> </div> <div class="stamped-ugc-modal-content"> <a href="javascript:void(0)" title="Close" aria-label="Close" role="button" class="stamped-modal-close" tabindex="0">X</a> <div class="stamped-ugc-modal-content-wrapper"> <div class="stamped-ugc-modal-user"> <div class="stamped-ugc-modal-user-source"></div><div class="stamped-ugc-modal-user-username"></div> </div> <div class="stamped-ugc-modal-caption"></div><div class="stamped-ugc-modal-votes"></div> <div class="stamped-ugc-modal-tags"> <span class="stamped-ugc-modal-tag"><a aria-label="Link to Product" {0} target="_top"> <div class="stamped-ugc-modal-tags-product-image-wrapper"><img {1} class="stamped-ugc-modal-tags-product-image" onerror=\'this.style.display = "none"\' alt="Product Image" /></div> <div class="stamped-ugc-modal-tags-product-title">{2}</div> </a><div class="stamped-ugc-modal-tags-btn" data-shoppable-url="{3}"></div> </span> </div> </div> </div> <div class="stamped-ugc-modal-nav stamped-ugc-modal-nav-next" data-direction="right" tabindex="0" aria-label="Next Photo"> <i class="stamped-fa stamped-fa-angle-right"></i> </div> <div class="stamped-ugc-modal-list-photos"><ul></ul></div> </div> </div>',
                        x = (P(t).attr("data-hover-text"), P(t).attr("data-shop-button-text"), P(t).attr("data-url-param") || ""),
                        R = P(t).attr("data-url-store") || G.stamped_global_url_store || "";
                    P(t).attr("data-cropped"), P(t).attr("data-page"), P(t).attr("data-take"), P("#stamped-ugc-modal").length || ((U = P(d)).attr("data-modal-type", a), U.attr("data-modal-shoppable", r || !1), P(U).appendTo(A.body));
                    for (var o, l, p = "", m = I.length, F = F || P(".stamped-ugc-modal-tags:first", U).html(), c = I ? I.length : 0, j = 0; j < m; j++) {
                        var u = I[j],
                            h = u.imageUrl;
                        h && ((p += templateBlock.formatStringStamped(c, h)), c++), u.photos.length && u.photos[0].imageUrl && ((ge[j] = new Image()), (ge[j].src = u.photos[0].imageUrl));
                    }
                    function N() {
                        var e = Number(P(this).text()) + 1,
                            t = P(this).data("image-url");
                        P(".stamped-ugc-modal-image-wrapper ul li").removeClass("active"),
                            P(".stamped-ugc-modal-image-wrapper ul li:nth-child(" + e + ")").addClass("active"),
                            "image" == q.modal_ugc_image_viewer ? P(".stamped-ugc-modal-image", U).html('<img src="' + t + '" alt="Customer Photo" />') : P(".stamped-ugc-modal-image", U).css("background-image", "url(" + t + ")"),
                            console.log("123"),
                            We("stamped:ugcmodal:paged");
                    }
                    function L() {
                        var e = P(this).data("index-review"),
                            t = P(this).data("index-photo");
                        P(".stamped-ugc-modal-list-photos ul li").removeClass("active"),
                            P(".stamped-ugc-modal-list-photos ul li[data-index-review=" + e + "][data-index-photo=" + t + "]").addClass("active"),
                            g(e, t),
                            We("stamped:ugcmodal:paged");
                    }
                    P(".stamped-ugc-media-block-template", t).append(p),
                        P(t).keydown(function (e) {
                            if (37 === e.keyCode) v("left");
                            else {
                                if (39 !== e.keyCode) return;
                                v("right");
                            }
                        }),
                        n ||
                            (P(A).on("click keypress", ".stamped-modal-close, .stamped-ugc-modal.open", function (e) {
                                if (!0 === _(e)) {
                                    if (e.target != this) return;
                                    U.remove(), P("body").removeClass("stamped-modal-open");
                                }
                            }),
                            U.on("click keypress", ".stamped-ugc-modal-nav-previous, .stamped-ugc-modal-nav-next", function (e) {
                                var t;
                                !0 === _(e) && ((t = P(this).attr("data-direction")), v(t));
                            }),
                            A.addEventListener(
                                "touchstart",
                                function (e) {
                                    (o = e.touches[0].clientX), (l = e.touches[0].clientY);
                                },
                                !1
                            ),
                            A.addEventListener(
                                "touchmove",
                                function (e) {
                                    if (!o || !l) return;
                                    var t = e.touches[0].clientX,
                                        a = e.touches[0].clientY,
                                        s = o - t,
                                        r = l - a;
                                    Math.abs(s) > Math.abs(r) && v(0 < s ? "right" : "left");
                                    l = o = null;
                                },
                                !1
                            ),
                            (l = o = null)),
                        (n = !0);
                    var g = function (e, t) {
                            var a,
                                s,
                                r = I[e];
                            if (null != r && null != r.photos) {
                                if ((null !== t ? (O = t) > r.photos.length - 1 && (O = 0) : (!O || O > r.photos.length - 1) && (O = 0), !P(".stamped-ugc-modal-list-photos ul li", U).length))
                                    for (var i = 0; i < I.length; i++)
                                        for (var n = 0; n < I[i].photos.length; n++) {
                                            var d = e == i && t == n ? "active" : "",
                                                o = (I[i].photos[n].imageUrl, I[i].photos[n].imageThumbnailUrl),
                                                l = A.createElement("li");
                                            (l.className = d), (l.innerHTML = "");
                                            var p = A.createAttribute("data-index-review");
                                            (p.value = i),
                                                l.setAttributeNode(p),
                                                ((m = A.createAttribute("data-index-photo")).value = n),
                                                l.setAttributeNode(m),
                                                (l.style.background = "url(" + o + ")"),
                                                P(".stamped-ugc-modal-list-photos ul", U).append(l),
                                                (l.onclick = L);
                                        }
                                for (
                                    null != r.photos[O] &&
                                        ((a = r.photos[O].imageUrl),
                                        (s = r.photos[O].videoUrl),
                                        a
                                            ? "image" == q.modal_ugc_image_viewer
                                                ? (P("video", P(".stamped-ugc-modal-image", U)).remove(), P(".stamped-ugc-modal-image", U).html('<img src="' + a + '" alt="Customer Photo" />'))
                                                : (P("video", P(".stamped-ugc-modal-image", U)).remove(), P(".stamped-ugc-modal-image", U).css("background-image", "url(" + a + ")"))
                                            : s &&
                                              P(".stamped-ugc-modal-image", U).fadeOut("", function () {
                                                  P(".stamped-ugc-modal-image", U).css("background-image", 'url("")'),
                                                      P(".stamped-ugc-modal-image", U).html('<video class="stamped-ugc-modal-video" src="' + s + '" width="100%" controls autoplay />'),
                                                      P(this).fadeIn();
                                              })),
                                        P(".stamped-ugc-modal-image-wrapper ul", U).html(""),
                                        ii = 0;
                                    ii < r.photos.length;
                                    ii++
                                ) {
                                    var m,
                                        c = ii === O ? "active" : "",
                                        u = A.createElement("li");
                                    (u.className = c),
                                        (u.innerHTML = ii),
                                        ((m = A.createAttribute("data-image-url")).value = r.photos[ii].imageUrl),
                                        u.setAttributeNode(m),
                                        P(".stamped-ugc-modal-image-wrapper ul", U).append(u),
                                        (u.onclick = N);
                                }
                                P(".stamped-ugc-modal-user-source").text(r.via), P(".stamped-ugc-modal-user-username", U).text(r.name);
                                var h = "Verified Buyer",
                                    g = "Shop Now";
                                E && "en" != T && ((h = E.label_verified_buyer || h), (g = E.label_shop_now || g)),
                                    P(".stamped-ugc-modal-user-username", U).append('<span class="stamped-verified-badge">' + h + "</span>"),
                                    P(".stamped-ugc-modal-tags-btn", U).append("<span>" + g + "</span>");
                                var v = "";
                                if (r.rating) {
                                    for (var f = 0; f < r.rating; f++) v += '<i class="stamped-fa stamped-fa-star"></i>';
                                    for (f = 0; f < 5 - r.rating; f++) v += '<i class="stamped-fa stamped-fa-star-o"></i>';
                                }
                                var w,
                                    y = "";
                                if (r.options && r.options.length) {
                                    for (y += '<ul class="">', j = 0; j < r.options.length; j++) {
                                        var b = r.options[j].message,
                                            S = r.options[j].value;
                                        y +=
                                            '<li data-value="' +
                                            b
                                                .toString()
                                                .toLowerCase()
                                                .trim()
                                                .replace(/\s+/g, "-")
                                                .replace(/[^\w\-]+/g, "")
                                                .replace(/\-\-+/g, "-")
                                                .replace(/^-+/, "")
                                                .replace(/-+$/, "") +
                                            '"><span class="stamped-ugc-modal-options-message">' +
                                            b +
                                            '</span> <span class="stamped-ugc-modal-options-value">' +
                                            S +
                                            "</span></li>";
                                    }
                                    y += "</ul>";
                                }
                                r.reply || (r.reply = ""), (w = r.dateFull ? new Date(r.dateFull) : new Date(r.date));
                                var k = new timeagoStamped().formatDateString(w);
                                for (
                                    "en" != T && (k = r.date),
                                        P(".stamped-ugc-modal-caption", U).html(
                                            '<div class="stamped-ugc-modal-date" data-date="' +
                                                r.date +
                                                '">' +
                                                k +
                                                '</div><div class="stamped-ugc-modal-caption-rating">' +
                                                v +
                                                '</div><div class="stamped-ugc-modal-caption-options">' +
                                                y +
                                                '</div><div class="stamped-ugc-modal-caption-title">' +
                                                (r.title || "") +
                                                '</div> <div class="stamped-ugc-modal-caption-body">' +
                                                r.body +
                                                '</div> <div class="stamped-ugc-modal-caption-reply">' +
                                                r.reply +
                                                "</div>"
                                        ),
                                        P(".stamped-ugc-modal-votes", U).html(
                                            '<span class="stamped-ugc-modal-vote-up" data-count="' +
                                                r.votes.up +
                                                '" onclick="StampedFn.voteReview(this, ' +
                                                r.review_id +
                                                ',1)"><i class="stamped-fa stamped-fa-thumbs-up"></i></span><span class="stamped-ugc-modal-vote-down" data-count="' +
                                                r.votes.down +
                                                '" onclick="StampedFn.voteReview(this, ' +
                                                r.review_id +
                                                ',1)"><i class="stamped-fa stamped-fa-thumbs-down"></i></span>'
                                        ),
                                        P(".stamped-ugc-modal-tags", U).html(""),
                                        j = 0;
                                    j < r.products.length;
                                    j++
                                ) {
                                    var _ = r.products[j];
                                    (_.title = _.title ? _.title : ""), R ? ((_.url = _.url.replace("?storeUrl=https://", "")), (_.url = _.url + "?storeUrl=" + R)) : x && (_.url = _.url + "?param=" + x);
                                    var C = _.imageUrl || _.imageLargeUrl;
                                    _.imageUrl
                                        ? P(".stamped-ugc-modal-tags", U).append(F.formatStringStamped('href="' + _.url + '"', 'src="' + C + '"', _.title, _.productUrl))
                                        : P(".stamped-ugc-modal-tags", U).append(F.formatStringStamped('href="' + _.url + '"', "", _.title, _.productUrl));
                                }
                                U.attr("data-review-index", e), U.attr("data-photo-index", O), U.hasClass("open") || (U.addClass("open"), P("body").addClass("stamped-modal-open"), We("stamped:ugcmodal:open"));
                            }
                        },
                        v = function (e) {
                            if (U.hasClass("open")) {
                                U.attr("data-review-index"), U.attr("data-photo-index");
                                if ("left" == e) P(".stamped-ugc-modal-list-photos ul li.active").prev().click();
                                else {
                                    if ("right" != e) return;
                                    var t = P(".stamped-ugc-modal-list-photos ul li.active").next();
                                    P(t.click()), t.length || ("instagram" == U.attr("data-modal-type") && We("stamped:ugcmodal:last"));
                                }
                            }
                        };
                    null != I && I.length && g(e, O);
                },
                openUGCPhoto: function (i, e, n, t) {
                    if (Ee) {
                        for (var a = null, s = 0; s < w.length; s++) w[s].id == i && (a = s);
                        null != a && StampedFn.openUGCModal(w, a, P(y), null, null, n, Ue), (Ee = !1);
                    } else {
                        Ee = !0;
                        var r = q.SECURE_ENDPOINT + "/widget/reviews",
                            d = P(O).attr("data-product-sku") || "",
                            o = "",
                            l = "",
                            p = [];
                        !0 === t
                            ? ((e = P(O).attr("data-product-id") || ""), (o = P(O).attr("data-name") || ""), (l = P(O).attr("data-product-type") || ""))
                            : P(".stamped-reviews .stamped-review", O).each(function () {
                                  var e = P(this).attr("id");
                                  (e = e.replace("stamped-review-", "")) && p.push(e);
                              }),
                            P.ajax({
                                type: "GET",
                                url:
                                    r +
                                    "?" +
                                    P.param(
                                        Se({
                                            type: "widget-carousel-photos",
                                            reviewId: i,
                                            reviewIds: p,
                                            productId: e,
                                            productSKU: d,
                                            productType: l,
                                            productTitle: o,
                                            random: !1,
                                            isFillEmpty: !1,
                                            page: 1,
                                            skip: 100,
                                            minRating: 1,
                                            isWithPhotos: !0,
                                            apiKey: G.StampedGlobalOptions.apiKey,
                                            sId: G.StampedGlobalOptions.sId,
                                            storeUrl: G.StampedGlobalOptions.storeUrl,
                                        })
                                    ),
                                dataType: "json",
                                success: function (e, t, a) {
                                    w = e.data;
                                    for (var s = null, r = 0; r < w.length; r++) w[r].id == i && (s = r);
                                    null != s && ((Ue = e.lang), StampedFn.openUGCModal(w, s, P(y), null, null, n, Ue, e.translations)), (Ee = !1), 0;
                                },
                            });
                    }
                    return !1;
                },
                initOptions: G.StampedGlobalOptions,
                loadSurveyOptin: function (e) {
                    var t,
                        a = setInterval(function () {
                            void 0 !== G.StampedGlobalOptions &&
                                (null !== e &&
                                    e.orderId &&
                                    P.ajax({
                                        type: "GET",
                                        url:
                                            "//stamped.io/api/plugin/facebookmessenger?" +
                                            P.param(Se({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, orderId: e.orderId, customerEmail: e.customerEmail })),
                                        success: function (e) {
                                            P("body").append(e.html);
                                            var t = P("#stamped-facebook-optin .fb-send-to-messenger")[0].outerHTML,
                                                a = A.createElement("iframe");
                                            (a.height = "100"), (a.width = "100%");
                                            var s =
                                                "<!DOCTYPE html> <html> <head> <meta charset='utf-8' /> <title></title> </head> <script> var fbPageId, fbUserRef; window.fbAsyncInit = function() { FB.init({ appId : '222664514734026', xfbml : true, version : 'v6.0' }); FB.Event.subscribe('send_to_messenger', function(e) { var modal = window.top.document.getElementById('stamped-facebook-optin'); if (e.event == 'rendered'){ modal.style.display = 'block'; } if (e.event == 'opt_in'){ console.log('hide'); modal.style.display = 'none'; } }); }; (function(d, s, id){ var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = '//connect.facebook.net/en_US/sdk.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk') ); </script> <body>" +
                                                t +
                                                "</body> </html>";
                                            A.body.appendChild(a), P(a).appendTo("#stamped-facebook-optin .fb-send-to-messenger"), a.contentWindow.document.open(), a.contentWindow.document.write(s), a.contentWindow.document.close();
                                        },
                                    }),
                                clearInterval(a)),
                                5 <= ++t && clearInterval(a);
                        }, 2e3);
                },
                closeSurveyOptin: function () {
                    P("#stamped-facebook-optin").remove();
                },
                triggerEvent: We,
                on: function (e, t) {
                    A.addEventListener
                        ? A.addEventListener(e, t)
                        : A.attachEvent("on" + e, function () {
                              t.call(A);
                          });
                },
                jQuery: P,
                stampedLog: Re,
                getOptions: function () {
                    return q;
                },
                setOptions: function (e) {
                    Object.assign(q, e);
                },
                getLoggedInCustomer: function () {
                    return b.customer;
                },
                getDataRewards: function () {
                    return b;
                },
                loadLauncherView: B,
                toggleLauncher: M,
                toggleRewardsModal: M,
                rewardsApplyCode: function (e) {
                    var t = P(".stamped-reward-coupon-code", g).text(),
                        a = P("#stamped-rewards-apply-code", g).text(),
                        s = b.links;
                    J("loading");
                    var r,
                        i = q.is_rewards_code_copy || -1 < a.indexOf("Copy");
                    return (
                        We("stamped:rewards:coupon:applied", { detail: t }),
                        1 == i
                            ? (C(t), J("active"))
                            : ((r = s.shop + "/discount/" + t),
                              (e && e.skip) ||
                                  P.ajax({
                                      type: "GET",
                                      url: r,
                                      data: {},
                                      success: function (e, t, a) {
                                          J("active");
                                      },
                                  })),
                        { code: t, setState: J }
                    );
                },
                rewardsReferralClaimCode: function () {
                    var e = P("#referral_claim_email", g),
                        t = P("#stamped-rewards-claim-code", g),
                        a = e.val(),
                        s = StampedFn.getOptions();
                    a &&
                        (Y(t, "loading", !0),
                        P.ajax({
                            type: "POST",
                            url:
                                s.SECURE_ENDPOINT +
                                "/v2/rewards/referral/claim?" +
                                P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, email: a, referralCode: s.referral_code, debug: null }),
                            dataType: "json",
                            success: function (e, t, a) {
                                B("view-coupon", null, { couponCode: e.couponCode, title: e.title, viewTitle: e.title });
                            },
                            error: function (e) {
                                var t = e.responseJSON ? e.responseJSON.message : e.responseText ? JSON.parse(e.responseText).message : "You are not eligible for the reward.";
                                P(".stamped-reward-card-error", g).text(t);
                            },
                            complete: function () {
                                Y(t, "active", !0, 1e3);
                            },
                        }));
                },
                rewardsReferralSendEmail: function (e) {
                    var t = P("#email-to", g),
                        a = P("#email-message", g),
                        s = P(e),
                        r = t.val(),
                        i = (a.val(), StampedFn.getOptions());
                    r &&
                        (Y(s, "loading", !0),
                        P.ajax({
                            type: "POST",
                            url:
                                i.SECURE_ENDPOINT +
                                "/v2/rewards/referral/send?" +
                                P.param({ apiKey: G.StampedGlobalOptions.apiKey, sId: G.StampedGlobalOptions.sId, storeUrl: G.StampedGlobalOptions.storeUrl, fromEmail: b.customer.customerEmail, toEmail: r, debug: null }),
                            data: {},
                            success: function (e, t, a) {},
                            error: function (e) {},
                            complete: function () {
                                Y(s, "active", !1, 3e4);
                            },
                        }));
                },
                rewardsLink: function (e) {
                    var t = b.links;
                    "login" == e ? (top.location.href = t.login) : "signup" == e && (top.location.href = t.signup);
                },
                rewardsRedeem: $,
                rewardsPointsRefresh: z,
                rewardsReferralCopy: function () {
                    var e = P(".stamped-reward-referral-wrapper .stamped-reward-copy-icon", g);
                    C(b.customer.urlReferral);
                    var t = e.html();
                    e.html('<i class="far fa-check"></i>'),
                        setTimeout(function () {
                            e.html(t);
                        }, 3e3);
                },
            }
        );
    })(window, document);
