import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import DatePage from '@/pages/date';
import TodayDatePage from '@/pages/TodayDate/TodayDatePage';
import AgeCalculatorPage from '@/pages/AgeCalculator/AgeCalculatorPage';
import CompareDatePage from '@/pages/CompareDate/CompareDatePage';
import NotFoundPage from '@/pages/404/NotFoundPage';
import CurrencyPage from '@/pages/Currency/CurrencyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // الهيكل الرئيسي للموقع
    children: [
      { index: true, element: <Home /> },
      { path: 'date', element: <DatePage /> },
      { path: 'date/today', element: <TodayDatePage /> },
      { path: 'date/age-calculator', element: <AgeCalculatorPage /> },
      { path: 'date/compare', element: <CompareDatePage /> },
      { path: 'currency', element: <CurrencyPage /> },
      // وضع صفحة 404 هنا يجعلها تظهر بداخل التصميم العام للموقع
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
