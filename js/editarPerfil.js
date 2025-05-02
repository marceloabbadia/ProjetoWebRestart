const BtnSaveEditProfile = document.querySelector("#SaveProfile");
const EditFormRegister = document.querySelector("#editFormRegistro");
const fullNameEdit = document.querySelector("#nomeEdit");
const emailEdit = document.querySelector("#emailEdit");
const addressEdit = document.querySelector("#moradaEdit");
const zipCode3Edit = document.querySelector("#cp3Edit");
const zipCode4Edit = document.querySelector("#cp4Edit");
const zipCodeLocalEdit = document.querySelector("#cpLocalidadeEdit");
const countryEdit = document.querySelector("#paisEdit");

document.addEventListener("DOMContentLoaded", async function () {
  updateIcons();

  const UserLog = sessionStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    const UserLogStorage = JSON.parse(UserLog);
    let user = await GetDataUser(UserLogStorage.id);

    if (user) {
      fullNameEdit.value = user.nome;
      emailEdit.value = user.email;
      addressEdit.value = user.morada;
      zipCode3Edit.value = user.cp.split("-")[0];
      zipCode4Edit.value = user.cp.split("-")[1];
      zipCodeLocalEdit.value = user.distrito;
      countryEdit.value = user.pais;
    }
  }
});

if (EditFormRegister) {
  EditFormRegister.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!UserLog) return;

    const newEmail = emailEdit.value.trim();

    if (!isValidEmail(newEmail)) {
      alert("E-mail inválido.");
      return;
    }

    const UserLogStorage = JSON.parse(UserLog);
    const userFromDB = await GetDataUser(UserLogStorage.id);
    if (!userFromDB) return;

    const oldEmail = userFromDB.email.trim();

    if (newEmail !== oldEmail) {
      const existEmail = await isEmailRegistered(newEmail);
      if (existEmail) {
        alert("Este e-mail já está registrado. Use outro.");
        return;
      }
    }

    const updateUserData = {
      nome: fullNameEdit.value,
      email: newEmail,
      morada: addressEdit.value,
      cp: zipCode3Edit.value + "-" + zipCode4Edit.value,
      distrito: zipCodeLocalEdit.value,
      pais: countryEdit.value,
    };

    await UpdateDataUser(updateUserData, UserLogStorage.id);
  });
}
