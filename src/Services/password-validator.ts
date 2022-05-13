export const validatePassword = (pass: string) => {
  if (!pass) return;
  return Boolean(
    !pass.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  );
};
