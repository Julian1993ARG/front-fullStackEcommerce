import { mongooseConnect } from '@/lib';
import { Category, Methods } from '@/models';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();
  const { method } = req;

  if (method === Methods.post) {
    const { name } = req.body;
    // @ts-ignore
    const newCategory = await Category.create({ name });
    return res.status(201).json(newCategory);
  }

  res.status(405).json({ error: 'Method not implemented' });
}
