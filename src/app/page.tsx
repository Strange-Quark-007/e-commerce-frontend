import ProductList from '../views/ProductList';
import { Suspense } from 'react';
import Spinner from '../components/Spinner';

export const metadata = {
  title: 'Products | ShopEasy',
};

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[30vh]">
          <Spinner />
        </div>
      }
    >
      <ProductList />
    </Suspense>
  );
}
