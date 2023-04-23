import { mongooseConnect } from '@/lib';
import { IProduct, Product } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();
  const { method } = req;
  if (method === 'GET') {
    res.json(await Product.find());
  }
  if (method === 'POST') {
    const { title, description, price } = req.body;

    const newProduct:IProduct = await Product.create({
      title, description, price
    });

    return res.status(201).json(newProduct);
  }

  res.status(405).json({ error: 'Method not implemented' });
}
