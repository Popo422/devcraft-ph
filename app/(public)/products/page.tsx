'use client';

// Components
import GetComponent from '@/app/components/Products/GetComponent';
import PostComponent from '@/app/components/Products/PostComponent';
import ProductLabel from '@/app/components/Products/ProductLabel';
import ProductTable from '@/app/components/Products/ProductTable';

// Utility
import { apiRequest } from '@/app/utils/apiRequest';
import ProductsTable from '@/components/ProductsTable';
import { useState } from 'react';

export default function getProducts() {
  const [productName, setProductName] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [realItemCode, setRealItemCode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);

  async function handlePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await apiRequest('/api/products', 'POST', {
      productName,
      itemCode: itemCode.toUpperCase(),
      quantity,
    });
    setProducts(data.rows);
  }

  async function handleGet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = await apiRequest(
      `/api/products?itemCode=${realItemCode.toUpperCase()}`,
      'GET',
    );
    setProducts(data);
  }

  async function handleGetAll(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = await apiRequest('/api/products', 'GET');
    setProducts(data);
  }

  const isPostValid = itemCode !== '' && productName !== '' && quantity > 0;
  const isGetValid = realItemCode !== '';

  return (
    <div className="flex flex-wrap place-items-center justify-center text-white">
      <div className="mt-20 flex w-full flex-col items-center justify-center">
        <PostComponent
          setProductName={setProductName}
          setItemCode={setItemCode}
          setQuantity={setQuantity}
          handlePost={handlePost}
          isPostValid={isPostValid}
        />
        <GetComponent
          setRealItemCode={setRealItemCode}
          isGetValid={isGetValid}
          handleGet={handleGet}
          handleGetAll={handleGetAll}
        />
      </div>
      <main className="mt-10 flex w-[700px] border border-black p-5 text-black">
        <div className="flex w-full flex-col justify-center">
          {/* <ProductLabel /> */}
          {/* <ProductTable products={products} /> */}
          <ProductsTable />
        </div>
      </main>
    </div>
  );
}
