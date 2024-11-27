import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './page/Dashboard';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Layout/>}>
        <Route exact index element={<Dashboard/>} />
        
      </Route>
    </Routes>
  );
}

export default App;
