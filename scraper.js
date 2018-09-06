const cheerio =require('cheerio'),
	  fetch=require('node-fetch'),
	  url1="https://www.youtube.com/results?search_query=",
	  url2="https://www.youtube.com/feed/trending";
	  // var Table=require('cli-table');

	  // const table = new Table({
		 //    head: ['title', 'Links'],
		 //    colWidths: [100, 200]
			// });

function search(name){
	return fetch(`${url1}${name}`)
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
function trending(){
	return fetch(`${url2}`)
	.then(res=>res.text())
	.then(body=>{
		const $=cheerio.load(body);
		var trendingvideos=[];
		$('h3.yt-lockup-title').each((i,ele)=>{
			var ele=$(ele);
			var title=ele.find('a').attr('title');
			var link=ele.find('a').attr('href').replace('watch?v=','embed/');
			var clink=`http://www.youtube.com${link}`;
			var details={
				title,
				clink
			};
			trendingvideos.push(details);
		});
		return trendingvideos;
	});
}

// search('badshah');
module.exports={search,trending};