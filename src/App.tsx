import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import AntypediaPage from './components/AntypediaPage';
import AdminPage from './components/AdminPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <BlogPage />;
      case 'antypedia':
        return <AntypediaPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;