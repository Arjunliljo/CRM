// handlerFactory.js
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";
import APIFeatures from "../APIFeatures/APIFeatures.js";

export const getAll = (Model, popOptions, nestedPopOptions) => {
  // console.log("herehre");

  return catchAsync(async (req, res, next) => {
    let filter = {};
    const features = new APIFeatures(Model, Model.find(filter), req.query);

    features
      .filter()
      .sort()
      .limitFields()
      .paginate(await Model.countDocuments())
      .filterByBranch()
      .filterByDateRange()
      .search()
      .userFilter()
      .countryFilter()
      .roleFilter();

    let query = features.query;
    if (popOptions) {
      if (Array.isArray(popOptions)) {
        popOptions.forEach((option) => {
          query = query.populate(option);
        });
      } else {
        query = query.populate(popOptions);
      }
    }

    // Conditionally apply nested population
    if (nestedPopOptions) {
      nestedPopOptions.forEach((nestedOption) => {
        query = query.populate(nestedOption);
      });
    }

    try {
      const docs = await query;

      res.status(200).json({
        status: "success",
        results: docs.length,
        data: docs,
      });
    } catch (err) {
      console.error("Error executing query:", err);
      return next(new AppError("Failed to retrieve documents", 500));
    }
  });
};

export const getOne = (Model, type = "id") => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id).select("-password");

    if (!data) {
      return next(new AppError(`No document found with this ${type}`, 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });
};

export const createOne = (Model) => {
  console.log("called");
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("Failed to create document", 400));
    }

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

export const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    console.log("updateOne called", req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

export const substatusDelete = (Model) => {
  return catchAsync(async (req, res, next) => {
    const { statusId, subStatusId } = req.body;
    const doc = await Model.findByIdAndUpdate(
      statusId,
      { $pull: { subStatuses: { _id: subStatusId } } },
      { new: true, runValidators: true }
    );

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

export const updateSubStatusColor = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};
