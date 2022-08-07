import type { NextApiRequest, NextApiResponse } from 'next'
import { formatCookie } from '../../../../utils'
import { COOKIE_KEYS } from '../../../../utils/api/spotify/constants'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const cookies = Object.values(COOKIE_KEYS)
    .map(cookie => formatCookie(cookie, cookie, { expires: new Date(-1) }))
    .filter(Boolean)

  res.setHeader('Set-Cookie', cookies)
  return res.status(200).json({ message: 'Logged out' })
}

export default handler
