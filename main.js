
let bool = false;
let userID = null;
let check = false;
async function onsubmit1(event) {
  event.preventDefault();
  var name = event.target.name.value;
  var mail = event.target.Email.value;
  var phone = event.target.phone.value;
  let obj = {
    name,
    mail,
    phone,
  };
  if (bool) {
    check = false;
    try {
      await axios.put(
        `https://crudcrud.com/api/cb83671e8b984212b05b2bbac9ce9e78/data/${userID}`,
        obj
      );
      check = true;
    } 
    catch (err) {
      console.log(err);
    }
    if (check) {
      check = false;
      window.location.reload();
    }
  } else {
    bool = false;
    userID = null;
    axios
      .post(
        "https://crudcrud.com/api/7d89384a746441468ecb6f466f94ebde/appointmentData ",
        obj
      )
      .then((response) => {
        showUserOnScreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  event.target.name.value = "";
  event.target.Email.value = "";
  event.target.phone.value = "";
}
window.addEventListener("DOMContentLoaded", async () => {
 try{
 await axios
  .get("https://crudcrud.com/api/7d89384a746441468ecb6f466f94ebde/appointmentData ")
  .then((response) => {
    console.log(response);

    for (var i = 0; i < response.data.length; i++) {
      showUserOnScreen(response.data[i]);
    }
  })
 }
    catch(err) {
      console.log(err);
    }
});

function showUserOnScreen(user) {

  const parentNode = document.getElementById("listOfUsers"); //creating parentnode
  const childHtml = `<li class='items' id=${user._id}> <span class='name'>${user.name}</span> - <span class='email'>${user.mail}</span> 
                        <button class='btn' onclick = deleteUser('${user._id}') style = 'color: white; background-color: gray;'>Delete User</button> 
                        <button class='btn' onclick = editUserDetails('${user.name}','${user.mail}','${user.phone}','${user._id}') style = 'color:white; background-color: gray;'>Edit User </li>`; //creating child nodes

  parentNode.innerHTML = parentNode.innerHTML + childHtml; //pushing childnodes into parent node
}
function editUserDetails(name, mail, phone, userId) {
  console.log("edit ");
  document.getElementById("name").value = name;
  document.getElementById("Email").value = mail;
  document.getElementById("phone").value = phone;
  bool = true;
  userID = userId;
}

async function deleteUser(userId) {
  try{
    await axios
    .delete(
      `https://crudcrud.com/api/7d89384a746441468ecb6f466f94ebde/appointmentData/${userId}`
    )
    .then((response) => {
      removeUserFromScreen(userId);
    })
  }
  catch(err){
      console.log(err);
    }
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUsers");
  const childToBeDeleted = document.getElementById(userId);
  console.log(userId);
  parentNode.removeChild(childToBeDeleted);
}