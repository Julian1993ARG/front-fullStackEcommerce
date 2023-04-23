import { Layout, ProductsForm } from '@/components';
import { IProduct } from '@/models';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage () {
  const [productInfo, setProductInfo] = useState<IProduct>({} as IProduct);
  const rounter = useRouter();
  const { id } = rounter.query;

  useEffect(() => {
    if (!id) return;
    axios.get('/api/products?id=' + id)
      .then(res => setProductInfo(res.data));
  }, [id]);
  return (
    <Layout>
      <h1>Edit Product</h1>
      {
        productInfo._id && <ProductsForm {...productInfo} />
      }
    </Layout>
  );
}
