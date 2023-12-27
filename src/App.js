import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [friend,setFriend]=useState('');
  const [friends,setFriends]=useState([]);
  
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
  const [userInput,setuserInput]=useState(false);
  const [expense,setExpense]=useState({
    description:'',
    amount:0,
    type:'',
    paidBy:'',
    userInputs:{}
  })
  //console.log(expense)
  const handleChangeExpense=(e)=>{
      let fieldName=e.target.id;
      let fieldValue=e.target.value;
      setExpense({...expense,[fieldName]:fieldValue})
  }
  const handleUserInputForm=(e)=>{
     const fieldName=e.target.id;
     expense.userInputs[fieldName]=e.target.value
  }



  const [expenses,setExpenses]=useState([]);
  const [userExp,setuserExp]=useState([]);
  const handleAddExpense=(e)=>{
    if(expense.description && expense.amount && expense.paidBy && expense.type){
      if(expense.type==='i'){
        let sum=0;
        for (const key in expense.userInputs) {
          if (Object.hasOwnProperty.call(expense.userInputs, key)) {
            const element = expense.userInputs[key];
            sum=Number(sum)+Number(element)
          }
        }
        //console.log(sum);
        if(Number(sum)!==Number(expense.amount)){
          alert('Split sum is not equal to Total expense')
        }else{
          let tmp=expenses;
          //let splitType=expense.type;
          let numberOfFriends=friends.length;
          expense.split=Number(expense.amount)/numberOfFriends;
          expense._id=uuidv4();
          tmp.push(expense);
          setExpenses(tmp);
          friends.forEach(element => {
            let tmp2={}
            let tmp3=userExp;
              if(expense.paidBy===element){
                tmp2.spentOn=element;
                tmp2.paidBy=expense.paidBy;
                tmp2.flow='i';
                tmp2.amount=expense.amount-(expense.userInputs[element])
                tmp3.push(tmp2)
                setuserExp(tmp3)
              }else{
                tmp2.spentOn=element;
                tmp2.paidBy=expense.paidBy;
                tmp2.flow='o';
                tmp2.amount=expense.userInputs[element];
                tmp3.push(tmp2)
                setuserExp(tmp3)
              }
           });
           setExpense({
            description:'',
            amount:0,
            type:'',
            paidBy:'',
            userInputs:{}
          }) 
          setuserInput(false)
        }
      }
      if(expense.type==='e'){
        let tmp=expenses;
        //let splitType=expense.type;
        let numberOfFriends=friends.length;
        expense.split=Number(expense.amount)/numberOfFriends;
        expense._id=uuidv4();
        tmp.push(expense);
        setExpenses(tmp);
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
         
        setExpense({
          description:'',
          amount:0,
          type:'',
          paidBy:'',
          userInputs:{}
        })        
      }
    
    }
      
  }
  //console.log(expenses)
  //console.log(userExp)

  return (
    <div className="w-full h-full">
      
      {/* friends input */}
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

      {/* friends list */}
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

      {/* expenses enable button */}
      <button className="m-5 py-1 px-2 bg-[#718355] text-white rounded-md"
       onClick={(e)=>{
         setLock(true)
       }}
      >Start Expenses</button>


      {lock && 
      <div>

        {/* expense input */}
        <div className="flex flex-wrap items-center bg-[#97A97C]">
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Description*</span>
            <input type='text' id='description' placeholder="Movie" value={expense.description}
            className="peer outline-none p-1 border-2" onChange={(e)=>{
              handleChangeExpense(e)
            }}/>
          </label>
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Amount*</span>
            <input type='text' id='amount' placeholder="200" value={expense.amount}
            className="peer outline-none p-1 border-2" onChange={(e)=>{
              handleChangeExpense(e)
            }}/>
          </label>
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Type*</span>
            <select className="outline-none p-1 border-2" id='type' value={expense.type}
            onChange={(e)=>{
              if(e.target.value==='i'){
                setuserInput(true);
              }
              else if(e.target.value==='e'){
                setuserInput(false);
              }
              handleChangeExpense(e)
            }}>
              <option></option>
              <option value='e'>Split Equally</option>
              <option value='i'>User Input</option>
            </select>
          </label>
          <label class="block m-5">
            <span class="block text-sm font-medium text-slate-700">Paid By*</span>
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

         <button className="my-2 p-2 ml-5 bg-[#718355] text-white rounded-md"
          onClick={(e)=>{
            handleAddExpense(e)
          }}
         >Add Expense</button>
          
        </div> 
        
        {/* user input form */}
        { userInput && <div className="mt-2 m-5">
            {
              friends.length>0 && friends.map((item,index)=>{
                   let statevalue=expense.userInputs[friends[index]];
                   //console.log(statevalue)
                   return(
                      <div>
                         <p>{item}*</p>
                         <input  type="text"  id={item} placeholder="enter amount" className="peer outline-none p-1 border-2"
                           value={statevalue}
                           onChange={(e)=>{
                              handleUserInputForm(e)
                           }}
                         />
                      </div>
                   )
              })
            }
         </div>
        }


        {/* expense list */}
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
          {expenses && expenses.map((item,index)=>{
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
      
        {/* Friend expenses cards */}
        <div className="my-10 flex flex-wrap mx-5">

          {
            friends.length>0 && friends.map((item,index)=>{
              return (
                <div key={index} >
                    <div className="card card-compact w-80 bg-[#B5C99A] shadow-xl my-4 mx-2">
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
