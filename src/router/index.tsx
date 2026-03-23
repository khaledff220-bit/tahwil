import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import About from '@/pages/About';
import PrivacyPolicy from '@/pages/Legal/PrivacyPolicy';
import TermsOfService from '@/pages/Legal/TermsOfService';
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
import AncientPage from '@/pages/Ancient/AncientPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // الصفحات الرئيسية
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <TermsOfService /> },
      
      // صفحات التاريخ
      { path: 'date', element: <DatePage /> },
      { path: 'date/today', element: <TodayDatePage /> },
      { path: 'date/age-calculator', element: <AgeCalculatorPage /> },
      { path: 'date/compare', element: <CompareDatePage /> },
      
      // تحويل العملات (التفصيلي أولاً)
      { path: 'currency/convert/:from/:to', element: <ConvertPair /> },
      { path: 'currency', element: <CurrencyPage /> },
      
      // تحويل الوزن (التفصيلي أولاً)
      { path: 'weight/convert/:from/:to', element: <WeightConvertPair /> },
      { path: 'weight', element: <WeightPage /> },
      
      // تحويل الطول (التفصيلي أولاً)
      { path: 'length/convert/:from/:to', element: <LengthConvertPair /> },
      { path: 'length', element: <LengthPage /> },
      
      // تحويل الحرارة (التفصيلي أولاً)
      { path: 'temperature/convert/:from/:to', element: <TemperatureConvertPair /> },
      { path: 'temperature', element: <TemperaturePage /> },
      
      // المقاييس التراثية (التفصيلي أولاً)
      { path: 'ancient/convert/:from/:to', element: <AncientConvertPair /> },
      { path: 'ancient', element: <AncientPage /> },
      
      // صفحة الخطأ
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
