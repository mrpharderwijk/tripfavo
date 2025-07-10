import { createFocusTrap, FocusTrap } from 'focus-trap'
import { createRef, RefObject } from 'react'
import { renderHook } from '@testing-library/react'

import { useFocusTrap } from './use-focus-trap'

vi.mock('focus-trap', () => ({
  createFocusTrap: vi.fn(),
}))
const createFocusTrapMock = vi.mocked(createFocusTrap)

describe('useFocusTrap', () => {
  const activateMock = vi.fn()
  const deactivateMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    createFocusTrapMock.mockReturnValue({
      active: false,
      activate: activateMock,
      deactivate: deactivateMock,
    } as unknown as FocusTrap)
  })

  it('should not call createFocusTrap when reference element is not available', () => {
    const ref = createRef<HTMLElement>()
    const { result } = renderHook(() => useFocusTrap({ ref }))
    const { activateTrap, deActivateTrap } = result.current

    expect(createFocusTrapMock).not.toHaveBeenCalled()
    expect(activateTrap).toBeTruthy()
    expect(deActivateTrap).toBeTruthy()
    expect(activateMock).not.toHaveBeenCalled()
    expect(deactivateMock).not.toHaveBeenCalled()
  })

  it('should call createFocusTrap when reference element is available', () => {
    const ref = {
      current: 'MOCKED ELEMENT',
    } as unknown as RefObject<HTMLElement>
    const { result } = renderHook(() => useFocusTrap({ ref }))
    const { activateTrap, deActivateTrap } = result.current

    expect(createFocusTrapMock).toHaveBeenCalled()
    expect(activateTrap).toBeTruthy()
    expect(deActivateTrap).toBeTruthy()
    expect(activateMock).not.toHaveBeenCalled()
    expect(deactivateMock).not.toHaveBeenCalled()
  })

  it('should call createFocusTrap when reference element via callback is available', () => {
    const ref = {
      current: 'MOCKED ELEMENT',
    } as unknown as RefObject<HTMLElement>
    const { result } = renderHook(() => useFocusTrap({ ref: () => ref }))
    const { activateTrap, deActivateTrap } = result.current

    expect(createFocusTrapMock).toHaveBeenCalled()
    expect(activateTrap).toBeTruthy()
    expect(deActivateTrap).toBeTruthy()
    expect(activateMock).not.toHaveBeenCalled()
    expect(deactivateMock).not.toHaveBeenCalled()
  })

  it('should call activate when activateOnInit is set to true', () => {
    const ref = {
      current: 'MOCKED ELEMENT',
    } as unknown as RefObject<HTMLElement>
    const { result } = renderHook(() =>
      useFocusTrap({ ref, activateOnInit: true }),
    )
    const { activateTrap, deActivateTrap } = result.current

    expect(createFocusTrapMock).toHaveBeenCalled()
    expect(activateTrap).toBeTruthy()
    expect(deActivateTrap).toBeTruthy()
    expect(activateMock).toHaveBeenCalled()
    expect(deactivateMock).not.toHaveBeenCalled()
  })

  it('should call activate when activateTrap is used', () => {
    const ref = {
      current: 'MOCKED ELEMENT',
    } as unknown as RefObject<HTMLElement>
    const { result } = renderHook(() =>
      useFocusTrap({ ref, activateOnInit: true }),
    )
    const { activateTrap } = result.current
    activateTrap()
    expect(activateMock).toHaveBeenCalled()
  })

  it('should call deactivate when deActivateTrap is used', () => {
    const ref = {
      current: 'MOCKED ELEMENT',
    } as unknown as RefObject<HTMLElement>
    const { result } = renderHook(() =>
      useFocusTrap({ ref, activateOnInit: true }),
    )
    const { deActivateTrap } = result.current
    deActivateTrap()
    expect(deactivateMock).toHaveBeenCalled()
  })
})
