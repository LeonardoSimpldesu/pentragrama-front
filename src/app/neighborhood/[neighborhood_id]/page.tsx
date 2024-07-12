'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SearchCEP, ViaCepResponse } from '@/components/features/searchCEP'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useParams, useRouter } from 'next/navigation'

const FormSchema = z.object({
  city: z.string(),
  neighborhood: z.string().min(2, {
    message: 'O bairro precisa ter pelo menos 2 caracteres.',
  }),
})

type CityFetch = {
  id: number
  name: string
}[]

type NeighborhoodFetch = {
  id: number
  name: string
  city_id: number
}

export default function NeighborhoodForm() {
  const [cities, setCities] = useState<CityFetch>([])
  const router = useRouter()
  const params = useParams<{ neighborhood_id: string }>()
  const neighborhoodId = params.neighborhood_id

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: '',
      neighborhood: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await api.get('/neighborhood/create')
        if (cityResponse.status === 401) {
          router.push('/')
        }
        setCities(cityResponse.data)

        const response = await api.get(`/neighborhood/${neighborhoodId}`)
        const city: CityFetch = cityResponse.data

        const neighborhood: NeighborhoodFetch = response.data

        const origialCity = city.find(
          (city) => city.id === neighborhood.city_id,
        )

        if (origialCity) {
          form.setValue('city', origialCity.id.toString())
        }
        form.setValue('neighborhood', neighborhood.name)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit({ city, neighborhood }: z.infer<typeof FormSchema>) {
    try {
      await api.put(`/neighborhood/${neighborhoodId}`, {
        name: neighborhood,
        city_id: city,
      })
      router.push('/neighborhood')
    } catch (error) {
      console.log(error)
    }
  }

  function searchByCep({ bairro }: ViaCepResponse) {
    form.setValue('neighborhood', bairro)
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-2xl font-bold">Cadastro Novo Bairro</h1>
      <div className="w-full lg:w-2/3 2xl:w-1/3">
        <SearchCEP searchCEP={searchByCep} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a cidade em que este bairro reside" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => {
                        return (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro:</FormLabel>
                  <FormControl>
                    <Input placeholder="Escreva o nome do bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Atualizar</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
