import axios from 'axios'

export function axiosFetcher(url: string): Promise<unknown> {
  return axios.get(url).then((res) => res.data)
}
