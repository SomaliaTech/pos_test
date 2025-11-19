import contectModel from "../models/contect.js";

export const CreateSendMessage = async (req, res) => {
  const { email, name, details } = req.body;
  console.log("email", email, name, details);
  try {
    if (!email || !name || !details) {
      return res.status(403).send({
        sucess: false,
        message: "Please complate all feild",
      });
    }
    const contect = await contectModel.create({
      name,
      email,
      details,
    });

    res.status(200).send({
      message: "created successfuly",
      contect,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};

export const GetAllMessage = async (req, res) => {
  try {
    const contect = await contectModel.find();

    res.status(200).send({
      message: "feched  successfuly",
      contect,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};
