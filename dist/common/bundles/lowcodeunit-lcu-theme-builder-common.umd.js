(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/flex-layout'), require('@lcu/common'), require('ngx-color-picker'), require('tinycolor2'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@lowcodeunit/lcu-theme-builder-common', ['exports', '@angular/core', '@angular/forms', '@angular/flex-layout', '@lcu/common', 'ngx-color-picker', 'tinycolor2', 'rxjs', 'rxjs/operators', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.lowcodeunit = global.lowcodeunit || {}, global.lowcodeunit['lcu-theme-builder-common'] = {}), global.ng.core, global.ng.forms, global.ng.flexLayout, global.common, global.ngxColorPicker, global.tinycolor, global.rxjs, global.rxjs.operators, global.ng.common.http));
}(this, (function (exports, i0, forms, flexLayout, common, ngxColorPicker, tinycolor, rxjs, operators, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var tinycolor__namespace = /*#__PURE__*/_interopNamespace(tinycolor);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var tinyColor$5 = tinycolor__namespace;
    var UtilsService = /** @class */ (function () {
        function UtilsService() {
        }
        UtilsService.prototype.Multiply = function (rgb1, rgb2) {
            rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
            rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
            rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
            return tinyColor$5('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
        };
        return UtilsService;
    }());
    UtilsService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(); }, token: UtilsService, providedIn: "root" });
    UtilsService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var PaletteModel = /** @class */ (function () {
        function PaletteModel() {
        }
        return PaletteModel;
    }());

    var PalettePickerService = /** @class */ (function () {
        function PalettePickerService() {
            this.ColorPickerChanged = new rxjs.BehaviorSubject(new PaletteModel());
            this.ColorPickerClosed = new rxjs.Subject();
        }
        PalettePickerService.prototype.PalettePickerChange = function (params) {
            this.CurrentPalette = Object.assign({}, params);
            this.ColorPickerChanged.next(this.CurrentPalette);
        };
        /**
         * Event when color picker is closed, use this to kick off
         * the process of building color variants and everything else
         * Doing this prevents multiple processes that occur during
         * Form Control changes
         *
         * @param params Selected color from color picker
         */
        PalettePickerService.prototype.CloseColorPicker = function (params) {
            this.ColorPickerClosed.next(params);
        };
        return PalettePickerService;
    }());
    PalettePickerService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function PalettePickerService_Factory() { return new PalettePickerService(); }, token: PalettePickerService, providedIn: "root" });
    PalettePickerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    PalettePickerService.ctorParameters = function () { return []; };

    var tinyColor$4 = tinycolor__namespace;
    var VariantColorService = /** @class */ (function () {
        function VariantColorService(palettePickerService, utilsService) {
            this.palettePickerService = palettePickerService;
            this.utilsService = utilsService;
        }
        VariantColorService.prototype.UpdatePrimaryVariants = function (color) {
            var e_1, _a;
            this.palettePickerService.PrimaryColorPalette = this.computeColors(color);
            try {
                for (var _b = __values(this.palettePickerService.PrimaryColorPalette), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    var key = "--theme-primary-" + c.name;
                    var value = c.hex;
                    var key2 = "--theme-primary-contrast-" + c.name;
                    var value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
                    // set or update CSS variable values
                    document.documentElement.style.setProperty(key, value);
                    document.documentElement.style.setProperty(key2, value2);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        VariantColorService.prototype.UpdateAccentVariants = function (color) {
            var e_2, _a;
            this.palettePickerService.AccentColorPalette = this.computeColors(color);
            try {
                for (var _b = __values(this.palettePickerService.AccentColorPalette), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    var key = "--theme-accent-" + c.name;
                    var value = c.hex;
                    var key2 = "--theme-primary-contrast-" + c.name;
                    var value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
                    document.documentElement.style.setProperty(key, value);
                    document.documentElement.style.setProperty(key2, value2);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        VariantColorService.prototype.UpdateWarnVariants = function (color) {
            var e_3, _a;
            this.palettePickerService.WarnColorPalette = this.computeColors(color);
            try {
                for (var _b = __values(this.palettePickerService.WarnColorPalette), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    var key = "--theme-warn-" + c.name;
                    var value = c.hex;
                    var key2 = "--theme-primary-contrast-" + c.name;
                    var value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
                    document.documentElement.style.setProperty(key, value);
                    document.documentElement.style.setProperty(key2, value2);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        VariantColorService.prototype.computeColors = function (color) {
            var baseLightColor = tinyColor$4('#ffffff');
            var baseDarkColor = tinyColor$4('#222222');
            if (this.utilsService.Multiply) {
                baseDarkColor = this.utilsService.Multiply(tinyColor$4(color).toRgb(), tinyColor$4(color).toRgb());
            }
            var _a = __read(tinyColor$4(color).tetrad(), 4), baseTetrad = _a[3];
            return [
                this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 12), '50'),
                this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 30), '100'),
                this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 50), '200'),
                this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 70), '300'),
                this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 85), '400'),
                this.getColorObject(tinyColor$4(color), '500'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 87), '600'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 70), '700'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 54), '800'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 25), '900'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(65), 'A100'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(55), 'A200'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(45), 'A400'),
                this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(40), 'A700')
            ];
        };
        // force change
        VariantColorService.prototype.getColorObject = function (value, name) {
            var c = tinyColor$4(value);
            return {
                name: name,
                hex: c.toHexString(),
                darkContrast: c.isLight()
            };
        };
        return VariantColorService;
    }());
    VariantColorService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function VariantColorService_Factory() { return new VariantColorService(i0__namespace.ɵɵinject(PalettePickerService), i0__namespace.ɵɵinject(UtilsService)); }, token: VariantColorService, providedIn: "root" });
    VariantColorService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    VariantColorService.ctorParameters = function () { return [
        { type: PalettePickerService },
        { type: UtilsService }
    ]; };

    var LocalStorageService = /** @class */ (function () {
        function LocalStorageService() {
        }
        LocalStorageService.prototype.ClearColorMapStorage = function () {
            localStorage.clear();
        };
        LocalStorageService.prototype.GetColorMapStorage = function (name) {
            // return this.colorPalette;
            var arr = JSON.parse(localStorage.getItem(name));
            return localStorage.getItem(name);
        };
        LocalStorageService.prototype.SetColorMapStorage = function (colorMap) {
            // if ColorMaps already exists
            if (localStorage.getItem('ColorMaps')) {
                // return storage, then parse saved string
                this.storageArray = JSON.parse(localStorage.getItem('ColorMaps'));
            }
            else {
                this.storageArray = [];
            }
            // update storage array
            this.storageArray.push(colorMap);
            this.updateColorMapStorage();
        };
        LocalStorageService.prototype.updateColorMapStorage = function () {
            localStorage.setItem('ColorMaps', JSON.stringify(this.storageArray));
        };
        return LocalStorageService;
    }());
    LocalStorageService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
    LocalStorageService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    LocalStorageService.ctorParameters = function () { return []; };

    // @dynamic
    /**
     * @dynamic need this because there are static members
     */
    var ThemeBuilderConstants = /** @class */ (function () {
        function ThemeBuilderConstants() {
        }
        return ThemeBuilderConstants;
    }());
    ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY = {
        50: [true, 12],
        100: [true, 30],
        200: [true, 50],
        300: [true, 70],
        400: [true, 85],
        500: [true, 100],
        600: [false, 87],
        700: [false, 70],
        800: [false, 54],
        900: [false, 25]
    };
    ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY = {
        A100: [15, 80, 65],
        A200: [15, 80, 55],
        A400: [15, 100, 45],
        A700: [15, 100, 40]
    };
    ThemeBuilderConstants.document = window.getComputedStyle(document.documentElement);
    ThemeBuilderConstants.InitialValues = {
        primary: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-primary'), lighter: null, darker: null },
        accent: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-accent'), lighter: null, darker: null },
        warn: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-warn'), lighter: null, darker: null },
        lightText: ThemeBuilderConstants.document.getPropertyValue('--initial-light-text'),
        lightBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-light-background'),
        darkText: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-text'),
        darkBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-background')
    };

    var tinyColor$3 = tinycolor__namespace;
    var PaletteTemplateService = /** @class */ (function () {
        function PaletteTemplateService() {
        }
        /**
         * Return template for scss
         *
         * @param theme current theme
         */
        PaletteTemplateService.prototype.GetTemplate = function (theme) {
            var _this = this;
            var template = "\n      @import '~@angular/material/theming';\n      // Include the common styles for Angular Material. We include this here so that you only\n      // have to load a single css file for Angular Material in your app.\n\n      // Foreground Elements\n\n      // Light Theme Text\n      $dark-text: " + theme.palette.lightText + ";\n      $dark-primary-text: rgba($dark-text, 0.87);\n      $dark-accent-text: rgba($dark-primary-text, 0.54);\n      $dark-disabled-text: rgba($dark-primary-text, 0.38);\n      $dark-dividers: rgba($dark-primary-text, 0.12);\n      $dark-focused: rgba($dark-primary-text, 0.12);\n\n      $mat-light-theme-foreground: (\n        base:              black,\n        divider:           $dark-dividers,\n        dividers:          $dark-dividers,\n        disabled:          $dark-disabled-text,\n        disabled-button:   rgba($dark-text, 0.26),\n        disabled-text:     $dark-disabled-text,\n        elevation:         black,\n        secondary-text:    $dark-accent-text,\n        hint-text:         $dark-disabled-text,\n        accent-text:       $dark-accent-text,\n        icon:              $dark-accent-text,\n        icons:             $dark-accent-text,\n        text:              $dark-primary-text,\n        slider-min:        $dark-primary-text,\n        slider-off:        rgba($dark-text, 0.26),\n        slider-off-active: $dark-disabled-text,\n      );\n\n      // Dark Theme text\n      $light-text: " + theme.palette.darkText + ";\n      $light-primary-text: $light-text;\n      $light-accent-text: rgba($light-primary-text, 0.7);\n      $light-disabled-text: rgba($light-primary-text, 0.5);\n      $light-dividers: rgba($light-primary-text, 0.12);\n      $light-focused: rgba($light-primary-text, 0.12);\n\n      $mat-dark-theme-foreground: (\n        base:              $light-text,\n        divider:           $light-dividers,\n        dividers:          $light-dividers,\n        disabled:          $light-disabled-text,\n        disabled-button:   rgba($light-text, 0.3),\n        disabled-text:     $light-disabled-text,\n        elevation:         black,\n        hint-text:         $light-disabled-text,\n        secondary-text:    $light-accent-text,\n        accent-text:       $light-accent-text,\n        icon:              $light-text,\n        icons:             $light-text,\n        text:              $light-text,\n        slider-min:        $light-text,\n        slider-off:        rgba($light-text, 0.3),\n        slider-off-active: rgba($light-text, 0.3),\n      );\n\n      // Background config\n      // Light bg\n      $light-background:    " + theme.palette.lightBackground + ";\n      $light-bg-darker-5:   darken($light-background, 5%);\n      $light-bg-darker-10:  darken($light-background, 10%);\n      $light-bg-darker-20:  darken($light-background, 20%);\n      $light-bg-darker-30:  darken($light-background, 30%);\n      $light-bg-lighter-5:  lighten($light-background, 5%);\n      $dark-bg-alpha-4:     rgba(" + theme.palette.darkBackground + ", 0.04);\n      $dark-bg-alpha-12:    rgba(" + theme.palette.darkBackground + ", 0.12);\n\n      $mat-light-theme-background: (\n        background:               $light-background,\n        status-bar:               $light-bg-darker-20,\n        app-bar:                  $light-bg-darker-5,\n        hover:                    $dark-bg-alpha-4,\n        card:                     $light-bg-lighter-5,\n        dialog:                   $light-bg-lighter-5,\n        disabled-button:          $dark-bg-alpha-12,\n        raised-button:            $light-bg-lighter-5,\n        focused-button:           $dark-focused,\n        selected-button:          $light-bg-darker-20,\n        selected-disabled-button: $light-bg-darker-30,\n        disabled-button-toggle:   $light-bg-darker-10,\n        unselected-chip:          $light-bg-darker-10,\n        disabled-list-option:     $light-bg-darker-10,\n      );\n\n      // Dark bg\n      $dark-background:     " + theme.palette.darkBackground + ";\n      $dark-bg-lighter-5:   lighten($dark-background, 5%);\n      $dark-bg-lighter-10:  lighten($dark-background, 10%);\n      $dark-bg-lighter-20:  lighten($dark-background, 20%);\n      $dark-bg-lighter-30:  lighten($dark-background, 30%);\n      $light-bg-alpha-4:    rgba(" + theme.palette.lightBackground + ", 0.04);\n      $light-bg-alpha-12:   rgba(" + theme.palette.lightBackground + ", 0.12);\n\n      // Background palette for dark themes.\n      $mat-dark-theme-background: (\n        background:               $dark-background,\n        status-bar:               $dark-bg-lighter-20,\n        app-bar:                  $dark-bg-lighter-5,\n        hover:                    $light-bg-alpha-4,\n        card:                     $dark-bg-lighter-5,\n        dialog:                   $dark-bg-lighter-5,\n        disabled-button:          $light-bg-alpha-12,\n        raised-button:            $dark-bg-lighter-5,\n        focused-button:           $light-focused,\n        selected-button:          $dark-bg-lighter-20,\n        selected-disabled-button: $dark-bg-lighter-30,\n        disabled-button-toggle:   $dark-bg-lighter-10,\n        unselected-chip:          $dark-bg-lighter-20,\n        disabled-list-option:     $dark-bg-lighter-10,\n      );\n\n      // Theme Config\n      " + ['primary', 'accent', 'warn'].map(function (x) { return _this.getScssPalette(x, theme.palette[x]); }).join('\n') + ";\n\n      $theme: " + (!theme.lightness ? 'mat-dark-theme' : 'mat-light-theme') + "($theme-primary, $theme-accent, $theme-warn);\n      $altTheme: " + (!theme.lightness ? 'mat-light-theme' : 'mat-dark-theme') + "($theme-primary, $theme-accent, $theme-warn);\n\n      // Theme Init\n      @include angular-material-theme($theme);\n\n      .theme-alternate {\n        @include angular-material-theme($altTheme);\n      }\n\n      \n\n\n      // Specific component overrides, pieces that are not in line with the general theming\n\n      // Handle buttons appropriately, with respect to line-height\n      .mat-raised-button, .mat-stroked-button, .mat-flat-button {\n        padding: 0 1.15em;\n        margin: 0 .65em;\n        min-width: 3em;\n      }\n\n      .mat-standard-chip {\n        padding: .5em .85em;\n        min-height: 2.5em;\n      }\n      ";
            return template;
        };
        /**
         * Get the Scss Palatte
         *
         * @param name palette name
         *
         * @param subPalette SubPaletteModel
         */
        PaletteTemplateService.prototype.getScssPalette = function (name, subPalette) {
            return "\n      body {\n        --" + name + "-color: " + subPalette.main + ";\n        --" + name + "-lighter-color: " + subPalette.lighter + ";\n        --" + name + "-darker-color: " + subPalette.darker + ";\n        --text-" + name + "-color: #{" + this.getTextColor(subPalette.main) + "};\n        --text-" + name + "-lighter-color: #{" + this.getTextColor(subPalette.lighter) + "};\n        --text-" + name + "-darker-color: #{" + this.getTextColor(subPalette.darker) + "};\n      }\n\n    $mat-" + name + ": (\n      main: " + subPalette.main + ",\n      lighter: " + subPalette.lighter + ",\n      darker: " + subPalette.darker + ",\n      200: " + subPalette.main + ", // For slide toggle,\n      contrast : (\n        main: " + this.getTextColor(subPalette.main) + ",\n        lighter: " + this.getTextColor(subPalette.lighter) + ",\n        darker: " + this.getTextColor(subPalette.darker) + ",\n      )\n    );\n    $theme-" + name + ": mat-palette($mat-" + name + ", main, lighter, darker);";
        };
        /**
         * Get text color
         *
         * @param col color
         */
        PaletteTemplateService.prototype.getTextColor = function (col) {
            return "$" + (tinyColor$3(col).isLight() ? 'dark' : 'light') + "-primary-text";
        };
        return PaletteTemplateService;
    }());
    PaletteTemplateService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function PaletteTemplateService_Factory() { return new PaletteTemplateService(); }, token: PaletteTemplateService, providedIn: "root" });
    PaletteTemplateService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var tinyColor$2 = tinycolor__namespace;
    var fallbackURL = 'https://www.iot-ensemble.com/assets/theming/theming.scss';
    var ThemeBuilderService = /** @class */ (function () {
        function ThemeBuilderService(http, paletteTemplateService, localStorageService, palettePickerService, zone, utilsService, variantColorService) {
            this.http = http;
            this.paletteTemplateService = paletteTemplateService;
            this.localStorageService = localStorageService;
            this.palettePickerService = palettePickerService;
            this.zone = zone;
            this.utilsService = utilsService;
            this.variantColorService = variantColorService;
            this.MaterialTheme = 'https://www.iot-ensemble.com/assets/theming/theming.scss';
            this.themeMode = true;
            this.Theme = new rxjs.Subject();
            this.PaletteColors = new rxjs.Subject();
            // this.ThemeScss = this.loadThemingScss();
            this.PaletteList = [];
        }
        Object.defineProperty(ThemeBuilderService.prototype, "MaterialTheme", {
            get: function () {
                return this._materialTheme;
            },
            set: function (val) {
                this._materialTheme = val;
                this.ThemeScss = this.loadThemingScss();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeBuilderService.prototype, "Palette", {
            get: function () {
                return this.palette;
            },
            /**
             * Set Palette colors
             */
            set: function (palette) {
                this.palette = palette;
                this.palettePickerService.PalettePickerChange(palette);
                this.UpdateTheme(this.getTheme());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemeBuilderService.prototype, "ThemeMode", {
            get: function () {
                return this.themeMode;
            },
            set: function (light) {
                this.themeMode = !light;
                this.UpdateTheme(this.getTheme());
            },
            enumerable: false,
            configurable: true
        });
        /**
         * load intial theme
         *
         * Pulls _theming.scss from Angular Material and then overwrites it with
         * our theme color changes
         */
        ThemeBuilderService.prototype.loadThemingScss = function () {
            // return this.http.get('https://www.iot-ensemble.com/assets/theming/theming.scss', { responseType: 'text' })
            return this.http.get(this.MaterialTheme, { responseType: 'text' })
                .pipe(operators.map(function (x) {
                return x
                    .replace(/\n/gm, '??')
                    .replace(/\$mat-([^:?]+)\s*:\s*\([? ]*50:[^()]*contrast\s*:\s*\([^)]+\)[ ?]*\);\s*?/g, function (all, name) { return name === 'grey' ? all : ''; })
                    .replace(/\/\*.*?\*\//g, '')
                    .split(/[?][?]/g)
                    .map(function (l) { return l
                    .replace(/^\s*(\/\/.*)?$/g, '')
                    .replace(/^\$mat-blue-gray\s*:\s*\$mat-blue-grey\s*;\s*/g, '')
                    .replace(/^\s*|\s*$/g, '')
                    .replace(/:\s\s+/g, ': '); })
                    .filter(function (l) { return !!l; })
                    .join('\n');
            }), operators.map(function (txt) {
                // writeFile allows this file to be accessed from styles.scss
                return Sass.writeFile('~@angular/material/theming', txt, function (result) {
                    // console.log('Sass.writeFile', result);
                });
            })).toPromise();
        };
        /**
         * Get theme template and update it
         *
         * @param theme current theme
         */
        ThemeBuilderService.prototype.GetTemplate = function (theme) {
            return this.paletteTemplateService.GetTemplate(theme);
        };
        /**
         * Compile SASS to CSS
         *
         * @param theme SASS stylesheet
         * @returns compiled CSS
         */
        ThemeBuilderService.prototype.CompileScssTheme = function (theme) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ThemeScss];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, new Promise(function (res, rej) {
                                    Sass.compile(theme.replace('@include angular-material-theme($altTheme);', ''), function (v) {
                                        if (v.status === 0) {
                                            res(v.text);
                                        }
                                        else {
                                            rej(v);
                                        }
                                    });
                                })];
                    }
                });
            });
        };
        /**
         * Return primary and accent colors for each color map, from colors 50 - A700
         *
         * @param color color
         */
        ThemeBuilderService.prototype.GetPalette = function (color) {
            var baseLight = tinyColor$2('#ffffff');
            var baseDark = this.utilsService.Multiply(tinyColor$2(color).toRgb(), tinyColor$2(color).toRgb());
            var _a = __read(tinyColor$2(color).tetrad(), 4), baseTriad = _a[3];
            var primary = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY)
                .map(function (k) {
                var _a = __read(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY[k], 2), light = _a[0], amount = _a[1];
                return [k, tinyColor$2.mix(light ? baseLight : baseDark, tinyColor$2(color), amount)];
            });
            var accent = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)
                .map(function (k) {
                var _a = __read(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY[k], 3), amount = _a[0], sat = _a[1], light = _a[2];
                return [k, tinyColor$2.mix(baseDark, baseTriad, amount)
                        .saturate(sat).lighten(light)];
            });
            return __spreadArray(__spreadArray([], __read(primary)), __read(accent)).reduce(function (acc, _a) {
                var _b = __read(_a, 2), k = _b[0], c = _b[1];
                acc[k] = c.toHexString();
                return acc;
            }, {});
        };
        /**
         * emit event with theme
         */
        ThemeBuilderService.prototype.emit = function () {
            this.Theme.next(this.getTheme());
        };
        /**
         * Return a new theme model
         */
        ThemeBuilderService.prototype.getTheme = function () {
            return {
                palette: this.Palette,
                lightness: this.ThemeMode,
            };
        };
        ThemeBuilderService.prototype.UpdateTheme = function (theme) {
            var _this = this;
            // SASS stylesheet
            var source = this.GetTemplate(theme);
            // Running functions outside of Angular's zone and do work that
            // doesn't trigger Angular change-detection.
            this.zone.runOutsideAngular(function () {
                _this.CompileScssTheme(source).then(function (text) {
                    // SASS compiled to CSS
                    var compiledDynamicCSS = text;
                    var dynamicStyleSheet = document.getElementById('theme-builder-stylesheet');
                    // check if dynamic stylesheet exists, then remove it
                    if (dynamicStyleSheet) {
                        document.getElementsByTagName('body')[0].removeChild(dynamicStyleSheet);
                    }
                    // add dynamic stylesheet
                    var style = document.createElement('style');
                    style.id = 'theme-builder-stylesheet';
                    style.appendChild(document.createTextNode(compiledDynamicCSS));
                    document.getElementsByTagName('body')[0].appendChild(style);
                }).catch(function (err) {
                    console.error(err);
                });
            });
        };
        ThemeBuilderService.prototype.SetThemes = function (themes) {
            this.Themes = themes;
            var initial = new PaletteModel();
            initial = Object.assign(Object.assign({}, ThemeBuilderConstants.InitialValues), initial);
            initial.primary.main = this.Themes[0].Primary;
            initial.accent.main = this.Themes[0].Accent;
            initial.warn.main = this.Themes[0].Warn;
            this.Palette = initial;
            this.variantColorService.UpdatePrimaryVariants(this.Themes[0].Primary);
            this.variantColorService.UpdateAccentVariants(this.Themes[0].Accent);
            this.variantColorService.UpdateWarnVariants(this.Themes[0].Warn);
        };
        return ThemeBuilderService;
    }());
    ThemeBuilderService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ThemeBuilderService_Factory() { return new ThemeBuilderService(i0__namespace.ɵɵinject(i1__namespace.HttpClient), i0__namespace.ɵɵinject(PaletteTemplateService), i0__namespace.ɵɵinject(LocalStorageService), i0__namespace.ɵɵinject(PalettePickerService), i0__namespace.ɵɵinject(i0__namespace.NgZone), i0__namespace.ɵɵinject(UtilsService), i0__namespace.ɵɵinject(VariantColorService)); }, token: ThemeBuilderService, providedIn: "root" });
    ThemeBuilderService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ThemeBuilderService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: PaletteTemplateService },
        { type: LocalStorageService },
        { type: PalettePickerService },
        { type: i0.NgZone },
        { type: UtilsService },
        { type: VariantColorService }
    ]; };

    var ThemeBuilderComponent = /** @class */ (function () {
        function ThemeBuilderComponent() {
        }
        ThemeBuilderComponent.prototype.ngOnInit = function () {
        };
        return ThemeBuilderComponent;
    }());
    ThemeBuilderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-theme-builder',
                    template: "\r\n<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <!-- <lcu-mode-toggle></lcu-mode-toggle> -->\r\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-toolbar color=\"primary\">\r\n        <span class=\"primary-color\">Primary Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"accent\">\r\n        <span class=\"accent-color\">Accent Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"warn\">\r\n        <span class=\"warn-color\">Warn Colors</span>\r\n      </mat-toolbar>\r\n  </div>\r\n  <!-- <lcu-palette-picker></lcu-palette-picker> -->\r\n</div>\r\n",
                    styles: [".primary-color{color:var(--theme-primary-A700)}.accent-color{color:var(--theme-accent-A700)}.warn-color{color:var(--theme-warn-A700)}"]
                },] }
    ];
    ThemeBuilderComponent.ctorParameters = function () { return []; };

    var ThemeBuilderDirective = /** @class */ (function () {
        function ThemeBuilderDirective(elRef, renderer, themeService) {
            this.elRef = elRef;
            this.renderer = renderer;
            this.themeService = themeService;
        }
        ThemeBuilderDirective.prototype.onMouseEnter = function () {
            this.hoverEffect(this.getThemeColor(), 'underline');
        };
        ThemeBuilderDirective.prototype.onMouseLeave = function () {
            this.hoverEffect('', 'initial');
        };
        ThemeBuilderDirective.prototype.ngOnInit = function () {
            this.currentColor = this.getThemeColor();
        };
        ThemeBuilderDirective.prototype.getThemeColor = function () {
            var theme = this.themeService.GetColorClass().value;
            return 'color-swatch-' + theme.substring(theme.indexOf('-') + 1, theme.lastIndexOf('-'));
        };
        ThemeBuilderDirective.prototype.hoverEffect = function (color, decoration) {
            var title = this.elRef.nativeElement.querySelector('.mat-card-title');
            this.renderer.setStyle(title, 'text-decoration', decoration);
            if (!color && this.currentColor) {
                this.renderer.removeClass(title, this.currentColor);
            }
            else if (color !== this.currentColor) {
                this.renderer.removeClass(title, this.currentColor);
            }
            if (color) {
                this.renderer.addClass(title, color);
                this.currentColor = color;
            }
        };
        return ThemeBuilderDirective;
    }());
    ThemeBuilderDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[theme-builder]'
                },] }
    ];
    ThemeBuilderDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: common.ThemeColorPickerService }
    ]; };
    ThemeBuilderDirective.propDecorators = {
        onMouseEnter: [{ type: i0.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: i0.HostListener, args: ['mouseleave',] }]
    };

    // import * as EventEmitter from 'events';
    var tinyColor$1 = tinycolor__namespace;
    var ColorPickerComponent = /** @class */ (function () {
        function ColorPickerComponent(palettePickerService) {
            this.palettePickerService = palettePickerService;
            this.ShowBackdrop = false;
        }
        Object.defineProperty(ColorPickerComponent.prototype, "Color", {
            /**
             * Get the selected color
             *
             */
            get: function () {
                return this.Control.value;
            },
            /**
             * Set the selected color
             */
            set: function (col) {
                this.Control.setValue(col);
            },
            enumerable: false,
            configurable: true
        });
        ColorPickerComponent.prototype.ngOnInit = function () {
        };
        /**
         * Turn backdrop on
         *
         * @param on toggle
         */
        ColorPickerComponent.prototype.SetBackdrop = function (on) {
            this.ShowBackdrop = on;
        };
        /**
         * Set font color to contrast background color of display
         *
         * @param col color
         */
        ColorPickerComponent.prototype.GetTextColor = function (col) {
            return tinyColor$1(col).isLight() ? '#000' : '#fff';
        };
        ColorPickerComponent.prototype.ColorPickerClosed = function (evt) {
            this.palettePickerService.CloseColorPicker(evt);
        };
        ColorPickerComponent.prototype.ColorPickerChange = function (evt) {
            this.Color = evt;
        };
        return ColorPickerComponent;
    }());
    ColorPickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-color-picker',
                    template: "<div class=\"backdrop\" *ngIf=\"ShowBackdrop\"></div>\r\n\r\n<input \r\n  type=\"text\" \r\n  [disabled]=\"Disabled\" \r\n  [colorPicker]=\"Color\" \r\n  (colorPickerOpen)=\"SetBackdrop(true)\"\r\n  [cpPresetColors]=\"Variants\" \r\n  [cpPosition]=\"'bottom-left'\"\r\n  (colorPickerClose)=\"SetBackdrop(false); ColorPickerClosed($event)\" \r\n  [cpOutputFormat]=\"'hex'\"\r\n  [cpAlphaChannel]=\"'disabled'\" \r\n  (colorPickerChange)=\"ColorPickerChange($event)\" \r\n  [value]=\"Color\"\r\n  [style.background]=\"Color\" \r\n  [style.color]=\"GetTextColor(Color)\"\r\n>\r\n",
                    styles: [".backdrop{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}:host,input{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input{text-align:center;cursor:pointer}:host{display:block}"]
                },] }
    ];
    ColorPickerComponent.ctorParameters = function () { return [
        { type: PalettePickerService }
    ]; };
    ColorPickerComponent.propDecorators = {
        Control: [{ type: i0.Input, args: ['control',] }],
        Disabled: [{ type: i0.Input, args: ['disabled',] }],
        Variants: [{ type: i0.Input, args: ['variants',] }],
        Color: [{ type: i0.Input, args: ['color',] }]
    };

    var PalettePickerComponent = /** @class */ (function () {
        function PalettePickerComponent(themeBuilderService, palettePickerService) {
            var _this = this;
            this.themeBuilderService = themeBuilderService;
            this.palettePickerService = palettePickerService;
            this.setupForm();
            this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
                .subscribe(function (val) {
                _this.updatePalette();
            });
            // Update base colors of the color picker on change
            // when manually setting colors, not using
            // the color picker itself
            this.palettePickerService.ColorPickerChanged
                .subscribe(function (val) {
                _this.PrimaryColor = val.primary.main;
                _this.AccentColor = val.accent.main;
                _this.WarnColor = val.warn.main;
                // this.Primary.setValue(val.primary.main);
                // this.Accent.setValue(val.accent.main);
                // this.Warn.setValue(val.warn.main);
            });
        }
        Object.defineProperty(PalettePickerComponent.prototype, "Primary", {
            /**
             * Access Primary form group
             */
            get: function () {
                return this.Form.get('primary');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PalettePickerComponent.prototype, "Accent", {
            /**
             * Access Accent form group
             */
            get: function () {
                return this.Form.get('accent');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PalettePickerComponent.prototype, "Warn", {
            /**
             * Access Warn form group
             */
            get: function () {
                return this.Form.get('warn');
            },
            enumerable: false,
            configurable: true
        });
        PalettePickerComponent.prototype.updatePalette = function () {
            var palette = new PaletteModel();
            palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
            palette.primary.main = this.Primary.value.main;
            palette.accent.main = this.Accent.value.main;
            palette.warn.main = this.Warn.value.main;
            this.themeBuilderService.Palette = palette;
        };
        PalettePickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            // setting initial values,
            // this isn't the right way to do this, but for the moment - shannon
            this.patchValue(ThemeBuilderConstants.InitialValues, true);
            this.Form.valueChanges
                .pipe(operators.distinctUntilChanged(function (a, b) {
                //  console.log('A', a);
                //  console.log('B', b);
                return JSON.stringify(a) !== JSON.stringify(b);
            }))
                .subscribe(function (palette) {
                _this.themeBuilderService.Palette = palette;
            });
        };
        PalettePickerComponent.prototype.ngOnDestroy = function () {
            this.formSubscription.unsubscribe();
            this.colorPickerClosedSubscription.unsubscribe();
        };
        PalettePickerComponent.prototype.patchValue = function (val, emitValue) {
            this.Form.patchValue(val, { emitEvent: emitValue });
        };
        /**
         * Setup the form
         */
        PalettePickerComponent.prototype.setupForm = function () {
            this.Form = new forms.FormGroup({
                primary: new forms.FormGroup({
                    main: new forms.FormControl(''),
                    lighter: new forms.FormControl(''),
                    darker: new forms.FormControl('')
                }, { updateOn: 'change' }),
                accent: new forms.FormGroup({
                    main: new forms.FormControl(''),
                    lighter: new forms.FormControl(''),
                    darker: new forms.FormControl('')
                }),
                warn: new forms.FormGroup({
                    main: new forms.FormControl(''),
                    lighter: new forms.FormControl(''),
                    darker: new forms.FormControl('')
                }, { updateOn: 'change' }),
                lightText: new forms.FormControl('', []),
                lightBackground: new forms.FormControl('', []),
                darkText: new forms.FormControl('', []),
                darkBackground: new forms.FormControl('', [])
            }, { updateOn: 'change' });
        };
        return PalettePickerComponent;
    }());
    PalettePickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-palette-picker',
                    template: "<div \r\n  fxLayout=\"column\" \r\n  fxLayoutGap=\"10px\">\r\n  <div \r\n    fxLayout.lg=\"row\" \r\n    fxLayout.md=\"row\" \r\n    fxLayout.sm=\"column\" \r\n    fxLayout.xs=\"column\"\r\n    fxLayoutGap=\"10px\">\r\n    <lcu-sub-palette-picker [color-picker-color]=\"PrimaryColor\" [form]=\"Primary\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"AccentColor\" [form]=\"Accent\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"WarnColor\" [form]=\"Warn\"></lcu-sub-palette-picker>\r\n  </div>\r\n  <lcu-variant-colors></lcu-variant-colors>\r\n</div>\r\n",
                    styles: [""]
                },] }
    ];
    PalettePickerComponent.ctorParameters = function () { return [
        { type: ThemeBuilderService },
        { type: PalettePickerService }
    ]; };

    var SubPalettePickerComponent = /** @class */ (function () {
        function SubPalettePickerComponent(themeBuilderService, palettePickerService) {
            this.themeBuilderService = themeBuilderService;
            this.palettePickerService = palettePickerService;
            this.Unlocked = new forms.FormControl(false);
            this.materialKeys = __spreadArray(__spreadArray([], __read(Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY))), __read(Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)));
        }
        Object.defineProperty(SubPalettePickerComponent.prototype, "ColorPickerColor", {
            set: function (val) {
                this.Main.setValue(val);
                this.onMainChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SubPalettePickerComponent.prototype, "Main", {
            /**
             * Access Main color form control
             */
            get: function () {
                return this.Form.get('main');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SubPalettePickerComponent.prototype, "Lighter", {
            /**
             * Access Light color form control
             */
            get: function () {
                return this.Form.get('lighter');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SubPalettePickerComponent.prototype, "Darker", {
            /**
             * Access Dark color form control
             */
            get: function () {
                return this.Form.get('darker');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SubPalettePickerComponent.prototype, "Variants", {
            /**
             * Set preset color palette
             */
            get: function () {
                var _this = this;
                return !this.themeBuilderService.MaterialPaletteColors ? undefined :
                    this.materialKeys.map(function (x) {
                        return _this.themeBuilderService.MaterialPaletteColors[x];
                    });
            },
            enumerable: false,
            configurable: true
        });
        SubPalettePickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.Main.value) {
                this.onMainChange();
            }
            this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
                .subscribe(function (val) {
                _this.onMainChange();
            });
        };
        SubPalettePickerComponent.prototype.ngOnDestroy = function () {
            this.palettePickerChangedSubscription.unsubscribe();
            this.colorPickerClosedSubscription.unsubscribe();
        };
        /**
         * Returns palette colors, 50 - A700
         *
         * @param color selected base color, chosen from color pickers
         */
        SubPalettePickerComponent.prototype.onMainChange = function () {
            this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(this.Form.value.main);
            // set lightest and darkest hue colors in color picker
            if (!this.Unlocked.value) {
                this.Form.patchValue({ lighter: this.themeBuilderService.MaterialPaletteColors['50'] });
                this.Form.patchValue({ darker: this.themeBuilderService.MaterialPaletteColors['900'] });
            }
        };
        return SubPalettePickerComponent;
    }());
    SubPalettePickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-sub-palette-picker',
                    template: "\r\n<div fxLayout=\"column\">\r\n    <!--Main Color-->\r\n    <lcu-color-picker\r\n      class=\"main\" \r\n      [control]=\"Main\"></lcu-color-picker>\r\n  \r\n    <div fxLayout=\"row\">\r\n      <!--Light and dark colors for additional hues-->\r\n      <lcu-color-picker \r\n        class=\"lighter\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Lighter\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n  \r\n      <lcu-color-picker \r\n        class=\"darker\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Darker\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n    </div>\r\n  </div>\r\n  ",
                    styles: [".darker,.lighter,.main{border:.5px solid #ddd}.darker,.lighter{height:40px}.main{height:60px}"]
                },] }
    ];
    SubPalettePickerComponent.ctorParameters = function () { return [
        { type: ThemeBuilderService },
        { type: PalettePickerService }
    ]; };
    SubPalettePickerComponent.propDecorators = {
        Form: [{ type: i0.Input, args: ['form',] }],
        ColorPickerColor: [{ type: i0.Input, args: ['color-picker-color',] }]
    };

    var LightnessPickerComponent = /** @class */ (function () {
        function LightnessPickerComponent(themeBuilderService) {
            this.themeBuilderService = themeBuilderService;
            this.ToggleMode = 'Dark Mode';
        }
        Object.defineProperty(LightnessPickerComponent.prototype, "DarkMode", {
            get: function () {
                return this._darkMode;
            },
            set: function (val) {
                if (!val) {
                    return;
                }
                this._darkMode = val;
                this.setThemeMode(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LightnessPickerComponent.prototype, "Toggle", {
            /**
             * Access Toggle field within the form group
             */
            get: function () {
                return this.ToggleForm.get('toggle');
            },
            enumerable: false,
            configurable: true
        });
        LightnessPickerComponent.prototype.ngOnInit = function () {
            this.formSetup();
        };
        LightnessPickerComponent.prototype.formSetup = function () {
            this.ToggleForm = new forms.FormGroup({
                toggle: new forms.FormControl(this.DarkMode)
            });
            this.onChanges();
        };
        LightnessPickerComponent.prototype.onChanges = function () {
            var _this = this;
            this.Toggle.valueChanges
                .subscribe(function (val) {
                _this.setThemeMode(val);
            });
        };
        LightnessPickerComponent.prototype.toggleMode = function (val) {
            return val ? 'Light Mode' : 'Dark Mode';
        };
        LightnessPickerComponent.prototype.setThemeMode = function (val) {
            this.ToggleMode = this.toggleMode(val);
            this.themeBuilderService.ThemeMode = val;
        };
        return LightnessPickerComponent;
    }());
    LightnessPickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-mode-toggle',
                    template: "<form \r\n    [formGroup]=\"ToggleForm\" \r\n    fxLayout=\"row\" \r\n    fxLayoutAlign=\"start center\">\r\n    <mat-slide-toggle\r\n        (click)=\"$event.stopPropagation()\" \r\n        formControlName=\"toggle\"\r\n        labelPosition=\"before\" \r\n        color=\"primary\">\r\n    </mat-slide-toggle>\r\n    <span \r\n        class=\"margin-left-1 mat-card-subtitle\">\r\n        {{ ToggleMode }}\r\n    </span>\r\n</form>\r\n\r\n\r\n",
                    styles: [""]
                },] }
    ];
    LightnessPickerComponent.ctorParameters = function () { return [
        { type: ThemeBuilderService }
    ]; };
    LightnessPickerComponent.propDecorators = {
        DarkMode: [{ type: i0.Input, args: ['dark-mode',] }]
    };

    var tinyColor = tinycolor__namespace;
    var VariantColorsComponent = /** @class */ (function () {
        function VariantColorsComponent(PalettePickerService, themeBuilderService, variantColorService) {
            this.PalettePickerService = PalettePickerService;
            this.themeBuilderService = themeBuilderService;
            this.variantColorService = variantColorService;
            this.PalettePickerService.PrimaryColorPalette = [];
            this.PalettePickerService.AccentColorPalette = [];
            this.PalettePickerService.WarnColorPalette = [];
        }
        Object.defineProperty(VariantColorsComponent.prototype, "AccentColor", {
            get: function () {
                return this._accentColor;
            },
            // tslint:disable-next-line:no-input-rename
            set: function (val) {
                this._accentColor = val;
                // this.updateAccentColor(val);
                this.variantColorService.UpdateAccentVariants(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VariantColorsComponent.prototype, "PrimaryColor", {
            get: function () {
                return this.PrimaryColor;
            },
            // tslint:disable-next-line:no-input-rename
            set: function (val) {
                this._primaryColor = val;
                // this.updatePrimaryColor(val);
                this.variantColorService.UpdatePrimaryVariants(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VariantColorsComponent.prototype, "WarnColor", {
            get: function () {
                return this.WarnColor;
            },
            // tslint:disable-next-line:no-input-rename
            set: function (val) {
                this._warnColor = val;
                // this.updateWarnColor(val);
                this.variantColorService.UpdateWarnVariants(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VariantColorsComponent.prototype, "PrimaryColorControl", {
            /**
             * Access primary color field
             */
            get: function () {
                return this.Form.get('primaryColorControl');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VariantColorsComponent.prototype, "AccentColorControl", {
            /**
             * Access accent color field
             */
            get: function () {
                return this.Form.get('accentColorControl');
            },
            enumerable: false,
            configurable: true
        });
        VariantColorsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.setupForm();
            this.paletteChangedSubscription = this.PalettePickerService.ColorPickerChanged
                .subscribe(function (palette) {
                if (!palette || !palette.primary) {
                    return;
                }
                _this.variantColorService.UpdatePrimaryVariants(palette.primary.main);
                _this.variantColorService.UpdateAccentVariants(palette.accent.main);
                _this.variantColorService.UpdateWarnVariants(palette.warn.main);
                // this.updateAccentColor(palette.accent.main);
                // this.updatePrimaryColor(palette.primary.main);
                // this.updateWarnColor(palette.warn.main);
            });
        };
        VariantColorsComponent.prototype.ngOnDestroy = function () {
            this.paletteChangedSubscription.unsubscribe();
        };
        //   protected updatePrimaryColor(color: string): void {
        //     this.PalettePickerService.PrimaryColorPalette = this.computeColors(color ? color : this.PrimaryColorControl.value);
        //     for (const c of this.PalettePickerService.PrimaryColorPalette) {
        //       const key = `--theme-primary-${c.name}`;
        //       const value = c.hex;
        //       const key2 = `--theme-primary-contrast-${c.name}`;
        //       const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
        //       // set or update CSS variable values
        //       document.documentElement.style.setProperty(key, value);
        //       document.documentElement.style.setProperty(key2, value2);
        //     }
        //   }
        //   protected updateAccentColor(color: string): void {
        //     this.PalettePickerService.AccentColorPalette = this.computeColors(color ? color : this.AccentColorControl.value);
        //     for (const c of this.PalettePickerService.AccentColorPalette) {
        //       const key = `--theme-accent-${c.name}`;
        //       const value = c.hex;
        //       const key2 = `--theme-primary-contrast-${c.name}`;
        //       const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
        //       document.documentElement.style.setProperty(key, value);
        //       document.documentElement.style.setProperty(key2, value2);
        //     }
        //   }
        //   protected updateWarnColor(color: string): void {
        //     this.PalettePickerService.WarnColorPalette = this.computeColors(color);
        //     for (const c of this.PalettePickerService.WarnColorPalette) {
        //       const key = `--theme-warn-${c.name}`;
        //       const value = c.hex;
        //       const key2 = `--theme-primary-contrast-${c.name}`;
        //       const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
        //       document.documentElement.style.setProperty(key, value);
        //       document.documentElement.style.setProperty(key2, value2);
        //     }
        //   }
        VariantColorsComponent.prototype.setupForm = function () {
            this.Form = new forms.FormGroup({
                primaryColorControl: new forms.FormControl('#ffcc11'),
                accentColorControl: new forms.FormControl('#0000aa')
            });
        };
        return VariantColorsComponent;
    }());
    VariantColorsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-variant-colors',
                    template: "<form\r\n    fxLayout=\"column\"\r\n    fxLayoutGap=\"10px\"\r\n    [formGroup]=\"Form\"\r\n    novalidate>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\" \r\n            *ngFor=\"let color of PalettePickerService.PrimaryColorPalette\" \r\n            [style.background-color]=\"color.hex\" \r\n            [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n            <div>\r\n                {{color.name}}\r\n            </div>\r\n            <div>\r\n                {{color.hex}}\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n                fxLayoutAlign=\"space-between center\"\r\n                class=\"padding-left-2 padding-right-2\"\r\n                *ngFor=\"let color of PalettePickerService.AccentColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\"\r\n            *ngFor=\"let color of PalettePickerService.WarnColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n\r\n",
                    styles: [""]
                },] }
    ];
    VariantColorsComponent.ctorParameters = function () { return [
        { type: PalettePickerService },
        { type: ThemeBuilderService },
        { type: VariantColorService }
    ]; };
    VariantColorsComponent.propDecorators = {
        AccentColor: [{ type: i0.Input, args: ['accent-color',] }],
        PrimaryColor: [{ type: i0.Input, args: ['primary-color',] }],
        WarnColor: [{ type: i0.Input, args: ['warn-color',] }]
    };

    var ThemePickerModel = /** @class */ (function () {
        function ThemePickerModel(opts) {
            Object.assign(this, opts); // destructure values
        }
        return ThemePickerModel;
    }());

    var ThemePickerComponent = /** @class */ (function () {
        function ThemePickerComponent(palettePickerService, themeBuilderService, variantColorService) {
            this.palettePickerService = palettePickerService;
            this.themeBuilderService = themeBuilderService;
            this.variantColorService = variantColorService;
            this.setupForm();
        }
        Object.defineProperty(ThemePickerComponent.prototype, "DarkMode", {
            get: function () {
                return this._darkMode;
            },
            set: function (val) {
                if (!val) {
                    return;
                }
                this._darkMode = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemePickerComponent.prototype, "MaterialTheming", {
            get: function () {
                return this._materialTheming;
            },
            set: function (val) {
                this._materialTheming = val;
                // this.themeBuilderService.MaterialTheme = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemePickerComponent.prototype, "ManualAccent", {
            /**
             * Access manual accent color field
             */
            get: function () {
                return this.ManualForm.get('manualAccent');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemePickerComponent.prototype, "ManualPrimary", {
            /**
             * Access manual primary color field
             */
            get: function () {
                return this.ManualForm.get('manualPrimary');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemePickerComponent.prototype, "ManualThemeName", {
            /**
             * Access manual theme name field
             */
            get: function () {
                return this.ManualForm.get('manualThemeName');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ThemePickerComponent.prototype, "ManualWarn", {
            /**
             * Access manual warn color field
             */
            get: function () {
                return this.ManualForm.get('manualWarn');
            },
            enumerable: false,
            configurable: true
        });
        ThemePickerComponent.prototype.ngOnInit = function () {
            this.themes();
        };
        ThemePickerComponent.prototype.SetActiveTheme = function (theme) {
            var palette = new PaletteModel();
            palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
            var colors = [theme.Primary, theme.Accent, theme.Warn];
            palette.primary.main = theme.Primary;
            palette.accent.main = theme.Accent;
            palette.warn.main = theme.Warn;
            this.variantColorService.UpdatePrimaryVariants(theme.Primary);
            this.variantColorService.UpdateAccentVariants(theme.Accent);
            this.variantColorService.UpdateWarnVariants(theme.Warn);
            this.themeBuilderService.Palette = palette;
            this.themes();
        };
        /**
         * Manually create theme, by using inputs
         */
        ThemePickerComponent.prototype.SetManualTheme = function () {
            var manualPalette;
            manualPalette = new ThemePickerModel({
                ID: this.ManualThemeName.value,
                Primary: this.ManualPrimary.value,
                Accent: this.ManualAccent.value,
                Warn: this.ManualWarn.value
            });
            this.themeBuilderService.Themes.unshift(manualPalette);
            this.SetActiveTheme(manualPalette);
        };
        /**
         * Setup form controls
         */
        ThemePickerComponent.prototype.setupForm = function () {
            this.ManualForm = new forms.FormGroup({
                manualThemeName: new forms.FormControl('', { validators: forms.Validators.required }),
                manualPrimary: new forms.FormControl('', { validators: forms.Validators.required }),
                manualAccent: new forms.FormControl('', { validators: forms.Validators.required }),
                manualWarn: new forms.FormControl('', { validators: forms.Validators.required })
            });
        };
        /**
         * Create themes for theme picker
         */
        ThemePickerComponent.prototype.themes = function () {
            this.Themes = this.themeBuilderService.Themes;
        };
        return ThemePickerComponent;
    }());
    ThemePickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lcu-theme-picker',
                    template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle [dark-mode]=\"DarkMode\" class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button mat-button class=\"theme-selector\" (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <!-- Manual Form Controls -->\r\n        <div\r\n            *ngIf=\"ToggleManualControls\" \r\n            class=\"margin-2 \r\n            margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</mat-menu>",
                    styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"]
                },] }
    ];
    ThemePickerComponent.ctorParameters = function () { return [
        { type: PalettePickerService },
        { type: ThemeBuilderService },
        { type: VariantColorService }
    ]; };
    ThemePickerComponent.propDecorators = {
        DarkMode: [{ type: i0.Input, args: ['dark-mode',] }],
        ToggleManualControls: [{ type: i0.Input, args: ['toggle-manual-controls',] }],
        MaterialTheming: [{ type: i0.Input, args: ['material-theming',] }]
    };
    // function Input(arg0: string) {
    //   throw new Error('Function not implemented.');
    // }

    var ThemeBuilderModule = /** @class */ (function () {
        function ThemeBuilderModule() {
        }
        ThemeBuilderModule.forRoot = function () {
            return {
                ngModule: ThemeBuilderModule,
                providers: [
                    ThemeBuilderService,
                    PalettePickerService
                ]
            };
        };
        return ThemeBuilderModule;
    }());
    ThemeBuilderModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        ThemeBuilderComponent,
                        ThemeBuilderDirective,
                        ColorPickerComponent,
                        PalettePickerComponent,
                        SubPalettePickerComponent,
                        LightnessPickerComponent,
                        VariantColorsComponent,
                        ThemePickerComponent
                    ],
                    imports: [
                        common.FathymSharedModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        flexLayout.FlexLayoutModule,
                        common.MaterialModule,
                        ngxColorPicker.ColorPickerModule
                    ],
                    exports: [
                        ThemeBuilderComponent,
                        ThemeBuilderDirective,
                        ThemePickerComponent
                    ],
                    entryComponents: [
                        ThemePickerComponent
                    ]
                },] }
    ];

    var ThemeBuilderModel = /** @class */ (function () {
        function ThemeBuilderModel() {
        }
        return ThemeBuilderModel;
    }());

    var SubPaletteModel = /** @class */ (function () {
        function SubPaletteModel() {
        }
        return SubPaletteModel;
    }());

    var ThemeModel = /** @class */ (function () {
        function ThemeModel() {
        }
        return ThemeModel;
    }());

    var ColorModel = /** @class */ (function () {
        function ColorModel() {
        }
        return ColorModel;
    }());

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ColorModel = ColorModel;
    exports.ColorPickerComponent = ColorPickerComponent;
    exports.LightnessPickerComponent = LightnessPickerComponent;
    exports.PaletteModel = PaletteModel;
    exports.PalettePickerService = PalettePickerService;
    exports.SubPaletteModel = SubPaletteModel;
    exports.ThemeBuilderComponent = ThemeBuilderComponent;
    exports.ThemeBuilderConstants = ThemeBuilderConstants;
    exports.ThemeBuilderDirective = ThemeBuilderDirective;
    exports.ThemeBuilderModel = ThemeBuilderModel;
    exports.ThemeBuilderModule = ThemeBuilderModule;
    exports.ThemeBuilderService = ThemeBuilderService;
    exports.ThemeModel = ThemeModel;
    exports.ThemePickerComponent = ThemePickerComponent;
    exports.ThemePickerModel = ThemePickerModel;
    exports.VariantColorService = VariantColorService;
    exports.ɵa = PalettePickerComponent;
    exports.ɵb = PaletteTemplateService;
    exports.ɵc = LocalStorageService;
    exports.ɵd = UtilsService;
    exports.ɵe = SubPalettePickerComponent;
    exports.ɵf = VariantColorsComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lowcodeunit-lcu-theme-builder-common.umd.js.map
