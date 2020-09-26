var list = document.getElementById("list");

 firebase.database().ref('todos').on('child_added',function(data){

    
    //create li tag with text node
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    li.setAttribute("class", "liStyle");
    li.appendChild(liText);
    
    
    //create delete button
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Del");
    delBtn.setAttribute("class", "btn");
    delBtn.setAttribute('id',data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.appendChild(delText);
    list.appendChild(li);

    
    //create edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit");
    editBtn.setAttribute("class", "btn");
    editBtn.appendChild(editText);
    editBtn.setAttribute('id',data.val().key)

    editBtn.setAttribute("onclick", "editItem(this)");
    
    list.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
})

function addTodo() {
    var todo_item = document.getElementById("todo-item");

    var database = firebase.database().ref('todos');
    var key = database.push().key;
    
    var todo ={
        value:todo_item.value,
        key: key
    }

    database.child(key).set(todo)
    todo_item.value = '';
}


function deleteItem(e,id) {
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();    
}

//Edit 
function editItem(e) {
    
    var val = prompt("Enter updated value", e.parentNode.firstChild.nodeValue);
    
    var editTodo ={
        value : val,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo);       
    }



    
    // //Delete all
    function delAll() {
        firebase.database().ref('TodoList').remove();
        list.innerHTML = "";
    
    }
