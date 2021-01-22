let loginForm = document.getElementById("loginForm");
let apiURL = "http://localhost:4001";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const existingEmail = urlParams.get("existingEmail");
const registered = urlParams.get("registered");
if (registered) {
  document.querySelector(".registered-alert").style.display = "block";
}
if (existingEmail) {
  loginForm.email.value = existingEmail;
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };

  fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went Wrong");
      }
    })
    .then((response) => {
      localStorage.setItem("token", response.token);
      location.href = "/";
    });
});

/*
 * const url=new URL(window.location.href);
    const params=url.searchParams.get("username");

 */
