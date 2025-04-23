import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
  });
  
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm');
      return;
    }

    // Create new product object with generated ID
    const productToAdd = {
      id: Date.now(), // Use timestamp as a simple unique ID
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
    };

    // Call parent function to add the product
    onAddProduct(productToAdd);

    // Reset form
    setNewProduct({
      name: '',
      price: '',
      category: '',
      stock: '',
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">
          <i className="bi bi-plus-circle me-2"></i>
          Thêm sản phẩm mới
        </h4>
        <button 
          className="btn btn-sm btn-outline-light" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <><i className="bi bi-chevron-up me-1"></i> Ẩn form</>
          ) : (
            <><i className="bi bi-chevron-down me-1"></i> Hiện form</>
          )}
        </button>
      </div>
      
      {showForm && (
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">Giá</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Nhập giá sản phẩm"
                    min="0"
                  />
                  <span className="input-group-text">VNĐ</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="category" className="form-label">Danh mục</label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                >
                  <option value="">-- Chọn danh mục --</option>
                  <option value="Thời trang">Thời trang</option>
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="Gia dụng">Gia dụng</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="stock" className="form-label">Tồn kho</label>
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="Nhập số lượng tồn kho"
                  min="0"
                />
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-lg me-2"></i>
                Thêm sản phẩm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductForm;