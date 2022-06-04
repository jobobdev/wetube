import express from "express";
import { watch, getEdit, postEdit, deleteVideo, getUpload, postUplaod } from "../controllers/videoController";

const videoRouter = express.Router();


// '/:id(\\d+)'는 parameter이다.
// hexadecimal id를 부여하는 mongodb를 사용하기 위해 regx를 설정
videoRouter.get('/:id([0-9a-f]{24})', watch);
// videoRouter.get('/:id(\\d+)/edit', getEdit);
// videoRouter.post('/:id(\\d+)/edit', postEdit)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUplaod);




export default videoRouter;