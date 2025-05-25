import * as React from 'react'
import type { Preview } from '@storybook/react'

import { primaryFont } from '../src/lib/fonts/main'

import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={`${primaryFont.variable}`}
        style={{
          fontFamily: 'var(--font-primary)',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
