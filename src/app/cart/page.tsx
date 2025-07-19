import CartPage from '@/views/Cart';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

export const metadata = {
  title: 'Shopping Cart | ShopEasy',
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[30vh]">
          <Spinner />
        </div>
      }
    >
      <CartPage />
    </Suspense>
  );
}
