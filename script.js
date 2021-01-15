//total
var totalAmount=document.getElementById('totalAmount').textContent;
console.log('total: '+totalAmount);

//storage
var  data = JSON.parse(localStorage.getItem("lists"));

if(!data)
    data=[];



//---------income
var incomeButton =document.getElementsByClassName('addIncome')[0];
//console.log(incomeButton);

var incomeNumber =document.getElementById('incomeAmount');
var list = document.getElementsByClassName('list')[0];


incomeButton=addEventListener('click',function () {
    if(incomeNumber.value.length!=0&&incomeNumber.value!=0&&incomeNumber.value>0){
        //console.log('income: '+ incomeNumber.value);

        var newdiv = document.createElement('div');
        newdiv.setAttribute('class','budget-item income');
        list.insertBefore(newdiv,list.childNodes[0]);

        //num
        var newH4 = document.createElement('h4');
        newH4.innerHTML='$'+incomeNumber.value;

        //date
        var d = new Date();
        var date = document.createElement('span');
        date.innerHTML=getMonth(d.getMonth())+' '+ d.getDate() +', '+d.getFullYear();

        //add to daiv
        var infoDiv = document.createElement('div');
        infoDiv.appendChild(newH4);
        infoDiv.appendChild(date)
        newdiv.appendChild(infoDiv);


        var newP = document.createElement('p');
        newP.setAttribute('class',"delete");
        newP.innerHTML='delete';
        newdiv.appendChild(newP);

        //to save as object to store
        var obj = divToObject(newdiv);
        console.log(obj);

        data.push(obj);
        localStorage.setItem('lists',JSON.stringify(data));

        //clear input
        totalAmount = parseInt(totalAmount) + parseInt(incomeNumber.value);
        //document.getElementById('totalAmount').innerHTML=totalAmount;
        clearInput(incomeNumber);
        checkBalance()
        location.reload();
    }
});


for(var i=0;i<data.length;i++){
    var newdiv = document.createElement('div');
    newdiv.setAttribute('class', data[i].name);
    console.log(data[i].name);
    list.insertBefore(newdiv,list.childNodes[0]);

    //num
    var newH4 = document.createElement('h4');
    newH4.innerHTML=data[i].money;

    //date
    var d = new Date();
    var date = document.createElement('span');
    date.innerHTML=data[i].date;

    //add to daiv
    var infoDiv = document.createElement('div');
    infoDiv.appendChild(newH4);
    infoDiv.appendChild(date)
    newdiv.appendChild(infoDiv);

    var newP = document.createElement('p');
    newP.setAttribute('class',"delete");
    newP.innerHTML='delete';
    newdiv.appendChild(newP);

    //get total balance
    if(data[i].name=='budget-item income'){
        var balance = data[i].money.slice(1);
        totalAmount = parseInt(totalAmount) + parseInt(balance);
    }else{
        var balance = data[i].money.slice(3);
        totalAmount = parseInt(totalAmount) - parseInt(balance);
    }
    checkBalance();
    console.log('abc here');

}


function divToObject(div) {
    var obj = {
        name: div.getAttribute('class'),
        money: div.getElementsByTagName('h4')[0].innerText,
        date: div.getElementsByTagName('span')[0].innerText,
    };
    return obj;
}




//---------Expense

var expenseButton =document.getElementsByClassName('addExpense');
var expenseNumber =document.getElementById('expenseAmount');
expenseButton=addEventListener('click',function () {
    //console.log('expense: ');
    if(expenseNumber.value!=0 && expenseNumber.value>0){
        var newdiv = document.createElement('div');
        newdiv.setAttribute('class','budget-item expense');
        list.insertBefore(newdiv,list.childNodes[0]);

        //num
        var newH4 = document.createElement('h4');
        newH4.innerHTML='- $'+expenseNumber.value;

        //date
        var d = new Date();
        var date = document.createElement('span');
        date.innerHTML=getMonth(d.getMonth())+' '+ d.getDate() +', '+d.getFullYear();

        //add to daiv
        var infoDiv = document.createElement('div');
        infoDiv.appendChild(newH4);
        infoDiv.appendChild(date)
        newdiv.appendChild(infoDiv);


        var newP = document.createElement('p');
        newP.setAttribute('class',"delete");
        newP.innerHTML='delete';
        newdiv.appendChild(newP);

        //to save as object to store
        var obj = divToObject(newdiv);
        console.log(obj);

        data.push(obj);
        localStorage.setItem('lists',JSON.stringify(data));

        //clear input
        totalAmount = parseInt(totalAmount) - parseInt(expenseNumber.value);
        document.getElementById('totalAmount').innerHTML=totalAmount;
        clearInput(expenseNumber);
        checkBalance();
        location.reload();



    }
});

function checkBalance() {
//check the pos or neg of total
    if(parseInt(totalAmount)>=0)
        document.getElementById('totalAmount').className='number pos';
    else
        document.getElementById('totalAmount').className='number neg';

    document.getElementById('totalAmount').innerHTML=totalAmount;
}

function clearInput(ob) {
    ob.value='';
}


function getMonth(x){
    if(x==0)
        return 'January';
    else if(x==1)
        return  'February';
    else if(x==2)
        return  'March';
    else if(x==3)
        return  'April';
    else if(x==4)
        return  'May';
    else if(x==5)
        return  'June';
    else if(x==6)
        return  'July';
    else if(x==7)
        return  'August';
    else if(x==8)
        return  'September';
    else if(x==9)
        return  'October';
    else if(x==10)
        return  'November';
    else
        return  'December';
}


//for delete
const deleteButton = document.getElementsByClassName('delete');

//use a for loop to find out the index
for(let i = 0; i <deleteButton.length  ; i++){
    deleteButton[i].addEventListener('click',function(){
        //alert(i);
        var x = parseInt(data.length)-parseInt(i)-1;
        console.log('delete no: '+i + ' $'+data[x].money);

        deleteIfromdata(x,data);

    });
}

function deleteIfromdata(a,data) {

    //console.log(data[a].money);

    var newData = [];
    var b=0;

    for (var i=0;i<data.length;i++){
        if(a!=i){
            newData[b]=data[i];
            b++;
            console.log('copy + ' + data[i].money);
        }else{
            console.log('delete :'+data[i].money);
        }

    }

    localStorage.setItem('lists',JSON.stringify(newData));
    location.reload();

}

