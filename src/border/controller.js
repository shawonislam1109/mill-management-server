const {
  getAllBorderListsService,
  updateBorderListService,
  createBorderListService,
  getBorderListByIdService,
  deleteBorderListService,
} = require("./service");

// border list get controller
const getAllBorderListsController = async (req, res, next) => {
  try {
    const borderLists = await getAllBorderListsService(req, res, next);
    return res.status(200).json({ data: borderLists });
  } catch (error) {
    next(error);
  }
};

// border list update controller
const updateBorderListController = async (req, res, next) => {
  try {
    const updatedBorderList = await updateBorderListService(req, res, next);
    return res.status(201).json({ data: updatedBorderList });
  } catch (error) {
    next(error);
  }
};

// border list create controller
const createBorderListController = async (req, res, next) => {
  try {
    const borderList = await createBorderListService(req, res, next);
    return res.status(201).json({ data: borderList });
  } catch (error) {
    next(error);
  }
};

// border list get by id controller
const getBorderListByIdController = async (req, res, next) => {
  try {
    const borderList = await getBorderListByIdService(req, res, next);
    return res.status(200).json({ data: borderList });
  } catch (error) {
    next(error);
  }
};

// border list delete  controller
const deleteBorderListController = async (req, res, next) => {
  try {
    const deleteBorderList = await deleteBorderListService(req, res, next);
    return res.status(200).json({ data: deleteBorderList });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBorderListController,
  deleteBorderListController,
  getAllBorderListsController,
  getBorderListByIdController,
  updateBorderListController,
};
