import './App.css';
import Login from './component/login/login';
import Registration from './component/registration/registration';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import Dashboard from './component/Dashboard/dashboard';
import Products from './component/products/products';
import Order from './component/createorder/order';
import Ordersummary from './component/ordersymmary/ordersummary';
function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/ordersummary" element={<Ordersummary/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

