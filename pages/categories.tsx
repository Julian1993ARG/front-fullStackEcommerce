import { Layout, PenIcon, TrashIcon } from '@/components';
import { ICategory } from '@/models/Category';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';

export default function CategoriesPage () {
  const [editedCategory, setEditedCategory] = useState<ICategory | null>(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);

  async function getCategories () {
    const { data } = await axios.get('/api/categories');
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function saveCategory (e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editedCategory === null) {
      await axios.post('/api/categories', { name, parentCategory });
      setEditedCategory(null);
    } else {
      await axios.put('/api/categories', { name, parentCategory, _id: editedCategory._id });
    }
    setName('');
    setParentCategory('');
    getCategories();
  }

  function editCategory (category:ICategory) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id || '');
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category ${name}` : 'New category'}</label>
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
        <select
          className='mb-0'
          value={parentCategory}
          onChange={e => setParentCategory(e.target.value)}
        >
          <option value='0'>No parent category</option>
          {
            categories.map(category => (
              <option
                key={category._id}
                value={category._id}
              >{category.name}
              </option>
            ))
          }
        </select>
        <button
          type='submit'
          className='btn-primary py-1'
        >Save
        </button>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {
            categories.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className='btn-primary py-1 mr-1'
                  ><PenIcon />
                  </button>
                  <button className='btn-primary py-1'><TrashIcon /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Layout>
  );
}
