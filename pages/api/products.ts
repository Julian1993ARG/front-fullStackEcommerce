import { mongooseConnect } from '@/lib';
import { IProduct, Product, Methods } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();
  const { method } = req;
  if (method === Methods.get) {
    if (req.query.id) {
      const { id } = req.query;
      // @ts-ignore
      res.json(await Product.findOne({ _id: id }));
    }
    // @ts-ignore
    res.json(await Product.find());
  }
  if (method === Methods.post) {
    const { title, description, price, images } = req.body;
    // @ts-ignore
    const newProduct:IProduct = await Product.create({
      title, description, price, images
    });

    return res.status(201).json(newProduct);
  }
  if (method === Methods.put) {
    const { title, description, price, _id, images } = req.body;
    await Product.updateOne({ _id }, { title, description, price, images });
    return res.status(200).json({ message: 'Product updated' });
  }

  if (method === Methods.delete) {
    if (req.query?.id) {
      // @ts-ignore
      await Product.deleteOne({ _id: req.query.id });
      return res.status(200).json({ message: 'Product deleted' });
    }
  }

  res.status(405).json({ error: 'Method not implemented' });
}
