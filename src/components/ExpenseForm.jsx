function ExpenseForm({
  showForm,
  editId,
  description,
  setDescription,
  amount,
  setAmount,
  date,
  setDate,
  closeForm,
  saveExpense,
  getTodayDate,
}) {
  // Form kapalıysa bileşen herhangi bir içerik göstermez.
  // Renders nothing when the form is closed.
  if (!showForm) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeForm();
        }
      }}
    >
      <form className="modal" onSubmit={saveExpense}>

        {/* Modal başlığı ve kapatma butonu */}
        {/* Modal heading and close button */}
        <div className="modal-header">
          <h2>
            {editId !== null ? "Harcama Düzenle" : "Harcama Ekle"}
          </h2>

          <button
            type="button"
            className="close-button"
            onClick={closeForm}
          >
            &times;
          </button>
        </div>

        {/* Harcama açıklaması giriş alanı */}
        {/* Expense description input field */}
        <label>Harcama Açıklaması</label>

        <input
          type="text"
          placeholder="Örn. Market alışverişi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Harcama tutarı giriş alanı */}
        {/* Expense amount input field */}
        <label>Tutar (TL)</label>

        <input
          type="number"
          placeholder="Örn. 450"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Harcama tarihi seçme alanı */}
        {/* Expense date selection field */}
        <label>Harcama Tarihi</label>

        <input
          type="date"
          value={date}
          max={getTodayDate()}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Form işlemleri: İptal ve Kaydet */}
        {/* Form actions: Cancel and Save */}
        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={closeForm}
          >
            İptal
          </button>

          <button type="submit" className="add-button">
            {editId !== null ? "Güncelle" : "Kaydet"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ExpenseForm;