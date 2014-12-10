
ui.Map = function() {
  wr.construct(ui.Map, this);

  // for user, init before create
  this.userClass = "";
  this.lat = 0;
  this.lng = 0;
  this.zoom = 0;

  this.isMapCreated = false;
  this.icons = [];

  this.meLoad = wr.bind(this, this.onLoad);
};


wr.inherit(ui.Map, wr.View);


ui.Map.beginLoading = false;
ui.Map.apiLoaded = false;
ui.Map.eventLoad = new wr.Event();


ui.Map.load = function() {
  // not load twice
  if (ui.Map.apiLoaded || ui.Map.beginLoading) return;

  ui.Map.beginLoading = true;

  // add api load script
  wr.addJsUrl("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=ui.Map.onload");
};


ui.Map.onload = function() {
  ui.Map.beginLoading = false;
  ui.Map.apiLoaded = false;

  ui.Map.eventLoad.notify(null);
};


ui.Map.init = function() {
  ui.Map.beginLoading = false;
};


ui.Map.prototype.create = function() {
  this.node = wr.div_c("ui_map");

  wr.addClass(this.node, this.userClass);

  if (!ui.Map.apiLoaded || ui.Map.beginLoading) {
    ui.Map.eventLoad.listen(this.meLoad);

    if (!ui.Map.beginLoading) {
      ui.Map.load();
    }
  } else {
    this.createMap();
  }
};


ui.Map.prototype.createMap = function() {
  var options = {
    disableDefaultUI: true,
    panControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    },
    scrollwheel: false,
    zoom: this.zoom,
    center: new google.maps.LatLng(this.lat, this.lng)
  };

  this.gmap = new google.maps.Map(this.node, options);

  // add all icons
  var marker;
  var icon;
  for (var i = 0, length = this.icons.length; i < length; ++i) {
    icon = this.icons[i];

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(icon.lat, icon.lng),
      map: this.gmap,
      icon: icon.icon
    });
  }

  this.isMapCreated = true;
};


ui.Map.prototype.addIcon = function(lat, lng, icon) {
  this.icons.push({
    lat: lat,
    lng: lng,
    icon: icon
  });

  if (this.isMapCreated) {
    var gmarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.gmap,
      icon: icon
    });
  }
};


ui.Map.prototype.setCenter = function(lat, lng) {
};


ui.Map.prototype.enter = function() {
  ui.Map.base.enter.call(this);
};


ui.Map.prototype.onLoad = function() {
  this.createMap();
};


// ui.Map.prototype.setCenter = function(lat, lng, zoom) {
// };
