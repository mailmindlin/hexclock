var base = 16;
var padding = 2;
var is24h = true;

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function updateTime() {
	var now = new Date();
	//get hours, minutes, and seconds as ints
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var body = document.body;
	
	var hadj = Math.round(h * 85/8), madj = Math.round(m * 17/4), sadj = Math.round(s * 17/4);
	var ht = pad(hadj.toString(16), 2);//255/24 = 85/8
	var mt = pad(madj.toString(16), 2);//255/60 = 17/4 
	var st = pad(sadj.toString(16), 2);
	var color = '#'+(ht+mt+st).toUpperCase();
	$('body').css('backgroundColor', color);
	$('#timecolor').html(color);
	
	$('#timetext>span#hours').html(pad(h.toString(base).toUpperCase(), padding));
	$('#timetext>span#minutes').html(pad(m.toString(base).toUpperCase(), padding));
	$('#timetext>span#seconds').html(pad(s.toString(base).toUpperCase(), padding));
	
	//fix bright/dark background
	if ((hadj + madj + sadj)/2 < 110)//if rgb is dark
		$('body').addClass('bright');
	if ((hadj + madj + sadj)/2 > 155)
		$('body').removeClass('bright');
	
	setTimeout(window.updateTime, 100);//call self again
}

function init() {
	$('body').on('swipe',function(e) {
		console.log(e);
	});
	updateTime();
}
init();