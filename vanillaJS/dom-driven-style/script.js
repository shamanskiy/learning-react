const myForm = document.querySelector("#myForm")
const myInput = document.querySelector("#myInput")
const myList = document.querySelector("#myList")

onLoad()

function onLoad() {
  let savedListItems = []
  if (localStorage.getItem("domDrivenStyleData")) {
    savedListItems = JSON.parse(localStorage.getItem("domDrivenStyleData"))
  }

  myList.innerHTML = savedListItems
    .map(function (value) {
      return listItemTemplate(value)
    })
    .join("")
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault()
  if (myInput.value == "") {
    return
  }
  myList.insertAdjacentHTML("beforeend", listItemTemplate(myInput.value))
  myInput.value = ""

  saveData()
})

function saveData() {
  let listItemValues = []
  myList.querySelectorAll("li").forEach(function (li) {
    let value = getValue(li)
    console.log(value)
    listItemValues.push(value)
  })
  localStorage.setItem("domDrivenStyleData", JSON.stringify(listItemValues))
}

function editHandler(button) {
  let newValue = prompt("Enter new value", getValue(button.parentElement))
  if (newValue) {
    button.parentElement.querySelector(".value").innerHTML = newValue
  }
  saveData()
}

function deleteHandler(button) {
  button.parentElement.remove()
  saveData()
}

function getValue(listItem) {
  return listItem.querySelector(".value").innerHTML
}

function listItemTemplate(value) {
  return `<li>
                <span class="value">${value}</span> 
                <button onclick="editHandler(this)">Edit</button> 
                <button onclick="deleteHandler(this)">Delete</button>
            </li>`
}
