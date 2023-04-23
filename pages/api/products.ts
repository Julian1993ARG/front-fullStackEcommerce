import { mongooseConnect } from '@/lib';
import { Product } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();
  const { method } = req;
  if (method === 'GET') {
    res.json(await Product.find());
  }
  if (method === 'POST') {
    const { title, description, price } = req.body;

    const newProduct = await Product.create({
      title, description, price
    });

    return res.status(201).json(newProduct);
  }

  return { error: 'Method not implemented' };
}
