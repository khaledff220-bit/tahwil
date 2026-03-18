import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import DatePage from '@/pages/date';
import TodayDatePage from '@/pages/TodayDate/TodayDatePage';
import AgeCalculatorPage from '@/pages/AgeCalculator/AgeCalculatorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'date', element: <DatePage /> },
      { path: 'date/today', element: <TodayDatePage /> },
      { path: 'date/age-calculator', element: <AgeCalculatorPage /> },
    ]
  }
]);
