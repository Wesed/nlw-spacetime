import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  /* explicacao
    o next cria uma rota 'invisivel' q faz uma funcao sem q seja
    perceptivel ao usuario. Nesse caso, ele bate no servidor do github,
    pega o codigo, faz toda a requisicao com jwt e ja devolve pro usuario
    os dados salvos no cookie
  */

  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  /* 
    Se existir o cookie redirectTo, significa q o usuario estava tentando acessar
    alguma pagina q precisa de login, portanto ele redireciona o cliente de volta p essa pagina.
    Se nao existir, manda o user pra pagina inicial que esta em request.url
  */

  // se coloco url direto, dá erro. se uso request.url nao vai
  const redirectURL = redirectTo ?? new URL('/', request.url)
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    // o Path indica que o cookie vai estar disponivel em td a aplicacao
    headers: {
      // 'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
      'Set-Cookie': 'token=token',
    },
  })
}
