import { Layout } from '@/components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NewProduct () {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [gotToProducts, setGoToProducts] = useState(false);

  const rounter = useRouter();

  async function createProduct (ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post('/api/products', data);
    setGoToProducts(true);
  }

  if (gotToProducts) {
    rounter.push('/products');
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Products name</label>
        <input
          type='text'
          placeholder='product name'
          value={title}
          onChange={env => setTitle(env.target.value)}
        />
        <label>Products description</label>
        <textarea
          placeholder='description'
          name=''
          id=''
          value={description}
          onChange={env => setDescription(env.target.value)}
        />
        <label>price (in USD)</label>
        <input
          type='number'
          placeholder='price'
          value={price}
          onChange={env => setPrice(env.target.value)}
        />
        <button
          type='submit'
          className='btn-primary'
        >Save
        </button>
      </form>

    </Layout>
  );
}
