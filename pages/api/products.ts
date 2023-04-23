import { mongooseConnect } from '@/lib';
import { IProduct, Product } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();
  const { method } = req;
  if (method === 'GET') {
    if (req.query.id) {
      const { id } = req.query;
      res.json(await Product.findOne({ _id: id }));
    }
    res.json(await Product.find());
  }
  if (method === 'POST') {
    const { title, description, price } = req.body;

    const newProduct:IProduct = await Product.create({
      title, description, price
    });

    return res.status(201).json(newProduct);
  }
  if (method === 'PUT') {
    const { title, description, price, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price });
    return res.status(200).json({ message: 'Product updated' });
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      return res.status(200).json({ message: 'Product deleted' });
    }
  }

  res.status(405).json({ error: 'Method not implemented' });
}
