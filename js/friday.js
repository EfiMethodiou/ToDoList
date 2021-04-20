/*___________Todo List Functions for FRIDAY___________________*/

// getting all required elements
const inputBox5 = document.querySelector(".friday .inputField5 input");
const addBtn5 = document.querySelector(".friday .inputField5 button");
const todoList5 = document.querySelector(".friday .todoList5");
const deleteAllBtn5 = document.querySelector(".friday .footer5 button");
var crossed5 = 0; //count the crossed items of the todo list
var alerted5 = false;


//setting default data so it will look better
var defaultInput5 = [
  "Friday Task 1",
  "Friday Task 2",
  "Friday Task 3",
  "Friday Task 4",
];
function load5(){
  if (localStorage.getItem("hasCodeRunBefore5") === null) {       
    console.log("hasCodeRunBefore Friday");
    localStorage.setItem("Frid Todo", JSON.stringify(defaultInput5));
    showTasks5();
    localStorage.setItem("hasCodeRunBefore5", true);
  }
}
//let getLocalStorageData = localStorage.getItem("Mon Todo");
window.onload =  load5(); //add this data only on the first load
 
// onkeyup event
inputBox5.onkeyup = () => {
  crossed5 = 0; //restart counting
  alerted5 = false;
  let userEnteredValue = inputBox5.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn5.classList.add("active"); //active the add button
  } else {
    addBtn5.classList.remove("active"); //unactive the add button
  }
};
showTasks5(); //calling showTask function

//add item with enter
var enterInput = document.querySelector(".friday .inputField5 input");
enterInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addBtn5").click();
  }
});

/*Add new item to the list*/
addBtn5.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = inputBox5.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("Frid Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray5 = []; //create a blank array
  } else {
    listArray5 = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray5.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("Frid Todo", JSON.stringify(listArray5)); //transforming js object into a json string
  showTasks5(); //calling showTask function
  addBtn5.classList.remove("active"); //unactive the add button once the task added
};

function showTasks5() {
  let getLocalStorageData = localStorage.getItem("Frid Todo");
  if (getLocalStorageData == null) {
    listArray5 = [];
  } else {
    listArray5 = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb5 = document.querySelector(".pendingTasks5");
  pendingTasksNumb5.textContent = listArray5.length; //passing the array length in pendingtask
  if (listArray5.length > 0) {
    //if array length is greater than 0
    deleteAllBtn5.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn5.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray5.forEach((element, index) => {
    newLiTag += `<span class="check" onclick="checked5(${index})">
                 <li>${element} 
                 <span class="delete" onclick="deleteTask5(${index})"><i class="fas fa-times"></i></span>
                 </li>
                 </span>`;
  });
  todoList5.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox5.value = ""; //once task added leave the input field blank
}

// check task and reduce pending tasks number
const tasksNumb5 = document.querySelector(".pendingTasks5");
tasksNumb5.textContent = listArray5.length;

function checked5(index) {
  var list = document.querySelector(".friday");
  var crossed = 0;
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        if (ev.target.classList.toggle != "checked5") {
          ev.target.classList.toggle("checked5");
          ev.target.classList.toggle = "checked5";
          /*console.log("it checked it"); */
          crossed5++;
          /*console.log(crossed);  */

          if (
            ev.target.tagName === "LI" &&
            ev.target.classList.toggle === "checked5"
          ) {
            if (listArray5.length - crossed5 >= 0) {
              tasksNumb5.textContent -= 1;
            }
          }
        }
      }
      if (listArray5.length > 0) {
        if (crossed5 === listArray5.length) {
          console.log(crossed1 + " outside if " + alerted5);
          if (!alerted5) {
            document.getElementById("thisday").innerHTML ="Friday";
            document.getElementById("message").style.display ="block";
            document.getElementById("messageBackg").style.display ="block";
            alerted5 = true;              
            crossed5 = 0;
          }
        }
      }
    },
    false
  );
}

// delete task function
function deleteTask5(index) {
  crossed5 = 0; //restart counting
  alerted5 = false;
  let getLocalStorageData = localStorage.getItem("Frid Todo");
  listArray5 = JSON.parse(getLocalStorageData);
  listArray5.splice(index, 1); //delete or remove the li
  localStorage.setItem("Frid Todo", JSON.stringify(listArray5));
  showTasks5(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn5.onclick = () => {
  listArray5 = []; //empty the array
  localStorage.setItem("Frid Todo", JSON.stringify(listArray5)); //set the item in localstorage
  showTasks5(); //call the showTasks function
};
