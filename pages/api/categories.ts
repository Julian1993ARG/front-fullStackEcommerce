import { mongooseConnect } from '@/lib';
import { Category, Methods } from '@/models';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();
  const { method } = req;

  if (method === Methods.get) {
    // @ts-ignore
    res.json(await Category.find().populate('parent'));
  }

  if (method === Methods.post) {
    const { name, parentCategory } = req.body;
    // @ts-ignore
    const newCategory = await Category.create({ name, parent: parentCategory || undefined });
    return res.status(201).json(newCategory);
  }

  if (method === Methods.put) {
    const { name, parentCategory, _id } = req.body;
    // @ts-ignore
    const updateCategory = await Category.updateOne({ _id }, { name, parent: parentCategory || undefined });
    return res.status(201).json(updateCategory);
  }

  res.status(405).json({ error: 'Method not implemented' });
}
