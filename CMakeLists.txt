cmake_minimum_required(VERSION 2.8)
project(wr)

set(sources
  json3.js
  src/base.js
  src/Hasher.js
  src/utils.js
  src/datetime.js
  src/validate.js
  src/events.js
  src/dom.js
  src/dom_utils.js
  src/style.js
  src/splines.js
  src/animation.js
  src/fx.js
  src/Event.js
  src/Logger.js
  src/DragDrop.js
  src/net.js
  src/RouterHelper.js
  src/Router.js
  src/App.js
  src/AppLoader.js
)

set(ui_sources
  ui/base.js
  ui/Hint.js
  ui/Edit.js
  ui/Textarea.js
  ui/Image.js
  ui/Slider.js
  ui/Combobox.js
  ui/Checkbox.js
  ui/Checklist.js
  ui/Radiolist.js
)

add_custom_target(${PROJECT_NAME} ALL DEPENDS ${sources}
  COMMAND cat ${sources} > ${PROJECT_BINARY_DIR}/${PROJECT_NAME}.js
  COMMAND cat ${ui_sources} > ${PROJECT_BINARY_DIR}/ui.js
  WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}
)
