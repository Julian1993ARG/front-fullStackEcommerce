import { Layout } from '@/components';
import { IProduct } from '@/models';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProductPage () {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios.get('/api/products?id=' + id)
      .then(res => setProduct(res.data));
  }, [id]);

  const deleteProduct = async () => {
    await axios.delete('/api/products?id=' + id);
    router.push('/products');
  };

  return (
    <Layout>
      <h1 className='text-center'>Do you really want to delete &nbsp;"{product?.title}"?</h1>
      <div className='flex gap-2 justify-center'>
        <button onClick={() => deleteProduct()} className='btn-red'>Yes</button>
        <button className='btn-default' onClick={() => router.back()}>No</button>
      </div>

    </Layout>
  );
}
