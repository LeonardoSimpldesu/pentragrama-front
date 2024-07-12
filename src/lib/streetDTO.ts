// eslint-disable-next-line no-unused-expressions

type StreetProps = {
  id: number
  name: string
  uf: string
  foundedIn: string
  neighborhood: {
    id: number
    name: string
    city_id: number
    street: { id: number; name: string; neighborhood_id: number }[]
  }[]
}[]

export type TStreetDTO = {
  id: number
  street: string
  neighborhood: string
  city: string
  uf: string
}

export function streetDTO(rawData: StreetProps) {
  const result: TStreetDTO[] = []

  rawData.forEach((city) => {
    city.neighborhood.forEach((neighborhood) => {
      neighborhood.street.forEach((street) => {
        result.push({
          id: street.id,
          street: street.name,
          neighborhood: neighborhood.name,
          city: city.name,
          uf: city.uf,
        })
      })
    })
  })

  return result
}
