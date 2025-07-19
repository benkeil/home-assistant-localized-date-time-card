import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { HomeAssistant } from 'custom-card-helpers'
import type { CardConfig } from './localized-date-time-card'

@customElement('localized-date-time-card-editor')
export class LocalizedDateTimeCardEditor extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant
  @property({ attribute: false })
  public config!: CardConfig

  public configChanged(newConfig: CardConfig) {
    this.dispatchEvent(
      new CustomEvent<Omit<CardConfig, 'type'>>('config-changed', {
        bubbles: true,
        composed: true,
        detail: { config: newConfig },
      })
    )
  }

  public render() {
    return html` <ha-card> 
        <sl-tab-group>
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab slot="nav" panel="entity">Entity</sl-tab>
        </sl-tab-group>
        <sl-tab-panel name="general">
          <ha-form
            .hass=${this.hass}
            .data=${this.config}
            .schema=${[
              { name: 'showDate', selector: { boolean: {} } },
              { name: 'showTime', selector: { boolean: {} } },
              { name: 'locale', selector: { text: {} } },
              { name: 'options', selector: { object: {} } },
            ]}
            @value-changed=${(ev: CustomEvent) => {
              const newConfig = { ...this.config, ...ev.detail.value }
              this.configChanged(newConfig)
            }}
          ></ha-form>
        </sl-tab-panel>
        <sl-tab-panel name="entity">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this.config.entity?.entity}
            .includeDomains=${['sensor']}
            @value-changed=${(ev: CustomEvent) => {
              const newConfig = { ...this.config, entity: { entity: ev.detail.value } }
              this.configChanged(newConfig)
            }}
          ></ha-entity-picker>
        </sl-tab-panel>
      </sl-tab-group>
    </ha-card>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'localized-date-time-card-editor': LocalizedDateTimeCardEditor
  }
}
