const BuaDetails = require("./model");

//  GET BUA DOCUMENT

const getBuaDocument = async (req, res, next) => {
  try {
    const totalBuaDocs = await BuaDetails.find();
    res.status(200).json({
      data: totalBuaDocs,
    });
  } catch (error) {
    next(error);
  }
};

const createBuaDetails = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }

    const totalBuaDocs = await BuaDetails.countDocuments();

    if (totalBuaDocs > 0) {
      res.status(403).json({ message: "Bua Al Ready exits " });
    }

    const newBua = new BuaDetails({
      name,
      status,
    });

    const saveDoc = await newBua.save();
    res.status(201).json({ message: "Create successfully", data: saveDoc });
  } catch (error) {
    next(error);
  }
};

// UPDATE BUA DOCUMENT
const updateBuaDetails = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const { buaId } = req.params;

    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }

    const updateBuaDoc = await BuaDetails.findByIdAndUpdate(
      buaId,
      {
        $set: {
          name,
          status,
        },
      },
      {
        new: true,
      }
    );

    res
      .status(201)
      .json({ message: "Update successfully", data: updateBuaDoc });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBuaDetails, updateBuaDetails, getBuaDocument };
