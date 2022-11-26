let listItemValues = []
loadData()
render()

function saveData() {
    localStorage.setItem("dataAndRenderStyleData", JSON.stringify(listItemValues))
}

function loadData() {
    if (localStorage.getItem("dataAndRenderStyleData")) {
        listItemValues = JSON.parse(localStorage.getItem("dataAndRenderStyleData"))
    }
}

function render() {
    document.querySelector("#app").innerHTML = 
    `
    <form onsubmit="submitHandler(event)">
        <input type="text" id="myInput"/>
        <button>Create Item</button>
    </form>

    <ul>
        ${
            listItemValues.map(function(item) {
                return listItemTemplate(item.value, item.id)
            }).join("")
        }
    </ul>
    `
}

function submitHandler(event) {
    event.preventDefault()
    newValue = document.querySelector("#myInput").value
    if (newValue == "") {
        return
    }
    listItemValues.push({value: newValue, id: Date.now()})
    
    saveData()
    render()
}

function editHandler(currentValue, idToEdit) {
    let newValue = prompt("Enter new value", currentValue)
    if (newValue) {
        listItemValues = listItemValues.map(function(item) {
            if (item.id == idToEdit) {
              item.value = newValue
            }
            return item
          })
    }

    saveData()
    render()
}

function deleteHandler(idToDelete) {
    listItemValues= listItemValues.filter(function(el) {
        return el.id != idToDelete
    })

    saveData()
    render()
}

function listItemTemplate(value, id) {
    return `<li>
                <span class="value">${value}</span> 
                <button onclick="editHandler(${value}, ${id})">Edit</button> 
                <button onclick="deleteHandler(${id})">Delete</button>
            </li>`
}