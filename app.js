var express = require('express')
var app = express()
const port = 2001;  


const bodyparser=require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())
let date = require('date');
var mysql = require('mysql');
var sql1=require('mysql');
var con = mysql.createConnection({
  host: "195.201.225.100",
  user: "tridinso_teamtr",
  password: "Tr1d1n@12390",
  database: "tridinso_peaceout"
});
app.use(function (req, res, next) {
//Enabling CORS
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});
let now = new Date();
  //let next_month = date.addMonths(now,0); // => Date object
  console.log(now);
    
con.connect((err)=>{
  if(!err)
  {
    console.log('db connection suceeded');
    //console.log(now) 
    //console.log(date.format(now, 'YYYY/MM/DD '));    // => '2015/01/02 23:14:05'
  }
    else 
    
     console.log('db connected failed \n error:'+JSON.stringify(err,undefined,2));
    
});
app.get('/login',(req,res)=>{
	
	console.log(req.body);
  var sql = "INSERT INTO `login`(`user_Name`,`password`) VALUES ('"+req.body.user_Name+"','"+req.body.password+"')";

 
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})
app.get('/login_get',(req,res)=>{
  var sql="SELECT * FROM `login` "
      var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})



app.post('/register',(req,res)=>{
	
	console.log(req.body);
  var otpkey= Math.floor(1000 + Math.random() * 9000);
 var sql = "INSERT INTO `users`(`phone_Number`,`otpkey`) VALUES ('"+req.body.mobile+"','"+otpkey+"')";
 
  console.log(otpkey);
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };
  var otpkey={"status":"1111"};

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(success);
    }
   });
})
app.post('/otpverification',(req,res)=>{
    
    var sql="SELECT * FROM `users` WHERE phone_Number='"+req.body.mobile+"'";  
  
    
  con.query(sql,function(err,result){

    if(err){
      res.send("{ status : failed }");
     }
     else{

      if ( result[0].otpkey == req.body.otpkey) 
      {
        console.log("DB OTP "+ result.otpkey + "GIVEN OTP"+req.body.otpkey)
        
      res.send("{ 'status' : 'OTP Verified' }");
      }
      else{
        console.log("please enter valid ")
        
      res.send("{ 'status' : 'Wrong OTP' }");
      }

    }
   });
})

//order
app.post('/orders',(req,res)=>{
  var sql = "INSERT INTO `orders`(`date`,`time`,`order_Id`,`product`,`shop_Name`,`address`,`mobile`,`status2`) VALUES   ('"+req.body.date+"','"+req.body.time+"','"+req.body.order_Id+"','"+req.body.product+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.mobile+"','"+req.body.status2+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//orders->totalorders
app.get('/totalorder',(req,res)=>{
  var sql="SELECT date,order_Id,product,shop_Name,address,mobile,status2 FROM `orders`"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{+
	 
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//todayorder
app.post('/todayorder',(req,res)=>{
  ate=date.format(now, 'DD/MM/YYYY ');    // => '2015/01/02 23:14:05'

  var sql="SELECT * FROM `orders` where mobile= '"+ate+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//orders->edit_show
app.get('/totalorder_edit',(req,res)=>{
  var sql="SELECT * FROM `orders`where order_Id='"+req.body.order_Id+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{+
	 
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//orders->editorder
app.get('/orders_update',(req,res)=>{
  var sql="UPDATE `orders` SET `date`='"+req.body.date+"',`time`='"+req.body.time+"',`order_Id`='"+req.body.order_Id+"',`product`='"+req.body.product+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`mobile`='"+req.body.mobile+"',`status2`='"+req.body.status2+"' where `order_Id`='"+req.body.order_Id+"'";
  //var sql="UPDATE `orders` SET `date`='"+req.body.date+"' `mobile`='"+req.body.mobile+"'";

  var success = { "status" : "success" };
   var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//delete orders
app.post('/orders_delete',(req,res)=>{
  var sql="DELETE  FROM `orders` where order_Id= '"+req.body.order_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})



//statusorders->pending
app.get('/statusorders',(req,res)=>{
  
  var sql="SELECT * FROM `orders` where status2='pending'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//orderstatus->completed
app.get('/statusorders_completed',(req,res)=>{
  
  var sql="SELECT * FROM `orders` where status2='completed'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("completed");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//orderstatus->inprogress
app.get('/statusorders_inprogress',(req,res)=>{
  
  var sql="SELECT * FROM `orders` where status2='inprogress'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("completed");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

//vendor
app.post('/vendor',(req,res)=>{
  var sql = "INSERT INTO `vendor`(`date`,`vendor_Id`,`vendor_Name`,`shop_Name`,`shop_Id`,`address`,`mobile`,`email`,`password`,`profile_Image`,`subscription_period`,`status2`) VALUES  ('"+req.body.date+"','"+req.body.vendor_id+"','"+req.body.vendor_Name+"','"+req.body.shop_Name+"','"+req.body.shop_id+"','"+req.body.address+"','"+req.body.mobile+"','"+req.body.email+"','"+req.body.password+"','"+req.body.profile_Image+"','"+req.body.subscription+"','"+req.body.status+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//vendor_get->active
app.get('/vendor_get_active',(req,res)=>{
  
  var sql="SELECT date,vendor_Id,vendor_Name,shop_Name,shop_Id,address,email,mobile,subscription_period FROM `vendor` where status2='active' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };
	console.log(sql);
  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//vendor_get->suspended
app.get('/vendor_get_suspended',(req,res)=>{
  
  var sql="SELECT date,vendor_Id,vendor_Name,shop_Name,shop_Id,address,email,mobile,subscription_period FROM `vendor` where status='suspended' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };
	console.log(sql);
  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

//delete vendor
app.post('/vendor_delete',(req,res)=>{
  var sql="DELETE  FROM `vendor` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

//user management
app.post('/user_Management',(req,res)=>{
  var sql = "INSERT INTO `user_view`(`date`,`user_Id`,`user_Name`,`address`,`email`,`mobile`,`user_Mode`) VALUES ('"+req.body.date+"','"+req.body.user_Id+"','"+req.body.user_Name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.user_Mode+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//usermanagement get
app.get('/usermanagement_get',(req,res)=>{
  var sql="SELECT * FROM `user_view` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//usermanagement edit
app.post('/user_edit',(req,res)=>{
  var sql="UPDATE `user_view` SET `date`='"+req.body.date+"',`user_Id`='"+req.body.user_Id+"',`user_Name`='"+req.body.user_Name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"',`user_Mode`='"+req.body.user_Mode+"' where `user_Id`='"+req.body.user_Id+"'";
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//user delete
app.post('/user_delete',(req,res)=>{
  var sql="DELETE  FROM `user_view` where user_Id= '"+req.body.user_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//products

app.post('/product',(req,res)=>{
  var sql = "INSERT INTO `product`(`category`,`product`,`product_Id`,`image`) VALUES ('"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/product_get',(req,res)=>{
  var sql="SELECT * FROM `product` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product_edit
app.post('/product_edit',(req,res)=>{
  var sql="UPDATE `product` SET `category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`image`='"+req.body.image+"' where `product_Id`='"+req.body.product_Id+"'";
  
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product_delete
app.post('/product_delete',(req,res)=>{
  var sql="DELETE  FROM `product` where product_Id= '"+req.body.product_Id+"'"
      var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})



app.post('/staff_Management',(req,res)=>{
  var sql = "INSERT INTO `staff_view`(`staff_id`,`staff_Name`,`address`,`email`,`mobile`) VALUES ('"+req.body.staff_id+"','"+req.body.staff_Name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/staffmanagement_get',(req,res)=>{
  var sql="SELECT * FROM `staff_view` where staff_id= '"+req.body.staff_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/staff_get',(req,res)=>{
  var sql="SELECT * FROM `staff_view` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

app.post('/staff_edit',(req,res)=>{
  var sql="UPDATE `staff_view` SET `staff_id`='"+req.body.staff_id+"',`staff_Name`='"+req.body.staff_Name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `mobile`='"+req.body.mobile+"'";
    
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/staffmanagement_delete',(req,res)=>{
  var sql="DELETE  FROM `staff_view` where staff_id= '"+req.body.staff_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("deleted");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

//inventry->purchase

app.post('/purchase',(req,res)=>{
  var sql = "INSERT INTO `purchase`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`mobile`) VALUES ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.mobile+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//inventry-purchase-get
app.get('/purchase_get',(req,res)=>{
  var sql="SELECT * FROM `purchase` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//inventry-purchase-get-edit
app.get('/purchase_get_edit',(req,res)=>{
  var sql="SELECT * FROM `purchase` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

app.post('/purchase_edit',(req,res)=>{
  var sql="UPDATE `purchase` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`mobile`='"+req.body.mobile+"' where `product_Id`='"+req.body.product_Id+"'";
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/purchase_delete',(req,res)=>{
  var sql="DELETE  FROM `purchase` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

//shop_Management->offline shop
app.post('/offline_shop',(req,res)=>{
  var sql = "INSERT INTO `offline_shop`(`shop_Name`,`shop_Address`,`mobile`,`email`,`image`) VALUES ('"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.mobile+"','"+req.body.email+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/offline_shop_get',(req,res)=>{
  var sql="SELECT * FROM `offline_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//offline->get
app.get('/offline_shop_update',(req,res)=>{
  var sql="SELECT * FROM `offline_shop` where mobile='"+req.body.mobile+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/offline_shop_edit',(req,res)=>{
  var sql="UPDATE `offline_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`mobile`='"+req.body.mobile+"',`email`='"+req.body.email+"',`image`='"+req.body.image+"' where `mobile`='"+req.body.mobile+"'";
 
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/offline_delete',(req,res)=>{
  var sql="DELETE  FROM `offline_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//online

//shop_Management->onLine shop
app.post('/online_shop',(req,res)=>{
  var sql = "INSERT INTO `online_shop`(`shop_Name`,`shop_Address`,`mobile`,`email`,`image`) VALUES ('"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.mobile+"','"+req.body.email+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/online_shop_get',(req,res)=>{
  var sql="SELECT * FROM `online_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//onfline->get
app.get('/online_shop_update',(req,res)=>{
  var sql="SELECT * FROM `online_shop` where mobile='"+req.body.mobile+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/online_shop_edit',(req,res)=>{
  var sql="UPDATE `online_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`mobile`='"+req.body.mobile+"',`email`='"+req.body.email+"',`image`='"+req.body.image+"' where `mobile`='"+req.body.mobile+"'";
 
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/online_delete',(req,res)=>{
  var sql="DELETE  FROM `online_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

//shop_Management->exclusiveshop
app.post('/exclusive_shop',(req,res)=>{
  var sql = "INSERT INTO `exclusive_shop`(`shop_Id`,shop_Name`,`shop_Address`,`offers`,`image`) VALUES ('"+req.body.shop_Id+"','"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.offers+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/exclusive_shop_get',(req,res)=>{
  var sql="SELECT * FROM `exclusive_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
/app.post('/exclusive_shop_edit',(req,res)=>{
  var sql="UPDATE `exclusive_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`offers`='"+req.body.offers+"',`image`='"+req.body.image+"' where `shop_Id`='"+req.body.shop_Id+"'";
  
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/exclusive_delete',(req,res)=>{
  var sql="DELETE  FROM `exclusive_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

app.post('/exclusive_shop',(req,res)=>{
  var sql = "INSERT INTO `exclusive_shop`(`shop_Name`,`shop_Address`,`offers`,`image`) VALUES ('"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.offers+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/exclusive_shop_get',(req,res)=>{
  var sql="SELECT * FROM `exclusive_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
/app.post('/exclusive_shop_edit',(req,res)=>{
  var sql="UPDATE `exclusive_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`mobile`='"+req.body.mobile+"',`email`='"+req.body.email+"',`image`='"+req.body.image+"' where `mobile`='"+req.body.mobile+"'";
 
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/exclusive_delete',(req,res)=>{
  var sql="DELETE  FROM `exclusive_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//shipping rate
//payment
 
app.post('/shipping',(req,res)=>{
  var sql = "INSERT INTO `shipping`(`description`,`amount`) VALUES ('"+req.body.description+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/shipping_get',(req,res)=>{
  var sql="SELECT * FROM `shipping`"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/shipping_update',(req,res)=>{
  var sql="SELECT * FROM `shipping` where description='normal' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

/app.post('/shipping_edit',(req,res)=>{
  var sql="UPDATE `shipping` SET `user_Name`='"+req.body.user_Name+"',`details`='"+req.body.details+"',`product_Details`='"+req.body.product_Details+"',`amount`='"+req.body.amount+"',`payment_Status`='"+req.body.payment_Status+"',`payment_Mode`='"+req.body.payment_Mode+"',`Delivery_Mode`='"+req.body.Delivery_Mode+"' where `product_Id`='"+req.body.product_Id+"'";
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/shipping_delete',(req,res)=>{
  var sql="DELETE  FROM `shipping` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
 

//payment
 
app.post('/payment',(req,res)=>{
  var sql = "INSERT INTO `payment`(`product_Id`,user_Name`,`details`,`product_Details`,`amount`,`payment_Status`,`payment_Mode`,`Delivery_Mode`) VALUES ('"+req.body.product_Id+"','"+req.body.user_Name+"','"+req.body.details+"','"+req.body.product_Details+"','"+req.body.amount+"','"+req.body.payment_Status+"','"+req.body.payment_Mode+"','"+req.body.Delivery_Mode+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/payment_get',(req,res)=>{
  var sql="SELECT * FROM `payment` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
/app.post('/payment_edit',(req,res)=>{
  var sql="UPDATE `payment` SET `user_Name`='"+req.body.user_Name+"',`details`='"+req.body.details+"',`product_Details`='"+req.body.product_Details+"',`amount`='"+req.body.amount+"',`payment_Status`='"+req.body.payment_Status+"',`payment_Mode`='"+req.body.payment_Mode+"',`Delivery_Mode`='"+req.body.Delivery_Mode+"' where `product_Id`='"+req.body.product_Id+"'";
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/payment_delete',(req,res)=>{
  var sql="DELETE  FROM `payment` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
 
//mywallet
app.post('/mywallet',(req,res)=>{
  var sql = "INSERT INTO `mywallet`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`amount`) VALUES   ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/mywallet_get',(req,res)=>{
  var sql="SELECT * FROM `mywallet` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/mywallet_edit',(req,res)=>{
  var sql="UPDATE `mywallet` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`amount`='"+req.body.amount+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/mywallet_delete',(req,res)=>{
  var sql="DELETE  FROM `mywallet` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//appshare wallet

app.post('/appwallet',(req,res)=>{
  var sql = "INSERT INTO `appwallet`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`amount`) VALUES   ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/appwallet_get',(req,res)=>{
  var sql="SELECT * FROM `appwallet` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/appwallet_edit',(req,res)=>{
  var sql="UPDATE `payment` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`amount`='"+req.body.amount+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/appwallet_delete',(req,res)=>{
  var sql="DELETE  FROM `appwallet` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product
app.post('/product',(req,res)=>{
  var sql = "INSERT INTO `product`(`category`,`product`,`product_Id`,`image`) VALUES   ('"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.image+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product->get
app.get('/product_get',(req,res)=>{
  var sql="SELECT * FROM `product` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product->edit
app.get('/product_get_edit',(req,res)=>{
  var sql="SELECT * FROM `product`where product_Id='"+req.body.product_Id+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("product");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product-edit
app.post('/product_edit',(req,res)=>{
  var sql="UPDATE `product` SET `category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`image`='"+req.body.image+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product->remove
app.post('/product_delete',(req,res)=>{
  var sql="DELETE  FROM `product` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("deleted");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})




//productshare wallet

app.post('/productwallet',(req,res)=>{
  var sql = "INSERT INTO `productwallet`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`amount`) VALUES   ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/productwallet_get',(req,res)=>{
  var sql="SELECT * FROM `productwallet` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
/app.post('/productwallet_edit',(req,res)=>{
  var sql="UPDATE `product` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`amount`='"+req.body.amount+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
  var success = { "status" : "success" };
   var failed = { "status" : "failed" };


  console.log(sql);
  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.post('/productwallet_delete',(req,res)=>{
  var sql="DELETE  FROM `productwallet` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})


//service->order
  
 /*app.post('/order_Date',(req,res)=>{
  let now = new Date();
  //let next_month = date.addMonths(now,0); // => Date object
  console.log(now);
    
      
   })*/
//Store Banner///

app.post('/store',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `store_banner`(`banner_name`,`image`) VALUES ( '"+req.body.name+"','"+req.body.image+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getstore',(req,res)=>{
    var sql="SELECT * FROM `store_banner` where banner_name = '"+req.body.name+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("created");
     con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  // Update Table//
  app.post('/updatestore',(req,res)=>{
   var sql="UPDATE `store_banner` SET `banner_name`='"+req.body.name+"',`image`='"+req.body.image+"' WHERE `id`='"+req.body.id+"'";
   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

// Delete Table//
  app.post('/deletestore',(req,res)=>{
   	  var sql="DELETE FROM `store_banner` where id= '"+req.body.id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})




//---------------------//------------------------//



//App Banner///

app.post('/app',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `app_banner`(`banner_name`,`image`) VALUES ( '"+req.body.name+"','"+req.body.image+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getapp',(req,res)=>{
    var sql="SELECT * FROM `app_banner` where banner_name = '"+req.body.name+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("created");
     con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  // Update Table//
  app.post('/updateapp',(req,res)=>{
   var sql="UPDATE `app_banner` SET `banner_name`='"+req.body.name+"',`image`='"+req.body.image+"' WHERE `id`='"+req.body.id+"'";
   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

// Delete Table//
  app.post('/deleteapp',(req,res)=>{
   	  var sql="DELETE FROM `app_banner` where id= '"+req.body.id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})



//---------------------//------------------------//


//My Returns & Refunds///

app.post('/return',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `return_fund`(`date`,`order_id`,`description`,`status`,`product`,`shop`,`address`,`mobile`) VALUES ( '"+req.body.date+"','"+req.body.orderid+"','"+req.body.desc+"','"+req.body.status+"','"+req.body.product+"','"+req.body.shop+"','"+req.body.address+"','"+req.body.mobile+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getreturn',(req,res)=>{
    var sql="SELECT * FROM `return_fund` where id = '"+req.body.id+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("created");
     con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  // Update Table//
  app.post('/updatereturn',(req,res)=>{
	 var sql=" UPDATE `return_fund` SET `date`='"+req.body.date+"',`order_id`='"+req.body.order+"',`description`='"+req.body.desc+"',`status`='"+req.body.status+"',`product`='"+req.body.product+"',`shop`='"+req.body.shop+"',`address`='"+req.body.address+"',`mobile`='"+req.body.mobile+"' WHERE `id`='"+req.body.id+"'"
   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

// Delete Table//
  app.post('/deletereturn',(req,res)=>{
   	  var sql="DELETE FROM `return_fund` where id= '"+req.body.id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})




//---------------------//------------------------//

//Coupon///

app.post('/coupon',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `coupon`(`coupon_mode`,`status`) VALUES ( '"+req.body.coupon+"','"+req.body.status+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getcoupon',(req,res)=>{
    var sql="SELECT * FROM `coupon` where id = '"+req.body.id+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("created");
     con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  // Update Table//
  app.post('/updatecoupon',(req,res)=>{
   var sql="UPDATE `coupon` SET `coupon_mode`='"+req.body.coupon+"',`status`='"+req.body.status+"' WHERE `id`='"+req.body.id+"'";
   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

// Delete Table//
  app.post('/deletecoupon',(req,res)=>{
   	  var sql="DELETE FROM `coupon` where id= '"+req.body.id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})




//---------------------//------------------------//



//Service///

app.post('/service',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `service`(`coupon`,`code`) VALUES ( '"+req.body.coupon+"','"+req.body.code+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getservice',(req,res)=>{
    var sql="SELECT * FROM `service` where id = '"+req.body.id+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("created");
     con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  // Update Table//
  app.post('/updateservice',(req,res)=>{
   var sql="UPDATE `service` SET `coupon`='"+req.body.coupon+"',`code`='"+req.body.code+"' WHERE `id`='"+req.body.id+"'";
   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

// Delete Table//
  app.post('/deleteservice',(req,res)=>{
   	  var sql="DELETE FROM `service` where id= '"+req.body.id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
   console.log(sql);
    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})




//---------------------//------------------------//




   

console.log("Working Fine!");
app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
