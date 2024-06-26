import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:background/:foreground" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
