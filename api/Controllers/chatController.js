import Chat from "../Models/chatModel.js";
import { updateOne } from "./handlerFactory.js";
import { createOne } from "./handlerFactory.js";
import { getAll } from "./handlerFactory.js";

const updateChat = updateOne(Chat);
const createChat = createOne(Chat);
const getChats = getAll(Chat);

export { updateChat, createChat, getChats };