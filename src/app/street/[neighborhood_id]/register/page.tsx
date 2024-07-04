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

const FormSchema = z.object({
  neighborhood: z.string(),
  street: z.string().min(2, {
    message: 'A rua precisa ter pelo menos 2 caracteres.',
  }),
})

export default function StreetForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      neighborhood: '',
      street: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  function searchByCep({ logradouro, bairro }: ViaCepResponse) {
    form.setValue('street', logradouro)
    form.setValue('neighborhood', bairro)
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-2xl font-bold">Cadastro Nova Rua</h1>
      <SearchCEP searchCEP={searchByCep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-4"
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
                      <SelectValue placeholder="Selecione o bairro em que esta rua reside" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sé">Sé</SelectItem>
                    <SelectItem value="Grajaú">Grajaú</SelectItem>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  )
}
