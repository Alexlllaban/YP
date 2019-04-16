class PostCollection{
    constructor(photoPosts){
        this._photoPosts = photoPosts;
    }

    _sortPostsByDate(post) {
        post.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            }
            else {
                return -1;
            }
        });
    }

    _validatePost(post) {
        if (!post.id) {
            console.log("no post id");
            return false;
        }
        if (!post.description) {
            return false;
        }
        else {
            if (post.description.length >= 200) {
                console.log("wrong post:" + post.id + " description length: " + post.description.length);
                return false;
            }
        }
        if (!post.createdAt) {
            console.log("wrong post id");
            return false;
        }
        if (!post.author) {
            console.log("wrong post author");
            return false;
        }
        else if (post.author.length === 0) {
            console.log("wrong post author length");
            return false;
        }
        if(!post.location){
            console.log("wrong post location");
            return false;
        }
        if(!post.photoLink){
            console.log("wrong post photoLink");
            return false;
        }
        return true;
    }

    addAll(photoPosts) {
        this._photoPosts = [];
        const invalid = [];
        for (let i = 0; i < photoPosts.length; i++) {
            if (this._validatePost(photoPosts[i])) {
                this._photoPosts.push(photoPosts[i]);
            }
            else {
                invalid.push(photoPosts[i]);
            }
        }
        return invalid;
    }


    addPost(post) {
        if (this._validatePost(post)) {
            for(let i = 0; i < photoPosts.length; i++){
                if(photoPosts[i].id === post.id){
                    console.log("post with the same id already exists");
                    return false;
                }
            }
            photoPosts.push(post);
            return true;
        }
        else return false;
    }

    getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let res = photoPosts.slice();
        this._sortPostsByDate(res);
        if(filterConfig.author){
            res = res.filter(function (post) {
                return post.author.toLowerCase() === filterConfig.author.toLowerCase();
            });
        }
        if(filterConfig.createdAt){
            res = res.filter(function (post) {
                return post.createdAt.getDate() === new Date(filterConfig.createdAt).getDate();
            });
        }
        res = res.slice(skip, skip+top);
        return res;
    }

    getPostById(id) {
        let t = false;
        for(let i = 0; i < photoPosts.length; i++ ){
            if(photoPosts[i].id === id){
                t = true;
                return photoPosts[i];
            }
        }
        console.log("no such id found");
        return t;
    }

    editPost(postID, post) {
        let clone = Object.assign({}, this.getPostById(postID));
        if (post.id) clone.id = post.id;
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;
        if (this._validatePost(clone)) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === postID) {
                    photoPosts[i] = clone;
                    return true;
                }
            }
        }
        else return false;
    }

    removePost(id) {
        let index = 0;
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                index = i;
                break;
            }
        }
        if(index === 0){
            console.log("no post with such id");
            return false;
        }
        photoPosts.splice(index, 1);
        return true;
    }
}

   function startTests() {
    const Collection = new PostCollection(photoPosts);

    console.log(Collection.getPhotoPosts(0,20,""));

    console.log(Collection.getPhotoPosts(0, 10, {
        createdAt: new Date("2019-01-01"),
        author: "Aleksey"
    }));

    console.log(Collection.getPhotoPosts(0, 10, {
        createdAt: "",
        author: "Alex"
    }));

    console.log(photoPosts);

    console.log(Collection.getPostById("22"));

    console.log(Collection._validatePost(Collection.getPostById("3")));

    console.log(Collection.addPost({
            id: "33",
            description: "Cat photo",
            createdAt: new Date("2019-03-10"),
            location: "Minsk, Belarus",
            author: "Шабан",
            photoLink: "images/1.jpg"
    }));

    console.log(photoPosts);

    console.log(Collection.getPhotoPosts(0, 21, ""));

    Collection.editPost("15", {description: "new description!!!"});

    console.log(Collection.getPostById("15"));

    console.log(photoPosts);

    Collection.removePost("33");

    console.log(photoPosts);

    console.log(Collection.addAll(photoPosts));

    console.log(Collection);

}

startTests();