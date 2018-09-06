const express=require('express'),
	  app=express(),
	  open = require('open'),
	  hbs=require('hbs'),
	  path=require('path'),
	  scraper=require('./scraper.js'),
	  bodyParser=require('body-parser');

	  app.use(bodyParser());
	  app.set('view engine', 'hbs'),
	  app.set('views', path.join(__dirname, 'views'));	  
	  app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res,next)=>{
	res.render('find');
});

app.post('/search',(req,res,next)=>{
	var name=req.body.name;
	scraper
		.search(name)
		.then(youtube=>{
			res.render('result',{youtube});
		});
});
// open("www.youtube.com/watch?v=Gv_XBMrPvRw","vlc");
app.listen(3000,(err)=>{
	if(err)
		return err;
	else
		console.log('app started');
});