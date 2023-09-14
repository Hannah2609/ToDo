const input = document.querySelector("#input-box");
const list = document.querySelector("#list_container");
const addBtn = document.querySelector("#addBtn");
const done = document.querySelector("#done_container");

window.addEventListener("load", displayDate);

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").textContent =
    date[2] + ". " + date[1] + " " + date[3];

  document.querySelector(".todoBtn").classList.add("activeBtn");
  document.querySelector(".doneBtn").classList.add("inActiveBtn");
}

document.querySelector(".doneBtn").addEventListener("click", showDoneList);
document.querySelector(".todoBtn").addEventListener("click", showToDoList);

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", enterTask);

function enterTask(evt){
    if (evt.keyCode === 13) {
       addTask();
    }
}

function addTask() {
  if (input.value === "") {
    alert("Please write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = input.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

    li.appendChild(span);
    list.appendChild(li);
  }
  input.value = "";
  saveData();
}

list.addEventListener("click", clickTask);
done.addEventListener("click", clickTask);

function clickTask(event) {
  console.log(event.target);
  if (event.target.tagName === "LI") {
    console.log("task complete / uncomplete");
    event.target.classList.toggle("checked");
    saveData();

    if (event.target.classList.contains("checked")) {
      setTimeout(() => {
        done.appendChild(event.target);
      }, 300);
    } else {
      setTimeout(() => {
        list.appendChild(event.target);
      }, 300);
    }
    saveData();
  } else if (event.target.tagName === "SPAN") {
    const confirmation = confirm("Delete the task");
    if (confirmation) {
      event.target.parentElement.remove();
      console.log("delete task");
      saveData();
    }
  }

  saveData();
}

function showDoneList() {
  document.querySelector(".done").classList.remove("hidden");
  document.querySelector(".todo").classList.add("hidden");

  document.querySelector(".todoBtn").classList.remove("activeBtn");
  document.querySelector(".doneBtn").classList.add("activeBtn");
  document.querySelector(".todoBtn").classList.add("inActiveBtn");
}

function showToDoList() {
  document.querySelector(".todo").classList.remove("hidden");
  document.querySelector(".done").classList.add("hidden");

  document.querySelector(".doneBtn").classList.remove("activeBtn");
  document.querySelector(".todoBtn").classList.add("activeBtn");
  document.querySelector(".todoBtn").classList.add("inActiveBtn");
}

function saveData() {
  localStorage.setItem("data", list.innerHTML);
  localStorage.setItem("dataDone", done.innerHTML);
}

function showData() {
  list.innerHTML = localStorage.getItem("data");
  done.innerHTML = localStorage.getItem("dataDone");
}

showData();