import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&format=json&limit=5&normalizecity=1`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch address suggestions')
    }

    const data = await response.json()

    // Filter only for data from France
    const filteredData = data.filter((item: any) => item.address.country_code === 'fr')

    // Filter out duplicates
    const uniqueData = filteredData.filter(
      (item: any, index: number, self: any[]) =>
        index === self.findIndex((t) => t.place_id === item.place_id),
    )

    return NextResponse.json(uniqueData)
  } catch (error) {
    console.error('Error fetching address suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch address suggestions' }, { status: 500 })
  }
}
