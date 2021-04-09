/*___________Todo List Functions for TUESDAY___________________*/

// getting all required elements
const inputBox2 = document.querySelector(".tuesday .inputField2 input");
const addBtn2 = document.querySelector(".tuesday .inputField2 button");
const todoList2 = document.querySelector(".tuesday .todoList2");
const deleteAllBtn2 = document.querySelector(".tuesday .footer2 button");
var crossed2 = 0; //count the crossed items of the todo list 
var alerted2 = false; //makes sure the message appears on the right moment

// onkeyup event
inputBox2.onkeyup = () => {
  crossed2 = 0;  //restart counting 
  alerted2 = false;
  let userEnteredValue = inputBox2.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn2.classList.add("active"); //active the add button
  } else {
    addBtn2.classList.remove("active"); //unactive the add button
  }
};
showTasks2(); //calling showTask function

//add item with enter
var enterInput = document.querySelector(".tuesday .inputField2 input");
enterInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addBtn2").click();
  }
});

/*Add new item to the list*/
addBtn2.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = inputBox2.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("Tues Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray2 = []; //create a blank array
  } else {
    listArray2 = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray2.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("Tues Todo", JSON.stringify(listArray2)); //transforming js object into a json string
  showTasks2(); //calling showTask function
  addBtn2.classList.remove("active"); //unactive the add button once the task added
};

function showTasks2() {
  let getLocalStorageData = localStorage.getItem("Tues Todo");
  if (getLocalStorageData == null) {
    listArray2 = [];
  } else {
    listArray2 = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb2 = document.querySelector(".pendingTasks2");
  pendingTasksNumb2.textContent = listArray2.length; //passing the array length in pendingtask
  if (listArray2.length > 0) {
    //if array length is greater than 0
    deleteAllBtn2.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn2.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray2.forEach((element, index) => {
    newLiTag += `<span class="check" onclick="checked2(${index})">
                 <li>${element} 
                 <span class="delete" onclick="deleteTask2(${index})"><i class="fas fa-times"></i></span>
                 </li>
                 </span>`;
  });
  todoList2.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox2.value = ""; //once task added leave the input field blank
}

// check task and reduce pending tasks number
const tasksNumb2 = document.querySelector(".pendingTasks2");
tasksNumb2.textContent = listArray2.length;

function checked2(index) {
  var list = document.querySelector(".tuesday");
  var crossed = 0;
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        if (ev.target.classList.toggle != "checked2") {
          ev.target.classList.toggle("checked2");
          ev.target.classList.toggle = "checked2";
          /*console.log("it checked it"); */
          crossed2++;
          /*console.log(crossed);  */

          if (
            ev.target.tagName === "LI" &&
            ev.target.classList.toggle === "checked2"
          ) {
            if (listArray2.length - crossed2 >= 0) {
              tasksNumb2.textContent -= 1;
            }
          }
        }
      }
      if (listArray2.length > 0) {        
        if (crossed2 === listArray2.length) {      
          console.log(crossed1 + " outside if " + alerted2);    
          if(!alerted2){
            document.getElementById("thisday").innerHTML ="Tuesday";
            document.getElementById("message").style.display ="block";
            document.getElementById("messageBackg").style.display ="block";
            alerted2 = true;
            console.log(crossed1 + " inside if " + alerted2);            
            crossed2 = 0;          
          }                    
        }
      }
    },
    false
  );
}

// delete task function
function deleteTask2(index) {
  crossed2 = 0;  //restart counting 
  alerted2 = false;
  let getLocalStorageData = localStorage.getItem("Tues Todo");
  listArray2 = JSON.parse(getLocalStorageData);
  listArray2.splice(index, 1); //delete or remove the li
  localStorage.setItem("Tues Todo", JSON.stringify(listArray2));
  showTasks2(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn2.onclick = () => {
  listArray2 = []; //empty the array
  localStorage.setItem("Tues Todo", JSON.stringify(listArray2)); //set the item in localstorage
  showTasks2(); //call the showTasks function
};
