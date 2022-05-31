let videos = [
    {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 30,
    id: 1,
},
{
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
},
{
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
},
]


export const trending = (req,res) => res.render("home", {pageTitle: 'Home', videos});
export const watch = (req,res) => {
    const { id } = req.params;
    const video = videos[id-1]
    return res.render("watch",{pageTitle: `Watching ${video.title}`, video});
};
export const getEdit = (req,res) => {
    const { id } = req.params;
    const video = videos[id-1]
    return res.render("edit", {pageTitle: `Editing ${video.title}`, video});
};
export const postEdit = (req,res) => {
    const { id } = req.params;
    // edit.pug의 form에 name을 넣어줘야 한다. 그렇지 않으면 req.body는 empty를 가져옴.
    const { title } = req.body;
    // 오른 편의 title은 위의 req.body.title임.
    videos[id -1].title = title; 
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    
    return res.render("upload", {pageTitle: "Upload Video"})
}

export const postUplaod = (req,res) => {
    // we weill add a video to the videos array
    const { title } = req.body;
    const newVideo = {
        // title 이라고 적는 건 title : title과 같으며 여기서 오른편의 title은 위에서 받아온 req.body.title이다.
        title,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(newVideo);
    return res.redirect("/");
}