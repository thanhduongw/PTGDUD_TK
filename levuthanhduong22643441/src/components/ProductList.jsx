import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductForm from './ProductForm';
import ProductItem from './ProductItem';

const ProductList = () => {
  // Initial sample product data
  const initialProducts = [
    { id: 1, name: 'Áo thun nam', price: 250000, category: 'Thời trang', stock: 15 },
    { id: 2, name: 'Laptop Asus', price: 15000000, category: 'Công nghệ', stock: 8 },
    { id: 3, name: 'Nồi cơm điện', price: 800000, category: 'Gia dụng', stock: 12 },
    { id: 4, name: 'Quần jean', price: 350000, category: 'Thời trang', stock: 20 },
    { id: 5, name: 'Tai nghe không dây', price: 500000, category: 'Công nghệ', stock: 10 }
  ];

  // Load products from localStorage or use initial data if none exists
  const loadProductsFromStorage = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    return initialProducts;
  };

  // State for products, search term, and category filter
  const [products, setProducts] = useState(loadProductsFromStorage);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Extract unique categories from products
  const [categories, setCategories] = useState([]);
  
  // Update categories whenever products change
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);
  
  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Function to add a new product
  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
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
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Reset to initial sample data
  const resetToSampleData = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục dữ liệu mẫu? Dữ liệu hiện tại sẽ bị mất.')) {
      setProducts(initialProducts);
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearchTerm && matchesCategory;
  });
  
  // Calculate total products and stock
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  
  // Calculate total products and stock for filtered products
  const filteredTotalProducts = filteredProducts.length;
  const filteredTotalStock = filteredProducts.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sản Phẩm</h2>
      
      {/* Add Product Form Component */}
      <ProductForm onAddProduct={handleAddProduct} />
      
      {/* Product Statistics */}
      <div className="card mb-4">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-md-6">
              <h5>Tổng số sản phẩm: <span className="badge bg-primary">{totalProducts}</span></h5>
            </div>
            <div className="col-md-6">
              <h5>Tổng tồn kho: <span className="badge bg-success">{totalStock}</span></h5>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="row mb-3 align-items-end">
        <div className="col-md-5">
          <label className="form-label">Tìm kiếm</label>
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
        <div className="col-md-4">
          <label htmlFor="categoryFilter" className="form-label">Lọc theo danh mục</label>
          <select 
            className="form-select" 
            id="categoryFilter"
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-secondary flex-grow-1" 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
              }}
            >
              Xóa bộ lọc
            </button>
            <button 
              className="btn btn-outline-warning" 
              onClick={resetToSampleData}
              title="Khôi phục dữ liệu mẫu ban đầu"
            >
              <i className="bi bi-arrow-repeat"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Storage status indicator */}
      <div className="alert alert-success mb-3">
        <i className="bi bi-check-circle-fill me-2"></i>
        Dữ liệu sản phẩm được lưu tự động vào localStorage
      </div>
      
      {/* Product List Table */}
      <h3>
        Danh sách sản phẩm 
        {searchTerm && ` (Tìm kiếm: "${searchTerm}")`}
        {categoryFilter && ` (Danh mục: ${categoryFilter})`}
      </h3>
      
      {/* Filter statistics */}
      {(searchTerm || categoryFilter) && (
        <div className="alert alert-info">
          Kết quả lọc: <strong>{filteredTotalProducts}</strong> sản phẩm | 
          Tổng tồn kho (đã lọc): <strong>{filteredTotalStock}</strong>
        </div>
      )}
      
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
                {searchTerm || categoryFilter ? "Không tìm thấy sản phẩm phù hợp" : "Không có sản phẩm nào"}
              </td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductItem
                key={product.id}
                product={product}
                index={index}
                onDelete={handleDeleteProduct}
              />
            ))
          )}
        </tbody>
        <tfoot className="table-secondary">
          <tr>
            <td colSpan="4" className="text-end fw-bold">Tổng số:</td>
            <td className="fw-bold">{filteredTotalStock}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductList;