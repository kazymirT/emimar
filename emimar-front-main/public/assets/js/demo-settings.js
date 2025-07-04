function _typeof(e) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
}
((e) => {
  var t, a, o;
  "function" == typeof define && define.amd && (define(e), (t = !0)),
    "object" ===
      ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
      ((module.exports = e()), (t = !0)),
    t ||
      ((a = window.Cookies),
      ((o = window.Cookies = e()).noConflict = function () {
        return (window.Cookies = a), o;
      }));
})(function () {
  function d() {
    for (var e = 0, t = {}; e < arguments.length; e++) {
      var a,
        o = arguments[e];
      for (a in o) t[a] = o[a];
    }
    return t;
  }
  function l(e) {
    return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  return (function e(r) {
    function n() {}
    function a(e, t, a) {
      if ("undefined" != typeof document) {
        "number" == typeof (a = d({ path: "/" }, n.defaults, a)).expires &&
          (a.expires = new Date(+new Date() + 864e5 * a.expires)),
          (a.expires = a.expires ? a.expires.toUTCString() : "");
        try {
          var o = JSON.stringify(t);
          /^[\{\[]/.test(o) && (t = o);
        } catch (e) {}
        (t = r.write
          ? r.write(t, e)
          : encodeURIComponent(String(t)).replace(
              /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
              decodeURIComponent
            )),
          (e = encodeURIComponent(String(e))
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
            .replace(/[\(\)]/g, escape));
        var i,
          s = "";
        for (i in a)
          a[i] &&
            ((s += "; " + i), !0 !== a[i]) &&
            (s += "=" + a[i].split(";")[0]);
        return (document.cookie = e + "=" + t + s);
      }
    }
    function t(e, t) {
      if ("undefined" != typeof document) {
        for (
          var a = {},
            o = document.cookie ? document.cookie.split("; ") : [],
            i = 0;
          i < o.length;
          i++
        ) {
          var s = o[i].split("="),
            n = s.slice(1).join("=");
          t || '"' !== n.charAt(0) || (n = n.slice(1, -1));
          try {
            var d = l(s[0]),
              n = (r.read || r)(n, d) || l(n);
            if (t)
              try {
                n = JSON.parse(n);
              } catch (e) {}
            if (((a[d] = n), e === d)) break;
          } catch (e) {}
        }
        return e ? a[e] : a;
      }
    }
    return (
      (n.set = a),
      (n.get = function (e) {
        return t(e, !1);
      }),
      (n.getJSON = function (e) {
        return t(e, !0);
      }),
      (n.remove = function (e, t) {
        a(e, "", d(t, { expires: -1 }));
      }),
      (n.defaults = {}),
      (n.withConverter = e),
      n
    );
  })(function () {});
}),
  ((n, d) => {
    var r = d("body"),
      l = d("head"),
      m = "#skin-theme",
      u = ".nk-sidebar",
      p = ".nk-apps-sidebar",
      c = ".nk-header",
      f = ["demo3", "non", "cms"],
      s = ["style", "aside", "header", "appside", "skin", "mode"],
      i = "light-mode",
      h = "dark-mode",
      v = ".nk-opt-item",
      y = ".nk-opt-list",
      k = {
        demo3: {
          aside: "is-light",
          header: "is-light",
          appside: "is-theme",
          style: "ui-default",
        },
        non: {
          aside: "is-light",
          header: "is-light",
          appside: "is-theme",
          style: "ui-default",
        },
        cms: {
          aside: "is-light",
          header: "is-light",
          appside: "is-theme",
          style: "ui-default",
        },
      };
    (n.Demo = {
      save: function (e, t) {
        Cookies.set(n.Demo.apps(e), t);
      },
      remove: function (e) {
        Cookies.remove(n.Demo.apps(e));
      },
      current: function (e) {
        return Cookies.get(n.Demo.apps(e));
      },
      apps: function (e) {
        for (
          var t,
            a = window.location.pathname.split("/").map(function (e, t, a) {
              return e.replace("-", "");
            }),
            o = 0,
            i = f;
          o < i.length;
          o++
        ) {
          var s = i[o];
          0 <= a.indexOf(s) && (t = s);
        }
        return e ? e + "_" + t : t;
      },
      style: function (e, t) {
        var a = {
          mode: i + " " + h,
          style: "ui-default ui-clean ui-shady",
          aside: "is-light is-default is-theme is-dark",
          header: "is-light is-default is-theme is-dark",
          appside: "is-light is-default is-theme is-dark",
        };
        return "all" === e
          ? a[t] || ""
          : "any" === e
          ? a.mode +
            " " +
            a.style +
            " " +
            a.aside +
            " " +
            a.header +
            " " +
            appside.header
          : "body" === e
          ? a.mode + " " + a.style
          : "is-default" === e || "ui-default" === e || "is-regular" === e
          ? ""
          : e;
      },
      skins: function (e) {
        return !e || "default" === e ? "theme" : "theme-" + e;
      },
      defs: function (e) {
        var t = n.Demo.apps(),
          t = k[t][e] || "";
        return n.Demo.current(e) ? n.Demo.current(e) : t;
      },
      apply: function () {
        n.Demo.apps();
        for (var e = 0, t = s; e < t.length; e++) {
          var a,
            o,
            i = t[e];
          ("aside" !== i &&
            "header" !== i &&
            "appside" !== i &&
            "style" !== i) ||
            ((a = n.Demo.defs(i)),
            d(
              (o =
                "aside" === i
                  ? u
                  : "appside" === i
                  ? p
                  : "header" === i
                  ? c
                  : r)
            ).removeClass(n.Demo.style("all", i)),
            "ui-default" !== a && "is-default" !== a && d(o).addClass(a)),
            "mode" === i && n.Demo.update(i, n.Demo.current("mode")),
            "skin" === i && n.Demo.update(i, n.Demo.current("skin"));
        }
        n.Demo.update("dir", n.Demo.current("dir"));
      },
      locked: function (e) {
        !0 === e
          ? (d(v + "[data-key=aside]")
              .add(v + "[data-key=header]")
              .add(v + "[data-key=appside]")
              .addClass("disabled"),
            n.Demo.update("skin", "default", !0),
            d(v + "[data-key=skin]").removeClass("active"),
            d(v + "[data-key=skin][data-update=default]").addClass("active"))
          : d(v + "[data-key=aside]")
              .add(v + "[data-key=header]")
              .add(v + "[data-key=appside]")
              .removeClass("disabled");
      },
      update: function (e, t, a) {
        var o,
          i = n.Demo.style(t, e),
          s = n.Demo.style("all", e);
        n.Demo.apps();
        ("aside" !== e && "header" !== e && "appside" !== e) ||
          (d((o = "header" == e ? c : "appside" === e ? p : u)).removeClass(s),
          d(o).addClass(i)),
          "mode" === e &&
            (r.removeClass(s).removeAttr("theme"),
            i === h
              ? (r.addClass(i).attr("theme", "dark"), n.Demo.locked(!0))
              : (r.addClass(i).removeAttr("theme"), n.Demo.locked(!1))),
          "style" === e && (r.removeClass(s), r.addClass(i)),
          "skin" === e &&
            ((o = n.Demo.skins(i)),
            (s = d("#skin-default")
              .attr("href")
              .replace("theme", "skins/" + o)),
            "theme" === o
              ? d(m).remove()
              : 0 < d(m).length
              ? d(m).attr("href", s)
              : l.append(
                  '<link id="skin-theme" rel="stylesheet" href="' + s + '">'
                )),
          !0 === a && n.Demo.save(e, t);
      },
      reset: function () {
        var t = n.Demo.apps();
        r.removeClass(n.Demo.style("body")).removeAttr("theme"),
          d(v).removeClass("active"),
          d(m).remove(),
          d(u).removeClass(n.Demo.style("all", "aside")),
          d(c).removeClass(n.Demo.style("all", "header"));
        for (var e = 0, a = s; e < a.length; e++) {
          var o = a[e];
          d("[data-key='" + o + "']").each(function () {
            var e = d(this).data("update");
            ("aside" !== o &&
              "header" !== o &&
              "appside" !== o &&
              "style" !== o) ||
              (e === k[t][o] && d(this).addClass("active")),
              ("mode" !== o && "skin" !== o) ||
                (e !== i && "default" !== e) ||
                d(this).addClass("active");
          }),
            n.Demo.remove(o);
        }
        d("[data-key='dir']").each(function () {
          d(this).data("update") === n.Demo.current("dir") &&
            d(this).addClass("active");
        }),
          n.Demo.apply();
      },
      load: function () {
        n.Demo.apply(),
          0 < d(v).length &&
            d(v).each(function () {
              var e = d(this).data("update"),
                t = d(this).data("key");
              ("aside" !== t &&
                "header" !== t &&
                "appside" !== t &&
                "style" !== t) ||
                (e === n.Demo.defs(t) &&
                  (d(this).parent(y).find(v).removeClass("active"),
                  d(this).addClass("active"))),
                ("mode" !== t && "skin" !== t && "dir" !== t) ||
                  (e != n.Demo.current("skin") &&
                    e != n.Demo.current("mode") &&
                    e != n.Demo.current("dir")) ||
                  (d(this).parent(y).find(v).removeClass("active"),
                  d(this).addClass("active"));
            });
      },
      trigger: function () {
        d(v).on("click", function (e) {
          e.preventDefault();
          var e = d(this),
            t = e.parent(y),
            a = e.data("update"),
            o = e.data("key");
          n.Demo.update(o, a, !0),
            t.find(v).removeClass("active"),
            e.addClass("active"),
            "dir" == o &&
              setTimeout(function () {
                window.location.reload();
              }, 100);
        }),
          d(".nk-opt-reset > a").on("click", function (e) {
            e.preventDefault(), n.Demo.reset();
          });
      },
      init: function (e) {
        n.Demo.load(), n.Demo.trigger();
      },
    }),
      n.coms.docReady.push(n.Demo.init),
      (n.Promo = function () {
        var t = d(".pmo-st"),
          a = d(".pmo-lv"),
          e = d(".pmo-close");
        0 < e.length &&
          e.on("click", function () {
            var e = Cookies.get("intm-offer");
            return (
              a.removeClass("active"),
              t.addClass("active"),
              null == e &&
                Cookies.set("intm-offer", "true", { expires: 1, path: "" }),
              !1
            );
          }),
          d(window).on("load", function () {
            (null == Cookies.get("intm-offer") ? a : t).addClass("active");
          });
      }),
      n.coms.docReady.push(n.Promo);
  })(NioApp, jQuery);
