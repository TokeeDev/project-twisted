/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_Hero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ui/Hero */ \"(app-pages-browser)/./src/components/ui/Hero.tsx\");\n/* harmony import */ var _components_events_FeaturedEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/events/FeaturedEvent */ \"(app-pages-browser)/./src/components/events/FeaturedEvent.tsx\");\n/* harmony import */ var _components_events_FeaturedEvent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_events_FeaturedEvent__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_ui_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ui/Footer */ \"(app-pages-browser)/./src/components/ui/Footer.tsx\");\n/* harmony import */ var _components_ui_AgeVerification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui/AgeVerification */ \"(app-pages-browser)/./src/components/ui/AgeVerification.tsx\");\n/* harmony import */ var _components_menu_FeaturedMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/menu/FeaturedMenu */ \"(app-pages-browser)/./src/components/menu/FeaturedMenu.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [verifiedAge, setVerifiedAge] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const isVerified = localStorage.getItem(\"ageVerified\") === \"true\";\n        if (isVerified) {\n            setVerifiedAge(true);\n        }\n        setLoading(false);\n    }, []);\n    const handleVerifyAge = ()=>{\n        setVerifiedAge(true);\n        localStorage.setItem(\"ageVerified\", \"true\");\n    };\n    if (loading) return null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative min-h-screen bg-black text-white font-sans \".concat(!verifiedAge ? \"blur-md filter brightness-50\" : \"\"),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_Hero__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"/Users/christianaguilar/Downloads/project/src/app/page.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_components_events_FeaturedEvent__WEBPACK_IMPORTED_MODULE_3___default()), {}, void 0, false, {\n                        fileName: \"/Users/christianaguilar/Downloads/project/src/app/page.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_menu_FeaturedMenu__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                        fileName: \"/Users/christianaguilar/Downloads/project/src/app/page.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_Footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"/Users/christianaguilar/Downloads/project/src/app/page.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/christianaguilar/Downloads/project/src/app/page.tsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, this),\n            !verifiedAge && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_AgeVerification__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                onVerify: handleVerifyAge\n            }, void 0, false, {\n                fileName: \"/Users/christianaguilar/Downloads/project/src/app/page.tsx\",\n                lineNumber: 38,\n                columnNumber: 24\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Home, \"s9qXgOG3GCBgzIgZ+TGPjkLVw9E=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRTRDO0FBRUg7QUFDc0I7QUFDbEI7QUFDa0I7QUFDSjtBQUU1QyxTQUFTTzs7SUFDdEIsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdULCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ1UsU0FBU0MsV0FBVyxHQUFHWCwrQ0FBUUEsQ0FBQztJQUV2Q0MsZ0RBQVNBLENBQUM7UUFDUixNQUFNVyxhQUFhQyxhQUFhQyxPQUFPLENBQUMsbUJBQW1CO1FBQzNELElBQUlGLFlBQVk7WUFDZEgsZUFBZTtRQUNqQjtRQUNBRSxXQUFXO0lBQ2IsR0FBRyxFQUFFO0lBRUwsTUFBTUksa0JBQWtCO1FBQ3RCTixlQUFlO1FBQ2ZJLGFBQWFHLE9BQU8sQ0FBQyxlQUFlO0lBQ3RDO0lBRUEsSUFBSU4sU0FBUyxPQUFPO0lBRXBCLHFCQUNFOzswQkFDRSw4REFBQ087Z0JBQUlDLFdBQVcsdURBQTBHLE9BQW5ELENBQUNWLGNBQWMsaUNBQWlDOztrQ0FDckgsOERBQUNOLDJEQUFJQTs7Ozs7a0NBQ0wsOERBQUNDLHlFQUFhQTs7Ozs7a0NBQ2QsOERBQUNHLHFFQUFZQTs7Ozs7a0NBQ2IsOERBQUNGLDZEQUFNQTs7Ozs7Ozs7Ozs7WUFFUixDQUFDSSw2QkFBZSw4REFBQ0gsc0VBQWVBO2dCQUFDYyxVQUFVSjs7Ozs7Ozs7QUFHbEQ7R0E5QndCUjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3BhZ2UudHN4P2Y2OGEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgSGVybyBmcm9tICcuLi9jb21wb25lbnRzL3VpL0hlcm8nO1xuaW1wb3J0IEZlYXR1cmVkRXZlbnQgZnJvbSAnLi4vY29tcG9uZW50cy9ldmVudHMvRmVhdHVyZWRFdmVudCc7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvdWkvRm9vdGVyJztcbmltcG9ydCBBZ2VWZXJpZmljYXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy91aS9BZ2VWZXJpZmljYXRpb24nO1xuaW1wb3J0IEZlYXR1cmVkTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUvRmVhdHVyZWRNZW51JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW3ZlcmlmaWVkQWdlLCBzZXRWZXJpZmllZEFnZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaXNWZXJpZmllZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZ2VWZXJpZmllZCcpID09PSAndHJ1ZSc7XG4gICAgaWYgKGlzVmVyaWZpZWQpIHtcbiAgICAgIHNldFZlcmlmaWVkQWdlKHRydWUpO1xuICAgIH1cbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVZlcmlmeUFnZSA9ICgpID0+IHtcbiAgICBzZXRWZXJpZmllZEFnZSh0cnVlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWdlVmVyaWZpZWQnLCAndHJ1ZScpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YHJlbGF0aXZlIG1pbi1oLXNjcmVlbiBiZy1ibGFjayB0ZXh0LXdoaXRlIGZvbnQtc2FucyAkeyF2ZXJpZmllZEFnZSA/ICdibHVyLW1kIGZpbHRlciBicmlnaHRuZXNzLTUwJyA6ICcnfWB9PlxuICAgICAgICA8SGVybyAvPlxuICAgICAgICA8RmVhdHVyZWRFdmVudCAvPlxuICAgICAgICA8RmVhdHVyZWRNZW51Lz5cbiAgICAgICAgPEZvb3RlciAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7IXZlcmlmaWVkQWdlICYmIDxBZ2VWZXJpZmljYXRpb24gb25WZXJpZnk9e2hhbmRsZVZlcmlmeUFnZX0gLz59XG4gICAgPC8+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiSGVybyIsIkZlYXR1cmVkRXZlbnQiLCJGb290ZXIiLCJBZ2VWZXJpZmljYXRpb24iLCJGZWF0dXJlZE1lbnUiLCJIb21lIiwidmVyaWZpZWRBZ2UiLCJzZXRWZXJpZmllZEFnZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiaXNWZXJpZmllZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoYW5kbGVWZXJpZnlBZ2UiLCJzZXRJdGVtIiwiZGl2IiwiY2xhc3NOYW1lIiwib25WZXJpZnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/events/FeaturedEvent.tsx":
/*!*************************************************!*\
  !*** ./src/components/events/FeaturedEvent.tsx ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});