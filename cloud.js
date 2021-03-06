var angle = 10;
var NPS, A, B, C, D, DD;
var raphael;

var MAX = 18;
	
var width;
var height;

var start = 5;
var text = 30;
var fontSize;
var dyText = 60;
var dyFactorText = 100;

function resizePaper(){
  var win = $(this);
  WIDTH = win.width();
  HEIGHT = win.height();
  
  placeWidth = 0.75 * WIDTH;
  placeHeight = 0.8 * HEIGHT;
  
  width = placeWidth / 5;
  height = placeHeight / 5;
  fontSize = width / 13;

}

function splitMe(x)
{
    if(x.length < MAX){
        return x;
    }

    var tab = x.split(" ");
    var result = "";
    var line = 0;
    for (var i = 0; i < tab.length; i++) {
        if(line + tab[i].length < MAX){
            result = result + ' ' + tab[i];
            line = line + tab[i].length;
        }
        else{
            line = 0;
            result = result + '\n' + tab[i];
        }
    }
  
    return result;
}

var aNPS = splitMe("I have problems in solving conflicts"), aA= splitMe("Be known manager in my company"), aB= splitMe("Manage in the efficient way"), aC= splitMe("Fully understand the problem"), aD= splitMe("Take the fast decisions"), aDD= splitMe("Collect as much information as possible");

function makeText(){
    var text = "I want '" + A + "'." + " To '" + B +"' I must '" + D + "'.\n" + " But to '" + C + "' I must '" + DD + "'.\n" + " But it's impossible to make '" + D + "' and '" + DD + "'.";
    $('#history').attr( 'data-content', text );
}

function revert(){
    $("#ourTitle").html("Cloud example");
    NPS = aNPS, A= aA, B= aB, C= aC, D= aD, DD= aDD;
    makeText();
}

function paint() {
    $("#holder").html("");

    raphael = Raphael("holder", placeWidth, placeHeight);

    shapes = [
    raphael.rect(1.75 * width, start, width, height, angle), // nps
    raphael.rect(1.75 * width, dyFactorText + dyText, width, height, angle), // b
    raphael.rect(3.5 * width, dyFactorText + dyText, width, height, angle), // d
    raphael.rect(1.75 * width, 3 * dyFactorText + dyText, width, height, angle), // c
    raphael.rect(3.5 * width, 3 * dyFactorText + dyText, width, height, angle), // d'
    raphael.rect(start, 2 * dyFactorText + dyText, width, height, angle) // a
    ];
	
    colors = [
    Raphael.getRGB('#FF3333'),
    Raphael.getRGB('#FF9900'),
    Raphael.getRGB('#FF9955'),
    Raphael.getRGB('#FF9900'),
    Raphael.getRGB('#FF9955'),
    Raphael.getRGB('#FF6000'),
    ];
		
    for ( var i = 0, ii = shapes.length; i < ii; i++) {
        shapes[i].attr( {
            fill : colors[i],
            stroke : colors[i],
            "stroke-width" : 2
        });
    }

    var attrs = {
        "text-anchor":"start",
        fill: '#ffffff',
        "font-size": fontSize
    };

    /* connections */
    connections = [
    raphael.connectionWithArrow(shapes[4], shapes[2], "#f00"), // D DD
    raphael.connectionWithArrow(shapes[0], shapes[1], "#f00"), // NPS B

    raphael.connectionWithoutArrow(shapes[2], shapes[1], "#D0D0D0"), // B D
    raphael.connectionWithoutArrow(shapes[4], shapes[3], "#D0D0D0"), // C DD
    raphael.connectionWithoutArrow(shapes[1], shapes[5], "#D0D0D0"), // B A
    raphael.connectionWithoutArrow(shapes[3], shapes[5], "#D0D0D0") // A C ...
    ]
	
	raphael.text(text + 1.75 * width, 1.5 * text + start, NPS).attr(attrs);
    raphael.text(text + 1.75 * width, 1.5 * text + dyFactorText + dyText, B).attr(attrs);
    raphael.text(text + 3.5 * width, 1.5 * text + dyFactorText + dyText, D).attr(attrs);
    raphael.text(text + 1.75 * width, 1.5 * text + 3 * dyFactorText + dyText, C).attr(attrs);
    raphael.text(text + 3.5 * width, 1.5 * text + 3 * dyFactorText + dyText, DD).attr(attrs);
    raphael.text(text + start, 1.5 * text + 2* dyFactorText + dyText, A).attr(attrs);
}

function process() {
    var a = prompt("What does bother me ?", ""); 
    if (a == null){
        revert();
        paint();
        return;
    }
    NPS = splitMe(a);
    paint();

    a = prompt("In what need does '" + NPS + "' bother me ?", "");
    if (a == null){
        revert();
        paint();
        return;
    }
    B = a;
    paint();

    a = prompt("What should I do to attain the need '" + B +"' ?", "");
    if (a == null){
        revert();
        paint();
        return;
    }
    D = a;
    paint();

    a = prompt("Which another need disturb me from making '" + D +"' ?", "");
    if (a == null){
        revert();
        paint();
        return;
    }
    C = a;
    paint();

    a = prompt("What should I do to attain the need: " + C +"' ?", "");
    if (a == null){
        revert();
        paint();
        return;
    }
    DD = a;
    paint();

    a = prompt("Why the both needs '" + B + "' and '" + C + "' are important for me ?", "");
    if (a == null){
        revert();
        paint();
        return;
    }
    A = a;
    paint();
	
    makeText();
    $("#ourTitle").html("Your cloud");
}

Raphael.fn.connectionWithArrow = function(obj1, obj2, line, bg) {
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
			
            line : this.path(path).attr( {
                stroke : color,
                fill : "none",
                "stroke-width" : 3,
            }),
            bg : bg && bg.split && this.path(path).attr( {
                stroke : color,
                fill : "none"
            }),
            from : obj1,
            to : obj2
        };
    }
};

Raphael.fn.connectionWithoutArrow = function(obj1, obj2, line, bg) {
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
			
            line : this.path(path).attr( {
                stroke : color,
                fill : "none",
                "stroke-width" : 3,
                "arrow-end": "classic-wide-long"
            }),
            bg : bg && bg.split && this.path(path).attr( {
                stroke : color,
                fill : "none"
            }),
            from : obj1,
            to : obj2
        };
    }
};

$(window).resize(resizePaper); 

window.onload = function () {
	resizePaper();
    revert();
    paint();
};
