import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-cairo" dir="rtl">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
