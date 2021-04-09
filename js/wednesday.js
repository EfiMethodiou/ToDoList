/*___________Todo List Functions for WEDNESDAY___________________*/

// getting all required elements
const inputBox3 = document.querySelector(".wednesday .inputField3 input");
const addBtn3 = document.querySelector(".wednesday .inputField3 button");
const todoList3 = document.querySelector(".wednesday .todoList3");
const deleteAllBtn3 = document.querySelector(".wednesday .footer3 button");
var crossed3 = 0; //count the crossed items of the todo list
var alerted3 = false;

// onkeyup event
inputBox3.onkeyup = () => {
  crossed3 = 0; //restart counting
  alerted3 = false;
  let userEnteredValue = inputBox3.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn3.classList.add("active"); //active the add button
  } else {
    addBtn3.classList.remove("active"); //unactive the add button
  }
};
showTasks3(); //calling showTask function

//add item with enter
var enterInput = document.querySelector(".wednesday .inputField3 input");
enterInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addBtn3").click();
  }
});

/*Add new item to the list*/
addBtn3.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = inputBox3.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("Wed Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray3 = []; //create a blank array
  } else {
    listArray3 = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray3.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("Wed Todo", JSON.stringify(listArray3)); //transforming js object into a json string
  showTasks3(); //calling showTask function
  addBtn3.classList.remove("active"); //unactive the add button once the task added
};

function showTasks3() {
  let getLocalStorageData = localStorage.getItem("Wed Todo");
  if (getLocalStorageData == null) {
    listArray3 = [];
  } else {
    listArray3 = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb3 = document.querySelector(".pendingTasks3");
  pendingTasksNumb3.textContent = listArray3.length; //passing the array length in pendingtask
  if (listArray3.length > 0) {
    //if array length is greater than 0
    deleteAllBtn3.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn3.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray3.forEach((element, index) => {
    newLiTag += `<span class="check" onclick="checked3(${index})">
                 <li>${element} 
                 <span class="delete" onclick="deleteTask3(${index})"><i class="fas fa-times"></i></span>
                 </li>
                 </span>`;
  });
  todoList3.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox3.value = ""; //once task added leave the input field blank
}

// check task and reduce pending tasks number
const tasksNumb3 = document.querySelector(".pendingTasks3");
tasksNumb3.textContent = listArray3.length;

function checked3(index) {
  var list = document.querySelector(".wednesday");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        if (ev.target.classList.toggle != "checked3") {
          ev.target.classList.toggle("checked3");
          ev.target.classList.toggle = "checked3";
          /*console.log("it checked it"); */
          crossed3++;
          /*console.log(crossed);  */

          if (
            ev.target.tagName === "LI" &&
            ev.target.classList.toggle === "checked3"
          ) {
            if (listArray3.length - crossed3 >= 0) {
              tasksNumb3.textContent -= 1;
            }
          }
        }
      }
      if (listArray3.length > 0) {
        if (crossed3 === listArray3.length) {
          if (!alerted3) {
            document.getElementById("thisday").innerHTML ="Wednesday";
            document.getElementById("message").style.display ="block";
            document.getElementById("messageBackg").style.display ="block";
            alerted3 = true;
            crossed3 = 0;
          }
        }
      }
    },
    false
  );
}

// delete task function
function deleteTask3(index) {
  crossed3 = 0; //restart counting
  alerted3 = false;
  let getLocalStorageData = localStorage.getItem("Wed Todo");
  listArray3 = JSON.parse(getLocalStorageData);
  listArray3.splice(index, 1); //delete or remove the li
  localStorage.setItem("Wed Todo", JSON.stringify(listArray3));
  showTasks3(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn3.onclick = () => {
  listArray3 = []; //empty the array
  localStorage.setItem("Wed Todo", JSON.stringify(listArray3)); //set the item in localstorage
  showTasks3(); //call the showTasks function
};
