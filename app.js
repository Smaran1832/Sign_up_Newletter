const express= require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https= require("https")

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendfile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const first_name=(req.body.F_name);
  const last_name=(req.body.L_name);
  const email=(req.body.Email);

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: first_name,
          LNAME: last_name
        }
      }
    ]
  }

  const jsonData=JSON.stringify(data);

  const url="https://us14.api.mailchimp.com/3.0/lists/1ff60b7e26"
  const options = {
    method:"POST",
    auth: "Smaran:6b68c56e04310dc152fdcccc3598fd25-us14"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })
  // request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started on port 3000");
});


// Api Key:6b68c56e04310dc152fdcccc3598fd25-us14
// Audience/List Id:1ff60b7e26
