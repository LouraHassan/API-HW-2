let link = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/logIn";

let email2 = document.getElementById("email2");
let password2 = document.getElementById("password2");
let LoginBtn = document.getElementById("LoginBtn");
let warningEmail = document.getElementById("warning-email");
let warningPassword = document.getElementById("warning-password");
let warningAll = document.getElementById("warning-all");
let homeLink = document.getElementById('homeLink');
let warningHome = document.getElementById('warning-home')
warningHome.classList.add('none')

LoginBtn.addEventListener("click", () => {
  if (email2.value == "" || password2.value == "") {
    email2.classList.add("redBorder");
    password2.classList.add("redBorder");
    warningAll.textContent = "You must fill all the boxes";
    warningAll.classList.remove("none");
  } else if (!validEmail(email2.value)) {
      email2.classList.add("redBorder");
      password2.classList.remove("redBorder");

    warningEmail.textContent = "Invalid email";
    warningEmail.classList.remove("none");
    warningAll.classList.add("none");
  } else {
    checkUsers(email2.value).then((isFound) => {
      if (!isFound) {
          email2.classList.add("redBorder");
          password2.classList.remove("redBorder");

        password2.classList.add("redBorder");
        warningAll.textContent = "There is no account with this email";
        warningAll.classList.add("none");
      } else {
        fetch(link)
          .then((res) => res.json())
          .then((users) => {
            let user = users.find((user) => user.email === email2.value);
            if (password2.value != user.password) {
                password2.classList.add("redBorder");
                email2.classList.remove("redBorder");

              warningPassword.textContent = "Incorrect password";
              warningPassword.classList.remove("none");
              warningAll.classList.add("none");
            } else {
              email2.classList.remove("redBorder");
              password2.classList.remove("redBorder");
              warningPassword.classList.add("none");
              warningAll.classList.add("none");
              warningEmail.classList.add("none");
              let userName = user.name;
              console.log(userName);
              console.log("logged in successfully!");
              localStorage.setItem("userName", userName);
              window.location.href = "home.html";
            }
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

homeLink.addEventListener('click', () => {
    let userName = localStorage.getItem('userName')
    
    if (!userName) {
        warningHome.classList.remove('none')
    } else {
        warningHome.classList.add('none')

        window.location.href = 'home.html'
    }
})