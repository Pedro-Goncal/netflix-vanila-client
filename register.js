let registerForm = document.getElementById("registerForm");
let apiURL = "http://localhost:4001";

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    name: registerForm.name.value,
    email: registerForm.email.value,
    password: registerForm.password.value,
  };

  fetch(`${apiURL}/register`, {
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
      // localStorage.setItem("token", response.token);
      location.href = "/login.html";
      location.href = `/login.html?existingEmail=${payload.email}&registered=true`;
    })
    .catch((err) => {
      console.log(err);
      location.href = `/login.html?existingEmail=${payload.email}`;
    });
});
