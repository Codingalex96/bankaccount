import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, transfer, selectBalance } from "./transactionsSlice";
import "./transactions.scss";

export default function Transactions() {
  const balance = useSelector(selectBalance);
  const dispatch = useDispatch();

  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages

  const onTransaction = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    const amount = +amountStr;

    // Basic validation
    if (amount <= 0) {
      setErrorMessage("Amount must be greater than 0.");
      return;
    }

    if (action === "transfer" && recipient.trim() === "") {
      setErrorMessage("Recipient name must be provided for a transfer.");
      return;
    }

    // Dispatch the appropriate action and reset error message
    if (action === "deposit") {
      dispatch(deposit({ amount }));
    } else if (action === "withdraw") {
      if (balance >= amount) {
        dispatch(withdrawal({ amount }));
      } else {
        setErrorMessage("Insufficient balance for withdrawal.");
        return;
      }
    } else if (action === "transfer") {
      if (balance >= amount) {
        dispatch(transfer({ amount, recipient }));
      } else {
        setErrorMessage("Insufficient balance for transfer.");
        return;
      }
    }

    setErrorMessage(""); // Clear error message on successful transaction
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">Deposit</button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}