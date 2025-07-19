import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { HomeAssistant } from 'custom-card-helpers'
import type { CardConfig } from './localized-date-time-card'

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-form/types.ts#L5

@customElement('localized-date-time-card-editor')
export class LocalizedDateTimeCardEditor extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant
  @property({ attribute: false })
  public config!: CardConfig

  public setConfig(config: CardConfig): void {
    this.config = config
  }

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
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${[
          { name: 'entity', selector: { entity: { domain: 'sensor', integration: 'time_date' } } },
          { name: 'locale', selector: { text: {} } },
          { name: 'options', selector: { object: {} }, description: { suffix: 'hääää', suggested_value: 'lol' } },
        ]}
        @value-changed=${(ev: CustomEvent) => {
          const newConfig = { ...this.config, ...ev.detail.value }
          this.configChanged(newConfig)
        }}
      ></ha-form>
    </ha-card>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'localized-date-time-card-editor': LocalizedDateTimeCardEditor
  }
}
