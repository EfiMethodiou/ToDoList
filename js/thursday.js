/*___________Todo List Functions for THURSDAY___________________*/

// getting all required elements
const inputBox4 = document.querySelector(".thursday .inputField4 input");
const addBtn4 = document.querySelector(".thursday .inputField4 button");
const todoList4 = document.querySelector(".thursday .todoList4");
const deleteAllBtn4 = document.querySelector(".thursday .footer4 button");
var crossed4 = 0; //count the crossed items of the todo list
var alerted4 = false;

// onkeyup event
inputBox4.onkeyup = () => {
  crossed4 = 0; //restart counting
  alerted4 = false;
  let userEnteredValue = inputBox4.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn4.classList.add("active"); //active the add button
  } else {
    addBtn4.classList.remove("active"); //unactive the add button
  }
};
showTasks4(); //calling showTask function

//add item with enter
var enterInput = document.querySelector(".thursday .inputField4 input");
enterInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addBtn4").click();
  }
});

/*Add new item to the list*/
addBtn4.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = inputBox4.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("Thur Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray4 = []; //create a blank array
  } else {
    listArray4 = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray4.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("Thur Todo", JSON.stringify(listArray4)); //transforming js object into a json string
  showTasks4(); //calling showTask function
  addBtn4.classList.remove("active"); //unactive the add button once the task added
};

function showTasks4() {
  let getLocalStorageData = localStorage.getItem("Thur Todo");
  if (getLocalStorageData == null) {
    listArray4 = [];
  } else {
    listArray4 = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb4 = document.querySelector(".pendingTasks4");
  pendingTasksNumb4.textContent = listArray4.length; //passing the array length in pendingtask
  if (listArray4.length > 0) {
    //if array length is greater than 0
    deleteAllBtn4.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn4.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray4.forEach((element, index) => {
    newLiTag += `<span class="check" onclick="checked4(${index})">
                 <li>${element} 
                 <span class="delete" onclick="deleteTask4(${index})"><i class="fas fa-times"></i></span>
                 </li>
                 </span>`;
  });
  todoList4.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox4.value = ""; //once task added leave the input field blank
}

// check task and reduce pending tasks number
const tasksNumb4 = document.querySelector(".pendingTasks4");
tasksNumb4.textContent = listArray4.length;

function checked4(index) {
  var list = document.querySelector(".thursday");

  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        if (ev.target.classList.toggle != "checked4") {
          ev.target.classList.toggle("checked4");
          ev.target.classList.toggle = "checked4";
          /*console.log("it checked it"); */
          crossed4++;
          /*console.log(crossed);  */

          if (
            ev.target.tagName === "LI" &&
            ev.target.classList.toggle === "checked4"
          ) {
            if (listArray4.length - crossed4 >= 0) {
              tasksNumb4.textContent -= 1;
            }
          }
        }
      }
      if (listArray4.length > 0) {
        if (crossed4 === listArray4.length) {
          if (!alerted4) {
            document.getElementById("thisday").innerHTML ="Thursday";
            document.getElementById("message").style.display ="block";
            document.getElementById("messageBackg").style.display ="block";
            alerted4 = true;
            crossed4 = 0;
          }
        }
      }
    },
    false
  );
}

// delete task function
function deleteTask4(index) {
  crossed4 = 0; //restart counting
  alerted4 = false;
  let getLocalStorageData = localStorage.getItem("Thur Todo");
  listArray4 = JSON.parse(getLocalStorageData);
  listArray4.splice(index, 1); //delete or remove the li
  localStorage.setItem("Thur Todo", JSON.stringify(listArray4));
  showTasks4(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn4.onclick = () => {
  listArray4 = []; //empty the array
  localStorage.setItem("Thur Todo", JSON.stringify(listArray4)); //set the item in localstorage
  showTasks4(); //call the showTasks function
};
