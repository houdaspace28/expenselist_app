import { useState } from 'react'
import './App.css'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseForm from './components/ExpenseForm'



function App() {
 const [expenses, setExpenses]=useState([{id:1,description:"Apple",amount:5,category:"Groceries"},{id:2,description:"Potatoes",amount:4,category:"Groceries"}])
 const [selectedCategory,setSelectedCategory]=useState("");
 const visibleExpenses=selectedCategory ? expenses.filter(expense => expense.category === selectedCategory) : expenses;


  return (
    <>
    <div className="mb-5">
       <ExpenseForm onSubmit={(expense)=>setExpenses([...expenses,{...expense,id:expenses.length+1}])}/>
    </div>
    <div className="mb-3">
    <ExpenseFilter onSelectCategory={category=>setSelectedCategory(category)}/>
    </div>
    {expenses.length !==0 && <ExpenseList expenses={visibleExpenses} onDelete={(id) =>setExpenses([...visibleExpenses.filter(expense => expense.id !== id)])}/>}
    </>
  )
}

export default App
