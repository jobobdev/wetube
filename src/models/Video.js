
import mongoose from "mongoose"

// creating a scheam
// define the shape of the model == schema
// [what schema should contain : type of data]
const videoSchema = new mongoose.Schema({
    title: String, // same as doing title: {type: String}
    description: String,
    createdAt: Date,
    hastags: [{ type: String}],
    meta: {
        views: Number,
        rating: Number,
    },
});

// creating a model
// mongoose.model([name of the model], [schema])
const Video = mongoose.model("Video", videoSchema)
export default Video;