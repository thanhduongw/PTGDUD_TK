import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Quản lý Sản phẩm</span>
        </div>
      </nav>
      
      <ProductList />
    </div>
  );
}

export default App;