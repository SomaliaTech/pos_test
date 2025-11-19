import data, { menus } from "../config/data.js";
import menuModel from "../models/menu.js";

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

// In your controller or data access file

export const getTrendingItems = async (req, res) => {
  try {
    const trendingMenus = await menuModel.aggregate([
      {
        $addFields: {
          itemCount: { $size: "$items" },
        },
      },
      {
        $sort: { itemCount: -1, createdAt: -1 },
      },
      {
        $limit: 1, // adjust how many trending menus to return
      },
    ]);

    res.json({
      success: true,
      count: trendingMenus.length,
      trending: trendingMenus[0],
    });
  } catch (err) {
    console.error("Error fetching trending menus:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const DeleteItemMenu = async (req, res) => {
  const id = req.params.id;
  try {
    const menu = await menuModel.findOne(
      await menuModel.updateOne(
        { "items._id": id },
        { $pull: { items: { _id: id } } }
      )
    );
    // const menu = await tableModel.create(data.tableData);

    res.status(200).send({
      message: "Deleted successfuly",
      menu,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};
export const UpdateItemMenu = async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;

  if (
    updateFields.image &&
    typeof updateFields.image === "string" &&
    !updateFields.image.startsWith("https")
  ) {
    const cloud = await cloudinary.uploader.upload(updateFields.image, {
      folder: "menu_items",
    });

    updateFields.image = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };
  }
  try {
    for (const [key, value] of Object.entries(updateFields)) {
      updateFields[`items.$.${key}`] = value;
    }

    const updatedMenu = await menuModel.findOneAndUpdate(
      { "items._id": id },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).send({
      message: "updated successfuly",
      updatedMenu,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};
