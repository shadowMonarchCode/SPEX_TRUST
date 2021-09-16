import Customer from "./pages/Customer";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TransferMoney from "./pages/TransferMoney";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/view">
        <Customer />
      </Route>
      <Route exact path="/transfer-money">
        <TransferMoney />
      </Route>
      <Route exact path="/transaction-history">
        <TransactionHistory />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
