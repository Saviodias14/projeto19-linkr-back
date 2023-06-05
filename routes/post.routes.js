import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
//import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { postSchema } from "../schemas/post.schemas.js";
import { getPosts, getHashtags, postPosts, deletePost } from "../controllers/post.controllers.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { validateDeletePost } from "../middlewares/post.middleware.js";

const postsRouter = Router()

postsRouter.post("/post", authValidation, schemaValidation(postSchema), postPosts)
postsRouter.get("/get-posts", getPosts)
postsRouter.get("/hashtags", getHashtags)
postsRouter.delete("/delete-post/:user_id/:id", authValidation,  validateDeletePost, deletePost)

export default postsRouter