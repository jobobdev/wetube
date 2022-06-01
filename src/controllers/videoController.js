import Video from "../models/Video";

export const home = (req,res) => {
    /*
    .find는 mongoose query이고, 그 안에 첫째 방식으로 call back을 사용할 경우
    .find([찾을 것, 아무것도 안쓰면, 있는 거 전부 찾음], [callback])
    */
    Video.find({}, (error, videos) => {
        return res.render("home", {pageTitle: 'Home', videos});
    });

}
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