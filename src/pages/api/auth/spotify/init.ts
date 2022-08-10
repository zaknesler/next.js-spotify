import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { formatAuthCookies } from '../../../../utils/api/spotify/utils'

type InitRequestQueryParams = {
  redirect?: string
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { redirect } = req.query as InitRequestQueryParams
  const state = randomUUID()

  res
    .setHeader('Set-Cookie', formatAuthCookies({ state }))
    .redirect(redirect || '/')
}

export default handler
