import React from 'react'

const BalanceForm = ({balanceModal, incomeAmount, setIncomeAmount, addBalance, setBalanceModal}) => {
  return (
    <>
    {balanceModal && (
        <div className="modal">
          <div className="box">
            <h2>Income Amount</h2>
            <div className="input-row">
              <input
                type="text"
                placeholder="income amount"
                value={incomeAmount}
                onChange={(e) => {
                  setIncomeAmount(e.target.value);
                }}
              />
              <button
                className="add"
                onClick={(e) => {
                  addBalance();
                }}
              >
                {" "}
                Add Income{" "}
              </button>
              <button
                className="cancel"
                onClick={(e) => {
                  setBalanceModal(!balanceModal);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  )
}

export default BalanceForm