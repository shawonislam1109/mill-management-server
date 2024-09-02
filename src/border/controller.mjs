import {
  getAllBorderListsService,
  updateBorderListService,
  createBorderListService,
  getBorderListByIdService,
  deleteBorderListService,
  getAllBorderFilerMonthWays,
} from "./service.mjs";

// border list get controller
export const getAllBorderListsController = async (req, res, next) => {
  try {
    const borderLists = await getAllBorderListsService(req, res, next);
    return res.status(200).json({ data: borderLists });
  } catch (error) {
    next(error);
  }
};
// border list get controller
export const getAllBorderListsMonthFilterController = async (
  req,
  res,
  next
) => {
  try {
    const borderLists = await getAllBorderFilerMonthWays(req, res, next);
    return res.status(200).json({ data: borderLists });
  } catch (error) {
    next(error);
  }
};

// border list update controller
export const updateBorderListController = async (req, res, next) => {
  try {
    const updatedBorderList = await updateBorderListService(req, res, next);
    return res.status(201).json({ data: updatedBorderList });
  } catch (error) {
    next(error);
  }
};

// border list create controller
export const createBorderListController = async (req, res, next) => {
  try {
    const { saveBorderList, borderTransition } = await createBorderListService(
      req,
      res,
      next
    );
    return res.status(201).json({ data: { saveBorderList, borderTransition } });
  } catch (error) {
    next(error);
  }
};

// border list get by id controller
export const getBorderListByIdController = async (req, res, next) => {
  try {
    const borderList = await getBorderListByIdService(req, res, next);
    return res.status(200).json({ data: borderList });
  } catch (error) {
    next(error);
  }
};

// border list delete  controller
export const deleteBorderListController = async (req, res, next) => {
  try {
    const deleteBorderList = await deleteBorderListService(req, res, next);
    return res.status(200).json({ data: deleteBorderList });
  } catch (error) {
    next(error);
  }
};
