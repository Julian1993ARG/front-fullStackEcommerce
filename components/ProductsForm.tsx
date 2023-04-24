import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UploadIcon, Spinner } from './';
import Image from 'next/image';

export default function ProductsForm ({
  ...productInfo
}) {
  const [title, setTitle] = useState(productInfo.title || '');
  const [description, setDescription] = useState(productInfo.description || '');
  const [price, setPrice] = useState(productInfo.price || 0);
  const [gotToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState<string[]>(productInfo.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const rounter = useRouter();

  async function createProduct (ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = { title, description, price, images };
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

  async function unploadImages (ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    if (files) {
      setIsUploading(true);
      const data = new FormData();
      if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          data.append('file', files[i] as Blob);
        }
      } else {
        data.append('file', files[0] as Blob);
      }
      const res = await axios.post('/api/upload', data);
      setImages(prev => [...prev, ...res.data.links]);
      setIsUploading(false);
    }
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
      <label>
        Photos
      </label>
      <div className='mb-2 flex flex-wrap gap-1'>
        {
        !!images?.length && images.map((link, index) => (
          <div
            key={index}
            className='w-24 h-24 relative'
          >
            <Image
              src={link}
              alt='product Image'
              className='rounded-lg'
              fill
            />
          </div>
        ))
      }
        {
        isUploading && (
          <div className='h-24 flex items-center '>
            <Spinner />
          </div>
        )
      }
        <label className=' w-24 h-24  text-center cursor-pointer flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200'><UploadIcon />
          <div>Upload</div>
          <input
            type='file'
            className='hidden'
            onChange={unploadImages}
          />
        </label>
      </div>

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
