import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { HomeAssistant } from 'custom-card-helpers'
import type { CardConfig } from './localized-date-time-card'

type PartialCardCOnfig = Omit<CardConfig, 'type'>
class CardConfigEvent extends CustomEvent<PartialCardCOnfig> {}

@customElement('localized-date-time-card-editor')
export class LocalizedDateTimeCardEditor extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant
  @property({ attribute: false })
  public config!: CardConfig

  public setConfig(config: CardConfig): void {
    this.config = config
  }

  public configChanged(newConfig: PartialCardCOnfig) {
    this.dispatchEvent(
      new CardConfigEvent('config-changed', {
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
          { name: 'locale', selector: { text: {} } },
          { name: 'options', selector: { object: {} } },
        ]}
        @value-changed=${(ev: CardConfigEvent) => {
          this.configChanged({
            locale: ev.detail.locale,
            options: ev.detail.options,
          })
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
