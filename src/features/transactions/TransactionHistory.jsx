import { useSelector } from "react-redux"; // Import useSelector hook
import { selectHistory } from "./transactionsSlice"; // Import selector for transaction history
import "./transactionHistory.scss";

/** Displays a table row with transaction information  */
const TransactionRow = ({ transaction: { type, amount, balance } }) => (
  <tr>
    <th scope="row">{type}</th>
    <td>{amount.toFixed(2)}</td>
    <td>{balance.toFixed(2)}</td>
  </tr>
);

/** Displays a table of the user's transaction history. */
export default function TransactionHistory() {
  // Get the transaction history from the Redux store using the useSelector hook
  const history = useSelector(selectHistory); // Fetch the transaction history from the store

  return (
    <section className="transactions-history container">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the transactions in `history` to render `TransactionRow`s */}
          {history.map((transaction, index) => (
            <TransactionRow key={index} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
