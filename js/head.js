const UserNameGreeting = document.querySelector("#greeting");
const toggle = document.querySelector("#IconSearch");
const input = document.querySelector("#searchInput");
const IconReg = document.querySelector("#iconReg i");
const IconLog = document.querySelector("#Userlogin i");
const IconLogAdm = document.querySelector("#iconLogAdm i");
const SectionAdm = document.querySelector(".topHeaderIconAdm");

document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector("#tela");
  const btnAgree = document.querySelector("#btLiAceito");

  const UserLog = sessionStorage.getItem("utilizadorAtivo");
  let userAgree = null;

  if (UserLog) {
    const user = JSON.parse(UserLog);
    userAgree = localStorage.getItem(`aceitouCookies_${user.id}`);
  }

  if (!userAgree) {
    screen.style.display = "block";
  } else {
    screen.style.display = "none";
  }

  if (btnAgree) {
    btnAgree.addEventListener("click", function () {
      if (UserLog) {
        const user = JSON.parse(UserLog);
        localStorage.setItem(`aceitouCookies_${user.id}`, "true");
      }
      screen.style.display = "none";
    });
  }
});

toggle.addEventListener("click", () => {
  input.classList.add("active");
  UserNameGreeting.style.left = "10px";
  input.focus();
});

input.addEventListener("blur", () => {
  input.classList.remove("active");
  UserNameGreeting.style.left = "40px";
});

IconReg.addEventListener("click", function (e) {
  e.preventDefault();

  let UserLog = sessionStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    window.location.href = "perfil.html";
  } else {
    window.location.href = "registo_utilizador.html";
  }
});

IconLogAdm.addEventListener("click", function (e) {
  e.preventDefault();

  if (IconLogAdm) {
    window.location.href = "adm.html";
  }
});
