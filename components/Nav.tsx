import Link from 'next/link';
import { BoxIcon, CogIcon, HomeIcon, ListIcon, OrderIcon, StoreIcon } from './Icons';
import { useRouter } from 'next/router';

export default function Nav () {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = `${inactiveLink} bg-white rounded-l-lg text-blue-900 font-bold`;
  const { pathname } = useRouter();
  return (
    <aside className='text-white p-4 pr-0'>
      <Link
        href='/'
        className='flex gap-1 mb-4 mr-2'
      >
        <StoreIcon className='stroke-white text-blue-900' />
        <span className=''>
          EcommerceAdmin
        </span>
      </Link>
      <nav className='flex flex-col gap-2'>
        <Link
          href='/'
          className={pathname === '/' ? activeLink : inactiveLink}
        >
          <HomeIcon />
          Dashboard
        </Link>
        <Link
          href='/products'
          className={pathname.includes('/products') ? activeLink : inactiveLink}
        >
          <BoxIcon />
          Products
        </Link>
        <Link
          href='/categories'
          className={pathname.includes('/categories') ? activeLink : inactiveLink}
        >
          <ListIcon />
          Categories
        </Link>
        <Link
          href='/orders'
          className={pathname.includes('/orders') ? activeLink : inactiveLink}
        >
          <OrderIcon />
          Orders
        </Link>
        <Link
          href='/settings'
          className={pathname.includes('/settings') ? activeLink : inactiveLink}
        >
          <CogIcon />
          Settings
        </Link>

      </nav>
    </aside>
  );
}
