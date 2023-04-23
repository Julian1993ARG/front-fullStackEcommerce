import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ProductsForm ({
  ...productInfo
}) {
  const [title, setTitle] = useState(productInfo.title || '');
  const [description, setDescription] = useState(productInfo.description || '');
  const [price, setPrice] = useState(productInfo.price || 0);
  const [gotToProducts, setGoToProducts] = useState(false);

  const rounter = useRouter();

  async function createProduct (ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = { title, description, price };
    if (productInfo._id) {
      await axios.put('/api/products', { ...data, _id: productInfo._id });
    } else {
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }

  if (gotToProducts) {
    rounter.push('/products');
  }
  return (
    <form onSubmit={createProduct}>
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
        onChange={env => setPrice(Number(env.target.value))}
      />
      <button
        type='submit'
        className='btn-primary'
      >Save
      </button>
    </form>

  );
}
