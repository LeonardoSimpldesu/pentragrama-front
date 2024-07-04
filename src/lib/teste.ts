'use server'

import { cookies } from 'next/headers'
import { api } from './api'

export async function teste() {
  if (cookies().get('token')?.value) {
    try {
      const response = api.get('/teste', {
        headers: {
          Authorization: `Bearer ${cookies().get('token')?.value}`,
        },
      })
      return response
    } catch (error) {
      return error
    }
  }
}
