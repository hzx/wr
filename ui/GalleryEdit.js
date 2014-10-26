
ui.GalleryEdit = function() {
  wr.construct(ui.GalleryEdit, this);

  this.userClass = "";

  this.images = {};

  this.meAdd = wr.bind(this, this.onAdd);
};


wr.inherit(ui.GalleryEdit, wr.View);


ui.GalleryEdit.prototype.create = function() {
  this.thumbs = wr.DIV_c("ui_galleryedit_thumbs");
  this.buttonAdd = ui.create(ui.Upload, {userClass: "ui_galleryedit_buttonadd", multiple: true, userText: "Добавить"});

  this.node = wr.DIV_cc("ui_galleryedit", [
    this.thumbs,
    wr.DIV_cc("buttons", [
      this.buttonAdd.node
    ])
  ]);

  wr.addClass(this.node, this.userClass);
};


ui.GalleryEdit.prototype.enter = function() {
  ui.GalleryEdit.base.enter.call(this);

  this.buttonAdd.enter();
  this.buttonAdd.eventChange.listen(this.meAdd);

  for (var name in this.images) {
    this.images[name].enter();
  }

};


ui.GalleryEdit.prototype.exit = function() {
  ui.Gallery.base.exit.call(this);

  this.buttonAdd.exit();
  this.buttonAdd.eventChange.unlisten(this.meAdd);

  for (var name in this.images) {
    this.images[name].exit();
  }
};


ui.GalleryEdit.prototype.empty = function() {
  var child = this.thumbs.firstChild;
  var next;
  while (child) {
    next = child.nextSibling;
    wr.removeChild(this.thumbs, child);
    child = next;
  }
};


ui.GalleryEdit.prototype.add = function(url) {
  var image = ui.create(ui.Image, {userClass: "ui_galleryedit_thumb", src: url});
  this.images[url] = image;

  wr.appendChild(this.thumbs, image.node);

  if (this.isEnter) {
    image.enter();
  }
};


ui.GalleryEdit.prototype.onAdd = function(files) {
};
