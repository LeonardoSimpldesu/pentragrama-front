'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FormSchema = z.object({
  neighborhood: z.string(),
  street: z.string().min(2, {
    message: 'A rua precisa ter pelo menos 2 caracteres.',
  }),
})

type StreetFetch = {
  id: number
  name: string
}[]

export default function StreetForm() {
  const [neighborhoods, setNeighborhoods] = useState<StreetFetch>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      street: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/street/create')
        if (response.status === 401) {
          router.push('/')
        }
        setNeighborhoods(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit({
    street,
    neighborhood,
  }: z.infer<typeof FormSchema>) {
    try {
      await api.post('/street', {
        name: street,
        neighborhood_id: neighborhood,
      })
      router.push('/street')
    } catch (error) {
      console.log(error)
    }
  }

  function searchByCep({ logradouro }: ViaCepResponse) {
    form.setValue('street', logradouro)
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-2xl font-bold">Cadastro Nova Rua</h1>
      <div className="w-full lg:w-2/3 2xl:w-1/3">
        <SearchCEP searchCEP={searchByCep} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o bairro em que esta cidade reside" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {neighborhoods.map((neighborhood) => {
                        return (
                          <SelectItem
                            key={neighborhood.id}
                            value={neighborhood.id.toString()}
                          >
                            {neighborhood.name}
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
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua:</FormLabel>
                  <FormControl>
                    <Input placeholder="Escreva o nome da rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
