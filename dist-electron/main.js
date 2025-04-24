var K0 = Object.defineProperty;
var jp = (e) => {
  throw TypeError(e);
};
var Y0 = (e, t, n) => t in e ? K0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var vi = (e, t, n) => Y0(e, typeof t != "symbol" ? t + "" : t, n), Fp = (e, t, n) => t.has(e) || jp("Cannot " + n);
var we = (e, t, n) => (Fp(e, t, "read from private field"), n ? n.call(e) : t.get(e)), gi = (e, t, n) => t.has(e) ? jp("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), yi = (e, t, n, r) => (Fp(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import In, { ipcMain as me, app as nt, shell as Ds, BrowserWindow as fr, dialog as Km } from "electron";
import Ym, { EventEmitter as X0 } from "events";
import Xr from "crypto";
import Xm from "tty";
import mr, { TextEncoder as J0 } from "util";
import ca from "os";
import Ee from "fs";
import Ve, { Readable as Q0 } from "stream";
import Gt from "url";
import Z0 from "string_decoder";
import eb from "constants";
import fl from "assert";
import pe from "path";
import js from "child_process";
import Ht from "zlib";
import Fs from "http";
import { fileURLToPath as tb } from "node:url";
import le from "node:path";
import ml from "https";
import De from "node:process";
import { promisify as Je, isDeepStrictEqual as nb } from "node:util";
import ce from "node:fs";
import bi from "node:crypto";
import rb from "node:assert";
import Ls from "node:os";
var kt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function la(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jo = {}, Me = {}, kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.CancellationError = kn.CancellationToken = void 0;
const ib = Ym;
class ab extends ib.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Rc());
    const n = () => {
      if (r != null)
        try {
          this.removeListener("cancel", r), r = null;
        } catch {
        }
    };
    let r = null;
    return new Promise((i, a) => {
      let s = null;
      if (r = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          a(new Rc());
        }
      }, this.cancelled) {
        r();
        return;
      }
      this.onCancel(r), t(i, a, (o) => {
        s = o;
      });
    }).then((i) => (n(), i)).catch((i) => {
      throw n(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
kn.CancellationToken = ab;
class Rc extends Error {
  constructor() {
    super("cancelled");
  }
}
kn.CancellationError = Rc;
var ot = {}, Pc = { exports: {} }, Da = { exports: {} }, Fo, Lp;
function sb() {
  if (Lp) return Fo;
  Lp = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, a = r * 365.25;
  Fo = function(u, p) {
    p = p || {};
    var d = typeof u;
    if (d === "string" && u.length > 0)
      return s(u);
    if (d === "number" && isFinite(u))
      return p.long ? c(u) : o(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function s(u) {
    if (u = String(u), !(u.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (p) {
        var d = parseFloat(p[1]), f = (p[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * a;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function o(u) {
    var p = Math.abs(u);
    return p >= r ? Math.round(u / r) + "d" : p >= n ? Math.round(u / n) + "h" : p >= t ? Math.round(u / t) + "m" : p >= e ? Math.round(u / e) + "s" : u + "ms";
  }
  function c(u) {
    var p = Math.abs(u);
    return p >= r ? l(u, p, r, "day") : p >= n ? l(u, p, n, "hour") : p >= t ? l(u, p, t, "minute") : p >= e ? l(u, p, e, "second") : u + " ms";
  }
  function l(u, p, d, f) {
    var h = p >= d * 1.5;
    return Math.round(u / d) + " " + f + (h ? "s" : "");
  }
  return Fo;
}
var Lo, Up;
function Jm() {
  if (Up) return Lo;
  Up = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = l, r.disable = s, r.enable = a, r.enabled = o, r.humanize = sb(), r.destroy = u, Object.keys(t).forEach((p) => {
      r[p] = t[p];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(p) {
      let d = 0;
      for (let f = 0; f < p.length; f++)
        d = (d << 5) - d + p.charCodeAt(f), d |= 0;
      return r.colors[Math.abs(d) % r.colors.length];
    }
    r.selectColor = n;
    function r(p) {
      let d, f = null, h, b;
      function v(...g) {
        if (!v.enabled)
          return;
        const w = v, T = Number(/* @__PURE__ */ new Date()), I = T - (d || T);
        w.diff = I, w.prev = d, w.curr = T, d = T, g[0] = r.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
        let F = 0;
        g[0] = g[0].replace(/%([a-zA-Z%])/g, (U, V) => {
          if (U === "%%")
            return "%";
          F++;
          const _ = r.formatters[V];
          if (typeof _ == "function") {
            const Y = g[F];
            U = _.call(w, Y), g.splice(F, 1), F--;
          }
          return U;
        }), r.formatArgs.call(w, g), (w.log || r.log).apply(w, g);
      }
      return v.namespace = p, v.useColors = r.useColors(), v.color = r.selectColor(p), v.extend = i, v.destroy = r.destroy, Object.defineProperty(v, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => f !== null ? f : (h !== r.namespaces && (h = r.namespaces, b = r.enabled(p)), b),
        set: (g) => {
          f = g;
        }
      }), typeof r.init == "function" && r.init(v), v;
    }
    function i(p, d) {
      const f = r(this.namespace + (typeof d > "u" ? ":" : d) + p);
      return f.log = this.log, f;
    }
    function a(p) {
      r.save(p), r.namespaces = p, r.names = [], r.skips = [];
      let d;
      const f = (typeof p == "string" ? p : "").split(/[\s,]+/), h = f.length;
      for (d = 0; d < h; d++)
        f[d] && (p = f[d].replace(/\*/g, ".*?"), p[0] === "-" ? r.skips.push(new RegExp("^" + p.slice(1) + "$")) : r.names.push(new RegExp("^" + p + "$")));
    }
    function s() {
      const p = [
        ...r.names.map(c),
        ...r.skips.map(c).map((d) => "-" + d)
      ].join(",");
      return r.enable(""), p;
    }
    function o(p) {
      if (p[p.length - 1] === "*")
        return !0;
      let d, f;
      for (d = 0, f = r.skips.length; d < f; d++)
        if (r.skips[d].test(p))
          return !1;
      for (d = 0, f = r.names.length; d < f; d++)
        if (r.names[d].test(p))
          return !0;
      return !1;
    }
    function c(p) {
      return p.toString().substring(2, p.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function l(p) {
      return p instanceof Error ? p.stack || p.message : p;
    }
    function u() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Lo = e, Lo;
}
var Mp;
function ob() {
  return Mp || (Mp = 1, function(e, t) {
    t.formatArgs = r, t.save = i, t.load = a, t.useColors = n, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const l = "color: " + this.color;
      c.splice(1, 0, l, "color: inherit");
      let u = 0, p = 0;
      c[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (u++, d === "%c" && (p = u));
      }), c.splice(p, 0, l);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let c;
      try {
        c = t.storage.getItem("debug");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Jm()(t);
    const { formatters: o } = e.exports;
    o.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (l) {
        return "[UnexpectedJSONParseError]: " + l.message;
      }
    };
  }(Da, Da.exports)), Da.exports;
}
var ja = { exports: {} }, Uo, qp;
function cb() {
  return qp || (qp = 1, Uo = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), Uo;
}
var Mo, Bp;
function lb() {
  if (Bp) return Mo;
  Bp = 1;
  const e = ca, t = Xm, n = cb(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function a(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function s(c, l) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !l && i === void 0)
      return 0;
    const u = i || 0;
    if (r.TERM === "dumb")
      return u;
    if (process.platform === "win32") {
      const p = e.release().split(".");
      return Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((p) => p in r) || r.CI_NAME === "codeship" ? 1 : u;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const p = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return p >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : u;
  }
  function o(c) {
    const l = s(c, c && c.isTTY);
    return a(l);
  }
  return Mo = {
    supportsColor: o,
    stdout: a(s(!0, t.isatty(1))),
    stderr: a(s(!0, t.isatty(2)))
  }, Mo;
}
var zp;
function ub() {
  return zp || (zp = 1, function(e, t) {
    const n = Xm, r = mr;
    t.init = u, t.log = o, t.formatArgs = a, t.save = c, t.load = l, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = lb();
      d && (d.stderr || d).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, f) => {
      const h = f.substring(6).toLowerCase().replace(/_([a-z])/g, (v, g) => g.toUpperCase());
      let b = process.env[f];
      return /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : b === "null" ? b = null : b = Number(b), d[h] = b, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function a(d) {
      const { namespace: f, useColors: h } = this;
      if (h) {
        const b = this.color, v = "\x1B[3" + (b < 8 ? b : "8;5;" + b), g = `  ${v};1m${f} \x1B[0m`;
        d[0] = g + d[0].split(`
`).join(`
` + g), d.push(v + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = s() + f + " " + d[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function o(...d) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function c(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function l() {
      return process.env.DEBUG;
    }
    function u(d) {
      d.inspectOpts = {};
      const f = Object.keys(t.inspectOpts);
      for (let h = 0; h < f.length; h++)
        d.inspectOpts[f[h]] = t.inspectOpts[f[h]];
    }
    e.exports = Jm()(t);
    const { formatters: p } = e.exports;
    p.o = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts).split(`
`).map((f) => f.trim()).join(" ");
    }, p.O = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts);
    };
  }(ja, ja.exports)), ja.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Pc.exports = ob() : Pc.exports = ub();
var Qm = Pc.exports, Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
Jr.newError = pb;
function pb(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
ua.ProgressCallbackTransform = void 0;
const db = Ve;
class fb extends db.Transform {
  constructor(t, n, r) {
    super(), this.total = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
ua.ProgressCallbackTransform = fb;
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.DigestTransform = ot.HttpExecutor = ot.HttpError = void 0;
ot.createHttpError = Oc;
ot.parseJson = wb;
ot.configureRequestOptionsFromUrl = eh;
ot.configureRequestUrl = vl;
ot.safeGetHeader = Mr;
ot.configureRequestOptions = ms;
ot.safeStringifyJson = hs;
const mb = Xr, hb = Qm, vb = Ee, gb = Ve, Zm = Gt, yb = kn, Hp = Jr, bb = ua, xi = (0, hb.default)("electron-builder");
function Oc(e, t = null) {
  return new hl(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + hs(e.headers), t);
}
const xb = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class hl extends Error {
  constructor(t, n = `HTTP error: ${xb.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
ot.HttpError = hl;
function wb(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class fs {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new yb.CancellationToken(), r) {
    ms(t);
    const i = r == null ? void 0 : JSON.stringify(r), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      xi(i);
      const { headers: s, ...o } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": a.length,
          ...s
        },
        ...o
      };
    }
    return this.doApiRequest(t, n, (s) => s.end(a));
  }
  doApiRequest(t, n, r, i = 0) {
    return xi.enabled && xi(`Request: ${hs(t)}`), n.createPromise((a, s, o) => {
      const c = this.createRequest(t, (l) => {
        try {
          this.handleResponse(l, t, n, a, s, i, r);
        } catch (u) {
          s(u);
        }
      });
      this.addErrorAndTimeoutHandlers(c, s, t.timeout), this.addRedirectHandlers(c, t, s, i, (l) => {
        this.doApiRequest(l, n, r, i).then(a).catch(s);
      }), r(c, s), o(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, n, r, i, a) {
  }
  addErrorAndTimeoutHandlers(t, n, r = 60 * 1e3) {
    this.addTimeOutHandler(t, n, r), t.on("error", n), t.on("aborted", () => {
      n(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, n, r, i, a, s, o) {
    var c;
    if (xi.enabled && xi(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${hs(n)}`), t.statusCode === 404) {
      a(Oc(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const l = (c = t.statusCode) !== null && c !== void 0 ? c : 0, u = l >= 300 && l < 400, p = Mr(t, "location");
    if (u && p != null) {
      if (s > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(fs.prepareRedirectUrlOptions(p, n), r, o, s).then(i).catch(a);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", a), t.on("data", (f) => d += f), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const f = Mr(t, "content-type"), h = f != null && (Array.isArray(f) ? f.find((b) => b.includes("json")) != null : f.includes("json"));
          a(Oc(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${h ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (f) {
        a(f);
      }
    });
  }
  async downloadToBuffer(t, n) {
    return await n.cancellationToken.createPromise((r, i, a) => {
      const s = [], o = {
        headers: n.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      vl(t, o), ms(o), this.doDownload(o, {
        destination: null,
        options: n,
        onCancel: a,
        callback: (c) => {
          c == null ? r(Buffer.concat(s)) : i(c);
        },
        responseHandler: (c, l) => {
          let u = 0;
          c.on("data", (p) => {
            if (u += p.length, u > 524288e3) {
              l(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(p);
          }), c.on("end", () => {
            l(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, n, r) {
    const i = this.createRequest(t, (a) => {
      if (a.statusCode >= 400) {
        n.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${a.statusCode}: ${a.statusMessage}`));
        return;
      }
      a.on("error", n.callback);
      const s = Mr(a, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(fs.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? Eb(n, a) : n.responseHandler(a, n.callback);
    });
    this.addErrorAndTimeoutHandlers(i, n.callback, t.timeout), this.addRedirectHandlers(i, t, n.callback, r, (a) => {
      this.doDownload(a, n, r++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, n, r) {
    t.on("socket", (i) => {
      i.setTimeout(r, () => {
        t.abort(), n(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, n) {
    const r = eh(t, { ...n }), i = r.headers;
    if (i != null && i.authorization) {
      const a = new Zm.URL(t);
      (a.hostname.endsWith(".amazonaws.com") || a.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return r;
  }
  static retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return t();
      } catch (i) {
        if (r < n && (i instanceof hl && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
ot.HttpExecutor = fs;
function eh(e, t) {
  const n = ms(t);
  return vl(new Zm.URL(e), n), n;
}
function vl(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Nc extends gb.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, mb.createHash)(n);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, n, r) {
    this.digester.update(t), r(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (n) {
        t(n);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Hp.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Hp.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
ot.DigestTransform = Nc;
function _b(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Mr(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function Eb(e, t) {
  if (!_b(Mr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = Mr(t, "content-length");
    s != null && n.push(new bb.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new Nc(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new Nc(e.options.sha2, "sha256", "hex"));
  const i = (0, vb.createWriteStream)(e.destination);
  n.push(i);
  let a = t;
  for (const s of n)
    s.on("error", (o) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(o);
    }), a = a.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function ms(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function hs(e, t) {
  return JSON.stringify(e, (n, r) => n.endsWith("Authorization") || n.endsWith("authorization") || n.endsWith("Password") || n.endsWith("PASSWORD") || n.endsWith("Token") || n.includes("password") || n.includes("token") || t != null && t.has(n) ? "<stripped sensitive data>" : r, 2);
}
var Us = {};
Object.defineProperty(Us, "__esModule", { value: !0 });
Us.githubUrl = $b;
Us.getS3LikeProviderBaseUrl = Sb;
function $b(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Sb(e) {
  const t = e.provider;
  if (t === "s3")
    return Tb(e);
  if (t === "spaces")
    return Ab(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Tb(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return th(t, e.path);
}
function th(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Ab(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return th(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var gl = {};
Object.defineProperty(gl, "__esModule", { value: !0 });
gl.parseDn = Rb;
function Rb(e) {
  let t = !1, n = null, r = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      n !== null && a.set(n, r);
      break;
    }
    const o = e[s];
    if (t) {
      if (o === '"') {
        t = !1;
        continue;
      }
    } else {
      if (o === '"') {
        t = !0;
        continue;
      }
      if (o === "\\") {
        s++;
        const c = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(c) ? r += e[s] : (s++, r += String.fromCharCode(c));
        continue;
      }
      if (n === null && o === "=") {
        n = r, r = "";
        continue;
      }
      if (o === "," || o === ";" || o === "+") {
        n !== null && a.set(n, r), n = null, r = "";
        continue;
      }
    }
    if (o === " " && !t) {
      if (r.length === 0)
        continue;
      if (s > i) {
        let c = s;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || n === null && e[i] === "=" || n !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    r += o;
  }
  return a;
}
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.nil = Hr.UUID = void 0;
const nh = Xr, rh = Jr, Pb = "options.name must be either a string or a Buffer", Vp = (0, nh.randomBytes)(16);
Vp[0] = Vp[0] | 1;
const ts = {}, de = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  ts[t] = e, de[e] = t;
}
class or {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = or.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return Ob(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Nb(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (ts[t[14] + t[15]] & 240) >> 4,
        variant: Gp((ts[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < n + 16)
        return !1;
      let r = 0;
      for (; r < 16 && t[n + r] === 0; r++)
        ;
      return r === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[n + 6] & 240) >> 4,
        variant: Gp((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, rh.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = ts[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
Hr.UUID = or;
or.OID = or.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Gp(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Li;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Li || (Li = {}));
function Ob(e, t, n, r, i = Li.ASCII) {
  const a = (0, nh.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, rh.newError)(Pb, "ERR_INVALID_UUID_NAME");
  a.update(r), a.update(e);
  const o = a.digest();
  let c;
  switch (i) {
    case Li.BINARY:
      o[6] = o[6] & 15 | n, o[8] = o[8] & 63 | 128, c = o;
      break;
    case Li.OBJECT:
      o[6] = o[6] & 15 | n, o[8] = o[8] & 63 | 128, c = new or(o);
      break;
    default:
      c = de[o[0]] + de[o[1]] + de[o[2]] + de[o[3]] + "-" + de[o[4]] + de[o[5]] + "-" + de[o[6] & 15 | n] + de[o[7]] + "-" + de[o[8] & 63 | 128] + de[o[9]] + "-" + de[o[10]] + de[o[11]] + de[o[12]] + de[o[13]] + de[o[14]] + de[o[15]];
      break;
  }
  return c;
}
function Nb(e) {
  return de[e[0]] + de[e[1]] + de[e[2]] + de[e[3]] + "-" + de[e[4]] + de[e[5]] + "-" + de[e[6]] + de[e[7]] + "-" + de[e[8]] + de[e[9]] + "-" + de[e[10]] + de[e[11]] + de[e[12]] + de[e[13]] + de[e[14]] + de[e[15]];
}
Hr.nil = new or("00000000-0000-0000-0000-000000000000");
var pa = {}, ih = {};
(function(e) {
  (function(t) {
    t.parser = function(y, m) {
      return new r(y, m);
    }, t.SAXParser = r, t.SAXStream = u, t.createStream = l, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function r(y, m) {
      if (!(this instanceof r))
        return new r(y, m);
      var L = this;
      a(L), L.q = L.c = "", L.bufferCheckPosition = t.MAX_BUFFER_LENGTH, L.opt = m || {}, L.opt.lowercase = L.opt.lowercase || L.opt.lowercasetags, L.looseCase = L.opt.lowercase ? "toLowerCase" : "toUpperCase", L.tags = [], L.closed = L.closedRoot = L.sawRoot = !1, L.tag = L.error = null, L.strict = !!y, L.noscript = !!(y || L.opt.noscript), L.state = _.BEGIN, L.strictEntities = L.opt.strictEntities, L.ENTITIES = L.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), L.attribList = [], L.opt.xmlns && (L.ns = Object.create(b)), L.opt.unquotedAttributeValues === void 0 && (L.opt.unquotedAttributeValues = !y), L.trackPosition = L.opt.position !== !1, L.trackPosition && (L.position = L.line = L.column = 0), z(L, "onready");
    }
    Object.create || (Object.create = function(y) {
      function m() {
      }
      m.prototype = y;
      var L = new m();
      return L;
    }), Object.keys || (Object.keys = function(y) {
      var m = [];
      for (var L in y) y.hasOwnProperty(L) && m.push(L);
      return m;
    });
    function i(y) {
      for (var m = Math.max(t.MAX_BUFFER_LENGTH, 10), L = 0, A = 0, ne = n.length; A < ne; A++) {
        var he = y[n[A]].length;
        if (he > m)
          switch (n[A]) {
            case "textNode":
              J(y);
              break;
            case "cdata":
              K(y, "oncdata", y.cdata), y.cdata = "";
              break;
            case "script":
              K(y, "onscript", y.script), y.script = "";
              break;
            default:
              j(y, "Max buffer length exceeded: " + n[A]);
          }
        L = Math.max(L, he);
      }
      var ye = t.MAX_BUFFER_LENGTH - L;
      y.bufferCheckPosition = ye + y.position;
    }
    function a(y) {
      for (var m = 0, L = n.length; m < L; m++)
        y[n[m]] = "";
    }
    function s(y) {
      J(y), y.cdata !== "" && (K(y, "oncdata", y.cdata), y.cdata = ""), y.script !== "" && (K(y, "onscript", y.script), y.script = "");
    }
    r.prototype = {
      end: function() {
        G(this);
      },
      write: q,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var o;
    try {
      o = require("stream").Stream;
    } catch {
      o = function() {
      };
    }
    o || (o = function() {
    });
    var c = t.EVENTS.filter(function(y) {
      return y !== "error" && y !== "end";
    });
    function l(y, m) {
      return new u(y, m);
    }
    function u(y, m) {
      if (!(this instanceof u))
        return new u(y, m);
      o.apply(this), this._parser = new r(y, m), this.writable = !0, this.readable = !0;
      var L = this;
      this._parser.onend = function() {
        L.emit("end");
      }, this._parser.onerror = function(A) {
        L.emit("error", A), L._parser.error = null;
      }, this._decoder = null, c.forEach(function(A) {
        Object.defineProperty(L, "on" + A, {
          get: function() {
            return L._parser["on" + A];
          },
          set: function(ne) {
            if (!ne)
              return L.removeAllListeners(A), L._parser["on" + A] = ne, ne;
            L.on(A, ne);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    u.prototype = Object.create(o.prototype, {
      constructor: {
        value: u
      }
    }), u.prototype.write = function(y) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(y)) {
        if (!this._decoder) {
          var m = Z0.StringDecoder;
          this._decoder = new m("utf8");
        }
        y = this._decoder.write(y);
      }
      return this._parser.write(y.toString()), this.emit("data", y), !0;
    }, u.prototype.end = function(y) {
      return y && y.length && this.write(y), this._parser.end(), !0;
    }, u.prototype.on = function(y, m) {
      var L = this;
      return !L._parser["on" + y] && c.indexOf(y) !== -1 && (L._parser["on" + y] = function() {
        var A = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        A.splice(0, 0, y), L.emit.apply(L, A);
      }), o.prototype.on.call(L, y, m);
    };
    var p = "[CDATA[", d = "DOCTYPE", f = "http://www.w3.org/XML/1998/namespace", h = "http://www.w3.org/2000/xmlns/", b = { xml: f, xmlns: h }, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function I(y) {
      return y === " " || y === `
` || y === "\r" || y === "	";
    }
    function F(y) {
      return y === '"' || y === "'";
    }
    function O(y) {
      return y === ">" || I(y);
    }
    function U(y, m) {
      return y.test(m);
    }
    function V(y, m) {
      return !U(y, m);
    }
    var _ = 0;
    t.STATE = {
      BEGIN: _++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: _++,
      // leading whitespace
      TEXT: _++,
      // general stuff
      TEXT_ENTITY: _++,
      // &amp and such.
      OPEN_WAKA: _++,
      // <
      SGML_DECL: _++,
      // <!BLARG
      SGML_DECL_QUOTED: _++,
      // <!BLARG foo "bar
      DOCTYPE: _++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: _++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: _++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: _++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: _++,
      // <!-
      COMMENT: _++,
      // <!--
      COMMENT_ENDING: _++,
      // <!-- blah -
      COMMENT_ENDED: _++,
      // <!-- blah --
      CDATA: _++,
      // <![CDATA[ something
      CDATA_ENDING: _++,
      // ]
      CDATA_ENDING_2: _++,
      // ]]
      PROC_INST: _++,
      // <?hi
      PROC_INST_BODY: _++,
      // <?hi there
      PROC_INST_ENDING: _++,
      // <?hi "there" ?
      OPEN_TAG: _++,
      // <strong
      OPEN_TAG_SLASH: _++,
      // <strong /
      ATTRIB: _++,
      // <a
      ATTRIB_NAME: _++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: _++,
      // <a foo _
      ATTRIB_VALUE: _++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: _++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: _++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: _++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: _++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: _++,
      // <foo bar=&quot
      CLOSE_TAG: _++,
      // </a
      CLOSE_TAG_SAW_WHITE: _++,
      // </a   >
      SCRIPT: _++,
      // <script> ...
      SCRIPT_ENDING: _++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(y) {
      var m = t.ENTITIES[y], L = typeof m == "number" ? String.fromCharCode(m) : m;
      t.ENTITIES[y] = L;
    });
    for (var Y in t.STATE)
      t.STATE[t.STATE[Y]] = Y;
    _ = t.STATE;
    function z(y, m, L) {
      y[m] && y[m](L);
    }
    function K(y, m, L) {
      y.textNode && J(y), z(y, m, L);
    }
    function J(y) {
      y.textNode = D(y.opt, y.textNode), y.textNode && z(y, "ontext", y.textNode), y.textNode = "";
    }
    function D(y, m) {
      return y.trim && (m = m.trim()), y.normalize && (m = m.replace(/\s+/g, " ")), m;
    }
    function j(y, m) {
      return J(y), y.trackPosition && (m += `
Line: ` + y.line + `
Column: ` + y.column + `
Char: ` + y.c), m = new Error(m), y.error = m, z(y, "onerror", m), y;
    }
    function G(y) {
      return y.sawRoot && !y.closedRoot && N(y, "Unclosed root tag"), y.state !== _.BEGIN && y.state !== _.BEGIN_WHITESPACE && y.state !== _.TEXT && j(y, "Unexpected end"), J(y), y.c = "", y.closed = !0, z(y, "onend"), r.call(y, y.strict, y.opt), y;
    }
    function N(y, m) {
      if (typeof y != "object" || !(y instanceof r))
        throw new Error("bad call to strictFail");
      y.strict && j(y, m);
    }
    function B(y) {
      y.strict || (y.tagName = y.tagName[y.looseCase]());
      var m = y.tags[y.tags.length - 1] || y, L = y.tag = { name: y.tagName, attributes: {} };
      y.opt.xmlns && (L.ns = m.ns), y.attribList.length = 0, K(y, "onopentagstart", L);
    }
    function H(y, m) {
      var L = y.indexOf(":"), A = L < 0 ? ["", y] : y.split(":"), ne = A[0], he = A[1];
      return m && y === "xmlns" && (ne = "xmlns", he = ""), { prefix: ne, local: he };
    }
    function M(y) {
      if (y.strict || (y.attribName = y.attribName[y.looseCase]()), y.attribList.indexOf(y.attribName) !== -1 || y.tag.attributes.hasOwnProperty(y.attribName)) {
        y.attribName = y.attribValue = "";
        return;
      }
      if (y.opt.xmlns) {
        var m = H(y.attribName, !0), L = m.prefix, A = m.local;
        if (L === "xmlns")
          if (A === "xml" && y.attribValue !== f)
            N(
              y,
              "xml: prefix must be bound to " + f + `
Actual: ` + y.attribValue
            );
          else if (A === "xmlns" && y.attribValue !== h)
            N(
              y,
              "xmlns: prefix must be bound to " + h + `
Actual: ` + y.attribValue
            );
          else {
            var ne = y.tag, he = y.tags[y.tags.length - 1] || y;
            ne.ns === he.ns && (ne.ns = Object.create(he.ns)), ne.ns[A] = y.attribValue;
          }
        y.attribList.push([y.attribName, y.attribValue]);
      } else
        y.tag.attributes[y.attribName] = y.attribValue, K(y, "onattribute", {
          name: y.attribName,
          value: y.attribValue
        });
      y.attribName = y.attribValue = "";
    }
    function S(y, m) {
      if (y.opt.xmlns) {
        var L = y.tag, A = H(y.tagName);
        L.prefix = A.prefix, L.local = A.local, L.uri = L.ns[A.prefix] || "", L.prefix && !L.uri && (N(y, "Unbound namespace prefix: " + JSON.stringify(y.tagName)), L.uri = A.prefix);
        var ne = y.tags[y.tags.length - 1] || y;
        L.ns && ne.ns !== L.ns && Object.keys(L.ns).forEach(function(un) {
          K(y, "onopennamespace", {
            prefix: un,
            uri: L.ns[un]
          });
        });
        for (var he = 0, ye = y.attribList.length; he < ye; he++) {
          var Pe = y.attribList[he], Ne = Pe[0], _t = Pe[1], $e = H(Ne, !0), it = $e.prefix, Mn = $e.local, ln = it === "" ? "" : L.ns[it] || "", Kt = {
            name: Ne,
            value: _t,
            prefix: it,
            local: Mn,
            uri: ln
          };
          it && it !== "xmlns" && !ln && (N(y, "Unbound namespace prefix: " + JSON.stringify(it)), Kt.uri = it), y.tag.attributes[Ne] = Kt, K(y, "onattribute", Kt);
        }
        y.attribList.length = 0;
      }
      y.tag.isSelfClosing = !!m, y.sawRoot = !0, y.tags.push(y.tag), K(y, "onopentag", y.tag), m || (!y.noscript && y.tagName.toLowerCase() === "script" ? y.state = _.SCRIPT : y.state = _.TEXT, y.tag = null, y.tagName = ""), y.attribName = y.attribValue = "", y.attribList.length = 0;
    }
    function k(y) {
      if (!y.tagName) {
        N(y, "Weird empty close tag."), y.textNode += "</>", y.state = _.TEXT;
        return;
      }
      if (y.script) {
        if (y.tagName !== "script") {
          y.script += "</" + y.tagName + ">", y.tagName = "", y.state = _.SCRIPT;
          return;
        }
        K(y, "onscript", y.script), y.script = "";
      }
      var m = y.tags.length, L = y.tagName;
      y.strict || (L = L[y.looseCase]());
      for (var A = L; m--; ) {
        var ne = y.tags[m];
        if (ne.name !== A)
          N(y, "Unexpected close tag");
        else
          break;
      }
      if (m < 0) {
        N(y, "Unmatched closing tag: " + y.tagName), y.textNode += "</" + y.tagName + ">", y.state = _.TEXT;
        return;
      }
      y.tagName = L;
      for (var he = y.tags.length; he-- > m; ) {
        var ye = y.tag = y.tags.pop();
        y.tagName = y.tag.name, K(y, "onclosetag", y.tagName);
        var Pe = {};
        for (var Ne in ye.ns)
          Pe[Ne] = ye.ns[Ne];
        var _t = y.tags[y.tags.length - 1] || y;
        y.opt.xmlns && ye.ns !== _t.ns && Object.keys(ye.ns).forEach(function($e) {
          var it = ye.ns[$e];
          K(y, "onclosenamespace", { prefix: $e, uri: it });
        });
      }
      m === 0 && (y.closedRoot = !0), y.tagName = y.attribValue = y.attribName = "", y.attribList.length = 0, y.state = _.TEXT;
    }
    function R(y) {
      var m = y.entity, L = m.toLowerCase(), A, ne = "";
      return y.ENTITIES[m] ? y.ENTITIES[m] : y.ENTITIES[L] ? y.ENTITIES[L] : (m = L, m.charAt(0) === "#" && (m.charAt(1) === "x" ? (m = m.slice(2), A = parseInt(m, 16), ne = A.toString(16)) : (m = m.slice(1), A = parseInt(m, 10), ne = A.toString(10))), m = m.replace(/^0+/, ""), isNaN(A) || ne.toLowerCase() !== m ? (N(y, "Invalid character entity"), "&" + y.entity + ";") : String.fromCodePoint(A));
    }
    function x(y, m) {
      m === "<" ? (y.state = _.OPEN_WAKA, y.startTagPosition = y.position) : I(m) || (N(y, "Non-whitespace before first tag."), y.textNode = m, y.state = _.TEXT);
    }
    function $(y, m) {
      var L = "";
      return m < y.length && (L = y.charAt(m)), L;
    }
    function q(y) {
      var m = this;
      if (this.error)
        throw this.error;
      if (m.closed)
        return j(
          m,
          "Cannot write after close. Assign an onready handler."
        );
      if (y === null)
        return G(m);
      typeof y == "object" && (y = y.toString());
      for (var L = 0, A = ""; A = $(y, L++), m.c = A, !!A; )
        switch (m.trackPosition && (m.position++, A === `
` ? (m.line++, m.column = 0) : m.column++), m.state) {
          case _.BEGIN:
            if (m.state = _.BEGIN_WHITESPACE, A === "\uFEFF")
              continue;
            x(m, A);
            continue;
          case _.BEGIN_WHITESPACE:
            x(m, A);
            continue;
          case _.TEXT:
            if (m.sawRoot && !m.closedRoot) {
              for (var ne = L - 1; A && A !== "<" && A !== "&"; )
                A = $(y, L++), A && m.trackPosition && (m.position++, A === `
` ? (m.line++, m.column = 0) : m.column++);
              m.textNode += y.substring(ne, L - 1);
            }
            A === "<" && !(m.sawRoot && m.closedRoot && !m.strict) ? (m.state = _.OPEN_WAKA, m.startTagPosition = m.position) : (!I(A) && (!m.sawRoot || m.closedRoot) && N(m, "Text data outside of root node."), A === "&" ? m.state = _.TEXT_ENTITY : m.textNode += A);
            continue;
          case _.SCRIPT:
            A === "<" ? m.state = _.SCRIPT_ENDING : m.script += A;
            continue;
          case _.SCRIPT_ENDING:
            A === "/" ? m.state = _.CLOSE_TAG : (m.script += "<" + A, m.state = _.SCRIPT);
            continue;
          case _.OPEN_WAKA:
            if (A === "!")
              m.state = _.SGML_DECL, m.sgmlDecl = "";
            else if (!I(A)) if (U(v, A))
              m.state = _.OPEN_TAG, m.tagName = A;
            else if (A === "/")
              m.state = _.CLOSE_TAG, m.tagName = "";
            else if (A === "?")
              m.state = _.PROC_INST, m.procInstName = m.procInstBody = "";
            else {
              if (N(m, "Unencoded <"), m.startTagPosition + 1 < m.position) {
                var he = m.position - m.startTagPosition;
                A = new Array(he).join(" ") + A;
              }
              m.textNode += "<" + A, m.state = _.TEXT;
            }
            continue;
          case _.SGML_DECL:
            if (m.sgmlDecl + A === "--") {
              m.state = _.COMMENT, m.comment = "", m.sgmlDecl = "";
              continue;
            }
            m.doctype && m.doctype !== !0 && m.sgmlDecl ? (m.state = _.DOCTYPE_DTD, m.doctype += "<!" + m.sgmlDecl + A, m.sgmlDecl = "") : (m.sgmlDecl + A).toUpperCase() === p ? (K(m, "onopencdata"), m.state = _.CDATA, m.sgmlDecl = "", m.cdata = "") : (m.sgmlDecl + A).toUpperCase() === d ? (m.state = _.DOCTYPE, (m.doctype || m.sawRoot) && N(
              m,
              "Inappropriately located doctype declaration"
            ), m.doctype = "", m.sgmlDecl = "") : A === ">" ? (K(m, "onsgmldeclaration", m.sgmlDecl), m.sgmlDecl = "", m.state = _.TEXT) : (F(A) && (m.state = _.SGML_DECL_QUOTED), m.sgmlDecl += A);
            continue;
          case _.SGML_DECL_QUOTED:
            A === m.q && (m.state = _.SGML_DECL, m.q = ""), m.sgmlDecl += A;
            continue;
          case _.DOCTYPE:
            A === ">" ? (m.state = _.TEXT, K(m, "ondoctype", m.doctype), m.doctype = !0) : (m.doctype += A, A === "[" ? m.state = _.DOCTYPE_DTD : F(A) && (m.state = _.DOCTYPE_QUOTED, m.q = A));
            continue;
          case _.DOCTYPE_QUOTED:
            m.doctype += A, A === m.q && (m.q = "", m.state = _.DOCTYPE);
            continue;
          case _.DOCTYPE_DTD:
            A === "]" ? (m.doctype += A, m.state = _.DOCTYPE) : A === "<" ? (m.state = _.OPEN_WAKA, m.startTagPosition = m.position) : F(A) ? (m.doctype += A, m.state = _.DOCTYPE_DTD_QUOTED, m.q = A) : m.doctype += A;
            continue;
          case _.DOCTYPE_DTD_QUOTED:
            m.doctype += A, A === m.q && (m.state = _.DOCTYPE_DTD, m.q = "");
            continue;
          case _.COMMENT:
            A === "-" ? m.state = _.COMMENT_ENDING : m.comment += A;
            continue;
          case _.COMMENT_ENDING:
            A === "-" ? (m.state = _.COMMENT_ENDED, m.comment = D(m.opt, m.comment), m.comment && K(m, "oncomment", m.comment), m.comment = "") : (m.comment += "-" + A, m.state = _.COMMENT);
            continue;
          case _.COMMENT_ENDED:
            A !== ">" ? (N(m, "Malformed comment"), m.comment += "--" + A, m.state = _.COMMENT) : m.doctype && m.doctype !== !0 ? m.state = _.DOCTYPE_DTD : m.state = _.TEXT;
            continue;
          case _.CDATA:
            A === "]" ? m.state = _.CDATA_ENDING : m.cdata += A;
            continue;
          case _.CDATA_ENDING:
            A === "]" ? m.state = _.CDATA_ENDING_2 : (m.cdata += "]" + A, m.state = _.CDATA);
            continue;
          case _.CDATA_ENDING_2:
            A === ">" ? (m.cdata && K(m, "oncdata", m.cdata), K(m, "onclosecdata"), m.cdata = "", m.state = _.TEXT) : A === "]" ? m.cdata += "]" : (m.cdata += "]]" + A, m.state = _.CDATA);
            continue;
          case _.PROC_INST:
            A === "?" ? m.state = _.PROC_INST_ENDING : I(A) ? m.state = _.PROC_INST_BODY : m.procInstName += A;
            continue;
          case _.PROC_INST_BODY:
            if (!m.procInstBody && I(A))
              continue;
            A === "?" ? m.state = _.PROC_INST_ENDING : m.procInstBody += A;
            continue;
          case _.PROC_INST_ENDING:
            A === ">" ? (K(m, "onprocessinginstruction", {
              name: m.procInstName,
              body: m.procInstBody
            }), m.procInstName = m.procInstBody = "", m.state = _.TEXT) : (m.procInstBody += "?" + A, m.state = _.PROC_INST_BODY);
            continue;
          case _.OPEN_TAG:
            U(g, A) ? m.tagName += A : (B(m), A === ">" ? S(m) : A === "/" ? m.state = _.OPEN_TAG_SLASH : (I(A) || N(m, "Invalid character in tag name"), m.state = _.ATTRIB));
            continue;
          case _.OPEN_TAG_SLASH:
            A === ">" ? (S(m, !0), k(m)) : (N(m, "Forward-slash in opening tag not followed by >"), m.state = _.ATTRIB);
            continue;
          case _.ATTRIB:
            if (I(A))
              continue;
            A === ">" ? S(m) : A === "/" ? m.state = _.OPEN_TAG_SLASH : U(v, A) ? (m.attribName = A, m.attribValue = "", m.state = _.ATTRIB_NAME) : N(m, "Invalid attribute name");
            continue;
          case _.ATTRIB_NAME:
            A === "=" ? m.state = _.ATTRIB_VALUE : A === ">" ? (N(m, "Attribute without value"), m.attribValue = m.attribName, M(m), S(m)) : I(A) ? m.state = _.ATTRIB_NAME_SAW_WHITE : U(g, A) ? m.attribName += A : N(m, "Invalid attribute name");
            continue;
          case _.ATTRIB_NAME_SAW_WHITE:
            if (A === "=")
              m.state = _.ATTRIB_VALUE;
            else {
              if (I(A))
                continue;
              N(m, "Attribute without value"), m.tag.attributes[m.attribName] = "", m.attribValue = "", K(m, "onattribute", {
                name: m.attribName,
                value: ""
              }), m.attribName = "", A === ">" ? S(m) : U(v, A) ? (m.attribName = A, m.state = _.ATTRIB_NAME) : (N(m, "Invalid attribute name"), m.state = _.ATTRIB);
            }
            continue;
          case _.ATTRIB_VALUE:
            if (I(A))
              continue;
            F(A) ? (m.q = A, m.state = _.ATTRIB_VALUE_QUOTED) : (m.opt.unquotedAttributeValues || j(m, "Unquoted attribute value"), m.state = _.ATTRIB_VALUE_UNQUOTED, m.attribValue = A);
            continue;
          case _.ATTRIB_VALUE_QUOTED:
            if (A !== m.q) {
              A === "&" ? m.state = _.ATTRIB_VALUE_ENTITY_Q : m.attribValue += A;
              continue;
            }
            M(m), m.q = "", m.state = _.ATTRIB_VALUE_CLOSED;
            continue;
          case _.ATTRIB_VALUE_CLOSED:
            I(A) ? m.state = _.ATTRIB : A === ">" ? S(m) : A === "/" ? m.state = _.OPEN_TAG_SLASH : U(v, A) ? (N(m, "No whitespace between attributes"), m.attribName = A, m.attribValue = "", m.state = _.ATTRIB_NAME) : N(m, "Invalid attribute name");
            continue;
          case _.ATTRIB_VALUE_UNQUOTED:
            if (!O(A)) {
              A === "&" ? m.state = _.ATTRIB_VALUE_ENTITY_U : m.attribValue += A;
              continue;
            }
            M(m), A === ">" ? S(m) : m.state = _.ATTRIB;
            continue;
          case _.CLOSE_TAG:
            if (m.tagName)
              A === ">" ? k(m) : U(g, A) ? m.tagName += A : m.script ? (m.script += "</" + m.tagName, m.tagName = "", m.state = _.SCRIPT) : (I(A) || N(m, "Invalid tagname in closing tag"), m.state = _.CLOSE_TAG_SAW_WHITE);
            else {
              if (I(A))
                continue;
              V(v, A) ? m.script ? (m.script += "</" + A, m.state = _.SCRIPT) : N(m, "Invalid tagname in closing tag.") : m.tagName = A;
            }
            continue;
          case _.CLOSE_TAG_SAW_WHITE:
            if (I(A))
              continue;
            A === ">" ? k(m) : N(m, "Invalid characters in closing tag");
            continue;
          case _.TEXT_ENTITY:
          case _.ATTRIB_VALUE_ENTITY_Q:
          case _.ATTRIB_VALUE_ENTITY_U:
            var ye, Pe;
            switch (m.state) {
              case _.TEXT_ENTITY:
                ye = _.TEXT, Pe = "textNode";
                break;
              case _.ATTRIB_VALUE_ENTITY_Q:
                ye = _.ATTRIB_VALUE_QUOTED, Pe = "attribValue";
                break;
              case _.ATTRIB_VALUE_ENTITY_U:
                ye = _.ATTRIB_VALUE_UNQUOTED, Pe = "attribValue";
                break;
            }
            if (A === ";") {
              var Ne = R(m);
              m.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ne) ? (m.entity = "", m.state = ye, m.write(Ne)) : (m[Pe] += Ne, m.entity = "", m.state = ye);
            } else U(m.entity.length ? T : w, A) ? m.entity += A : (N(m, "Invalid character in entity name"), m[Pe] += "&" + m.entity + A, m.entity = "", m.state = ye);
            continue;
          default:
            throw new Error(m, "Unknown state: " + m.state);
        }
      return m.position >= m.bufferCheckPosition && i(m), m;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var y = String.fromCharCode, m = Math.floor, L = function() {
        var A = 16384, ne = [], he, ye, Pe = -1, Ne = arguments.length;
        if (!Ne)
          return "";
        for (var _t = ""; ++Pe < Ne; ) {
          var $e = Number(arguments[Pe]);
          if (!isFinite($e) || // `NaN`, `+Infinity`, or `-Infinity`
          $e < 0 || // not a valid Unicode code point
          $e > 1114111 || // not a valid Unicode code point
          m($e) !== $e)
            throw RangeError("Invalid code point: " + $e);
          $e <= 65535 ? ne.push($e) : ($e -= 65536, he = ($e >> 10) + 55296, ye = $e % 1024 + 56320, ne.push(he, ye)), (Pe + 1 === Ne || ne.length > A) && (_t += y.apply(null, ne), ne.length = 0);
        }
        return _t;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: L,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = L;
    }();
  })(e);
})(ih);
Object.defineProperty(pa, "__esModule", { value: !0 });
pa.XElement = void 0;
pa.parseXml = Db;
const Cb = ih, Fa = Jr;
class ah {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Fa.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!kb(t))
      throw (0, Fa.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, Fa.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, Fa.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (Wp(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => Wp(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
pa.XElement = ah;
const Ib = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function kb(e) {
  return Ib.test(e);
}
function Wp(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function Db(e) {
  let t = null;
  const n = Cb.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const a = new ah(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const s = r[r.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(a);
    }
    r.push(a);
  }, n.onclosetag = () => {
    r.pop();
  }, n.ontext = (i) => {
    r.length > 0 && (r[r.length - 1].value = i);
  }, n.oncdata = (i) => {
    const a = r[r.length - 1];
    a.value = i, a.isCData = !0;
  }, n.onerror = (i) => {
    throw i;
  }, n.write(e), t;
}
var Ms = {};
Object.defineProperty(Ms, "__esModule", { value: !0 });
Ms.MemoLazy = void 0;
class jb {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && sh(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Ms.MemoLazy = jb;
function sh(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((s) => sh(e[s], t[s]));
  }
  return e === t;
}
var yl = {};
Object.defineProperty(yl, "__esModule", { value: !0 });
yl.retry = oh;
const Fb = kn;
async function oh(e, t, n, r = 0, i = 0, a) {
  var s;
  const o = new Fb.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((s = a == null ? void 0 : a(c)) !== null && s !== void 0) || s) && t > 0 && !o.cancelled)
      return await new Promise((l) => setTimeout(l, n + r * i)), await oh(e, t - 1, n, r, i + 1, a);
    throw c;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = p;
  var t = kn;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var n = ot;
  Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } });
  var r = Us;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return r.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return r.githubUrl;
  } });
  var i = gl;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var a = Hr;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return a.UUID;
  } });
  var s = ua;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var o = pa;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return o.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return o.XElement;
  } });
  var c = Jr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return c.newError;
  } });
  var l = Ms;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return l.MemoLazy;
  } });
  var u = yl;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return u.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function p(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(Me);
var hr = {}, lt = {};
lt.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, a) => i != null ? r(i) : n(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
lt.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var hn = eb, Lb = process.cwd, ns = null, Ub = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return ns || (ns = Lb.call(process)), ns;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Kp = process.chdir;
  process.chdir = function(e) {
    ns = null, Kp.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Kp);
}
var Mb = qb;
function qb(e) {
  hn.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = o(e.stat), e.fstat = o(e.fstat), e.lstat = o(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(u, p, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(u, p, d, f) {
    f && process.nextTick(f);
  }, e.lchownSync = function() {
  }), Ub === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(u) {
    function p(d, f, h) {
      var b = Date.now(), v = 0;
      u(d, f, function g(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - b < 6e4) {
          setTimeout(function() {
            e.stat(f, function(T, I) {
              T && T.code === "ENOENT" ? u(d, f, g) : h(w);
            });
          }, v), v < 100 && (v += 10);
          return;
        }
        h && h(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(p, u), p;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(u) {
    function p(d, f, h, b, v, g) {
      var w;
      if (g && typeof g == "function") {
        var T = 0;
        w = function(I, F, O) {
          if (I && I.code === "EAGAIN" && T < 10)
            return T++, u.call(e, d, f, h, b, v, w);
          g.apply(this, arguments);
        };
      }
      return u.call(e, d, f, h, b, v, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(p, u), p;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(u) {
    return function(p, d, f, h, b) {
      for (var v = 0; ; )
        try {
          return u.call(e, p, d, f, h, b);
        } catch (g) {
          if (g.code === "EAGAIN" && v < 10) {
            v++;
            continue;
          }
          throw g;
        }
    };
  }(e.readSync);
  function t(u) {
    u.lchmod = function(p, d, f) {
      u.open(
        p,
        hn.O_WRONLY | hn.O_SYMLINK,
        d,
        function(h, b) {
          if (h) {
            f && f(h);
            return;
          }
          u.fchmod(b, d, function(v) {
            u.close(b, function(g) {
              f && f(v || g);
            });
          });
        }
      );
    }, u.lchmodSync = function(p, d) {
      var f = u.openSync(p, hn.O_WRONLY | hn.O_SYMLINK, d), h = !0, b;
      try {
        b = u.fchmodSync(f, d), h = !1;
      } finally {
        if (h)
          try {
            u.closeSync(f);
          } catch {
          }
        else
          u.closeSync(f);
      }
      return b;
    };
  }
  function n(u) {
    hn.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(p, d, f, h) {
      u.open(p, hn.O_SYMLINK, function(b, v) {
        if (b) {
          h && h(b);
          return;
        }
        u.futimes(v, d, f, function(g) {
          u.close(v, function(w) {
            h && h(g || w);
          });
        });
      });
    }, u.lutimesSync = function(p, d, f) {
      var h = u.openSync(p, hn.O_SYMLINK), b, v = !0;
      try {
        b = u.futimesSync(h, d, f), v = !1;
      } finally {
        if (v)
          try {
            u.closeSync(h);
          } catch {
          }
        else
          u.closeSync(h);
      }
      return b;
    }) : u.futimes && (u.lutimes = function(p, d, f, h) {
      h && process.nextTick(h);
    }, u.lutimesSync = function() {
    });
  }
  function r(u) {
    return u && function(p, d, f) {
      return u.call(e, p, d, function(h) {
        l(h) && (h = null), f && f.apply(this, arguments);
      });
    };
  }
  function i(u) {
    return u && function(p, d) {
      try {
        return u.call(e, p, d);
      } catch (f) {
        if (!l(f)) throw f;
      }
    };
  }
  function a(u) {
    return u && function(p, d, f, h) {
      return u.call(e, p, d, f, function(b) {
        l(b) && (b = null), h && h.apply(this, arguments);
      });
    };
  }
  function s(u) {
    return u && function(p, d, f) {
      try {
        return u.call(e, p, d, f);
      } catch (h) {
        if (!l(h)) throw h;
      }
    };
  }
  function o(u) {
    return u && function(p, d, f) {
      typeof d == "function" && (f = d, d = null);
      function h(b, v) {
        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)), f && f.apply(this, arguments);
      }
      return d ? u.call(e, p, d, h) : u.call(e, p, h);
    };
  }
  function c(u) {
    return u && function(p, d) {
      var f = d ? u.call(e, p, d) : u.call(e, p);
      return f && (f.uid < 0 && (f.uid += 4294967296), f.gid < 0 && (f.gid += 4294967296)), f;
    };
  }
  function l(u) {
    if (!u || u.code === "ENOSYS")
      return !0;
    var p = !process.getuid || process.getuid() !== 0;
    return !!(p && (u.code === "EINVAL" || u.code === "EPERM"));
  }
}
var Yp = Ve.Stream, Bb = zb;
function zb(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Yp.call(this);
    var a = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), o = 0, c = s.length; o < c; o++) {
      var l = s[o];
      this[l] = i[l];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(u, p) {
      if (u) {
        a.emit("error", u), a.readable = !1;
        return;
      }
      a.fd = p, a.emit("open", p), a._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    Yp.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), s = 0, o = a.length; s < o; s++) {
      var c = a[s];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Hb = Gb, Vb = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Gb(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Vb(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var Te = Ee, Wb = Mb, Kb = Bb, Yb = Hb, La = mr, We, vs;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (We = Symbol.for("graceful-fs.queue"), vs = Symbol.for("graceful-fs.previous")) : (We = "___graceful-fs.queue", vs = "___graceful-fs.previous");
function Xb() {
}
function ch(e, t) {
  Object.defineProperty(e, We, {
    get: function() {
      return t;
    }
  });
}
var rr = Xb;
La.debuglog ? rr = La.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (rr = function() {
  var e = La.format.apply(La, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Te[We]) {
  var Jb = kt[We] || [];
  ch(Te, Jb), Te.close = function(e) {
    function t(n, r) {
      return e.call(Te, n, function(i) {
        i || Xp(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, vs, {
      value: e
    }), t;
  }(Te.close), Te.closeSync = function(e) {
    function t(n) {
      e.apply(Te, arguments), Xp();
    }
    return Object.defineProperty(t, vs, {
      value: e
    }), t;
  }(Te.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    rr(Te[We]), fl.equal(Te[We].length, 0);
  });
}
kt[We] || ch(kt, Te[We]);
var ut = bl(Yb(Te));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Te.__patched && (ut = bl(Te), Te.__patched = !0);
function bl(e) {
  Wb(e), e.gracefulify = bl, e.createReadStream = F, e.createWriteStream = O;
  var t = e.readFile;
  e.readFile = n;
  function n(_, Y, z) {
    return typeof Y == "function" && (z = Y, Y = null), K(_, Y, z);
    function K(J, D, j, G) {
      return t(J, D, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? wr([K, [J, D, j], N, G || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(_, Y, z, K) {
    return typeof z == "function" && (K = z, z = null), J(_, Y, z, K);
    function J(D, j, G, N, B) {
      return r(D, j, G, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? wr([J, [D, j, G, N], H, B || Date.now(), Date.now()]) : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = s);
  function s(_, Y, z, K) {
    return typeof z == "function" && (K = z, z = null), J(_, Y, z, K);
    function J(D, j, G, N, B) {
      return a(D, j, G, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? wr([J, [D, j, G, N], H, B || Date.now(), Date.now()]) : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var o = e.copyFile;
  o && (e.copyFile = c);
  function c(_, Y, z, K) {
    return typeof z == "function" && (K = z, z = 0), J(_, Y, z, K);
    function J(D, j, G, N, B) {
      return o(D, j, G, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? wr([J, [D, j, G, N], H, B || Date.now(), Date.now()]) : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var l = e.readdir;
  e.readdir = p;
  var u = /^v[0-5]\./;
  function p(_, Y, z) {
    typeof Y == "function" && (z = Y, Y = null);
    var K = u.test(process.version) ? function(j, G, N, B) {
      return l(j, J(
        j,
        G,
        N,
        B
      ));
    } : function(j, G, N, B) {
      return l(j, G, J(
        j,
        G,
        N,
        B
      ));
    };
    return K(_, Y, z);
    function J(D, j, G, N) {
      return function(B, H) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? wr([
          K,
          [D, j, G],
          B,
          N || Date.now(),
          Date.now()
        ]) : (H && H.sort && H.sort(), typeof G == "function" && G.call(this, B, H));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = Kb(e);
    g = d.ReadStream, T = d.WriteStream;
  }
  var f = e.ReadStream;
  f && (g.prototype = Object.create(f.prototype), g.prototype.open = w);
  var h = e.WriteStream;
  h && (T.prototype = Object.create(h.prototype), T.prototype.open = I), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return g;
    },
    set: function(_) {
      g = _;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(_) {
      T = _;
    },
    enumerable: !0,
    configurable: !0
  });
  var b = g;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return b;
    },
    set: function(_) {
      b = _;
    },
    enumerable: !0,
    configurable: !0
  });
  var v = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return v;
    },
    set: function(_) {
      v = _;
    },
    enumerable: !0,
    configurable: !0
  });
  function g(_, Y) {
    return this instanceof g ? (f.apply(this, arguments), this) : g.apply(Object.create(g.prototype), arguments);
  }
  function w() {
    var _ = this;
    V(_.path, _.flags, _.mode, function(Y, z) {
      Y ? (_.autoClose && _.destroy(), _.emit("error", Y)) : (_.fd = z, _.emit("open", z), _.read());
    });
  }
  function T(_, Y) {
    return this instanceof T ? (h.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function I() {
    var _ = this;
    V(_.path, _.flags, _.mode, function(Y, z) {
      Y ? (_.destroy(), _.emit("error", Y)) : (_.fd = z, _.emit("open", z));
    });
  }
  function F(_, Y) {
    return new e.ReadStream(_, Y);
  }
  function O(_, Y) {
    return new e.WriteStream(_, Y);
  }
  var U = e.open;
  e.open = V;
  function V(_, Y, z, K) {
    return typeof z == "function" && (K = z, z = null), J(_, Y, z, K);
    function J(D, j, G, N, B) {
      return U(D, j, G, function(H, M) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? wr([J, [D, j, G, N], H, B || Date.now(), Date.now()]) : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  return e;
}
function wr(e) {
  rr("ENQUEUE", e[0].name, e[1]), Te[We].push(e), xl();
}
var Ua;
function Xp() {
  for (var e = Date.now(), t = 0; t < Te[We].length; ++t)
    Te[We][t].length > 2 && (Te[We][t][3] = e, Te[We][t][4] = e);
  xl();
}
function xl() {
  if (clearTimeout(Ua), Ua = void 0, Te[We].length !== 0) {
    var e = Te[We].shift(), t = e[0], n = e[1], r = e[2], i = e[3], a = e[4];
    if (i === void 0)
      rr("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      rr("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var o = Date.now() - a, c = Math.max(a - i, 1), l = Math.min(c * 1.2, 100);
      o >= l ? (rr("RETRY", t.name, n), t.apply(null, n.concat([i]))) : Te[We].push(e);
    }
    Ua === void 0 && (Ua = setTimeout(xl, 0));
  }
}
(function(e) {
  const t = lt.fromCallback, n = ut, r = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof n[i] == "function");
  Object.assign(e, n), r.forEach((i) => {
    e[i] = t(n[i]);
  }), e.exists = function(i, a) {
    return typeof a == "function" ? n.exists(i, a) : new Promise((s) => n.exists(i, s));
  }, e.read = function(i, a, s, o, c, l) {
    return typeof l == "function" ? n.read(i, a, s, o, c, l) : new Promise((u, p) => {
      n.read(i, a, s, o, c, (d, f, h) => {
        if (d) return p(d);
        u({ bytesRead: f, buffer: h });
      });
    });
  }, e.write = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, a, ...s) : new Promise((o, c) => {
      n.write(i, a, ...s, (l, u, p) => {
        if (l) return c(l);
        o({ bytesWritten: u, buffer: p });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, a, ...s) : new Promise((o, c) => {
      n.writev(i, a, ...s, (l, u, p) => {
        if (l) return c(l);
        o({ bytesWritten: u, buffers: p });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(hr);
var wl = {}, lh = {};
const Qb = pe;
lh.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Qb.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const uh = hr, { checkPath: ph } = lh, dh = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
wl.makeDir = async (e, t) => (ph(e), uh.mkdir(e, {
  mode: dh(t),
  recursive: !0
}));
wl.makeDirSync = (e, t) => (ph(e), uh.mkdirSync(e, {
  mode: dh(t),
  recursive: !0
}));
const Zb = lt.fromPromise, { makeDir: ex, makeDirSync: qo } = wl, Bo = Zb(ex);
var Wt = {
  mkdirs: Bo,
  mkdirsSync: qo,
  // alias
  mkdirp: Bo,
  mkdirpSync: qo,
  ensureDir: Bo,
  ensureDirSync: qo
};
const tx = lt.fromPromise, fh = hr;
function nx(e) {
  return fh.access(e).then(() => !0).catch(() => !1);
}
var vr = {
  pathExists: tx(nx),
  pathExistsSync: fh.existsSync
};
const qr = ut;
function rx(e, t, n, r) {
  qr.open(e, "r+", (i, a) => {
    if (i) return r(i);
    qr.futimes(a, t, n, (s) => {
      qr.close(a, (o) => {
        r && r(s || o);
      });
    });
  });
}
function ix(e, t, n) {
  const r = qr.openSync(e, "r+");
  return qr.futimesSync(r, t, n), qr.closeSync(r);
}
var mh = {
  utimesMillis: rx,
  utimesMillisSync: ix
};
const Vr = hr, Le = pe, ax = mr;
function sx(e, t, n) {
  const r = n.dereference ? (i) => Vr.stat(i, { bigint: !0 }) : (i) => Vr.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function ox(e, t, n) {
  let r;
  const i = n.dereference ? (s) => Vr.statSync(s, { bigint: !0 }) : (s) => Vr.lstatSync(s, { bigint: !0 }), a = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: a, destStat: null };
    throw s;
  }
  return { srcStat: a, destStat: r };
}
function cx(e, t, n, r, i) {
  ax.callbackify(sx)(e, t, r, (a, s) => {
    if (a) return i(a);
    const { srcStat: o, destStat: c } = s;
    if (c) {
      if (da(o, c)) {
        const l = Le.basename(e), u = Le.basename(t);
        return n === "move" && l !== u && l.toLowerCase() === u.toLowerCase() ? i(null, { srcStat: o, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (o.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!o.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return o.isDirectory() && _l(e, t) ? i(new Error(qs(e, t, n))) : i(null, { srcStat: o, destStat: c });
  });
}
function lx(e, t, n, r) {
  const { srcStat: i, destStat: a } = ox(e, t, r);
  if (a) {
    if (da(i, a)) {
      const s = Le.basename(e), o = Le.basename(t);
      if (n === "move" && s !== o && s.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && _l(e, t))
    throw new Error(qs(e, t, n));
  return { srcStat: i, destStat: a };
}
function hh(e, t, n, r, i) {
  const a = Le.resolve(Le.dirname(e)), s = Le.resolve(Le.dirname(n));
  if (s === a || s === Le.parse(s).root) return i();
  Vr.stat(s, { bigint: !0 }, (o, c) => o ? o.code === "ENOENT" ? i() : i(o) : da(t, c) ? i(new Error(qs(e, n, r))) : hh(e, t, s, r, i));
}
function vh(e, t, n, r) {
  const i = Le.resolve(Le.dirname(e)), a = Le.resolve(Le.dirname(n));
  if (a === i || a === Le.parse(a).root) return;
  let s;
  try {
    s = Vr.statSync(a, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (da(t, s))
    throw new Error(qs(e, n, r));
  return vh(e, t, a, r);
}
function da(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function _l(e, t) {
  const n = Le.resolve(e).split(Le.sep).filter((i) => i), r = Le.resolve(t).split(Le.sep).filter((i) => i);
  return n.reduce((i, a, s) => i && r[s] === a, !0);
}
function qs(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Qr = {
  checkPaths: cx,
  checkPathsSync: lx,
  checkParentPaths: hh,
  checkParentPathsSync: vh,
  isSrcSubdir: _l,
  areIdentical: da
};
const mt = ut, Wi = pe, ux = Wt.mkdirs, px = vr.pathExists, dx = mh.utimesMillis, Ki = Qr;
function fx(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Ki.checkPaths(e, t, "copy", n, (i, a) => {
    if (i) return r(i);
    const { srcStat: s, destStat: o } = a;
    Ki.checkParentPaths(e, s, t, "copy", (c) => c ? r(c) : n.filter ? gh(Jp, o, e, t, n, r) : Jp(o, e, t, n, r));
  });
}
function Jp(e, t, n, r, i) {
  const a = Wi.dirname(n);
  px(a, (s, o) => {
    if (s) return i(s);
    if (o) return gs(e, t, n, r, i);
    ux(a, (c) => c ? i(c) : gs(e, t, n, r, i));
  });
}
function gh(e, t, n, r, i, a) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, a) : a(), (s) => a(s));
}
function mx(e, t, n, r, i) {
  return r.filter ? gh(gs, e, t, n, r, i) : gs(e, t, n, r, i);
}
function gs(e, t, n, r, i) {
  (r.dereference ? mt.stat : mt.lstat)(t, (s, o) => s ? i(s) : o.isDirectory() ? wx(o, e, t, n, r, i) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? hx(o, e, t, n, r, i) : o.isSymbolicLink() ? $x(e, t, n, r, i) : o.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : o.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function hx(e, t, n, r, i, a) {
  return t ? vx(e, n, r, i, a) : yh(e, n, r, i, a);
}
function vx(e, t, n, r, i) {
  if (r.overwrite)
    mt.unlink(n, (a) => a ? i(a) : yh(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function yh(e, t, n, r, i) {
  mt.copyFile(t, n, (a) => a ? i(a) : r.preserveTimestamps ? gx(e.mode, t, n, i) : Bs(n, e.mode, i));
}
function gx(e, t, n, r) {
  return yx(e) ? bx(n, e, (i) => i ? r(i) : Qp(e, t, n, r)) : Qp(e, t, n, r);
}
function yx(e) {
  return (e & 128) === 0;
}
function bx(e, t, n) {
  return Bs(e, t | 128, n);
}
function Qp(e, t, n, r) {
  xx(t, n, (i) => i ? r(i) : Bs(n, e, r));
}
function Bs(e, t, n) {
  return mt.chmod(e, t, n);
}
function xx(e, t, n) {
  mt.stat(e, (r, i) => r ? n(r) : dx(t, i.atime, i.mtime, n));
}
function wx(e, t, n, r, i, a) {
  return t ? bh(n, r, i, a) : _x(e.mode, n, r, i, a);
}
function _x(e, t, n, r, i) {
  mt.mkdir(n, (a) => {
    if (a) return i(a);
    bh(t, n, r, (s) => s ? i(s) : Bs(n, e, i));
  });
}
function bh(e, t, n, r) {
  mt.readdir(e, (i, a) => i ? r(i) : xh(a, e, t, n, r));
}
function xh(e, t, n, r, i) {
  const a = e.pop();
  return a ? Ex(e, a, t, n, r, i) : i();
}
function Ex(e, t, n, r, i, a) {
  const s = Wi.join(n, t), o = Wi.join(r, t);
  Ki.checkPaths(s, o, "copy", i, (c, l) => {
    if (c) return a(c);
    const { destStat: u } = l;
    mx(u, s, o, i, (p) => p ? a(p) : xh(e, n, r, i, a));
  });
}
function $x(e, t, n, r, i) {
  mt.readlink(t, (a, s) => {
    if (a) return i(a);
    if (r.dereference && (s = Wi.resolve(process.cwd(), s)), e)
      mt.readlink(n, (o, c) => o ? o.code === "EINVAL" || o.code === "UNKNOWN" ? mt.symlink(s, n, i) : i(o) : (r.dereference && (c = Wi.resolve(process.cwd(), c)), Ki.isSrcSubdir(s, c) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Ki.isSrcSubdir(c, s) ? i(new Error(`Cannot overwrite '${c}' with '${s}'.`)) : Sx(s, n, i)));
    else
      return mt.symlink(s, n, i);
  });
}
function Sx(e, t, n) {
  mt.unlink(t, (r) => r ? n(r) : mt.symlink(e, t, n));
}
var Tx = fx;
const tt = ut, Yi = pe, Ax = Wt.mkdirsSync, Rx = mh.utimesMillisSync, Xi = Qr;
function Px(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = Xi.checkPathsSync(e, t, "copy", n);
  return Xi.checkParentPathsSync(e, r, t, "copy"), Ox(i, e, t, n);
}
function Ox(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = Yi.dirname(n);
  return tt.existsSync(i) || Ax(i), wh(e, t, n, r);
}
function Nx(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return wh(e, t, n, r);
}
function wh(e, t, n, r) {
  const a = (r.dereference ? tt.statSync : tt.lstatSync)(t);
  if (a.isDirectory()) return Lx(a, e, t, n, r);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return Cx(a, e, t, n, r);
  if (a.isSymbolicLink()) return qx(e, t, n, r);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Cx(e, t, n, r, i) {
  return t ? Ix(e, n, r, i) : _h(e, n, r, i);
}
function Ix(e, t, n, r) {
  if (r.overwrite)
    return tt.unlinkSync(n), _h(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function _h(e, t, n, r) {
  return tt.copyFileSync(t, n), r.preserveTimestamps && kx(e.mode, t, n), El(n, e.mode);
}
function kx(e, t, n) {
  return Dx(e) && jx(n, e), Fx(t, n);
}
function Dx(e) {
  return (e & 128) === 0;
}
function jx(e, t) {
  return El(e, t | 128);
}
function El(e, t) {
  return tt.chmodSync(e, t);
}
function Fx(e, t) {
  const n = tt.statSync(e);
  return Rx(t, n.atime, n.mtime);
}
function Lx(e, t, n, r, i) {
  return t ? Eh(n, r, i) : Ux(e.mode, n, r, i);
}
function Ux(e, t, n, r) {
  return tt.mkdirSync(n), Eh(t, n, r), El(n, e);
}
function Eh(e, t, n) {
  tt.readdirSync(e).forEach((r) => Mx(r, e, t, n));
}
function Mx(e, t, n, r) {
  const i = Yi.join(t, e), a = Yi.join(n, e), { destStat: s } = Xi.checkPathsSync(i, a, "copy", r);
  return Nx(s, i, a, r);
}
function qx(e, t, n, r) {
  let i = tt.readlinkSync(t);
  if (r.dereference && (i = Yi.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = tt.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return tt.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (a = Yi.resolve(process.cwd(), a)), Xi.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (tt.statSync(n).isDirectory() && Xi.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return Bx(i, n);
  } else
    return tt.symlinkSync(i, n);
}
function Bx(e, t) {
  return tt.unlinkSync(t), tt.symlinkSync(e, t);
}
var zx = Px;
const Hx = lt.fromCallback;
var $l = {
  copy: Hx(Tx),
  copySync: zx
};
const Zp = ut, $h = pe, ge = fl, Ji = process.platform === "win32";
function Sh(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Zp[n], n = n + "Sync", e[n] = e[n] || Zp[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Sl(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), ge(e, "rimraf: missing path"), ge.strictEqual(typeof e, "string", "rimraf: path should be a string"), ge.strictEqual(typeof n, "function", "rimraf: callback function required"), ge(t, "rimraf: invalid options argument provided"), ge.strictEqual(typeof t, "object", "rimraf: options should be object"), Sh(t), ed(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => ed(e, t, i), s);
      }
      a.code === "ENOENT" && (a = null);
    }
    n(a);
  });
}
function ed(e, t, n) {
  ge(e), ge(t), ge(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Ji)
      return td(e, t, r, n);
    if (i && i.isDirectory())
      return rs(e, t, r, n);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return n(null);
        if (a.code === "EPERM")
          return Ji ? td(e, t, a, n) : rs(e, t, a, n);
        if (a.code === "EISDIR")
          return rs(e, t, a, n);
      }
      return n(a);
    });
  });
}
function td(e, t, n, r) {
  ge(e), ge(t), ge(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (a, s) => {
      a ? r(a.code === "ENOENT" ? null : n) : s.isDirectory() ? rs(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function nd(e, t, n) {
  let r;
  ge(e), ge(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  try {
    r = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  r.isDirectory() ? is(e, t, n) : t.unlinkSync(e);
}
function rs(e, t, n, r) {
  ge(e), ge(t), ge(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Vx(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function Vx(e, t, n) {
  ge(e), ge(t), ge(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let a = i.length, s;
    if (a === 0) return t.rmdir(e, n);
    i.forEach((o) => {
      Sl($h.join(e, o), t, (c) => {
        if (!s) {
          if (c) return n(s = c);
          --a === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function Th(e, t) {
  let n;
  t = t || {}, Sh(t), ge(e, "rimraf: missing path"), ge.strictEqual(typeof e, "string", "rimraf: path should be a string"), ge(t, "rimraf: missing options"), ge.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Ji && nd(e, t, r);
  }
  try {
    n && n.isDirectory() ? is(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Ji ? nd(e, t, r) : is(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    is(e, t, r);
  }
}
function is(e, t, n) {
  ge(e), ge(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Gx(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Gx(e, t) {
  if (ge(e), ge(t), t.readdirSync(e).forEach((n) => Th($h.join(e, n), t)), Ji) {
    const n = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - n < 500);
  } else
    return t.rmdirSync(e, t);
}
var Wx = Sl;
Sl.sync = Th;
const ys = ut, Kx = lt.fromCallback, Ah = Wx;
function Yx(e, t) {
  if (ys.rm) return ys.rm(e, { recursive: !0, force: !0 }, t);
  Ah(e, t);
}
function Xx(e) {
  if (ys.rmSync) return ys.rmSync(e, { recursive: !0, force: !0 });
  Ah.sync(e);
}
var zs = {
  remove: Kx(Yx),
  removeSync: Xx
};
const Jx = lt.fromPromise, Rh = hr, Ph = pe, Oh = Wt, Nh = zs, rd = Jx(async function(t) {
  let n;
  try {
    n = await Rh.readdir(t);
  } catch {
    return Oh.mkdirs(t);
  }
  return Promise.all(n.map((r) => Nh.remove(Ph.join(t, r))));
});
function id(e) {
  let t;
  try {
    t = Rh.readdirSync(e);
  } catch {
    return Oh.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = Ph.join(e, n), Nh.removeSync(n);
  });
}
var Qx = {
  emptyDirSync: id,
  emptydirSync: id,
  emptyDir: rd,
  emptydir: rd
};
const Zx = lt.fromCallback, Ch = pe, An = ut, Ih = Wt;
function ew(e, t) {
  function n() {
    An.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  An.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const a = Ch.dirname(e);
    An.stat(a, (s, o) => {
      if (s)
        return s.code === "ENOENT" ? Ih.mkdirs(a, (c) => {
          if (c) return t(c);
          n();
        }) : t(s);
      o.isDirectory() ? n() : An.readdir(a, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function tw(e) {
  let t;
  try {
    t = An.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Ch.dirname(e);
  try {
    An.statSync(n).isDirectory() || An.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") Ih.mkdirsSync(n);
    else throw r;
  }
  An.writeFileSync(e, "");
}
var nw = {
  createFile: Zx(ew),
  createFileSync: tw
};
const rw = lt.fromCallback, kh = pe, $n = ut, Dh = Wt, iw = vr.pathExists, { areIdentical: jh } = Qr;
function aw(e, t, n) {
  function r(i, a) {
    $n.link(i, a, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  $n.lstat(t, (i, a) => {
    $n.lstat(e, (s, o) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (a && jh(o, a)) return n(null);
      const c = kh.dirname(t);
      iw(c, (l, u) => {
        if (l) return n(l);
        if (u) return r(e, t);
        Dh.mkdirs(c, (p) => {
          if (p) return n(p);
          r(e, t);
        });
      });
    });
  });
}
function sw(e, t) {
  let n;
  try {
    n = $n.lstatSync(t);
  } catch {
  }
  try {
    const a = $n.lstatSync(e);
    if (n && jh(a, n)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const r = kh.dirname(t);
  return $n.existsSync(r) || Dh.mkdirsSync(r), $n.linkSync(e, t);
}
var ow = {
  createLink: rw(aw),
  createLinkSync: sw
};
const Rn = pe, Ui = ut, cw = vr.pathExists;
function lw(e, t, n) {
  if (Rn.isAbsolute(e))
    return Ui.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = Rn.dirname(t), i = Rn.join(r, e);
    return cw(i, (a, s) => a ? n(a) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : Ui.lstat(e, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), n(o)) : n(null, {
      toCwd: e,
      toDst: Rn.relative(r, e)
    })));
  }
}
function uw(e, t) {
  let n;
  if (Rn.isAbsolute(e)) {
    if (n = Ui.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = Rn.dirname(t), i = Rn.join(r, e);
    if (n = Ui.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = Ui.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Rn.relative(r, e)
    };
  }
}
var pw = {
  symlinkPaths: lw,
  symlinkPathsSync: uw
};
const Fh = ut;
function dw(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  Fh.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function fw(e, t) {
  let n;
  if (t) return t;
  try {
    n = Fh.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var mw = {
  symlinkType: dw,
  symlinkTypeSync: fw
};
const hw = lt.fromCallback, Lh = pe, Ct = hr, Uh = Wt, vw = Uh.mkdirs, gw = Uh.mkdirsSync, Mh = pw, yw = Mh.symlinkPaths, bw = Mh.symlinkPathsSync, qh = mw, xw = qh.symlinkType, ww = qh.symlinkTypeSync, _w = vr.pathExists, { areIdentical: Bh } = Qr;
function Ew(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, Ct.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      Ct.stat(e),
      Ct.stat(t)
    ]).then(([s, o]) => {
      if (Bh(s, o)) return r(null);
      ad(e, t, n, r);
    }) : ad(e, t, n, r);
  });
}
function ad(e, t, n, r) {
  yw(e, t, (i, a) => {
    if (i) return r(i);
    e = a.toDst, xw(a.toCwd, n, (s, o) => {
      if (s) return r(s);
      const c = Lh.dirname(t);
      _w(c, (l, u) => {
        if (l) return r(l);
        if (u) return Ct.symlink(e, t, o, r);
        vw(c, (p) => {
          if (p) return r(p);
          Ct.symlink(e, t, o, r);
        });
      });
    });
  });
}
function $w(e, t, n) {
  let r;
  try {
    r = Ct.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const o = Ct.statSync(e), c = Ct.statSync(t);
    if (Bh(o, c)) return;
  }
  const i = bw(e, t);
  e = i.toDst, n = ww(i.toCwd, n);
  const a = Lh.dirname(t);
  return Ct.existsSync(a) || gw(a), Ct.symlinkSync(e, t, n);
}
var Sw = {
  createSymlink: hw(Ew),
  createSymlinkSync: $w
};
const { createFile: sd, createFileSync: od } = nw, { createLink: cd, createLinkSync: ld } = ow, { createSymlink: ud, createSymlinkSync: pd } = Sw;
var Tw = {
  // file
  createFile: sd,
  createFileSync: od,
  ensureFile: sd,
  ensureFileSync: od,
  // link
  createLink: cd,
  createLinkSync: ld,
  ensureLink: cd,
  ensureLinkSync: ld,
  // symlink
  createSymlink: ud,
  createSymlinkSync: pd,
  ensureSymlink: ud,
  ensureSymlinkSync: pd
};
function Aw(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const a = n ? t : "";
  return JSON.stringify(e, r, i).replace(/\n/g, t) + a;
}
function Rw(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Tl = { stringify: Aw, stripBom: Rw };
let Gr;
try {
  Gr = ut;
} catch {
  Gr = Ee;
}
const Hs = lt, { stringify: zh, stripBom: Hh } = Tl;
async function Pw(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Gr, r = "throws" in t ? t.throws : !0;
  let i = await Hs.fromCallback(n.readFile)(e, t);
  i = Hh(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (r)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return a;
}
const Ow = Hs.fromPromise(Pw);
function Nw(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Gr, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Hh(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Cw(e, t, n = {}) {
  const r = n.fs || Gr, i = zh(t, n);
  await Hs.fromCallback(r.writeFile)(e, i, n);
}
const Iw = Hs.fromPromise(Cw);
function kw(e, t, n = {}) {
  const r = n.fs || Gr, i = zh(t, n);
  return r.writeFileSync(e, i, n);
}
const Dw = {
  readFile: Ow,
  readFileSync: Nw,
  writeFile: Iw,
  writeFileSync: kw
};
var jw = Dw;
const Ma = jw;
var Fw = {
  // jsonfile exports
  readJson: Ma.readFile,
  readJsonSync: Ma.readFileSync,
  writeJson: Ma.writeFile,
  writeJsonSync: Ma.writeFileSync
};
const Lw = lt.fromCallback, Mi = ut, Vh = pe, Gh = Wt, Uw = vr.pathExists;
function Mw(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Vh.dirname(e);
  Uw(i, (a, s) => {
    if (a) return r(a);
    if (s) return Mi.writeFile(e, t, n, r);
    Gh.mkdirs(i, (o) => {
      if (o) return r(o);
      Mi.writeFile(e, t, n, r);
    });
  });
}
function qw(e, ...t) {
  const n = Vh.dirname(e);
  if (Mi.existsSync(n))
    return Mi.writeFileSync(e, ...t);
  Gh.mkdirsSync(n), Mi.writeFileSync(e, ...t);
}
var Al = {
  outputFile: Lw(Mw),
  outputFileSync: qw
};
const { stringify: Bw } = Tl, { outputFile: zw } = Al;
async function Hw(e, t, n = {}) {
  const r = Bw(t, n);
  await zw(e, r, n);
}
var Vw = Hw;
const { stringify: Gw } = Tl, { outputFileSync: Ww } = Al;
function Kw(e, t, n) {
  const r = Gw(t, n);
  Ww(e, r, n);
}
var Yw = Kw;
const Xw = lt.fromPromise, ct = Fw;
ct.outputJson = Xw(Vw);
ct.outputJsonSync = Yw;
ct.outputJSON = ct.outputJson;
ct.outputJSONSync = ct.outputJsonSync;
ct.writeJSON = ct.writeJson;
ct.writeJSONSync = ct.writeJsonSync;
ct.readJSON = ct.readJson;
ct.readJSONSync = ct.readJsonSync;
var Jw = ct;
const Qw = ut, Cc = pe, Zw = $l.copy, Wh = zs.remove, e_ = Wt.mkdirp, t_ = vr.pathExists, dd = Qr;
function n_(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  dd.checkPaths(e, t, "move", n, (a, s) => {
    if (a) return r(a);
    const { srcStat: o, isChangingCase: c = !1 } = s;
    dd.checkParentPaths(e, o, t, "move", (l) => {
      if (l) return r(l);
      if (r_(t)) return fd(e, t, i, c, r);
      e_(Cc.dirname(t), (u) => u ? r(u) : fd(e, t, i, c, r));
    });
  });
}
function r_(e) {
  const t = Cc.dirname(e);
  return Cc.parse(t).root === t;
}
function fd(e, t, n, r, i) {
  if (r) return zo(e, t, n, i);
  if (n)
    return Wh(t, (a) => a ? i(a) : zo(e, t, n, i));
  t_(t, (a, s) => a ? i(a) : s ? i(new Error("dest already exists.")) : zo(e, t, n, i));
}
function zo(e, t, n, r) {
  Qw.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : i_(e, t, n, r) : r());
}
function i_(e, t, n, r) {
  Zw(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (a) => a ? r(a) : Wh(e, r));
}
var a_ = n_;
const Kh = ut, Ic = pe, s_ = $l.copySync, Yh = zs.removeSync, o_ = Wt.mkdirpSync, md = Qr;
function c_(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = md.checkPathsSync(e, t, "move", n);
  return md.checkParentPathsSync(e, i, t, "move"), l_(t) || o_(Ic.dirname(t)), u_(e, t, r, a);
}
function l_(e) {
  const t = Ic.dirname(e);
  return Ic.parse(t).root === t;
}
function u_(e, t, n, r) {
  if (r) return Ho(e, t, n);
  if (n)
    return Yh(t), Ho(e, t, n);
  if (Kh.existsSync(t)) throw new Error("dest already exists.");
  return Ho(e, t, n);
}
function Ho(e, t, n) {
  try {
    Kh.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return p_(e, t, n);
  }
}
function p_(e, t, n) {
  return s_(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Yh(e);
}
var d_ = c_;
const f_ = lt.fromCallback;
var m_ = {
  move: f_(a_),
  moveSync: d_
}, Un = {
  // Export promiseified graceful-fs:
  ...hr,
  // Export extra methods:
  ...$l,
  ...Qx,
  ...Tw,
  ...Jw,
  ...Wt,
  ...m_,
  ...Al,
  ...vr,
  ...zs
}, wi = {}, Wn = {}, Ye = {}, Rl = {}, Dt = {};
function Xh(e) {
  return typeof e > "u" || e === null;
}
function h_(e) {
  return typeof e == "object" && e !== null;
}
function v_(e) {
  return Array.isArray(e) ? e : Xh(e) ? [] : [e];
}
function g_(e, t) {
  var n, r, i, a;
  if (t)
    for (a = Object.keys(t), n = 0, r = a.length; n < r; n += 1)
      i = a[n], e[i] = t[i];
  return e;
}
function y_(e, t) {
  var n = "", r;
  for (r = 0; r < t; r += 1)
    n += e;
  return n;
}
function b_(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Dt.isNothing = Xh;
Dt.isObject = h_;
Dt.toArray = v_;
Dt.repeat = y_;
Dt.isNegativeZero = b_;
Dt.extend = g_;
function Jh(e, t) {
  var n = "", r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function Qi(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Jh(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Qi.prototype = Object.create(Error.prototype);
Qi.prototype.constructor = Qi;
Qi.prototype.toString = function(t) {
  return this.name + ": " + Jh(this, t);
};
var fa = Qi, ki = Dt;
function Vo(e, t, n, r, i) {
  var a = "", s = "", o = Math.floor(i / 2) - 1;
  return r - t > o && (a = " ... ", t = r - o + a.length), n - r > o && (s = " ...", n = r + o - s.length), {
    str: a + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + a.length
    // relative position
  };
}
function Go(e, t) {
  return ki.repeat(" ", t - e.length) + e;
}
function x_(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, r = [0], i = [], a, s = -1; a = n.exec(e.buffer); )
    i.push(a.index), r.push(a.index + a[0].length), e.position <= a.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var o = "", c, l, u = Math.min(e.line + t.linesAfter, i.length).toString().length, p = t.maxLength - (t.indent + u + 3);
  for (c = 1; c <= t.linesBefore && !(s - c < 0); c++)
    l = Vo(
      e.buffer,
      r[s - c],
      i[s - c],
      e.position - (r[s] - r[s - c]),
      p
    ), o = ki.repeat(" ", t.indent) + Go((e.line - c + 1).toString(), u) + " | " + l.str + `
` + o;
  for (l = Vo(e.buffer, r[s], i[s], e.position, p), o += ki.repeat(" ", t.indent) + Go((e.line + 1).toString(), u) + " | " + l.str + `
`, o += ki.repeat("-", t.indent + u + 3 + l.pos) + `^
`, c = 1; c <= t.linesAfter && !(s + c >= i.length); c++)
    l = Vo(
      e.buffer,
      r[s + c],
      i[s + c],
      e.position - (r[s] - r[s + c]),
      p
    ), o += ki.repeat(" ", t.indent) + Go((e.line + c + 1).toString(), u) + " | " + l.str + `
`;
  return o.replace(/\n$/, "");
}
var w_ = x_, hd = fa, __ = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], E_ = [
  "scalar",
  "sequence",
  "mapping"
];
function $_(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function S_(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (__.indexOf(n) === -1)
      throw new hd('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = $_(t.styleAliases || null), E_.indexOf(this.kind) === -1)
    throw new hd('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var pt = S_, _i = fa, Wo = pt;
function vd(e, t) {
  var n = [];
  return e[t].forEach(function(r) {
    var i = n.length;
    n.forEach(function(a, s) {
      a.tag === r.tag && a.kind === r.kind && a.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function T_() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, n;
  function r(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(r);
  return e;
}
function kc(e) {
  return this.extend(e);
}
kc.prototype.extend = function(t) {
  var n = [], r = [];
  if (t instanceof Wo)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new _i("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(a) {
    if (!(a instanceof Wo))
      throw new _i("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new _i("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new _i("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(a) {
    if (!(a instanceof Wo))
      throw new _i("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(kc.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = vd(i, "implicit"), i.compiledExplicit = vd(i, "explicit"), i.compiledTypeMap = T_(i.compiledImplicit, i.compiledExplicit), i;
};
var Qh = kc, A_ = pt, Zh = new A_("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), R_ = pt, ev = new R_("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), P_ = pt, tv = new P_("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), O_ = Qh, nv = new O_({
  explicit: [
    Zh,
    ev,
    tv
  ]
}), N_ = pt;
function C_(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function I_() {
  return null;
}
function k_(e) {
  return e === null;
}
var rv = new N_("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: C_,
  construct: I_,
  predicate: k_,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), D_ = pt;
function j_(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function F_(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function L_(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var iv = new D_("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: j_,
  construct: F_,
  predicate: L_,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), U_ = Dt, M_ = pt;
function q_(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function B_(e) {
  return 48 <= e && e <= 55;
}
function z_(e) {
  return 48 <= e && e <= 57;
}
function H_(e) {
  if (e === null) return !1;
  var t = e.length, n = 0, r = !1, i;
  if (!t) return !1;
  if (i = e[n], (i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!q_(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "o") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!B_(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; n < t; n++)
    if (i = e[n], i !== "_") {
      if (!z_(e.charCodeAt(n)))
        return !1;
      r = !0;
    }
  return !(!r || i === "_");
}
function V_(e) {
  var t = e, n = 1, r;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), r = t[0], (r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function G_(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !U_.isNegativeZero(e);
}
var av = new M_("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: H_,
  construct: V_,
  predicate: G_,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), sv = Dt, W_ = pt, K_ = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Y_(e) {
  return !(e === null || !K_.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function X_(e) {
  var t, n;
  return t = e.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
var J_ = /^[-+]?[0-9]+e/;
function Q_(e, t) {
  var n;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (sv.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), J_.test(n) ? n.replace("e", ".e") : n;
}
function Z_(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || sv.isNegativeZero(e));
}
var ov = new W_("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Y_,
  construct: X_,
  predicate: Z_,
  represent: Q_,
  defaultStyle: "lowercase"
}), cv = nv.extend({
  implicit: [
    rv,
    iv,
    av,
    ov
  ]
}), lv = cv, eE = pt, uv = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), pv = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function tE(e) {
  return e === null ? !1 : uv.exec(e) !== null || pv.exec(e) !== null;
}
function nE(e) {
  var t, n, r, i, a, s, o, c = 0, l = null, u, p, d;
  if (t = uv.exec(e), t === null && (t = pv.exec(e)), t === null) throw new Error("Date resolve error");
  if (n = +t[1], r = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(n, r, i));
  if (a = +t[4], s = +t[5], o = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (u = +t[10], p = +(t[11] || 0), l = (u * 60 + p) * 6e4, t[9] === "-" && (l = -l)), d = new Date(Date.UTC(n, r, i, a, s, o, c)), l && d.setTime(d.getTime() - l), d;
}
function rE(e) {
  return e.toISOString();
}
var dv = new eE("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: tE,
  construct: nE,
  instanceOf: Date,
  represent: rE
}), iE = pt;
function aE(e) {
  return e === "<<" || e === null;
}
var fv = new iE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: aE
}), sE = pt, Pl = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function oE(e) {
  if (e === null) return !1;
  var t, n, r = 0, i = e.length, a = Pl;
  for (n = 0; n < i; n++)
    if (t = a.indexOf(e.charAt(n)), !(t > 64)) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function cE(e) {
  var t, n, r = e.replace(/[\r\n=]/g, ""), i = r.length, a = Pl, s = 0, o = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (o.push(s >> 16 & 255), o.push(s >> 8 & 255), o.push(s & 255)), s = s << 6 | a.indexOf(r.charAt(t));
  return n = i % 4 * 6, n === 0 ? (o.push(s >> 16 & 255), o.push(s >> 8 & 255), o.push(s & 255)) : n === 18 ? (o.push(s >> 10 & 255), o.push(s >> 2 & 255)) : n === 12 && o.push(s >> 4 & 255), new Uint8Array(o);
}
function lE(e) {
  var t = "", n = 0, r, i, a = e.length, s = Pl;
  for (r = 0; r < a; r++)
    r % 3 === 0 && r && (t += s[n >> 18 & 63], t += s[n >> 12 & 63], t += s[n >> 6 & 63], t += s[n & 63]), n = (n << 8) + e[r];
  return i = a % 3, i === 0 ? (t += s[n >> 18 & 63], t += s[n >> 12 & 63], t += s[n >> 6 & 63], t += s[n & 63]) : i === 2 ? (t += s[n >> 10 & 63], t += s[n >> 4 & 63], t += s[n << 2 & 63], t += s[64]) : i === 1 && (t += s[n >> 2 & 63], t += s[n << 4 & 63], t += s[64], t += s[64]), t;
}
function uE(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var mv = new sE("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: oE,
  construct: cE,
  predicate: uE,
  represent: lE
}), pE = pt, dE = Object.prototype.hasOwnProperty, fE = Object.prototype.toString;
function mE(e) {
  if (e === null) return !0;
  var t = [], n, r, i, a, s, o = e;
  for (n = 0, r = o.length; n < r; n += 1) {
    if (i = o[n], s = !1, fE.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (dE.call(i, a))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function hE(e) {
  return e !== null ? e : [];
}
var hv = new pE("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: mE,
  construct: hE
}), vE = pt, gE = Object.prototype.toString;
function yE(e) {
  if (e === null) return !0;
  var t, n, r, i, a, s = e;
  for (a = new Array(s.length), t = 0, n = s.length; t < n; t += 1) {
    if (r = s[t], gE.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1)) return !1;
    a[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function bE(e) {
  if (e === null) return [];
  var t, n, r, i, a, s = e;
  for (a = new Array(s.length), t = 0, n = s.length; t < n; t += 1)
    r = s[t], i = Object.keys(r), a[t] = [i[0], r[i[0]]];
  return a;
}
var vv = new vE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: yE,
  construct: bE
}), xE = pt, wE = Object.prototype.hasOwnProperty;
function _E(e) {
  if (e === null) return !0;
  var t, n = e;
  for (t in n)
    if (wE.call(n, t) && n[t] !== null)
      return !1;
  return !0;
}
function EE(e) {
  return e !== null ? e : {};
}
var gv = new xE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: _E,
  construct: EE
}), Ol = lv.extend({
  implicit: [
    dv,
    fv
  ],
  explicit: [
    mv,
    hv,
    vv,
    gv
  ]
}), Xn = Dt, yv = fa, $E = w_, SE = Ol, Dn = Object.prototype.hasOwnProperty, bs = 1, bv = 2, xv = 3, xs = 4, Ko = 1, TE = 2, gd = 3, AE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, RE = /[\x85\u2028\u2029]/, PE = /[,\[\]\{\}]/, wv = /^(?:!|!!|![a-z\-]+!)$/i, _v = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function yd(e) {
  return Object.prototype.toString.call(e);
}
function Vt(e) {
  return e === 10 || e === 13;
}
function ir(e) {
  return e === 9 || e === 32;
}
function ht(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Cr(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function OE(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function NE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function CE(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function bd(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function IE(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Ev = new Array(256), $v = new Array(256);
for (var _r = 0; _r < 256; _r++)
  Ev[_r] = bd(_r) ? 1 : 0, $v[_r] = bd(_r);
function kE(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || SE, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Sv(e, t) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = $E(n), new yv(t, n);
}
function te(e, t) {
  throw Sv(e, t);
}
function ws(e, t) {
  e.onWarning && e.onWarning.call(null, Sv(e, t));
}
var xd = {
  YAML: function(t, n, r) {
    var i, a, s;
    t.version !== null && te(t, "duplication of %YAML directive"), r.length !== 1 && te(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && te(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), s = parseInt(i[2], 10), a !== 1 && te(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && ws(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    var i, a;
    r.length !== 2 && te(t, "TAG directive accepts exactly two arguments"), i = r[0], a = r[1], wv.test(i) || te(t, "ill-formed tag handle (first argument) of the TAG directive"), Dn.call(t.tagMap, i) && te(t, 'there is a previously declared suffix for "' + i + '" tag handle'), _v.test(a) || te(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      te(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function Nn(e, t, n, r) {
  var i, a, s, o;
  if (t < n) {
    if (o = e.input.slice(t, n), r)
      for (i = 0, a = o.length; i < a; i += 1)
        s = o.charCodeAt(i), s === 9 || 32 <= s && s <= 1114111 || te(e, "expected valid JSON character");
    else AE.test(o) && te(e, "the stream contains non-printable characters");
    e.result += o;
  }
}
function wd(e, t, n, r) {
  var i, a, s, o;
  for (Xn.isObject(n) || te(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), s = 0, o = i.length; s < o; s += 1)
    a = i[s], Dn.call(t, a) || (t[a] = n[a], r[a] = !0);
}
function Ir(e, t, n, r, i, a, s, o, c) {
  var l, u;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), l = 0, u = i.length; l < u; l += 1)
      Array.isArray(i[l]) && te(e, "nested arrays are not supported inside keys"), typeof i == "object" && yd(i[l]) === "[object Object]" && (i[l] = "[object Object]");
  if (typeof i == "object" && yd(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (l = 0, u = a.length; l < u; l += 1)
        wd(e, t, a[l], n);
    else
      wd(e, t, a, n);
  else
    !e.json && !Dn.call(n, i) && Dn.call(t, i) && (e.line = s || e.line, e.lineStart = o || e.lineStart, e.position = c || e.position, te(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: a
    }) : t[i] = a, delete n[i];
  return t;
}
function Nl(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : te(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ie(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; ir(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Vt(i))
      for (Nl(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && ws(e, "deficient indentation"), r;
}
function Vs(e) {
  var t = e.position, n;
  return n = e.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || ht(n)));
}
function Cl(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Xn.repeat(`
`, t - 1));
}
function DE(e, t, n) {
  var r, i, a, s, o, c, l, u, p = e.kind, d = e.result, f;
  if (f = e.input.charCodeAt(e.position), ht(f) || Cr(f) || f === 35 || f === 38 || f === 42 || f === 33 || f === 124 || f === 62 || f === 39 || f === 34 || f === 37 || f === 64 || f === 96 || (f === 63 || f === 45) && (i = e.input.charCodeAt(e.position + 1), ht(i) || n && Cr(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = s = e.position, o = !1; f !== 0; ) {
    if (f === 58) {
      if (i = e.input.charCodeAt(e.position + 1), ht(i) || n && Cr(i))
        break;
    } else if (f === 35) {
      if (r = e.input.charCodeAt(e.position - 1), ht(r))
        break;
    } else {
      if (e.position === e.lineStart && Vs(e) || n && Cr(f))
        break;
      if (Vt(f))
        if (c = e.line, l = e.lineStart, u = e.lineIndent, Ie(e, !1, -1), e.lineIndent >= t) {
          o = !0, f = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = s, e.line = c, e.lineStart = l, e.lineIndent = u;
          break;
        }
    }
    o && (Nn(e, a, s, !1), Cl(e, e.line - c), a = s = e.position, o = !1), ir(f) || (s = e.position + 1), f = e.input.charCodeAt(++e.position);
  }
  return Nn(e, a, s, !1), e.result ? !0 : (e.kind = p, e.result = d, !1);
}
function jE(e, t) {
  var n, r, i;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (Nn(e, r, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        r = e.position, e.position++, i = e.position;
      else
        return !0;
    else Vt(n) ? (Nn(e, r, i, !0), Cl(e, Ie(e, !1, t)), r = i = e.position) : e.position === e.lineStart && Vs(e) ? te(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  te(e, "unexpected end of the stream within a single quoted scalar");
}
function FE(e, t) {
  var n, r, i, a, s, o;
  if (o = e.input.charCodeAt(e.position), o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Nn(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Nn(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), Vt(o))
        Ie(e, !1, t);
      else if (o < 256 && Ev[o])
        e.result += $v[o], e.position++;
      else if ((s = NE(o)) > 0) {
        for (i = s, a = 0; i > 0; i--)
          o = e.input.charCodeAt(++e.position), (s = OE(o)) >= 0 ? a = (a << 4) + s : te(e, "expected hexadecimal character");
        e.result += IE(a), e.position++;
      } else
        te(e, "unknown escape sequence");
      n = r = e.position;
    } else Vt(o) ? (Nn(e, n, r, !0), Cl(e, Ie(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Vs(e) ? te(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  te(e, "unexpected end of the stream within a double quoted scalar");
}
function LE(e, t) {
  var n = !0, r, i, a, s = e.tag, o, c = e.anchor, l, u, p, d, f, h = /* @__PURE__ */ Object.create(null), b, v, g, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    u = 93, f = !1, o = [];
  else if (w === 123)
    u = 125, f = !0, o = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (Ie(e, !0, t), w = e.input.charCodeAt(e.position), w === u)
      return e.position++, e.tag = s, e.anchor = c, e.kind = f ? "mapping" : "sequence", e.result = o, !0;
    n ? w === 44 && te(e, "expected the node content, but found ','") : te(e, "missed comma between flow collection entries"), v = b = g = null, p = d = !1, w === 63 && (l = e.input.charCodeAt(e.position + 1), ht(l) && (p = d = !0, e.position++, Ie(e, !0, t))), r = e.line, i = e.lineStart, a = e.position, Wr(e, t, bs, !1, !0), v = e.tag, b = e.result, Ie(e, !0, t), w = e.input.charCodeAt(e.position), (d || e.line === r) && w === 58 && (p = !0, w = e.input.charCodeAt(++e.position), Ie(e, !0, t), Wr(e, t, bs, !1, !0), g = e.result), f ? Ir(e, o, h, v, b, g, r, i, a) : p ? o.push(Ir(e, null, h, v, b, g, r, i, a)) : o.push(b), Ie(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (n = !0, w = e.input.charCodeAt(++e.position)) : n = !1;
  }
  te(e, "unexpected end of the stream within a flow collection");
}
function UE(e, t) {
  var n, r, i = Ko, a = !1, s = !1, o = t, c = 0, l = !1, u, p;
  if (p = e.input.charCodeAt(e.position), p === 124)
    r = !1;
  else if (p === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; p !== 0; )
    if (p = e.input.charCodeAt(++e.position), p === 43 || p === 45)
      Ko === i ? i = p === 43 ? gd : TE : te(e, "repeat of a chomping mode identifier");
    else if ((u = CE(p)) >= 0)
      u === 0 ? te(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? te(e, "repeat of an indentation width identifier") : (o = t + u - 1, s = !0);
    else
      break;
  if (ir(p)) {
    do
      p = e.input.charCodeAt(++e.position);
    while (ir(p));
    if (p === 35)
      do
        p = e.input.charCodeAt(++e.position);
      while (!Vt(p) && p !== 0);
  }
  for (; p !== 0; ) {
    for (Nl(e), e.lineIndent = 0, p = e.input.charCodeAt(e.position); (!s || e.lineIndent < o) && p === 32; )
      e.lineIndent++, p = e.input.charCodeAt(++e.position);
    if (!s && e.lineIndent > o && (o = e.lineIndent), Vt(p)) {
      c++;
      continue;
    }
    if (e.lineIndent < o) {
      i === gd ? e.result += Xn.repeat(`
`, a ? 1 + c : c) : i === Ko && a && (e.result += `
`);
      break;
    }
    for (r ? ir(p) ? (l = !0, e.result += Xn.repeat(`
`, a ? 1 + c : c)) : l ? (l = !1, e.result += Xn.repeat(`
`, c + 1)) : c === 0 ? a && (e.result += " ") : e.result += Xn.repeat(`
`, c) : e.result += Xn.repeat(`
`, a ? 1 + c : c), a = !0, s = !0, c = 0, n = e.position; !Vt(p) && p !== 0; )
      p = e.input.charCodeAt(++e.position);
    Nn(e, n, e.position, !1);
  }
  return !0;
}
function _d(e, t) {
  var n, r = e.tag, i = e.anchor, a = [], s, o = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, te(e, "tab characters must not be used in indentation")), !(c !== 45 || (s = e.input.charCodeAt(e.position + 1), !ht(s)))); ) {
    if (o = !0, e.position++, Ie(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, Wr(e, t, xv, !1, !0), a.push(e.result), Ie(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && c !== 0)
      te(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = r, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function ME(e, t, n) {
  var r, i, a, s, o, c, l = e.tag, u = e.anchor, p = {}, d = /* @__PURE__ */ Object.create(null), f = null, h = null, b = null, v = !1, g = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = p), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, te(e, "tab characters must not be used in indentation")), r = e.input.charCodeAt(e.position + 1), a = e.line, (w === 63 || w === 58) && ht(r))
      w === 63 ? (v && (Ir(e, p, d, f, h, null, s, o, c), f = h = b = null), g = !0, v = !0, i = !0) : v ? (v = !1, i = !0) : te(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = r;
    else {
      if (s = e.line, o = e.lineStart, c = e.position, !Wr(e, n, bv, !1, !0))
        break;
      if (e.line === a) {
        for (w = e.input.charCodeAt(e.position); ir(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), ht(w) || te(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (Ir(e, p, d, f, h, null, s, o, c), f = h = b = null), g = !0, v = !1, i = !1, f = e.tag, h = e.result;
        else if (g)
          te(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = l, e.anchor = u, !0;
      } else if (g)
        te(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = l, e.anchor = u, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (v && (s = e.line, o = e.lineStart, c = e.position), Wr(e, t, xs, !0, i) && (v ? h = e.result : b = e.result), v || (Ir(e, p, d, f, h, b, s, o, c), f = h = b = null), Ie(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && w !== 0)
      te(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return v && Ir(e, p, d, f, h, null, s, o, c), g && (e.tag = l, e.anchor = u, e.kind = "mapping", e.result = p), g;
}
function qE(e) {
  var t, n = !1, r = !1, i, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 33) return !1;
  if (e.tag !== null && te(e, "duplication of a tag property"), s = e.input.charCodeAt(++e.position), s === 60 ? (n = !0, s = e.input.charCodeAt(++e.position)) : s === 33 ? (r = !0, i = "!!", s = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, n) {
    do
      s = e.input.charCodeAt(++e.position);
    while (s !== 0 && s !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), s = e.input.charCodeAt(++e.position)) : te(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !ht(s); )
      s === 33 && (r ? te(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), wv.test(i) || te(e, "named tag handle cannot contain such characters"), r = !0, t = e.position + 1)), s = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), PE.test(a) && te(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !_v.test(a) && te(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    te(e, "tag name is malformed: " + a);
  }
  return n ? e.tag = a : Dn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : te(e, 'undeclared tag handle "' + i + '"'), !0;
}
function BE(e) {
  var t, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && te(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !ht(n) && !Cr(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && te(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function zE(e) {
  var t, n, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !ht(r) && !Cr(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && te(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), Dn.call(e.anchorMap, n) || te(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], Ie(e, !0, -1), !0;
}
function Wr(e, t, n, r, i) {
  var a, s, o, c = 1, l = !1, u = !1, p, d, f, h, b, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = s = o = xs === n || xv === n, r && Ie(e, !0, -1) && (l = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; qE(e) || BE(e); )
      Ie(e, !0, -1) ? (l = !0, o = a, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : o = !1;
  if (o && (o = l || i), (c === 1 || xs === n) && (bs === n || bv === n ? b = t : b = t + 1, v = e.position - e.lineStart, c === 1 ? o && (_d(e, v) || ME(e, v, b)) || LE(e, b) ? u = !0 : (s && UE(e, b) || jE(e, b) || FE(e, b) ? u = !0 : zE(e) ? (u = !0, (e.tag !== null || e.anchor !== null) && te(e, "alias node should not have any properties")) : DE(e, b, bs === n) && (u = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (u = o && _d(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && te(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), p = 0, d = e.implicitTypes.length; p < d; p += 1)
      if (h = e.implicitTypes[p], h.resolve(e.result)) {
        e.result = h.construct(e.result), e.tag = h.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Dn.call(e.typeMap[e.kind || "fallback"], e.tag))
      h = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (h = null, f = e.typeMap.multi[e.kind || "fallback"], p = 0, d = f.length; p < d; p += 1)
        if (e.tag.slice(0, f[p].tag.length) === f[p].tag) {
          h = f[p];
          break;
        }
    h || te(e, "unknown tag !<" + e.tag + ">"), e.result !== null && h.kind !== e.kind && te(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + h.kind + '", not "' + e.kind + '"'), h.resolve(e.result, e.tag) ? (e.result = h.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : te(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || u;
}
function HE(e) {
  var t = e.position, n, r, i, a = !1, s;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (s = e.input.charCodeAt(e.position)) !== 0 && (Ie(e, !0, -1), s = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || s !== 37)); ) {
    for (a = !0, s = e.input.charCodeAt(++e.position), n = e.position; s !== 0 && !ht(s); )
      s = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(n, e.position), i = [], r.length < 1 && te(e, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; ir(s); )
        s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do
          s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !Vt(s));
        break;
      }
      if (Vt(s)) break;
      for (n = e.position; s !== 0 && !ht(s); )
        s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    s !== 0 && Nl(e), Dn.call(xd, r) ? xd[r](e, r, i) : ws(e, 'unknown document directive "' + r + '"');
  }
  if (Ie(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ie(e, !0, -1)) : a && te(e, "directives end mark is expected"), Wr(e, e.lineIndent - 1, xs, !1, !0), Ie(e, !0, -1), e.checkLineBreaks && RE.test(e.input.slice(t, e.position)) && ws(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Vs(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ie(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    te(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Tv(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new kE(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, te(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    HE(n);
  return n.documents;
}
function VE(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var r = Tv(e, n);
  if (typeof t != "function")
    return r;
  for (var i = 0, a = r.length; i < a; i += 1)
    t(r[i]);
}
function GE(e, t) {
  var n = Tv(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new yv("expected a single document in the stream, but found more");
  }
}
Rl.loadAll = VE;
Rl.load = GE;
var Av = {}, Gs = Dt, ma = fa, WE = Ol, Rv = Object.prototype.toString, Pv = Object.prototype.hasOwnProperty, Il = 65279, KE = 9, Zi = 10, YE = 13, XE = 32, JE = 33, QE = 34, Dc = 35, ZE = 37, e$ = 38, t$ = 39, n$ = 42, Ov = 44, r$ = 45, _s = 58, i$ = 61, a$ = 62, s$ = 63, o$ = 64, Nv = 91, Cv = 93, c$ = 96, Iv = 123, l$ = 124, kv = 125, rt = {};
rt[0] = "\\0";
rt[7] = "\\a";
rt[8] = "\\b";
rt[9] = "\\t";
rt[10] = "\\n";
rt[11] = "\\v";
rt[12] = "\\f";
rt[13] = "\\r";
rt[27] = "\\e";
rt[34] = '\\"';
rt[92] = "\\\\";
rt[133] = "\\N";
rt[160] = "\\_";
rt[8232] = "\\L";
rt[8233] = "\\P";
var u$ = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], p$ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function d$(e, t) {
  var n, r, i, a, s, o, c;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, a = r.length; i < a; i += 1)
    s = r[i], o = String(t[s]), s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)), c = e.compiledTypeMap.fallback[s], c && Pv.call(c.styleAliases, o) && (o = c.styleAliases[o]), n[s] = o;
  return n;
}
function f$(e) {
  var t, n, r;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    n = "x", r = 2;
  else if (e <= 65535)
    n = "u", r = 4;
  else if (e <= 4294967295)
    n = "U", r = 8;
  else
    throw new ma("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + Gs.repeat("0", r - t.length) + t;
}
var m$ = 1, ea = 2;
function h$(e) {
  this.schema = e.schema || WE, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Gs.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = d$(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ea : m$, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ed(e, t) {
  for (var n = Gs.repeat(" ", t), r = 0, i = -1, a = "", s, o = e.length; r < o; )
    i = e.indexOf(`
`, r), i === -1 ? (s = e.slice(r), r = o) : (s = e.slice(r, i + 1), r = i + 1), s.length && s !== `
` && (a += n), a += s;
  return a;
}
function jc(e, t) {
  return `
` + Gs.repeat(" ", e.indent * t);
}
function v$(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (i = e.implicitTypes[n], i.resolve(t))
      return !0;
  return !1;
}
function Es(e) {
  return e === XE || e === KE;
}
function ta(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Il || 65536 <= e && e <= 1114111;
}
function $d(e) {
  return ta(e) && e !== Il && e !== YE && e !== Zi;
}
function Sd(e, t, n) {
  var r = $d(e), i = r && !Es(e);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      r
    ) : r && e !== Ov && e !== Nv && e !== Cv && e !== Iv && e !== kv) && e !== Dc && !(t === _s && !i) || $d(t) && !Es(t) && e === Dc || t === _s && i
  );
}
function g$(e) {
  return ta(e) && e !== Il && !Es(e) && e !== r$ && e !== s$ && e !== _s && e !== Ov && e !== Nv && e !== Cv && e !== Iv && e !== kv && e !== Dc && e !== e$ && e !== n$ && e !== JE && e !== l$ && e !== i$ && e !== a$ && e !== t$ && e !== QE && e !== ZE && e !== o$ && e !== c$;
}
function y$(e) {
  return !Es(e) && e !== _s;
}
function Di(e, t) {
  var n = e.charCodeAt(t), r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Dv(e) {
  var t = /^\n* /;
  return t.test(e);
}
var jv = 1, Fc = 2, Fv = 3, Lv = 4, Or = 5;
function b$(e, t, n, r, i, a, s, o) {
  var c, l = 0, u = null, p = !1, d = !1, f = r !== -1, h = -1, b = g$(Di(e, 0)) && y$(Di(e, e.length - 1));
  if (t || s)
    for (c = 0; c < e.length; l >= 65536 ? c += 2 : c++) {
      if (l = Di(e, c), !ta(l))
        return Or;
      b = b && Sd(l, u, o), u = l;
    }
  else {
    for (c = 0; c < e.length; l >= 65536 ? c += 2 : c++) {
      if (l = Di(e, c), l === Zi)
        p = !0, f && (d = d || // Foldable line = too long, and not more-indented.
        c - h - 1 > r && e[h + 1] !== " ", h = c);
      else if (!ta(l))
        return Or;
      b = b && Sd(l, u, o), u = l;
    }
    d = d || f && c - h - 1 > r && e[h + 1] !== " ";
  }
  return !p && !d ? b && !s && !i(e) ? jv : a === ea ? Or : Fc : n > 9 && Dv(e) ? Or : s ? a === ea ? Or : Fc : d ? Lv : Fv;
}
function x$(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === ea ? '""' : "''";
    if (!e.noCompatMode && (u$.indexOf(t) !== -1 || p$.test(t)))
      return e.quotingType === ea ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), o = r || e.flowLevel > -1 && n >= e.flowLevel;
    function c(l) {
      return v$(e, l);
    }
    switch (b$(
      t,
      o,
      e.indent,
      s,
      c,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case jv:
        return t;
      case Fc:
        return "'" + t.replace(/'/g, "''") + "'";
      case Fv:
        return "|" + Td(t, e.indent) + Ad(Ed(t, a));
      case Lv:
        return ">" + Td(t, e.indent) + Ad(Ed(w$(t, s), a));
      case Or:
        return '"' + _$(t) + '"';
      default:
        throw new ma("impossible error: invalid scalar style");
    }
  }();
}
function Td(e, t) {
  var n = Dv(e) ? String(t) : "", r = e[e.length - 1] === `
`, i = r && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : r ? "" : "-";
  return n + a + `
`;
}
function Ad(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function w$(e, t) {
  for (var n = /(\n+)([^\n]*)/g, r = function() {
    var l = e.indexOf(`
`);
    return l = l !== -1 ? l : e.length, n.lastIndex = l, Rd(e.slice(0, l), t);
  }(), i = e[0] === `
` || e[0] === " ", a, s; s = n.exec(e); ) {
    var o = s[1], c = s[2];
    a = c[0] === " ", r += o + (!i && !a && c !== "" ? `
` : "") + Rd(c, t), i = a;
  }
  return r;
}
function Rd(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, r, i = 0, a, s = 0, o = 0, c = ""; r = n.exec(e); )
    o = r.index, o - i > t && (a = s > i ? s : o, c += `
` + e.slice(i, a), i = a + 1), s = o;
  return c += `
`, e.length - i > t && s > i ? c += e.slice(i, s) + `
` + e.slice(s + 1) : c += e.slice(i), c.slice(1);
}
function _$(e) {
  for (var t = "", n = 0, r, i = 0; i < e.length; n >= 65536 ? i += 2 : i++)
    n = Di(e, i), r = rt[n], !r && ta(n) ? (t += e[i], n >= 65536 && (t += e[i + 1])) : t += r || f$(n);
  return t;
}
function E$(e, t, n) {
  var r = "", i = e.tag, a, s, o;
  for (a = 0, s = n.length; a < s; a += 1)
    o = n[a], e.replacer && (o = e.replacer.call(n, String(a), o)), (rn(e, t, o, !1, !1) || typeof o > "u" && rn(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = i, e.dump = "[" + r + "]";
}
function Pd(e, t, n, r) {
  var i = "", a = e.tag, s, o, c;
  for (s = 0, o = n.length; s < o; s += 1)
    c = n[s], e.replacer && (c = e.replacer.call(n, String(s), c)), (rn(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && rn(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += jc(e, t)), e.dump && Zi === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function $$(e, t, n) {
  var r = "", i = e.tag, a = Object.keys(n), s, o, c, l, u;
  for (s = 0, o = a.length; s < o; s += 1)
    u = "", r !== "" && (u += ", "), e.condenseFlow && (u += '"'), c = a[s], l = n[c], e.replacer && (l = e.replacer.call(n, c, l)), rn(e, t, c, !1, !1) && (e.dump.length > 1024 && (u += "? "), u += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), rn(e, t, l, !1, !1) && (u += e.dump, r += u));
  e.tag = i, e.dump = "{" + r + "}";
}
function S$(e, t, n, r) {
  var i = "", a = e.tag, s = Object.keys(n), o, c, l, u, p, d;
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new ma("sortKeys must be a boolean or a function");
  for (o = 0, c = s.length; o < c; o += 1)
    d = "", (!r || i !== "") && (d += jc(e, t)), l = s[o], u = n[l], e.replacer && (u = e.replacer.call(n, l, u)), rn(e, t + 1, l, !0, !0, !0) && (p = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, p && (e.dump && Zi === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, p && (d += jc(e, t)), rn(e, t + 1, u, !0, p) && (e.dump && Zi === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = a, e.dump = i || "{}";
}
function Od(e, t, n) {
  var r, i, a, s, o, c;
  for (i = n ? e.explicitTypes : e.implicitTypes, a = 0, s = i.length; a < s; a += 1)
    if (o = i[a], (o.instanceOf || o.predicate) && (!o.instanceOf || typeof t == "object" && t instanceof o.instanceOf) && (!o.predicate || o.predicate(t))) {
      if (n ? o.multi && o.representName ? e.tag = o.representName(t) : e.tag = o.tag : e.tag = "?", o.represent) {
        if (c = e.styleMap[o.tag] || o.defaultStyle, Rv.call(o.represent) === "[object Function]")
          r = o.represent(t, c);
        else if (Pv.call(o.represent, c))
          r = o.represent[c](t, c);
        else
          throw new ma("!<" + o.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function rn(e, t, n, r, i, a, s) {
  e.tag = null, e.dump = n, Od(e, n, !1) || Od(e, n, !0);
  var o = Rv.call(e.dump), c = r, l;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var u = o === "[object Object]" || o === "[object Array]", p, d;
  if (u && (p = e.duplicates.indexOf(n), d = p !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[p])
    e.dump = "*ref_" + p;
  else {
    if (u && d && !e.usedDuplicates[p] && (e.usedDuplicates[p] = !0), o === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (S$(e, t, e.dump, i), d && (e.dump = "&ref_" + p + e.dump)) : ($$(e, t, e.dump), d && (e.dump = "&ref_" + p + " " + e.dump));
    else if (o === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? Pd(e, t - 1, e.dump, i) : Pd(e, t, e.dump, i), d && (e.dump = "&ref_" + p + e.dump)) : (E$(e, t, e.dump), d && (e.dump = "&ref_" + p + " " + e.dump));
    else if (o === "[object String]")
      e.tag !== "?" && x$(e, e.dump, t, a, c);
    else {
      if (o === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new ma("unacceptable kind of an object to dump " + o);
    }
    e.tag !== null && e.tag !== "?" && (l = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? l = "!" + l : l.slice(0, 18) === "tag:yaml.org,2002:" ? l = "!!" + l.slice(18) : l = "!<" + l + ">", e.dump = l + " " + e.dump);
  }
  return !0;
}
function T$(e, t) {
  var n = [], r = [], i, a;
  for (Lc(e, n, r), i = 0, a = r.length; i < a; i += 1)
    t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(a);
}
function Lc(e, t, n) {
  var r, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        Lc(e[i], t, n);
    else
      for (r = Object.keys(e), i = 0, a = r.length; i < a; i += 1)
        Lc(e[r[i]], t, n);
}
function A$(e, t) {
  t = t || {};
  var n = new h$(t);
  n.noRefs || T$(e, n);
  var r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), rn(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
Av.dump = A$;
var Uv = Rl, R$ = Av;
function kl(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ye.Type = pt;
Ye.Schema = Qh;
Ye.FAILSAFE_SCHEMA = nv;
Ye.JSON_SCHEMA = cv;
Ye.CORE_SCHEMA = lv;
Ye.DEFAULT_SCHEMA = Ol;
Ye.load = Uv.load;
Ye.loadAll = Uv.loadAll;
Ye.dump = R$.dump;
Ye.YAMLException = fa;
Ye.types = {
  binary: mv,
  float: ov,
  map: tv,
  null: rv,
  pairs: vv,
  set: gv,
  timestamp: dv,
  bool: iv,
  int: av,
  merge: fv,
  omap: hv,
  seq: ev,
  str: Zh
};
Ye.safeLoad = kl("safeLoad", "load");
Ye.safeLoadAll = kl("safeLoadAll", "loadAll");
Ye.safeDump = kl("safeDump", "dump");
var Ws = {};
Object.defineProperty(Ws, "__esModule", { value: !0 });
Ws.Lazy = void 0;
class P$ {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Ws.Lazy = P$;
var Uc = { exports: {} };
const O$ = "2.0.0", Mv = 256, N$ = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, C$ = 16, I$ = Mv - 6, k$ = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ks = {
  MAX_LENGTH: Mv,
  MAX_SAFE_COMPONENT_LENGTH: C$,
  MAX_SAFE_BUILD_LENGTH: I$,
  MAX_SAFE_INTEGER: N$,
  RELEASE_TYPES: k$,
  SEMVER_SPEC_VERSION: O$,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const D$ = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Ys = D$;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Ks, a = Ys;
  t = e.exports = {};
  const s = t.re = [], o = t.safeRe = [], c = t.src = [], l = t.t = {};
  let u = 0;
  const p = "[a-zA-Z0-9-]", d = [
    ["\\s", 1],
    ["\\d", i],
    [p, r]
  ], f = (b) => {
    for (const [v, g] of d)
      b = b.split(`${v}*`).join(`${v}{0,${g}}`).split(`${v}+`).join(`${v}{1,${g}}`);
    return b;
  }, h = (b, v, g) => {
    const w = f(v), T = u++;
    a(b, T, v), l[b] = T, c[T] = v, s[T] = new RegExp(v, g ? "g" : void 0), o[T] = new RegExp(w, g ? "g" : void 0);
  };
  h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), h("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${c[l.NUMERICIDENTIFIER]}|${c[l.NONNUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NUMERICIDENTIFIERLOOSE]}|${c[l.NONNUMERICIDENTIFIER]})`), h("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${p}+`), h("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), h("FULL", `^${c[l.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), h("LOOSE", `^${c[l.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), h("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", c[l.COERCE], !0), h("COERCERTLFULL", c[l.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", h("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", h("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Uc, Uc.exports);
var ha = Uc.exports;
const j$ = Object.freeze({ loose: !0 }), F$ = Object.freeze({}), L$ = (e) => e ? typeof e != "object" ? j$ : e : F$;
var Dl = L$;
const Nd = /^[0-9]+$/, qv = (e, t) => {
  const n = Nd.test(e), r = Nd.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, U$ = (e, t) => qv(t, e);
var Bv = {
  compareIdentifiers: qv,
  rcompareIdentifiers: U$
};
const qa = Ys, { MAX_LENGTH: Cd, MAX_SAFE_INTEGER: Ba } = Ks, { safeRe: Id, t: kd } = ha, M$ = Dl, { compareIdentifiers: Er } = Bv;
let q$ = class Mt {
  constructor(t, n) {
    if (n = M$(n), t instanceof Mt) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Cd)
      throw new TypeError(
        `version is longer than ${Cd} characters`
      );
    qa("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? Id[kd.LOOSE] : Id[kd.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > Ba || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ba || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ba || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const a = +i;
        if (a >= 0 && a < Ba)
          return a;
      }
      return i;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (qa("SemVer.compare", this.version, this.options, t), !(t instanceof Mt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Mt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Mt || (t = new Mt(t, this.options)), Er(this.major, t.major) || Er(this.minor, t.minor) || Er(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Mt || (t = new Mt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (qa("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Er(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof Mt || (t = new Mt(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (qa("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Er(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(r) ? 1 : 0;
        if (!n && r === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (n) {
          let a = [n, i];
          r === !1 && (a = [n]), Er(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var dt = q$;
const Dd = dt, B$ = (e, t, n = !1) => {
  if (e instanceof Dd)
    return e;
  try {
    return new Dd(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var Zr = B$;
const z$ = Zr, H$ = (e, t) => {
  const n = z$(e, t);
  return n ? n.version : null;
};
var V$ = H$;
const G$ = Zr, W$ = (e, t) => {
  const n = G$(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var K$ = W$;
const jd = dt, Y$ = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new jd(
      e instanceof jd ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var X$ = Y$;
const Fd = Zr, J$ = (e, t) => {
  const n = Fd(e, null, !0), r = Fd(t, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const a = i > 0, s = a ? n : r, o = a ? r : n, c = !!s.prerelease.length;
  if (!!o.prerelease.length && !c)
    return !o.patch && !o.minor ? "major" : s.patch ? "patch" : s.minor ? "minor" : "major";
  const u = c ? "pre" : "";
  return n.major !== r.major ? u + "major" : n.minor !== r.minor ? u + "minor" : n.patch !== r.patch ? u + "patch" : "prerelease";
};
var Q$ = J$;
const Z$ = dt, eS = (e, t) => new Z$(e, t).major;
var tS = eS;
const nS = dt, rS = (e, t) => new nS(e, t).minor;
var iS = rS;
const aS = dt, sS = (e, t) => new aS(e, t).patch;
var oS = sS;
const cS = Zr, lS = (e, t) => {
  const n = cS(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var uS = lS;
const Ld = dt, pS = (e, t, n) => new Ld(e, n).compare(new Ld(t, n));
var jt = pS;
const dS = jt, fS = (e, t, n) => dS(t, e, n);
var mS = fS;
const hS = jt, vS = (e, t) => hS(e, t, !0);
var gS = vS;
const Ud = dt, yS = (e, t, n) => {
  const r = new Ud(e, n), i = new Ud(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var jl = yS;
const bS = jl, xS = (e, t) => e.sort((n, r) => bS(n, r, t));
var wS = xS;
const _S = jl, ES = (e, t) => e.sort((n, r) => _S(r, n, t));
var $S = ES;
const SS = jt, TS = (e, t, n) => SS(e, t, n) > 0;
var Xs = TS;
const AS = jt, RS = (e, t, n) => AS(e, t, n) < 0;
var Fl = RS;
const PS = jt, OS = (e, t, n) => PS(e, t, n) === 0;
var zv = OS;
const NS = jt, CS = (e, t, n) => NS(e, t, n) !== 0;
var Hv = CS;
const IS = jt, kS = (e, t, n) => IS(e, t, n) >= 0;
var Ll = kS;
const DS = jt, jS = (e, t, n) => DS(e, t, n) <= 0;
var Ul = jS;
const FS = zv, LS = Hv, US = Xs, MS = Ll, qS = Fl, BS = Ul, zS = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return FS(e, n, r);
    case "!=":
      return LS(e, n, r);
    case ">":
      return US(e, n, r);
    case ">=":
      return MS(e, n, r);
    case "<":
      return qS(e, n, r);
    case "<=":
      return BS(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Vv = zS;
const HS = dt, VS = Zr, { safeRe: za, t: Ha } = ha, GS = (e, t) => {
  if (e instanceof HS)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? za[Ha.COERCEFULL] : za[Ha.COERCE]);
  else {
    const c = t.includePrerelease ? za[Ha.COERCERTLFULL] : za[Ha.COERCERTL];
    let l;
    for (; (l = c.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || l.index + l[0].length !== n.index + n[0].length) && (n = l), c.lastIndex = l.index + l[1].length + l[2].length;
    c.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", a = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", o = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return VS(`${r}.${i}.${a}${s}${o}`, t);
};
var WS = GS;
class KS {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var YS = KS, Yo, Md;
function Ft() {
  if (Md) return Yo;
  Md = 1;
  const e = /\s+/g;
  class t {
    constructor(j, G) {
      if (G = i(G), j instanceof t)
        return j.loose === !!G.loose && j.includePrerelease === !!G.includePrerelease ? j : new t(j.raw, G);
      if (j instanceof a)
        return this.raw = j.value, this.set = [[j]], this.formatted = void 0, this;
      if (this.options = G, this.loose = !!G.loose, this.includePrerelease = !!G.includePrerelease, this.raw = j.trim().replace(e, " "), this.set = this.raw.split("||").map((N) => this.parseRange(N.trim())).filter((N) => N.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const N = this.set[0];
        if (this.set = this.set.filter((B) => !b(B[0])), this.set.length === 0)
          this.set = [N];
        else if (this.set.length > 1) {
          for (const B of this.set)
            if (B.length === 1 && v(B[0])) {
              this.set = [B];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let j = 0; j < this.set.length; j++) {
          j > 0 && (this.formatted += "||");
          const G = this.set[j];
          for (let N = 0; N < G.length; N++)
            N > 0 && (this.formatted += " "), this.formatted += G[N].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(j) {
      const N = ((this.options.includePrerelease && f) | (this.options.loose && h)) + ":" + j, B = r.get(N);
      if (B)
        return B;
      const H = this.options.loose, M = H ? c[l.HYPHENRANGELOOSE] : c[l.HYPHENRANGE];
      j = j.replace(M, K(this.options.includePrerelease)), s("hyphen replace", j), j = j.replace(c[l.COMPARATORTRIM], u), s("comparator trim", j), j = j.replace(c[l.TILDETRIM], p), s("tilde trim", j), j = j.replace(c[l.CARETTRIM], d), s("caret trim", j);
      let S = j.split(" ").map(($) => w($, this.options)).join(" ").split(/\s+/).map(($) => z($, this.options));
      H && (S = S.filter(($) => (s("loose invalid filter", $, this.options), !!$.match(c[l.COMPARATORLOOSE])))), s("range list", S);
      const k = /* @__PURE__ */ new Map(), R = S.map(($) => new a($, this.options));
      for (const $ of R) {
        if (b($))
          return [$];
        k.set($.value, $);
      }
      k.size > 1 && k.has("") && k.delete("");
      const x = [...k.values()];
      return r.set(N, x), x;
    }
    intersects(j, G) {
      if (!(j instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((N) => g(N, G) && j.set.some((B) => g(B, G) && N.every((H) => B.every((M) => H.intersects(M, G)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(j) {
      if (!j)
        return !1;
      if (typeof j == "string")
        try {
          j = new o(j, this.options);
        } catch {
          return !1;
        }
      for (let G = 0; G < this.set.length; G++)
        if (J(this.set[G], j, this.options))
          return !0;
      return !1;
    }
  }
  Yo = t;
  const n = YS, r = new n(), i = Dl, a = Js(), s = Ys, o = dt, {
    safeRe: c,
    t: l,
    comparatorTrimReplace: u,
    tildeTrimReplace: p,
    caretTrimReplace: d
  } = ha, { FLAG_INCLUDE_PRERELEASE: f, FLAG_LOOSE: h } = Ks, b = (D) => D.value === "<0.0.0-0", v = (D) => D.value === "", g = (D, j) => {
    let G = !0;
    const N = D.slice();
    let B = N.pop();
    for (; G && N.length; )
      G = N.every((H) => B.intersects(H, j)), B = N.pop();
    return G;
  }, w = (D, j) => (s("comp", D, j), D = O(D, j), s("caret", D), D = I(D, j), s("tildes", D), D = V(D, j), s("xrange", D), D = Y(D, j), s("stars", D), D), T = (D) => !D || D.toLowerCase() === "x" || D === "*", I = (D, j) => D.trim().split(/\s+/).map((G) => F(G, j)).join(" "), F = (D, j) => {
    const G = j.loose ? c[l.TILDELOOSE] : c[l.TILDE];
    return D.replace(G, (N, B, H, M, S) => {
      s("tilde", D, N, B, H, M, S);
      let k;
      return T(B) ? k = "" : T(H) ? k = `>=${B}.0.0 <${+B + 1}.0.0-0` : T(M) ? k = `>=${B}.${H}.0 <${B}.${+H + 1}.0-0` : S ? (s("replaceTilde pr", S), k = `>=${B}.${H}.${M}-${S} <${B}.${+H + 1}.0-0`) : k = `>=${B}.${H}.${M} <${B}.${+H + 1}.0-0`, s("tilde return", k), k;
    });
  }, O = (D, j) => D.trim().split(/\s+/).map((G) => U(G, j)).join(" "), U = (D, j) => {
    s("caret", D, j);
    const G = j.loose ? c[l.CARETLOOSE] : c[l.CARET], N = j.includePrerelease ? "-0" : "";
    return D.replace(G, (B, H, M, S, k) => {
      s("caret", D, B, H, M, S, k);
      let R;
      return T(H) ? R = "" : T(M) ? R = `>=${H}.0.0${N} <${+H + 1}.0.0-0` : T(S) ? H === "0" ? R = `>=${H}.${M}.0${N} <${H}.${+M + 1}.0-0` : R = `>=${H}.${M}.0${N} <${+H + 1}.0.0-0` : k ? (s("replaceCaret pr", k), H === "0" ? M === "0" ? R = `>=${H}.${M}.${S}-${k} <${H}.${M}.${+S + 1}-0` : R = `>=${H}.${M}.${S}-${k} <${H}.${+M + 1}.0-0` : R = `>=${H}.${M}.${S}-${k} <${+H + 1}.0.0-0`) : (s("no pr"), H === "0" ? M === "0" ? R = `>=${H}.${M}.${S}${N} <${H}.${M}.${+S + 1}-0` : R = `>=${H}.${M}.${S}${N} <${H}.${+M + 1}.0-0` : R = `>=${H}.${M}.${S} <${+H + 1}.0.0-0`), s("caret return", R), R;
    });
  }, V = (D, j) => (s("replaceXRanges", D, j), D.split(/\s+/).map((G) => _(G, j)).join(" ")), _ = (D, j) => {
    D = D.trim();
    const G = j.loose ? c[l.XRANGELOOSE] : c[l.XRANGE];
    return D.replace(G, (N, B, H, M, S, k) => {
      s("xRange", D, N, B, H, M, S, k);
      const R = T(H), x = R || T(M), $ = x || T(S), q = $;
      return B === "=" && q && (B = ""), k = j.includePrerelease ? "-0" : "", R ? B === ">" || B === "<" ? N = "<0.0.0-0" : N = "*" : B && q ? (x && (M = 0), S = 0, B === ">" ? (B = ">=", x ? (H = +H + 1, M = 0, S = 0) : (M = +M + 1, S = 0)) : B === "<=" && (B = "<", x ? H = +H + 1 : M = +M + 1), B === "<" && (k = "-0"), N = `${B + H}.${M}.${S}${k}`) : x ? N = `>=${H}.0.0${k} <${+H + 1}.0.0-0` : $ && (N = `>=${H}.${M}.0${k} <${H}.${+M + 1}.0-0`), s("xRange return", N), N;
    });
  }, Y = (D, j) => (s("replaceStars", D, j), D.trim().replace(c[l.STAR], "")), z = (D, j) => (s("replaceGTE0", D, j), D.trim().replace(c[j.includePrerelease ? l.GTE0PRE : l.GTE0], "")), K = (D) => (j, G, N, B, H, M, S, k, R, x, $, q) => (T(N) ? G = "" : T(B) ? G = `>=${N}.0.0${D ? "-0" : ""}` : T(H) ? G = `>=${N}.${B}.0${D ? "-0" : ""}` : M ? G = `>=${G}` : G = `>=${G}${D ? "-0" : ""}`, T(R) ? k = "" : T(x) ? k = `<${+R + 1}.0.0-0` : T($) ? k = `<${R}.${+x + 1}.0-0` : q ? k = `<=${R}.${x}.${$}-${q}` : D ? k = `<${R}.${x}.${+$ + 1}-0` : k = `<=${k}`, `${G} ${k}`.trim()), J = (D, j, G) => {
    for (let N = 0; N < D.length; N++)
      if (!D[N].test(j))
        return !1;
    if (j.prerelease.length && !G.includePrerelease) {
      for (let N = 0; N < D.length; N++)
        if (s(D[N].semver), D[N].semver !== a.ANY && D[N].semver.prerelease.length > 0) {
          const B = D[N].semver;
          if (B.major === j.major && B.minor === j.minor && B.patch === j.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Yo;
}
var Xo, qd;
function Js() {
  if (qd) return Xo;
  qd = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, p) {
      if (p = n(p), u instanceof t) {
        if (u.loose === !!p.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), s("comparator", u, p), this.options = p, this.loose = !!p.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(u) {
      const p = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], d = u.match(p);
      if (!d)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new o(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (s("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new o(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, p) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, p).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, p).test(u.semver) : (p = n(p), p.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !p.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, p) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, p) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  Xo = t;
  const n = Dl, { safeRe: r, t: i } = ha, a = Vv, s = Ys, o = dt, c = Ft();
  return Xo;
}
const XS = Ft(), JS = (e, t, n) => {
  try {
    t = new XS(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Qs = JS;
const QS = Ft(), ZS = (e, t) => new QS(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var e1 = ZS;
const t1 = dt, n1 = Ft(), r1 = (e, t, n) => {
  let r = null, i = null, a = null;
  try {
    a = new n1(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    a.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new t1(r, n));
  }), r;
};
var i1 = r1;
const a1 = dt, s1 = Ft(), o1 = (e, t, n) => {
  let r = null, i = null, a = null;
  try {
    a = new s1(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    a.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new a1(r, n));
  }), r;
};
var c1 = o1;
const Jo = dt, l1 = Ft(), Bd = Xs, u1 = (e, t) => {
  e = new l1(e, t);
  let n = new Jo("0.0.0");
  if (e.test(n) || (n = new Jo("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let a = null;
    i.forEach((s) => {
      const o = new Jo(s.semver.version);
      switch (s.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!a || Bd(o, a)) && (a = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), a && (!n || Bd(n, a)) && (n = a);
  }
  return n && e.test(n) ? n : null;
};
var p1 = u1;
const d1 = Ft(), f1 = (e, t) => {
  try {
    return new d1(e, t).range || "*";
  } catch {
    return null;
  }
};
var m1 = f1;
const h1 = dt, Gv = Js(), { ANY: v1 } = Gv, g1 = Ft(), y1 = Qs, zd = Xs, Hd = Fl, b1 = Ul, x1 = Ll, w1 = (e, t, n, r) => {
  e = new h1(e, r), t = new g1(t, r);
  let i, a, s, o, c;
  switch (n) {
    case ">":
      i = zd, a = b1, s = Hd, o = ">", c = ">=";
      break;
    case "<":
      i = Hd, a = x1, s = zd, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (y1(e, t, r))
    return !1;
  for (let l = 0; l < t.set.length; ++l) {
    const u = t.set[l];
    let p = null, d = null;
    if (u.forEach((f) => {
      f.semver === v1 && (f = new Gv(">=0.0.0")), p = p || f, d = d || f, i(f.semver, p.semver, r) ? p = f : s(f.semver, d.semver, r) && (d = f);
    }), p.operator === o || p.operator === c || (!d.operator || d.operator === o) && a(e, d.semver))
      return !1;
    if (d.operator === c && s(e, d.semver))
      return !1;
  }
  return !0;
};
var Ml = w1;
const _1 = Ml, E1 = (e, t, n) => _1(e, t, ">", n);
var $1 = E1;
const S1 = Ml, T1 = (e, t, n) => S1(e, t, "<", n);
var A1 = T1;
const Vd = Ft(), R1 = (e, t, n) => (e = new Vd(e, n), t = new Vd(t, n), e.intersects(t, n));
var P1 = R1;
const O1 = Qs, N1 = jt;
var C1 = (e, t, n) => {
  const r = [];
  let i = null, a = null;
  const s = e.sort((u, p) => N1(u, p, n));
  for (const u of s)
    O1(u, t, n) ? (a = u, i || (i = u)) : (a && r.push([i, a]), a = null, i = null);
  i && r.push([i, null]);
  const o = [];
  for (const [u, p] of r)
    u === p ? o.push(u) : !p && u === s[0] ? o.push("*") : p ? u === s[0] ? o.push(`<=${p}`) : o.push(`${u} - ${p}`) : o.push(`>=${u}`);
  const c = o.join(" || "), l = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < l.length ? c : t;
};
const Gd = Ft(), ql = Js(), { ANY: Qo } = ql, Ei = Qs, Bl = jt, I1 = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Gd(e, n), t = new Gd(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const s = D1(i, a, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, k1 = [new ql(">=0.0.0-0")], Wd = [new ql(">=0.0.0")], D1 = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Qo) {
    if (t.length === 1 && t[0].semver === Qo)
      return !0;
    n.includePrerelease ? e = k1 : e = Wd;
  }
  if (t.length === 1 && t[0].semver === Qo) {
    if (n.includePrerelease)
      return !0;
    t = Wd;
  }
  const r = /* @__PURE__ */ new Set();
  let i, a;
  for (const f of e)
    f.operator === ">" || f.operator === ">=" ? i = Kd(i, f, n) : f.operator === "<" || f.operator === "<=" ? a = Yd(a, f, n) : r.add(f.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && a) {
    if (s = Bl(i.semver, a.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const f of r) {
    if (i && !Ei(f, String(i), n) || a && !Ei(f, String(a), n))
      return null;
    for (const h of t)
      if (!Ei(f, String(h), n))
        return !1;
    return !0;
  }
  let o, c, l, u, p = a && !n.includePrerelease && a.semver.prerelease.length ? a.semver : !1, d = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  p && p.prerelease.length === 1 && a.operator === "<" && p.prerelease[0] === 0 && (p = !1);
  for (const f of t) {
    if (u = u || f.operator === ">" || f.operator === ">=", l = l || f.operator === "<" || f.operator === "<=", i) {
      if (d && f.semver.prerelease && f.semver.prerelease.length && f.semver.major === d.major && f.semver.minor === d.minor && f.semver.patch === d.patch && (d = !1), f.operator === ">" || f.operator === ">=") {
        if (o = Kd(i, f, n), o === f && o !== i)
          return !1;
      } else if (i.operator === ">=" && !Ei(i.semver, String(f), n))
        return !1;
    }
    if (a) {
      if (p && f.semver.prerelease && f.semver.prerelease.length && f.semver.major === p.major && f.semver.minor === p.minor && f.semver.patch === p.patch && (p = !1), f.operator === "<" || f.operator === "<=") {
        if (c = Yd(a, f, n), c === f && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Ei(a.semver, String(f), n))
        return !1;
    }
    if (!f.operator && (a || i) && s !== 0)
      return !1;
  }
  return !(i && l && !a && s !== 0 || a && u && !i && s !== 0 || d || p);
}, Kd = (e, t, n) => {
  if (!e)
    return t;
  const r = Bl(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Yd = (e, t, n) => {
  if (!e)
    return t;
  const r = Bl(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var j1 = I1;
const Zo = ha, Xd = Ks, F1 = dt, Jd = Bv, L1 = Zr, U1 = V$, M1 = K$, q1 = X$, B1 = Q$, z1 = tS, H1 = iS, V1 = oS, G1 = uS, W1 = jt, K1 = mS, Y1 = gS, X1 = jl, J1 = wS, Q1 = $S, Z1 = Xs, eT = Fl, tT = zv, nT = Hv, rT = Ll, iT = Ul, aT = Vv, sT = WS, oT = Js(), cT = Ft(), lT = Qs, uT = e1, pT = i1, dT = c1, fT = p1, mT = m1, hT = Ml, vT = $1, gT = A1, yT = P1, bT = C1, xT = j1;
var zl = {
  parse: L1,
  valid: U1,
  clean: M1,
  inc: q1,
  diff: B1,
  major: z1,
  minor: H1,
  patch: V1,
  prerelease: G1,
  compare: W1,
  rcompare: K1,
  compareLoose: Y1,
  compareBuild: X1,
  sort: J1,
  rsort: Q1,
  gt: Z1,
  lt: eT,
  eq: tT,
  neq: nT,
  gte: rT,
  lte: iT,
  cmp: aT,
  coerce: sT,
  Comparator: oT,
  Range: cT,
  satisfies: lT,
  toComparators: uT,
  maxSatisfying: pT,
  minSatisfying: dT,
  minVersion: fT,
  validRange: mT,
  outside: hT,
  gtr: vT,
  ltr: gT,
  intersects: yT,
  simplifyRange: bT,
  subset: xT,
  SemVer: F1,
  re: Zo.re,
  src: Zo.src,
  tokens: Zo.t,
  SEMVER_SPEC_VERSION: Xd.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Xd.RELEASE_TYPES,
  compareIdentifiers: Jd.compareIdentifiers,
  rcompareIdentifiers: Jd.rcompareIdentifiers
};
const $r = /* @__PURE__ */ la(zl);
var va = {}, $s = { exports: {} };
$s.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, a = 2, s = 9007199254740991, o = "[object Arguments]", c = "[object Array]", l = "[object AsyncFunction]", u = "[object Boolean]", p = "[object Date]", d = "[object Error]", f = "[object Function]", h = "[object GeneratorFunction]", b = "[object Map]", v = "[object Number]", g = "[object Null]", w = "[object Object]", T = "[object Promise]", I = "[object Proxy]", F = "[object RegExp]", O = "[object Set]", U = "[object String]", V = "[object Symbol]", _ = "[object Undefined]", Y = "[object WeakMap]", z = "[object ArrayBuffer]", K = "[object DataView]", J = "[object Float32Array]", D = "[object Float64Array]", j = "[object Int8Array]", G = "[object Int16Array]", N = "[object Int32Array]", B = "[object Uint8Array]", H = "[object Uint8ClampedArray]", M = "[object Uint16Array]", S = "[object Uint32Array]", k = /[\\^$.*+?()[\]{}|]/g, R = /^\[object .+?Constructor\]$/, x = /^(?:0|[1-9]\d*)$/, $ = {};
  $[J] = $[D] = $[j] = $[G] = $[N] = $[B] = $[H] = $[M] = $[S] = !0, $[o] = $[c] = $[z] = $[u] = $[K] = $[p] = $[d] = $[f] = $[b] = $[v] = $[w] = $[F] = $[O] = $[U] = $[Y] = !1;
  var q = typeof kt == "object" && kt && kt.Object === Object && kt, y = typeof self == "object" && self && self.Object === Object && self, m = q || y || Function("return this")(), L = t && !t.nodeType && t, A = L && !0 && e && !e.nodeType && e, ne = A && A.exports === L, he = ne && q.process, ye = function() {
    try {
      return he && he.binding && he.binding("util");
    } catch {
    }
  }(), Pe = ye && ye.isTypedArray;
  function Ne(E, P) {
    for (var W = -1, Z = E == null ? 0 : E.length, be = 0, ae = []; ++W < Z; ) {
      var Ae = E[W];
      P(Ae, W, E) && (ae[be++] = Ae);
    }
    return ae;
  }
  function _t(E, P) {
    for (var W = -1, Z = P.length, be = E.length; ++W < Z; )
      E[be + W] = P[W];
    return E;
  }
  function $e(E, P) {
    for (var W = -1, Z = E == null ? 0 : E.length; ++W < Z; )
      if (P(E[W], W, E))
        return !0;
    return !1;
  }
  function it(E, P) {
    for (var W = -1, Z = Array(E); ++W < E; )
      Z[W] = P(W);
    return Z;
  }
  function Mn(E) {
    return function(P) {
      return E(P);
    };
  }
  function ln(E, P) {
    return E.has(P);
  }
  function Kt(E, P) {
    return E == null ? void 0 : E[P];
  }
  function un(E) {
    var P = -1, W = Array(E.size);
    return E.forEach(function(Z, be) {
      W[++P] = [be, Z];
    }), W;
  }
  function ci(E, P) {
    return function(W) {
      return E(P(W));
    };
  }
  function li(E) {
    var P = -1, W = Array(E.size);
    return E.forEach(function(Z) {
      W[++P] = Z;
    }), W;
  }
  var ui = Array.prototype, qn = Function.prototype, pn = Object.prototype, br = m["__core-js_shared__"], pi = qn.toString, Et = pn.hasOwnProperty, bp = function() {
    var E = /[^.]+$/.exec(br && br.keys && br.keys.IE_PROTO || "");
    return E ? "Symbol(src)_1." + E : "";
  }(), xp = pn.toString, Xy = RegExp(
    "^" + pi.call(Et).replace(k, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), wp = ne ? m.Buffer : void 0, Ra = m.Symbol, _p = m.Uint8Array, Ep = pn.propertyIsEnumerable, Jy = ui.splice, Bn = Ra ? Ra.toStringTag : void 0, $p = Object.getOwnPropertySymbols, Qy = wp ? wp.isBuffer : void 0, Zy = ci(Object.keys, Object), Oo = xr(m, "DataView"), di = xr(m, "Map"), No = xr(m, "Promise"), Co = xr(m, "Set"), Io = xr(m, "WeakMap"), fi = xr(Object, "create"), e0 = Vn(Oo), t0 = Vn(di), n0 = Vn(No), r0 = Vn(Co), i0 = Vn(Io), Sp = Ra ? Ra.prototype : void 0, ko = Sp ? Sp.valueOf : void 0;
  function zn(E) {
    var P = -1, W = E == null ? 0 : E.length;
    for (this.clear(); ++P < W; ) {
      var Z = E[P];
      this.set(Z[0], Z[1]);
    }
  }
  function a0() {
    this.__data__ = fi ? fi(null) : {}, this.size = 0;
  }
  function s0(E) {
    var P = this.has(E) && delete this.__data__[E];
    return this.size -= P ? 1 : 0, P;
  }
  function o0(E) {
    var P = this.__data__;
    if (fi) {
      var W = P[E];
      return W === r ? void 0 : W;
    }
    return Et.call(P, E) ? P[E] : void 0;
  }
  function c0(E) {
    var P = this.__data__;
    return fi ? P[E] !== void 0 : Et.call(P, E);
  }
  function l0(E, P) {
    var W = this.__data__;
    return this.size += this.has(E) ? 0 : 1, W[E] = fi && P === void 0 ? r : P, this;
  }
  zn.prototype.clear = a0, zn.prototype.delete = s0, zn.prototype.get = o0, zn.prototype.has = c0, zn.prototype.set = l0;
  function Yt(E) {
    var P = -1, W = E == null ? 0 : E.length;
    for (this.clear(); ++P < W; ) {
      var Z = E[P];
      this.set(Z[0], Z[1]);
    }
  }
  function u0() {
    this.__data__ = [], this.size = 0;
  }
  function p0(E) {
    var P = this.__data__, W = Oa(P, E);
    if (W < 0)
      return !1;
    var Z = P.length - 1;
    return W == Z ? P.pop() : Jy.call(P, W, 1), --this.size, !0;
  }
  function d0(E) {
    var P = this.__data__, W = Oa(P, E);
    return W < 0 ? void 0 : P[W][1];
  }
  function f0(E) {
    return Oa(this.__data__, E) > -1;
  }
  function m0(E, P) {
    var W = this.__data__, Z = Oa(W, E);
    return Z < 0 ? (++this.size, W.push([E, P])) : W[Z][1] = P, this;
  }
  Yt.prototype.clear = u0, Yt.prototype.delete = p0, Yt.prototype.get = d0, Yt.prototype.has = f0, Yt.prototype.set = m0;
  function Hn(E) {
    var P = -1, W = E == null ? 0 : E.length;
    for (this.clear(); ++P < W; ) {
      var Z = E[P];
      this.set(Z[0], Z[1]);
    }
  }
  function h0() {
    this.size = 0, this.__data__ = {
      hash: new zn(),
      map: new (di || Yt)(),
      string: new zn()
    };
  }
  function v0(E) {
    var P = Na(this, E).delete(E);
    return this.size -= P ? 1 : 0, P;
  }
  function g0(E) {
    return Na(this, E).get(E);
  }
  function y0(E) {
    return Na(this, E).has(E);
  }
  function b0(E, P) {
    var W = Na(this, E), Z = W.size;
    return W.set(E, P), this.size += W.size == Z ? 0 : 1, this;
  }
  Hn.prototype.clear = h0, Hn.prototype.delete = v0, Hn.prototype.get = g0, Hn.prototype.has = y0, Hn.prototype.set = b0;
  function Pa(E) {
    var P = -1, W = E == null ? 0 : E.length;
    for (this.__data__ = new Hn(); ++P < W; )
      this.add(E[P]);
  }
  function x0(E) {
    return this.__data__.set(E, r), this;
  }
  function w0(E) {
    return this.__data__.has(E);
  }
  Pa.prototype.add = Pa.prototype.push = x0, Pa.prototype.has = w0;
  function dn(E) {
    var P = this.__data__ = new Yt(E);
    this.size = P.size;
  }
  function _0() {
    this.__data__ = new Yt(), this.size = 0;
  }
  function E0(E) {
    var P = this.__data__, W = P.delete(E);
    return this.size = P.size, W;
  }
  function $0(E) {
    return this.__data__.get(E);
  }
  function S0(E) {
    return this.__data__.has(E);
  }
  function T0(E, P) {
    var W = this.__data__;
    if (W instanceof Yt) {
      var Z = W.__data__;
      if (!di || Z.length < n - 1)
        return Z.push([E, P]), this.size = ++W.size, this;
      W = this.__data__ = new Hn(Z);
    }
    return W.set(E, P), this.size = W.size, this;
  }
  dn.prototype.clear = _0, dn.prototype.delete = E0, dn.prototype.get = $0, dn.prototype.has = S0, dn.prototype.set = T0;
  function A0(E, P) {
    var W = Ca(E), Z = !W && B0(E), be = !W && !Z && Do(E), ae = !W && !Z && !be && kp(E), Ae = W || Z || be || ae, Fe = Ae ? it(E.length, String) : [], Be = Fe.length;
    for (var Se in E)
      Et.call(E, Se) && !(Ae && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Se == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      be && (Se == "offset" || Se == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ae && (Se == "buffer" || Se == "byteLength" || Se == "byteOffset") || // Skip index properties.
      F0(Se, Be))) && Fe.push(Se);
    return Fe;
  }
  function Oa(E, P) {
    for (var W = E.length; W--; )
      if (Op(E[W][0], P))
        return W;
    return -1;
  }
  function R0(E, P, W) {
    var Z = P(E);
    return Ca(E) ? Z : _t(Z, W(E));
  }
  function mi(E) {
    return E == null ? E === void 0 ? _ : g : Bn && Bn in Object(E) ? D0(E) : q0(E);
  }
  function Tp(E) {
    return hi(E) && mi(E) == o;
  }
  function Ap(E, P, W, Z, be) {
    return E === P ? !0 : E == null || P == null || !hi(E) && !hi(P) ? E !== E && P !== P : P0(E, P, W, Z, Ap, be);
  }
  function P0(E, P, W, Z, be, ae) {
    var Ae = Ca(E), Fe = Ca(P), Be = Ae ? c : fn(E), Se = Fe ? c : fn(P);
    Be = Be == o ? w : Be, Se = Se == o ? w : Se;
    var gt = Be == w, Pt = Se == w, Xe = Be == Se;
    if (Xe && Do(E)) {
      if (!Do(P))
        return !1;
      Ae = !0, gt = !1;
    }
    if (Xe && !gt)
      return ae || (ae = new dn()), Ae || kp(E) ? Rp(E, P, W, Z, be, ae) : I0(E, P, Be, W, Z, be, ae);
    if (!(W & i)) {
      var $t = gt && Et.call(E, "__wrapped__"), St = Pt && Et.call(P, "__wrapped__");
      if ($t || St) {
        var mn = $t ? E.value() : E, Xt = St ? P.value() : P;
        return ae || (ae = new dn()), be(mn, Xt, W, Z, ae);
      }
    }
    return Xe ? (ae || (ae = new dn()), k0(E, P, W, Z, be, ae)) : !1;
  }
  function O0(E) {
    if (!Ip(E) || U0(E))
      return !1;
    var P = Np(E) ? Xy : R;
    return P.test(Vn(E));
  }
  function N0(E) {
    return hi(E) && Cp(E.length) && !!$[mi(E)];
  }
  function C0(E) {
    if (!M0(E))
      return Zy(E);
    var P = [];
    for (var W in Object(E))
      Et.call(E, W) && W != "constructor" && P.push(W);
    return P;
  }
  function Rp(E, P, W, Z, be, ae) {
    var Ae = W & i, Fe = E.length, Be = P.length;
    if (Fe != Be && !(Ae && Be > Fe))
      return !1;
    var Se = ae.get(E);
    if (Se && ae.get(P))
      return Se == P;
    var gt = -1, Pt = !0, Xe = W & a ? new Pa() : void 0;
    for (ae.set(E, P), ae.set(P, E); ++gt < Fe; ) {
      var $t = E[gt], St = P[gt];
      if (Z)
        var mn = Ae ? Z(St, $t, gt, P, E, ae) : Z($t, St, gt, E, P, ae);
      if (mn !== void 0) {
        if (mn)
          continue;
        Pt = !1;
        break;
      }
      if (Xe) {
        if (!$e(P, function(Xt, Gn) {
          if (!ln(Xe, Gn) && ($t === Xt || be($t, Xt, W, Z, ae)))
            return Xe.push(Gn);
        })) {
          Pt = !1;
          break;
        }
      } else if (!($t === St || be($t, St, W, Z, ae))) {
        Pt = !1;
        break;
      }
    }
    return ae.delete(E), ae.delete(P), Pt;
  }
  function I0(E, P, W, Z, be, ae, Ae) {
    switch (W) {
      case K:
        if (E.byteLength != P.byteLength || E.byteOffset != P.byteOffset)
          return !1;
        E = E.buffer, P = P.buffer;
      case z:
        return !(E.byteLength != P.byteLength || !ae(new _p(E), new _p(P)));
      case u:
      case p:
      case v:
        return Op(+E, +P);
      case d:
        return E.name == P.name && E.message == P.message;
      case F:
      case U:
        return E == P + "";
      case b:
        var Fe = un;
      case O:
        var Be = Z & i;
        if (Fe || (Fe = li), E.size != P.size && !Be)
          return !1;
        var Se = Ae.get(E);
        if (Se)
          return Se == P;
        Z |= a, Ae.set(E, P);
        var gt = Rp(Fe(E), Fe(P), Z, be, ae, Ae);
        return Ae.delete(E), gt;
      case V:
        if (ko)
          return ko.call(E) == ko.call(P);
    }
    return !1;
  }
  function k0(E, P, W, Z, be, ae) {
    var Ae = W & i, Fe = Pp(E), Be = Fe.length, Se = Pp(P), gt = Se.length;
    if (Be != gt && !Ae)
      return !1;
    for (var Pt = Be; Pt--; ) {
      var Xe = Fe[Pt];
      if (!(Ae ? Xe in P : Et.call(P, Xe)))
        return !1;
    }
    var $t = ae.get(E);
    if ($t && ae.get(P))
      return $t == P;
    var St = !0;
    ae.set(E, P), ae.set(P, E);
    for (var mn = Ae; ++Pt < Be; ) {
      Xe = Fe[Pt];
      var Xt = E[Xe], Gn = P[Xe];
      if (Z)
        var Dp = Ae ? Z(Gn, Xt, Xe, P, E, ae) : Z(Xt, Gn, Xe, E, P, ae);
      if (!(Dp === void 0 ? Xt === Gn || be(Xt, Gn, W, Z, ae) : Dp)) {
        St = !1;
        break;
      }
      mn || (mn = Xe == "constructor");
    }
    if (St && !mn) {
      var Ia = E.constructor, ka = P.constructor;
      Ia != ka && "constructor" in E && "constructor" in P && !(typeof Ia == "function" && Ia instanceof Ia && typeof ka == "function" && ka instanceof ka) && (St = !1);
    }
    return ae.delete(E), ae.delete(P), St;
  }
  function Pp(E) {
    return R0(E, V0, j0);
  }
  function Na(E, P) {
    var W = E.__data__;
    return L0(P) ? W[typeof P == "string" ? "string" : "hash"] : W.map;
  }
  function xr(E, P) {
    var W = Kt(E, P);
    return O0(W) ? W : void 0;
  }
  function D0(E) {
    var P = Et.call(E, Bn), W = E[Bn];
    try {
      E[Bn] = void 0;
      var Z = !0;
    } catch {
    }
    var be = xp.call(E);
    return Z && (P ? E[Bn] = W : delete E[Bn]), be;
  }
  var j0 = $p ? function(E) {
    return E == null ? [] : (E = Object(E), Ne($p(E), function(P) {
      return Ep.call(E, P);
    }));
  } : G0, fn = mi;
  (Oo && fn(new Oo(new ArrayBuffer(1))) != K || di && fn(new di()) != b || No && fn(No.resolve()) != T || Co && fn(new Co()) != O || Io && fn(new Io()) != Y) && (fn = function(E) {
    var P = mi(E), W = P == w ? E.constructor : void 0, Z = W ? Vn(W) : "";
    if (Z)
      switch (Z) {
        case e0:
          return K;
        case t0:
          return b;
        case n0:
          return T;
        case r0:
          return O;
        case i0:
          return Y;
      }
    return P;
  });
  function F0(E, P) {
    return P = P ?? s, !!P && (typeof E == "number" || x.test(E)) && E > -1 && E % 1 == 0 && E < P;
  }
  function L0(E) {
    var P = typeof E;
    return P == "string" || P == "number" || P == "symbol" || P == "boolean" ? E !== "__proto__" : E === null;
  }
  function U0(E) {
    return !!bp && bp in E;
  }
  function M0(E) {
    var P = E && E.constructor, W = typeof P == "function" && P.prototype || pn;
    return E === W;
  }
  function q0(E) {
    return xp.call(E);
  }
  function Vn(E) {
    if (E != null) {
      try {
        return pi.call(E);
      } catch {
      }
      try {
        return E + "";
      } catch {
      }
    }
    return "";
  }
  function Op(E, P) {
    return E === P || E !== E && P !== P;
  }
  var B0 = Tp(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Tp : function(E) {
    return hi(E) && Et.call(E, "callee") && !Ep.call(E, "callee");
  }, Ca = Array.isArray;
  function z0(E) {
    return E != null && Cp(E.length) && !Np(E);
  }
  var Do = Qy || W0;
  function H0(E, P) {
    return Ap(E, P);
  }
  function Np(E) {
    if (!Ip(E))
      return !1;
    var P = mi(E);
    return P == f || P == h || P == l || P == I;
  }
  function Cp(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= s;
  }
  function Ip(E) {
    var P = typeof E;
    return E != null && (P == "object" || P == "function");
  }
  function hi(E) {
    return E != null && typeof E == "object";
  }
  var kp = Pe ? Mn(Pe) : N0;
  function V0(E) {
    return z0(E) ? A0(E) : C0(E);
  }
  function G0() {
    return [];
  }
  function W0() {
    return !1;
  }
  e.exports = H0;
})($s, $s.exports);
var wT = $s.exports;
Object.defineProperty(va, "__esModule", { value: !0 });
va.DownloadedUpdateHelper = void 0;
va.createTempUpdateFile = TT;
const _T = Xr, ET = Ee, Qd = wT, Yn = Un, qi = pe;
class $T {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return qi.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Qd(this.versionInfo, n) && Qd(this.fileInfo.info, r.info) && await (0, Yn.pathExists)(t) ? t : null;
    const a = await this.getValidCachedUpdateFile(r, i);
    return a === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = a, a);
  }
  async setDownloadedFile(t, n, r, i, a, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, Yn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Yn.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, n) {
    const r = this.getUpdateInfoFile();
    if (!await (0, Yn.pathExists)(r))
      return null;
    let a;
    try {
      a = await (0, Yn.readJson)(r);
    } catch (l) {
      let u = "No cached update info available";
      return l.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${l.message})`), n.info(u), null;
    }
    if (!((a == null ? void 0 : a.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const o = qi.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, Yn.pathExists)(o))
      return n.info("Cached update file doesn't exist"), null;
    const c = await ST(o);
    return t.info.sha512 !== c ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, o);
  }
  getUpdateInfoFile() {
    return qi.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
va.DownloadedUpdateHelper = $T;
function ST(e, t = "sha512", n = "base64", r) {
  return new Promise((i, a) => {
    const s = (0, _T.createHash)(t);
    s.on("error", a).setEncoding(n), (0, ET.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function TT(e, t, n) {
  let r = 0, i = qi.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, Yn.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = qi.join(t, `${r++}-${e}`);
    }
  return i;
}
var Zs = {}, Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
Hl.getAppCacheDir = RT;
const ec = pe, AT = ca;
function RT() {
  const e = (0, AT.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || ec.join(e, "AppData", "Local") : process.platform === "darwin" ? t = ec.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || ec.join(e, ".cache"), t;
}
Object.defineProperty(Zs, "__esModule", { value: !0 });
Zs.ElectronAppAdapter = void 0;
const Zd = pe, PT = Hl;
class OT {
  constructor(t = In.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Zd.join(process.resourcesPath, "app-update.yml") : Zd.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, PT.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (n, r) => t(r));
  }
}
Zs.ElectronAppAdapter = OT;
var Wv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = Me;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return In.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(a) {
      super(), this.proxyLoginCallback = a, this.cachedSession = null;
    }
    async download(a, s, o) {
      return await o.cancellationToken.createPromise((c, l, u) => {
        const p = {
          headers: o.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, p), (0, t.configureRequestOptions)(p), this.doDownload(p, {
          destination: s,
          options: o,
          onCancel: u,
          callback: (d) => {
            d == null ? c(s) : l(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, s) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const o = In.net.request({
        ...a,
        session: this.cachedSession
      });
      return o.on("response", s), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
    }
    addRedirectHandlers(a, s, o, c, l) {
      a.on("redirect", (u, p, d) => {
        a.abort(), c > this.maxRedirects ? o(this.createMaxRedirectError()) : l(t.HttpExecutor.prepareRedirectUrlOptions(d, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(Wv);
var ga = {}, Rt = {}, NT = 1 / 0, CT = "[object Symbol]", Kv = /[\\^$.*+?()[\]{}|]/g, IT = RegExp(Kv.source), kT = typeof kt == "object" && kt && kt.Object === Object && kt, DT = typeof self == "object" && self && self.Object === Object && self, jT = kT || DT || Function("return this")(), FT = Object.prototype, LT = FT.toString, ef = jT.Symbol, tf = ef ? ef.prototype : void 0, nf = tf ? tf.toString : void 0;
function UT(e) {
  if (typeof e == "string")
    return e;
  if (qT(e))
    return nf ? nf.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -NT ? "-0" : t;
}
function MT(e) {
  return !!e && typeof e == "object";
}
function qT(e) {
  return typeof e == "symbol" || MT(e) && LT.call(e) == CT;
}
function BT(e) {
  return e == null ? "" : UT(e);
}
function zT(e) {
  return e = BT(e), e && IT.test(e) ? e.replace(Kv, "\\$&") : e;
}
var HT = zT;
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.newBaseUrl = GT;
Rt.newUrlFromBase = Mc;
Rt.getChannelFilename = WT;
Rt.blockmapFiles = KT;
const Yv = Gt, VT = HT;
function GT(e) {
  const t = new Yv.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Mc(e, t, n = !1) {
  const r = new Yv.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function WT(e) {
  return `${e}.yml`;
}
function KT(e, t, n) {
  const r = Mc(`${e.pathname}.blockmap`, e);
  return [Mc(`${e.pathname.replace(new RegExp(VT(n), "g"), t)}.blockmap`, e), r];
}
var qe = {};
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.Provider = void 0;
qe.findFile = JT;
qe.parseUpdateInfo = QT;
qe.getFileList = Xv;
qe.resolveFiles = ZT;
const jn = Me, YT = Ye, rf = Rt;
class XT {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, n, r) {
    return this.executor.request(this.createRequestOptions(t, n), r);
  }
  createRequestOptions(t, n) {
    const r = {};
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, jn.configureRequestUrl)(t, r), r;
  }
}
qe.Provider = XT;
function JT(e, t, n) {
  if (e.length === 0)
    throw (0, jn.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const r = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return r ?? (n == null ? e[0] : e.find((i) => !n.some((a) => i.url.pathname.toLowerCase().endsWith(`.${a}`))));
}
function QT(e, t, n) {
  if (e == null)
    throw (0, jn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, YT.load)(e);
  } catch (i) {
    throw (0, jn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function Xv(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, jn.newError)(`No files provided: ${(0, jn.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function ZT(e, t, n = (r) => r) {
  const i = Xv(e).map((o) => {
    if (o.sha2 == null && o.sha512 == null)
      throw (0, jn.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, jn.safeStringifyJson)(o)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, rf.newUrlFromBase)(n(o.url), t),
      info: o
    };
  }), a = e.packages, s = a == null ? null : a[process.arch] || a.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, rf.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(ga, "__esModule", { value: !0 });
ga.GenericProvider = void 0;
const af = Me, tc = Rt, nc = qe;
class eA extends nc.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, tc.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, tc.getChannelFilename)(this.channel), n = (0, tc.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, nc.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof af.HttpError && i.statusCode === 404)
          throw (0, af.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && r < 3) {
          await new Promise((a, s) => {
            try {
              setTimeout(a, 1e3 * r);
            } catch (o) {
              s(o);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, nc.resolveFiles)(t, this.baseUrl);
  }
}
ga.GenericProvider = eA;
var eo = {}, to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
to.BitbucketProvider = void 0;
const sf = Me, rc = Rt, ic = qe;
class tA extends ic.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, rc.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new sf.CancellationToken(), n = (0, rc.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, rc.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, ic.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, sf.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, ic.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
to.BitbucketProvider = tA;
var Fn = {};
Object.defineProperty(Fn, "__esModule", { value: !0 });
Fn.GitHubProvider = Fn.BaseGitHubProvider = void 0;
Fn.computeReleaseNotes = Qv;
const Qt = Me, kr = zl, nA = Gt, Dr = Rt, qc = qe, ac = /\/tag\/([^/]+)$/;
class Jv extends qc.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Dr.newBaseUrl)((0, Qt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Dr.newBaseUrl)((0, Qt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
Fn.BaseGitHubProvider = Jv;
class rA extends Jv {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, a;
    const s = new Qt.CancellationToken(), o = await this.httpRequest((0, Dr.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), c = (0, Qt.parseXml)(o);
    let l = c.element("entry", !1, "No published versions on GitHub"), u = null;
    try {
      if (this.updater.allowPrerelease) {
        const v = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = kr.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (v === null)
          u = ac.exec(l.element("link").attribute("href"))[1];
        else
          for (const g of c.getElements("entry")) {
            const w = ac.exec(g.element("link").attribute("href"));
            if (w === null)
              continue;
            const T = w[1], I = ((r = kr.prerelease(T)) === null || r === void 0 ? void 0 : r[0]) || null, F = !v || ["alpha", "beta"].includes(v), O = I !== null && !["alpha", "beta"].includes(String(I));
            if (F && !O && !(v === "beta" && I === "alpha")) {
              u = T;
              break;
            }
            if (I && I === v) {
              u = T;
              break;
            }
          }
      } else {
        u = await this.getLatestTagName(s);
        for (const v of c.getElements("entry"))
          if (ac.exec(v.element("link").attribute("href"))[1] === u) {
            l = v;
            break;
          }
      }
    } catch (v) {
      throw (0, Qt.newError)(`Cannot parse releases feed: ${v.stack || v.message},
XML:
${o}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (u == null)
      throw (0, Qt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let p, d = "", f = "";
    const h = async (v) => {
      d = (0, Dr.getChannelFilename)(v), f = (0, Dr.newUrlFromBase)(this.getBaseDownloadPath(String(u), d), this.baseUrl);
      const g = this.createRequestOptions(f);
      try {
        return await this.executor.request(g, s);
      } catch (w) {
        throw w instanceof Qt.HttpError && w.statusCode === 404 ? (0, Qt.newError)(`Cannot find ${d} in the latest release artifacts (${f}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let v = this.channel;
      this.updater.allowPrerelease && (!((i = kr.prerelease(u)) === null || i === void 0) && i[0]) && (v = this.getCustomChannelName(String((a = kr.prerelease(u)) === null || a === void 0 ? void 0 : a[0]))), p = await h(v);
    } catch (v) {
      if (this.updater.allowPrerelease)
        p = await h(this.getDefaultChannelName());
      else
        throw v;
    }
    const b = (0, qc.parseUpdateInfo)(p, d, f);
    return b.releaseName == null && (b.releaseName = l.elementValueOrEmpty("title")), b.releaseNotes == null && (b.releaseNotes = Qv(this.updater.currentVersion, this.updater.fullChangelog, c, l)), {
      tag: u,
      ...b
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Dr.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new nA.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Qt.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, qc.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
Fn.GitHubProvider = rA;
function of(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Qv(e, t, n, r) {
  if (!t)
    return of(r);
  const i = [];
  for (const a of n.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    kr.lt(e, s) && i.push({
      version: s,
      note: of(a)
    });
  }
  return i.sort((a, s) => kr.rcompare(a.version, s.version));
}
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
no.KeygenProvider = void 0;
const cf = Me, sc = Rt, oc = qe;
class iA extends oc.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.baseUrl = (0, sc.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new cf.CancellationToken(), n = (0, sc.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, sc.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, oc.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, cf.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, oc.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
no.KeygenProvider = iA;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.PrivateGitHubProvider = void 0;
const Sr = Me, aA = Ye, sA = pe, lf = Gt, uf = Rt, oA = Fn, cA = qe;
class lA extends oA.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new Sr.CancellationToken(), n = (0, uf.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((o) => o.name === n);
    if (i == null)
      throw (0, Sr.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new lf.URL(i.url);
    let s;
    try {
      s = (0, aA.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (o) {
      throw o instanceof Sr.HttpError && o.statusCode === 404 ? (0, Sr.newError)(`Cannot find ${n} in the latest release artifacts (${a}): ${o.stack || o.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : o;
    }
    return s.assets = r.assets, s;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const n = this.updater.allowPrerelease;
    let r = this.basePath;
    n || (r = `${r}/latest`);
    const i = (0, uf.newUrlFromBase)(r, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return n ? a.find((s) => s.prerelease) || a[0] : a;
    } catch (a) {
      throw (0, Sr.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, cA.getFileList)(t).map((n) => {
      const r = sA.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((a) => a != null && a.name === r);
      if (i == null)
        throw (0, Sr.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new lf.URL(i.url),
        info: n
      };
    });
  }
}
ro.PrivateGitHubProvider = lA;
Object.defineProperty(eo, "__esModule", { value: !0 });
eo.isUrlProbablySupportMultiRangeRequests = Zv;
eo.createClient = mA;
const Va = Me, uA = to, pf = ga, pA = Fn, dA = no, fA = ro;
function Zv(e) {
  return !e.includes("s3.amazonaws.com");
}
function mA(e, t, n) {
  if (typeof e == "string")
    throw (0, Va.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new pA.GitHubProvider(i, t, n) : new fA.PrivateGitHubProvider(i, t, a, n);
    }
    case "bitbucket":
      return new uA.BitbucketProvider(e, t, n);
    case "keygen":
      return new dA.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new pf.GenericProvider({
        provider: "generic",
        url: (0, Va.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new pf.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Zv(i.url)
      });
    }
    case "custom": {
      const i = e, a = i.updateProvider;
      if (!a)
        throw (0, Va.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new a(i, t, n);
    }
    default:
      throw (0, Va.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var io = {}, ya = {}, ei = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.OperationKind = void 0;
gr.computeOperations = hA;
var tr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(tr || (gr.OperationKind = tr = {}));
function hA(e, t, n) {
  const r = ff(e.files), i = ff(t.files);
  let a = null;
  const s = t.files[0], o = [], c = s.name, l = r.get(c);
  if (l == null)
    throw new Error(`no file ${c} in old blockmap`);
  const u = i.get(c);
  let p = 0;
  const { checksumToOffset: d, checksumToOldSize: f } = gA(r.get(c), l.offset, n);
  let h = s.offset;
  for (let b = 0; b < u.checksums.length; h += u.sizes[b], b++) {
    const v = u.sizes[b], g = u.checksums[b];
    let w = d.get(g);
    w != null && f.get(g) !== v && (n.warn(`Checksum ("${g}") matches, but size differs (old: ${f.get(g)}, new: ${v})`), w = void 0), w === void 0 ? (p++, a != null && a.kind === tr.DOWNLOAD && a.end === h ? a.end += v : (a = {
      kind: tr.DOWNLOAD,
      start: h,
      end: h + v
      // oldBlocks: null,
    }, df(a, o, g, b))) : a != null && a.kind === tr.COPY && a.end === w ? a.end += v : (a = {
      kind: tr.COPY,
      start: w,
      end: w + v
      // oldBlocks: [checksum]
    }, df(a, o, g, b));
  }
  return p > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${p} changed blocks`), o;
}
const vA = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function df(e, t, n, r) {
  if (vA && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((s, o) => s < o ? s : o);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${tr[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - a} until ${i.end - a} and ${e.start - a} until ${e.end - a}`);
    }
  }
  t.push(e);
}
function gA(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let a = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const o = e.checksums[s], c = e.sizes[s], l = i.get(o);
    if (l === void 0)
      r.set(o, a), i.set(o, c);
    else if (n.debug != null) {
      const u = l === c ? "(same size)" : `(size: ${l}, this size: ${c})`;
      n.debug(`${o} duplicated in blockmap ${u}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    a += c;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function ff(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.DataSplitter = void 0;
ei.copyData = eg;
const Ga = Me, yA = Ee, bA = Ve, xA = gr, mf = Buffer.from(`\r
\r
`);
var En;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(En || (En = {}));
function eg(e, t, n, r, i) {
  const a = (0, yA.createReadStream)("", {
    fd: n,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  a.on("error", r), a.once("end", i), a.pipe(t, {
    end: !1
  });
}
class wA extends bA.Writable {
  constructor(t, n, r, i, a, s) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = a, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = En.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, n, r) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(r).catch(r);
  }
  async handleData(t) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Ga.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === En.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = En.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === En.BODY)
          this.readState = En.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, Ga.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const o = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (o < s)
            await this.copyExistingData(o, s);
          else if (o > s)
            throw (0, Ga.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = En.HEADER;
            return;
          }
        }
        const r = this.partIndexToLength[this.partIndex], i = n + r, a = Math.min(i, t.length);
        if (await this.processPartStarted(t, n, a), this.remainingPartDataCount = r - (a - n), this.remainingPartDataCount > 0)
          return;
        if (n = i + this.boundaryLength, n >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, n) {
    return new Promise((r, i) => {
      const a = () => {
        if (t === n) {
          r();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== xA.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        eg(s, this.out, this.options.oldFileFd, i, () => {
          t++, a();
        });
      };
      a();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = t.indexOf(mf, n);
    if (r !== -1)
      return r + mf.length;
    const i = n === 0 ? t : t.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ga.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, n, r);
  }
  processPartData(t, n, r) {
    this.actualPartLength += r - n;
    const i = this.out;
    return i.write(n === 0 && t.length === r ? t : t.slice(n, r)) ? Promise.resolve() : new Promise((a, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), a();
      });
    });
  }
}
ei.DataSplitter = wA;
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.executeTasksUsingMultipleRangeRequests = _A;
ao.checkIsRangesSupported = zc;
const Bc = Me, hf = ei, vf = gr;
function _A(e, t, n, r, i) {
  const a = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const o = s + 1e3;
    EA(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, o),
      oldFileFd: r
    }, n, () => a(o), i);
  };
  return a;
}
function EA(e, t, n, r, i) {
  let a = "bytes=", s = 0;
  const o = /* @__PURE__ */ new Map(), c = [];
  for (let p = t.start; p < t.end; p++) {
    const d = t.tasks[p];
    d.kind === vf.OperationKind.DOWNLOAD && (a += `${d.start}-${d.end - 1}, `, o.set(s, p), s++, c.push(d.end - d.start));
  }
  if (s <= 1) {
    const p = (d) => {
      if (d >= t.end) {
        r();
        return;
      }
      const f = t.tasks[d++];
      if (f.kind === vf.OperationKind.COPY)
        (0, hf.copyData)(f, n, t.oldFileFd, i, () => p(d));
      else {
        const h = e.createRequestOptions();
        h.headers.Range = `bytes=${f.start}-${f.end - 1}`;
        const b = e.httpExecutor.createRequest(h, (v) => {
          zc(v, i) && (v.pipe(n, {
            end: !1
          }), v.once("end", () => p(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(b, i), b.end();
      }
    };
    p(t.start);
    return;
  }
  const l = e.createRequestOptions();
  l.headers.Range = a.substring(0, a.length - 2);
  const u = e.httpExecutor.createRequest(l, (p) => {
    if (!zc(p, i))
      return;
    const d = (0, Bc.safeGetHeader)(p, "content-type"), f = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (f == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const h = new hf.DataSplitter(n, t, o, f[1] || f[2], c, r);
    h.on("error", i), p.pipe(h), p.on("end", () => {
      setTimeout(() => {
        u.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function zc(e, t) {
  if (e.statusCode >= 400)
    return t((0, Bc.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, Bc.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
so.ProgressDifferentialDownloadCallbackTransform = void 0;
const $A = Ve;
var jr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(jr || (jr = {}));
class SA extends $A.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = jr.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == jr.COPY) {
      r(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  beginFileCopy() {
    this.operationType = jr.COPY;
  }
  beginRangeDownload() {
    this.operationType = jr.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
so.ProgressDifferentialDownloadCallbackTransform = SA;
Object.defineProperty(ya, "__esModule", { value: !0 });
ya.DifferentialDownloader = void 0;
const $i = Me, cc = Un, TA = Ee, AA = ei, RA = Gt, Wa = gr, gf = ao, PA = so;
class OA {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, n, r) {
    this.blockAwareFileInfo = t, this.httpExecutor = n, this.options = r, this.fileMetadataBuffer = null, this.logger = r.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, $i.configureRequestUrl)(this.options.newUrl, t), (0, $i.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, Wa.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let a = 0, s = 0;
    for (const c of i) {
      const l = c.end - c.start;
      c.kind === Wa.OperationKind.DOWNLOAD ? a += l : s += l;
    }
    const o = this.blockAwareFileInfo.size;
    if (a + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== o)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${s}, newSize: ${o}`);
    return r.info(`Full: ${yf(o)}, To download: ${yf(a)} (${Math.round(a / (o / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, cc.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, n).then(r).catch((i) => r().catch((a) => {
      try {
        this.logger.error(`cannot close files: ${a}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, n) {
    const r = await (0, cc.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, cc.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const a = (0, TA.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, o) => {
      const c = [];
      let l;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const g = [];
        let w = 0;
        for (const I of t)
          I.kind === Wa.OperationKind.DOWNLOAD && (g.push(I.end - I.start), w += I.end - I.start);
        const T = {
          expectedByteCounts: g,
          grandTotal: w
        };
        l = new PA.ProgressDifferentialDownloadCallbackTransform(T, this.options.cancellationToken, this.options.onProgress), c.push(l);
      }
      const u = new $i.DigestTransform(this.blockAwareFileInfo.sha512);
      u.isValidateOnEnd = !1, c.push(u), a.on("finish", () => {
        a.close(() => {
          n.splice(1, 1);
          try {
            u.validate();
          } catch (g) {
            o(g);
            return;
          }
          s(void 0);
        });
      }), c.push(a);
      let p = null;
      for (const g of c)
        g.on("error", o), p == null ? p = g : p = p.pipe(g);
      const d = c[0];
      let f;
      if (this.options.isUseMultipleRangeRequest) {
        f = (0, gf.executeTasksUsingMultipleRangeRequests)(this, t, d, r, o), f(0);
        return;
      }
      let h = 0, b = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const v = this.createRequestOptions();
      v.redirect = "manual", f = (g) => {
        var w, T;
        if (g >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const I = t[g++];
        if (I.kind === Wa.OperationKind.COPY) {
          l && l.beginFileCopy(), (0, AA.copyData)(I, d, r, o, () => f(g));
          return;
        }
        const F = `bytes=${I.start}-${I.end - 1}`;
        v.headers.range = F, (T = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || T === void 0 || T.call(w, `download range: ${F}`), l && l.beginRangeDownload();
        const O = this.httpExecutor.createRequest(v, (U) => {
          U.on("error", o), U.on("aborted", () => {
            o(new Error("response has been aborted by the server"));
          }), U.statusCode >= 400 && o((0, $i.createHttpError)(U)), U.pipe(d, {
            end: !1
          }), U.once("end", () => {
            l && l.endRangeDownload(), ++h === 100 ? (h = 0, setTimeout(() => f(g), 1e3)) : f(g);
          });
        });
        O.on("redirect", (U, V, _) => {
          this.logger.info(`Redirect to ${NA(_)}`), b = _, (0, $i.configureRequestUrl)(new RA.URL(b), v), O.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(O, o), O.end();
      }, f(0);
    });
  }
  async readRemoteBytes(t, n) {
    const r = Buffer.allocUnsafe(n + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${n}`;
    let a = 0;
    if (await this.request(i, (s) => {
      s.copy(r, a), a += s.length;
    }), a !== r.length)
      throw new Error(`Received data length ${a} is not equal to expected ${r.length}`);
    return r;
  }
  request(t, n) {
    return new Promise((r, i) => {
      const a = this.httpExecutor.createRequest(t, (s) => {
        (0, gf.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(a, i), a.end();
    });
  }
}
ya.DifferentialDownloader = OA;
function yf(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function NA(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(io, "__esModule", { value: !0 });
io.GenericDifferentialDownloader = void 0;
const CA = ya;
class IA extends CA.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
io.GenericDifferentialDownloader = IA;
var bf;
function Vl() {
  if (bf) return Wn;
  bf = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.NoOpLogger = Wn.AppUpdater = void 0;
  const e = Me, t = Xr, n = ca, r = Ym, i = Un, a = Ye, s = Ws, o = pe, c = zl, l = va, u = Zs, p = Wv, d = ga, f = ti(), h = eo, b = Ht, v = Rt, g = io;
  let w = class tg extends r.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(O) {
      if (this._channel != null) {
        if (typeof O != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${O}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (O.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = O, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(O) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: O
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, p.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(O) {
      this._logger = O ?? new I();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(O) {
      this.clientPromise = null, this._appUpdateConfigPath = O, this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig());
    }
    constructor(O, U) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new f.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new s.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (Y) => {
        this._logger.error(`Error: ${Y.stack || Y.message}`);
      }), U == null ? (this.app = new u.ElectronAppAdapter(), this.httpExecutor = new p.ElectronHttpExecutor((Y, z) => this.emit("login", Y, z))) : (this.app = U, this.httpExecutor = null);
      const V = this.app.version, _ = (0, c.parse)(V);
      if (_ == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${V}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = _, this.allowPrerelease = T(_), O != null && (this.setFeedURL(O), typeof O != "string" && O.requestHeaders && (this.requestHeaders = O.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(O) {
      const U = this.createProviderRuntimeOptions();
      let V;
      typeof O == "string" ? V = new d.GenericProvider({ provider: "generic", url: O }, this, {
        ...U,
        isUseMultipleRangeRequest: (0, h.isUrlProbablySupportMultiRangeRequests)(O)
      }) : V = (0, h.createClient)(O, this, U), this.clientPromise = Promise.resolve(V);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let O = this.checkForUpdatesPromise;
      if (O != null)
        return this._logger.info("Checking for update (already in progress)"), O;
      const U = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), O = this.doCheckForUpdates().then((V) => (U(), V)).catch((V) => {
        throw U(), this.emit("error", V, `Cannot check for updates: ${(V.stack || V).toString()}`), V;
      }), this.checkForUpdatesPromise = O, O;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(O) {
      return this.checkForUpdates().then((U) => U != null && U.downloadPromise ? (U.downloadPromise.then(() => {
        const V = tg.formatDownloadNotification(U.updateInfo.version, this.app.name, O);
        new In.Notification(V).show();
      }), U) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), U));
    }
    static formatDownloadNotification(O, U, V) {
      return V == null && (V = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), V = {
        title: V.title.replace("{appName}", U).replace("{version}", O),
        body: V.body.replace("{appName}", U).replace("{version}", O)
      }, V;
    }
    async isStagingMatch(O) {
      const U = O.stagingPercentage;
      let V = U;
      if (V == null)
        return !0;
      if (V = parseInt(V, 10), isNaN(V))
        return this._logger.warn(`Staging percentage is NaN: ${U}`), !0;
      V = V / 100;
      const _ = await this.stagingUserIdPromise.value, z = e.UUID.parse(_).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${V}, percentage: ${z}, user id: ${_}`), z < V;
    }
    computeFinalHeaders(O) {
      return this.requestHeaders != null && Object.assign(O, this.requestHeaders), O;
    }
    async isUpdateAvailable(O) {
      const U = (0, c.parse)(O.version);
      if (U == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${O.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const V = this.currentVersion;
      if ((0, c.eq)(U, V))
        return !1;
      const _ = O == null ? void 0 : O.minimumSystemVersion, Y = (0, n.release)();
      if (_)
        try {
          if ((0, c.lt)(Y, _))
            return this._logger.info(`Current OS version ${Y} is less than the minimum OS version required ${_} for version ${Y}`), !1;
        } catch (D) {
          this._logger.warn(`Failed to compare current OS version(${Y}) with minimum OS version(${_}): ${(D.message || D).toString()}`);
        }
      if (!await this.isStagingMatch(O))
        return !1;
      const K = (0, c.gt)(U, V), J = (0, c.lt)(U, V);
      return K ? !0 : this.allowDowngrade && J;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((V) => (0, h.createClient)(V, this, this.createProviderRuntimeOptions())));
      const O = await this.clientPromise, U = await this.stagingUserIdPromise.value;
      return O.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": U })), {
        info: await O.getLatestVersion(),
        provider: O
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const O = await this.getUpdateInfoAndProvider(), U = O.info;
      if (!await this.isUpdateAvailable(U))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${U.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", U), {
          versionInfo: U,
          updateInfo: U
        };
      this.updateInfoAndProvider = O, this.onUpdateAvailable(U);
      const V = new e.CancellationToken();
      return {
        versionInfo: U,
        updateInfo: U,
        cancellationToken: V,
        downloadPromise: this.autoDownload ? this.downloadUpdate(V) : null
      };
    }
    onUpdateAvailable(O) {
      this._logger.info(`Found version ${O.version} (url: ${(0, e.asArray)(O.files).map((U) => U.url).join(", ")})`), this.emit("update-available", O);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(O = new e.CancellationToken()) {
      const U = this.updateInfoAndProvider;
      if (U == null) {
        const _ = new Error("Please check update first");
        return this.dispatchError(_), Promise.reject(_);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(U.info.files).map((_) => _.url).join(", ")}`);
      const V = (_) => {
        if (!(_ instanceof e.CancellationError))
          try {
            this.dispatchError(_);
          } catch (Y) {
            this._logger.warn(`Cannot dispatch error event: ${Y.stack || Y}`);
          }
        return _;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: U,
        requestHeaders: this.computeRequestHeaders(U.provider),
        cancellationToken: O,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((_) => {
        throw V(_);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(O) {
      this.emit("error", O, (O.stack || O).toString());
    }
    dispatchUpdateDownloaded(O) {
      this.emit(f.UPDATE_DOWNLOADED, O);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, a.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(O) {
      const U = O.fileExtraDownloadHeaders;
      if (U != null) {
        const V = this.requestHeaders;
        return V == null ? U : {
          ...U,
          ...V
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const O = o.join(this.app.userDataPath, ".updaterId");
      try {
        const V = await (0, i.readFile)(O, "utf-8");
        if (e.UUID.check(V))
          return V;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${V}`);
      } catch (V) {
        V.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${V}`);
      }
      const U = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${U}`);
      try {
        await (0, i.outputFile)(O, U);
      } catch (V) {
        this._logger.warn(`Couldn't write out staging user ID: ${V}`);
      }
      return U;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const O = this.requestHeaders;
      if (O == null)
        return !0;
      for (const U of Object.keys(O)) {
        const V = U.toLowerCase();
        if (V === "authorization" || V === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let O = this.downloadedUpdateHelper;
      if (O == null) {
        const U = (await this.configOnDisk.value).updaterCacheDirName, V = this._logger;
        U == null && V.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const _ = o.join(this.app.baseCachePath, U || this.app.name);
        V.debug != null && V.debug(`updater cache dir: ${_}`), O = new l.DownloadedUpdateHelper(_), this.downloadedUpdateHelper = O;
      }
      return O;
    }
    async executeDownload(O) {
      const U = O.fileInfo, V = {
        headers: O.downloadUpdateOptions.requestHeaders,
        cancellationToken: O.downloadUpdateOptions.cancellationToken,
        sha2: U.info.sha2,
        sha512: U.info.sha512
      };
      this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (V.onProgress = (R) => this.emit(f.DOWNLOAD_PROGRESS, R));
      const _ = O.downloadUpdateOptions.updateInfoAndProvider.info, Y = _.version, z = U.packageInfo;
      function K() {
        const R = decodeURIComponent(O.fileInfo.url.pathname);
        return R.endsWith(`.${O.fileExtension}`) ? o.basename(R) : O.fileInfo.info.url;
      }
      const J = await this.getOrCreateDownloadHelper(), D = J.cacheDirForPendingUpdate;
      await (0, i.mkdir)(D, { recursive: !0 });
      const j = K();
      let G = o.join(D, j);
      const N = z == null ? null : o.join(D, `package-${Y}${o.extname(z.path) || ".7z"}`), B = async (R) => (await J.setDownloadedFile(G, N, _, U, j, R), await O.done({
        ..._,
        downloadedFile: G
      }), N == null ? [G] : [G, N]), H = this._logger, M = await J.validateDownloadedPath(G, _, U, H);
      if (M != null)
        return G = M, await B(!1);
      const S = async () => (await J.clear().catch(() => {
      }), await (0, i.unlink)(G).catch(() => {
      })), k = await (0, l.createTempUpdateFile)(`temp-${j}`, D, H);
      try {
        await O.task(k, V, N, S), await (0, e.retry)(() => (0, i.rename)(k, G), 60, 500, 0, 0, (R) => R instanceof Error && /^EBUSY:/.test(R.message));
      } catch (R) {
        throw await S(), R instanceof e.CancellationError && (H.info("cancelled"), this.emit("update-cancelled", _)), R;
      }
      return H.info(`New version ${Y} has been downloaded to ${G}`), await B(!0);
    }
    async differentialDownloadInstaller(O, U, V, _, Y) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const z = (0, v.blockmapFiles)(O.url, this.app.version, U.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${z[0]}", new: ${z[1]})`);
        const K = async (j) => {
          const G = await this.httpExecutor.downloadToBuffer(j, {
            headers: U.requestHeaders,
            cancellationToken: U.cancellationToken
          });
          if (G == null || G.length === 0)
            throw new Error(`Blockmap "${j.href}" is empty`);
          try {
            return JSON.parse((0, b.gunzipSync)(G).toString());
          } catch (N) {
            throw new Error(`Cannot parse blockmap "${j.href}", error: ${N}`);
          }
        }, J = {
          newUrl: O.url,
          oldFile: o.join(this.downloadedUpdateHelper.cacheDir, Y),
          logger: this._logger,
          newFile: V,
          isUseMultipleRangeRequest: _.isUseMultipleRangeRequest,
          requestHeaders: U.requestHeaders,
          cancellationToken: U.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (J.onProgress = (j) => this.emit(f.DOWNLOAD_PROGRESS, j));
        const D = await Promise.all(z.map((j) => K(j)));
        return await new g.GenericDifferentialDownloader(O.info, this.httpExecutor, J).download(D[0], D[1]), !1;
      } catch (z) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${z.stack || z}`), this._testOnlyOptions != null)
          throw z;
        return !0;
      }
    }
  };
  Wn.AppUpdater = w;
  function T(F) {
    const O = (0, c.prerelease)(F);
    return O != null && O.length > 0;
  }
  class I {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(O) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(O) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(O) {
    }
  }
  return Wn.NoOpLogger = I, Wn;
}
var xf;
function ba() {
  if (xf) return wi;
  xf = 1, Object.defineProperty(wi, "__esModule", { value: !0 }), wi.BaseUpdater = void 0;
  const e = js, t = Vl();
  let n = class extends t.AppUpdater {
    constructor(i, a) {
      super(i, a), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, a = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? a : this.autoRunAppAfterInstall) ? setImmediate(() => {
        In.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (a) => (this.dispatchUpdateDownloaded(a), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, a = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const s = this.downloadedUpdateHelper, o = s && s.file ? process.platform === "linux" ? s.file.replace(/ /g, "\\ ") : s.file : null, c = s == null ? null : s.downloadedFileInfo;
      if (o == null || c == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${a}`), this.doInstall({
          installerPath: o,
          isSilent: i,
          isForceRunAfter: a,
          isAdminRightsRequired: c.isAdminRightsRequired
        });
      } catch (l) {
        return this.dispatchError(l), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, a = `"${i} would like to update"`, s = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), o = [s];
      return /kdesudo/i.test(s) ? (o.push("--comment", a), o.push("-c")) : /gksudo/i.test(s) ? o.push("--message", a) : /pkexec/i.test(s) && o.push("--disable-internal-agent"), o.join(" ");
    }
    spawnSyncLog(i, a = [], s = {}) {
      return this._logger.info(`Executing: ${i} with args: ${a}`), (0, e.spawnSync)(i, a, {
        env: { ...process.env, ...s },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, a = [], s = void 0, o = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${a}`), new Promise((c, l) => {
        try {
          const u = { stdio: o, env: s, detached: !0 }, p = (0, e.spawn)(i, a, u);
          p.on("error", (d) => {
            l(d);
          }), p.unref(), p.pid !== void 0 && c(!0);
        } catch (u) {
          l(u);
        }
      });
    }
  };
  return wi.BaseUpdater = n, wi;
}
var Si = {}, xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
xa.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Tr = Un, kA = ya, DA = Ht;
class jA extends kA.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = ng(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await FA(this.options.oldFile), i);
  }
}
xa.FileWithEmbeddedBlockMapDifferentialDownloader = jA;
function ng(e) {
  return JSON.parse((0, DA.inflateRawSync)(e).toString());
}
async function FA(e) {
  const t = await (0, Tr.open)(e, "r");
  try {
    const n = (await (0, Tr.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, Tr.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Tr.read)(t, i, 0, i.length, n - r.length - i.length), await (0, Tr.close)(t), ng(i);
  } catch (n) {
    throw await (0, Tr.close)(t), n;
  }
}
var wf;
function _f() {
  if (wf) return Si;
  wf = 1, Object.defineProperty(Si, "__esModule", { value: !0 }), Si.AppImageUpdater = void 0;
  const e = Me, t = js, n = Un, r = Ee, i = pe, a = ba(), s = xa, o = ti(), c = qe;
  let l = class extends a.BaseUpdater {
    constructor(p, d) {
      super(p, d);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(p) {
      const d = p.updateInfoAndProvider.provider, f = (0, c.findFile)(d.resolveFiles(p.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: f,
        downloadUpdateOptions: p,
        task: async (h, b) => {
          const v = process.env.APPIMAGE;
          if (v == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let g = !1;
          try {
            const w = {
              newUrl: f.url,
              oldFile: v,
              logger: this._logger,
              newFile: h,
              isUseMultipleRangeRequest: d.isUseMultipleRangeRequest,
              requestHeaders: p.requestHeaders,
              cancellationToken: p.cancellationToken
            };
            this.listenerCount(o.DOWNLOAD_PROGRESS) > 0 && (w.onProgress = (T) => this.emit(o.DOWNLOAD_PROGRESS, T)), await new s.FileWithEmbeddedBlockMapDifferentialDownloader(f.info, this.httpExecutor, w).download();
          } catch (w) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${w.stack || w}`), g = process.platform === "linux";
          }
          g && await this.httpExecutor.download(f.url, h, b), await (0, n.chmod)(h, 493);
        }
      });
    }
    doInstall(p) {
      const d = process.env.APPIMAGE;
      if (d == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, r.unlinkSync)(d);
      let f;
      const h = i.basename(d);
      i.basename(p.installerPath) === h || !/\d+\.\d+\.\d+/.test(h) ? f = d : f = i.join(i.dirname(d), i.basename(p.installerPath)), (0, t.execFileSync)("mv", ["-f", p.installerPath, f]), f !== d && this.emit("appimage-filename-updated", f);
      const b = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return p.isForceRunAfter ? this.spawnLog(f, [], b) : (b.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(f, [], { env: b })), !0;
    }
  };
  return Si.AppImageUpdater = l, Si;
}
var Ti = {}, Ef;
function $f() {
  if (Ef) return Ti;
  Ef = 1, Object.defineProperty(Ti, "__esModule", { value: !0 }), Ti.DebUpdater = void 0;
  const e = ba(), t = ti(), n = qe;
  let r = class extends e.BaseUpdater {
    constructor(a, s) {
      super(a, s);
    }
    /*** @private */
    doDownloadUpdate(a) {
      const s = a.updateInfoAndProvider.provider, o = (0, n.findFile)(s.resolveFiles(a.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: o,
        downloadUpdateOptions: a,
        task: async (c, l) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (u) => this.emit(t.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(o.url, c, l);
        }
      });
    }
    doInstall(a) {
      const s = this.wrapSudo(), o = /pkexec/i.test(s) ? "" : '"', c = ["dpkg", "-i", a.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(s, [`${o}/bin/bash`, "-c", `'${c.join(" ")}'${o}`]), a.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Ti.DebUpdater = r, Ti;
}
var Ai = {}, Sf;
function Tf() {
  if (Sf) return Ai;
  Sf = 1, Object.defineProperty(Ai, "__esModule", { value: !0 }), Ai.RpmUpdater = void 0;
  const e = ba(), t = ti(), n = qe;
  let r = class extends e.BaseUpdater {
    constructor(a, s) {
      super(a, s);
    }
    /*** @private */
    doDownloadUpdate(a) {
      const s = a.updateInfoAndProvider.provider, o = (0, n.findFile)(s.resolveFiles(a.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: o,
        downloadUpdateOptions: a,
        task: async (c, l) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (u) => this.emit(t.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(o.url, c, l);
        }
      });
    }
    doInstall(a) {
      const s = a.installerPath, o = this.wrapSudo(), c = /pkexec/i.test(o) ? "" : '"', l = this.spawnSyncLog("which zypper");
      let u;
      return l ? u = [l, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", s] : u = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", s], this.spawnSyncLog(o, [`${c}/bin/bash`, "-c", `'${u.join(" ")}'${c}`]), a.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Ai.RpmUpdater = r, Ai;
}
var Ri = {}, Af;
function Rf() {
  if (Af) return Ri;
  Af = 1, Object.defineProperty(Ri, "__esModule", { value: !0 }), Ri.MacUpdater = void 0;
  const e = Me, t = Un, n = Ee, r = pe, i = Fs, a = Vl(), s = qe, o = js, c = Xr;
  let l = class extends a.AppUpdater {
    constructor(p, d) {
      super(p, d), this.nativeUpdater = In.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (f) => {
        this._logger.warn(f), this.emit("error", f);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(p) {
      this._logger.debug != null && this._logger.debug(p);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((p) => {
        p && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(p) {
      let d = p.updateInfoAndProvider.provider.resolveFiles(p.updateInfoAndProvider.info);
      const f = this._logger, h = "sysctl.proc_translated";
      let b = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), b = (0, o.execFileSync)("sysctl", [h], { encoding: "utf8" }).includes(`${h}: 1`), f.info(`Checked for macOS Rosetta environment (isRosetta=${b})`);
      } catch (F) {
        f.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${F}`);
      }
      let v = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const O = (0, o.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        f.info(`Checked 'uname -a': arm64=${O}`), v = v || O;
      } catch (F) {
        f.warn(`uname shell command to check for arm64 failed: ${F}`);
      }
      v = v || process.arch === "arm64" || b;
      const g = (F) => {
        var O;
        return F.url.pathname.includes("arm64") || ((O = F.info.url) === null || O === void 0 ? void 0 : O.includes("arm64"));
      };
      v && d.some(g) ? d = d.filter((F) => v === g(F)) : d = d.filter((F) => !g(F));
      const w = (0, s.findFile)(d, "zip", ["pkg", "dmg"]);
      if (w == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(d)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const T = p.updateInfoAndProvider.provider, I = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: w,
        downloadUpdateOptions: p,
        task: async (F, O) => {
          const U = r.join(this.downloadedUpdateHelper.cacheDir, I), V = () => (0, t.pathExistsSync)(U) ? !p.disableDifferentialDownload : (f.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let _ = !0;
          V() && (_ = await this.differentialDownloadInstaller(w, p, F, T, I)), _ && await this.httpExecutor.download(w.url, F, O);
        },
        done: (F) => {
          if (!p.disableDifferentialDownload)
            try {
              const O = r.join(this.downloadedUpdateHelper.cacheDir, I);
              (0, n.copyFileSync)(F.downloadedFile, O);
            } catch (O) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${O.message}`);
            }
          return this.updateDownloaded(w, F);
        }
      });
    }
    async updateDownloaded(p, d) {
      var f;
      const h = d.downloadedFile, b = (f = p.info.size) !== null && f !== void 0 ? f : (await (0, t.stat)(h)).size, v = this._logger, g = `fileToProxy=${p.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${g})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${g})`), this.server.on("close", () => {
        v.info(`Proxy server for native Squirrel.Mac is closed (${g})`);
      });
      const w = (T) => {
        const I = T.address();
        return typeof I == "string" ? I : `http://127.0.0.1:${I == null ? void 0 : I.port}`;
      };
      return await new Promise((T, I) => {
        const F = (0, c.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), O = Buffer.from(`autoupdater:${F}`, "ascii"), U = `/${(0, c.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (V, _) => {
          const Y = V.url;
          if (v.info(`${Y} requested`), Y === "/") {
            if (!V.headers.authorization || V.headers.authorization.indexOf("Basic ") === -1) {
              _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), v.warn("No authenthication info");
              return;
            }
            const J = V.headers.authorization.split(" ")[1], D = Buffer.from(J, "base64").toString("ascii"), [j, G] = D.split(":");
            if (j !== "autoupdater" || G !== F) {
              _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), v.warn("Invalid authenthication credentials");
              return;
            }
            const N = Buffer.from(`{ "url": "${w(this.server)}${U}" }`);
            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": N.length }), _.end(N);
            return;
          }
          if (!Y.startsWith(U)) {
            v.warn(`${Y} requested, but not supported`), _.writeHead(404), _.end();
            return;
          }
          v.info(`${U} requested by Squirrel.Mac, pipe ${h}`);
          let z = !1;
          _.on("finish", () => {
            z || (this.nativeUpdater.removeListener("error", I), T([]));
          });
          const K = (0, n.createReadStream)(h);
          K.on("error", (J) => {
            try {
              _.end();
            } catch (D) {
              v.warn(`cannot end response: ${D}`);
            }
            z = !0, this.nativeUpdater.removeListener("error", I), I(new Error(`Cannot pipe "${h}": ${J}`));
          }), _.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": b
          }), K.pipe(_);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${g})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${w(this.server)}, ${g})`), this.nativeUpdater.setFeedURL({
            url: w(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${O.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(d), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", I), this.nativeUpdater.checkForUpdates()) : T([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return Ri.MacUpdater = l, Ri;
}
var Pi = {}, Gl = {};
Object.defineProperty(Gl, "__esModule", { value: !0 });
Gl.verifySignature = UA;
const Pf = Me, rg = js, LA = ca, Of = pe;
function UA(e, t, n) {
  return new Promise((r, i) => {
    const a = t.replace(/'/g, "''");
    n.info(`Verifying signature ${a}`), (0, rg.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (s, o, c) => {
      var l;
      try {
        if (s != null || c) {
          lc(n, s, c, i), r(null);
          return;
        }
        const u = MA(o);
        if (u.Status === 0) {
          try {
            const h = Of.normalize(u.Path), b = Of.normalize(t);
            if (n.info(`LiteralPath: ${h}. Update Path: ${b}`), h !== b) {
              lc(n, new Error(`LiteralPath of ${h} is different than ${b}`), c, i), r(null);
              return;
            }
          } catch (h) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(l = h.message) !== null && l !== void 0 ? l : h.stack}`);
          }
          const d = (0, Pf.parseDn)(u.SignerCertificate.Subject);
          let f = !1;
          for (const h of e) {
            const b = (0, Pf.parseDn)(h);
            if (b.size ? f = Array.from(b.keys()).every((g) => b.get(g) === d.get(g)) : h === d.get("CN") && (n.warn(`Signature validated using only CN ${h}. Please add your full Distinguished Name (DN) to publisherNames configuration`), f = !0), f) {
              r(null);
              return;
            }
          }
        }
        const p = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(u, (d, f) => d === "RawData" ? void 0 : f, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${p}`), r(p);
      } catch (u) {
        lc(n, u, null, i), r(null);
        return;
      }
    });
  });
}
function MA(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function lc(e, t, n, r) {
  if (qA()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, rg.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function qA() {
  const e = LA.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var Nf;
function Cf() {
  if (Nf) return Pi;
  Nf = 1, Object.defineProperty(Pi, "__esModule", { value: !0 }), Pi.NsisUpdater = void 0;
  const e = Me, t = pe, n = ba(), r = xa, i = ti(), a = qe, s = Un, o = Gl, c = Gt;
  let l = class extends n.BaseUpdater {
    constructor(p, d) {
      super(p, d), this._verifyUpdateCodeSignature = (f, h) => (0, o.verifySignature)(f, h, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(p) {
      p && (this._verifyUpdateCodeSignature = p);
    }
    /*** @private */
    doDownloadUpdate(p) {
      const d = p.updateInfoAndProvider.provider, f = (0, a.findFile)(d.resolveFiles(p.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: p,
        fileInfo: f,
        task: async (h, b, v, g) => {
          const w = f.packageInfo, T = w != null && v != null;
          if (T && p.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${p.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !T && !p.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (T || p.disableDifferentialDownload || await this.differentialDownloadInstaller(f, p, h, d, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(f.url, h, b);
          const I = await this.verifySignature(h);
          if (I != null)
            throw await g(), (0, e.newError)(`New version ${p.updateInfoAndProvider.info.version} is not signed by the application owner: ${I}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (T && await this.differentialDownloadWebPackage(p, w, v, d))
            try {
              await this.httpExecutor.download(new c.URL(w.path), v, {
                headers: p.requestHeaders,
                cancellationToken: p.cancellationToken,
                sha512: w.sha512
              });
            } catch (F) {
              try {
                await (0, s.unlink)(v);
              } catch {
              }
              throw F;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(p) {
      let d;
      try {
        if (d = (await this.configOnDisk.value).publisherName, d == null)
          return null;
      } catch (f) {
        if (f.code === "ENOENT")
          return null;
        throw f;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(d) ? d : [d], p);
    }
    doInstall(p) {
      const d = ["--updated"];
      p.isSilent && d.push("/S"), p.isForceRunAfter && d.push("--force-run"), this.installDirectory && d.push(`/D=${this.installDirectory}`);
      const f = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      f != null && d.push(`--package-file=${f}`);
      const h = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [p.installerPath].concat(d)).catch((b) => this.dispatchError(b));
      };
      return p.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), h(), !0) : (this.spawnLog(p.installerPath, d).catch((b) => {
        const v = b.code;
        this._logger.info(`Cannot run installer: error code: ${v}, error message: "${b.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), v === "UNKNOWN" || v === "EACCES" ? h() : v === "ENOENT" ? In.shell.openPath(p.installerPath).catch((g) => this.dispatchError(g)) : this.dispatchError(b);
      }), !0);
    }
    async differentialDownloadWebPackage(p, d, f, h) {
      if (d.blockMapSize == null)
        return !0;
      try {
        const b = {
          newUrl: new c.URL(d.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: f,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: h.isUseMultipleRangeRequest,
          cancellationToken: p.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (b.onProgress = (v) => this.emit(i.DOWNLOAD_PROGRESS, v)), await new r.FileWithEmbeddedBlockMapDifferentialDownloader(d, this.httpExecutor, b).download();
      } catch (b) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${b.stack || b}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Pi.NsisUpdater = l, Pi;
}
var If;
function ti() {
  return If || (If = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = Me;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const n = Un, r = pe;
    var i = ba();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var a = Vl();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return a.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return a.NoOpLogger;
    } });
    var s = qe;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return s.Provider;
    } });
    var o = _f();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return o.AppImageUpdater;
    } });
    var c = $f();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return c.DebUpdater;
    } });
    var l = Tf();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return l.RpmUpdater;
    } });
    var u = Rf();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return u.MacUpdater;
    } });
    var p = Cf();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return p.NsisUpdater;
    } });
    let d;
    function f() {
      if (process.platform === "win32")
        d = new (Cf()).NsisUpdater();
      else if (process.platform === "darwin")
        d = new (Rf()).MacUpdater();
      else {
        d = new (_f()).AppImageUpdater();
        try {
          const v = r.join(process.resourcesPath, "package-type");
          if (!(0, n.existsSync)(v))
            return d;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const g = (0, n.readFileSync)(v).toString().trim();
          switch (console.info("Found package-type:", g), g) {
            case "deb":
              d = new ($f()).DebUpdater();
              break;
            case "rpm":
              d = new (Tf()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (v) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", v.message);
        }
      }
      return d;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => d || f()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class h {
      constructor(g) {
        this.emitter = g;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(g) {
        b(this.emitter, "login", g);
      }
      progress(g) {
        b(this.emitter, e.DOWNLOAD_PROGRESS, g);
      }
      updateDownloaded(g) {
        b(this.emitter, e.UPDATE_DOWNLOADED, g);
      }
      updateCancelled(g) {
        b(this.emitter, "update-cancelled", g);
      }
    }
    e.UpdaterSignal = h;
    function b(v, g, w) {
      v.on(g, w);
    }
  }(jo)), jo;
}
var an = ti(), cn = { exports: {} };
const BA = "dotenv", zA = "16.4.5", HA = "Loads environment variables from .env file", VA = "lib/main.js", GA = "lib/main.d.ts", WA = {
  ".": {
    types: "./lib/main.d.ts",
    require: "./lib/main.js",
    default: "./lib/main.js"
  },
  "./config": "./config.js",
  "./config.js": "./config.js",
  "./lib/env-options": "./lib/env-options.js",
  "./lib/env-options.js": "./lib/env-options.js",
  "./lib/cli-options": "./lib/cli-options.js",
  "./lib/cli-options.js": "./lib/cli-options.js",
  "./package.json": "./package.json"
}, KA = {
  "dts-check": "tsc --project tests/types/tsconfig.json",
  lint: "standard",
  "lint-readme": "standard-markdown",
  pretest: "npm run lint && npm run dts-check",
  test: "tap tests/*.js --100 -Rspec",
  "test:coverage": "tap --coverage-report=lcov",
  prerelease: "npm test",
  release: "standard-version"
}, YA = {
  type: "git",
  url: "git://github.com/motdotla/dotenv.git"
}, XA = "https://dotenvx.com", JA = [
  "dotenv",
  "env",
  ".env",
  "environment",
  "variables",
  "config",
  "settings"
], QA = "README.md", ZA = "BSD-2-Clause", eR = {
  "@definitelytyped/dtslint": "^0.0.133",
  "@types/node": "^18.11.3",
  decache: "^4.6.1",
  sinon: "^14.0.1",
  standard: "^17.0.0",
  "standard-markdown": "^7.1.0",
  "standard-version": "^9.5.0",
  tap: "^16.3.0",
  tar: "^6.1.11",
  typescript: "^4.8.4"
}, tR = {
  node: ">=12"
}, nR = {
  fs: !1
}, rR = {
  name: BA,
  version: zA,
  description: HA,
  main: VA,
  types: GA,
  exports: WA,
  scripts: KA,
  repository: YA,
  funding: XA,
  keywords: JA,
  readmeFilename: QA,
  license: ZA,
  devDependencies: eR,
  engines: tR,
  browser: nR
}, Hc = Ee, Wl = pe, iR = ca, aR = Xr, sR = rR, Kl = sR.version, oR = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function cR(e) {
  const t = {};
  let n = e.toString();
  n = n.replace(/\r\n?/mg, `
`);
  let r;
  for (; (r = oR.exec(n)) != null; ) {
    const i = r[1];
    let a = r[2] || "";
    a = a.trim();
    const s = a[0];
    a = a.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (a = a.replace(/\\n/g, `
`), a = a.replace(/\\r/g, "\r")), t[i] = a;
  }
  return t;
}
function lR(e) {
  const t = ag(e), n = je.configDotenv({ path: t });
  if (!n.parsed) {
    const s = new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
    throw s.code = "MISSING_DATA", s;
  }
  const r = ig(e).split(","), i = r.length;
  let a;
  for (let s = 0; s < i; s++)
    try {
      const o = r[s].trim(), c = dR(n, o);
      a = je.decrypt(c.ciphertext, c.key);
      break;
    } catch (o) {
      if (s + 1 >= i)
        throw o;
    }
  return je.parse(a);
}
function uR(e) {
  console.log(`[dotenv@${Kl}][INFO] ${e}`);
}
function pR(e) {
  console.log(`[dotenv@${Kl}][WARN] ${e}`);
}
function Ss(e) {
  console.log(`[dotenv@${Kl}][DEBUG] ${e}`);
}
function ig(e) {
  return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0 ? e.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
}
function dR(e, t) {
  let n;
  try {
    n = new URL(t);
  } catch (o) {
    if (o.code === "ERR_INVALID_URL") {
      const c = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
      throw c.code = "INVALID_DOTENV_KEY", c;
    }
    throw o;
  }
  const r = n.password;
  if (!r) {
    const o = new Error("INVALID_DOTENV_KEY: Missing key part");
    throw o.code = "INVALID_DOTENV_KEY", o;
  }
  const i = n.searchParams.get("environment");
  if (!i) {
    const o = new Error("INVALID_DOTENV_KEY: Missing environment part");
    throw o.code = "INVALID_DOTENV_KEY", o;
  }
  const a = `DOTENV_VAULT_${i.toUpperCase()}`, s = e.parsed[a];
  if (!s) {
    const o = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${a} in your .env.vault file.`);
    throw o.code = "NOT_FOUND_DOTENV_ENVIRONMENT", o;
  }
  return { ciphertext: s, key: r };
}
function ag(e) {
  let t = null;
  if (e && e.path && e.path.length > 0)
    if (Array.isArray(e.path))
      for (const n of e.path)
        Hc.existsSync(n) && (t = n.endsWith(".vault") ? n : `${n}.vault`);
    else
      t = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
  else
    t = Wl.resolve(process.cwd(), ".env.vault");
  return Hc.existsSync(t) ? t : null;
}
function kf(e) {
  return e[0] === "~" ? Wl.join(iR.homedir(), e.slice(1)) : e;
}
function fR(e) {
  uR("Loading env from encrypted .env.vault");
  const t = je._parseVault(e);
  let n = process.env;
  return e && e.processEnv != null && (n = e.processEnv), je.populate(n, t, e), { parsed: t };
}
function mR(e) {
  const t = Wl.resolve(process.cwd(), ".env");
  let n = "utf8";
  const r = !!(e && e.debug);
  e && e.encoding ? n = e.encoding : r && Ss("No encoding is specified. UTF-8 is used by default");
  let i = [t];
  if (e && e.path)
    if (!Array.isArray(e.path))
      i = [kf(e.path)];
    else {
      i = [];
      for (const c of e.path)
        i.push(kf(c));
    }
  let a;
  const s = {};
  for (const c of i)
    try {
      const l = je.parse(Hc.readFileSync(c, { encoding: n }));
      je.populate(s, l, e);
    } catch (l) {
      r && Ss(`Failed to load ${c} ${l.message}`), a = l;
    }
  let o = process.env;
  return e && e.processEnv != null && (o = e.processEnv), je.populate(o, s, e), a ? { parsed: s, error: a } : { parsed: s };
}
function hR(e) {
  if (ig(e).length === 0)
    return je.configDotenv(e);
  const t = ag(e);
  return t ? je._configVault(e) : (pR(`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`), je.configDotenv(e));
}
function vR(e, t) {
  const n = Buffer.from(t.slice(-64), "hex");
  let r = Buffer.from(e, "base64");
  const i = r.subarray(0, 12), a = r.subarray(-16);
  r = r.subarray(12, -16);
  try {
    const s = aR.createDecipheriv("aes-256-gcm", n, i);
    return s.setAuthTag(a), `${s.update(r)}${s.final()}`;
  } catch (s) {
    const o = s instanceof RangeError, c = s.message === "Invalid key length", l = s.message === "Unsupported state or unable to authenticate data";
    if (o || c) {
      const u = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
      throw u.code = "INVALID_DOTENV_KEY", u;
    } else if (l) {
      const u = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
      throw u.code = "DECRYPTION_FAILED", u;
    } else
      throw s;
  }
}
function gR(e, t, n = {}) {
  const r = !!(n && n.debug), i = !!(n && n.override);
  if (typeof t != "object") {
    const a = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
    throw a.code = "OBJECT_REQUIRED", a;
  }
  for (const a of Object.keys(t))
    Object.prototype.hasOwnProperty.call(e, a) ? (i === !0 && (e[a] = t[a]), r && Ss(i === !0 ? `"${a}" is already defined and WAS overwritten` : `"${a}" is already defined and was NOT overwritten`)) : e[a] = t[a];
}
const je = {
  configDotenv: mR,
  _configVault: fR,
  _parseVault: lR,
  config: hR,
  decrypt: vR,
  parse: cR,
  populate: gR
};
cn.exports.configDotenv = je.configDotenv;
cn.exports._configVault = je._configVault;
cn.exports._parseVault = je._parseVault;
cn.exports.config = je.config;
cn.exports.decrypt = je.decrypt;
cn.exports.parse = je.parse;
cn.exports.populate = je.populate;
cn.exports = je;
var yR = cn.exports;
const bR = /* @__PURE__ */ la(yR);
function sg(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: xR } = Object.prototype, { getPrototypeOf: Yl } = Object, oo = /* @__PURE__ */ ((e) => (t) => {
  const n = xR.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Lt = (e) => (e = e.toLowerCase(), (t) => oo(t) === e), co = (e) => (t) => typeof t === e, { isArray: ni } = Array, na = co("undefined");
function wR(e) {
  return e !== null && !na(e) && e.constructor !== null && !na(e.constructor) && xt(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const og = Lt("ArrayBuffer");
function _R(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && og(e.buffer), t;
}
const ER = co("string"), xt = co("function"), cg = co("number"), lo = (e) => e !== null && typeof e == "object", $R = (e) => e === !0 || e === !1, as = (e) => {
  if (oo(e) !== "object")
    return !1;
  const t = Yl(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, SR = Lt("Date"), TR = Lt("File"), AR = Lt("Blob"), RR = Lt("FileList"), PR = (e) => lo(e) && xt(e.pipe), OR = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || xt(e.append) && ((t = oo(e)) === "formdata" || // detect form-data instance
  t === "object" && xt(e.toString) && e.toString() === "[object FormData]"));
}, NR = Lt("URLSearchParams"), [CR, IR, kR, DR] = ["ReadableStream", "Request", "Response", "Headers"].map(Lt), jR = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function wa(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), ni(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = a.length;
    let o;
    for (r = 0; r < s; r++)
      o = a[r], t.call(null, e[o], o, e);
  }
}
function lg(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const nr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ug = (e) => !na(e) && e !== nr;
function Vc() {
  const { caseless: e } = ug(this) && this || {}, t = {}, n = (r, i) => {
    const a = e && lg(t, i) || i;
    as(t[a]) && as(r) ? t[a] = Vc(t[a], r) : as(r) ? t[a] = Vc({}, r) : ni(r) ? t[a] = r.slice() : t[a] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && wa(arguments[r], n);
  return t;
}
const FR = (e, t, n, { allOwnKeys: r } = {}) => (wa(t, (i, a) => {
  n && xt(i) ? e[a] = sg(i, n) : e[a] = i;
}, { allOwnKeys: r }), e), LR = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), UR = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, MR = (e, t, n, r) => {
  let i, a, s;
  const o = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
      s = i[a], (!r || r(s, e, t)) && !o[s] && (t[s] = e[s], o[s] = !0);
    e = n !== !1 && Yl(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, qR = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, BR = (e) => {
  if (!e) return null;
  if (ni(e)) return e;
  let t = e.length;
  if (!cg(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, zR = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Yl(Uint8Array)), HR = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const a = i.value;
    t.call(e, a[0], a[1]);
  }
}, VR = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, GR = Lt("HTMLFormElement"), WR = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), Df = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), KR = Lt("RegExp"), pg = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  wa(n, (i, a) => {
    let s;
    (s = t(i, a, e)) !== !1 && (r[a] = s || i);
  }), Object.defineProperties(e, r);
}, YR = (e) => {
  pg(e, (t, n) => {
    if (xt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (xt(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, XR = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((a) => {
      n[a] = !0;
    });
  };
  return ni(e) ? r(e) : r(String(e).split(t)), n;
}, JR = () => {
}, QR = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, uc = "abcdefghijklmnopqrstuvwxyz", jf = "0123456789", dg = {
  DIGIT: jf,
  ALPHA: uc,
  ALPHA_DIGIT: uc + uc.toUpperCase() + jf
}, ZR = (e = 16, t = dg.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function eP(e) {
  return !!(e && xt(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const tP = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (lo(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const a = ni(r) ? [] : {};
        return wa(r, (s, o) => {
          const c = n(s, i + 1);
          !na(c) && (a[o] = c);
        }), t[i] = void 0, a;
      }
    }
    return r;
  };
  return n(e, 0);
}, nP = Lt("AsyncFunction"), rP = (e) => e && (lo(e) || xt(e)) && xt(e.then) && xt(e.catch), fg = ((e, t) => e ? setImmediate : t ? ((n, r) => (nr.addEventListener("message", ({ source: i, data: a }) => {
  i === nr && a === n && r.length && r.shift()();
}, !1), (i) => {
  r.push(i), nr.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  xt(nr.postMessage)
), iP = typeof queueMicrotask < "u" ? queueMicrotask.bind(nr) : typeof process < "u" && process.nextTick || fg, C = {
  isArray: ni,
  isArrayBuffer: og,
  isBuffer: wR,
  isFormData: OR,
  isArrayBufferView: _R,
  isString: ER,
  isNumber: cg,
  isBoolean: $R,
  isObject: lo,
  isPlainObject: as,
  isReadableStream: CR,
  isRequest: IR,
  isResponse: kR,
  isHeaders: DR,
  isUndefined: na,
  isDate: SR,
  isFile: TR,
  isBlob: AR,
  isRegExp: KR,
  isFunction: xt,
  isStream: PR,
  isURLSearchParams: NR,
  isTypedArray: zR,
  isFileList: RR,
  forEach: wa,
  merge: Vc,
  extend: FR,
  trim: jR,
  stripBOM: LR,
  inherits: UR,
  toFlatObject: MR,
  kindOf: oo,
  kindOfTest: Lt,
  endsWith: qR,
  toArray: BR,
  forEachEntry: HR,
  matchAll: VR,
  isHTMLForm: GR,
  hasOwnProperty: Df,
  hasOwnProp: Df,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: pg,
  freezeMethods: YR,
  toObjectSet: XR,
  toCamelCase: WR,
  noop: JR,
  toFiniteNumber: QR,
  findKey: lg,
  global: nr,
  isContextDefined: ug,
  ALPHABET: dg,
  generateString: ZR,
  isSpecCompliantForm: eP,
  toJSONObject: tP,
  isAsyncFn: nP,
  isThenable: rP,
  setImmediate: fg,
  asap: iP
};
function Q(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null);
}
C.inherits(Q, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: C.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const mg = Q.prototype, hg = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  hg[e] = { value: e };
});
Object.defineProperties(Q, hg);
Object.defineProperty(mg, "isAxiosError", { value: !0 });
Q.from = (e, t, n, r, i, a) => {
  const s = Object.create(mg);
  return C.toFlatObject(e, s, function(c) {
    return c !== Error.prototype;
  }, (o) => o !== "isAxiosError"), Q.call(s, e.message, t, n, r, i), s.cause = e, s.name = e.name, a && Object.assign(s, a), s;
};
var vg = Ve.Stream, aP = mr, sP = Ut;
function Ut() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
aP.inherits(Ut, vg);
Ut.create = function(e, t) {
  var n = new this();
  t = t || {};
  for (var r in t)
    n[r] = t[r];
  n.source = e;
  var i = e.emit;
  return e.emit = function() {
    return n._handleEmit(arguments), i.apply(e, arguments);
  }, e.on("error", function() {
  }), n.pauseStream && e.pause(), n;
};
Object.defineProperty(Ut.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
Ut.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
Ut.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
Ut.prototype.pause = function() {
  this.source.pause();
};
Ut.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
Ut.prototype.pipe = function() {
  var e = vg.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
Ut.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
Ut.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var oP = mr, gg = Ve.Stream, Ff = sP, cP = Re;
function Re() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
oP.inherits(Re, gg);
Re.create = function(e) {
  var t = new this();
  e = e || {};
  for (var n in e)
    t[n] = e[n];
  return t;
};
Re.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
Re.prototype.append = function(e) {
  var t = Re.isStreamLike(e);
  if (t) {
    if (!(e instanceof Ff)) {
      var n = Ff.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = n;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
Re.prototype.pipe = function(e, t) {
  return gg.prototype.pipe.call(this, e, t), this.resume(), e;
};
Re.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
Re.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var t = e;
  t((function(n) {
    var r = Re.isStreamLike(n);
    r && (n.on("data", this._checkDataSize.bind(this)), this._handleErrors(n)), this._pipeNext(n);
  }).bind(this));
};
Re.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var t = Re.isStreamLike(e);
  if (t) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var n = e;
  this.write(n), this._getNext();
};
Re.prototype._handleErrors = function(e) {
  var t = this;
  e.on("error", function(n) {
    t._emitError(n);
  });
};
Re.prototype.write = function(e) {
  this.emit("data", e);
};
Re.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
Re.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
Re.prototype.end = function() {
  this._reset(), this.emit("end");
};
Re.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
Re.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
Re.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
Re.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(t) {
    t.dataSize && (e.dataSize += t.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
Re.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var yg = {};
const lP = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var uP = lP;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var t = uP, n = pe.extname, r = /^\s*([^;\s]*)(?:;|\s|$)/, i = /^text\//i;
  e.charset = a, e.charsets = { lookup: a }, e.contentType = s, e.extension = o, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = c, e.types = /* @__PURE__ */ Object.create(null), l(e.extensions, e.types);
  function a(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = r.exec(u), d = p && t[p[1].toLowerCase()];
    return d && d.charset ? d.charset : p && i.test(p[1]) ? "UTF-8" : !1;
  }
  function s(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = u.indexOf("/") === -1 ? e.lookup(u) : u;
    if (!p)
      return !1;
    if (p.indexOf("charset") === -1) {
      var d = e.charset(p);
      d && (p += "; charset=" + d.toLowerCase());
    }
    return p;
  }
  function o(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = r.exec(u), d = p && e.extensions[p[1].toLowerCase()];
    return !d || !d.length ? !1 : d[0];
  }
  function c(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = n("x." + u).toLowerCase().substr(1);
    return p && e.types[p] || !1;
  }
  function l(u, p) {
    var d = ["nginx", "apache", void 0, "iana"];
    Object.keys(t).forEach(function(h) {
      var b = t[h], v = b.extensions;
      if (!(!v || !v.length)) {
        u[h] = v;
        for (var g = 0; g < v.length; g++) {
          var w = v[g];
          if (p[w]) {
            var T = d.indexOf(t[p[w]].source), I = d.indexOf(b.source);
            if (p[w] !== "application/octet-stream" && (T > I || T === I && p[w].substr(0, 12) === "application/"))
              continue;
          }
          p[w] = h;
        }
      }
    });
  }
})(yg);
var pP = dP;
function dP(e) {
  var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  t ? t(e) : setTimeout(e, 0);
}
var Lf = pP, bg = fP;
function fP(e) {
  var t = !1;
  return Lf(function() {
    t = !0;
  }), function(r, i) {
    t ? e(r, i) : Lf(function() {
      e(r, i);
    });
  };
}
var xg = mP;
function mP(e) {
  Object.keys(e.jobs).forEach(hP.bind(e)), e.jobs = {};
}
function hP(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var Uf = bg, vP = xg, wg = gP;
function gP(e, t, n, r) {
  var i = n.keyedList ? n.keyedList[n.index] : n.index;
  n.jobs[i] = yP(t, i, e[i], function(a, s) {
    i in n.jobs && (delete n.jobs[i], a ? vP(n) : n.results[i] = s, r(a, n.results));
  });
}
function yP(e, t, n, r) {
  var i;
  return e.length == 2 ? i = e(n, Uf(r)) : i = e(n, t, Uf(r)), i;
}
var _g = bP;
function bP(e, t) {
  var n = !Array.isArray(e), r = {
    index: 0,
    keyedList: n || t ? Object.keys(e) : null,
    jobs: {},
    results: n ? {} : [],
    size: n ? Object.keys(e).length : e.length
  };
  return t && r.keyedList.sort(n ? t : function(i, a) {
    return t(e[i], e[a]);
  }), r;
}
var xP = xg, wP = bg, Eg = _P;
function _P(e) {
  Object.keys(this.jobs).length && (this.index = this.size, xP(this), wP(e)(null, this.results));
}
var EP = wg, $P = _g, SP = Eg, TP = AP;
function AP(e, t, n) {
  for (var r = $P(e); r.index < (r.keyedList || e).length; )
    EP(e, t, r, function(i, a) {
      if (i) {
        n(i, a);
        return;
      }
      if (Object.keys(r.jobs).length === 0) {
        n(null, r.results);
        return;
      }
    }), r.index++;
  return SP.bind(r, n);
}
var uo = { exports: {} }, Mf = wg, RP = _g, PP = Eg;
uo.exports = OP;
uo.exports.ascending = $g;
uo.exports.descending = NP;
function OP(e, t, n, r) {
  var i = RP(e, n);
  return Mf(e, t, i, function a(s, o) {
    if (s) {
      r(s, o);
      return;
    }
    if (i.index++, i.index < (i.keyedList || e).length) {
      Mf(e, t, i, a);
      return;
    }
    r(null, i.results);
  }), PP.bind(i, r);
}
function $g(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function NP(e, t) {
  return -1 * $g(e, t);
}
var Sg = uo.exports, CP = Sg, IP = kP;
function kP(e, t, n) {
  return CP(e, t, null, n);
}
var DP = {
  parallel: TP,
  serial: IP,
  serialOrdered: Sg
}, jP = function(e, t) {
  return Object.keys(t).forEach(function(n) {
    e[n] = e[n] || t[n];
  }), e;
}, Xl = cP, FP = mr, pc = pe, LP = Fs, UP = ml, MP = Gt.parse, qP = Ee, BP = Ve.Stream, dc = yg, zP = DP, Gc = jP, HP = fe;
FP.inherits(fe, Xl);
function fe(e) {
  if (!(this instanceof fe))
    return new fe(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], Xl.call(this), e = e || {};
  for (var t in e)
    this[t] = e[t];
}
fe.LINE_BREAK = `\r
`;
fe.DEFAULT_CONTENT_TYPE = "application/octet-stream";
fe.prototype.append = function(e, t, n) {
  n = n || {}, typeof n == "string" && (n = { filename: n });
  var r = Xl.prototype.append.bind(this);
  if (typeof t == "number" && (t = "" + t), Array.isArray(t)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var i = this._multiPartHeader(e, t, n), a = this._multiPartFooter();
  r(i), r(t), r(a), this._trackLength(i, t, n);
};
fe.prototype._trackLength = function(e, t, n) {
  var r = 0;
  n.knownLength != null ? r += +n.knownLength : Buffer.isBuffer(t) ? r = t.length : typeof t == "string" && (r = Buffer.byteLength(t)), this._valueLength += r, this._overheadLength += Buffer.byteLength(e) + fe.LINE_BREAK.length, !(!t || !t.path && !(t.readable && t.hasOwnProperty("httpVersion")) && !(t instanceof BP)) && (n.knownLength || this._valuesToMeasure.push(t));
};
fe.prototype._lengthRetriever = function(e, t) {
  e.hasOwnProperty("fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? t(null, e.end + 1 - (e.start ? e.start : 0)) : qP.stat(e.path, function(n, r) {
    var i;
    if (n) {
      t(n);
      return;
    }
    i = r.size - (e.start ? e.start : 0), t(null, i);
  }) : e.hasOwnProperty("httpVersion") ? t(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", function(n) {
    e.pause(), t(null, +n.headers["content-length"]);
  }), e.resume()) : t("Unknown stream");
};
fe.prototype._multiPartHeader = function(e, t, n) {
  if (typeof n.header == "string")
    return n.header;
  var r = this._getContentDisposition(t, n), i = this._getContentType(t, n), a = "", s = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(r || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(i || [])
  };
  typeof n.header == "object" && Gc(s, n.header);
  var o;
  for (var c in s)
    s.hasOwnProperty(c) && (o = s[c], o != null && (Array.isArray(o) || (o = [o]), o.length && (a += c + ": " + o.join("; ") + fe.LINE_BREAK)));
  return "--" + this.getBoundary() + fe.LINE_BREAK + a + fe.LINE_BREAK;
};
fe.prototype._getContentDisposition = function(e, t) {
  var n, r;
  return typeof t.filepath == "string" ? n = pc.normalize(t.filepath).replace(/\\/g, "/") : t.filename || e.name || e.path ? n = pc.basename(t.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (n = pc.basename(e.client._httpMessage.path || "")), n && (r = 'filename="' + n + '"'), r;
};
fe.prototype._getContentType = function(e, t) {
  var n = t.contentType;
  return !n && e.name && (n = dc.lookup(e.name)), !n && e.path && (n = dc.lookup(e.path)), !n && e.readable && e.hasOwnProperty("httpVersion") && (n = e.headers["content-type"]), !n && (t.filepath || t.filename) && (n = dc.lookup(t.filepath || t.filename)), !n && typeof e == "object" && (n = fe.DEFAULT_CONTENT_TYPE), n;
};
fe.prototype._multiPartFooter = function() {
  return (function(e) {
    var t = fe.LINE_BREAK, n = this._streams.length === 0;
    n && (t += this._lastBoundary()), e(t);
  }).bind(this);
};
fe.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + fe.LINE_BREAK;
};
fe.prototype.getHeaders = function(e) {
  var t, n = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (t in e)
    e.hasOwnProperty(t) && (n[t.toLowerCase()] = e[t]);
  return n;
};
fe.prototype.setBoundary = function(e) {
  this._boundary = e;
};
fe.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
fe.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), t = this.getBoundary(), n = 0, r = this._streams.length; n < r; n++)
    typeof this._streams[n] != "function" && (Buffer.isBuffer(this._streams[n]) ? e = Buffer.concat([e, this._streams[n]]) : e = Buffer.concat([e, Buffer.from(this._streams[n])]), (typeof this._streams[n] != "string" || this._streams[n].substring(2, t.length + 2) !== t) && (e = Buffer.concat([e, Buffer.from(fe.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
fe.prototype._generateBoundary = function() {
  for (var e = "--------------------------", t = 0; t < 24; t++)
    e += Math.floor(Math.random() * 10).toString(16);
  this._boundary = e;
};
fe.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
fe.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
fe.prototype.getLength = function(e) {
  var t = this._overheadLength + this._valueLength;
  if (this._streams.length && (t += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, t));
    return;
  }
  zP.parallel(this._valuesToMeasure, this._lengthRetriever, function(n, r) {
    if (n) {
      e(n);
      return;
    }
    r.forEach(function(i) {
      t += i;
    }), e(null, t);
  });
};
fe.prototype.submit = function(e, t) {
  var n, r, i = { method: "post" };
  return typeof e == "string" ? (e = MP(e), r = Gc({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, i)) : (r = Gc(e, i), r.port || (r.port = r.protocol == "https:" ? 443 : 80)), r.headers = this.getHeaders(e.headers), r.protocol == "https:" ? n = UP.request(r) : n = LP.request(r), this.getLength((function(a, s) {
    if (a && a !== "Unknown stream") {
      this._error(a);
      return;
    }
    if (s && n.setHeader("Content-Length", s), this.pipe(n), t) {
      var o, c = function(l, u) {
        return n.removeListener("error", c), n.removeListener("response", o), t.call(this, l, u);
      };
      o = c.bind(this, null), n.on("error", c), n.on("response", o);
    }
  }).bind(this)), n;
};
fe.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
fe.prototype.toString = function() {
  return "[object FormData]";
};
const Tg = /* @__PURE__ */ la(HP);
function Wc(e) {
  return C.isPlainObject(e) || C.isArray(e);
}
function Ag(e) {
  return C.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function qf(e, t, n) {
  return e ? e.concat(t).map(function(i, a) {
    return i = Ag(i), !n && a ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function VP(e) {
  return C.isArray(e) && !e.some(Wc);
}
const GP = C.toFlatObject(C, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function po(e, t, n) {
  if (!C.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (Tg || FormData)(), n = C.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, v) {
    return !C.isUndefined(v[b]);
  });
  const r = n.metaTokens, i = n.visitor || u, a = n.dots, s = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && C.isSpecCompliantForm(t);
  if (!C.isFunction(i))
    throw new TypeError("visitor must be a function");
  function l(h) {
    if (h === null) return "";
    if (C.isDate(h))
      return h.toISOString();
    if (!c && C.isBlob(h))
      throw new Q("Blob is not supported. Use a Buffer instead.");
    return C.isArrayBuffer(h) || C.isTypedArray(h) ? c && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function u(h, b, v) {
    let g = h;
    if (h && !v && typeof h == "object") {
      if (C.endsWith(b, "{}"))
        b = r ? b : b.slice(0, -2), h = JSON.stringify(h);
      else if (C.isArray(h) && VP(h) || (C.isFileList(h) || C.endsWith(b, "[]")) && (g = C.toArray(h)))
        return b = Ag(b), g.forEach(function(T, I) {
          !(C.isUndefined(T) || T === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? qf([b], I, a) : s === null ? b : b + "[]",
            l(T)
          );
        }), !1;
    }
    return Wc(h) ? !0 : (t.append(qf(v, b, a), l(h)), !1);
  }
  const p = [], d = Object.assign(GP, {
    defaultVisitor: u,
    convertValue: l,
    isVisitable: Wc
  });
  function f(h, b) {
    if (!C.isUndefined(h)) {
      if (p.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      p.push(h), C.forEach(h, function(g, w) {
        (!(C.isUndefined(g) || g === null) && i.call(
          t,
          g,
          C.isString(w) ? w.trim() : w,
          b,
          d
        )) === !0 && f(g, b ? b.concat(w) : [w]);
      }), p.pop();
    }
  }
  if (!C.isObject(e))
    throw new TypeError("data must be an object");
  return f(e), t;
}
function Bf(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Rg(e, t) {
  this._pairs = [], e && po(e, this, t);
}
const Pg = Rg.prototype;
Pg.append = function(t, n) {
  this._pairs.push([t, n]);
};
Pg.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Bf);
  } : Bf;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function WP(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Jl(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || WP, i = n && n.serialize;
  let a;
  if (i ? a = i(t, n) : a = C.isURLSearchParams(t) ? t.toString() : new Rg(t, n).toString(r), a) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class zf {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    C.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Ql = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, KP = Gt.URLSearchParams, YP = {
  isNode: !0,
  classes: {
    URLSearchParams: KP,
    FormData: Tg,
    Blob: typeof Blob < "u" && Blob || null
  },
  protocols: ["http", "https", "file", "data"]
}, Zl = typeof window < "u" && typeof document < "u", Kc = typeof navigator == "object" && navigator || void 0, XP = Zl && (!Kc || ["ReactNative", "NativeScript", "NS"].indexOf(Kc.product) < 0), JP = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", QP = Zl && window.location.href || "http://localhost", ZP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Zl,
  hasStandardBrowserEnv: XP,
  hasStandardBrowserWebWorkerEnv: JP,
  navigator: Kc,
  origin: QP
}, Symbol.toStringTag, { value: "Module" })), Ue = {
  ...ZP,
  ...YP
};
function eO(e, t) {
  return po(e, new Ue.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, a) {
      return Ue.isNode && C.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function tO(e) {
  return C.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function nO(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let a;
  for (r = 0; r < i; r++)
    a = n[r], t[a] = e[a];
  return t;
}
function Og(e) {
  function t(n, r, i, a) {
    let s = n[a++];
    if (s === "__proto__") return !0;
    const o = Number.isFinite(+s), c = a >= n.length;
    return s = !s && C.isArray(i) ? i.length : s, c ? (C.hasOwnProp(i, s) ? i[s] = [i[s], r] : i[s] = r, !o) : ((!i[s] || !C.isObject(i[s])) && (i[s] = []), t(n, r, i[s], a) && C.isArray(i[s]) && (i[s] = nO(i[s])), !o);
  }
  if (C.isFormData(e) && C.isFunction(e.entries)) {
    const n = {};
    return C.forEachEntry(e, (r, i) => {
      t(tO(r), i, n, 0);
    }), n;
  }
  return null;
}
function rO(e, t, n) {
  if (C.isString(e))
    try {
      return (t || JSON.parse)(e), C.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const _a = {
  transitional: Ql,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, a = C.isObject(t);
    if (a && C.isHTMLForm(t) && (t = new FormData(t)), C.isFormData(t))
      return i ? JSON.stringify(Og(t)) : t;
    if (C.isArrayBuffer(t) || C.isBuffer(t) || C.isStream(t) || C.isFile(t) || C.isBlob(t) || C.isReadableStream(t))
      return t;
    if (C.isArrayBufferView(t))
      return t.buffer;
    if (C.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let o;
    if (a) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return eO(t, this.formSerializer).toString();
      if ((o = C.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return po(
          o ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return a || i ? (n.setContentType("application/json", !1), rO(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || _a.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (C.isResponse(t) || C.isReadableStream(t))
      return t;
    if (t && C.isString(t) && (r && !this.responseType || i)) {
      const s = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (o) {
        if (s)
          throw o.name === "SyntaxError" ? Q.from(o, Q.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Ue.classes.FormData,
    Blob: Ue.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
C.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  _a.headers[e] = {};
});
const iO = C.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), aO = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), n = s.substring(0, i).trim().toLowerCase(), r = s.substring(i + 1).trim(), !(!n || t[n] && iO[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Hf = Symbol("internals");
function Oi(e) {
  return e && String(e).trim().toLowerCase();
}
function ss(e) {
  return e === !1 || e == null ? e : C.isArray(e) ? e.map(ss) : String(e);
}
function sO(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const oO = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function fc(e, t, n, r, i) {
  if (C.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!C.isString(t)) {
    if (C.isString(r))
      return t.indexOf(r) !== -1;
    if (C.isRegExp(r))
      return r.test(t);
  }
}
function cO(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function lO(e, t) {
  const n = C.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, a, s) {
        return this[r].call(this, t, i, a, s);
      },
      configurable: !0
    });
  });
}
class Ke {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function a(o, c, l) {
      const u = Oi(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const p = C.findKey(i, u);
      (!p || i[p] === void 0 || l === !0 || l === void 0 && i[p] !== !1) && (i[p || c] = ss(o));
    }
    const s = (o, c) => C.forEach(o, (l, u) => a(l, u, c));
    if (C.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (C.isString(t) && (t = t.trim()) && !oO(t))
      s(aO(t), n);
    else if (C.isHeaders(t))
      for (const [o, c] of t.entries())
        a(c, o, r);
    else
      t != null && a(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Oi(t), t) {
      const r = C.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return sO(i);
        if (C.isFunction(n))
          return n.call(this, i, r);
        if (C.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Oi(t), t) {
      const r = C.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || fc(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function a(s) {
      if (s = Oi(s), s) {
        const o = C.findKey(r, s);
        o && (!n || fc(r, r[o], o, n)) && (delete r[o], i = !0);
      }
    }
    return C.isArray(t) ? t.forEach(a) : a(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const a = n[r];
      (!t || fc(this, this[a], a, t, !0)) && (delete this[a], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return C.forEach(this, (i, a) => {
      const s = C.findKey(r, a);
      if (s) {
        n[s] = ss(i), delete n[a];
        return;
      }
      const o = t ? cO(a) : String(a).trim();
      o !== a && delete n[a], n[o] = ss(i), r[o] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return C.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && C.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[Hf] = this[Hf] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function a(s) {
      const o = Oi(s);
      r[o] || (lO(i, s), r[o] = !0);
    }
    return C.isArray(t) ? t.forEach(a) : a(t), this;
  }
}
Ke.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
C.reduceDescriptors(Ke.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
C.freezeMethods(Ke);
function mc(e, t) {
  const n = this || _a, r = t || n, i = Ke.from(r.headers);
  let a = r.data;
  return C.forEach(e, function(o) {
    a = o.call(n, a, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), a;
}
function Ng(e) {
  return !!(e && e.__CANCEL__);
}
function Ln(e, t, n) {
  Q.call(this, e ?? "canceled", Q.ERR_CANCELED, t, n), this.name = "CanceledError";
}
C.inherits(Ln, Q, {
  __CANCEL__: !0
});
function Fr(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new Q(
    "Request failed with status code " + n.status,
    [Q.ERR_BAD_REQUEST, Q.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function uO(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function pO(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function eu(e, t) {
  return e && !uO(t) ? pO(e, t) : t;
}
var dO = Gt.parse, fO = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, mO = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function hO(e) {
  var t = typeof e == "string" ? dO(e) : e || {}, n = t.protocol, r = t.host, i = t.port;
  if (typeof r != "string" || !r || typeof n != "string" || (n = n.split(":", 1)[0], r = r.replace(/:\d*$/, ""), i = parseInt(i) || fO[n] || 0, !vO(r, i)))
    return "";
  var a = Lr("npm_config_" + n + "_proxy") || Lr(n + "_proxy") || Lr("npm_config_proxy") || Lr("all_proxy");
  return a && a.indexOf("://") === -1 && (a = n + "://" + a), a;
}
function vO(e, t) {
  var n = (Lr("npm_config_no_proxy") || Lr("no_proxy")).toLowerCase();
  return n ? n === "*" ? !1 : n.split(/[,\s]/).every(function(r) {
    if (!r)
      return !0;
    var i = r.match(/^(.+):(\d+)$/), a = i ? i[1] : r, s = i ? parseInt(i[2]) : 0;
    return s && s !== t ? !0 : /^[.*]/.test(a) ? (a.charAt(0) === "*" && (a = a.slice(1)), !mO.call(e, a)) : e !== a;
  }) : !0;
}
function Lr(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
var gO = hO, tu = { exports: {} }, Ni, yO = function() {
  if (!Ni) {
    try {
      Ni = Qm("follow-redirects");
    } catch {
    }
    typeof Ni != "function" && (Ni = function() {
    });
  }
  Ni.apply(null, arguments);
}, Ea = Gt, ra = Ea.URL, bO = Fs, xO = ml, nu = Ve.Writable, ru = fl, Cg = yO;
(function() {
  var t = typeof process < "u", n = typeof window < "u" && typeof document < "u", r = cr(Error.captureStackTrace);
  !t && (n || !r) && console.warn("The follow-redirects package should be excluded from browser builds.");
})();
var iu = !1;
try {
  ru(new ra(""));
} catch (e) {
  iu = e.code === "ERR_INVALID_URL";
}
var wO = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], au = ["abort", "aborted", "connect", "error", "socket", "timeout"], su = /* @__PURE__ */ Object.create(null);
au.forEach(function(e) {
  su[e] = function(t, n, r) {
    this._redirectable.emit(e, t, n, r);
  };
});
var Yc = $a(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), Xc = $a(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), _O = $a(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  Xc
), EO = $a(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), $O = $a(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), SO = nu.prototype.destroy || kg;
function vt(e, t) {
  nu.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], t && this.on("response", t);
  var n = this;
  this._onNativeResponse = function(r) {
    try {
      n._processResponse(r);
    } catch (i) {
      n.emit("error", i instanceof Xc ? i : new Xc({ cause: i }));
    }
  }, this._performRequest();
}
vt.prototype = Object.create(nu.prototype);
vt.prototype.abort = function() {
  cu(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
vt.prototype.destroy = function(e) {
  return cu(this._currentRequest, e), SO.call(this, e), this;
};
vt.prototype.write = function(e, t, n) {
  if (this._ending)
    throw new $O();
  if (!ar(e) && !RO(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (cr(t) && (n = t, t = null), e.length === 0) {
    n && n();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: t }), this._currentRequest.write(e, t, n)) : (this.emit("error", new EO()), this.abort());
};
vt.prototype.end = function(e, t, n) {
  if (cr(e) ? (n = e, e = t = null) : cr(t) && (n = t, t = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
  else {
    var r = this, i = this._currentRequest;
    this.write(e, t, function() {
      r._ended = !0, i.end(null, null, n);
    }), this._ending = !0;
  }
};
vt.prototype.setHeader = function(e, t) {
  this._options.headers[e] = t, this._currentRequest.setHeader(e, t);
};
vt.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
vt.prototype.setTimeout = function(e, t) {
  var n = this;
  function r(s) {
    s.setTimeout(e), s.removeListener("timeout", s.destroy), s.addListener("timeout", s.destroy);
  }
  function i(s) {
    n._timeout && clearTimeout(n._timeout), n._timeout = setTimeout(function() {
      n.emit("timeout"), a();
    }, e), r(s);
  }
  function a() {
    n._timeout && (clearTimeout(n._timeout), n._timeout = null), n.removeListener("abort", a), n.removeListener("error", a), n.removeListener("response", a), n.removeListener("close", a), t && n.removeListener("timeout", t), n.socket || n._currentRequest.removeListener("socket", i);
  }
  return t && this.on("timeout", t), this.socket ? i(this.socket) : this._currentRequest.once("socket", i), this.on("socket", r), this.on("abort", a), this.on("error", a), this.on("response", a), this.on("close", a), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  vt.prototype[e] = function(t, n) {
    return this._currentRequest[e](t, n);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(vt.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
vt.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var t = e.path.indexOf("?");
    t < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, t), e.search = e.path.substring(t));
  }
};
vt.prototype._performRequest = function() {
  var e = this._options.protocol, t = this._options.nativeProtocols[e];
  if (!t)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var n = e.slice(0, -1);
    this._options.agent = this._options.agents[n];
  }
  var r = this._currentRequest = t.request(this._options, this._onNativeResponse);
  r._redirectable = this;
  for (var i of au)
    r.on(i, su[i]);
  if (this._currentUrl = /^\//.test(this._options.path) ? Ea.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var a = 0, s = this, o = this._requestBodyBuffers;
    (function c(l) {
      if (r === s._currentRequest)
        if (l)
          s.emit("error", l);
        else if (a < o.length) {
          var u = o[a++];
          r.finished || r.write(u.data, u.encoding, c);
        } else s._ended && r.end();
    })();
  }
};
vt.prototype._processResponse = function(e) {
  var t = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: t
  });
  var n = e.headers.location;
  if (!n || this._options.followRedirects === !1 || t < 300 || t >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (cu(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new _O();
  var r, i = this._options.beforeRedirect;
  i && (r = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var a = this._options.method;
  ((t === 301 || t === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], hc(/^content-/i, this._options.headers));
  var s = hc(/^host$/i, this._options.headers), o = ou(this._currentUrl), c = s || o.host, l = /^\w+:/.test(n) ? this._currentUrl : Ea.format(Object.assign(o, { host: c })), u = TO(n, l);
  if (Cg("redirecting to", u.href), this._isRedirect = !0, Jc(u, this._options), (u.protocol !== o.protocol && u.protocol !== "https:" || u.host !== c && !AO(u.host, c)) && hc(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), cr(i)) {
    var p = {
      headers: e.headers,
      statusCode: t
    }, d = {
      url: l,
      method: a,
      headers: r
    };
    i(this._options, p, d), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function Ig(e) {
  var t = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, n = {};
  return Object.keys(e).forEach(function(r) {
    var i = r + ":", a = n[i] = e[r], s = t[r] = Object.create(a);
    function o(l, u, p) {
      return PO(l) ? l = Jc(l) : ar(l) ? l = Jc(ou(l)) : (p = u, u = Dg(l), l = { protocol: i }), cr(u) && (p = u, u = null), u = Object.assign({
        maxRedirects: t.maxRedirects,
        maxBodyLength: t.maxBodyLength
      }, l, u), u.nativeProtocols = n, !ar(u.host) && !ar(u.hostname) && (u.hostname = "::1"), ru.equal(u.protocol, i, "protocol mismatch"), Cg("options", u), new vt(u, p);
    }
    function c(l, u, p) {
      var d = s.request(l, u, p);
      return d.end(), d;
    }
    Object.defineProperties(s, {
      request: { value: o, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: c, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), t;
}
function kg() {
}
function ou(e) {
  var t;
  if (iu)
    t = new ra(e);
  else if (t = Dg(Ea.parse(e)), !ar(t.protocol))
    throw new Yc({ input: e });
  return t;
}
function TO(e, t) {
  return iu ? new ra(e, t) : ou(Ea.resolve(t, e));
}
function Dg(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new Yc({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new Yc({ input: e.href || e });
  return e;
}
function Jc(e, t) {
  var n = t || {};
  for (var r of wO)
    n[r] = e[r];
  return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
}
function hc(e, t) {
  var n;
  for (var r in t)
    e.test(r) && (n = t[r], delete t[r]);
  return n === null || typeof n > "u" ? void 0 : String(n).trim();
}
function $a(e, t, n) {
  function r(i) {
    cr(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, i || {}), this.code = e, this.message = this.cause ? t + ": " + this.cause.message : t;
  }
  return r.prototype = new (n || Error)(), Object.defineProperties(r.prototype, {
    constructor: {
      value: r,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), r;
}
function cu(e, t) {
  for (var n of au)
    e.removeListener(n, su[n]);
  e.on("error", kg), e.destroy(t);
}
function AO(e, t) {
  ru(ar(e) && ar(t));
  var n = e.length - t.length - 1;
  return n > 0 && e[n] === "." && e.endsWith(t);
}
function ar(e) {
  return typeof e == "string" || e instanceof String;
}
function cr(e) {
  return typeof e == "function";
}
function RO(e) {
  return typeof e == "object" && "length" in e;
}
function PO(e) {
  return ra && e instanceof ra;
}
tu.exports = Ig({ http: bO, https: xO });
tu.exports.wrap = Ig;
var OO = tu.exports;
const NO = /* @__PURE__ */ la(OO), Ts = "1.7.7";
function jg(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
const CO = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function IO(e, t, n) {
  const r = n && n.Blob || Ue.classes.Blob, i = jg(e);
  if (t === void 0 && r && (t = !0), i === "data") {
    e = i.length ? e.slice(i.length + 1) : e;
    const a = CO.exec(e);
    if (!a)
      throw new Q("Invalid URL", Q.ERR_INVALID_URL);
    const s = a[1], o = a[2], c = a[3], l = Buffer.from(decodeURIComponent(c), o ? "base64" : "utf8");
    if (t) {
      if (!r)
        throw new Q("Blob is not supported", Q.ERR_NOT_SUPPORT);
      return new r([l], { type: s });
    }
    return l;
  }
  throw new Q("Unsupported protocol " + i, Q.ERR_NOT_SUPPORT);
}
const vc = Symbol("internals");
class Vf extends Ve.Transform {
  constructor(t) {
    t = C.toFlatObject(t, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (r, i) => !C.isUndefined(i[r])), super({
      readableHighWaterMark: t.chunkSize
    });
    const n = this[vc] = {
      timeWindow: t.timeWindow,
      chunkSize: t.chunkSize,
      maxRate: t.maxRate,
      minChunkSize: t.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (r) => {
      r === "progress" && (n.isCaptured || (n.isCaptured = !0));
    });
  }
  _read(t) {
    const n = this[vc];
    return n.onReadCallback && n.onReadCallback(), super._read(t);
  }
  _transform(t, n, r) {
    const i = this[vc], a = i.maxRate, s = this.readableHighWaterMark, o = i.timeWindow, c = 1e3 / o, l = a / c, u = i.minChunkSize !== !1 ? Math.max(i.minChunkSize, l * 0.01) : 0, p = (f, h) => {
      const b = Buffer.byteLength(f);
      i.bytesSeen += b, i.bytes += b, i.isCaptured && this.emit("progress", i.bytesSeen), this.push(f) ? process.nextTick(h) : i.onReadCallback = () => {
        i.onReadCallback = null, process.nextTick(h);
      };
    }, d = (f, h) => {
      const b = Buffer.byteLength(f);
      let v = null, g = s, w, T = 0;
      if (a) {
        const I = Date.now();
        (!i.ts || (T = I - i.ts) >= o) && (i.ts = I, w = l - i.bytes, i.bytes = w < 0 ? -w : 0, T = 0), w = l - i.bytes;
      }
      if (a) {
        if (w <= 0)
          return setTimeout(() => {
            h(null, f);
          }, o - T);
        w < g && (g = w);
      }
      g && b > g && b - g > u && (v = f.subarray(g), f = f.subarray(0, g)), p(f, v ? () => {
        process.nextTick(h, null, v);
      } : h);
    };
    d(t, function f(h, b) {
      if (h)
        return r(h);
      b ? d(b, f) : r(null);
    });
  }
}
const { asyncIterator: Gf } = Symbol, Fg = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[Gf] ? yield* e[Gf]() : yield e;
}, kO = C.ALPHABET.ALPHA_DIGIT + "-_", ia = new J0(), Pn = `\r
`, DO = ia.encode(Pn), jO = 2;
class FO {
  constructor(t, n) {
    const { escapeName: r } = this.constructor, i = C.isString(n);
    let a = `Content-Disposition: form-data; name="${r(t)}"${!i && n.name ? `; filename="${r(n.name)}"` : ""}${Pn}`;
    i ? n = ia.encode(String(n).replace(/\r?\n|\r\n?/g, Pn)) : a += `Content-Type: ${n.type || "application/octet-stream"}${Pn}`, this.headers = ia.encode(a + Pn), this.contentLength = i ? n.byteLength : n.size, this.size = this.headers.byteLength + this.contentLength + jO, this.name = t, this.value = n;
  }
  async *encode() {
    yield this.headers;
    const { value: t } = this;
    C.isTypedArray(t) ? yield t : yield* Fg(t), yield DO;
  }
  static escapeName(t) {
    return String(t).replace(/[\r\n"]/g, (n) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[n]);
  }
}
const LO = (e, t, n) => {
  const {
    tag: r = "form-data-boundary",
    size: i = 25,
    boundary: a = r + "-" + C.generateString(i, kO)
  } = n || {};
  if (!C.isFormData(e))
    throw TypeError("FormData instance required");
  if (a.length < 1 || a.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const s = ia.encode("--" + a + Pn), o = ia.encode("--" + a + "--" + Pn + Pn);
  let c = o.byteLength;
  const l = Array.from(e.entries()).map(([p, d]) => {
    const f = new FO(p, d);
    return c += f.size, f;
  });
  c += s.byteLength * l.length, c = C.toFiniteNumber(c);
  const u = {
    "Content-Type": `multipart/form-data; boundary=${a}`
  };
  return Number.isFinite(c) && (u["Content-Length"] = c), t && t(u), Q0.from(async function* () {
    for (const p of l)
      yield s, yield* p.encode();
    yield o;
  }());
};
class UO extends Ve.Transform {
  __transform(t, n, r) {
    this.push(t), r();
  }
  _transform(t, n, r) {
    if (t.length !== 0 && (this._transform = this.__transform, t[0] !== 120)) {
      const i = Buffer.alloc(2);
      i[0] = 120, i[1] = 156, this.push(i, n);
    }
    this.__transform(t, n, r);
  }
}
const MO = (e, t) => C.isAsyncFn(e) ? function(...n) {
  const r = n.pop();
  e.apply(this, n).then((i) => {
    try {
      t ? r(null, ...t(i)) : r(null, i);
    } catch (a) {
      r(a);
    }
  }, r);
} : e;
function qO(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, a = 0, s;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const l = Date.now(), u = r[a];
    s || (s = l), n[i] = c, r[i] = l;
    let p = a, d = 0;
    for (; p !== i; )
      d += n[p++], p = p % e;
    if (i = (i + 1) % e, i === a && (a = (a + 1) % e), l - s < t)
      return;
    const f = u && l - u;
    return f ? Math.round(d * 1e3 / f) : void 0;
  };
}
function BO(e, t) {
  let n = 0, r = 1e3 / t, i, a;
  const s = (l, u = Date.now()) => {
    n = u, i = null, a && (clearTimeout(a), a = null), e.apply(null, l);
  };
  return [(...l) => {
    const u = Date.now(), p = u - n;
    p >= r ? s(l, u) : (i = l, a || (a = setTimeout(() => {
      a = null, s(i);
    }, r - p)));
  }, () => i && s(i)];
}
const Kr = (e, t, n = 3) => {
  let r = 0;
  const i = qO(50, 250);
  return BO((a) => {
    const s = a.loaded, o = a.lengthComputable ? a.total : void 0, c = s - r, l = i(c), u = s <= o;
    r = s;
    const p = {
      loaded: s,
      total: o,
      progress: o ? s / o : void 0,
      bytes: c,
      rate: l || void 0,
      estimated: l && o && u ? (o - s) / l : void 0,
      event: a,
      lengthComputable: o != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, As = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Rs = (e) => (...t) => C.asap(() => e(...t)), Wf = {
  flush: Ht.constants.Z_SYNC_FLUSH,
  finishFlush: Ht.constants.Z_SYNC_FLUSH
}, zO = {
  flush: Ht.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: Ht.constants.BROTLI_OPERATION_FLUSH
}, Kf = C.isFunction(Ht.createBrotliDecompress), { http: HO, https: VO } = NO, GO = /https:?/, Yf = Ue.protocols.map((e) => e + ":"), Xf = (e, [t, n]) => (e.on("end", n).on("error", n), t);
function WO(e, t) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, t);
}
function Lg(e, t, n) {
  let r = t;
  if (!r && r !== !1) {
    const i = gO(n);
    i && (r = new URL(i));
  }
  if (r) {
    if (r.username && (r.auth = (r.username || "") + ":" + (r.password || "")), r.auth) {
      (r.auth.username || r.auth.password) && (r.auth = (r.auth.username || "") + ":" + (r.auth.password || ""));
      const a = Buffer.from(r.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + a;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const i = r.hostname || r.host;
    e.hostname = i, e.host = i, e.port = r.port, e.path = n, r.protocol && (e.protocol = r.protocol.includes(":") ? r.protocol : `${r.protocol}:`);
  }
  e.beforeRedirects.proxy = function(a) {
    Lg(a, t, a.href);
  };
}
const KO = typeof process < "u" && C.kindOf(process) === "process", YO = (e) => new Promise((t, n) => {
  let r, i;
  const a = (c, l) => {
    i || (i = !0, r && r(c, l));
  }, s = (c) => {
    a(c), t(c);
  }, o = (c) => {
    a(c, !0), n(c);
  };
  e(s, o, (c) => r = c).catch(o);
}), XO = ({ address: e, family: t }) => {
  if (!C.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: t || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, Jf = (e, t) => XO(C.isObject(e) ? e : { address: e, family: t }), JO = KO && function(t) {
  return YO(async function(r, i, a) {
    let { data: s, lookup: o, family: c } = t;
    const { responseType: l, responseEncoding: u } = t, p = t.method.toUpperCase();
    let d, f = !1, h;
    if (o) {
      const N = MO(o, (B) => C.isArray(B) ? B : [B]);
      o = (B, H, M) => {
        N(B, H, (S, k, R) => {
          if (S)
            return M(S);
          const x = C.isArray(k) ? k.map(($) => Jf($)) : [Jf(k, R)];
          H.all ? M(S, x) : M(S, x[0].address, x[0].family);
        });
      };
    }
    const b = new X0(), v = () => {
      t.cancelToken && t.cancelToken.unsubscribe(g), t.signal && t.signal.removeEventListener("abort", g), b.removeAllListeners();
    };
    a((N, B) => {
      d = !0, B && (f = !0, v());
    });
    function g(N) {
      b.emit("abort", !N || N.type ? new Ln(null, t, h) : N);
    }
    b.once("abort", i), (t.cancelToken || t.signal) && (t.cancelToken && t.cancelToken.subscribe(g), t.signal && (t.signal.aborted ? g() : t.signal.addEventListener("abort", g)));
    const w = eu(t.baseURL, t.url), T = new URL(w, Ue.hasBrowserEnv ? Ue.origin : void 0), I = T.protocol || Yf[0];
    if (I === "data:") {
      let N;
      if (p !== "GET")
        return Fr(r, i, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: t
        });
      try {
        N = IO(t.url, l === "blob", {
          Blob: t.env && t.env.Blob
        });
      } catch (B) {
        throw Q.from(B, Q.ERR_BAD_REQUEST, t);
      }
      return l === "text" ? (N = N.toString(u), (!u || u === "utf8") && (N = C.stripBOM(N))) : l === "stream" && (N = Ve.Readable.from(N)), Fr(r, i, {
        data: N,
        status: 200,
        statusText: "OK",
        headers: new Ke(),
        config: t
      });
    }
    if (Yf.indexOf(I) === -1)
      return i(new Q(
        "Unsupported protocol " + I,
        Q.ERR_BAD_REQUEST,
        t
      ));
    const F = Ke.from(t.headers).normalize();
    F.set("User-Agent", "axios/" + Ts, !1);
    const { onUploadProgress: O, onDownloadProgress: U } = t, V = t.maxRate;
    let _, Y;
    if (C.isSpecCompliantForm(s)) {
      const N = F.getContentType(/boundary=([-_\w\d]{10,70})/i);
      s = LO(s, (B) => {
        F.set(B);
      }, {
        tag: `axios-${Ts}-boundary`,
        boundary: N && N[1] || void 0
      });
    } else if (C.isFormData(s) && C.isFunction(s.getHeaders)) {
      if (F.set(s.getHeaders()), !F.hasContentLength())
        try {
          const N = await mr.promisify(s.getLength).call(s);
          Number.isFinite(N) && N >= 0 && F.setContentLength(N);
        } catch {
        }
    } else if (C.isBlob(s))
      s.size && F.setContentType(s.type || "application/octet-stream"), F.setContentLength(s.size || 0), s = Ve.Readable.from(Fg(s));
    else if (s && !C.isStream(s)) {
      if (!Buffer.isBuffer(s)) if (C.isArrayBuffer(s))
        s = Buffer.from(new Uint8Array(s));
      else if (C.isString(s))
        s = Buffer.from(s, "utf-8");
      else
        return i(new Q(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          Q.ERR_BAD_REQUEST,
          t
        ));
      if (F.setContentLength(s.length, !1), t.maxBodyLength > -1 && s.length > t.maxBodyLength)
        return i(new Q(
          "Request body larger than maxBodyLength limit",
          Q.ERR_BAD_REQUEST,
          t
        ));
    }
    const z = C.toFiniteNumber(F.getContentLength());
    C.isArray(V) ? (_ = V[0], Y = V[1]) : _ = Y = V, s && (O || _) && (C.isStream(s) || (s = Ve.Readable.from(s, { objectMode: !1 })), s = Ve.pipeline([s, new Vf({
      maxRate: C.toFiniteNumber(_)
    })], C.noop), O && s.on("progress", Xf(
      s,
      As(
        z,
        Kr(Rs(O), !1, 3)
      )
    )));
    let K;
    if (t.auth) {
      const N = t.auth.username || "", B = t.auth.password || "";
      K = N + ":" + B;
    }
    if (!K && T.username) {
      const N = T.username, B = T.password;
      K = N + ":" + B;
    }
    K && F.delete("authorization");
    let J;
    try {
      J = Jl(
        T.pathname + T.search,
        t.params,
        t.paramsSerializer
      ).replace(/^\?/, "");
    } catch (N) {
      const B = new Error(N.message);
      return B.config = t, B.url = t.url, B.exists = !0, i(B);
    }
    F.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (Kf ? ", br" : ""),
      !1
    );
    const D = {
      path: J,
      method: p,
      headers: F.toJSON(),
      agents: { http: t.httpAgent, https: t.httpsAgent },
      auth: K,
      protocol: I,
      family: c,
      beforeRedirect: WO,
      beforeRedirects: {}
    };
    !C.isUndefined(o) && (D.lookup = o), t.socketPath ? D.socketPath = t.socketPath : (D.hostname = T.hostname.startsWith("[") ? T.hostname.slice(1, -1) : T.hostname, D.port = T.port, Lg(D, t.proxy, I + "//" + T.hostname + (T.port ? ":" + T.port : "") + D.path));
    let j;
    const G = GO.test(D.protocol);
    if (D.agent = G ? t.httpsAgent : t.httpAgent, t.transport ? j = t.transport : t.maxRedirects === 0 ? j = G ? ml : Fs : (t.maxRedirects && (D.maxRedirects = t.maxRedirects), t.beforeRedirect && (D.beforeRedirects.config = t.beforeRedirect), j = G ? VO : HO), t.maxBodyLength > -1 ? D.maxBodyLength = t.maxBodyLength : D.maxBodyLength = 1 / 0, t.insecureHTTPParser && (D.insecureHTTPParser = t.insecureHTTPParser), h = j.request(D, function(B) {
      if (h.destroyed) return;
      const H = [B], M = +B.headers["content-length"];
      if (U || Y) {
        const $ = new Vf({
          maxRate: C.toFiniteNumber(Y)
        });
        U && $.on("progress", Xf(
          $,
          As(
            M,
            Kr(Rs(U), !0, 3)
          )
        )), H.push($);
      }
      let S = B;
      const k = B.req || h;
      if (t.decompress !== !1 && B.headers["content-encoding"])
        switch ((p === "HEAD" || B.statusCode === 204) && delete B.headers["content-encoding"], (B.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            H.push(Ht.createUnzip(Wf)), delete B.headers["content-encoding"];
            break;
          case "deflate":
            H.push(new UO()), H.push(Ht.createUnzip(Wf)), delete B.headers["content-encoding"];
            break;
          case "br":
            Kf && (H.push(Ht.createBrotliDecompress(zO)), delete B.headers["content-encoding"]);
        }
      S = H.length > 1 ? Ve.pipeline(H, C.noop) : H[0];
      const R = Ve.finished(S, () => {
        R(), v();
      }), x = {
        status: B.statusCode,
        statusText: B.statusMessage,
        headers: new Ke(B.headers),
        config: t,
        request: k
      };
      if (l === "stream")
        x.data = S, Fr(r, i, x);
      else {
        const $ = [];
        let q = 0;
        S.on("data", function(m) {
          $.push(m), q += m.length, t.maxContentLength > -1 && q > t.maxContentLength && (f = !0, S.destroy(), i(new Q(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            Q.ERR_BAD_RESPONSE,
            t,
            k
          )));
        }), S.on("aborted", function() {
          if (f)
            return;
          const m = new Q(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            Q.ERR_BAD_RESPONSE,
            t,
            k
          );
          S.destroy(m), i(m);
        }), S.on("error", function(m) {
          h.destroyed || i(Q.from(m, null, t, k));
        }), S.on("end", function() {
          try {
            let m = $.length === 1 ? $[0] : Buffer.concat($);
            l !== "arraybuffer" && (m = m.toString(u), (!u || u === "utf8") && (m = C.stripBOM(m))), x.data = m;
          } catch (m) {
            return i(Q.from(m, null, t, x.request, x));
          }
          Fr(r, i, x);
        });
      }
      b.once("abort", ($) => {
        S.destroyed || (S.emit("error", $), S.destroy());
      });
    }), b.once("abort", (N) => {
      i(N), h.destroy(N);
    }), h.on("error", function(B) {
      i(Q.from(B, null, t, h));
    }), h.on("socket", function(B) {
      B.setKeepAlive(!0, 1e3 * 60);
    }), t.timeout) {
      const N = parseInt(t.timeout, 10);
      if (Number.isNaN(N)) {
        i(new Q(
          "error trying to parse `config.timeout` to int",
          Q.ERR_BAD_OPTION_VALUE,
          t,
          h
        ));
        return;
      }
      h.setTimeout(N, function() {
        if (d) return;
        let H = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
        const M = t.transitional || Ql;
        t.timeoutErrorMessage && (H = t.timeoutErrorMessage), i(new Q(
          H,
          M.clarifyTimeoutError ? Q.ETIMEDOUT : Q.ECONNABORTED,
          t,
          h
        )), g();
      });
    }
    if (C.isStream(s)) {
      let N = !1, B = !1;
      s.on("end", () => {
        N = !0;
      }), s.once("error", (H) => {
        B = !0, h.destroy(H);
      }), s.on("close", () => {
        !N && !B && g(new Ln("Request stream has been aborted", t, h));
      }), s.pipe(h);
    } else
      h.end(s);
  });
}, QO = Ue.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = Ue.navigator && /(msie|trident)/i.test(Ue.navigator.userAgent), n = document.createElement("a");
    let r;
    function i(a) {
      let s = a;
      return t && (n.setAttribute("href", s), s = n.href), n.setAttribute("href", s), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = i(window.location.href), function(s) {
      const o = C.isString(s) ? i(s) : s;
      return o.protocol === r.protocol && o.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), ZO = Ue.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, i, a) {
      const s = [e + "=" + encodeURIComponent(t)];
      C.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), C.isString(r) && s.push("path=" + r), C.isString(i) && s.push("domain=" + i), a === !0 && s.push("secure"), document.cookie = s.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), Qf = (e) => e instanceof Ke ? { ...e } : e;
function lr(e, t) {
  t = t || {};
  const n = {};
  function r(l, u, p) {
    return C.isPlainObject(l) && C.isPlainObject(u) ? C.merge.call({ caseless: p }, l, u) : C.isPlainObject(u) ? C.merge({}, u) : C.isArray(u) ? u.slice() : u;
  }
  function i(l, u, p) {
    if (C.isUndefined(u)) {
      if (!C.isUndefined(l))
        return r(void 0, l, p);
    } else return r(l, u, p);
  }
  function a(l, u) {
    if (!C.isUndefined(u))
      return r(void 0, u);
  }
  function s(l, u) {
    if (C.isUndefined(u)) {
      if (!C.isUndefined(l))
        return r(void 0, l);
    } else return r(void 0, u);
  }
  function o(l, u, p) {
    if (p in t)
      return r(l, u);
    if (p in e)
      return r(void 0, l);
  }
  const c = {
    url: a,
    method: a,
    data: a,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: o,
    headers: (l, u) => i(Qf(l), Qf(u), !0)
  };
  return C.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const p = c[u] || i, d = p(e[u], t[u], u);
    C.isUndefined(d) && p !== o || (n[u] = d);
  }), n;
}
const Ug = (e) => {
  const t = lr({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: a, headers: s, auth: o } = t;
  t.headers = s = Ke.from(s), t.url = Jl(eu(t.baseURL, t.url), e.params, e.paramsSerializer), o && s.set(
    "Authorization",
    "Basic " + btoa((o.username || "") + ":" + (o.password ? unescape(encodeURIComponent(o.password)) : ""))
  );
  let c;
  if (C.isFormData(n)) {
    if (Ue.hasStandardBrowserEnv || Ue.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((c = s.getContentType()) !== !1) {
      const [l, ...u] = c ? c.split(";").map((p) => p.trim()).filter(Boolean) : [];
      s.setContentType([l || "multipart/form-data", ...u].join("; "));
    }
  }
  if (Ue.hasStandardBrowserEnv && (r && C.isFunction(r) && (r = r(t)), r || r !== !1 && QO(t.url))) {
    const l = i && a && ZO.read(a);
    l && s.set(i, l);
  }
  return t;
}, eN = typeof XMLHttpRequest < "u", tN = eN && function(e) {
  return new Promise(function(n, r) {
    const i = Ug(e);
    let a = i.data;
    const s = Ke.from(i.headers).normalize();
    let { responseType: o, onUploadProgress: c, onDownloadProgress: l } = i, u, p, d, f, h;
    function b() {
      f && f(), h && h(), i.cancelToken && i.cancelToken.unsubscribe(u), i.signal && i.signal.removeEventListener("abort", u);
    }
    let v = new XMLHttpRequest();
    v.open(i.method.toUpperCase(), i.url, !0), v.timeout = i.timeout;
    function g() {
      if (!v)
        return;
      const T = Ke.from(
        "getAllResponseHeaders" in v && v.getAllResponseHeaders()
      ), F = {
        data: !o || o === "text" || o === "json" ? v.responseText : v.response,
        status: v.status,
        statusText: v.statusText,
        headers: T,
        config: e,
        request: v
      };
      Fr(function(U) {
        n(U), b();
      }, function(U) {
        r(U), b();
      }, F), v = null;
    }
    "onloadend" in v ? v.onloadend = g : v.onreadystatechange = function() {
      !v || v.readyState !== 4 || v.status === 0 && !(v.responseURL && v.responseURL.indexOf("file:") === 0) || setTimeout(g);
    }, v.onabort = function() {
      v && (r(new Q("Request aborted", Q.ECONNABORTED, e, v)), v = null);
    }, v.onerror = function() {
      r(new Q("Network Error", Q.ERR_NETWORK, e, v)), v = null;
    }, v.ontimeout = function() {
      let I = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const F = i.transitional || Ql;
      i.timeoutErrorMessage && (I = i.timeoutErrorMessage), r(new Q(
        I,
        F.clarifyTimeoutError ? Q.ETIMEDOUT : Q.ECONNABORTED,
        e,
        v
      )), v = null;
    }, a === void 0 && s.setContentType(null), "setRequestHeader" in v && C.forEach(s.toJSON(), function(I, F) {
      v.setRequestHeader(F, I);
    }), C.isUndefined(i.withCredentials) || (v.withCredentials = !!i.withCredentials), o && o !== "json" && (v.responseType = i.responseType), l && ([d, h] = Kr(l, !0), v.addEventListener("progress", d)), c && v.upload && ([p, f] = Kr(c), v.upload.addEventListener("progress", p), v.upload.addEventListener("loadend", f)), (i.cancelToken || i.signal) && (u = (T) => {
      v && (r(!T || T.type ? new Ln(null, e, v) : T), v.abort(), v = null);
    }, i.cancelToken && i.cancelToken.subscribe(u), i.signal && (i.signal.aborted ? u() : i.signal.addEventListener("abort", u)));
    const w = jg(i.url);
    if (w && Ue.protocols.indexOf(w) === -1) {
      r(new Q("Unsupported protocol " + w + ":", Q.ERR_BAD_REQUEST, e));
      return;
    }
    v.send(a || null);
  });
}, nN = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const a = function(l) {
      if (!i) {
        i = !0, o();
        const u = l instanceof Error ? l : this.reason;
        r.abort(u instanceof Q ? u : new Ln(u instanceof Error ? u.message : u));
      }
    };
    let s = t && setTimeout(() => {
      s = null, a(new Q(`timeout ${t} of ms exceeded`, Q.ETIMEDOUT));
    }, t);
    const o = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((l) => {
        l.unsubscribe ? l.unsubscribe(a) : l.removeEventListener("abort", a);
      }), e = null);
    };
    e.forEach((l) => l.addEventListener("abort", a));
    const { signal: c } = r;
    return c.unsubscribe = () => C.asap(o), c;
  }
}, rN = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; )
    i = r + t, yield e.slice(r, i), r = i;
}, iN = async function* (e, t) {
  for await (const n of aN(e))
    yield* rN(n, t);
}, aN = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Zf = (e, t, n, r) => {
  const i = iN(e, t);
  let a = 0, s, o = (c) => {
    s || (s = !0, r && r(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: l, value: u } = await i.next();
        if (l) {
          o(), c.close();
          return;
        }
        let p = u.byteLength;
        if (n) {
          let d = a += p;
          n(d);
        }
        c.enqueue(new Uint8Array(u));
      } catch (l) {
        throw o(l), l;
      }
    },
    cancel(c) {
      return o(c), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, fo = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Mg = fo && typeof ReadableStream == "function", sN = fo && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), qg = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, oN = Mg && qg(() => {
  let e = !1;
  const t = new Request(Ue.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), em = 64 * 1024, Qc = Mg && qg(() => C.isReadableStream(new Response("").body)), Ps = {
  stream: Qc && ((e) => e.body)
};
fo && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Ps[t] && (Ps[t] = C.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new Q(`Response type '${t}' is not supported`, Q.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const cN = async (e) => {
  if (e == null)
    return 0;
  if (C.isBlob(e))
    return e.size;
  if (C.isSpecCompliantForm(e))
    return (await new Request(Ue.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (C.isArrayBufferView(e) || C.isArrayBuffer(e))
    return e.byteLength;
  if (C.isURLSearchParams(e) && (e = e + ""), C.isString(e))
    return (await sN(e)).byteLength;
}, lN = async (e, t) => {
  const n = C.toFiniteNumber(e.getContentLength());
  return n ?? cN(t);
}, uN = fo && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: i,
    cancelToken: a,
    timeout: s,
    onDownloadProgress: o,
    onUploadProgress: c,
    responseType: l,
    headers: u,
    withCredentials: p = "same-origin",
    fetchOptions: d
  } = Ug(e);
  l = l ? (l + "").toLowerCase() : "text";
  let f = nN([i, a && a.toAbortSignal()], s), h;
  const b = f && f.unsubscribe && (() => {
    f.unsubscribe();
  });
  let v;
  try {
    if (c && oN && n !== "get" && n !== "head" && (v = await lN(u, r)) !== 0) {
      let F = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), O;
      if (C.isFormData(r) && (O = F.headers.get("content-type")) && u.setContentType(O), F.body) {
        const [U, V] = As(
          v,
          Kr(Rs(c))
        );
        r = Zf(F.body, em, U, V);
      }
    }
    C.isString(p) || (p = p ? "include" : "omit");
    const g = "credentials" in Request.prototype;
    h = new Request(t, {
      ...d,
      signal: f,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: g ? p : void 0
    });
    let w = await fetch(h);
    const T = Qc && (l === "stream" || l === "response");
    if (Qc && (o || T && b)) {
      const F = {};
      ["status", "statusText", "headers"].forEach((_) => {
        F[_] = w[_];
      });
      const O = C.toFiniteNumber(w.headers.get("content-length")), [U, V] = o && As(
        O,
        Kr(Rs(o), !0)
      ) || [];
      w = new Response(
        Zf(w.body, em, U, () => {
          V && V(), b && b();
        }),
        F
      );
    }
    l = l || "text";
    let I = await Ps[C.findKey(Ps, l) || "text"](w, e);
    return !T && b && b(), await new Promise((F, O) => {
      Fr(F, O, {
        data: I,
        headers: Ke.from(w.headers),
        status: w.status,
        statusText: w.statusText,
        config: e,
        request: h
      });
    });
  } catch (g) {
    throw b && b(), g && g.name === "TypeError" && /fetch/i.test(g.message) ? Object.assign(
      new Q("Network Error", Q.ERR_NETWORK, e, h),
      {
        cause: g.cause || g
      }
    ) : Q.from(g, g && g.code, e, h);
  }
}), Zc = {
  http: JO,
  xhr: tN,
  fetch: uN
};
C.forEach(Zc, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const tm = (e) => `- ${e}`, pN = (e) => C.isFunction(e) || e === null || e === !1, Bg = {
  getAdapter: (e) => {
    e = C.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const i = {};
    for (let a = 0; a < t; a++) {
      n = e[a];
      let s;
      if (r = n, !pN(n) && (r = Zc[(s = String(n)).toLowerCase()], r === void 0))
        throw new Q(`Unknown adapter '${s}'`);
      if (r)
        break;
      i[s || "#" + a] = r;
    }
    if (!r) {
      const a = Object.entries(i).map(
        ([o, c]) => `adapter ${o} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? a.length > 1 ? `since :
` + a.map(tm).join(`
`) : " " + tm(a[0]) : "as no adapter specified";
      throw new Q(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: Zc
};
function gc(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ln(null, e);
}
function nm(e) {
  return gc(e), e.headers = Ke.from(e.headers), e.data = mc.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Bg.getAdapter(e.adapter || _a.adapter)(e).then(function(r) {
    return gc(e), r.data = mc.call(
      e,
      e.transformResponse,
      r
    ), r.headers = Ke.from(r.headers), r;
  }, function(r) {
    return Ng(r) || (gc(e), r && r.response && (r.response.data = mc.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = Ke.from(r.response.headers))), Promise.reject(r);
  });
}
const lu = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  lu[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const rm = {};
lu.transitional = function(t, n, r) {
  function i(a, s) {
    return "[Axios v" + Ts + "] Transitional option '" + a + "'" + s + (r ? ". " + r : "");
  }
  return (a, s, o) => {
    if (t === !1)
      throw new Q(
        i(s, " has been removed" + (n ? " in " + n : "")),
        Q.ERR_DEPRECATED
      );
    return n && !rm[s] && (rm[s] = !0, console.warn(
      i(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, s, o) : !0;
  };
};
function dN(e, t, n) {
  if (typeof e != "object")
    throw new Q("options must be an object", Q.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const a = r[i], s = t[a];
    if (s) {
      const o = e[a], c = o === void 0 || s(o, a, e);
      if (c !== !0)
        throw new Q("option " + a + " must be " + c, Q.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new Q("Unknown option " + a, Q.ERR_BAD_OPTION);
  }
}
const el = {
  assertOptions: dN,
  validators: lu
}, vn = el.validators;
class sr {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new zf(),
      response: new zf()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        const a = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? a && !String(r.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + a) : r.stack = a;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = lr(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: a } = n;
    r !== void 0 && el.assertOptions(r, {
      silentJSONParsing: vn.transitional(vn.boolean),
      forcedJSONParsing: vn.transitional(vn.boolean),
      clarifyTimeoutError: vn.transitional(vn.boolean)
    }, !1), i != null && (C.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : el.assertOptions(i, {
      encode: vn.function,
      serialize: vn.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = a && C.merge(
      a.common,
      a[n.method]
    );
    a && C.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete a[h];
      }
    ), n.headers = Ke.concat(s, a);
    const o = [];
    let c = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(n) === !1 || (c = c && b.synchronous, o.unshift(b.fulfilled, b.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(b) {
      l.push(b.fulfilled, b.rejected);
    });
    let u, p = 0, d;
    if (!c) {
      const h = [nm.bind(this), void 0];
      for (h.unshift.apply(h, o), h.push.apply(h, l), d = h.length, u = Promise.resolve(n); p < d; )
        u = u.then(h[p++], h[p++]);
      return u;
    }
    d = o.length;
    let f = n;
    for (p = 0; p < d; ) {
      const h = o[p++], b = o[p++];
      try {
        f = h(f);
      } catch (v) {
        b.call(this, v);
        break;
      }
    }
    try {
      u = nm.call(this, f);
    } catch (h) {
      return Promise.reject(h);
    }
    for (p = 0, d = l.length; p < d; )
      u = u.then(l[p++], l[p++]);
    return u;
  }
  getUri(t) {
    t = lr(this.defaults, t);
    const n = eu(t.baseURL, t.url);
    return Jl(n, t.params, t.paramsSerializer);
  }
}
C.forEach(["delete", "get", "head", "options"], function(t) {
  sr.prototype[t] = function(n, r) {
    return this.request(lr(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
C.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, s, o) {
      return this.request(lr(o || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: s
      }));
    };
  }
  sr.prototype[t] = n(), sr.prototype[t + "Form"] = n(!0);
});
class uu {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let a = r._listeners.length;
      for (; a-- > 0; )
        r._listeners[a](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let a;
      const s = new Promise((o) => {
        r.subscribe(o), a = o;
      }).then(i);
      return s.cancel = function() {
        r.unsubscribe(a);
      }, s;
    }, t(function(a, s, o) {
      r.reason || (r.reason = new Ln(a, s, o), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new uu(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
function fN(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function mN(e) {
  return C.isObject(e) && e.isAxiosError === !0;
}
const tl = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(tl).forEach(([e, t]) => {
  tl[t] = e;
});
function zg(e) {
  const t = new sr(e), n = sg(sr.prototype.request, t);
  return C.extend(n, sr.prototype, t, { allOwnKeys: !0 }), C.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return zg(lr(e, i));
  }, n;
}
const oe = zg(_a);
oe.Axios = sr;
oe.CanceledError = Ln;
oe.CancelToken = uu;
oe.isCancel = Ng;
oe.VERSION = Ts;
oe.toFormData = po;
oe.AxiosError = Q;
oe.Cancel = oe.CanceledError;
oe.all = function(t) {
  return Promise.all(t);
};
oe.spread = fN;
oe.isAxiosError = mN;
oe.mergeConfig = lr;
oe.AxiosHeaders = Ke;
oe.formToJSON = (e) => Og(C.isHTMLForm(e) ? new FormData(e) : e);
oe.getAdapter = Bg.getAdapter;
oe.HttpStatusCode = tl;
oe.default = oe;
const pu = "auth";
me.handle(`${pu}-sign-in`, async (e, t) => {
  try {
    return (await oe.post(
      "https://patientcare-api.alannin.dev/api/auth/sign-in",
      t
    )).data;
  } catch (n) {
    if (oe.isAxiosError(n) && n.response) {
      const r = n.response.data.message;
      return r.includes("Invalid email or password") ? {
        errorType: "invalid-credentials",
        message: "Correo electrónico o contraseña inválidos"
      } : r.includes("Subscription inactive") ? {
        errorType: "subscription-inactive",
        message: "Suscripción inactiva",
        data: n.response.data
      } : r.includes("Email not verified") ? {
        errorType: "email-not-verified",
        message: "Email no verificado",
        data: n.response.data
      } : {
        errorType: "server",
        message: "Error interno del servidor. Inténtelo más tarde."
      };
    }
    return {
      errorType: "server",
      message: "Error interno del servidor. Inténtelo más tarde."
    };
  }
});
me.handle(
  `${pu}-verify-session`,
  async (e, t) => (await oe.get(
    "https://patientcare-api.alannin.dev/api/auth/verify-session",
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
me.handle(
  `${pu}-resend-verification`,
  async (e, t) => {
    try {
      return (await oe.post(
        "https://patientcare-api.alannin.dev/api/auth/resend-email-verification",
        t
      )).data;
    } catch (n) {
      return oe.isAxiosError(n) && n.response ? {
        errorType: "server",
        message: "Error interno del servidor. Inténtelo más tarde."
      } : {
        errorType: "server",
        message: "Error interno del servidor. Inténtelo más tarde."
      };
    }
  }
);
const du = "user";
me.handle(`${du}-update`, async (e, t) => (await oe.put(
  "https://patientcare-api.alannin.dev/api/user/update",
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
me.handle(`${du}-delete`, async (e, t) => (await oe.delete(
  "https://patientcare-api.alannin.dev/api/user/delete",
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
me.handle(
  `${du}-delete-field`,
  async (e, t) => (await oe.put(
    "https://patientcare-api.alannin.dev/api/user/delete-field",
    t.data,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
const mo = "patient";
me.handle(
  `${mo}-get-from-user`,
  async (e, t) => (await oe.get(
    "https://patientcare-api.alannin.dev/api/patient/get-from-user",
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
me.handle(`${mo}-add`, async (e, t) => (await oe.post(
  "https://patientcare-api.alannin.dev/api/patient/create",
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
me.handle(`${mo}-update`, async (e, t) => {
  const { patient_id: n, ...r } = t.data;
  return (await oe.put(
    `https://patientcare-api.alannin.dev/api/patient/update/${n}`,
    r,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data;
});
me.handle(`${mo}-delete`, async (e, t) => (await oe.delete(
  `https://patientcare-api.alannin.dev/api/patient/delete/${t.data.patient_id}`,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
const Sa = "appointment";
me.handle(`${Sa}-add`, async (e, t) => (await oe.post(
  "https://patientcare-api.alannin.dev/api/appointment/create",
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
me.handle(`${Sa}-update`, async (e, t) => {
  const { appointment_id: n, ...r } = t.data;
  return (await oe.put(
    `https://patientcare-api.alannin.dev/api/appointment/update/${n}`,
    r,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data;
});
me.handle(`${Sa}-delete`, async (e, t) => (await oe.delete(
  `https://patientcare-api.alannin.dev/api/appointment/delete/${t.data.appointment_id}`,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
me.handle(
  `${Sa}-get-from-user`,
  async (e, t) => (await oe.get(
    "https://patientcare-api.alannin.dev/api/appointment/get-from-user",
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
me.handle(
  `${Sa}-get-from-patient`,
  async (e, t) => (await oe.get(
    `https://patientcare-api.alannin.dev/api/appointment/get-from-patient/${t.patient_id}`,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
const ho = "consultation";
me.handle(
  `${ho}-get-from-user`,
  async (e, t) => (await oe.get(
    "https://patientcare-api.alannin.dev/api/consultation/get-from-user",
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
me.handle(`${ho}-add`, async (e, t) => (await oe.post(
  "https://patientcare-api.alannin.dev/api/consultation/create",
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
me.handle(`${ho}-update`, async (e, t) => {
  const { consultation_id: n, ...r } = t.data;
  return (await oe.put(
    `https://patientcare-api.alannin.dev/api/consultation/update/${n}`,
    r,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data;
});
me.handle(`${ho}-delete`, async (e, t) => (await oe.delete(
  `https://patientcare-api.alannin.dev/api/consultation/delete/${t.data.consultation_id}`,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
const ur = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, yc = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), hN = new Set("0123456789");
function vo(e) {
  const t = [];
  let n = "", r = "start", i = !1;
  for (const a of e)
    switch (a) {
      case "\\": {
        if (r === "index")
          throw new Error("Invalid character in an index");
        if (r === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (n += a), r = "property", i = !i;
        break;
      }
      case ".": {
        if (r === "index")
          throw new Error("Invalid character in an index");
        if (r === "indexEnd") {
          r = "property";
          break;
        }
        if (i) {
          i = !1, n += a;
          break;
        }
        if (yc.has(n))
          return [];
        t.push(n), n = "", r = "property";
        break;
      }
      case "[": {
        if (r === "index")
          throw new Error("Invalid character in an index");
        if (r === "indexEnd") {
          r = "index";
          break;
        }
        if (i) {
          i = !1, n += a;
          break;
        }
        if (r === "property") {
          if (yc.has(n))
            return [];
          t.push(n), n = "";
        }
        r = "index";
        break;
      }
      case "]": {
        if (r === "index") {
          t.push(Number.parseInt(n, 10)), n = "", r = "indexEnd";
          break;
        }
        if (r === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (r === "index" && !hN.has(a))
          throw new Error("Invalid character in an index");
        if (r === "indexEnd")
          throw new Error("Invalid character after an index");
        r === "start" && (r = "property"), i && (i = !1, n += "\\"), n += a;
      }
    }
  switch (i && (n += "\\"), r) {
    case "property": {
      if (yc.has(n))
        return [];
      t.push(n);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function fu(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const n = Number.parseInt(t, 10);
    return Number.isInteger(n) && e[n] === e[t];
  }
  return !1;
}
function Hg(e, t) {
  if (fu(e, t))
    throw new Error("Cannot use string index");
}
function vN(e, t, n) {
  if (!ur(e) || typeof t != "string")
    return n === void 0 ? e : n;
  const r = vo(t);
  if (r.length === 0)
    return n;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    if (fu(e, a) ? e = i === r.length - 1 ? void 0 : null : e = e[a], e == null) {
      if (i !== r.length - 1)
        return n;
      break;
    }
  }
  return e === void 0 ? n : e;
}
function im(e, t, n) {
  if (!ur(e) || typeof t != "string")
    return e;
  const r = e, i = vo(t);
  for (let a = 0; a < i.length; a++) {
    const s = i[a];
    Hg(e, s), a === i.length - 1 ? e[s] = n : ur(e[s]) || (e[s] = typeof i[a + 1] == "number" ? [] : {}), e = e[s];
  }
  return r;
}
function gN(e, t) {
  if (!ur(e) || typeof t != "string")
    return !1;
  const n = vo(t);
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (Hg(e, i), r === n.length - 1)
      return delete e[i], !0;
    if (e = e[i], !ur(e))
      return !1;
  }
}
function yN(e, t) {
  if (!ur(e) || typeof t != "string")
    return !1;
  const n = vo(t);
  if (n.length === 0)
    return !1;
  for (const r of n) {
    if (!ur(e) || !(r in e) || fu(e, r))
      return !1;
    e = e[r];
  }
  return !0;
}
const Sn = Ls.homedir(), mu = Ls.tmpdir(), { env: Ur } = De, bN = (e) => {
  const t = le.join(Sn, "Library");
  return {
    data: le.join(t, "Application Support", e),
    config: le.join(t, "Preferences", e),
    cache: le.join(t, "Caches", e),
    log: le.join(t, "Logs", e),
    temp: le.join(mu, e)
  };
}, xN = (e) => {
  const t = Ur.APPDATA || le.join(Sn, "AppData", "Roaming"), n = Ur.LOCALAPPDATA || le.join(Sn, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: le.join(n, e, "Data"),
    config: le.join(t, e, "Config"),
    cache: le.join(n, e, "Cache"),
    log: le.join(n, e, "Log"),
    temp: le.join(mu, e)
  };
}, wN = (e) => {
  const t = le.basename(Sn);
  return {
    data: le.join(Ur.XDG_DATA_HOME || le.join(Sn, ".local", "share"), e),
    config: le.join(Ur.XDG_CONFIG_HOME || le.join(Sn, ".config"), e),
    cache: le.join(Ur.XDG_CACHE_HOME || le.join(Sn, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: le.join(Ur.XDG_STATE_HOME || le.join(Sn, ".local", "state"), e),
    temp: le.join(mu, t, e)
  };
};
function _N(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), De.platform === "darwin" ? bN(e) : De.platform === "win32" ? xN(e) : wN(e);
}
const gn = (e, t) => function(...r) {
  return e.apply(void 0, r).catch(t);
}, Jt = (e, t) => function(...r) {
  try {
    return e.apply(void 0, r);
  } catch (i) {
    return t(i);
  }
}, EN = De.getuid ? !De.getuid() : !1, $N = 1e4, yt = () => {
}, _e = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!_e.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !EN && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!_e.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!_e.isNodeError(e))
      throw e;
    if (!_e.isChangeErrorOk(e))
      throw e;
  }
};
class SN {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = $N, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (t) => {
      this.queueWaiting.add(t), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (t) => {
      this.queueWaiting.delete(t), this.queueActive.delete(t);
    }, this.schedule = () => new Promise((t) => {
      const n = () => this.remove(r), r = () => t(n);
      this.add(r);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const t of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(t), this.queueActive.add(t), t();
        }
      }
    };
  }
}
const TN = new SN(), yn = (e, t) => function(r) {
  return function i(...a) {
    return TN.schedule().then((s) => {
      const o = (l) => (s(), l), c = (l) => {
        if (s(), Date.now() >= r)
          throw l;
        if (t(l)) {
          const u = Math.round(100 * Math.random());
          return new Promise((d) => setTimeout(d, u)).then(() => i.apply(void 0, a));
        }
        throw l;
      };
      return e.apply(void 0, a).then(o, c);
    });
  };
}, bn = (e, t) => function(r) {
  return function i(...a) {
    try {
      return e.apply(void 0, a);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return i.apply(void 0, a);
      throw s;
    }
  };
}, Ze = {
  attempt: {
    /* ASYNC */
    chmod: gn(Je(ce.chmod), _e.onChangeError),
    chown: gn(Je(ce.chown), _e.onChangeError),
    close: gn(Je(ce.close), yt),
    fsync: gn(Je(ce.fsync), yt),
    mkdir: gn(Je(ce.mkdir), yt),
    realpath: gn(Je(ce.realpath), yt),
    stat: gn(Je(ce.stat), yt),
    unlink: gn(Je(ce.unlink), yt),
    /* SYNC */
    chmodSync: Jt(ce.chmodSync, _e.onChangeError),
    chownSync: Jt(ce.chownSync, _e.onChangeError),
    closeSync: Jt(ce.closeSync, yt),
    existsSync: Jt(ce.existsSync, yt),
    fsyncSync: Jt(ce.fsync, yt),
    mkdirSync: Jt(ce.mkdirSync, yt),
    realpathSync: Jt(ce.realpathSync, yt),
    statSync: Jt(ce.statSync, yt),
    unlinkSync: Jt(ce.unlinkSync, yt)
  },
  retry: {
    /* ASYNC */
    close: yn(Je(ce.close), _e.isRetriableError),
    fsync: yn(Je(ce.fsync), _e.isRetriableError),
    open: yn(Je(ce.open), _e.isRetriableError),
    readFile: yn(Je(ce.readFile), _e.isRetriableError),
    rename: yn(Je(ce.rename), _e.isRetriableError),
    stat: yn(Je(ce.stat), _e.isRetriableError),
    write: yn(Je(ce.write), _e.isRetriableError),
    writeFile: yn(Je(ce.writeFile), _e.isRetriableError),
    /* SYNC */
    closeSync: bn(ce.closeSync, _e.isRetriableError),
    fsyncSync: bn(ce.fsyncSync, _e.isRetriableError),
    openSync: bn(ce.openSync, _e.isRetriableError),
    readFileSync: bn(ce.readFileSync, _e.isRetriableError),
    renameSync: bn(ce.renameSync, _e.isRetriableError),
    statSync: bn(ce.statSync, _e.isRetriableError),
    writeSync: bn(ce.writeSync, _e.isRetriableError),
    writeFileSync: bn(ce.writeFileSync, _e.isRetriableError)
  }
}, AN = "utf8", am = 438, RN = 511, PN = {}, ON = Ls.userInfo().uid, NN = Ls.userInfo().gid, CN = 1e3, IN = !!De.getuid;
De.getuid && De.getuid();
const sm = 128, kN = (e) => e instanceof Error && "code" in e, om = (e) => typeof e == "string", bc = (e) => e === void 0, DN = De.platform === "linux", Vg = De.platform === "win32", hu = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
Vg || hu.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
DN && hu.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class jN {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const n of this.callbacks)
          n();
        t && (Vg && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? De.kill(De.pid, "SIGTERM") : De.kill(De.pid, t));
      }
    }, this.hook = () => {
      De.once("exit", () => this.exit());
      for (const t of hu)
        try {
          De.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const FN = new jN(), LN = FN.register, et = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, n = !0) => {
    const r = et.truncate(t(e));
    return r in et.store ? et.get(e, t, n) : (et.store[r] = n, [r, () => delete et.store[r]]);
  },
  purge: (e) => {
    et.store[e] && (delete et.store[e], Ze.attempt.unlink(e));
  },
  purgeSync: (e) => {
    et.store[e] && (delete et.store[e], Ze.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in et.store)
      et.purgeSync(e);
  },
  truncate: (e) => {
    const t = le.basename(e);
    if (t.length <= sm)
      return e;
    const n = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!n)
      return e;
    const r = t.length - sm;
    return `${e.slice(0, -t.length)}${n[1]}${n[2].slice(0, -r)}${n[3]}`;
  }
};
LN(et.purgeSyncAll);
function Gg(e, t, n = PN) {
  if (om(n))
    return Gg(e, t, { encoding: n });
  const r = Date.now() + ((n.timeout ?? CN) || -1);
  let i = null, a = null, s = null;
  try {
    const o = Ze.attempt.realpathSync(e), c = !!o;
    e = o || e, [a, i] = et.get(e, n.tmpCreate || et.create, n.tmpPurge !== !1);
    const l = IN && bc(n.chown), u = bc(n.mode);
    if (c && (l || u)) {
      const p = Ze.attempt.statSync(e);
      p && (n = { ...n }, l && (n.chown = { uid: p.uid, gid: p.gid }), u && (n.mode = p.mode));
    }
    if (!c) {
      const p = le.dirname(e);
      Ze.attempt.mkdirSync(p, {
        mode: RN,
        recursive: !0
      });
    }
    s = Ze.retry.openSync(r)(a, "w", n.mode || am), n.tmpCreated && n.tmpCreated(a), om(t) ? Ze.retry.writeSync(r)(s, t, 0, n.encoding || AN) : bc(t) || Ze.retry.writeSync(r)(s, t, 0, t.length, 0), n.fsync !== !1 && (n.fsyncWait !== !1 ? Ze.retry.fsyncSync(r)(s) : Ze.attempt.fsync(s)), Ze.retry.closeSync(r)(s), s = null, n.chown && (n.chown.uid !== ON || n.chown.gid !== NN) && Ze.attempt.chownSync(a, n.chown.uid, n.chown.gid), n.mode && n.mode !== am && Ze.attempt.chmodSync(a, n.mode);
    try {
      Ze.retry.renameSync(r)(a, e);
    } catch (p) {
      if (!kN(p) || p.code !== "ENAMETOOLONG")
        throw p;
      Ze.retry.renameSync(r)(a, et.truncate(e));
    }
    i(), a = null;
  } finally {
    s && Ze.attempt.closeSync(s), a && et.purge(a);
  }
}
var nl = { exports: {} }, vu = {}, At = {}, Yr = {}, Ta = {}, ie = {}, aa = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = n;
  class r extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((T, I) => `${T}${I}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((T, I) => (I instanceof n && (T[I.str] = (T[I.str] || 0) + 1), T), {});
    }
  }
  e._Code = r, e.nil = new r("");
  function i(g, ...w) {
    const T = [g[0]];
    let I = 0;
    for (; I < w.length; )
      o(T, w[I]), T.push(g[++I]);
    return new r(T);
  }
  e._ = i;
  const a = new r("+");
  function s(g, ...w) {
    const T = [f(g[0])];
    let I = 0;
    for (; I < w.length; )
      T.push(a), o(T, w[I]), T.push(a, f(g[++I]));
    return c(T), new r(T);
  }
  e.str = s;
  function o(g, w) {
    w instanceof r ? g.push(...w._items) : w instanceof n ? g.push(w) : g.push(p(w));
  }
  e.addCodeArg = o;
  function c(g) {
    let w = 1;
    for (; w < g.length - 1; ) {
      if (g[w] === a) {
        const T = l(g[w - 1], g[w + 1]);
        if (T !== void 0) {
          g.splice(w - 1, 3, T);
          continue;
        }
        g[w++] = "+";
      }
      w++;
    }
  }
  function l(g, w) {
    if (w === '""')
      return g;
    if (g === '""')
      return w;
    if (typeof g == "string")
      return w instanceof n || g[g.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${g.slice(0, -1)}${w}"` : w[0] === '"' ? g.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(g instanceof n))
      return `"${g}${w.slice(1)}`;
  }
  function u(g, w) {
    return w.emptyStr() ? g : g.emptyStr() ? w : s`${g}${w}`;
  }
  e.strConcat = u;
  function p(g) {
    return typeof g == "number" || typeof g == "boolean" || g === null ? g : f(Array.isArray(g) ? g.join(",") : g);
  }
  function d(g) {
    return new r(f(g));
  }
  e.stringify = d;
  function f(g) {
    return JSON.stringify(g).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = f;
  function h(g) {
    return typeof g == "string" && e.IDENTIFIER.test(g) ? new r(`.${g}`) : i`[${g}]`;
  }
  e.getProperty = h;
  function b(g) {
    if (typeof g == "string" && e.IDENTIFIER.test(g))
      return new r(`${g}`);
    throw new Error(`CodeGen: invalid export name: ${g}, use explicit $id name mapping`);
  }
  e.getEsmExportName = b;
  function v(g) {
    return new r(g.toString());
  }
  e.regexpCode = v;
})(aa);
var rl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = aa;
  class n extends Error {
    constructor(l) {
      super(`CodeGen: "code" for ${l} not defined`), this.value = l.value;
    }
  }
  var r;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(r || (e.UsedValueState = r = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: l, parent: u } = {}) {
      this._names = {}, this._prefixes = l, this._parent = u;
    }
    toName(l) {
      return l instanceof t.Name ? l : this.name(l);
    }
    name(l) {
      return new t.Name(this._newName(l));
    }
    _newName(l) {
      const u = this._names[l] || this._nameGroup(l);
      return `${l}${u.index++}`;
    }
    _nameGroup(l) {
      var u, p;
      if (!((p = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || p === void 0) && p.has(l) || this._prefixes && !this._prefixes.has(l))
        throw new Error(`CodeGen: prefix "${l}" is not allowed in this scope`);
      return this._names[l] = { prefix: l, index: 0 };
    }
  }
  e.Scope = i;
  class a extends t.Name {
    constructor(l, u) {
      super(u), this.prefix = l;
    }
    setValue(l, { property: u, itemIndex: p }) {
      this.value = l, this.scopePath = (0, t._)`.${new t.Name(u)}[${p}]`;
    }
  }
  e.ValueScopeName = a;
  const s = (0, t._)`\n`;
  class o extends i {
    constructor(l) {
      super(l), this._values = {}, this._scope = l.scope, this.opts = { ...l, _n: l.lines ? s : t.nil };
    }
    get() {
      return this._scope;
    }
    name(l) {
      return new a(l, this._newName(l));
    }
    value(l, u) {
      var p;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const d = this.toName(l), { prefix: f } = d, h = (p = u.key) !== null && p !== void 0 ? p : u.ref;
      let b = this._values[f];
      if (b) {
        const w = b.get(h);
        if (w)
          return w;
      } else
        b = this._values[f] = /* @__PURE__ */ new Map();
      b.set(h, d);
      const v = this._scope[f] || (this._scope[f] = []), g = v.length;
      return v[g] = u.ref, d.setValue(u, { property: f, itemIndex: g }), d;
    }
    getValue(l, u) {
      const p = this._values[l];
      if (p)
        return p.get(u);
    }
    scopeRefs(l, u = this._values) {
      return this._reduceValues(u, (p) => {
        if (p.scopePath === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return (0, t._)`${l}${p.scopePath}`;
      });
    }
    scopeCode(l = this._values, u, p) {
      return this._reduceValues(l, (d) => {
        if (d.value === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return d.value.code;
      }, u, p);
    }
    _reduceValues(l, u, p = {}, d) {
      let f = t.nil;
      for (const h in l) {
        const b = l[h];
        if (!b)
          continue;
        const v = p[h] = p[h] || /* @__PURE__ */ new Map();
        b.forEach((g) => {
          if (v.has(g))
            return;
          v.set(g, r.Started);
          let w = u(g);
          if (w) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            f = (0, t._)`${f}${T} ${g} = ${w};${this.opts._n}`;
          } else if (w = d == null ? void 0 : d(g))
            f = (0, t._)`${f}${w}${this.opts._n}`;
          else
            throw new n(g);
          v.set(g, r.Completed);
        });
      }
      return f;
    }
  }
  e.ValueScope = o;
})(rl);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = aa, n = rl;
  var r = aa;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return r.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return r.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return r.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } });
  var i = rl;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(x, $) {
      return this;
    }
  }
  class s extends a {
    constructor(x, $, q) {
      super(), this.varKind = x, this.name = $, this.rhs = q;
    }
    render({ es5: x, _n: $ }) {
      const q = x ? n.varKinds.var : this.varKind, y = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${q} ${this.name}${y};` + $;
    }
    optimizeNames(x, $) {
      if (x[this.name.str])
        return this.rhs && (this.rhs = D(this.rhs, x, $)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(x, $, q) {
      super(), this.lhs = x, this.rhs = $, this.sideEffects = q;
    }
    render({ _n: x }) {
      return `${this.lhs} = ${this.rhs};` + x;
    }
    optimizeNames(x, $) {
      if (!(this.lhs instanceof t.Name && !x[this.lhs.str] && !this.sideEffects))
        return this.rhs = D(this.rhs, x, $), this;
    }
    get names() {
      const x = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return J(x, this.rhs);
    }
  }
  class c extends o {
    constructor(x, $, q, y) {
      super(x, q, y), this.op = $;
    }
    render({ _n: x }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + x;
    }
  }
  class l extends a {
    constructor(x) {
      super(), this.label = x, this.names = {};
    }
    render({ _n: x }) {
      return `${this.label}:` + x;
    }
  }
  class u extends a {
    constructor(x) {
      super(), this.label = x, this.names = {};
    }
    render({ _n: x }) {
      return `break${this.label ? ` ${this.label}` : ""};` + x;
    }
  }
  class p extends a {
    constructor(x) {
      super(), this.error = x;
    }
    render({ _n: x }) {
      return `throw ${this.error};` + x;
    }
    get names() {
      return this.error.names;
    }
  }
  class d extends a {
    constructor(x) {
      super(), this.code = x;
    }
    render({ _n: x }) {
      return `${this.code};` + x;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(x, $) {
      return this.code = D(this.code, x, $), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class f extends a {
    constructor(x = []) {
      super(), this.nodes = x;
    }
    render(x) {
      return this.nodes.reduce(($, q) => $ + q.render(x), "");
    }
    optimizeNodes() {
      const { nodes: x } = this;
      let $ = x.length;
      for (; $--; ) {
        const q = x[$].optimizeNodes();
        Array.isArray(q) ? x.splice($, 1, ...q) : q ? x[$] = q : x.splice($, 1);
      }
      return x.length > 0 ? this : void 0;
    }
    optimizeNames(x, $) {
      const { nodes: q } = this;
      let y = q.length;
      for (; y--; ) {
        const m = q[y];
        m.optimizeNames(x, $) || (j(x, m.names), q.splice(y, 1));
      }
      return q.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((x, $) => K(x, $.names), {});
    }
  }
  class h extends f {
    render(x) {
      return "{" + x._n + super.render(x) + "}" + x._n;
    }
  }
  class b extends f {
  }
  class v extends h {
  }
  v.kind = "else";
  class g extends h {
    constructor(x, $) {
      super($), this.condition = x;
    }
    render(x) {
      let $ = `if(${this.condition})` + super.render(x);
      return this.else && ($ += "else " + this.else.render(x)), $;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const x = this.condition;
      if (x === !0)
        return this.nodes;
      let $ = this.else;
      if ($) {
        const q = $.optimizeNodes();
        $ = this.else = Array.isArray(q) ? new v(q) : q;
      }
      if ($)
        return x === !1 ? $ instanceof g ? $ : $.nodes : this.nodes.length ? this : new g(G(x), $ instanceof g ? [$] : $.nodes);
      if (!(x === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(x, $) {
      var q;
      if (this.else = (q = this.else) === null || q === void 0 ? void 0 : q.optimizeNames(x, $), !!(super.optimizeNames(x, $) || this.else))
        return this.condition = D(this.condition, x, $), this;
    }
    get names() {
      const x = super.names;
      return J(x, this.condition), this.else && K(x, this.else.names), x;
    }
  }
  g.kind = "if";
  class w extends h {
  }
  w.kind = "for";
  class T extends w {
    constructor(x) {
      super(), this.iteration = x;
    }
    render(x) {
      return `for(${this.iteration})` + super.render(x);
    }
    optimizeNames(x, $) {
      if (super.optimizeNames(x, $))
        return this.iteration = D(this.iteration, x, $), this;
    }
    get names() {
      return K(super.names, this.iteration.names);
    }
  }
  class I extends w {
    constructor(x, $, q, y) {
      super(), this.varKind = x, this.name = $, this.from = q, this.to = y;
    }
    render(x) {
      const $ = x.es5 ? n.varKinds.var : this.varKind, { name: q, from: y, to: m } = this;
      return `for(${$} ${q}=${y}; ${q}<${m}; ${q}++)` + super.render(x);
    }
    get names() {
      const x = J(super.names, this.from);
      return J(x, this.to);
    }
  }
  class F extends w {
    constructor(x, $, q, y) {
      super(), this.loop = x, this.varKind = $, this.name = q, this.iterable = y;
    }
    render(x) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(x);
    }
    optimizeNames(x, $) {
      if (super.optimizeNames(x, $))
        return this.iterable = D(this.iterable, x, $), this;
    }
    get names() {
      return K(super.names, this.iterable.names);
    }
  }
  class O extends h {
    constructor(x, $, q) {
      super(), this.name = x, this.args = $, this.async = q;
    }
    render(x) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(x);
    }
  }
  O.kind = "func";
  class U extends f {
    render(x) {
      return "return " + super.render(x);
    }
  }
  U.kind = "return";
  class V extends h {
    render(x) {
      let $ = "try" + super.render(x);
      return this.catch && ($ += this.catch.render(x)), this.finally && ($ += this.finally.render(x)), $;
    }
    optimizeNodes() {
      var x, $;
      return super.optimizeNodes(), (x = this.catch) === null || x === void 0 || x.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
    }
    optimizeNames(x, $) {
      var q, y;
      return super.optimizeNames(x, $), (q = this.catch) === null || q === void 0 || q.optimizeNames(x, $), (y = this.finally) === null || y === void 0 || y.optimizeNames(x, $), this;
    }
    get names() {
      const x = super.names;
      return this.catch && K(x, this.catch.names), this.finally && K(x, this.finally.names), x;
    }
  }
  class _ extends h {
    constructor(x) {
      super(), this.error = x;
    }
    render(x) {
      return `catch(${this.error})` + super.render(x);
    }
  }
  _.kind = "catch";
  class Y extends h {
    render(x) {
      return "finally" + super.render(x);
    }
  }
  Y.kind = "finally";
  class z {
    constructor(x, $ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = x, this._scope = new n.Scope({ parent: x }), this._nodes = [new b()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(x) {
      return this._scope.name(x);
    }
    // reserves unique name in the external scope
    scopeName(x) {
      return this._extScope.name(x);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(x, $) {
      const q = this._extScope.value(x, $);
      return (this._values[q.prefix] || (this._values[q.prefix] = /* @__PURE__ */ new Set())).add(q), q;
    }
    getScopeValue(x, $) {
      return this._extScope.getValue(x, $);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(x) {
      return this._extScope.scopeRefs(x, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(x, $, q, y) {
      const m = this._scope.toName($);
      return q !== void 0 && y && (this._constants[m.str] = q), this._leafNode(new s(x, m, q)), m;
    }
    // `const` declaration (`var` in es5 mode)
    const(x, $, q) {
      return this._def(n.varKinds.const, x, $, q);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(x, $, q) {
      return this._def(n.varKinds.let, x, $, q);
    }
    // `var` declaration with optional assignment
    var(x, $, q) {
      return this._def(n.varKinds.var, x, $, q);
    }
    // assignment code
    assign(x, $, q) {
      return this._leafNode(new o(x, $, q));
    }
    // `+=` code
    add(x, $) {
      return this._leafNode(new c(x, e.operators.ADD, $));
    }
    // appends passed SafeExpr to code or executes Block
    code(x) {
      return typeof x == "function" ? x() : x !== t.nil && this._leafNode(new d(x)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...x) {
      const $ = ["{"];
      for (const [q, y] of x)
        $.length > 1 && $.push(","), $.push(q), (q !== y || this.opts.es5) && ($.push(":"), (0, t.addCodeArg)($, y));
      return $.push("}"), new t._Code($);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(x, $, q) {
      if (this._blockNode(new g(x)), $ && q)
        this.code($).else().code(q).endIf();
      else if ($)
        this.code($).endIf();
      else if (q)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(x) {
      return this._elseNode(new g(x));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new v());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(g, v);
    }
    _for(x, $) {
      return this._blockNode(x), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(x, $) {
      return this._for(new T(x), $);
    }
    // `for` statement for a range of values
    forRange(x, $, q, y, m = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const L = this._scope.toName(x);
      return this._for(new I(m, L, $, q), () => y(L));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(x, $, q, y = n.varKinds.const) {
      const m = this._scope.toName(x);
      if (this.opts.es5) {
        const L = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${L}.length`, (A) => {
          this.var(m, (0, t._)`${L}[${A}]`), q(m);
        });
      }
      return this._for(new F("of", y, m, $), () => q(m));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(x, $, q, y = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(x, (0, t._)`Object.keys(${$})`, q);
      const m = this._scope.toName(x);
      return this._for(new F("in", y, m, $), () => q(m));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(x) {
      return this._leafNode(new l(x));
    }
    // `break` statement
    break(x) {
      return this._leafNode(new u(x));
    }
    // `return` statement
    return(x) {
      const $ = new U();
      if (this._blockNode($), this.code(x), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(U);
    }
    // `try` statement
    try(x, $, q) {
      if (!$ && !q)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const y = new V();
      if (this._blockNode(y), this.code(x), $) {
        const m = this.name("e");
        this._currNode = y.catch = new _(m), $(m);
      }
      return q && (this._currNode = y.finally = new Y(), this.code(q)), this._endBlockNode(_, Y);
    }
    // `throw` statement
    throw(x) {
      return this._leafNode(new p(x));
    }
    // start self-balancing block
    block(x, $) {
      return this._blockStarts.push(this._nodes.length), x && this.code(x).endBlock($), this;
    }
    // end the current self-balancing block
    endBlock(x) {
      const $ = this._blockStarts.pop();
      if ($ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const q = this._nodes.length - $;
      if (q < 0 || x !== void 0 && q !== x)
        throw new Error(`CodeGen: wrong number of nodes: ${q} vs ${x} expected`);
      return this._nodes.length = $, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(x, $ = t.nil, q, y) {
      return this._blockNode(new O(x, $, q)), y && this.code(y).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(O);
    }
    optimize(x = 1) {
      for (; x-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(x) {
      return this._currNode.nodes.push(x), this;
    }
    _blockNode(x) {
      this._currNode.nodes.push(x), this._nodes.push(x);
    }
    _endBlockNode(x, $) {
      const q = this._currNode;
      if (q instanceof x || $ && q instanceof $)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${$ ? `${x.kind}/${$.kind}` : x.kind}"`);
    }
    _elseNode(x) {
      const $ = this._currNode;
      if (!($ instanceof g))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = $.else = x, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const x = this._nodes;
      return x[x.length - 1];
    }
    set _currNode(x) {
      const $ = this._nodes;
      $[$.length - 1] = x;
    }
  }
  e.CodeGen = z;
  function K(R, x) {
    for (const $ in x)
      R[$] = (R[$] || 0) + (x[$] || 0);
    return R;
  }
  function J(R, x) {
    return x instanceof t._CodeOrName ? K(R, x.names) : R;
  }
  function D(R, x, $) {
    if (R instanceof t.Name)
      return q(R);
    if (!y(R))
      return R;
    return new t._Code(R._items.reduce((m, L) => (L instanceof t.Name && (L = q(L)), L instanceof t._Code ? m.push(...L._items) : m.push(L), m), []));
    function q(m) {
      const L = $[m.str];
      return L === void 0 || x[m.str] !== 1 ? m : (delete x[m.str], L);
    }
    function y(m) {
      return m instanceof t._Code && m._items.some((L) => L instanceof t.Name && x[L.str] === 1 && $[L.str] !== void 0);
    }
  }
  function j(R, x) {
    for (const $ in x)
      R[$] = (R[$] || 0) - (x[$] || 0);
  }
  function G(R) {
    return typeof R == "boolean" || typeof R == "number" || R === null ? !R : (0, t._)`!${k(R)}`;
  }
  e.not = G;
  const N = S(e.operators.AND);
  function B(...R) {
    return R.reduce(N);
  }
  e.and = B;
  const H = S(e.operators.OR);
  function M(...R) {
    return R.reduce(H);
  }
  e.or = M;
  function S(R) {
    return (x, $) => x === t.nil ? $ : $ === t.nil ? x : (0, t._)`${k(x)} ${R} ${k($)}`;
  }
  function k(R) {
    return R instanceof t.Name ? R : (0, t._)`(${R})`;
  }
})(ie);
var X = {};
Object.defineProperty(X, "__esModule", { value: !0 });
X.checkStrictMode = X.getErrorPath = X.Type = X.useFunc = X.setEvaluated = X.evaluatedPropsToName = X.mergeEvaluated = X.eachItem = X.unescapeJsonPointer = X.escapeJsonPointer = X.escapeFragment = X.unescapeFragment = X.schemaRefOrVal = X.schemaHasRulesButRef = X.schemaHasRules = X.checkUnknownRules = X.alwaysValidSchema = X.toHash = void 0;
const ve = ie, UN = aa;
function MN(e) {
  const t = {};
  for (const n of e)
    t[n] = !0;
  return t;
}
X.toHash = MN;
function qN(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Wg(e, t), !Kg(t, e.self.RULES.all));
}
X.alwaysValidSchema = qN;
function Wg(e, t = e.schema) {
  const { opts: n, self: r } = e;
  if (!n.strictSchema || typeof t == "boolean")
    return;
  const i = r.RULES.keywords;
  for (const a in t)
    i[a] || Jg(e, `unknown keyword: "${a}"`);
}
X.checkUnknownRules = Wg;
function Kg(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t[n])
      return !0;
  return !1;
}
X.schemaHasRules = Kg;
function BN(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (n !== "$ref" && t.all[n])
      return !0;
  return !1;
}
X.schemaHasRulesButRef = BN;
function zN({ topSchemaRef: e, schemaPath: t }, n, r, i) {
  if (!i) {
    if (typeof n == "number" || typeof n == "boolean")
      return n;
    if (typeof n == "string")
      return (0, ve._)`${n}`;
  }
  return (0, ve._)`${e}${t}${(0, ve.getProperty)(r)}`;
}
X.schemaRefOrVal = zN;
function HN(e) {
  return Yg(decodeURIComponent(e));
}
X.unescapeFragment = HN;
function VN(e) {
  return encodeURIComponent(gu(e));
}
X.escapeFragment = VN;
function gu(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
X.escapeJsonPointer = gu;
function Yg(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
X.unescapeJsonPointer = Yg;
function GN(e, t) {
  if (Array.isArray(e))
    for (const n of e)
      t(n);
  else
    t(e);
}
X.eachItem = GN;
function cm({ mergeNames: e, mergeToName: t, mergeValues: n, resultToName: r }) {
  return (i, a, s, o) => {
    const c = s === void 0 ? a : s instanceof ve.Name ? (a instanceof ve.Name ? e(i, a, s) : t(i, a, s), s) : a instanceof ve.Name ? (t(i, s, a), a) : n(a, s);
    return o === ve.Name && !(c instanceof ve.Name) ? r(i, c) : c;
  };
}
X.mergeEvaluated = {
  props: cm({
    mergeNames: (e, t, n) => e.if((0, ve._)`${n} !== true && ${t} !== undefined`, () => {
      e.if((0, ve._)`${t} === true`, () => e.assign(n, !0), () => e.assign(n, (0, ve._)`${n} || {}`).code((0, ve._)`Object.assign(${n}, ${t})`));
    }),
    mergeToName: (e, t, n) => e.if((0, ve._)`${n} !== true`, () => {
      t === !0 ? e.assign(n, !0) : (e.assign(n, (0, ve._)`${n} || {}`), yu(e, n, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Xg
  }),
  items: cm({
    mergeNames: (e, t, n) => e.if((0, ve._)`${n} !== true && ${t} !== undefined`, () => e.assign(n, (0, ve._)`${t} === true ? true : ${n} > ${t} ? ${n} : ${t}`)),
    mergeToName: (e, t, n) => e.if((0, ve._)`${n} !== true`, () => e.assign(n, t === !0 ? !0 : (0, ve._)`${n} > ${t} ? ${n} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Xg(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const n = e.var("props", (0, ve._)`{}`);
  return t !== void 0 && yu(e, n, t), n;
}
X.evaluatedPropsToName = Xg;
function yu(e, t, n) {
  Object.keys(n).forEach((r) => e.assign((0, ve._)`${t}${(0, ve.getProperty)(r)}`, !0));
}
X.setEvaluated = yu;
const lm = {};
function WN(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: lm[t.code] || (lm[t.code] = new UN._Code(t.code))
  });
}
X.useFunc = WN;
var il;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(il || (X.Type = il = {}));
function KN(e, t, n) {
  if (e instanceof ve.Name) {
    const r = t === il.Num;
    return n ? r ? (0, ve._)`"[" + ${e} + "]"` : (0, ve._)`"['" + ${e} + "']"` : r ? (0, ve._)`"/" + ${e}` : (0, ve._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return n ? (0, ve.getProperty)(e).toString() : "/" + gu(e);
}
X.getErrorPath = KN;
function Jg(e, t, n = e.opts.strictSchema) {
  if (n) {
    if (t = `strict mode: ${t}`, n === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
X.checkStrictMode = Jg;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
const Qe = ie, YN = {
  // validation function arguments
  data: new Qe.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Qe.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Qe.Name("instancePath"),
  parentData: new Qe.Name("parentData"),
  parentDataProperty: new Qe.Name("parentDataProperty"),
  rootData: new Qe.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Qe.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Qe.Name("vErrors"),
  // null or array of validation errors
  errors: new Qe.Name("errors"),
  // counter of validation errors
  this: new Qe.Name("this"),
  // "globals"
  self: new Qe.Name("self"),
  scope: new Qe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Qe.Name("json"),
  jsonPos: new Qe.Name("jsonPos"),
  jsonLen: new Qe.Name("jsonLen"),
  jsonPart: new Qe.Name("jsonPart")
};
wt.default = YN;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ie, n = X, r = wt;
  e.keywordError = {
    message: ({ keyword: v }) => (0, t.str)`must pass "${v}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: v, schemaType: g }) => g ? (0, t.str)`"${v}" keyword must be ${g} ($data)` : (0, t.str)`"${v}" keyword is invalid ($data)`
  };
  function i(v, g = e.keywordError, w, T) {
    const { it: I } = v, { gen: F, compositeRule: O, allErrors: U } = I, V = p(v, g, w);
    T ?? (O || U) ? c(F, V) : l(I, (0, t._)`[${V}]`);
  }
  e.reportError = i;
  function a(v, g = e.keywordError, w) {
    const { it: T } = v, { gen: I, compositeRule: F, allErrors: O } = T, U = p(v, g, w);
    c(I, U), F || O || l(T, r.default.vErrors);
  }
  e.reportExtraError = a;
  function s(v, g) {
    v.assign(r.default.errors, g), v.if((0, t._)`${r.default.vErrors} !== null`, () => v.if(g, () => v.assign((0, t._)`${r.default.vErrors}.length`, g), () => v.assign(r.default.vErrors, null)));
  }
  e.resetErrorsCount = s;
  function o({ gen: v, keyword: g, schemaValue: w, data: T, errsCount: I, it: F }) {
    if (I === void 0)
      throw new Error("ajv implementation error");
    const O = v.name("err");
    v.forRange("i", I, r.default.errors, (U) => {
      v.const(O, (0, t._)`${r.default.vErrors}[${U}]`), v.if((0, t._)`${O}.instancePath === undefined`, () => v.assign((0, t._)`${O}.instancePath`, (0, t.strConcat)(r.default.instancePath, F.errorPath))), v.assign((0, t._)`${O}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${g}`), F.opts.verbose && (v.assign((0, t._)`${O}.schema`, w), v.assign((0, t._)`${O}.data`, T));
    });
  }
  e.extendErrors = o;
  function c(v, g) {
    const w = v.const("err", g);
    v.if((0, t._)`${r.default.vErrors} === null`, () => v.assign(r.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${r.default.vErrors}.push(${w})`), v.code((0, t._)`${r.default.errors}++`);
  }
  function l(v, g) {
    const { gen: w, validateName: T, schemaEnv: I } = v;
    I.$async ? w.throw((0, t._)`new ${v.ValidationError}(${g})`) : (w.assign((0, t._)`${T}.errors`, g), w.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function p(v, g, w) {
    const { createErrors: T } = v.it;
    return T === !1 ? (0, t._)`{}` : d(v, g, w);
  }
  function d(v, g, w = {}) {
    const { gen: T, it: I } = v, F = [
      f(I, w),
      h(v, w)
    ];
    return b(v, g, F), T.object(...F);
  }
  function f({ errorPath: v }, { instancePath: g }) {
    const w = g ? (0, t.str)`${v}${(0, n.getErrorPath)(g, n.Type.Str)}` : v;
    return [r.default.instancePath, (0, t.strConcat)(r.default.instancePath, w)];
  }
  function h({ keyword: v, it: { errSchemaPath: g } }, { schemaPath: w, parentSchema: T }) {
    let I = T ? g : (0, t.str)`${g}/${v}`;
    return w && (I = (0, t.str)`${I}${(0, n.getErrorPath)(w, n.Type.Str)}`), [u.schemaPath, I];
  }
  function b(v, { params: g, message: w }, T) {
    const { keyword: I, data: F, schemaValue: O, it: U } = v, { opts: V, propertyName: _, topSchemaRef: Y, schemaPath: z } = U;
    T.push([u.keyword, I], [u.params, typeof g == "function" ? g(v) : g || (0, t._)`{}`]), V.messages && T.push([u.message, typeof w == "function" ? w(v) : w]), V.verbose && T.push([u.schema, O], [u.parentSchema, (0, t._)`${Y}${z}`], [r.default.data, F]), _ && T.push([u.propertyName, _]);
  }
})(Ta);
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.boolOrEmptySchema = Yr.topBoolOrEmptySchema = void 0;
const XN = Ta, JN = ie, QN = wt, ZN = {
  message: "boolean schema is false"
};
function eC(e) {
  const { gen: t, schema: n, validateName: r } = e;
  n === !1 ? Qg(e, !1) : typeof n == "object" && n.$async === !0 ? t.return(QN.default.data) : (t.assign((0, JN._)`${r}.errors`, null), t.return(!0));
}
Yr.topBoolOrEmptySchema = eC;
function tC(e, t) {
  const { gen: n, schema: r } = e;
  r === !1 ? (n.var(t, !1), Qg(e)) : n.var(t, !0);
}
Yr.boolOrEmptySchema = tC;
function Qg(e, t) {
  const { gen: n, data: r } = e, i = {
    gen: n,
    keyword: "false schema",
    data: r,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, XN.reportError)(i, ZN, void 0, t);
}
var ke = {}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.getRules = pr.isJSONType = void 0;
const nC = ["string", "number", "integer", "boolean", "null", "object", "array"], rC = new Set(nC);
function iC(e) {
  return typeof e == "string" && rC.has(e);
}
pr.isJSONType = iC;
function aC() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
pr.getRules = aC;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.shouldUseRule = tn.shouldUseGroup = tn.schemaHasRulesForType = void 0;
function sC({ schema: e, self: t }, n) {
  const r = t.RULES.types[n];
  return r && r !== !0 && Zg(e, r);
}
tn.schemaHasRulesForType = sC;
function Zg(e, t) {
  return t.rules.some((n) => ey(e, n));
}
tn.shouldUseGroup = Zg;
function ey(e, t) {
  var n;
  return e[t.keyword] !== void 0 || ((n = t.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => e[r] !== void 0));
}
tn.shouldUseRule = ey;
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.reportTypeError = ke.checkDataTypes = ke.checkDataType = ke.coerceAndCheckDataType = ke.getJSONTypes = ke.getSchemaTypes = ke.DataType = void 0;
const oC = pr, cC = tn, lC = Ta, se = ie, ty = X;
var Br;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Br || (ke.DataType = Br = {}));
function uC(e) {
  const t = ny(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
ke.getSchemaTypes = uC;
function ny(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(oC.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ke.getJSONTypes = ny;
function pC(e, t) {
  const { gen: n, data: r, opts: i } = e, a = dC(t, i.coerceTypes), s = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, cC.schemaHasRulesForType)(e, t[0]));
  if (s) {
    const o = bu(t, r, i.strictNumbers, Br.Wrong);
    n.if(o, () => {
      a.length ? fC(e, t, a) : xu(e);
    });
  }
  return s;
}
ke.coerceAndCheckDataType = pC;
const ry = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function dC(e, t) {
  return t ? e.filter((n) => ry.has(n) || t === "array" && n === "array") : [];
}
function fC(e, t, n) {
  const { gen: r, data: i, opts: a } = e, s = r.let("dataType", (0, se._)`typeof ${i}`), o = r.let("coerced", (0, se._)`undefined`);
  a.coerceTypes === "array" && r.if((0, se._)`${s} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => r.assign(i, (0, se._)`${i}[0]`).assign(s, (0, se._)`typeof ${i}`).if(bu(t, i, a.strictNumbers), () => r.assign(o, i))), r.if((0, se._)`${o} !== undefined`);
  for (const l of n)
    (ry.has(l) || l === "array" && a.coerceTypes === "array") && c(l);
  r.else(), xu(e), r.endIf(), r.if((0, se._)`${o} !== undefined`, () => {
    r.assign(i, o), mC(e, o);
  });
  function c(l) {
    switch (l) {
      case "string":
        r.elseIf((0, se._)`${s} == "number" || ${s} == "boolean"`).assign(o, (0, se._)`"" + ${i}`).elseIf((0, se._)`${i} === null`).assign(o, (0, se._)`""`);
        return;
      case "number":
        r.elseIf((0, se._)`${s} == "boolean" || ${i} === null
              || (${s} == "string" && ${i} && ${i} == +${i})`).assign(o, (0, se._)`+${i}`);
        return;
      case "integer":
        r.elseIf((0, se._)`${s} === "boolean" || ${i} === null
              || (${s} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(o, (0, se._)`+${i}`);
        return;
      case "boolean":
        r.elseIf((0, se._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(o, !1).elseIf((0, se._)`${i} === "true" || ${i} === 1`).assign(o, !0);
        return;
      case "null":
        r.elseIf((0, se._)`${i} === "" || ${i} === 0 || ${i} === false`), r.assign(o, null);
        return;
      case "array":
        r.elseIf((0, se._)`${s} === "string" || ${s} === "number"
              || ${s} === "boolean" || ${i} === null`).assign(o, (0, se._)`[${i}]`);
    }
  }
}
function mC({ gen: e, parentData: t, parentDataProperty: n }, r) {
  e.if((0, se._)`${t} !== undefined`, () => e.assign((0, se._)`${t}[${n}]`, r));
}
function al(e, t, n, r = Br.Correct) {
  const i = r === Br.Correct ? se.operators.EQ : se.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, se._)`${t} ${i} null`;
    case "array":
      a = (0, se._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, se._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = s((0, se._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = s();
      break;
    default:
      return (0, se._)`typeof ${t} ${i} ${e}`;
  }
  return r === Br.Correct ? a : (0, se.not)(a);
  function s(o = se.nil) {
    return (0, se.and)((0, se._)`typeof ${t} == "number"`, o, n ? (0, se._)`isFinite(${t})` : se.nil);
  }
}
ke.checkDataType = al;
function bu(e, t, n, r) {
  if (e.length === 1)
    return al(e[0], t, n, r);
  let i;
  const a = (0, ty.toHash)(e);
  if (a.array && a.object) {
    const s = (0, se._)`typeof ${t} != "object"`;
    i = a.null ? s : (0, se._)`!${t} || ${s}`, delete a.null, delete a.array, delete a.object;
  } else
    i = se.nil;
  a.number && delete a.integer;
  for (const s in a)
    i = (0, se.and)(i, al(s, t, n, r));
  return i;
}
ke.checkDataTypes = bu;
const hC = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, se._)`{type: ${e}}` : (0, se._)`{type: ${t}}`
};
function xu(e) {
  const t = vC(e);
  (0, lC.reportError)(t, hC);
}
ke.reportTypeError = xu;
function vC(e) {
  const { gen: t, data: n, schema: r } = e, i = (0, ty.schemaRefOrVal)(e, r, "type");
  return {
    gen: t,
    keyword: "type",
    data: n,
    schema: r.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: r,
    params: {},
    it: e
  };
}
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
go.assignDefaults = void 0;
const Ar = ie, gC = X;
function yC(e, t) {
  const { properties: n, items: r } = e.schema;
  if (t === "object" && n)
    for (const i in n)
      um(e, i, n[i].default);
  else t === "array" && Array.isArray(r) && r.forEach((i, a) => um(e, a, i.default));
}
go.assignDefaults = yC;
function um(e, t, n) {
  const { gen: r, compositeRule: i, data: a, opts: s } = e;
  if (n === void 0)
    return;
  const o = (0, Ar._)`${a}${(0, Ar.getProperty)(t)}`;
  if (i) {
    (0, gC.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let c = (0, Ar._)`${o} === undefined`;
  s.useDefaults === "empty" && (c = (0, Ar._)`${c} || ${o} === null || ${o} === ""`), r.if(c, (0, Ar._)`${o} = ${(0, Ar.stringify)(n)}`);
}
var Bt = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.validateUnion = ue.validateArray = ue.usePattern = ue.callValidateCode = ue.schemaProperties = ue.allSchemaProperties = ue.noPropertyInData = ue.propertyInData = ue.isOwnProperty = ue.hasPropFunc = ue.reportMissingProp = ue.checkMissingProp = ue.checkReportMissingProp = void 0;
const xe = ie, wu = X, xn = wt, bC = X;
function xC(e, t) {
  const { gen: n, data: r, it: i } = e;
  n.if(Eu(n, r, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, xe._)`${t}` }, !0), e.error();
  });
}
ue.checkReportMissingProp = xC;
function wC({ gen: e, data: t, it: { opts: n } }, r, i) {
  return (0, xe.or)(...r.map((a) => (0, xe.and)(Eu(e, t, a, n.ownProperties), (0, xe._)`${i} = ${a}`)));
}
ue.checkMissingProp = wC;
function _C(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ue.reportMissingProp = _C;
function iy(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, xe._)`Object.prototype.hasOwnProperty`
  });
}
ue.hasPropFunc = iy;
function _u(e, t, n) {
  return (0, xe._)`${iy(e)}.call(${t}, ${n})`;
}
ue.isOwnProperty = _u;
function EC(e, t, n, r) {
  const i = (0, xe._)`${t}${(0, xe.getProperty)(n)} !== undefined`;
  return r ? (0, xe._)`${i} && ${_u(e, t, n)}` : i;
}
ue.propertyInData = EC;
function Eu(e, t, n, r) {
  const i = (0, xe._)`${t}${(0, xe.getProperty)(n)} === undefined`;
  return r ? (0, xe.or)(i, (0, xe.not)(_u(e, t, n))) : i;
}
ue.noPropertyInData = Eu;
function ay(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ue.allSchemaProperties = ay;
function $C(e, t) {
  return ay(t).filter((n) => !(0, wu.alwaysValidSchema)(e, t[n]));
}
ue.schemaProperties = $C;
function SC({ schemaCode: e, data: t, it: { gen: n, topSchemaRef: r, schemaPath: i, errorPath: a }, it: s }, o, c, l) {
  const u = l ? (0, xe._)`${e}, ${t}, ${r}${i}` : t, p = [
    [xn.default.instancePath, (0, xe.strConcat)(xn.default.instancePath, a)],
    [xn.default.parentData, s.parentData],
    [xn.default.parentDataProperty, s.parentDataProperty],
    [xn.default.rootData, xn.default.rootData]
  ];
  s.opts.dynamicRef && p.push([xn.default.dynamicAnchors, xn.default.dynamicAnchors]);
  const d = (0, xe._)`${u}, ${n.object(...p)}`;
  return c !== xe.nil ? (0, xe._)`${o}.call(${c}, ${d})` : (0, xe._)`${o}(${d})`;
}
ue.callValidateCode = SC;
const TC = (0, xe._)`new RegExp`;
function AC({ gen: e, it: { opts: t } }, n) {
  const r = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, a = i(n, r);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, xe._)`${i.code === "new RegExp" ? TC : (0, bC.useFunc)(e, i)}(${n}, ${r})`
  });
}
ue.usePattern = AC;
function RC(e) {
  const { gen: t, data: n, keyword: r, it: i } = e, a = t.name("valid");
  if (i.allErrors) {
    const o = t.let("valid", !0);
    return s(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), s(() => t.break()), a;
  function s(o) {
    const c = t.const("len", (0, xe._)`${n}.length`);
    t.forRange("i", 0, c, (l) => {
      e.subschema({
        keyword: r,
        dataProp: l,
        dataPropType: wu.Type.Num
      }, a), t.if((0, xe.not)(a), o);
    });
  }
}
ue.validateArray = RC;
function PC(e) {
  const { gen: t, schema: n, keyword: r, it: i } = e;
  if (!Array.isArray(n))
    throw new Error("ajv implementation error");
  if (n.some((c) => (0, wu.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const s = t.let("valid", !1), o = t.name("_valid");
  t.block(() => n.forEach((c, l) => {
    const u = e.subschema({
      keyword: r,
      schemaProp: l,
      compositeRule: !0
    }, o);
    t.assign(s, (0, xe._)`${s} || ${o}`), e.mergeValidEvaluated(u, o) || t.if((0, xe.not)(s));
  })), e.result(s, () => e.reset(), () => e.error(!0));
}
ue.validateUnion = PC;
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.validateKeywordUsage = Bt.validSchemaType = Bt.funcKeywordCode = Bt.macroKeywordCode = void 0;
const at = ie, Jn = wt, OC = ue, NC = Ta;
function CC(e, t) {
  const { gen: n, keyword: r, schema: i, parentSchema: a, it: s } = e, o = t.macro.call(s.self, i, a, s), c = sy(n, r, o);
  s.opts.validateSchema !== !1 && s.self.validateSchema(o, !0);
  const l = n.name("valid");
  e.subschema({
    schema: o,
    schemaPath: at.nil,
    errSchemaPath: `${s.errSchemaPath}/${r}`,
    topSchemaRef: c,
    compositeRule: !0
  }, l), e.pass(l, () => e.error(!0));
}
Bt.macroKeywordCode = CC;
function IC(e, t) {
  var n;
  const { gen: r, keyword: i, schema: a, parentSchema: s, $data: o, it: c } = e;
  DC(c, t);
  const l = !o && t.compile ? t.compile.call(c.self, a, s, c) : t.validate, u = sy(r, i, l), p = r.let("valid");
  e.block$data(p, d), e.ok((n = t.valid) !== null && n !== void 0 ? n : p);
  function d() {
    if (t.errors === !1)
      b(), t.modifying && pm(e), v(() => e.error());
    else {
      const g = t.async ? f() : h();
      t.modifying && pm(e), v(() => kC(e, g));
    }
  }
  function f() {
    const g = r.let("ruleErrs", null);
    return r.try(() => b((0, at._)`await `), (w) => r.assign(p, !1).if((0, at._)`${w} instanceof ${c.ValidationError}`, () => r.assign(g, (0, at._)`${w}.errors`), () => r.throw(w))), g;
  }
  function h() {
    const g = (0, at._)`${u}.errors`;
    return r.assign(g, null), b(at.nil), g;
  }
  function b(g = t.async ? (0, at._)`await ` : at.nil) {
    const w = c.opts.passContext ? Jn.default.this : Jn.default.self, T = !("compile" in t && !o || t.schema === !1);
    r.assign(p, (0, at._)`${g}${(0, OC.callValidateCode)(e, u, w, T)}`, t.modifying);
  }
  function v(g) {
    var w;
    r.if((0, at.not)((w = t.valid) !== null && w !== void 0 ? w : p), g);
  }
}
Bt.funcKeywordCode = IC;
function pm(e) {
  const { gen: t, data: n, it: r } = e;
  t.if(r.parentData, () => t.assign(n, (0, at._)`${r.parentData}[${r.parentDataProperty}]`));
}
function kC(e, t) {
  const { gen: n } = e;
  n.if((0, at._)`Array.isArray(${t})`, () => {
    n.assign(Jn.default.vErrors, (0, at._)`${Jn.default.vErrors} === null ? ${t} : ${Jn.default.vErrors}.concat(${t})`).assign(Jn.default.errors, (0, at._)`${Jn.default.vErrors}.length`), (0, NC.extendErrors)(e);
  }, () => e.error());
}
function DC({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function sy(e, t, n) {
  if (n === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: (0, at.stringify)(n) });
}
function jC(e, t, n = !1) {
  return !t.length || t.some((r) => r === "array" ? Array.isArray(e) : r === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == r || n && typeof e > "u");
}
Bt.validSchemaType = jC;
function FC({ schema: e, opts: t, self: n, errSchemaPath: r }, i, a) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(a) : i.keyword !== a)
    throw new Error("ajv implementation error");
  const s = i.dependencies;
  if (s != null && s.some((o) => !Object.prototype.hasOwnProperty.call(e, o)))
    throw new Error(`parent schema must have dependencies of ${a}: ${s.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${r}": ` + n.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      n.logger.error(c);
    else
      throw new Error(c);
  }
}
Bt.validateKeywordUsage = FC;
var Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.extendSubschemaMode = Cn.extendSubschemaData = Cn.getSubschema = void 0;
const qt = ie, oy = X;
function LC(e, { keyword: t, schemaProp: n, schema: r, schemaPath: i, errSchemaPath: a, topSchemaRef: s }) {
  if (t !== void 0 && r !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return n === void 0 ? {
      schema: o,
      schemaPath: (0, qt._)`${e.schemaPath}${(0, qt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[n],
      schemaPath: (0, qt._)`${e.schemaPath}${(0, qt.getProperty)(t)}${(0, qt.getProperty)(n)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, oy.escapeFragment)(n)}`
    };
  }
  if (r !== void 0) {
    if (i === void 0 || a === void 0 || s === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: r,
      schemaPath: i,
      topSchemaRef: s,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Cn.getSubschema = LC;
function UC(e, t, { dataProp: n, dataPropType: r, data: i, dataTypes: a, propertyName: s }) {
  if (i !== void 0 && n !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (n !== void 0) {
    const { errorPath: l, dataPathArr: u, opts: p } = t, d = o.let("data", (0, qt._)`${t.data}${(0, qt.getProperty)(n)}`, !0);
    c(d), e.errorPath = (0, qt.str)`${l}${(0, oy.getErrorPath)(n, r, p.jsPropertySyntax)}`, e.parentDataProperty = (0, qt._)`${n}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (i !== void 0) {
    const l = i instanceof qt.Name ? i : o.let("data", i, !0);
    c(l), s !== void 0 && (e.propertyName = s);
  }
  a && (e.dataTypes = a);
  function c(l) {
    e.data = l, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, l];
  }
}
Cn.extendSubschemaData = UC;
function MC(e, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: r, createErrors: i, allErrors: a }) {
  r !== void 0 && (e.compositeRule = r), i !== void 0 && (e.createErrors = i), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = n;
}
Cn.extendSubschemaMode = MC;
var Ge = {}, cy = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var r, i, a;
    if (Array.isArray(t)) {
      if (r = t.length, r != n.length) return !1;
      for (i = r; i-- !== 0; )
        if (!e(t[i], n[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
    if (a = Object.keys(t), r = a.length, r !== Object.keys(n).length) return !1;
    for (i = r; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, a[i])) return !1;
    for (i = r; i-- !== 0; ) {
      var s = a[i];
      if (!e(t[s], n[s])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
}, ly = { exports: {} }, On = ly.exports = function(e, t, n) {
  typeof t == "function" && (n = t, t = {}), n = t.cb || n;
  var r = typeof n == "function" ? n : n.pre || function() {
  }, i = n.post || function() {
  };
  os(t, r, i, e, "", e);
};
On.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
On.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
On.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
On.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function os(e, t, n, r, i, a, s, o, c, l) {
  if (r && typeof r == "object" && !Array.isArray(r)) {
    t(r, i, a, s, o, c, l);
    for (var u in r) {
      var p = r[u];
      if (Array.isArray(p)) {
        if (u in On.arrayKeywords)
          for (var d = 0; d < p.length; d++)
            os(e, t, n, p[d], i + "/" + u + "/" + d, a, i, u, r, d);
      } else if (u in On.propsKeywords) {
        if (p && typeof p == "object")
          for (var f in p)
            os(e, t, n, p[f], i + "/" + u + "/" + qC(f), a, i, u, r, f);
      } else (u in On.keywords || e.allKeys && !(u in On.skipKeywords)) && os(e, t, n, p, i + "/" + u, a, i, u, r);
    }
    n(r, i, a, s, o, c, l);
  }
}
function qC(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var BC = ly.exports;
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.getSchemaRefs = Ge.resolveUrl = Ge.normalizeId = Ge._getFullPath = Ge.getFullPath = Ge.inlineRef = void 0;
const zC = X, HC = cy, VC = BC, GC = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function WC(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !sl(e) : t ? uy(e) <= t : !1;
}
Ge.inlineRef = WC;
const KC = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function sl(e) {
  for (const t in e) {
    if (KC.has(t))
      return !0;
    const n = e[t];
    if (Array.isArray(n) && n.some(sl) || typeof n == "object" && sl(n))
      return !0;
  }
  return !1;
}
function uy(e) {
  let t = 0;
  for (const n in e) {
    if (n === "$ref")
      return 1 / 0;
    if (t++, !GC.has(n) && (typeof e[n] == "object" && (0, zC.eachItem)(e[n], (r) => t += uy(r)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function py(e, t = "", n) {
  n !== !1 && (t = zr(t));
  const r = e.parse(t);
  return dy(e, r);
}
Ge.getFullPath = py;
function dy(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ge._getFullPath = dy;
const YC = /#\/?$/;
function zr(e) {
  return e ? e.replace(YC, "") : "";
}
Ge.normalizeId = zr;
function XC(e, t, n) {
  return n = zr(n), e.resolve(t, n);
}
Ge.resolveUrl = XC;
const JC = /^[a-z_][-a-z0-9._]*$/i;
function QC(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: n, uriResolver: r } = this.opts, i = zr(e[n] || t), a = { "": i }, s = py(r, i, !1), o = {}, c = /* @__PURE__ */ new Set();
  return VC(e, { allKeys: !0 }, (p, d, f, h) => {
    if (h === void 0)
      return;
    const b = s + d;
    let v = a[h];
    typeof p[n] == "string" && (v = g.call(this, p[n])), w.call(this, p.$anchor), w.call(this, p.$dynamicAnchor), a[d] = v;
    function g(T) {
      const I = this.opts.uriResolver.resolve;
      if (T = zr(v ? I(v, T) : T), c.has(T))
        throw u(T);
      c.add(T);
      let F = this.refs[T];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? l(p, F.schema, T) : T !== zr(b) && (T[0] === "#" ? (l(p, o[T], T), o[T] = p) : this.refs[T] = b), T;
    }
    function w(T) {
      if (typeof T == "string") {
        if (!JC.test(T))
          throw new Error(`invalid anchor "${T}"`);
        g.call(this, `#${T}`);
      }
    }
  }), o;
  function l(p, d, f) {
    if (d !== void 0 && !HC(p, d))
      throw u(f);
  }
  function u(p) {
    return new Error(`reference "${p}" resolves to more than one schema`);
  }
}
Ge.getSchemaRefs = QC;
Object.defineProperty(At, "__esModule", { value: !0 });
At.getData = At.KeywordCxt = At.validateFunctionCode = void 0;
const fy = Yr, dm = ke, $u = tn, Os = ke, ZC = go, Bi = Bt, xc = Cn, ee = ie, re = wt, eI = Ge, nn = X, Ci = Ta;
function tI(e) {
  if (vy(e) && (gy(e), hy(e))) {
    iI(e);
    return;
  }
  my(e, () => (0, fy.topBoolOrEmptySchema)(e));
}
At.validateFunctionCode = tI;
function my({ gen: e, validateName: t, schema: n, schemaEnv: r, opts: i }, a) {
  i.code.es5 ? e.func(t, (0, ee._)`${re.default.data}, ${re.default.valCxt}`, r.$async, () => {
    e.code((0, ee._)`"use strict"; ${fm(n, i)}`), rI(e, i), e.code(a);
  }) : e.func(t, (0, ee._)`${re.default.data}, ${nI(i)}`, r.$async, () => e.code(fm(n, i)).code(a));
}
function nI(e) {
  return (0, ee._)`{${re.default.instancePath}="", ${re.default.parentData}, ${re.default.parentDataProperty}, ${re.default.rootData}=${re.default.data}${e.dynamicRef ? (0, ee._)`, ${re.default.dynamicAnchors}={}` : ee.nil}}={}`;
}
function rI(e, t) {
  e.if(re.default.valCxt, () => {
    e.var(re.default.instancePath, (0, ee._)`${re.default.valCxt}.${re.default.instancePath}`), e.var(re.default.parentData, (0, ee._)`${re.default.valCxt}.${re.default.parentData}`), e.var(re.default.parentDataProperty, (0, ee._)`${re.default.valCxt}.${re.default.parentDataProperty}`), e.var(re.default.rootData, (0, ee._)`${re.default.valCxt}.${re.default.rootData}`), t.dynamicRef && e.var(re.default.dynamicAnchors, (0, ee._)`${re.default.valCxt}.${re.default.dynamicAnchors}`);
  }, () => {
    e.var(re.default.instancePath, (0, ee._)`""`), e.var(re.default.parentData, (0, ee._)`undefined`), e.var(re.default.parentDataProperty, (0, ee._)`undefined`), e.var(re.default.rootData, re.default.data), t.dynamicRef && e.var(re.default.dynamicAnchors, (0, ee._)`{}`);
  });
}
function iI(e) {
  const { schema: t, opts: n, gen: r } = e;
  my(e, () => {
    n.$comment && t.$comment && by(e), lI(e), r.let(re.default.vErrors, null), r.let(re.default.errors, 0), n.unevaluated && aI(e), yy(e), dI(e);
  });
}
function aI(e) {
  const { gen: t, validateName: n } = e;
  e.evaluated = t.const("evaluated", (0, ee._)`${n}.evaluated`), t.if((0, ee._)`${e.evaluated}.dynamicProps`, () => t.assign((0, ee._)`${e.evaluated}.props`, (0, ee._)`undefined`)), t.if((0, ee._)`${e.evaluated}.dynamicItems`, () => t.assign((0, ee._)`${e.evaluated}.items`, (0, ee._)`undefined`));
}
function fm(e, t) {
  const n = typeof e == "object" && e[t.schemaId];
  return n && (t.code.source || t.code.process) ? (0, ee._)`/*# sourceURL=${n} */` : ee.nil;
}
function sI(e, t) {
  if (vy(e) && (gy(e), hy(e))) {
    oI(e, t);
    return;
  }
  (0, fy.boolOrEmptySchema)(e, t);
}
function hy({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t.RULES.all[n])
      return !0;
  return !1;
}
function vy(e) {
  return typeof e.schema != "boolean";
}
function oI(e, t) {
  const { schema: n, gen: r, opts: i } = e;
  i.$comment && n.$comment && by(e), uI(e), pI(e);
  const a = r.const("_errs", re.default.errors);
  yy(e, a), r.var(t, (0, ee._)`${a} === ${re.default.errors}`);
}
function gy(e) {
  (0, nn.checkUnknownRules)(e), cI(e);
}
function yy(e, t) {
  if (e.opts.jtd)
    return mm(e, [], !1, t);
  const n = (0, dm.getSchemaTypes)(e.schema), r = (0, dm.coerceAndCheckDataType)(e, n);
  mm(e, n, !r, t);
}
function cI(e) {
  const { schema: t, errSchemaPath: n, opts: r, self: i } = e;
  t.$ref && r.ignoreKeywordsWithRef && (0, nn.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
}
function lI(e) {
  const { schema: t, opts: n } = e;
  t.default !== void 0 && n.useDefaults && n.strictSchema && (0, nn.checkStrictMode)(e, "default is ignored in the schema root");
}
function uI(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, eI.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function pI(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function by({ gen: e, schemaEnv: t, schema: n, errSchemaPath: r, opts: i }) {
  const a = n.$comment;
  if (i.$comment === !0)
    e.code((0, ee._)`${re.default.self}.logger.log(${a})`);
  else if (typeof i.$comment == "function") {
    const s = (0, ee.str)`${r}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, ee._)`${re.default.self}.opts.$comment(${a}, ${s}, ${o}.schema)`);
  }
}
function dI(e) {
  const { gen: t, schemaEnv: n, validateName: r, ValidationError: i, opts: a } = e;
  n.$async ? t.if((0, ee._)`${re.default.errors} === 0`, () => t.return(re.default.data), () => t.throw((0, ee._)`new ${i}(${re.default.vErrors})`)) : (t.assign((0, ee._)`${r}.errors`, re.default.vErrors), a.unevaluated && fI(e), t.return((0, ee._)`${re.default.errors} === 0`));
}
function fI({ gen: e, evaluated: t, props: n, items: r }) {
  n instanceof ee.Name && e.assign((0, ee._)`${t}.props`, n), r instanceof ee.Name && e.assign((0, ee._)`${t}.items`, r);
}
function mm(e, t, n, r) {
  const { gen: i, schema: a, data: s, allErrors: o, opts: c, self: l } = e, { RULES: u } = l;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, nn.schemaHasRulesButRef)(a, u))) {
    i.block(() => _y(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || mI(e, t), i.block(() => {
    for (const d of u.rules)
      p(d);
    p(u.post);
  });
  function p(d) {
    (0, $u.shouldUseGroup)(a, d) && (d.type ? (i.if((0, Os.checkDataType)(d.type, s, c.strictNumbers)), hm(e, d), t.length === 1 && t[0] === d.type && n && (i.else(), (0, Os.reportTypeError)(e)), i.endIf()) : hm(e, d), o || i.if((0, ee._)`${re.default.errors} === ${r || 0}`));
  }
}
function hm(e, t) {
  const { gen: n, schema: r, opts: { useDefaults: i } } = e;
  i && (0, ZC.assignDefaults)(e, t.type), n.block(() => {
    for (const a of t.rules)
      (0, $u.shouldUseRule)(r, a) && _y(e, a.keyword, a.definition, t.type);
  });
}
function mI(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (hI(e, t), e.opts.allowUnionTypes || vI(e, t), gI(e, e.dataTypes));
}
function hI(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((n) => {
      xy(e.dataTypes, n) || Su(e, `type "${n}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), bI(e, t);
  }
}
function vI(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Su(e, "use allowUnionTypes to allow union type keyword");
}
function gI(e, t) {
  const n = e.self.RULES.all;
  for (const r in n) {
    const i = n[r];
    if (typeof i == "object" && (0, $u.shouldUseRule)(e.schema, i)) {
      const { type: a } = i.definition;
      a.length && !a.some((s) => yI(t, s)) && Su(e, `missing type "${a.join(",")}" for keyword "${r}"`);
    }
  }
}
function yI(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function xy(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function bI(e, t) {
  const n = [];
  for (const r of e.dataTypes)
    xy(t, r) ? n.push(r) : t.includes("integer") && r === "number" && n.push("integer");
  e.dataTypes = n;
}
function Su(e, t) {
  const n = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${n}" (strictTypes)`, (0, nn.checkStrictMode)(e, t, e.opts.strictTypes);
}
class wy {
  constructor(t, n, r) {
    if ((0, Bi.validateKeywordUsage)(t, n, r), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = r, this.data = t.data, this.schema = t.schema[r], this.$data = n.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, nn.schemaRefOrVal)(t, this.schema, r, this.$data), this.schemaType = n.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = n, this.$data)
      this.schemaCode = t.gen.const("vSchema", Ey(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Bi.validSchemaType)(this.schema, n.schemaType, n.allowUndefined))
      throw new Error(`${r} value must be ${JSON.stringify(n.schemaType)}`);
    ("code" in n ? n.trackErrors : n.errors !== !1) && (this.errsCount = t.gen.const("_errs", re.default.errors));
  }
  result(t, n, r) {
    this.failResult((0, ee.not)(t), n, r);
  }
  failResult(t, n, r) {
    this.gen.if(t), r ? r() : this.error(), n ? (this.gen.else(), n(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, n) {
    this.failResult((0, ee.not)(t), void 0, n);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: n } = this;
    this.fail((0, ee._)`${n} !== undefined && (${(0, ee.or)(this.invalid$data(), t)})`);
  }
  error(t, n, r) {
    if (n) {
      this.setParams(n), this._error(t, r), this.setParams({});
      return;
    }
    this._error(t, r);
  }
  _error(t, n) {
    (t ? Ci.reportExtraError : Ci.reportError)(this, this.def.error, n);
  }
  $dataError() {
    (0, Ci.reportError)(this, this.def.$dataError || Ci.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ci.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, n) {
    n ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, n, r = ee.nil) {
    this.gen.block(() => {
      this.check$data(t, r), n();
    });
  }
  check$data(t = ee.nil, n = ee.nil) {
    if (!this.$data)
      return;
    const { gen: r, schemaCode: i, schemaType: a, def: s } = this;
    r.if((0, ee.or)((0, ee._)`${i} === undefined`, n)), t !== ee.nil && r.assign(t, !0), (a.length || s.validateSchema) && (r.elseIf(this.invalid$data()), this.$dataError(), t !== ee.nil && r.assign(t, !1)), r.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: n, schemaType: r, def: i, it: a } = this;
    return (0, ee.or)(s(), o());
    function s() {
      if (r.length) {
        if (!(n instanceof ee.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(r) ? r : [r];
        return (0, ee._)`${(0, Os.checkDataTypes)(c, n, a.opts.strictNumbers, Os.DataType.Wrong)}`;
      }
      return ee.nil;
    }
    function o() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ee._)`!${c}(${n})`;
      }
      return ee.nil;
    }
  }
  subschema(t, n) {
    const r = (0, xc.getSubschema)(this.it, t);
    (0, xc.extendSubschemaData)(r, this.it, t), (0, xc.extendSubschemaMode)(r, t);
    const i = { ...this.it, ...r, items: void 0, props: void 0 };
    return sI(i, n), i;
  }
  mergeEvaluated(t, n) {
    const { it: r, gen: i } = this;
    r.opts.unevaluated && (r.props !== !0 && t.props !== void 0 && (r.props = nn.mergeEvaluated.props(i, t.props, r.props, n)), r.items !== !0 && t.items !== void 0 && (r.items = nn.mergeEvaluated.items(i, t.items, r.items, n)));
  }
  mergeValidEvaluated(t, n) {
    const { it: r, gen: i } = this;
    if (r.opts.unevaluated && (r.props !== !0 || r.items !== !0))
      return i.if(n, () => this.mergeEvaluated(t, ee.Name)), !0;
  }
}
At.KeywordCxt = wy;
function _y(e, t, n, r) {
  const i = new wy(e, n, t);
  "code" in n ? n.code(i, r) : i.$data && n.validate ? (0, Bi.funcKeywordCode)(i, n) : "macro" in n ? (0, Bi.macroKeywordCode)(i, n) : (n.compile || n.validate) && (0, Bi.funcKeywordCode)(i, n);
}
const xI = /^\/(?:[^~]|~0|~1)*$/, wI = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Ey(e, { dataLevel: t, dataNames: n, dataPathArr: r }) {
  let i, a;
  if (e === "")
    return re.default.rootData;
  if (e[0] === "/") {
    if (!xI.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, a = re.default.rootData;
  } else {
    const l = wI.exec(e);
    if (!l)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +l[1];
    if (i = l[2], i === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return r[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = n[t - u], !i)
      return a;
  }
  let s = a;
  const o = i.split("/");
  for (const l of o)
    l && (a = (0, ee._)`${a}${(0, ee.getProperty)((0, nn.unescapeJsonPointer)(l))}`, s = (0, ee._)`${s} && ${a}`);
  return s;
  function c(l, u) {
    return `Cannot access ${l} ${u} levels up, current level is ${t}`;
  }
}
At.getData = Ey;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
class _I extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
ri.default = _I;
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
const wc = Ge;
class EI extends Error {
  constructor(t, n, r, i) {
    super(i || `can't resolve reference ${r} from id ${n}`), this.missingRef = (0, wc.resolveUrl)(t, n, r), this.missingSchema = (0, wc.normalizeId)((0, wc.getFullPath)(t, this.missingRef));
  }
}
yr.default = EI;
var st = {};
Object.defineProperty(st, "__esModule", { value: !0 });
st.resolveSchema = st.getCompilingSchema = st.resolveRef = st.compileSchema = st.SchemaEnv = void 0;
const Ot = ie, $I = ri, Kn = wt, It = Ge, vm = X, SI = At;
class yo {
  constructor(t) {
    var n;
    this.refs = {}, this.dynamicAnchors = {};
    let r;
    typeof t.schema == "object" && (r = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (n = t.baseId) !== null && n !== void 0 ? n : (0, It.normalizeId)(r == null ? void 0 : r[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = r == null ? void 0 : r.$async, this.refs = {};
  }
}
st.SchemaEnv = yo;
function Tu(e) {
  const t = $y.call(this, e);
  if (t)
    return t;
  const n = (0, It.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: r, lines: i } = this.opts.code, { ownProperties: a } = this.opts, s = new Ot.CodeGen(this.scope, { es5: r, lines: i, ownProperties: a });
  let o;
  e.$async && (o = s.scopeValue("Error", {
    ref: $I.default,
    code: (0, Ot._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = s.scopeName("validate");
  e.validateName = c;
  const l = {
    gen: s,
    allErrors: this.opts.allErrors,
    data: Kn.default.data,
    parentData: Kn.default.parentData,
    parentDataProperty: Kn.default.parentDataProperty,
    dataNames: [Kn.default.data],
    dataPathArr: [Ot.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: s.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ot.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: n,
    baseId: e.baseId || n,
    schemaPath: Ot.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ot._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, SI.validateFunctionCode)(l), s.optimize(this.opts.code.optimize);
    const p = s.toString();
    u = `${s.scopeRefs(Kn.default.scope)}return ${p}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const f = new Function(`${Kn.default.self}`, `${Kn.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: f }), f.errors = null, f.schema = e.schema, f.schemaEnv = e, e.$async && (f.$async = !0), this.opts.code.source === !0 && (f.source = { validateName: c, validateCode: p, scopeValues: s._values }), this.opts.unevaluated) {
      const { props: h, items: b } = l;
      f.evaluated = {
        props: h instanceof Ot.Name ? void 0 : h,
        items: b instanceof Ot.Name ? void 0 : b,
        dynamicProps: h instanceof Ot.Name,
        dynamicItems: b instanceof Ot.Name
      }, f.source && (f.source.evaluated = (0, Ot.stringify)(f.evaluated));
    }
    return e.validate = f, e;
  } catch (p) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), p;
  } finally {
    this._compilations.delete(e);
  }
}
st.compileSchema = Tu;
function TI(e, t, n) {
  var r;
  n = (0, It.resolveUrl)(this.opts.uriResolver, t, n);
  const i = e.refs[n];
  if (i)
    return i;
  let a = PI.call(this, e, n);
  if (a === void 0) {
    const s = (r = e.localRefs) === null || r === void 0 ? void 0 : r[n], { schemaId: o } = this.opts;
    s && (a = new yo({ schema: s, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[n] = AI.call(this, a);
}
st.resolveRef = TI;
function AI(e) {
  return (0, It.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Tu.call(this, e);
}
function $y(e) {
  for (const t of this._compilations)
    if (RI(t, e))
      return t;
}
st.getCompilingSchema = $y;
function RI(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function PI(e, t) {
  let n;
  for (; typeof (n = this.refs[t]) == "string"; )
    t = n;
  return n || this.schemas[t] || bo.call(this, e, t);
}
function bo(e, t) {
  const n = this.opts.uriResolver.parse(t), r = (0, It._getFullPath)(this.opts.uriResolver, n);
  let i = (0, It.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && r === i)
    return _c.call(this, n, e);
  const a = (0, It.normalizeId)(r), s = this.refs[a] || this.schemas[a];
  if (typeof s == "string") {
    const o = bo.call(this, e, s);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : _c.call(this, n, o);
  }
  if (typeof (s == null ? void 0 : s.schema) == "object") {
    if (s.validate || Tu.call(this, s), a === (0, It.normalizeId)(t)) {
      const { schema: o } = s, { schemaId: c } = this.opts, l = o[c];
      return l && (i = (0, It.resolveUrl)(this.opts.uriResolver, i, l)), new yo({ schema: o, schemaId: c, root: e, baseId: i });
    }
    return _c.call(this, n, s);
  }
}
st.resolveSchema = bo;
const OI = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function _c(e, { baseId: t, schema: n, root: r }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof n == "boolean")
      return;
    const c = n[(0, vm.unescapeFragment)(o)];
    if (c === void 0)
      return;
    n = c;
    const l = typeof n == "object" && n[this.opts.schemaId];
    !OI.has(o) && l && (t = (0, It.resolveUrl)(this.opts.uriResolver, t, l));
  }
  let a;
  if (typeof n != "boolean" && n.$ref && !(0, vm.schemaHasRulesButRef)(n, this.RULES)) {
    const o = (0, It.resolveUrl)(this.opts.uriResolver, t, n.$ref);
    a = bo.call(this, r, o);
  }
  const { schemaId: s } = this.opts;
  if (a = a || new yo({ schema: n, schemaId: s, root: r, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const NI = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", CI = "Meta-schema for $data reference (JSON AnySchema extension proposal)", II = "object", kI = [
  "$data"
], DI = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, jI = !1, FI = {
  $id: NI,
  description: CI,
  type: II,
  required: kI,
  properties: DI,
  additionalProperties: jI
};
var Au = {}, xo = { exports: {} };
const LI = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var UI = {
  HEX: LI
};
const { HEX: MI } = UI;
function Sy(e) {
  if (Ay(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [n] = t;
  return n ? { host: BI(n, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function ol(e, t = !1) {
  let n = "", r = !0;
  for (const i of e) {
    if (MI[i] === void 0) return;
    i !== "0" && r === !0 && (r = !1), r || (n += i);
  }
  return t && n.length === 0 && (n = "0"), n;
}
function qI(e) {
  let t = 0;
  const n = { error: !1, address: "", zone: "" }, r = [], i = [];
  let a = !1, s = !1, o = !1;
  function c() {
    if (i.length) {
      if (a === !1) {
        const l = ol(i);
        if (l !== void 0)
          r.push(l);
        else
          return n.error = !0, !1;
      }
      i.length = 0;
    }
    return !0;
  }
  for (let l = 0; l < e.length; l++) {
    const u = e[l];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (s === !0 && (o = !0), !c())
          break;
        if (t++, r.push(":"), t > 7) {
          n.error = !0;
          break;
        }
        l - 1 >= 0 && e[l - 1] === ":" && (s = !0);
        continue;
      } else if (u === "%") {
        if (!c())
          break;
        a = !0;
      } else {
        i.push(u);
        continue;
      }
  }
  return i.length && (a ? n.zone = i.join("") : o ? r.push(i.join("")) : r.push(ol(i))), n.address = r.join(""), n;
}
function Ty(e, t = {}) {
  if (Ay(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const n = qI(e);
  if (n.error)
    return { host: e, isIPV6: !1 };
  {
    let r = n.address, i = n.address;
    return n.zone && (r += "%" + n.zone, i += "%25" + n.zone), { host: r, escapedHost: i, isIPV6: !0 };
  }
}
function BI(e, t) {
  let n = "", r = !0;
  const i = e.length;
  for (let a = 0; a < i; a++) {
    const s = e[a];
    s === "0" && r ? (a + 1 <= i && e[a + 1] === t || a + 1 === i) && (n += s, r = !1) : (s === t ? r = !0 : r = !1, n += s);
  }
  return n;
}
function Ay(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    e[r] === t && n++;
  return n;
}
const gm = /^\.\.?\//u, ym = /^\/\.(?:\/|$)/u, bm = /^\/\.\.(?:\/|$)/u, zI = /^\/?(?:.|\n)*?(?=\/|$)/u;
function HI(e) {
  const t = [];
  for (; e.length; )
    if (e.match(gm))
      e = e.replace(gm, "");
    else if (e.match(ym))
      e = e.replace(ym, "/");
    else if (e.match(bm))
      e = e.replace(bm, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const n = e.match(zI);
      if (n) {
        const r = n[0];
        e = e.slice(r.length), t.push(r);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function VI(e, t) {
  const n = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = n(e.scheme)), e.userinfo !== void 0 && (e.userinfo = n(e.userinfo)), e.host !== void 0 && (e.host = n(e.host)), e.path !== void 0 && (e.path = n(e.path)), e.query !== void 0 && (e.query = n(e.query)), e.fragment !== void 0 && (e.fragment = n(e.fragment)), e;
}
function GI(e, t) {
  const n = [];
  if (e.userinfo !== void 0 && (n.push(e.userinfo), n.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const i = Sy(r);
    if (i.isIPV4)
      r = i.host;
    else {
      const a = Ty(i.host, { isIPV4: !1 });
      a.isIPV6 === !0 ? r = `[${a.escapedHost}]` : r = e.host;
    }
    n.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (n.push(":"), n.push(String(e.port))), n.length ? n.join("") : void 0;
}
var WI = {
  recomposeAuthority: GI,
  normalizeComponentEncoding: VI,
  removeDotSegments: HI,
  normalizeIPv4: Sy,
  normalizeIPv6: Ty,
  stringArrayToHexStripped: ol
};
const KI = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, YI = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Ry(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function Py(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Oy(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function XI(e) {
  return e.secure = Ry(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function JI(e) {
  if ((e.port === (Ry(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, n] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = n, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function QI(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const n = e.path.match(YI);
  if (n) {
    const r = t.scheme || e.scheme || "urn";
    e.nid = n[1].toLowerCase(), e.nss = n[2];
    const i = `${r}:${t.nid || e.nid}`, a = Ru[i];
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function ZI(e, t) {
  const n = t.scheme || e.scheme || "urn", r = e.nid.toLowerCase(), i = `${n}:${t.nid || r}`, a = Ru[i];
  a && (e = a.serialize(e, t));
  const s = e, o = e.nss;
  return s.path = `${r || t.nid}:${o}`, t.skipEscape = !0, s;
}
function ek(e, t) {
  const n = e;
  return n.uuid = n.nss, n.nss = void 0, !t.tolerant && (!n.uuid || !KI.test(n.uuid)) && (n.error = n.error || "UUID is not valid."), n;
}
function tk(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Ny = {
  scheme: "http",
  domainHost: !0,
  parse: Py,
  serialize: Oy
}, nk = {
  scheme: "https",
  domainHost: Ny.domainHost,
  parse: Py,
  serialize: Oy
}, cs = {
  scheme: "ws",
  domainHost: !0,
  parse: XI,
  serialize: JI
}, rk = {
  scheme: "wss",
  domainHost: cs.domainHost,
  parse: cs.parse,
  serialize: cs.serialize
}, ik = {
  scheme: "urn",
  parse: QI,
  serialize: ZI,
  skipNormalize: !0
}, ak = {
  scheme: "urn:uuid",
  parse: ek,
  serialize: tk,
  skipNormalize: !0
}, Ru = {
  http: Ny,
  https: nk,
  ws: cs,
  wss: rk,
  urn: ik,
  "urn:uuid": ak
};
var sk = Ru;
const { normalizeIPv6: ok, normalizeIPv4: ck, removeDotSegments: ji, recomposeAuthority: lk, normalizeComponentEncoding: Ka } = WI, Pu = sk;
function uk(e, t) {
  return typeof e == "string" ? e = zt(sn(e, t), t) : typeof e == "object" && (e = sn(zt(e, t), t)), e;
}
function pk(e, t, n) {
  const r = Object.assign({ scheme: "null" }, n), i = Cy(sn(e, r), sn(t, r), r, !0);
  return zt(i, { ...r, skipEscape: !0 });
}
function Cy(e, t, n, r) {
  const i = {};
  return r || (e = sn(zt(e, n), n), t = sn(zt(t, n), n)), n = n || {}, !n.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = ji(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = ji(t.path || ""), i.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? i.path = ji(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = ji(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function dk(e, t, n) {
  return typeof e == "string" ? (e = unescape(e), e = zt(Ka(sn(e, n), !0), { ...n, skipEscape: !0 })) : typeof e == "object" && (e = zt(Ka(e, !0), { ...n, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = zt(Ka(sn(t, n), !0), { ...n, skipEscape: !0 })) : typeof t == "object" && (t = zt(Ka(t, !0), { ...n, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function zt(e, t) {
  const n = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, r = Object.assign({}, t), i = [], a = Pu[(r.scheme || n.scheme || "").toLowerCase()];
  a && a.serialize && a.serialize(n, r), n.path !== void 0 && (r.skipEscape ? n.path = unescape(n.path) : (n.path = escape(n.path), n.scheme !== void 0 && (n.path = n.path.split("%3A").join(":")))), r.reference !== "suffix" && n.scheme && i.push(n.scheme, ":");
  const s = lk(n, r);
  if (s !== void 0 && (r.reference !== "suffix" && i.push("//"), i.push(s), n.path && n.path.charAt(0) !== "/" && i.push("/")), n.path !== void 0) {
    let o = n.path;
    !r.absolutePath && (!a || !a.absolutePath) && (o = ji(o)), s === void 0 && (o = o.replace(/^\/\//u, "/%2F")), i.push(o);
  }
  return n.query !== void 0 && i.push("?", n.query), n.fragment !== void 0 && i.push("#", n.fragment), i.join("");
}
const fk = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function mk(e) {
  let t = 0;
  for (let n = 0, r = e.length; n < r; ++n)
    if (t = e.charCodeAt(n), t > 126 || fk[t])
      return !0;
  return !1;
}
const hk = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function sn(e, t) {
  const n = Object.assign({}, t), r = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, i = e.indexOf("%") !== -1;
  let a = !1;
  n.reference === "suffix" && (e = (n.scheme ? n.scheme + ":" : "") + "//" + e);
  const s = e.match(hk);
  if (s) {
    if (r.scheme = s[1], r.userinfo = s[3], r.host = s[4], r.port = parseInt(s[5], 10), r.path = s[6] || "", r.query = s[7], r.fragment = s[8], isNaN(r.port) && (r.port = s[5]), r.host) {
      const c = ck(r.host);
      if (c.isIPV4 === !1) {
        const l = ok(c.host, { isIPV4: !1 });
        r.host = l.host.toLowerCase(), a = l.isIPV6;
      } else
        r.host = c.host, a = !0;
    }
    r.scheme === void 0 && r.userinfo === void 0 && r.host === void 0 && r.port === void 0 && !r.path && r.query === void 0 ? r.reference = "same-document" : r.scheme === void 0 ? r.reference = "relative" : r.fragment === void 0 ? r.reference = "absolute" : r.reference = "uri", n.reference && n.reference !== "suffix" && n.reference !== r.reference && (r.error = r.error || "URI is not a " + n.reference + " reference.");
    const o = Pu[(n.scheme || r.scheme || "").toLowerCase()];
    if (!n.unicodeSupport && (!o || !o.unicodeSupport) && r.host && (n.domainHost || o && o.domainHost) && a === !1 && mk(r.host))
      try {
        r.host = URL.domainToASCII(r.host.toLowerCase());
      } catch (c) {
        r.error = r.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!o || o && !o.skipNormalize) && (i && r.scheme !== void 0 && (r.scheme = unescape(r.scheme)), i && r.host !== void 0 && (r.host = unescape(r.host)), r.path !== void 0 && r.path.length && (r.path = escape(unescape(r.path))), r.fragment !== void 0 && r.fragment.length && (r.fragment = encodeURI(decodeURIComponent(r.fragment)))), o && o.parse && o.parse(r, n);
  } else
    r.error = r.error || "URI can not be parsed.";
  return r;
}
const Ou = {
  SCHEMES: Pu,
  normalize: uk,
  resolve: pk,
  resolveComponents: Cy,
  equal: dk,
  serialize: zt,
  parse: sn
};
xo.exports = Ou;
xo.exports.default = Ou;
xo.exports.fastUri = Ou;
var vk = xo.exports;
Object.defineProperty(Au, "__esModule", { value: !0 });
const Iy = vk;
Iy.code = 'require("ajv/dist/runtime/uri").default';
Au.default = Iy;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = At;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var n = ie;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return n.CodeGen;
  } });
  const r = ri, i = yr, a = pr, s = st, o = ie, c = Ge, l = ke, u = X, p = FI, d = Au, f = (M, S) => new RegExp(M, S);
  f.code = "new RegExp";
  const h = ["removeAdditional", "useDefaults", "coerceTypes"], b = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), v = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, g = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function T(M) {
    var S, k, R, x, $, q, y, m, L, A, ne, he, ye, Pe, Ne, _t, $e, it, Mn, ln, Kt, un, ci, li, ui;
    const qn = M.strict, pn = (S = M.code) === null || S === void 0 ? void 0 : S.optimize, br = pn === !0 || pn === void 0 ? 1 : pn || 0, pi = (R = (k = M.code) === null || k === void 0 ? void 0 : k.regExp) !== null && R !== void 0 ? R : f, Et = (x = M.uriResolver) !== null && x !== void 0 ? x : d.default;
    return {
      strictSchema: (q = ($ = M.strictSchema) !== null && $ !== void 0 ? $ : qn) !== null && q !== void 0 ? q : !0,
      strictNumbers: (m = (y = M.strictNumbers) !== null && y !== void 0 ? y : qn) !== null && m !== void 0 ? m : !0,
      strictTypes: (A = (L = M.strictTypes) !== null && L !== void 0 ? L : qn) !== null && A !== void 0 ? A : "log",
      strictTuples: (he = (ne = M.strictTuples) !== null && ne !== void 0 ? ne : qn) !== null && he !== void 0 ? he : "log",
      strictRequired: (Pe = (ye = M.strictRequired) !== null && ye !== void 0 ? ye : qn) !== null && Pe !== void 0 ? Pe : !1,
      code: M.code ? { ...M.code, optimize: br, regExp: pi } : { optimize: br, regExp: pi },
      loopRequired: (Ne = M.loopRequired) !== null && Ne !== void 0 ? Ne : w,
      loopEnum: (_t = M.loopEnum) !== null && _t !== void 0 ? _t : w,
      meta: ($e = M.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (it = M.messages) !== null && it !== void 0 ? it : !0,
      inlineRefs: (Mn = M.inlineRefs) !== null && Mn !== void 0 ? Mn : !0,
      schemaId: (ln = M.schemaId) !== null && ln !== void 0 ? ln : "$id",
      addUsedSchema: (Kt = M.addUsedSchema) !== null && Kt !== void 0 ? Kt : !0,
      validateSchema: (un = M.validateSchema) !== null && un !== void 0 ? un : !0,
      validateFormats: (ci = M.validateFormats) !== null && ci !== void 0 ? ci : !0,
      unicodeRegExp: (li = M.unicodeRegExp) !== null && li !== void 0 ? li : !0,
      int32range: (ui = M.int32range) !== null && ui !== void 0 ? ui : !0,
      uriResolver: Et
    };
  }
  class I {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...T(S) };
      const { es5: k, lines: R } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: b, es5: k, lines: R }), this.logger = K(S.logger);
      const x = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, a.getRules)(), F.call(this, v, S, "NOT SUPPORTED"), F.call(this, g, S, "DEPRECATED", "warn"), this._metaOpts = Y.call(this), S.formats && V.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && _.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), U.call(this), S.validateFormats = x;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: k, schemaId: R } = this.opts;
      let x = p;
      R === "id" && (x = { ...p }, x.id = x.$id, delete x.$id), k && S && this.addMetaSchema(x, x[R], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: k } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[k] || S : void 0;
    }
    validate(S, k) {
      let R;
      if (typeof S == "string") {
        if (R = this.getSchema(S), !R)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        R = this.compile(S);
      const x = R(k);
      return "$async" in R || (this.errors = R.errors), x;
    }
    compile(S, k) {
      const R = this._addSchema(S, k);
      return R.validate || this._compileSchemaEnv(R);
    }
    compileAsync(S, k) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: R } = this.opts;
      return x.call(this, S, k);
      async function x(A, ne) {
        await $.call(this, A.$schema);
        const he = this._addSchema(A, ne);
        return he.validate || q.call(this, he);
      }
      async function $(A) {
        A && !this.getSchema(A) && await x.call(this, { $ref: A }, !0);
      }
      async function q(A) {
        try {
          return this._compileSchemaEnv(A);
        } catch (ne) {
          if (!(ne instanceof i.default))
            throw ne;
          return y.call(this, ne), await m.call(this, ne.missingSchema), q.call(this, A);
        }
      }
      function y({ missingSchema: A, missingRef: ne }) {
        if (this.refs[A])
          throw new Error(`AnySchema ${A} is loaded but ${ne} cannot be resolved`);
      }
      async function m(A) {
        const ne = await L.call(this, A);
        this.refs[A] || await $.call(this, ne.$schema), this.refs[A] || this.addSchema(ne, A, k);
      }
      async function L(A) {
        const ne = this._loading[A];
        if (ne)
          return ne;
        try {
          return await (this._loading[A] = R(A));
        } finally {
          delete this._loading[A];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, k, R, x = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const q of S)
          this.addSchema(q, void 0, R, x);
        return this;
      }
      let $;
      if (typeof S == "object") {
        const { schemaId: q } = this.opts;
        if ($ = S[q], $ !== void 0 && typeof $ != "string")
          throw new Error(`schema ${q} must be string`);
      }
      return k = (0, c.normalizeId)(k || $), this._checkUnique(k), this.schemas[k] = this._addSchema(S, R, k, x, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, k, R = this.opts.validateSchema) {
      return this.addSchema(S, k, !0, R), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, k) {
      if (typeof S == "boolean")
        return !0;
      let R;
      if (R = S.$schema, R !== void 0 && typeof R != "string")
        throw new Error("$schema must be a string");
      if (R = R || this.opts.defaultMeta || this.defaultMeta(), !R)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const x = this.validate(R, S);
      if (!x && k) {
        const $ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error($);
        else
          throw new Error($);
      }
      return x;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let k;
      for (; typeof (k = O.call(this, S)) == "string"; )
        S = k;
      if (k === void 0) {
        const { schemaId: R } = this.opts, x = new s.SchemaEnv({ schema: {}, schemaId: R });
        if (k = s.resolveSchema.call(this, x, S), !k)
          return;
        this.refs[S] = k;
      }
      return k.validate || this._compileSchemaEnv(k);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const k = O.call(this, S);
          return typeof k == "object" && this._cache.delete(k.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const k = S;
          this._cache.delete(k);
          let R = S[this.opts.schemaId];
          return R && (R = (0, c.normalizeId)(R), delete this.schemas[R], delete this.refs[R]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const k of S)
        this.addKeyword(k);
      return this;
    }
    addKeyword(S, k) {
      let R;
      if (typeof S == "string")
        R = S, typeof k == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), k.keyword = R);
      else if (typeof S == "object" && k === void 0) {
        if (k = S, R = k.keyword, Array.isArray(R) && !R.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (D.call(this, R, k), !k)
        return (0, u.eachItem)(R, ($) => j.call(this, $)), this;
      N.call(this, k);
      const x = {
        ...k,
        type: (0, l.getJSONTypes)(k.type),
        schemaType: (0, l.getJSONTypes)(k.schemaType)
      };
      return (0, u.eachItem)(R, x.type.length === 0 ? ($) => j.call(this, $, x) : ($) => x.type.forEach((q) => j.call(this, $, x, q))), this;
    }
    getKeyword(S) {
      const k = this.RULES.all[S];
      return typeof k == "object" ? k.definition : !!k;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: k } = this;
      delete k.keywords[S], delete k.all[S];
      for (const R of k.rules) {
        const x = R.rules.findIndex(($) => $.keyword === S);
        x >= 0 && R.rules.splice(x, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, k) {
      return typeof k == "string" && (k = new RegExp(k)), this.formats[S] = k, this;
    }
    errorsText(S = this.errors, { separator: k = ", ", dataVar: R = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((x) => `${R}${x.instancePath} ${x.message}`).reduce((x, $) => x + k + $);
    }
    $dataMetaSchema(S, k) {
      const R = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const x of k) {
        const $ = x.split("/").slice(1);
        let q = S;
        for (const y of $)
          q = q[y];
        for (const y in R) {
          const m = R[y];
          if (typeof m != "object")
            continue;
          const { $data: L } = m.definition, A = q[y];
          L && A && (q[y] = H(A));
        }
      }
      return S;
    }
    _removeAllSchemas(S, k) {
      for (const R in S) {
        const x = S[R];
        (!k || k.test(R)) && (typeof x == "string" ? delete S[R] : x && !x.meta && (this._cache.delete(x.schema), delete S[R]));
      }
    }
    _addSchema(S, k, R, x = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
      let q;
      const { schemaId: y } = this.opts;
      if (typeof S == "object")
        q = S[y];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let m = this._cache.get(S);
      if (m !== void 0)
        return m;
      R = (0, c.normalizeId)(q || R);
      const L = c.getSchemaRefs.call(this, S, R);
      return m = new s.SchemaEnv({ schema: S, schemaId: y, meta: k, baseId: R, localRefs: L }), this._cache.set(m.schema, m), $ && !R.startsWith("#") && (R && this._checkUnique(R), this.refs[R] = m), x && this.validateSchema(S, !0), m;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : s.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const k = this.opts;
      this.opts = this._metaOpts;
      try {
        s.compileSchema.call(this, S);
      } finally {
        this.opts = k;
      }
    }
  }
  I.ValidationError = r.default, I.MissingRefError = i.default, e.default = I;
  function F(M, S, k, R = "error") {
    for (const x in M) {
      const $ = x;
      $ in S && this.logger[R](`${k}: option ${x}. ${M[$]}`);
    }
  }
  function O(M) {
    return M = (0, c.normalizeId)(M), this.schemas[M] || this.refs[M];
  }
  function U() {
    const M = this.opts.schemas;
    if (M)
      if (Array.isArray(M))
        this.addSchema(M);
      else
        for (const S in M)
          this.addSchema(M[S], S);
  }
  function V() {
    for (const M in this.opts.formats) {
      const S = this.opts.formats[M];
      S && this.addFormat(M, S);
    }
  }
  function _(M) {
    if (Array.isArray(M)) {
      this.addVocabulary(M);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in M) {
      const k = M[S];
      k.keyword || (k.keyword = S), this.addKeyword(k);
    }
  }
  function Y() {
    const M = { ...this.opts };
    for (const S of h)
      delete M[S];
    return M;
  }
  const z = { log() {
  }, warn() {
  }, error() {
  } };
  function K(M) {
    if (M === !1)
      return z;
    if (M === void 0)
      return console;
    if (M.log && M.warn && M.error)
      return M;
    throw new Error("logger must implement log, warn and error methods");
  }
  const J = /^[a-z_$][a-z0-9_$:-]*$/i;
  function D(M, S) {
    const { RULES: k } = this;
    if ((0, u.eachItem)(M, (R) => {
      if (k.keywords[R])
        throw new Error(`Keyword ${R} is already defined`);
      if (!J.test(R))
        throw new Error(`Keyword ${R} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function j(M, S, k) {
    var R;
    const x = S == null ? void 0 : S.post;
    if (k && x)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: $ } = this;
    let q = x ? $.post : $.rules.find(({ type: m }) => m === k);
    if (q || (q = { type: k, rules: [] }, $.rules.push(q)), $.keywords[M] = !0, !S)
      return;
    const y = {
      keyword: M,
      definition: {
        ...S,
        type: (0, l.getJSONTypes)(S.type),
        schemaType: (0, l.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? G.call(this, q, y, S.before) : q.rules.push(y), $.all[M] = y, (R = S.implements) === null || R === void 0 || R.forEach((m) => this.addKeyword(m));
  }
  function G(M, S, k) {
    const R = M.rules.findIndex((x) => x.keyword === k);
    R >= 0 ? M.rules.splice(R, 0, S) : (M.rules.push(S), this.logger.warn(`rule ${k} is not defined`));
  }
  function N(M) {
    let { metaSchema: S } = M;
    S !== void 0 && (M.$data && this.opts.$data && (S = H(S)), M.validateSchema = this.compile(S, !0));
  }
  const B = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function H(M) {
    return { anyOf: [M, B] };
  }
})(vu);
var Nu = {}, wo = {}, Cu = {};
Object.defineProperty(Cu, "__esModule", { value: !0 });
const gk = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Cu.default = gk;
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.callRef = on.getValidate = void 0;
const yk = yr, xm = ue, ft = ie, Rr = wt, wm = st, Ya = X, bk = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: n, it: r } = e, { baseId: i, schemaEnv: a, validateName: s, opts: o, self: c } = r, { root: l } = a;
    if ((n === "#" || n === "#/") && i === l.baseId)
      return p();
    const u = wm.resolveRef.call(c, l, i, n);
    if (u === void 0)
      throw new yk.default(r.opts.uriResolver, i, n);
    if (u instanceof wm.SchemaEnv)
      return d(u);
    return f(u);
    function p() {
      if (a === l)
        return ls(e, s, a, a.$async);
      const h = t.scopeValue("root", { ref: l });
      return ls(e, (0, ft._)`${h}.validate`, l, l.$async);
    }
    function d(h) {
      const b = ky(e, h);
      ls(e, b, h, h.$async);
    }
    function f(h) {
      const b = t.scopeValue("schema", o.code.source === !0 ? { ref: h, code: (0, ft.stringify)(h) } : { ref: h }), v = t.name("valid"), g = e.subschema({
        schema: h,
        dataTypes: [],
        schemaPath: ft.nil,
        topSchemaRef: b,
        errSchemaPath: n
      }, v);
      e.mergeEvaluated(g), e.ok(v);
    }
  }
};
function ky(e, t) {
  const { gen: n } = e;
  return t.validate ? n.scopeValue("validate", { ref: t.validate }) : (0, ft._)`${n.scopeValue("wrapper", { ref: t })}.validate`;
}
on.getValidate = ky;
function ls(e, t, n, r) {
  const { gen: i, it: a } = e, { allErrors: s, schemaEnv: o, opts: c } = a, l = c.passContext ? Rr.default.this : ft.nil;
  r ? u() : p();
  function u() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const h = i.let("valid");
    i.try(() => {
      i.code((0, ft._)`await ${(0, xm.callValidateCode)(e, t, l)}`), f(t), s || i.assign(h, !0);
    }, (b) => {
      i.if((0, ft._)`!(${b} instanceof ${a.ValidationError})`, () => i.throw(b)), d(b), s || i.assign(h, !1);
    }), e.ok(h);
  }
  function p() {
    e.result((0, xm.callValidateCode)(e, t, l), () => f(t), () => d(t));
  }
  function d(h) {
    const b = (0, ft._)`${h}.errors`;
    i.assign(Rr.default.vErrors, (0, ft._)`${Rr.default.vErrors} === null ? ${b} : ${Rr.default.vErrors}.concat(${b})`), i.assign(Rr.default.errors, (0, ft._)`${Rr.default.vErrors}.length`);
  }
  function f(h) {
    var b;
    if (!a.opts.unevaluated)
      return;
    const v = (b = n == null ? void 0 : n.validate) === null || b === void 0 ? void 0 : b.evaluated;
    if (a.props !== !0)
      if (v && !v.dynamicProps)
        v.props !== void 0 && (a.props = Ya.mergeEvaluated.props(i, v.props, a.props));
      else {
        const g = i.var("props", (0, ft._)`${h}.evaluated.props`);
        a.props = Ya.mergeEvaluated.props(i, g, a.props, ft.Name);
      }
    if (a.items !== !0)
      if (v && !v.dynamicItems)
        v.items !== void 0 && (a.items = Ya.mergeEvaluated.items(i, v.items, a.items));
      else {
        const g = i.var("items", (0, ft._)`${h}.evaluated.items`);
        a.items = Ya.mergeEvaluated.items(i, g, a.items, ft.Name);
      }
  }
}
on.callRef = ls;
on.default = bk;
Object.defineProperty(wo, "__esModule", { value: !0 });
const xk = Cu, wk = on, _k = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  xk.default,
  wk.default
];
wo.default = _k;
var _o = {}, Iu = {};
Object.defineProperty(Iu, "__esModule", { value: !0 });
const Ns = ie, wn = Ns.operators, Cs = {
  maximum: { okStr: "<=", ok: wn.LTE, fail: wn.GT },
  minimum: { okStr: ">=", ok: wn.GTE, fail: wn.LT },
  exclusiveMaximum: { okStr: "<", ok: wn.LT, fail: wn.GTE },
  exclusiveMinimum: { okStr: ">", ok: wn.GT, fail: wn.LTE }
}, Ek = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ns.str)`must be ${Cs[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ns._)`{comparison: ${Cs[e].okStr}, limit: ${t}}`
}, $k = {
  keyword: Object.keys(Cs),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Ek,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e;
    e.fail$data((0, Ns._)`${n} ${Cs[t].fail} ${r} || isNaN(${n})`);
  }
};
Iu.default = $k;
var ku = {};
Object.defineProperty(ku, "__esModule", { value: !0 });
const zi = ie, Sk = {
  message: ({ schemaCode: e }) => (0, zi.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, zi._)`{multipleOf: ${e}}`
}, Tk = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Sk,
  code(e) {
    const { gen: t, data: n, schemaCode: r, it: i } = e, a = i.opts.multipleOfPrecision, s = t.let("res"), o = a ? (0, zi._)`Math.abs(Math.round(${s}) - ${s}) > 1e-${a}` : (0, zi._)`${s} !== parseInt(${s})`;
    e.fail$data((0, zi._)`(${r} === 0 || (${s} = ${n}/${r}, ${o}))`);
  }
};
ku.default = Tk;
var Du = {}, ju = {};
Object.defineProperty(ju, "__esModule", { value: !0 });
function Dy(e) {
  const t = e.length;
  let n = 0, r = 0, i;
  for (; r < t; )
    n++, i = e.charCodeAt(r++), i >= 55296 && i <= 56319 && r < t && (i = e.charCodeAt(r), (i & 64512) === 56320 && r++);
  return n;
}
ju.default = Dy;
Dy.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Du, "__esModule", { value: !0 });
const Qn = ie, Ak = X, Rk = ju, Pk = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxLength" ? "more" : "fewer";
    return (0, Qn.str)`must NOT have ${n} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Qn._)`{limit: ${e}}`
}, Ok = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Pk,
  code(e) {
    const { keyword: t, data: n, schemaCode: r, it: i } = e, a = t === "maxLength" ? Qn.operators.GT : Qn.operators.LT, s = i.opts.unicode === !1 ? (0, Qn._)`${n}.length` : (0, Qn._)`${(0, Ak.useFunc)(e.gen, Rk.default)}(${n})`;
    e.fail$data((0, Qn._)`${s} ${a} ${r}`);
  }
};
Du.default = Ok;
var Fu = {};
Object.defineProperty(Fu, "__esModule", { value: !0 });
const Nk = ue, Is = ie, Ck = {
  message: ({ schemaCode: e }) => (0, Is.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Is._)`{pattern: ${e}}`
}, Ik = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Ck,
  code(e) {
    const { data: t, $data: n, schema: r, schemaCode: i, it: a } = e, s = a.opts.unicodeRegExp ? "u" : "", o = n ? (0, Is._)`(new RegExp(${i}, ${s}))` : (0, Nk.usePattern)(e, r);
    e.fail$data((0, Is._)`!${o}.test(${t})`);
  }
};
Fu.default = Ik;
var Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
const Hi = ie, kk = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxProperties" ? "more" : "fewer";
    return (0, Hi.str)`must NOT have ${n} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Hi._)`{limit: ${e}}`
}, Dk = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: kk,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e, i = t === "maxProperties" ? Hi.operators.GT : Hi.operators.LT;
    e.fail$data((0, Hi._)`Object.keys(${n}).length ${i} ${r}`);
  }
};
Lu.default = Dk;
var Uu = {};
Object.defineProperty(Uu, "__esModule", { value: !0 });
const Ii = ue, Vi = ie, jk = X, Fk = {
  message: ({ params: { missingProperty: e } }) => (0, Vi.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Vi._)`{missingProperty: ${e}}`
}, Lk = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Fk,
  code(e) {
    const { gen: t, schema: n, schemaCode: r, data: i, $data: a, it: s } = e, { opts: o } = s;
    if (!a && n.length === 0)
      return;
    const c = n.length >= o.loopRequired;
    if (s.allErrors ? l() : u(), o.strictRequired) {
      const f = e.parentSchema.properties, { definedProperties: h } = e.it;
      for (const b of n)
        if ((f == null ? void 0 : f[b]) === void 0 && !h.has(b)) {
          const v = s.schemaEnv.baseId + s.errSchemaPath, g = `required property "${b}" is not defined at "${v}" (strictRequired)`;
          (0, jk.checkStrictMode)(s, g, s.opts.strictRequired);
        }
    }
    function l() {
      if (c || a)
        e.block$data(Vi.nil, p);
      else
        for (const f of n)
          (0, Ii.checkReportMissingProp)(e, f);
    }
    function u() {
      const f = t.let("missing");
      if (c || a) {
        const h = t.let("valid", !0);
        e.block$data(h, () => d(f, h)), e.ok(h);
      } else
        t.if((0, Ii.checkMissingProp)(e, n, f)), (0, Ii.reportMissingProp)(e, f), t.else();
    }
    function p() {
      t.forOf("prop", r, (f) => {
        e.setParams({ missingProperty: f }), t.if((0, Ii.noPropertyInData)(t, i, f, o.ownProperties), () => e.error());
      });
    }
    function d(f, h) {
      e.setParams({ missingProperty: f }), t.forOf(f, r, () => {
        t.assign(h, (0, Ii.propertyInData)(t, i, f, o.ownProperties)), t.if((0, Vi.not)(h), () => {
          e.error(), t.break();
        });
      }, Vi.nil);
    }
  }
};
Uu.default = Lk;
var Mu = {};
Object.defineProperty(Mu, "__esModule", { value: !0 });
const Gi = ie, Uk = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxItems" ? "more" : "fewer";
    return (0, Gi.str)`must NOT have ${n} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Gi._)`{limit: ${e}}`
}, Mk = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Uk,
  code(e) {
    const { keyword: t, data: n, schemaCode: r } = e, i = t === "maxItems" ? Gi.operators.GT : Gi.operators.LT;
    e.fail$data((0, Gi._)`${n}.length ${i} ${r}`);
  }
};
Mu.default = Mk;
var qu = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const jy = cy;
jy.code = 'require("ajv/dist/runtime/equal").default';
Aa.default = jy;
Object.defineProperty(qu, "__esModule", { value: !0 });
const Ec = ke, ze = ie, qk = X, Bk = Aa, zk = {
  message: ({ params: { i: e, j: t } }) => (0, ze.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, ze._)`{i: ${e}, j: ${t}}`
}, Hk = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: zk,
  code(e) {
    const { gen: t, data: n, $data: r, schema: i, parentSchema: a, schemaCode: s, it: o } = e;
    if (!r && !i)
      return;
    const c = t.let("valid"), l = a.items ? (0, Ec.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, ze._)`${s} === false`), e.ok(c);
    function u() {
      const h = t.let("i", (0, ze._)`${n}.length`), b = t.let("j");
      e.setParams({ i: h, j: b }), t.assign(c, !0), t.if((0, ze._)`${h} > 1`, () => (p() ? d : f)(h, b));
    }
    function p() {
      return l.length > 0 && !l.some((h) => h === "object" || h === "array");
    }
    function d(h, b) {
      const v = t.name("item"), g = (0, Ec.checkDataTypes)(l, v, o.opts.strictNumbers, Ec.DataType.Wrong), w = t.const("indices", (0, ze._)`{}`);
      t.for((0, ze._)`;${h}--;`, () => {
        t.let(v, (0, ze._)`${n}[${h}]`), t.if(g, (0, ze._)`continue`), l.length > 1 && t.if((0, ze._)`typeof ${v} == "string"`, (0, ze._)`${v} += "_"`), t.if((0, ze._)`typeof ${w}[${v}] == "number"`, () => {
          t.assign(b, (0, ze._)`${w}[${v}]`), e.error(), t.assign(c, !1).break();
        }).code((0, ze._)`${w}[${v}] = ${h}`);
      });
    }
    function f(h, b) {
      const v = (0, qk.useFunc)(t, Bk.default), g = t.name("outer");
      t.label(g).for((0, ze._)`;${h}--;`, () => t.for((0, ze._)`${b} = ${h}; ${b}--;`, () => t.if((0, ze._)`${v}(${n}[${h}], ${n}[${b}])`, () => {
        e.error(), t.assign(c, !1).break(g);
      })));
    }
  }
};
qu.default = Hk;
var Bu = {};
Object.defineProperty(Bu, "__esModule", { value: !0 });
const cl = ie, Vk = X, Gk = Aa, Wk = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, cl._)`{allowedValue: ${e}}`
}, Kk = {
  keyword: "const",
  $data: !0,
  error: Wk,
  code(e) {
    const { gen: t, data: n, $data: r, schemaCode: i, schema: a } = e;
    r || a && typeof a == "object" ? e.fail$data((0, cl._)`!${(0, Vk.useFunc)(t, Gk.default)}(${n}, ${i})`) : e.fail((0, cl._)`${a} !== ${n}`);
  }
};
Bu.default = Kk;
var zu = {};
Object.defineProperty(zu, "__esModule", { value: !0 });
const Fi = ie, Yk = X, Xk = Aa, Jk = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Fi._)`{allowedValues: ${e}}`
}, Qk = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Jk,
  code(e) {
    const { gen: t, data: n, $data: r, schema: i, schemaCode: a, it: s } = e;
    if (!r && i.length === 0)
      throw new Error("enum must have non-empty array");
    const o = i.length >= s.opts.loopEnum;
    let c;
    const l = () => c ?? (c = (0, Yk.useFunc)(t, Xk.default));
    let u;
    if (o || r)
      u = t.let("valid"), e.block$data(u, p);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const f = t.const("vSchema", a);
      u = (0, Fi.or)(...i.map((h, b) => d(f, b)));
    }
    e.pass(u);
    function p() {
      t.assign(u, !1), t.forOf("v", a, (f) => t.if((0, Fi._)`${l()}(${n}, ${f})`, () => t.assign(u, !0).break()));
    }
    function d(f, h) {
      const b = i[h];
      return typeof b == "object" && b !== null ? (0, Fi._)`${l()}(${n}, ${f}[${h}])` : (0, Fi._)`${n} === ${b}`;
    }
  }
};
zu.default = Qk;
Object.defineProperty(_o, "__esModule", { value: !0 });
const Zk = Iu, eD = ku, tD = Du, nD = Fu, rD = Lu, iD = Uu, aD = Mu, sD = qu, oD = Bu, cD = zu, lD = [
  // number
  Zk.default,
  eD.default,
  // string
  tD.default,
  nD.default,
  // object
  rD.default,
  iD.default,
  // array
  aD.default,
  sD.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  oD.default,
  cD.default
];
_o.default = lD;
var Eo = {}, ii = {};
Object.defineProperty(ii, "__esModule", { value: !0 });
ii.validateAdditionalItems = void 0;
const Zn = ie, ll = X, uD = {
  message: ({ params: { len: e } }) => (0, Zn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zn._)`{limit: ${e}}`
}, pD = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: uD,
  code(e) {
    const { parentSchema: t, it: n } = e, { items: r } = t;
    if (!Array.isArray(r)) {
      (0, ll.checkStrictMode)(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Fy(e, r);
  }
};
function Fy(e, t) {
  const { gen: n, schema: r, data: i, keyword: a, it: s } = e;
  s.items = !0;
  const o = n.const("len", (0, Zn._)`${i}.length`);
  if (r === !1)
    e.setParams({ len: t.length }), e.pass((0, Zn._)`${o} <= ${t.length}`);
  else if (typeof r == "object" && !(0, ll.alwaysValidSchema)(s, r)) {
    const l = n.var("valid", (0, Zn._)`${o} <= ${t.length}`);
    n.if((0, Zn.not)(l), () => c(l)), e.ok(l);
  }
  function c(l) {
    n.forRange("i", t.length, o, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: ll.Type.Num }, l), s.allErrors || n.if((0, Zn.not)(l), () => n.break());
    });
  }
}
ii.validateAdditionalItems = Fy;
ii.default = pD;
var Hu = {}, ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.validateTuple = void 0;
const _m = ie, us = X, dD = ue, fD = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: n } = e;
    if (Array.isArray(t))
      return Ly(e, "additionalItems", t);
    n.items = !0, !(0, us.alwaysValidSchema)(n, t) && e.ok((0, dD.validateArray)(e));
  }
};
function Ly(e, t, n = e.schema) {
  const { gen: r, parentSchema: i, data: a, keyword: s, it: o } = e;
  u(i), o.opts.unevaluated && n.length && o.items !== !0 && (o.items = us.mergeEvaluated.items(r, n.length, o.items));
  const c = r.name("valid"), l = r.const("len", (0, _m._)`${a}.length`);
  n.forEach((p, d) => {
    (0, us.alwaysValidSchema)(o, p) || (r.if((0, _m._)`${l} > ${d}`, () => e.subschema({
      keyword: s,
      schemaProp: d,
      dataProp: d
    }, c)), e.ok(c));
  });
  function u(p) {
    const { opts: d, errSchemaPath: f } = o, h = n.length, b = h === p.minItems && (h === p.maxItems || p[t] === !1);
    if (d.strictTuples && !b) {
      const v = `"${s}" is ${h}-tuple, but minItems or maxItems/${t} are not specified or different at path "${f}"`;
      (0, us.checkStrictMode)(o, v, d.strictTuples);
    }
  }
}
ai.validateTuple = Ly;
ai.default = fD;
Object.defineProperty(Hu, "__esModule", { value: !0 });
const mD = ai, hD = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, mD.validateTuple)(e, "items")
};
Hu.default = hD;
var Vu = {};
Object.defineProperty(Vu, "__esModule", { value: !0 });
const Em = ie, vD = X, gD = ue, yD = ii, bD = {
  message: ({ params: { len: e } }) => (0, Em.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Em._)`{limit: ${e}}`
}, xD = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: bD,
  code(e) {
    const { schema: t, parentSchema: n, it: r } = e, { prefixItems: i } = n;
    r.items = !0, !(0, vD.alwaysValidSchema)(r, t) && (i ? (0, yD.validateAdditionalItems)(e, i) : e.ok((0, gD.validateArray)(e)));
  }
};
Vu.default = xD;
var Gu = {};
Object.defineProperty(Gu, "__esModule", { value: !0 });
const Tt = ie, Xa = X, wD = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Tt.str)`must contain at least ${e} valid item(s)` : (0, Tt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Tt._)`{minContains: ${e}}` : (0, Tt._)`{minContains: ${e}, maxContains: ${t}}`
}, _D = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: wD,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: i, it: a } = e;
    let s, o;
    const { minContains: c, maxContains: l } = r;
    a.opts.next ? (s = c === void 0 ? 1 : c, o = l) : s = 1;
    const u = t.const("len", (0, Tt._)`${i}.length`);
    if (e.setParams({ min: s, max: o }), o === void 0 && s === 0) {
      (0, Xa.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && s > o) {
      (0, Xa.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Xa.alwaysValidSchema)(a, n)) {
      let b = (0, Tt._)`${u} >= ${s}`;
      o !== void 0 && (b = (0, Tt._)`${b} && ${u} <= ${o}`), e.pass(b);
      return;
    }
    a.items = !0;
    const p = t.name("valid");
    o === void 0 && s === 1 ? f(p, () => t.if(p, () => t.break())) : s === 0 ? (t.let(p, !0), o !== void 0 && t.if((0, Tt._)`${i}.length > 0`, d)) : (t.let(p, !1), d()), e.result(p, () => e.reset());
    function d() {
      const b = t.name("_valid"), v = t.let("count", 0);
      f(b, () => t.if(b, () => h(v)));
    }
    function f(b, v) {
      t.forRange("i", 0, u, (g) => {
        e.subschema({
          keyword: "contains",
          dataProp: g,
          dataPropType: Xa.Type.Num,
          compositeRule: !0
        }, b), v();
      });
    }
    function h(b) {
      t.code((0, Tt._)`${b}++`), o === void 0 ? t.if((0, Tt._)`${b} >= ${s}`, () => t.assign(p, !0).break()) : (t.if((0, Tt._)`${b} > ${o}`, () => t.assign(p, !1).break()), s === 1 ? t.assign(p, !0) : t.if((0, Tt._)`${b} >= ${s}`, () => t.assign(p, !0)));
    }
  }
};
Gu.default = _D;
var $o = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ie, n = X, r = ue;
  e.error = {
    message: ({ params: { property: c, depsCount: l, deps: u } }) => {
      const p = l === 1 ? "property" : "properties";
      return (0, t.str)`must have ${p} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: l, deps: u, missingProperty: p } }) => (0, t._)`{property: ${c},
    missingProperty: ${p},
    depsCount: ${l},
    deps: ${u}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [l, u] = a(c);
      s(c, l), o(c, u);
    }
  };
  function a({ schema: c }) {
    const l = {}, u = {};
    for (const p in c) {
      if (p === "__proto__")
        continue;
      const d = Array.isArray(c[p]) ? l : u;
      d[p] = c[p];
    }
    return [l, u];
  }
  function s(c, l = c.schema) {
    const { gen: u, data: p, it: d } = c;
    if (Object.keys(l).length === 0)
      return;
    const f = u.let("missing");
    for (const h in l) {
      const b = l[h];
      if (b.length === 0)
        continue;
      const v = (0, r.propertyInData)(u, p, h, d.opts.ownProperties);
      c.setParams({
        property: h,
        depsCount: b.length,
        deps: b.join(", ")
      }), d.allErrors ? u.if(v, () => {
        for (const g of b)
          (0, r.checkReportMissingProp)(c, g);
      }) : (u.if((0, t._)`${v} && (${(0, r.checkMissingProp)(c, b, f)})`), (0, r.reportMissingProp)(c, f), u.else());
    }
  }
  e.validatePropertyDeps = s;
  function o(c, l = c.schema) {
    const { gen: u, data: p, keyword: d, it: f } = c, h = u.name("valid");
    for (const b in l)
      (0, n.alwaysValidSchema)(f, l[b]) || (u.if(
        (0, r.propertyInData)(u, p, b, f.opts.ownProperties),
        () => {
          const v = c.subschema({ keyword: d, schemaProp: b }, h);
          c.mergeValidEvaluated(v, h);
        },
        () => u.var(h, !0)
        // TODO var
      ), c.ok(h));
  }
  e.validateSchemaDeps = o, e.default = i;
})($o);
var Wu = {};
Object.defineProperty(Wu, "__esModule", { value: !0 });
const Uy = ie, ED = X, $D = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Uy._)`{propertyName: ${e.propertyName}}`
}, SD = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: $D,
  code(e) {
    const { gen: t, schema: n, data: r, it: i } = e;
    if ((0, ED.alwaysValidSchema)(i, n))
      return;
    const a = t.name("valid");
    t.forIn("key", r, (s) => {
      e.setParams({ propertyName: s }), e.subschema({
        keyword: "propertyNames",
        data: s,
        dataTypes: ["string"],
        propertyName: s,
        compositeRule: !0
      }, a), t.if((0, Uy.not)(a), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Wu.default = SD;
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const Ja = ue, Nt = ie, TD = wt, Qa = X, AD = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Nt._)`{additionalProperty: ${e.additionalProperty}}`
}, RD = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: AD,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: i, errsCount: a, it: s } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = s;
    if (s.props = !0, c.removeAdditional !== "all" && (0, Qa.alwaysValidSchema)(s, n))
      return;
    const l = (0, Ja.allSchemaProperties)(r.properties), u = (0, Ja.allSchemaProperties)(r.patternProperties);
    p(), e.ok((0, Nt._)`${a} === ${TD.default.errors}`);
    function p() {
      t.forIn("key", i, (v) => {
        !l.length && !u.length ? h(v) : t.if(d(v), () => h(v));
      });
    }
    function d(v) {
      let g;
      if (l.length > 8) {
        const w = (0, Qa.schemaRefOrVal)(s, r.properties, "properties");
        g = (0, Ja.isOwnProperty)(t, w, v);
      } else l.length ? g = (0, Nt.or)(...l.map((w) => (0, Nt._)`${v} === ${w}`)) : g = Nt.nil;
      return u.length && (g = (0, Nt.or)(g, ...u.map((w) => (0, Nt._)`${(0, Ja.usePattern)(e, w)}.test(${v})`))), (0, Nt.not)(g);
    }
    function f(v) {
      t.code((0, Nt._)`delete ${i}[${v}]`);
    }
    function h(v) {
      if (c.removeAdditional === "all" || c.removeAdditional && n === !1) {
        f(v);
        return;
      }
      if (n === !1) {
        e.setParams({ additionalProperty: v }), e.error(), o || t.break();
        return;
      }
      if (typeof n == "object" && !(0, Qa.alwaysValidSchema)(s, n)) {
        const g = t.name("valid");
        c.removeAdditional === "failing" ? (b(v, g, !1), t.if((0, Nt.not)(g), () => {
          e.reset(), f(v);
        })) : (b(v, g), o || t.if((0, Nt.not)(g), () => t.break()));
      }
    }
    function b(v, g, w) {
      const T = {
        keyword: "additionalProperties",
        dataProp: v,
        dataPropType: Qa.Type.Str
      };
      w === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, g);
    }
  }
};
So.default = RD;
var Ku = {};
Object.defineProperty(Ku, "__esModule", { value: !0 });
const PD = At, $m = ue, $c = X, Sm = So, OD = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, parentSchema: r, data: i, it: a } = e;
    a.opts.removeAdditional === "all" && r.additionalProperties === void 0 && Sm.default.code(new PD.KeywordCxt(a, Sm.default, "additionalProperties"));
    const s = (0, $m.allSchemaProperties)(n);
    for (const p of s)
      a.definedProperties.add(p);
    a.opts.unevaluated && s.length && a.props !== !0 && (a.props = $c.mergeEvaluated.props(t, (0, $c.toHash)(s), a.props));
    const o = s.filter((p) => !(0, $c.alwaysValidSchema)(a, n[p]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const p of o)
      l(p) ? u(p) : (t.if((0, $m.propertyInData)(t, i, p, a.opts.ownProperties)), u(p), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(p), e.ok(c);
    function l(p) {
      return a.opts.useDefaults && !a.compositeRule && n[p].default !== void 0;
    }
    function u(p) {
      e.subschema({
        keyword: "properties",
        schemaProp: p,
        dataProp: p
      }, c);
    }
  }
};
Ku.default = OD;
var Yu = {};
Object.defineProperty(Yu, "__esModule", { value: !0 });
const Tm = ue, Za = ie, Am = X, Rm = X, ND = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, data: r, parentSchema: i, it: a } = e, { opts: s } = a, o = (0, Tm.allSchemaProperties)(n), c = o.filter((b) => (0, Am.alwaysValidSchema)(a, n[b]));
    if (o.length === 0 || c.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const l = s.strictSchema && !s.allowMatchingProperties && i.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof Za.Name) && (a.props = (0, Rm.evaluatedPropsToName)(t, a.props));
    const { props: p } = a;
    d();
    function d() {
      for (const b of o)
        l && f(b), a.allErrors ? h(b) : (t.var(u, !0), h(b), t.if(u));
    }
    function f(b) {
      for (const v in l)
        new RegExp(b).test(v) && (0, Am.checkStrictMode)(a, `property ${v} matches pattern ${b} (use allowMatchingProperties)`);
    }
    function h(b) {
      t.forIn("key", r, (v) => {
        t.if((0, Za._)`${(0, Tm.usePattern)(e, b)}.test(${v})`, () => {
          const g = c.includes(b);
          g || e.subschema({
            keyword: "patternProperties",
            schemaProp: b,
            dataProp: v,
            dataPropType: Rm.Type.Str
          }, u), a.opts.unevaluated && p !== !0 ? t.assign((0, Za._)`${p}[${v}]`, !0) : !g && !a.allErrors && t.if((0, Za.not)(u), () => t.break());
        });
      });
    }
  }
};
Yu.default = ND;
var Xu = {};
Object.defineProperty(Xu, "__esModule", { value: !0 });
const CD = X, ID = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: n, it: r } = e;
    if ((0, CD.alwaysValidSchema)(r, n)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Xu.default = ID;
var Ju = {};
Object.defineProperty(Ju, "__esModule", { value: !0 });
const kD = ue, DD = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: kD.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ju.default = DD;
var Qu = {};
Object.defineProperty(Qu, "__esModule", { value: !0 });
const ps = ie, jD = X, FD = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ps._)`{passingSchemas: ${e.passing}}`
}, LD = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: FD,
  code(e) {
    const { gen: t, schema: n, parentSchema: r, it: i } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && r.discriminator)
      return;
    const a = n, s = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(l), e.result(s, () => e.reset(), () => e.error(!0));
    function l() {
      a.forEach((u, p) => {
        let d;
        (0, jD.alwaysValidSchema)(i, u) ? t.var(c, !0) : d = e.subschema({
          keyword: "oneOf",
          schemaProp: p,
          compositeRule: !0
        }, c), p > 0 && t.if((0, ps._)`${c} && ${s}`).assign(s, !1).assign(o, (0, ps._)`[${o}, ${p}]`).else(), t.if(c, () => {
          t.assign(s, !0), t.assign(o, p), d && e.mergeEvaluated(d, ps.Name);
        });
      });
    }
  }
};
Qu.default = LD;
var Zu = {};
Object.defineProperty(Zu, "__esModule", { value: !0 });
const UD = X, MD = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: n, it: r } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    n.forEach((a, s) => {
      if ((0, UD.alwaysValidSchema)(r, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: s }, i);
      e.ok(i), e.mergeEvaluated(o);
    });
  }
};
Zu.default = MD;
var ep = {};
Object.defineProperty(ep, "__esModule", { value: !0 });
const ks = ie, My = X, qD = {
  message: ({ params: e }) => (0, ks.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ks._)`{failingKeyword: ${e.ifClause}}`
}, BD = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: qD,
  code(e) {
    const { gen: t, parentSchema: n, it: r } = e;
    n.then === void 0 && n.else === void 0 && (0, My.checkStrictMode)(r, '"if" without "then" and "else" is ignored');
    const i = Pm(r, "then"), a = Pm(r, "else");
    if (!i && !a)
      return;
    const s = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), i && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(o, l("then", u), l("else", u));
    } else i ? t.if(o, l("then")) : t.if((0, ks.not)(o), l("else"));
    e.pass(s, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(u);
    }
    function l(u, p) {
      return () => {
        const d = e.subschema({ keyword: u }, o);
        t.assign(s, o), e.mergeValidEvaluated(d, s), p ? t.assign(p, (0, ks._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Pm(e, t) {
  const n = e.schema[t];
  return n !== void 0 && !(0, My.alwaysValidSchema)(e, n);
}
ep.default = BD;
var tp = {};
Object.defineProperty(tp, "__esModule", { value: !0 });
const zD = X, HD = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: n }) {
    t.if === void 0 && (0, zD.checkStrictMode)(n, `"${e}" without "if" is ignored`);
  }
};
tp.default = HD;
Object.defineProperty(Eo, "__esModule", { value: !0 });
const VD = ii, GD = Hu, WD = ai, KD = Vu, YD = Gu, XD = $o, JD = Wu, QD = So, ZD = Ku, ej = Yu, tj = Xu, nj = Ju, rj = Qu, ij = Zu, aj = ep, sj = tp;
function oj(e = !1) {
  const t = [
    // any
    tj.default,
    nj.default,
    rj.default,
    ij.default,
    aj.default,
    sj.default,
    // object
    JD.default,
    QD.default,
    XD.default,
    ZD.default,
    ej.default
  ];
  return e ? t.push(GD.default, KD.default) : t.push(VD.default, WD.default), t.push(YD.default), t;
}
Eo.default = oj;
var np = {}, si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.dynamicAnchor = void 0;
const Sc = ie, cj = wt, Om = st, lj = on, uj = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => qy(e, e.schema)
};
function qy(e, t) {
  const { gen: n, it: r } = e;
  r.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, Sc._)`${cj.default.dynamicAnchors}${(0, Sc.getProperty)(t)}`, a = r.errSchemaPath === "#" ? r.validateName : pj(e);
  n.if((0, Sc._)`!${i}`, () => n.assign(i, a));
}
si.dynamicAnchor = qy;
function pj(e) {
  const { schemaEnv: t, schema: n, self: r } = e.it, { root: i, baseId: a, localRefs: s, meta: o } = t.root, { schemaId: c } = r.opts, l = new Om.SchemaEnv({ schema: n, schemaId: c, root: i, baseId: a, localRefs: s, meta: o });
  return Om.compileSchema.call(r, l), (0, lj.getValidate)(e, l);
}
si.default = uj;
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.dynamicRef = void 0;
const Nm = ie, dj = wt, Cm = on, fj = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => By(e, e.schema)
};
function By(e, t) {
  const { gen: n, keyword: r, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${r}" only supports hash fragment reference`);
  const a = t.slice(1);
  if (i.allErrors)
    s();
  else {
    const c = n.let("valid", !1);
    s(c), e.ok(c);
  }
  function s(c) {
    if (i.schemaEnv.root.dynamicAnchors[a]) {
      const l = n.let("_v", (0, Nm._)`${dj.default.dynamicAnchors}${(0, Nm.getProperty)(a)}`);
      n.if(l, o(l, c), o(i.validateName, c));
    } else
      o(i.validateName, c)();
  }
  function o(c, l) {
    return l ? () => n.block(() => {
      (0, Cm.callRef)(e, c), n.let(l, !0);
    }) : () => (0, Cm.callRef)(e, c);
  }
}
oi.dynamicRef = By;
oi.default = fj;
var rp = {};
Object.defineProperty(rp, "__esModule", { value: !0 });
const mj = si, hj = X, vj = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, mj.dynamicAnchor)(e, "") : (0, hj.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
rp.default = vj;
var ip = {};
Object.defineProperty(ip, "__esModule", { value: !0 });
const gj = oi, yj = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, gj.dynamicRef)(e, e.schema)
};
ip.default = yj;
Object.defineProperty(np, "__esModule", { value: !0 });
const bj = si, xj = oi, wj = rp, _j = ip, Ej = [bj.default, xj.default, wj.default, _j.default];
np.default = Ej;
var ap = {}, sp = {};
Object.defineProperty(sp, "__esModule", { value: !0 });
const Im = $o, $j = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Im.error,
  code: (e) => (0, Im.validatePropertyDeps)(e)
};
sp.default = $j;
var op = {};
Object.defineProperty(op, "__esModule", { value: !0 });
const Sj = $o, Tj = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Sj.validateSchemaDeps)(e)
};
op.default = Tj;
var cp = {};
Object.defineProperty(cp, "__esModule", { value: !0 });
const Aj = X, Rj = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: n }) {
    t.contains === void 0 && (0, Aj.checkStrictMode)(n, `"${e}" without "contains" is ignored`);
  }
};
cp.default = Rj;
Object.defineProperty(ap, "__esModule", { value: !0 });
const Pj = sp, Oj = op, Nj = cp, Cj = [Pj.default, Oj.default, Nj.default];
ap.default = Cj;
var lp = {}, up = {};
Object.defineProperty(up, "__esModule", { value: !0 });
const _n = ie, km = X, Ij = wt, kj = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, _n._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, Dj = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: kj,
  code(e) {
    const { gen: t, schema: n, data: r, errsCount: i, it: a } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: s, props: o } = a;
    o instanceof _n.Name ? t.if((0, _n._)`${o} !== true`, () => t.forIn("key", r, (p) => t.if(l(o, p), () => c(p)))) : o !== !0 && t.forIn("key", r, (p) => o === void 0 ? c(p) : t.if(u(o, p), () => c(p))), a.props = !0, e.ok((0, _n._)`${i} === ${Ij.default.errors}`);
    function c(p) {
      if (n === !1) {
        e.setParams({ unevaluatedProperty: p }), e.error(), s || t.break();
        return;
      }
      if (!(0, km.alwaysValidSchema)(a, n)) {
        const d = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: p,
          dataPropType: km.Type.Str
        }, d), s || t.if((0, _n.not)(d), () => t.break());
      }
    }
    function l(p, d) {
      return (0, _n._)`!${p} || !${p}[${d}]`;
    }
    function u(p, d) {
      const f = [];
      for (const h in p)
        p[h] === !0 && f.push((0, _n._)`${d} !== ${h}`);
      return (0, _n.and)(...f);
    }
  }
};
up.default = Dj;
var pp = {};
Object.defineProperty(pp, "__esModule", { value: !0 });
const er = ie, Dm = X, jj = {
  message: ({ params: { len: e } }) => (0, er.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, er._)`{limit: ${e}}`
}, Fj = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: jj,
  code(e) {
    const { gen: t, schema: n, data: r, it: i } = e, a = i.items || 0;
    if (a === !0)
      return;
    const s = t.const("len", (0, er._)`${r}.length`);
    if (n === !1)
      e.setParams({ len: a }), e.fail((0, er._)`${s} > ${a}`);
    else if (typeof n == "object" && !(0, Dm.alwaysValidSchema)(i, n)) {
      const c = t.var("valid", (0, er._)`${s} <= ${a}`);
      t.if((0, er.not)(c), () => o(c, a)), e.ok(c);
    }
    i.items = !0;
    function o(c, l) {
      t.forRange("i", l, s, (u) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: u, dataPropType: Dm.Type.Num }, c), i.allErrors || t.if((0, er.not)(c), () => t.break());
      });
    }
  }
};
pp.default = Fj;
Object.defineProperty(lp, "__esModule", { value: !0 });
const Lj = up, Uj = pp, Mj = [Lj.default, Uj.default];
lp.default = Mj;
var To = {}, dp = {};
Object.defineProperty(dp, "__esModule", { value: !0 });
const Oe = ie, qj = {
  message: ({ schemaCode: e }) => (0, Oe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Oe._)`{format: ${e}}`
}, Bj = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: qj,
  code(e, t) {
    const { gen: n, data: r, $data: i, schema: a, schemaCode: s, it: o } = e, { opts: c, errSchemaPath: l, schemaEnv: u, self: p } = o;
    if (!c.validateFormats)
      return;
    i ? d() : f();
    function d() {
      const h = n.scopeValue("formats", {
        ref: p.formats,
        code: c.code.formats
      }), b = n.const("fDef", (0, Oe._)`${h}[${s}]`), v = n.let("fType"), g = n.let("format");
      n.if((0, Oe._)`typeof ${b} == "object" && !(${b} instanceof RegExp)`, () => n.assign(v, (0, Oe._)`${b}.type || "string"`).assign(g, (0, Oe._)`${b}.validate`), () => n.assign(v, (0, Oe._)`"string"`).assign(g, b)), e.fail$data((0, Oe.or)(w(), T()));
      function w() {
        return c.strictSchema === !1 ? Oe.nil : (0, Oe._)`${s} && !${g}`;
      }
      function T() {
        const I = u.$async ? (0, Oe._)`(${b}.async ? await ${g}(${r}) : ${g}(${r}))` : (0, Oe._)`${g}(${r})`, F = (0, Oe._)`(typeof ${g} == "function" ? ${I} : ${g}.test(${r}))`;
        return (0, Oe._)`${g} && ${g} !== true && ${v} === ${t} && !${F}`;
      }
    }
    function f() {
      const h = p.formats[a];
      if (!h) {
        w();
        return;
      }
      if (h === !0)
        return;
      const [b, v, g] = T(h);
      b === t && e.pass(I());
      function w() {
        if (c.strictSchema === !1) {
          p.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${a}" ignored in schema at path "${l}"`;
        }
      }
      function T(F) {
        const O = F instanceof RegExp ? (0, Oe.regexpCode)(F) : c.code.formats ? (0, Oe._)`${c.code.formats}${(0, Oe.getProperty)(a)}` : void 0, U = n.scopeValue("formats", { key: a, ref: F, code: O });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, Oe._)`${U}.validate`] : ["string", F, U];
      }
      function I() {
        if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, Oe._)`await ${g}(${r})`;
        }
        return typeof v == "function" ? (0, Oe._)`${g}(${r})` : (0, Oe._)`${g}.test(${r})`;
      }
    }
  }
};
dp.default = Bj;
Object.defineProperty(To, "__esModule", { value: !0 });
const zj = dp, Hj = [zj.default];
To.default = Hj;
var dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.contentVocabulary = dr.metadataVocabulary = void 0;
dr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
dr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Nu, "__esModule", { value: !0 });
const Vj = wo, Gj = _o, Wj = Eo, Kj = np, Yj = ap, Xj = lp, Jj = To, jm = dr, Qj = [
  Kj.default,
  Vj.default,
  Gj.default,
  (0, Wj.default)(!0),
  Jj.default,
  jm.metadataVocabulary,
  jm.contentVocabulary,
  Yj.default,
  Xj.default
];
Nu.default = Qj;
var Ao = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
Ro.DiscrError = void 0;
var Fm;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Fm || (Ro.DiscrError = Fm = {}));
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Nr = ie, ul = Ro, Lm = st, Zj = yr, eF = X, tF = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ul.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: n } }) => (0, Nr._)`{error: ${e}, tag: ${n}, tagValue: ${t}}`
}, nF = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: tF,
  code(e) {
    const { gen: t, data: n, schema: r, parentSchema: i, it: a } = e, { oneOf: s } = i;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = r.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (r.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!s)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), l = t.const("tag", (0, Nr._)`${n}${(0, Nr.getProperty)(o)}`);
    t.if((0, Nr._)`typeof ${l} == "string"`, () => u(), () => e.error(!1, { discrError: ul.DiscrError.Tag, tag: l, tagName: o })), e.ok(c);
    function u() {
      const f = d();
      t.if(!1);
      for (const h in f)
        t.elseIf((0, Nr._)`${l} === ${h}`), t.assign(c, p(f[h]));
      t.else(), e.error(!1, { discrError: ul.DiscrError.Mapping, tag: l, tagName: o }), t.endIf();
    }
    function p(f) {
      const h = t.name("valid"), b = e.subschema({ keyword: "oneOf", schemaProp: f }, h);
      return e.mergeEvaluated(b, Nr.Name), h;
    }
    function d() {
      var f;
      const h = {}, b = g(i);
      let v = !0;
      for (let I = 0; I < s.length; I++) {
        let F = s[I];
        if (F != null && F.$ref && !(0, eF.schemaHasRulesButRef)(F, a.self.RULES)) {
          const U = F.$ref;
          if (F = Lm.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, U), F instanceof Lm.SchemaEnv && (F = F.schema), F === void 0)
            throw new Zj.default(a.opts.uriResolver, a.baseId, U);
        }
        const O = (f = F == null ? void 0 : F.properties) === null || f === void 0 ? void 0 : f[o];
        if (typeof O != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        v = v && (b || g(F)), w(O, I);
      }
      if (!v)
        throw new Error(`discriminator: "${o}" must be required`);
      return h;
      function g({ required: I }) {
        return Array.isArray(I) && I.includes(o);
      }
      function w(I, F) {
        if (I.const)
          T(I.const, F);
        else if (I.enum)
          for (const O of I.enum)
            T(O, F);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function T(I, F) {
        if (typeof I != "string" || I in h)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        h[I] = F;
      }
    }
  }
};
Ao.default = nF;
var fp = {};
const rF = "https://json-schema.org/draft/2020-12/schema", iF = "https://json-schema.org/draft/2020-12/schema", aF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, sF = "meta", oF = "Core and Validation specifications meta-schema", cF = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], lF = [
  "object",
  "boolean"
], uF = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", pF = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, dF = {
  $schema: rF,
  $id: iF,
  $vocabulary: aF,
  $dynamicAnchor: sF,
  title: oF,
  allOf: cF,
  type: lF,
  $comment: uF,
  properties: pF
}, fF = "https://json-schema.org/draft/2020-12/schema", mF = "https://json-schema.org/draft/2020-12/meta/applicator", hF = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, vF = "meta", gF = "Applicator vocabulary meta-schema", yF = [
  "object",
  "boolean"
], bF = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, xF = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, wF = {
  $schema: fF,
  $id: mF,
  $vocabulary: hF,
  $dynamicAnchor: vF,
  title: gF,
  type: yF,
  properties: bF,
  $defs: xF
}, _F = "https://json-schema.org/draft/2020-12/schema", EF = "https://json-schema.org/draft/2020-12/meta/unevaluated", $F = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, SF = "meta", TF = "Unevaluated applicator vocabulary meta-schema", AF = [
  "object",
  "boolean"
], RF = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, PF = {
  $schema: _F,
  $id: EF,
  $vocabulary: $F,
  $dynamicAnchor: SF,
  title: TF,
  type: AF,
  properties: RF
}, OF = "https://json-schema.org/draft/2020-12/schema", NF = "https://json-schema.org/draft/2020-12/meta/content", CF = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, IF = "meta", kF = "Content vocabulary meta-schema", DF = [
  "object",
  "boolean"
], jF = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, FF = {
  $schema: OF,
  $id: NF,
  $vocabulary: CF,
  $dynamicAnchor: IF,
  title: kF,
  type: DF,
  properties: jF
}, LF = "https://json-schema.org/draft/2020-12/schema", UF = "https://json-schema.org/draft/2020-12/meta/core", MF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, qF = "meta", BF = "Core vocabulary meta-schema", zF = [
  "object",
  "boolean"
], HF = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, VF = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, GF = {
  $schema: LF,
  $id: UF,
  $vocabulary: MF,
  $dynamicAnchor: qF,
  title: BF,
  type: zF,
  properties: HF,
  $defs: VF
}, WF = "https://json-schema.org/draft/2020-12/schema", KF = "https://json-schema.org/draft/2020-12/meta/format-annotation", YF = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, XF = "meta", JF = "Format vocabulary meta-schema for annotation results", QF = [
  "object",
  "boolean"
], ZF = {
  format: {
    type: "string"
  }
}, e2 = {
  $schema: WF,
  $id: KF,
  $vocabulary: YF,
  $dynamicAnchor: XF,
  title: JF,
  type: QF,
  properties: ZF
}, t2 = "https://json-schema.org/draft/2020-12/schema", n2 = "https://json-schema.org/draft/2020-12/meta/meta-data", r2 = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, i2 = "meta", a2 = "Meta-data vocabulary meta-schema", s2 = [
  "object",
  "boolean"
], o2 = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, c2 = {
  $schema: t2,
  $id: n2,
  $vocabulary: r2,
  $dynamicAnchor: i2,
  title: a2,
  type: s2,
  properties: o2
}, l2 = "https://json-schema.org/draft/2020-12/schema", u2 = "https://json-schema.org/draft/2020-12/meta/validation", p2 = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, d2 = "meta", f2 = "Validation vocabulary meta-schema", m2 = [
  "object",
  "boolean"
], h2 = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, v2 = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, g2 = {
  $schema: l2,
  $id: u2,
  $vocabulary: p2,
  $dynamicAnchor: d2,
  title: f2,
  type: m2,
  properties: h2,
  $defs: v2
};
Object.defineProperty(fp, "__esModule", { value: !0 });
const y2 = dF, b2 = wF, x2 = PF, w2 = FF, _2 = GF, E2 = e2, $2 = c2, S2 = g2, T2 = ["/properties"];
function A2(e) {
  return [
    y2,
    b2,
    x2,
    w2,
    _2,
    t(this, E2),
    $2,
    t(this, S2)
  ].forEach((n) => this.addMetaSchema(n, void 0, !1)), this;
  function t(n, r) {
    return e ? n.$dataMetaSchema(r, T2) : r;
  }
}
fp.default = A2;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const n = vu, r = Nu, i = Ao, a = fp, s = "https://json-schema.org/draft/2020-12/schema";
  class o extends n.default {
    constructor(f = {}) {
      super({
        ...f,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), r.default.forEach((f) => this.addVocabulary(f)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: f, meta: h } = this.opts;
      h && (a.default.call(this, f), this.refs["http://json-schema.org/schema"] = s);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(s) ? s : void 0);
    }
  }
  t.Ajv2020 = o, e.exports = t = o, e.exports.Ajv2020 = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
  var c = At;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var l = ie;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var u = ri;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var p = yr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return p.default;
  } });
})(nl, nl.exports);
var R2 = nl.exports, pl = { exports: {} }, zy = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(z, K) {
    return { validate: z, compare: K };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, s),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), l),
    "date-time": t(d(!0), f),
    "iso-time": t(c(), u),
    "iso-date-time": t(d(), h),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: Y,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: T,
    // signed 32 bit integer
    int32: { type: "number", validate: O },
    // signed 64 bit integer
    int64: { type: "number", validate: U },
    // C-type float
    float: { type: "number", validate: V },
    // C-type double
    double: { type: "number", validate: V },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, s),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, l),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, h),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function n(z) {
    return z % 4 === 0 && (z % 100 !== 0 || z % 400 === 0);
  }
  const r = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(z) {
    const K = r.exec(z);
    if (!K)
      return !1;
    const J = +K[1], D = +K[2], j = +K[3];
    return D >= 1 && D <= 12 && j >= 1 && j <= (D === 2 && n(J) ? 29 : i[D]);
  }
  function s(z, K) {
    if (z && K)
      return z > K ? 1 : z < K ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(z) {
    return function(J) {
      const D = o.exec(J);
      if (!D)
        return !1;
      const j = +D[1], G = +D[2], N = +D[3], B = D[4], H = D[5] === "-" ? -1 : 1, M = +(D[6] || 0), S = +(D[7] || 0);
      if (M > 23 || S > 59 || z && !B)
        return !1;
      if (j <= 23 && G <= 59 && N < 60)
        return !0;
      const k = G - S * H, R = j - M * H - (k < 0 ? 1 : 0);
      return (R === 23 || R === -1) && (k === 59 || k === -1) && N < 61;
    };
  }
  function l(z, K) {
    if (!(z && K))
      return;
    const J = (/* @__PURE__ */ new Date("2020-01-01T" + z)).valueOf(), D = (/* @__PURE__ */ new Date("2020-01-01T" + K)).valueOf();
    if (J && D)
      return J - D;
  }
  function u(z, K) {
    if (!(z && K))
      return;
    const J = o.exec(z), D = o.exec(K);
    if (J && D)
      return z = J[1] + J[2] + J[3], K = D[1] + D[2] + D[3], z > K ? 1 : z < K ? -1 : 0;
  }
  const p = /t|\s/i;
  function d(z) {
    const K = c(z);
    return function(D) {
      const j = D.split(p);
      return j.length === 2 && a(j[0]) && K(j[1]);
    };
  }
  function f(z, K) {
    if (!(z && K))
      return;
    const J = new Date(z).valueOf(), D = new Date(K).valueOf();
    if (J && D)
      return J - D;
  }
  function h(z, K) {
    if (!(z && K))
      return;
    const [J, D] = z.split(p), [j, G] = K.split(p), N = s(J, j);
    if (N !== void 0)
      return N || l(D, G);
  }
  const b = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(z) {
    return b.test(z) && v.test(z);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function T(z) {
    return w.lastIndex = 0, w.test(z);
  }
  const I = -(2 ** 31), F = 2 ** 31 - 1;
  function O(z) {
    return Number.isInteger(z) && z <= F && z >= I;
  }
  function U(z) {
    return Number.isInteger(z);
  }
  function V() {
    return !0;
  }
  const _ = /[^\\]\\Z/;
  function Y(z) {
    if (_.test(z))
      return !1;
    try {
      return new RegExp(z), !0;
    } catch {
      return !1;
    }
  }
})(zy);
var Hy = {}, dl = { exports: {} }, mp = {};
Object.defineProperty(mp, "__esModule", { value: !0 });
const P2 = wo, O2 = _o, N2 = Eo, C2 = To, Um = dr, I2 = [
  P2.default,
  O2.default,
  (0, N2.default)(),
  C2.default,
  Um.metadataVocabulary,
  Um.contentVocabulary
];
mp.default = I2;
const k2 = "http://json-schema.org/draft-07/schema#", D2 = "http://json-schema.org/draft-07/schema#", j2 = "Core schema meta-schema", F2 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, L2 = [
  "object",
  "boolean"
], U2 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, M2 = {
  $schema: k2,
  $id: D2,
  title: j2,
  definitions: F2,
  type: L2,
  properties: U2,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const n = vu, r = mp, i = Ao, a = M2, s = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class c extends n.default {
    _addVocabularies() {
      super._addVocabularies(), r.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const h = this.opts.$data ? this.$dataMetaSchema(a, s) : a;
      this.addMetaSchema(h, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var l = At;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return l.KeywordCxt;
  } });
  var u = ie;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var p = ri;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return p.default;
  } });
  var d = yr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return d.default;
  } });
})(dl, dl.exports);
var q2 = dl.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = q2, n = ie, r = n.operators, i = {
    formatMaximum: { okStr: "<=", ok: r.LTE, fail: r.GT },
    formatMinimum: { okStr: ">=", ok: r.GTE, fail: r.LT },
    formatExclusiveMaximum: { okStr: "<", ok: r.LT, fail: r.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: r.GT, fail: r.LTE }
  }, a = {
    message: ({ keyword: o, schemaCode: c }) => (0, n.str)`should be ${i[o].okStr} ${c}`,
    params: ({ keyword: o, schemaCode: c }) => (0, n._)`{comparison: ${i[o].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(o) {
      const { gen: c, data: l, schemaCode: u, keyword: p, it: d } = o, { opts: f, self: h } = d;
      if (!f.validateFormats)
        return;
      const b = new t.KeywordCxt(d, h.RULES.all.format.definition, "format");
      b.$data ? v() : g();
      function v() {
        const T = c.scopeValue("formats", {
          ref: h.formats,
          code: f.code.formats
        }), I = c.const("fmt", (0, n._)`${T}[${b.schemaCode}]`);
        o.fail$data((0, n.or)((0, n._)`typeof ${I} != "object"`, (0, n._)`${I} instanceof RegExp`, (0, n._)`typeof ${I}.compare != "function"`, w(I)));
      }
      function g() {
        const T = b.schema, I = h.formats[T];
        if (!I || I === !0)
          return;
        if (typeof I != "object" || I instanceof RegExp || typeof I.compare != "function")
          throw new Error(`"${p}": format "${T}" does not define "compare" function`);
        const F = c.scopeValue("formats", {
          key: T,
          ref: I,
          code: f.code.formats ? (0, n._)`${f.code.formats}${(0, n.getProperty)(T)}` : void 0
        });
        o.fail$data(w(F));
      }
      function w(T) {
        return (0, n._)`${T}.compare(${l}, ${u}) ${i[p].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const s = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = s;
})(Hy);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const n = zy, r = Hy, i = ie, a = new i.Name("fullFormats"), s = new i.Name("fastFormats"), o = (l, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(l, u, n.fullFormats, a), l;
    const [p, d] = u.mode === "fast" ? [n.fastFormats, s] : [n.fullFormats, a], f = u.formats || n.formatNames;
    return c(l, f, p, d), u.keywords && (0, r.default)(l), l;
  };
  o.get = (l, u = "full") => {
    const d = (u === "fast" ? n.fastFormats : n.fullFormats)[l];
    if (!d)
      throw new Error(`Unknown format "${l}"`);
    return d;
  };
  function c(l, u, p, d) {
    var f, h;
    (f = (h = l.opts.code).formats) !== null && f !== void 0 || (h.formats = (0, i._)`require("ajv-formats/dist/formats").${d}`);
    for (const b of u)
      l.addFormat(b, p[b]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(pl, pl.exports);
var B2 = pl.exports;
const z2 = /* @__PURE__ */ la(B2), H2 = (e, t, n, r) => {
  if (n === "length" || n === "prototype" || n === "arguments" || n === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, n), a = Object.getOwnPropertyDescriptor(t, n);
  !V2(i, a) && r || Object.defineProperty(e, n, a);
}, V2 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, G2 = (e, t) => {
  const n = Object.getPrototypeOf(t);
  n !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, n);
}, W2 = (e, t) => `/* Wrapped ${e}*/
${t}`, K2 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Y2 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), X2 = (e, t, n) => {
  const r = n === "" ? "" : `with ${n.trim()}() `, i = W2.bind(null, r, t.toString());
  Object.defineProperty(i, "name", Y2);
  const { writable: a, enumerable: s, configurable: o } = K2;
  Object.defineProperty(e, "toString", { value: i, writable: a, enumerable: s, configurable: o });
};
function J2(e, t, { ignoreNonConfigurable: n = !1 } = {}) {
  const { name: r } = e;
  for (const i of Reflect.ownKeys(t))
    H2(e, t, i, n);
  return G2(e, t), X2(e, t, r), e;
}
const Mm = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: n = 0,
    maxWait: r = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: a = !0
  } = t;
  if (n < 0 || r < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !a)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let s, o, c;
  const l = function(...u) {
    const p = this, d = () => {
      s = void 0, o && (clearTimeout(o), o = void 0), a && (c = e.apply(p, u));
    }, f = () => {
      o = void 0, s && (clearTimeout(s), s = void 0), a && (c = e.apply(p, u));
    }, h = i && !s;
    return clearTimeout(s), s = setTimeout(d, n), r > 0 && r !== Number.POSITIVE_INFINITY && !o && (o = setTimeout(f, r)), h && (c = e.apply(p, u)), c;
  };
  return J2(l, e), l.cancel = () => {
    s && (clearTimeout(s), s = void 0), o && (clearTimeout(o), o = void 0);
  }, l;
}, Q2 = Object.prototype.toString, Z2 = "[object Uint8Array]", eL = "[object ArrayBuffer]";
function Vy(e, t, n) {
  return e ? e.constructor === t ? !0 : Q2.call(e) === n : !1;
}
function Gy(e) {
  return Vy(e, Uint8Array, Z2);
}
function tL(e) {
  return Vy(e, ArrayBuffer, eL);
}
function nL(e) {
  return Gy(e) || tL(e);
}
function rL(e) {
  if (!Gy(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function iL(e) {
  if (!nL(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function qm(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, a) => i + a.length, 0));
  const n = new Uint8Array(t);
  let r = 0;
  for (const i of e)
    rL(i), n.set(i, r), r += i.length;
  return n;
}
const es = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Bm(e, t = "utf8") {
  return iL(e), es[t] ?? (es[t] = new globalThis.TextDecoder(t)), es[t].decode(e);
}
function aL(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const sL = new globalThis.TextEncoder();
function Tc(e) {
  return aL(e), sL.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const oL = z2.default, zm = "aes-256-cbc", Pr = () => /* @__PURE__ */ Object.create(null), cL = (e) => e != null, lL = (e, t) => {
  const n = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), r = typeof t;
  if (n.has(r))
    throw new TypeError(`Setting a value of type \`${r}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, ds = "__internal__", Ac = `${ds}.migrations.version`;
var Tn, Zt, bt, en;
class uL {
  constructor(t = {}) {
    vi(this, "path");
    vi(this, "events");
    gi(this, Tn);
    gi(this, Zt);
    gi(this, bt);
    gi(this, en, {});
    vi(this, "_deserialize", (t) => JSON.parse(t));
    vi(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const n = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!n.cwd) {
      if (!n.projectName)
        throw new Error("Please specify the `projectName` option.");
      n.cwd = _N(n.projectName, { suffix: n.projectSuffix }).config;
    }
    if (yi(this, bt, n), n.schema) {
      if (typeof n.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const s = new R2.Ajv2020({
        allErrors: !0,
        useDefaults: !0
      });
      oL(s);
      const o = {
        type: "object",
        properties: n.schema
      };
      yi(this, Tn, s.compile(o));
      for (const [c, l] of Object.entries(n.schema))
        l != null && l.default && (we(this, en)[c] = l.default);
    }
    n.defaults && yi(this, en, {
      ...we(this, en),
      ...n.defaults
    }), n.serialize && (this._serialize = n.serialize), n.deserialize && (this._deserialize = n.deserialize), this.events = new EventTarget(), yi(this, Zt, n.encryptionKey);
    const r = n.fileExtension ? `.${n.fileExtension}` : "";
    this.path = le.resolve(n.cwd, `${n.configName ?? "config"}${r}`);
    const i = this.store, a = Object.assign(Pr(), n.defaults, i);
    if (n.migrations) {
      if (!n.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(n.migrations, n.projectVersion, n.beforeEachMigration);
    }
    this._validate(a);
    try {
      rb.deepEqual(i, a);
    } catch {
      this.store = a;
    }
    n.watch && this._watch();
  }
  get(t, n) {
    if (we(this, bt).accessPropertiesByDotNotation)
      return this._get(t, n);
    const { store: r } = this;
    return t in r ? r[t] : n;
  }
  set(t, n) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && n === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${ds} key, as it's used to manage this module internal operations.`);
    const { store: r } = this, i = (a, s) => {
      lL(a, s), we(this, bt).accessPropertiesByDotNotation ? im(r, a, s) : r[a] = s;
    };
    if (typeof t == "object") {
      const a = t;
      for (const [s, o] of Object.entries(a))
        i(s, o);
    } else
      i(t, n);
    this.store = r;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(t) {
    return we(this, bt).accessPropertiesByDotNotation ? yN(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const n of t)
      cL(we(this, en)[n]) && this.set(n, we(this, en)[n]);
  }
  delete(t) {
    const { store: n } = this;
    we(this, bt).accessPropertiesByDotNotation ? gN(n, t) : delete n[t], this.store = n;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = Pr();
    for (const t of Object.keys(we(this, en)))
      this.reset(t);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(t, n) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof n != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof n}`);
    return this._handleChange(() => this.get(t), n);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const t = ce.readFileSync(this.path, we(this, Zt) ? null : "utf8"), n = this._encryptData(t), r = this._deserialize(n);
      return this._validate(r), Object.assign(Pr(), r);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), Pr();
      if (we(this, bt).clearInvalidConfig && t.name === "SyntaxError")
        return Pr();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, n] of Object.entries(this.store))
      yield [t, n];
  }
  _encryptData(t) {
    if (!we(this, Zt))
      return typeof t == "string" ? t : Bm(t);
    try {
      const n = t.slice(0, 16), r = bi.pbkdf2Sync(we(this, Zt), n.toString(), 1e4, 32, "sha512"), i = bi.createDecipheriv(zm, r, n), a = t.slice(17), s = typeof a == "string" ? Tc(a) : a;
      return Bm(qm([i.update(s), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, n) {
    let r = t();
    const i = () => {
      const a = r, s = t();
      nb(s, a) || (r = s, n.call(this, s, a));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!we(this, Tn) || we(this, Tn).call(this, t) || !we(this, Tn).errors)
      return;
    const r = we(this, Tn).errors.map(({ instancePath: i, message: a = "" }) => `\`${i.slice(1)}\` ${a}`);
    throw new Error("Config schema violation: " + r.join("; "));
  }
  _ensureDirectory() {
    ce.mkdirSync(le.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let n = this._serialize(t);
    if (we(this, Zt)) {
      const r = bi.randomBytes(16), i = bi.pbkdf2Sync(we(this, Zt), r.toString(), 1e4, 32, "sha512"), a = bi.createCipheriv(zm, i, r);
      n = qm([r, Tc(":"), a.update(Tc(n)), a.final()]);
    }
    if (De.env.SNAP)
      ce.writeFileSync(this.path, n, { mode: we(this, bt).configFileMode });
    else
      try {
        Gg(this.path, n, { mode: we(this, bt).configFileMode });
      } catch (r) {
        if ((r == null ? void 0 : r.code) === "EXDEV") {
          ce.writeFileSync(this.path, n, { mode: we(this, bt).configFileMode });
          return;
        }
        throw r;
      }
  }
  _watch() {
    this._ensureDirectory(), ce.existsSync(this.path) || this._write(Pr()), De.platform === "win32" ? ce.watch(this.path, { persistent: !1 }, Mm(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : ce.watchFile(this.path, { persistent: !1 }, Mm(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, n, r) {
    let i = this._get(Ac, "0.0.0");
    const a = Object.keys(t).filter((o) => this._shouldPerformMigration(o, i, n));
    let s = { ...this.store };
    for (const o of a)
      try {
        r && r(this, {
          fromVersion: i,
          toVersion: o,
          finalVersion: n,
          versions: a
        });
        const c = t[o];
        c == null || c(this), this._set(Ac, o), i = o, s = { ...this.store };
      } catch (c) {
        throw this.store = s, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !$r.eq(i, n)) && this._set(Ac, n);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === ds ? !0 : typeof t != "string" ? !1 : we(this, bt).accessPropertiesByDotNotation ? !!t.startsWith(`${ds}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return $r.clean(t) === null;
  }
  _shouldPerformMigration(t, n, r) {
    return this._isVersionInRangeFormat(t) ? n !== "0.0.0" && $r.satisfies(n, t) ? !1 : $r.satisfies(r, t) : !($r.lte(t, n) || $r.gt(t, r));
  }
  _get(t, n) {
    return vN(this.store, t, n);
  }
  _set(t, n) {
    const { store: r } = this;
    im(r, t, n), this.store = r;
  }
}
Tn = new WeakMap(), Zt = new WeakMap(), bt = new WeakMap(), en = new WeakMap();
let Hm = !1;
const Vm = () => {
  if (!me || !nt)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: nt.getPath("userData"),
    appVersion: nt.getVersion()
  };
  return Hm || (me.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Hm = !0), e;
};
class hp extends uL {
  constructor(t) {
    let n, r;
    if (De.type === "renderer") {
      const i = In.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: n, appVersion: r } = i);
    } else me && nt && ({ defaultCwd: n, appVersion: r } = Vm());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = r), t.cwd ? t.cwd = le.isAbsolute(t.cwd) ? t.cwd : le.join(n, t.cwd) : t.cwd = n, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Vm();
  }
  async openInEditor() {
    const t = await Ds.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
const pL = "export", Gm = new hp(), dL = async (e) => {
  if (Ee.existsSync(e))
    try {
      await Ee.promises.unlink(e);
    } catch (t) {
      console.warn("error during cleanup:", t);
    }
};
me.handle(
  `${pL}-pdf`,
  async (e, t) => {
    const n = pe.join(nt.getPath("temp"), "pdf-exports"), r = pe.join(n, "temporal-template.html");
    Ee.mkdirSync(n, { recursive: !0 }), Ee.writeFileSync(r, t.template);
    let i = null, a = "";
    try {
      i = new fr({
        width: 595,
        height: 842,
        show: !1,
        webPreferences: { nodeIntegration: !0 }
      }), a = pe.join(n, `temp-${Date.now()}.html`), await Ee.promises.copyFile(r, a), await i.loadFile(a), await new Promise((p) => setTimeout(p, 1e3));
      const s = {
        printBackground: !0,
        ...t == null ? void 0 : t.config
      }, o = await i.webContents.printToPDF(s), c = Gm.get("lastSavePath") || nt.getPath("documents"), { canceled: l, filePath: u } = await Km.showSaveDialog({
        defaultPath: pe.join(c, "Prescription - Patient Care.pdf"),
        filters: [{ name: "PDF", extensions: ["pdf"] }],
        properties: ["createDirectory"]
      });
      return l || !u ? { success: !1, canceled: !0 } : (Gm.set("lastSavePath", pe.dirname(u)), await Ee.promises.writeFile(u, o), { success: !0, path: u });
    } catch (s) {
      return console.error("error generating PDF:", s), {
        success: !1,
        error: s instanceof Error ? s.message : "unknown error"
      };
    } finally {
      Ee.unlinkSync(r), await dL(a), i && i.destroy();
    }
  }
);
const vp = "print";
me.handle(
  `${vp}-load-printers`,
  async (e) => new Promise((t) => {
    const n = new fr({
      show: !1,
      webPreferences: {
        nodeIntegration: !0,
        contextIsolation: !1
      }
    });
    n.loadURL("about:blank"), n.webContents.on("did-finish-load", async () => {
      try {
        const r = await n.webContents.getPrintersAsync();
        t(r);
      } catch (r) {
        console.error("Error getting printers:", r), t([]);
      } finally {
        n.close();
      }
    });
  })
);
me.handle(
  `${vp}-silent`,
  async (e, t) => {
    if (!t.template || !t.printer)
      return { success: !1, error: "No template or printer provided" };
    const n = pe.join(nt.getPath("temp"), "silent-prints"), r = pe.join(n, "temporal-template.html");
    Ee.mkdirSync(n, { recursive: !0 }), Ee.writeFileSync(r, t.template);
    const i = new fr({
      show: !1,
      webPreferences: {
        nodeIntegration: !0,
        contextIsolation: !1
      }
    });
    return i.loadFile(r), new Promise((a) => {
      i.webContents.on("did-finish-load", () => {
        i.webContents.print(
          {
            silent: !0,
            printBackground: !0,
            deviceName: t.printer,
            ...t.config
          },
          async (s, o) => {
            try {
              Ee.unlinkSync(r);
            } catch (c) {
              console.warn("Error cleaning up temporary file:", c);
            }
            a(s ? { success: !0 } : { success: !1, error: o || "Print failed" });
          }
        );
      }), i.on("closed", () => {
        i.destroy();
      }), i && i.destroy();
    });
  }
);
me.handle(
  `${vp}-not-silent`,
  async (e, t) => {
    if (!t.template)
      return { success: !1, error: "No template" };
    const n = pe.join(nt.getPath("temp"), "not-silent-prints");
    Ee.mkdirSync(n, { recursive: !0 });
    const r = pe.join(n, "temporal-template.html");
    Ee.writeFileSync(r, t.template);
    const i = new fr({
      show: !1,
      webPreferences: {
        nodeIntegration: !0,
        contextIsolation: !1
      }
    });
    return i.loadFile(r), new Promise((a) => {
      i.webContents.on("did-finish-load", () => {
        i.webContents.print(
          { silent: !1, printBackground: !0, ...t.config },
          async (s, o) => {
            try {
              Ee.unlinkSync(r);
            } catch (c) {
              console.warn("Error cleaning up temporary file:", c);
            }
            a(s ? { success: !0 } : { success: !1, error: o || "Print failed" });
          }
        );
      }), i.on("closed", () => {
        i.destroy();
      }), i && i.destroy();
    });
  }
);
const fL = "converter";
me.handle(
  `${fL}-image-64`,
  async (e, t) => {
    try {
      const n = await fetch(t);
      if (!n.ok)
        throw new Error(`HTTP error! status: ${n.status}`);
      const r = await n.arrayBuffer();
      return `data:image/png;base64,${Buffer.from(r).toString("base64")}`;
    } catch (n) {
      throw console.error(`Ocurrió un error al obtener la imagen: ${n}`), new Error("Ocurrió un error al convertir la imagen a base64");
    }
  }
);
const gp = "file-explorer", Wm = new hp();
me.handle(
  `${gp}-open-file`,
  async (e, t) => {
    await Ds.openPath(t);
  }
);
me.handle(
  `${gp}-open-folder`,
  async (e, t) => {
    await Ds.showItemInFolder(t);
  }
);
me.handle(
  `${gp}-save-image`,
  async (e, t) => {
    const n = Wm.get("lastSavePath") || nt.getPath("documents"), r = await Km.showSaveDialog({
      defaultPath: pe.join(n, "image.jpg"),
      filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }]
    });
    if (!r.canceled && r.filePath)
      try {
        const i = await oe.get(t, {
          responseType: "arraybuffer"
        });
        return await Ee.promises.writeFile(r.filePath, i.data), Wm.set("lastSavePath", pe.dirname(r.filePath)), !0;
      } catch (i) {
        console.error("Error downloading or saving the file:", i);
      }
  }
);
const Wy = new hp(), Ky = "config";
me.handle(`${Ky}-load`, async (e) => Wy.store || {});
me.handle(`${Ky}-save`, async (e, t) => {
  Object.keys(t).forEach((n) => {
    Wy.set(n, t[n]);
  });
});
const mL = "external-link";
me.handle(
  `${mL}-open`,
  async (e, t) => {
    try {
      await Ds.openExternal(t);
    } catch (n) {
      console.error(`Failed to open link: ${t}`, n);
    }
  }
);
an.autoUpdater.autoDownload = !1;
an.autoUpdater.autoInstallOnAppQuit = !0;
const hL = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
bR.config({ path: hL });
const sa = le.dirname(tb(import.meta.url));
process.env.APP_ROOT = le.join(sa, "..");
const oa = process.env.VITE_DEV_SERVER_URL, YL = le.join(process.env.APP_ROOT, "dist-electron"), yp = le.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = oa ? le.join(process.env.APP_ROOT, "public") : yp;
let Ce, He;
function Yy() {
  Ce = new fr({
    title: "Medelle",
    icon: le.join(sa, "../build/icon.ico"),
    frame: !0,
    show: !1,
    resizable: !0,
    fullscreenable: !0,
    autoHideMenuBar: !0,
    width: 1040,
    height: 807,
    minWidth: 1040,
    minHeight: 807,
    webPreferences: {
      preload: le.join(sa, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), oa ? Ce.loadURL(oa) : Ce.loadFile(le.join(yp, "index.html"));
}
function vL() {
  He = new fr({
    title: "Medelle - Actualización",
    icon: le.join(sa, "../build/icon.ico"),
    width: 400,
    height: 250,
    show: !1,
    frame: !1,
    resizable: !1,
    fullscreenable: !1,
    webPreferences: {
      preload: le.join(sa, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), oa ? He.loadURL(`${oa}/updater.html`) : He.loadFile(le.join(yp, "updater.html")), He.once("ready-to-show", () => {
    He == null || He.show(), an.autoUpdater.checkForUpdates(), Po({
      status: "checking",
      message: `${nt.getVersion()}`
    });
  }), He.on("closed", () => {
    He = void 0, Ce != null && Ce.isVisible() || nt.quit();
  });
}
function Po(e) {
  He == null || He.webContents.send("update-message", e);
}
nt.whenReady().then(() => {
  if (Yy(), process.env.NODE_ENV === "development") {
    Ce == null || Ce.maximize(), Ce == null || Ce.show();
    return;
  }
  vL();
});
an.autoUpdater.on("update-available", (e) => {
  Po({
    status: "available",
    message: `${e.version}`
  }), an.autoUpdater.downloadUpdate();
});
an.autoUpdater.on("update-not-available", () => {
  He == null || He.close(), Ce == null || Ce.maximize(), Ce == null || Ce.show();
});
an.autoUpdater.on("error", (e) => {
  Po({
    status: "error",
    message: `Error: ${e.message}`
  }), setTimeout(() => {
    nt.quit(), Ce = void 0, He = void 0;
  }, 2e3);
});
an.autoUpdater.on("update-downloaded", () => {
  Po({
    status: "downloaded"
  }), setTimeout(() => {
    an.autoUpdater.quitAndInstall();
  }, 1500);
});
nt.on("window-all-closed", () => {
  process.platform !== "darwin" && (nt.quit(), Ce = void 0, He = void 0);
});
nt.on("activate", () => {
  fr.getAllWindows().length === 0 && Yy();
});
export {
  YL as MAIN_DIST,
  yp as RENDERER_DIST,
  oa as VITE_DEV_SERVER_URL
};
