// Open and Close Add Transaction Section
const plusBtn = document.querySelector("#plus-btn");
function addTranscationSectionSlide(){
    const addTransSection = document.querySelector("#add-transactions");
    if(plusBtn.innerHTML === "+"){
        addTransSection.style.transform = "translateY(0vh)";
        plusBtn.innerHTML = "-"
        plusBtn.style.marginTop = "2rem"
    }
    else{
        addTransSection.style.transform = "translateY(100vh)";
        plusBtn.innerHTML = "+"
        plusBtn.style.marginTop = "-10rem"
    }
}
plusBtn.addEventListener("click", addTranscationSectionSlide);

//Total Balance
let balance = 0;
let totalBalance = document.querySelector("#total-balance-number")

//Add Income
let income = 0;
const incomeForm = document.querySelector("#income-form");
function addIncome(){
    let incomeFigure = document.querySelector("#income-figure");
    let incomeText = document.querySelector("#income-text");
    let historyContainer = document.querySelector("#income-history")
    let totalIncome = document.querySelector("#total-income");
    let loading = document.querySelector(".lds-ellipsis");
    
    // Stop animation
    document.querySelector("#transaction-form").style.display = "block";
    loading.style.display = "none"
   
    
    // Add to Total Income
    income += Number(incomeFigure.value);
    totalIncome.innerHTML = `<img src="images/naira.png" height="15px"/>${income.toLocaleString()}`;

    // Add to Total Balance
    balance += Number(incomeFigure.value);
    totalBalance.innerHTML = `<img src="images/naira.png" height="35px"/>${balance.toLocaleString()}`;

    //Add to history
    let newIncome = document.createElement("li")
    newIncome.innerHTML = `<p class="note">${incomeText.value}</p>
    <p class="income-cost"><img src="images/green-naira.png" height="11px" />${(Number(incomeFigure.value)).toLocaleString()}</p>`;
    historyContainer.appendChild(newIncome);

    storeIncomeInLs(incomeFigure.value, incomeText.value);

    incomeFigure.value = "";
    incomeText.value = "";
}
incomeForm.addEventListener("submit", function(e){

    let incomeFigure = document.querySelector("#income-figure");
    let incomeText = document.querySelector("#income-text");
    let loading = document.querySelector(".lds-ellipsis");

     //Empty Input warning
     if(incomeFigure.value === "" || incomeText.value === ""){
        alert("You need to add an amount and a note");
    }
    else{

    document.querySelector("#transaction-form").style.display = "none";
    loading.style.marginTop = "35vh"
    loading.style.display = "inline-block"

    setTimeout(addIncome, 1000);
    }
    e.preventDefault();
});

//Store Income in local storage
function storeIncomeInLs(figure, text){
    let incomeDetails;
    if(localStorage.getItem('incomeDetails') === null){
        incomeDetails = [];
    } else{
        incomeDetails = JSON.parse(localStorage.getItem('incomeDetails'));
    }
    incomeDetails.push({ amount:figure, note: text})
    localStorage.setItem('incomeDetails', JSON.stringify(incomeDetails))

}



//Add Expense
let expense = 0; 
const expenseForm = document.querySelector("#expense-form");
function addExpense(){
    let expenseFigure = document.querySelector("#expense-figure");
    let expenseText = document.querySelector("#expense-text");
    let historyContainer = document.querySelector("#expense-history")
    let totalExpense = document.querySelector("#total-expenses");
    let loading = document.querySelector(".lds-ellipsis");
    
    // Stop animation
    document.querySelector("#transaction-form").style.display = "block";
    loading.style.display = "none"

    //Add to Total Expense
    expense += Number(expenseFigure.value);
    totalExpense.innerHTML = `<img src="images/naira.png" height="15px"/>${expense.toLocaleString()}`;

    // Subtract from Total Balance
    balance -= Number(expenseFigure.value);
    totalBalance.innerHTML = `<img src="images/naira.png" height="35px"/>${balance.toLocaleString()}`

    //Add to History
    let newExpense = document.createElement("li")
    newExpense.innerHTML = `<p class="note">${expenseText.value}</p>
    <p class="expense-cost"><img src="images/red-naira.png" height="11px" />${(Number(expenseFigure.value)).toLocaleString()}</p>`;
    historyContainer.appendChild(newExpense);
    storeExpensesInLs(expenseFigure.value, expenseText.value)

    expenseFigure.value = "0.00"
    expenseText.value = "Note"
}
expenseForm.addEventListener("submit", function(e){

    let expenseFigure = document.querySelector("#expense-figure");
    let expenseText = document.querySelector("#expense-text");
    let loading = document.querySelector(".lds-ellipsis");
    
    
    //Empty Input Warning
    if(expenseFigure.value === "" || expenseText.value === ""){
        alert("You need to add an amount and a note");
    }
    else{

    document.querySelector("#transaction-form").style.display = "none";
    loading.style.marginTop = "35vh"
    loading.style.display = "inline-block"

    setTimeout(addExpense, 1000);
    }

    e.preventDefault();
})


//Store Expense in Local Storage
function storeExpensesInLs(figure, text){
    let expenseDetails;
    if(localStorage.getItem('expenseDetails') === null){
        expenseDetails = [];
    } else{
        expenseDetails = JSON.parse(localStorage.getItem('expenseDetails'));
    }
    expenseDetails.push({ amount:figure, note: text})
    localStorage.setItem('expenseDetails', JSON.stringify(expenseDetails))

}


//Retrieve Income values from local storage
getIncome()
function getIncome(){
    let incomeDetails;
    if(localStorage.getItem('incomeDetails') === null){
        incomeDetails = [];
    } else{
        incomeDetails = JSON.parse(localStorage.getItem('incomeDetails'));
    }
    
    incomeDetails.forEach(function(object){
        let historyContainer = document.querySelector("#income-history")
        let totalIncome = document.querySelector("#total-income");
        
        // Add to Total Income
        income += Number(object.amount);
        totalIncome.innerHTML = `<img src="images/naira.png" height="15px"/>${income.toLocaleString()}`;
    
        // Add to Total Balance
        balance += Number(object.amount);
        totalBalance.innerHTML = `<img src="images/naira.png" height="35px"/>${balance.toLocaleString()}`;
    
        //Add to history
        let newIncome = document.createElement("li")
        newIncome.innerHTML = `<p class="note">${object.note}</p>
        <p class="income-cost"><img src="images/green-naira.png" height="11px" />${(Number(object.amount)).toLocaleString()}</p>`;
        historyContainer.appendChild(newIncome);
    })
}
document.addEventListener('DOMcontentloaded', getIncome);



//Retrieve Expense values from local storage
getExpense()
function getExpense(){
    let expenseDetails;
    if(localStorage.getItem('expenseDetails') === null){
        expenseDetails = [];
    } else{
        expenseDetails = JSON.parse(localStorage.getItem('expenseDetails'));
    }
    
    expenseDetails.forEach(function(object){
        let historyContainer = document.querySelector("#expense-history")
        let totalExpense = document.querySelector("#total-expenses");
        
        // Add to Total Income
        expense += Number(object.amount);
        totalExpense.innerHTML = `<img src="images/naira.png" height="15px"/>${expense.toLocaleString()}`;
    
        // Add to Total Balance
        balance -= Number(object.amount);
        totalBalance.innerHTML = `<img src="images/naira.png" height="35px"/>${balance.toLocaleString()}`;
    
        //Add to history
        let newIncome = document.createElement("li")
        newIncome.innerHTML = `<p class="note">${object.note}</p>
         <p class="expense-cost"><img src="images/red-naira.png" height="11px" />${(Number(object.amount)).toLocaleString()}</p>`;
        historyContainer.appendChild(newIncome);
    })
}
document.addEventListener('DOMcontentloaded', getExpense);


//Clear Action
const clearBtn = document.querySelector("#clear-btn");
function clearThings(){
    if (confirm("Are you sure you want to clear your transaction history?")){
    income = 0;
    expense = 0;
    balance = 0;

    let totalIncome = document.querySelector("#total-income");
    totalIncome.innerHTML = `<img src="images/naira.png" height="15px"/>0.00`;

    let totalExpense = document.querySelector("#total-expenses");
    totalExpense.innerHTML = `<img src="images/naira.png" height="15px"/>0.00`;

    totalBalance.innerHTML = `<img src="images/naira.png" height="35px"/>0.00`;

    let incomeHistoryContainer = document.querySelector("#income-history");
    incomeHistoryContainer.innerHTML = "";

    let expenseHistoryContainer = document.querySelector("#expense-history");
    expenseHistoryContainer.innerHTML = "";

    localStorage.clear();
    }
}
clearBtn.addEventListener("click", clearThings)