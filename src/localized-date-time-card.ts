import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { HomeAssistant, LovelaceCardConfig, EntityConfig } from 'custom-card-helpers'

const version = 'main'
const repoUrl = 'https://github.com/benkeil/home-assistant-localized-date-time-card'

console.groupCollapsed(`%cLocalized Date Time Card ${version}`, 'color:black; font-weight: bold; background: tomato; padding: 2px; border-radius: 5px;')
console.log(`Github repository: ${repoUrl}`)
console.groupEnd()

export interface CardConfig extends LovelaceCardConfig {
  locale?: string
  entity?: EntityConfig
  options?: Intl.DateTimeFormatOptions
  align?: 'left' | 'center' | 'right'
}

export interface PartialCardConfig extends Omit<CardConfig, 'type'> {}

@customElement('localized-date-time-card')
export class LocalizedDateTimeCard extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant
  @property({ attribute: false })
  public config!: PartialCardConfig

  public setConfig(config: PartialCardConfig): void {
    this.config = config
  }

  public static async getConfigElement() {
    await import('./localized-date-time-card-editor')
    return document.createElement('localized-date-time-card-editor')
  }

  private static defaultDateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    ha-card {
      display: flex;
      height: 100%;
      flex-direction: column;
    }

    .date-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      overflow: hidden;
    }

    .date-content {
      display: flex;
      font-size: 2vw; /* Skaliert mit Viewport-Breite */
      font-weight: 700;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      white-space: nowrap;
      padding: 10px;
    }

    .date-wrapper.align-left {
      justify-content: flex-start;
      text-align: left;
    }

    .date-wrapper.align-center {
      justify-content: center;
      text-align: center;
    }

    .date-wrapper.align-right {
      justify-content: flex-end;
      text-align: right;
    }
  `

  public getCardSize() {
    return 1
  }

  public getGridOptions() {
    return {
      rows: 2,
      columns: 12,
      min_rows: 1,
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
      ...this.config.options,
    }
    const dateStr = this.getDateTime().toLocaleString(locale, options)
    const align = this.config.align ?? 'center'
    return html` <ha-card>
      <div class="date-wrapper align-${align}">
        <div class="date-content">${dateStr}</div>
      </div>
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
  ...(window.customCards ?? []),
  {
    type: 'localized-date-time-card',
    name: 'Localized Date Time Card',
    description: 'Display Date and/or Time in a card in your localewith optional sensor entity support.',
    preview: true,
  },
]
