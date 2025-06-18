import { render, screen } from '@testing-library/react'

import { Box, BoxProps } from './box'

describe('Box', () => {
  it('renders the component', () => {
    // Arrange & Act
    const { container } = render(<Box>Hello World!</Box>)

    // Assert
    expect(screen.getByText('Hello World!')).toBeInTheDocument()
    expect(container).toContainHTML('<div class="relative">Hello World!</div>')
  })

  describe('as prop', () => {
    it.each([
      'span',
      'article',
      'main',
      'div',
      'section',
      'aside',
      'header',
      'footer',
    ] as BoxProps['tag'][])('renders the component as a %s tag', (tag) => {
      // Arrange & Act
      const { container } = render(
        <Box tag={tag} position="absolute">
          Hello World!
        </Box>,
      )

      // Assert
      expect(container).toContainHTML(
        `<${tag} class="absolute">Hello World!</${tag}>`,
      )
    })
  })

  describe('display prop', () => {
    it.each([
      {
        display: 'block',
        'display-sm': 'block',
        'display-md': 'block',
        'display-lg': 'block',
        className: 'block sm:block md:block lg:block',
      },
      {
        display: 'inline',
        'display-sm': 'inline',
        'display-md': 'inline',
        'display-lg': 'inline',
        className: 'inline sm:inline md:inline lg:inline',
      },
      {
        display: 'flex',
        'display-sm': 'flex',
        'display-md': 'flex',
        'display-lg': 'flex',
        className: 'flex sm:flex md:flex lg:flex',
      },
      {
        display: 'grid',
        'display-sm': 'grid',
        'display-md': 'grid',
        'display-lg': 'grid',
        className: 'grid sm:grid md:grid lg:grid',
      },
      {
        display: 'inline-block',
        'display-sm': 'inline-block',
        'display-md': 'inline-block',
        'display-lg': 'inline-block',
        className:
          'inline-block sm:inline-block md:inline-block lg:inline-block',
      },
      {
        display: 'inline-flex',
        'display-sm': 'inline-flex',
        'display-md': 'inline-flex',
        'display-lg': 'inline-flex',
        className: 'inline-flex sm:inline-flex md:inline-flex lg:inline-flex',
      },
      {
        display: 'inline-grid',
        'display-sm': 'inline-grid',
        'display-md': 'inline-grid',
        'display-lg': 'inline-grid',
        className: 'inline-grid sm:inline-grid md:inline-grid lg:inline-grid',
      },
    ] as {
      display: BoxProps['display']
      'display-sm': BoxProps['display-sm']
      'display-md': BoxProps['display-md']
      'display-lg': BoxProps['display-lg']
      className: string
    }[])(
      'renders the component with the $display display prop',
      ({
        display,
        'display-sm': displaySm,
        'display-md': displayMd,
        'display-lg': displayLg,
        className,
      }) => {
        // Arrange & Act
        const { container } = render(
          <Box
            display={display}
            display-sm={displaySm}
            display-md={displayMd}
            display-lg={displayLg}
          >
            Hello World!
          </Box>,
        )

        // Assert
        expect(container).toContainHTML(
          `<div class="${className} relative">Hello World!</div>`,
        )
      },
    )
  })

  describe('flexDirection prop', () => {
    it.each([
      {
        'flex-direction': 'row',
        'flex-direction-sm': 'row',
        'flex-direction-md': 'row',
        'flex-direction-lg': 'row',
        className: 'flex-row sm:flex-row md:flex-row lg:flex-row',
      },
      {
        'flex-direction': 'col',
        'flex-direction-sm': 'col',
        'flex-direction-md': 'col',
        'flex-direction-lg': 'col',
        className: 'flex-col sm:flex-col md:flex-col lg:flex-col',
      },
      {
        'flex-direction': 'colReverse',
        'flex-direction-sm': 'colReverse',
        'flex-direction-md': 'colReverse',
        'flex-direction-lg': 'colReverse',
        className:
          'flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-col-reverse',
      },
    ] as {
      'flex-direction': BoxProps['flex-direction']
      'flex-direction-sm': BoxProps['flex-direction-sm']
      'flex-direction-md': BoxProps['flex-direction-md']
      'flex-direction-lg': BoxProps['flex-direction-lg']
      className: string
    }[])(
      'renders the component with the $flex-direction prop',
      ({
        'flex-direction': flexDirection,
        'flex-direction-sm': flexDirectionSm,
        'flex-direction-md': flexDirectionMd,
        'flex-direction-lg': flexDirectionLg,
        className,
      }) => {
        // Arrange & Act
        const { container } = render(
          <Box
            flex-direction={flexDirection}
            flex-direction-sm={flexDirectionSm}
            flex-direction-md={flexDirectionMd}
            flex-direction-lg={flexDirectionLg}
          >
            Hello World!
          </Box>,
        )

        // Assert
        expect(container).toContainHTML(
          `<div class="${className} relative">Hello World!</div>`,
        )
      },
    )
  })
})
