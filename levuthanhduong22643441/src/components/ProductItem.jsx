import React from 'react';

export default function ProductItem({ product, onDelete }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price.toLocaleString()}₫</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => onDelete(product.id)}
          disabled
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}
