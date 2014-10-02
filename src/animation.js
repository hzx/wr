
wr.requestAnimationFrame = (function() {
  var lastTime = 0;

  return wr.global.requestAnimationFrame ||
    wr.global.webkitRequestAnimationFrame ||
    wr.global.mozRequestAnimationFrame ||
    wr.global.oRequestAnimationFrame ||
    wr.global.msRequestAnimationFrame ||
    function(callback) {
      var currTime = (new Date()).getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = wr.global.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;

      // var id = wr.global.setTimeout(callback, 1000 / 10);
      // return id;
    };
})();


wr.cancelAnimationFrame = (function() {
  return wr.global.cancelAnimationFrame ||
    wr.global.webkitCancelAnimationFrame ||
    wr.global.webkitCancelRequestAnimationFrame ||
    wr.global.mozCancelAnimationFrame ||
    wr.global.oCancelAnimationFrame ||
    wr.global.msCancelAnimationFrame ||
    function(id) {
      wr.global.clearTimeout(id);
    };
})();


wr.isAnimate_ = false; // render loop flag
wr.animQueue_ = []; // task queue
wr.animHasher_ = new wr.Hasher();
wr.updateDt = 1000.0 / 60.0;


// process animQueue_
wr.render = function() {
  // render queue
  var i = 0;
  var task;
  var progress; // progress coefficient
  var last;
  while (i < wr.animQueue_.length) {
    task = wr.animQueue_[i];
    last = (new Date()).getTime();

    // calculate task progress
    progress = (last - task.begin) / task.time;

    // debug
    // wr.log(progress);

    // detect task ending
    if (progress > 1.0) {
      // remove task
      wr.animQueue_.splice(i, 1);
      // call update and end
      task.update(task.to);
      task.end();
      continue;
    } else {
      // skip if update too early
      // calculate current dt, and run if is greather
      if (last - task.last > task.dt) {
        task.last = last;
        task.update(task.easing(progress) * (task.to - task.from) + task.from);
      }
    }
    ++i;
  }

  wr.isAnimate_ = wr.animQueue_.length > 0;
  if (wr.isAnimate_) {
    wr.requestAnimationFrame.call(wr.global, wr.render);
  }
};


// linear interpolation
wr.easingLinear = function(progress) {
  return progress;
};


wr.easingSwing = function(progress) {
  return 0.5 - Math.cos( progress * Math.PI ) / 2;
}


wr.splineEase = new wr.KeySpline(0.25, 0.1, 0.25, 1.0);
wr.easingEase = function(progress) {
  return wr.splineEase.get(progress);
};


wr.splineEaseIn = new wr.KeySpline(0.42, 0.0, 1.00, 1.0);
wr.easingEaseIn = function(progress) {
  return wr.splineEaseIn.get(progress);
};


wr.splineEaseOut = new wr.KeySpline(0.00, 0.0, 0.58, 1.0);
wr.easingEaseOut = function(progress) {
  return wr.splineEaseOut.get(progress);
};


wr.splineEaseInOut = new wr.KeySpline(0.42, 0.0, 0.58, 1.0);
wr.easingEaseInOut = function(progress) {
  return wr.splineEaseInOut.get(progress);
};


wr.easingBounceIn = function(p) {
  var pow2;
  var bounce = 4;

  while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
  return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
};


wr.easingBounceOut = function(p) {
  return wr.easingBounceIn(1.0 - p);
};


// callback is update function with current value
// update return true for continue task, false for break
// calc - interpolation function, accept progress coefficient
wr.animate = function(update, end, time, dt, from, to, easing) {
  var begin = (new Date()).getTime();
  var task = {
    id: wr.animHasher_.generate(),
    update: update,
    end: end,
    time: time,
    dt: dt,
    from: from,
    to: to,
    easing: easing,
    begin: begin,
    last: begin // last render time
  };

  // add to queue animation task
  wr.animQueue_.push(task);

  wr.startAnimate();

  return task.id;
};


// remove animation task and add new backward animation
wr.unanimate = function(id, update, end) {
  var task = wr.removeAnimate(id);
  if (task === null) return;

  // calculate task progress
  progress = ((new Date()).getTime() - task.begin) / task.time;

  return wr.animate(update, end,
    task.time * progress, // time
    task.to * progress, // from
    task.from, // to
    task.easing);
};


// remove animation task
wr.removeAnimate = function(id) {
  var task = null;
  for (var i = 0; i < wr.animQueue_.length; ++i) {
    if (wr.animQueue_[i].id === id) {
      task = wr.animQueue_[i];
      wr.animQueue_.splice(i, 1);
      break;
    }
  }
  return task;
};


wr.startAnimate = function() {
  if (!wr.isAnimate_) {
    wr.isAnimate_ = true;
    wr.requestAnimationFrame.call(wr.global, wr.render);
  }
};


wr.pauseAnimate = function() {
  wr.isAnimate_ = false;
};
