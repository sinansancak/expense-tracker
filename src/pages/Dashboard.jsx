import { useEffect, useState } from "react";

import Header from "../components/Header.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";

// Bugünün tarihini YYYY-AA-GG formatında alır.
// Gets today's date in YYYY-MM-DD format.
function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Tarihi Türkçe tarih formatında görüntüler.
// Displays the date in Turkish date format.
function formatDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString("tr-TR");
}

// Sayıları Türk Lirası formatında görüntüler.
// Displays numbers in Turkish Lira format.
function formatMoney(amount) {
  return amount.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
}

function Dashboard() {
  // LocalStorage üzerinden kayıtlı harcamaları yükler.
  // Loads saved expenses from LocalStorage.
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");

      // Kayıtlı verileri JavaScript dizisine dönüştürür.
      // Converts saved data into a JavaScript array.
      const parsedExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
        
      // Gelen verinin dizi olup olmadığını kontrol eder.
      // Checks whether the retrieved data is an array.
      return Array.isArray(parsedExpenses) ? parsedExpenses : [];
    }
    catch (error) {
      console.error("Harcamalar yüklenemedi:", error);
      return [];
    }
  });

  // Form penceresinin açık veya kapalı olmasını kontrol eder.
  // Controls whether the form modal is open or closed.
  const [showForm, setShowForm] = useState(false);

  // Form alanlarının değerlerini tutar.
  // Stores the values of the form fields.
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getTodayDate());

  // Düzenlenen harcamanın ID bilgisini tutar.
  // Stores the ID of the expense being edited.
  const [editId, setEditId] = useState(null);

  // Harcamalar değiştiğinde LocalStorage verilerini günceller.
  // Updates LocalStorage whenever expenses change.
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (error) {
      console.error("Harcamalar kaydedilemedi:", error);
    }
  }, [expenses]);

  // Bütün harcamaların toplamını hesaplar.
  // Calculates the total amount of all expenses.
  const totalExpense = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

  // Yalnızca bugünün harcamalarının toplamını hesaplar.
  // Calculates the total amount of today's expenses only.
  const todayExpense = expenses
    .filter((expense) => expense.date === getTodayDate())
    .reduce((total, expense) => total + Number(expense.amount), 0);

  // Form alanlarını temizler.
  // Clears all form fields.
  function resetForm() {
    setDescription("");
    setAmount("");
    setDate(getTodayDate());
    setEditId(null);
  }

  // Form penceresini kapatır ve alanları sıfırlar.
  // Closes the form modal and resets its fields.
  function closeForm() {
    setShowForm(false);
    resetForm();
  }

  // Yeni harcama ekler veya mevcut harcamayı günceller.
  // Adds a new expense or updates an existing expense.
  function saveExpense(e) {
    e.preventDefault();

    // Girilen tutarı sayısal değere dönüştürür.
    // Converts the entered amount into a numeric value.
    const numericAmount = Number(amount);

    // Boş veya geçersiz bilgilerin kaydedilmesini engeller.
    // Prevents empty or invalid information from being saved.
    if (
      !description.trim() ||
      !amount ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !date ||
      date > getTodayDate()
    ) {
      return;
    }

    if (editId !== null) {
      // Mevcut harcamayı günceller.
      // Updates the existing expense.
      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === editId ? {
                ...expense,
                description: description.trim(),
                amount: numericAmount,
                date: date,
              } : expense
            )
      );
    }
    else {
      // Yeni harcama nesnesi oluşturur.
      // Creates a new expense object.
      const newExpense = {
        id: Date.now(),
        description: description.trim(),
        amount: numericAmount,
        date: date,
      };

      // Yeni harcamayı mevcut listeye ekler.
      // Adds the new expense to the existing list.
      setExpenses((previousExpenses) => [
        ...previousExpenses,
        newExpense,
      ]);
    }

    closeForm();
  }

  // Düzenlenecek harcamayı forma aktarır.
  // Loads the selected expense into the form for editing.
  function editExpense(expense) {
    setEditId(expense.id);
    setDescription(expense.description);
    setAmount(String(expense.amount));
    setDate(expense.date);
    setShowForm(true);
  }

  // Seçilen harcamayı listeden siler.
  // Deletes the selected expense from the list.
  function deleteExpense(id) {
    // Silme işleminden önce kullanıcıdan onay ister.
    // Asks the user for confirmation before deleting.
    const confirmed = window.confirm(
      "Bu harcamayı silmek istediğine emin misin? / Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    // ID bilgisi eşleşmeyen harcamaları korur.
    // Keeps expenses whose IDs do not match.
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  }

  // Harcamaları en yeni tarihten en eskiye doğru sıralar.
  // Sorts expenses from newest date to oldest.
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }

    return b.id - a.id;
  });

  return (
    <div className="container">

      {/* Sayfa başlığı ve harcama ekleme butonu */}
      {/* Page heading and add expense button */}
      <Header
        onAddExpense={() => {
          resetForm();
          setShowForm(true);
        }}
      />

      {/* Harcama ekleme ve düzenleme formu */}
      {/* Expense creation and editing form */}
      <ExpenseForm
        showForm={showForm}
        editId={editId}
        description={description}
        setDescription={setDescription}
        amount={amount}
        setAmount={setAmount}
        date={date}
        setDate={setDate}
        closeForm={closeForm}
        saveExpense={saveExpense}
        getTodayDate={getTodayDate}
      />

      {/* Harcama özet kartları */}
      {/* Expense summary cards */}
      <SummaryCards
        todayExpense={todayExpense}
        totalExpense={totalExpense}
        formatMoney={formatMoney}
      />

      {/* Harcama listesi */}
      {/* Expense list */}
      <ExpenseList
        sortedExpenses={sortedExpenses}
        formatDate={formatDate}
        formatMoney={formatMoney}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />

    </div>
  );
}

export default Dashboard;