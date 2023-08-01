import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

/* explicacao do asnc 
  nos componentes que nao usamos 'use client', o next permite que 
  o transformamos em asincrono, afim de permitir chamadas api diretamente (L15)
*/
export default async function Home() {
  const isAuthenticated = cookies().has('token')
  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorizazation: `Beares ${token}`,
    },
  })

  const memories: Memory[] = response.data

  console.log('aaa')

  return <EmptyMemories />

  // quando nao tiver nenhuma memoria
  // if (memories.length === 0) {
  //   return <EmptyMemories />
  // }

  // return (
  //   <div className="flex flex-col gap-10 p-8">
  //     {memories.map((memory) => {
  //       return (
  //         <div key={memory.id} className="space-y-4">
  //           <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
  //             {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
  //           </time>
  //           {/* <Image src={memory.coverUrl} width={592} height={290} alt="" /> */}
  //         </div>
  //       )
  //     })}
  //   </div>
  // )
}
