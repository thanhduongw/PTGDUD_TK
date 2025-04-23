import React from 'react';
import ProductList from '../components/ProductList';

export default function ProductManager() {
  // Dữ liệu mẫu tĩnh
  const products = [
    { id: '1', name: 'Áo Thun',   price: 150000, category: 'Fashion', stock: 10 },
    { id: '2', name: 'Tai Nghe',  price: 500000, category: 'Tech',    stock:  5 },
    { id: '3', name: 'Bình Nước', price: 120000, category: 'Home',    stock: 20 },
  ];

  return (
    <div className="my-4">
      <h2>Danh sách sản phẩm mẫu</h2>
      <ProductList products={products} onDelete={() => { /* placeholder */ }} />
    </div>
  );
}
