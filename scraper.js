const cheerio =require('cheerio'),
	  fetch=require('node-fetch'),
	  url="https://www.youtube.com/results?search_query=";
	  // var Table=require('cli-table');

	  // const table = new Table({
		 //    head: ['title', 'Links'],
		 //    colWidths: [100, 200]
			// });

function search(name){
	return fetch(`${url}${name}`)
	.then(res=>res.text())
	.then(body=>{
		const $=cheerio.load(body);
		var youtube=[];
		$('h3.yt-lockup-title').each((i,ele)=>{
			var ele=$(ele);
			var title=ele.find('a').attr('title');
			var link=ele.find('a').attr('href').replace('watch?v=','embed/');
			var clink=`http://www.youtube.com${link}`;
			var details={
				title,
				clink
			};
			youtube.push(details);
		});
		return youtube;
	});
}

// search('badshah');
module.exports={search};