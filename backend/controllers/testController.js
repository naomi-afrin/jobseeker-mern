export const testGetController = (req, res) => {
  res.status(200).json({message: "success"});
};

export const testPostController = (req, res) => {
  const { name } = req.body;
  res.status(200).json({ message: "welcome", name: name });
};
