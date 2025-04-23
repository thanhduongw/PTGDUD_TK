import React from 'react';

const ProductItem = ({ product, index, onDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.price.toLocaleString('vi-VN')} đ</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(product.id)}
        >
          Xoá
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;