import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { HomeAssistant, LovelaceCardConfig, EntityConfig } from 'custom-card-helpers'
import type { LocalizedDateTimeCardEditor } from './localized-date-time-card-editor'

const version = 'main'
const repoUrl = 'https://github.com/benkeil/home-assistant-localized-date-time-card'

console.groupCollapsed(`%cLocalized Date Time Card ${version}`, 'color:black; font-weight: bold; background: tomato; padding: 2px; border-radius: 5px;')
console.log(`Github repository: ${repoUrl}`)
console.groupEnd()

export interface CardConfig extends LovelaceCardConfig {
  locale?: string
  entity?: EntityConfig
  options?: Intl.DateTimeFormatOptions
}

@customElement('localized-date-time-card')
export class LocalizedDateTimeCard extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant
  @property({ attribute: false })
  private config!: CardConfig

  static getConfigElement(): LocalizedDateTimeCardEditor {
    return document.createElement('localized-date-time-card-editor')
  }

  private static defaultDateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  static styles = css`
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
  `

  public getCardSize() {
    return 1
  }

  public getGridOptions() {
    return {
      rows: 2,
      columns: 6,
      min_rows: 2,
    }
  }

  private getDateTime() {
    const entityId = this.config?.entity?.entity
    if (!entityId) return new Date()

    const stateObj = this.hass?.states[entityId]
    if (!stateObj) return new Date()

    const rawValue = stateObj.state
    const parsed = new Date(rawValue)
    return isNaN(parsed.getTime()) ? new Date() : parsed
  }

  private getLocale(): string {
    return this.config.locale ?? this.hass.locale.language ?? 'de-DE'
  }

  static getStubConfig(): Omit<CardConfig, 'type'> {
    return {
      entity: {
        entity: 'sensor.date',
      },
      options: this.defaultDateTimeFormatOptions,
    } as CardConfig
  }

  public render() {
    const locale = this.getLocale()
    const options = {
      ...LocalizedDateTimeCard.defaultDateTimeFormatOptions,
      ...this.config,
    }
    const dateStr = this.getDateTime().toLocaleDateString(locale, options)
    return html` <ha-card>
      <div class="date-time align-center">${dateStr}</div>
    </ha-card>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'localized-date-time-card': LocalizedDateTimeCard
  }

  interface Window {
    customCards: Array<{
      type: string
      name: string
      description: string
      preview: boolean
      documentationURL?: string
    }>
  }
}

window.customCards = [
  ...window.customCards,
  {
    type: 'localized-date-time-card',
    name: 'Localized Date Time Card',
    description: 'Display Date and/or Time in a card in your localewith optional sensor entity support.',
    preview: true,
  },
]
