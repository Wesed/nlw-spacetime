import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // retora a aplicacao pra pagina base, no caso o index
  const redirectURL = new URL('/', 'http://192.168.0.156:3000')

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
