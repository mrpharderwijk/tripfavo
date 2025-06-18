import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import useSWR from 'swr'

import { useListing } from './use-listing'
import { HostListing } from '@/features/host/types/host-listing'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

const mockListing: HostListing = {
  id: 'test-listing-id',
  title: 'Test Listing',
  description: 'Test description',
  neighbourhoodDescription: 'Test neighbourhood',
  structure: 'Test structure',
  privacyType: 'ENTIRE_PLACE',
  status: 'DRAFT',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
  location: null,
  floorPlan: null,
  guestsAmount: null,
  images: [],
  amenities: [],
  priceDetails: [],
}

describe('useListing', () => {
  beforeEach(vi.clearAllMocks)

  it('should fetch listing when listingId is provided', async () => {
    // Arrange
    useSWRMock.mockReturnValue({
      data: mockListing,
      isLoading: false,
      error: null,
      mutate: vi.fn(),
      isValidating: false,
    })

    // Act
    const { result } = renderHook(() => useListing('test-listing-id'))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(
      '/api/host/listings/test-listing-id',
      undefined,
    )
    expect(result.current.listing).toEqual(mockListing)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when listingId is null', () => {
    // Arrange & Act
    const { result } = renderHook(() => useListing(null))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.listing).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when listingId is undefined', () => {
    // Arrange & Act
    const { result } = renderHook(() => useListing(undefined))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.listing).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when listingId is empty string', () => {
    // Arrange & Act
    const { result } = renderHook(() => useListing(''))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.listing).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(null)
  })

  it('should not fetch when listingId is whitespace only', () => {
    // Arrange & Act
    const { result } = renderHook(() => useListing('   '))

    // Assert
    expect(useSWRMock).toHaveBeenCalledWith(null, undefined)
    expect(result.current.listing).toBeUndefined()
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
    const { result } = renderHook(() => useListing('test-listing-id'))

    // Assert
    expect(result.current.listing).toBeUndefined()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(null)
  })

  it('should handle error state', () => {
    // Arrange
    const mockError = new Error('Failed to fetch listing')
    useSWRMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      mutate: vi.fn(),
      isValidating: false,
    })

    // Act
    const { result } = renderHook(() => useListing('test-listing-id'))

    // Assert
    expect(result.current.listing).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(mockError)
  })
}) 