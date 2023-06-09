import { Layout, PenIcon } from '@/components';
import { IProduct } from '@/models';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TrashIcon } from '../components/Icons';

export default function ProductsPage () {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data));
  }, []);

  return (
    <Layout>
      <Link
        className='bg-blue-900 text-white rounded-md  py-1 px-2'
        href='/products/new'
      >
        Add new product
      </Link>
      <table className='basic mt-2'>
        <thead>
          <tr>
            <td>Product Name</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product?._id}>
              <td>{product.title}</td>
              <td>
                <Link
                  href={`/products/edit/${product?._id}`}
                >
                  <PenIcon className='w-4 h-4' />
                </Link>
                <Link
                  className='ml-2'
                  href={`/products/delete/${product?._id}`}
                >
                  <TrashIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
