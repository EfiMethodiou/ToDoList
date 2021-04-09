/*___________Todo List Functions for MONDAY___________________*/

// getting all required elements
const inputBox1 = document.querySelector(".monday .inputField1 input");
const addBtn1 = document.querySelector(".monday .inputField1 button");
const todoList1 = document.querySelector(".monday .todoList1");
const deleteAllBtn1 = document.querySelector(".monday .footer1 button");
var crossed1 = 0; //count the crossed items of the todo list 
var alerted1 = false //makes sure the message appears on the right moment

// onkeyup event
inputBox1.onkeyup = () => {
  crossed1 = 0;  //restart counting 
  alerted1 = false;
  console.log(crossed1 + " this one");
  let userEnteredValue = inputBox1.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn1.classList.add("active"); //active the add button
  } else {
    addBtn1.classList.remove("active"); //unactive the add button
  }
};
showTasks1(); //calling showTask function

//add item with enter
var enterInput = document.querySelector(".monday .inputField1 input");
enterInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addBtn1").click();
  }
});

/*Add new item to the list*/
addBtn1.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = inputBox1.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("Mon Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray1 = []; //create a blank array
  } else {
    listArray1 = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray1.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("Mon Todo", JSON.stringify(listArray1)); //transforming js object into a json string
  showTasks1(); //calling showTask function
  addBtn1.classList.remove("active"); //unactive the add button once the task added  
};

function showTasks1() {
  let getLocalStorageData = localStorage.getItem("Mon Todo");
  if (getLocalStorageData == null) {
    listArray1 = [];
  } else {
    listArray1 = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb1 = document.querySelector(".pendingTasks1");
  pendingTasksNumb1.textContent = listArray1.length; //passing the array length in pendingtask
  if (listArray1.length > 0) {
    //if array length is greater than 0
    deleteAllBtn1.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn1.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray1.forEach((element, index) => {
    newLiTag += `<span class="check" onclick="checked1(${index})">
                 <li>${element} 
                 <span class="delete" onclick="deleteTask1(${index})"><i class="fas fa-times"></i></span>
                 </li>
                 </span>`;
  });
  todoList1.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox1.value = ""; //once task added leave the input field blank
}

// check task and reduce pending tasks number
const tasksNumb1 = document.querySelector(".pendingTasks1");
tasksNumb1.textContent = listArray1.length;

function checked1(index) {
  var list = document.querySelector(".monday");  
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        if (ev.target.classList.toggle != "checked1") {
          ev.target.classList.toggle("checked1");
          ev.target.classList.toggle = "checked1";
          /*console.log("it checked it"); */
          crossed1++;
          console.log(crossed1);  

          if (
            ev.target.tagName === "LI" &&
            ev.target.classList.toggle === "checked1"
          ) {
            if (listArray1.length - crossed1 >= 0) {
              tasksNumb1.textContent -= 1;

            }
          }
        }
      }
      if (listArray1.length > 0) {        
        if (crossed1 === listArray1.length) {          
          console.log(crossed1 + " outside if " + alerted1);
          if(!alerted1){
            document.getElementById("thisday").innerHTML ="Monday";
            document.getElementById("message").style.display ="block";  
            document.getElementById("messageBackg").style.display ="block";          
            alerted1 = true;
            console.log(crossed1 + " inside if " + alerted1);  
            crossed1 = 0;          
          }                    
        }
      }
    },
    false
  );
}

// delete task function
function deleteTask1(index) {
  crossed1 = 0;  //restart counting 
  alerted1 = false;
  let getLocalStorageData = localStorage.getItem("Mon Todo");
  listArray1 = JSON.parse(getLocalStorageData);
  listArray1.splice(index, 1); //delete or remove the li
  localStorage.setItem("Mon Todo", JSON.stringify(listArray1));
  showTasks1(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn1.onclick = () => {
  listArray1 = []; //empty the array
  localStorage.setItem("Mon Todo", JSON.stringify(listArray1)); //set the item in localstorage
  showTasks1(); //call the showTasks function
};
