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
export const watch = (req,res) => {
    const { id } = req.params;
    return res.render("watch",{pageTitle: `Watching`});
};
export const getEdit = (req,res) => {
    const { id } = req.params;
    return res.render("edit", {pageTitle: `Editing`});
};
export const postEdit = (req,res) => {
    const { id } = req.params;
    // edit.pug의 form에 name을 넣어줘야 한다. 그렇지 않으면 req.body는 empty를 가져옴.
    const { title } = req.body;
    // 오른 편의 title은 위의 req.body.title임. 
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    
    return res.render("upload", {pageTitle: "Upload Video"})
}

export const postUplaod = (req,res) => {
    // we weill add a video to the videos array
    const { title } = req.body;
    videos.push(newVideo);
    return res.redirect("/");
}