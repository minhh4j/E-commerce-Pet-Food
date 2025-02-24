import LoginForm from "./authentication/LoginForm";
import Signupdup from "./authentication/SignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Cart from "./cart/Cart";
import Orders from "./cart/Orders";
import PaymentForm from "./cart/PaymentFrom";
import AdminPage from "./admin/AdminPage";
import Dashboard from "./admin/Dashboard";
import HandleProducts from "./admin/HandleProducts";
import UserDetails from "./admin/UserDetails";
import AdminProvider from "./Context/AdminContext";
import DefaultPage from "./homepage/DefaultPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Wishlist from "./wishlist/wishlist";
import ProductInfoPage from "./homepage/ProductInfoModal";


function App() {
  return (
    <Router>
      {/* <ProductProvider> */}
        <AdminProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="signin" element={<Signupdup />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="wishlist" element={<Wishlist />}/>
            <Route path="cartlist" element={<Cart />} />
            <Route path="product/:id" element={<ProductInfoPage />}/>
            <Route path="orders" element={<Orders />} />
            <Route path="payment" element={<PaymentForm />} />
            <Route path="*" element={<DefaultPage/>}/>

            {/* // admmin  */}
            <Route path="adminpage" element={ <AdminPage />}>
            {/* <Route path="adminpage" element={ <ProtectedAdmin><AdminPage /></ProtectedAdmin>}> */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="handle-products" element={<HandleProducts />} />
              <Route path="user-details" element={<UserDetails />} />
            </Route>
          </Routes>
        </AdminProvider>
      {/* </ProductProvider> */}
    </Router>
  );
}

export default App;
