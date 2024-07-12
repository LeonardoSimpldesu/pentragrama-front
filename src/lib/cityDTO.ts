// eslint-disable-next-line no-unused-expressions

type CityProps = {
  id: number
  name: string
  uf: string
  foundedIn: string
}[]

export type TCityDTO = {
  id: number
  city: string
  uf: string
  foundedIn: string
}

export function cityDTO(rawData: CityProps) {
  const result: TCityDTO[] = []

  rawData.forEach((city) => {
    result.push({
      id: city.id,
      city: city.name,
      uf: city.uf,
      foundedIn: city.foundedIn,
    })
  })

  return result
}
