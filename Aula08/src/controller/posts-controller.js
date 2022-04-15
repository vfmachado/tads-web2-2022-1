const { PostsDao } = require("../model/posts-dao");

class PostsController {
    async list(req, res) {
        const posts = await PostsDao.findAll();
        res.send(JSON.stringify(posts, null, 2));
        return;
    }
    
    async detail(req, res) {
        const { id } = req.params;
        const post = await PostsDao.findById(id);
        // res.send(JSON.stringify(post, null, 2));
        return res.render('detail', { post });
    }
    // create
    // update
    // delete
}

module.exports = { PostsController };
