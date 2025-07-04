import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import useSWR from 'swr'

import { useProperty } from './use-property'
import { HostProperty } from '@/features/host/properties/types/host-property'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

const mockProperty: HostProperty = {
  id: 'test-property-id',
  title: 'Test Property',
  description: 'Test description',
  neighbourhoodDescription: 'Test neighbourhood',
  structure: 'Test structure',
  privacyType: 'ENTIRE_PLACE',
  status: 'DRAFT',
  host: null,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
  location: null,
  floorPlan: null,
  guestsAmount: null,
  images: [],
  amenities: [],
  priceDetails: [],
}

describe('useProperty', () => {
  beforeEach(vi.clearAllMocks)

  it('should fetch property when propertyId is provided', async () => {
    // Arrange
    useSWRMock.mockReturnValue({
      data: mockProperty,
      isLoading: false,
      error: null,
      mutate: vi.fn(),
      isValidating: false,
    })

    // Act
    const { result } = renderHook(() => useProperty('test-property-id'))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(
      '/api/host/properties/test-property-id',
      undefined,
    )
    expect(result.current.property).toEqual(mockProperty)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when propertyId is null', () => {
    // Arrange & Act
    const { result } = renderHook(() => useProperty(null))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.property).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when propertyId is undefined', () => {
    // Arrange & Act
    const { result } = renderHook(() => useProperty(undefined))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.property).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when propertyId is empty string', () => {
    // Arrange & Act
    const { result } = renderHook(() => useProperty(''))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.property).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when propertyId is whitespace only', () => {
    // Arrange & Act
    const { result } = renderHook(() => useProperty('   '))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.property).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should handle loading state', () => {
    // Arrange
    useSWRMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      mutate: vi.fn(),
      isValidating: false,
    })

    // Act
    const { result } = renderHook(() => useProperty('test-property-id'))

    // Assert
    expect(result.current.property).toBeUndefined()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(null)
  })

  it('should handle error state', () => {
    // Arrange
    const mockError = new Error('Failed to fetch property')
    useSWRMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      mutate: vi.fn(),
      isValidating: false,
    })

    // Act
    const { result } = renderHook(() => useProperty('test-property-id'))

    // Assert
    expect(result.current.property).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(mockError)
  })
}) 