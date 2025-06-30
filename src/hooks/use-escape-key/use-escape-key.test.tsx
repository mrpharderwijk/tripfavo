import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useEscapeKey } from './use-escape-key'

describe('useEscapeKey', () => {
  it('calls the handler when the escape key is pressed', async () => {
    // Arrange
    const handler = vi.fn()
    renderHook(() => useEscapeKey(handler, true))

    // Act
    await userEvent.keyboard('{Escape}')

    // Assert
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not call the handler when isActive is set to false', async () => {
    // Arrange
    const handler = vi.fn()
    renderHook(() => useEscapeKey(handler, false))

    // Act
    await userEvent.keyboard('{Escape}')

    // Assert
    expect(handler).not.toHaveBeenCalled()
  })
})
