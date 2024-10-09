import TransactionHistory from "../features/transactions/TransactionHistory";
import Transactions from "../features/transactions/Transactions";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "../app/store"; // Import the Redux store

import "./app.css";

export default function App() {
  return (
    <Provider store={store}> {/* Wrap the app in the Provider */}
      <main>
        <h1>Bank Account</h1>
        <Transactions />
        <TransactionHistory />
      </main>
    </Provider>
  );
}
