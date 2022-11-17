// mvパーティクル--------------------------------------
new FinisherHeader({
  "count": 9,
  "size": {
    "min": 480,
    "max": 795,
    "pulse": 0.5
  },
  "speed": {
    "x": {
      "min": 0.1,
      "max": 1.0
    },
    "y": {
      "min": 0.1,
      "max": 0.6
    }
  },
  "colors": {
    "background": "#1a1a1a",
    "particles": [
      "#2062a2",
      "#888888",
      "#888888"
    ]
  },
  "blending": "overlay",
  "opacity": {
    "center": 0.5,
    "edge": 0.05
  },
  "skew": 0,
  "shapes": [
    "c"
  ]
});

// マウスストーカー--------------------------------------

//カーソル要素
var cursor=$(".js-mouse-cursor");
//ストーカー要素
var stalker=$(".js-mouse-bg");

$(document).on("mousemove",function(e){
  var x=e.clientX;
  var y=e.clientY;
  cursor.css({
    "top":y+"px",
    "left":x+"px"
  });
  setTimeout(function(){
    stalker.css({
      "top":y+"px",
      "left":x+"px"
    });
  });
});

$("a").on('mouseenter', function () {
  cursor.addClass('is-active');
  stalker.addClass('is-active');
});

$("a").on('mouseleave', function () {
  cursor.removeClass('is-active');
  stalker.removeClass('is-active');
});