const firebaseConfig = {
  apiKey: "AIzaSyCWsVjOD7PvM-b8h2RpkxZr0sO_zbnPUZ0",
  authDomain: "toodo-portfolio.firebaseapp.com",
  databaseURL: "https://toodo-portfolio-default-rtdb.firebaseio.com",
  projectId: "toodo-portfolio",
  storageBucket: "toodo-portfolio.appspot.com",
  messagingSenderId: "437445589591",
  appId: "1:437445589591:web:953bd89aa7602b70038112",
};
const app = firebase.initializeApp(firebaseConfig);

// console.log(app);

// app.database().ref("/todos").push(std);
// var std = {
//   name: "hasan",
//   class: 5,
//   section: "morning",
// };

var listContainer = document.getElementById("listContainer");

app
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    // console.log(data.val());

    var li = document.createElement("li");
    var liTxt = document.createTextNode(data.val().names);
    li.appendChild(liTxt);

    var editBtn = document.createElement("button");
    var editBtnTxt = document.createTextNode("Edit");
    editBtn.appendChild(editBtnTxt);
    editBtn.setAttribute("onclick", "editTask(this)");
    editBtn.setAttribute("id", data.val().key);
    editBtn.className = "btn";
    li.appendChild(editBtn);

    var delBtn = document.createElement("button");
    var delBtnTxt = document.createTextNode("Delete");
    delBtn.appendChild(delBtnTxt);
    delBtn.setAttribute("onclick", "delTask(this)");
    delBtn.setAttribute("id", data.val().key);
    console.log(delBtn);
    delBtn.className = "btn";
    li.appendChild(delBtn);

    listContainer.appendChild(li);
  });

function addTask() {
  var input = document.getElementById("input");

  var key = app.database().ref("todos").push().key;

  var todosObj = {
    names: input.value,
    key: key,
  };

  app.database().ref("todos").child(key).set(todosObj);

  //   console.log(todosObj);

  // if (input.value.length > 3) {

  // }
  // else {
  //     alert("Please Fill more than 4 words")
  // }
  input.value = "";
}

function deleteAll() {
  listContainer.innerHTML = "";
  app.database().ref("todos").remove();
}

function editTask(element) {
  var editValue = prompt("Edit Value", element.parentNode.firstChild.nodeValue);
  element.parentNode.firstChild.nodeValue = editValue;

  console.log(element.id);
  var editTodo = {
    value: editValue,
    key: element.id,
  };

  app.database().ref("todos").child(element.id).set(editTodo)

//   console.log(editTodo);
}

function delTask(element) {
  element.parentNode.remove();
  // console.log(element);
  app.database().ref("todos").child(element.id).remove();
}
