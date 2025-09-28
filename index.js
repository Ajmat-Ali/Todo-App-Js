let form = document.querySelector("form");
form.addEventListener("submit", () => {
  event.preventDefault();
  formSubmit();
});
// ------------------------------------------------------ Submit Function ------------------
const formSubmit = () => {
  event.preventDefault();
  let allInput = document.querySelectorAll(".input");
  let priority = document.querySelector("select").value;
  let formValue = {
    name: "",
    age: "",
    task: "",
    priority: "",
  };

  for (let i = 0; i < allInput.length; i++) {
    formValue[allInput[i].id] = allInput[i].value;
  }
  formValue.priority = priority;

  displayData(formValue);
};

// ------------------------------------------------------ Display Data ------------------

const displayData = (formValue) => {
  let tr = document.createElement("tr");
  for (let key in formValue) {
    let td = document.createElement("td");
    td.innerText = formValue[key];
    tr.appendChild(td);
  }
  let table = document.querySelector("table");
  table.appendChild(tr);
  //   tr.appendChild
};
