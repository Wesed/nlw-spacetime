// responsavel por interceptar às paginas q precisam de login

import { NextRequest, NextResponse } from 'next/server'

const signURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  console.log('aa', token)

  // se nao tiver logado
  if (!token) {
    return NextResponse.redirect(signURL, {
      headers: {
        /* request.url guarda a url q o usuario estava tentando acessar
        ou seja, apos a operacao, volta ele na msm pagina q ja estava, ao inves do inicio 
        + o HttpOnly impede q esse cookie fica visivel no front (so o back tem acesso) */
        // 'Set-Cookie': `redirectTo=http://192.168.0.156:3000/memories/new; Path=/; HttpOnly; max-age=20`,
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }
  // se ja tiver logado, nao faz nada
  return NextResponse.next()
}

export const config = {
  // em quais rotas irei disparar o middleware (exigir login)
  matcher: '/memories/:path*',
}

// o middleware do front-end substitui o auth do backend? Ou age em conjunto?

// qual a real necessidade do 'backend for frontend? ex do dogs
