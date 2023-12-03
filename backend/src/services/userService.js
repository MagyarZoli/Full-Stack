import User from "../models/UserModel.js";

export const findUsers = async (req, res) => {
  try {
    const products = await User.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const createUser = async (req, res) => {
  try {
    const product = await User.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findById(id);
    if (!product) return res.status(404).json({ message: `Cannot find any product with ID ${id}`});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const findUserByIdAndUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findByIdAndUpdate(id, req.body);
    if (!product) return res.status(404).json({ message: `Cannot find any product with ID ${id}`});
    const updatedProduct = await User.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const findUserByIdAndDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findByIdAndDelete(id);
    if (!product) return res.status(404).json({message: `Cannot find any product with ID ${id}`});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UserService = {
  findUsers,
  createUser,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete
};

export default UserService;
