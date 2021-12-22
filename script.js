//Data
const account1 = {
    title: 'Rumeysa Var',
    movements: [550, -300, -230, 2400, -870, -120, 300, 900, -420],
    rate: 0.8, 
    pin: 1111,
  };
  
  const account2 = {
    title: 'Harry Potter',
    movements: [1000, 3400, -50, 680, -4000, 500, -1500, 150, 300],
    rate: 1.2,
    pin: 2222,
  };
  
  const account3 = {
    title: 'Jack Sparrow',
    movements: [4400, 1250, -900, 30, 90, -250, 800, -2300, 5320],
    rate: 0.9,
    pin: 3333,
  };
  
  const account4 = {
    title: 'Bugs Bunny',
    movements: [120, -850, 700, -40, 830],
    rate: 1,
    pin: 4444,
  };
   
const accounts = [account1, account2, account3, account4];

// Choose elements
const message = document.querySelector('.message');
//Buttons
const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.form-btn-transfer');
const btnLoan = document.querySelector('.form-btn-loan');
const btnClose = document.querySelector('.form-btn-close');
//Summary Field
const fieldAmount = document.querySelector('.amount-value');
const fieldSumIn = document.querySelector('.summary-value--in');
const fieldSumOut = document.querySelector('.summary-value--out');
const fieldSumInterest = document.querySelector('.summary-value--interest');
//
const mainContainer = document.querySelector('.main-container');
const movementsField = document.querySelector('.movements');
//
const inputLoginUser = document.querySelector('.login-user');
const inputLoginPin = document.querySelector('.login-pin');
const inputTransfer = document.querySelector('.form-input-to');
const inputTransferAmount = document.querySelector('.form-input-amount');
const inputLoanAmount = document.querySelector('.form-input-loan');
const inputDeleteUser = document.querySelector('.form-input-delete-user');
const inputDeletePin = document.querySelector('.form-input-delete-pin');

//Create username
const createUsername = function (accs){
    accs.forEach(function(acc){
      acc.username = acc.title
     .toLowerCase()
     .split(' ')
     .map(name => name[0])
     .join('');
    })
   }  
createUsername(accounts)

const showMovements = function (movements) {
    movementsField.innerHTML = ''
    movements.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal'
  
      const movementsAdded = `
      <div class="movements-row">
            <div class="movements-type movements-type--${type}">${i + 1} ${type}</div>
            <div class="movements-value">${mov}€</div>
          </div>`;
  
          movementsField.insertAdjacentHTML('afterbegin', movementsAdded)
    })
  }

const calcAmount = function (acc){
    acc.amount = acc.movements.reduce((acc, mov) => acc + mov, 0)
    fieldAmount.innerHTML = `${acc.amount}€`
  }

const calcSummary = function (acc){
    const income = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
    fieldSumIn.innerHTML = `${income}€`
  
    const outcome = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    fieldSumOut.innerHTML = `${Math.abs(outcome)}€`
  
    const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.rate / 100).filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0)
    fieldSumInterest.innerHTML = `${interest}€`
}

const showScreen = function (acc){
    showMovements(acc.movements)
    calcAmount(acc)
    calcSummary(acc)
  }

let presentAccount;

btnLogin.addEventListener('click', function (e){
  e.preventDefault();
  
  presentAccount = accounts.find(acc => acc.username === inputLoginUser.value)
    console.log(presentAccount)
  
   if(presentAccount?.pin === Number(inputLoginPin.value)){
     message.innerHTML = `Welcome, ${presentAccount.title.split(' ')[0]}`
     mainContainer.style.opacity = 100;

     inputLoginUser.value = inputLoginPin.value = ''
     inputLoginPin.blur()

    showScreen(presentAccount)
   } 
})

btnTransfer.addEventListener('click', function (e){
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransfer.value)
    inputTransferAmount.value = inputTransfer.value = ''
  
    if(amount > 0 && receiverAcc && presentAccount.amount >= amount && receiverAcc?.username !== presentAccount.username){
      presentAccount.movements.push(-amount)
      receiverAcc.movements.push(amount)
  
      showScreen(presentAccount)
    }
  })

  btnLoan.addEventListener('click', function (e){
    e.preventDefault()
    const amount = Number(inputLoanAmount.value)
  
    if(amount > 0 && presentAccount.movements.some(mov => mov >= amount * 0.1)){
      presentAccount.movements.push(amount)
      showScreen(presentAccount);
    }
    inputLoanAmount.value = '';
  })
  
  btnClose.addEventListener('click', function (e){
  
    e.preventDefault()
    const index = accounts.findIndex(acc => acc.username === presentAccount.username)
  
    if(inputCloseUser.value === presentAccount.username && Number(inputDeletePin.value) === presentAccount.pin) {
      inputLoginUser.value = inputLoginPin.value = ''
      accounts.splice(index, 1)
      mainContainer.style.opacity = 0;
      message.innerHTML = `See you, ${presentAccount.title.split(' ')[0]}`
    }
  })