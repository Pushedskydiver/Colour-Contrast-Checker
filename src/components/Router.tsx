import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:background/:foreground" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
