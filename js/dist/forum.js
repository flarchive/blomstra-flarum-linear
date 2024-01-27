/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forum/components/SendToLinearModal.tsx":
/*!****************************************************!*\
  !*** ./src/forum/components/SendToLinearModal.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SendToLinearModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var SendToLinearModal = /*#__PURE__*/function (_Modal) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SendToLinearModal, _Modal);
  function SendToLinearModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.teams = [];
    _this.priorities = [];
    _this.defaultTeam = '';
    _this.ready = false;
    _this.selectedTeam = '';
    _this.selectedPriority = 0;
    _this.discussion = '';
    _this.tags = [];
    return _this;
  }
  var _proto = SendToLinearModal.prototype;
  _proto.getTags = function getTags() {
    var _this2 = this;
    var tags = this.discussion !== '' ? this.discussion.tags() : [];
    tags.map(function (tag) {
      _this2.tags.push(tag.data.id);
    });
  };
  _proto.loadData = function loadData() {
    var _this3 = this;
    this.discussion = this.attrs.discussion;
    this.getTags();
    m.request({
      method: "GET",
      url: "/api/linear/teams"
    }).then(function (response) {
      _this3.teams = response.data.attributes;
    });
    m.request({
      method: "GET",
      url: "/api/linear/priorities"
    }).then(function (response) {
      _this3.priorities = response.data.attributes;
    });
    this.selectedTeam = this.defaultTeam;
    this.selectedPriority = 0;
  };
  _proto.className = function className() {
    // Custom CSS classes to apply to the modal
    return 'custom-modal-class';
  };
  _proto.title = function title() {
    // Title of the modal.
    return 'Send to Linear';
  };
  _proto.content = function content() {
    var _this4 = this;
    if (this.teams.length > 0 && this.priorities.length > 0 && this.selectedTeam !== '') {
      return m('[', null, m("div", {
        "class": "Modal-body"
      }, m("div", {
        "class": "Form"
      }, m("div", {
        "class": "Form-group"
      }, m("label", null, "Team"), m("span", {
        "class": "Select"
      }, m("select", {
        value: this.selectedTeam,
        "class": "Select-input FormControl",
        onchange: function onchange(e) {
          _this4.selectedTeam = e.target.value;
        }
      }, this.teams.map(function (team) {
        return m("option", {
          value: team.id
        }, team.name);
      })))), m("div", {
        "class": "Form-group"
      }, m("label", null, "Priority"), m("span", {
        "class": "Select"
      }, m("select", {
        "class": "Select-input FormControl",
        value: this.selectedPriority,
        onchange: function onchange(e) {
          _this4.selectedPriority = e.target.value;
        }
      }, this.priorities.map(function (priority) {
        return m("option", {
          value: priority.priority
        }, priority.label);
      })))), m("div", {
        "class": "Form-group"
      }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
        className: "Button Button--primary",
        type: "submit"
      }, "Send to Linear")))));
    } else {
      return m("p", null, "Loading...");
    }
    // Content to show in the modal's body
  };
  _proto.onsubmit = function onsubmit(e) {
    e.preventDefault();
    // If your modal contains a form, you can add form processing logic here.

    m.request({
      method: "POST",
      url: "/api/linear/issues",
      headers: {
        'X-CSRF-Token': (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().session).csrfToken
      },
      body: {
        team: this.selectedTeam,
        priority: this.selectedPriority,
        tags: this.tags,
        discussion: this.discussion.id()
      }
    }).then(function (response) {
      console.log(response);
      if (response.data.id !== undefined || response.data.id !== null) {
        //this.discussion.attrs.linearIssueId = response.data.id;
        m.redraw();
        flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.close();
        location.reload();
      }
    });
  };
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.loadData();
    this.defaultTeam = flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('blomstraLinearDefaultTeamId');
    this.selectedTeam = this.defaultTeam;
  };
  return SendToLinearModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));
// True by default, dictates whether the modal can be dismissed by clicking on the background or in the top right corner.
SendToLinearModal.isDismissible = true;


/***/ }),

/***/ "./src/forum/index.tsx":
/*!*****************************!*\
  !*** ./src/forum/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/DiscussionPage */ "flarum/forum/components/DiscussionPage");
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_SendToLinearModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/SendToLinearModal */ "./src/forum/components/SendToLinearModal.tsx");






flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('blomstra/linear', function () {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'sidebarItems', function (items) {
    var discussion = this.discussion;
    var linear = discussion.attribute('linearIssueId');
    var lx = linear !== null ? linear.split(':::') : 'a:::b';
    var lOrg = lx[0];
    var lId = lx[1];
    console.log(lOrg);
    var canAddToLinear = discussion.attribute('canAddToLinear');
    if (!canAddToLinear) {
      return;
    }
    items.add('blomstra-linear', linear === null ? m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      icon: "fa fa-paper-plane",
      "class": "Button",
      onclick: function onclick() {
        return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().modal.show(_components_SendToLinearModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
          discussion: discussion
        });
      }
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.forum.controls.send_to_linear_button')) : m((flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default()), {
      icon: "fa fa-paper-plane",
      "class": "Button",
      href: "https://linear.app/" + lOrg + "/issue/" + lId,
      external: true,
      target: "_blank"
    }, "Open in Linear"), 100);
  });
});

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/DiscussionPage":
/*!************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/DiscussionPage']" ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/DiscussionPage'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.tsx");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map