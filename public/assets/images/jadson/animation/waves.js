var select = function(s) {
  return document.querySelector(s)
}, selectAll = function (s) {
   return document.querySelectorAll(s)
}, wave1 = select('#wavez1'),
   wave2 = select('#wavez2'),
   wave3 = select('#wavez3'),
   wave4 = select('#wavez4'),
   waves = select('.waves'),
   wavesOdd = selectAll('#wavez1, #wavez3'),
   wavesEven = selectAll('#wavez2, #wavez4')

var bg = new TimelineMax({repeat:-1, repeatDelay:0});
var intro = new TimelineMax();

TweenMax.set(waves, { scale: 0 })

intro.to(waves, 2 , { scale: 1 , ease:Elastic.easeOut.config(1, 0.3) })

bg.to(wavesOdd, 2, {y:'10%', yoyo:true, repeat:-1})
  .to(wavesEven, 2, {y:'10%', yoyo:true, repeat:-1}, 0)
  .to(wavesOdd, 4, {x:-26, repeat:-1, ease: Power0.easeNone, repeatDelay:0}, 0)
  .to(wavesEven, 4, {x:+26, repeat:-1, ease: Power0.easeNone, repeatDelay:0}, 0)

function complete (argument) {
   console.log('a');
};

var mainTimeline = new TimelineMax();
mainTimeline.add(intro)
mainTimeline.add(bg,0)
