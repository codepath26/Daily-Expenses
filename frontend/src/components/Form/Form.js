import React, {  useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";

function Form() {
  const { addIncome } = useGlobalContext();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = (e) => {
    
    console.log(addIncome)
    e.preventDefault();
    console.log(title,amount,date,category,description);
    const income = { title, amount, description, category, date }
    addIncome(income);
    setAmount('');
    setTitle('');
    setDate('');
    setCategory('');
    setDescription('');
  };

  return (
    <form className="ms-2" onSubmit={handleSubmit}>
      {/* {error && <p>{error}</p>} */}
      <div className="h-[35px] mt-2 rounded-[2px]">
        <input  
          required
          className="w-full h-full border-2 border-white bg-gray-100  ps-2 rounded-[3px]"
          type="text"
          value={title}
          placeholder="Income Source"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="h-[35px] mt-2 rounded-[2px]" >
        <input  
          required
          className="w-full h-full border-2 border-white bg-gray-100  ps-2 rounded-[3px]"
          type="number"
          value={amount}
          placeholder="Income Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="h-[35px] mt-2 rounded-[2px]">
        <input  
          required
          className="w-full h-full border-2 border-white bg-gray-100  ps-2 rounded-[3px]"
          type="date"
          value={date}
          placeholder="Enter a Date"
          selected={date}
          // dateFormate="dd/MM/yyyy"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="h-[35px] mt-2 rounded-[2px]">
        <select  
          required
          className="w-full h-full border-2 border-white bg-gray-100  ps-2 rounded-[3px]"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="rounded-[2px] mt-2">
        <textarea  
          required
          className="w-full h-full border-2 border-white bg-gray-100  ps-2 rounded-[3px] pt-1"
        name="description" id="description" cols="5" rows="4" value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Add a Reference"></textarea>
      </div>
      <div className="border mt-5 text-center">
        <button type="submit" className="bg-purple-600 p-2 border-none rounded-md text-white font-bold">
          Add Income
        </button>
      </div>
    </form>
  );
}

export default Form;
