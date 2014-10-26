cmake_minimum_required(VERSION 2.8)
project(wr)

set(sources
  wr/base.js
  wr/Hasher.js
  wr/utils.js
  wr/datetime.js
  wr/validate.js
  wr/events.js
  wr/dom.js
  wr/dom_utils.js
  wr/style.js
  wr/splines.js
  wr/animation.js
  wr/fx.js
  wr/Event.js
  wr/Logger.js
  wr/Value.js
  wr/Model.js
  wr/Collection.js
  wr/Entity.js
  wr/View.js
  wr/Widget.js
  wr/Container.js
  wr/DragDrop.js
  wr/net.js
  wr/Sync.js
  wr/World.js
  wr/RouterHelper.js
  wr/Router.js
  wr/App.js
  wr/AppLoader.js
)

set(ui_sources
  ui/base.js
  ui/Upload.js
  ui/Hint.js
  ui/Edit.js
  ui/Textarea.js
  ui/Image.js
  ui/Gallery.js
  ui/GalleryEdit.js
  ui/Slider.js
  ui/Combobox.js
  ui/Checkbox.js
  ui/Checklist.js
  ui/Radiolist.js
  ui/Calendar.js
  ui/Progressbar.js
  ui/Scrollbar.js
  ui/Map.js
  ui/Tabs.js
  ui/Submenu.js
  ui/Dialog.js
)

add_custom_target(${PROJECT_NAME} ALL DEPENDS ${sources}
  COMMAND cat ${sources} > ${PROJECT_BINARY_DIR}/${PROJECT_NAME}.js
  COMMAND cat ${ui_sources} > ${PROJECT_BINARY_DIR}/ui.js
  WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}
)
