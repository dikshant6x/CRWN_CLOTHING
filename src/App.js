import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navgiation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return <h1>I am at Shop Page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navgiation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};
export default App;
