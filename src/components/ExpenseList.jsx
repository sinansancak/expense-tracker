function ExpenseList({
  sortedExpenses,
  formatDate,
  formatMoney,
  editExpense,
  deleteExpense,
}) {
  // Harcama listesi ve işlem butonlarını görüntüler.
  // Displays the expense list and action buttons.

  return (
    <section className="expenses-card">
      <h2>Son Harcamalar</h2>

      {/* Harcama bulunmuyorsa bilgilendirme mesajı gösterir */}
      {/* Displays an information message when no expenses exist */}
      {sortedExpenses.length === 0 ? (
        <p className="empty-message">
          Henüz harcama eklenmedi.
        </p>
      ) : (
        <div className="expense-list">

          {/* Her harcama için ayrı bir liste satırı oluşturur */}
          {/* Creates a separate list row for each expense */}
          {sortedExpenses.map((expense) => (
            <div className="expense-item" key={expense.id}>

              {/* Harcama açıklaması ve tarihi */}
              {/* Expense description and date */}
              <div className="expense-details">
                <strong>{expense.description}</strong>
                <p>{formatDate(expense.date)}</p>
              </div>

              {/* Harcama tutarı ve işlem butonları */}
              {/* Expense amount and action buttons */}
              <div className="expense-actions">

                <strong className="expense-amount">
                  {formatMoney(expense.amount)}
                </strong>

                {/* Harcamayı düzenleme butonu */}
                {/* Expense editing button */}
                <button
                  className="edit-button"
                  onClick={() => editExpense(expense)}
                >
                  Düzenle
                </button>

                {/* Harcamayı silme butonu */}
                {/* Expense deletion button */}
                <button
                  className="delete-button"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Sil
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}

export default ExpenseList;