import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }

    // check for existing category
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    return res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

// update category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in updating Category",
    });
  }
};

// Get all category
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    return res.status(200).send({
      message: "All categories list",
      success: true,
      category,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      error,
      message: "Error in Getting categories",
      success: false,
    });
  }
};

// Single Ctaegory
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    return res.status(200).send({
      success: true,
      category,
      message: "Get Category Information Successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      error,
      success: false,
      message: "Error while getting the single category ",
    });
  }
};

// Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: " Category Deleted",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while Deleting Category",
    });
  }
};
