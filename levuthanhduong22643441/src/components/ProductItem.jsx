import React from 'react';

const ProductItem = ({ product, index, onDelete }) => {
  return (
    <tr className="product-row">
      <td>{index + 1}</td>
      <td>
        <span className="fw-medium">{product.name}</span>
      </td>
      <td>
        <span className="badge bg-light text-dark border">
          {product.price.toLocaleString('vi-VN')} đ
        </span>
      </td>
      <td>
        <span className={`badge ${getCategoryBadgeClass(product.category)}`}>
          {product.category}
        </span>
      </td>
      <td>
        <span className={`badge ${getStockBadgeClass(product.stock)}`}>
          {product.stock}
        </span>
      </td>
      <td>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(product.id)}
        >
          <i className="bi bi-trash me-1"></i> Xoá
        </button>
      </td>
    </tr>
  );
};

// Helper functions for dynamic styling
const getCategoryBadgeClass = (category) => {
  switch(category) {
    case 'Thời trang': return 'bg-success text-white';
    case 'Công nghệ': return 'bg-info text-dark';
    case 'Gia dụng': return 'bg-warning text-dark';
    default: return 'bg-secondary text-white';
  }
};

const getStockBadgeClass = (stock) => {
  if (stock <= 5) return 'bg-danger';
  if (stock <= 10) return 'bg-warning text-dark';
  return 'bg-success';
};

export default ProductItem;