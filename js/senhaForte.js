function isStrongPassword(password) {
  if (password.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve conter pelo menos 1 letra maiúscula.";
  }

  if (!/[a-z]/.test(password)) {
    return "A senha deve conter pelo menos 1 letra minúscula.";
  }

  if (!/[0-9]/.test(password)) {
    return "A senha deve conter pelo menos 1 número.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "A senha deve conter pelo menos 1 símbolo (ex.: ! @ # $ % ^ & *).";
  }

  return true;
}
