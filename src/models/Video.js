
import mongoose from "mongoose"

// creating a scheam
// define the shape of the model == schema
// [what schema should contain : type of data]
const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxLength: 80 }, 
    description: {type: String, required: true, trim: true, minLength: 20},
    // Date.now에서 now()를 하지 않는 이유는, 여기서 바로 함수를 콜하지 않기 위함이다. 그럼 알아서 mongodb와 mongoose가 알아서 시행해줄 것이다.
    createdAt: {type: Date, required: true, default: Date.now},
    hashtags: [{ type: String, trim: true}],
    meta: {
        views: {type: Number, default: 0, required: true},
        rating: {type: Number, default: 0, required: true},
    },
});

// create a middleware before you create a Model
videoSchema.static("formatHashtages", function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`))
})

// creating a model
// mongoose.model([name of the model], [schema])
const Video = mongoose.model("Video", videoSchema)
export default Video;