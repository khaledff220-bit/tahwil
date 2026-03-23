import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';

// تحميل Google Analytics بشكل غير متزامن
setTimeout(() => {
  import('react-ga4')
    .then(ReactGA => {
      ReactGA.default.initialize("G-79FL78HGER");
      ReactGA.default.send("pageview");
    })
    .catch(() => {
      // تجاهل الأخطاء - الموقع يعمل بدون تحليلات
    });
}, 100);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
