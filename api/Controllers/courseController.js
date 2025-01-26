import Course from "../Models/courseModal.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

const getAllCourses = getAll(Course);
const getCourse = getOne(Course);
const createCourse = createOne(Course);
const updateCourse = updateOne(Course);
const deleteCourse = deleteOne(Course);

export { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse };
