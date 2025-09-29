let form = document.querySelector("form");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmit();
});

// ---------------------------------------------------------------- Store Data localStorage()------------------------------

function storeData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ---------------------------------------------------------------- Toggled Status ------------------------------
function toggleStatus(i) {
  todos[i].status = !todos[i].status;
  storeData();
  renderTodos();
}

// ---------------------------------------------------------------- Handle Submit Form ------------------------------
function formSubmit() {
  let obj = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    task: document.getElementById("task").value,
    priority: document.getElementById("priority").value,
    status: false,
  };

  todos.push(obj);
  storeData();
  renderTodos();
}

// ---------------------------------------------------------------- Render Todos ------------------------------
function renderTodos() {
  let table = document.querySelector("table");
  let tbody = document.querySelector("tbody");

  tbody.innerText = null;

  todos.forEach((todo, i) => {
    let tr = document.createElement("tr");

    for (let key in todo) {
      let td = document.createElement("td");
      if (key === "status") {
        let btn = document.createElement("button");
        btn.innerText = todo[key] ? "Completed" : "Pending";
        td.appendChild(btn);
        btn.addEventListener("click", () => toggleStatus(i));
      } else {
        td.innerText = todo[key];
      }
      tr.appendChild(td);
    }
    let tdDelete = (document.createElement("td").innerText = "Delete");
    let tdEdit = (document.createElement("td").innerText = "Edit");
    tr.append(tdDelete, tdEdit);

    tbody.appendChild(tr);
  });
}
renderTodos();
