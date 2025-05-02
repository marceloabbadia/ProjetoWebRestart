const BtnSaveEditPasswordProfile = document.querySelector(
  "#SavePasswordProfile"
);
const EditFormPasswordRegister = document.querySelector(
  "#editFormPasswordRegistro"
);
const alertBoxPass = document.querySelector("#customAlert");
const closeBtnPass = document.querySelector(".close-alert");

const newPassword = document.querySelector("#passwordNew");
const oldPassword = document.querySelector("#passwordOld");
const confirmPassword = document.querySelector("#passwordConfirm");

if (EditFormPasswordRegister) {
  EditFormPasswordRegister.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!newPassword.value || !oldPassword.value || !confirmPassword.value) {
      alert("Preencher todos os campos!");
      return;
    }

    const UserLog = sessionStorage.getItem("utilizadorAtivo");

    if (UserLog) {
      const UserLogStorage = JSON.parse(UserLog);
      let user = await GetDataUser(UserLogStorage.id);

      //atob() (ASCII to binary) faz o inverso de btoa() — decodifica uma string em Base64 de volta ao seu valor original.
      let passwordDecode = atob(user.senha);

      if (passwordDecode !== oldPassword.value) {
        alert("Palavra-passe incorreta!");
      }

      const passwordValidation = isStrongPassword(newPassword.value);

      if (passwordValidation !== true) {
        alert(passwordValidation);
        return;
      }

      if (newPassword.value !== confirmPassword.value) {
        return alert("Senha e confirmação de senha não são iguais!");
      }

      let codePassword = btoa(newPassword.value);

      let updateUserPasswordData = {
        senha: codePassword,
      };

      let result = await UpdateDataUser(updateUserPasswordData, user.id);

      if (result) {
        showCustomAlert();
        window.location.href = "perfil.html";
      }
    }
  });
}

function showCustomAlert() {
  alertBoxPass.classList.remove("hidden");
  setTimeout(() => {
    alertBoxPass.classList.add("hidden");
  }, 10000);
}

closeBtnPass.addEventListener("click", () => {
  alertBox.classList.add("hidden");
});
