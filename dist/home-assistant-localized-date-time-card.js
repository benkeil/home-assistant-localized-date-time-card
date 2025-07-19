var Et = Object.defineProperty, wt = Object.defineProperties;
var St = Object.getOwnPropertyDescriptors;
var Q = Object.getOwnPropertySymbols;
var Ct = Object.prototype.hasOwnProperty, Pt = Object.prototype.propertyIsEnumerable;
var X = (n, t, e) => t in n ? Et(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, b = (n, t) => {
  for (var e in t || (t = {}))
    Ct.call(t, e) && X(n, e, t[e]);
  if (Q)
    for (var e of Q(t))
      Pt.call(t, e) && X(n, e, t[e]);
  return n;
}, Y = (n, t) => wt(n, St(t));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, W = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (W && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xt = (n) => new gt(typeof n == "string" ? n : n + "", void 0, F), Ot = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[o + 1], n[0]);
  return new gt(e, n, F);
}, Tt = (n, t) => {
  if (W) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = N.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, et = W ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return xt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ut, defineProperty: Dt, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Ht, getOwnPropertySymbols: Nt, getPrototypeOf: Rt } = Object, g = globalThis, st = g.trustedTypes, zt = st ? st.emptyScript : "", I = g.reactiveElementPolyfillSupport, x = (n, t) => n, R = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? zt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch (s) {
        e = null;
      }
  }
  return e;
} }, G = (n, t) => !Ut(n, t), it = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: G };
var ct, dt;
(ct = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (dt = g.litPropertyMetadata) != null || (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = it) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Dt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    var r;
    const { get: i, set: o } = (r = Mt(this.prototype, t)) != null ? r : { get() {
      return this[e];
    }, set(h) {
      this[e] = h;
    } };
    return { get: i, set(h) {
      const a = i == null ? void 0 : i.call(this);
      o == null || o.call(this, h), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : it;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Rt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [...Ht(e), ...Nt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(et(i));
    } else t !== void 0 && e.push(et(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return Tt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : R).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r, h;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : R;
      this._$Em = i;
      const c = l.fromAttribute(e, a.type);
      this[i] = (h = c != null ? c : (r = this._$Ej) == null ? void 0 : r.get(i)) != null ? h : c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i, o;
    if (t !== void 0) {
      const r = this.constructor, h = this[t];
      if (s != null || (s = r.getPropertyOptions(t)), !(((i = s.hasChanged) != null ? i : G)(h, e) || s.useDefault && s.reflect && h === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, r) {
    var h, a, l;
    s && !((h = this._$Ej) != null ? h : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = r != null ? r : e) != null ? a : this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, h] of this._$Ep) this[r] = h;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, h] of o) {
        const { wrapped: a } = h, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, h, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
var pt;
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[x("elementProperties")] = /* @__PURE__ */ new Map(), E[x("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: E }), ((pt = g.reactiveElementVersions) != null ? pt : g.reactiveElementVersions = []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, z = O.trustedTypes, nt = z ? z.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, _t = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + f, Lt = `<${mt}>`, A = document, T = () => A.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", J = Array.isArray, jt = (n) => J(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, ot = />/g, _ = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, ht = /"/g, yt = /^(?:script|style|textarea|title)$/i, kt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), At = kt(1), S = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), lt = /* @__PURE__ */ new WeakMap(), m = A.createTreeWalker(A, 129);
function vt(n, t) {
  if (!J(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const It = (n, t) => {
  const e = n.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = P;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let l, c, d = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, c = r.exec(a), c !== null); ) u = r.lastIndex, r === P ? c[1] === "!--" ? r = rt : c[1] !== void 0 ? r = ot : c[2] !== void 0 ? (yt.test(c[2]) && (i = RegExp("</" + c[2], "g")), r = _) : c[3] !== void 0 && (r = _) : r === _ ? c[0] === ">" ? (r = i != null ? i : P, d = -1) : c[1] === void 0 ? d = -2 : (d = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? _ : c[3] === '"' ? ht : at) : r === ht || r === at ? r = _ : r === rt || r === ot ? r = P : (r = _, i = void 0);
    const $ = r === _ && n[h + 1].startsWith("/>") ? " " : "";
    o += r === P ? a + Lt : d >= 0 ? (s.push(l), a.slice(0, d) + _t + a.slice(d) + f + $) : a + f + (d === -2 ? h : $);
  }
  return [vt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class D {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const h = t.length - 1, a = this.parts, [l, c] = It(t, e);
    if (this.el = D.createElement(l, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(_t)) {
          const u = c[r++], $ = i.getAttribute(d).split(f), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: H[2], strings: $, ctor: H[1] === "." ? Vt : H[1] === "?" ? qt : H[1] === "@" ? Wt : j }), i.removeAttribute(d);
        } else d.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (yt.test(i.tagName)) {
          const d = i.textContent.split(f), u = d.length - 1;
          if (u > 0) {
            i.textContent = z ? z.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(d[$], T()), m.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[u], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === mt) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(f, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(n, t, e = n, s) {
  var r, h, a;
  if (t === S) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(n), i._$AT(n, e, s)), s !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[s] = i : e._$Cl = i), i !== void 0 && (t = C(n, i._$AS(n, t.values), i, s)), t;
}
class Bt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var l;
    const { el: { content: e }, parts: s } = this._$AD, i = ((l = t == null ? void 0 : t.creationScope) != null ? l : A).importNode(e, !0);
    m.currentNode = i;
    let o = m.nextNode(), r = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new M(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Ft(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      r !== (a == null ? void 0 : a.index) && (o = m.nextNode(), r++);
    }
    return m.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, s, i) {
    var o;
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (o = i == null ? void 0 : i.isConnected) != null ? o : !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), U(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = D.createElement(vt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const r = new Bt(i, this), h = r.u(this.options);
      r.p(e), this.T(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = lt.get(t.strings);
    return e === void 0 && lt.set(t.strings, e = new D(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new M(this.O(T()), this.O(T()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = C(this, t, e, 0), r = !U(t) || t !== this._$AH && t !== S, r && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = C(this, h[s + a], e, a), l === S && (l = this._$AH[a]), r || (r = !U(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Vt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class qt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Wt extends j {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = C(this, t, e, 0)) != null ? r : p) === S) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) == null ? void 0 : e.host) != null ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ft {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const V = O.litHtmlPolyfillSupport;
var ut;
V == null || V(D, M), ((ut = O.litHtmlVersions) != null ? ut : O.litHtmlVersions = []).push("3.3.1");
const Gt = (n, t, e) => {
  var o, r;
  const s = (o = e == null ? void 0 : e.renderBefore) != null ? o : t;
  let i = s._$litPart$;
  if (i === void 0) {
    const h = (r = e == null ? void 0 : e.renderBefore) != null ? r : null;
    s._$litPart$ = i = new M(t.insertBefore(T(), h), h, void 0, e != null ? e : {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class w extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, s;
    const t = super.createRenderRoot();
    return (s = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var $t;
w._$litElement$ = !0, w.finalized = !0, ($t = y.litElementHydrateSupport) == null || $t.call(y, { LitElement: w });
const q = y.litElementPolyfillSupport;
q == null || q({ LitElement: w });
var ft;
((ft = y.litElementVersions) != null ? ft : y.litElementVersions = []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: G }, Kt = (n = Jt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), s === "accessor") {
    const { name: r } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(r, a, n);
    }, init(h) {
      return h !== void 0 && this.C(r, void 0, n, h), h;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(h) {
      const a = this[r];
      t.call(this, h), this.requestUpdate(r, a, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function k(n) {
  return (t, e) => typeof e == "object" ? Kt(n, t, e) : ((s, i, o) => {
    const r = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(n, t, e);
}
var Zt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, K = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Qt(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Zt(t, e, i), i;
};
const Xt = "main", Yt = "https://github.com/benkeil/home-assistant-localized-date-time-card";
console.groupCollapsed(`%cLocalized Date Time Card ${Xt}`, "color:black; font-weight: bold; background: tomato; padding: 2px; border-radius: 5px;");
console.log(`Github repository: ${Yt}`);
console.groupEnd();
window.customCards = [
  ...window.customCards,
  {
    type: "localized-date-time-card",
    name: "Localized Date Time Card",
    description: "Display Date and/or Time in a card in your localewith optional sensor entity support.",
    preview: !0
  }
];
let v = class extends w {
  static getConfigElement() {
    return document.createElement("localized-date-time-card-editor");
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      rows: 2,
      columns: 6,
      min_rows: 2
    };
  }
  getDateTime() {
    var i, o, r;
    const n = (o = (i = this.config) == null ? void 0 : i.entity) == null ? void 0 : o.entity;
    if (!n) return /* @__PURE__ */ new Date();
    const t = (r = this.hass) == null ? void 0 : r.states[n];
    if (!t) return /* @__PURE__ */ new Date();
    const e = t.state, s = new Date(e);
    return isNaN(s.getTime()) ? /* @__PURE__ */ new Date() : s;
  }
  getLocale() {
    var n, t;
    return (t = (n = this.config.locale) != null ? n : this.hass.locale.language) != null ? t : "de-DE";
  }
  static getStubConfig() {
    return {
      entity: {
        entity: "sensor.date"
      },
      options: this.defaultDateTimeFormatOptions
    };
  }
  render() {
    const n = this.getLocale(), t = b(b({}, v.defaultDateTimeFormatOptions), this.config), e = this.getDateTime().toLocaleDateString(n, t);
    return At` <ha-card>
      <div class="date-time align-center">${e}</div>
    </ha-card>`;
  }
};
v.defaultDateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
v.styles = Ot`
    :host {
      display: block;
      height: auto;
      width: 100%;
      overflow: hidden;
    }

    .date-time {
      padding: 10px;
      color: var(--primary-text-color);
      font-size: 2rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum';
      font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        sans-serif;
      letter-spacing: -0.03em;
      line-height: 1.2;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
    }

    .align-center {
      text-align: center;
    }

    .align-right {
      text-align: right;
    }

    .align-left {
      text-align: left;
    }

    @media (prefers-color-scheme: light) {
      :host {
        background: rgba(255, 255, 255, 0.6);
        color: #000;
      }
    }
  `;
K([
  k({ attribute: !1 })
], v.prototype, "hass", 2);
K([
  k({ attribute: !1 })
], v.prototype, "config", 2);
v = K([
  bt("localized-date-time-card")
], v);
var te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, Z = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ee(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && te(t, e, i), i;
};
let L = class extends w {
  configChanged(n) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: { config: n }
      })
    );
  }
  render() {
    var n;
    return At` <ha-card> 
        <sl-tab-group>
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab slot="nav" panel="entity">Entity</sl-tab>
        </sl-tab-group>
        <sl-tab-panel name="general">
          <ha-form
            .hass=${this.hass}
            .data=${this.config}
            .schema=${[
      { name: "showDate", selector: { boolean: {} } },
      { name: "showTime", selector: { boolean: {} } },
      { name: "locale", selector: { text: {} } },
      { name: "options", selector: { object: {} } }
    ]}
            @value-changed=${(t) => {
      const e = b(b({}, this.config), t.detail.value);
      this.configChanged(e);
    }}
          ></ha-form>
        </sl-tab-panel>
        <sl-tab-panel name="entity">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${(n = this.config.entity) == null ? void 0 : n.entity}
            .includeDomains=${["sensor"]}
            @value-changed=${(t) => {
      const e = Y(b({}, this.config), { entity: { entity: t.detail.value } });
      this.configChanged(e);
    }}
          ></ha-entity-picker>
        </sl-tab-panel>
      </sl-tab-group>
    </ha-card>`;
  }
};
Z([
  k({ attribute: !1 })
], L.prototype, "hass", 2);
Z([
  k({ attribute: !1 })
], L.prototype, "config", 2);
L = Z([
  bt("localized-date-time-card-editor")
], L);
