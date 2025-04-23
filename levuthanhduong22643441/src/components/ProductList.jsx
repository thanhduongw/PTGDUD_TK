import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductForm from './ProductForm';

const ProductList = () => {
  // Initial sample product data
  const initialProducts = [
    { id: 1, name: 'Áo thun nam', price: 250000, category: 'Thời trang', stock: 15 },
    { id: 2, name: 'Laptop Asus', price: 15000000, category: 'Công nghệ', stock: 8 },
    { id: 3, name: 'Nồi cơm điện', price: 800000, category: 'Gia dụng', stock: 12 },
    { id: 4, name: 'Quần jean', price: 350000, category: 'Thời trang', stock: 20 },
    { id: 5, name: 'Tai nghe không dây', price: 500000, category: 'Công nghệ', stock: 10 }
  ];

  // State to store products
  const [products, setProducts] = useState(initialProducts);

  // Function to add a new product
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Function to delete a product
  const handleDeleteProduct = (productId) => {
    // Show confirmation dialog
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      // Filter out the product with the given ID
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sản Phẩm</h2>
      
      {/* Add Product Form Component */}
      <ProductForm onAddProduct={handleAddProduct} />
      
      {/* Product List Table */}
      <h3>Danh sách sản phẩm</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">Không có sản phẩm nào</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString('vi-VN')} đ</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;