import { render, screen } from '@testing-library/react'

import { Loader } from './loader'

describe('Loader', () => {
  it('renders the loader', () => {
    render(<Loader />)

    const loader = screen.getByLabelText('Loading...')
    expect(loader).toBeInTheDocument()
  })

  it('has the correct default styles', () => {
    render(<Loader />)

    const loader = screen.getByLabelText('Loading...')
    expect(loader).toHaveClass(
      'absolute',
      'top-0',
      'left-0',
      'right-0',
      'bottom-0',
      'm-auto',
      'border-4',
      'border-transparent',
      'border-t-white',
      'rounded-full',
      'animate-spin',
    )
  })

  describe('sizes', () => {
    it.each([
      { size: 'sm', expectedClass: 'w-4 h-4' },
      { size: 'md', expectedClass: 'w-8 h-8' },
      { size: 'lg', expectedClass: 'w-12 h-12' },
    ] as const)(
      'renders $size size with correct classes',
      ({ size, expectedClass }) => {
        render(<Loader size={size} />)

        const loader = screen.getByLabelText('Loading...')
        const [widthClass, heightClass] = expectedClass.split(' ')
        expect(loader).toHaveClass(widthClass, heightClass)
      },
    )

    it('uses md size as default', () => {
      render(<Loader />)

      const loader = screen.getByLabelText('Loading...')
      expect(loader).toHaveClass('w-8', 'h-8')
    })
  })

  it('is positioned absolutely for proper centering', () => {
    render(<Loader />)

    const loader = screen.getByLabelText('Loading...')
    expect(loader).toHaveClass('absolute')
    expect(loader).toHaveClass(
      'top-0',
      'left-0',
      'right-0',
      'bottom-0',
      'm-auto',
    )
  })

  it('has proper animation class', () => {
    render(<Loader />)

    const loader = screen.getByLabelText('Loading...')
    expect(loader).toHaveClass('animate-spin')
  })

  it('has proper border styles for the spinner effect', () => {
    render(<Loader />)

    const loader = screen.getByLabelText('Loading...')
    expect(loader).toHaveClass(
      'border-4',
      'border-transparent',
      'border-t-white',
    )
  })
})
