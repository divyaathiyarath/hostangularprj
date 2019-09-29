const Express=require('express');
var app=new Express();
var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:'true'}));
var mongoose=require('mongoose');
var request=new require('request');
app.use(Express.static(__dirname+"/public"));
// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://hostang.herokuapp.com/' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-rfooj.mongodb.net/test?retryWrites=true&w=majority");
//mongoose.connect("mongodb://localhost:27017/hostangular");
var MessageModel=mongoose.model('message',{
    message:String
})
app.get('/',(req,res)=>{
    res.render("Welcome");
});
app.post('/readMsgApi',(req,res)=>{

   // console.log("Api"+req.body.message);
    var message=new MessageModel(req.body);
    message.save((error)=>{
        if(error)
        {
            throw error;
        }
        else{

            console.log(message);
            res.send(message);
        }
    })
    
})

app.get('/getDataApi',(req,res)=>{

  //  console.log("getDataApi");
    MessageModel.find((error,data)=>{
     
        if(error)
        {
            throw error;
        }
        else  {

            console.log(data);
            res.send(data);
        }

    })
})


app.listen(process.env.PORT || 3000,()=>
{
    console.log("Server is running on port 3000");
})