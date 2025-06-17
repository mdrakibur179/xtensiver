export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    alert("Please provide all the information");
    return;
  }
};
