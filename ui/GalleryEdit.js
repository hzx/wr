
ui.GalleryEdit = function() {
  wr.construct(ui.GalleryEdit, this);

  this.userClass = "";

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
};


ui.GalleryEdit.prototype.exit = function() {
  ui.Gallery.base.exit.call(this);

  this.buttonAdd.exit();
  this.buttonAdd.eventChange.unlisten(this.meAdd);
};


ui.GalleryEdit.prototype.onAdd = function(files) {
};
