'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { SearchCEP, ViaCepResponse } from '@/components/features/searchCEP'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  city: z.string().min(2, {
    message: 'A cidade precisa ter pelo menos 2 caracteres.',
  }),
  uf: z.string().min(2, {
    message: 'O estado precisa ter pelo menos 2 caracteres.',
  }),
  foundedIn: z.date(),
})

export default function CityForm() {
  const route = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: '',
      uf: '',
      foundedIn: new Date(),
    },
  })

  async function onSubmit({ city, foundedIn, uf }: z.infer<typeof FormSchema>) {
    try {
      await api.post('/city', { name: city, foundedIn, uf })
      route.push('/city')
    } catch (error) {
      console.log(error)
    }
  }

  function searchByCep({ localidade, uf }: ViaCepResponse) {
    form.setValue('city', localidade)
    form.setValue('uf', uf)
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-2xl font-bold">Cadastro Nova Cidade</h1>
      <SearchCEP searchCEP={searchByCep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-4"
        >
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cidade:</FormLabel>
                  <FormControl>
                    <Input placeholder="Escreva o nome da cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escreva o estado em que esta cidade pertence"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="foundedIn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ano de fundação:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
