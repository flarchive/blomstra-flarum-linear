/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/index.tsx":
/*!*****************************!*\
  !*** ./src/admin/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('blomstra-linear', function () {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('blomstra-linear').registerSetting({
    setting: 'blomstra-linear.token',
    type: 'password',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.token_label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.token_description')
  }).registerSetting({
    setting: 'blomstra-linear.cachettl',
    type: 'number',
    "default": 0,
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.cachettl_label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.cachettl_description')
  }).registerPermission({
    icon: 'fab fa-trello',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.permissions.add_to_linear'),
    permission: 'discussion.addToLinear'
  }, 'start');
  if ("blomstra-linear.token" in (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data.settings) && (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data).settings['blomstra-linear.token'] !== '') {
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('blomstra-linear').registerSetting(function () {
      return m("div", {
        className: "Form-group"
      }, m("h2", null, " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.teams_header'), " "));
    });
    // Make a request to the API to get the teams
    var teams = {
      "null": 'Select a team'
    };
    m.request({
      method: "GET",
      url: "/api/linear/teams"
    }).then(function (response) {
      response.data.attributes.map(function (team) {
        teams[team.id] = team.name;
      });
      if (Object.keys(teams).length > 1) {
        console.log(teams);
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('blomstra-linear').registerSetting({
          setting: 'blomstra-linear.default-team',
          type: 'select',
          label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.default_team_label'),
          help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-linear.admin.settings.default_team_description'),
          options: teams,
          "default": "blomstra-linear.default-team" in (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data.settings) && (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data).settings['blomstra-linear.default-team'] !== '' && (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data).settings['blomstra-linear.default-team'] !== null ? (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data).settings['blomstra-linear.default-team'] : null
        });
      }
    });
  }
});

/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

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
  !*** ./admin.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.tsx");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map