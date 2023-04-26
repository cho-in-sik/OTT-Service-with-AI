import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]';

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions as any);

  if (req.method === 'GET') {
    if (session) return res.status(200).json(session);

    return res.status(500).json('세션이 존재하지 않습니다.');
  }
}
