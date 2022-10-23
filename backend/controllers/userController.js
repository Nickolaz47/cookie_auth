const getUserInfo = (req, res) => {
  const { user } = req;

  return res.json(user);
};

const userController = { getUserInfo };

export default userController;
