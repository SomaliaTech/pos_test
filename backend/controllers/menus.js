import data, { menus } from "../config/data.js";
import menuModel from "../models/menu.js";
import tableModel from "../models/table.js";

export const CreateModelMenu = async (req, res) => {
  try {
    const menu = await menuModel.create(menus);
    // const menu = await tableModel.create(data.tableData);

    res.status(200).send({
      message: "created successfuly",
      menu,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};
export const GetAllModelMenu = async (req, res) => {
  try {
    const menu = await menuModel.find();

    res.status(200).send({
      message: "created successfuly",
      menu,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};
