import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [friend,setFriend]=useState('');
  const [friends,setFriends]=useState([])
  
  const handleAddFriend=(e)=>{
    if(friend!==''){
      let tmp=friends;
      tmp.push(friend);
      setFriends(tmp);
      setFriend('');
    }  
    
  }
  const handleRemoveFriend=(item)=>{
    let tmp=friends;
    tmp=tmp.filter((i)=>i!==item);
    setFriends(tmp);
    setFriend('');
  }
  // console.log(friends);
  
  const [lock,setLock]=useState(false);
  const [expense,setExpense]=useState({
    description:'',
    amount:0,
    type:'',
    paidBy:''
  })
  // console.log(expense)
  const handleChangeExpense=(e)=>{
      let fieldName=e.target.id;
      let fieldValue=e.target.value;
      setExpense({...expense,[fieldName]:fieldValue})
  }
  const [expenses,setExpenses]=useState([]);
  const [userExp,setuserExp]=useState([]);
  const handleAddExpense=(e)=>{
    if(expense.description){
     let tmp=expenses;
     let splitType=expense.type;
     let numberOfFriends=friends.length;
     expense.split=Number(expense.amount)/numberOfFriends;
     expense._id=uuidv4();
     tmp.push(expense);
     setExpenses(tmp);
     setExpense({
      description:'',
      amount:0,
      type:'',
      paidBy:''
     })
     if(splitType==='e'){
       friends.forEach(element => {
        let tmp2={}
        let tmp3=userExp;
          if(expense.paidBy===element){
            tmp2.spentOn=element;
            tmp2.paidBy=expense.paidBy;
            tmp2.flow='i';
            tmp2.amount=(numberOfFriends-1)*[(expense.amount)/numberOfFriends];
            tmp3.push(tmp2)
            setuserExp(tmp3)
          }else{
            tmp2.spentOn=element;
            tmp2.paidBy=expense.paidBy;
            tmp2.flow='o';
            tmp2.amount=(expense.amount)/numberOfFriends;
            tmp3.push(tmp2)
            setuserExp(tmp3)
          }
       });
     }
    }
  }
  console.log(expenses)
  console.log(userExp)

  return (
    <div className="w-full h-full">
      <div className="bg-[#CFE189]">
        <input type="text" placeholder="Add friend" value={friend} onChange={(e)=>{
            setFriend(e.target.value)
          }}
          // size={30}
         className="m-5 outline-none p-1 w-56"
         disabled={lock}
         />
         <button className="py-1 px-2 bg-[#718355] text-white rounded-md"
          onClick={(e)=>{
            handleAddFriend(e)
          }}
          disabled={lock}
         >Add</button>
      </div>
      <div className="m-5 flex flex-wrap space-x-2">
      {
          friends &&  friends.map((item,index)=>{
             return (
             <div key={index} className="my-2 bg-[#718355] w-fit rounded-md flex">
               <p className="text-white p-2">{item}</p>
               {!lock && <button className="px-2 text-white" onClick={(e)=>{
                  handleRemoveFriend(item);
               }}>x</button>
               }
             </div>
             )
          })
      }
      </div>
      <button className="m-5 py-1 px-2 bg-[#718355] text-white rounded-md"
       onClick={(e)=>{
         setLock(true)
       }}
      >Start Expenses</button>
      {lock && 
      <div>
        <div className="flex flex-wrap items-center bg-[#97A97C]">
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Description</span>
            <input type='text' id='description' placeholder="Movie" value={expense.description}
            className="peer outline-none p-1 border-2" onChange={(e)=>{
              handleChangeExpense(e)
            }}/>
          </label>
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Amount</span>
            <input type='text' id='amount' placeholder="200" value={expense.amount}
            className="peer outline-none p-1 border-2" onChange={(e)=>{
              handleChangeExpense(e)
            }}/>
          </label>
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Type</span>
            <select className="outline-none p-1 border-2" id='type' value={expense.type}
            onChange={(e)=>{
              handleChangeExpense(e)
            }}>
              <option></option>
              <option value='e'>Split Equally</option>
              <option value='i'>user Input</option>
            </select>
          </label>
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Paid By</span>
            <select className="outline-none p-1 border-2" id='paidBy' value={expense.paidBy}
            onChange={(e)=>{
              handleChangeExpense(e)
            }}>
              <option></option>
              {friends && friends.map((item)=>{
                return(
                  <option value={item}>{item}</option>
                )
              })
              }
            </select>
          </label>

         <button className="my-auto p-2 ml-5 bg-[#718355] text-white rounded-md"
          onClick={(e)=>{
            handleAddExpense(e)
          }}
         >Add Expense</button>

        </div> 
        <div className="m-2">
        {expenses.length>0 && 
        <div className="flex my-5">
          <p className="mx-2 w-10">S.NO</p>
          <p className="mx-2 w-44">DESCRIPTION</p>
          <p className="mx-2 w-24">AMOUNT</p>
          <p className="mx-2 w-24">TYPE</p>
          <p className="mx-2 w-44">PAID BY</p>
        </div> 
        }
        {
          expenses && expenses.map((item,index)=>{
              return (
                <div key={index} className="flex">
                  <p className="mx-2 w-10">{index+1}</p>
                  <p className="mx-2 w-44">{item.description}</p>
                  <p className="mx-2 w-24">{item.amount}</p>
                  <p className="mx-2 w-24">{item.type==='e'?'Equal':'Input'}</p>
                  <p className="mx-2 w-44">{item.paidBy}</p>
                </div>
              )
          })
        }

      </div>
       <div className="my-10 flex flex-wrap m-5">

       {
        friends.length>0 && friends.map((item,index)=>{
          return (
            <div key={index} >
                <div className="card card-compact w-96 bg-[#B5C99A] shadow-xl my-4">
                  <div className="card-body">
                    <h2 className="card-title">{item}</h2>
                    {
                      userExp.length>0 && userExp.map((uexp,uexpIndex)=>{
                        return (
                          <>
                           {
                            (uexp.flow==='i' && uexp.spentOn===item) &&
                            <p key={uexpIndex}>{uexp.spentOn} lended rs.{uexp.amount}</p>
                           }
                           {
                            (uexp.flow==='o' && uexp.spentOn===item) && 
                            <p key={uexpIndex}>{uexp.spentOn} owes rs.{uexp.amount} to {uexp.paidBy}</p>
                           }
                          </>
                        )
                      })
                    }
                    
                  </div>
                </div>
            </div>
          )
        })
       }
       </div>

      </div>
      }
      
    </div>
  );
}

export default App;
