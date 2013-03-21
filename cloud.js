var width = 200;
var height = 100;
var angle = 10;
var start = 10;
var text = 30;

var NPS = "", A= "", B= "", C= "", D= "", DD= "";

function paint() {
	$("#holder").html("");

	r = Raphael("holder", 1000, 500), connections = [],

	shapes = [

	r.rect(1.75 * width, start, width, height, angle), // nps
	r.rect(1.75 * width, 180, width, height, angle), // b
	r.rect(3.5 * width, 180, width, height, angle), // d
	r.rect(1.75 * width, 380, width, height, angle), // c
	r.rect(3.5 * width, 380, width, height, angle), // d'
	r.rect(start, 280, width, height, angle), // a
	
	];
	
	colors = [
	  Raphael.getRGB('#FF3333'),
	  Raphael.getRGB('#FF9900'),
	  Raphael.getRGB('#FF9955'),
	  Raphael.getRGB('#FF9900'),
	  Raphael.getRGB('#FF9955'),
	  Raphael.getRGB('#FF6000'),
	]
	var color = Raphael.getRGB('#FF9933');
	for ( var i = 0, ii = shapes.length; i < ii; i++) {
		shapes[i].attr( {
			fill : colors[i],
			stroke : colors[i],
			"stroke-width" : 2
		});
	}

	var t = r.text(text + 1.75 * width, 1.5 * text + start, NPS).attr({"text-anchor":"start",fill: '#ffffff',"font-size": 14});
	var t = r.text(text + 1.75 * width, 1.5 * text + 180, B).attr({"text-anchor":"start",fill: '#ffffff',"font-size": 14});;
	var t = r.text(text + 3.5 * width, 1.5 * text + 180, D).attr({"text-anchor":"start",fill: '#ffffff',"font-size": 14});;
	var t = r.text(text + 1.75 * width, 1.5 * text + 380, C).attr({"text-anchor":"start",fill: '#ffffff',"font-size": 14});;
	var t = r.text(text + 3.5 * width, 1.5 * text + 380, DD).attr({"text-anchor":"start",fill: '#ffffff',"font-size": 14});;
	var t = r.text(text + start, 1.5 * text + 280, A).attr({"text-anchor":"start",fill: '#ffffff',"font-size": 14});;

	/* connections */
	connections.push(r.connection(shapes[0], shapes[1], "#f00", "#f00|3")); // NPS B
	connections.push(r.connection(shapes[1], shapes[2], "#808080 ")); // B D
	connections.push(r.connection(shapes[3], shapes[4], "#808080 ")); // C DD
	connections.push(r.connection(shapes[1], shapes[5], "#808080 ")); // B A
	connections.push(r.connection(shapes[3], shapes[5], "#808080 ")); // A C ...
	connections.push(r.connection(shapes[2], shapes[4], "#f00", "#f00|5")); // D DD
}

function process() {
	var a = prompt("What does bother me ?", "");
	if (a == null)
		return;
	NPS = a;
	paint();

	a = prompt("In what need does '" + NPS + "' bother me ?", "");
	if (a == null)
		return;
	B = a;
	paint();

	a = prompt("What should I do to attain the need '" + B +"' ?", "");
	if (a == null)
		return;
	D = a;
	paint();

	a = prompt("Which another need disturb me from making '" + D +"' ?", "");
	if (a == null)
		return;
	C = a;
	paint();

	a = prompt("What should I do to attain the need: " + C +"' ?", "");
	if (a == null)
		return;
	DD = a;
	paint();

	a = prompt("Why the both needs '" + B + "' and '" + C + "' are important for me ?", "");
	if (a == null)
		return;
	A = a;
	paint();
}

Raphael.fn.connection = function(obj1, obj2, line, bg) {
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	}
	var bb1 = obj1.getBBox(), bb2 = obj2.getBBox(), p = [ {
		x : bb1.x + bb1.width / 2,
		y : bb1.y - 1
	}, {
		x : bb1.x + bb1.width / 2,
		y : bb1.y + bb1.height + 1
	}, {
		x : bb1.x - 1,
		y : bb1.y + bb1.height / 2
	}, {
		x : bb1.x + bb1.width + 1,
		y : bb1.y + bb1.height / 2
	}, {
		x : bb2.x + bb2.width / 2,
		y : bb2.y - 1
	}, {
		x : bb2.x + bb2.width / 2,
		y : bb2.y + bb2.height + 1
	}, {
		x : bb2.x - 1,
		y : bb2.y + bb2.height / 2
	}, {
		x : bb2.x + bb2.width + 1,
		y : bb2.y + bb2.height / 2
	} ], d = {}, dis = [];
	for ( var i = 0; i < 4; i++) {
		for ( var j = 4; j < 8; j++) {
			var dx = Math.abs(p[i].x - p[j].x), dy = Math.abs(p[i].y - p[j].y);
			if ((i == j - 4)
					|| (((i != 3 && j != 6) || p[i].x < p[j].x)
							&& ((i != 2 && j != 7) || p[i].x > p[j].x)
							&& ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
				dis.push(dx + dy);
				d[dis[dis.length - 1]] = [ i, j ];
			}
		}
	}
	if (dis.length == 0) {
		var res = [ 0, 4 ];
	} else {
		res = d[Math.min.apply(Math, dis)];
	}
	var x1 = p[res[0]].x, y1 = p[res[0]].y, x4 = p[res[1]].x, y4 = p[res[1]].y;
	dx = Math.max(Math.abs(x1 - x4) / 2, 10);
	dy = Math.max(Math.abs(y1 - y4) / 2, 10);
	var x2 = [ x1, x1, x1 - dx, x1 + dx ][res[0]].toFixed(3), y2 = [ y1 - dy,
			y1 + dy, y1, y1 ][res[0]].toFixed(3), x3 = [ 0, 0, 0, 0, x4, x4,
			x4 - dx, x4 + dx ][res[1]].toFixed(3), y3 = [ 0, 0, 0, 0, y1 + dy,
			y1 - dy, y4, y4 ][res[1]].toFixed(3);
	var path = [ "M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3,
			x4.toFixed(3), y4.toFixed(3) ].join(",");
	if (line && line.line) {
		line.bg && line.bg.attr( {
			path : path
		});
		line.line.attr( {
			path : path
		});
	} else {
		var color = typeof line == "string" ? line : "#000";
		return {
			bg : bg && bg.split && this.path(path).attr( {
				stroke : bg.split("|")[0],
				fill : "none",
				"stroke-width" : bg.split("|")[1] || 5
			}),
			line : this.path(path).attr( {
				stroke : color,
				fill : "none"
			}),
			from : obj1,
			to : obj2
		};
	}
};

window.onload = function () {
  paint();
};