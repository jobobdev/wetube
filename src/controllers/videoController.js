import Video from "../models/Video";

/*
.find는 mongoose query이고, 그 안에 첫째 방식으로 call back을 사용할 경우
.find([찾을 것, 아무것도 안쓰면, 있는 거 전부 찾음], [callback])
Video.find({}, (error, videos) => {
    return res.render("home", {pageTitle: 'Home', videos});
});
*/
// using promises. 함수 안에 함수를 쓰지 않아도 되고, 순서대로 작동한다.
// await이라는 것이 그 줄의 명령이 다 시행될 때까지 기다리라는 것이기 때문에 아직 다 데이터가 로딩되기도 전에 랜더링 되는 걸 막을 수 잇다.
// error를 잡기 위해서는 try/catch를 사용한다.
export const home = async(req,res) => {
    const videos = await Video.find({})
    return res.render("home", {pageTitle: 'Home', videos});
};

// watch | 존재하지 않는 video에 접근하려고 할 때 에러도 처리해줘
export const watch = async (req,res) => {
    const { id } = req.params;
    // mongoose query
    const video = await Video.findById(id); // exec()은 Promise를 준다.
    if(!video){
        return res.render("404", {pageTitle: "Video not found."}); // 404 template이 base를 extend하고 base에는 h1=page.title이 있으니 그걸 설정해주는 것.
    }
    return res.render("watch",{pageTitle: video.title, video});
};

// edit
export const getEdit = async (req,res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "Video not found."});
    }
    return res.render("edit", {pageTitle: `Edit ${video.title}`, video}); // edit.pug가 video.title을 사용한다. 즉, video obj가 필요하니 넘겨준다.
};
export const postEdit = async (req,res) => {
    const { id } = req.params;
    // edit.pug의 form에 name을 넣어줘야 한다. 그렇지 않으면 req.body는 empty를 가져옴.
    const { title, description, hashtags } = req.body;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "Video not found."});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
    })
    return res.redirect(`/videos/${id}`);
};

// upload
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"})
}

export const postUplaod = async(req,res) => {
    // we weill add a video to the videos array
    const { title, description, hashtags } = req.body;
    // mongoose 홈페이지 참조할 것. mongoosejs.com/docs/models.html
    try {
        await Video.create({
            title, // es6
            description,
            hahstags: hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
        });
        return res.redirect("/");
    } catch(error){
        console.log(error);
        return res.render("upload", {pageTitle: "Upload Video", errorMessage: error._message,})
    }
}