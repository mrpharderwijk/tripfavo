import axios from 'axios'
import { vi } from 'vitest'

import { axiosFetcher } from './axios-fetcher'

const urlMock = 'https://api.example.com/data'
const mockResponse = { data: { foo: 'bar' } }

vi.mock('axios')
const axiosGetMock = vi.mocked(axios.get).mockResolvedValueOnce(mockResponse)

describe('axiosFetcher', () => {
  beforeEach(vi.clearAllMocks)

  it('should fetch data successfully', async () => {
    // Arrange & Act
    const result = await axiosFetcher(urlMock)

    // Assert
    expect(axiosGetMock).toHaveBeenCalledWith(urlMock)
    expect(result).toEqual(mockResponse.data)
  })

  it('should propagate errors from axios', async () => {
    // Arrange & Act
    axiosGetMock.mockRejectedValueOnce(new Error('Network error'))
    await axiosFetcher(urlMock)

    // Assert
    expect(axiosGetMock).toHaveBeenCalledWith(urlMock)
    await expect(axiosGetMock).rejects.toThrow('Network error')
  })
})
