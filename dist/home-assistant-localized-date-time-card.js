var w = Object.defineProperty, v = Object.defineProperties;
var D = Object.getOwnPropertyDescriptors;
var m = Object.getOwnPropertySymbols;
var C = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable;
var p = (t, e, a) => e in t ? w(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a, l = (t, e) => {
  for (var a in e || (e = {}))
    C.call(e, a) && p(t, a, e[a]);
  if (m)
    for (var a of m(e))
      O.call(e, a) && p(t, a, e[a]);
  return t;
}, u = (t, e) => v(t, D(e));
import { css as _, LitElement as f, html as b } from "lit";
import { property as d, customElement as y } from "lit/decorators.js";
var $ = Object.defineProperty, T = Object.getOwnPropertyDescriptor, h = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? T(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (i ? s(e, a, n) : s(n)) || n);
  return i && n && $(e, a, n), n;
};
window.customCards = window.customCards || [];
window.customCards.push({
  type: "localized-date-time-card",
  name: "Localized Date Time Card",
  description: "Display Date and/or Time in a card in your localewith optional sensor entity support.",
  preview: !0
});
let r = class extends f {
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
    var n, o, s;
    const t = (o = (n = this.config) == null ? void 0 : n.entity) == null ? void 0 : o.entity;
    if (!t) return /* @__PURE__ */ new Date();
    const e = (s = this.hass) == null ? void 0 : s.states[t];
    if (!e) return /* @__PURE__ */ new Date();
    const a = e.state, i = new Date(a);
    return isNaN(i.getTime()) ? /* @__PURE__ */ new Date() : i;
  }
  getLocale() {
    var t, e;
    return (e = (t = this.config.locale) != null ? t : this.hass.locale.language) != null ? e : "de-DE";
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
    const t = this.getLocale(), e = l(l({}, r.defaultDateTimeFormatOptions), this.config), a = this.getDateTime().toLocaleDateString(t, e);
    return b` <ha-card>
      <div class="date-time align-center">${a}</div>
    </ha-card>`;
  }
};
r.defaultDateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
r.styles = _`
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
h([
  d({ attribute: !1 })
], r.prototype, "hass", 2);
h([
  d({ attribute: !1 })
], r.prototype, "config", 2);
r = h([
  y("localized-date-time-card")
], r);
var x = Object.defineProperty, z = Object.getOwnPropertyDescriptor, g = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? z(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (i ? s(e, a, n) : s(n)) || n);
  return i && n && x(e, a, n), n;
};
let c = class extends f {
  configChanged(t) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: { config: t }
      })
    );
  }
  render() {
    var t;
    return b` <ha-card> 
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
            @value-changed=${(e) => {
      const a = l(l({}, this.config), e.detail.value);
      this.configChanged(a);
    }}
          ></ha-form>
        </sl-tab-panel>
        <sl-tab-panel name="entity">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${(t = this.config.entity) == null ? void 0 : t.entity}
            .includeDomains=${["sensor"]}
            @value-changed=${(e) => {
      const a = u(l({}, this.config), { entity: { entity: e.detail.value } });
      this.configChanged(a);
    }}
          ></ha-entity-picker>
        </sl-tab-panel>
      </sl-tab-group>
    </ha-card>`;
  }
};
g([
  d({ attribute: !1 })
], c.prototype, "hass", 2);
g([
  d({ attribute: !1 })
], c.prototype, "config", 2);
c = g([
  y("localized-date-time-card-editor")
], c);
