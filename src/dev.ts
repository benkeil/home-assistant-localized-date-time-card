import type { HomeAssistant } from 'custom-card-helpers'
import './localized-date-time-card.ts'

document.documentElement.style.cssText = '--primary-text-color: red'

const card = document.createElement('localized-date-time-card')

card.setConfig({
  locale: 'de-DE',
  entity: { entity: 'sensor.date' },
})

window.setInterval(() => {
  card.hass = {
    locale: {
      language: 'de',
      number_format: 'system',
      time_format: 'system',
    },
    states: {
      'sensor.date': {
        state: new Date().toISOString(),
        attributes: {},
        last_changed: '',
        last_updated: '',
        context: {
          id: '',
          user_id: null,
          parent_id: null,
        },
        entity_id: 'sensor.date',
      },
    },
  } as Partial<HomeAssistant> as HomeAssistant
}, 1_000)

document.body.appendChild(card)
