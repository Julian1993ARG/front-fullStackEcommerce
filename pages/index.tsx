import { Layout } from '@/components';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import userIconSvg from '@/public/userIcon.svg';

export default function HomePage () {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className='text-blue-900 flex justify-between'>
        <h2 className='font-bold'>
          Hello, {session?.user?.name}
        </h2>
        <div className='flex bg-gray-200 text-black gap-1 rounded-lg overflow-hidden'>
          <Image
            src={session?.user?.image ?? userIconSvg}
            alt='userAvatar'
            width={100}
            height={100}
            className='w-8 h-8'
          />
          <span className='px-2'>
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>
  );
}
