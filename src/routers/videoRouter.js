import express from "express";
import { watch, getEdit, postEdit, deleteVideo, getUpload, postUplaod } from "../controllers/videoController";

const videoRouter = express.Router();


// '/:id(\\d+)'는 parameter이다.
videoRouter.get('/:id(\\d+)', watch);
// videoRouter.get('/:id(\\d+)/edit', getEdit);
// videoRouter.post('/:id(\\d+)/edit', postEdit)
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUplaod);



export default videoRouter;