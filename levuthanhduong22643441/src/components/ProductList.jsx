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

  // State for products and search term
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to add a new product
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Function to delete a product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sản Phẩm</h2>
      
      {/* Add Product Form Component */}
      <ProductForm onAddProduct={handleAddProduct} />
      
      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Tìm kiếm theo tên sản phẩm..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i> Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      
      {/* Product List Table */}
      <h3>Danh sách sản phẩm {searchTerm && `(Kết quả tìm kiếm cho "${searchTerm}")`}</h3>
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
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                {searchTerm ? "Không tìm thấy sản phẩm phù hợp" : "Không có sản phẩm nào"}
              </td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
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