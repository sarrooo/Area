"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string9) {
      var first = $strSlice(string9, 0, 1);
      var last = $strSlice(string9, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string9, rePropName, function(match, number9, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number9 || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function(value, key) {
          mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
        });
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function(value) {
          setParts.push(inspect(value, obj));
        });
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      return !!listGetNode(objects, key);
    };
    module2.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        get: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function(key, value) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key, value);
          }
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array2 = [];
      for (var i = 0; i < 256; ++i) {
        array2.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array2;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string9 = str;
      if (typeof str === "symbol") {
        string9 = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string9 = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string9).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string9.length; ++i) {
        var c = string9.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string9.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string9.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object10, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object10;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object10);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          if (generateArrayPrefix === "comma" && encodeValuesOnly) {
            var valuesArray = split.call(String(obj), ",");
            var valuesJoined = "";
            for (var i = 0; i < valuesArray.length; ++i) {
              valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults.encoder, charset, "value", format));
            }
            return [formatter(keyValue) + (commaRoundTrip && isArray(obj) && valuesArray.length === 1 ? "[]" : "") + "=" + valuesJoined];
          }
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
        sideChannel.set(object10, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          strictNullHandling,
          skipNulls,
          encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object10, opts) {
      var obj = object10;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(
          obj[key],
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// src/routes/about.routes.ts
var import_express = require("express");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query", "info", "warn", "error"]
});

// src/controllers/about.controller.ts
var import_http_status_codes = require("http-status-codes");
var about = async (req, res) => {
  const services = await prisma.service.findMany({
    select: {
      name: true,
      triggers: {
        select: {
          name: true,
          description: true
        }
      },
      reactions: {
        select: {
          name: true,
          description: true
        }
      }
    }
  });
  const client = {
    host: req.ip
  };
  const server = {
    current_time: Date.now(),
    services
  };
  return res.status(import_http_status_codes.StatusCodes.OK).json({ client, server });
};

// src/routes/about.routes.ts
var aboutRoutes = (0, import_express.Router)();
aboutRoutes.get("/about.json", about);
var about_routes_default = aboutRoutes;

// src/index.ts
var import_dotenv19 = __toESM(require("dotenv"));
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"));
var import_express15 = __toESM(require("express"));
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/middlewares/exception.handler.ts
var import_http_status_codes2 = require("http-status-codes");
var ExceptionsHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.status && err.error) {
    return res.status(err.status).json({ error: err.error });
  }
  console.log(err);
  return res.status(import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal error" });
};

// src/utils/exceptions.ts
var import_http_status_codes3 = require("http-status-codes");
var Exception = class {
  constructor(error, status) {
    this.error = error;
    this.status = status;
  }
};
var NotFoundException = class extends Exception {
  constructor(error) {
    super(error, import_http_status_codes3.StatusCodes.NOT_FOUND);
  }
};
var BadRequestException = class extends Exception {
  constructor(error) {
    super(error, import_http_status_codes3.StatusCodes.BAD_REQUEST);
  }
};
var ForbiddenRequestException = class extends Exception {
  constructor(error) {
    super(error, import_http_status_codes3.StatusCodes.FORBIDDEN);
  }
};
var UnauthorizedRequestException = class extends Exception {
  constructor(error) {
    super(error, import_http_status_codes3.StatusCodes.UNAUTHORIZED);
  }
};

// src/middlewares/unknowRoutes.handler.ts
var UnknowRoutesHandler = () => {
  throw new NotFoundException("The requested resource does not exist");
};

// src/routes/index.ts
var import_express14 = require("express");

// src/routes/auth.routes.ts
var import_express2 = require("express");

// src/schemas/user.schema.ts
var import_zod = require("zod");
var registerUserSchema = (0, import_zod.object)({
  body: (0, import_zod.object)({
    first_name: (0, import_zod.string)({
      required_error: "First name is required"
    }),
    last_name: (0, import_zod.string)({
      required_error: "Last name is required"
    }),
    email: (0, import_zod.string)({
      required_error: "Email is required"
    }).email("Invalid email address"),
    password: (0, import_zod.string)({
      required_error: "Password is required"
    }).min(8, "Password must be at least 8 characters").max(32, "Password must be less than 32 characters"),
    password_confirmation: (0, import_zod.string)({
      required_error: "Password confirmation is required"
    })
  }).refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match"
  })
});
var loginUserSchema = (0, import_zod.object)({
  body: (0, import_zod.object)({
    email: (0, import_zod.string)({
      required_error: "Email is required"
    }).email("Invalid email address"),
    password: (0, import_zod.string)({
      required_error: "Password is required"
    }).min(8, "Invalid email or password")
  })
});

// src/middlewares/validate.ts
var import_zod2 = require("zod");
var validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body
    });
    next();
  } catch (error) {
    if (error instanceof import_zod2.ZodError) {
      throw new BadRequestException(error.errors);
    }
    next(error);
  }
};

// src/routes/auth.routes.ts
var import_dotenv = __toESM(require("dotenv"));

// src/controllers/auth/auth.controller.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_config = __toESM(require("config"));
var import_bcrypt = require("bcrypt");

// src/lib/logging.ts
var import_chalk = __toESM(require("chalk"));
var _Logging = class {
};
var Logging = _Logging;
Logging.log = (args) => _Logging.info(args);
Logging.info = (args) => console.log(
  import_chalk.default.blue(`[${new Date().toLocaleString()}] [INFO]`),
  typeof args === "string" ? import_chalk.default.blueBright(args) : args
);
Logging.success = (args) => console.log(
  import_chalk.default.green(`[${new Date().toLocaleString()}] [SUCCESS]`),
  typeof args === "string" ? import_chalk.default.greenBright(args) : args
);
Logging.warning = (args) => console.log(
  import_chalk.default.yellow(`[${new Date().toLocaleString()}] [WARNING]`),
  typeof args === "string" ? import_chalk.default.yellowBright(args) : args
);
Logging.error = (args) => console.log(
  import_chalk.default.red(`[${new Date().toLocaleString()}] [ERROR]`),
  typeof args === "string" ? import_chalk.default.redBright(args) : args
);

// src/controllers/auth/auth.controller.ts
var import_http_status_codes4 = require("http-status-codes");
var login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    throw new BadRequestException("Invalid email or password");
  }
  if (user.password === null) {
    throw new BadRequestException("Password should be set");
  }
  const verifyPassword = await (0, import_bcrypt.compare)(password, user.password);
  if (!verifyPassword) {
    throw new BadRequestException("Invalid email or password");
  }
  const token = await generateToken(user, res);
  Logging.info(`User ${user.email} logged in`);
  res.status(import_http_status_codes4.StatusCodes.OK).json({ token });
};
var register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (userAlreadyExist) {
    throw new BadRequestException("User already exists");
  }
  const hashedPassword = await (0, import_bcrypt.hash)(password, 10);
  const newUser = await prisma.user.create({
    data: {
      first_name,
      last_name,
      password: hashedPassword,
      email
    }
  });
  const { id } = newUser;
  Logging.info(`User ${email} register in`);
  const token = await generateToken(newUser, res);
  return res.status(import_http_status_codes4.StatusCodes.CREATED).json({ token, id });
};
var refresh = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    throw new ForbiddenRequestException("No refresh token");
  }
  let payload;
  try {
    payload = (0, import_jsonwebtoken.verify)(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    Logging.error(error);
    throw new UnauthorizedRequestException("Invalid refresh token");
  }
  if (!payload) {
    throw new ForbiddenRequestException("Invalid refresh token");
  }
  const dbRefreshToken = await prisma.token.findFirst({
    where: {
      userId: payload.id,
      expiredAt: {
        gte: new Date()
      }
    }
  });
  if (!dbRefreshToken) {
    throw new ForbiddenRequestException("Invalid refresh token");
  }
  const token = (0, import_jsonwebtoken.sign)(
    { id: payload.id, name: payload.email },
    process.env.JWT_SECRET,
    { expiresIn: `${import_config.default.get("jwtConfig.expiresInSecret")}s` }
  );
  return res.status(import_http_status_codes4.StatusCodes.OK).json({ token });
};
var logout = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    throw new ForbiddenRequestException("Already logout!");
  }
  await prisma.token.delete({
    where: {
      token: refreshToken
    }
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    maxAge: 0,
    secure: true
  });
  return res.sendStatus(import_http_status_codes4.StatusCodes.NO_CONTENT);
};
var generateToken = async (user, res) => {
  const refreshToken = (0, import_jsonwebtoken.sign)(
    { id: user.id, first_name: user.first_name, last_name: user.last_name },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_SECRET }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 1e3 * import_config.default.get("jwtConfig.expiresInRefreshSecret"),
    secure: true
  });
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);
  await prisma.token.upsert({
    where: {
      userId: user.id
    },
    update: {
      token: refreshToken,
      expiredAt
    },
    create: {
      userId: user.id,
      token: refreshToken,
      expiredAt
    }
  });
  Logging.info(
    `Refresh token generated for user ${import_config.default.get("jwtConfig.expiresInSecret") * 1e3}`
  );
  const token = (0, import_jsonwebtoken.sign)(
    { id: user.id, first_name: user.first_name, last_name: user.last_name },
    process.env.JWT_SECRET,
    { expiresIn: `${import_config.default.get("jwtConfig.expiresInSecret")}s` }
  );
  Logging.info(
    `Token generated for user ${import_config.default.get(
      "jwtConfig.expiresInSecret"
    )}`
  );
  return token;
};

// src/routes/auth.routes.ts
import_dotenv.default.config();
var authRoutes = (0, import_express2.Router)();
authRoutes.post("/login", validate(loginUserSchema), login);
authRoutes.post("/register", validate(registerUserSchema), register);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);
var auth_routes_default = authRoutes;

// src/routes/user.routes.ts
var import_dotenv3 = __toESM(require("dotenv"));
var import_express3 = require("express");

// src/middlewares/auth.handler.ts
var import_dotenv2 = __toESM(require("dotenv"));
var import_jsonwebtoken2 = require("jsonwebtoken");
var process2 = __toESM(require("process"));
import_dotenv2.default.config();
var verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ForbiddenRequestException("No token provided");
  }
  try {
    const token = authorization && authorization.split(" ")[1] || "";
    let payload = "";
    try {
      payload = (0, import_jsonwebtoken2.verify)(token, process2.env.JWT_SECRET);
    } catch (e) {
      throw new UnauthorizedRequestException("jwt expired");
    }
    if (!payload) {
      throw new ForbiddenRequestException("Access denied (payload)");
    }
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id
      }
    });
    if (!user) {
      throw new ForbiddenRequestException("Access denied (user)");
    }
    const _a = user, { password } = _a, UserWithoutPassword = __objRest(_a, ["password"]);
    req.user = UserWithoutPassword;
  } catch (_) {
    throw new UnauthorizedRequestException("Access denied clown");
  }
  next();
};
var isConnected = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const token = authorization && authorization.split(" ")[1] || "";
      let payload = "";
      try {
        payload = (0, import_jsonwebtoken2.verify)(token, process2.env.JWT_SECRET);
      } catch (e) {
        throw new UnauthorizedRequestException("jwt expired");
      }
      if (!payload) {
        throw new ForbiddenRequestException("Access denied (payload)");
      }
      const user = await prisma.user.findFirst({
        where: {
          id: payload.id
        }
      });
      if (!user) {
        throw new ForbiddenRequestException("Access denied (user)");
      }
      const _a = user, { password } = _a, UserWithoutPassword = __objRest(_a, ["password"]);
      req.user = UserWithoutPassword;
    } catch (_) {
      throw new ForbiddenRequestException("Access denied");
    }
  }
  next();
};

// src/routes/user.routes.ts
var import_http_status_codes5 = require("http-status-codes");
import_dotenv3.default.config();
var userRouter = (0, import_express3.Router)();
userRouter.get("/me", verifyToken, async (req, res) => {
  return res.status(import_http_status_codes5.StatusCodes.OK).json({ user: req.user });
});
var user_routes_default = userRouter;

// src/routes/trigger_output.routes.ts
var import_express4 = require("express");
var import_dotenv5 = __toESM(require("dotenv"));

// src/schemas/trigger_output.schema.ts
var import_zod3 = require("zod");
var createTriggerOutputTypeSchema = (0, import_zod3.object)({
  body: (0, import_zod3.object)({
    id: (0, import_zod3.number)().optional(),
    trigger_id: (0, import_zod3.number)({
      required_error: "Trigger id is required"
    }),
    name: (0, import_zod3.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod3.string)().optional(),
    type: (0, import_zod3.string)({
      required_error: "Type is required"
    })
  })
});
var readTriggerOutputTypeSchema = (0, import_zod3.object)({
  params: (0, import_zod3.object)({
    id: (0, import_zod3.number)({
      required_error: "Trigger Output Type id is required"
    })
  })
});
var updateTriggerOutputTypeSchema = (0, import_zod3.object)({
  params: (0, import_zod3.object)({
    id: (0, import_zod3.number)({
      required_error: "Trigger Output Type id is required"
    })
  }),
  body: (0, import_zod3.object)({
    trigger_id: (0, import_zod3.number)({
      required_error: "Trigger id is required"
    }),
    name: (0, import_zod3.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod3.string)().optional(),
    type: (0, import_zod3.string)({
      required_error: "Type is required"
    })
  })
});
var deleteTriggerOutputTypeSchema = (0, import_zod3.object)({
  params: (0, import_zod3.object)({
    id: (0, import_zod3.number)({
      required_error: "Trigger Output Type id is required"
    })
  })
});
var searchTriggerOutputTypeSchema = (0, import_zod3.object)({
  body: (0, import_zod3.object)({
    max: (0, import_zod3.number)().optional()
  })
});

// src/controllers/trigger_output.controller.ts
var import_dotenv4 = __toESM(require("dotenv"));
var import_http_status_codes6 = require("http-status-codes");
import_dotenv4.default.config();
var createTriggerOutputType = async (req, res) => {
  const { id, triggerId, name, description, type } = req.body;
  if (id !== void 0)
    throw new BadRequestException("You cannot specify an id when creating a trigger output type");
  const newTriggerOutputType = await prisma.triggerOutputType.create({
    data: {
      name,
      description,
      type,
      triggerId
    }
  });
  Logging.info(`Trigger Output Type ${newTriggerOutputType.id} created`);
  return res.status(import_http_status_codes6.StatusCodes.CREATED).json(newTriggerOutputType);
};
var readTriggerOutputType = async (req, res) => {
  const { id } = req.params;
  try {
    const triggerOutputType = await prisma.triggerOutputType.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Trigger Output Type ${id} read`);
    return res.status(import_http_status_codes6.StatusCodes.OK).json(triggerOutputType);
  } catch (_) {
    throw new BadRequestException("Trigger Output Type not found");
  }
};
var updateTriggerOutputType = async (req, res) => {
  const { id } = req.params;
  const { triggerId, name, description, type } = req.body;
  try {
    const triggerOutputType = await prisma.triggerOutputType.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        type,
        triggerId
      }
    });
    Logging.info(`Trigger Output Type ${id} updated`);
    return res.status(import_http_status_codes6.StatusCodes.OK).json(triggerOutputType);
  } catch (_) {
    throw new BadRequestException("Trigger Output Type not found");
  }
};
var deleteTriggerOutputType = async (req, res) => {
  const { id } = req.params;
  try {
    const triggerOutputType = await prisma.triggerOutputType.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Trigger Output Type ${id} deleted`);
    return res.status(import_http_status_codes6.StatusCodes.OK).json(triggerOutputType);
  } catch (_) {
    throw new BadRequestException("Trigger Output Type not found");
  }
};
var searchTriggerOutputType = async (req, res) => {
  const { max } = req.query;
  const triggerOutputTypes = await prisma.triggerOutputType.findMany({
    take: max
  });
  Logging.info(`Trigger Output Type searched`);
  return res.status(import_http_status_codes6.StatusCodes.OK).json(triggerOutputTypes);
};

// src/routes/trigger_output.routes.ts
import_dotenv5.default.config();
var triggerOutputRoutes = (0, import_express4.Router)();
triggerOutputRoutes.post("/", verifyToken, createTriggerOutputType);
triggerOutputRoutes.get("/:id", validate(readTriggerOutputTypeSchema), readTriggerOutputType);
triggerOutputRoutes.post("/:id", verifyToken, validate(updateTriggerOutputTypeSchema), updateTriggerOutputType);
triggerOutputRoutes.post("/delete/:id", verifyToken, validate(deleteTriggerOutputTypeSchema), deleteTriggerOutputType);
triggerOutputRoutes.get("/", validate(searchTriggerOutputTypeSchema), searchTriggerOutputType);
var trigger_output_routes_default = triggerOutputRoutes;

// src/routes/trigger_input.routes.ts
var import_dotenv7 = __toESM(require("dotenv"));
var import_express5 = require("express");

// src/schemas/trigger_input.schema.ts
var import_zod4 = require("zod");
var createTriggerInputTypeSchema = (0, import_zod4.object)({
  body: (0, import_zod4.object)({
    id: (0, import_zod4.number)().optional(),
    triggerId: (0, import_zod4.number)({
      required_error: "Trigger id is required"
    }),
    name: (0, import_zod4.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod4.string)().optional(),
    regex: (0, import_zod4.string)().optional(),
    mandatory: (0, import_zod4.boolean)().optional(),
    type: (0, import_zod4.string)({
      required_error: "Type is required"
    })
  })
});
var readTriggerInputTypeSchema = (0, import_zod4.object)({
  params: (0, import_zod4.object)({
    id: (0, import_zod4.string)({
      required_error: "Trigger Input Type id is required"
    })
  })
});
var updateTriggerInputTypeSchema = (0, import_zod4.object)({
  params: (0, import_zod4.object)({
    id: (0, import_zod4.number)({
      required_error: "Trigger Input Type id is required"
    })
  }),
  body: (0, import_zod4.object)({
    triggerId: (0, import_zod4.number)({
      required_error: "Trigger id is required"
    }),
    name: (0, import_zod4.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod4.string)().optional(),
    regex: (0, import_zod4.string)().optional(),
    mandatory: (0, import_zod4.boolean)({
      required_error: "Mandatory is required"
    }),
    type: (0, import_zod4.string)({
      required_error: "Type is required"
    })
  })
});
var deleteTriggerInputTypeSchema = (0, import_zod4.object)({
  params: (0, import_zod4.object)({
    id: (0, import_zod4.number)({
      required_error: "Trigger Input Type id is required"
    })
  })
});
var searchTriggerInputTypeSchema = (0, import_zod4.object)({
  body: (0, import_zod4.object)({
    max: (0, import_zod4.number)().optional()
  })
});

// src/controllers/trigger_input.controller.ts
var import_dotenv6 = __toESM(require("dotenv"));
var import_http_status_codes7 = require("http-status-codes");
import_dotenv6.default.config();
var createTriggerInputType = async (req, res) => {
  const { id, triggerId, name, description, regex, mandatory, type } = req.body;
  if (id !== void 0)
    throw new BadRequestException("You cannot specify an id when creating a trigger output type");
  const newTriggerInputType = await prisma.triggerInputType.create({
    data: {
      name,
      description,
      regex,
      mandatory,
      type,
      triggerId
    }
  });
  Logging.info(`Trigger Input Type ${newTriggerInputType.id} created`);
  return res.status(import_http_status_codes7.StatusCodes.CREATED).json(newTriggerInputType);
};
var readTriggerInputType = async (req, res) => {
  const { id } = req.params;
  try {
    const triggerInputType = await prisma.triggerInputType.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Trigger Input Type ${id} read`);
    return res.status(import_http_status_codes7.StatusCodes.OK).json(triggerInputType);
  } catch (_) {
    throw new BadRequestException("Trigger Output Type not found");
  }
};
var updateTriggerInputType = async (req, res) => {
  const { id } = req.params;
  const { triggerId, name, description, regex, mandatory, type } = req.body;
  try {
    const triggerInputType = await prisma.triggerInputType.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        regex,
        mandatory,
        type,
        triggerId
      }
    });
    Logging.info(`Trigger Input Type ${id} updated`);
    return res.status(import_http_status_codes7.StatusCodes.OK).json(triggerInputType);
  } catch (_) {
    throw new BadRequestException("Trigger Input Type not found");
  }
};
var deleteTriggerInputType = async (req, res) => {
  const { id } = req.params;
  try {
    const triggerInputType = await prisma.triggerInputType.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Trigger Input Type ${id} deleted`);
    return res.status(import_http_status_codes7.StatusCodes.OK).json(triggerInputType);
  } catch (_) {
    throw new BadRequestException("Trigger Input Type not found");
  }
};
var searchTriggerInputType = async (req, res) => {
  const { max } = req.query;
  const triggerInputTypes = await prisma.triggerInputType.findMany({
    take: max
  });
  Logging.info(`Trigger Input Type searched`);
  return res.status(import_http_status_codes7.StatusCodes.OK).json(triggerInputTypes);
};

// src/routes/trigger_input.routes.ts
import_dotenv7.default.config();
var triggerInputRoutes = (0, import_express5.Router)();
triggerInputRoutes.post("/", verifyToken, validate(createTriggerInputTypeSchema), createTriggerInputType);
triggerInputRoutes.get("/:id", validate(readTriggerInputTypeSchema), readTriggerInputType);
triggerInputRoutes.post("/:id", verifyToken, validate(updateTriggerInputTypeSchema), updateTriggerInputType);
triggerInputRoutes.post("/delete/:id", verifyToken, validate(deleteTriggerInputTypeSchema), deleteTriggerInputType);
triggerInputRoutes.get("/", validate(searchTriggerInputTypeSchema), searchTriggerInputType);
var trigger_input_routes_default = triggerInputRoutes;

// src/routes/reaction_input.routes.ts
var import_express6 = require("express");

// src/schemas/reaction_input.schema.ts
var import_zod5 = require("zod");
var createReactionInputTypeSchema = (0, import_zod5.object)({
  body: (0, import_zod5.object)({
    id: (0, import_zod5.number)().optional(),
    reaction_id: (0, import_zod5.number)({
      required_error: "Reaction id is required"
    }),
    name: (0, import_zod5.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod5.string)().optional(),
    regex: (0, import_zod5.string)().optional(),
    mandatory: (0, import_zod5.boolean)().optional(),
    type: (0, import_zod5.string)({
      required_error: "Type is required"
    })
  })
});
var readReactionInputTypeSchema = (0, import_zod5.object)({
  params: (0, import_zod5.object)({
    id: (0, import_zod5.number)({
      required_error: "Reaction Input Type id is required"
    })
  })
});
var updateReactionInputTypeSchema = (0, import_zod5.object)({
  params: (0, import_zod5.object)({
    id: (0, import_zod5.number)({
      required_error: "Reaction Input Type id is required"
    })
  }),
  body: (0, import_zod5.object)({
    reaction_id: (0, import_zod5.number)({
      required_error: "Reaction id is required"
    }),
    name: (0, import_zod5.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod5.string)().optional(),
    regex: (0, import_zod5.string)().optional(),
    mandatory: (0, import_zod5.boolean)({
      required_error: "Mandatory is required"
    }),
    type: (0, import_zod5.string)({
      required_error: "Type is required"
    })
  })
});
var deleteReactionInputTypeSchema = (0, import_zod5.object)({
  params: (0, import_zod5.object)({
    id: (0, import_zod5.number)({
      required_error: "Reaction Input Type id is required"
    })
  })
});
var searchReactionInputTypeSchema = (0, import_zod5.object)({
  body: (0, import_zod5.object)({
    max: (0, import_zod5.number)().optional()
  })
});

// src/controllers/reaction_input.controller.ts
var import_dotenv8 = __toESM(require("dotenv"));
var import_http_status_codes8 = require("http-status-codes");
import_dotenv8.default.config();
var createReactionInput = async (req, res) => {
  const { id, name, type, description, regex, mandatory, reactionId } = req.body;
  if (id !== void 0)
    throw new BadRequestException("You cannot specify an id when creating a trigger output type");
  const newReactionInputType = await prisma.reactionInputType.create({
    data: {
      name,
      description,
      regex,
      mandatory,
      type,
      reactionId
    }
  });
  Logging.info(`Reaction Input Type ${newReactionInputType.id} created`);
  return res.status(import_http_status_codes8.StatusCodes.CREATED).json(newReactionInputType);
};
var readReactionInput = async (req, res) => {
  const { id } = req.params;
  try {
    const reactionInputType = await prisma.reactionInputType.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Reaction Input Type ${id} read`);
    return res.status(import_http_status_codes8.StatusCodes.OK).json(reactionInputType);
  } catch (_) {
    throw new BadRequestException("Reaction Output Type not found");
  }
};
var updateReactionInput = async (req, res) => {
  const { id } = req.params;
  const { name, type, description, regex, mandatory, reactionId } = req.body;
  try {
    const reactionInputType = await prisma.reactionInputType.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        regex,
        mandatory,
        type,
        reactionId
      }
    });
    Logging.info(`Reaction Input Type ${id} updated`);
    return res.status(import_http_status_codes8.StatusCodes.OK).json(reactionInputType);
  } catch (_) {
    throw new BadRequestException("Reaction Input Type not found");
  }
};
var deleteReactionInput = async (req, res) => {
  const { id } = req.params;
  try {
    const reactionInputType = await prisma.reactionInputType.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Reaction Input Type ${id} deleted`);
    return res.status(import_http_status_codes8.StatusCodes.OK).json(reactionInputType);
  } catch (_) {
    throw new BadRequestException("Reaction Input Type not found");
  }
};
var searchReactionInput = async (req, res) => {
  const { max } = req.query;
  const reactionInputTypes = await prisma.reactionInputType.findMany({
    take: max
  });
  Logging.info(`Reaction Input Type searched`);
  return res.status(import_http_status_codes8.StatusCodes.OK).json(reactionInputTypes);
};

// src/routes/reaction_input.routes.ts
var reactionInputRoutes = (0, import_express6.Router)();
reactionInputRoutes.post("/", verifyToken, validate(createReactionInputTypeSchema), createReactionInput);
reactionInputRoutes.get("/:id", validate(readReactionInputTypeSchema), readReactionInput);
reactionInputRoutes.post("/:id", verifyToken, validate(updateReactionInputTypeSchema), updateReactionInput);
reactionInputRoutes.post("/delete/:id", verifyToken, validate(deleteReactionInputTypeSchema), deleteReactionInput);
reactionInputRoutes.get("/", validate(searchReactionInputTypeSchema), searchReactionInput);
var reaction_input_routes_default = reactionInputRoutes;

// src/routes/session.routes.ts
var import_dotenv9 = __toESM(require("dotenv"));
var import_express7 = require("express");

// services/github-session.service.ts
var import_config2 = __toESM(require("config"));
var import_axios = __toESM(require("axios"));
var import_qs = __toESM(require_lib());
var getGithubOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://github.com/login/oauth/access_token?";
  const options = {
    code,
    client_id: import_config2.default.get("githubConfig.clientId"),
    client_secret: import_config2.default.get("githubConfig.clientSecret"),
    redirect_uri
  };
  try {
    const { data } = await import_axios.default.post(
      rootUrl,
      import_qs.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Github Oauth Token");
    throw new Error(err);
  }
};
async function getGithubUser(access_token) {
  try {
    const { data } = await import_axios.default.get(
      `https://api.github.com/user?alt`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Github User");
    throw new Error(err);
  }
}

// src/utils/req.ts
var getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}/${req.originalUrl}`;
};

// src/controllers/auth/github.auth.controller.ts
var githubOAuthHandler = async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    Logging.warning("Github OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getGithubOauthToken({ code, redirect_uri: getUrl(req) });
  if (!access_token) {
    Logging.error("Github OAuth: getGithubOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const { id, name } = await getGithubUser(access_token);
  const names = name.split(" ", 2);
  const first_name = names[0];
  const last_name = names[1] || "";
  const user = await prisma.user.upsert({
    where: {
      github_id: id.toString()
    },
    update: {
      first_name,
      last_name,
      provider: "github",
      github_id: id.toString()
    },
    create: {
      first_name,
      last_name,
      provider: "github",
      github_id: id.toString()
    }
  });
  const token = await generateToken(user, res);
  Logging.info(`User ${user.first_name} logged in w/ github`);
  Logging.info(`Redirecting`);
  res.redirect(
    `${process.env.CORS_FRONT_URL}/oauth_callback?access_token=${token}`
  );
};

// services/twitter-session.service.ts
var import_config3 = __toESM(require("config"));
var import_axios2 = __toESM(require("axios"));
var import_qs2 = __toESM(require_lib());
var getTwitterOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://api.twitter.com/2/oauth2/token";
  const TWITTER_OAUTH_CLIENT_ID = import_config3.default.get("twitterConfig.clientId");
  const TWITTER_OAUTH_CLIENT_SECRET = import_config3.default.get("twitterConfig.clientSecret");
  const BasicAuthToken = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
    "base64"
  );
  const options = {
    client_id: TWITTER_OAUTH_CLIENT_ID,
    code_verifier: "challenge",
    redirect_uri,
    grant_type: "authorization_code",
    code
  };
  try {
    const { data } = await import_axios2.default.post(
      rootUrl,
      import_qs2.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Twitter Oauth Token");
    throw new Error(err);
  }
};
async function getTwitterUser(access_token) {
  try {
    const { data } = await import_axios2.default.get(
      `https://api.twitter.com/2/users/me`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    return data.data;
  } catch (err) {
    Logging.error("Failed to get Twitter User" + err);
    throw new Error(err);
  }
}
var getTwitterConnectOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://api.twitter.com/2/oauth2/token";
  const TWITTER_OAUTH_CLIENT_ID = import_config3.default.get("twitterConfig.clientId");
  const TWITTER_OAUTH_CLIENT_SECRET = import_config3.default.get("twitterConfig.clientSecret");
  const BasicAuthToken = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
    "base64"
  );
  const options = {
    client_id: TWITTER_OAUTH_CLIENT_ID,
    code_verifier: "challenge",
    redirect_uri,
    grant_type: "authorization_code",
    code
  };
  try {
    const { data } = await import_axios2.default.post(
      rootUrl,
      import_qs2.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Twitter Oauth Token");
    throw new Error(err);
  }
};

// src/controllers/auth/twitter.auth.controller.ts
var twitterOAuthHandler = async (req, res) => {
  const code = req.query.code;
  const platform = req.query.platform || "web";
  if (!code) {
    Logging.warning("Twitter OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getTwitterOauthToken({ code, redirect_uri: getUrl() });
  if (!access_token) {
    Logging.error("Twitter OAuth: getTwitterhubOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const { id, name } = await getTwitterUser(access_token);
  const names = name.split(" ", 2);
  const first_name = names[0];
  const last_name = names[1] || "";
  const user = await prisma.user.upsert({
    where: {
      twitter_id: id
    },
    update: {
      first_name,
      last_name,
      provider: "twitter",
      twitter_id: id
    },
    create: {
      first_name,
      last_name,
      provider: "twitter",
      twitter_id: id
    }
  });
  await prisma.userService.upsert({
    where: {
      userId_serviceId: {
        userId: user.id,
        serviceId: 2
      }
    },
    update: {
      userId: user.id,
      serviceId: 2,
      RefreshToken: access_token
    },
    create: {
      userId: user.id,
      serviceId: 2,
      RefreshToken: access_token
    }
  });
  const token = await generateToken(user, res);
  Logging.info(`User ${user.first_name} logged in w/ Twitter`);
  Logging.info(`Redirecting`);
  if (platform === "mobile") {
    res.redirect(
      `mobile://com.mobile/CallbackLogin/${token}`
    );
  } else {
    res.redirect(
      `${process.env.CORS_FRONT_URL}/oauth_callback?access_token=${token}`
    );
  }
};

// services/google-session.service.ts
var import_config4 = __toESM(require("config"));
var import_axios3 = __toESM(require("axios"));
var import_qs3 = __toESM(require_lib());
var getGoogleOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://oauth2.googleapis.com/token";
  const options = {
    code,
    client_id: import_config4.default.get("googleConfig.clientId"),
    client_secret: import_config4.default.get("googleConfig.clientSecret"),
    redirect_uri,
    grant_type: "authorization_code"
  };
  console.log("options", options);
  try {
    const { data } = await import_axios3.default.post(
      rootUrl,
      import_qs3.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return data;
  } catch (err) {
    console.log("err", err.request);
    Logging.error("Failed to get Google Oauth Token");
    throw new Error(err);
  }
};
async function getGoogleUser({
  id_token,
  access_token
}) {
  try {
    const { data } = await import_axios3.default.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Google User");
    throw new Error(err);
  }
}
var getGoogleConnectOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://oauth2.googleapis.com/token";
  const options = {
    code,
    client_id: import_config4.default.get("googleConfig.clientId"),
    client_secret: import_config4.default.get("googleConfig.clientSecret"),
    redirect_uri,
    grant_type: "authorization_code"
  };
  try {
    const { data } = await import_axios3.default.post(
      rootUrl,
      import_qs3.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Google Oauth Token");
    throw new Error(err);
  }
};

// src/controllers/auth/google.auth.controller.ts
var googleOAuthHandler = async (req, res) => {
  const code = req.query.code;
  const platform = req.query.platform || "web";
  if (!code) {
    Logging.warning("Google OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { id_token, access_token } = await getGoogleOauthToken({ code, redirect_uri: getUrl(req) });
  const { id, given_name, family_name, verified_email } = await getGoogleUser({
    id_token,
    access_token
  });
  if (!verified_email) {
    Logging.warning("Google OAuth: Email not verified");
    throw new BadRequestException("Google Email not verified");
  }
  const user = await prisma.user.upsert({
    where: {
      google_id: id
    },
    update: {
      first_name: given_name,
      last_name: family_name,
      provider: "google",
      google_id: id
    },
    create: {
      first_name: given_name,
      last_name: family_name,
      provider: "google",
      google_id: id
    }
  });
  if (!user) {
    Logging.warning("Google OAuth: Failed to upsert user");
    throw new BadRequestException("Google OAuth: Failed to upsert user");
  }
  const token = await generateToken(user, res);
  Logging.info(`User ${user.first_name} logged in w/ google`);
  Logging.info(`Redirecting`);
  if (platform === "mobile") {
    res.redirect(
      `mobile://com.mobile/CallbackLogin/${token}`
    );
  } else {
    res.redirect(
      `${process.env.CORS_FRONT_URL}/oauth_callback?access_token=${token}`
    );
  }
};

// services/spotify-session.service.ts
var import_config5 = __toESM(require("config"));
var import_axios4 = __toESM(require("axios"));
var import_qs4 = __toESM(require_lib());
var getSpotifyOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://accounts.spotify.com/api/token";
  const SPOTIFY_OAUTH_CLIENT_ID = import_config5.default.get("spotifyConfig.clientId");
  const SPOTIFY_OAUTH_CLIENT_SECRET = import_config5.default.get("spotifyConfig.clientSecret");
  const BasicAuthToken = Buffer.from(`${SPOTIFY_OAUTH_CLIENT_ID}:${SPOTIFY_OAUTH_CLIENT_SECRET}`, "utf8").toString(
    "base64"
  );
  const options = {
    code,
    redirect_uri,
    grant_type: "authorization_code"
  };
  try {
    const { data } = await import_axios4.default.post(
      rootUrl,
      import_qs4.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Spotify Oauth Token");
    throw new Error(err);
  }
};

// src/controllers/connect/spotify.connect.controller.ts
var import_jsonwebtoken3 = require("jsonwebtoken");
var spotifyConnectHandler = async (req, res, next) => {
  const platform = req.query.platform || "web";
  const code = req.query.code;
  if (!code) {
    Logging.error("Spotify OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getSpotifyOauthToken({ code, redirect_uri: getUrl(req) });
  if (!access_token) {
    Logging.error("Spotify OAuth: getSpotifyOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const spotify = await prisma.service.findUnique({
    where: {
      name: "spotify"
    }
  });
  if (!spotify) {
    Logging.error("Spotify OAuth: No spotify service found");
    throw new BadRequestException("No spotify service found");
  }
  const token = (0, import_jsonwebtoken3.sign)(
    {
      serviceId: spotify.id,
      access_token
    },
    process.env.JWT_SECRET,
    { expiresIn: `90s` }
  );
  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/CallbackSubscribe/${token}`);
  } else {
    res.redirect(`${process.env.CORS_FRONT_URL}/oauth_callback_subscribe?access_token=${token}`);
  }
};

// src/controllers/connect/google.connect.controller.ts
var import_jsonwebtoken4 = require("jsonwebtoken");
var googleConnectHandler = async (req, res) => {
  const platform = req.query.platform || "web";
  const code = req.query.code;
  if (!code) {
    Logging.error("Google Connect OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getGoogleConnectOauthToken({ code, redirect_uri: getUrl(req) });
  if (!access_token) {
    Logging.error("Google Connect OAuth: getGoogleConnectOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const google = await prisma.service.findUnique({
    where: {
      name: "google"
    }
  });
  if (!google) {
    Logging.error("Google Connect OAuth: No google service found");
    throw new BadRequestException("No google service found");
  }
  const token = (0, import_jsonwebtoken4.sign)(
    {
      serviceId: google.id,
      access_token
    },
    process.env.JWT_SECRET,
    { expiresIn: `90s` }
  );
  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/CallbackSubscribe/${token}`);
  } else {
    res.redirect(`${process.env.CORS_FRONT_URL}/oauth_callback_subscribe?access_token=${token}`);
  }
};

// src/controllers/connect/twitter.connect.controller.ts
var import_jsonwebtoken5 = require("jsonwebtoken");
var twitterConnectHandler = async (req, res, next) => {
  const platform = req.query.platform || "web";
  const code = req.query.code;
  if (!code) {
    Logging.error("Twitter Connect OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getTwitterConnectOauthToken({ code, redirect_uri: getUrl(req) });
  if (!access_token) {
    Logging.error("Twitter Connect OAuth: getTwitterConnectOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const twitter = await prisma.service.findUnique({
    where: {
      name: "twitter"
    }
  });
  if (!twitter) {
    Logging.error("Twitter Connect OAuth: No twitter service found");
    throw new BadRequestException("No twitter service found");
  }
  const token = (0, import_jsonwebtoken5.sign)(
    {
      serviceId: twitter.id,
      access_token
    },
    process.env.JWT_SECRET,
    { expiresIn: `90s` }
  );
  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/CallbackSubscribe/${token}`);
  } else {
    res.redirect(`${process.env.CORS_FRONT_URL}/oauth_callback_subscribe?access_token=${token}`);
  }
};

// src/controllers/connect/facebook.connect.controller.ts
var import_jsonwebtoken6 = require("jsonwebtoken");

// services/facebook-session.service.ts
var import_config6 = __toESM(require("config"));
var import_axios5 = __toESM(require("axios"));
var import_qs5 = __toESM(require_lib());
var getFacebookOauthToken = async ({ code, redirect_uri }) => {
  const rootUrl = "https://graph.facebook.com/v16.0/oauth/access_token";
  const options = {
    code,
    client_id: import_config6.default.get("facebookConfig.clientId"),
    client_secret: import_config6.default.get("facebookConfig.clientSecret"),
    redirect_uri
  };
  try {
    const { data } = await import_axios5.default.post(
      rootUrl,
      import_qs5.default.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return data;
  } catch (err) {
    Logging.error("Failed to get Facebook Oauth Token");
    throw new Error(err);
  }
};

// src/controllers/connect/facebook.connect.controller.ts
var facebookConnectHandler = async (req, res, next) => {
  const platform = req.query.platform || "web";
  const code = req.query.code;
  if (!code) {
    Logging.error("Facebook OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getFacebookOauthToken({ code, redirect_uri: getUrl(req) });
  if (!access_token) {
    Logging.error("Facebook OAuth: getFacebookOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const facebook = await prisma.service.findUnique({
    where: {
      name: "facebook"
    }
  });
  if (!facebook) {
    Logging.error("Facebook OAuth: No facebook service found");
    throw new BadRequestException("No facebook service found");
  }
  const token = (0, import_jsonwebtoken6.sign)(
    {
      serviceId: facebook.id,
      access_token
    },
    process.env.JWT_SECRET,
    { expiresIn: `90s` }
  );
  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/CallbackSubscribe/${token}`);
  } else {
    res.redirect(`${process.env.CORS_FRONT_URL}/oauth_callback_subscribe?access_token=${token}`);
  }
};

// src/controllers/connect/link_token.connect.controller.ts
var import_jsonwebtoken7 = require("jsonwebtoken");
var linkTokenConnectHandler = async (req, res) => {
  let payload;
  try {
    payload = (0, import_jsonwebtoken7.verify)(req.body.token, process.env.JWT_SECRET);
  } catch (error) {
    Logging.error(error);
    throw new UnauthorizedRequestException("Invalid token");
  }
  if (!payload) {
    throw new ForbiddenRequestException("Invalid refresh token");
  }
  if (!req.user.id) {
    throw new ForbiddenRequestException("Invalid user id");
  }
  await prisma.userService.upsert({
    where: {
      userId_serviceId: {
        userId: req.user.id,
        serviceId: payload.serviceId
      }
    },
    update: {
      RefreshToken: payload.access_token
    },
    create: {
      userId: req.user.id,
      serviceId: payload.serviceId,
      RefreshToken: payload.access_token
    }
  });
  res.status(201).json({ message: "Service linked", user: req.user, serviceId: payload.serviceId, token: payload.access_token });
};

// src/controllers/connect/github.connect.controller.ts
var import_jsonwebtoken8 = require("jsonwebtoken");
var githubConnectHandler = async (req, res, next) => {
  const platform = req.query.platform || "web";
  const code = req.query.code;
  if (!code) {
    Logging.error("Github Connect OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }
  const { access_token } = await getGithubOauthToken({ code, redirect_uri: getUrl(req) });
  if (!access_token) {
    Logging.error("Github Connect OAuth: getGithubConnectOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }
  const github = await prisma.service.findUnique({
    where: {
      name: "github"
    }
  });
  if (!github) {
    Logging.error("Github Connect OAuth: No github service found");
    throw new BadRequestException("No github service found");
  }
  const token = (0, import_jsonwebtoken8.sign)(
    {
      serviceId: github.id,
      access_token
    },
    process.env.JWT_SECRET,
    { expiresIn: `90s` }
  );
  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/CallbackSubscribe/${token}`);
  } else {
    res.redirect(`${process.env.CORS_FRONT_URL}/oauth_callback_subscribe?access_token=${token}`);
  }
};

// src/routes/session.routes.ts
import_dotenv9.default.config();
var sessionRouter = (0, import_express7.Router)();
sessionRouter.get("/oauth/google", googleOAuthHandler);
sessionRouter.get("/oauth/github", githubOAuthHandler);
sessionRouter.get("/oauth/twitter", twitterOAuthHandler);
sessionRouter.get("/oauth/connect/spotify", spotifyConnectHandler);
sessionRouter.get("/oauth/connect/google", googleConnectHandler);
sessionRouter.get("/oauth/connect/github", githubConnectHandler);
sessionRouter.get("/oauth/connect/twitter", twitterConnectHandler);
sessionRouter.get("/oauth/connect/facebook", facebookConnectHandler);
sessionRouter.post("/oauth/connect/link", verifyToken, linkTokenConnectHandler);
var session_routes_default = sessionRouter;

// src/routes/service.routes.ts
var import_dotenv11 = __toESM(require("dotenv"));

// src/schemas/service.schema.ts
var import_zod6 = require("zod");
var createServiceSchema = (0, import_zod6.object)({
  body: (0, import_zod6.object)({
    id: (0, import_zod6.number)().optional(),
    name: (0, import_zod6.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod6.string)().optional(),
    image: (0, import_zod6.string)().optional(),
    requiredSubscription: (0, import_zod6.boolean)({
      required_error: "Required Subscription is required"
    })
  })
});
var readServiceSchema = (0, import_zod6.object)({
  params: (0, import_zod6.object)({
    id: (0, import_zod6.string)({
      required_error: "Id is required"
    })
  })
});
var updateServiceSchema = (0, import_zod6.object)({
  params: (0, import_zod6.object)({
    id: (0, import_zod6.number)({
      required_error: "Id is required"
    })
  }),
  body: (0, import_zod6.object)({
    name: (0, import_zod6.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod6.string)().optional(),
    image: (0, import_zod6.string)().optional(),
    requiredSubscription: (0, import_zod6.boolean)({
      required_error: "Required Subscription is required"
    })
  })
});
var deleteServiceSchema = (0, import_zod6.object)({
  params: (0, import_zod6.object)({
    id: (0, import_zod6.number)({
      required_error: "Id is required"
    })
  })
});
var searchServiceSchema = (0, import_zod6.object)({
  body: (0, import_zod6.object)({
    max: (0, import_zod6.number)().optional()
  })
});

// src/controllers/service.controller.ts
var import_dotenv10 = __toESM(require("dotenv"));
var import_http_status_codes9 = require("http-status-codes");
import_dotenv10.default.config();
var createService = async (req, res) => {
  const { id, name, description, image, requiredSubscription } = req.body;
  if (id !== void 0)
    throw new BadRequestException(
      "You cannot specify an id when creating a service"
    );
  const newService = await prisma.service.create({
    data: {
      name,
      description,
      image,
      requiredSubscription
    }
  });
  Logging.info(`Service ${newService.id} created`);
  return res.status(import_http_status_codes9.StatusCodes.CREATED).json(newService);
};
async function buildService(service, req) {
  const retService = {
    id: service.id,
    name: service.name,
    description: service.description === null ? void 0 : service.description,
    image: service.image === null ? void 0 : service.image,
    requiredSubscription: service.requiredSubscription,
    subscribed: void 0
  };
  const user = req.user;
  if (user !== null && user !== void 0) {
    const userService = await prisma.userService.findUnique(
      {
        where: {
          userId_serviceId: {
            userId: user.id ? user.id : -1,
            serviceId: service.id
          }
        }
      }
    );
    retService.subscribed = userService === null ? false : true;
  }
  const serviceTriggers = await prisma.trigger.findMany({
    where: {
      serviceId: service.id
    }
  });
  for (let i = 0; i < serviceTriggers.length; i++) {
    const trigger = serviceTriggers[i];
    const addTrigger = {
      id: trigger.id,
      name: trigger.name,
      description: trigger.description === null ? void 0 : trigger.description,
      serviceId: trigger.serviceId
    };
    const triggerInputTypes = await prisma.triggerInputType.findMany({
      where: {
        triggerId: trigger.id
      }
    });
    for (let j = 0; j < triggerInputTypes.length; j++) {
      const triggerInputType = triggerInputTypes[j];
      const addInputType = {
        id: triggerInputType.id,
        name: triggerInputType.name,
        type: triggerInputType.type,
        description: triggerInputType.description === null ? void 0 : triggerInputType.description,
        regex: triggerInputType.regex === null ? void 0 : triggerInputType.regex,
        mandatory: triggerInputType.mandatory,
        triggerId: triggerInputType.triggerId
      };
      if (addTrigger.inputs === void 0)
        addTrigger.inputs = [];
      addTrigger.inputs.push(addInputType);
    }
    const triggerOutputTypes = await prisma.triggerOutputType.findMany({
      where: {
        triggerId: trigger.id
      }
    });
    for (let j = 0; j < triggerOutputTypes.length; j++) {
      const triggerOutputType = triggerOutputTypes[j];
      const addOutputType = {
        id: triggerOutputType.id,
        name: triggerOutputType.name,
        type: triggerOutputType.type,
        description: triggerOutputType.description === null ? void 0 : triggerOutputType.description,
        triggerId: triggerOutputType.triggerId
      };
      if (addTrigger.outputs === void 0)
        addTrigger.outputs = [];
      addTrigger.outputs.push(addOutputType);
    }
    if (retService.triggers === void 0)
      retService.triggers = [];
    retService.triggers.push(addTrigger);
  }
  const serviceReactions = await prisma.reaction.findMany({
    where: {
      serviceId: service.id
    }
  });
  for (let i = 0; i < serviceReactions.length; i++) {
    const reaction = serviceReactions[i];
    const addReaction = {
      id: reaction.id,
      name: reaction.name,
      description: reaction.description === null ? void 0 : reaction.description,
      serviceId: reaction.serviceId
    };
    const reactionInputTypes = await prisma.reactionInputType.findMany({
      where: {
        reactionId: reaction.id
      }
    });
    for (let j = 0; j < reactionInputTypes.length; j++) {
      const reactionInputType = reactionInputTypes[j];
      const addInputType = {
        id: reactionInputType.id,
        name: reactionInputType.name,
        type: reactionInputType.type,
        description: reactionInputType.description === null ? void 0 : reactionInputType.description,
        regex: reactionInputType.regex === null ? void 0 : reactionInputType.regex,
        mandatory: reactionInputType.mandatory,
        reactionId: reactionInputType.reactionId
      };
      if (addReaction.inputs === void 0)
        addReaction.inputs = [];
      addReaction.inputs.push(addInputType);
    }
    if (retService.reactions === void 0)
      retService.reactions = [];
    retService.reactions.push(addReaction);
  }
  return retService;
}
var readService = async (req, res) => {
  const { id } = req.params;
  console.log("THIS IS MY ID : ", id);
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (service === null)
      throw new BadRequestException("Service not found");
    const retService = await buildService(service, req);
    Logging.info(`Service ${id} read`);
    return res.status(import_http_status_codes9.StatusCodes.OK).json(retService);
  } catch (_) {
    throw new BadRequestException("Service not found");
  }
};
var updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, requiredSubscription } = req.body;
  try {
    const service = await prisma.service.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        image,
        requiredSubscription
      }
    });
    Logging.info(`Service ${id} updated`);
    return res.status(import_http_status_codes9.StatusCodes.OK).json(service);
  } catch (_) {
    throw new BadRequestException("Service not found");
  }
};
var deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Service ${id} deleted`);
    return res.status(import_http_status_codes9.StatusCodes.OK).json(service);
  } catch (_) {
    throw new BadRequestException("Service not found");
  }
};
var searchService = async (req, res) => {
  const { max } = req.query;
  const services = await prisma.service.findMany({
    take: max
  });
  const retServices = [];
  for (let i = 0; i < services.length; i++) {
    const retService = await buildService(services[i], req);
    retServices.push(retService);
  }
  Logging.info(`Services searched`);
  return res.status(import_http_status_codes9.StatusCodes.OK).json(retServices);
};

// src/routes/service.routes.ts
var import_express8 = require("express");
import_dotenv11.default.config();
var serviceRoutes = (0, import_express8.Router)();
serviceRoutes.post("/", verifyToken, validate(createServiceSchema), createService);
serviceRoutes.get("/:id", isConnected, validate(readServiceSchema), readService);
serviceRoutes.post("/:id", verifyToken, validate(updateServiceSchema), updateService);
serviceRoutes.post("/delete/:id", verifyToken, validate(deleteServiceSchema), deleteService);
serviceRoutes.get("/", isConnected, validate(searchServiceSchema), searchService);
var service_routes_default = serviceRoutes;

// src/routes/trigger.routes.ts
var import_dotenv13 = __toESM(require("dotenv"));
var import_express9 = require("express");

// src/schemas/trigger.schema.ts
var import_zod7 = require("zod");
var createTriggerSchema = (0, import_zod7.object)({
  body: (0, import_zod7.object)({
    id: (0, import_zod7.number)().optional(),
    name: (0, import_zod7.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod7.string)().optional(),
    serviceId: (0, import_zod7.number)({
      required_error: "Service id is required"
    })
  })
});
var readTriggerSchema = (0, import_zod7.object)({
  params: (0, import_zod7.object)({
    id: (0, import_zod7.string)({
      required_error: "Trigger id is required"
    })
  })
});
var updateTriggerSchema = (0, import_zod7.object)({
  params: (0, import_zod7.object)({
    id: (0, import_zod7.number)({
      required_error: "Trigger id is required"
    })
  }),
  body: (0, import_zod7.object)({
    name: (0, import_zod7.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod7.string)().optional(),
    serviceId: (0, import_zod7.number)({
      required_error: "Service id is required"
    })
  })
});
var deleteTriggerSchema = (0, import_zod7.object)({
  params: (0, import_zod7.object)({
    id: (0, import_zod7.number)({
      required_error: "Trigger id is required"
    })
  })
});
var searchTriggerSchema = (0, import_zod7.object)({
  body: (0, import_zod7.object)({
    max: (0, import_zod7.number)().optional()
  })
});

// src/controllers/trigger.controller.ts
var import_dotenv12 = __toESM(require("dotenv"));
var import_http_status_codes10 = require("http-status-codes");
import_dotenv12.default.config();
var createTrigger = async (req, res) => {
  const { id, name, description, serviceId } = req.body;
  if (id !== void 0)
    throw new BadRequestException("You cannot specify an id when creating a trigger");
  try {
    const newTrigger = await prisma.trigger.create({
      data: {
        name,
        description,
        serviceId
      }
    });
    Logging.info(`Trigger ${newTrigger.id} created`);
    return res.status(import_http_status_codes10.StatusCodes.CREATED).json(newTrigger);
  } catch (error) {
    throw new BadRequestException(`Error while creating trigger: ${error.message}`);
  }
};
async function buildTrigger(trigger) {
  const retTrigger = {
    id: trigger.id,
    name: trigger.name,
    description: trigger.description === null ? void 0 : trigger.description,
    serviceId: trigger.serviceId
  };
  const triggerInputTypes = await prisma.triggerInputType.findMany({
    where: {
      triggerId: trigger.id
    }
  });
  for (const triggerInputType of triggerInputTypes) {
    const addInputType = {
      id: triggerInputType.id,
      name: triggerInputType.name,
      type: triggerInputType.type,
      description: triggerInputType.description === null ? void 0 : triggerInputType.description,
      regex: triggerInputType.regex === null ? void 0 : triggerInputType.regex,
      mandatory: triggerInputType.mandatory,
      triggerId: triggerInputType.triggerId
    };
    if (retTrigger.inputs === void 0)
      retTrigger.inputs = [];
    retTrigger.inputs.push(addInputType);
  }
  const triggerOutputTypes = await prisma.triggerOutputType.findMany({
    where: {
      triggerId: trigger.id
    }
  });
  for (const triggerOutputType of triggerOutputTypes) {
    const addOutputType = {
      id: triggerOutputType.id,
      name: triggerOutputType.name,
      type: triggerOutputType.type,
      description: triggerOutputType.description === null ? void 0 : triggerOutputType.description,
      triggerId: triggerOutputType.triggerId
    };
    if (retTrigger.outputs === void 0)
      retTrigger.outputs = [];
    retTrigger.outputs.push(addOutputType);
  }
  return retTrigger;
}
var readTrigger = async (req, res) => {
  const { id } = req.params;
  Logging.info(`what is this -> ${id} or ${parseInt(id)}`);
  try {
    const trigger = await prisma.trigger.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (trigger === null)
      throw new BadRequestException("Trigger not found");
    const retTrigger = await buildTrigger(trigger);
    Logging.info(`Trigger ${id} read`);
    return res.status(import_http_status_codes10.StatusCodes.OK).json(retTrigger);
  } catch (_) {
    throw new BadRequestException("Trigger not found");
  }
};
var updateTrigger = async (req, res) => {
  const { id } = req.params;
  const { name, description, serviceId } = req.body;
  try {
    const updatedTrigger = await prisma.trigger.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        serviceId
      }
    });
    Logging.info(`Trigger ${id} updated`);
    return res.status(import_http_status_codes10.StatusCodes.OK).json(updatedTrigger);
  } catch (_) {
    throw new BadRequestException("Trigger not found");
  }
};
var deleteTrigger = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrigger = await prisma.trigger.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Trigger ${id} deleted`);
    return res.status(import_http_status_codes10.StatusCodes.OK).json(deletedTrigger);
  } catch (_) {
    throw new BadRequestException("Trigger not found");
  }
};
var searchTriggers = async (req, res) => {
  const { max } = req.query;
  const triggers = await prisma.trigger.findMany({
    take: max
  });
  const retTriggers = [];
  for (const trigger of triggers) {
    retTriggers.push(await buildTrigger(trigger));
  }
  Logging.info(`Triggers searched`);
  return res.status(import_http_status_codes10.StatusCodes.OK).json(retTriggers);
};

// src/routes/trigger.routes.ts
import_dotenv13.default.config();
var triggerRoutes = (0, import_express9.Router)();
triggerRoutes.post("/", verifyToken, validate(createTriggerSchema), createTrigger);
triggerRoutes.get("/:id", validate(readTriggerSchema), readTrigger);
triggerRoutes.post("/:id", verifyToken, validate(updateTriggerSchema), updateTrigger);
triggerRoutes.post("/delete/:id", verifyToken, validate(deleteTriggerSchema), deleteTrigger);
triggerRoutes.get("/", validate(searchTriggerSchema), searchTriggers);
var trigger_routes_default = triggerRoutes;

// src/routes/trirea.routes.ts
var import_dotenv15 = __toESM(require("dotenv"));
var import_express10 = require("express");

// src/schemas/trirea.schema.ts
var import_zod8 = require("zod");
var createTrireaSchema = (0, import_zod8.object)({
  body: (0, import_zod8.object)({
    id: (0, import_zod8.number)().optional(),
    enabled: (0, import_zod8.boolean)({
      required_error: "Enabled is required"
    }),
    name: (0, import_zod8.string)({
      required_error: "Name is required"
    }),
    userId: (0, import_zod8.number)().optional(),
    triggerId: (0, import_zod8.number)({
      required_error: "Trigger Id is required"
    }),
    reactionId: (0, import_zod8.number)({
      required_error: "Reaction Id is required"
    }),
    triggerInputs: (0, import_zod8.array)(
      (0, import_zod8.object)({
        id: (0, import_zod8.number)().optional(),
        value: (0, import_zod8.string)().optional(),
        trireaId: (0, import_zod8.number)().optional(),
        triggerInputTypeId: (0, import_zod8.number)({
          required_error: "Trigger Input Type Id is required in trigger inputs"
        })
      })
    ),
    reactionInputs: (0, import_zod8.array)(
      (0, import_zod8.object)({
        id: (0, import_zod8.number)().optional(),
        value: (0, import_zod8.string)().optional(),
        triggerOutputTypeId: (0, import_zod8.number)({
          required_error: "trigger Output Id is required in reaction inputs"
        }).optional(),
        trireaId: (0, import_zod8.number)().optional(),
        reactionInputTypeId: (0, import_zod8.number)({
          required_error: "Reaction Input Type Id is required in reaction inputs"
        })
      })
    )
  })
});
var readTrireaSchema = (0, import_zod8.object)({
  params: (0, import_zod8.object)({
    id: (0, import_zod8.number)({
      required_error: "Id is required"
    })
  })
});
var updateTrireaSchema = (0, import_zod8.object)({
  params: (0, import_zod8.object)({
    id: (0, import_zod8.string)({
      required_error: "Id is required"
    })
  }),
  body: (0, import_zod8.object)({
    enabled: (0, import_zod8.boolean)({
      required_error: "Enabled is required"
    }),
    userId: (0, import_zod8.number)().optional(),
    triggerId: (0, import_zod8.number)({
      required_error: "Trigger Id is required"
    }),
    reactionId: (0, import_zod8.number)({
      required_error: "Reaction Id is required"
    }),
    triggerInputs: (0, import_zod8.array)(
      (0, import_zod8.object)({
        id: (0, import_zod8.number)().optional(),
        value: (0, import_zod8.string)().optional(),
        trireaId: (0, import_zod8.number)({
          required_error: "Trirea Id is required in trigger inputs"
        }),
        triggerInputTypeId: (0, import_zod8.number)({
          required_error: "Trigger Input Type Id is required in trigger inputs"
        })
      })
    ),
    reactionInputs: (0, import_zod8.array)(
      (0, import_zod8.object)({
        id: (0, import_zod8.number)().optional(),
        value: (0, import_zod8.string)().optional(),
        triggerOutputTypeId: (0, import_zod8.number)({
          required_error: "trigger Output Id is required in reaction inputs"
        }).optional(),
        trireaId: (0, import_zod8.number)({
          required_error: "Trirea Id is required in reaction inputs"
        }),
        reactionInputTypeId: (0, import_zod8.number)({
          required_error: "Reaction Input Type Id is required in reaction inputs"
        })
      })
    )
  })
});
var deleteTrireaSchema = (0, import_zod8.object)({
  params: (0, import_zod8.object)({
    id: (0, import_zod8.string)({
      required_error: "Id is required"
    })
  })
});
var searchTrireaSchema = (0, import_zod8.object)({
  body: (0, import_zod8.object)({
    max: (0, import_zod8.number)().optional(),
    active: (0, import_zod8.number)().optional(),
    userId: (0, import_zod8.number)().optional()
  })
});

// src/controllers/trirea.controller.ts
var import_dotenv14 = __toESM(require("dotenv"));
var import_http_status_codes11 = require("http-status-codes");
import_dotenv14.default.config();
var createTrirea = async (req, res) => {
  const { id, enabled, name, userId, triggerId, reactionId, triggerInputs, reactionInputs } = req.body;
  if (id !== void 0)
    throw new BadRequestException("You cannot specify an id when creating a trirea");
  if (userId !== void 0)
    throw new BadRequestException("You cannot specify a user id when creating a trirea");
  const realUserId = req.user.id;
  if (realUserId === void 0)
    throw new BadRequestException("You must be logged in to create a trirea");
  console.log("REAL_USER_ID: ", realUserId);
  console.log("triggerId: ", triggerId);
  console.log("reactionId: ", reactionId);
  const newTrirea = await prisma.trirea.create({
    data: {
      name,
      enabled,
      userId: realUserId === void 0 ? -1 : realUserId,
      triggerId,
      reactionId
    }
  });
  const retTrirea = {
    id: newTrirea.id,
    createdAt: newTrirea.createdAt,
    updatedAt: newTrirea.updatedAt,
    prevTriggerData: newTrirea.prevTriggerData === null ? void 0 : newTrirea.prevTriggerData,
    enabled: newTrirea.enabled,
    name: newTrirea.name,
    userId: newTrirea.userId,
    triggerId: newTrirea.triggerId,
    reactionId: newTrirea.reactionId,
    triggerInputs: [],
    reactionInputs: []
  };
  for (const trigger of triggerInputs) {
    if (trigger.id !== void 0)
      throw new BadRequestException("You cannot specify an id when creating a trirea trigger input");
    const newInput = await prisma.trireaTriggerInput.create({
      data: {
        value: trigger.value,
        trireaId: newTrirea.id,
        triggerInputTypeId: trigger.triggerInputTypeId
      }
    });
    retTrirea.triggerInputs.push({
      id: newInput.id,
      value: newInput.value === null ? void 0 : newInput.value,
      trireaId: newInput.trireaId,
      triggerInputTypeId: newInput.triggerInputTypeId
    });
  }
  for (const reaction of reactionInputs) {
    if (reaction.id !== void 0)
      throw new BadRequestException("You cannot specify an id when creating a trirea reaction input");
    const newInput = await prisma.trireaReactionInput.create({
      data: {
        value: reaction.value,
        triggerOutputTypeId: reaction.triggerOutputTypeId === null ? void 0 : reaction.triggerOutputTypeId,
        trireaId: newTrirea.id,
        reactionInputTypeId: reaction.reactionInputTypeId
      }
    });
    retTrirea.reactionInputs.push({
      id: newInput.id,
      value: newInput.value === null ? void 0 : newInput.value,
      trireaId: newInput.trireaId,
      triggerOutputTypeId: newInput.triggerOutputTypeId === null ? void 0 : newInput.triggerOutputTypeId,
      reactionInputTypeId: newInput.reactionInputTypeId
    });
  }
  Logging.info(`Created trirea ${newTrirea.id}`);
  return res.status(import_http_status_codes11.StatusCodes.CREATED).json(retTrirea);
};
async function buildTrirea(trirea) {
  const retTrirea = {
    id: trirea.id,
    createdAt: trirea.createdAt,
    updatedAt: trirea.updatedAt,
    prevTriggerData: trirea.prevTriggerData === null ? void 0 : trirea.prevTriggerData,
    enabled: trirea.enabled,
    name: trirea.name,
    userId: trirea.userId,
    triggerId: trirea.triggerId,
    reactionId: trirea.reactionId,
    triggerInputs: [],
    reactionInputs: []
  };
  const triggerInputs = await prisma.trireaTriggerInput.findMany({
    where: {
      trireaId: trirea.id
    }
  });
  for (let i = 0; i < triggerInputs.length; i++) {
    const trigger = triggerInputs[i];
    retTrirea.triggerInputs.push({
      id: trigger.id,
      value: trigger.value === null ? void 0 : trigger.value,
      trireaId: trigger.trireaId,
      triggerInputTypeId: trigger.triggerInputTypeId
    });
  }
  const reactionInputs = await prisma.trireaReactionInput.findMany({
    where: {
      trireaId: trirea.id
    }
  });
  for (let i = 0; i < reactionInputs.length; i++) {
    const reaction = reactionInputs[i];
    retTrirea.reactionInputs.push({
      id: reaction.id,
      value: reaction.value === null ? void 0 : reaction.value,
      trireaId: reaction.trireaId,
      triggerOutputTypeId: reaction.triggerOutputTypeId === null ? void 0 : reaction.triggerOutputTypeId,
      reactionInputTypeId: reaction.reactionInputTypeId
    });
  }
  return retTrirea;
}
var readTrirea = async (req, res) => {
  const { id } = req.params;
  try {
    const trirea = await prisma.trirea.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (trirea === null)
      throw new BadRequestException("Trirea not found");
    const realUserId = req.user.id;
    if (realUserId !== trirea.userId)
      throw new BadRequestException("You cannot access this trirea");
    const retTrirea = await buildTrirea(trirea);
    Logging.info(`Read trirea ${trirea.id}`);
    return res.status(import_http_status_codes11.StatusCodes.OK).json(retTrirea);
  } catch (_) {
    throw new BadRequestException("Trirea not found");
  }
};
var updateTrirea = async (req, res) => {
  const { id } = req.params;
  const { enabled, userId, triggerId, reactionId, triggerInputs, reactionInputs } = req.body;
  try {
    const trirea = await prisma.trirea.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (trirea === null)
      throw new BadRequestException("Trirea not found");
    if (userId !== trirea.userId && req.user.id !== trirea.userId)
      throw new BadRequestException("You cannot update this trirea");
    for (let i = 0; i < triggerInputs.length; i++) {
      const trigger = triggerInputs[i];
      await prisma.trireaTriggerInput.upsert({
        where: {
          id: trigger.id
        },
        update: {
          value: trigger.value,
          trireaId: trirea.id,
          triggerInputTypeId: trigger.triggerInputTypeId
        },
        create: {
          value: trigger.value,
          trireaId: trirea.id,
          triggerInputTypeId: trigger.triggerInputTypeId
        }
      });
    }
    for (let i = 0; i < reactionInputs.length; i++) {
      const reaction = reactionInputs[i];
      await prisma.trireaReactionInput.upsert({
        where: {
          id: reaction.id
        },
        update: {
          value: reaction.value,
          triggerOutputTypeId: reaction.triggerOutputTypeId,
          trireaId: trirea.id,
          reactionInputTypeId: reaction.reactionInputTypeId
        },
        create: {
          value: reaction.value,
          triggerOutputTypeId: reaction.triggerOutputTypeId,
          trireaId: trirea.id,
          reactionInputTypeId: reaction.reactionInputTypeId
        }
      });
    }
    const updatedTrirea = await prisma.trirea.update({
      where: {
        id: parseInt(id)
      },
      data: {
        enabled,
        userId,
        triggerId,
        reactionId
      }
    });
    const retTrirea = await buildTrirea(updatedTrirea);
    Logging.info(`Updated trirea ${updatedTrirea.id}`);
    return res.status(import_http_status_codes11.StatusCodes.OK).json(retTrirea);
  } catch (_) {
    throw new BadRequestException("Trirea not found");
  }
};
var deleteTrirea = async (req, res) => {
  const { id } = req.params;
  Logging.info(`Deleting trirea ${parseInt(id)}`);
  try {
    const trirea = await prisma.trirea.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (trirea === null) {
      throw new BadRequestException("Trirea not found");
    }
    if (req.user.id !== trirea.userId) {
      throw new BadRequestException("You cannot delete this trirea");
    }
    await prisma.trireaTriggerInput.deleteMany({
      where: {
        trireaId: parseInt(id)
      }
    });
    await prisma.trireaReactionInput.deleteMany({
      where: {
        trireaId: parseInt(id)
      }
    });
    const deletedTrirea = await prisma.trirea.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`skjhssn,slnk ${deletedTrirea == null ? void 0 : deletedTrirea.id}`);
    Logging.info(`Deleted trirea ${deletedTrirea.id}`);
    return res.status(import_http_status_codes11.StatusCodes.OK).json(deletedTrirea);
  } catch (_) {
    throw new BadRequestException("Trirea not found");
  }
};
var searchTrirea = async (req, res) => {
  const { max, userId } = req.body;
  if (userId !== void 0 && req.user.id !== userId)
    throw new BadRequestException("You search for others trireas");
  const trireas = await prisma.trirea.findMany({
    where: {
      userId: req.user.id ? req.user.id : void 0
    },
    take: max
  });
  const retTrireas = [];
  for (let i = 0; i < trireas.length; i++) {
    const retTrirea = await buildTrirea(trireas[i]);
    retTrireas.push(retTrirea);
  }
  Logging.info(`Searched trireas for user ${userId}`);
  return res.status(import_http_status_codes11.StatusCodes.OK).json(retTrireas);
};

// src/routes/trirea.routes.ts
import_dotenv15.default.config();
var trireaRoutes = (0, import_express10.Router)();
trireaRoutes.post("/", verifyToken, validate(createTrireaSchema), createTrirea);
trireaRoutes.get("/:id", verifyToken, validate(readTrireaSchema), readTrirea);
trireaRoutes.post("/:id", verifyToken, validate(updateTrireaSchema), updateTrirea);
trireaRoutes.post("/delete/:id", verifyToken, validate(deleteTrireaSchema), deleteTrirea);
trireaRoutes.get("/", verifyToken, validate(searchTrireaSchema), searchTrirea);
var trirea_routes_default = trireaRoutes;

// src/routes/reaction.routes.ts
var import_express11 = require("express");

// src/schemas/reaction.schema.ts
var import_zod9 = require("zod");
var createReactionSchema = (0, import_zod9.object)({
  body: (0, import_zod9.object)({
    id: (0, import_zod9.number)().optional(),
    name: (0, import_zod9.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod9.string)().optional(),
    serviceId: (0, import_zod9.number)({
      required_error: "Service Id is required"
    })
  })
});
var readReactionSchema = (0, import_zod9.object)({
  params: (0, import_zod9.object)({
    id: (0, import_zod9.string)({
      required_error: "Id is required"
    })
  })
});
var updateReactionSchema = (0, import_zod9.object)({
  params: (0, import_zod9.object)({
    id: (0, import_zod9.number)({
      required_error: "Id is required"
    })
  }),
  body: (0, import_zod9.object)({
    name: (0, import_zod9.string)({
      required_error: "Name is required"
    }),
    description: (0, import_zod9.string)().optional(),
    serviceId: (0, import_zod9.number)({
      required_error: "Service Id is required"
    })
  })
});
var deleteReactionSchema = (0, import_zod9.object)({
  params: (0, import_zod9.object)({
    id: (0, import_zod9.number)({
      required_error: "Id is required"
    })
  })
});
var searchReactionSchema = (0, import_zod9.object)({
  body: (0, import_zod9.object)({
    max: (0, import_zod9.number)().optional()
  })
});

// src/controllers/reaction.controller.ts
var import_dotenv16 = __toESM(require("dotenv"));
var import_http_status_codes12 = require("http-status-codes");
import_dotenv16.default.config();
var createReaction = async (req, res) => {
  const { id, name, description, serviceId } = req.body;
  if (id !== void 0)
    throw new BadRequestException("You cannot specify an id when creating a reaction");
  const newReaction = await prisma.reaction.create({
    data: {
      name,
      description,
      serviceId
    }
  });
  Logging.info(`Reaction ${newReaction.id} created`);
  return res.status(import_http_status_codes12.StatusCodes.CREATED).json(newReaction);
};
async function buildReaction(reaction) {
  const retReaction = {
    id: reaction.id,
    name: reaction.name,
    description: reaction.description === null ? void 0 : reaction.description,
    serviceId: reaction.serviceId
  };
  const reactionInputTypes = await prisma.reactionInputType.findMany({
    where: {
      reactionId: reaction.id
    }
  });
  for (const reactionInputType of reactionInputTypes) {
    const addInputType = {
      id: reactionInputType.id,
      name: reactionInputType.name,
      type: reactionInputType.type,
      description: reactionInputType.description === null ? void 0 : reactionInputType.description,
      regex: reactionInputType.regex === null ? void 0 : reactionInputType.regex,
      mandatory: reactionInputType.mandatory,
      reactionId: reactionInputType.reactionId
    };
    if (retReaction.inputs === void 0)
      retReaction.inputs = [];
    retReaction.inputs.push(addInputType);
  }
  return retReaction;
}
var readReaction = async (req, res) => {
  const { id } = req.params;
  try {
    const reaction = await prisma.reaction.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (reaction === null)
      throw new BadRequestException("Reaction not found");
    const retReaction = await buildReaction(reaction);
    Logging.info(`Reaction ${id} read`);
    return res.status(import_http_status_codes12.StatusCodes.OK).json(retReaction);
  } catch (_) {
    throw new BadRequestException("Reaction not found");
  }
};
var updateReaction = async (req, res) => {
  const { id } = req.params;
  const { name, description, serviceId } = req.body;
  try {
    const updatedReaction = await prisma.reaction.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        serviceId
      }
    });
    Logging.info(`Reaction ${id} updated`);
    return res.status(import_http_status_codes12.StatusCodes.OK).json(updatedReaction);
  } catch (_) {
    throw new BadRequestException("Reaction not found");
  }
};
var deleteReaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReaction = await prisma.reaction.delete({
      where: {
        id: parseInt(id)
      }
    });
    Logging.info(`Reaction ${id} deleted`);
    return res.status(import_http_status_codes12.StatusCodes.OK).json(deletedReaction);
  } catch (_) {
    throw new BadRequestException("Reaction not found");
  }
};
var searchReaction = async (req, res) => {
  const { max } = req.query;
  const reactions = await prisma.reaction.findMany({
    take: max
  });
  const retReactions = [];
  for (const reaction of reactions) {
    const retReaction = await buildReaction(reaction);
    retReactions.push(retReaction);
  }
  Logging.info(`Reactions searched`);
  return res.status(import_http_status_codes12.StatusCodes.OK).json(retReactions);
};

// src/routes/reaction.routes.ts
var reactionRoutes = (0, import_express11.Router)();
reactionRoutes.post("/", verifyToken, validate(createReactionSchema), createReaction);
reactionRoutes.get("/:id", validate(readReactionSchema), readReaction);
reactionRoutes.post("/:id", verifyToken, validate(updateReactionSchema), updateReaction);
reactionRoutes.post("/delete/:id", verifyToken, validate(deleteReactionSchema), deleteReaction);
reactionRoutes.get("/", validate(searchReactionSchema), searchReaction);
var reaction_routes_default = reactionRoutes;

// src/routes/subscription.routes.ts
var import_dotenv18 = __toESM(require("dotenv"));
var import_express12 = require("express");

// src/controllers/subscription.controller.ts
var import_dotenv17 = __toESM(require("dotenv"));
var import_http_status_codes13 = require("http-status-codes");
import_dotenv17.default.config();
var setSubscribed = async (req, res) => {
  const { serviceId, subscribed } = req.body;
  const userId = req.user.id;
  try {
    if (subscribed) {
      await prisma.userService.create({
        data: {
          userId,
          serviceId
        }
      });
    } else {
      await prisma.userService.delete({
        where: {
          userId_serviceId: {
            userId,
            serviceId
          }
        }
      });
    }
  } catch (_) {
    throw new BadRequestException("Error while setting subscription");
  }
  return res.status(import_http_status_codes13.StatusCodes.OK).json({ message: "Subscription updated" });
};

// src/schemas/subscription.schema.ts
var import_zod10 = require("zod");
var setSubscribedSchema = (0, import_zod10.object)({
  body: (0, import_zod10.object)({
    serviceId: (0, import_zod10.number)({
      required_error: "Service id is required"
    }),
    subscribed: (0, import_zod10.boolean)({
      required_error: "Subscribed is required"
    })
  })
});

// src/routes/subscription.routes.ts
import_dotenv18.default.config();
var subscriptionRoutes = (0, import_express12.Router)();
subscriptionRoutes.post("/", verifyToken, validate(setSubscribedSchema), setSubscribed);
var subscription_routes_default = subscriptionRoutes;

// src/routes/client.apk.route.ts
var import_express13 = require("express");

// src/controllers/client.apk.controller.ts
var getFile = async (_, res) => {
  const file = "/tmp/build/client.apk";
  res.download(file);
};

// src/routes/client.apk.route.ts
var clientApkRoutes = (0, import_express13.Router)();
clientApkRoutes.get("/", getFile);
var client_apk_route_default = clientApkRoutes;

// src/routes/index.ts
var routes = (0, import_express14.Router)();
routes.use("/auth", auth_routes_default);
routes.use("/user", user_routes_default);
routes.use("/output/trigger", trigger_output_routes_default);
routes.use("/input/trigger", trigger_input_routes_default);
routes.use("/input/reaction", reaction_input_routes_default);
routes.use("/reaction", reaction_routes_default);
routes.use("/sessions", session_routes_default);
routes.use("/service", service_routes_default);
routes.use("/trigger", trigger_routes_default);
routes.use("/trirea", trirea_routes_default);
routes.use("/subscription", subscription_routes_default);
routes.use("/client.apk", client_apk_route_default);
var routes_default = routes;

// src/index.ts
var import_config7 = __toESM(require("config"));

// src/jobs/handler.job.ts
var import_node_cron = __toESM(require("node-cron"));
var import_async = require("async");
import_node_cron.default.schedule("*/5 * * * * *", async () => {
  const date = new Date();
  const trireas = await getTrireas();
  let triggered = false;
  await (0, import_async.each)(trireas, async (trirea) => {
    triggered = false;
    const trigger = await loadTrigger(trirea.trigger);
    const userServiceTrigger = await getUserServiceTrigger(trirea.userId, trirea.trigger.service.name);
    const userServiceReaction = await getUserServiceReaction(trirea.userId, trirea.reaction.service.name);
    triggered = await trigger.start(trirea.id, trirea.trireaTriggerInputs, userServiceTrigger, trirea.prevTriggerData);
    if (triggered) {
      const triggerOutputs = await getReactionsInputs(trirea.id);
      const reaction = await loadReaction(trirea.reaction);
      await reaction.start(trirea.id, triggerOutputs, userServiceReaction);
    }
  });
  Logging.info("Trirea handler: " + date);
});
var loadReaction = async (reaction) => {
  const reactionPath = `~/jobs/reactions/${reaction.service.name}/${reaction.name}.reaction`;
  return await import(reactionPath);
};
var loadTrigger = async (trigger) => {
  const triggerPath = `~/jobs/triggers/${trigger.service.name}/${trigger.name}.trigger`;
  return await import(triggerPath);
};
var getTrireas = async () => {
  return prisma.trirea.findMany(
    {
      where: {
        enabled: true
      },
      select: {
        id: true,
        prevTriggerData: true,
        trigger: {
          select: {
            name: true,
            service: {
              select: {
                name: true
              }
            }
          }
        },
        reaction: {
          select: {
            name: true,
            service: {
              select: {
                name: true
              }
            }
          }
        },
        trireaTriggerInputs: {
          select: {
            value: true,
            triggerInputType: {
              select: {
                name: true,
                type: true
              }
            }
          }
        },
        trireaReactionInputs: {
          select: {
            value: true,
            reactionInputType: {
              select: {
                name: true,
                type: true
              }
            }
          }
        },
        userId: true
      }
    }
  );
};
var getUserServiceTrigger = async (userId, triggerService) => {
  return prisma.userService.findMany({
    where: {
      userId,
      service: {
        name: triggerService
      }
    }
  });
};
var getReactionsInputs = async (trireaId) => {
  return prisma.trireaReactionInput.findMany({
    where: {
      trireaId
    },
    select: {
      value: true,
      reactionInputType: {
        select: {
          name: true,
          type: true
        }
      }
    }
  });
};
var getUserServiceReaction = async (userId, reactionService) => {
  return prisma.userService.findMany({
    where: {
      userId,
      service: {
        name: reactionService
      }
    }
  });
};

// src/index.ts
import_dotenv19.default.config();
var port = import_config7.default.get("port");
var app = (0, import_express15.default)();
var fs = require("fs");
var http = require("http");
var https = require("https");
app.use((0, import_cors.default)({ origin: "*" }));
app.use((0, import_cookie_parser.default)());
app.use(import_express15.default.json());
app.use(import_express15.default.urlencoded({ extended: false }));
app.use("/", about_routes_default);
app.use("/api", routes_default);
app.all("*", UnknowRoutesHandler);
app.use(ExceptionsHandler);
var httpServer = http.createServer(app);
httpServer.listen(port);
if (fs.existsSync("/app/certs/privkey.pem")) {
  const privateKey = fs.readFileSync("/app/certs/privkey.pem", "utf8");
  const certificate = fs.readFileSync("/app/certs/cert.pem", "utf8");
  const ca = fs.readFileSync("/app/certs/chain.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate, ca };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(8443);
}
module.exports = app;
