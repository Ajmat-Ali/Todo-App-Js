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
  resetForm();
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
    // ---------------------------------- Delete Col----------
    let tdDelete = document.createElement("td");
    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    tdDelete.appendChild(btnDelete);
    btnDelete.addEventListener("click", () => removeTask(i));

    // ---------------------------------- Edit Col-----------
    let tdEdit = document.createElement("td");
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    tdEdit.appendChild(btnEdit);
    btnEdit.addEventListener("click", () => updateTodo(i));
    tr.append(tdDelete, tdEdit);

    tbody.appendChild(tr);
  });
}
renderTodos();

// ---------------------------------------------------------------- Delete Todo --------------------------------
function removeTask(i) {
  console.log(i);

  todos.splice(i, 1);
  console.log(todos);

  storeData();
  renderTodos();
}

// ---------------------------------------------------------------- Toggled Status ------------------------------
function toggleStatus(i) {
  todos[i].status = !todos[i].status;
  storeData();
  renderTodos();
}

// ---------------------------------------------------------------- Reset Form ------------------------------
function resetForm() {
  document.querySelectorAll("input").forEach((input) => {
    if (input.value !== "Submit") {
      input.value = "";
    }
  });
  document.querySelector("select").value = "low";
}

// ---------------------------------------------------------------- Edit Modal ------------------------------
function updateTodo(i) {
  let { name, age, task, priority } = todos[i];

  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("task").value = task;
  document.getElementById("priority").value = priority;
}
