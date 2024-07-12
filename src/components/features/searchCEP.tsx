'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const FormSchema = z.object({
  cep: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

type SearchCEPProps = {
  searchCEP: (json: ViaCepResponse) => void
}

export function SearchCEP({ searchCEP }: SearchCEPProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cep: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const url = `https://viacep.com.br/ws/${data.cep}/json/`
    try {
      const response = await fetch(url)
      const json = await response.json()

      searchCEP(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex items-end gap-4"
      >
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CEP:</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Pesquisar</Button>
      </form>
    </Form>
  )
}
