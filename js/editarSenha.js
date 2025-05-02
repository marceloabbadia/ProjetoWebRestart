const BtnSaveEditPasswordProfile = document.querySelector(
  "#SavePasswordProfile"
);
const EditFormPasswordRegister = document.querySelector(
  "#editFormPasswordRegistro"
);
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

    const UserLog = localStorage.getItem("utilizadorAtivo");

    if (UserLog) {
      const UserLogStorage = JSON.parse(UserLog);
      let user = await GetDataUser(UserLogStorage.id);

      console.log(user.senha);
      console.log(newPassword.value);

      if (oldPassword.value !== user.senha) {
        return alert("Senha antiga invalida!");
      }

      const passwordValidation = isStrongPassword(newPassword.value);
      console.log(passwordValidation);

      if (passwordValidation !== true) {
        alert(passwordValidation);
        return;
      }

      if (newPassword.value !== confirmPassword.value) {
        return alert("Senha e confirmação de senha não são iguais!");
      }

      let updateUserPasswordData = {
        senha: newPassword.value,
      };

      await UpdateDataUser(updateUserPasswordData, user.id);
    }
  });
}
