import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import WeightPage from '@/pages/Weight/WeightPage';
import WeightConvertPair from '@/pages/Weight/WeightConvertPair';
import DatePage from '@/pages/Date/DatePage';
import TodayDatePage from '@/pages/TodayDate/TodayDatePage';
import LengthConvertPair from '@/pages/Length/LengthConvertPair';
import AgeCalculatorPage from '@/pages/AgeCalculator/AgeCalculatorPage';
import CompareDatePage from '@/pages/CompareDate/CompareDatePage';
import NotFoundPage from '@/pages/404/NotFoundPage';
import LengthPage from '@/pages/Length/LengthPage';
import CurrencyPage from '@/pages/Currency/CurrencyPage';
import ConvertPair from '@/pages/Currency/ConvertPair';
import AncientConvertPair from '@/pages/Ancient/AncientConvertPair';
import TemperaturePage from '@/pages/Temperature/TemperaturePage';
import TemperatureConvertPair from '@/pages/Temperature/TemperatureConvertPair';
import AncientPage from '@/pages/Ancient/AncientPage'; // ✅ إضافة صفحة المقاييس التراثية

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'date', element: <DatePage /> },
      { path: 'date/today', element: <TodayDatePage /> },
      { path: 'date/age-calculator', element: <AgeCalculatorPage /> },
      { path: 'date/compare', element: <CompareDatePage /> },
      // 👇 الترتيب الصحيح: التفصيلي أولاً
      { path: 'currency/convert/:from/:to', element: <ConvertPair /> },
      { path: 'currency', element: <CurrencyPage /> },
      { path: 'weight/convert/:from/:to', element: <WeightConvertPair /> },
      { path: 'weight', element: <WeightPage /> },
      { path: 'length/convert/:from/:to', element: <LengthConvertPair /> },
      { path: 'length', element: <LengthPage /> },
      { path: 'temperature/convert/:from/:to', element: <TemperatureConvertPair /> },
      { path: 'temperature', element: <TemperaturePage /> },
      { path: 'ancient/convert/:from/:to', element: <AncientConvertPair /> },
      { path: 'ancient', element: <AncientPage /> },
      { path: 'ancient', element: <AncientPage /> }, // ✅ مسار المقاييس التراثية
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
