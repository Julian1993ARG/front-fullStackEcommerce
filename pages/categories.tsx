import { Layout } from '@/components';
import axios from 'axios';
import { FormEvent, useState } from 'react';

export default function CategoriesPage () {
  const [name, setName] = useState('');

  async function saveCategory (e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await axios.post('/api/categories', { name });
    setName('');
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form
        onSubmit={saveCategory}
        className='flex gap-1 '
      >

        <input
          value={name}
          type='text'
          placeholder='Category name'
          className='mb-0'
          onChange={e => setName(e.target.value)}
        />
        <button
          type='submit'
          className='btn-primary py-1'
        >Save
        </button>
      </form>
    </Layout>
  );
}
