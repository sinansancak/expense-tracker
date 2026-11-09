function SummaryCards({ todayExpense, totalExpense, formatMoney }) {
  // Harcama özet kartlarını görüntüler.
  // Displays the expense summary cards.

  return (
    <section className="summary-grid">

      {/* Bugünün toplam harcaması */}
      {/* Today's total expenses */}
      <div className="summary-card">
        <p>Bugün</p>
        <h2>{formatMoney(todayExpense)}</h2>
      </div>

      {/* Bütün harcamaların toplamı */}
      {/* Total amount of all expenses */}
      <div className="summary-card">
        <p>Toplam Harcama</p>
        <h2>{formatMoney(totalExpense)}</h2>
      </div>

    </section>
  );
}

export default SummaryCards;