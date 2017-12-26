const express = require('express');
const hbs =require('hbs');
  const fs =require('fs');
   const port=process.env.PORT ||3000;

var app = express();
 hbs.registerPartials(__dirname + '/views/footer');
 app.set('view engine','hbs');
 app.use(express.static(__dirname +'/public'));

 app.use((req,res,next)=>{
   var now = new Date().toString();
   var log=`${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n',((error)=>{
     console.log('unable to do so');
     next();
   }))

 });

app.use((req,res,next)=>{
  res.render('maintnance.hbs');
})

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});



/*app.get('/',(req,res)=>{
  //res.send('<h1>hello Express</h1>');
  res.send({
    name:'dhruv',
    likes:[
      'dont know',
      'show'
    ]
  });
});*/

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pagetitle:'about page',
  //  currentyear :new Date().getFullYear()
  });

});
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pagetitle:'bahuballi',
  //  currentyear: new Date().getFullYear()
  })
})
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'i donyt knew'
  })
})

app.listen(port, ()=>{
  console.log(`server started at${port}`);
} );
