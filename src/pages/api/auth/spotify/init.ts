import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { formatAuthCookies } from '../../../../utils/api/spotify/utils'

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  const state = randomUUID()

  res.setHeader('Set-Cookie', formatAuthCookies({ state })).redirect('/')
}

export default handler
