import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import DatePage from '@/pages/date';
import TodayDatePage from '@/pages/TodayDate/TodayDatePage';
import AgeCalculatorPage from '@/pages/AgeCalculator/AgeCalculatorPage';
import CompareDatePage from '@/pages/CompareDate/CompareDatePage';
import NotFoundPage from '@/pages/404/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // هذا هو الـ Layout الرئيسي الذي يحتوي على Header و Footer
    children: [
      { index: true, element: <Home /> },
      { path: 'date', element: <DatePage /> },
      { path: 'date/today', element: <TodayDatePage /> },
      { path: 'date/age-calculator', element: <AgeCalculatorPage /> },
      { path: 'date/compare', element: <CompareDatePage /> },
      // وضع 404 هنا يضمن ظهور الهيدر والفوتر حول رسالة الخطأ
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
