import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_SCOPES } from '../../utils/api/spotify/constants'
import clientPromise from '../../utils/mongo'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise
  const spotify = client.db('spotify')
  const sessions = spotify.collection('sessions')

  await sessions.insertOne({
    state: randomUUID(),
    access_token: 'fake-access-token',
    refresh_token: 'fake-refresh-token',
    expires_at: dayjs().add(1, 'day').toISOString(),
    scopes: AUTH_SCOPES,
  })

  const docs = await sessions.find().toArray()
  return res.status(200).json({ sessions: docs })
}

export default handler
