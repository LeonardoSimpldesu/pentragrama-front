// eslint-disable-next-line no-unused-expressions

type NeighborhoodProps = {
  id: number
  name: string
  uf: string
  foundedIn: string
  neighborhood: {
    id: number
    name: string
    city_id: number
  }[]
}[]

export type TNeighborhoodDTO = {
  id: number
  neighborhood: string
  city: string
  uf: string
}

export function neighborhoodDTO(rawData: NeighborhoodProps) {
  const result: TNeighborhoodDTO[] = []

  rawData.forEach((city) => {
    city.neighborhood.forEach((neighborhood) => {
      result.push({
        id: neighborhood.id,
        neighborhood: neighborhood.name,
        city: city.name,
        uf: city.uf,
      })
    })
  })

  return result
}
