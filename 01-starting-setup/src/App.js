import React, {useState} from "react";
import Expense from "./components/Expense/Expense";
import NewExpense from "./components/NewExpense/NewExpense"

const DUMMY_EXPENSES = [
  { id:"el1",title: 'Car Insurance', amount: 300.32, date: new Date(2021,11,11) },
  { id:"el2",title: 'truck Insurance', amount: 242.32, date: new Date(2020,10,12) },
  { id:"el3",title: 'speed Insurance', amount: 113.32, date: new Date(2020,5,15) },
  { id:"el4",title: 'avande Insurance', amount: 441.32, date: new Date() }
]

function App() {
  
  const [expenses,setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) =>{
    setExpenses((prevExpenses) => {
      return [expense,...prevExpenses];
    })

  } 

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expense items={expenses}></Expense>
    </div>
  );
}

export default App;
