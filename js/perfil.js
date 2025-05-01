const TableLogProfile = document.querySelector("#profileLog");
const BtnEditProfile = document.querySelector("#editProfile");

document.addEventListener("DOMContentLoaded", async function () {
  updateIcons();

  const UserLog = localStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    const UserLogStorage = JSON.parse(UserLog);
    let user = await GetDataUser(UserLogStorage.id);

    if (user && TableLogProfile) {
      TableLogProfile.innerHTML = `
      <tr><td><strong>Nome:</strong></td><td>${user.nome}</td></tr>
      <tr><td><strong>E-mail:</strong></td><td>${user.email}</td></tr>
      <tr><td><strong>Morada:</strong></td><td>${user.morada}</td></tr>
      <tr><td><strong>Código Postal:</strong></td><td>${user.cp} -  ${user.distrito}</td></tr>
      <tr><td><strong>País:</strong></td><td>${user.pais}</td></tr>
    `;
    } else if (TableLogProfile) {
      TableLogProfile.innerHTML = `<p style="font-Size:25px; color:Red; padding:10px">Erro ao carregar Utilizador!</p>`;
    }
  }
});

if (BtnEditProfile) {
  BtnEditProfile.addEventListener("click", function () {
    window.location.href = "EditarPerfil.html";
  });
}
