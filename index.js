import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
var d =new Date();
var ind = 0;


var post_List = [];


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var posts = {};
posts['id'] = ind,
posts['author'] = "བྱ་ཉ་བློ་བཟང་ཚུལ་ཁྲིམས།";
posts['date'] = d.toDateString();
posts['content'] = "སྒྲབ་ངག་ཡན་ལག་ལྔ་ལྡན་ནི་གཞན་སྡེ་མང་པོས་འདོད་པ་མ་ཟད་རང་སྡེ་འགའ་ཞིག་གིས་ཀྱང་འདོད་དེ། དཔེར་ན་སློབ་དཔོན་ཟླ་བ་གྲགས་པའི་དབུ་མ་ཚིག་གསལ་དུ་ཡན་ལག་ལྔ་ལྡན་རང་ལུགས་སུ་བཀོད་པ་ལྟ་བུའོ། །འོན་ཀྱང་ཕྱོགས་གླང་གི་གཞུང་དུ་ཉེར་སྦྱོར་དང་མཇུག་སྡུད་བརྗོད་པ་གཉིས་བཀག་ཅིང་། ཆོས་གྲགས་ཀྱི་གཞུང་དུ་དམ་བཅའ་བརྗོད་པ་ཡང་བཀག་སྟེ་ཡན་ལག་གཉིས་ལྡན་དུ་གཏན་ལ་ཕབ་པར་མཛད།  ཡན་ལག་ལྔ་ལྡན་དུ་འདོད་པ་དག་གིས་བློ་རྩེ་གཏད་ས་དང་། དེ་ཇི་ལྟར་བཀག་ཚུལ་ནི་གཏན་ཚིགས་ཐིགས་པའི་རྩ་འགྲེལ་དང་། ཚད་མའི་དེ་ཁོ་ན་ཉིད་བསྡུས་པའི་དཀའ་འགྲེལ་གྱི་རྗེས་སུ་དཔག་པ་བརྟག་པའི་ལེའུ་རུ་གསུངས་པ་ནི་བོད་འགྱུར་ནང་གི་ཅུང་རྒྱས་ཤོས་དང་ཆ་ཚང་བ་དེ་ཡིན། བོད་ཀྱི་ཚད་གཞུང་དུ་ཡན་ལག་ལྔ་ལྡན་གྱི་སྐོར་འགོག་པ་ཕྲན་བུ་རེ་བྱུང་མོད། ཕྱོགས་སྔ་མས་ཇི་ལྟར་འདོད་པ་སོགས་ཞིབ་ཚགས་ཀྱིས་བཤད་པ་མཐོང་དཀའོ། །";
post_List.push(posts);

function makepost (author,content) {
    ind+=1;
    var secondPost = {};
    secondPost['id'] = ind;
    secondPost['author'] = author;
    secondPost['date'] = d.toDateString();
    secondPost['content'] = content;
    post_List.push(secondPost);
    console.log(post_List);
}

app.get("/",(req,res) => {
    
    res.render("home.ejs",{posts : post_List}) ;
})

app.get("/edit",(req,res) => {
    res.render("edit.ejs");
})

app.get("/contact",(req,res) => {
    res.render("contact.ejs");
})


app.get("/about", (req,res) => {
    res.render("about.ejs");
});

app.post("/delete/:id", (req, res) => {
        const postId = req.params.id;
        console.log(postId);

        // Logic to delete the post with postId
        const index = parseInt(postId, 10);

        if (!isNaN(index) && index >= 0 && index < post_List.length) {
            post_List.splice(index, 1);
        } else {
            console.log("Invalid postId or post not found");
        }
        // ...
        
        // Redirect to the appropriate page after deletion
        res.redirect("/"); // You can redirect to the home page or any other page
});

app.post("/add", (req,res) => {
        var content = req.body['msg'];

        var author = req.body['name'];
        console.log(content,author);
        makepost(author,content);
        res.redirect("/");
        

})

app.listen(PORT, () => {
    console.log("server running on ",PORT);
});