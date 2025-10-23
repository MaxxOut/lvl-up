import { useRoutes } from 'react-router-dom';
import routes from './routes/AppRoutes';
import '@/assets/scss/App.scss';

function App() {
  return useRoutes(routes);
}

export default App
