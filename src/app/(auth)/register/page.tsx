'use client'

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
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome precisa ter pelo menos 2 caracteres.',
  }),
  email: z.string().email().min(2, {
    message: 'O email precisa ter pelo menos 2 caracteres.',
  }),
  password: z.string().min(2, {
    message: 'A senha precisa ter pelo menos 2 caracteres.',
  }),
})

export default function Register() {
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/teste')
        if (response.status !== 200) {
          return
        }
        router.push('/city')
      } catch (error) {}
    }

    fetchData()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit({
    name,
    email,
    password,
  }: z.infer<typeof FormSchema>) {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
      })

      if (response.status !== 200) {
        throw new Error('Error ao realizar cadastro')
      }

      const token = await response.data.access_token
      localStorage.setItem('token', token)

      router.push('/city')
    } catch (error) {
      toast.error('Erro ao realizar cadastro, tente novamente mais tarde.')
    }
  }
  return (
    <div className="flex w-[350px] flex-col justify-center gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="tracking-tigh text-2xl font-semibold">Cadastre-se</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os campos para se cadastrar na plataforma
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escreva seu nome"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escreva seu email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escreva sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button type="submit" className="w-full">
            Entrar na plataforma
          </Button>
        </form>
      </Form>
      <Link
        href={'/'}
        className="text-center text-sm text-muted-foreground hover:text-blue-400"
      >
        Já possui um cadastro?
      </Link>
    </div>
  )
}
