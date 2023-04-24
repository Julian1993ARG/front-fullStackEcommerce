import { Layout } from '@/components';
import { useState } from 'react';

export default function CategoriesPage () {
  const [name, setName] = useState('');
  function saveCategory (e) {
    const data = 'data';
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
