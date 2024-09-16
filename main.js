let link = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/logIn";

let name1 = document.getElementById("name");
let email1 = document.getElementById("email1");
let password1 = document.getElementById("password1");
let confirm = document.getElementById("confirmPassword");
let SignUpBtn = document.getElementById("SignUpBtn");
let warningName = document.getElementById("warning-name");
let warningEmail = document.getElementById("warning-email");
let warningPassword = document.getElementById("warning-password");
let warningConfirm = document.getElementById("warning-confirm");
let warningAll = document.getElementById("warning-all");
let homeLink = document.getElementById("homeLink");
let warningHome = document.getElementById("warning-home");
warningHome.classList.add("none");

SignUpBtn.addEventListener("click", () => {
  if (
    name1.value == "" ||
    email1.value == "" ||
    password1.value == "" ||
    confirm.value == ""
  ) {
    name1.classList.add("redBorder");
    email1.classList.add("redBorder");
    password1.classList.add("redBorder");
    confirm.classList.add("redBorder");
    warningAll.textContent = "You must fill all the boxes";
    warningAll.classList.remove("none");
  } else if (name1.value.length < 5) {
    warningName.textContent = "Name should be more than 5 characters";
    warningName.classList.remove("none");
    warningEmail.classList.add("none");
    warningAll.classList.add("none");
    name1.classList.add("redBorder");
  } else if (!validEmail(email1.value)) {
    email1.classList.add("redBorder");
    warningEmail.textContent = "Invalid email format";
    warningEmail.classList.remove("none");
    warningName.classList.add("none");
    warningAll.classList.add("none");
  } else if (password1.value.length < 8) {
    warningPassword.textContent = "Password should be more than 8 characters";
    warningPassword.classList.remove("none");
    warningName.classList.add("none");
    warningEmail.classList.add("none");
    warningAll.classList.add("none");
    password1.classList.add("redBorder");
    confirm.classList.add("redBorder");
  } else if (confirm.value != password1.value) {
    warningConfirm.textContent = "Password  doesn't match";
    warningConfirm.classList.remove("none");
    warningPassword.classList.add("none");
    warningName.classList.add("none");
    warningEmail.classList.add("none");
    warningAll.classList.add("none");
    password1.classList.add("redBorder");
    confirm.classList.add("redBorder");
  } else {
    checkUsers(email1.value).then((isFound) => {
      if (isFound) {
        name1.classList.add("redBorder");
        email1.classList.add("redBorder");
        password1.classList.add("redBorder");
        confirm.classList.add("redBorder");
        warningAll.textContent = "Account already exists!";
        warningAll.classList.remove("none");
        warningConfirm.classList.add("none");
      } else {
        name1.classList.remove("redBorder");
        email1.classList.remove("redBorder");
        password1.classList.remove("redBorder");
        confirm.classList.remove("redBorder");
        fetch(link, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            name: name1.value,
            email: email1.value,
            password: password1.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Account created");
            let userName = name1.value;
            localStorage.setItem("userName", userName);
            window.location.href = "home.html";
          });
      }
    });
  }
});

function checkUsers(email) {
  return fetch(link)
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      let isFound = users.some((user) => user.email == email);
      return isFound;
    });
}
function checkPassword(email) {
  return fetch(link)
    .then((res) => res.json())
    .then((users) => {
      users.map((user) => {
        let correct = false;
        if (user.email == email) {
          if (password2.value == user.password) {
            correct = true;
          }
        }
        return correct;
      });
    });
}
function validEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

homeLink.addEventListener("click", () => {
  let userName = localStorage.getItem("userName");

  if (!userName) {
    warningHome.classList.remove("none");
  } else {
    window.location.href = "home.html";
  }
});
