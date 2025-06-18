import axios from 'axios'

export async function axiosFetcher(url: string): Promise<unknown> {
  const res = await axios.get(url)
  return res.data
}
