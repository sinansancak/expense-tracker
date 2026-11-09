function Header({ onAddExpense }) {
  // Yeni harcama ekleme penceresini açar.
  // Opens the new expense creation modal.

  return (
    <header className="header">
      <h1>Dashboard</h1>

      <button
        className="add-button"
        onClick={onAddExpense}
      >
        + Harcama Ekle
      </button>
    </header>
  );
}

export default Header;