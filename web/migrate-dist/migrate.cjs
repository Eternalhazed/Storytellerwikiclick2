"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/work/import.meta.url-polyfill.js
var import_meta_url;
var init_import_meta_url_polyfill = __esm({
  "src/work/import.meta.url-polyfill.js"() {
    "use strict";
    import_meta_url = typeof document === "undefined" ? new (require("url".replace("", ""))).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
  }
});

// ../node_modules/better-sqlite3/lib/util.js
var require_util = __commonJS({
  "../node_modules/better-sqlite3/lib/util.js"(exports2) {
    "use strict";
    init_import_meta_url_polyfill();
    exports2.getBooleanOption = (options, key) => {
      let value = false;
      if (key in options && typeof (value = options[key]) !== "boolean") {
        throw new TypeError(`Expected the "${key}" option to be a boolean`);
      }
      return value;
    };
    exports2.cppdb = Symbol();
    exports2.inspect = Symbol.for("nodejs.util.inspect.custom");
  }
});

// ../node_modules/better-sqlite3/lib/sqlite-error.js
var require_sqlite_error = __commonJS({
  "../node_modules/better-sqlite3/lib/sqlite-error.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var descriptor = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
    function SqliteError(message, code) {
      if (new.target !== SqliteError) {
        return new SqliteError(message, code);
      }
      if (typeof code !== "string") {
        throw new TypeError("Expected second argument to be a string");
      }
      Error.call(this, message);
      descriptor.value = "" + message;
      Object.defineProperty(this, "message", descriptor);
      Error.captureStackTrace(this, SqliteError);
      this.code = code;
    }
    Object.setPrototypeOf(SqliteError, Error);
    Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
    Object.defineProperty(SqliteError.prototype, "name", descriptor);
    module2.exports = SqliteError;
  }
});

// ../node_modules/file-uri-to-path/index.js
var require_file_uri_to_path = __commonJS({
  "../node_modules/file-uri-to-path/index.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    var sep = require("path").sep || "/";
    module2.exports = fileUriToPath;
    function fileUriToPath(uri) {
      if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) {
        throw new TypeError("must pass in a file:// URI to convert to a file path");
      }
      var rest = decodeURI(uri.substring(7));
      var firstSlash = rest.indexOf("/");
      var host = rest.substring(0, firstSlash);
      var path = rest.substring(firstSlash + 1);
      if ("localhost" == host) host = "";
      if (host) {
        host = sep + sep + host;
      }
      path = path.replace(/^(.+)\|/, "$1:");
      if (sep == "\\") {
        path = path.replace(/\//g, "\\");
      }
      if (/^.+\:/.test(path)) {
      } else {
        path = sep + path;
      }
      return host + path;
    }
  }
});

// ../node_modules/bindings/bindings.js
var require_bindings = __commonJS({
  "../node_modules/bindings/bindings.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    var fs = require("fs");
    var path = require("path");
    var fileURLToPath = require_file_uri_to_path();
    var join4 = path.join;
    var dirname = path.dirname;
    var exists = fs.accessSync && function(path2) {
      try {
        fs.accessSync(path2);
      } catch (e) {
        return false;
      }
      return true;
    } || fs.existsSync || path.existsSync;
    var defaults = {
      arrow: process.env.NODE_BINDINGS_ARROW || " \u2192 ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function bindings(opts) {
      if (typeof opts == "string") {
        opts = { bindings: opts };
      } else if (!opts) {
        opts = {};
      }
      Object.keys(defaults).map(function(i2) {
        if (!(i2 in opts)) opts[i2] = defaults[i2];
      });
      if (!opts.module_root) {
        opts.module_root = exports2.getRoot(exports2.getFileName());
      }
      if (path.extname(opts.bindings) != ".node") {
        opts.bindings += ".node";
      }
      var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      var tries = [], i = 0, l = opts.try.length, n, b, err;
      for (; i < l; i++) {
        n = join4.apply(
          null,
          opts.try[i].map(function(p) {
            return opts[p] || p;
          })
        );
        tries.push(n);
        try {
          b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
          if (!opts.path) {
            b.path = n;
          }
          return b;
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) {
            throw e;
          }
        }
      }
      err = new Error(
        "Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
          return opts.arrow + a;
        }).join("\n")
      );
      err.tries = tries;
      throw err;
    }
    module2.exports = exports2 = bindings;
    exports2.getFileName = function getFileName(calling_file) {
      var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
      Error.stackTraceLimit = 10;
      Error.prepareStackTrace = function(e, st) {
        for (var i = 0, l = st.length; i < l; i++) {
          fileName = st[i].getFileName();
          if (fileName !== __filename) {
            if (calling_file) {
              if (fileName !== calling_file) {
                return;
              }
            } else {
              return;
            }
          }
        }
      };
      Error.captureStackTrace(dummy);
      dummy.stack;
      Error.prepareStackTrace = origPST;
      Error.stackTraceLimit = origSTL;
      var fileSchema = "file://";
      if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath(fileName);
      }
      return fileName;
    };
    exports2.getRoot = function getRoot(file) {
      var dir = dirname(file), prev;
      while (true) {
        if (dir === ".") {
          dir = process.cwd();
        }
        if (exists(join4(dir, "package.json")) || exists(join4(dir, "node_modules"))) {
          return dir;
        }
        if (prev === dir) {
          throw new Error(
            'Could not find module root given file: "' + file + '". Do you have a `package.json` file? '
          );
        }
        prev = dir;
        dir = join4(dir, "..");
      }
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/wrappers.js
var require_wrappers = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/wrappers.js"(exports2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { cppdb } = require_util();
    exports2.prepare = function prepare(sql) {
      return this[cppdb].prepare(sql, this, false);
    };
    exports2.exec = function exec(sql) {
      this[cppdb].exec(sql);
      return this;
    };
    exports2.close = function close() {
      this[cppdb].close();
      return this;
    };
    exports2.loadExtension = function loadExtension(...args) {
      this[cppdb].loadExtension(...args);
      return this;
    };
    exports2.defaultSafeIntegers = function defaultSafeIntegers(...args) {
      this[cppdb].defaultSafeIntegers(...args);
      return this;
    };
    exports2.unsafeMode = function unsafeMode(...args) {
      this[cppdb].unsafeMode(...args);
      return this;
    };
    exports2.getters = {
      name: {
        get: function name() {
          return this[cppdb].name;
        },
        enumerable: true
      },
      open: {
        get: function open() {
          return this[cppdb].open;
        },
        enumerable: true
      },
      inTransaction: {
        get: function inTransaction() {
          return this[cppdb].inTransaction;
        },
        enumerable: true
      },
      readonly: {
        get: function readonly() {
          return this[cppdb].readonly;
        },
        enumerable: true
      },
      memory: {
        get: function memory() {
          return this[cppdb].memory;
        },
        enumerable: true
      }
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/transaction.js
var require_transaction = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/transaction.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { cppdb } = require_util();
    var controllers = /* @__PURE__ */ new WeakMap();
    module2.exports = function transaction(fn) {
      if (typeof fn !== "function") throw new TypeError("Expected first argument to be a function");
      const db2 = this[cppdb];
      const controller = getController(db2, this);
      const { apply } = Function.prototype;
      const properties = {
        default: { value: wrapTransaction(apply, fn, db2, controller.default) },
        deferred: { value: wrapTransaction(apply, fn, db2, controller.deferred) },
        immediate: { value: wrapTransaction(apply, fn, db2, controller.immediate) },
        exclusive: { value: wrapTransaction(apply, fn, db2, controller.exclusive) },
        database: { value: this, enumerable: true }
      };
      Object.defineProperties(properties.default.value, properties);
      Object.defineProperties(properties.deferred.value, properties);
      Object.defineProperties(properties.immediate.value, properties);
      Object.defineProperties(properties.exclusive.value, properties);
      return properties.default.value;
    };
    var getController = (db2, self) => {
      let controller = controllers.get(db2);
      if (!controller) {
        const shared = {
          commit: db2.prepare("COMMIT", self, false),
          rollback: db2.prepare("ROLLBACK", self, false),
          savepoint: db2.prepare("SAVEPOINT `	_bs3.	`", self, false),
          release: db2.prepare("RELEASE `	_bs3.	`", self, false),
          rollbackTo: db2.prepare("ROLLBACK TO `	_bs3.	`", self, false)
        };
        controllers.set(db2, controller = {
          default: Object.assign({ begin: db2.prepare("BEGIN", self, false) }, shared),
          deferred: Object.assign({ begin: db2.prepare("BEGIN DEFERRED", self, false) }, shared),
          immediate: Object.assign({ begin: db2.prepare("BEGIN IMMEDIATE", self, false) }, shared),
          exclusive: Object.assign({ begin: db2.prepare("BEGIN EXCLUSIVE", self, false) }, shared)
        });
      }
      return controller;
    };
    var wrapTransaction = (apply, fn, db2, { begin, commit, rollback, savepoint, release, rollbackTo }) => function sqliteTransaction() {
      let before, after, undo;
      if (db2.inTransaction) {
        before = savepoint;
        after = release;
        undo = rollbackTo;
      } else {
        before = begin;
        after = commit;
        undo = rollback;
      }
      before.run();
      try {
        const result = apply.call(fn, this, arguments);
        after.run();
        return result;
      } catch (ex) {
        if (db2.inTransaction) {
          undo.run();
          if (undo !== rollback) after.run();
        }
        throw ex;
      }
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/pragma.js
var require_pragma = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/pragma.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function pragma(source, options) {
      if (options == null) options = {};
      if (typeof source !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      const simple = getBooleanOption(options, "simple");
      const stmt = this[cppdb].prepare(`PRAGMA ${source}`, this, true);
      return simple ? stmt.pluck().get() : stmt.all();
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/backup.js
var require_backup = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/backup.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var fs = require("fs");
    var path = require("path");
    var { promisify } = require("util");
    var { cppdb } = require_util();
    var fsAccess = promisify(fs.access);
    module2.exports = async function backup(filename, options) {
      if (options == null) options = {};
      if (typeof filename !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      filename = filename.trim();
      const attachedName = "attached" in options ? options.attached : "main";
      const handler = "progress" in options ? options.progress : null;
      if (!filename) throw new TypeError("Backup filename cannot be an empty string");
      if (filename === ":memory:") throw new TypeError('Invalid backup filename ":memory:"');
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      if (handler != null && typeof handler !== "function") throw new TypeError('Expected the "progress" option to be a function');
      await fsAccess(path.dirname(filename)).catch(() => {
        throw new TypeError("Cannot save backup because the directory does not exist");
      });
      const isNewFile = await fsAccess(filename).then(() => false, () => true);
      return runBackup(this[cppdb].backup(this, attachedName, filename, isNewFile), handler || null);
    };
    var runBackup = (backup, handler) => {
      let rate = 0;
      let useDefault = true;
      return new Promise((resolve, reject) => {
        setImmediate(function step() {
          try {
            const progress = backup.transfer(rate);
            if (!progress.remainingPages) {
              backup.close();
              resolve(progress);
              return;
            }
            if (useDefault) {
              useDefault = false;
              rate = 100;
            }
            if (handler) {
              const ret = handler(progress);
              if (ret !== void 0) {
                if (typeof ret === "number" && ret === ret) rate = Math.max(0, Math.min(2147483647, Math.round(ret)));
                else throw new TypeError("Expected progress callback to return a number or undefined");
              }
            }
            setImmediate(step);
          } catch (err) {
            backup.close();
            reject(err);
          }
        });
      });
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/serialize.js
var require_serialize = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/serialize.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { cppdb } = require_util();
    module2.exports = function serialize(options) {
      if (options == null) options = {};
      if (typeof options !== "object") throw new TypeError("Expected first argument to be an options object");
      const attachedName = "attached" in options ? options.attached : "main";
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      return this[cppdb].serialize(attachedName);
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/function.js
var require_function = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/function.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineFunction(name, options, fn) {
      if (options == null) options = {};
      if (typeof options === "function") {
        fn = options;
        options = {};
      }
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof fn !== "function") throw new TypeError("Expected last argument to be a function");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options, "deterministic");
      const directOnly = getBooleanOption(options, "directOnly");
      const varargs = getBooleanOption(options, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = fn.length;
        if (!Number.isInteger(argCount) || argCount < 0) throw new TypeError("Expected function.length to be a positive integer");
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].function(fn, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/aggregate.js
var require_aggregate = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/aggregate.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineAggregate(name, options) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object" || options === null) throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const start = "start" in options ? options.start : null;
      const step = getFunctionOption(options, "step", true);
      const inverse = getFunctionOption(options, "inverse", false);
      const result = getFunctionOption(options, "result", false);
      const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options, "deterministic");
      const directOnly = getBooleanOption(options, "directOnly");
      const varargs = getBooleanOption(options, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = Math.max(getLength(step), inverse ? getLength(inverse) : 0);
        if (argCount > 0) argCount -= 1;
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].aggregate(start, step, inverse, result, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
    var getFunctionOption = (options, key, required) => {
      const value = key in options ? options[key] : null;
      if (typeof value === "function") return value;
      if (value != null) throw new TypeError(`Expected the "${key}" option to be a function`);
      if (required) throw new TypeError(`Missing required option "${key}"`);
      return null;
    };
    var getLength = ({ length }) => {
      if (Number.isInteger(length) && length >= 0) return length;
      throw new TypeError("Expected function.length to be a positive integer");
    };
  }
});

// ../node_modules/better-sqlite3/lib/methods/table.js
var require_table = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/table.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { cppdb } = require_util();
    module2.exports = function defineTable(name, factory) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (!name) throw new TypeError("Virtual table module name cannot be an empty string");
      let eponymous = false;
      if (typeof factory === "object" && factory !== null) {
        eponymous = true;
        factory = defer(parseTableDefinition(factory, "used", name));
      } else {
        if (typeof factory !== "function") throw new TypeError("Expected second argument to be a function or a table definition object");
        factory = wrapFactory(factory);
      }
      this[cppdb].table(factory, name, eponymous);
      return this;
    };
    function wrapFactory(factory) {
      return function virtualTableFactory(moduleName, databaseName, tableName, ...args) {
        const thisObject = {
          module: moduleName,
          database: databaseName,
          table: tableName
        };
        const def = apply.call(factory, thisObject, args);
        if (typeof def !== "object" || def === null) {
          throw new TypeError(`Virtual table module "${moduleName}" did not return a table definition object`);
        }
        return parseTableDefinition(def, "returned", moduleName);
      };
    }
    function parseTableDefinition(def, verb, moduleName) {
      if (!hasOwnProperty.call(def, "rows")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "rows" property`);
      }
      if (!hasOwnProperty.call(def, "columns")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "columns" property`);
      }
      const rows = def.rows;
      if (typeof rows !== "function" || Object.getPrototypeOf(rows) !== GeneratorFunctionPrototype) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "rows" property (should be a generator function)`);
      }
      let columns = def.columns;
      if (!Array.isArray(columns) || !(columns = [...columns]).every((x) => typeof x === "string")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "columns" property (should be an array of strings)`);
      }
      if (columns.length !== new Set(columns).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate column names`);
      }
      if (!columns.length) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with zero columns`);
      }
      let parameters;
      if (hasOwnProperty.call(def, "parameters")) {
        parameters = def.parameters;
        if (!Array.isArray(parameters) || !(parameters = [...parameters]).every((x) => typeof x === "string")) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "parameters" property (should be an array of strings)`);
        }
      } else {
        parameters = inferParameters(rows);
      }
      if (parameters.length !== new Set(parameters).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate parameter names`);
      }
      if (parameters.length > 32) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with more than the maximum number of 32 parameters`);
      }
      for (const parameter of parameters) {
        if (columns.includes(parameter)) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with column "${parameter}" which was ambiguously defined as both a column and parameter`);
        }
      }
      let safeIntegers = 2;
      if (hasOwnProperty.call(def, "safeIntegers")) {
        const bool = def.safeIntegers;
        if (typeof bool !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
        }
        safeIntegers = +bool;
      }
      let directOnly = false;
      if (hasOwnProperty.call(def, "directOnly")) {
        directOnly = def.directOnly;
        if (typeof directOnly !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "directOnly" property (should be a boolean)`);
        }
      }
      const columnDefinitions = [
        ...parameters.map(identifier).map((str) => `${str} HIDDEN`),
        ...columns.map(identifier)
      ];
      return [
        `CREATE TABLE x(${columnDefinitions.join(", ")});`,
        wrapGenerator(rows, new Map(columns.map((x, i) => [x, parameters.length + i])), moduleName),
        parameters,
        safeIntegers,
        directOnly
      ];
    }
    function wrapGenerator(generator, columnMap, moduleName) {
      return function* virtualTable(...args) {
        const output = args.map((x) => Buffer.isBuffer(x) ? Buffer.from(x) : x);
        for (let i = 0; i < columnMap.size; ++i) {
          output.push(null);
        }
        for (const row of generator(...args)) {
          if (Array.isArray(row)) {
            extractRowArray(row, output, columnMap.size, moduleName);
            yield output;
          } else if (typeof row === "object" && row !== null) {
            extractRowObject(row, output, columnMap, moduleName);
            yield output;
          } else {
            throw new TypeError(`Virtual table module "${moduleName}" yielded something that isn't a valid row object`);
          }
        }
      };
    }
    function extractRowArray(row, output, columnCount, moduleName) {
      if (row.length !== columnCount) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an incorrect number of columns`);
      }
      const offset = output.length - columnCount;
      for (let i = 0; i < columnCount; ++i) {
        output[i + offset] = row[i];
      }
    }
    function extractRowObject(row, output, columnMap, moduleName) {
      let count = 0;
      for (const key of Object.keys(row)) {
        const index = columnMap.get(key);
        if (index === void 0) {
          throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an undeclared column "${key}"`);
        }
        output[index] = row[key];
        count += 1;
      }
      if (count !== columnMap.size) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with missing columns`);
      }
    }
    function inferParameters({ length }) {
      if (!Number.isInteger(length) || length < 0) {
        throw new TypeError("Expected function.length to be a positive integer");
      }
      const params = [];
      for (let i = 0; i < length; ++i) {
        params.push(`$${i + 1}`);
      }
      return params;
    }
    var { hasOwnProperty } = Object.prototype;
    var { apply } = Function.prototype;
    var GeneratorFunctionPrototype = Object.getPrototypeOf(function* () {
    });
    var identifier = (str) => `"${str.replace(/"/g, '""')}"`;
    var defer = (x) => () => x;
  }
});

// ../node_modules/better-sqlite3/lib/methods/inspect.js
var require_inspect = __commonJS({
  "../node_modules/better-sqlite3/lib/methods/inspect.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var DatabaseInspection = function Database2() {
    };
    module2.exports = function inspect(depth, opts) {
      return Object.assign(new DatabaseInspection(), this);
    };
  }
});

// ../node_modules/better-sqlite3/lib/database.js
var require_database = __commonJS({
  "../node_modules/better-sqlite3/lib/database.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var fs = require("fs");
    var path = require("path");
    var util = require_util();
    var SqliteError = require_sqlite_error();
    var DEFAULT_ADDON;
    function Database2(filenameGiven, options) {
      if (new.target == null) {
        return new Database2(filenameGiven, options);
      }
      let buffer;
      if (Buffer.isBuffer(filenameGiven)) {
        buffer = filenameGiven;
        filenameGiven = ":memory:";
      }
      if (filenameGiven == null) filenameGiven = "";
      if (options == null) options = {};
      if (typeof filenameGiven !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      if ("readOnly" in options) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
      if ("memory" in options) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
      const filename = filenameGiven.trim();
      const anonymous = filename === "" || filename === ":memory:";
      const readonly = util.getBooleanOption(options, "readonly");
      const fileMustExist = util.getBooleanOption(options, "fileMustExist");
      const timeout = "timeout" in options ? options.timeout : 5e3;
      const verbose = "verbose" in options ? options.verbose : null;
      const nativeBinding = "nativeBinding" in options ? options.nativeBinding : null;
      if (readonly && anonymous && !buffer) throw new TypeError("In-memory/temporary databases cannot be readonly");
      if (!Number.isInteger(timeout) || timeout < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
      if (timeout > 2147483647) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
      if (verbose != null && typeof verbose !== "function") throw new TypeError('Expected the "verbose" option to be a function');
      if (nativeBinding != null && typeof nativeBinding !== "string" && typeof nativeBinding !== "object") throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
      let addon;
      if (nativeBinding == null) {
        addon = DEFAULT_ADDON || (DEFAULT_ADDON = require_bindings()("better_sqlite3.node"));
      } else if (typeof nativeBinding === "string") {
        const requireFunc = typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : require;
        addon = requireFunc(path.resolve(nativeBinding).replace(/(\.node)?$/, ".node"));
      } else {
        addon = nativeBinding;
      }
      if (!addon.isInitialized) {
        addon.setErrorConstructor(SqliteError);
        addon.isInitialized = true;
      }
      if (!anonymous && !fs.existsSync(path.dirname(filename))) {
        throw new TypeError("Cannot open database because the directory does not exist");
      }
      Object.defineProperties(this, {
        [util.cppdb]: { value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null) },
        ...wrappers.getters
      });
    }
    var wrappers = require_wrappers();
    Database2.prototype.prepare = wrappers.prepare;
    Database2.prototype.transaction = require_transaction();
    Database2.prototype.pragma = require_pragma();
    Database2.prototype.backup = require_backup();
    Database2.prototype.serialize = require_serialize();
    Database2.prototype.function = require_function();
    Database2.prototype.aggregate = require_aggregate();
    Database2.prototype.table = require_table();
    Database2.prototype.loadExtension = wrappers.loadExtension;
    Database2.prototype.exec = wrappers.exec;
    Database2.prototype.close = wrappers.close;
    Database2.prototype.defaultSafeIntegers = wrappers.defaultSafeIntegers;
    Database2.prototype.unsafeMode = wrappers.unsafeMode;
    Database2.prototype[util.inspect] = require_inspect();
    module2.exports = Database2;
  }
});

// ../node_modules/better-sqlite3/lib/index.js
var require_lib = __commonJS({
  "../node_modules/better-sqlite3/lib/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = require_database();
    module2.exports.SqliteError = require_sqlite_error();
  }
});

// ../node_modules/pino-std-serializers/lib/err-helpers.js
var require_err_helpers = __commonJS({
  "../node_modules/pino-std-serializers/lib/err-helpers.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var isErrorLike = (err) => {
      return err && typeof err.message === "string";
    };
    var getErrorCause = (err) => {
      if (!err) return;
      const cause = err.cause;
      if (typeof cause === "function") {
        const causeResult = err.cause();
        return isErrorLike(causeResult) ? causeResult : void 0;
      } else {
        return isErrorLike(cause) ? cause : void 0;
      }
    };
    var _stackWithCauses = (err, seen) => {
      if (!isErrorLike(err)) return "";
      const stack = err.stack || "";
      if (seen.has(err)) {
        return stack + "\ncauses have become circular...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        return stack + "\ncaused by: " + _stackWithCauses(cause, seen);
      } else {
        return stack;
      }
    };
    var stackWithCauses = (err) => _stackWithCauses(err, /* @__PURE__ */ new Set());
    var _messageWithCauses = (err, seen, skip) => {
      if (!isErrorLike(err)) return "";
      const message = skip ? "" : err.message || "";
      if (seen.has(err)) {
        return message + ": ...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        const skipIfVErrorStyleCause = typeof err.cause === "function";
        return message + (skipIfVErrorStyleCause ? "" : ": ") + _messageWithCauses(cause, seen, skipIfVErrorStyleCause);
      } else {
        return message;
      }
    };
    var messageWithCauses = (err) => _messageWithCauses(err, /* @__PURE__ */ new Set());
    module2.exports = {
      isErrorLike,
      getErrorCause,
      stackWithCauses,
      messageWithCauses
    };
  }
});

// ../node_modules/pino-std-serializers/lib/err-proto.js
var require_err_proto = __commonJS({
  "../node_modules/pino-std-serializers/lib/err-proto.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var seen = Symbol("circular-ref-tag");
    var rawSymbol = Symbol("pino-raw-err-ref");
    var pinoErrProto = Object.create({}, {
      type: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      aggregateErrors: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoErrProto, rawSymbol, {
      writable: true,
      value: {}
    });
    module2.exports = {
      pinoErrProto,
      pinoErrorSymbols: {
        seen,
        rawSymbol
      }
    };
  }
});

// ../node_modules/pino-std-serializers/lib/err.js
var require_err = __commonJS({
  "../node_modules/pino-std-serializers/lib/err.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = errSerializer;
    var { messageWithCauses, stackWithCauses, isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString } = Object.prototype;
    function errSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = messageWithCauses(err);
      _err.stack = stackWithCauses(err);
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errSerializer(err2));
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (key !== "cause" && !Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// ../node_modules/pino-std-serializers/lib/err-with-cause.js
var require_err_with_cause = __commonJS({
  "../node_modules/pino-std-serializers/lib/err-with-cause.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = errWithCauseSerializer;
    var { isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString } = Object.prototype;
    function errWithCauseSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = err.message;
      _err.stack = err.stack;
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errWithCauseSerializer(err2));
      }
      if (isErrorLike(err.cause) && !Object.prototype.hasOwnProperty.call(err.cause, seen)) {
        _err.cause = errWithCauseSerializer(err.cause);
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (!Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errWithCauseSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// ../node_modules/pino-std-serializers/lib/req.js
var require_req = __commonJS({
  "../node_modules/pino-std-serializers/lib/req.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = {
      mapHttpRequest,
      reqSerializer
    };
    var rawSymbol = Symbol("pino-raw-req-ref");
    var pinoReqProto = Object.create({}, {
      id: {
        enumerable: true,
        writable: true,
        value: ""
      },
      method: {
        enumerable: true,
        writable: true,
        value: ""
      },
      url: {
        enumerable: true,
        writable: true,
        value: ""
      },
      query: {
        enumerable: true,
        writable: true,
        value: ""
      },
      params: {
        enumerable: true,
        writable: true,
        value: ""
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ""
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoReqProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function reqSerializer(req) {
      const connection = req.info || req.socket;
      const _req = Object.create(pinoReqProto);
      _req.id = typeof req.id === "function" ? req.id() : req.id || (req.info ? req.info.id : void 0);
      _req.method = req.method;
      if (req.originalUrl) {
        _req.url = req.originalUrl;
      } else {
        const path = req.path;
        _req.url = typeof path === "string" ? path : req.url ? req.url.path || req.url : void 0;
      }
      if (req.query) {
        _req.query = req.query;
      }
      if (req.params) {
        _req.params = req.params;
      }
      _req.headers = req.headers;
      _req.remoteAddress = connection && connection.remoteAddress;
      _req.remotePort = connection && connection.remotePort;
      _req.raw = req.raw || req;
      return _req;
    }
    function mapHttpRequest(req) {
      return {
        req: reqSerializer(req)
      };
    }
  }
});

// ../node_modules/pino-std-serializers/lib/res.js
var require_res = __commonJS({
  "../node_modules/pino-std-serializers/lib/res.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = {
      mapHttpResponse,
      resSerializer
    };
    var rawSymbol = Symbol("pino-raw-res-ref");
    var pinoResProto = Object.create({}, {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0
      },
      headers: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoResProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function resSerializer(res) {
      const _res = Object.create(pinoResProto);
      _res.statusCode = res.headersSent ? res.statusCode : null;
      _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
      _res.raw = res;
      return _res;
    }
    function mapHttpResponse(res) {
      return {
        res: resSerializer(res)
      };
    }
  }
});

// ../node_modules/pino-std-serializers/index.js
var require_pino_std_serializers = __commonJS({
  "../node_modules/pino-std-serializers/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var errSerializer = require_err();
    var errWithCauseSerializer = require_err_with_cause();
    var reqSerializers = require_req();
    var resSerializers = require_res();
    module2.exports = {
      err: errSerializer,
      errWithCause: errWithCauseSerializer,
      mapHttpRequest: reqSerializers.mapHttpRequest,
      mapHttpResponse: resSerializers.mapHttpResponse,
      req: reqSerializers.reqSerializer,
      res: resSerializers.resSerializer,
      wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
        if (customSerializer === errSerializer) return customSerializer;
        return function wrapErrSerializer(err) {
          return customSerializer(errSerializer(err));
        };
      },
      wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
        if (customSerializer === reqSerializers.reqSerializer) return customSerializer;
        return function wrappedReqSerializer(req) {
          return customSerializer(reqSerializers.reqSerializer(req));
        };
      },
      wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
        if (customSerializer === resSerializers.resSerializer) return customSerializer;
        return function wrappedResSerializer(res) {
          return customSerializer(resSerializers.resSerializer(res));
        };
      }
    };
  }
});

// ../node_modules/pino/lib/caller.js
var require_caller = __commonJS({
  "../node_modules/pino/lib/caller.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    function noOpPrepareStackTrace(_, stack) {
      return stack;
    }
    module2.exports = function getCallers() {
      const originalPrepare = Error.prepareStackTrace;
      Error.prepareStackTrace = noOpPrepareStackTrace;
      const stack = new Error().stack;
      Error.prepareStackTrace = originalPrepare;
      if (!Array.isArray(stack)) {
        return void 0;
      }
      const entries = stack.slice(2);
      const fileNames = [];
      for (const entry of entries) {
        if (!entry) {
          continue;
        }
        fileNames.push(entry.getFileName());
      }
      return fileNames;
    };
  }
});

// ../node_modules/fast-redact/lib/validator.js
var require_validator = __commonJS({
  "../node_modules/fast-redact/lib/validator.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = validator;
    function validator(opts = {}) {
      const {
        ERR_PATHS_MUST_BE_STRINGS = () => "fast-redact - Paths must be (non-empty) strings",
        ERR_INVALID_PATH = (s) => `fast-redact \u2013 Invalid path (${s})`
      } = opts;
      return function validate({ paths }) {
        paths.forEach((s) => {
          if (typeof s !== "string") {
            throw Error(ERR_PATHS_MUST_BE_STRINGS());
          }
          try {
            if (/〇/.test(s)) throw Error();
            const expr = (s[0] === "[" ? "" : ".") + s.replace(/^\*/, "\u3007").replace(/\.\*/g, ".\u3007").replace(/\[\*\]/g, "[\u3007]");
            if (/\n|\r|;/.test(expr)) throw Error();
            if (/\/\*/.test(expr)) throw Error();
            Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const \u3007 = null;
            o${expr}
            if ([o${expr}].length !== 1) throw Error()`)();
          } catch (e) {
            throw Error(ERR_INVALID_PATH(s));
          }
        });
      };
    }
  }
});

// ../node_modules/fast-redact/lib/rx.js
var require_rx = __commonJS({
  "../node_modules/fast-redact/lib/rx.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
  }
});

// ../node_modules/fast-redact/lib/parse.js
var require_parse = __commonJS({
  "../node_modules/fast-redact/lib/parse.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var rx = require_rx();
    module2.exports = parse;
    function parse({ paths }) {
      const wildcards = [];
      var wcLen = 0;
      const secret = paths.reduce(function(o, strPath, ix) {
        var path = strPath.match(rx).map((p) => p.replace(/'|"|`/g, ""));
        const leadingBracket = strPath[0] === "[";
        path = path.map((p) => {
          if (p[0] === "[") return p.substr(1, p.length - 2);
          else return p;
        });
        const star = path.indexOf("*");
        if (star > -1) {
          const before = path.slice(0, star);
          const beforeStr = before.join(".");
          const after = path.slice(star + 1, path.length);
          const nested = after.length > 0;
          wcLen++;
          wildcards.push({
            before,
            beforeStr,
            after,
            nested
          });
        } else {
          o[strPath] = {
            path,
            val: void 0,
            precensored: false,
            circle: "",
            escPath: JSON.stringify(strPath),
            leadingBracket
          };
        }
        return o;
      }, {});
      return { wildcards, wcLen, secret };
    }
  }
});

// ../node_modules/fast-redact/lib/redactor.js
var require_redactor = __commonJS({
  "../node_modules/fast-redact/lib/redactor.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var rx = require_rx();
    module2.exports = redactor;
    function redactor({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
      const redact = Function("o", `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    this.secret = originalSecret
    ${resultTmpl(serialize)}
  `).bind(state);
      redact.state = state;
      if (serialize === false) {
        redact.restore = (o) => state.restore(o);
      }
      return redact;
    }
    function redactTmpl(secret, isCensorFct, censorFctTakesPath) {
      return Object.keys(secret).map((path) => {
        const { escPath, leadingBracket, path: arrPath } = secret[path];
        const skip = leadingBracket ? 1 : 0;
        const delim = leadingBracket ? "" : ".";
        const hops = [];
        var match;
        while ((match = rx.exec(path)) !== null) {
          const [, ix] = match;
          const { index, input } = match;
          if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)));
        }
        var existence = hops.map((p) => `o${delim}${p}`).join(" && ");
        if (existence.length === 0) existence += `o${delim}${path} != null`;
        else existence += ` && o${delim}${path} != null`;
        const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join("\n")}
      }
    `;
        const censorArgs = censorFctTakesPath ? `val, ${JSON.stringify(arrPath)}` : `val`;
        return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : "censor"}
          ${circularDetection}
        }
      }
    `;
      }).join("\n");
    }
    function dynamicRedactTmpl(hasWildcards, isCensorFct, censorFctTakesPath) {
      return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : "";
    }
    function resultTmpl(serialize) {
      return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
    }
    function strictImpl(strict, serialize) {
      return strict === true ? `throw Error('fast-redact: primitives cannot be redacted')` : serialize === false ? `return o` : `return this.serialize(o)`;
    }
  }
});

// ../node_modules/fast-redact/lib/modifiers.js
var require_modifiers = __commonJS({
  "../node_modules/fast-redact/lib/modifiers.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = {
      groupRedact,
      groupRestore,
      nestedRedact,
      nestedRestore
    };
    function groupRestore({ keys, values, target }) {
      if (target == null || typeof target === "string") return;
      const length = keys.length;
      for (var i = 0; i < length; i++) {
        const k = keys[i];
        target[k] = values[i];
      }
    }
    function groupRedact(o, path, censor, isCensorFct, censorFctTakesPath) {
      const target = get(o, path);
      if (target == null || typeof target === "string") return { keys: null, values: null, target, flat: true };
      const keys = Object.keys(target);
      const keysLength = keys.length;
      const pathLength = path.length;
      const pathWithKey = censorFctTakesPath ? [...path] : void 0;
      const values = new Array(keysLength);
      for (var i = 0; i < keysLength; i++) {
        const key = keys[i];
        values[i] = target[key];
        if (censorFctTakesPath) {
          pathWithKey[pathLength] = key;
          target[key] = censor(target[key], pathWithKey);
        } else if (isCensorFct) {
          target[key] = censor(target[key]);
        } else {
          target[key] = censor;
        }
      }
      return { keys, values, target, flat: true };
    }
    function nestedRestore(instructions) {
      for (let i = 0; i < instructions.length; i++) {
        const { target, path, value } = instructions[i];
        let current = target;
        for (let i2 = path.length - 1; i2 > 0; i2--) {
          current = current[path[i2]];
        }
        current[path[0]] = value;
      }
    }
    function nestedRedact(store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
      const target = get(o, path);
      if (target == null) return;
      const keys = Object.keys(target);
      const keysLength = keys.length;
      for (var i = 0; i < keysLength; i++) {
        const key = keys[i];
        specialSet(store, target, key, path, ns, censor, isCensorFct, censorFctTakesPath);
      }
      return store;
    }
    function has(obj, prop) {
      return obj !== void 0 && obj !== null ? "hasOwn" in Object ? Object.hasOwn(obj, prop) : Object.prototype.hasOwnProperty.call(obj, prop) : false;
    }
    function specialSet(store, o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
      const afterPathLen = afterPath.length;
      const lastPathIndex = afterPathLen - 1;
      const originalKey = k;
      var i = -1;
      var n;
      var nv;
      var ov;
      var oov = null;
      var wc = null;
      var kIsWc;
      var wcov;
      var consecutive = false;
      var level = 0;
      var depth = 0;
      var redactPathCurrent = tree();
      ov = n = o[k];
      if (typeof n !== "object") return;
      while (n != null && ++i < afterPathLen) {
        depth += 1;
        k = afterPath[i];
        oov = ov;
        if (k !== "*" && !wc && !(typeof n === "object" && k in n)) {
          break;
        }
        if (k === "*") {
          if (wc === "*") {
            consecutive = true;
          }
          wc = k;
          if (i !== lastPathIndex) {
            continue;
          }
        }
        if (wc) {
          const wcKeys = Object.keys(n);
          for (var j = 0; j < wcKeys.length; j++) {
            const wck = wcKeys[j];
            wcov = n[wck];
            kIsWc = k === "*";
            if (consecutive) {
              redactPathCurrent = node(redactPathCurrent, wck, depth);
              level = i;
              ov = iterateNthLevel(wcov, level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, o[originalKey], depth + 1);
            } else {
              if (kIsWc || typeof wcov === "object" && wcov !== null && k in wcov) {
                if (kIsWc) {
                  ov = wcov;
                } else {
                  ov = wcov[k];
                }
                nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
                if (kIsWc) {
                  const rv = restoreInstr(node(redactPathCurrent, wck, depth), ov, o[originalKey]);
                  store.push(rv);
                  n[wck] = nv;
                } else {
                  if (wcov[k] === nv) {
                  } else if (nv === void 0 && censor !== void 0 || has(wcov, k) && nv === ov) {
                    redactPathCurrent = node(redactPathCurrent, wck, depth);
                  } else {
                    redactPathCurrent = node(redactPathCurrent, wck, depth);
                    const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, o[originalKey]);
                    store.push(rv);
                    wcov[k] = nv;
                  }
                }
              }
            }
          }
          wc = null;
        } else {
          ov = n[k];
          redactPathCurrent = node(redactPathCurrent, k, depth);
          nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
          if (has(n, k) && nv === ov || nv === void 0 && censor !== void 0) {
          } else {
            const rv = restoreInstr(redactPathCurrent, ov, o[originalKey]);
            store.push(rv);
            n[k] = nv;
          }
          n = n[k];
        }
        if (typeof n !== "object") break;
        if (ov === oov || typeof ov === "undefined") {
        }
      }
    }
    function get(o, p) {
      var i = -1;
      var l = p.length;
      var n = o;
      while (n != null && ++i < l) {
        n = n[p[i]];
      }
      return n;
    }
    function iterateNthLevel(wcov, level, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth) {
      if (level === 0) {
        if (kIsWc || typeof wcov === "object" && wcov !== null && k in wcov) {
          if (kIsWc) {
            ov = wcov;
          } else {
            ov = wcov[k];
          }
          nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
          if (kIsWc) {
            const rv = restoreInstr(redactPathCurrent, ov, parent);
            store.push(rv);
            n[wck] = nv;
          } else {
            if (wcov[k] === nv) {
            } else if (nv === void 0 && censor !== void 0 || has(wcov, k) && nv === ov) {
            } else {
              const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, parent);
              store.push(rv);
              wcov[k] = nv;
            }
          }
        }
      }
      for (const key in wcov) {
        if (typeof wcov[key] === "object") {
          redactPathCurrent = node(redactPathCurrent, key, depth);
          iterateNthLevel(wcov[key], level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth + 1);
        }
      }
    }
    function tree() {
      return { parent: null, key: null, children: [], depth: 0 };
    }
    function node(parent, key, depth) {
      if (parent.depth === depth) {
        return node(parent.parent, key, depth);
      }
      var child = {
        parent,
        key,
        depth,
        children: []
      };
      parent.children.push(child);
      return child;
    }
    function restoreInstr(node2, value, target) {
      let current = node2;
      const path = [];
      do {
        path.push(current.key);
        current = current.parent;
      } while (current.parent != null);
      return { path, value, target };
    }
  }
});

// ../node_modules/fast-redact/lib/restorer.js
var require_restorer = __commonJS({
  "../node_modules/fast-redact/lib/restorer.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { groupRestore, nestedRestore } = require_modifiers();
    module2.exports = restorer;
    function restorer() {
      return function compileRestore() {
        if (this.restore) {
          this.restore.state.secret = this.secret;
          return;
        }
        const { secret, wcLen } = this;
        const paths = Object.keys(secret);
        const resetters = resetTmpl(secret, paths);
        const hasWildcards = wcLen > 0;
        const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
        this.restore = Function(
          "o",
          restoreTmpl(resetters, paths, hasWildcards)
        ).bind(state);
        this.restore.state = state;
      };
    }
    function resetTmpl(secret, paths) {
      return paths.map((path) => {
        const { circle, escPath, leadingBracket } = secret[path];
        const delim = leadingBracket ? "" : ".";
        const reset = circle ? `o.${circle} = secret[${escPath}].val` : `o${delim}${path} = secret[${escPath}].val`;
        const clear = `secret[${escPath}].val = undefined`;
        return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `;
      }).join("");
    }
    function restoreTmpl(resetters, paths, hasWildcards) {
      const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o) {
        if (o.flat === true) this.groupRestore(o)
        else this.nestedRestore(o)
        secret[k] = null
      }
    }
  ` : "";
      return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `;
    }
  }
});

// ../node_modules/fast-redact/lib/state.js
var require_state = __commonJS({
  "../node_modules/fast-redact/lib/state.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = state;
    function state(o) {
      const {
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      } = o;
      const builder = [{ secret, censor, compileRestore }];
      if (serialize !== false) builder.push({ serialize });
      if (wcLen > 0) builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
      return Object.assign(...builder);
    }
  }
});

// ../node_modules/fast-redact/index.js
var require_fast_redact = __commonJS({
  "../node_modules/fast-redact/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var validator = require_validator();
    var parse = require_parse();
    var redactor = require_redactor();
    var restorer = require_restorer();
    var { groupRedact, nestedRedact } = require_modifiers();
    var state = require_state();
    var rx = require_rx();
    var validate = validator();
    var noop = (o) => o;
    noop.restore = noop;
    var DEFAULT_CENSOR = "[REDACTED]";
    fastRedact.rx = rx;
    fastRedact.validator = validator;
    module2.exports = fastRedact;
    function fastRedact(opts = {}) {
      const paths = Array.from(new Set(opts.paths || []));
      const serialize = "serialize" in opts ? opts.serialize === false ? opts.serialize : typeof opts.serialize === "function" ? opts.serialize : JSON.stringify : JSON.stringify;
      const remove = opts.remove;
      if (remove === true && serialize !== JSON.stringify) {
        throw Error("fast-redact \u2013 remove option may only be set when serializer is JSON.stringify");
      }
      const censor = remove === true ? void 0 : "censor" in opts ? opts.censor : DEFAULT_CENSOR;
      const isCensorFct = typeof censor === "function";
      const censorFctTakesPath = isCensorFct && censor.length > 1;
      if (paths.length === 0) return serialize || noop;
      validate({ paths, serialize, censor });
      const { wildcards, wcLen, secret } = parse({ paths, censor });
      const compileRestore = restorer();
      const strict = "strict" in opts ? opts.strict : true;
      return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      }));
    }
  }
});

// ../node_modules/pino/lib/symbols.js
var require_symbols = __commonJS({
  "../node_modules/pino/lib/symbols.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var setLevelSym = Symbol("pino.setLevel");
    var getLevelSym = Symbol("pino.getLevel");
    var levelValSym = Symbol("pino.levelVal");
    var levelCompSym = Symbol("pino.levelComp");
    var useLevelLabelsSym = Symbol("pino.useLevelLabels");
    var useOnlyCustomLevelsSym = Symbol("pino.useOnlyCustomLevels");
    var mixinSym = Symbol("pino.mixin");
    var lsCacheSym = Symbol("pino.lsCache");
    var chindingsSym = Symbol("pino.chindings");
    var asJsonSym = Symbol("pino.asJson");
    var writeSym = Symbol("pino.write");
    var redactFmtSym = Symbol("pino.redactFmt");
    var timeSym = Symbol("pino.time");
    var timeSliceIndexSym = Symbol("pino.timeSliceIndex");
    var streamSym = Symbol("pino.stream");
    var stringifySym = Symbol("pino.stringify");
    var stringifySafeSym = Symbol("pino.stringifySafe");
    var stringifiersSym = Symbol("pino.stringifiers");
    var endSym = Symbol("pino.end");
    var formatOptsSym = Symbol("pino.formatOpts");
    var messageKeySym = Symbol("pino.messageKey");
    var errorKeySym = Symbol("pino.errorKey");
    var nestedKeySym = Symbol("pino.nestedKey");
    var nestedKeyStrSym = Symbol("pino.nestedKeyStr");
    var mixinMergeStrategySym = Symbol("pino.mixinMergeStrategy");
    var msgPrefixSym = Symbol("pino.msgPrefix");
    var wildcardFirstSym = Symbol("pino.wildcardFirst");
    var serializersSym = Symbol.for("pino.serializers");
    var formattersSym = Symbol.for("pino.formatters");
    var hooksSym = Symbol.for("pino.hooks");
    var needsMetadataGsym = Symbol.for("pino.metadata");
    module2.exports = {
      setLevelSym,
      getLevelSym,
      levelValSym,
      levelCompSym,
      useLevelLabelsSym,
      mixinSym,
      lsCacheSym,
      chindingsSym,
      asJsonSym,
      writeSym,
      serializersSym,
      redactFmtSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifySafeSym,
      stringifiersSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      errorKeySym,
      nestedKeySym,
      wildcardFirstSym,
      needsMetadataGsym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym,
      nestedKeyStrSym,
      mixinMergeStrategySym,
      msgPrefixSym
    };
  }
});

// ../node_modules/pino/lib/redaction.js
var require_redaction = __commonJS({
  "../node_modules/pino/lib/redaction.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var fastRedact = require_fast_redact();
    var { redactFmtSym, wildcardFirstSym } = require_symbols();
    var { rx, validator } = fastRedact;
    var validate = validator({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (s) => `pino \u2013 redact paths array contains an invalid path (${s})`
    });
    var CENSOR = "[Redacted]";
    var strict = false;
    function redaction(opts, serialize) {
      const { paths, censor } = handle(opts);
      const shape = paths.reduce((o, str) => {
        rx.lastIndex = 0;
        const first = rx.exec(str);
        const next = rx.exec(str);
        let ns = first[1] !== void 0 ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : first[0];
        if (ns === "*") {
          ns = wildcardFirstSym;
        }
        if (next === null) {
          o[ns] = null;
          return o;
        }
        if (o[ns] === null) {
          return o;
        }
        const { index } = next;
        const nextPath = `${str.substr(index, str.length - 1)}`;
        o[ns] = o[ns] || [];
        if (ns !== wildcardFirstSym && o[ns].length === 0) {
          o[ns].push(...o[wildcardFirstSym] || []);
        }
        if (ns === wildcardFirstSym) {
          Object.keys(o).forEach(function(k) {
            if (o[k]) {
              o[k].push(nextPath);
            }
          });
        }
        o[ns].push(nextPath);
        return o;
      }, {});
      const result = {
        [redactFmtSym]: fastRedact({ paths, censor, serialize, strict })
      };
      const topCensor = (...args) => {
        return typeof censor === "function" ? serialize(censor(...args)) : serialize(censor);
      };
      return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
        if (shape[k] === null) {
          o[k] = (value) => topCensor(value, [k]);
        } else {
          const wrappedCensor = typeof censor === "function" ? (value, path) => {
            return censor(value, [k, ...path]);
          } : censor;
          o[k] = fastRedact({
            paths: shape[k],
            censor: wrappedCensor,
            serialize,
            strict
          });
        }
        return o;
      }, result);
    }
    function handle(opts) {
      if (Array.isArray(opts)) {
        opts = { paths: opts, censor: CENSOR };
        validate(opts);
        return opts;
      }
      let { paths, censor = CENSOR, remove } = opts;
      if (Array.isArray(paths) === false) {
        throw Error("pino \u2013 redact must contain an array of strings");
      }
      if (remove === true) censor = void 0;
      validate({ paths, censor });
      return { paths, censor };
    }
    module2.exports = redaction;
  }
});

// ../node_modules/pino/lib/time.js
var require_time = __commonJS({
  "../node_modules/pino/lib/time.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var nullTime = () => "";
    var epochTime = () => `,"time":${Date.now()}`;
    var unixTime = () => `,"time":${Math.round(Date.now() / 1e3)}`;
    var isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
    module2.exports = { nullTime, epochTime, unixTime, isoTime };
  }
});

// ../node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "../node_modules/quick-format-unescaped/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    module2.exports = format;
    function format(f, args, opts) {
      var ss = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1) return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for (var index = 1; index < len; index++) {
          objects[index] = ss(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f !== "string") {
        return f;
      }
      var argLen = args.length;
      if (argLen === 0) return f;
      var str = "";
      var a = 1 - offset;
      var lastPos = -1;
      var flen = f && f.length || 0;
      for (var i = 0; i < flen; ) {
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f.charCodeAt(i + 1)) {
            case 100:
            case 102:
              if (a >= argLen)
                break;
              if (args[a] == null) break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Number(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 105:
              if (a >= argLen)
                break;
              if (args[a] == null) break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Math.floor(Number(args[a]));
              lastPos = i + 2;
              i++;
              break;
            case 79:
            case 111:
            case 106:
              if (a >= argLen)
                break;
              if (args[a] === void 0) break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              var type = typeof args[a];
              if (type === "string") {
                str += "'" + args[a] + "'";
                lastPos = i + 2;
                i++;
                break;
              }
              if (type === "function") {
                str += args[a].name || "<anonymous>";
                lastPos = i + 2;
                i++;
                break;
              }
              str += ss(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 115:
              if (a >= argLen)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += String(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 37:
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += "%";
              lastPos = i + 2;
              i++;
              a--;
              break;
          }
          ++a;
        }
        ++i;
      }
      if (lastPos === -1)
        return f;
      else if (lastPos < flen) {
        str += f.slice(lastPos);
      }
      return str;
    }
  }
});

// ../node_modules/atomic-sleep/index.js
var require_atomic_sleep = __commonJS({
  "../node_modules/atomic-sleep/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        Atomics.wait(nil, 0, 0, Number(ms));
      };
      const nil = new Int32Array(new SharedArrayBuffer(4));
      module2.exports = sleep;
    } else {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        const target = Date.now() + Number(ms);
        while (target > Date.now()) {
        }
      };
      module2.exports = sleep;
    }
  }
});

// ../node_modules/sonic-boom/index.js
var require_sonic_boom = __commonJS({
  "../node_modules/sonic-boom/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var fs = require("fs");
    var EventEmitter = require("events");
    var inherits = require("util").inherits;
    var path = require("path");
    var sleep = require_atomic_sleep();
    var assert = require("assert");
    var BUSY_WRITE_TIMEOUT = 100;
    var kEmptyBuffer = Buffer.allocUnsafe(0);
    var MAX_WRITE = 16 * 1024;
    var kContentModeBuffer = "buffer";
    var kContentModeUtf8 = "utf8";
    var [major, minor] = (process.versions.node || "0.0").split(".").map(Number);
    var kCopyBuffer = major >= 22 && minor >= 7;
    function openFile(file, sonic) {
      sonic._opening = true;
      sonic._writing = true;
      sonic._asyncDrainScheduled = false;
      function fileOpened(err, fd) {
        if (err) {
          sonic._reopening = false;
          sonic._writing = false;
          sonic._opening = false;
          if (sonic.sync) {
            process.nextTick(() => {
              if (sonic.listenerCount("error") > 0) {
                sonic.emit("error", err);
              }
            });
          } else {
            sonic.emit("error", err);
          }
          return;
        }
        const reopening = sonic._reopening;
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) {
          process.nextTick(() => sonic.emit("ready"));
        } else {
          sonic.emit("ready");
        }
        if (sonic.destroyed) {
          return;
        }
        if (!sonic._writing && sonic._len > sonic.minLength || sonic._flushPending) {
          sonic._actualWrite();
        } else if (reopening) {
          process.nextTick(() => sonic.emit("drain"));
        }
      }
      const flags = sonic.append ? "a" : "w";
      const mode = sonic.mode;
      if (sonic.sync) {
        try {
          if (sonic.mkdir) fs.mkdirSync(path.dirname(file), { recursive: true });
          const fd = fs.openSync(file, flags, mode);
          fileOpened(null, fd);
        } catch (err) {
          fileOpened(err);
          throw err;
        }
      } else if (sonic.mkdir) {
        fs.mkdir(path.dirname(file), { recursive: true }, (err) => {
          if (err) return fileOpened(err);
          fs.open(file, flags, mode, fileOpened);
        });
      } else {
        fs.open(file, flags, mode, fileOpened);
      }
    }
    function SonicBoom(opts) {
      if (!(this instanceof SonicBoom)) {
        return new SonicBoom(opts);
      }
      let { fd, dest, minLength, maxLength, maxWrite, periodicFlush, sync, append = true, mkdir, retryEAGAIN, fsync, contentMode, mode } = opts || {};
      fd = fd || dest;
      this._len = 0;
      this.fd = -1;
      this._bufs = [];
      this._lens = [];
      this._writing = false;
      this._ending = false;
      this._reopening = false;
      this._asyncDrainScheduled = false;
      this._flushPending = false;
      this._hwm = Math.max(minLength || 0, 16387);
      this.file = null;
      this.destroyed = false;
      this.minLength = minLength || 0;
      this.maxLength = maxLength || 0;
      this.maxWrite = maxWrite || MAX_WRITE;
      this._periodicFlush = periodicFlush || 0;
      this._periodicFlushTimer = void 0;
      this.sync = sync || false;
      this.writable = true;
      this._fsync = fsync || false;
      this.append = append || false;
      this.mode = mode;
      this.retryEAGAIN = retryEAGAIN || (() => true);
      this.mkdir = mkdir || false;
      let fsWriteSync;
      let fsWrite;
      if (contentMode === kContentModeBuffer) {
        this._writingBuf = kEmptyBuffer;
        this.write = writeBuffer;
        this.flush = flushBuffer;
        this.flushSync = flushBufferSync;
        this._actualWrite = actualWriteBuffer;
        fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf);
        fsWrite = () => fs.write(this.fd, this._writingBuf, this.release);
      } else if (contentMode === void 0 || contentMode === kContentModeUtf8) {
        this._writingBuf = "";
        this.write = write;
        this.flush = flush;
        this.flushSync = flushSync;
        this._actualWrite = actualWrite;
        fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf, "utf8");
        fsWrite = () => fs.write(this.fd, this._writingBuf, "utf8", this.release);
      } else {
        throw new Error(`SonicBoom supports "${kContentModeUtf8}" and "${kContentModeBuffer}", but passed ${contentMode}`);
      }
      if (typeof fd === "number") {
        this.fd = fd;
        process.nextTick(() => this.emit("ready"));
      } else if (typeof fd === "string") {
        openFile(fd, this);
      } else {
        throw new Error("SonicBoom supports only file descriptors and files");
      }
      if (this.minLength >= this.maxWrite) {
        throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
      }
      this.release = (err, n) => {
        if (err) {
          if ((err.code === "EAGAIN" || err.code === "EBUSY") && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
            if (this.sync) {
              try {
                sleep(BUSY_WRITE_TIMEOUT);
                this.release(void 0, 0);
              } catch (err2) {
                this.release(err2);
              }
            } else {
              setTimeout(fsWrite, BUSY_WRITE_TIMEOUT);
            }
          } else {
            this._writing = false;
            this.emit("error", err);
          }
          return;
        }
        this.emit("write", n);
        const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
        this._len = releasedBufObj.len;
        this._writingBuf = releasedBufObj.writingBuf;
        if (this._writingBuf.length) {
          if (!this.sync) {
            fsWrite();
            return;
          }
          try {
            do {
              const n2 = fsWriteSync();
              const releasedBufObj2 = releaseWritingBuf(this._writingBuf, this._len, n2);
              this._len = releasedBufObj2.len;
              this._writingBuf = releasedBufObj2.writingBuf;
            } while (this._writingBuf.length);
          } catch (err2) {
            this.release(err2);
            return;
          }
        }
        if (this._fsync) {
          fs.fsyncSync(this.fd);
        }
        const len = this._len;
        if (this._reopening) {
          this._writing = false;
          this._reopening = false;
          this.reopen();
        } else if (len > this.minLength) {
          this._actualWrite();
        } else if (this._ending) {
          if (len > 0) {
            this._actualWrite();
          } else {
            this._writing = false;
            actualClose(this);
          }
        } else {
          this._writing = false;
          if (this.sync) {
            if (!this._asyncDrainScheduled) {
              this._asyncDrainScheduled = true;
              process.nextTick(emitDrain, this);
            }
          } else {
            this.emit("drain");
          }
        }
      };
      this.on("newListener", function(name) {
        if (name === "drain") {
          this._asyncDrainScheduled = false;
        }
      });
      if (this._periodicFlush !== 0) {
        this._periodicFlushTimer = setInterval(() => this.flush(null), this._periodicFlush);
        this._periodicFlushTimer.unref();
      }
    }
    function releaseWritingBuf(writingBuf, len, n) {
      if (typeof writingBuf === "string" && Buffer.byteLength(writingBuf) !== n) {
        n = Buffer.from(writingBuf).subarray(0, n).toString().length;
      }
      len = Math.max(len - n, 0);
      writingBuf = writingBuf.slice(n);
      return { writingBuf, len };
    }
    function emitDrain(sonic) {
      const hasListeners = sonic.listenerCount("drain") > 0;
      if (!hasListeners) return;
      sonic._asyncDrainScheduled = false;
      sonic.emit("drain");
    }
    inherits(SonicBoom, EventEmitter);
    function mergeBuf(bufs, len) {
      if (bufs.length === 0) {
        return kEmptyBuffer;
      }
      if (bufs.length === 1) {
        return bufs[0];
      }
      return Buffer.concat(bufs, len);
    }
    function write(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      const len = this._len + data.length;
      const bufs = this._bufs;
      if (this.maxLength && len > this.maxLength) {
        this.emit("drop", data);
        return this._len < this._hwm;
      }
      if (bufs.length === 0 || bufs[bufs.length - 1].length + data.length > this.maxWrite) {
        bufs.push("" + data);
      } else {
        bufs[bufs.length - 1] += data;
      }
      this._len = len;
      if (!this._writing && this._len >= this.minLength) {
        this._actualWrite();
      }
      return this._len < this._hwm;
    }
    function writeBuffer(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      const len = this._len + data.length;
      const bufs = this._bufs;
      const lens = this._lens;
      if (this.maxLength && len > this.maxLength) {
        this.emit("drop", data);
        return this._len < this._hwm;
      }
      if (bufs.length === 0 || lens[lens.length - 1] + data.length > this.maxWrite) {
        bufs.push([data]);
        lens.push(data.length);
      } else {
        bufs[bufs.length - 1].push(data);
        lens[lens.length - 1] += data.length;
      }
      this._len = len;
      if (!this._writing && this._len >= this.minLength) {
        this._actualWrite();
      }
      return this._len < this._hwm;
    }
    function callFlushCallbackOnDrain(cb) {
      this._flushPending = true;
      const onDrain = () => {
        if (!this._fsync) {
          try {
            fs.fsync(this.fd, (err) => {
              this._flushPending = false;
              cb(err);
            });
          } catch (err) {
            cb(err);
          }
        } else {
          this._flushPending = false;
          cb();
        }
        this.off("error", onError);
      };
      const onError = (err) => {
        this._flushPending = false;
        cb(err);
        this.off("drain", onDrain);
      };
      this.once("drain", onDrain);
      this.once("error", onError);
    }
    function flush(cb) {
      if (cb != null && typeof cb !== "function") {
        throw new Error("flush cb must be a function");
      }
      if (this.destroyed) {
        const error = new Error("SonicBoom destroyed");
        if (cb) {
          cb(error);
          return;
        }
        throw error;
      }
      if (this.minLength <= 0) {
        cb?.();
        return;
      }
      if (cb) {
        callFlushCallbackOnDrain.call(this, cb);
      }
      if (this._writing) {
        return;
      }
      if (this._bufs.length === 0) {
        this._bufs.push("");
      }
      this._actualWrite();
    }
    function flushBuffer(cb) {
      if (cb != null && typeof cb !== "function") {
        throw new Error("flush cb must be a function");
      }
      if (this.destroyed) {
        const error = new Error("SonicBoom destroyed");
        if (cb) {
          cb(error);
          return;
        }
        throw error;
      }
      if (this.minLength <= 0) {
        cb?.();
        return;
      }
      if (cb) {
        callFlushCallbackOnDrain.call(this, cb);
      }
      if (this._writing) {
        return;
      }
      if (this._bufs.length === 0) {
        this._bufs.push([]);
        this._lens.push(0);
      }
      this._actualWrite();
    }
    SonicBoom.prototype.reopen = function(file) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.reopen(file);
        });
        return;
      }
      if (this._ending) {
        return;
      }
      if (!this.file) {
        throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom");
      }
      if (file) {
        this.file = file;
      }
      this._reopening = true;
      if (this._writing) {
        return;
      }
      const fd = this.fd;
      this.once("ready", () => {
        if (fd !== this.fd) {
          fs.close(fd, (err) => {
            if (err) {
              return this.emit("error", err);
            }
          });
        }
      });
      openFile(this.file, this);
    };
    SonicBoom.prototype.end = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.end();
        });
        return;
      }
      if (this._ending) {
        return;
      }
      this._ending = true;
      if (this._writing) {
        return;
      }
      if (this._len > 0 && this.fd >= 0) {
        this._actualWrite();
      } else {
        actualClose(this);
      }
    };
    function flushSync() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift(this._writingBuf);
        this._writingBuf = "";
      }
      let buf = "";
      while (this._bufs.length || buf) {
        if (buf.length <= 0) {
          buf = this._bufs[0];
        }
        try {
          const n = fs.writeSync(this.fd, buf, "utf8");
          const releasedBufObj = releaseWritingBuf(buf, this._len, n);
          buf = releasedBufObj.writingBuf;
          this._len = releasedBufObj.len;
          if (buf.length <= 0) {
            this._bufs.shift();
          }
        } catch (err) {
          const shouldRetry = err.code === "EAGAIN" || err.code === "EBUSY";
          if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
      try {
        fs.fsyncSync(this.fd);
      } catch {
      }
    }
    function flushBufferSync() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift([this._writingBuf]);
        this._writingBuf = kEmptyBuffer;
      }
      let buf = kEmptyBuffer;
      while (this._bufs.length || buf.length) {
        if (buf.length <= 0) {
          buf = mergeBuf(this._bufs[0], this._lens[0]);
        }
        try {
          const n = fs.writeSync(this.fd, buf);
          buf = buf.subarray(n);
          this._len = Math.max(this._len - n, 0);
          if (buf.length <= 0) {
            this._bufs.shift();
            this._lens.shift();
          }
        } catch (err) {
          const shouldRetry = err.code === "EAGAIN" || err.code === "EBUSY";
          if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
    }
    SonicBoom.prototype.destroy = function() {
      if (this.destroyed) {
        return;
      }
      actualClose(this);
    };
    function actualWrite() {
      const release = this.release;
      this._writing = true;
      this._writingBuf = this._writingBuf || this._bufs.shift() || "";
      if (this.sync) {
        try {
          const written = fs.writeSync(this.fd, this._writingBuf, "utf8");
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        fs.write(this.fd, this._writingBuf, "utf8", release);
      }
    }
    function actualWriteBuffer() {
      const release = this.release;
      this._writing = true;
      this._writingBuf = this._writingBuf.length ? this._writingBuf : mergeBuf(this._bufs.shift(), this._lens.shift());
      if (this.sync) {
        try {
          const written = fs.writeSync(this.fd, this._writingBuf);
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        if (kCopyBuffer) {
          this._writingBuf = Buffer.from(this._writingBuf);
        }
        fs.write(this.fd, this._writingBuf, release);
      }
    }
    function actualClose(sonic) {
      if (sonic.fd === -1) {
        sonic.once("ready", actualClose.bind(null, sonic));
        return;
      }
      if (sonic._periodicFlushTimer !== void 0) {
        clearInterval(sonic._periodicFlushTimer);
      }
      sonic.destroyed = true;
      sonic._bufs = [];
      sonic._lens = [];
      assert(typeof sonic.fd === "number", `sonic.fd must be a number, got ${typeof sonic.fd}`);
      try {
        fs.fsync(sonic.fd, closeWrapped);
      } catch {
      }
      function closeWrapped() {
        if (sonic.fd !== 1 && sonic.fd !== 2) {
          fs.close(sonic.fd, done);
        } else {
          done();
        }
      }
      function done(err) {
        if (err) {
          sonic.emit("error", err);
          return;
        }
        if (sonic._ending && !sonic._writing) {
          sonic.emit("finish");
        }
        sonic.emit("close");
      }
    }
    SonicBoom.SonicBoom = SonicBoom;
    SonicBoom.default = SonicBoom;
    module2.exports = SonicBoom;
  }
});

// ../node_modules/on-exit-leak-free/index.js
var require_on_exit_leak_free = __commonJS({
  "../node_modules/on-exit-leak-free/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var refs = {
      exit: [],
      beforeExit: []
    };
    var functions = {
      exit: onExit,
      beforeExit: onBeforeExit
    };
    var registry;
    function ensureRegistry() {
      if (registry === void 0) {
        registry = new FinalizationRegistry(clear);
      }
    }
    function install(event) {
      if (refs[event].length > 0) {
        return;
      }
      process.on(event, functions[event]);
    }
    function uninstall(event) {
      if (refs[event].length > 0) {
        return;
      }
      process.removeListener(event, functions[event]);
      if (refs.exit.length === 0 && refs.beforeExit.length === 0) {
        registry = void 0;
      }
    }
    function onExit() {
      callRefs("exit");
    }
    function onBeforeExit() {
      callRefs("beforeExit");
    }
    function callRefs(event) {
      for (const ref of refs[event]) {
        const obj = ref.deref();
        const fn = ref.fn;
        if (obj !== void 0) {
          fn(obj, event);
        }
      }
      refs[event] = [];
    }
    function clear(ref) {
      for (const event of ["exit", "beforeExit"]) {
        const index = refs[event].indexOf(ref);
        refs[event].splice(index, index + 1);
        uninstall(event);
      }
    }
    function _register(event, obj, fn) {
      if (obj === void 0) {
        throw new Error("the object can't be undefined");
      }
      install(event);
      const ref = new WeakRef(obj);
      ref.fn = fn;
      ensureRegistry();
      registry.register(obj, ref);
      refs[event].push(ref);
    }
    function register(obj, fn) {
      _register("exit", obj, fn);
    }
    function registerBeforeExit(obj, fn) {
      _register("beforeExit", obj, fn);
    }
    function unregister(obj) {
      if (registry === void 0) {
        return;
      }
      registry.unregister(obj);
      for (const event of ["exit", "beforeExit"]) {
        refs[event] = refs[event].filter((ref) => {
          const _obj = ref.deref();
          return _obj && _obj !== obj;
        });
        uninstall(event);
      }
    }
    module2.exports = {
      register,
      registerBeforeExit,
      unregister
    };
  }
});

// ../node_modules/thread-stream/package.json
var require_package = __commonJS({
  "../node_modules/thread-stream/package.json"(exports2, module2) {
    module2.exports = {
      name: "thread-stream",
      version: "3.1.0",
      description: "A streaming way to send data to a Node.js Worker Thread",
      main: "index.js",
      types: "index.d.ts",
      dependencies: {
        "real-require": "^0.2.0"
      },
      devDependencies: {
        "@types/node": "^20.1.0",
        "@types/tap": "^15.0.0",
        "@yao-pkg/pkg": "^5.11.5",
        desm: "^1.3.0",
        fastbench: "^1.0.1",
        husky: "^9.0.6",
        "pino-elasticsearch": "^8.0.0",
        "sonic-boom": "^4.0.1",
        standard: "^17.0.0",
        tap: "^16.2.0",
        "ts-node": "^10.8.0",
        typescript: "^5.3.2",
        "why-is-node-running": "^2.2.2"
      },
      scripts: {
        build: "tsc --noEmit",
        test: 'standard && npm run build && npm run transpile && tap "test/**/*.test.*js" && tap --ts test/*.test.*ts',
        "test:ci": "standard && npm run transpile && npm run test:ci:js && npm run test:ci:ts",
        "test:ci:js": 'tap --no-check-coverage --timeout=120 --coverage-report=lcovonly "test/**/*.test.*js"',
        "test:ci:ts": 'tap --ts --no-check-coverage --coverage-report=lcovonly "test/**/*.test.*ts"',
        "test:yarn": 'npm run transpile && tap "test/**/*.test.js" --no-check-coverage',
        transpile: "sh ./test/ts/transpile.sh",
        prepare: "husky install"
      },
      standard: {
        ignore: [
          "test/ts/**/*",
          "test/syntax-error.mjs"
        ]
      },
      repository: {
        type: "git",
        url: "git+https://github.com/mcollina/thread-stream.git"
      },
      keywords: [
        "worker",
        "thread",
        "threads",
        "stream"
      ],
      author: "Matteo Collina <hello@matteocollina.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/mcollina/thread-stream/issues"
      },
      homepage: "https://github.com/mcollina/thread-stream#readme"
    };
  }
});

// ../node_modules/thread-stream/lib/wait.js
var require_wait = __commonJS({
  "../node_modules/thread-stream/lib/wait.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var MAX_TIMEOUT = 1e3;
    function wait(state, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state, index);
      if (current === expected) {
        done(null, "ok");
        return;
      }
      let prior = current;
      const check = (backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            prior = current;
            current = Atomics.load(state, index);
            if (current === prior) {
              check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
            } else {
              if (current === expected) done(null, "ok");
              else done(null, "not-equal");
            }
          }, backoff);
        }
      };
      check(1);
    }
    function waitDiff(state, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state, index);
      if (current !== expected) {
        done(null, "ok");
        return;
      }
      const check = (backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            current = Atomics.load(state, index);
            if (current !== expected) {
              done(null, "ok");
            } else {
              check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
            }
          }, backoff);
        }
      };
      check(1);
    }
    module2.exports = { wait, waitDiff };
  }
});

// ../node_modules/thread-stream/lib/indexes.js
var require_indexes = __commonJS({
  "../node_modules/thread-stream/lib/indexes.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var WRITE_INDEX = 4;
    var READ_INDEX = 8;
    module2.exports = {
      WRITE_INDEX,
      READ_INDEX
    };
  }
});

// ../node_modules/thread-stream/index.js
var require_thread_stream = __commonJS({
  "../node_modules/thread-stream/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { version } = require_package();
    var { EventEmitter } = require("events");
    var { Worker } = require("worker_threads");
    var { join: join4 } = require("path");
    var { pathToFileURL } = require("url");
    var { wait } = require_wait();
    var {
      WRITE_INDEX,
      READ_INDEX
    } = require_indexes();
    var buffer = require("buffer");
    var assert = require("assert");
    var kImpl = Symbol("kImpl");
    var MAX_STRING = buffer.constants.MAX_STRING_LENGTH;
    var FakeWeakRef = class {
      constructor(value) {
        this._value = value;
      }
      deref() {
        return this._value;
      }
    };
    var FakeFinalizationRegistry = class {
      register() {
      }
      unregister() {
      }
    };
    var FinalizationRegistry2 = process.env.NODE_V8_COVERAGE ? FakeFinalizationRegistry : global.FinalizationRegistry || FakeFinalizationRegistry;
    var WeakRef2 = process.env.NODE_V8_COVERAGE ? FakeWeakRef : global.WeakRef || FakeWeakRef;
    var registry = new FinalizationRegistry2((worker) => {
      if (worker.exited) {
        return;
      }
      worker.terminate();
    });
    function createWorker(stream, opts) {
      const { filename, workerData } = opts;
      const bundlerOverrides = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {};
      const toExecute = bundlerOverrides["thread-stream-worker"] || join4(__dirname, "lib", "worker.js");
      const worker = new Worker(toExecute, {
        ...opts.workerOpts,
        trackUnmanagedFds: false,
        workerData: {
          filename: filename.indexOf("file://") === 0 ? filename : pathToFileURL(filename).href,
          dataBuf: stream[kImpl].dataBuf,
          stateBuf: stream[kImpl].stateBuf,
          workerData: {
            $context: {
              threadStreamVersion: version
            },
            ...workerData
          }
        }
      });
      worker.stream = new FakeWeakRef(stream);
      worker.on("message", onWorkerMessage);
      worker.on("exit", onWorkerExit);
      registry.register(stream, worker);
      return worker;
    }
    function drain(stream) {
      assert(!stream[kImpl].sync);
      if (stream[kImpl].needDrain) {
        stream[kImpl].needDrain = false;
        stream.emit("drain");
      }
    }
    function nextFlush(stream) {
      const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      let leftover = stream[kImpl].data.length - writeIndex;
      if (leftover > 0) {
        if (stream[kImpl].buf.length === 0) {
          stream[kImpl].flushing = false;
          if (stream[kImpl].ending) {
            end(stream);
          } else if (stream[kImpl].needDrain) {
            process.nextTick(drain, stream);
          }
          return;
        }
        let toWrite = stream[kImpl].buf.slice(0, leftover);
        let toWriteBytes = Buffer.byteLength(toWrite);
        if (toWriteBytes <= leftover) {
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, nextFlush.bind(null, stream));
        } else {
          stream.flush(() => {
            if (stream.destroyed) {
              return;
            }
            Atomics.store(stream[kImpl].state, READ_INDEX, 0);
            Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
            while (toWriteBytes > stream[kImpl].data.length) {
              leftover = leftover / 2;
              toWrite = stream[kImpl].buf.slice(0, leftover);
              toWriteBytes = Buffer.byteLength(toWrite);
            }
            stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
            write(stream, toWrite, nextFlush.bind(null, stream));
          });
        }
      } else if (leftover === 0) {
        if (writeIndex === 0 && stream[kImpl].buf.length === 0) {
          return;
        }
        stream.flush(() => {
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          nextFlush(stream);
        });
      } else {
        destroy(stream, new Error("overwritten"));
      }
    }
    function onWorkerMessage(msg) {
      const stream = this.stream.deref();
      if (stream === void 0) {
        this.exited = true;
        this.terminate();
        return;
      }
      switch (msg.code) {
        case "READY":
          this.stream = new WeakRef2(stream);
          stream.flush(() => {
            stream[kImpl].ready = true;
            stream.emit("ready");
          });
          break;
        case "ERROR":
          destroy(stream, msg.err);
          break;
        case "EVENT":
          if (Array.isArray(msg.args)) {
            stream.emit(msg.name, ...msg.args);
          } else {
            stream.emit(msg.name, msg.args);
          }
          break;
        case "WARNING":
          process.emitWarning(msg.err);
          break;
        default:
          destroy(stream, new Error("this should not happen: " + msg.code));
      }
    }
    function onWorkerExit(code) {
      const stream = this.stream.deref();
      if (stream === void 0) {
        return;
      }
      registry.unregister(stream);
      stream.worker.exited = true;
      stream.worker.off("exit", onWorkerExit);
      destroy(stream, code !== 0 ? new Error("the worker thread exited") : null);
    }
    var ThreadStream = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        if (opts.bufferSize < 4) {
          throw new Error("bufferSize must at least fit a 4-byte utf-8 char");
        }
        this[kImpl] = {};
        this[kImpl].stateBuf = new SharedArrayBuffer(128);
        this[kImpl].state = new Int32Array(this[kImpl].stateBuf);
        this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024);
        this[kImpl].data = Buffer.from(this[kImpl].dataBuf);
        this[kImpl].sync = opts.sync || false;
        this[kImpl].ending = false;
        this[kImpl].ended = false;
        this[kImpl].needDrain = false;
        this[kImpl].destroyed = false;
        this[kImpl].flushing = false;
        this[kImpl].ready = false;
        this[kImpl].finished = false;
        this[kImpl].errored = null;
        this[kImpl].closed = false;
        this[kImpl].buf = "";
        this.worker = createWorker(this, opts);
        this.on("message", (message, transferList) => {
          this.worker.postMessage(message, transferList);
        });
      }
      write(data) {
        if (this[kImpl].destroyed) {
          error(this, new Error("the worker has exited"));
          return false;
        }
        if (this[kImpl].ending) {
          error(this, new Error("the worker is ending"));
          return false;
        }
        if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
          try {
            writeSync(this);
            this[kImpl].flushing = true;
          } catch (err) {
            destroy(this, err);
            return false;
          }
        }
        this[kImpl].buf += data;
        if (this[kImpl].sync) {
          try {
            writeSync(this);
            return true;
          } catch (err) {
            destroy(this, err);
            return false;
          }
        }
        if (!this[kImpl].flushing) {
          this[kImpl].flushing = true;
          setImmediate(nextFlush, this);
        }
        this[kImpl].needDrain = this[kImpl].data.length - this[kImpl].buf.length - Atomics.load(this[kImpl].state, WRITE_INDEX) <= 0;
        return !this[kImpl].needDrain;
      }
      end() {
        if (this[kImpl].destroyed) {
          return;
        }
        this[kImpl].ending = true;
        end(this);
      }
      flush(cb) {
        if (this[kImpl].destroyed) {
          if (typeof cb === "function") {
            process.nextTick(cb, new Error("the worker has exited"));
          }
          return;
        }
        const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX);
        wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err, res) => {
          if (err) {
            destroy(this, err);
            process.nextTick(cb, err);
            return;
          }
          if (res === "not-equal") {
            this.flush(cb);
            return;
          }
          process.nextTick(cb);
        });
      }
      flushSync() {
        if (this[kImpl].destroyed) {
          return;
        }
        writeSync(this);
        flushSync(this);
      }
      unref() {
        this.worker.unref();
      }
      ref() {
        this.worker.ref();
      }
      get ready() {
        return this[kImpl].ready;
      }
      get destroyed() {
        return this[kImpl].destroyed;
      }
      get closed() {
        return this[kImpl].closed;
      }
      get writable() {
        return !this[kImpl].destroyed && !this[kImpl].ending;
      }
      get writableEnded() {
        return this[kImpl].ending;
      }
      get writableFinished() {
        return this[kImpl].finished;
      }
      get writableNeedDrain() {
        return this[kImpl].needDrain;
      }
      get writableObjectMode() {
        return false;
      }
      get writableErrored() {
        return this[kImpl].errored;
      }
    };
    function error(stream, err) {
      setImmediate(() => {
        stream.emit("error", err);
      });
    }
    function destroy(stream, err) {
      if (stream[kImpl].destroyed) {
        return;
      }
      stream[kImpl].destroyed = true;
      if (err) {
        stream[kImpl].errored = err;
        error(stream, err);
      }
      if (!stream.worker.exited) {
        stream.worker.terminate().catch(() => {
        }).then(() => {
          stream[kImpl].closed = true;
          stream.emit("close");
        });
      } else {
        setImmediate(() => {
          stream[kImpl].closed = true;
          stream.emit("close");
        });
      }
    }
    function write(stream, data, cb) {
      const current = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      const length = Buffer.byteLength(data);
      stream[kImpl].data.write(data, current);
      Atomics.store(stream[kImpl].state, WRITE_INDEX, current + length);
      Atomics.notify(stream[kImpl].state, WRITE_INDEX);
      cb();
      return true;
    }
    function end(stream) {
      if (stream[kImpl].ended || !stream[kImpl].ending || stream[kImpl].flushing) {
        return;
      }
      stream[kImpl].ended = true;
      try {
        stream.flushSync();
        let readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
        Atomics.store(stream[kImpl].state, WRITE_INDEX, -1);
        Atomics.notify(stream[kImpl].state, WRITE_INDEX);
        let spins = 0;
        while (readIndex !== -1) {
          Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1e3);
          readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
          if (readIndex === -2) {
            destroy(stream, new Error("end() failed"));
            return;
          }
          if (++spins === 10) {
            destroy(stream, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          stream[kImpl].finished = true;
          stream.emit("finish");
        });
      } catch (err) {
        destroy(stream, err);
      }
    }
    function writeSync(stream) {
      const cb = () => {
        if (stream[kImpl].ending) {
          end(stream);
        } else if (stream[kImpl].needDrain) {
          process.nextTick(drain, stream);
        }
      };
      stream[kImpl].flushing = false;
      while (stream[kImpl].buf.length !== 0) {
        const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
        let leftover = stream[kImpl].data.length - writeIndex;
        if (leftover === 0) {
          flushSync(stream);
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          continue;
        } else if (leftover < 0) {
          throw new Error("overwritten");
        }
        let toWrite = stream[kImpl].buf.slice(0, leftover);
        let toWriteBytes = Buffer.byteLength(toWrite);
        if (toWriteBytes <= leftover) {
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, cb);
        } else {
          flushSync(stream);
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          while (toWriteBytes > stream[kImpl].buf.length) {
            leftover = leftover / 2;
            toWrite = stream[kImpl].buf.slice(0, leftover);
            toWriteBytes = Buffer.byteLength(toWrite);
          }
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, cb);
        }
      }
    }
    function flushSync(stream) {
      if (stream[kImpl].flushing) {
        throw new Error("unable to flush while flushing");
      }
      const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      let spins = 0;
      while (true) {
        const readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
        if (readIndex === -2) {
          throw Error("_flushSync failed");
        }
        if (readIndex !== writeIndex) {
          Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1e3);
        } else {
          break;
        }
        if (++spins === 10) {
          throw new Error("_flushSync took too long (10s)");
        }
      }
    }
    module2.exports = ThreadStream;
  }
});

// ../node_modules/pino/lib/transport.js
var require_transport = __commonJS({
  "../node_modules/pino/lib/transport.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { createRequire } = require("module");
    var getCallers = require_caller();
    var { join: join4, isAbsolute, sep } = require("node:path");
    var sleep = require_atomic_sleep();
    var onExit = require_on_exit_leak_free();
    var ThreadStream = require_thread_stream();
    function setupOnExit(stream) {
      onExit.register(stream, autoEnd);
      onExit.registerBeforeExit(stream, flush);
      stream.on("close", function() {
        onExit.unregister(stream);
      });
    }
    function buildStream(filename, workerData, workerOpts, sync) {
      const stream = new ThreadStream({
        filename,
        workerData,
        workerOpts,
        sync
      });
      stream.on("ready", onReady);
      stream.on("close", function() {
        process.removeListener("exit", onExit2);
      });
      process.on("exit", onExit2);
      function onReady() {
        process.removeListener("exit", onExit2);
        stream.unref();
        if (workerOpts.autoEnd !== false) {
          setupOnExit(stream);
        }
      }
      function onExit2() {
        if (stream.closed) {
          return;
        }
        stream.flushSync();
        sleep(100);
        stream.end();
      }
      return stream;
    }
    function autoEnd(stream) {
      stream.ref();
      stream.flushSync();
      stream.end();
      stream.once("close", function() {
        stream.unref();
      });
    }
    function flush(stream) {
      stream.flushSync();
    }
    function transport(fullOptions) {
      const { pipeline, targets, levels, dedupe, worker = {}, caller = getCallers(), sync = false } = fullOptions;
      const options = {
        ...fullOptions.options
      };
      const callers = typeof caller === "string" ? [caller] : caller;
      const bundlerOverrides = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {};
      let target = fullOptions.target;
      if (target && targets) {
        throw new Error("only one of target or targets can be specified");
      }
      if (targets) {
        target = bundlerOverrides["pino-worker"] || join4(__dirname, "worker.js");
        options.targets = targets.filter((dest) => dest.target).map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target)
          };
        });
        options.pipelines = targets.filter((dest) => dest.pipeline).map((dest) => {
          return dest.pipeline.map((t) => {
            return {
              ...t,
              level: dest.level,
              // duplicate the pipeline `level` property defined in the upper level
              target: fixTarget(t.target)
            };
          });
        });
      } else if (pipeline) {
        target = bundlerOverrides["pino-worker"] || join4(__dirname, "worker.js");
        options.pipelines = [pipeline.map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target)
          };
        })];
      }
      if (levels) {
        options.levels = levels;
      }
      if (dedupe) {
        options.dedupe = dedupe;
      }
      options.pinoWillSendConfig = true;
      return buildStream(fixTarget(target), options, worker, sync);
      function fixTarget(origin) {
        origin = bundlerOverrides[origin] || origin;
        if (isAbsolute(origin) || origin.indexOf("file://") === 0) {
          return origin;
        }
        if (origin === "pino/file") {
          return join4(__dirname, "..", "file.js");
        }
        let fixTarget2;
        for (const filePath of callers) {
          try {
            const context = filePath === "node:repl" ? process.cwd() + sep : filePath;
            fixTarget2 = createRequire(context).resolve(origin);
            break;
          } catch (err) {
            continue;
          }
        }
        if (!fixTarget2) {
          throw new Error(`unable to determine transport target for "${origin}"`);
        }
        return fixTarget2;
      }
    }
    module2.exports = transport;
  }
});

// ../node_modules/pino/lib/tools.js
var require_tools = __commonJS({
  "../node_modules/pino/lib/tools.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var format = require_quick_format_unescaped();
    var { mapHttpRequest, mapHttpResponse } = require_pino_std_serializers();
    var SonicBoom = require_sonic_boom();
    var onExit = require_on_exit_leak_free();
    var {
      lsCacheSym,
      chindingsSym,
      writeSym,
      serializersSym,
      formatOptsSym,
      endSym,
      stringifiersSym,
      stringifySym,
      stringifySafeSym,
      wildcardFirstSym,
      nestedKeySym,
      formattersSym,
      messageKeySym,
      errorKeySym,
      nestedKeyStrSym,
      msgPrefixSym
    } = require_symbols();
    var { isMainThread } = require("worker_threads");
    var transport = require_transport();
    function noop() {
    }
    function genLog(level, hook) {
      if (!hook) return LOG;
      return function hookWrappedLog(...args) {
        hook.call(this, args, LOG, level);
      };
      function LOG(o, ...n) {
        if (typeof o === "object") {
          let msg = o;
          if (o !== null) {
            if (o.method && o.headers && o.socket) {
              o = mapHttpRequest(o);
            } else if (typeof o.setHeader === "function") {
              o = mapHttpResponse(o);
            }
          }
          let formatParams;
          if (msg === null && n.length === 0) {
            formatParams = [null];
          } else {
            msg = n.shift();
            formatParams = n;
          }
          if (typeof this[msgPrefixSym] === "string" && msg !== void 0 && msg !== null) {
            msg = this[msgPrefixSym] + msg;
          }
          this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
        } else {
          let msg = o === void 0 ? n.shift() : o;
          if (typeof this[msgPrefixSym] === "string" && msg !== void 0 && msg !== null) {
            msg = this[msgPrefixSym] + msg;
          }
          this[writeSym](null, format(msg, n, this[formatOptsSym]), level);
        }
      }
    }
    function asString(str) {
      let result = "";
      let last = 0;
      let found = false;
      let point = 255;
      const l = str.length;
      if (l > 100) {
        return JSON.stringify(str);
      }
      for (var i = 0; i < l && point >= 32; i++) {
        point = str.charCodeAt(i);
        if (point === 34 || point === 92) {
          result += str.slice(last, i) + "\\";
          last = i;
          found = true;
        }
      }
      if (!found) {
        result = str;
      } else {
        result += str.slice(last);
      }
      return point < 32 ? JSON.stringify(str) : '"' + result + '"';
    }
    function asJson(obj, msg, num, time) {
      const stringify2 = this[stringifySym];
      const stringifySafe = this[stringifySafeSym];
      const stringifiers = this[stringifiersSym];
      const end = this[endSym];
      const chindings = this[chindingsSym];
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const messageKey = this[messageKeySym];
      const errorKey = this[errorKeySym];
      let data = this[lsCacheSym][num] + time;
      data = data + chindings;
      let value;
      if (formatters.log) {
        obj = formatters.log(obj);
      }
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      let propStr = "";
      for (const key in obj) {
        value = obj[key];
        if (Object.prototype.hasOwnProperty.call(obj, key) && value !== void 0) {
          if (serializers[key]) {
            value = serializers[key](value);
          } else if (key === errorKey && serializers.err) {
            value = serializers.err(value);
          }
          const stringifier = stringifiers[key] || wildcardStringifier;
          switch (typeof value) {
            case "undefined":
            case "function":
              continue;
            case "number":
              if (Number.isFinite(value) === false) {
                value = null;
              }
            case "boolean":
              if (stringifier) value = stringifier(value);
              break;
            case "string":
              value = (stringifier || asString)(value);
              break;
            default:
              value = (stringifier || stringify2)(value, stringifySafe);
          }
          if (value === void 0) continue;
          const strKey = asString(key);
          propStr += "," + strKey + ":" + value;
        }
      }
      let msgStr = "";
      if (msg !== void 0) {
        value = serializers[messageKey] ? serializers[messageKey](msg) : msg;
        const stringifier = stringifiers[messageKey] || wildcardStringifier;
        switch (typeof value) {
          case "function":
            break;
          case "number":
            if (Number.isFinite(value) === false) {
              value = null;
            }
          case "boolean":
            if (stringifier) value = stringifier(value);
            msgStr = ',"' + messageKey + '":' + value;
            break;
          case "string":
            value = (stringifier || asString)(value);
            msgStr = ',"' + messageKey + '":' + value;
            break;
          default:
            value = (stringifier || stringify2)(value, stringifySafe);
            msgStr = ',"' + messageKey + '":' + value;
        }
      }
      if (this[nestedKeySym] && propStr) {
        return data + this[nestedKeyStrSym] + propStr.slice(1) + "}" + msgStr + end;
      } else {
        return data + propStr + msgStr + end;
      }
    }
    function asChindings(instance, bindings) {
      let value;
      let data = instance[chindingsSym];
      const stringify2 = instance[stringifySym];
      const stringifySafe = instance[stringifySafeSym];
      const stringifiers = instance[stringifiersSym];
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      const serializers = instance[serializersSym];
      const formatter = instance[formattersSym].bindings;
      bindings = formatter(bindings);
      for (const key in bindings) {
        value = bindings[key];
        const valid = key !== "level" && key !== "serializers" && key !== "formatters" && key !== "customLevels" && bindings.hasOwnProperty(key) && value !== void 0;
        if (valid === true) {
          value = serializers[key] ? serializers[key](value) : value;
          value = (stringifiers[key] || wildcardStringifier || stringify2)(value, stringifySafe);
          if (value === void 0) continue;
          data += ',"' + key + '":' + value;
        }
      }
      return data;
    }
    function hasBeenTampered(stream) {
      return stream.write !== stream.constructor.prototype.write;
    }
    var hasNodeCodeCoverage = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
    function buildSafeSonicBoom(opts) {
      const stream = new SonicBoom(opts);
      stream.on("error", filterBrokenPipe);
      if (!hasNodeCodeCoverage && !opts.sync && isMainThread) {
        onExit.register(stream, autoEnd);
        stream.on("close", function() {
          onExit.unregister(stream);
        });
      }
      return stream;
      function filterBrokenPipe(err) {
        if (err.code === "EPIPE") {
          stream.write = noop;
          stream.end = noop;
          stream.flushSync = noop;
          stream.destroy = noop;
          return;
        }
        stream.removeListener("error", filterBrokenPipe);
        stream.emit("error", err);
      }
    }
    function autoEnd(stream, eventName) {
      if (stream.destroyed) {
        return;
      }
      if (eventName === "beforeExit") {
        stream.flush();
        stream.on("drain", function() {
          stream.end();
        });
      } else {
        stream.flushSync();
      }
    }
    function createArgsNormalizer(defaultOptions) {
      return function normalizeArgs(instance, caller, opts = {}, stream) {
        if (typeof opts === "string") {
          stream = buildSafeSonicBoom({ dest: opts });
          opts = {};
        } else if (typeof stream === "string") {
          if (opts && opts.transport) {
            throw Error("only one of option.transport or stream can be specified");
          }
          stream = buildSafeSonicBoom({ dest: stream });
        } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
          stream = opts;
          opts = {};
        } else if (opts.transport) {
          if (opts.transport instanceof SonicBoom || opts.transport.writable || opts.transport._writableState) {
            throw Error("option.transport do not allow stream, please pass to option directly. e.g. pino(transport)");
          }
          if (opts.transport.targets && opts.transport.targets.length && opts.formatters && typeof opts.formatters.level === "function") {
            throw Error("option.transport.targets do not allow custom level formatters");
          }
          let customLevels;
          if (opts.customLevels) {
            customLevels = opts.useOnlyCustomLevels ? opts.customLevels : Object.assign({}, opts.levels, opts.customLevels);
          }
          stream = transport({ caller, ...opts.transport, levels: customLevels });
        }
        opts = Object.assign({}, defaultOptions, opts);
        opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers);
        opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters);
        if (opts.prettyPrint) {
          throw new Error("prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)");
        }
        const { enabled, onChild } = opts;
        if (enabled === false) opts.level = "silent";
        if (!onChild) opts.onChild = noop;
        if (!stream) {
          if (!hasBeenTampered(process.stdout)) {
            stream = buildSafeSonicBoom({ fd: process.stdout.fd || 1 });
          } else {
            stream = process.stdout;
          }
        }
        return { opts, stream };
      };
    }
    function stringify(obj, stringifySafeFn) {
      try {
        return JSON.stringify(obj);
      } catch (_) {
        try {
          const stringify2 = stringifySafeFn || this[stringifySafeSym];
          return stringify2(obj);
        } catch (_2) {
          return '"[unable to serialize, circular reference is too complex to analyze]"';
        }
      }
    }
    function buildFormatters(level, bindings, log) {
      return {
        level,
        bindings,
        log
      };
    }
    function normalizeDestFileDescriptor(destination) {
      const fd = Number(destination);
      if (typeof destination === "string" && Number.isFinite(fd)) {
        return fd;
      }
      if (destination === void 0) {
        return 1;
      }
      return destination;
    }
    module2.exports = {
      noop,
      buildSafeSonicBoom,
      asChindings,
      asJson,
      genLog,
      createArgsNormalizer,
      stringify,
      buildFormatters,
      normalizeDestFileDescriptor
    };
  }
});

// ../node_modules/pino/lib/constants.js
var require_constants = __commonJS({
  "../node_modules/pino/lib/constants.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    var DEFAULT_LEVELS = {
      trace: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60
    };
    var SORTING_ORDER = {
      ASC: "ASC",
      DESC: "DESC"
    };
    module2.exports = {
      DEFAULT_LEVELS,
      SORTING_ORDER
    };
  }
});

// ../node_modules/pino/lib/levels.js
var require_levels = __commonJS({
  "../node_modules/pino/lib/levels.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var {
      lsCacheSym,
      levelValSym,
      useOnlyCustomLevelsSym,
      streamSym,
      formattersSym,
      hooksSym,
      levelCompSym
    } = require_symbols();
    var { noop, genLog } = require_tools();
    var { DEFAULT_LEVELS, SORTING_ORDER } = require_constants();
    var levelMethods = {
      fatal: (hook) => {
        const logFatal = genLog(DEFAULT_LEVELS.fatal, hook);
        return function(...args) {
          const stream = this[streamSym];
          logFatal.call(this, ...args);
          if (typeof stream.flushSync === "function") {
            try {
              stream.flushSync();
            } catch (e) {
            }
          }
        };
      },
      error: (hook) => genLog(DEFAULT_LEVELS.error, hook),
      warn: (hook) => genLog(DEFAULT_LEVELS.warn, hook),
      info: (hook) => genLog(DEFAULT_LEVELS.info, hook),
      debug: (hook) => genLog(DEFAULT_LEVELS.debug, hook),
      trace: (hook) => genLog(DEFAULT_LEVELS.trace, hook)
    };
    var nums = Object.keys(DEFAULT_LEVELS).reduce((o, k) => {
      o[DEFAULT_LEVELS[k]] = k;
      return o;
    }, {});
    var initialLsCache = Object.keys(nums).reduce((o, k) => {
      o[k] = '{"level":' + Number(k);
      return o;
    }, {});
    function genLsCache(instance) {
      const formatter = instance[formattersSym].level;
      const { labels } = instance.levels;
      const cache = {};
      for (const label in labels) {
        const level = formatter(labels[label], Number(label));
        cache[label] = JSON.stringify(level).slice(0, -1);
      }
      instance[lsCacheSym] = cache;
      return instance;
    }
    function isStandardLevel(level, useOnlyCustomLevels) {
      if (useOnlyCustomLevels) {
        return false;
      }
      switch (level) {
        case "fatal":
        case "error":
        case "warn":
        case "info":
        case "debug":
        case "trace":
          return true;
        default:
          return false;
      }
    }
    function setLevel(level) {
      const { labels, values } = this.levels;
      if (typeof level === "number") {
        if (labels[level] === void 0) throw Error("unknown level value" + level);
        level = labels[level];
      }
      if (values[level] === void 0) throw Error("unknown level " + level);
      const preLevelVal = this[levelValSym];
      const levelVal = this[levelValSym] = values[level];
      const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
      const levelComparison = this[levelCompSym];
      const hook = this[hooksSym].logMethod;
      for (const key in values) {
        if (levelComparison(values[key], levelVal) === false) {
          this[key] = noop;
          continue;
        }
        this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook);
      }
      this.emit(
        "level-change",
        level,
        levelVal,
        labels[preLevelVal],
        preLevelVal,
        this
      );
    }
    function getLevel(level) {
      const { levels, levelVal } = this;
      return levels && levels.labels ? levels.labels[levelVal] : "";
    }
    function isLevelEnabled(logLevel) {
      const { values } = this.levels;
      const logLevelVal = values[logLevel];
      return logLevelVal !== void 0 && this[levelCompSym](logLevelVal, this[levelValSym]);
    }
    function compareLevel(direction, current, expected) {
      if (direction === SORTING_ORDER.DESC) {
        return current <= expected;
      }
      return current >= expected;
    }
    function genLevelComparison(levelComparison) {
      if (typeof levelComparison === "string") {
        return compareLevel.bind(null, levelComparison);
      }
      return levelComparison;
    }
    function mappings(customLevels = null, useOnlyCustomLevels = false) {
      const customNums = customLevels ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o;
      }, {}) : null;
      const labels = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        useOnlyCustomLevels ? null : nums,
        customNums
      );
      const values = Object.assign(
        Object.create(Object.prototype, { silent: { value: Infinity } }),
        useOnlyCustomLevels ? null : DEFAULT_LEVELS,
        customLevels
      );
      return { labels, values };
    }
    function assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
      if (typeof defaultLevel === "number") {
        const values = [].concat(
          Object.keys(customLevels || {}).map((key) => customLevels[key]),
          useOnlyCustomLevels ? [] : Object.keys(nums).map((level) => +level),
          Infinity
        );
        if (!values.includes(defaultLevel)) {
          throw Error(`default level:${defaultLevel} must be included in custom levels`);
        }
        return;
      }
      const labels = Object.assign(
        Object.create(Object.prototype, { silent: { value: Infinity } }),
        useOnlyCustomLevels ? null : DEFAULT_LEVELS,
        customLevels
      );
      if (!(defaultLevel in labels)) {
        throw Error(`default level:${defaultLevel} must be included in custom levels`);
      }
    }
    function assertNoLevelCollisions(levels, customLevels) {
      const { labels, values } = levels;
      for (const k in customLevels) {
        if (k in values) {
          throw Error("levels cannot be overridden");
        }
        if (customLevels[k] in labels) {
          throw Error("pre-existing level values cannot be used for new levels");
        }
      }
    }
    function assertLevelComparison(levelComparison) {
      if (typeof levelComparison === "function") {
        return;
      }
      if (typeof levelComparison === "string" && Object.values(SORTING_ORDER).includes(levelComparison)) {
        return;
      }
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
    }
    module2.exports = {
      initialLsCache,
      genLsCache,
      levelMethods,
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      assertNoLevelCollisions,
      assertDefaultLevelFound,
      genLevelComparison,
      assertLevelComparison
    };
  }
});

// ../node_modules/pino/lib/meta.js
var require_meta = __commonJS({
  "../node_modules/pino/lib/meta.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = { version: "9.5.0" };
  }
});

// ../node_modules/pino/lib/proto.js
var require_proto = __commonJS({
  "../node_modules/pino/lib/proto.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { EventEmitter } = require("node:events");
    var {
      lsCacheSym,
      levelValSym,
      setLevelSym,
      getLevelSym,
      chindingsSym,
      parsedChindingsSym,
      mixinSym,
      asJsonSym,
      writeSym,
      mixinMergeStrategySym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      serializersSym,
      formattersSym,
      errorKeySym,
      messageKeySym,
      useOnlyCustomLevelsSym,
      needsMetadataGsym,
      redactFmtSym,
      stringifySym,
      formatOptsSym,
      stringifiersSym,
      msgPrefixSym
    } = require_symbols();
    var {
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      initialLsCache,
      genLsCache,
      assertNoLevelCollisions
    } = require_levels();
    var {
      asChindings,
      asJson,
      buildFormatters,
      stringify
    } = require_tools();
    var {
      version
    } = require_meta();
    var redaction = require_redaction();
    var constructor = class Pino {
    };
    var prototype = {
      constructor,
      child,
      bindings,
      setBindings,
      flush,
      isLevelEnabled,
      version,
      get level() {
        return this[getLevelSym]();
      },
      set level(lvl) {
        this[setLevelSym](lvl);
      },
      get levelVal() {
        return this[levelValSym];
      },
      set levelVal(n) {
        throw Error("levelVal is read-only");
      },
      [lsCacheSym]: initialLsCache,
      [writeSym]: write,
      [asJsonSym]: asJson,
      [getLevelSym]: getLevel,
      [setLevelSym]: setLevel
    };
    Object.setPrototypeOf(prototype, EventEmitter.prototype);
    module2.exports = function() {
      return Object.create(prototype);
    };
    var resetChildingsFormatter = (bindings2) => bindings2;
    function child(bindings2, options) {
      if (!bindings2) {
        throw Error("missing bindings for child Pino");
      }
      options = options || {};
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const instance = Object.create(this);
      if (options.hasOwnProperty("serializers") === true) {
        instance[serializersSym] = /* @__PURE__ */ Object.create(null);
        for (const k in serializers) {
          instance[serializersSym][k] = serializers[k];
        }
        const parentSymbols = Object.getOwnPropertySymbols(serializers);
        for (var i = 0; i < parentSymbols.length; i++) {
          const ks = parentSymbols[i];
          instance[serializersSym][ks] = serializers[ks];
        }
        for (const bk in options.serializers) {
          instance[serializersSym][bk] = options.serializers[bk];
        }
        const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
        for (var bi = 0; bi < bindingsSymbols.length; bi++) {
          const bks = bindingsSymbols[bi];
          instance[serializersSym][bks] = options.serializers[bks];
        }
      } else instance[serializersSym] = serializers;
      if (options.hasOwnProperty("formatters")) {
        const { level, bindings: chindings, log } = options.formatters;
        instance[formattersSym] = buildFormatters(
          level || formatters.level,
          chindings || resetChildingsFormatter,
          log || formatters.log
        );
      } else {
        instance[formattersSym] = buildFormatters(
          formatters.level,
          resetChildingsFormatter,
          formatters.log
        );
      }
      if (options.hasOwnProperty("customLevels") === true) {
        assertNoLevelCollisions(this.levels, options.customLevels);
        instance.levels = mappings(options.customLevels, instance[useOnlyCustomLevelsSym]);
        genLsCache(instance);
      }
      if (typeof options.redact === "object" && options.redact !== null || Array.isArray(options.redact)) {
        instance.redact = options.redact;
        const stringifiers = redaction(instance.redact, stringify);
        const formatOpts = { stringify: stringifiers[redactFmtSym] };
        instance[stringifySym] = stringify;
        instance[stringifiersSym] = stringifiers;
        instance[formatOptsSym] = formatOpts;
      }
      if (typeof options.msgPrefix === "string") {
        instance[msgPrefixSym] = (this[msgPrefixSym] || "") + options.msgPrefix;
      }
      instance[chindingsSym] = asChindings(instance, bindings2);
      const childLevel = options.level || this.level;
      instance[setLevelSym](childLevel);
      this.onChild(instance);
      return instance;
    }
    function bindings() {
      const chindings = this[chindingsSym];
      const chindingsJson = `{${chindings.substr(1)}}`;
      const bindingsFromJson = JSON.parse(chindingsJson);
      delete bindingsFromJson.pid;
      delete bindingsFromJson.hostname;
      return bindingsFromJson;
    }
    function setBindings(newBindings) {
      const chindings = asChindings(this, newBindings);
      this[chindingsSym] = chindings;
      delete this[parsedChindingsSym];
    }
    function defaultMixinMergeStrategy(mergeObject, mixinObject) {
      return Object.assign(mixinObject, mergeObject);
    }
    function write(_obj, msg, num) {
      const t = this[timeSym]();
      const mixin = this[mixinSym];
      const errorKey = this[errorKeySym];
      const messageKey = this[messageKeySym];
      const mixinMergeStrategy = this[mixinMergeStrategySym] || defaultMixinMergeStrategy;
      let obj;
      if (_obj === void 0 || _obj === null) {
        obj = {};
      } else if (_obj instanceof Error) {
        obj = { [errorKey]: _obj };
        if (msg === void 0) {
          msg = _obj.message;
        }
      } else {
        obj = _obj;
        if (msg === void 0 && _obj[messageKey] === void 0 && _obj[errorKey]) {
          msg = _obj[errorKey].message;
        }
      }
      if (mixin) {
        obj = mixinMergeStrategy(obj, mixin(obj, num, this));
      }
      const s = this[asJsonSym](obj, msg, num, t);
      const stream = this[streamSym];
      if (stream[needsMetadataGsym] === true) {
        stream.lastLevel = num;
        stream.lastObj = obj;
        stream.lastMsg = msg;
        stream.lastTime = t.slice(this[timeSliceIndexSym]);
        stream.lastLogger = this;
      }
      stream.write(s);
    }
    function noop() {
    }
    function flush(cb) {
      if (cb != null && typeof cb !== "function") {
        throw Error("callback must be a function");
      }
      const stream = this[streamSym];
      if (typeof stream.flush === "function") {
        stream.flush(cb || noop);
      } else if (cb) cb();
    }
  }
});

// ../node_modules/safe-stable-stringify/index.js
var require_safe_stable_stringify = __commonJS({
  "../node_modules/safe-stable-stringify/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { hasOwnProperty } = Object.prototype;
    var stringify = configure();
    stringify.configure = configure;
    stringify.stringify = stringify;
    stringify.default = stringify;
    exports2.stringify = stringify;
    exports2.configure = configure;
    module2.exports = stringify;
    var strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;
    function strEscape(str) {
      if (str.length < 5e3 && !strEscapeSequencesRegExp.test(str)) {
        return `"${str}"`;
      }
      return JSON.stringify(str);
    }
    function sort(array, comparator) {
      if (array.length > 200 || comparator) {
        return array.sort(comparator);
      }
      for (let i = 1; i < array.length; i++) {
        const currentValue = array[i];
        let position = i;
        while (position !== 0 && array[position - 1] > currentValue) {
          array[position] = array[position - 1];
          position--;
        }
        array[position] = currentValue;
      }
      return array;
    }
    var typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(
        Object.getPrototypeOf(
          new Int8Array()
        )
      ),
      Symbol.toStringTag
    ).get;
    function isTypedArrayWithEntries(value) {
      return typedArrayPrototypeGetSymbolToStringTag.call(value) !== void 0 && value.length !== 0;
    }
    function stringifyTypedArray(array, separator, maximumBreadth) {
      if (array.length < maximumBreadth) {
        maximumBreadth = array.length;
      }
      const whitespace = separator === "," ? "" : " ";
      let res = `"0":${whitespace}${array[0]}`;
      for (let i = 1; i < maximumBreadth; i++) {
        res += `${separator}"${i}":${whitespace}${array[i]}`;
      }
      return res;
    }
    function getCircularValueOption(options) {
      if (hasOwnProperty.call(options, "circularValue")) {
        const circularValue = options.circularValue;
        if (typeof circularValue === "string") {
          return `"${circularValue}"`;
        }
        if (circularValue == null) {
          return circularValue;
        }
        if (circularValue === Error || circularValue === TypeError) {
          return {
            toString() {
              throw new TypeError("Converting circular structure to JSON");
            }
          };
        }
        throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
      }
      return '"[Circular]"';
    }
    function getDeterministicOption(options) {
      let value;
      if (hasOwnProperty.call(options, "deterministic")) {
        value = options.deterministic;
        if (typeof value !== "boolean" && typeof value !== "function") {
          throw new TypeError('The "deterministic" argument must be of type boolean or comparator function');
        }
      }
      return value === void 0 ? true : value;
    }
    function getBooleanOption(options, key) {
      let value;
      if (hasOwnProperty.call(options, key)) {
        value = options[key];
        if (typeof value !== "boolean") {
          throw new TypeError(`The "${key}" argument must be of type boolean`);
        }
      }
      return value === void 0 ? true : value;
    }
    function getPositiveIntegerOption(options, key) {
      let value;
      if (hasOwnProperty.call(options, key)) {
        value = options[key];
        if (typeof value !== "number") {
          throw new TypeError(`The "${key}" argument must be of type number`);
        }
        if (!Number.isInteger(value)) {
          throw new TypeError(`The "${key}" argument must be an integer`);
        }
        if (value < 1) {
          throw new RangeError(`The "${key}" argument must be >= 1`);
        }
      }
      return value === void 0 ? Infinity : value;
    }
    function getItemCount(number) {
      if (number === 1) {
        return "1 item";
      }
      return `${number} items`;
    }
    function getUniqueReplacerSet(replacerArray) {
      const replacerSet = /* @__PURE__ */ new Set();
      for (const value of replacerArray) {
        if (typeof value === "string" || typeof value === "number") {
          replacerSet.add(String(value));
        }
      }
      return replacerSet;
    }
    function getStrictOption(options) {
      if (hasOwnProperty.call(options, "strict")) {
        const value = options.strict;
        if (typeof value !== "boolean") {
          throw new TypeError('The "strict" argument must be of type boolean');
        }
        if (value) {
          return (value2) => {
            let message = `Object can not safely be stringified. Received type ${typeof value2}`;
            if (typeof value2 !== "function") message += ` (${value2.toString()})`;
            throw new Error(message);
          };
        }
      }
    }
    function configure(options) {
      options = { ...options };
      const fail = getStrictOption(options);
      if (fail) {
        if (options.bigint === void 0) {
          options.bigint = false;
        }
        if (!("circularValue" in options)) {
          options.circularValue = Error;
        }
      }
      const circularValue = getCircularValueOption(options);
      const bigint = getBooleanOption(options, "bigint");
      const deterministic = getDeterministicOption(options);
      const comparator = typeof deterministic === "function" ? deterministic : void 0;
      const maximumDepth = getPositiveIntegerOption(options, "maximumDepth");
      const maximumBreadth = getPositiveIntegerOption(options, "maximumBreadth");
      function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
        let value = parent[key];
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        value = replacer.call(parent, key, value);
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            let join4 = ",";
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join4 = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join4;
              }
              const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join4}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let whitespace = "";
            let separator = "";
            if (spacer !== "") {
              indentation += spacer;
              join4 = `,
${indentation}`;
              whitespace = " ";
            }
            const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (deterministic && !isTypedArrayWithEntries(value)) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyFnReplacer(key2, value, stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join4;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
              separator = join4;
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifyArrayReplacer(key, value, stack, replacer, spacer, indentation) {
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            let res = "";
            let join4 = ",";
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join4 = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join4;
              }
              const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join4}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            stack.push(value);
            let whitespace = "";
            if (spacer !== "") {
              indentation += spacer;
              join4 = `,
${indentation}`;
              whitespace = " ";
            }
            let separator = "";
            for (const key2 of replacer) {
              const tmp = stringifyArrayReplacer(key2, value[key2], stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join4;
              }
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifyIndent(key, value, stack, spacer, indentation) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifyIndent(key, value, stack, spacer, indentation);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              indentation += spacer;
              let res2 = `
${indentation}`;
              const join5 = `,
${indentation}`;
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyIndent(String(i), value[i], stack, spacer, indentation);
                res2 += tmp2 !== void 0 ? tmp2 : "null";
                res2 += join5;
              }
              const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
              res2 += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `${join5}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              res2 += `
${originalIndentation}`;
              stack.pop();
              return `[${res2}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            indentation += spacer;
            const join4 = `,
${indentation}`;
            let res = "";
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, join4, maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = join4;
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyIndent(key2, value[key2], stack, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}: ${tmp}`;
                separator = join4;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
              separator = join4;
            }
            if (separator !== "") {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifySimple(key, value, stack) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifySimple(key, value, stack);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            const hasLength = value.length !== void 0;
            if (hasLength && Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifySimple(String(i), value[i], stack);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += ",";
              }
              const tmp = stringifySimple(String(i), value[i], stack);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `,"... ${getItemCount(removedKeys)} not stringified"`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (hasLength && isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, ",", maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = ",";
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifySimple(key2, value[key2], stack);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${tmp}`;
                separator = ",";
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringify2(value, replacer, space) {
        if (arguments.length > 1) {
          let spacer = "";
          if (typeof space === "number") {
            spacer = " ".repeat(Math.min(space, 10));
          } else if (typeof space === "string") {
            spacer = space.slice(0, 10);
          }
          if (replacer != null) {
            if (typeof replacer === "function") {
              return stringifyFnReplacer("", { "": value }, [], replacer, spacer, "");
            }
            if (Array.isArray(replacer)) {
              return stringifyArrayReplacer("", value, [], getUniqueReplacerSet(replacer), spacer, "");
            }
          }
          if (spacer.length !== 0) {
            return stringifyIndent("", value, [], spacer, "");
          }
        }
        return stringifySimple("", value, []);
      }
      return stringify2;
    }
  }
});

// ../node_modules/pino/lib/multistream.js
var require_multistream = __commonJS({
  "../node_modules/pino/lib/multistream.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var metadata = Symbol.for("pino.metadata");
    var { DEFAULT_LEVELS } = require_constants();
    var DEFAULT_INFO_LEVEL = DEFAULT_LEVELS.info;
    function multistream(streamsArray, opts) {
      let counter = 0;
      streamsArray = streamsArray || [];
      opts = opts || { dedupe: false };
      const streamLevels = Object.create(DEFAULT_LEVELS);
      streamLevels.silent = Infinity;
      if (opts.levels && typeof opts.levels === "object") {
        Object.keys(opts.levels).forEach((i) => {
          streamLevels[i] = opts.levels[i];
        });
      }
      const res = {
        write,
        add,
        emit,
        flushSync,
        end,
        minLevel: 0,
        streams: [],
        clone,
        [metadata]: true,
        streamLevels
      };
      if (Array.isArray(streamsArray)) {
        streamsArray.forEach(add, res);
      } else {
        add.call(res, streamsArray);
      }
      streamsArray = null;
      return res;
      function write(data) {
        let dest;
        const level = this.lastLevel;
        const { streams } = this;
        let recordedLevel = 0;
        let stream;
        for (let i = initLoopVar(streams.length, opts.dedupe); checkLoopVar(i, streams.length, opts.dedupe); i = adjustLoopVar(i, opts.dedupe)) {
          dest = streams[i];
          if (dest.level <= level) {
            if (recordedLevel !== 0 && recordedLevel !== dest.level) {
              break;
            }
            stream = dest.stream;
            if (stream[metadata]) {
              const { lastTime, lastMsg, lastObj, lastLogger } = this;
              stream.lastLevel = level;
              stream.lastTime = lastTime;
              stream.lastMsg = lastMsg;
              stream.lastObj = lastObj;
              stream.lastLogger = lastLogger;
            }
            stream.write(data);
            if (opts.dedupe) {
              recordedLevel = dest.level;
            }
          } else if (!opts.dedupe) {
            break;
          }
        }
      }
      function emit(...args) {
        for (const { stream } of this.streams) {
          if (typeof stream.emit === "function") {
            stream.emit(...args);
          }
        }
      }
      function flushSync() {
        for (const { stream } of this.streams) {
          if (typeof stream.flushSync === "function") {
            stream.flushSync();
          }
        }
      }
      function add(dest) {
        if (!dest) {
          return res;
        }
        const isStream = typeof dest.write === "function" || dest.stream;
        const stream_ = dest.write ? dest : dest.stream;
        if (!isStream) {
          throw Error("stream object needs to implement either StreamEntry or DestinationStream interface");
        }
        const { streams, streamLevels: streamLevels2 } = this;
        let level;
        if (typeof dest.levelVal === "number") {
          level = dest.levelVal;
        } else if (typeof dest.level === "string") {
          level = streamLevels2[dest.level];
        } else if (typeof dest.level === "number") {
          level = dest.level;
        } else {
          level = DEFAULT_INFO_LEVEL;
        }
        const dest_ = {
          stream: stream_,
          level,
          levelVal: void 0,
          id: counter++
        };
        streams.unshift(dest_);
        streams.sort(compareByLevel);
        this.minLevel = streams[0].level;
        return res;
      }
      function end() {
        for (const { stream } of this.streams) {
          if (typeof stream.flushSync === "function") {
            stream.flushSync();
          }
          stream.end();
        }
      }
      function clone(level) {
        const streams = new Array(this.streams.length);
        for (let i = 0; i < streams.length; i++) {
          streams[i] = {
            level,
            stream: this.streams[i].stream
          };
        }
        return {
          write,
          add,
          minLevel: level,
          streams,
          clone,
          emit,
          flushSync,
          [metadata]: true
        };
      }
    }
    function compareByLevel(a, b) {
      return a.level - b.level;
    }
    function initLoopVar(length, dedupe) {
      return dedupe ? length - 1 : 0;
    }
    function adjustLoopVar(i, dedupe) {
      return dedupe ? i - 1 : i + 1;
    }
    function checkLoopVar(i, length, dedupe) {
      return dedupe ? i >= 0 : i < length;
    }
    module2.exports = multistream;
  }
});

// ../node_modules/pino/pino.js
var require_pino = __commonJS({
  "../node_modules/pino/pino.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var os = require("node:os");
    var stdSerializers = require_pino_std_serializers();
    var caller = require_caller();
    var redaction = require_redaction();
    var time = require_time();
    var proto = require_proto();
    var symbols = require_symbols();
    var { configure } = require_safe_stable_stringify();
    var { assertDefaultLevelFound, mappings, genLsCache, genLevelComparison, assertLevelComparison } = require_levels();
    var { DEFAULT_LEVELS, SORTING_ORDER } = require_constants();
    var {
      createArgsNormalizer,
      asChindings,
      buildSafeSonicBoom,
      buildFormatters,
      stringify,
      normalizeDestFileDescriptor,
      noop
    } = require_tools();
    var { version } = require_meta();
    var {
      chindingsSym,
      redactFmtSym,
      serializersSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifySafeSym,
      stringifiersSym,
      setLevelSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      errorKeySym,
      nestedKeySym,
      mixinSym,
      levelCompSym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym,
      nestedKeyStrSym,
      mixinMergeStrategySym,
      msgPrefixSym
    } = symbols;
    var { epochTime, nullTime } = time;
    var { pid } = process;
    var hostname = os.hostname();
    var defaultErrorSerializer = stdSerializers.err;
    var defaultOptions = {
      level: "info",
      levelComparison: SORTING_ORDER.ASC,
      levels: DEFAULT_LEVELS,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: true,
      base: { pid, hostname },
      serializers: Object.assign(/* @__PURE__ */ Object.create(null), {
        err: defaultErrorSerializer
      }),
      formatters: Object.assign(/* @__PURE__ */ Object.create(null), {
        bindings(bindings) {
          return bindings;
        },
        level(label, number) {
          return { level: number };
        }
      }),
      hooks: {
        logMethod: void 0
      },
      timestamp: epochTime,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: false,
      depthLimit: 5,
      edgeLimit: 100
    };
    var normalize = createArgsNormalizer(defaultOptions);
    var serializers = Object.assign(/* @__PURE__ */ Object.create(null), stdSerializers);
    function pino2(...args) {
      const instance = {};
      const { opts, stream } = normalize(instance, caller(), ...args);
      if (opts.level && typeof opts.level === "string" && DEFAULT_LEVELS[opts.level.toLowerCase()] !== void 0) opts.level = opts.level.toLowerCase();
      const {
        redact,
        crlf,
        serializers: serializers2,
        timestamp,
        messageKey,
        errorKey,
        nestedKey,
        base,
        name,
        level,
        customLevels,
        levelComparison,
        mixin,
        mixinMergeStrategy,
        useOnlyCustomLevels,
        formatters,
        hooks,
        depthLimit,
        edgeLimit,
        onChild,
        msgPrefix
      } = opts;
      const stringifySafe = configure({
        maximumDepth: depthLimit,
        maximumBreadth: edgeLimit
      });
      const allFormatters = buildFormatters(
        formatters.level,
        formatters.bindings,
        formatters.log
      );
      const stringifyFn = stringify.bind({
        [stringifySafeSym]: stringifySafe
      });
      const stringifiers = redact ? redaction(redact, stringifyFn) : {};
      const formatOpts = redact ? { stringify: stringifiers[redactFmtSym] } : { stringify: stringifyFn };
      const end = "}" + (crlf ? "\r\n" : "\n");
      const coreChindings = asChindings.bind(null, {
        [chindingsSym]: "",
        [serializersSym]: serializers2,
        [stringifiersSym]: stringifiers,
        [stringifySym]: stringify,
        [stringifySafeSym]: stringifySafe,
        [formattersSym]: allFormatters
      });
      let chindings = "";
      if (base !== null) {
        if (name === void 0) {
          chindings = coreChindings(base);
        } else {
          chindings = coreChindings(Object.assign({}, base, { name }));
        }
      }
      const time2 = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
      const timeSliceIndex = time2().indexOf(":") + 1;
      if (useOnlyCustomLevels && !customLevels) throw Error("customLevels is required if useOnlyCustomLevels is set true");
      if (mixin && typeof mixin !== "function") throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
      if (msgPrefix && typeof msgPrefix !== "string") throw Error(`Unknown msgPrefix type "${typeof msgPrefix}" - expected "string"`);
      assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
      const levels = mappings(customLevels, useOnlyCustomLevels);
      if (typeof stream.emit === "function") {
        stream.emit("message", { code: "PINO_CONFIG", config: { levels, messageKey, errorKey } });
      }
      assertLevelComparison(levelComparison);
      const levelCompFunc = genLevelComparison(levelComparison);
      Object.assign(instance, {
        levels,
        [levelCompSym]: levelCompFunc,
        [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
        [streamSym]: stream,
        [timeSym]: time2,
        [timeSliceIndexSym]: timeSliceIndex,
        [stringifySym]: stringify,
        [stringifySafeSym]: stringifySafe,
        [stringifiersSym]: stringifiers,
        [endSym]: end,
        [formatOptsSym]: formatOpts,
        [messageKeySym]: messageKey,
        [errorKeySym]: errorKey,
        [nestedKeySym]: nestedKey,
        // protect against injection
        [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : "",
        [serializersSym]: serializers2,
        [mixinSym]: mixin,
        [mixinMergeStrategySym]: mixinMergeStrategy,
        [chindingsSym]: chindings,
        [formattersSym]: allFormatters,
        [hooksSym]: hooks,
        silent: noop,
        onChild,
        [msgPrefixSym]: msgPrefix
      });
      Object.setPrototypeOf(instance, proto());
      genLsCache(instance);
      instance[setLevelSym](level);
      return instance;
    }
    module2.exports = pino2;
    module2.exports.destination = (dest = process.stdout.fd) => {
      if (typeof dest === "object") {
        dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd);
        return buildSafeSonicBoom(dest);
      } else {
        return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0 });
      }
    };
    module2.exports.transport = require_transport();
    module2.exports.multistream = require_multistream();
    module2.exports.levels = mappings();
    module2.exports.stdSerializers = serializers;
    module2.exports.stdTimeFunctions = Object.assign({}, time);
    module2.exports.symbols = symbols;
    module2.exports.version = version;
    module2.exports.default = pino2;
    module2.exports.pino = pino2;
  }
});

// ../node_modules/colorette/index.cjs
var require_colorette = __commonJS({
  "../node_modules/colorette/index.cjs"(exports2) {
    "use strict";
    init_import_meta_url_polyfill();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tty = require("tty");
    function _interopNamespace(e) {
      if (e && e.__esModule) return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var tty__namespace = /* @__PURE__ */ _interopNamespace(tty);
    var {
      env = {},
      argv = [],
      platform = ""
    } = typeof process === "undefined" ? {} : process;
    var isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
    var isForced = "FORCE_COLOR" in env || argv.includes("--color");
    var isWindows = platform === "win32";
    var isDumbTerminal = env.TERM === "dumb";
    var isCompatibleTerminal = tty__namespace && tty__namespace.isatty && tty__namespace.isatty(1) && env.TERM && !isDumbTerminal;
    var isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
    var isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
    var replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
    var clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
    var filterEmpty = (open, close, replace = open, at = open.length + 1) => (string) => string || !(string === "" || string === void 0) ? clearBleed(
      ("" + string).indexOf(close, at),
      string,
      open,
      close,
      replace
    ) : "";
    var init = (open, close, replace) => filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
    var colors = {
      reset: init(0, 0),
      bold: init(1, 22, "\x1B[22m\x1B[1m"),
      dim: init(2, 22, "\x1B[22m\x1B[2m"),
      italic: init(3, 23),
      underline: init(4, 24),
      inverse: init(7, 27),
      hidden: init(8, 28),
      strikethrough: init(9, 29),
      black: init(30, 39),
      red: init(31, 39),
      green: init(32, 39),
      yellow: init(33, 39),
      blue: init(34, 39),
      magenta: init(35, 39),
      cyan: init(36, 39),
      white: init(37, 39),
      gray: init(90, 39),
      bgBlack: init(40, 49),
      bgRed: init(41, 49),
      bgGreen: init(42, 49),
      bgYellow: init(43, 49),
      bgBlue: init(44, 49),
      bgMagenta: init(45, 49),
      bgCyan: init(46, 49),
      bgWhite: init(47, 49),
      blackBright: init(90, 39),
      redBright: init(91, 39),
      greenBright: init(92, 39),
      yellowBright: init(93, 39),
      blueBright: init(94, 39),
      magentaBright: init(95, 39),
      cyanBright: init(96, 39),
      whiteBright: init(97, 39),
      bgBlackBright: init(100, 49),
      bgRedBright: init(101, 49),
      bgGreenBright: init(102, 49),
      bgYellowBright: init(103, 49),
      bgBlueBright: init(104, 49),
      bgMagentaBright: init(105, 49),
      bgCyanBright: init(106, 49),
      bgWhiteBright: init(107, 49)
    };
    var createColors = ({ useColor = isColorSupported } = {}) => useColor ? colors : Object.keys(colors).reduce(
      (colors2, key) => ({ ...colors2, [key]: String }),
      {}
    );
    var {
      reset,
      bold,
      dim,
      italic,
      underline,
      inverse,
      hidden,
      strikethrough,
      black,
      red,
      green,
      yellow,
      blue,
      magenta,
      cyan,
      white,
      gray,
      bgBlack,
      bgRed,
      bgGreen,
      bgYellow,
      bgBlue,
      bgMagenta,
      bgCyan,
      bgWhite,
      blackBright,
      redBright,
      greenBright,
      yellowBright,
      blueBright,
      magentaBright,
      cyanBright,
      whiteBright,
      bgBlackBright,
      bgRedBright,
      bgGreenBright,
      bgYellowBright,
      bgBlueBright,
      bgMagentaBright,
      bgCyanBright,
      bgWhiteBright
    } = createColors();
    exports2.bgBlack = bgBlack;
    exports2.bgBlackBright = bgBlackBright;
    exports2.bgBlue = bgBlue;
    exports2.bgBlueBright = bgBlueBright;
    exports2.bgCyan = bgCyan;
    exports2.bgCyanBright = bgCyanBright;
    exports2.bgGreen = bgGreen;
    exports2.bgGreenBright = bgGreenBright;
    exports2.bgMagenta = bgMagenta;
    exports2.bgMagentaBright = bgMagentaBright;
    exports2.bgRed = bgRed;
    exports2.bgRedBright = bgRedBright;
    exports2.bgWhite = bgWhite;
    exports2.bgWhiteBright = bgWhiteBright;
    exports2.bgYellow = bgYellow;
    exports2.bgYellowBright = bgYellowBright;
    exports2.black = black;
    exports2.blackBright = blackBright;
    exports2.blue = blue;
    exports2.blueBright = blueBright;
    exports2.bold = bold;
    exports2.createColors = createColors;
    exports2.cyan = cyan;
    exports2.cyanBright = cyanBright;
    exports2.dim = dim;
    exports2.gray = gray;
    exports2.green = green;
    exports2.greenBright = greenBright;
    exports2.hidden = hidden;
    exports2.inverse = inverse;
    exports2.isColorSupported = isColorSupported;
    exports2.italic = italic;
    exports2.magenta = magenta;
    exports2.magentaBright = magentaBright;
    exports2.red = red;
    exports2.redBright = redBright;
    exports2.reset = reset;
    exports2.strikethrough = strikethrough;
    exports2.underline = underline;
    exports2.white = white;
    exports2.whiteBright = whiteBright;
    exports2.yellow = yellow;
    exports2.yellowBright = yellowBright;
  }
});

// ../node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "../node_modules/wrappy/wrappy.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// ../node_modules/once/once.js
var require_once = __commonJS({
  "../node_modules/once/once.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// ../node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "../node_modules/end-of-stream/index.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    var once = require_once();
    var noop = function() {
    };
    var isRequest = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable) onfinish();
      };
      var onfinish = function() {
        writable = false;
        if (!readable) callback.call(stream);
      };
      var onend = function() {
        readable = false;
        if (!writable) callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        process.nextTick(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled) return;
        if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream)) stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module2.exports = eos;
  }
});

// ../node_modules/pump/index.js
var require_pump = __commonJS({
  "../node_modules/pump/index.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    var once = require_once();
    var eos = require_end_of_stream();
    var fs = require("fs");
    var noop = function() {
    };
    var ancient = /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient) return false;
      if (!fs) return false;
      return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
    };
    var isRequest = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isFS(stream)) return stream.close(noop);
        if (isRequest(stream)) return stream.abort();
        if (isFn(stream.destroy)) return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) throw new Error("pump requires two streams per minimum");
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    };
    module2.exports = pump;
  }
});

// ../node_modules/split2/index.js
var require_split2 = __commonJS({
  "../node_modules/split2/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { Transform } = require("stream");
    var { StringDecoder } = require("string_decoder");
    var kLast = Symbol("last");
    var kDecoder = Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push(this, this.mapper(list[i]));
        } catch (error) {
          return cb(error);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error) {
          return cb(error);
        }
      }
      cb();
    }
    function push(self, val) {
      if (val !== void 0) {
        self.push(val);
      }
    }
    function noop(incoming) {
      return incoming;
    }
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    module2.exports = split;
  }
});

// ../node_modules/pino-abstract-transport/index.js
var require_pino_abstract_transport = __commonJS({
  "../node_modules/pino-abstract-transport/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var metadata = Symbol.for("pino.metadata");
    var split = require_split2();
    var { Duplex } = require("stream");
    var { parentPort, workerData } = require("worker_threads");
    function createDeferred() {
      let resolve;
      let reject;
      const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      promise.resolve = resolve;
      promise.reject = reject;
      return promise;
    }
    module2.exports = function build(fn, opts = {}) {
      const waitForConfig = opts.expectPinoConfig === true && workerData?.workerData?.pinoWillSendConfig === true;
      const parseLines = opts.parse === "lines";
      const parseLine = typeof opts.parseLine === "function" ? opts.parseLine : JSON.parse;
      const close = opts.close || defaultClose;
      const stream = split(function(line) {
        let value;
        try {
          value = parseLine(line);
        } catch (error) {
          this.emit("unknown", line, error);
          return;
        }
        if (value === null) {
          this.emit("unknown", line, "Null value ignored");
          return;
        }
        if (typeof value !== "object") {
          value = {
            data: value,
            time: Date.now()
          };
        }
        if (stream[metadata]) {
          stream.lastTime = value.time;
          stream.lastLevel = value.level;
          stream.lastObj = value;
        }
        if (parseLines) {
          return line;
        }
        return value;
      }, { autoDestroy: true });
      stream._destroy = function(err, cb) {
        const promise = close(err, cb);
        if (promise && typeof promise.then === "function") {
          promise.then(cb, cb);
        }
      };
      if (opts.expectPinoConfig === true && workerData?.workerData?.pinoWillSendConfig !== true) {
        setImmediate(() => {
          stream.emit("error", new Error("This transport is not compatible with the current version of pino. Please upgrade pino to the latest version."));
        });
      }
      if (opts.metadata !== false) {
        stream[metadata] = true;
        stream.lastTime = 0;
        stream.lastLevel = 0;
        stream.lastObj = null;
      }
      if (waitForConfig) {
        let pinoConfig = {};
        const configReceived = createDeferred();
        parentPort.on("message", function handleMessage(message) {
          if (message.code === "PINO_CONFIG") {
            pinoConfig = message.config;
            configReceived.resolve();
            parentPort.off("message", handleMessage);
          }
        });
        Object.defineProperties(stream, {
          levels: {
            get() {
              return pinoConfig.levels;
            }
          },
          messageKey: {
            get() {
              return pinoConfig.messageKey;
            }
          },
          errorKey: {
            get() {
              return pinoConfig.errorKey;
            }
          }
        });
        return configReceived.then(finish);
      }
      return finish();
      function finish() {
        let res = fn(stream);
        if (res && typeof res.catch === "function") {
          res.catch((err) => {
            stream.destroy(err);
          });
          res = null;
        } else if (opts.enablePipelining && res) {
          return Duplex.from({ writable: stream, readable: res });
        }
        return stream;
      }
    };
    function defaultClose(err, cb) {
      process.nextTick(cb, err);
    }
  }
});

// ../node_modules/pino-pretty/lib/constants.js
var require_constants2 = __commonJS({
  "../node_modules/pino-pretty/lib/constants.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = {
      DATE_FORMAT: "yyyy-mm-dd HH:MM:ss.l o",
      DATE_FORMAT_SIMPLE: "HH:MM:ss.l",
      /**
       * @type {K_ERROR_LIKE_KEYS}
       */
      ERROR_LIKE_KEYS: ["err", "error"],
      MESSAGE_KEY: "msg",
      LEVEL_KEY: "level",
      LEVEL_LABEL: "levelLabel",
      TIMESTAMP_KEY: "time",
      LEVELS: {
        default: "USERLVL",
        60: "FATAL",
        50: "ERROR",
        40: "WARN",
        30: "INFO",
        20: "DEBUG",
        10: "TRACE"
      },
      LEVEL_NAMES: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      // Object keys that probably came from a logger like Pino or Bunyan.
      LOGGER_KEYS: [
        "pid",
        "hostname",
        "name",
        "level",
        "time",
        "timestamp",
        "caller"
      ]
    };
  }
});

// ../node_modules/pino-pretty/lib/utils/get-level-label-data.js
var require_get_level_label_data = __commonJS({
  "../node_modules/pino-pretty/lib/utils/get-level-label-data.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = getLevelLabelData;
    var { LEVELS, LEVEL_NAMES } = require_constants2();
    function getLevelLabelData(useOnlyCustomProps, customLevels, customLevelNames) {
      const levels = useOnlyCustomProps ? customLevels || LEVELS : Object.assign({}, LEVELS, customLevels);
      const levelNames = useOnlyCustomProps ? customLevelNames || LEVEL_NAMES : Object.assign({}, LEVEL_NAMES, customLevelNames);
      return function(level) {
        let levelNum = "default";
        if (Number.isInteger(+level)) {
          levelNum = Object.prototype.hasOwnProperty.call(levels, level) ? level : levelNum;
        } else {
          levelNum = Object.prototype.hasOwnProperty.call(levelNames, level.toLowerCase()) ? levelNames[level.toLowerCase()] : levelNum;
        }
        return [levels[levelNum], levelNum];
      };
    }
  }
});

// ../node_modules/pino-pretty/lib/colors.js
var require_colors = __commonJS({
  "../node_modules/pino-pretty/lib/colors.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var nocolor = (input) => input;
    var plain = {
      default: nocolor,
      60: nocolor,
      50: nocolor,
      40: nocolor,
      30: nocolor,
      20: nocolor,
      10: nocolor,
      message: nocolor,
      greyMessage: nocolor
    };
    var { createColors } = require_colorette();
    var getLevelLabelData = require_get_level_label_data();
    var availableColors = createColors({ useColor: true });
    var { white, bgRed, red, yellow, green, blue, gray, cyan } = availableColors;
    var colored = {
      default: white,
      60: bgRed,
      50: red,
      40: yellow,
      30: green,
      20: blue,
      10: gray,
      message: cyan,
      greyMessage: gray
    };
    function resolveCustomColoredColorizer(customColors) {
      return customColors.reduce(
        function(agg, [level, color]) {
          agg[level] = typeof availableColors[color] === "function" ? availableColors[color] : white;
          return agg;
        },
        { default: white, message: cyan, greyMessage: gray }
      );
    }
    function colorizeLevel(useOnlyCustomProps) {
      return function(level, colorizer, { customLevels, customLevelNames } = {}) {
        const [levelStr, levelNum] = getLevelLabelData(useOnlyCustomProps, customLevels, customLevelNames)(level);
        return Object.prototype.hasOwnProperty.call(colorizer, levelNum) ? colorizer[levelNum](levelStr) : colorizer.default(levelStr);
      };
    }
    function plainColorizer(useOnlyCustomProps) {
      const newPlainColorizer = colorizeLevel(useOnlyCustomProps);
      const customColoredColorizer = function(level, opts) {
        return newPlainColorizer(level, plain, opts);
      };
      customColoredColorizer.message = plain.message;
      customColoredColorizer.greyMessage = plain.greyMessage;
      customColoredColorizer.colors = createColors({ useColor: false });
      return customColoredColorizer;
    }
    function coloredColorizer(useOnlyCustomProps) {
      const newColoredColorizer = colorizeLevel(useOnlyCustomProps);
      const customColoredColorizer = function(level, opts) {
        return newColoredColorizer(level, colored, opts);
      };
      customColoredColorizer.message = colored.message;
      customColoredColorizer.greyMessage = colored.greyMessage;
      customColoredColorizer.colors = availableColors;
      return customColoredColorizer;
    }
    function customColoredColorizerFactory(customColors, useOnlyCustomProps) {
      const onlyCustomColored = resolveCustomColoredColorizer(customColors);
      const customColored = useOnlyCustomProps ? onlyCustomColored : Object.assign({}, colored, onlyCustomColored);
      const colorizeLevelCustom = colorizeLevel(useOnlyCustomProps);
      const customColoredColorizer = function(level, opts) {
        return colorizeLevelCustom(level, customColored, opts);
      };
      customColoredColorizer.colors = availableColors;
      customColoredColorizer.message = customColoredColorizer.message || customColored.message;
      customColoredColorizer.greyMessage = customColoredColorizer.greyMessage || customColored.greyMessage;
      return customColoredColorizer;
    }
    module2.exports = function getColorizer(useColors = false, customColors, useOnlyCustomProps) {
      if (useColors && customColors !== void 0) {
        return customColoredColorizerFactory(customColors, useOnlyCustomProps);
      } else if (useColors) {
        return coloredColorizer(useOnlyCustomProps);
      }
      return plainColorizer(useOnlyCustomProps);
    };
  }
});

// ../node_modules/pino-pretty/lib/utils/noop.js
var require_noop = __commonJS({
  "../node_modules/pino-pretty/lib/utils/noop.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = function noop() {
    };
  }
});

// ../node_modules/pino-pretty/lib/utils/build-safe-sonic-boom.js
var require_build_safe_sonic_boom = __commonJS({
  "../node_modules/pino-pretty/lib/utils/build-safe-sonic-boom.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = buildSafeSonicBoom;
    var { isMainThread } = require("worker_threads");
    var SonicBoom = require_sonic_boom();
    var noop = require_noop();
    function buildSafeSonicBoom(opts) {
      const stream = new SonicBoom(opts);
      stream.on("error", filterBrokenPipe);
      if (!process.env.NODE_V8_COVERAGE && !opts.sync && isMainThread) {
        setupOnExit(stream);
      }
      return stream;
      function filterBrokenPipe(err) {
        if (err.code === "EPIPE") {
          stream.write = noop;
          stream.end = noop;
          stream.flushSync = noop;
          stream.destroy = noop;
          return;
        }
        stream.removeListener("error", filterBrokenPipe);
      }
    }
    function setupOnExit(stream) {
      if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
        const onExit = require_on_exit_leak_free();
        onExit.register(stream, autoEnd);
        stream.on("close", function() {
          onExit.unregister(stream);
        });
      }
    }
    function autoEnd(stream, eventName) {
      if (stream.destroyed) {
        return;
      }
      if (eventName === "beforeExit") {
        stream.flush();
        stream.on("drain", function() {
          stream.end();
        });
      } else {
        stream.flushSync();
      }
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/is-valid-date.js
var require_is_valid_date = __commonJS({
  "../node_modules/pino-pretty/lib/utils/is-valid-date.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = isValidDate;
    function isValidDate(date) {
      return date instanceof Date && !Number.isNaN(date.getTime());
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/create-date.js
var require_create_date = __commonJS({
  "../node_modules/pino-pretty/lib/utils/create-date.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = createDate;
    var isValidDate = require_is_valid_date();
    function createDate(epoch) {
      let date = new Date(epoch);
      if (isValidDate(date)) {
        return date;
      }
      date = /* @__PURE__ */ new Date(+epoch);
      return date;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/split-property-key.js
var require_split_property_key = __commonJS({
  "../node_modules/pino-pretty/lib/utils/split-property-key.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = splitPropertyKey;
    function splitPropertyKey(key) {
      const result = [];
      let backslash = false;
      let segment = "";
      for (let i = 0; i < key.length; i++) {
        const c = key.charAt(i);
        if (c === "\\") {
          backslash = true;
          continue;
        }
        if (backslash) {
          backslash = false;
          segment += c;
          continue;
        }
        if (c === ".") {
          result.push(segment);
          segment = "";
          continue;
        }
        segment += c;
      }
      if (segment.length) {
        result.push(segment);
      }
      return result;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/get-property-value.js
var require_get_property_value = __commonJS({
  "../node_modules/pino-pretty/lib/utils/get-property-value.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = getPropertyValue;
    var splitPropertyKey = require_split_property_key();
    function getPropertyValue(obj, property) {
      const props = Array.isArray(property) ? property : splitPropertyKey(property);
      for (const prop of props) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          return;
        }
        obj = obj[prop];
      }
      return obj;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/delete-log-property.js
var require_delete_log_property = __commonJS({
  "../node_modules/pino-pretty/lib/utils/delete-log-property.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = deleteLogProperty;
    var getPropertyValue = require_get_property_value();
    var splitPropertyKey = require_split_property_key();
    function deleteLogProperty(log, property) {
      const props = splitPropertyKey(property);
      const propToDelete = props.pop();
      log = getPropertyValue(log, props);
      if (log !== null && typeof log === "object" && Object.prototype.hasOwnProperty.call(log, propToDelete)) {
        delete log[propToDelete];
      }
    }
  }
});

// ../node_modules/fast-copy/dist/cjs/index.cjs
var require_cjs = __commonJS({
  "../node_modules/fast-copy/dist/cjs/index.cjs"(exports2) {
    "use strict";
    init_import_meta_url_polyfill();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var toStringFunction = Function.prototype.toString;
    var create = Object.create;
    var toStringObject = Object.prototype.toString;
    var LegacyCache = (
      /** @class */
      function() {
        function LegacyCache2() {
          this._keys = [];
          this._values = [];
        }
        LegacyCache2.prototype.has = function(key) {
          return !!~this._keys.indexOf(key);
        };
        LegacyCache2.prototype.get = function(key) {
          return this._values[this._keys.indexOf(key)];
        };
        LegacyCache2.prototype.set = function(key, value) {
          this._keys.push(key);
          this._values.push(value);
        };
        return LegacyCache2;
      }()
    );
    function createCacheLegacy() {
      return new LegacyCache();
    }
    function createCacheModern() {
      return /* @__PURE__ */ new WeakMap();
    }
    var createCache = typeof WeakMap !== "undefined" ? createCacheModern : createCacheLegacy;
    function getCleanClone(prototype) {
      if (!prototype) {
        return create(null);
      }
      var Constructor = prototype.constructor;
      if (Constructor === Object) {
        return prototype === Object.prototype ? {} : create(prototype);
      }
      if (Constructor && ~toStringFunction.call(Constructor).indexOf("[native code]")) {
        try {
          return new Constructor();
        } catch (_a2) {
        }
      }
      return create(prototype);
    }
    function getRegExpFlagsLegacy(regExp) {
      var flags = "";
      if (regExp.global) {
        flags += "g";
      }
      if (regExp.ignoreCase) {
        flags += "i";
      }
      if (regExp.multiline) {
        flags += "m";
      }
      if (regExp.unicode) {
        flags += "u";
      }
      if (regExp.sticky) {
        flags += "y";
      }
      return flags;
    }
    function getRegExpFlagsModern(regExp) {
      return regExp.flags;
    }
    var getRegExpFlags = /test/g.flags === "g" ? getRegExpFlagsModern : getRegExpFlagsLegacy;
    function getTagLegacy(value) {
      var type = toStringObject.call(value);
      return type.substring(8, type.length - 1);
    }
    function getTagModern(value) {
      return value[Symbol.toStringTag] || getTagLegacy(value);
    }
    var getTag = typeof Symbol !== "undefined" ? getTagModern : getTagLegacy;
    var defineProperty = Object.defineProperty;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var _a = Object.prototype;
    var hasOwnProperty = _a.hasOwnProperty;
    var propertyIsEnumerable = _a.propertyIsEnumerable;
    var SUPPORTS_SYMBOL = typeof getOwnPropertySymbols === "function";
    function getStrictPropertiesModern(object) {
      return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
    }
    var getStrictProperties = SUPPORTS_SYMBOL ? getStrictPropertiesModern : getOwnPropertyNames;
    function copyOwnPropertiesStrict(value, clone, state) {
      var properties = getStrictProperties(value);
      for (var index2 = 0, length_1 = properties.length, property = void 0, descriptor = void 0; index2 < length_1; ++index2) {
        property = properties[index2];
        if (property === "callee" || property === "caller") {
          continue;
        }
        descriptor = getOwnPropertyDescriptor(value, property);
        if (!descriptor) {
          clone[property] = state.copier(value[property], state);
          continue;
        }
        if (!descriptor.get && !descriptor.set) {
          descriptor.value = state.copier(descriptor.value, state);
        }
        try {
          defineProperty(clone, property, descriptor);
        } catch (error) {
          clone[property] = descriptor.value;
        }
      }
      return clone;
    }
    function copyArrayLoose(array, state) {
      var clone = new state.Constructor();
      state.cache.set(array, clone);
      for (var index2 = 0, length_2 = array.length; index2 < length_2; ++index2) {
        clone[index2] = state.copier(array[index2], state);
      }
      return clone;
    }
    function copyArrayStrict(array, state) {
      var clone = new state.Constructor();
      state.cache.set(array, clone);
      return copyOwnPropertiesStrict(array, clone, state);
    }
    function copyArrayBuffer(arrayBuffer, _state) {
      return arrayBuffer.slice(0);
    }
    function copyBlob(blob, _state) {
      return blob.slice(0, blob.size, blob.type);
    }
    function copyDataView(dataView, state) {
      return new state.Constructor(copyArrayBuffer(dataView.buffer));
    }
    function copyDate(date, state) {
      return new state.Constructor(date.getTime());
    }
    function copyMapLoose(map, state) {
      var clone = new state.Constructor();
      state.cache.set(map, clone);
      map.forEach(function(value, key) {
        clone.set(key, state.copier(value, state));
      });
      return clone;
    }
    function copyMapStrict(map, state) {
      return copyOwnPropertiesStrict(map, copyMapLoose(map, state), state);
    }
    function copyObjectLooseLegacy(object, state) {
      var clone = getCleanClone(state.prototype);
      state.cache.set(object, clone);
      for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
          clone[key] = state.copier(object[key], state);
        }
      }
      return clone;
    }
    function copyObjectLooseModern(object, state) {
      var clone = getCleanClone(state.prototype);
      state.cache.set(object, clone);
      for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
          clone[key] = state.copier(object[key], state);
        }
      }
      var symbols = getOwnPropertySymbols(object);
      for (var index2 = 0, length_3 = symbols.length, symbol = void 0; index2 < length_3; ++index2) {
        symbol = symbols[index2];
        if (propertyIsEnumerable.call(object, symbol)) {
          clone[symbol] = state.copier(object[symbol], state);
        }
      }
      return clone;
    }
    var copyObjectLoose = SUPPORTS_SYMBOL ? copyObjectLooseModern : copyObjectLooseLegacy;
    function copyObjectStrict(object, state) {
      var clone = getCleanClone(state.prototype);
      state.cache.set(object, clone);
      return copyOwnPropertiesStrict(object, clone, state);
    }
    function copyPrimitiveWrapper(primitiveObject, state) {
      return new state.Constructor(primitiveObject.valueOf());
    }
    function copyRegExp(regExp, state) {
      var clone = new state.Constructor(regExp.source, getRegExpFlags(regExp));
      clone.lastIndex = regExp.lastIndex;
      return clone;
    }
    function copySelf(value, _state) {
      return value;
    }
    function copySetLoose(set, state) {
      var clone = new state.Constructor();
      state.cache.set(set, clone);
      set.forEach(function(value) {
        clone.add(state.copier(value, state));
      });
      return clone;
    }
    function copySetStrict(set, state) {
      return copyOwnPropertiesStrict(set, copySetLoose(set, state), state);
    }
    var isArray = Array.isArray;
    var assign = Object.assign;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    var DEFAULT_LOOSE_OPTIONS = {
      array: copyArrayLoose,
      arrayBuffer: copyArrayBuffer,
      blob: copyBlob,
      dataView: copyDataView,
      date: copyDate,
      error: copySelf,
      map: copyMapLoose,
      object: copyObjectLoose,
      regExp: copyRegExp,
      set: copySetLoose
    };
    var DEFAULT_STRICT_OPTIONS = assign({}, DEFAULT_LOOSE_OPTIONS, {
      array: copyArrayStrict,
      map: copyMapStrict,
      object: copyObjectStrict,
      set: copySetStrict
    });
    function getTagSpecificCopiers(options) {
      return {
        Arguments: options.object,
        Array: options.array,
        ArrayBuffer: options.arrayBuffer,
        Blob: options.blob,
        Boolean: copyPrimitiveWrapper,
        DataView: options.dataView,
        Date: options.date,
        Error: options.error,
        Float32Array: options.arrayBuffer,
        Float64Array: options.arrayBuffer,
        Int8Array: options.arrayBuffer,
        Int16Array: options.arrayBuffer,
        Int32Array: options.arrayBuffer,
        Map: options.map,
        Number: copyPrimitiveWrapper,
        Object: options.object,
        Promise: copySelf,
        RegExp: options.regExp,
        Set: options.set,
        String: copyPrimitiveWrapper,
        WeakMap: copySelf,
        WeakSet: copySelf,
        Uint8Array: options.arrayBuffer,
        Uint8ClampedArray: options.arrayBuffer,
        Uint16Array: options.arrayBuffer,
        Uint32Array: options.arrayBuffer,
        Uint64Array: options.arrayBuffer
      };
    }
    function createCopier(options) {
      var normalizedOptions = assign({}, DEFAULT_LOOSE_OPTIONS, options);
      var tagSpecificCopiers = getTagSpecificCopiers(normalizedOptions);
      var array = tagSpecificCopiers.Array, object = tagSpecificCopiers.Object;
      function copier(value, state) {
        state.prototype = state.Constructor = void 0;
        if (!value || typeof value !== "object") {
          return value;
        }
        if (state.cache.has(value)) {
          return state.cache.get(value);
        }
        state.prototype = getPrototypeOf(value);
        state.Constructor = state.prototype && state.prototype.constructor;
        if (!state.Constructor || state.Constructor === Object) {
          return object(value, state);
        }
        if (isArray(value)) {
          return array(value, state);
        }
        var tagSpecificCopier = tagSpecificCopiers[getTag(value)];
        if (tagSpecificCopier) {
          return tagSpecificCopier(value, state);
        }
        return typeof value.then === "function" ? value : object(value, state);
      }
      return function copy(value) {
        return copier(value, {
          Constructor: void 0,
          cache: createCache(),
          copier,
          prototype: void 0
        });
      };
    }
    function createStrictCopier(options) {
      return createCopier(assign({}, DEFAULT_STRICT_OPTIONS, options));
    }
    var copyStrict = createStrictCopier({});
    var index = createCopier({});
    exports2.copyStrict = copyStrict;
    exports2.createCopier = createCopier;
    exports2.createStrictCopier = createStrictCopier;
    exports2.default = index;
  }
});

// ../node_modules/pino-pretty/lib/utils/filter-log.js
var require_filter_log = __commonJS({
  "../node_modules/pino-pretty/lib/utils/filter-log.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = filterLog;
    var { createCopier } = require_cjs();
    var fastCopy = createCopier({});
    var deleteLogProperty = require_delete_log_property();
    function filterLog({ log, context }) {
      const { ignoreKeys, includeKeys } = context;
      const logCopy = fastCopy(log);
      if (includeKeys) {
        const logIncluded = {};
        includeKeys.forEach((key) => {
          logIncluded[key] = logCopy[key];
        });
        return logIncluded;
      }
      ignoreKeys.forEach((ignoreKey) => {
        deleteLogProperty(logCopy, ignoreKey);
      });
      return logCopy;
    }
  }
});

// ../node_modules/dateformat/lib/dateformat.js
var require_dateformat = __commonJS({
  "../node_modules/dateformat/lib/dateformat.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    (function(global2) {
      var _arguments = arguments;
      var dateFormat = /* @__PURE__ */ function() {
        var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        return function(date, mask, utc, gmt) {
          if (_arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
            mask = date;
            date = void 0;
          }
          date = date || date === 0 ? date : /* @__PURE__ */ new Date();
          if (!(date instanceof Date)) {
            date = new Date(date);
          }
          if (isNaN(date)) {
            throw TypeError("Invalid date");
          }
          mask = String(dateFormat.masks[mask] || mask || dateFormat.masks["default"]);
          var maskSlice = mask.slice(0, 4);
          if (maskSlice === "UTC:" || maskSlice === "GMT:") {
            mask = mask.slice(4);
            utc = true;
            if (maskSlice === "GMT:") {
              gmt = true;
            }
          }
          var _ = function _2() {
            return utc ? "getUTC" : "get";
          };
          var _d = function d() {
            return date[_() + "Date"]();
          };
          var D = function D2() {
            return date[_() + "Day"]();
          };
          var _m = function m() {
            return date[_() + "Month"]();
          };
          var y = function y2() {
            return date[_() + "FullYear"]();
          };
          var _H = function H() {
            return date[_() + "Hours"]();
          };
          var _M = function M() {
            return date[_() + "Minutes"]();
          };
          var _s = function s() {
            return date[_() + "Seconds"]();
          };
          var _L = function L() {
            return date[_() + "Milliseconds"]();
          };
          var _o = function o() {
            return utc ? 0 : date.getTimezoneOffset();
          };
          var _W = function W() {
            return getWeek(date);
          };
          var _N = function N() {
            return getDayOfWeek(date);
          };
          var flags = { d: function d() {
            return _d();
          }, dd: function dd() {
            return pad(_d());
          }, ddd: function ddd() {
            return dateFormat.i18n.dayNames[D()];
          }, DDD: function DDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat.i18n.dayNames[D()], short: true });
          }, dddd: function dddd() {
            return dateFormat.i18n.dayNames[D() + 7];
          }, DDDD: function DDDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat.i18n.dayNames[D() + 7] });
          }, m: function m() {
            return _m() + 1;
          }, mm: function mm() {
            return pad(_m() + 1);
          }, mmm: function mmm() {
            return dateFormat.i18n.monthNames[_m()];
          }, mmmm: function mmmm() {
            return dateFormat.i18n.monthNames[_m() + 12];
          }, yy: function yy() {
            return String(y()).slice(2);
          }, yyyy: function yyyy() {
            return pad(y(), 4);
          }, h: function h() {
            return _H() % 12 || 12;
          }, hh: function hh() {
            return pad(_H() % 12 || 12);
          }, H: function H() {
            return _H();
          }, HH: function HH() {
            return pad(_H());
          }, M: function M() {
            return _M();
          }, MM: function MM() {
            return pad(_M());
          }, s: function s() {
            return _s();
          }, ss: function ss() {
            return pad(_s());
          }, l: function l() {
            return pad(_L(), 3);
          }, L: function L() {
            return pad(Math.floor(_L() / 10));
          }, t: function t() {
            return _H() < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1];
          }, tt: function tt() {
            return _H() < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3];
          }, T: function T() {
            return _H() < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5];
          }, TT: function TT() {
            return _H() < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7];
          }, Z: function Z() {
            return gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
          }, o: function o() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
          }, p: function p() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
          }, S: function S() {
            return ["th", "st", "nd", "rd"][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
          }, W: function W() {
            return _W();
          }, WW: function WW() {
            return pad(_W());
          }, N: function N() {
            return _N();
          } };
          return mask.replace(token, function(match) {
            if (match in flags) {
              return flags[match]();
            }
            return match.slice(1, match.length - 1);
          });
        };
      }();
      dateFormat.masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", paddedShortDate: "mm/dd/yyyy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" };
      dateFormat.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"] };
      var pad = function pad2(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
          val = "0" + val;
        }
        return val;
      };
      var getDayName = function getDayName2(_ref) {
        var y = _ref.y, m = _ref.m, d = _ref.d, _ = _ref._, dayName = _ref.dayName, _ref$short = _ref["short"], _short = _ref$short === void 0 ? false : _ref$short;
        var today = /* @__PURE__ */ new Date();
        var yesterday = /* @__PURE__ */ new Date();
        yesterday.setDate(yesterday[_ + "Date"]() - 1);
        var tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow[_ + "Date"]() + 1);
        var today_d = function today_d2() {
          return today[_ + "Date"]();
        };
        var today_m = function today_m2() {
          return today[_ + "Month"]();
        };
        var today_y = function today_y2() {
          return today[_ + "FullYear"]();
        };
        var yesterday_d = function yesterday_d2() {
          return yesterday[_ + "Date"]();
        };
        var yesterday_m = function yesterday_m2() {
          return yesterday[_ + "Month"]();
        };
        var yesterday_y = function yesterday_y2() {
          return yesterday[_ + "FullYear"]();
        };
        var tomorrow_d = function tomorrow_d2() {
          return tomorrow[_ + "Date"]();
        };
        var tomorrow_m = function tomorrow_m2() {
          return tomorrow[_ + "Month"]();
        };
        var tomorrow_y = function tomorrow_y2() {
          return tomorrow[_ + "FullYear"]();
        };
        if (today_y() === y && today_m() === m && today_d() === d) {
          return _short ? "Tdy" : "Today";
        } else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
          return _short ? "Ysd" : "Yesterday";
        } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
          return _short ? "Tmw" : "Tomorrow";
        }
        return dayName;
      };
      var getWeek = function getWeek2(date) {
        var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
        var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
        firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
        var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
        targetThursday.setHours(targetThursday.getHours() - ds);
        var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
        return 1 + Math.floor(weekDiff);
      };
      var getDayOfWeek = function getDayOfWeek2(date) {
        var dow = date.getDay();
        if (dow === 0) {
          dow = 7;
        }
        return dow;
      };
      var kindOf = function kindOf2(val) {
        if (val === null) {
          return "null";
        }
        if (val === void 0) {
          return "undefined";
        }
        if (_typeof(val) !== "object") {
          return _typeof(val);
        }
        if (Array.isArray(val)) {
          return "array";
        }
        return {}.toString.call(val).slice(8, -1).toLowerCase();
      };
      if (typeof define === "function" && define.amd) {
        define(function() {
          return dateFormat;
        });
      } else if ((typeof exports2 === "undefined" ? "undefined" : _typeof(exports2)) === "object") {
        module2.exports = dateFormat;
      } else {
        global2.dateFormat = dateFormat;
      }
    })(void 0);
  }
});

// ../node_modules/pino-pretty/lib/utils/format-time.js
var require_format_time = __commonJS({
  "../node_modules/pino-pretty/lib/utils/format-time.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = formatTime;
    var {
      DATE_FORMAT,
      DATE_FORMAT_SIMPLE
    } = require_constants2();
    var dateformat = require_dateformat();
    var createDate = require_create_date();
    var isValidDate = require_is_valid_date();
    function formatTime(epoch, translateTime = false) {
      if (translateTime === false) {
        return epoch;
      }
      const instant = createDate(epoch);
      if (!isValidDate(instant)) {
        return epoch;
      }
      if (translateTime === true) {
        return dateformat(instant, DATE_FORMAT_SIMPLE);
      }
      const upperFormat = translateTime.toUpperCase();
      if (upperFormat === "SYS:STANDARD") {
        return dateformat(instant, DATE_FORMAT);
      }
      const prefix = upperFormat.substr(0, 4);
      if (prefix === "SYS:" || prefix === "UTC:") {
        if (prefix === "UTC:") {
          return dateformat(instant, translateTime);
        }
        return dateformat(instant, translateTime.slice(4));
      }
      return dateformat(instant, `UTC:${translateTime}`);
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/handle-custom-levels-names-opts.js
var require_handle_custom_levels_names_opts = __commonJS({
  "../node_modules/pino-pretty/lib/utils/handle-custom-levels-names-opts.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = handleCustomLevelsNamesOpts;
    function handleCustomLevelsNamesOpts(cLevels) {
      if (!cLevels) return {};
      if (typeof cLevels === "string") {
        return cLevels.split(",").reduce((agg, value, idx) => {
          const [levelName, levelNum = idx] = value.split(":");
          agg[levelName.toLowerCase()] = levelNum;
          return agg;
        }, {});
      } else if (Object.prototype.toString.call(cLevels) === "[object Object]") {
        return Object.keys(cLevels).reduce((agg, levelName) => {
          agg[levelName.toLowerCase()] = cLevels[levelName];
          return agg;
        }, {});
      } else {
        return {};
      }
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/handle-custom-levels-opts.js
var require_handle_custom_levels_opts = __commonJS({
  "../node_modules/pino-pretty/lib/utils/handle-custom-levels-opts.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = handleCustomLevelsOpts;
    function handleCustomLevelsOpts(cLevels) {
      if (!cLevels) return {};
      if (typeof cLevels === "string") {
        return cLevels.split(",").reduce(
          (agg, value, idx) => {
            const [levelName, levelNum = idx] = value.split(":");
            agg[levelNum] = levelName.toUpperCase();
            return agg;
          },
          { default: "USERLVL" }
        );
      } else if (Object.prototype.toString.call(cLevels) === "[object Object]") {
        return Object.keys(cLevels).reduce((agg, levelName) => {
          agg[cLevels[levelName]] = levelName.toUpperCase();
          return agg;
        }, { default: "USERLVL" });
      } else {
        return {};
      }
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/interpret-conditionals.js
var require_interpret_conditionals = __commonJS({
  "../node_modules/pino-pretty/lib/utils/interpret-conditionals.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = interpretConditionals;
    var getPropertyValue = require_get_property_value();
    function interpretConditionals(messageFormat, log) {
      messageFormat = messageFormat.replace(/{if (.*?)}(.*?){end}/g, replacer);
      messageFormat = messageFormat.replace(/{if (.*?)}/g, "");
      messageFormat = messageFormat.replace(/{end}/g, "");
      return messageFormat.replace(/\s+/g, " ").trim();
      function replacer(_, key, value) {
        const propertyValue = getPropertyValue(log, key);
        if (propertyValue && value.includes(key)) {
          return value.replace(new RegExp("{" + key + "}", "g"), propertyValue);
        } else {
          return "";
        }
      }
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/is-object.js
var require_is_object = __commonJS({
  "../node_modules/pino-pretty/lib/utils/is-object.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = isObject;
    function isObject(input) {
      return Object.prototype.toString.apply(input) === "[object Object]";
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/join-lines-with-indentation.js
var require_join_lines_with_indentation = __commonJS({
  "../node_modules/pino-pretty/lib/utils/join-lines-with-indentation.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = joinLinesWithIndentation;
    function joinLinesWithIndentation({ input, ident = "    ", eol = "\n" }) {
      const lines = input.split(/\r?\n/);
      for (let i = 1; i < lines.length; i += 1) {
        lines[i] = ident + lines[i];
      }
      return lines.join(eol);
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/parse-factory-options.js
var require_parse_factory_options = __commonJS({
  "../node_modules/pino-pretty/lib/utils/parse-factory-options.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = parseFactoryOptions;
    var {
      LEVEL_NAMES
    } = require_constants2();
    var colors = require_colors();
    var handleCustomLevelsOpts = require_handle_custom_levels_opts();
    var handleCustomLevelsNamesOpts = require_handle_custom_levels_names_opts();
    var handleLevelLabelData = require_get_level_label_data();
    function parseFactoryOptions(options) {
      const EOL = options.crlf ? "\r\n" : "\n";
      const IDENT = "    ";
      const {
        customPrettifiers,
        errorLikeObjectKeys,
        hideObject,
        levelFirst,
        levelKey,
        levelLabel,
        messageFormat,
        messageKey,
        minimumLevel,
        singleLine,
        timestampKey,
        translateTime
      } = options;
      const errorProps = options.errorProps.split(",");
      const useOnlyCustomProps = typeof options.useOnlyCustomProps === "boolean" ? options.useOnlyCustomProps : options.useOnlyCustomProps === "true";
      const customLevels = handleCustomLevelsOpts(options.customLevels);
      const customLevelNames = handleCustomLevelsNamesOpts(options.customLevels);
      const getLevelLabelData = handleLevelLabelData(useOnlyCustomProps, customLevels, customLevelNames);
      let customColors;
      if (options.customColors) {
        if (typeof options.customColors === "string") {
          customColors = options.customColors.split(",").reduce((agg, value) => {
            const [level, color] = value.split(":");
            const condition = useOnlyCustomProps ? options.customLevels : customLevelNames[level] !== void 0;
            const levelNum = condition ? customLevelNames[level] : LEVEL_NAMES[level];
            const colorIdx = levelNum !== void 0 ? levelNum : level;
            agg.push([colorIdx, color]);
            return agg;
          }, []);
        } else if (typeof options.customColors === "object") {
          customColors = Object.keys(options.customColors).reduce((agg, value) => {
            const [level, color] = [value, options.customColors[value]];
            const condition = useOnlyCustomProps ? options.customLevels : customLevelNames[level] !== void 0;
            const levelNum = condition ? customLevelNames[level] : LEVEL_NAMES[level];
            const colorIdx = levelNum !== void 0 ? levelNum : level;
            agg.push([colorIdx, color]);
            return agg;
          }, []);
        } else {
          throw new Error("options.customColors must be of type string or object.");
        }
      }
      const customProperties = { customLevels, customLevelNames };
      if (useOnlyCustomProps === true && !options.customLevels) {
        customProperties.customLevels = void 0;
        customProperties.customLevelNames = void 0;
      }
      const includeKeys = options.include !== void 0 ? new Set(options.include.split(",")) : void 0;
      const ignoreKeys = !includeKeys && options.ignore ? new Set(options.ignore.split(",")) : void 0;
      const colorizer = colors(options.colorize, customColors, useOnlyCustomProps);
      const objectColorizer = options.colorizeObjects ? colorizer : colors(false, [], false);
      return {
        EOL,
        IDENT,
        colorizer,
        customColors,
        customLevelNames,
        customLevels,
        customPrettifiers,
        customProperties,
        errorLikeObjectKeys,
        errorProps,
        getLevelLabelData,
        hideObject,
        ignoreKeys,
        includeKeys,
        levelFirst,
        levelKey,
        levelLabel,
        messageFormat,
        messageKey,
        minimumLevel,
        objectColorizer,
        singleLine,
        timestampKey,
        translateTime,
        useOnlyCustomProps
      };
    }
  }
});

// ../node_modules/fast-safe-stringify/index.js
var require_fast_safe_stringify = __commonJS({
  "../node_modules/fast-safe-stringify/index.js"(exports2, module2) {
    init_import_meta_url_polyfill();
    module2.exports = stringify;
    stringify.default = stringify;
    stringify.stable = deterministicStringify;
    stringify.stableStringify = deterministicStringify;
    var LIMIT_REPLACE_NODE = "[...]";
    var CIRCULAR_REPLACE_NODE = "[Circular]";
    var arr = [];
    var replacerStack = [];
    function defaultOptions() {
      return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
      };
    }
    function stringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      decirc(obj, "", 0, [], void 0, 0, options);
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(obj, replacer, spacer);
        } else {
          res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function setReplace(replace, val, k, parent) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
      if (propertyDescriptor.get !== void 0) {
        if (propertyDescriptor.configurable) {
          Object.defineProperty(parent, k, { value: replace });
          arr.push([parent, k, val, propertyDescriptor]);
        } else {
          replacerStack.push([val, k, replace]);
        }
      } else {
        parent[k] = replace;
        arr.push([parent, k, val]);
      }
    }
    function decirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            decirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var keys = Object.keys(val);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            decirc(val[key], key, i, stack, val, depth, options);
          }
        }
        stack.pop();
      }
    }
    function compareFunction(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    function deterministicStringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(tmp, replacer, spacer);
        } else {
          res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        try {
          if (typeof val.toJSON === "function") {
            return;
          }
        } catch (_) {
          return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            deterministicDecirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var tmp = {};
          var keys = Object.keys(val).sort(compareFunction);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            deterministicDecirc(val[key], key, i, stack, val, depth, options);
            tmp[key] = val[key];
          }
          if (typeof parent !== "undefined") {
            arr.push([parent, k, val]);
            parent[k] = tmp;
          } else {
            return tmp;
          }
        }
        stack.pop();
      }
    }
    function replaceGetterValues(replacer) {
      replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
      };
      return function(key, val) {
        if (replacerStack.length > 0) {
          for (var i = 0; i < replacerStack.length; i++) {
            var part = replacerStack[i];
            if (part[1] === key && part[0] === val) {
              val = part[2];
              replacerStack.splice(i, 1);
              break;
            }
          }
        }
        return replacer.call(this, key, val);
      };
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-error.js
var require_prettify_error = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-error.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyError;
    var joinLinesWithIndentation = require_join_lines_with_indentation();
    function prettifyError({ keyName, lines, eol, ident }) {
      let result = "";
      const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol });
      const splitLines = `${ident}${keyName}: ${joinedLines}${eol}`.split(eol);
      for (let j = 0; j < splitLines.length; j += 1) {
        if (j !== 0) result += eol;
        const line = splitLines[j];
        if (/^\s*"stack"/.test(line)) {
          const matches = /^(\s*"stack":)\s*(".*"),?$/.exec(line);
          if (matches && matches.length === 3) {
            const indentSize = /^\s*/.exec(line)[0].length + 4;
            const indentation = " ".repeat(indentSize);
            const stackMessage = matches[2];
            result += matches[1] + eol + indentation + JSON.parse(stackMessage).replace(/\n/g, eol + indentation);
          } else {
            result += line;
          }
        } else {
          result += line;
        }
      }
      return result;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-object.js
var require_prettify_object = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-object.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyObject;
    var {
      LOGGER_KEYS
    } = require_constants2();
    var stringifySafe = require_fast_safe_stringify();
    var joinLinesWithIndentation = require_join_lines_with_indentation();
    var prettifyError = require_prettify_error();
    function prettifyObject({
      log,
      excludeLoggerKeys = true,
      skipKeys = [],
      context
    }) {
      const {
        EOL: eol,
        IDENT: ident,
        customPrettifiers,
        errorLikeObjectKeys: errorLikeKeys,
        objectColorizer,
        singleLine,
        colorizer
      } = context;
      const keysToIgnore = [].concat(skipKeys);
      if (excludeLoggerKeys === true) Array.prototype.push.apply(keysToIgnore, LOGGER_KEYS);
      let result = "";
      const { plain, errors } = Object.entries(log).reduce(({ plain: plain2, errors: errors2 }, [k, v]) => {
        if (keysToIgnore.includes(k) === false) {
          const pretty = typeof customPrettifiers[k] === "function" ? customPrettifiers[k](v, k, log, { colors: colorizer.colors }) : v;
          if (errorLikeKeys.includes(k)) {
            errors2[k] = pretty;
          } else {
            plain2[k] = pretty;
          }
        }
        return { plain: plain2, errors: errors2 };
      }, { plain: {}, errors: {} });
      if (singleLine) {
        if (Object.keys(plain).length > 0) {
          result += objectColorizer.greyMessage(stringifySafe(plain));
        }
        result += eol;
        result = result.replace(/\\\\/gi, "\\");
      } else {
        Object.entries(plain).forEach(([keyName, keyValue]) => {
          let lines = typeof customPrettifiers[keyName] === "function" ? keyValue : stringifySafe(keyValue, null, 2);
          if (lines === void 0) return;
          lines = lines.replace(/\\\\/gi, "\\");
          const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol });
          result += `${ident}${keyName}:${joinedLines.startsWith(eol) ? "" : " "}${joinedLines}${eol}`;
        });
      }
      Object.entries(errors).forEach(([keyName, keyValue]) => {
        const lines = typeof customPrettifiers[keyName] === "function" ? keyValue : stringifySafe(keyValue, null, 2);
        if (lines === void 0) return;
        result += prettifyError({ keyName, lines, eol, ident });
      });
      return result;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-error-log.js
var require_prettify_error_log = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-error-log.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyErrorLog;
    var {
      LOGGER_KEYS
    } = require_constants2();
    var isObject = require_is_object();
    var joinLinesWithIndentation = require_join_lines_with_indentation();
    var prettifyObject = require_prettify_object();
    function prettifyErrorLog({ log, context }) {
      const {
        EOL: eol,
        IDENT: ident,
        errorProps: errorProperties,
        messageKey
      } = context;
      const stack = log.stack;
      const joinedLines = joinLinesWithIndentation({ input: stack, ident, eol });
      let result = `${ident}${joinedLines}${eol}`;
      if (errorProperties.length > 0) {
        const excludeProperties = LOGGER_KEYS.concat(messageKey, "type", "stack");
        let propertiesToPrint;
        if (errorProperties[0] === "*") {
          propertiesToPrint = Object.keys(log).filter((k) => excludeProperties.includes(k) === false);
        } else {
          propertiesToPrint = errorProperties.filter((k) => excludeProperties.includes(k) === false);
        }
        for (let i = 0; i < propertiesToPrint.length; i += 1) {
          const key = propertiesToPrint[i];
          if (key in log === false) continue;
          if (isObject(log[key])) {
            const prettifiedObject = prettifyObject({
              log: log[key],
              excludeLoggerKeys: false,
              context: {
                ...context,
                IDENT: ident + ident
              }
            });
            result = `${result}${ident}${key}: {${eol}${prettifiedObject}${ident}}${eol}`;
            continue;
          }
          result = `${result}${ident}${key}: ${log[key]}${eol}`;
        }
      }
      return result;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-level.js
var require_prettify_level = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-level.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyLevel;
    var getPropertyValue = require_get_property_value();
    function prettifyLevel({ log, context }) {
      const {
        colorizer,
        customLevels,
        customLevelNames,
        levelKey,
        getLevelLabelData
      } = context;
      const prettifier = context.customPrettifiers?.level;
      const output = getPropertyValue(log, levelKey);
      if (output === void 0) return void 0;
      const labelColorized = colorizer(output, { customLevels, customLevelNames });
      if (prettifier) {
        const [label] = getLevelLabelData(output);
        return prettifier(output, levelKey, log, { label, labelColorized, colors: colorizer.colors });
      }
      return labelColorized;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-message.js
var require_prettify_message = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-message.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyMessage;
    var {
      LEVELS
    } = require_constants2();
    var getPropertyValue = require_get_property_value();
    var interpretConditionals = require_interpret_conditionals();
    function prettifyMessage({ log, context }) {
      const {
        colorizer,
        customLevels,
        levelKey,
        levelLabel,
        messageFormat,
        messageKey,
        useOnlyCustomProps
      } = context;
      if (messageFormat && typeof messageFormat === "string") {
        const parsedMessageFormat = interpretConditionals(messageFormat, log);
        const message = String(parsedMessageFormat).replace(
          /{([^{}]+)}/g,
          function(match, p1) {
            let level;
            if (p1 === levelLabel && (level = getPropertyValue(log, levelKey)) !== void 0) {
              const condition = useOnlyCustomProps ? customLevels === void 0 : customLevels[level] === void 0;
              return condition ? LEVELS[level] : customLevels[level];
            }
            return getPropertyValue(log, p1) || "";
          }
        );
        return colorizer.message(message);
      }
      if (messageFormat && typeof messageFormat === "function") {
        const msg = messageFormat(log, messageKey, levelLabel, { colors: colorizer.colors });
        return colorizer.message(msg);
      }
      if (messageKey in log === false) return void 0;
      if (typeof log[messageKey] !== "string" && typeof log[messageKey] !== "number" && typeof log[messageKey] !== "boolean") return void 0;
      return colorizer.message(log[messageKey]);
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-metadata.js
var require_prettify_metadata = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-metadata.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyMetadata;
    function prettifyMetadata({ log, context }) {
      const { customPrettifiers: prettifiers, colorizer } = context;
      let line = "";
      if (log.name || log.pid || log.hostname) {
        line += "(";
        if (log.name) {
          line += prettifiers.name ? prettifiers.name(log.name, "name", log, { colors: colorizer.colors }) : log.name;
        }
        if (log.pid) {
          const prettyPid = prettifiers.pid ? prettifiers.pid(log.pid, "pid", log, { colors: colorizer.colors }) : log.pid;
          if (log.name && log.pid) {
            line += "/" + prettyPid;
          } else {
            line += prettyPid;
          }
        }
        if (log.hostname) {
          const prettyHostname = prettifiers.hostname ? prettifiers.hostname(log.hostname, "hostname", log, { colors: colorizer.colors }) : log.hostname;
          line += `${line === "(" ? "on" : " on"} ${prettyHostname}`;
        }
        line += ")";
      }
      if (log.caller) {
        const prettyCaller = prettifiers.caller ? prettifiers.caller(log.caller, "caller", log, { colors: colorizer.colors }) : log.caller;
        line += `${line === "" ? "" : " "}<${prettyCaller}>`;
      }
      if (line === "") {
        return void 0;
      } else {
        return line;
      }
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/prettify-time.js
var require_prettify_time = __commonJS({
  "../node_modules/pino-pretty/lib/utils/prettify-time.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = prettifyTime;
    var formatTime = require_format_time();
    function prettifyTime({ log, context }) {
      const {
        timestampKey,
        translateTime: translateFormat
      } = context;
      const prettifier = context.customPrettifiers?.time;
      let time = null;
      if (timestampKey in log) {
        time = log[timestampKey];
      } else if ("timestamp" in log) {
        time = log.timestamp;
      }
      if (time === null) return void 0;
      const output = translateFormat ? formatTime(time, translateFormat) : time;
      return prettifier ? prettifier(output) : `[${output}]`;
    }
  }
});

// ../node_modules/pino-pretty/lib/utils/index.js
var require_utils = __commonJS({
  "../node_modules/pino-pretty/lib/utils/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = {
      buildSafeSonicBoom: require_build_safe_sonic_boom(),
      createDate: require_create_date(),
      deleteLogProperty: require_delete_log_property(),
      filterLog: require_filter_log(),
      formatTime: require_format_time(),
      getPropertyValue: require_get_property_value(),
      handleCustomLevelsNamesOpts: require_handle_custom_levels_names_opts(),
      handleCustomLevelsOpts: require_handle_custom_levels_opts(),
      interpretConditionals: require_interpret_conditionals(),
      isObject: require_is_object(),
      isValidDate: require_is_valid_date(),
      joinLinesWithIndentation: require_join_lines_with_indentation(),
      noop: require_noop(),
      parseFactoryOptions: require_parse_factory_options(),
      prettifyErrorLog: require_prettify_error_log(),
      prettifyError: require_prettify_error(),
      prettifyLevel: require_prettify_level(),
      prettifyMessage: require_prettify_message(),
      prettifyMetadata: require_prettify_metadata(),
      prettifyObject: require_prettify_object(),
      prettifyTime: require_prettify_time(),
      splitPropertyKey: require_split_property_key(),
      getLevelLabelData: require_get_level_label_data()
    };
  }
});

// ../node_modules/secure-json-parse/index.js
var require_secure_json_parse = __commonJS({
  "../node_modules/secure-json-parse/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var hasBuffer = typeof Buffer !== "undefined";
    var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
    var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    function _parse(text, reviver, options) {
      if (options == null) {
        if (reviver !== null && typeof reviver === "object") {
          options = reviver;
          reviver = void 0;
        }
      }
      if (hasBuffer && Buffer.isBuffer(text)) {
        text = text.toString();
      }
      if (text && text.charCodeAt(0) === 65279) {
        text = text.slice(1);
      }
      const obj = JSON.parse(text, reviver);
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const protoAction = options && options.protoAction || "error";
      const constructorAction = options && options.constructorAction || "error";
      if (protoAction === "ignore" && constructorAction === "ignore") {
        return obj;
      }
      if (protoAction !== "ignore" && constructorAction !== "ignore") {
        if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
          return obj;
        }
      } else if (protoAction !== "ignore" && constructorAction === "ignore") {
        if (suspectProtoRx.test(text) === false) {
          return obj;
        }
      } else {
        if (suspectConstructorRx.test(text) === false) {
          return obj;
        }
      }
      return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
    }
    function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (safe === true) {
              return null;
            } else if (protoAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
            if (safe === true) {
              return null;
            } else if (constructorAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.constructor;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(value);
            }
          }
        }
      }
      return obj;
    }
    function parse(text, reviver, options) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, options);
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    function safeParse(text, reviver) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, { safe: true });
      } catch (_e) {
        return null;
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    module2.exports = parse;
    module2.exports.default = parse;
    module2.exports.parse = parse;
    module2.exports.safeParse = safeParse;
    module2.exports.scan = filter;
  }
});

// ../node_modules/pino-pretty/lib/pretty.js
var require_pretty = __commonJS({
  "../node_modules/pino-pretty/lib/pretty.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    module2.exports = pretty;
    var sjs = require_secure_json_parse();
    var isObject = require_is_object();
    var prettifyErrorLog = require_prettify_error_log();
    var prettifyLevel = require_prettify_level();
    var prettifyMessage = require_prettify_message();
    var prettifyMetadata = require_prettify_metadata();
    var prettifyObject = require_prettify_object();
    var prettifyTime = require_prettify_time();
    var filterLog = require_filter_log();
    var {
      LEVELS,
      LEVEL_KEY,
      LEVEL_NAMES
    } = require_constants2();
    var jsonParser = (input) => {
      try {
        return { value: sjs.parse(input, { protoAction: "remove" }) };
      } catch (err) {
        return { err };
      }
    };
    function pretty(inputData) {
      let log;
      if (!isObject(inputData)) {
        const parsed = jsonParser(inputData);
        if (parsed.err || !isObject(parsed.value)) {
          return inputData + this.EOL;
        }
        log = parsed.value;
      } else {
        log = inputData;
      }
      if (this.minimumLevel) {
        let condition;
        if (this.useOnlyCustomProps) {
          condition = this.customLevels;
        } else {
          condition = this.customLevelNames[this.minimumLevel] !== void 0;
        }
        let minimum;
        if (condition) {
          minimum = this.customLevelNames[this.minimumLevel];
        } else {
          minimum = LEVEL_NAMES[this.minimumLevel];
        }
        if (!minimum) {
          minimum = typeof this.minimumLevel === "string" ? LEVEL_NAMES[this.minimumLevel] : LEVEL_NAMES[LEVELS[this.minimumLevel].toLowerCase()];
        }
        const level = log[this.levelKey === void 0 ? LEVEL_KEY : this.levelKey];
        if (level < minimum) return;
      }
      const prettifiedMessage = prettifyMessage({ log, context: this.context });
      if (this.ignoreKeys || this.includeKeys) {
        log = filterLog({ log, context: this.context });
      }
      const prettifiedLevel = prettifyLevel({
        log,
        context: {
          ...this.context,
          // This is odd. The colorizer ends up relying on the value of
          // `customProperties` instead of the original `customLevels` and
          // `customLevelNames`.
          ...this.context.customProperties
        }
      });
      const prettifiedMetadata = prettifyMetadata({ log, context: this.context });
      const prettifiedTime = prettifyTime({ log, context: this.context });
      let line = "";
      if (this.levelFirst && prettifiedLevel) {
        line = `${prettifiedLevel}`;
      }
      if (prettifiedTime && line === "") {
        line = `${prettifiedTime}`;
      } else if (prettifiedTime) {
        line = `${line} ${prettifiedTime}`;
      }
      if (!this.levelFirst && prettifiedLevel) {
        if (line.length > 0) {
          line = `${line} ${prettifiedLevel}`;
        } else {
          line = prettifiedLevel;
        }
      }
      if (prettifiedMetadata) {
        if (line.length > 0) {
          line = `${line} ${prettifiedMetadata}:`;
        } else {
          line = prettifiedMetadata;
        }
      }
      if (line.endsWith(":") === false && line !== "") {
        line += ":";
      }
      if (prettifiedMessage !== void 0) {
        if (line.length > 0) {
          line = `${line} ${prettifiedMessage}`;
        } else {
          line = prettifiedMessage;
        }
      }
      if (line.length > 0 && !this.singleLine) {
        line += this.EOL;
      }
      if (log.type === "Error" && typeof log.stack === "string") {
        const prettifiedErrorLog = prettifyErrorLog({ log, context: this.context });
        if (this.singleLine) line += this.EOL;
        line += prettifiedErrorLog;
      } else if (this.hideObject === false) {
        const skipKeys = [
          this.messageKey,
          this.levelKey,
          this.timestampKey
        ].map((key) => key.replaceAll(/\\/g, "")).filter((key) => {
          return typeof log[key] === "string" || typeof log[key] === "number" || typeof log[key] === "boolean";
        });
        const prettifiedObject = prettifyObject({
          log,
          skipKeys,
          context: this.context
        });
        if (this.singleLine && !/^\s$/.test(prettifiedObject)) {
          line += " ";
        }
        line += prettifiedObject;
      }
      return line;
    }
  }
});

// ../node_modules/pino-pretty/index.js
var require_pino_pretty = __commonJS({
  "../node_modules/pino-pretty/index.js"(exports2, module2) {
    "use strict";
    init_import_meta_url_polyfill();
    var { isColorSupported } = require_colorette();
    var pump = require_pump();
    var { Transform } = require("stream");
    var abstractTransport = require_pino_abstract_transport();
    var colors = require_colors();
    var {
      ERROR_LIKE_KEYS,
      LEVEL_KEY,
      LEVEL_LABEL,
      MESSAGE_KEY,
      TIMESTAMP_KEY
    } = require_constants2();
    var {
      buildSafeSonicBoom,
      parseFactoryOptions
    } = require_utils();
    var pretty = require_pretty();
    var defaultOptions = {
      colorize: isColorSupported,
      colorizeObjects: true,
      crlf: false,
      customColors: null,
      customLevels: null,
      customPrettifiers: {},
      errorLikeObjectKeys: ERROR_LIKE_KEYS,
      errorProps: "",
      hideObject: false,
      ignore: "hostname",
      include: void 0,
      levelFirst: false,
      levelKey: LEVEL_KEY,
      levelLabel: LEVEL_LABEL,
      messageFormat: null,
      messageKey: MESSAGE_KEY,
      minimumLevel: void 0,
      outputStream: process.stdout,
      singleLine: false,
      timestampKey: TIMESTAMP_KEY,
      translateTime: true,
      useOnlyCustomProps: true
    };
    function prettyFactory(options) {
      const context = parseFactoryOptions(Object.assign({}, defaultOptions, options));
      return pretty.bind({ ...context, context });
    }
    function build(opts = {}) {
      let pretty2 = prettyFactory(opts);
      let destination;
      return abstractTransport(function(source) {
        source.on("message", function pinoConfigListener(message) {
          if (!message || message.code !== "PINO_CONFIG") return;
          Object.assign(opts, {
            messageKey: message.config.messageKey,
            errorLikeObjectKeys: Array.from(/* @__PURE__ */ new Set([...opts.errorLikeObjectKeys || ERROR_LIKE_KEYS, message.config.errorKey])),
            customLevels: message.config.levels.values
          });
          pretty2 = prettyFactory(opts);
          source.off("message", pinoConfigListener);
        });
        const stream = new Transform({
          objectMode: true,
          autoDestroy: true,
          transform(chunk, enc, cb) {
            const line = pretty2(chunk);
            cb(null, line);
          }
        });
        if (typeof opts.destination === "object" && typeof opts.destination.write === "function") {
          destination = opts.destination;
        } else {
          destination = buildSafeSonicBoom({
            dest: opts.destination || 1,
            append: opts.append,
            mkdir: opts.mkdir,
            sync: opts.sync
            // by default sonic will be async
          });
        }
        source.on("unknown", function(line) {
          destination.write(line + "\n");
        });
        pump(source, stream, destination);
        return stream;
      }, {
        parse: "lines",
        close(err, cb) {
          destination.on("close", () => {
            cb(err);
          });
        }
      });
    }
    module2.exports = build;
    module2.exports.build = build;
    module2.exports.PinoPretty = build;
    module2.exports.prettyFactory = prettyFactory;
    module2.exports.colorizerFactory = colors;
    module2.exports.isColorSupported = isColorSupported;
    module2.exports.default = build;
  }
});

// src/database/migrate.ts
init_import_meta_url_polyfill();
var import_node_path3 = require("node:path");

// src/database/connection.ts
init_import_meta_url_polyfill();

// src/directories.ts
init_import_meta_url_polyfill();
var import_node_path = require("node:path");
var DATA_DIR = process.env["STORYTELLER_DATA_DIR"] ?? ".";
var AUDIO_DIR = (0, import_node_path.join)(DATA_DIR, "assets", "audio");
var TEXT_DIR = (0, import_node_path.join)(DATA_DIR, "assets", "text");
var IMAGE_DIR = (0, import_node_path.join)(DATA_DIR, "assets", "images");
var CACHE_DIR = (0, import_node_path.join)(DATA_DIR, "cache");
var WHISPER_BUILD_DIR = (0, import_node_path.join)(process.cwd(), "whisper-builds");

// src/database/connection.ts
var import_node_path2 = require("node:path");
var import_node_process = require("node:process");
var import_better_sqlite3 = __toESM(require_lib(), 1);

// src/logging.ts
init_import_meta_url_polyfill();
var import_pino = __toESM(require_pino(), 1);
var import_pino_pretty = __toESM(require_pino_pretty(), 1);
var logger = (0, import_pino.default)(
  (0, import_pino_pretty.default)({
    ignore: "pid,hostname"
  })
);

// src/database/connection.ts
var db;
var DATABASE_URL = (0, import_node_path2.join)(DATA_DIR, "storyteller.db");
var UUID_EXT_PATH = (0, import_node_path2.join)((0, import_node_process.cwd)(), "sqlite", "uuid.c");
function getDatabase() {
  if (db) return db;
  db = new import_better_sqlite3.default(
    DATABASE_URL,
    process.env["SQLITE_NATIVE_BINDING"] ? {
      nativeBinding: process.env["SQLITE_NATIVE_BINDING"]
    } : void 0
  );
  db.pragma("journal_mode = WAL");
  try {
    db.loadExtension(UUID_EXT_PATH);
  } catch (e) {
    logger.error(e);
  }
  return db;
}

// src/database/migrate.ts
var import_node_process2 = require("node:process");
var import_promises = require("node:fs/promises");
var import_node_crypto = require("node:crypto");
function isFirstStartup() {
  const db2 = getDatabase();
  try {
    const row = db2.prepare(
      `
SELECT COUNT(*) as migration_count
FROM migration
`
    ).get();
    return row.migration_count === 0;
  } catch {
    return true;
  }
}
function getMigration(hash) {
  const db2 = getDatabase();
  try {
    const row = db2.prepare(
      `
      SELECT id, hash, name
      FROM migration
      WHERE hash = $hash
      `
    ).get({ hash });
    return row ?? null;
  } catch (e) {
    return null;
  }
}
function createMigration(hash, name) {
  const db2 = getDatabase();
  db2.prepare(
    `
    INSERT INTO migration (hash, name)
    VALUES ($hash, $name)
    `
  ).run({ hash, name });
}
function setInitialAudioCodec(options) {
  const db2 = getDatabase();
  db2.prepare(
    `
    UPDATE settings
    SET value = $codec
    WHERE name = 'codec';
    `
  ).run({
    codec: JSON.stringify(
      options.codec === "opus" ? "libopus" : options.codec === "mp3" ? "libmp3lame" : "acc"
    )
  });
  if (options.bitrate) {
    db2.prepare(
      `
      UPDATE settings
      SET value = $bitrate
      WHERE name = 'bitrate';
      `
    ).run({
      bitrate: JSON.stringify(options.bitrate)
    });
  }
}
function getInitialAudioCodec() {
  const env = process.env["STORYTELLER_INITIAL_AUDIO_CODEC"];
  if (!env) return null;
  const match = env.match(/^(mp3|aac|opus)(?:-(16|24|32|64|96))?$/);
  if (!match?.[1]) return null;
  return { codec: match[1], bitrate: match[2] && `${match[2]}k` };
}
async function migrateFile(path) {
  const db2 = getDatabase();
  const contents = await (0, import_promises.readFile)(path, {
    encoding: "utf-8"
  });
  const hash = (0, import_node_crypto.createHash)("sha256").update(contents).digest("hex");
  const existingMigration = getMigration(hash);
  if (!existingMigration) {
    logger.info(`Running migration: "${(0, import_node_path3.basename)(path, ".sql")}"
`);
    logger.info(contents);
    const statements = contents.split(";").map((statement) => statement.trim()).filter((statement) => !!statement.length);
    for (const statement of statements) {
      db2.prepare(statement).run();
    }
    createMigration(hash, (0, import_node_path3.basename)(path));
  }
}
async function migrate() {
  const foundFirstStartup = isFirstStartup();
  if (foundFirstStartup) logger.info("First startup - initializing database");
  const initialCodec = getInitialAudioCodec();
  const migrationsDir = (0, import_node_path3.join)((0, import_node_process2.cwd)(), "migrations");
  const migrationFiles = await (0, import_promises.readdir)(migrationsDir);
  migrationFiles.sort();
  for (const migrationFile of migrationFiles) {
    await migrateFile((0, import_node_path3.join)(migrationsDir, migrationFile));
  }
  if (foundFirstStartup && initialCodec) {
    setInitialAudioCodec(initialCodec);
  }
}
void migrate();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dvcmsvaW1wb3J0Lm1ldGEudXJsLXBvbHlmaWxsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvdXRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL3NxbGl0ZS1lcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZmlsZS11cmktdG8tcGF0aC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYmluZGluZ3MvYmluZGluZ3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL3dyYXBwZXJzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy90cmFuc2FjdGlvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvcHJhZ21hLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy9iYWNrdXAuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL3NlcmlhbGl6ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvZnVuY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL2FnZ3JlZ2F0ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvdGFibGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL2luc3BlY3QuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9kYXRhYmFzZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXN0ZC1zZXJpYWxpemVycy9saWIvZXJyLWhlbHBlcnMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzL2xpYi9lcnItcHJvdG8uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzL2xpYi9lcnIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzL2xpYi9lcnItd2l0aC1jYXVzZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1zdGQtc2VyaWFsaXplcnMvbGliL3JlcS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1zdGQtc2VyaWFsaXplcnMvbGliL3Jlcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1zdGQtc2VyaWFsaXplcnMvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8vbGliL2NhbGxlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZmFzdC1yZWRhY3QvbGliL3ZhbGlkYXRvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZmFzdC1yZWRhY3QvbGliL3J4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9mYXN0LXJlZGFjdC9saWIvcGFyc2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2Zhc3QtcmVkYWN0L2xpYi9yZWRhY3Rvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZmFzdC1yZWRhY3QvbGliL21vZGlmaWVycy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZmFzdC1yZWRhY3QvbGliL3Jlc3RvcmVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9mYXN0LXJlZGFjdC9saWIvc3RhdGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2Zhc3QtcmVkYWN0L2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vL2xpYi9zeW1ib2xzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vL2xpYi9yZWRhY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8vbGliL3RpbWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3F1aWNrLWZvcm1hdC11bmVzY2FwZWQvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F0b21pYy1zbGVlcC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29uaWMtYm9vbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb24tZXhpdC1sZWFrLWZyZWUvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3RocmVhZC1zdHJlYW0vcGFja2FnZS5qc29uIiwgIi4uLy4uL25vZGVfbW9kdWxlcy90aHJlYWQtc3RyZWFtL2xpYi93YWl0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy90aHJlYWQtc3RyZWFtL2xpYi9pbmRleGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy90aHJlYWQtc3RyZWFtL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vL2xpYi90cmFuc3BvcnQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8vbGliL3Rvb2xzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vL2xpYi9jb25zdGFudHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8vbGliL2xldmVscy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby9saWIvbWV0YS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby9saWIvcHJvdG8uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NhZmUtc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby9saWIvbXVsdGlzdHJlYW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8vcGluby5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvY29sb3JldHRlL2luZGV4LmNqcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd3JhcHB5L3dyYXBweS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25jZS9vbmNlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmQtb2Ytc3RyZWFtL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wdW1wL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcGxpdDIvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tYWJzdHJhY3QtdHJhbnNwb3J0L2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvY29uc3RhbnRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZ2V0LWxldmVsLWxhYmVsLWRhdGEuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi9jb2xvcnMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9ub29wLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvYnVpbGQtc2FmZS1zb25pYy1ib29tLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvaXMtdmFsaWQtZGF0ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2NyZWF0ZS1kYXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvc3BsaXQtcHJvcGVydHkta2V5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZ2V0LXByb3BlcnR5LXZhbHVlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZGVsZXRlLWxvZy1wcm9wZXJ0eS5qcyIsICIuLi8uLi9zcmMvdXRpbHMudHMiLCAiLi4vLi4vc3JjL2NvcGllci50cyIsICIuLi8uLi9zcmMvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9maWx0ZXItbG9nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZm9ybWF0LXRpbWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9oYW5kbGUtY3VzdG9tLWxldmVscy1uYW1lcy1vcHRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvaGFuZGxlLWN1c3RvbS1sZXZlbHMtb3B0cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2ludGVycHJldC1jb25kaXRpb25hbHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9pcy1vYmplY3QuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9qb2luLWxpbmVzLXdpdGgtaW5kZW50YXRpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9wYXJzZS1mYWN0b3J5LW9wdGlvbnMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2Zhc3Qtc2FmZS1zdHJpbmdpZnkvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9wcmV0dGlmeS1lcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LW9iamVjdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LWVycm9yLWxvZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LWxldmVsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvcHJldHRpZnktbWVzc2FnZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LW1ldGFkYXRhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvcHJldHRpZnktdGltZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zZWN1cmUtanNvbi1wYXJzZS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3ByZXR0eS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvaW5kZXguanMiLCAiLi4vc3JjL2RhdGFiYXNlL21pZ3JhdGUudHMiLCAiLi4vc3JjL2RhdGFiYXNlL2Nvbm5lY3Rpb24udHMiLCAiLi4vc3JjL2RpcmVjdG9yaWVzLnRzIiwgIi4uL3NyYy9sb2dnaW5nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgaW1wb3J0X21ldGFfdXJsID1cbiAgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiXG4gICAgPyBuZXcgKHJlcXVpcmUoXCJ1cmxcIi5yZXBsYWNlKFwiXCIsIFwiXCIpKS5VUkwpKFwiZmlsZTpcIiArIF9fZmlsZW5hbWUpLmhyZWZcbiAgICA6IChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjKSB8fFxuICAgICAgbmV3IFVSTChcIm1haW4uanNcIiwgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZlxuIiwgIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5nZXRCb29sZWFuT3B0aW9uID0gKG9wdGlvbnMsIGtleSkgPT4ge1xuXHRsZXQgdmFsdWUgPSBmYWxzZTtcblx0aWYgKGtleSBpbiBvcHRpb25zICYmIHR5cGVvZiAodmFsdWUgPSBvcHRpb25zW2tleV0pICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXCIke2tleX1cIiBvcHRpb24gdG8gYmUgYSBib29sZWFuYCk7XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0cy5jcHBkYiA9IFN5bWJvbCgpO1xuZXhwb3J0cy5pbnNwZWN0ID0gU3ltYm9sLmZvcignbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCBkZXNjcmlwdG9yID0geyB2YWx1ZTogJ1NxbGl0ZUVycm9yJywgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfTtcblxuZnVuY3Rpb24gU3FsaXRlRXJyb3IobWVzc2FnZSwgY29kZSkge1xuXHRpZiAobmV3LnRhcmdldCAhPT0gU3FsaXRlRXJyb3IpIHtcblx0XHRyZXR1cm4gbmV3IFNxbGl0ZUVycm9yKG1lc3NhZ2UsIGNvZGUpO1xuXHR9XG5cdGlmICh0eXBlb2YgY29kZSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0fVxuXHRFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXHRkZXNjcmlwdG9yLnZhbHVlID0gJycgKyBtZXNzYWdlO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCBkZXNjcmlwdG9yKTtcblx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgU3FsaXRlRXJyb3IpO1xuXHR0aGlzLmNvZGUgPSBjb2RlO1xufVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKFNxbGl0ZUVycm9yLCBFcnJvcik7XG5PYmplY3Quc2V0UHJvdG90eXBlT2YoU3FsaXRlRXJyb3IucHJvdG90eXBlLCBFcnJvci5wcm90b3R5cGUpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNxbGl0ZUVycm9yLnByb3RvdHlwZSwgJ25hbWUnLCBkZXNjcmlwdG9yKTtcbm1vZHVsZS5leHBvcnRzID0gU3FsaXRlRXJyb3I7XG4iLCAiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHNlcCA9IHJlcXVpcmUoJ3BhdGgnKS5zZXAgfHwgJy8nO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZVVyaVRvUGF0aDtcblxuLyoqXG4gKiBGaWxlIFVSSSB0byBQYXRoIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEByZXR1cm4ge1N0cmluZ30gcGF0aFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmaWxlVXJpVG9QYXRoICh1cmkpIHtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB1cmkgfHxcbiAgICAgIHVyaS5sZW5ndGggPD0gNyB8fFxuICAgICAgJ2ZpbGU6Ly8nICE9IHVyaS5zdWJzdHJpbmcoMCwgNykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IHBhc3MgaW4gYSBmaWxlOi8vIFVSSSB0byBjb252ZXJ0IHRvIGEgZmlsZSBwYXRoJyk7XG4gIH1cblxuICB2YXIgcmVzdCA9IGRlY29kZVVSSSh1cmkuc3Vic3RyaW5nKDcpKTtcbiAgdmFyIGZpcnN0U2xhc2ggPSByZXN0LmluZGV4T2YoJy8nKTtcbiAgdmFyIGhvc3QgPSByZXN0LnN1YnN0cmluZygwLCBmaXJzdFNsYXNoKTtcbiAgdmFyIHBhdGggPSByZXN0LnN1YnN0cmluZyhmaXJzdFNsYXNoICsgMSk7XG5cbiAgLy8gMi4gIFNjaGVtZSBEZWZpbml0aW9uXG4gIC8vIEFzIGEgc3BlY2lhbCBjYXNlLCA8aG9zdD4gY2FuIGJlIHRoZSBzdHJpbmcgXCJsb2NhbGhvc3RcIiBvciB0aGUgZW1wdHlcbiAgLy8gc3RyaW5nOyB0aGlzIGlzIGludGVycHJldGVkIGFzIFwidGhlIG1hY2hpbmUgZnJvbSB3aGljaCB0aGUgVVJMIGlzXG4gIC8vIGJlaW5nIGludGVycHJldGVkXCIuXG4gIGlmICgnbG9jYWxob3N0JyA9PSBob3N0KSBob3N0ID0gJyc7XG5cbiAgaWYgKGhvc3QpIHtcbiAgICBob3N0ID0gc2VwICsgc2VwICsgaG9zdDtcbiAgfVxuXG4gIC8vIDMuMiAgRHJpdmVzLCBkcml2ZSBsZXR0ZXJzLCBtb3VudCBwb2ludHMsIGZpbGUgc3lzdGVtIHJvb3RcbiAgLy8gRHJpdmUgbGV0dGVycyBhcmUgbWFwcGVkIGludG8gdGhlIHRvcCBvZiBhIGZpbGUgVVJJIGluIHZhcmlvdXMgd2F5cyxcbiAgLy8gZGVwZW5kaW5nIG9uIHRoZSBpbXBsZW1lbnRhdGlvbjsgc29tZSBhcHBsaWNhdGlvbnMgc3Vic3RpdHV0ZVxuICAvLyB2ZXJ0aWNhbCBiYXIgKFwifFwiKSBmb3IgdGhlIGNvbG9uIGFmdGVyIHRoZSBkcml2ZSBsZXR0ZXIsIHlpZWxkaW5nXG4gIC8vIFwiZmlsZTovLy9jfC90bXAvdGVzdC50eHRcIi4gIEluIHNvbWUgY2FzZXMsIHRoZSBjb2xvbiBpcyBsZWZ0XG4gIC8vIHVuY2hhbmdlZCwgYXMgaW4gXCJmaWxlOi8vL2M6L3RtcC90ZXN0LnR4dFwiLiAgSW4gb3RoZXIgY2FzZXMsIHRoZVxuICAvLyBjb2xvbiBpcyBzaW1wbHkgb21pdHRlZCwgYXMgaW4gXCJmaWxlOi8vL2MvdG1wL3Rlc3QudHh0XCIuXG4gIHBhdGggPSBwYXRoLnJlcGxhY2UoL14oLispXFx8LywgJyQxOicpO1xuXG4gIC8vIGZvciBXaW5kb3dzLCB3ZSBuZWVkIHRvIGludmVydCB0aGUgcGF0aCBzZXBhcmF0b3JzIGZyb20gd2hhdCBhIFVSSSB1c2VzXG4gIGlmIChzZXAgPT0gJ1xcXFwnKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvL2csICdcXFxcJyk7XG4gIH1cblxuICBpZiAoL14uK1xcOi8udGVzdChwYXRoKSkge1xuICAgIC8vIGhhcyBXaW5kb3dzIGRyaXZlIGF0IGJlZ2lubmluZyBvZiBwYXRoXG4gIH0gZWxzZSB7XG4gICAgLy8gdW5peCBwYXRoXHUyMDI2XG4gICAgcGF0aCA9IHNlcCArIHBhdGg7XG4gIH1cblxuICByZXR1cm4gaG9zdCArIHBhdGg7XG59XG4iLCAiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyksXG4gIHBhdGggPSByZXF1aXJlKCdwYXRoJyksXG4gIGZpbGVVUkxUb1BhdGggPSByZXF1aXJlKCdmaWxlLXVyaS10by1wYXRoJyksXG4gIGpvaW4gPSBwYXRoLmpvaW4sXG4gIGRpcm5hbWUgPSBwYXRoLmRpcm5hbWUsXG4gIGV4aXN0cyA9XG4gICAgKGZzLmFjY2Vzc1N5bmMgJiZcbiAgICAgIGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmcy5hY2Nlc3NTeW5jKHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSkgfHxcbiAgICBmcy5leGlzdHNTeW5jIHx8XG4gICAgcGF0aC5leGlzdHNTeW5jLFxuICBkZWZhdWx0cyA9IHtcbiAgICBhcnJvdzogcHJvY2Vzcy5lbnYuTk9ERV9CSU5ESU5HU19BUlJPVyB8fCAnIFx1MjE5MiAnLFxuICAgIGNvbXBpbGVkOiBwcm9jZXNzLmVudi5OT0RFX0JJTkRJTkdTX0NPTVBJTEVEX0RJUiB8fCAnY29tcGlsZWQnLFxuICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICAgIGFyY2g6IHByb2Nlc3MuYXJjaCxcbiAgICBub2RlUHJlR3lwOlxuICAgICAgJ25vZGUtdicgK1xuICAgICAgcHJvY2Vzcy52ZXJzaW9ucy5tb2R1bGVzICtcbiAgICAgICctJyArXG4gICAgICBwcm9jZXNzLnBsYXRmb3JtICtcbiAgICAgICctJyArXG4gICAgICBwcm9jZXNzLmFyY2gsXG4gICAgdmVyc2lvbjogcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLFxuICAgIGJpbmRpbmdzOiAnYmluZGluZ3Mubm9kZScsXG4gICAgdHJ5OiBbXG4gICAgICAvLyBub2RlLWd5cCdzIGxpbmtlZCB2ZXJzaW9uIGluIHRoZSBcImJ1aWxkXCIgZGlyXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2J1aWxkJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBub2RlLXdhZiBhbmQgZ3lwX2FkZG9uIChhLmsuYSBub2RlLWd5cClcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYnVpbGQnLCAnRGVidWcnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYnVpbGQnLCAnUmVsZWFzZScsICdiaW5kaW5ncyddLFxuICAgICAgLy8gRGVidWcgZmlsZXMsIGZvciBkZXZlbG9wbWVudCAobGVnYWN5IGJlaGF2aW9yLCByZW1vdmUgZm9yIG5vZGUgdjAuOSlcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnb3V0JywgJ0RlYnVnJywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ0RlYnVnJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBSZWxlYXNlIGZpbGVzLCBidXQgbWFudWFsbHkgY29tcGlsZWQgKGxlZ2FjeSBiZWhhdmlvciwgcmVtb3ZlIGZvciBub2RlIHYwLjkpXG4gICAgICBbJ21vZHVsZV9yb290JywgJ291dCcsICdSZWxlYXNlJywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ1JlbGVhc2UnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIExlZ2FjeSBmcm9tIG5vZGUtd2FmLCBub2RlIDw9IDAuNC54XG4gICAgICBbJ21vZHVsZV9yb290JywgJ2J1aWxkJywgJ2RlZmF1bHQnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIFByb2R1Y3Rpb24gXCJSZWxlYXNlXCIgYnVpbGR0eXBlIGJpbmFyeSAobWVoLi4uKVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdjb21waWxlZCcsICd2ZXJzaW9uJywgJ3BsYXRmb3JtJywgJ2FyY2gnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIG5vZGUtcWJzIGJ1aWxkc1xuICAgICAgWydtb2R1bGVfcm9vdCcsICdhZGRvbi1idWlsZCcsICdyZWxlYXNlJywgJ2luc3RhbGwtcm9vdCcsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdhZGRvbi1idWlsZCcsICdkZWJ1ZycsICdpbnN0YWxsLXJvb3QnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYWRkb24tYnVpbGQnLCAnZGVmYXVsdCcsICdpbnN0YWxsLXJvb3QnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIG5vZGUtcHJlLWd5cCBwYXRoIC4vbGliL2JpbmRpbmcve25vZGVfYWJpfS17cGxhdGZvcm19LXthcmNofVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdsaWInLCAnYmluZGluZycsICdub2RlUHJlR3lwJywgJ2JpbmRpbmdzJ11cbiAgICBdXG4gIH07XG5cbi8qKlxuICogVGhlIG1haW4gYGJpbmRpbmdzKClgIGZ1bmN0aW9uIGxvYWRzIHRoZSBjb21waWxlZCBiaW5kaW5ncyBmb3IgYSBnaXZlbiBtb2R1bGUuXG4gKiBJdCB1c2VzIFY4J3MgRXJyb3IgQVBJIHRvIGRldGVybWluZSB0aGUgcGFyZW50IGZpbGVuYW1lIHRoYXQgdGhpcyBmdW5jdGlvbiBpc1xuICogYmVpbmcgaW52b2tlZCBmcm9tLCB3aGljaCBpcyB0aGVuIHVzZWQgdG8gZmluZCB0aGUgcm9vdCBkaXJlY3RvcnkuXG4gKi9cblxuZnVuY3Rpb24gYmluZGluZ3Mob3B0cykge1xuICAvLyBBcmd1bWVudCBzdXJnZXJ5XG4gIGlmICh0eXBlb2Ygb3B0cyA9PSAnc3RyaW5nJykge1xuICAgIG9wdHMgPSB7IGJpbmRpbmdzOiBvcHRzIH07XG4gIH0gZWxzZSBpZiAoIW9wdHMpIHtcbiAgICBvcHRzID0ge307XG4gIH1cblxuICAvLyBtYXBzIGBkZWZhdWx0c2Agb250byBgb3B0c2Agb2JqZWN0XG4gIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5tYXAoZnVuY3Rpb24oaSkge1xuICAgIGlmICghKGkgaW4gb3B0cykpIG9wdHNbaV0gPSBkZWZhdWx0c1tpXTtcbiAgfSk7XG5cbiAgLy8gR2V0IHRoZSBtb2R1bGUgcm9vdFxuICBpZiAoIW9wdHMubW9kdWxlX3Jvb3QpIHtcbiAgICBvcHRzLm1vZHVsZV9yb290ID0gZXhwb3J0cy5nZXRSb290KGV4cG9ydHMuZ2V0RmlsZU5hbWUoKSk7XG4gIH1cblxuICAvLyBFbnN1cmUgdGhlIGdpdmVuIGJpbmRpbmdzIG5hbWUgZW5kcyB3aXRoIC5ub2RlXG4gIGlmIChwYXRoLmV4dG5hbWUob3B0cy5iaW5kaW5ncykgIT0gJy5ub2RlJykge1xuICAgIG9wdHMuYmluZGluZ3MgKz0gJy5ub2RlJztcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2svaXNzdWVzLzQxNzUjaXNzdWVjb21tZW50LTM0MjkzMTAzNVxuICB2YXIgcmVxdWlyZUZ1bmMgPVxuICAgIHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fID09PSAnZnVuY3Rpb24nXG4gICAgICA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fXG4gICAgICA6IHJlcXVpcmU7XG5cbiAgdmFyIHRyaWVzID0gW10sXG4gICAgaSA9IDAsXG4gICAgbCA9IG9wdHMudHJ5Lmxlbmd0aCxcbiAgICBuLFxuICAgIGIsXG4gICAgZXJyO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgbiA9IGpvaW4uYXBwbHkoXG4gICAgICBudWxsLFxuICAgICAgb3B0cy50cnlbaV0ubWFwKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgcmV0dXJuIG9wdHNbcF0gfHwgcDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0cmllcy5wdXNoKG4pO1xuICAgIHRyeSB7XG4gICAgICBiID0gb3B0cy5wYXRoID8gcmVxdWlyZUZ1bmMucmVzb2x2ZShuKSA6IHJlcXVpcmVGdW5jKG4pO1xuICAgICAgaWYgKCFvcHRzLnBhdGgpIHtcbiAgICAgICAgYi5wYXRoID0gbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLmNvZGUgIT09ICdNT0RVTEVfTk9UX0ZPVU5EJyAmJlxuICAgICAgICAgIGUuY29kZSAhPT0gJ1FVQUxJRklFRF9QQVRIX1JFU09MVVRJT05fRkFJTEVEJyAmJlxuICAgICAgICAgICEvbm90IGZpbmQvaS50ZXN0KGUubWVzc2FnZSkpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlcnIgPSBuZXcgRXJyb3IoXG4gICAgJ0NvdWxkIG5vdCBsb2NhdGUgdGhlIGJpbmRpbmdzIGZpbGUuIFRyaWVkOlxcbicgK1xuICAgICAgdHJpZXNcbiAgICAgICAgLm1hcChmdW5jdGlvbihhKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdHMuYXJyb3cgKyBhO1xuICAgICAgICB9KVxuICAgICAgICAuam9pbignXFxuJylcbiAgKTtcbiAgZXJyLnRyaWVzID0gdHJpZXM7XG4gIHRocm93IGVycjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGJpbmRpbmdzO1xuXG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIG9mIHRoZSBKYXZhU2NyaXB0IGZpbGUgdGhhdCBpbnZva2VzIHRoaXMgZnVuY3Rpb24uXG4gKiBVc2VkIHRvIGhlbHAgZmluZCB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgYSBtb2R1bGUuXG4gKiBPcHRpb25hbGx5IGFjY2VwdHMgYW4gZmlsZW5hbWUgYXJndW1lbnQgdG8gc2tpcCB3aGVuIHNlYXJjaGluZyBmb3IgdGhlIGludm9raW5nIGZpbGVuYW1lXG4gKi9cblxuZXhwb3J0cy5nZXRGaWxlTmFtZSA9IGZ1bmN0aW9uIGdldEZpbGVOYW1lKGNhbGxpbmdfZmlsZSkge1xuICB2YXIgb3JpZ1BTVCA9IEVycm9yLnByZXBhcmVTdGFja1RyYWNlLFxuICAgIG9yaWdTVEwgPSBFcnJvci5zdGFja1RyYWNlTGltaXQsXG4gICAgZHVtbXkgPSB7fSxcbiAgICBmaWxlTmFtZTtcblxuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAxMDtcblxuICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IGZ1bmN0aW9uKGUsIHN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZpbGVOYW1lID0gc3RbaV0uZ2V0RmlsZU5hbWUoKTtcbiAgICAgIGlmIChmaWxlTmFtZSAhPT0gX19maWxlbmFtZSkge1xuICAgICAgICBpZiAoY2FsbGluZ19maWxlKSB7XG4gICAgICAgICAgaWYgKGZpbGVOYW1lICE9PSBjYWxsaW5nX2ZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIHJ1biB0aGUgJ3ByZXBhcmVTdGFja1RyYWNlJyBmdW5jdGlvbiBhYm92ZVxuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShkdW1teSk7XG4gIGR1bW15LnN0YWNrO1xuXG4gIC8vIGNsZWFudXBcbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBvcmlnUFNUO1xuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBvcmlnU1RMO1xuXG4gIC8vIGhhbmRsZSBmaWxlbmFtZSB0aGF0IHN0YXJ0cyB3aXRoIFwiZmlsZTovL1wiXG4gIHZhciBmaWxlU2NoZW1hID0gJ2ZpbGU6Ly8nO1xuICBpZiAoZmlsZU5hbWUuaW5kZXhPZihmaWxlU2NoZW1hKSA9PT0gMCkge1xuICAgIGZpbGVOYW1lID0gZmlsZVVSTFRvUGF0aChmaWxlTmFtZSk7XG4gIH1cblxuICByZXR1cm4gZmlsZU5hbWU7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHJvb3QgZGlyZWN0b3J5IG9mIGEgbW9kdWxlLCBnaXZlbiBhbiBhcmJpdHJhcnkgZmlsZW5hbWVcbiAqIHNvbWV3aGVyZSBpbiB0aGUgbW9kdWxlIHRyZWUuIFRoZSBcInJvb3QgZGlyZWN0b3J5XCIgaXMgdGhlIGRpcmVjdG9yeVxuICogY29udGFpbmluZyB0aGUgYHBhY2thZ2UuanNvbmAgZmlsZS5cbiAqXG4gKiAgIEluOiAgL2hvbWUvbmF0ZS9ub2RlLW5hdGl2ZS1tb2R1bGUvbGliL2luZGV4LmpzXG4gKiAgIE91dDogL2hvbWUvbmF0ZS9ub2RlLW5hdGl2ZS1tb2R1bGVcbiAqL1xuXG5leHBvcnRzLmdldFJvb3QgPSBmdW5jdGlvbiBnZXRSb290KGZpbGUpIHtcbiAgdmFyIGRpciA9IGRpcm5hbWUoZmlsZSksXG4gICAgcHJldjtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAoZGlyID09PSAnLicpIHtcbiAgICAgIC8vIEF2b2lkcyBhbiBpbmZpbml0ZSBsb29wIGluIHJhcmUgY2FzZXMsIGxpa2UgdGhlIFJFUExcbiAgICAgIGRpciA9IHByb2Nlc3MuY3dkKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGV4aXN0cyhqb2luKGRpciwgJ3BhY2thZ2UuanNvbicpKSB8fFxuICAgICAgZXhpc3RzKGpvaW4oZGlyLCAnbm9kZV9tb2R1bGVzJykpXG4gICAgKSB7XG4gICAgICAvLyBGb3VuZCB0aGUgJ3BhY2thZ2UuanNvbicgZmlsZSBvciAnbm9kZV9tb2R1bGVzJyBkaXI7IHdlJ3JlIGRvbmVcbiAgICAgIHJldHVybiBkaXI7XG4gICAgfVxuICAgIGlmIChwcmV2ID09PSBkaXIpIHtcbiAgICAgIC8vIEdvdCB0byB0aGUgdG9wXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDb3VsZCBub3QgZmluZCBtb2R1bGUgcm9vdCBnaXZlbiBmaWxlOiBcIicgK1xuICAgICAgICAgIGZpbGUgK1xuICAgICAgICAgICdcIi4gRG8geW91IGhhdmUgYSBgcGFja2FnZS5qc29uYCBmaWxlPyAnXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBUcnkgdGhlIHBhcmVudCBkaXIgbmV4dFxuICAgIHByZXYgPSBkaXI7XG4gICAgZGlyID0gam9pbihkaXIsICcuLicpO1xuICB9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxuZXhwb3J0cy5wcmVwYXJlID0gZnVuY3Rpb24gcHJlcGFyZShzcWwpIHtcblx0cmV0dXJuIHRoaXNbY3BwZGJdLnByZXBhcmUoc3FsLCB0aGlzLCBmYWxzZSk7XG59O1xuXG5leHBvcnRzLmV4ZWMgPSBmdW5jdGlvbiBleGVjKHNxbCkge1xuXHR0aGlzW2NwcGRiXS5leGVjKHNxbCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKCkge1xuXHR0aGlzW2NwcGRiXS5jbG9zZSgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMubG9hZEV4dGVuc2lvbiA9IGZ1bmN0aW9uIGxvYWRFeHRlbnNpb24oLi4uYXJncykge1xuXHR0aGlzW2NwcGRiXS5sb2FkRXh0ZW5zaW9uKC4uLmFyZ3MpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuZGVmYXVsdFNhZmVJbnRlZ2VycyA9IGZ1bmN0aW9uIGRlZmF1bHRTYWZlSW50ZWdlcnMoLi4uYXJncykge1xuXHR0aGlzW2NwcGRiXS5kZWZhdWx0U2FmZUludGVnZXJzKC4uLmFyZ3MpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMudW5zYWZlTW9kZSA9IGZ1bmN0aW9uIHVuc2FmZU1vZGUoLi4uYXJncykge1xuXHR0aGlzW2NwcGRiXS51bnNhZmVNb2RlKC4uLmFyZ3MpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuZ2V0dGVycyA9IHtcblx0bmFtZToge1xuXHRcdGdldDogZnVuY3Rpb24gbmFtZSgpIHsgcmV0dXJuIHRoaXNbY3BwZGJdLm5hbWU7IH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0fSxcblx0b3Blbjoge1xuXHRcdGdldDogZnVuY3Rpb24gb3BlbigpIHsgcmV0dXJuIHRoaXNbY3BwZGJdLm9wZW47IH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0fSxcblx0aW5UcmFuc2FjdGlvbjoge1xuXHRcdGdldDogZnVuY3Rpb24gaW5UcmFuc2FjdGlvbigpIHsgcmV0dXJuIHRoaXNbY3BwZGJdLmluVHJhbnNhY3Rpb247IH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0fSxcblx0cmVhZG9ubHk6IHtcblx0XHRnZXQ6IGZ1bmN0aW9uIHJlYWRvbmx5KCkgeyByZXR1cm4gdGhpc1tjcHBkYl0ucmVhZG9ubHk7IH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0fSxcblx0bWVtb3J5OiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBtZW1vcnkoKSB7IHJldHVybiB0aGlzW2NwcGRiXS5tZW1vcnk7IH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0fSxcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgeyBjcHBkYiB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuY29uc3QgY29udHJvbGxlcnMgPSBuZXcgV2Vha01hcCgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zYWN0aW9uKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGEgZnVuY3Rpb24nKTtcblxuXHRjb25zdCBkYiA9IHRoaXNbY3BwZGJdO1xuXHRjb25zdCBjb250cm9sbGVyID0gZ2V0Q29udHJvbGxlcihkYiwgdGhpcyk7XG5cdGNvbnN0IHsgYXBwbHkgfSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuXHQvLyBFYWNoIHZlcnNpb24gb2YgdGhlIHRyYW5zYWN0aW9uIGZ1bmN0aW9uIGhhcyB0aGVzZSBzYW1lIHByb3BlcnRpZXNcblx0Y29uc3QgcHJvcGVydGllcyA9IHtcblx0XHRkZWZhdWx0OiB7IHZhbHVlOiB3cmFwVHJhbnNhY3Rpb24oYXBwbHksIGZuLCBkYiwgY29udHJvbGxlci5kZWZhdWx0KSB9LFxuXHRcdGRlZmVycmVkOiB7IHZhbHVlOiB3cmFwVHJhbnNhY3Rpb24oYXBwbHksIGZuLCBkYiwgY29udHJvbGxlci5kZWZlcnJlZCkgfSxcblx0XHRpbW1lZGlhdGU6IHsgdmFsdWU6IHdyYXBUcmFuc2FjdGlvbihhcHBseSwgZm4sIGRiLCBjb250cm9sbGVyLmltbWVkaWF0ZSkgfSxcblx0XHRleGNsdXNpdmU6IHsgdmFsdWU6IHdyYXBUcmFuc2FjdGlvbihhcHBseSwgZm4sIGRiLCBjb250cm9sbGVyLmV4Y2x1c2l2ZSkgfSxcblx0XHRkYXRhYmFzZTogeyB2YWx1ZTogdGhpcywgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMuZGVmYXVsdC52YWx1ZSwgcHJvcGVydGllcyk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMuZGVmZXJyZWQudmFsdWUsIHByb3BlcnRpZXMpO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhwcm9wZXJ0aWVzLmltbWVkaWF0ZS52YWx1ZSwgcHJvcGVydGllcyk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMuZXhjbHVzaXZlLnZhbHVlLCBwcm9wZXJ0aWVzKTtcblxuXHQvLyBSZXR1cm4gdGhlIGRlZmF1bHQgdmVyc2lvbiBvZiB0aGUgdHJhbnNhY3Rpb24gZnVuY3Rpb25cblx0cmV0dXJuIHByb3BlcnRpZXMuZGVmYXVsdC52YWx1ZTtcbn07XG5cbi8vIFJldHVybiB0aGUgZGF0YWJhc2UncyBjYWNoZWQgdHJhbnNhY3Rpb24gY29udHJvbGxlciwgb3IgY3JlYXRlIGEgbmV3IG9uZVxuY29uc3QgZ2V0Q29udHJvbGxlciA9IChkYiwgc2VsZikgPT4ge1xuXHRsZXQgY29udHJvbGxlciA9IGNvbnRyb2xsZXJzLmdldChkYik7XG5cdGlmICghY29udHJvbGxlcikge1xuXHRcdGNvbnN0IHNoYXJlZCA9IHtcblx0XHRcdGNvbW1pdDogZGIucHJlcGFyZSgnQ09NTUlUJywgc2VsZiwgZmFsc2UpLFxuXHRcdFx0cm9sbGJhY2s6IGRiLnByZXBhcmUoJ1JPTExCQUNLJywgc2VsZiwgZmFsc2UpLFxuXHRcdFx0c2F2ZXBvaW50OiBkYi5wcmVwYXJlKCdTQVZFUE9JTlQgYFxcdF9iczMuXFx0YCcsIHNlbGYsIGZhbHNlKSxcblx0XHRcdHJlbGVhc2U6IGRiLnByZXBhcmUoJ1JFTEVBU0UgYFxcdF9iczMuXFx0YCcsIHNlbGYsIGZhbHNlKSxcblx0XHRcdHJvbGxiYWNrVG86IGRiLnByZXBhcmUoJ1JPTExCQUNLIFRPIGBcXHRfYnMzLlxcdGAnLCBzZWxmLCBmYWxzZSksXG5cdFx0fTtcblx0XHRjb250cm9sbGVycy5zZXQoZGIsIGNvbnRyb2xsZXIgPSB7XG5cdFx0XHRkZWZhdWx0OiBPYmplY3QuYXNzaWduKHsgYmVnaW46IGRiLnByZXBhcmUoJ0JFR0lOJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0XHRkZWZlcnJlZDogT2JqZWN0LmFzc2lnbih7IGJlZ2luOiBkYi5wcmVwYXJlKCdCRUdJTiBERUZFUlJFRCcsIHNlbGYsIGZhbHNlKSB9LCBzaGFyZWQpLFxuXHRcdFx0aW1tZWRpYXRlOiBPYmplY3QuYXNzaWduKHsgYmVnaW46IGRiLnByZXBhcmUoJ0JFR0lOIElNTUVESUFURScsIHNlbGYsIGZhbHNlKSB9LCBzaGFyZWQpLFxuXHRcdFx0ZXhjbHVzaXZlOiBPYmplY3QuYXNzaWduKHsgYmVnaW46IGRiLnByZXBhcmUoJ0JFR0lOIEVYQ0xVU0lWRScsIHNlbGYsIGZhbHNlKSB9LCBzaGFyZWQpLFxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBjb250cm9sbGVyO1xufTtcblxuLy8gUmV0dXJuIGEgbmV3IHRyYW5zYWN0aW9uIGZ1bmN0aW9uIGJ5IHdyYXBwaW5nIHRoZSBnaXZlbiBmdW5jdGlvblxuY29uc3Qgd3JhcFRyYW5zYWN0aW9uID0gKGFwcGx5LCBmbiwgZGIsIHsgYmVnaW4sIGNvbW1pdCwgcm9sbGJhY2ssIHNhdmVwb2ludCwgcmVsZWFzZSwgcm9sbGJhY2tUbyB9KSA9PiBmdW5jdGlvbiBzcWxpdGVUcmFuc2FjdGlvbigpIHtcblx0bGV0IGJlZm9yZSwgYWZ0ZXIsIHVuZG87XG5cdGlmIChkYi5pblRyYW5zYWN0aW9uKSB7XG5cdFx0YmVmb3JlID0gc2F2ZXBvaW50O1xuXHRcdGFmdGVyID0gcmVsZWFzZTtcblx0XHR1bmRvID0gcm9sbGJhY2tUbztcblx0fSBlbHNlIHtcblx0XHRiZWZvcmUgPSBiZWdpbjtcblx0XHRhZnRlciA9IGNvbW1pdDtcblx0XHR1bmRvID0gcm9sbGJhY2s7XG5cdH1cblx0YmVmb3JlLnJ1bigpO1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGFwcGx5LmNhbGwoZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0YWZ0ZXIucnVuKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSBjYXRjaCAoZXgpIHtcblx0XHRpZiAoZGIuaW5UcmFuc2FjdGlvbikge1xuXHRcdFx0dW5kby5ydW4oKTtcblx0XHRcdGlmICh1bmRvICE9PSByb2xsYmFjaykgYWZ0ZXIucnVuKCk7XG5cdFx0fVxuXHRcdHRocm93IGV4O1xuXHR9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0Qm9vbGVhbk9wdGlvbiwgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcmFnbWEoc291cmNlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zID09IG51bGwpIG9wdGlvbnMgPSB7fTtcblx0aWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYW4gb3B0aW9ucyBvYmplY3QnKTtcblx0Y29uc3Qgc2ltcGxlID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2ltcGxlJyk7XG5cblx0Y29uc3Qgc3RtdCA9IHRoaXNbY3BwZGJdLnByZXBhcmUoYFBSQUdNQSAke3NvdXJjZX1gLCB0aGlzLCB0cnVlKTtcblx0cmV0dXJuIHNpbXBsZSA/IHN0bXQucGx1Y2soKS5nZXQoKSA6IHN0bXQuYWxsKCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IHByb21pc2lmeSB9ID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyBjcHBkYiB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuY29uc3QgZnNBY2Nlc3MgPSBwcm9taXNpZnkoZnMuYWNjZXNzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBiYWNrdXAoZmlsZW5hbWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgb3B0aW9ucyA9IHt9O1xuXG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIGZpbGVuYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cblx0Ly8gSW50ZXJwcmV0IG9wdGlvbnNcblx0ZmlsZW5hbWUgPSBmaWxlbmFtZS50cmltKCk7XG5cdGNvbnN0IGF0dGFjaGVkTmFtZSA9ICdhdHRhY2hlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuYXR0YWNoZWQgOiAnbWFpbic7XG5cdGNvbnN0IGhhbmRsZXIgPSAncHJvZ3Jlc3MnIGluIG9wdGlvbnMgPyBvcHRpb25zLnByb2dyZXNzIDogbnVsbDtcblxuXHQvLyBWYWxpZGF0ZSBpbnRlcnByZXRlZCBvcHRpb25zXG5cdGlmICghZmlsZW5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JhY2t1cCBmaWxlbmFtZSBjYW5ub3QgYmUgYW4gZW1wdHkgc3RyaW5nJyk7XG5cdGlmIChmaWxlbmFtZSA9PT0gJzptZW1vcnk6JykgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBiYWNrdXAgZmlsZW5hbWUgXCI6bWVtb3J5OlwiJyk7XG5cdGlmICh0eXBlb2YgYXR0YWNoZWROYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwiYXR0YWNoZWRcIiBvcHRpb24gdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKCFhdHRhY2hlZE5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImF0dGFjaGVkXCIgb3B0aW9uIGNhbm5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblx0aWYgKGhhbmRsZXIgIT0gbnVsbCAmJiB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwicHJvZ3Jlc3NcIiBvcHRpb24gdG8gYmUgYSBmdW5jdGlvbicpO1xuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBleGlzdHNcblx0YXdhaXQgZnNBY2Nlc3MocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSkuY2F0Y2goKCkgPT4ge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBzYXZlIGJhY2t1cCBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3QnKTtcblx0fSk7XG5cblx0Y29uc3QgaXNOZXdGaWxlID0gYXdhaXQgZnNBY2Nlc3MoZmlsZW5hbWUpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpO1xuXHRyZXR1cm4gcnVuQmFja3VwKHRoaXNbY3BwZGJdLmJhY2t1cCh0aGlzLCBhdHRhY2hlZE5hbWUsIGZpbGVuYW1lLCBpc05ld0ZpbGUpLCBoYW5kbGVyIHx8IG51bGwpO1xufTtcblxuY29uc3QgcnVuQmFja3VwID0gKGJhY2t1cCwgaGFuZGxlcikgPT4ge1xuXHRsZXQgcmF0ZSA9IDA7XG5cdGxldCB1c2VEZWZhdWx0ID0gdHJ1ZTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHNldEltbWVkaWF0ZShmdW5jdGlvbiBzdGVwKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBiYWNrdXAudHJhbnNmZXIocmF0ZSk7XG5cdFx0XHRcdGlmICghcHJvZ3Jlc3MucmVtYWluaW5nUGFnZXMpIHtcblx0XHRcdFx0XHRiYWNrdXAuY2xvc2UoKTtcblx0XHRcdFx0XHRyZXNvbHZlKHByb2dyZXNzKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHVzZURlZmF1bHQpIHtcblx0XHRcdFx0XHR1c2VEZWZhdWx0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmF0ZSA9IDEwMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaGFuZGxlcikge1xuXHRcdFx0XHRcdGNvbnN0IHJldCA9IGhhbmRsZXIocHJvZ3Jlc3MpO1xuXHRcdFx0XHRcdGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiByZXQgPT09ICdudW1iZXInICYmIHJldCA9PT0gcmV0KSByYXRlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMHg3ZmZmZmZmZiwgTWF0aC5yb3VuZChyZXQpKSk7XG5cdFx0XHRcdFx0XHRlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHByb2dyZXNzIGNhbGxiYWNrIHRvIHJldHVybiBhIG51bWJlciBvciB1bmRlZmluZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0SW1tZWRpYXRlKHN0ZXApO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGJhY2t1cC5jbG9zZSgpO1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXJpYWxpemUob3B0aW9ucykge1xuXHRpZiAob3B0aW9ucyA9PSBudWxsKSBvcHRpb25zID0ge307XG5cblx0Ly8gVmFsaWRhdGUgYXJndW1lbnRzXG5cdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cblx0Ly8gSW50ZXJwcmV0IGFuZCB2YWxpZGF0ZSBvcHRpb25zXG5cdGNvbnN0IGF0dGFjaGVkTmFtZSA9ICdhdHRhY2hlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuYXR0YWNoZWQgOiAnbWFpbic7XG5cdGlmICh0eXBlb2YgYXR0YWNoZWROYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwiYXR0YWNoZWRcIiBvcHRpb24gdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKCFhdHRhY2hlZE5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImF0dGFjaGVkXCIgb3B0aW9uIGNhbm5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblxuXHRyZXR1cm4gdGhpc1tjcHBkYl0uc2VyaWFsaXplKGF0dGFjaGVkTmFtZSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0Qm9vbGVhbk9wdGlvbiwgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVGdW5jdGlvbihuYW1lLCBvcHRpb25zLCBmbikge1xuXHQvLyBBcHBseSBkZWZhdWx0c1xuXHRpZiAob3B0aW9ucyA9PSBudWxsKSBvcHRpb25zID0ge307XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgeyBmbiA9IG9wdGlvbnM7IG9wdGlvbnMgPSB7fTsgfVxuXG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBsYXN0IGFyZ3VtZW50IHRvIGJlIGEgZnVuY3Rpb24nKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICghbmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNlci1kZWZpbmVkIGZ1bmN0aW9uIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIEludGVycHJldCBvcHRpb25zXG5cdGNvbnN0IHNhZmVJbnRlZ2VycyA9ICdzYWZlSW50ZWdlcnMnIGluIG9wdGlvbnMgPyArZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2FmZUludGVnZXJzJykgOiAyO1xuXHRjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpO1xuXHRjb25zdCBkaXJlY3RPbmx5ID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGlyZWN0T25seScpO1xuXHRjb25zdCB2YXJhcmdzID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAndmFyYXJncycpO1xuXHRsZXQgYXJnQ291bnQgPSAtMTtcblxuXHQvLyBEZXRlcm1pbmUgYXJndW1lbnQgY291bnRcblx0aWYgKCF2YXJhcmdzKSB7XG5cdFx0YXJnQ291bnQgPSBmbi5sZW5ndGg7XG5cdFx0aWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGFyZ0NvdW50KSB8fCBhcmdDb3VudCA8IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uLmxlbmd0aCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcblx0XHRpZiAoYXJnQ291bnQgPiAxMDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdVc2VyLWRlZmluZWQgZnVuY3Rpb25zIGNhbm5vdCBoYXZlIG1vcmUgdGhhbiAxMDAgYXJndW1lbnRzJyk7XG5cdH1cblxuXHR0aGlzW2NwcGRiXS5mdW5jdGlvbihmbiwgbmFtZSwgYXJnQ291bnQsIHNhZmVJbnRlZ2VycywgZGV0ZXJtaW5pc3RpYywgZGlyZWN0T25seSk7XG5cdHJldHVybiB0aGlzO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7IGdldEJvb2xlYW5PcHRpb24sIGNwcGRiIH0gPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lQWdncmVnYXRlKG5hbWUsIG9wdGlvbnMpIHtcblx0Ly8gVmFsaWRhdGUgYXJndW1lbnRzXG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGEgc3RyaW5nJyk7XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICghbmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNlci1kZWZpbmVkIGZ1bmN0aW9uIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIEludGVycHJldCBvcHRpb25zXG5cdGNvbnN0IHN0YXJ0ID0gJ3N0YXJ0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGFydCA6IG51bGw7XG5cdGNvbnN0IHN0ZXAgPSBnZXRGdW5jdGlvbk9wdGlvbihvcHRpb25zLCAnc3RlcCcsIHRydWUpO1xuXHRjb25zdCBpbnZlcnNlID0gZ2V0RnVuY3Rpb25PcHRpb24ob3B0aW9ucywgJ2ludmVyc2UnLCBmYWxzZSk7XG5cdGNvbnN0IHJlc3VsdCA9IGdldEZ1bmN0aW9uT3B0aW9uKG9wdGlvbnMsICdyZXN1bHQnLCBmYWxzZSk7XG5cdGNvbnN0IHNhZmVJbnRlZ2VycyA9ICdzYWZlSW50ZWdlcnMnIGluIG9wdGlvbnMgPyArZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2FmZUludGVnZXJzJykgOiAyO1xuXHRjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpO1xuXHRjb25zdCBkaXJlY3RPbmx5ID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGlyZWN0T25seScpO1xuXHRjb25zdCB2YXJhcmdzID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAndmFyYXJncycpO1xuXHRsZXQgYXJnQ291bnQgPSAtMTtcblxuXHQvLyBEZXRlcm1pbmUgYXJndW1lbnQgY291bnRcblx0aWYgKCF2YXJhcmdzKSB7XG5cdFx0YXJnQ291bnQgPSBNYXRoLm1heChnZXRMZW5ndGgoc3RlcCksIGludmVyc2UgPyBnZXRMZW5ndGgoaW52ZXJzZSkgOiAwKTtcblx0XHRpZiAoYXJnQ291bnQgPiAwKSBhcmdDb3VudCAtPSAxO1xuXHRcdGlmIChhcmdDb3VudCA+IDEwMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1VzZXItZGVmaW5lZCBmdW5jdGlvbnMgY2Fubm90IGhhdmUgbW9yZSB0aGFuIDEwMCBhcmd1bWVudHMnKTtcblx0fVxuXG5cdHRoaXNbY3BwZGJdLmFnZ3JlZ2F0ZShzdGFydCwgc3RlcCwgaW52ZXJzZSwgcmVzdWx0LCBuYW1lLCBhcmdDb3VudCwgc2FmZUludGVnZXJzLCBkZXRlcm1pbmlzdGljLCBkaXJlY3RPbmx5KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBnZXRGdW5jdGlvbk9wdGlvbiA9IChvcHRpb25zLCBrZXksIHJlcXVpcmVkKSA9PiB7XG5cdGNvbnN0IHZhbHVlID0ga2V5IGluIG9wdGlvbnMgPyBvcHRpb25zW2tleV0gOiBudWxsO1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdGlmICh2YWx1ZSAhPSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXCIke2tleX1cIiBvcHRpb24gdG8gYmUgYSBmdW5jdGlvbmApO1xuXHRpZiAocmVxdWlyZWQpIHRocm93IG5ldyBUeXBlRXJyb3IoYE1pc3NpbmcgcmVxdWlyZWQgb3B0aW9uIFwiJHtrZXl9XCJgKTtcblx0cmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBnZXRMZW5ndGggPSAoeyBsZW5ndGggfSkgPT4ge1xuXHRpZiAoTnVtYmVyLmlzSW50ZWdlcihsZW5ndGgpICYmIGxlbmd0aCA+PSAwKSByZXR1cm4gbGVuZ3RoO1xuXHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmdW5jdGlvbi5sZW5ndGggdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVUYWJsZShuYW1lLCBmYWN0b3J5KSB7XG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAoIW5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpcnR1YWwgdGFibGUgbW9kdWxlIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBtb2R1bGUgaXMgZXBvbnltb3VzLW9ubHkgb3Igbm90XG5cdGxldCBlcG9ueW1vdXMgPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBmYWN0b3J5ID09PSAnb2JqZWN0JyAmJiBmYWN0b3J5ICE9PSBudWxsKSB7XG5cdFx0ZXBvbnltb3VzID0gdHJ1ZTtcblx0XHRmYWN0b3J5ID0gZGVmZXIocGFyc2VUYWJsZURlZmluaXRpb24oZmFjdG9yeSwgJ3VzZWQnLCBuYW1lKSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHR5cGVvZiBmYWN0b3J5ICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSBmdW5jdGlvbiBvciBhIHRhYmxlIGRlZmluaXRpb24gb2JqZWN0Jyk7XG5cdFx0ZmFjdG9yeSA9IHdyYXBGYWN0b3J5KGZhY3RvcnkpO1xuXHR9XG5cblx0dGhpc1tjcHBkYl0udGFibGUoZmFjdG9yeSwgbmFtZSwgZXBvbnltb3VzKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cmFwRmFjdG9yeShmYWN0b3J5KSB7XG5cdHJldHVybiBmdW5jdGlvbiB2aXJ0dWFsVGFibGVGYWN0b3J5KG1vZHVsZU5hbWUsIGRhdGFiYXNlTmFtZSwgdGFibGVOYW1lLCAuLi5hcmdzKSB7XG5cdFx0Y29uc3QgdGhpc09iamVjdCA9IHtcblx0XHRcdG1vZHVsZTogbW9kdWxlTmFtZSxcblx0XHRcdGRhdGFiYXNlOiBkYXRhYmFzZU5hbWUsXG5cdFx0XHR0YWJsZTogdGFibGVOYW1lLFxuXHRcdH07XG5cblx0XHQvLyBHZW5lcmF0ZSBhIG5ldyB0YWJsZSBkZWZpbml0aW9uIGJ5IGludm9raW5nIHRoZSBmYWN0b3J5XG5cdFx0Y29uc3QgZGVmID0gYXBwbHkuY2FsbChmYWN0b3J5LCB0aGlzT2JqZWN0LCBhcmdzKTtcblx0XHRpZiAodHlwZW9mIGRlZiAhPT0gJ29iamVjdCcgfHwgZGVmID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiBkaWQgbm90IHJldHVybiBhIHRhYmxlIGRlZmluaXRpb24gb2JqZWN0YCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhcnNlVGFibGVEZWZpbml0aW9uKGRlZiwgJ3JldHVybmVkJywgbW9kdWxlTmFtZSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGFibGVEZWZpbml0aW9uKGRlZiwgdmVyYiwgbW9kdWxlTmFtZSkge1xuXHQvLyBWYWxpZGF0ZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbChkZWYsICdyb3dzJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRob3V0IGEgXCJyb3dzXCIgcHJvcGVydHlgKTtcblx0fVxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwoZGVmLCAnY29sdW1ucycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aG91dCBhIFwiY29sdW1uc1wiIHByb3BlcnR5YCk7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcInJvd3NcIiBwcm9wZXJ0eVxuXHRjb25zdCByb3dzID0gZGVmLnJvd3M7XG5cdGlmICh0eXBlb2Ygcm93cyAhPT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yocm93cykgIT09IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aCBhbiBpbnZhbGlkIFwicm93c1wiIHByb3BlcnR5IChzaG91bGQgYmUgYSBnZW5lcmF0b3IgZnVuY3Rpb24pYCk7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcImNvbHVtbnNcIiBwcm9wZXJ0eVxuXHRsZXQgY29sdW1ucyA9IGRlZi5jb2x1bW5zO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29sdW1ucykgfHwgIShjb2x1bW5zID0gWy4uLmNvbHVtbnNdKS5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJjb2x1bW5zXCIgcHJvcGVydHkgKHNob3VsZCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzKWApO1xuXHR9XG5cdGlmIChjb2x1bW5zLmxlbmd0aCAhPT0gbmV3IFNldChjb2x1bW5zKS5zaXplKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aCBkdXBsaWNhdGUgY29sdW1uIG5hbWVzYCk7XG5cdH1cblx0aWYgKCFjb2x1bW5zLmxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIHplcm8gY29sdW1uc2ApO1xuXHR9XG5cblx0Ly8gVmFsaWRhdGUgXCJwYXJhbWV0ZXJzXCIgcHJvcGVydHlcblx0bGV0IHBhcmFtZXRlcnM7XG5cdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZiwgJ3BhcmFtZXRlcnMnKSkge1xuXHRcdHBhcmFtZXRlcnMgPSBkZWYucGFyYW1ldGVycztcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1ldGVycykgfHwgIShwYXJhbWV0ZXJzID0gWy4uLnBhcmFtZXRlcnNdKS5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZpcnR1YWwgdGFibGUgbW9kdWxlIFwiJHttb2R1bGVOYW1lfVwiICR7dmVyYn0gYSB0YWJsZSBkZWZpbml0aW9uIHdpdGggYW4gaW52YWxpZCBcInBhcmFtZXRlcnNcIiBwcm9wZXJ0eSAoc2hvdWxkIGJlIGFuIGFycmF5IG9mIHN0cmluZ3MpYCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHBhcmFtZXRlcnMgPSBpbmZlclBhcmFtZXRlcnMocm93cyk7XG5cdH1cblx0aWYgKHBhcmFtZXRlcnMubGVuZ3RoICE9PSBuZXcgU2V0KHBhcmFtZXRlcnMpLnNpemUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGR1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXNgKTtcblx0fVxuXHRpZiAocGFyYW1ldGVycy5sZW5ndGggPiAzMikge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIG1vcmUgdGhhbiB0aGUgbWF4aW11bSBudW1iZXIgb2YgMzIgcGFyYW1ldGVyc2ApO1xuXHR9XG5cdGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHtcblx0XHRpZiAoY29sdW1ucy5pbmNsdWRlcyhwYXJhbWV0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGNvbHVtbiBcIiR7cGFyYW1ldGVyfVwiIHdoaWNoIHdhcyBhbWJpZ3VvdXNseSBkZWZpbmVkIGFzIGJvdGggYSBjb2x1bW4gYW5kIHBhcmFtZXRlcmApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFZhbGlkYXRlIFwic2FmZUludGVnZXJzXCIgb3B0aW9uXG5cdGxldCBzYWZlSW50ZWdlcnMgPSAyO1xuXHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZWYsICdzYWZlSW50ZWdlcnMnKSkge1xuXHRcdGNvbnN0IGJvb2wgPSBkZWYuc2FmZUludGVnZXJzO1xuXHRcdGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJzYWZlSW50ZWdlcnNcIiBwcm9wZXJ0eSAoc2hvdWxkIGJlIGEgYm9vbGVhbilgKTtcblx0XHR9XG5cdFx0c2FmZUludGVnZXJzID0gK2Jvb2w7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcImRpcmVjdE9ubHlcIiBvcHRpb25cblx0bGV0IGRpcmVjdE9ubHkgPSBmYWxzZTtcblx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVmLCAnZGlyZWN0T25seScpKSB7XG5cdFx0ZGlyZWN0T25seSA9IGRlZi5kaXJlY3RPbmx5O1xuXHRcdGlmICh0eXBlb2YgZGlyZWN0T25seSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJkaXJlY3RPbmx5XCIgcHJvcGVydHkgKHNob3VsZCBiZSBhIGJvb2xlYW4pYCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gR2VuZXJhdGUgU1FMIGZvciB0aGUgdmlydHVhbCB0YWJsZSBkZWZpbml0aW9uXG5cdGNvbnN0IGNvbHVtbkRlZmluaXRpb25zID0gW1xuXHRcdC4uLnBhcmFtZXRlcnMubWFwKGlkZW50aWZpZXIpLm1hcChzdHIgPT4gYCR7c3RyfSBISURERU5gKSxcblx0XHQuLi5jb2x1bW5zLm1hcChpZGVudGlmaWVyKSxcblx0XTtcblx0cmV0dXJuIFtcblx0XHRgQ1JFQVRFIFRBQkxFIHgoJHtjb2x1bW5EZWZpbml0aW9ucy5qb2luKCcsICcpfSk7YCxcblx0XHR3cmFwR2VuZXJhdG9yKHJvd3MsIG5ldyBNYXAoY29sdW1ucy5tYXAoKHgsIGkpID0+IFt4LCBwYXJhbWV0ZXJzLmxlbmd0aCArIGldKSksIG1vZHVsZU5hbWUpLFxuXHRcdHBhcmFtZXRlcnMsXG5cdFx0c2FmZUludGVnZXJzLFxuXHRcdGRpcmVjdE9ubHksXG5cdF07XG59XG5cbmZ1bmN0aW9uIHdyYXBHZW5lcmF0b3IoZ2VuZXJhdG9yLCBjb2x1bW5NYXAsIG1vZHVsZU5hbWUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKiB2aXJ0dWFsVGFibGUoLi4uYXJncykge1xuXHRcdC8qXG5cdFx0XHRXZSBtdXN0IGRlZmVuc2l2ZWx5IGNsb25lIGFueSBidWZmZXJzIGluIHRoZSBhcmd1bWVudHMsIGJlY2F1c2Vcblx0XHRcdG90aGVyd2lzZSB0aGUgZ2VuZXJhdG9yIGNvdWxkIG11dGF0ZSBvbmUgb2YgdGhlbSwgd2hpY2ggd291bGQgY2F1c2Vcblx0XHRcdHVzIHRvIHJldHVybiBpbmNvcnJlY3QgdmFsdWVzIGZvciBoaWRkZW4gY29sdW1ucywgcG90ZW50aWFsbHlcblx0XHRcdGNvcnJ1cHRpbmcgdGhlIGRhdGFiYXNlLlxuXHRcdCAqL1xuXHRcdGNvbnN0IG91dHB1dCA9IGFyZ3MubWFwKHggPT4gQnVmZmVyLmlzQnVmZmVyKHgpID8gQnVmZmVyLmZyb20oeCkgOiB4KTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbk1hcC5zaXplOyArK2kpIHtcblx0XHRcdG91dHB1dC5wdXNoKG51bGwpOyAvLyBGaWxsIHdpdGggbnVsbHMgdG8gcHJldmVudCBnYXBzIGluIGFycmF5ICh2OCBvcHRpbWl6YXRpb24pXG5cdFx0fVxuXHRcdGZvciAoY29uc3Qgcm93IG9mIGdlbmVyYXRvciguLi5hcmdzKSkge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocm93KSkge1xuXHRcdFx0XHRleHRyYWN0Um93QXJyYXkocm93LCBvdXRwdXQsIGNvbHVtbk1hcC5zaXplLCBtb2R1bGVOYW1lKTtcblx0XHRcdFx0eWllbGQgb3V0cHV0O1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygcm93ID09PSAnb2JqZWN0JyAmJiByb3cgIT09IG51bGwpIHtcblx0XHRcdFx0ZXh0cmFjdFJvd09iamVjdChyb3csIG91dHB1dCwgY29sdW1uTWFwLCBtb2R1bGVOYW1lKTtcblx0XHRcdFx0eWllbGQgb3V0cHV0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgeWllbGRlZCBzb21ldGhpbmcgdGhhdCBpc24ndCBhIHZhbGlkIHJvdyBvYmplY3RgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dBcnJheShyb3csIG91dHB1dCwgY29sdW1uQ291bnQsIG1vZHVsZU5hbWUpIHtcblx0aWYgKHJvdy5sZW5ndGggIT09IGNvbHVtbkNvdW50KSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgeWllbGRlZCBhIHJvdyB3aXRoIGFuIGluY29ycmVjdCBudW1iZXIgb2YgY29sdW1uc2ApO1xuXHR9XG5cdGNvbnN0IG9mZnNldCA9IG91dHB1dC5sZW5ndGggLSBjb2x1bW5Db3VudDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5Db3VudDsgKytpKSB7XG5cdFx0b3V0cHV0W2kgKyBvZmZzZXRdID0gcm93W2ldO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dPYmplY3Qocm93LCBvdXRwdXQsIGNvbHVtbk1hcCwgbW9kdWxlTmFtZSkge1xuXHRsZXQgY291bnQgPSAwO1xuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyb3cpKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBjb2x1bW5NYXAuZ2V0KGtleSk7XG5cdFx0aWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZpcnR1YWwgdGFibGUgbW9kdWxlIFwiJHttb2R1bGVOYW1lfVwiIHlpZWxkZWQgYSByb3cgd2l0aCBhbiB1bmRlY2xhcmVkIGNvbHVtbiBcIiR7a2V5fVwiYCk7XG5cdFx0fVxuXHRcdG91dHB1dFtpbmRleF0gPSByb3dba2V5XTtcblx0XHRjb3VudCArPSAxO1xuXHR9XG5cdGlmIChjb3VudCAhPT0gY29sdW1uTWFwLnNpemUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiB5aWVsZGVkIGEgcm93IHdpdGggbWlzc2luZyBjb2x1bW5zYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5mZXJQYXJhbWV0ZXJzKHsgbGVuZ3RoIH0pIHtcblx0aWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxlbmd0aCkgfHwgbGVuZ3RoIDwgMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uLmxlbmd0aCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcblx0fVxuXHRjb25zdCBwYXJhbXMgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHBhcmFtcy5wdXNoKGAkJHtpICsgMX1gKTtcblx0fVxuXHRyZXR1cm4gcGFyYW1zO1xufVxuXG5jb25zdCB7IGhhc093blByb3BlcnR5IH0gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3QgeyBhcHBseSB9ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuY29uc3QgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnVuY3Rpb24qKCl7fSk7XG5jb25zdCBpZGVudGlmaWVyID0gc3RyID0+IGBcIiR7c3RyLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xuY29uc3QgZGVmZXIgPSB4ID0+ICgpID0+IHg7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgRGF0YWJhc2VJbnNwZWN0aW9uID0gZnVuY3Rpb24gRGF0YWJhc2UoKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0KGRlcHRoLCBvcHRzKSB7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBEYXRhYmFzZUluc3BlY3Rpb24oKSwgdGhpcyk7XG59O1xuXG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IFNxbGl0ZUVycm9yID0gcmVxdWlyZSgnLi9zcWxpdGUtZXJyb3InKTtcblxubGV0IERFRkFVTFRfQURET047XG5cbmZ1bmN0aW9uIERhdGFiYXNlKGZpbGVuYW1lR2l2ZW4sIG9wdGlvbnMpIHtcblx0aWYgKG5ldy50YXJnZXQgPT0gbnVsbCkge1xuXHRcdHJldHVybiBuZXcgRGF0YWJhc2UoZmlsZW5hbWVHaXZlbiwgb3B0aW9ucyk7XG5cdH1cblxuXHQvLyBBcHBseSBkZWZhdWx0c1xuXHRsZXQgYnVmZmVyO1xuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGZpbGVuYW1lR2l2ZW4pKSB7XG5cdFx0YnVmZmVyID0gZmlsZW5hbWVHaXZlbjtcblx0XHRmaWxlbmFtZUdpdmVuID0gJzptZW1vcnk6Jztcblx0fVxuXHRpZiAoZmlsZW5hbWVHaXZlbiA9PSBudWxsKSBmaWxlbmFtZUdpdmVuID0gJyc7XG5cdGlmIChvcHRpb25zID09IG51bGwpIG9wdGlvbnMgPSB7fTtcblxuXHQvLyBWYWxpZGF0ZSBhcmd1bWVudHNcblx0aWYgKHR5cGVvZiBmaWxlbmFtZUdpdmVuICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICgncmVhZE9ubHknIGluIG9wdGlvbnMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NwZWxsZWQgb3B0aW9uIFwicmVhZE9ubHlcIiBzaG91bGQgYmUgXCJyZWFkb25seVwiJyk7XG5cdGlmICgnbWVtb3J5JyBpbiBvcHRpb25zKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdPcHRpb24gXCJtZW1vcnlcIiB3YXMgcmVtb3ZlZCBpbiB2Ny4wLjAgKHVzZSBcIjptZW1vcnk6XCIgZmlsZW5hbWUgaW5zdGVhZCknKTtcblxuXHQvLyBJbnRlcnByZXQgb3B0aW9uc1xuXHRjb25zdCBmaWxlbmFtZSA9IGZpbGVuYW1lR2l2ZW4udHJpbSgpO1xuXHRjb25zdCBhbm9ueW1vdXMgPSBmaWxlbmFtZSA9PT0gJycgfHwgZmlsZW5hbWUgPT09ICc6bWVtb3J5Oic7XG5cdGNvbnN0IHJlYWRvbmx5ID0gdXRpbC5nZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdyZWFkb25seScpO1xuXHRjb25zdCBmaWxlTXVzdEV4aXN0ID0gdXRpbC5nZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdmaWxlTXVzdEV4aXN0Jyk7XG5cdGNvbnN0IHRpbWVvdXQgPSAndGltZW91dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMudGltZW91dCA6IDUwMDA7XG5cdGNvbnN0IHZlcmJvc2UgPSAndmVyYm9zZScgaW4gb3B0aW9ucyA/IG9wdGlvbnMudmVyYm9zZSA6IG51bGw7XG5cdGNvbnN0IG5hdGl2ZUJpbmRpbmcgPSAnbmF0aXZlQmluZGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMubmF0aXZlQmluZGluZyA6IG51bGw7XG5cblx0Ly8gVmFsaWRhdGUgaW50ZXJwcmV0ZWQgb3B0aW9uc1xuXHRpZiAocmVhZG9ubHkgJiYgYW5vbnltb3VzICYmICFidWZmZXIpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luLW1lbW9yeS90ZW1wb3JhcnkgZGF0YWJhc2VzIGNhbm5vdCBiZSByZWFkb25seScpO1xuXHRpZiAoIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgdGltZW91dCA8IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBcInRpbWVvdXRcIiBvcHRpb24gdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG5cdGlmICh0aW1lb3V0ID4gMHg3ZmZmZmZmZikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ09wdGlvbiBcInRpbWVvdXRcIiBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDIxNDc0ODM2NDcnKTtcblx0aWYgKHZlcmJvc2UgIT0gbnVsbCAmJiB0eXBlb2YgdmVyYm9zZSAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwidmVyYm9zZVwiIG9wdGlvbiB0byBiZSBhIGZ1bmN0aW9uJyk7XG5cdGlmIChuYXRpdmVCaW5kaW5nICE9IG51bGwgJiYgdHlwZW9mIG5hdGl2ZUJpbmRpbmcgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBuYXRpdmVCaW5kaW5nICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwibmF0aXZlQmluZGluZ1wiIG9wdGlvbiB0byBiZSBhIHN0cmluZyBvciBhZGRvbiBvYmplY3QnKTtcblxuXHQvLyBMb2FkIHRoZSBuYXRpdmUgYWRkb25cblx0bGV0IGFkZG9uO1xuXHRpZiAobmF0aXZlQmluZGluZyA9PSBudWxsKSB7XG5cdFx0YWRkb24gPSBERUZBVUxUX0FERE9OIHx8IChERUZBVUxUX0FERE9OID0gcmVxdWlyZSgnYmluZGluZ3MnKSgnYmV0dGVyX3NxbGl0ZTMubm9kZScpKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbmF0aXZlQmluZGluZyA9PT0gJ3N0cmluZycpIHtcblx0XHQvLyBTZWUgPGh0dHBzOi8vd2VicGFjay5qcy5vcmcvYXBpL21vZHVsZS12YXJpYWJsZXMvI19fbm9uX3dlYnBhY2tfcmVxdWlyZV9fLXdlYnBhY2stc3BlY2lmaWM+XG5cdFx0Y29uc3QgcmVxdWlyZUZ1bmMgPSB0eXBlb2YgX19ub25fd2VicGFja19yZXF1aXJlX18gPT09ICdmdW5jdGlvbicgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA6IHJlcXVpcmU7XG5cdFx0YWRkb24gPSByZXF1aXJlRnVuYyhwYXRoLnJlc29sdmUobmF0aXZlQmluZGluZykucmVwbGFjZSgvKFxcLm5vZGUpPyQvLCAnLm5vZGUnKSk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gU2VlIDxodHRwczovL2dpdGh1Yi5jb20vV2lzZUxpYnMvYmV0dGVyLXNxbGl0ZTMvaXNzdWVzLzk3Mj5cblx0XHRhZGRvbiA9IG5hdGl2ZUJpbmRpbmc7XG5cdH1cblxuXHRpZiAoIWFkZG9uLmlzSW5pdGlhbGl6ZWQpIHtcblx0XHRhZGRvbi5zZXRFcnJvckNvbnN0cnVjdG9yKFNxbGl0ZUVycm9yKTtcblx0XHRhZGRvbi5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBleGlzdHNcblx0aWYgKCFhbm9ueW1vdXMgJiYgIWZzLmV4aXN0c1N5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3Qgb3BlbiBkYXRhYmFzZSBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3QnKTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRbdXRpbC5jcHBkYl06IHsgdmFsdWU6IG5ldyBhZGRvbi5EYXRhYmFzZShmaWxlbmFtZSwgZmlsZW5hbWVHaXZlbiwgYW5vbnltb3VzLCByZWFkb25seSwgZmlsZU11c3RFeGlzdCwgdGltZW91dCwgdmVyYm9zZSB8fCBudWxsLCBidWZmZXIgfHwgbnVsbCkgfSxcblx0XHQuLi53cmFwcGVycy5nZXR0ZXJzLFxuXHR9KTtcbn1cblxuY29uc3Qgd3JhcHBlcnMgPSByZXF1aXJlKCcuL21ldGhvZHMvd3JhcHBlcnMnKTtcbkRhdGFiYXNlLnByb3RvdHlwZS5wcmVwYXJlID0gd3JhcHBlcnMucHJlcGFyZTtcbkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vbWV0aG9kcy90cmFuc2FjdGlvbicpO1xuRGF0YWJhc2UucHJvdG90eXBlLnByYWdtYSA9IHJlcXVpcmUoJy4vbWV0aG9kcy9wcmFnbWEnKTtcbkRhdGFiYXNlLnByb3RvdHlwZS5iYWNrdXAgPSByZXF1aXJlKCcuL21ldGhvZHMvYmFja3VwJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gcmVxdWlyZSgnLi9tZXRob2RzL3NlcmlhbGl6ZScpO1xuRGF0YWJhc2UucHJvdG90eXBlLmZ1bmN0aW9uID0gcmVxdWlyZSgnLi9tZXRob2RzL2Z1bmN0aW9uJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUuYWdncmVnYXRlID0gcmVxdWlyZSgnLi9tZXRob2RzL2FnZ3JlZ2F0ZScpO1xuRGF0YWJhc2UucHJvdG90eXBlLnRhYmxlID0gcmVxdWlyZSgnLi9tZXRob2RzL3RhYmxlJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUubG9hZEV4dGVuc2lvbiA9IHdyYXBwZXJzLmxvYWRFeHRlbnNpb247XG5EYXRhYmFzZS5wcm90b3R5cGUuZXhlYyA9IHdyYXBwZXJzLmV4ZWM7XG5EYXRhYmFzZS5wcm90b3R5cGUuY2xvc2UgPSB3cmFwcGVycy5jbG9zZTtcbkRhdGFiYXNlLnByb3RvdHlwZS5kZWZhdWx0U2FmZUludGVnZXJzID0gd3JhcHBlcnMuZGVmYXVsdFNhZmVJbnRlZ2VycztcbkRhdGFiYXNlLnByb3RvdHlwZS51bnNhZmVNb2RlID0gd3JhcHBlcnMudW5zYWZlTW9kZTtcbkRhdGFiYXNlLnByb3RvdHlwZVt1dGlsLmluc3BlY3RdID0gcmVxdWlyZSgnLi9tZXRob2RzL2luc3BlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhYmFzZTtcbiIsICIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGF0YWJhc2UnKTtcbm1vZHVsZS5leHBvcnRzLlNxbGl0ZUVycm9yID0gcmVxdWlyZSgnLi9zcWxpdGUtZXJyb3InKTtcbiIsICIndXNlIHN0cmljdCdcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICogQ29kZSBpbml0aWFsbHkgY29waWVkL2FkYXB0ZWQgZnJvbSBcInBvbnktY2F1c2VcIiBucG0gbW9kdWxlICpcbi8vICogUGxlYXNlIHVwc3RyZWFtIGltcHJvdmVtZW50cyB0aGVyZSAgICAgICAgICAgICAgICAgICAgICAgICAqXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5jb25zdCBpc0Vycm9yTGlrZSA9IChlcnIpID0+IHtcbiAgcmV0dXJuIGVyciAmJiB0eXBlb2YgZXJyLm1lc3NhZ2UgPT09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogQHBhcmFtIHtFcnJvcnx7IGNhdXNlPzogdW5rbm93bnwoKCk9PmVycil9fSBlcnJcbiAqIEByZXR1cm5zIHtFcnJvcnxPYmplY3R8dW5kZWZpbmVkfVxuICovXG5jb25zdCBnZXRFcnJvckNhdXNlID0gKGVycikgPT4ge1xuICBpZiAoIWVycikgcmV0dXJuXG5cbiAgLyoqIEB0eXBlIHt1bmtub3dufSAqL1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGNhdXNlID0gZXJyLmNhdXNlXG5cbiAgLy8gVkVycm9yIC8gTkVycm9yIHN0eWxlIGNhdXNlc1xuICBpZiAodHlwZW9mIGNhdXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNhdXNlUmVzdWx0ID0gZXJyLmNhdXNlKClcblxuICAgIHJldHVybiBpc0Vycm9yTGlrZShjYXVzZVJlc3VsdClcbiAgICAgID8gY2F1c2VSZXN1bHRcbiAgICAgIDogdW5kZWZpbmVkXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGlzRXJyb3JMaWtlKGNhdXNlKVxuICAgICAgPyBjYXVzZVxuICAgICAgOiB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIEludGVybmFsIG1ldGhvZCB0aGF0IGtlZXBzIGEgdHJhY2sgb2Ygd2hpY2ggZXJyb3Igd2UgaGF2ZSBhbHJlYWR5IGFkZGVkLCB0byBhdm9pZCBjaXJjdWxhciByZWN1cnNpb25cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1NldDxFcnJvcj59IHNlZW5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IF9zdGFja1dpdGhDYXVzZXMgPSAoZXJyLCBzZWVuKSA9PiB7XG4gIGlmICghaXNFcnJvckxpa2UoZXJyKSkgcmV0dXJuICcnXG5cbiAgY29uc3Qgc3RhY2sgPSBlcnIuc3RhY2sgfHwgJydcblxuICAvLyBFbnN1cmUgd2UgZG9uJ3QgZ28gY2lyY3VsYXIgb3IgY3JhemlseSBkZWVwXG4gIGlmIChzZWVuLmhhcyhlcnIpKSB7XG4gICAgcmV0dXJuIHN0YWNrICsgJ1xcbmNhdXNlcyBoYXZlIGJlY29tZSBjaXJjdWxhci4uLidcbiAgfVxuXG4gIGNvbnN0IGNhdXNlID0gZ2V0RXJyb3JDYXVzZShlcnIpXG5cbiAgaWYgKGNhdXNlKSB7XG4gICAgc2Vlbi5hZGQoZXJyKVxuICAgIHJldHVybiAoc3RhY2sgKyAnXFxuY2F1c2VkIGJ5OiAnICsgX3N0YWNrV2l0aENhdXNlcyhjYXVzZSwgc2VlbikpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0YWNrXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0YWNrV2l0aENhdXNlcyA9IChlcnIpID0+IF9zdGFja1dpdGhDYXVzZXMoZXJyLCBuZXcgU2V0KCkpXG5cbi8qKlxuICogSW50ZXJuYWwgbWV0aG9kIHRoYXQga2VlcHMgYSB0cmFjayBvZiB3aGljaCBlcnJvciB3ZSBoYXZlIGFscmVhZHkgYWRkZWQsIHRvIGF2b2lkIGNpcmN1bGFyIHJlY3Vyc2lvblxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U2V0PEVycm9yPn0gc2VlblxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcF1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IF9tZXNzYWdlV2l0aENhdXNlcyA9IChlcnIsIHNlZW4sIHNraXApID0+IHtcbiAgaWYgKCFpc0Vycm9yTGlrZShlcnIpKSByZXR1cm4gJydcblxuICBjb25zdCBtZXNzYWdlID0gc2tpcCA/ICcnIDogKGVyci5tZXNzYWdlIHx8ICcnKVxuXG4gIC8vIEVuc3VyZSB3ZSBkb24ndCBnbyBjaXJjdWxhciBvciBjcmF6aWx5IGRlZXBcbiAgaWYgKHNlZW4uaGFzKGVycikpIHtcbiAgICByZXR1cm4gbWVzc2FnZSArICc6IC4uLidcbiAgfVxuXG4gIGNvbnN0IGNhdXNlID0gZ2V0RXJyb3JDYXVzZShlcnIpXG5cbiAgaWYgKGNhdXNlKSB7XG4gICAgc2Vlbi5hZGQoZXJyKVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHNraXBJZlZFcnJvclN0eWxlQ2F1c2UgPSB0eXBlb2YgZXJyLmNhdXNlID09PSAnZnVuY3Rpb24nXG5cbiAgICByZXR1cm4gKG1lc3NhZ2UgK1xuICAgICAgKHNraXBJZlZFcnJvclN0eWxlQ2F1c2UgPyAnJyA6ICc6ICcpICtcbiAgICAgIF9tZXNzYWdlV2l0aENhdXNlcyhjYXVzZSwgc2Vlbiwgc2tpcElmVkVycm9yU3R5bGVDYXVzZSkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1lc3NhZ2VcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgbWVzc2FnZVdpdGhDYXVzZXMgPSAoZXJyKSA9PiBfbWVzc2FnZVdpdGhDYXVzZXMoZXJyLCBuZXcgU2V0KCkpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0Vycm9yTGlrZSxcbiAgZ2V0RXJyb3JDYXVzZSxcbiAgc3RhY2tXaXRoQ2F1c2VzLFxuICBtZXNzYWdlV2l0aENhdXNlc1xufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBzZWVuID0gU3ltYm9sKCdjaXJjdWxhci1yZWYtdGFnJylcbmNvbnN0IHJhd1N5bWJvbCA9IFN5bWJvbCgncGluby1yYXctZXJyLXJlZicpXG5cbmNvbnN0IHBpbm9FcnJQcm90byA9IE9iamVjdC5jcmVhdGUoe30sIHtcbiAgdHlwZToge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IHVuZGVmaW5lZFxuICB9LFxuICBtZXNzYWdlOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdW5kZWZpbmVkXG4gIH0sXG4gIHN0YWNrOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdW5kZWZpbmVkXG4gIH0sXG4gIGFnZ3JlZ2F0ZUVycm9yczoge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IHVuZGVmaW5lZFxuICB9LFxuICByYXc6IHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzW3Jhd1N5bWJvbF1cbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgdGhpc1tyYXdTeW1ib2xdID0gdmFsXG4gICAgfVxuICB9XG59KVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHBpbm9FcnJQcm90bywgcmF3U3ltYm9sLCB7XG4gIHdyaXRhYmxlOiB0cnVlLFxuICB2YWx1ZToge31cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwaW5vRXJyUHJvdG8sXG4gIHBpbm9FcnJvclN5bWJvbHM6IHtcbiAgICBzZWVuLFxuICAgIHJhd1N5bWJvbFxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZXJyU2VyaWFsaXplclxuXG5jb25zdCB7IG1lc3NhZ2VXaXRoQ2F1c2VzLCBzdGFja1dpdGhDYXVzZXMsIGlzRXJyb3JMaWtlIH0gPSByZXF1aXJlKCcuL2Vyci1oZWxwZXJzJylcbmNvbnN0IHsgcGlub0VyclByb3RvLCBwaW5vRXJyb3JTeW1ib2xzIH0gPSByZXF1aXJlKCcuL2Vyci1wcm90bycpXG5jb25zdCB7IHNlZW4gfSA9IHBpbm9FcnJvclN5bWJvbHNcblxuY29uc3QgeyB0b1N0cmluZyB9ID0gT2JqZWN0LnByb3RvdHlwZVxuXG5mdW5jdGlvbiBlcnJTZXJpYWxpemVyIChlcnIpIHtcbiAgaWYgKCFpc0Vycm9yTGlrZShlcnIpKSB7XG4gICAgcmV0dXJuIGVyclxuICB9XG5cbiAgZXJyW3NlZW5dID0gdW5kZWZpbmVkIC8vIHRhZyB0byBwcmV2ZW50IHJlLWxvb2tpbmcgYXQgdGhpc1xuICBjb25zdCBfZXJyID0gT2JqZWN0LmNyZWF0ZShwaW5vRXJyUHJvdG8pXG4gIF9lcnIudHlwZSA9IHRvU3RyaW5nLmNhbGwoZXJyLmNvbnN0cnVjdG9yKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJ1xuICAgID8gZXJyLmNvbnN0cnVjdG9yLm5hbWVcbiAgICA6IGVyci5uYW1lXG4gIF9lcnIubWVzc2FnZSA9IG1lc3NhZ2VXaXRoQ2F1c2VzKGVycilcbiAgX2Vyci5zdGFjayA9IHN0YWNrV2l0aENhdXNlcyhlcnIpXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZXJyLmVycm9ycykpIHtcbiAgICBfZXJyLmFnZ3JlZ2F0ZUVycm9ycyA9IGVyci5lcnJvcnMubWFwKGVyciA9PiBlcnJTZXJpYWxpemVyKGVycikpXG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBlcnIpIHtcbiAgICBpZiAoX2VycltrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGVycltrZXldXG4gICAgICBpZiAoaXNFcnJvckxpa2UodmFsKSkge1xuICAgICAgICAvLyBXZSBhcHBlbmQgY2F1c2UgbWVzc2FnZXMgYW5kIHN0YWNrcyB0byBfZXJyLCB0aGVyZWZvcmUgc2tpcHBpbmcgY2F1c2VzIGhlcmVcbiAgICAgICAgaWYgKGtleSAhPT0gJ2NhdXNlJyAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwgc2VlbikpIHtcbiAgICAgICAgICBfZXJyW2tleV0gPSBlcnJTZXJpYWxpemVyKHZhbClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2VycltrZXldID0gdmFsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlIGVycltzZWVuXSAvLyBjbGVhbiB1cCB0YWcgaW4gY2FzZSBlcnIgaXMgc2VyaWFsaXplZCBhZ2FpbiBsYXRlclxuICBfZXJyLnJhdyA9IGVyclxuICByZXR1cm4gX2VyclxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVycldpdGhDYXVzZVNlcmlhbGl6ZXJcblxuY29uc3QgeyBpc0Vycm9yTGlrZSB9ID0gcmVxdWlyZSgnLi9lcnItaGVscGVycycpXG5jb25zdCB7IHBpbm9FcnJQcm90bywgcGlub0Vycm9yU3ltYm9scyB9ID0gcmVxdWlyZSgnLi9lcnItcHJvdG8nKVxuY29uc3QgeyBzZWVuIH0gPSBwaW5vRXJyb3JTeW1ib2xzXG5cbmNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGVcblxuZnVuY3Rpb24gZXJyV2l0aENhdXNlU2VyaWFsaXplciAoZXJyKSB7XG4gIGlmICghaXNFcnJvckxpa2UoZXJyKSkge1xuICAgIHJldHVybiBlcnJcbiAgfVxuXG4gIGVycltzZWVuXSA9IHVuZGVmaW5lZCAvLyB0YWcgdG8gcHJldmVudCByZS1sb29raW5nIGF0IHRoaXNcbiAgY29uc3QgX2VyciA9IE9iamVjdC5jcmVhdGUocGlub0VyclByb3RvKVxuICBfZXJyLnR5cGUgPSB0b1N0cmluZy5jYWxsKGVyci5jb25zdHJ1Y3RvcikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcbiAgICA/IGVyci5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgOiBlcnIubmFtZVxuICBfZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZVxuICBfZXJyLnN0YWNrID0gZXJyLnN0YWNrXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZXJyLmVycm9ycykpIHtcbiAgICBfZXJyLmFnZ3JlZ2F0ZUVycm9ycyA9IGVyci5lcnJvcnMubWFwKGVyciA9PiBlcnJXaXRoQ2F1c2VTZXJpYWxpemVyKGVycikpXG4gIH1cblxuICBpZiAoaXNFcnJvckxpa2UoZXJyLmNhdXNlKSAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVyci5jYXVzZSwgc2VlbikpIHtcbiAgICBfZXJyLmNhdXNlID0gZXJyV2l0aENhdXNlU2VyaWFsaXplcihlcnIuY2F1c2UpXG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBlcnIpIHtcbiAgICBpZiAoX2VycltrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGVycltrZXldXG4gICAgICBpZiAoaXNFcnJvckxpa2UodmFsKSkge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWwsIHNlZW4pKSB7XG4gICAgICAgICAgX2VycltrZXldID0gZXJyV2l0aENhdXNlU2VyaWFsaXplcih2YWwpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9lcnJba2V5XSA9IHZhbFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZSBlcnJbc2Vlbl0gLy8gY2xlYW4gdXAgdGFnIGluIGNhc2UgZXJyIGlzIHNlcmlhbGl6ZWQgYWdhaW4gbGF0ZXJcbiAgX2Vyci5yYXcgPSBlcnJcbiAgcmV0dXJuIF9lcnJcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1hcEh0dHBSZXF1ZXN0LFxuICByZXFTZXJpYWxpemVyXG59XG5cbmNvbnN0IHJhd1N5bWJvbCA9IFN5bWJvbCgncGluby1yYXctcmVxLXJlZicpXG5jb25zdCBwaW5vUmVxUHJvdG8gPSBPYmplY3QuY3JlYXRlKHt9LCB7XG4gIGlkOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgbWV0aG9kOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgdXJsOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgcXVlcnk6IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiAnJ1xuICB9LFxuICBwYXJhbXM6IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiAnJ1xuICB9LFxuICBoZWFkZXJzOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZToge31cbiAgfSxcbiAgcmVtb3RlQWRkcmVzczoge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6ICcnXG4gIH0sXG4gIHJlbW90ZVBvcnQ6IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiAnJ1xuICB9LFxuICByYXc6IHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzW3Jhd1N5bWJvbF1cbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgdGhpc1tyYXdTeW1ib2xdID0gdmFsXG4gICAgfVxuICB9XG59KVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHBpbm9SZXFQcm90bywgcmF3U3ltYm9sLCB7XG4gIHdyaXRhYmxlOiB0cnVlLFxuICB2YWx1ZToge31cbn0pXG5cbmZ1bmN0aW9uIHJlcVNlcmlhbGl6ZXIgKHJlcSkge1xuICAvLyByZXEuaW5mbyBpcyBmb3IgaGFwaSBjb21wYXQuXG4gIGNvbnN0IGNvbm5lY3Rpb24gPSByZXEuaW5mbyB8fCByZXEuc29ja2V0XG4gIGNvbnN0IF9yZXEgPSBPYmplY3QuY3JlYXRlKHBpbm9SZXFQcm90bylcbiAgX3JlcS5pZCA9ICh0eXBlb2YgcmVxLmlkID09PSAnZnVuY3Rpb24nID8gcmVxLmlkKCkgOiAocmVxLmlkIHx8IChyZXEuaW5mbyA/IHJlcS5pbmZvLmlkIDogdW5kZWZpbmVkKSkpXG4gIF9yZXEubWV0aG9kID0gcmVxLm1ldGhvZFxuICAvLyByZXEub3JpZ2luYWxVcmwgaXMgZm9yIGV4cHJlc3NqcyBjb21wYXQuXG4gIGlmIChyZXEub3JpZ2luYWxVcmwpIHtcbiAgICBfcmVxLnVybCA9IHJlcS5vcmlnaW5hbFVybFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBhdGggPSByZXEucGF0aFxuICAgIC8vIHBhdGggZm9yIHNhZmUgaGFwaSBjb21wYXQuXG4gICAgX3JlcS51cmwgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoIDogKHJlcS51cmwgPyByZXEudXJsLnBhdGggfHwgcmVxLnVybCA6IHVuZGVmaW5lZClcbiAgfVxuXG4gIGlmIChyZXEucXVlcnkpIHtcbiAgICBfcmVxLnF1ZXJ5ID0gcmVxLnF1ZXJ5XG4gIH1cblxuICBpZiAocmVxLnBhcmFtcykge1xuICAgIF9yZXEucGFyYW1zID0gcmVxLnBhcmFtc1xuICB9XG5cbiAgX3JlcS5oZWFkZXJzID0gcmVxLmhlYWRlcnNcbiAgX3JlcS5yZW1vdGVBZGRyZXNzID0gY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLnJlbW90ZUFkZHJlc3NcbiAgX3JlcS5yZW1vdGVQb3J0ID0gY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLnJlbW90ZVBvcnRcbiAgLy8gcmVxLnJhdyBpcyAgZm9yIGhhcGkgY29tcGF0L2VxdWl2YWxlbmNlXG4gIF9yZXEucmF3ID0gcmVxLnJhdyB8fCByZXFcbiAgcmV0dXJuIF9yZXFcbn1cblxuZnVuY3Rpb24gbWFwSHR0cFJlcXVlc3QgKHJlcSkge1xuICByZXR1cm4ge1xuICAgIHJlcTogcmVxU2VyaWFsaXplcihyZXEpXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1hcEh0dHBSZXNwb25zZSxcbiAgcmVzU2VyaWFsaXplclxufVxuXG5jb25zdCByYXdTeW1ib2wgPSBTeW1ib2woJ3Bpbm8tcmF3LXJlcy1yZWYnKVxuY29uc3QgcGlub1Jlc1Byb3RvID0gT2JqZWN0LmNyZWF0ZSh7fSwge1xuICBzdGF0dXNDb2RlOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogMFxuICB9LFxuICBoZWFkZXJzOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgcmF3OiB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1tyYXdTeW1ib2xdXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHRoaXNbcmF3U3ltYm9sXSA9IHZhbFxuICAgIH1cbiAgfVxufSlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwaW5vUmVzUHJvdG8sIHJhd1N5bWJvbCwge1xuICB3cml0YWJsZTogdHJ1ZSxcbiAgdmFsdWU6IHt9XG59KVxuXG5mdW5jdGlvbiByZXNTZXJpYWxpemVyIChyZXMpIHtcbiAgY29uc3QgX3JlcyA9IE9iamVjdC5jcmVhdGUocGlub1Jlc1Byb3RvKVxuICBfcmVzLnN0YXR1c0NvZGUgPSByZXMuaGVhZGVyc1NlbnQgPyByZXMuc3RhdHVzQ29kZSA6IG51bGxcbiAgX3Jlcy5oZWFkZXJzID0gcmVzLmdldEhlYWRlcnMgPyByZXMuZ2V0SGVhZGVycygpIDogcmVzLl9oZWFkZXJzXG4gIF9yZXMucmF3ID0gcmVzXG4gIHJldHVybiBfcmVzXG59XG5cbmZ1bmN0aW9uIG1hcEh0dHBSZXNwb25zZSAocmVzKSB7XG4gIHJldHVybiB7XG4gICAgcmVzOiByZXNTZXJpYWxpemVyKHJlcylcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBlcnJTZXJpYWxpemVyID0gcmVxdWlyZSgnLi9saWIvZXJyJylcbmNvbnN0IGVycldpdGhDYXVzZVNlcmlhbGl6ZXIgPSByZXF1aXJlKCcuL2xpYi9lcnItd2l0aC1jYXVzZScpXG5jb25zdCByZXFTZXJpYWxpemVycyA9IHJlcXVpcmUoJy4vbGliL3JlcScpXG5jb25zdCByZXNTZXJpYWxpemVycyA9IHJlcXVpcmUoJy4vbGliL3JlcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlcnI6IGVyclNlcmlhbGl6ZXIsXG4gIGVycldpdGhDYXVzZTogZXJyV2l0aENhdXNlU2VyaWFsaXplcixcbiAgbWFwSHR0cFJlcXVlc3Q6IHJlcVNlcmlhbGl6ZXJzLm1hcEh0dHBSZXF1ZXN0LFxuICBtYXBIdHRwUmVzcG9uc2U6IHJlc1NlcmlhbGl6ZXJzLm1hcEh0dHBSZXNwb25zZSxcbiAgcmVxOiByZXFTZXJpYWxpemVycy5yZXFTZXJpYWxpemVyLFxuICByZXM6IHJlc1NlcmlhbGl6ZXJzLnJlc1NlcmlhbGl6ZXIsXG5cbiAgd3JhcEVycm9yU2VyaWFsaXplcjogZnVuY3Rpb24gd3JhcEVycm9yU2VyaWFsaXplciAoY3VzdG9tU2VyaWFsaXplcikge1xuICAgIGlmIChjdXN0b21TZXJpYWxpemVyID09PSBlcnJTZXJpYWxpemVyKSByZXR1cm4gY3VzdG9tU2VyaWFsaXplclxuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwRXJyU2VyaWFsaXplciAoZXJyKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU2VyaWFsaXplcihlcnJTZXJpYWxpemVyKGVycikpXG4gICAgfVxuICB9LFxuXG4gIHdyYXBSZXF1ZXN0U2VyaWFsaXplcjogZnVuY3Rpb24gd3JhcFJlcXVlc3RTZXJpYWxpemVyIChjdXN0b21TZXJpYWxpemVyKSB7XG4gICAgaWYgKGN1c3RvbVNlcmlhbGl6ZXIgPT09IHJlcVNlcmlhbGl6ZXJzLnJlcVNlcmlhbGl6ZXIpIHJldHVybiBjdXN0b21TZXJpYWxpemVyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWRSZXFTZXJpYWxpemVyIChyZXEpIHtcbiAgICAgIHJldHVybiBjdXN0b21TZXJpYWxpemVyKHJlcVNlcmlhbGl6ZXJzLnJlcVNlcmlhbGl6ZXIocmVxKSlcbiAgICB9XG4gIH0sXG5cbiAgd3JhcFJlc3BvbnNlU2VyaWFsaXplcjogZnVuY3Rpb24gd3JhcFJlc3BvbnNlU2VyaWFsaXplciAoY3VzdG9tU2VyaWFsaXplcikge1xuICAgIGlmIChjdXN0b21TZXJpYWxpemVyID09PSByZXNTZXJpYWxpemVycy5yZXNTZXJpYWxpemVyKSByZXR1cm4gY3VzdG9tU2VyaWFsaXplclxuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVkUmVzU2VyaWFsaXplciAocmVzKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU2VyaWFsaXplcihyZXNTZXJpYWxpemVycy5yZXNTZXJpYWxpemVyKHJlcykpXG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIG5vT3BQcmVwYXJlU3RhY2tUcmFjZSAoXywgc3RhY2spIHtcbiAgcmV0dXJuIHN0YWNrXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0Q2FsbGVycyAoKSB7XG4gIGNvbnN0IG9yaWdpbmFsUHJlcGFyZSA9IEVycm9yLnByZXBhcmVTdGFja1RyYWNlXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gbm9PcFByZXBhcmVTdGFja1RyYWNlXG4gIGNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2tcbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBvcmlnaW5hbFByZXBhcmVcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoc3RhY2spKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgY29uc3QgZW50cmllcyA9IHN0YWNrLnNsaWNlKDIpXG5cbiAgY29uc3QgZmlsZU5hbWVzID0gW11cblxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGZpbGVOYW1lcy5wdXNoKGVudHJ5LmdldEZpbGVOYW1lKCkpXG4gIH1cblxuICByZXR1cm4gZmlsZU5hbWVzXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdG9yXG5cbmZ1bmN0aW9uIHZhbGlkYXRvciAob3B0cyA9IHt9KSB7XG4gIGNvbnN0IHtcbiAgICBFUlJfUEFUSFNfTVVTVF9CRV9TVFJJTkdTID0gKCkgPT4gJ2Zhc3QtcmVkYWN0IC0gUGF0aHMgbXVzdCBiZSAobm9uLWVtcHR5KSBzdHJpbmdzJyxcbiAgICBFUlJfSU5WQUxJRF9QQVRIID0gKHMpID0+IGBmYXN0LXJlZGFjdCBcdTIwMTMgSW52YWxpZCBwYXRoICgke3N9KWBcbiAgfSA9IG9wdHNcblxuICByZXR1cm4gZnVuY3Rpb24gdmFsaWRhdGUgKHsgcGF0aHMgfSkge1xuICAgIHBhdGhzLmZvckVhY2goKHMpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoRVJSX1BBVEhTX01VU1RfQkVfU1RSSU5HUygpKVxuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKC9cdTMwMDcvLnRlc3QocykpIHRocm93IEVycm9yKClcbiAgICAgICAgY29uc3QgZXhwciA9IChzWzBdID09PSAnWycgPyAnJyA6ICcuJykgKyBzLnJlcGxhY2UoL15cXCovLCAnXHUzMDA3JykucmVwbGFjZSgvXFwuXFwqL2csICcuXHUzMDA3JykucmVwbGFjZSgvXFxbXFwqXFxdL2csICdbXHUzMDA3XScpXG4gICAgICAgIGlmICgvXFxufFxccnw7Ly50ZXN0KGV4cHIpKSB0aHJvdyBFcnJvcigpXG4gICAgICAgIGlmICgvXFwvXFwqLy50ZXN0KGV4cHIpKSB0aHJvdyBFcnJvcigpXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBGdW5jdGlvbihgXG4gICAgICAgICAgICAndXNlIHN0cmljdCdcbiAgICAgICAgICAgIGNvbnN0IG8gPSBuZXcgUHJveHkoe30sIHsgZ2V0OiAoKSA9PiBvLCBzZXQ6ICgpID0+IHsgdGhyb3cgRXJyb3IoKSB9IH0pO1xuICAgICAgICAgICAgY29uc3QgXHUzMDA3ID0gbnVsbDtcbiAgICAgICAgICAgIG8ke2V4cHJ9XG4gICAgICAgICAgICBpZiAoW28ke2V4cHJ9XS5sZW5ndGggIT09IDEpIHRocm93IEVycm9yKClgKSgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IEVycm9yKEVSUl9JTlZBTElEX1BBVEgocykpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IC9bXi5bXFxdXSt8XFxbKCg/Oi4pKj8pXFxdL2dcblxuLypcblJlZ3VsYXIgZXhwcmVzc2lvbiBleHBsYW5hdGlvbjpcblxuQWx0IDE6IC9bXi5bXFxdXSsvIC0gTWF0Y2ggb25lIG9yIG1vcmUgY2hhcmFjdGVycyB0aGF0IGFyZSAqbm90KiBhIGRvdCAoLilcbiAgICAgICAgICAgICAgICAgICAgb3BlbmluZyBzcXVhcmUgYnJhY2tldCAoWykgb3IgY2xvc2luZyBzcXVhcmUgYnJhY2tldCAoXSlcblxuQWx0IDI6IC9cXFsoKD86LikqPylcXF0vIC0gSWYgdGhlIGNoYXIgSVMgZG90IG9yIHNxdWFyZSBicmFja2V0LCB0aGVuIGNyZWF0ZSBhIGNhcHR1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgICBncm91cCAod2hpY2ggd2lsbCBiZSBjYXB0dXJlIGdyb3VwICQxKSB0aGF0IG1hdGNoZXMgYW55dGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoaW4gc3F1YXJlIGJyYWNrZXRzLiBFeHBhbnNpb24gaXMgbGF6eSBzbyBpdCB3aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCBtYXRjaGluZyBhcyBzb29uIGFzIHRoZSBmaXJzdCBjbG9zaW5nIGJyYWNrZXQgaXMgbWV0IGBdYFxuICAgICAgICAgICAgICAgICAgICAgICAgIChyYXRoZXIgdGhhbiBjb250aW51aW5nIHRvIG1hdGNoIHVudGlsIHRoZSBmaW5hbCBjbG9zaW5nIGJyYWNrZXQpLlxuKi9cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgcnggPSByZXF1aXJlKCcuL3J4JylcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuXG5mdW5jdGlvbiBwYXJzZSAoeyBwYXRocyB9KSB7XG4gIGNvbnN0IHdpbGRjYXJkcyA9IFtdXG4gIHZhciB3Y0xlbiA9IDBcbiAgY29uc3Qgc2VjcmV0ID0gcGF0aHMucmVkdWNlKGZ1bmN0aW9uIChvLCBzdHJQYXRoLCBpeCkge1xuICAgIHZhciBwYXRoID0gc3RyUGF0aC5tYXRjaChyeCkubWFwKChwKSA9PiBwLnJlcGxhY2UoLyd8XCJ8YC9nLCAnJykpXG4gICAgY29uc3QgbGVhZGluZ0JyYWNrZXQgPSBzdHJQYXRoWzBdID09PSAnWydcbiAgICBwYXRoID0gcGF0aC5tYXAoKHApID0+IHtcbiAgICAgIGlmIChwWzBdID09PSAnWycpIHJldHVybiBwLnN1YnN0cigxLCBwLmxlbmd0aCAtIDIpXG4gICAgICBlbHNlIHJldHVybiBwXG4gICAgfSlcbiAgICBjb25zdCBzdGFyID0gcGF0aC5pbmRleE9mKCcqJylcbiAgICBpZiAoc3RhciA+IC0xKSB7XG4gICAgICBjb25zdCBiZWZvcmUgPSBwYXRoLnNsaWNlKDAsIHN0YXIpXG4gICAgICBjb25zdCBiZWZvcmVTdHIgPSBiZWZvcmUuam9pbignLicpXG4gICAgICBjb25zdCBhZnRlciA9IHBhdGguc2xpY2Uoc3RhciArIDEsIHBhdGgubGVuZ3RoKVxuICAgICAgY29uc3QgbmVzdGVkID0gYWZ0ZXIubGVuZ3RoID4gMFxuICAgICAgd2NMZW4rK1xuICAgICAgd2lsZGNhcmRzLnB1c2goe1xuICAgICAgICBiZWZvcmUsXG4gICAgICAgIGJlZm9yZVN0cixcbiAgICAgICAgYWZ0ZXIsXG4gICAgICAgIG5lc3RlZFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgb1tzdHJQYXRoXSA9IHtcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgdmFsOiB1bmRlZmluZWQsXG4gICAgICAgIHByZWNlbnNvcmVkOiBmYWxzZSxcbiAgICAgICAgY2lyY2xlOiAnJyxcbiAgICAgICAgZXNjUGF0aDogSlNPTi5zdHJpbmdpZnkoc3RyUGF0aCksXG4gICAgICAgIGxlYWRpbmdCcmFja2V0OiBsZWFkaW5nQnJhY2tldFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb1xuICB9LCB7fSlcblxuICByZXR1cm4geyB3aWxkY2FyZHMsIHdjTGVuLCBzZWNyZXQgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCByeCA9IHJlcXVpcmUoJy4vcngnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGFjdG9yXG5cbmZ1bmN0aW9uIHJlZGFjdG9yICh7IHNlY3JldCwgc2VyaWFsaXplLCB3Y0xlbiwgc3RyaWN0LCBpc0NlbnNvckZjdCwgY2Vuc29yRmN0VGFrZXNQYXRoIH0sIHN0YXRlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICBjb25zdCByZWRhY3QgPSBGdW5jdGlvbignbycsIGBcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnIHx8IG8gPT0gbnVsbCkge1xuICAgICAgJHtzdHJpY3RJbXBsKHN0cmljdCwgc2VyaWFsaXplKX1cbiAgICB9XG4gICAgY29uc3QgeyBjZW5zb3IsIHNlY3JldCB9ID0gdGhpc1xuICAgIGNvbnN0IG9yaWdpbmFsU2VjcmV0ID0ge31cbiAgICBjb25zdCBzZWNyZXRLZXlzID0gT2JqZWN0LmtleXMoc2VjcmV0KVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VjcmV0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgb3JpZ2luYWxTZWNyZXRbc2VjcmV0S2V5c1tpXV0gPSBzZWNyZXRbc2VjcmV0S2V5c1tpXV1cbiAgICB9XG5cbiAgICAke3JlZGFjdFRtcGwoc2VjcmV0LCBpc0NlbnNvckZjdCwgY2Vuc29yRmN0VGFrZXNQYXRoKX1cbiAgICB0aGlzLmNvbXBpbGVSZXN0b3JlKClcbiAgICAke2R5bmFtaWNSZWRhY3RUbXBsKHdjTGVuID4gMCwgaXNDZW5zb3JGY3QsIGNlbnNvckZjdFRha2VzUGF0aCl9XG4gICAgdGhpcy5zZWNyZXQgPSBvcmlnaW5hbFNlY3JldFxuICAgICR7cmVzdWx0VG1wbChzZXJpYWxpemUpfVxuICBgKS5iaW5kKHN0YXRlKVxuXG4gIHJlZGFjdC5zdGF0ZSA9IHN0YXRlXG5cbiAgaWYgKHNlcmlhbGl6ZSA9PT0gZmFsc2UpIHtcbiAgICByZWRhY3QucmVzdG9yZSA9IChvKSA9PiBzdGF0ZS5yZXN0b3JlKG8pXG4gIH1cblxuICByZXR1cm4gcmVkYWN0XG59XG5cbmZ1bmN0aW9uIHJlZGFjdFRtcGwgKHNlY3JldCwgaXNDZW5zb3JGY3QsIGNlbnNvckZjdFRha2VzUGF0aCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc2VjcmV0KS5tYXAoKHBhdGgpID0+IHtcbiAgICBjb25zdCB7IGVzY1BhdGgsIGxlYWRpbmdCcmFja2V0LCBwYXRoOiBhcnJQYXRoIH0gPSBzZWNyZXRbcGF0aF1cbiAgICBjb25zdCBza2lwID0gbGVhZGluZ0JyYWNrZXQgPyAxIDogMFxuICAgIGNvbnN0IGRlbGltID0gbGVhZGluZ0JyYWNrZXQgPyAnJyA6ICcuJ1xuICAgIGNvbnN0IGhvcHMgPSBbXVxuICAgIHZhciBtYXRjaFxuICAgIHdoaWxlICgobWF0Y2ggPSByeC5leGVjKHBhdGgpKSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgWyAsIGl4IF0gPSBtYXRjaFxuICAgICAgY29uc3QgeyBpbmRleCwgaW5wdXQgfSA9IG1hdGNoXG4gICAgICBpZiAoaW5kZXggPiBza2lwKSBob3BzLnB1c2goaW5wdXQuc3Vic3RyaW5nKDAsIGluZGV4IC0gKGl4ID8gMCA6IDEpKSlcbiAgICB9XG4gICAgdmFyIGV4aXN0ZW5jZSA9IGhvcHMubWFwKChwKSA9PiBgbyR7ZGVsaW19JHtwfWApLmpvaW4oJyAmJiAnKVxuICAgIGlmIChleGlzdGVuY2UubGVuZ3RoID09PSAwKSBleGlzdGVuY2UgKz0gYG8ke2RlbGltfSR7cGF0aH0gIT0gbnVsbGBcbiAgICBlbHNlIGV4aXN0ZW5jZSArPSBgICYmIG8ke2RlbGltfSR7cGF0aH0gIT0gbnVsbGBcblxuICAgIGNvbnN0IGNpcmN1bGFyRGV0ZWN0aW9uID0gYFxuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICR7aG9wcy5yZXZlcnNlKCkubWFwKChwKSA9PiBgXG4gICAgICAgICAgY2FzZSBvJHtkZWxpbX0ke3B9ID09PSBjZW5zb3I6XG4gICAgICAgICAgICBzZWNyZXRbJHtlc2NQYXRofV0uY2lyY2xlID0gJHtKU09OLnN0cmluZ2lmeShwKX1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGApLmpvaW4oJ1xcbicpfVxuICAgICAgfVxuICAgIGBcblxuICAgIGNvbnN0IGNlbnNvckFyZ3MgPSBjZW5zb3JGY3RUYWtlc1BhdGhcbiAgICAgID8gYHZhbCwgJHtKU09OLnN0cmluZ2lmeShhcnJQYXRoKX1gXG4gICAgICA6IGB2YWxgXG5cbiAgICByZXR1cm4gYFxuICAgICAgaWYgKCR7ZXhpc3RlbmNlfSkge1xuICAgICAgICBjb25zdCB2YWwgPSBvJHtkZWxpbX0ke3BhdGh9XG4gICAgICAgIGlmICh2YWwgPT09IGNlbnNvcikge1xuICAgICAgICAgIHNlY3JldFske2VzY1BhdGh9XS5wcmVjZW5zb3JlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWNyZXRbJHtlc2NQYXRofV0udmFsID0gdmFsXG4gICAgICAgICAgbyR7ZGVsaW19JHtwYXRofSA9ICR7aXNDZW5zb3JGY3QgPyBgY2Vuc29yKCR7Y2Vuc29yQXJnc30pYCA6ICdjZW5zb3InfVxuICAgICAgICAgICR7Y2lyY3VsYXJEZXRlY3Rpb259XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgXG4gIH0pLmpvaW4oJ1xcbicpXG59XG5cbmZ1bmN0aW9uIGR5bmFtaWNSZWRhY3RUbXBsIChoYXNXaWxkY2FyZHMsIGlzQ2Vuc29yRmN0LCBjZW5zb3JGY3RUYWtlc1BhdGgpIHtcbiAgcmV0dXJuIGhhc1dpbGRjYXJkcyA9PT0gdHJ1ZSA/IGBcbiAgICB7XG4gICAgICBjb25zdCB7IHdpbGRjYXJkcywgd2NMZW4sIGdyb3VwUmVkYWN0LCBuZXN0ZWRSZWRhY3QgfSA9IHRoaXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2NMZW47IGkrKykge1xuICAgICAgICBjb25zdCB7IGJlZm9yZSwgYmVmb3JlU3RyLCBhZnRlciwgbmVzdGVkIH0gPSB3aWxkY2FyZHNbaV1cbiAgICAgICAgaWYgKG5lc3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNlY3JldFtiZWZvcmVTdHJdID0gc2VjcmV0W2JlZm9yZVN0cl0gfHwgW11cbiAgICAgICAgICBuZXN0ZWRSZWRhY3Qoc2VjcmV0W2JlZm9yZVN0cl0sIG8sIGJlZm9yZSwgYWZ0ZXIsIGNlbnNvciwgJHtpc0NlbnNvckZjdH0sICR7Y2Vuc29yRmN0VGFrZXNQYXRofSlcbiAgICAgICAgfSBlbHNlIHNlY3JldFtiZWZvcmVTdHJdID0gZ3JvdXBSZWRhY3QobywgYmVmb3JlLCBjZW5zb3IsICR7aXNDZW5zb3JGY3R9LCAke2NlbnNvckZjdFRha2VzUGF0aH0pXG4gICAgICB9XG4gICAgfVxuICBgIDogJydcbn1cblxuZnVuY3Rpb24gcmVzdWx0VG1wbCAoc2VyaWFsaXplKSB7XG4gIHJldHVybiBzZXJpYWxpemUgPT09IGZhbHNlID8gYHJldHVybiBvYCA6IGBcbiAgICB2YXIgcyA9IHRoaXMuc2VyaWFsaXplKG8pXG4gICAgdGhpcy5yZXN0b3JlKG8pXG4gICAgcmV0dXJuIHNcbiAgYFxufVxuXG5mdW5jdGlvbiBzdHJpY3RJbXBsIChzdHJpY3QsIHNlcmlhbGl6ZSkge1xuICByZXR1cm4gc3RyaWN0ID09PSB0cnVlXG4gICAgPyBgdGhyb3cgRXJyb3IoJ2Zhc3QtcmVkYWN0OiBwcmltaXRpdmVzIGNhbm5vdCBiZSByZWRhY3RlZCcpYFxuICAgIDogc2VyaWFsaXplID09PSBmYWxzZSA/IGByZXR1cm4gb2AgOiBgcmV0dXJuIHRoaXMuc2VyaWFsaXplKG8pYFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ3JvdXBSZWRhY3QsXG4gIGdyb3VwUmVzdG9yZSxcbiAgbmVzdGVkUmVkYWN0LFxuICBuZXN0ZWRSZXN0b3JlXG59XG5cbmZ1bmN0aW9uIGdyb3VwUmVzdG9yZSAoeyBrZXlzLCB2YWx1ZXMsIHRhcmdldCB9KSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCB8fCB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykgcmV0dXJuXG4gIGNvbnN0IGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrID0ga2V5c1tpXVxuICAgIHRhcmdldFtrXSA9IHZhbHVlc1tpXVxuICB9XG59XG5cbmZ1bmN0aW9uIGdyb3VwUmVkYWN0IChvLCBwYXRoLCBjZW5zb3IsIGlzQ2Vuc29yRmN0LCBjZW5zb3JGY3RUYWtlc1BhdGgpIHtcbiAgY29uc3QgdGFyZ2V0ID0gZ2V0KG8sIHBhdGgpXG4gIGlmICh0YXJnZXQgPT0gbnVsbCB8fCB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykgcmV0dXJuIHsga2V5czogbnVsbCwgdmFsdWVzOiBudWxsLCB0YXJnZXQsIGZsYXQ6IHRydWUgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KVxuICBjb25zdCBrZXlzTGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgY29uc3QgcGF0aExlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIGNvbnN0IHBhdGhXaXRoS2V5ID0gY2Vuc29yRmN0VGFrZXNQYXRoID8gWy4uLnBhdGhdIDogdW5kZWZpbmVkXG4gIGNvbnN0IHZhbHVlcyA9IG5ldyBBcnJheShrZXlzTGVuZ3RoKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0xlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIHZhbHVlc1tpXSA9IHRhcmdldFtrZXldXG5cbiAgICBpZiAoY2Vuc29yRmN0VGFrZXNQYXRoKSB7XG4gICAgICBwYXRoV2l0aEtleVtwYXRoTGVuZ3RoXSA9IGtleVxuICAgICAgdGFyZ2V0W2tleV0gPSBjZW5zb3IodGFyZ2V0W2tleV0sIHBhdGhXaXRoS2V5KVxuICAgIH0gZWxzZSBpZiAoaXNDZW5zb3JGY3QpIHtcbiAgICAgIHRhcmdldFtrZXldID0gY2Vuc29yKHRhcmdldFtrZXldKVxuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRba2V5XSA9IGNlbnNvclxuICAgIH1cbiAgfVxuICByZXR1cm4geyBrZXlzLCB2YWx1ZXMsIHRhcmdldCwgZmxhdDogdHJ1ZSB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZXN0b3JlSW5zdHJ1Y3Rpb25bXX0gaW5zdHJ1Y3Rpb25zIGEgc2V0IG9mIGluc3RydWN0aW9ucyBmb3IgcmVzdG9yaW5nIHZhbHVlcyB0byBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIG5lc3RlZFJlc3RvcmUgKGluc3RydWN0aW9ucykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHsgdGFyZ2V0LCBwYXRoLCB2YWx1ZSB9ID0gaW5zdHJ1Y3Rpb25zW2ldXG4gICAgbGV0IGN1cnJlbnQgPSB0YXJnZXRcbiAgICBmb3IgKGxldCBpID0gcGF0aC5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoW2ldXVxuICAgIH1cbiAgICBjdXJyZW50W3BhdGhbMF1dID0gdmFsdWVcbiAgfVxufVxuXG5mdW5jdGlvbiBuZXN0ZWRSZWRhY3QgKHN0b3JlLCBvLCBwYXRoLCBucywgY2Vuc29yLCBpc0NlbnNvckZjdCwgY2Vuc29yRmN0VGFrZXNQYXRoKSB7XG4gIGNvbnN0IHRhcmdldCA9IGdldChvLCBwYXRoKVxuICBpZiAodGFyZ2V0ID09IG51bGwpIHJldHVyblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KVxuICBjb25zdCBrZXlzTGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzTGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgc3BlY2lhbFNldChzdG9yZSwgdGFyZ2V0LCBrZXksIHBhdGgsIG5zLCBjZW5zb3IsIGlzQ2Vuc29yRmN0LCBjZW5zb3JGY3RUYWtlc1BhdGgpXG4gIH1cbiAgcmV0dXJuIHN0b3JlXG59XG5cbmZ1bmN0aW9uIGhhcyAob2JqLCBwcm9wKSB7XG4gIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGxcbiAgICA/ICgnaGFzT3duJyBpbiBPYmplY3QgPyBPYmplY3QuaGFzT3duKG9iaiwgcHJvcCkgOiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSlcbiAgICA6IGZhbHNlXG59XG5cbmZ1bmN0aW9uIHNwZWNpYWxTZXQgKHN0b3JlLCBvLCBrLCBwYXRoLCBhZnRlclBhdGgsIGNlbnNvciwgaXNDZW5zb3JGY3QsIGNlbnNvckZjdFRha2VzUGF0aCkge1xuICBjb25zdCBhZnRlclBhdGhMZW4gPSBhZnRlclBhdGgubGVuZ3RoXG4gIGNvbnN0IGxhc3RQYXRoSW5kZXggPSBhZnRlclBhdGhMZW4gLSAxXG4gIGNvbnN0IG9yaWdpbmFsS2V5ID0ga1xuICB2YXIgaSA9IC0xXG4gIHZhciBuXG4gIHZhciBudlxuICB2YXIgb3ZcbiAgdmFyIG9vdiA9IG51bGxcbiAgdmFyIHdjID0gbnVsbFxuICB2YXIga0lzV2NcbiAgdmFyIHdjb3ZcbiAgdmFyIGNvbnNlY3V0aXZlID0gZmFsc2VcbiAgdmFyIGxldmVsID0gMFxuICAvLyBuZWVkIHRvIHRyYWNrIGRlcHRoIG9mIHRoZSBgcmVkYWN0UGF0aGAgdHJlZVxuICB2YXIgZGVwdGggPSAwXG4gIHZhciByZWRhY3RQYXRoQ3VycmVudCA9IHRyZWUoKVxuICBvdiA9IG4gPSBvW2tdXG4gIGlmICh0eXBlb2YgbiAhPT0gJ29iamVjdCcpIHJldHVyblxuICB3aGlsZSAobiAhPSBudWxsICYmICsraSA8IGFmdGVyUGF0aExlbikge1xuICAgIGRlcHRoICs9IDFcbiAgICBrID0gYWZ0ZXJQYXRoW2ldXG4gICAgb292ID0gb3ZcbiAgICBpZiAoayAhPT0gJyonICYmICF3YyAmJiAhKHR5cGVvZiBuID09PSAnb2JqZWN0JyAmJiBrIGluIG4pKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoayA9PT0gJyonKSB7XG4gICAgICBpZiAod2MgPT09ICcqJykge1xuICAgICAgICBjb25zZWN1dGl2ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIHdjID0ga1xuICAgICAgaWYgKGkgIT09IGxhc3RQYXRoSW5kZXgpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHdjKSB7XG4gICAgICBjb25zdCB3Y0tleXMgPSBPYmplY3Qua2V5cyhuKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3Y0tleXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3Qgd2NrID0gd2NLZXlzW2pdXG4gICAgICAgIHdjb3YgPSBuW3dja11cbiAgICAgICAga0lzV2MgPSBrID09PSAnKidcbiAgICAgICAgaWYgKGNvbnNlY3V0aXZlKSB7XG4gICAgICAgICAgcmVkYWN0UGF0aEN1cnJlbnQgPSBub2RlKHJlZGFjdFBhdGhDdXJyZW50LCB3Y2ssIGRlcHRoKVxuICAgICAgICAgIGxldmVsID0gaVxuICAgICAgICAgIG92ID0gaXRlcmF0ZU50aExldmVsKHdjb3YsIGxldmVsIC0gMSwgaywgcGF0aCwgYWZ0ZXJQYXRoLCBjZW5zb3IsIGlzQ2Vuc29yRmN0LCBjZW5zb3JGY3RUYWtlc1BhdGgsIG9yaWdpbmFsS2V5LCBuLCBudiwgb3YsIGtJc1djLCB3Y2ssIGksIGxhc3RQYXRoSW5kZXgsIHJlZGFjdFBhdGhDdXJyZW50LCBzdG9yZSwgb1tvcmlnaW5hbEtleV0sIGRlcHRoICsgMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoa0lzV2MgfHwgKHR5cGVvZiB3Y292ID09PSAnb2JqZWN0JyAmJiB3Y292ICE9PSBudWxsICYmIGsgaW4gd2NvdikpIHtcbiAgICAgICAgICAgIGlmIChrSXNXYykge1xuICAgICAgICAgICAgICBvdiA9IHdjb3ZcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG92ID0gd2NvdltrXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbnYgPSAoaSAhPT0gbGFzdFBhdGhJbmRleClcbiAgICAgICAgICAgICAgPyBvdlxuICAgICAgICAgICAgICA6IChpc0NlbnNvckZjdFxuICAgICAgICAgICAgICAgID8gKGNlbnNvckZjdFRha2VzUGF0aCA/IGNlbnNvcihvdiwgWy4uLnBhdGgsIG9yaWdpbmFsS2V5LCAuLi5hZnRlclBhdGhdKSA6IGNlbnNvcihvdikpXG4gICAgICAgICAgICAgICAgOiBjZW5zb3IpXG4gICAgICAgICAgICBpZiAoa0lzV2MpIHtcbiAgICAgICAgICAgICAgY29uc3QgcnYgPSByZXN0b3JlSW5zdHIobm9kZShyZWRhY3RQYXRoQ3VycmVudCwgd2NrLCBkZXB0aCksIG92LCBvW29yaWdpbmFsS2V5XSlcbiAgICAgICAgICAgICAgc3RvcmUucHVzaChydilcbiAgICAgICAgICAgICAgblt3Y2tdID0gbnZcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh3Y292W2tdID09PSBudikge1xuICAgICAgICAgICAgICAgIC8vIHBhc3NcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgobnYgPT09IHVuZGVmaW5lZCAmJiBjZW5zb3IgIT09IHVuZGVmaW5lZCkgfHwgKGhhcyh3Y292LCBrKSAmJiBudiA9PT0gb3YpKSB7XG4gICAgICAgICAgICAgICAgcmVkYWN0UGF0aEN1cnJlbnQgPSBub2RlKHJlZGFjdFBhdGhDdXJyZW50LCB3Y2ssIGRlcHRoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlZGFjdFBhdGhDdXJyZW50ID0gbm9kZShyZWRhY3RQYXRoQ3VycmVudCwgd2NrLCBkZXB0aClcbiAgICAgICAgICAgICAgICBjb25zdCBydiA9IHJlc3RvcmVJbnN0cihub2RlKHJlZGFjdFBhdGhDdXJyZW50LCBrLCBkZXB0aCArIDEpLCBvdiwgb1tvcmlnaW5hbEtleV0pXG4gICAgICAgICAgICAgICAgc3RvcmUucHVzaChydilcbiAgICAgICAgICAgICAgICB3Y292W2tdID0gbnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2MgPSBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIG92ID0gbltrXVxuICAgICAgcmVkYWN0UGF0aEN1cnJlbnQgPSBub2RlKHJlZGFjdFBhdGhDdXJyZW50LCBrLCBkZXB0aClcbiAgICAgIG52ID0gKGkgIT09IGxhc3RQYXRoSW5kZXgpXG4gICAgICAgID8gb3ZcbiAgICAgICAgOiAoaXNDZW5zb3JGY3RcbiAgICAgICAgICA/IChjZW5zb3JGY3RUYWtlc1BhdGggPyBjZW5zb3Iob3YsIFsuLi5wYXRoLCBvcmlnaW5hbEtleSwgLi4uYWZ0ZXJQYXRoXSkgOiBjZW5zb3Iob3YpKVxuICAgICAgICAgIDogY2Vuc29yKVxuICAgICAgaWYgKChoYXMobiwgaykgJiYgbnYgPT09IG92KSB8fCAobnYgPT09IHVuZGVmaW5lZCAmJiBjZW5zb3IgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgLy8gcGFzc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcnYgPSByZXN0b3JlSW5zdHIocmVkYWN0UGF0aEN1cnJlbnQsIG92LCBvW29yaWdpbmFsS2V5XSlcbiAgICAgICAgc3RvcmUucHVzaChydilcbiAgICAgICAgbltrXSA9IG52XG4gICAgICB9XG4gICAgICBuID0gbltrXVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG4gIT09ICdvYmplY3QnKSBicmVha1xuICAgIC8vIHByZXZlbnQgY2lyY3VsYXIgc3RydWN0dXJlLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bpbm9qcy9waW5vL2lzc3Vlcy8xNTEzXG4gICAgaWYgKG92ID09PSBvb3YgfHwgdHlwZW9mIG92ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gcGFzc1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXQgKG8sIHApIHtcbiAgdmFyIGkgPSAtMVxuICB2YXIgbCA9IHAubGVuZ3RoXG4gIHZhciBuID0gb1xuICB3aGlsZSAobiAhPSBudWxsICYmICsraSA8IGwpIHtcbiAgICBuID0gbltwW2ldXVxuICB9XG4gIHJldHVybiBuXG59XG5cbmZ1bmN0aW9uIGl0ZXJhdGVOdGhMZXZlbCAod2NvdiwgbGV2ZWwsIGssIHBhdGgsIGFmdGVyUGF0aCwgY2Vuc29yLCBpc0NlbnNvckZjdCwgY2Vuc29yRmN0VGFrZXNQYXRoLCBvcmlnaW5hbEtleSwgbiwgbnYsIG92LCBrSXNXYywgd2NrLCBpLCBsYXN0UGF0aEluZGV4LCByZWRhY3RQYXRoQ3VycmVudCwgc3RvcmUsIHBhcmVudCwgZGVwdGgpIHtcbiAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgaWYgKGtJc1djIHx8ICh0eXBlb2Ygd2NvdiA9PT0gJ29iamVjdCcgJiYgd2NvdiAhPT0gbnVsbCAmJiBrIGluIHdjb3YpKSB7XG4gICAgICBpZiAoa0lzV2MpIHtcbiAgICAgICAgb3YgPSB3Y292XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdiA9IHdjb3Zba11cbiAgICAgIH1cbiAgICAgIG52ID0gKGkgIT09IGxhc3RQYXRoSW5kZXgpXG4gICAgICAgID8gb3ZcbiAgICAgICAgOiAoaXNDZW5zb3JGY3RcbiAgICAgICAgICA/IChjZW5zb3JGY3RUYWtlc1BhdGggPyBjZW5zb3Iob3YsIFsuLi5wYXRoLCBvcmlnaW5hbEtleSwgLi4uYWZ0ZXJQYXRoXSkgOiBjZW5zb3Iob3YpKVxuICAgICAgICAgIDogY2Vuc29yKVxuICAgICAgaWYgKGtJc1djKSB7XG4gICAgICAgIGNvbnN0IHJ2ID0gcmVzdG9yZUluc3RyKHJlZGFjdFBhdGhDdXJyZW50LCBvdiwgcGFyZW50KVxuICAgICAgICBzdG9yZS5wdXNoKHJ2KVxuICAgICAgICBuW3dja10gPSBudlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHdjb3Zba10gPT09IG52KSB7XG4gICAgICAgICAgLy8gcGFzc1xuICAgICAgICB9IGVsc2UgaWYgKChudiA9PT0gdW5kZWZpbmVkICYmIGNlbnNvciAhPT0gdW5kZWZpbmVkKSB8fCAoaGFzKHdjb3YsIGspICYmIG52ID09PSBvdikpIHtcbiAgICAgICAgICAvLyBwYXNzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcnYgPSByZXN0b3JlSW5zdHIobm9kZShyZWRhY3RQYXRoQ3VycmVudCwgaywgZGVwdGggKyAxKSwgb3YsIHBhcmVudClcbiAgICAgICAgICBzdG9yZS5wdXNoKHJ2KVxuICAgICAgICAgIHdjb3Zba10gPSBudlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIHdjb3YpIHtcbiAgICBpZiAodHlwZW9mIHdjb3Zba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlZGFjdFBhdGhDdXJyZW50ID0gbm9kZShyZWRhY3RQYXRoQ3VycmVudCwga2V5LCBkZXB0aClcbiAgICAgIGl0ZXJhdGVOdGhMZXZlbCh3Y292W2tleV0sIGxldmVsIC0gMSwgaywgcGF0aCwgYWZ0ZXJQYXRoLCBjZW5zb3IsIGlzQ2Vuc29yRmN0LCBjZW5zb3JGY3RUYWtlc1BhdGgsIG9yaWdpbmFsS2V5LCBuLCBudiwgb3YsIGtJc1djLCB3Y2ssIGksIGxhc3RQYXRoSW5kZXgsIHJlZGFjdFBhdGhDdXJyZW50LCBzdG9yZSwgcGFyZW50LCBkZXB0aCArIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gVHJlZU5vZGVcbiAqIEBwcm9wIHtUcmVlTm9kZX0gW3BhcmVudF0gcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgb2YgdGhpcyBub2RlIGluIHRoZSB0cmVlLCBvciBgbnVsbGAgaWYgdGhlcmUgaXMgbm8gcGFyZW50XG4gKiBAcHJvcCB7c3RyaW5nfSBrZXkgdGhlIGtleSB0aGF0IHRoaXMgbm9kZSByZXByZXNlbnRzIChrZXkgaGVyZSBiZWluZyBwYXJ0IG9mIHRoZSBwYXRoIGJlaW5nIHJlZGFjdGVkXG4gKiBAcHJvcCB7VHJlZU5vZGVbXX0gY2hpbGRyZW4gdGhlIGNoaWxkIG5vZGVzIG9mIHRoaXMgbm9kZVxuICogQHByb3Age251bWJlcn0gZGVwdGggdGhlIGRlcHRoIG9mIHRoaXMgbm9kZSBpbiB0aGUgdHJlZVxuICovXG5cbi8qKlxuICogaW5zdGFudGlhdGUgYSBuZXcsIGVtcHR5IHRyZWVcbiAqIEByZXR1cm5zIHtUcmVlTm9kZX1cbiAqL1xuZnVuY3Rpb24gdHJlZSAoKSB7XG4gIHJldHVybiB7IHBhcmVudDogbnVsbCwga2V5OiBudWxsLCBjaGlsZHJlbjogW10sIGRlcHRoOiAwIH1cbn1cblxuLyoqXG4gKiBjcmVhdGVzIGEgbmV3IG5vZGUgaW4gdGhlIHRyZWUsIGF0dGFjaGluZyBpdCBhcyBhIGNoaWxkIG9mIHRoZSBwcm92aWRlZCBwYXJlbnQgbm9kZVxuICogaWYgdGhlIHNwZWNpZmllZCBkZXB0aCBtYXRjaGVzIHRoZSBwYXJlbnQgZGVwdGgsIGFkZHMgdGhlIG5ldyBub2RlIGFzIGEgX3NpYmxpbmdfIG9mIHRoZSBwYXJlbnQgaW5zdGVhZFxuICAqIEBwYXJhbSB7VHJlZU5vZGV9IHBhcmVudCB0aGUgcGFyZW50IG5vZGUgdG8gYWRkIGEgbmV3IG5vZGUgdG8gKGlmIHRoZSBwYXJlbnQgZGVwdGggbWF0Y2hlcyB0aGUgcHJvdmlkZWQgYGRlcHRoYCB2YWx1ZSwgd2lsbCBpbnN0ZWFkIGFkZCBhcyBhIHNpYmxpbmcgb2YgdGhpc1xuICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdGhlIGtleSB0aGF0IHRoZSBuZXcgbm9kZSByZXByZXNlbnRzIChrZXkgaGVyZSBiZWluZyBwYXJ0IG9mIHRoZSBwYXRoIGJlaW5nIHJlZGFjdGVkKVxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCB0aGUgZGVwdGggb2YgdGhlIG5ldyBub2RlIGluIHRoZSB0cmVlIC0gdXNlZCB0byBkZXRlcm1pbmcgd2hldGhlciB0byBhZGQgdGhlIG5ldyBub2RlIGFzIGEgY2hpbGQgb3Igc2libGluZyBvZiB0aGUgcHJvdmlkZWQgYHBhcmVudGAgbm9kZVxuICAqIEByZXR1cm5zIHtUcmVlTm9kZX0gYSByZWZlcmVuY2UgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgbm9kZSBpbiB0aGUgdHJlZVxuICovXG5mdW5jdGlvbiBub2RlIChwYXJlbnQsIGtleSwgZGVwdGgpIHtcbiAgaWYgKHBhcmVudC5kZXB0aCA9PT0gZGVwdGgpIHtcbiAgICByZXR1cm4gbm9kZShwYXJlbnQucGFyZW50LCBrZXksIGRlcHRoKVxuICB9XG5cbiAgdmFyIGNoaWxkID0ge1xuICAgIHBhcmVudCxcbiAgICBrZXksXG4gICAgZGVwdGgsXG4gICAgY2hpbGRyZW46IFtdXG4gIH1cblxuICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZClcblxuICByZXR1cm4gY2hpbGRcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBSZXN0b3JlSW5zdHJ1Y3Rpb25cbiAqIEBwcm9wIHtzdHJpbmdbXX0gcGF0aCBhIHJldmVyc2Utb3JkZXIgcGF0aCB0aGF0IGNhbiBiZSB1c2VkIHRvIGZpbmQgdGhlIGNvcnJlY3QgaW5zZXJ0aW9uIHBvaW50IHRvIHJlc3RvcmUgYSBgdmFsdWVgIGZvciB0aGUgZ2l2ZW4gYHBhcmVudGAgb2JqZWN0XG4gKiBAcHJvcCB7Kn0gdmFsdWUgdGhlIHZhbHVlIHRvIHJlc3RvcmVcbiAqIEBwcm9wIHtvYmplY3R9IHRhcmdldCB0aGUgb2JqZWN0IHRvIHJlc3RvcmUgdGhlIGB2YWx1ZWAgaW5cbiAqL1xuXG4vKipcbiAqIGNyZWF0ZSBhIHJlc3RvcmUgaW5zdHJ1Y3Rpb24gZm9yIHRoZSBnaXZlbiByZWRhY3RQYXRoIG5vZGVcbiAqIGdlbmVyYXRlcyBhIHBhdGggaW4gcmV2ZXJzZSBvcmRlciBieSB3YWxraW5nIHVwIHRoZSByZWRhY3RQYXRoIHRyZWVcbiAqIEBwYXJhbSB7VHJlZU5vZGV9IG5vZGUgYSB0cmVlIG5vZGUgdGhhdCBzaG91bGQgYmUgYXQgdGhlIGJvdHRvbSBvZiB0aGUgcmVkYWN0IHBhdGggKGkuZS4gaGF2ZSBubyBjaGlsZHJlbikgLSB0aGlzIHdpbGwgYmUgdXNlZCB0byB3YWxrIHVwIHRoZSByZWRhY3QgcGF0aCB0cmVlIHRvIGNvbnN0cnVjdCB0aGUgcGF0aCBuZWVkZWQgdG8gcmVzdG9yZVxuICogQHBhcmFtIHsqfSB2YWx1ZSB0aGUgdmFsdWUgdG8gcmVzdG9yZVxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IG9iamVjdCB0byBhcHBseSB0aGUgcmVzdG9yZSBpbnN0cnVjdGlvbiB0b1xuICogQHJldHVybnMge1Jlc3RvcmVJbnN0cnVjdGlvbn0gYW4gaW5zdHJ1Y3Rpb24gdXNlZCB0byByZXN0b3JlIGEgbmVzdGVkIHZhbHVlIGZvciBhIHNwZWNpZmljIG9iamVjdFxuICovXG5mdW5jdGlvbiByZXN0b3JlSW5zdHIgKG5vZGUsIHZhbHVlLCB0YXJnZXQpIHtcbiAgbGV0IGN1cnJlbnQgPSBub2RlXG4gIGNvbnN0IHBhdGggPSBbXVxuICBkbyB7XG4gICAgcGF0aC5wdXNoKGN1cnJlbnQua2V5KVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudFxuICB9IHdoaWxlIChjdXJyZW50LnBhcmVudCAhPSBudWxsKVxuXG4gIHJldHVybiB7IHBhdGgsIHZhbHVlLCB0YXJnZXQgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IGdyb3VwUmVzdG9yZSwgbmVzdGVkUmVzdG9yZSB9ID0gcmVxdWlyZSgnLi9tb2RpZmllcnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RvcmVyXG5cbmZ1bmN0aW9uIHJlc3RvcmVyICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXBpbGVSZXN0b3JlICgpIHtcbiAgICBpZiAodGhpcy5yZXN0b3JlKSB7XG4gICAgICB0aGlzLnJlc3RvcmUuc3RhdGUuc2VjcmV0ID0gdGhpcy5zZWNyZXRcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IHNlY3JldCwgd2NMZW4gfSA9IHRoaXNcbiAgICBjb25zdCBwYXRocyA9IE9iamVjdC5rZXlzKHNlY3JldClcbiAgICBjb25zdCByZXNldHRlcnMgPSByZXNldFRtcGwoc2VjcmV0LCBwYXRocylcbiAgICBjb25zdCBoYXNXaWxkY2FyZHMgPSB3Y0xlbiA+IDBcbiAgICBjb25zdCBzdGF0ZSA9IGhhc1dpbGRjYXJkcyA/IHsgc2VjcmV0LCBncm91cFJlc3RvcmUsIG5lc3RlZFJlc3RvcmUgfSA6IHsgc2VjcmV0IH1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICB0aGlzLnJlc3RvcmUgPSBGdW5jdGlvbihcbiAgICAgICdvJyxcbiAgICAgIHJlc3RvcmVUbXBsKHJlc2V0dGVycywgcGF0aHMsIGhhc1dpbGRjYXJkcylcbiAgICApLmJpbmQoc3RhdGUpXG4gICAgdGhpcy5yZXN0b3JlLnN0YXRlID0gc3RhdGVcbiAgfVxufVxuXG4vKipcbiAqIE11dGF0ZXMgdGhlIG9yaWdpbmFsIG9iamVjdCB0byBiZSBjZW5zb3JlZCBieSByZXN0b3JpbmcgaXRzIG9yaWdpbmFsIHZhbHVlc1xuICogcHJpb3IgdG8gY2Vuc29yaW5nLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzZWNyZXQgQ29tcGlsZWQgb2JqZWN0IGRlc2NyaWJpbmcgd2hpY2ggdGFyZ2V0IGZpZWxkcyBzaG91bGRcbiAqIGJlIGNlbnNvcmVkIGFuZCB0aGUgZmllbGQgc3RhdGVzLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aHMgVGhlIGxpc3Qgb2YgcGF0aHMgdG8gY2Vuc29yIGFzIHByb3ZpZGVkIGF0XG4gKiBpbml0aWFsaXphdGlvbiB0aW1lLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyBvZiBKYXZhU2NyaXB0IHRvIGJlIHVzZWQgYnkgYEZ1bmN0aW9uKClgLiBUaGVcbiAqIHN0cmluZyBjb21waWxlcyB0byB0aGUgZnVuY3Rpb24gdGhhdCBkb2VzIHRoZSB3b3JrIGluIHRoZSBkZXNjcmlwdGlvbi5cbiAqL1xuZnVuY3Rpb24gcmVzZXRUbXBsIChzZWNyZXQsIHBhdGhzKSB7XG4gIHJldHVybiBwYXRocy5tYXAoKHBhdGgpID0+IHtcbiAgICBjb25zdCB7IGNpcmNsZSwgZXNjUGF0aCwgbGVhZGluZ0JyYWNrZXQgfSA9IHNlY3JldFtwYXRoXVxuICAgIGNvbnN0IGRlbGltID0gbGVhZGluZ0JyYWNrZXQgPyAnJyA6ICcuJ1xuICAgIGNvbnN0IHJlc2V0ID0gY2lyY2xlXG4gICAgICA/IGBvLiR7Y2lyY2xlfSA9IHNlY3JldFske2VzY1BhdGh9XS52YWxgXG4gICAgICA6IGBvJHtkZWxpbX0ke3BhdGh9ID0gc2VjcmV0WyR7ZXNjUGF0aH1dLnZhbGBcbiAgICBjb25zdCBjbGVhciA9IGBzZWNyZXRbJHtlc2NQYXRofV0udmFsID0gdW5kZWZpbmVkYFxuICAgIHJldHVybiBgXG4gICAgICBpZiAoc2VjcmV0WyR7ZXNjUGF0aH1dLnZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyeSB7ICR7cmVzZXR9IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICR7Y2xlYXJ9XG4gICAgICB9XG4gICAgYFxuICB9KS5qb2luKCcnKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGJvZHkgb2YgdGhlIHJlc3RvcmUgZnVuY3Rpb25cbiAqXG4gKiBSZXN0b3JhdGlvbiBvZiB0aGUgcmVkYWN0ZWQgb2JqZWN0IGhhcHBlbnNcbiAqIGJhY2t3YXJkcywgaW4gcmV2ZXJzZSBvcmRlciBvZiByZWRhY3Rpb25zLFxuICogc28gdGhhdCByZXBlYXRlZCByZWRhY3Rpb25zIG9uIHRoZSBzYW1lIG9iamVjdFxuICogcHJvcGVydHkgY2FuIGJlIGV2ZW50dWFsbHkgcm9sbGVkIGJhY2sgdG8gdGhlXG4gKiBvcmlnaW5hbCB2YWx1ZS5cbiAqXG4gKiBUaGlzIHdheSBkeW5hbWljIHJlZGFjdGlvbnMgYXJlIHJlc3RvcmVkIGZpcnN0LFxuICogc3RhcnRpbmcgZnJvbSB0aGUgbGFzdCBvbmUgd29ya2luZyBiYWNrd2FyZHMgYW5kXG4gKiBmb2xsb3dlZCBieSB0aGUgc3RhdGljIG9uZXMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGJvZHkgb2YgdGhlIHJlc3RvcmUgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmVzdG9yZVRtcGwgKHJlc2V0dGVycywgcGF0aHMsIGhhc1dpbGRjYXJkcykge1xuICBjb25zdCBkeW5hbWljUmVzZXQgPSBoYXNXaWxkY2FyZHMgPT09IHRydWUgPyBgXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlY3JldClcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSBsZW4gLSAxOyBpID49ICR7cGF0aHMubGVuZ3RofTsgaS0tKSB7XG4gICAgICBjb25zdCBrID0ga2V5c1tpXVxuICAgICAgY29uc3QgbyA9IHNlY3JldFtrXVxuICAgICAgaWYgKG8pIHtcbiAgICAgICAgaWYgKG8uZmxhdCA9PT0gdHJ1ZSkgdGhpcy5ncm91cFJlc3RvcmUobylcbiAgICAgICAgZWxzZSB0aGlzLm5lc3RlZFJlc3RvcmUobylcbiAgICAgICAgc2VjcmV0W2tdID0gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgYCA6ICcnXG5cbiAgcmV0dXJuIGBcbiAgICBjb25zdCBzZWNyZXQgPSB0aGlzLnNlY3JldFxuICAgICR7ZHluYW1pY1Jlc2V0fVxuICAgICR7cmVzZXR0ZXJzfVxuICAgIHJldHVybiBvXG4gIGBcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZVxuXG5mdW5jdGlvbiBzdGF0ZSAobykge1xuICBjb25zdCB7XG4gICAgc2VjcmV0LFxuICAgIGNlbnNvcixcbiAgICBjb21waWxlUmVzdG9yZSxcbiAgICBzZXJpYWxpemUsXG4gICAgZ3JvdXBSZWRhY3QsXG4gICAgbmVzdGVkUmVkYWN0LFxuICAgIHdpbGRjYXJkcyxcbiAgICB3Y0xlblxuICB9ID0gb1xuICBjb25zdCBidWlsZGVyID0gW3sgc2VjcmV0LCBjZW5zb3IsIGNvbXBpbGVSZXN0b3JlIH1dXG4gIGlmIChzZXJpYWxpemUgIT09IGZhbHNlKSBidWlsZGVyLnB1c2goeyBzZXJpYWxpemUgfSlcbiAgaWYgKHdjTGVuID4gMCkgYnVpbGRlci5wdXNoKHsgZ3JvdXBSZWRhY3QsIG5lc3RlZFJlZGFjdCwgd2lsZGNhcmRzLCB3Y0xlbiB9KVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbiguLi5idWlsZGVyKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB2YWxpZGF0b3IgPSByZXF1aXJlKCcuL2xpYi92YWxpZGF0b3InKVxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2xpYi9wYXJzZScpXG5jb25zdCByZWRhY3RvciA9IHJlcXVpcmUoJy4vbGliL3JlZGFjdG9yJylcbmNvbnN0IHJlc3RvcmVyID0gcmVxdWlyZSgnLi9saWIvcmVzdG9yZXInKVxuY29uc3QgeyBncm91cFJlZGFjdCwgbmVzdGVkUmVkYWN0IH0gPSByZXF1aXJlKCcuL2xpYi9tb2RpZmllcnMnKVxuY29uc3Qgc3RhdGUgPSByZXF1aXJlKCcuL2xpYi9zdGF0ZScpXG5jb25zdCByeCA9IHJlcXVpcmUoJy4vbGliL3J4JylcbmNvbnN0IHZhbGlkYXRlID0gdmFsaWRhdG9yKClcbmNvbnN0IG5vb3AgPSAobykgPT4gb1xubm9vcC5yZXN0b3JlID0gbm9vcFxuXG5jb25zdCBERUZBVUxUX0NFTlNPUiA9ICdbUkVEQUNURURdJ1xuZmFzdFJlZGFjdC5yeCA9IHJ4XG5mYXN0UmVkYWN0LnZhbGlkYXRvciA9IHZhbGlkYXRvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZhc3RSZWRhY3RcblxuZnVuY3Rpb24gZmFzdFJlZGFjdCAob3B0cyA9IHt9KSB7XG4gIGNvbnN0IHBhdGhzID0gQXJyYXkuZnJvbShuZXcgU2V0KG9wdHMucGF0aHMgfHwgW10pKVxuICBjb25zdCBzZXJpYWxpemUgPSAnc2VyaWFsaXplJyBpbiBvcHRzID8gKFxuICAgIG9wdHMuc2VyaWFsaXplID09PSBmYWxzZSA/IG9wdHMuc2VyaWFsaXplXG4gICAgICA6ICh0eXBlb2Ygb3B0cy5zZXJpYWxpemUgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNlcmlhbGl6ZSA6IEpTT04uc3RyaW5naWZ5KVxuICApIDogSlNPTi5zdHJpbmdpZnlcbiAgY29uc3QgcmVtb3ZlID0gb3B0cy5yZW1vdmVcbiAgaWYgKHJlbW92ZSA9PT0gdHJ1ZSAmJiBzZXJpYWxpemUgIT09IEpTT04uc3RyaW5naWZ5KSB7XG4gICAgdGhyb3cgRXJyb3IoJ2Zhc3QtcmVkYWN0IFx1MjAxMyByZW1vdmUgb3B0aW9uIG1heSBvbmx5IGJlIHNldCB3aGVuIHNlcmlhbGl6ZXIgaXMgSlNPTi5zdHJpbmdpZnknKVxuICB9XG4gIGNvbnN0IGNlbnNvciA9IHJlbW92ZSA9PT0gdHJ1ZVxuICAgID8gdW5kZWZpbmVkXG4gICAgOiAnY2Vuc29yJyBpbiBvcHRzID8gb3B0cy5jZW5zb3IgOiBERUZBVUxUX0NFTlNPUlxuXG4gIGNvbnN0IGlzQ2Vuc29yRmN0ID0gdHlwZW9mIGNlbnNvciA9PT0gJ2Z1bmN0aW9uJ1xuICBjb25zdCBjZW5zb3JGY3RUYWtlc1BhdGggPSBpc0NlbnNvckZjdCAmJiBjZW5zb3IubGVuZ3RoID4gMVxuXG4gIGlmIChwYXRocy5sZW5ndGggPT09IDApIHJldHVybiBzZXJpYWxpemUgfHwgbm9vcFxuXG4gIHZhbGlkYXRlKHsgcGF0aHMsIHNlcmlhbGl6ZSwgY2Vuc29yIH0pXG5cbiAgY29uc3QgeyB3aWxkY2FyZHMsIHdjTGVuLCBzZWNyZXQgfSA9IHBhcnNlKHsgcGF0aHMsIGNlbnNvciB9KVxuXG4gIGNvbnN0IGNvbXBpbGVSZXN0b3JlID0gcmVzdG9yZXIoKVxuICBjb25zdCBzdHJpY3QgPSAnc3RyaWN0JyBpbiBvcHRzID8gb3B0cy5zdHJpY3QgOiB0cnVlXG5cbiAgcmV0dXJuIHJlZGFjdG9yKHsgc2VjcmV0LCB3Y0xlbiwgc2VyaWFsaXplLCBzdHJpY3QsIGlzQ2Vuc29yRmN0LCBjZW5zb3JGY3RUYWtlc1BhdGggfSwgc3RhdGUoe1xuICAgIHNlY3JldCxcbiAgICBjZW5zb3IsXG4gICAgY29tcGlsZVJlc3RvcmUsXG4gICAgc2VyaWFsaXplLFxuICAgIGdyb3VwUmVkYWN0LFxuICAgIG5lc3RlZFJlZGFjdCxcbiAgICB3aWxkY2FyZHMsXG4gICAgd2NMZW5cbiAgfSkpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHNldExldmVsU3ltID0gU3ltYm9sKCdwaW5vLnNldExldmVsJylcbmNvbnN0IGdldExldmVsU3ltID0gU3ltYm9sKCdwaW5vLmdldExldmVsJylcbmNvbnN0IGxldmVsVmFsU3ltID0gU3ltYm9sKCdwaW5vLmxldmVsVmFsJylcbmNvbnN0IGxldmVsQ29tcFN5bSA9IFN5bWJvbCgncGluby5sZXZlbENvbXAnKVxuY29uc3QgdXNlTGV2ZWxMYWJlbHNTeW0gPSBTeW1ib2woJ3Bpbm8udXNlTGV2ZWxMYWJlbHMnKVxuY29uc3QgdXNlT25seUN1c3RvbUxldmVsc1N5bSA9IFN5bWJvbCgncGluby51c2VPbmx5Q3VzdG9tTGV2ZWxzJylcbmNvbnN0IG1peGluU3ltID0gU3ltYm9sKCdwaW5vLm1peGluJylcblxuY29uc3QgbHNDYWNoZVN5bSA9IFN5bWJvbCgncGluby5sc0NhY2hlJylcbmNvbnN0IGNoaW5kaW5nc1N5bSA9IFN5bWJvbCgncGluby5jaGluZGluZ3MnKVxuXG5jb25zdCBhc0pzb25TeW0gPSBTeW1ib2woJ3Bpbm8uYXNKc29uJylcbmNvbnN0IHdyaXRlU3ltID0gU3ltYm9sKCdwaW5vLndyaXRlJylcbmNvbnN0IHJlZGFjdEZtdFN5bSA9IFN5bWJvbCgncGluby5yZWRhY3RGbXQnKVxuXG5jb25zdCB0aW1lU3ltID0gU3ltYm9sKCdwaW5vLnRpbWUnKVxuY29uc3QgdGltZVNsaWNlSW5kZXhTeW0gPSBTeW1ib2woJ3Bpbm8udGltZVNsaWNlSW5kZXgnKVxuY29uc3Qgc3RyZWFtU3ltID0gU3ltYm9sKCdwaW5vLnN0cmVhbScpXG5jb25zdCBzdHJpbmdpZnlTeW0gPSBTeW1ib2woJ3Bpbm8uc3RyaW5naWZ5JylcbmNvbnN0IHN0cmluZ2lmeVNhZmVTeW0gPSBTeW1ib2woJ3Bpbm8uc3RyaW5naWZ5U2FmZScpXG5jb25zdCBzdHJpbmdpZmllcnNTeW0gPSBTeW1ib2woJ3Bpbm8uc3RyaW5naWZpZXJzJylcbmNvbnN0IGVuZFN5bSA9IFN5bWJvbCgncGluby5lbmQnKVxuY29uc3QgZm9ybWF0T3B0c1N5bSA9IFN5bWJvbCgncGluby5mb3JtYXRPcHRzJylcbmNvbnN0IG1lc3NhZ2VLZXlTeW0gPSBTeW1ib2woJ3Bpbm8ubWVzc2FnZUtleScpXG5jb25zdCBlcnJvcktleVN5bSA9IFN5bWJvbCgncGluby5lcnJvcktleScpXG5jb25zdCBuZXN0ZWRLZXlTeW0gPSBTeW1ib2woJ3Bpbm8ubmVzdGVkS2V5JylcbmNvbnN0IG5lc3RlZEtleVN0clN5bSA9IFN5bWJvbCgncGluby5uZXN0ZWRLZXlTdHInKVxuY29uc3QgbWl4aW5NZXJnZVN0cmF0ZWd5U3ltID0gU3ltYm9sKCdwaW5vLm1peGluTWVyZ2VTdHJhdGVneScpXG5jb25zdCBtc2dQcmVmaXhTeW0gPSBTeW1ib2woJ3Bpbm8ubXNnUHJlZml4JylcblxuY29uc3Qgd2lsZGNhcmRGaXJzdFN5bSA9IFN5bWJvbCgncGluby53aWxkY2FyZEZpcnN0JylcblxuLy8gcHVibGljIHN5bWJvbHMsIG5vIG5lZWQgdG8gdXNlIHRoZSBzYW1lIHBpbm9cbi8vIHZlcnNpb24gZm9yIHRoZXNlXG5jb25zdCBzZXJpYWxpemVyc1N5bSA9IFN5bWJvbC5mb3IoJ3Bpbm8uc2VyaWFsaXplcnMnKVxuY29uc3QgZm9ybWF0dGVyc1N5bSA9IFN5bWJvbC5mb3IoJ3Bpbm8uZm9ybWF0dGVycycpXG5jb25zdCBob29rc1N5bSA9IFN5bWJvbC5mb3IoJ3Bpbm8uaG9va3MnKVxuY29uc3QgbmVlZHNNZXRhZGF0YUdzeW0gPSBTeW1ib2wuZm9yKCdwaW5vLm1ldGFkYXRhJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldExldmVsU3ltLFxuICBnZXRMZXZlbFN5bSxcbiAgbGV2ZWxWYWxTeW0sXG4gIGxldmVsQ29tcFN5bSxcbiAgdXNlTGV2ZWxMYWJlbHNTeW0sXG4gIG1peGluU3ltLFxuICBsc0NhY2hlU3ltLFxuICBjaGluZGluZ3NTeW0sXG4gIGFzSnNvblN5bSxcbiAgd3JpdGVTeW0sXG4gIHNlcmlhbGl6ZXJzU3ltLFxuICByZWRhY3RGbXRTeW0sXG4gIHRpbWVTeW0sXG4gIHRpbWVTbGljZUluZGV4U3ltLFxuICBzdHJlYW1TeW0sXG4gIHN0cmluZ2lmeVN5bSxcbiAgc3RyaW5naWZ5U2FmZVN5bSxcbiAgc3RyaW5naWZpZXJzU3ltLFxuICBlbmRTeW0sXG4gIGZvcm1hdE9wdHNTeW0sXG4gIG1lc3NhZ2VLZXlTeW0sXG4gIGVycm9yS2V5U3ltLFxuICBuZXN0ZWRLZXlTeW0sXG4gIHdpbGRjYXJkRmlyc3RTeW0sXG4gIG5lZWRzTWV0YWRhdGFHc3ltLFxuICB1c2VPbmx5Q3VzdG9tTGV2ZWxzU3ltLFxuICBmb3JtYXR0ZXJzU3ltLFxuICBob29rc1N5bSxcbiAgbmVzdGVkS2V5U3RyU3ltLFxuICBtaXhpbk1lcmdlU3RyYXRlZ3lTeW0sXG4gIG1zZ1ByZWZpeFN5bVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmYXN0UmVkYWN0ID0gcmVxdWlyZSgnZmFzdC1yZWRhY3QnKVxuY29uc3QgeyByZWRhY3RGbXRTeW0sIHdpbGRjYXJkRmlyc3RTeW0gfSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5jb25zdCB7IHJ4LCB2YWxpZGF0b3IgfSA9IGZhc3RSZWRhY3RcblxuY29uc3QgdmFsaWRhdGUgPSB2YWxpZGF0b3Ioe1xuICBFUlJfUEFUSFNfTVVTVF9CRV9TVFJJTkdTOiAoKSA9PiAncGlubyBcdTIwMTMgcmVkYWN0ZWQgcGF0aHMgbXVzdCBiZSBzdHJpbmdzJyxcbiAgRVJSX0lOVkFMSURfUEFUSDogKHMpID0+IGBwaW5vIFx1MjAxMyByZWRhY3QgcGF0aHMgYXJyYXkgY29udGFpbnMgYW4gaW52YWxpZCBwYXRoICgke3N9KWBcbn0pXG5cbmNvbnN0IENFTlNPUiA9ICdbUmVkYWN0ZWRdJ1xuY29uc3Qgc3RyaWN0ID0gZmFsc2UgLy8gVE9ETyBzaG91bGQgdGhpcyBiZSBjb25maWd1cmFibGU/XG5cbmZ1bmN0aW9uIHJlZGFjdGlvbiAob3B0cywgc2VyaWFsaXplKSB7XG4gIGNvbnN0IHsgcGF0aHMsIGNlbnNvciB9ID0gaGFuZGxlKG9wdHMpXG5cbiAgY29uc3Qgc2hhcGUgPSBwYXRocy5yZWR1Y2UoKG8sIHN0cikgPT4ge1xuICAgIHJ4Lmxhc3RJbmRleCA9IDBcbiAgICBjb25zdCBmaXJzdCA9IHJ4LmV4ZWMoc3RyKVxuICAgIGNvbnN0IG5leHQgPSByeC5leGVjKHN0cilcblxuICAgIC8vIG5zIGlzIHRoZSB0b3AtbGV2ZWwgcGF0aCBzZWdtZW50LCBicmFja2V0cyArIHF1b3RpbmcgcmVtb3ZlZC5cbiAgICBsZXQgbnMgPSBmaXJzdFsxXSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGZpcnN0WzFdLnJlcGxhY2UoL14oPzpcInwnfGApKC4qKSg/OlwifCd8YCkkLywgJyQxJylcbiAgICAgIDogZmlyc3RbMF1cblxuICAgIGlmIChucyA9PT0gJyonKSB7XG4gICAgICBucyA9IHdpbGRjYXJkRmlyc3RTeW1cbiAgICB9XG5cbiAgICAvLyB0b3AgbGV2ZWwga2V5OlxuICAgIGlmIChuZXh0ID09PSBudWxsKSB7XG4gICAgICBvW25zXSA9IG51bGxcbiAgICAgIHJldHVybiBvXG4gICAgfVxuXG4gICAgLy8gcGF0aCB3aXRoIGF0IGxlYXN0IHR3byBzZWdtZW50czpcbiAgICAvLyBpZiBucyBpcyBhbHJlYWR5IHJlZGFjdGVkIGF0IHRoZSB0b3AgbGV2ZWwsIGlnbm9yZSBsb3dlciBsZXZlbCByZWRhY3Rpb25zXG4gICAgaWYgKG9bbnNdID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gb1xuICAgIH1cblxuICAgIGNvbnN0IHsgaW5kZXggfSA9IG5leHRcbiAgICBjb25zdCBuZXh0UGF0aCA9IGAke3N0ci5zdWJzdHIoaW5kZXgsIHN0ci5sZW5ndGggLSAxKX1gXG5cbiAgICBvW25zXSA9IG9bbnNdIHx8IFtdXG5cbiAgICAvLyBzaGFwZSBpcyBhIG1peCBvZiBwYXRocyBiZWdpbm5pbmcgd2l0aCBsaXRlcmFsIHZhbHVlcyBhbmQgd2lsZGNhcmRcbiAgICAvLyBwYXRocyBbIFwiYS5iLmNcIiwgXCIqLmIuelwiIF0gc2hvdWxkIHJlZHVjZSB0byBhIHNoYXBlIG9mXG4gICAgLy8geyBcImFcIjogWyBcImIuY1wiLCBcImIuelwiIF0sICo6IFsgXCJiLnpcIiBdIH1cbiAgICAvLyBub3RlOiBcImIuelwiIGlzIGluIGJvdGggXCJhXCIgYW5kICogYXJyYXlzIGJlY2F1c2UgXCJhXCIgbWF0Y2hlcyB0aGUgd2lsZGNhcmQuXG4gICAgLy8gKCogZW50cnkgaGFzIHdpbGRjYXJkRmlyc3RTeW0gYXMga2V5KVxuICAgIGlmIChucyAhPT0gd2lsZGNhcmRGaXJzdFN5bSAmJiBvW25zXS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIGZpcnN0IHRpbWUgbnMncyBnZXQgYWxsICcqJyByZWRhY3Rpb25zIHNvIGZhclxuICAgICAgb1tuc10ucHVzaCguLi4ob1t3aWxkY2FyZEZpcnN0U3ltXSB8fCBbXSkpXG4gICAgfVxuXG4gICAgaWYgKG5zID09PSB3aWxkY2FyZEZpcnN0U3ltKSB7XG4gICAgICAvLyBuZXcgKiBwYXRoIGdldHMgYWRkZWQgdG8gYWxsIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBsaXRlcmFsIG5zJ3MuXG4gICAgICBPYmplY3Qua2V5cyhvKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIGlmIChvW2tdKSB7XG4gICAgICAgICAgb1trXS5wdXNoKG5leHRQYXRoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIG9bbnNdLnB1c2gobmV4dFBhdGgpXG4gICAgcmV0dXJuIG9cbiAgfSwge30pXG5cbiAgLy8gdGhlIHJlZGFjdG9yIGFzc2lnbmVkIHRvIHRoZSBmb3JtYXQgc3ltYm9sIGtleVxuICAvLyBwcm92aWRlcyB0b3AgbGV2ZWwgcmVkYWN0aW9uIGZvciBpbnN0YW5jZXMgd2hlcmVcbiAgLy8gYW4gb2JqZWN0IGlzIGludGVycG9sYXRlZCBpbnRvIHRoZSBtc2cgc3RyaW5nXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBbcmVkYWN0Rm10U3ltXTogZmFzdFJlZGFjdCh7IHBhdGhzLCBjZW5zb3IsIHNlcmlhbGl6ZSwgc3RyaWN0IH0pXG4gIH1cblxuICBjb25zdCB0b3BDZW5zb3IgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgY2Vuc29yID09PSAnZnVuY3Rpb24nID8gc2VyaWFsaXplKGNlbnNvciguLi5hcmdzKSkgOiBzZXJpYWxpemUoY2Vuc29yKVxuICB9XG5cbiAgcmV0dXJuIFsuLi5PYmplY3Qua2V5cyhzaGFwZSksIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc2hhcGUpXS5yZWR1Y2UoKG8sIGspID0+IHtcbiAgICAvLyB0b3AgbGV2ZWwga2V5OlxuICAgIGlmIChzaGFwZVtrXSA9PT0gbnVsbCkge1xuICAgICAgb1trXSA9ICh2YWx1ZSkgPT4gdG9wQ2Vuc29yKHZhbHVlLCBba10pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHdyYXBwZWRDZW5zb3IgPSB0eXBlb2YgY2Vuc29yID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gKHZhbHVlLCBwYXRoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2Vuc29yKHZhbHVlLCBbaywgLi4ucGF0aF0pXG4gICAgICAgICAgfVxuICAgICAgICA6IGNlbnNvclxuICAgICAgb1trXSA9IGZhc3RSZWRhY3Qoe1xuICAgICAgICBwYXRoczogc2hhcGVba10sXG4gICAgICAgIGNlbnNvcjogd3JhcHBlZENlbnNvcixcbiAgICAgICAgc2VyaWFsaXplLFxuICAgICAgICBzdHJpY3RcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBvXG4gIH0sIHJlc3VsdClcbn1cblxuZnVuY3Rpb24gaGFuZGxlIChvcHRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9wdHMpKSB7XG4gICAgb3B0cyA9IHsgcGF0aHM6IG9wdHMsIGNlbnNvcjogQ0VOU09SIH1cbiAgICB2YWxpZGF0ZShvcHRzKVxuICAgIHJldHVybiBvcHRzXG4gIH1cbiAgbGV0IHsgcGF0aHMsIGNlbnNvciA9IENFTlNPUiwgcmVtb3ZlIH0gPSBvcHRzXG4gIGlmIChBcnJheS5pc0FycmF5KHBhdGhzKSA9PT0gZmFsc2UpIHsgdGhyb3cgRXJyb3IoJ3Bpbm8gXHUyMDEzIHJlZGFjdCBtdXN0IGNvbnRhaW4gYW4gYXJyYXkgb2Ygc3RyaW5ncycpIH1cbiAgaWYgKHJlbW92ZSA9PT0gdHJ1ZSkgY2Vuc29yID0gdW5kZWZpbmVkXG4gIHZhbGlkYXRlKHsgcGF0aHMsIGNlbnNvciB9KVxuXG4gIHJldHVybiB7IHBhdGhzLCBjZW5zb3IgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGFjdGlvblxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBudWxsVGltZSA9ICgpID0+ICcnXG5cbmNvbnN0IGVwb2NoVGltZSA9ICgpID0+IGAsXCJ0aW1lXCI6JHtEYXRlLm5vdygpfWBcblxuY29uc3QgdW5peFRpbWUgPSAoKSA9PiBgLFwidGltZVwiOiR7TWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMC4wKX1gXG5cbmNvbnN0IGlzb1RpbWUgPSAoKSA9PiBgLFwidGltZVwiOlwiJHtuZXcgRGF0ZShEYXRlLm5vdygpKS50b0lTT1N0cmluZygpfVwiYCAvLyB1c2luZyBEYXRlLm5vdygpIGZvciB0ZXN0YWJpbGl0eVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbnVsbFRpbWUsIGVwb2NoVGltZSwgdW5peFRpbWUsIGlzb1RpbWUgfVxuIiwgIid1c2Ugc3RyaWN0J1xuZnVuY3Rpb24gdHJ5U3RyaW5naWZ5IChvKSB7XG4gIHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShvKSB9IGNhdGNoKGUpIHsgcmV0dXJuICdcIltDaXJjdWxhcl1cIicgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdFxuXG5mdW5jdGlvbiBmb3JtYXQoZiwgYXJncywgb3B0cykge1xuICB2YXIgc3MgPSAob3B0cyAmJiBvcHRzLnN0cmluZ2lmeSkgfHwgdHJ5U3RyaW5naWZ5XG4gIHZhciBvZmZzZXQgPSAxXG4gIGlmICh0eXBlb2YgZiA9PT0gJ29iamVjdCcgJiYgZiAhPT0gbnVsbCkge1xuICAgIHZhciBsZW4gPSBhcmdzLmxlbmd0aCArIG9mZnNldFxuICAgIGlmIChsZW4gPT09IDEpIHJldHVybiBmXG4gICAgdmFyIG9iamVjdHMgPSBuZXcgQXJyYXkobGVuKVxuICAgIG9iamVjdHNbMF0gPSBzcyhmKVxuICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW47IGluZGV4KyspIHtcbiAgICAgIG9iamVjdHNbaW5kZXhdID0gc3MoYXJnc1tpbmRleF0pXG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKVxuICB9XG4gIGlmICh0eXBlb2YgZiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZlxuICB9XG4gIHZhciBhcmdMZW4gPSBhcmdzLmxlbmd0aFxuICBpZiAoYXJnTGVuID09PSAwKSByZXR1cm4gZlxuICB2YXIgc3RyID0gJydcbiAgdmFyIGEgPSAxIC0gb2Zmc2V0XG4gIHZhciBsYXN0UG9zID0gLTFcbiAgdmFyIGZsZW4gPSAoZiAmJiBmLmxlbmd0aCkgfHwgMFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGZsZW47KSB7XG4gICAgaWYgKGYuY2hhckNvZGVBdChpKSA9PT0gMzcgJiYgaSArIDEgPCBmbGVuKSB7XG4gICAgICBsYXN0UG9zID0gbGFzdFBvcyA+IC0xID8gbGFzdFBvcyA6IDBcbiAgICAgIHN3aXRjaCAoZi5jaGFyQ29kZUF0KGkgKyAxKSkge1xuICAgICAgICBjYXNlIDEwMDogLy8gJ2QnXG4gICAgICAgIGNhc2UgMTAyOiAvLyAnZidcbiAgICAgICAgICBpZiAoYSA+PSBhcmdMZW4pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGlmIChhcmdzW2FdID09IG51bGwpICBicmVha1xuICAgICAgICAgIGlmIChsYXN0UG9zIDwgaSlcbiAgICAgICAgICAgIHN0ciArPSBmLnNsaWNlKGxhc3RQb3MsIGkpXG4gICAgICAgICAgc3RyICs9IE51bWJlcihhcmdzW2FdKVxuICAgICAgICAgIGxhc3RQb3MgPSBpICsgMlxuICAgICAgICAgIGkrK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTA1OiAvLyAnaSdcbiAgICAgICAgICBpZiAoYSA+PSBhcmdMZW4pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGlmIChhcmdzW2FdID09IG51bGwpICBicmVha1xuICAgICAgICAgIGlmIChsYXN0UG9zIDwgaSlcbiAgICAgICAgICAgIHN0ciArPSBmLnNsaWNlKGxhc3RQb3MsIGkpXG4gICAgICAgICAgc3RyICs9IE1hdGguZmxvb3IoTnVtYmVyKGFyZ3NbYV0pKVxuICAgICAgICAgIGxhc3RQb3MgPSBpICsgMlxuICAgICAgICAgIGkrK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNzk6IC8vICdPJ1xuICAgICAgICBjYXNlIDExMTogLy8gJ28nXG4gICAgICAgIGNhc2UgMTA2OiAvLyAnaidcbiAgICAgICAgICBpZiAoYSA+PSBhcmdMZW4pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGlmIChhcmdzW2FdID09PSB1bmRlZmluZWQpIGJyZWFrXG4gICAgICAgICAgaWYgKGxhc3RQb3MgPCBpKVxuICAgICAgICAgICAgc3RyICs9IGYuc2xpY2UobGFzdFBvcywgaSlcbiAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBhcmdzW2FdXG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzdHIgKz0gJ1xcJycgKyBhcmdzW2FdICsgJ1xcJydcbiAgICAgICAgICAgIGxhc3RQb3MgPSBpICsgMlxuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RyICs9IGFyZ3NbYV0ubmFtZSB8fCAnPGFub255bW91cz4nXG4gICAgICAgICAgICBsYXN0UG9zID0gaSArIDJcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyICs9IHNzKGFyZ3NbYV0pXG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAyXG4gICAgICAgICAgaSsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxMTU6IC8vICdzJ1xuICAgICAgICAgIGlmIChhID49IGFyZ0xlbilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgaWYgKGxhc3RQb3MgPCBpKVxuICAgICAgICAgICAgc3RyICs9IGYuc2xpY2UobGFzdFBvcywgaSlcbiAgICAgICAgICBzdHIgKz0gU3RyaW5nKGFyZ3NbYV0pXG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAyXG4gICAgICAgICAgaSsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzNzogLy8gJyUnXG4gICAgICAgICAgaWYgKGxhc3RQb3MgPCBpKVxuICAgICAgICAgICAgc3RyICs9IGYuc2xpY2UobGFzdFBvcywgaSlcbiAgICAgICAgICBzdHIgKz0gJyUnXG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAyXG4gICAgICAgICAgaSsrXG4gICAgICAgICAgYS0tXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgICsrYVxuICAgIH1cbiAgICArK2lcbiAgfVxuICBpZiAobGFzdFBvcyA9PT0gLTEpXG4gICAgcmV0dXJuIGZcbiAgZWxzZSBpZiAobGFzdFBvcyA8IGZsZW4pIHtcbiAgICBzdHIgKz0gZi5zbGljZShsYXN0UG9zKVxuICB9XG5cbiAgcmV0dXJuIHN0clxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG4vKiBnbG9iYWwgU2hhcmVkQXJyYXlCdWZmZXIsIEF0b21pY3MgKi9cblxuaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEF0b21pY3MgIT09ICd1bmRlZmluZWQnKSB7XG4gIGNvbnN0IG5pbCA9IG5ldyBJbnQzMkFycmF5KG5ldyBTaGFyZWRBcnJheUJ1ZmZlcig0KSlcblxuICBmdW5jdGlvbiBzbGVlcCAobXMpIHtcbiAgICAvLyBhbHNvIGZpbHRlcnMgb3V0IE5hTiwgbm9uLW51bWJlciB0eXBlcywgaW5jbHVkaW5nIGVtcHR5IHN0cmluZ3MsIGJ1dCBhbGxvd3MgYmlnaW50c1xuICAgIGNvbnN0IHZhbGlkID0gbXMgPiAwICYmIG1zIDwgSW5maW5pdHkgXG4gICAgaWYgKHZhbGlkID09PSBmYWxzZSkge1xuICAgICAgaWYgKHR5cGVvZiBtcyAhPT0gJ251bWJlcicgJiYgdHlwZW9mIG1zICE9PSAnYmlnaW50Jykge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3NsZWVwOiBtcyBtdXN0IGJlIGEgbnVtYmVyJylcbiAgICAgIH1cbiAgICAgIHRocm93IFJhbmdlRXJyb3IoJ3NsZWVwOiBtcyBtdXN0IGJlIGEgbnVtYmVyIHRoYXQgaXMgZ3JlYXRlciB0aGFuIDAgYnV0IGxlc3MgdGhhbiBJbmZpbml0eScpXG4gICAgfVxuXG4gICAgQXRvbWljcy53YWl0KG5pbCwgMCwgMCwgTnVtYmVyKG1zKSlcbiAgfVxuICBtb2R1bGUuZXhwb3J0cyA9IHNsZWVwXG59IGVsc2Uge1xuXG4gIGZ1bmN0aW9uIHNsZWVwIChtcykge1xuICAgIC8vIGFsc28gZmlsdGVycyBvdXQgTmFOLCBub24tbnVtYmVyIHR5cGVzLCBpbmNsdWRpbmcgZW1wdHkgc3RyaW5ncywgYnV0IGFsbG93cyBiaWdpbnRzXG4gICAgY29uc3QgdmFsaWQgPSBtcyA+IDAgJiYgbXMgPCBJbmZpbml0eSBcbiAgICBpZiAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodHlwZW9mIG1zICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgbXMgIT09ICdiaWdpbnQnKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignc2xlZXA6IG1zIG11c3QgYmUgYSBudW1iZXInKVxuICAgICAgfVxuICAgICAgdGhyb3cgUmFuZ2VFcnJvcignc2xlZXA6IG1zIG11c3QgYmUgYSBudW1iZXIgdGhhdCBpcyBncmVhdGVyIHRoYW4gMCBidXQgbGVzcyB0aGFuIEluZmluaXR5JylcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gRGF0ZS5ub3coKSArIE51bWJlcihtcylcbiAgICB3aGlsZSAodGFyZ2V0ID4gRGF0ZS5ub3coKSl7fVxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBzbGVlcFxuXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJylcbmNvbnN0IGluaGVyaXRzID0gcmVxdWlyZSgndXRpbCcpLmluaGVyaXRzXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBzbGVlcCA9IHJlcXVpcmUoJ2F0b21pYy1zbGVlcCcpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5jb25zdCBCVVNZX1dSSVRFX1RJTUVPVVQgPSAxMDBcbmNvbnN0IGtFbXB0eUJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKVxuXG4vLyAxNiBLQi4gRG9uJ3Qgd3JpdGUgbW9yZSB0aGFuIGRvY2tlciBidWZmZXIgc2l6ZS5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J5L21vYnkvYmxvYi81MTNlYzczODMxMjY5OTQ3ZDM4YTY0NGMyNzhjZTNjYWMzNjc4M2IyL2RhZW1vbi9sb2dnZXIvY29waWVyLmdvI0wxM1xuY29uc3QgTUFYX1dSSVRFID0gMTYgKiAxMDI0XG5cbmNvbnN0IGtDb250ZW50TW9kZUJ1ZmZlciA9ICdidWZmZXInXG5jb25zdCBrQ29udGVudE1vZGVVdGY4ID0gJ3V0ZjgnXG5cbmNvbnN0IFttYWpvciwgbWlub3JdID0gKHByb2Nlc3MudmVyc2lvbnMubm9kZSB8fCAnMC4wJykuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKVxuY29uc3Qga0NvcHlCdWZmZXIgPSBtYWpvciA+PSAyMiAmJiBtaW5vciA+PSA3XG5cbmZ1bmN0aW9uIG9wZW5GaWxlIChmaWxlLCBzb25pYykge1xuICBzb25pYy5fb3BlbmluZyA9IHRydWVcbiAgc29uaWMuX3dyaXRpbmcgPSB0cnVlXG4gIHNvbmljLl9hc3luY0RyYWluU2NoZWR1bGVkID0gZmFsc2VcblxuICAvLyBOT1RFOiAnZXJyb3InIGFuZCAncmVhZHknIGV2ZW50cyBlbWl0dGVkIGJlbG93IG9ubHkgcmVsZXZhbnQgd2hlbiBzb25pYy5zeW5jPT09ZmFsc2VcbiAgLy8gZm9yIHN5bmMgbW9kZSwgdGhlcmUgaXMgbm8gd2F5IHRvIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCByZWNlaXZlIHRoZXNlXG5cbiAgZnVuY3Rpb24gZmlsZU9wZW5lZCAoZXJyLCBmZCkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHNvbmljLl9yZW9wZW5pbmcgPSBmYWxzZVxuICAgICAgc29uaWMuX3dyaXRpbmcgPSBmYWxzZVxuICAgICAgc29uaWMuX29wZW5pbmcgPSBmYWxzZVxuXG4gICAgICBpZiAoc29uaWMuc3luYykge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBpZiAoc29uaWMubGlzdGVuZXJDb3VudCgnZXJyb3InKSA+IDApIHtcbiAgICAgICAgICAgIHNvbmljLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbmljLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVvcGVuaW5nID0gc29uaWMuX3Jlb3BlbmluZ1xuXG4gICAgc29uaWMuZmQgPSBmZFxuICAgIHNvbmljLmZpbGUgPSBmaWxlXG4gICAgc29uaWMuX3Jlb3BlbmluZyA9IGZhbHNlXG4gICAgc29uaWMuX29wZW5pbmcgPSBmYWxzZVxuICAgIHNvbmljLl93cml0aW5nID0gZmFsc2VcblxuICAgIGlmIChzb25pYy5zeW5jKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHNvbmljLmVtaXQoJ3JlYWR5JykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNvbmljLmVtaXQoJ3JlYWR5JylcbiAgICB9XG5cbiAgICBpZiAoc29uaWMuZGVzdHJveWVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBzdGFydFxuICAgIGlmICgoIXNvbmljLl93cml0aW5nICYmIHNvbmljLl9sZW4gPiBzb25pYy5taW5MZW5ndGgpIHx8IHNvbmljLl9mbHVzaFBlbmRpbmcpIHtcbiAgICAgIHNvbmljLl9hY3R1YWxXcml0ZSgpXG4gICAgfSBlbHNlIGlmIChyZW9wZW5pbmcpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4gc29uaWMuZW1pdCgnZHJhaW4nKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBmbGFncyA9IHNvbmljLmFwcGVuZCA/ICdhJyA6ICd3J1xuICBjb25zdCBtb2RlID0gc29uaWMubW9kZVxuXG4gIGlmIChzb25pYy5zeW5jKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChzb25pYy5ta2RpcikgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmaWxlKSwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgICAgIGNvbnN0IGZkID0gZnMub3BlblN5bmMoZmlsZSwgZmxhZ3MsIG1vZGUpXG4gICAgICBmaWxlT3BlbmVkKG51bGwsIGZkKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZmlsZU9wZW5lZChlcnIpXG4gICAgICB0aHJvdyBlcnJcbiAgICB9XG4gIH0gZWxzZSBpZiAoc29uaWMubWtkaXIpIHtcbiAgICBmcy5ta2RpcihwYXRoLmRpcm5hbWUoZmlsZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0sIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBmaWxlT3BlbmVkKGVycilcbiAgICAgIGZzLm9wZW4oZmlsZSwgZmxhZ3MsIG1vZGUsIGZpbGVPcGVuZWQpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBmcy5vcGVuKGZpbGUsIGZsYWdzLCBtb2RlLCBmaWxlT3BlbmVkKVxuICB9XG59XG5cbmZ1bmN0aW9uIFNvbmljQm9vbSAob3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29uaWNCb29tKSkge1xuICAgIHJldHVybiBuZXcgU29uaWNCb29tKG9wdHMpXG4gIH1cblxuICBsZXQgeyBmZCwgZGVzdCwgbWluTGVuZ3RoLCBtYXhMZW5ndGgsIG1heFdyaXRlLCBwZXJpb2RpY0ZsdXNoLCBzeW5jLCBhcHBlbmQgPSB0cnVlLCBta2RpciwgcmV0cnlFQUdBSU4sIGZzeW5jLCBjb250ZW50TW9kZSwgbW9kZSB9ID0gb3B0cyB8fCB7fVxuXG4gIGZkID0gZmQgfHwgZGVzdFxuXG4gIHRoaXMuX2xlbiA9IDBcbiAgdGhpcy5mZCA9IC0xXG4gIHRoaXMuX2J1ZnMgPSBbXVxuICB0aGlzLl9sZW5zID0gW11cbiAgdGhpcy5fd3JpdGluZyA9IGZhbHNlXG4gIHRoaXMuX2VuZGluZyA9IGZhbHNlXG4gIHRoaXMuX3Jlb3BlbmluZyA9IGZhbHNlXG4gIHRoaXMuX2FzeW5jRHJhaW5TY2hlZHVsZWQgPSBmYWxzZVxuICB0aGlzLl9mbHVzaFBlbmRpbmcgPSBmYWxzZVxuICB0aGlzLl9od20gPSBNYXRoLm1heChtaW5MZW5ndGggfHwgMCwgMTYzODcpXG4gIHRoaXMuZmlsZSA9IG51bGxcbiAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZVxuICB0aGlzLm1pbkxlbmd0aCA9IG1pbkxlbmd0aCB8fCAwXG4gIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoIHx8IDBcbiAgdGhpcy5tYXhXcml0ZSA9IG1heFdyaXRlIHx8IE1BWF9XUklURVxuICB0aGlzLl9wZXJpb2RpY0ZsdXNoID0gcGVyaW9kaWNGbHVzaCB8fCAwXG4gIHRoaXMuX3BlcmlvZGljRmx1c2hUaW1lciA9IHVuZGVmaW5lZFxuICB0aGlzLnN5bmMgPSBzeW5jIHx8IGZhbHNlXG4gIHRoaXMud3JpdGFibGUgPSB0cnVlXG4gIHRoaXMuX2ZzeW5jID0gZnN5bmMgfHwgZmFsc2VcbiAgdGhpcy5hcHBlbmQgPSBhcHBlbmQgfHwgZmFsc2VcbiAgdGhpcy5tb2RlID0gbW9kZVxuICB0aGlzLnJldHJ5RUFHQUlOID0gcmV0cnlFQUdBSU4gfHwgKCgpID0+IHRydWUpXG4gIHRoaXMubWtkaXIgPSBta2RpciB8fCBmYWxzZVxuXG4gIGxldCBmc1dyaXRlU3luY1xuICBsZXQgZnNXcml0ZVxuICBpZiAoY29udGVudE1vZGUgPT09IGtDb250ZW50TW9kZUJ1ZmZlcikge1xuICAgIHRoaXMuX3dyaXRpbmdCdWYgPSBrRW1wdHlCdWZmZXJcbiAgICB0aGlzLndyaXRlID0gd3JpdGVCdWZmZXJcbiAgICB0aGlzLmZsdXNoID0gZmx1c2hCdWZmZXJcbiAgICB0aGlzLmZsdXNoU3luYyA9IGZsdXNoQnVmZmVyU3luY1xuICAgIHRoaXMuX2FjdHVhbFdyaXRlID0gYWN0dWFsV3JpdGVCdWZmZXJcbiAgICBmc1dyaXRlU3luYyA9ICgpID0+IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmKVxuICAgIGZzV3JpdGUgPSAoKSA9PiBmcy53cml0ZSh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmLCB0aGlzLnJlbGVhc2UpXG4gIH0gZWxzZSBpZiAoY29udGVudE1vZGUgPT09IHVuZGVmaW5lZCB8fCBjb250ZW50TW9kZSA9PT0ga0NvbnRlbnRNb2RlVXRmOCkge1xuICAgIHRoaXMuX3dyaXRpbmdCdWYgPSAnJ1xuICAgIHRoaXMud3JpdGUgPSB3cml0ZVxuICAgIHRoaXMuZmx1c2ggPSBmbHVzaFxuICAgIHRoaXMuZmx1c2hTeW5jID0gZmx1c2hTeW5jXG4gICAgdGhpcy5fYWN0dWFsV3JpdGUgPSBhY3R1YWxXcml0ZVxuICAgIGZzV3JpdGVTeW5jID0gKCkgPT4gZnMud3JpdGVTeW5jKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsICd1dGY4JylcbiAgICBmc1dyaXRlID0gKCkgPT4gZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgJ3V0ZjgnLCB0aGlzLnJlbGVhc2UpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb25pY0Jvb20gc3VwcG9ydHMgXCIke2tDb250ZW50TW9kZVV0Zjh9XCIgYW5kIFwiJHtrQ29udGVudE1vZGVCdWZmZXJ9XCIsIGJ1dCBwYXNzZWQgJHtjb250ZW50TW9kZX1gKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBmZCA9PT0gJ251bWJlcicpIHtcbiAgICB0aGlzLmZkID0gZmRcbiAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHRoaXMuZW1pdCgncmVhZHknKSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmQgPT09ICdzdHJpbmcnKSB7XG4gICAgb3BlbkZpbGUoZmQsIHRoaXMpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb25pY0Jvb20gc3VwcG9ydHMgb25seSBmaWxlIGRlc2NyaXB0b3JzIGFuZCBmaWxlcycpXG4gIH1cbiAgaWYgKHRoaXMubWluTGVuZ3RoID49IHRoaXMubWF4V3JpdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG1pbkxlbmd0aCBzaG91bGQgYmUgc21hbGxlciB0aGFuIG1heFdyaXRlICgke3RoaXMubWF4V3JpdGV9KWApXG4gIH1cblxuICB0aGlzLnJlbGVhc2UgPSAoZXJyLCBuKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgaWYgKChlcnIuY29kZSA9PT0gJ0VBR0FJTicgfHwgZXJyLmNvZGUgPT09ICdFQlVTWScpICYmIHRoaXMucmV0cnlFQUdBSU4oZXJyLCB0aGlzLl93cml0aW5nQnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gdGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGgpKSB7XG4gICAgICAgIGlmICh0aGlzLnN5bmMpIHtcbiAgICAgICAgICAvLyBUaGlzIGVycm9yIGNvZGUgc2hvdWxkIG5vdCBoYXBwZW4gaW4gc3luYyBtb2RlLCBiZWNhdXNlIGl0IGlzXG4gICAgICAgICAgLy8gbm90IHVzaW5nIHRoZSB1bmRlcmxpbmluZyBvcGVyYXRpbmcgc3lzdGVtIGFzeW5jaHJvbm91cyBmdW5jdGlvbnMuXG4gICAgICAgICAgLy8gSG93ZXZlciBpdCBoYXBwZW5zLCBhbmQgc28gd2UgaGFuZGxlIGl0LlxuICAgICAgICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3Bpbm9qcy9waW5vL2lzc3Vlcy83ODNcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2xlZXAoQlVTWV9XUklURV9USU1FT1VUKVxuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKHVuZGVmaW5lZCwgMClcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZShlcnIpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIExldCdzIGdpdmUgdGhlIGRlc3RpbmF0aW9uIHNvbWUgdGltZSB0byBwcm9jZXNzIHRoZSBjaHVuay5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZzV3JpdGUsIEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fd3JpdGluZyA9IGZhbHNlXG5cbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycilcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuZW1pdCgnd3JpdGUnLCBuKVxuICAgIGNvbnN0IHJlbGVhc2VkQnVmT2JqID0gcmVsZWFzZVdyaXRpbmdCdWYodGhpcy5fd3JpdGluZ0J1ZiwgdGhpcy5fbGVuLCBuKVxuICAgIHRoaXMuX2xlbiA9IHJlbGVhc2VkQnVmT2JqLmxlblxuICAgIHRoaXMuX3dyaXRpbmdCdWYgPSByZWxlYXNlZEJ1Zk9iai53cml0aW5nQnVmXG5cbiAgICBpZiAodGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGgpIHtcbiAgICAgIGlmICghdGhpcy5zeW5jKSB7XG4gICAgICAgIGZzV3JpdGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGNvbnN0IG4gPSBmc1dyaXRlU3luYygpXG4gICAgICAgICAgY29uc3QgcmVsZWFzZWRCdWZPYmogPSByZWxlYXNlV3JpdGluZ0J1Zih0aGlzLl93cml0aW5nQnVmLCB0aGlzLl9sZW4sIG4pXG4gICAgICAgICAgdGhpcy5fbGVuID0gcmVsZWFzZWRCdWZPYmoubGVuXG4gICAgICAgICAgdGhpcy5fd3JpdGluZ0J1ZiA9IHJlbGVhc2VkQnVmT2JqLndyaXRpbmdCdWZcbiAgICAgICAgfSB3aGlsZSAodGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGgpXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2ZzeW5jKSB7XG4gICAgICBmcy5mc3luY1N5bmModGhpcy5mZClcbiAgICB9XG5cbiAgICBjb25zdCBsZW4gPSB0aGlzLl9sZW5cbiAgICBpZiAodGhpcy5fcmVvcGVuaW5nKSB7XG4gICAgICB0aGlzLl93cml0aW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX3Jlb3BlbmluZyA9IGZhbHNlXG4gICAgICB0aGlzLnJlb3BlbigpXG4gICAgfSBlbHNlIGlmIChsZW4gPiB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgdGhpcy5fYWN0dWFsV3JpdGUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fZW5kaW5nKSB7XG4gICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICB0aGlzLl9hY3R1YWxXcml0ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93cml0aW5nID0gZmFsc2VcbiAgICAgICAgYWN0dWFsQ2xvc2UodGhpcylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd3JpdGluZyA9IGZhbHNlXG4gICAgICBpZiAodGhpcy5zeW5jKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXN5bmNEcmFpblNjaGVkdWxlZCkge1xuICAgICAgICAgIHRoaXMuX2FzeW5jRHJhaW5TY2hlZHVsZWQgPSB0cnVlXG4gICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0RHJhaW4sIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZHJhaW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMub24oJ25ld0xpc3RlbmVyJywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PT0gJ2RyYWluJykge1xuICAgICAgdGhpcy5fYXN5bmNEcmFpblNjaGVkdWxlZCA9IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIGlmICh0aGlzLl9wZXJpb2RpY0ZsdXNoICE9PSAwKSB7XG4gICAgdGhpcy5fcGVyaW9kaWNGbHVzaFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5mbHVzaChudWxsKSwgdGhpcy5fcGVyaW9kaWNGbHVzaClcbiAgICB0aGlzLl9wZXJpb2RpY0ZsdXNoVGltZXIudW5yZWYoKVxuICB9XG59XG5cbi8qKlxuICogUmVsZWFzZSB0aGUgd3JpdGluZ0J1ZiBhZnRlciBmcy53cml0ZSBuIGJ5dGVzIGRhdGFcbiAqIEBwYXJhbSB7c3RyaW5nIHwgQnVmZmVyfSB3cml0aW5nQnVmIC0gY3VycmVudGx5IHdyaXRpbmcgYnVmZmVyLCB1c3VhbGx5IGJlIGluc3RhbmNlLl93cml0aW5nQnVmLlxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiAtIGN1cnJlbnRseSBidWZmZXIgbGVuZ3RoLCB1c3VhbGx5IGJlIGluc3RhbmNlLl9sZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gbiAtIG51bWJlciBvZiBieXRlcyBmcyBhbHJlYWR5IHdyaXR0ZW5cbiAqIEByZXR1cm5zIHt7d3JpdGluZ0J1Zjogc3RyaW5nIHwgQnVmZmVyLCBsZW46IG51bWJlcn19IHJlbGVhc2VkIHdyaXRpbmdCdWYgYW5kIGxlbmd0aFxuICovXG5mdW5jdGlvbiByZWxlYXNlV3JpdGluZ0J1ZiAod3JpdGluZ0J1ZiwgbGVuLCBuKSB7XG4gIC8vIGlmIEJ1ZmZlci5ieXRlTGVuZ3RoIGlzIGVxdWFsIHRvIG4sIHRoYXQgbWVhbnMgd3JpdGluZ0J1ZiBjb250YWlucyBubyBtdWx0aS1ieXRlIGNoYXJhY3RlclxuICBpZiAodHlwZW9mIHdyaXRpbmdCdWYgPT09ICdzdHJpbmcnICYmIEJ1ZmZlci5ieXRlTGVuZ3RoKHdyaXRpbmdCdWYpICE9PSBuKSB7XG4gICAgLy8gU2luY2UgdGhlIGZzLndyaXRlIGNhbGxiYWNrIHBhcmFtZXRlciBgbmAgbWVhbnMgaG93IG1hbnkgYnl0ZXMgdGhlIHBhc3NlZCBvZiBzdHJpbmdcbiAgICAvLyBXZSBjYWxjdWxhdGUgdGhlIG9yaWdpbmFsIHN0cmluZyBsZW5ndGggZm9yIGF2b2lkaW5nIHRoZSBtdWx0aS1ieXRlIGNoYXJhY3RlciBpc3N1ZVxuICAgIG4gPSBCdWZmZXIuZnJvbSh3cml0aW5nQnVmKS5zdWJhcnJheSgwLCBuKS50b1N0cmluZygpLmxlbmd0aFxuICB9XG4gIGxlbiA9IE1hdGgubWF4KGxlbiAtIG4sIDApXG4gIHdyaXRpbmdCdWYgPSB3cml0aW5nQnVmLnNsaWNlKG4pXG4gIHJldHVybiB7IHdyaXRpbmdCdWYsIGxlbiB9XG59XG5cbmZ1bmN0aW9uIGVtaXREcmFpbiAoc29uaWMpIHtcbiAgY29uc3QgaGFzTGlzdGVuZXJzID0gc29uaWMubGlzdGVuZXJDb3VudCgnZHJhaW4nKSA+IDBcbiAgaWYgKCFoYXNMaXN0ZW5lcnMpIHJldHVyblxuICBzb25pYy5fYXN5bmNEcmFpblNjaGVkdWxlZCA9IGZhbHNlXG4gIHNvbmljLmVtaXQoJ2RyYWluJylcbn1cblxuaW5oZXJpdHMoU29uaWNCb29tLCBFdmVudEVtaXR0ZXIpXG5cbmZ1bmN0aW9uIG1lcmdlQnVmIChidWZzLCBsZW4pIHtcbiAgaWYgKGJ1ZnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGtFbXB0eUJ1ZmZlclxuICB9XG5cbiAgaWYgKGJ1ZnMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGJ1ZnNbMF1cbiAgfVxuXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KGJ1ZnMsIGxlbilcbn1cblxuZnVuY3Rpb24gd3JpdGUgKGRhdGEpIHtcbiAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb25pY0Jvb20gZGVzdHJveWVkJylcbiAgfVxuXG4gIGNvbnN0IGxlbiA9IHRoaXMuX2xlbiArIGRhdGEubGVuZ3RoXG4gIGNvbnN0IGJ1ZnMgPSB0aGlzLl9idWZzXG5cbiAgaWYgKHRoaXMubWF4TGVuZ3RoICYmIGxlbiA+IHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgdGhpcy5lbWl0KCdkcm9wJywgZGF0YSlcbiAgICByZXR1cm4gdGhpcy5fbGVuIDwgdGhpcy5faHdtXG4gIH1cblxuICBpZiAoXG4gICAgYnVmcy5sZW5ndGggPT09IDAgfHxcbiAgICBidWZzW2J1ZnMubGVuZ3RoIC0gMV0ubGVuZ3RoICsgZGF0YS5sZW5ndGggPiB0aGlzLm1heFdyaXRlXG4gICkge1xuICAgIGJ1ZnMucHVzaCgnJyArIGRhdGEpXG4gIH0gZWxzZSB7XG4gICAgYnVmc1tidWZzLmxlbmd0aCAtIDFdICs9IGRhdGFcbiAgfVxuXG4gIHRoaXMuX2xlbiA9IGxlblxuXG4gIGlmICghdGhpcy5fd3JpdGluZyAmJiB0aGlzLl9sZW4gPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICB0aGlzLl9hY3R1YWxXcml0ZSgpXG4gIH1cblxuICByZXR1cm4gdGhpcy5fbGVuIDwgdGhpcy5faHdtXG59XG5cbmZ1bmN0aW9uIHdyaXRlQnVmZmVyIChkYXRhKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBjb25zdCBsZW4gPSB0aGlzLl9sZW4gKyBkYXRhLmxlbmd0aFxuICBjb25zdCBidWZzID0gdGhpcy5fYnVmc1xuICBjb25zdCBsZW5zID0gdGhpcy5fbGVuc1xuXG4gIGlmICh0aGlzLm1heExlbmd0aCAmJiBsZW4gPiB0aGlzLm1heExlbmd0aCkge1xuICAgIHRoaXMuZW1pdCgnZHJvcCcsIGRhdGEpXG4gICAgcmV0dXJuIHRoaXMuX2xlbiA8IHRoaXMuX2h3bVxuICB9XG5cbiAgaWYgKFxuICAgIGJ1ZnMubGVuZ3RoID09PSAwIHx8XG4gICAgbGVuc1tsZW5zLmxlbmd0aCAtIDFdICsgZGF0YS5sZW5ndGggPiB0aGlzLm1heFdyaXRlXG4gICkge1xuICAgIGJ1ZnMucHVzaChbZGF0YV0pXG4gICAgbGVucy5wdXNoKGRhdGEubGVuZ3RoKVxuICB9IGVsc2Uge1xuICAgIGJ1ZnNbYnVmcy5sZW5ndGggLSAxXS5wdXNoKGRhdGEpXG4gICAgbGVuc1tsZW5zLmxlbmd0aCAtIDFdICs9IGRhdGEubGVuZ3RoXG4gIH1cblxuICB0aGlzLl9sZW4gPSBsZW5cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fbGVuID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgdGhpcy5fYWN0dWFsV3JpdGUoKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2xlbiA8IHRoaXMuX2h3bVxufVxuXG5mdW5jdGlvbiBjYWxsRmx1c2hDYWxsYmFja09uRHJhaW4gKGNiKSB7XG4gIHRoaXMuX2ZsdXNoUGVuZGluZyA9IHRydWVcbiAgY29uc3Qgb25EcmFpbiA9ICgpID0+IHtcbiAgICAvLyBvbmx5IGlmIF9mc3luYyBpcyBmYWxzZSB0byBhdm9pZCBkb3VibGUgZnN5bmNcbiAgICBpZiAoIXRoaXMuX2ZzeW5jKSB7XG4gICAgICB0cnkge1xuICAgICAgICBmcy5mc3luYyh0aGlzLmZkLCAoZXJyKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZmx1c2hQZW5kaW5nID0gZmFsc2VcbiAgICAgICAgICBjYihlcnIpXG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY2IoZXJyKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mbHVzaFBlbmRpbmcgPSBmYWxzZVxuICAgICAgY2IoKVxuICAgIH1cbiAgICB0aGlzLm9mZignZXJyb3InLCBvbkVycm9yKVxuICB9XG4gIGNvbnN0IG9uRXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgdGhpcy5fZmx1c2hQZW5kaW5nID0gZmFsc2VcbiAgICBjYihlcnIpXG4gICAgdGhpcy5vZmYoJ2RyYWluJywgb25EcmFpbilcbiAgfVxuXG4gIHRoaXMub25jZSgnZHJhaW4nLCBvbkRyYWluKVxuICB0aGlzLm9uY2UoJ2Vycm9yJywgb25FcnJvcilcbn1cblxuZnVuY3Rpb24gZmx1c2ggKGNiKSB7XG4gIGlmIChjYiAhPSBudWxsICYmIHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignZmx1c2ggY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgfVxuXG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdTb25pY0Jvb20gZGVzdHJveWVkJylcbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGVycm9yKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3JcbiAgfVxuXG4gIGlmICh0aGlzLm1pbkxlbmd0aCA8PSAwKSB7XG4gICAgY2I/LigpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoY2IpIHtcbiAgICBjYWxsRmx1c2hDYWxsYmFja09uRHJhaW4uY2FsbCh0aGlzLCBjYilcbiAgfVxuXG4gIGlmICh0aGlzLl93cml0aW5nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodGhpcy5fYnVmcy5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLl9idWZzLnB1c2goJycpXG4gIH1cblxuICB0aGlzLl9hY3R1YWxXcml0ZSgpXG59XG5cbmZ1bmN0aW9uIGZsdXNoQnVmZmVyIChjYikge1xuICBpZiAoY2IgIT0gbnVsbCAmJiB0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZsdXNoIGNiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIH1cblxuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYihlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRocm93IGVycm9yXG4gIH1cblxuICBpZiAodGhpcy5taW5MZW5ndGggPD0gMCkge1xuICAgIGNiPy4oKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNiKSB7XG4gICAgY2FsbEZsdXNoQ2FsbGJhY2tPbkRyYWluLmNhbGwodGhpcywgY2IpXG4gIH1cblxuICBpZiAodGhpcy5fd3JpdGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuX2J1ZnMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fYnVmcy5wdXNoKFtdKVxuICAgIHRoaXMuX2xlbnMucHVzaCgwKVxuICB9XG5cbiAgdGhpcy5fYWN0dWFsV3JpdGUoKVxufVxuXG5Tb25pY0Jvb20ucHJvdG90eXBlLnJlb3BlbiA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5fb3BlbmluZykge1xuICAgIHRoaXMub25jZSgncmVhZHknLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlb3BlbihmaWxlKVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodGhpcy5fZW5kaW5nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoIXRoaXMuZmlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHJlb3BlbiBhIGZpbGUgZGVzY3JpcHRvciwgeW91IG11c3QgcGFzcyBhIGZpbGUgdG8gU29uaWNCb29tJylcbiAgfVxuXG4gIGlmIChmaWxlKSB7XG4gICAgdGhpcy5maWxlID0gZmlsZVxuICB9XG4gIHRoaXMuX3Jlb3BlbmluZyA9IHRydWVcblxuICBpZiAodGhpcy5fd3JpdGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZmQgPSB0aGlzLmZkXG4gIHRoaXMub25jZSgncmVhZHknLCAoKSA9PiB7XG4gICAgaWYgKGZkICE9PSB0aGlzLmZkKSB7XG4gICAgICBmcy5jbG9zZShmZCwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIG9wZW5GaWxlKHRoaXMuZmlsZSwgdGhpcylcbn1cblxuU29uaWNCb29tLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5fb3BlbmluZykge1xuICAgIHRoaXMub25jZSgncmVhZHknLCAoKSA9PiB7XG4gICAgICB0aGlzLmVuZCgpXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICh0aGlzLl9lbmRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX2VuZGluZyA9IHRydWVcblxuICBpZiAodGhpcy5fd3JpdGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuX2xlbiA+IDAgJiYgdGhpcy5mZCA+PSAwKSB7XG4gICAgdGhpcy5fYWN0dWFsV3JpdGUoKVxuICB9IGVsc2Uge1xuICAgIGFjdHVhbENsb3NlKHRoaXMpXG4gIH1cbn1cblxuZnVuY3Rpb24gZmx1c2hTeW5jICgpIHtcbiAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb25pY0Jvb20gZGVzdHJveWVkJylcbiAgfVxuXG4gIGlmICh0aGlzLmZkIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc29uaWMgYm9vbSBpcyBub3QgcmVhZHkgeWV0JylcbiAgfVxuXG4gIGlmICghdGhpcy5fd3JpdGluZyAmJiB0aGlzLl93cml0aW5nQnVmLmxlbmd0aCA+IDApIHtcbiAgICB0aGlzLl9idWZzLnVuc2hpZnQodGhpcy5fd3JpdGluZ0J1ZilcbiAgICB0aGlzLl93cml0aW5nQnVmID0gJydcbiAgfVxuXG4gIGxldCBidWYgPSAnJ1xuICB3aGlsZSAodGhpcy5fYnVmcy5sZW5ndGggfHwgYnVmKSB7XG4gICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgYnVmID0gdGhpcy5fYnVmc1swXVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3QgbiA9IGZzLndyaXRlU3luYyh0aGlzLmZkLCBidWYsICd1dGY4JylcbiAgICAgIGNvbnN0IHJlbGVhc2VkQnVmT2JqID0gcmVsZWFzZVdyaXRpbmdCdWYoYnVmLCB0aGlzLl9sZW4sIG4pXG4gICAgICBidWYgPSByZWxlYXNlZEJ1Zk9iai53cml0aW5nQnVmXG4gICAgICB0aGlzLl9sZW4gPSByZWxlYXNlZEJ1Zk9iai5sZW5cbiAgICAgIGlmIChidWYubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgdGhpcy5fYnVmcy5zaGlmdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXRyeSA9IGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJ1xuICAgICAgaWYgKHNob3VsZFJldHJ5ICYmICF0aGlzLnJldHJ5RUFHQUlOKGVyciwgYnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gYnVmLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHNsZWVwKEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIGZzLmZzeW5jU3luYyh0aGlzLmZkKVxuICB9IGNhdGNoIHtcbiAgICAvLyBTa2lwIHRoZSBlcnJvci4gVGhlIGZkIG1pZ2h0IG5vdCBzdXBwb3J0IGZzeW5jLlxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoQnVmZmVyU3luYyAoKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5mZCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbmljIGJvb20gaXMgbm90IHJlYWR5IHlldCcpXG4gIH1cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5fYnVmcy51bnNoaWZ0KFt0aGlzLl93cml0aW5nQnVmXSlcbiAgICB0aGlzLl93cml0aW5nQnVmID0ga0VtcHR5QnVmZmVyXG4gIH1cblxuICBsZXQgYnVmID0ga0VtcHR5QnVmZmVyXG4gIHdoaWxlICh0aGlzLl9idWZzLmxlbmd0aCB8fCBidWYubGVuZ3RoKSB7XG4gICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgYnVmID0gbWVyZ2VCdWYodGhpcy5fYnVmc1swXSwgdGhpcy5fbGVuc1swXSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG4gPSBmcy53cml0ZVN5bmModGhpcy5mZCwgYnVmKVxuICAgICAgYnVmID0gYnVmLnN1YmFycmF5KG4pXG4gICAgICB0aGlzLl9sZW4gPSBNYXRoLm1heCh0aGlzLl9sZW4gLSBuLCAwKVxuICAgICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLl9idWZzLnNoaWZ0KClcbiAgICAgICAgdGhpcy5fbGVucy5zaGlmdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXRyeSA9IGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJ1xuICAgICAgaWYgKHNob3VsZFJldHJ5ICYmICF0aGlzLnJldHJ5RUFHQUlOKGVyciwgYnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gYnVmLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHNsZWVwKEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICB9XG4gIH1cbn1cblxuU29uaWNCb29tLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBhY3R1YWxDbG9zZSh0aGlzKVxufVxuXG5mdW5jdGlvbiBhY3R1YWxXcml0ZSAoKSB7XG4gIGNvbnN0IHJlbGVhc2UgPSB0aGlzLnJlbGVhc2VcbiAgdGhpcy5fd3JpdGluZyA9IHRydWVcbiAgdGhpcy5fd3JpdGluZ0J1ZiA9IHRoaXMuX3dyaXRpbmdCdWYgfHwgdGhpcy5fYnVmcy5zaGlmdCgpIHx8ICcnXG5cbiAgaWYgKHRoaXMuc3luYykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB3cml0dGVuID0gZnMud3JpdGVTeW5jKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsICd1dGY4JylcbiAgICAgIHJlbGVhc2UobnVsbCwgd3JpdHRlbilcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlbGVhc2UoZXJyKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmcy53cml0ZSh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmLCAndXRmOCcsIHJlbGVhc2UpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWN0dWFsV3JpdGVCdWZmZXIgKCkge1xuICBjb25zdCByZWxlYXNlID0gdGhpcy5yZWxlYXNlXG4gIHRoaXMuX3dyaXRpbmcgPSB0cnVlXG4gIHRoaXMuX3dyaXRpbmdCdWYgPSB0aGlzLl93cml0aW5nQnVmLmxlbmd0aCA/IHRoaXMuX3dyaXRpbmdCdWYgOiBtZXJnZUJ1Zih0aGlzLl9idWZzLnNoaWZ0KCksIHRoaXMuX2xlbnMuc2hpZnQoKSlcblxuICBpZiAodGhpcy5zeW5jKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHdyaXR0ZW4gPSBmcy53cml0ZVN5bmModGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZilcbiAgICAgIHJlbGVhc2UobnVsbCwgd3JpdHRlbilcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlbGVhc2UoZXJyKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBmcy53cml0ZSB3aWxsIG5lZWQgdG8gY29weSBzdHJpbmcgdG8gYnVmZmVyIGFueXdheSBzb1xuICAgIC8vIHdlIGRvIGl0IGhlcmUgdG8gYXZvaWQgdGhlIG92ZXJoZWFkIG9mIGNhbGN1bGF0aW5nIHRoZSBidWZmZXIgc2l6ZVxuICAgIC8vIGluIHJlbGVhc2VXcml0aW5nQnVmLlxuICAgIGlmIChrQ29weUJ1ZmZlcikge1xuICAgICAgdGhpcy5fd3JpdGluZ0J1ZiA9IEJ1ZmZlci5mcm9tKHRoaXMuX3dyaXRpbmdCdWYpXG4gICAgfVxuICAgIGZzLndyaXRlKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsIHJlbGVhc2UpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWN0dWFsQ2xvc2UgKHNvbmljKSB7XG4gIGlmIChzb25pYy5mZCA9PT0gLTEpIHtcbiAgICBzb25pYy5vbmNlKCdyZWFkeScsIGFjdHVhbENsb3NlLmJpbmQobnVsbCwgc29uaWMpKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHNvbmljLl9wZXJpb2RpY0ZsdXNoVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoc29uaWMuX3BlcmlvZGljRmx1c2hUaW1lcilcbiAgfVxuXG4gIHNvbmljLmRlc3Ryb3llZCA9IHRydWVcbiAgc29uaWMuX2J1ZnMgPSBbXVxuICBzb25pYy5fbGVucyA9IFtdXG5cbiAgYXNzZXJ0KHR5cGVvZiBzb25pYy5mZCA9PT0gJ251bWJlcicsIGBzb25pYy5mZCBtdXN0IGJlIGEgbnVtYmVyLCBnb3QgJHt0eXBlb2Ygc29uaWMuZmR9YClcbiAgdHJ5IHtcbiAgICBmcy5mc3luYyhzb25pYy5mZCwgY2xvc2VXcmFwcGVkKVxuICB9IGNhdGNoIHtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlV3JhcHBlZCAoKSB7XG4gICAgLy8gV2Ugc2tpcCBlcnJvcnMgaW4gZnN5bmNcblxuICAgIGlmIChzb25pYy5mZCAhPT0gMSAmJiBzb25pYy5mZCAhPT0gMikge1xuICAgICAgZnMuY2xvc2Uoc29uaWMuZmQsIGRvbmUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbmUoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRvbmUgKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHNvbmljLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHNvbmljLl9lbmRpbmcgJiYgIXNvbmljLl93cml0aW5nKSB7XG4gICAgICBzb25pYy5lbWl0KCdmaW5pc2gnKVxuICAgIH1cbiAgICBzb25pYy5lbWl0KCdjbG9zZScpXG4gIH1cbn1cblxuLyoqXG4gKiBUaGVzZSBleHBvcnQgY29uZmlndXJhdGlvbnMgZW5hYmxlIEpTIGFuZCBUUyBkZXZlbG9wZXJzXG4gKiB0byBjb25zdW1lciBTb25pY0Jvb20gaW4gd2hhdGV2ZXIgd2F5IGJlc3Qgc3VpdHMgdGhlaXIgbmVlZHMuXG4gKiBTb21lIGV4YW1wbGVzIG9mIHN1cHBvcnRlZCBpbXBvcnQgc3ludGF4IGluY2x1ZGVzOlxuICogLSBgY29uc3QgU29uaWNCb29tID0gcmVxdWlyZSgnU29uaWNCb29tJylgXG4gKiAtIGBjb25zdCB7IFNvbmljQm9vbSB9ID0gcmVxdWlyZSgnU29uaWNCb29tJylgXG4gKiAtIGBpbXBvcnQgKiBhcyBTb25pY0Jvb20gZnJvbSAnU29uaWNCb29tJ2BcbiAqIC0gYGltcG9ydCB7IFNvbmljQm9vbSB9IGZyb20gJ1NvbmljQm9vbSdgXG4gKiAtIGBpbXBvcnQgU29uaWNCb29tIGZyb20gJ1NvbmljQm9vbSdgXG4gKi9cblNvbmljQm9vbS5Tb25pY0Jvb20gPSBTb25pY0Jvb21cblNvbmljQm9vbS5kZWZhdWx0ID0gU29uaWNCb29tXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmljQm9vbVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCByZWZzID0ge1xuICBleGl0OiBbXSxcbiAgYmVmb3JlRXhpdDogW11cbn1cbmNvbnN0IGZ1bmN0aW9ucyA9IHtcbiAgZXhpdDogb25FeGl0LFxuICBiZWZvcmVFeGl0OiBvbkJlZm9yZUV4aXRcbn1cblxubGV0IHJlZ2lzdHJ5XG5cbmZ1bmN0aW9uIGVuc3VyZVJlZ2lzdHJ5ICgpIHtcbiAgaWYgKHJlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICByZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShjbGVhcilcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsIChldmVudCkge1xuICBpZiAocmVmc1tldmVudF0ubGVuZ3RoID4gMCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgcHJvY2Vzcy5vbihldmVudCwgZnVuY3Rpb25zW2V2ZW50XSlcbn1cblxuZnVuY3Rpb24gdW5pbnN0YWxsIChldmVudCkge1xuICBpZiAocmVmc1tldmVudF0ubGVuZ3RoID4gMCkge1xuICAgIHJldHVyblxuICB9XG4gIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uc1tldmVudF0pXG4gIGlmIChyZWZzLmV4aXQubGVuZ3RoID09PSAwICYmIHJlZnMuYmVmb3JlRXhpdC5sZW5ndGggPT09IDApIHtcbiAgICByZWdpc3RyeSA9IHVuZGVmaW5lZFxuICB9XG59XG5cbmZ1bmN0aW9uIG9uRXhpdCAoKSB7XG4gIGNhbGxSZWZzKCdleGl0Jylcbn1cblxuZnVuY3Rpb24gb25CZWZvcmVFeGl0ICgpIHtcbiAgY2FsbFJlZnMoJ2JlZm9yZUV4aXQnKVxufVxuXG5mdW5jdGlvbiBjYWxsUmVmcyAoZXZlbnQpIHtcbiAgZm9yIChjb25zdCByZWYgb2YgcmVmc1tldmVudF0pIHtcbiAgICBjb25zdCBvYmogPSByZWYuZGVyZWYoKVxuICAgIGNvbnN0IGZuID0gcmVmLmZuXG5cbiAgICAvLyBUaGlzIHNob3VsZCBhbHdheXMgaGFwcGVuLCBob3dldmVyIEdDIGlzXG4gICAgLy8gdW5kZXRlcm1pbmlzdGljIHNvIGl0IG1pZ2h0IG5vdCBoYXBwZW4uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAob2JqICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZuKG9iaiwgZXZlbnQpXG4gICAgfVxuICB9XG4gIHJlZnNbZXZlbnRdID0gW11cbn1cblxuZnVuY3Rpb24gY2xlYXIgKHJlZikge1xuICBmb3IgKGNvbnN0IGV2ZW50IG9mIFsnZXhpdCcsICdiZWZvcmVFeGl0J10pIHtcbiAgICBjb25zdCBpbmRleCA9IHJlZnNbZXZlbnRdLmluZGV4T2YocmVmKVxuICAgIHJlZnNbZXZlbnRdLnNwbGljZShpbmRleCwgaW5kZXggKyAxKVxuICAgIHVuaW5zdGFsbChldmVudClcbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVnaXN0ZXIgKGV2ZW50LCBvYmosIGZuKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGhlIG9iamVjdCBjYW5cXCd0IGJlIHVuZGVmaW5lZCcpXG4gIH1cbiAgaW5zdGFsbChldmVudClcbiAgY29uc3QgcmVmID0gbmV3IFdlYWtSZWYob2JqKVxuICByZWYuZm4gPSBmblxuXG4gIGVuc3VyZVJlZ2lzdHJ5KClcbiAgcmVnaXN0cnkucmVnaXN0ZXIob2JqLCByZWYpXG4gIHJlZnNbZXZlbnRdLnB1c2gocmVmKVxufVxuXG5mdW5jdGlvbiByZWdpc3RlciAob2JqLCBmbikge1xuICBfcmVnaXN0ZXIoJ2V4aXQnLCBvYmosIGZuKVxufVxuXG5mdW5jdGlvbiByZWdpc3RlckJlZm9yZUV4aXQgKG9iaiwgZm4pIHtcbiAgX3JlZ2lzdGVyKCdiZWZvcmVFeGl0Jywgb2JqLCBmbilcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3RlciAob2JqKSB7XG4gIGlmIChyZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgcmVnaXN0cnkudW5yZWdpc3RlcihvYmopXG4gIGZvciAoY29uc3QgZXZlbnQgb2YgWydleGl0JywgJ2JlZm9yZUV4aXQnXSkge1xuICAgIHJlZnNbZXZlbnRdID0gcmVmc1tldmVudF0uZmlsdGVyKChyZWYpID0+IHtcbiAgICAgIGNvbnN0IF9vYmogPSByZWYuZGVyZWYoKVxuICAgICAgcmV0dXJuIF9vYmogJiYgX29iaiAhPT0gb2JqXG4gICAgfSlcbiAgICB1bmluc3RhbGwoZXZlbnQpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlZ2lzdGVyLFxuICByZWdpc3RlckJlZm9yZUV4aXQsXG4gIHVucmVnaXN0ZXJcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcInRocmVhZC1zdHJlYW1cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMy4xLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc3RyZWFtaW5nIHdheSB0byBzZW5kIGRhdGEgdG8gYSBOb2RlLmpzIFdvcmtlciBUaHJlYWRcIixcbiAgXCJtYWluXCI6IFwiaW5kZXguanNcIixcbiAgXCJ0eXBlc1wiOiBcImluZGV4LmQudHNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwicmVhbC1yZXF1aXJlXCI6IFwiXjAuMi4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMS4wXCIsXG4gICAgXCJAdHlwZXMvdGFwXCI6IFwiXjE1LjAuMFwiLFxuICAgIFwiQHlhby1wa2cvcGtnXCI6IFwiXjUuMTEuNVwiLFxuICAgIFwiZGVzbVwiOiBcIl4xLjMuMFwiLFxuICAgIFwiZmFzdGJlbmNoXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJodXNreVwiOiBcIl45LjAuNlwiLFxuICAgIFwicGluby1lbGFzdGljc2VhcmNoXCI6IFwiXjguMC4wXCIsXG4gICAgXCJzb25pYy1ib29tXCI6IFwiXjQuMC4xXCIsXG4gICAgXCJzdGFuZGFyZFwiOiBcIl4xNy4wLjBcIixcbiAgICBcInRhcFwiOiBcIl4xNi4yLjBcIixcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOC4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4yXCIsXG4gICAgXCJ3aHktaXMtbm9kZS1ydW5uaW5nXCI6IFwiXjIuMi4yXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidHNjIC0tbm9FbWl0XCIsXG4gICAgXCJ0ZXN0XCI6IFwic3RhbmRhcmQgJiYgbnBtIHJ1biBidWlsZCAmJiBucG0gcnVuIHRyYW5zcGlsZSAmJiB0YXAgXFxcInRlc3QvKiovKi50ZXN0Lipqc1xcXCIgJiYgdGFwIC0tdHMgdGVzdC8qLnRlc3QuKnRzXCIsXG4gICAgXCJ0ZXN0OmNpXCI6IFwic3RhbmRhcmQgJiYgbnBtIHJ1biB0cmFuc3BpbGUgJiYgbnBtIHJ1biB0ZXN0OmNpOmpzICYmIG5wbSBydW4gdGVzdDpjaTp0c1wiLFxuICAgIFwidGVzdDpjaTpqc1wiOiBcInRhcCAtLW5vLWNoZWNrLWNvdmVyYWdlIC0tdGltZW91dD0xMjAgLS1jb3ZlcmFnZS1yZXBvcnQ9bGNvdm9ubHkgXFxcInRlc3QvKiovKi50ZXN0Lipqc1xcXCJcIixcbiAgICBcInRlc3Q6Y2k6dHNcIjogXCJ0YXAgLS10cyAtLW5vLWNoZWNrLWNvdmVyYWdlIC0tY292ZXJhZ2UtcmVwb3J0PWxjb3Zvbmx5IFxcXCJ0ZXN0LyoqLyoudGVzdC4qdHNcXFwiXCIsXG4gICAgXCJ0ZXN0Onlhcm5cIjogXCJucG0gcnVuIHRyYW5zcGlsZSAmJiB0YXAgXFxcInRlc3QvKiovKi50ZXN0LmpzXFxcIiAtLW5vLWNoZWNrLWNvdmVyYWdlXCIsXG4gICAgXCJ0cmFuc3BpbGVcIjogXCJzaCAuL3Rlc3QvdHMvdHJhbnNwaWxlLnNoXCIsXG4gICAgXCJwcmVwYXJlXCI6IFwiaHVza3kgaW5zdGFsbFwiXG4gIH0sXG4gIFwic3RhbmRhcmRcIjoge1xuICAgIFwiaWdub3JlXCI6IFtcbiAgICAgIFwidGVzdC90cy8qKi8qXCIsXG4gICAgICBcInRlc3Qvc3ludGF4LWVycm9yLm1qc1wiXG4gICAgXVxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9tY29sbGluYS90aHJlYWQtc3RyZWFtLmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwid29ya2VyXCIsXG4gICAgXCJ0aHJlYWRcIixcbiAgICBcInRocmVhZHNcIixcbiAgICBcInN0cmVhbVwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IFwiTWF0dGVvIENvbGxpbmEgPGhlbGxvQG1hdHRlb2NvbGxpbmEuY29tPlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9tY29sbGluYS90aHJlYWQtc3RyZWFtL2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vbWNvbGxpbmEvdGhyZWFkLXN0cmVhbSNyZWFkbWVcIlxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBNQVhfVElNRU9VVCA9IDEwMDBcblxuZnVuY3Rpb24gd2FpdCAoc3RhdGUsIGluZGV4LCBleHBlY3RlZCwgdGltZW91dCwgZG9uZSkge1xuICBjb25zdCBtYXggPSBEYXRlLm5vdygpICsgdGltZW91dFxuICBsZXQgY3VycmVudCA9IEF0b21pY3MubG9hZChzdGF0ZSwgaW5kZXgpXG4gIGlmIChjdXJyZW50ID09PSBleHBlY3RlZCkge1xuICAgIGRvbmUobnVsbCwgJ29rJylcbiAgICByZXR1cm5cbiAgfVxuICBsZXQgcHJpb3IgPSBjdXJyZW50XG4gIGNvbnN0IGNoZWNrID0gKGJhY2tvZmYpID0+IHtcbiAgICBpZiAoRGF0ZS5ub3coKSA+IG1heCkge1xuICAgICAgZG9uZShudWxsLCAndGltZWQtb3V0JylcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByaW9yID0gY3VycmVudFxuICAgICAgICBjdXJyZW50ID0gQXRvbWljcy5sb2FkKHN0YXRlLCBpbmRleClcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHByaW9yKSB7XG4gICAgICAgICAgY2hlY2soYmFja29mZiA+PSBNQVhfVElNRU9VVCA/IE1BWF9USU1FT1VUIDogYmFja29mZiAqIDIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgPT09IGV4cGVjdGVkKSBkb25lKG51bGwsICdvaycpXG4gICAgICAgICAgZWxzZSBkb25lKG51bGwsICdub3QtZXF1YWwnKVxuICAgICAgICB9XG4gICAgICB9LCBiYWNrb2ZmKVxuICAgIH1cbiAgfVxuICBjaGVjaygxKVxufVxuXG4vLyBsZXQgd2FpdERpZmZDb3VudCA9IDBcbmZ1bmN0aW9uIHdhaXREaWZmIChzdGF0ZSwgaW5kZXgsIGV4cGVjdGVkLCB0aW1lb3V0LCBkb25lKSB7XG4gIC8vIGNvbnN0IGlkID0gd2FpdERpZmZDb3VudCsrXG4gIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKGA+Pj4gd2FpdERpZmYgJHtpZH1gKVxuICBjb25zdCBtYXggPSBEYXRlLm5vdygpICsgdGltZW91dFxuICBsZXQgY3VycmVudCA9IEF0b21pY3MubG9hZChzdGF0ZSwgaW5kZXgpXG4gIGlmIChjdXJyZW50ICE9PSBleHBlY3RlZCkge1xuICAgIGRvbmUobnVsbCwgJ29rJylcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBjaGVjayA9IChiYWNrb2ZmKSA9PiB7XG4gICAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoYCR7aWR9ICR7aW5kZXh9IGN1cnJlbnQgJHtjdXJyZW50fSBleHBlY3RlZCAke2V4cGVjdGVkfWApXG4gICAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoJycgKyBiYWNrb2ZmKVxuICAgIGlmIChEYXRlLm5vdygpID4gbWF4KSB7XG4gICAgICBkb25lKG51bGwsICd0aW1lZC1vdXQnKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY3VycmVudCA9IEF0b21pY3MubG9hZChzdGF0ZSwgaW5kZXgpXG4gICAgICAgIGlmIChjdXJyZW50ICE9PSBleHBlY3RlZCkge1xuICAgICAgICAgIGRvbmUobnVsbCwgJ29rJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGVjayhiYWNrb2ZmID49IE1BWF9USU1FT1VUID8gTUFYX1RJTUVPVVQgOiBiYWNrb2ZmICogMilcbiAgICAgICAgfVxuICAgICAgfSwgYmFja29mZilcbiAgICB9XG4gIH1cbiAgY2hlY2soMSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHdhaXQsIHdhaXREaWZmIH1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgV1JJVEVfSU5ERVggPSA0XG5jb25zdCBSRUFEX0lOREVYID0gOFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgV1JJVEVfSU5ERVgsXG4gIFJFQURfSU5ERVhcbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgeyB2ZXJzaW9uIH0gPSByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpXG5jb25zdCB7IEV2ZW50RW1pdHRlciB9ID0gcmVxdWlyZSgnZXZlbnRzJylcbmNvbnN0IHsgV29ya2VyIH0gPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpXG5jb25zdCB7IGpvaW4gfSA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgeyBwYXRoVG9GaWxlVVJMIH0gPSByZXF1aXJlKCd1cmwnKVxuY29uc3QgeyB3YWl0IH0gPSByZXF1aXJlKCcuL2xpYi93YWl0JylcbmNvbnN0IHtcbiAgV1JJVEVfSU5ERVgsXG4gIFJFQURfSU5ERVhcbn0gPSByZXF1aXJlKCcuL2xpYi9pbmRleGVzJylcbmNvbnN0IGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5jb25zdCBrSW1wbCA9IFN5bWJvbCgna0ltcGwnKVxuXG4vLyBWOCBsaW1pdCBmb3Igc3RyaW5nIHNpemVcbmNvbnN0IE1BWF9TVFJJTkcgPSBidWZmZXIuY29uc3RhbnRzLk1BWF9TVFJJTkdfTEVOR1RIXG5cbmNsYXNzIEZha2VXZWFrUmVmIHtcbiAgY29uc3RydWN0b3IgKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVxuICB9XG5cbiAgZGVyZWYgKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZVxuICB9XG59XG5cbmNsYXNzIEZha2VGaW5hbGl6YXRpb25SZWdpc3RyeSB7XG4gIHJlZ2lzdGVyICgpIHt9XG5cbiAgdW5yZWdpc3RlciAoKSB7fVxufVxuXG4vLyBDdXJyZW50bHkgdXNpbmcgRmluYWxpemF0aW9uUmVnaXN0cnkgd2l0aCBjb2RlIGNvdmVyYWdlIGJyZWFrcyB0aGUgd29ybGRcbi8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy80OTM0NFxuY29uc3QgRmluYWxpemF0aW9uUmVnaXN0cnkgPSBwcm9jZXNzLmVudi5OT0RFX1Y4X0NPVkVSQUdFID8gRmFrZUZpbmFsaXphdGlvblJlZ2lzdHJ5IDogZ2xvYmFsLkZpbmFsaXphdGlvblJlZ2lzdHJ5IHx8IEZha2VGaW5hbGl6YXRpb25SZWdpc3RyeVxuY29uc3QgV2Vha1JlZiA9IHByb2Nlc3MuZW52Lk5PREVfVjhfQ09WRVJBR0UgPyBGYWtlV2Vha1JlZiA6IGdsb2JhbC5XZWFrUmVmIHx8IEZha2VXZWFrUmVmXG5cbmNvbnN0IHJlZ2lzdHJ5ID0gbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KCh3b3JrZXIpID0+IHtcbiAgaWYgKHdvcmtlci5leGl0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICB3b3JrZXIudGVybWluYXRlKClcbn0pXG5cbmZ1bmN0aW9uIGNyZWF0ZVdvcmtlciAoc3RyZWFtLCBvcHRzKSB7XG4gIGNvbnN0IHsgZmlsZW5hbWUsIHdvcmtlckRhdGEgfSA9IG9wdHNcblxuICBjb25zdCBidW5kbGVyT3ZlcnJpZGVzID0gJ19fYnVuZGxlclBhdGhzT3ZlcnJpZGVzJyBpbiBnbG9iYWxUaGlzID8gZ2xvYmFsVGhpcy5fX2J1bmRsZXJQYXRoc092ZXJyaWRlcyA6IHt9XG4gIGNvbnN0IHRvRXhlY3V0ZSA9IGJ1bmRsZXJPdmVycmlkZXNbJ3RocmVhZC1zdHJlYW0td29ya2VyJ10gfHwgam9pbihfX2Rpcm5hbWUsICdsaWInLCAnd29ya2VyLmpzJylcblxuICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKHRvRXhlY3V0ZSwge1xuICAgIC4uLm9wdHMud29ya2VyT3B0cyxcbiAgICB0cmFja1VubWFuYWdlZEZkczogZmFsc2UsXG4gICAgd29ya2VyRGF0YToge1xuICAgICAgZmlsZW5hbWU6IGZpbGVuYW1lLmluZGV4T2YoJ2ZpbGU6Ly8nKSA9PT0gMFxuICAgICAgICA/IGZpbGVuYW1lXG4gICAgICAgIDogcGF0aFRvRmlsZVVSTChmaWxlbmFtZSkuaHJlZixcbiAgICAgIGRhdGFCdWY6IHN0cmVhbVtrSW1wbF0uZGF0YUJ1ZixcbiAgICAgIHN0YXRlQnVmOiBzdHJlYW1ba0ltcGxdLnN0YXRlQnVmLFxuICAgICAgd29ya2VyRGF0YToge1xuICAgICAgICAkY29udGV4dDoge1xuICAgICAgICAgIHRocmVhZFN0cmVhbVZlcnNpb246IHZlcnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgLi4ud29ya2VyRGF0YVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyBXZSBrZWVwIGEgc3Ryb25nIHJlZmVyZW5jZSBmb3Igbm93LFxuICAvLyB3ZSBuZWVkIHRvIHN0YXJ0IHdyaXRpbmcgZmlyc3RcbiAgd29ya2VyLnN0cmVhbSA9IG5ldyBGYWtlV2Vha1JlZihzdHJlYW0pXG5cbiAgd29ya2VyLm9uKCdtZXNzYWdlJywgb25Xb3JrZXJNZXNzYWdlKVxuICB3b3JrZXIub24oJ2V4aXQnLCBvbldvcmtlckV4aXQpXG4gIHJlZ2lzdHJ5LnJlZ2lzdGVyKHN0cmVhbSwgd29ya2VyKVxuXG4gIHJldHVybiB3b3JrZXJcbn1cblxuZnVuY3Rpb24gZHJhaW4gKHN0cmVhbSkge1xuICBhc3NlcnQoIXN0cmVhbVtrSW1wbF0uc3luYylcbiAgaWYgKHN0cmVhbVtrSW1wbF0ubmVlZERyYWluKSB7XG4gICAgc3RyZWFtW2tJbXBsXS5uZWVkRHJhaW4gPSBmYWxzZVxuICAgIHN0cmVhbS5lbWl0KCdkcmFpbicpXG4gIH1cbn1cblxuZnVuY3Rpb24gbmV4dEZsdXNoIChzdHJlYW0pIHtcbiAgY29uc3Qgd3JpdGVJbmRleCA9IEF0b21pY3MubG9hZChzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWClcbiAgbGV0IGxlZnRvdmVyID0gc3RyZWFtW2tJbXBsXS5kYXRhLmxlbmd0aCAtIHdyaXRlSW5kZXhcblxuICBpZiAobGVmdG92ZXIgPiAwKSB7XG4gICAgaWYgKHN0cmVhbVtrSW1wbF0uYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3RyZWFtW2tJbXBsXS5mbHVzaGluZyA9IGZhbHNlXG5cbiAgICAgIGlmIChzdHJlYW1ba0ltcGxdLmVuZGluZykge1xuICAgICAgICBlbmQoc3RyZWFtKVxuICAgICAgfSBlbHNlIGlmIChzdHJlYW1ba0ltcGxdLm5lZWREcmFpbikge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGRyYWluLCBzdHJlYW0pXG4gICAgICB9XG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB0b1dyaXRlID0gc3RyZWFtW2tJbXBsXS5idWYuc2xpY2UoMCwgbGVmdG92ZXIpXG4gICAgbGV0IHRvV3JpdGVCeXRlcyA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHRvV3JpdGUpXG4gICAgaWYgKHRvV3JpdGVCeXRlcyA8PSBsZWZ0b3Zlcikge1xuICAgICAgc3RyZWFtW2tJbXBsXS5idWYgPSBzdHJlYW1ba0ltcGxdLmJ1Zi5zbGljZShsZWZ0b3ZlcilcbiAgICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKCd3cml0aW5nICcgKyB0b1dyaXRlLmxlbmd0aClcbiAgICAgIHdyaXRlKHN0cmVhbSwgdG9Xcml0ZSwgbmV4dEZsdXNoLmJpbmQobnVsbCwgc3RyZWFtKSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbXVsdGktYnl0ZSB1dGYtOFxuICAgICAgc3RyZWFtLmZsdXNoKCgpID0+IHtcbiAgICAgICAgLy8gZXJyIGlzIGFscmVhZHkgaGFuZGxlZCBpbiBmbHVzaCgpXG4gICAgICAgIGlmIChzdHJlYW0uZGVzdHJveWVkKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgsIDApXG4gICAgICAgIEF0b21pY3Muc3RvcmUoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgsIDApXG5cbiAgICAgICAgLy8gRmluZCBhIHRvV3JpdGUgbGVuZ3RoIHRoYXQgZml0cyB0aGUgYnVmZmVyXG4gICAgICAgIC8vIGl0IG11c3QgZXhpc3RzIGFzIHRoZSBidWZmZXIgaXMgYXQgbGVhc3QgNCBieXRlcyBsZW5ndGhcbiAgICAgICAgLy8gYW5kIHRoZSBtYXggdXRmLTggbGVuZ3RoIGZvciBhIGNoYXIgaXMgNCBieXRlcy5cbiAgICAgICAgd2hpbGUgKHRvV3JpdGVCeXRlcyA+IHN0cmVhbVtrSW1wbF0uZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICBsZWZ0b3ZlciA9IGxlZnRvdmVyIC8gMlxuICAgICAgICAgIHRvV3JpdGUgPSBzdHJlYW1ba0ltcGxdLmJ1Zi5zbGljZSgwLCBsZWZ0b3ZlcilcbiAgICAgICAgICB0b1dyaXRlQnl0ZXMgPSBCdWZmZXIuYnl0ZUxlbmd0aCh0b1dyaXRlKVxuICAgICAgICB9XG4gICAgICAgIHN0cmVhbVtrSW1wbF0uYnVmID0gc3RyZWFtW2tJbXBsXS5idWYuc2xpY2UobGVmdG92ZXIpXG4gICAgICAgIHdyaXRlKHN0cmVhbSwgdG9Xcml0ZSwgbmV4dEZsdXNoLmJpbmQobnVsbCwgc3RyZWFtKSlcbiAgICAgIH0pXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlZnRvdmVyID09PSAwKSB7XG4gICAgaWYgKHdyaXRlSW5kZXggPT09IDAgJiYgc3RyZWFtW2tJbXBsXS5idWYubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyB3ZSBoYWQgYSBmbHVzaFN5bmMgaW4gdGhlIG1lYW53aGlsZVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHN0cmVhbS5mbHVzaCgoKSA9PiB7XG4gICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgsIDApXG4gICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYLCAwKVxuICAgICAgbmV4dEZsdXNoKHN0cmVhbSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlblxuICAgIGRlc3Ryb3koc3RyZWFtLCBuZXcgRXJyb3IoJ292ZXJ3cml0dGVuJykpXG4gIH1cbn1cblxuZnVuY3Rpb24gb25Xb3JrZXJNZXNzYWdlIChtc2cpIHtcbiAgY29uc3Qgc3RyZWFtID0gdGhpcy5zdHJlYW0uZGVyZWYoKVxuICBpZiAoc3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmV4aXRlZCA9IHRydWVcbiAgICAvLyBUZXJtaW5hdGUgdGhlIHdvcmtlci5cbiAgICB0aGlzLnRlcm1pbmF0ZSgpXG4gICAgcmV0dXJuXG4gIH1cblxuICBzd2l0Y2ggKG1zZy5jb2RlKSB7XG4gICAgY2FzZSAnUkVBRFknOlxuICAgICAgLy8gUmVwbGFjZSB0aGUgRmFrZVdlYWtSZWYgd2l0aCBhXG4gICAgICAvLyBwcm9wZXIgb25lLlxuICAgICAgdGhpcy5zdHJlYW0gPSBuZXcgV2Vha1JlZihzdHJlYW0pXG5cbiAgICAgIHN0cmVhbS5mbHVzaCgoKSA9PiB7XG4gICAgICAgIHN0cmVhbVtrSW1wbF0ucmVhZHkgPSB0cnVlXG4gICAgICAgIHN0cmVhbS5lbWl0KCdyZWFkeScpXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdFUlJPUic6XG4gICAgICBkZXN0cm95KHN0cmVhbSwgbXNnLmVycilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnRVZFTlQnOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobXNnLmFyZ3MpKSB7XG4gICAgICAgIHN0cmVhbS5lbWl0KG1zZy5uYW1lLCAuLi5tc2cuYXJncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbS5lbWl0KG1zZy5uYW1lLCBtc2cuYXJncylcbiAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnV0FSTklORyc6XG4gICAgICBwcm9jZXNzLmVtaXRXYXJuaW5nKG1zZy5lcnIpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBkZXN0cm95KHN0cmVhbSwgbmV3IEVycm9yKCd0aGlzIHNob3VsZCBub3QgaGFwcGVuOiAnICsgbXNnLmNvZGUpKVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uV29ya2VyRXhpdCAoY29kZSkge1xuICBjb25zdCBzdHJlYW0gPSB0aGlzLnN0cmVhbS5kZXJlZigpXG4gIGlmIChzdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE5vdGhpbmcgdG8gZG8sIHRoZSB3b3JrZXIgYWxyZWFkeSBleGl0XG4gICAgcmV0dXJuXG4gIH1cbiAgcmVnaXN0cnkudW5yZWdpc3RlcihzdHJlYW0pXG4gIHN0cmVhbS53b3JrZXIuZXhpdGVkID0gdHJ1ZVxuICBzdHJlYW0ud29ya2VyLm9mZignZXhpdCcsIG9uV29ya2VyRXhpdClcbiAgZGVzdHJveShzdHJlYW0sIGNvZGUgIT09IDAgPyBuZXcgRXJyb3IoJ3RoZSB3b3JrZXIgdGhyZWFkIGV4aXRlZCcpIDogbnVsbClcbn1cblxuY2xhc3MgVGhyZWFkU3RyZWFtIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIHN1cGVyKClcblxuICAgIGlmIChvcHRzLmJ1ZmZlclNpemUgPCA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2J1ZmZlclNpemUgbXVzdCBhdCBsZWFzdCBmaXQgYSA0LWJ5dGUgdXRmLTggY2hhcicpXG4gICAgfVxuXG4gICAgdGhpc1trSW1wbF0gPSB7fVxuICAgIHRoaXNba0ltcGxdLnN0YXRlQnVmID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyKDEyOClcbiAgICB0aGlzW2tJbXBsXS5zdGF0ZSA9IG5ldyBJbnQzMkFycmF5KHRoaXNba0ltcGxdLnN0YXRlQnVmKVxuICAgIHRoaXNba0ltcGxdLmRhdGFCdWYgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIob3B0cy5idWZmZXJTaXplIHx8IDQgKiAxMDI0ICogMTAyNClcbiAgICB0aGlzW2tJbXBsXS5kYXRhID0gQnVmZmVyLmZyb20odGhpc1trSW1wbF0uZGF0YUJ1ZilcbiAgICB0aGlzW2tJbXBsXS5zeW5jID0gb3B0cy5zeW5jIHx8IGZhbHNlXG4gICAgdGhpc1trSW1wbF0uZW5kaW5nID0gZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5lbmRlZCA9IGZhbHNlXG4gICAgdGhpc1trSW1wbF0ubmVlZERyYWluID0gZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5kZXN0cm95ZWQgPSBmYWxzZVxuICAgIHRoaXNba0ltcGxdLmZsdXNoaW5nID0gZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5yZWFkeSA9IGZhbHNlXG4gICAgdGhpc1trSW1wbF0uZmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXNba0ltcGxdLmVycm9yZWQgPSBudWxsXG4gICAgdGhpc1trSW1wbF0uY2xvc2VkID0gZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5idWYgPSAnJ1xuXG4gICAgLy8gVE9ETyAoZml4KTogTWFrZSBwcml2YXRlP1xuICAgIHRoaXMud29ya2VyID0gY3JlYXRlV29ya2VyKHRoaXMsIG9wdHMpIC8vIFRPRE8gKGZpeCk6IG1ha2UgcHJpdmF0ZVxuICAgIHRoaXMub24oJ21lc3NhZ2UnLCAobWVzc2FnZSwgdHJhbnNmZXJMaXN0KSA9PiB7XG4gICAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlLCB0cmFuc2Zlckxpc3QpXG4gICAgfSlcbiAgfVxuXG4gIHdyaXRlIChkYXRhKSB7XG4gICAgaWYgKHRoaXNba0ltcGxdLmRlc3Ryb3llZCkge1xuICAgICAgZXJyb3IodGhpcywgbmV3IEVycm9yKCd0aGUgd29ya2VyIGhhcyBleGl0ZWQnKSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzW2tJbXBsXS5lbmRpbmcpIHtcbiAgICAgIGVycm9yKHRoaXMsIG5ldyBFcnJvcigndGhlIHdvcmtlciBpcyBlbmRpbmcnKSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzW2tJbXBsXS5mbHVzaGluZyAmJiB0aGlzW2tJbXBsXS5idWYubGVuZ3RoICsgZGF0YS5sZW5ndGggPj0gTUFYX1NUUklORykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgd3JpdGVTeW5jKHRoaXMpXG4gICAgICAgIHRoaXNba0ltcGxdLmZsdXNoaW5nID0gdHJ1ZVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGRlc3Ryb3kodGhpcywgZXJyKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzW2tJbXBsXS5idWYgKz0gZGF0YVxuXG4gICAgaWYgKHRoaXNba0ltcGxdLnN5bmMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHdyaXRlU3luYyh0aGlzKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGRlc3Ryb3kodGhpcywgZXJyKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXNba0ltcGxdLmZsdXNoaW5nKSB7XG4gICAgICB0aGlzW2tJbXBsXS5mbHVzaGluZyA9IHRydWVcbiAgICAgIHNldEltbWVkaWF0ZShuZXh0Rmx1c2gsIHRoaXMpXG4gICAgfVxuXG4gICAgdGhpc1trSW1wbF0ubmVlZERyYWluID0gdGhpc1trSW1wbF0uZGF0YS5sZW5ndGggLSB0aGlzW2tJbXBsXS5idWYubGVuZ3RoIC0gQXRvbWljcy5sb2FkKHRoaXNba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWCkgPD0gMFxuICAgIHJldHVybiAhdGhpc1trSW1wbF0ubmVlZERyYWluXG4gIH1cblxuICBlbmQgKCkge1xuICAgIGlmICh0aGlzW2tJbXBsXS5kZXN0cm95ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXNba0ltcGxdLmVuZGluZyA9IHRydWVcbiAgICBlbmQodGhpcylcbiAgfVxuXG4gIGZsdXNoIChjYikge1xuICAgIGlmICh0aGlzW2tJbXBsXS5kZXN0cm95ZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhjYiwgbmV3IEVycm9yKCd0aGUgd29ya2VyIGhhcyBleGl0ZWQnKSlcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIFRPRE8gd3JpdGUgYWxsIC5idWZcbiAgICBjb25zdCB3cml0ZUluZGV4ID0gQXRvbWljcy5sb2FkKHRoaXNba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWClcbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZyhgKGZsdXNoKSByZWFkSW5kZXggKCR7QXRvbWljcy5sb2FkKHRoaXMuc3RhdGUsIFJFQURfSU5ERVgpfSkgd3JpdGVJbmRleCAoJHtBdG9taWNzLmxvYWQodGhpcy5zdGF0ZSwgV1JJVEVfSU5ERVgpfSlgKVxuICAgIHdhaXQodGhpc1trSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgsIHdyaXRlSW5kZXgsIEluZmluaXR5LCAoZXJyLCByZXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZGVzdHJveSh0aGlzLCBlcnIpXG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soY2IsIGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAocmVzID09PSAnbm90LWVxdWFsJykge1xuICAgICAgICAvLyBUT0RPIGhhbmRsZSBkZWFkbG9ja1xuICAgICAgICB0aGlzLmZsdXNoKGNiKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY2IpXG4gICAgfSlcbiAgfVxuXG4gIGZsdXNoU3luYyAoKSB7XG4gICAgaWYgKHRoaXNba0ltcGxdLmRlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgd3JpdGVTeW5jKHRoaXMpXG4gICAgZmx1c2hTeW5jKHRoaXMpXG4gIH1cblxuICB1bnJlZiAoKSB7XG4gICAgdGhpcy53b3JrZXIudW5yZWYoKVxuICB9XG5cbiAgcmVmICgpIHtcbiAgICB0aGlzLndvcmtlci5yZWYoKVxuICB9XG5cbiAgZ2V0IHJlYWR5ICgpIHtcbiAgICByZXR1cm4gdGhpc1trSW1wbF0ucmVhZHlcbiAgfVxuXG4gIGdldCBkZXN0cm95ZWQgKCkge1xuICAgIHJldHVybiB0aGlzW2tJbXBsXS5kZXN0cm95ZWRcbiAgfVxuXG4gIGdldCBjbG9zZWQgKCkge1xuICAgIHJldHVybiB0aGlzW2tJbXBsXS5jbG9zZWRcbiAgfVxuXG4gIGdldCB3cml0YWJsZSAoKSB7XG4gICAgcmV0dXJuICF0aGlzW2tJbXBsXS5kZXN0cm95ZWQgJiYgIXRoaXNba0ltcGxdLmVuZGluZ1xuICB9XG5cbiAgZ2V0IHdyaXRhYmxlRW5kZWQgKCkge1xuICAgIHJldHVybiB0aGlzW2tJbXBsXS5lbmRpbmdcbiAgfVxuXG4gIGdldCB3cml0YWJsZUZpbmlzaGVkICgpIHtcbiAgICByZXR1cm4gdGhpc1trSW1wbF0uZmluaXNoZWRcbiAgfVxuXG4gIGdldCB3cml0YWJsZU5lZWREcmFpbiAoKSB7XG4gICAgcmV0dXJuIHRoaXNba0ltcGxdLm5lZWREcmFpblxuICB9XG5cbiAgZ2V0IHdyaXRhYmxlT2JqZWN0TW9kZSAoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBnZXQgd3JpdGFibGVFcnJvcmVkICgpIHtcbiAgICByZXR1cm4gdGhpc1trSW1wbF0uZXJyb3JlZFxuICB9XG59XG5cbmZ1bmN0aW9uIGVycm9yIChzdHJlYW0sIGVycikge1xuICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVycilcbiAgfSlcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoc3RyZWFtLCBlcnIpIHtcbiAgaWYgKHN0cmVhbVtrSW1wbF0uZGVzdHJveWVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgc3RyZWFtW2tJbXBsXS5kZXN0cm95ZWQgPSB0cnVlXG5cbiAgaWYgKGVycikge1xuICAgIHN0cmVhbVtrSW1wbF0uZXJyb3JlZCA9IGVyclxuICAgIGVycm9yKHN0cmVhbSwgZXJyKVxuICB9XG5cbiAgaWYgKCFzdHJlYW0ud29ya2VyLmV4aXRlZCkge1xuICAgIHN0cmVhbS53b3JrZXIudGVybWluYXRlKClcbiAgICAgIC5jYXRjaCgoKSA9PiB7fSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc3RyZWFtW2tJbXBsXS5jbG9zZWQgPSB0cnVlXG4gICAgICAgIHN0cmVhbS5lbWl0KCdjbG9zZScpXG4gICAgICB9KVxuICB9IGVsc2Uge1xuICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICBzdHJlYW1ba0ltcGxdLmNsb3NlZCA9IHRydWVcbiAgICAgIHN0cmVhbS5lbWl0KCdjbG9zZScpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiB3cml0ZSAoc3RyZWFtLCBkYXRhLCBjYikge1xuICAvLyBkYXRhIGlzIHNtYWxsZXIgdGhhbiB0aGUgc2hhcmVkIGJ1ZmZlciBsZW5ndGhcbiAgY29uc3QgY3VycmVudCA9IEF0b21pY3MubG9hZChzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWClcbiAgY29uc3QgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSlcbiAgc3RyZWFtW2tJbXBsXS5kYXRhLndyaXRlKGRhdGEsIGN1cnJlbnQpXG4gIEF0b21pY3Muc3RvcmUoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgsIGN1cnJlbnQgKyBsZW5ndGgpXG4gIEF0b21pY3Mubm90aWZ5KHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKVxuICBjYigpXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGVuZCAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1ba0ltcGxdLmVuZGVkIHx8ICFzdHJlYW1ba0ltcGxdLmVuZGluZyB8fCBzdHJlYW1ba0ltcGxdLmZsdXNoaW5nKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgc3RyZWFtW2tJbXBsXS5lbmRlZCA9IHRydWVcblxuICB0cnkge1xuICAgIHN0cmVhbS5mbHVzaFN5bmMoKVxuXG4gICAgbGV0IHJlYWRJbmRleCA9IEF0b21pY3MubG9hZChzdHJlYW1ba0ltcGxdLnN0YXRlLCBSRUFEX0lOREVYKVxuXG4gICAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoJ3dyaXRpbmcgaW5kZXgnKVxuICAgIEF0b21pY3Muc3RvcmUoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgsIC0xKVxuICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKGAoZW5kKSByZWFkSW5kZXggKCR7QXRvbWljcy5sb2FkKHN0cmVhbS5zdGF0ZSwgUkVBRF9JTkRFWCl9KSB3cml0ZUluZGV4ICgke0F0b21pY3MubG9hZChzdHJlYW0uc3RhdGUsIFdSSVRFX0lOREVYKX0pYClcbiAgICBBdG9taWNzLm5vdGlmeShzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWClcblxuICAgIC8vIFdhaXQgZm9yIHRoZSBwcm9jZXNzIHRvIGNvbXBsZXRlXG4gICAgbGV0IHNwaW5zID0gMFxuICAgIHdoaWxlIChyZWFkSW5kZXggIT09IC0xKSB7XG4gICAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZyhgcmVhZCA9ICR7cmVhZH1gKVxuICAgICAgQXRvbWljcy53YWl0KHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgsIHJlYWRJbmRleCwgMTAwMClcbiAgICAgIHJlYWRJbmRleCA9IEF0b21pY3MubG9hZChzdHJlYW1ba0ltcGxdLnN0YXRlLCBSRUFEX0lOREVYKVxuXG4gICAgICBpZiAocmVhZEluZGV4ID09PSAtMikge1xuICAgICAgICBkZXN0cm95KHN0cmVhbSwgbmV3IEVycm9yKCdlbmQoKSBmYWlsZWQnKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICgrK3NwaW5zID09PSAxMCkge1xuICAgICAgICBkZXN0cm95KHN0cmVhbSwgbmV3IEVycm9yKCdlbmQoKSB0b29rIHRvbyBsb25nICgxMHMpJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgc3RyZWFtW2tJbXBsXS5maW5pc2hlZCA9IHRydWVcbiAgICAgIHN0cmVhbS5lbWl0KCdmaW5pc2gnKVxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlc3Ryb3koc3RyZWFtLCBlcnIpXG4gIH1cbiAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoJ2VuZCBmaW5pc2hlZC4uLicpXG59XG5cbmZ1bmN0aW9uIHdyaXRlU3luYyAoc3RyZWFtKSB7XG4gIGNvbnN0IGNiID0gKCkgPT4ge1xuICAgIGlmIChzdHJlYW1ba0ltcGxdLmVuZGluZykge1xuICAgICAgZW5kKHN0cmVhbSlcbiAgICB9IGVsc2UgaWYgKHN0cmVhbVtrSW1wbF0ubmVlZERyYWluKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGRyYWluLCBzdHJlYW0pXG4gICAgfVxuICB9XG4gIHN0cmVhbVtrSW1wbF0uZmx1c2hpbmcgPSBmYWxzZVxuXG4gIHdoaWxlIChzdHJlYW1ba0ltcGxdLmJ1Zi5sZW5ndGggIT09IDApIHtcbiAgICBjb25zdCB3cml0ZUluZGV4ID0gQXRvbWljcy5sb2FkKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKVxuICAgIGxldCBsZWZ0b3ZlciA9IHN0cmVhbVtrSW1wbF0uZGF0YS5sZW5ndGggLSB3cml0ZUluZGV4XG4gICAgaWYgKGxlZnRvdmVyID09PSAwKSB7XG4gICAgICBmbHVzaFN5bmMoc3RyZWFtKVxuICAgICAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBSRUFEX0lOREVYLCAwKVxuICAgICAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWCwgMClcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIGlmIChsZWZ0b3ZlciA8IDApIHtcbiAgICAgIC8vIHN0cmVhbSBzaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ292ZXJ3cml0dGVuJylcbiAgICB9XG5cbiAgICBsZXQgdG9Xcml0ZSA9IHN0cmVhbVtrSW1wbF0uYnVmLnNsaWNlKDAsIGxlZnRvdmVyKVxuICAgIGxldCB0b1dyaXRlQnl0ZXMgPSBCdWZmZXIuYnl0ZUxlbmd0aCh0b1dyaXRlKVxuICAgIGlmICh0b1dyaXRlQnl0ZXMgPD0gbGVmdG92ZXIpIHtcbiAgICAgIHN0cmVhbVtrSW1wbF0uYnVmID0gc3RyZWFtW2tJbXBsXS5idWYuc2xpY2UobGVmdG92ZXIpXG4gICAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1Zygnd3JpdGluZyAnICsgdG9Xcml0ZS5sZW5ndGgpXG4gICAgICB3cml0ZShzdHJlYW0sIHRvV3JpdGUsIGNiKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtdWx0aS1ieXRlIHV0Zi04XG4gICAgICBmbHVzaFN5bmMoc3RyZWFtKVxuICAgICAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBSRUFEX0lOREVYLCAwKVxuICAgICAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWCwgMClcblxuICAgICAgLy8gRmluZCBhIHRvV3JpdGUgbGVuZ3RoIHRoYXQgZml0cyB0aGUgYnVmZmVyXG4gICAgICAvLyBpdCBtdXN0IGV4aXN0cyBhcyB0aGUgYnVmZmVyIGlzIGF0IGxlYXN0IDQgYnl0ZXMgbGVuZ3RoXG4gICAgICAvLyBhbmQgdGhlIG1heCB1dGYtOCBsZW5ndGggZm9yIGEgY2hhciBpcyA0IGJ5dGVzLlxuICAgICAgd2hpbGUgKHRvV3JpdGVCeXRlcyA+IHN0cmVhbVtrSW1wbF0uYnVmLmxlbmd0aCkge1xuICAgICAgICBsZWZ0b3ZlciA9IGxlZnRvdmVyIC8gMlxuICAgICAgICB0b1dyaXRlID0gc3RyZWFtW2tJbXBsXS5idWYuc2xpY2UoMCwgbGVmdG92ZXIpXG4gICAgICAgIHRvV3JpdGVCeXRlcyA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHRvV3JpdGUpXG4gICAgICB9XG4gICAgICBzdHJlYW1ba0ltcGxdLmJ1ZiA9IHN0cmVhbVtrSW1wbF0uYnVmLnNsaWNlKGxlZnRvdmVyKVxuICAgICAgd3JpdGUoc3RyZWFtLCB0b1dyaXRlLCBjYilcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmx1c2hTeW5jIChzdHJlYW0pIHtcbiAgaWYgKHN0cmVhbVtrSW1wbF0uZmx1c2hpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBmbHVzaCB3aGlsZSBmbHVzaGluZycpXG4gIH1cblxuICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZygnZmx1c2hTeW5jIHN0YXJ0ZWQnKVxuXG4gIGNvbnN0IHdyaXRlSW5kZXggPSBBdG9taWNzLmxvYWQoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgpXG5cbiAgbGV0IHNwaW5zID0gMFxuXG4gIC8vIFRPRE8gaGFuZGxlIGRlYWRsb2NrXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgcmVhZEluZGV4ID0gQXRvbWljcy5sb2FkKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgpXG5cbiAgICBpZiAocmVhZEluZGV4ID09PSAtMikge1xuICAgICAgdGhyb3cgRXJyb3IoJ19mbHVzaFN5bmMgZmFpbGVkJylcbiAgICB9XG5cbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZyhgKGZsdXNoU3luYykgcmVhZEluZGV4ICgke3JlYWRJbmRleH0pIHdyaXRlSW5kZXggKCR7d3JpdGVJbmRleH0pYClcbiAgICBpZiAocmVhZEluZGV4ICE9PSB3cml0ZUluZGV4KSB7XG4gICAgICAvLyBUT0RPIHN0cmVhbSB0aW1lb3V0cyBmb3Igc29tZSByZWFzb24uXG4gICAgICBBdG9taWNzLndhaXQoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgUkVBRF9JTkRFWCwgcmVhZEluZGV4LCAxMDAwKVxuICAgIH0gZWxzZSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGlmICgrK3NwaW5zID09PSAxMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdfZmx1c2hTeW5jIHRvb2sgdG9vIGxvbmcgKDEwcyknKVxuICAgIH1cbiAgfVxuICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZygnZmx1c2hTeW5jIGZpbmlzaGVkJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaHJlYWRTdHJlYW1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgeyBjcmVhdGVSZXF1aXJlIH0gPSByZXF1aXJlKCdtb2R1bGUnKVxuY29uc3QgZ2V0Q2FsbGVycyA9IHJlcXVpcmUoJy4vY2FsbGVyJylcbmNvbnN0IHsgam9pbiwgaXNBYnNvbHV0ZSwgc2VwIH0gPSByZXF1aXJlKCdub2RlOnBhdGgnKVxuY29uc3Qgc2xlZXAgPSByZXF1aXJlKCdhdG9taWMtc2xlZXAnKVxuY29uc3Qgb25FeGl0ID0gcmVxdWlyZSgnb24tZXhpdC1sZWFrLWZyZWUnKVxuY29uc3QgVGhyZWFkU3RyZWFtID0gcmVxdWlyZSgndGhyZWFkLXN0cmVhbScpXG5cbmZ1bmN0aW9uIHNldHVwT25FeGl0IChzdHJlYW0pIHtcbiAgLy8gVGhpcyBpcyBsZWFrIGZyZWUsIGl0IGRvZXMgbm90IGxlYXZlIGV2ZW50IGhhbmRsZXJzXG4gIG9uRXhpdC5yZWdpc3RlcihzdHJlYW0sIGF1dG9FbmQpXG4gIG9uRXhpdC5yZWdpc3RlckJlZm9yZUV4aXQoc3RyZWFtLCBmbHVzaClcblxuICBzdHJlYW0ub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIG9uRXhpdC51bnJlZ2lzdGVyKHN0cmVhbSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gYnVpbGRTdHJlYW0gKGZpbGVuYW1lLCB3b3JrZXJEYXRhLCB3b3JrZXJPcHRzLCBzeW5jKSB7XG4gIGNvbnN0IHN0cmVhbSA9IG5ldyBUaHJlYWRTdHJlYW0oe1xuICAgIGZpbGVuYW1lLFxuICAgIHdvcmtlckRhdGEsXG4gICAgd29ya2VyT3B0cyxcbiAgICBzeW5jXG4gIH0pXG5cbiAgc3RyZWFtLm9uKCdyZWFkeScsIG9uUmVhZHkpXG4gIHN0cmVhbS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcignZXhpdCcsIG9uRXhpdClcbiAgfSlcblxuICBwcm9jZXNzLm9uKCdleGl0Jywgb25FeGl0KVxuXG4gIGZ1bmN0aW9uIG9uUmVhZHkgKCkge1xuICAgIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoJ2V4aXQnLCBvbkV4aXQpXG4gICAgc3RyZWFtLnVucmVmKClcblxuICAgIGlmICh3b3JrZXJPcHRzLmF1dG9FbmQgIT09IGZhbHNlKSB7XG4gICAgICBzZXR1cE9uRXhpdChzdHJlYW0pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FeGl0ICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChzdHJlYW0uY2xvc2VkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RyZWFtLmZsdXNoU3luYygpXG4gICAgLy8gQXBwYXJlbnRseSB0aGVyZSBpcyBhIHZlcnkgc3BvcmFkaWMgcmFjZSBjb25kaXRpb25cbiAgICAvLyB0aGF0IGluIGNlcnRhaW4gT1Mgd291bGQgcHJldmVudCB0aGUgbWVzc2FnZXMgdG8gYmUgZmx1c2hlZFxuICAgIC8vIGJlY2F1c2UgdGhlIHRocmVhZCBtaWdodCBub3QgaGF2ZSBiZWVuIGNyZWF0ZWQgc3RpbGwuXG4gICAgLy8gVW5mb3J0dW5hdGVseSB3ZSBuZWVkIHRvIHNsZWVwKDEwMCkgaW4gdGhpcyBjYXNlLlxuICAgIHNsZWVwKDEwMClcbiAgICBzdHJlYW0uZW5kKClcbiAgfVxuXG4gIHJldHVybiBzdHJlYW1cbn1cblxuZnVuY3Rpb24gYXV0b0VuZCAoc3RyZWFtKSB7XG4gIHN0cmVhbS5yZWYoKVxuICBzdHJlYW0uZmx1c2hTeW5jKClcbiAgc3RyZWFtLmVuZCgpXG4gIHN0cmVhbS5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzdHJlYW0udW5yZWYoKVxuICB9KVxufVxuXG5mdW5jdGlvbiBmbHVzaCAoc3RyZWFtKSB7XG4gIHN0cmVhbS5mbHVzaFN5bmMoKVxufVxuXG5mdW5jdGlvbiB0cmFuc3BvcnQgKGZ1bGxPcHRpb25zKSB7XG4gIGNvbnN0IHsgcGlwZWxpbmUsIHRhcmdldHMsIGxldmVscywgZGVkdXBlLCB3b3JrZXIgPSB7fSwgY2FsbGVyID0gZ2V0Q2FsbGVycygpLCBzeW5jID0gZmFsc2UgfSA9IGZ1bGxPcHRpb25zXG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5mdWxsT3B0aW9ucy5vcHRpb25zXG4gIH1cblxuICAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICBjb25zdCBjYWxsZXJzID0gdHlwZW9mIGNhbGxlciA9PT0gJ3N0cmluZycgPyBbY2FsbGVyXSA6IGNhbGxlclxuXG4gIC8vIFRoaXMgd2lsbCBiZSBldmVudHVhbGx5IG1vZGlmaWVkIGJ5IGJ1bmRsZXJzXG4gIGNvbnN0IGJ1bmRsZXJPdmVycmlkZXMgPSAnX19idW5kbGVyUGF0aHNPdmVycmlkZXMnIGluIGdsb2JhbFRoaXMgPyBnbG9iYWxUaGlzLl9fYnVuZGxlclBhdGhzT3ZlcnJpZGVzIDoge31cblxuICBsZXQgdGFyZ2V0ID0gZnVsbE9wdGlvbnMudGFyZ2V0XG5cbiAgaWYgKHRhcmdldCAmJiB0YXJnZXRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IG9uZSBvZiB0YXJnZXQgb3IgdGFyZ2V0cyBjYW4gYmUgc3BlY2lmaWVkJylcbiAgfVxuXG4gIGlmICh0YXJnZXRzKSB7XG4gICAgdGFyZ2V0ID0gYnVuZGxlck92ZXJyaWRlc1sncGluby13b3JrZXInXSB8fCBqb2luKF9fZGlybmFtZSwgJ3dvcmtlci5qcycpXG4gICAgb3B0aW9ucy50YXJnZXRzID0gdGFyZ2V0cy5maWx0ZXIoZGVzdCA9PiBkZXN0LnRhcmdldCkubWFwKChkZXN0KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5kZXN0LFxuICAgICAgICB0YXJnZXQ6IGZpeFRhcmdldChkZXN0LnRhcmdldClcbiAgICAgIH1cbiAgICB9KVxuICAgIG9wdGlvbnMucGlwZWxpbmVzID0gdGFyZ2V0cy5maWx0ZXIoZGVzdCA9PiBkZXN0LnBpcGVsaW5lKS5tYXAoKGRlc3QpID0+IHtcbiAgICAgIHJldHVybiBkZXN0LnBpcGVsaW5lLm1hcCgodCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnQsXG4gICAgICAgICAgbGV2ZWw6IGRlc3QubGV2ZWwsIC8vIGR1cGxpY2F0ZSB0aGUgcGlwZWxpbmUgYGxldmVsYCBwcm9wZXJ0eSBkZWZpbmVkIGluIHRoZSB1cHBlciBsZXZlbFxuICAgICAgICAgIHRhcmdldDogZml4VGFyZ2V0KHQudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0gZWxzZSBpZiAocGlwZWxpbmUpIHtcbiAgICB0YXJnZXQgPSBidW5kbGVyT3ZlcnJpZGVzWydwaW5vLXdvcmtlciddIHx8IGpvaW4oX19kaXJuYW1lLCAnd29ya2VyLmpzJylcbiAgICBvcHRpb25zLnBpcGVsaW5lcyA9IFtwaXBlbGluZS5tYXAoKGRlc3QpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmRlc3QsXG4gICAgICAgIHRhcmdldDogZml4VGFyZ2V0KGRlc3QudGFyZ2V0KVxuICAgICAgfVxuICAgIH0pXVxuICB9XG5cbiAgaWYgKGxldmVscykge1xuICAgIG9wdGlvbnMubGV2ZWxzID0gbGV2ZWxzXG4gIH1cblxuICBpZiAoZGVkdXBlKSB7XG4gICAgb3B0aW9ucy5kZWR1cGUgPSBkZWR1cGVcbiAgfVxuXG4gIG9wdGlvbnMucGlub1dpbGxTZW5kQ29uZmlnID0gdHJ1ZVxuXG4gIHJldHVybiBidWlsZFN0cmVhbShmaXhUYXJnZXQodGFyZ2V0KSwgb3B0aW9ucywgd29ya2VyLCBzeW5jKVxuXG4gIGZ1bmN0aW9uIGZpeFRhcmdldCAob3JpZ2luKSB7XG4gICAgb3JpZ2luID0gYnVuZGxlck92ZXJyaWRlc1tvcmlnaW5dIHx8IG9yaWdpblxuXG4gICAgaWYgKGlzQWJzb2x1dGUob3JpZ2luKSB8fCBvcmlnaW4uaW5kZXhPZignZmlsZTovLycpID09PSAwKSB7XG4gICAgICByZXR1cm4gb3JpZ2luXG4gICAgfVxuXG4gICAgaWYgKG9yaWdpbiA9PT0gJ3Bpbm8vZmlsZScpIHtcbiAgICAgIHJldHVybiBqb2luKF9fZGlybmFtZSwgJy4uJywgJ2ZpbGUuanMnKVxuICAgIH1cblxuICAgIGxldCBmaXhUYXJnZXRcblxuICAgIGZvciAoY29uc3QgZmlsZVBhdGggb2YgY2FsbGVycykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGZpbGVQYXRoID09PSAnbm9kZTpyZXBsJ1xuICAgICAgICAgID8gcHJvY2Vzcy5jd2QoKSArIHNlcFxuICAgICAgICAgIDogZmlsZVBhdGhcblxuICAgICAgICBmaXhUYXJnZXQgPSBjcmVhdGVSZXF1aXJlKGNvbnRleHQpLnJlc29sdmUob3JpZ2luKVxuICAgICAgICBicmVha1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIFNpbGVudCBjYXRjaFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZml4VGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuYWJsZSB0byBkZXRlcm1pbmUgdHJhbnNwb3J0IHRhcmdldCBmb3IgXCIke29yaWdpbn1cImApXG4gICAgfVxuXG4gICAgcmV0dXJuIGZpeFRhcmdldFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhbnNwb3J0XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbi8qIGVzbGludCBuby1wcm90b3R5cGUtYnVpbHRpbnM6IDAgKi9cblxuY29uc3QgZm9ybWF0ID0gcmVxdWlyZSgncXVpY2stZm9ybWF0LXVuZXNjYXBlZCcpXG5jb25zdCB7IG1hcEh0dHBSZXF1ZXN0LCBtYXBIdHRwUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ3Bpbm8tc3RkLXNlcmlhbGl6ZXJzJylcbmNvbnN0IFNvbmljQm9vbSA9IHJlcXVpcmUoJ3NvbmljLWJvb20nKVxuY29uc3Qgb25FeGl0ID0gcmVxdWlyZSgnb24tZXhpdC1sZWFrLWZyZWUnKVxuY29uc3Qge1xuICBsc0NhY2hlU3ltLFxuICBjaGluZGluZ3NTeW0sXG4gIHdyaXRlU3ltLFxuICBzZXJpYWxpemVyc1N5bSxcbiAgZm9ybWF0T3B0c1N5bSxcbiAgZW5kU3ltLFxuICBzdHJpbmdpZmllcnNTeW0sXG4gIHN0cmluZ2lmeVN5bSxcbiAgc3RyaW5naWZ5U2FmZVN5bSxcbiAgd2lsZGNhcmRGaXJzdFN5bSxcbiAgbmVzdGVkS2V5U3ltLFxuICBmb3JtYXR0ZXJzU3ltLFxuICBtZXNzYWdlS2V5U3ltLFxuICBlcnJvcktleVN5bSxcbiAgbmVzdGVkS2V5U3RyU3ltLFxuICBtc2dQcmVmaXhTeW1cbn0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxuY29uc3QgeyBpc01haW5UaHJlYWQgfSA9IHJlcXVpcmUoJ3dvcmtlcl90aHJlYWRzJylcbmNvbnN0IHRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0JylcblxuZnVuY3Rpb24gbm9vcCAoKSB7XG59XG5cbmZ1bmN0aW9uIGdlbkxvZyAobGV2ZWwsIGhvb2spIHtcbiAgaWYgKCFob29rKSByZXR1cm4gTE9HXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGhvb2tXcmFwcGVkTG9nICguLi5hcmdzKSB7XG4gICAgaG9vay5jYWxsKHRoaXMsIGFyZ3MsIExPRywgbGV2ZWwpXG4gIH1cblxuICBmdW5jdGlvbiBMT0cgKG8sIC4uLm4pIHtcbiAgICBpZiAodHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgbXNnID0gb1xuICAgICAgaWYgKG8gIT09IG51bGwpIHtcbiAgICAgICAgaWYgKG8ubWV0aG9kICYmIG8uaGVhZGVycyAmJiBvLnNvY2tldCkge1xuICAgICAgICAgIG8gPSBtYXBIdHRwUmVxdWVzdChvKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvLnNldEhlYWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG8gPSBtYXBIdHRwUmVzcG9uc2UobylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGZvcm1hdFBhcmFtc1xuICAgICAgaWYgKG1zZyA9PT0gbnVsbCAmJiBuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBmb3JtYXRQYXJhbXMgPSBbbnVsbF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1zZyA9IG4uc2hpZnQoKVxuICAgICAgICBmb3JtYXRQYXJhbXMgPSBuXG4gICAgICB9XG4gICAgICAvLyBXZSBkbyBub3QgdXNlIGEgY29lcmNpdmUgY2hlY2sgZm9yIGBtc2dgIGFzIGl0IGlzXG4gICAgICAvLyBtZWFzdXJhYmx5IHNsb3dlciB0aGFuIHRoZSBleHBsaWNpdCBjaGVja3MuXG4gICAgICBpZiAodHlwZW9mIHRoaXNbbXNnUHJlZml4U3ltXSA9PT0gJ3N0cmluZycgJiYgbXNnICE9PSB1bmRlZmluZWQgJiYgbXNnICE9PSBudWxsKSB7XG4gICAgICAgIG1zZyA9IHRoaXNbbXNnUHJlZml4U3ltXSArIG1zZ1xuICAgICAgfVxuICAgICAgdGhpc1t3cml0ZVN5bV0obywgZm9ybWF0KG1zZywgZm9ybWF0UGFyYW1zLCB0aGlzW2Zvcm1hdE9wdHNTeW1dKSwgbGV2ZWwpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtc2cgPSBvID09PSB1bmRlZmluZWQgPyBuLnNoaWZ0KCkgOiBvXG5cbiAgICAgIC8vIFdlIGRvIG5vdCB1c2UgYSBjb2VyY2l2ZSBjaGVjayBmb3IgYG1zZ2AgYXMgaXQgaXNcbiAgICAgIC8vIG1lYXN1cmFibHkgc2xvd2VyIHRoYW4gdGhlIGV4cGxpY2l0IGNoZWNrcy5cbiAgICAgIGlmICh0eXBlb2YgdGhpc1ttc2dQcmVmaXhTeW1dID09PSAnc3RyaW5nJyAmJiBtc2cgIT09IHVuZGVmaW5lZCAmJiBtc2cgIT09IG51bGwpIHtcbiAgICAgICAgbXNnID0gdGhpc1ttc2dQcmVmaXhTeW1dICsgbXNnXG4gICAgICB9XG4gICAgICB0aGlzW3dyaXRlU3ltXShudWxsLCBmb3JtYXQobXNnLCBuLCB0aGlzW2Zvcm1hdE9wdHNTeW1dKSwgbGV2ZWwpXG4gICAgfVxuICB9XG59XG5cbi8vIG1hZ2ljYWxseSBlc2NhcGUgc3RyaW5ncyBmb3IganNvblxuLy8gcmVseWluZyBvbiB0aGVpciBjaGFyQ29kZUF0XG4vLyBldmVyeXRoaW5nIGJlbG93IDMyIG5lZWRzIEpTT04uc3RyaW5naWZ5KClcbi8vIDM0IGFuZCA5MiBoYXBwZW5zIGFsbCB0aGUgdGltZSwgc28gd2Vcbi8vIGhhdmUgYSBmYXN0IGNhc2UgZm9yIHRoZW1cbmZ1bmN0aW9uIGFzU3RyaW5nIChzdHIpIHtcbiAgbGV0IHJlc3VsdCA9ICcnXG4gIGxldCBsYXN0ID0gMFxuICBsZXQgZm91bmQgPSBmYWxzZVxuICBsZXQgcG9pbnQgPSAyNTVcbiAgY29uc3QgbCA9IHN0ci5sZW5ndGhcbiAgaWYgKGwgPiAxMDApIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3RyKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbCAmJiBwb2ludCA+PSAzMjsgaSsrKSB7XG4gICAgcG9pbnQgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChwb2ludCA9PT0gMzQgfHwgcG9pbnQgPT09IDkyKSB7XG4gICAgICByZXN1bHQgKz0gc3RyLnNsaWNlKGxhc3QsIGkpICsgJ1xcXFwnXG4gICAgICBsYXN0ID0gaVxuICAgICAgZm91bmQgPSB0cnVlXG4gICAgfVxuICB9XG4gIGlmICghZm91bmQpIHtcbiAgICByZXN1bHQgPSBzdHJcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gc3RyLnNsaWNlKGxhc3QpXG4gIH1cbiAgcmV0dXJuIHBvaW50IDwgMzIgPyBKU09OLnN0cmluZ2lmeShzdHIpIDogJ1wiJyArIHJlc3VsdCArICdcIidcbn1cblxuZnVuY3Rpb24gYXNKc29uIChvYmosIG1zZywgbnVtLCB0aW1lKSB7XG4gIGNvbnN0IHN0cmluZ2lmeSA9IHRoaXNbc3RyaW5naWZ5U3ltXVxuICBjb25zdCBzdHJpbmdpZnlTYWZlID0gdGhpc1tzdHJpbmdpZnlTYWZlU3ltXVxuICBjb25zdCBzdHJpbmdpZmllcnMgPSB0aGlzW3N0cmluZ2lmaWVyc1N5bV1cbiAgY29uc3QgZW5kID0gdGhpc1tlbmRTeW1dXG4gIGNvbnN0IGNoaW5kaW5ncyA9IHRoaXNbY2hpbmRpbmdzU3ltXVxuICBjb25zdCBzZXJpYWxpemVycyA9IHRoaXNbc2VyaWFsaXplcnNTeW1dXG4gIGNvbnN0IGZvcm1hdHRlcnMgPSB0aGlzW2Zvcm1hdHRlcnNTeW1dXG4gIGNvbnN0IG1lc3NhZ2VLZXkgPSB0aGlzW21lc3NhZ2VLZXlTeW1dXG4gIGNvbnN0IGVycm9yS2V5ID0gdGhpc1tlcnJvcktleVN5bV1cbiAgbGV0IGRhdGEgPSB0aGlzW2xzQ2FjaGVTeW1dW251bV0gKyB0aW1lXG5cbiAgLy8gd2UgbmVlZCB0aGUgY2hpbGQgYmluZGluZ3MgYWRkZWQgdG8gdGhlIG91dHB1dCBmaXJzdCBzbyBpbnN0YW5jZSBsb2dnZWRcbiAgLy8gb2JqZWN0cyBjYW4gdGFrZSBwcmVjZWRlbmNlIHdoZW4gSlNPTi5wYXJzZS1pbmcgdGhlIHJlc3VsdGluZyBsb2cgbGluZVxuICBkYXRhID0gZGF0YSArIGNoaW5kaW5nc1xuXG4gIGxldCB2YWx1ZVxuICBpZiAoZm9ybWF0dGVycy5sb2cpIHtcbiAgICBvYmogPSBmb3JtYXR0ZXJzLmxvZyhvYmopXG4gIH1cbiAgY29uc3Qgd2lsZGNhcmRTdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyc1t3aWxkY2FyZEZpcnN0U3ltXVxuICBsZXQgcHJvcFN0ciA9ICcnXG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIHZhbHVlID0gb2JqW2tleV1cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoc2VyaWFsaXplcnNba2V5XSkge1xuICAgICAgICB2YWx1ZSA9IHNlcmlhbGl6ZXJzW2tleV0odmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gZXJyb3JLZXkgJiYgc2VyaWFsaXplcnMuZXJyKSB7XG4gICAgICAgIHZhbHVlID0gc2VyaWFsaXplcnMuZXJyKHZhbHVlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyc1trZXldIHx8IHdpbGRjYXJkU3RyaW5naWZpZXJcblxuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiBcIm9mZlwiICovXG4gICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgY2FzZSBleHBsaWNpdGx5IGZhbGxzIHRocm91Z2ggdG8gdGhlIG5leHQgb25lXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIGlmIChzdHJpbmdpZmllcikgdmFsdWUgPSBzdHJpbmdpZmllcih2YWx1ZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHZhbHVlID0gKHN0cmluZ2lmaWVyIHx8IGFzU3RyaW5nKSh2YWx1ZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHZhbHVlID0gKHN0cmluZ2lmaWVyIHx8IHN0cmluZ2lmeSkodmFsdWUsIHN0cmluZ2lmeVNhZmUpXG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWVcbiAgICAgIGNvbnN0IHN0cktleSA9IGFzU3RyaW5nKGtleSlcbiAgICAgIHByb3BTdHIgKz0gJywnICsgc3RyS2V5ICsgJzonICsgdmFsdWVcbiAgICB9XG4gIH1cblxuICBsZXQgbXNnU3RyID0gJydcbiAgaWYgKG1zZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSBzZXJpYWxpemVyc1ttZXNzYWdlS2V5XSA/IHNlcmlhbGl6ZXJzW21lc3NhZ2VLZXldKG1zZykgOiBtc2dcbiAgICBjb25zdCBzdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyc1ttZXNzYWdlS2V5XSB8fCB3aWxkY2FyZFN0cmluZ2lmaWVyXG5cbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiBcIm9mZlwiICovXG4gICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUodmFsdWUpID09PSBmYWxzZSkge1xuICAgICAgICAgIHZhbHVlID0gbnVsbFxuICAgICAgICB9XG4gICAgICAvLyB0aGlzIGNhc2UgZXhwbGljaXRseSBmYWxscyB0aHJvdWdoIHRvIHRoZSBuZXh0IG9uZVxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIGlmIChzdHJpbmdpZmllcikgdmFsdWUgPSBzdHJpbmdpZmllcih2YWx1ZSlcbiAgICAgICAgbXNnU3RyID0gJyxcIicgKyBtZXNzYWdlS2V5ICsgJ1wiOicgKyB2YWx1ZVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgdmFsdWUgPSAoc3RyaW5naWZpZXIgfHwgYXNTdHJpbmcpKHZhbHVlKVxuICAgICAgICBtc2dTdHIgPSAnLFwiJyArIG1lc3NhZ2VLZXkgKyAnXCI6JyArIHZhbHVlXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IChzdHJpbmdpZmllciB8fCBzdHJpbmdpZnkpKHZhbHVlLCBzdHJpbmdpZnlTYWZlKVxuICAgICAgICBtc2dTdHIgPSAnLFwiJyArIG1lc3NhZ2VLZXkgKyAnXCI6JyArIHZhbHVlXG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXNbbmVzdGVkS2V5U3ltXSAmJiBwcm9wU3RyKSB7XG4gICAgLy8gcGxhY2UgYWxsIHRoZSBvYmogcHJvcGVydGllcyB1bmRlciB0aGUgc3BlY2lmaWVkIGtleVxuICAgIC8vIHRoZSBuZXN0ZWQga2V5IGlzIGFscmVhZHkgZm9ybWF0dGVkIGZyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgcmV0dXJuIGRhdGEgKyB0aGlzW25lc3RlZEtleVN0clN5bV0gKyBwcm9wU3RyLnNsaWNlKDEpICsgJ30nICsgbXNnU3RyICsgZW5kXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRhdGEgKyBwcm9wU3RyICsgbXNnU3RyICsgZW5kXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNDaGluZGluZ3MgKGluc3RhbmNlLCBiaW5kaW5ncykge1xuICBsZXQgdmFsdWVcbiAgbGV0IGRhdGEgPSBpbnN0YW5jZVtjaGluZGluZ3NTeW1dXG4gIGNvbnN0IHN0cmluZ2lmeSA9IGluc3RhbmNlW3N0cmluZ2lmeVN5bV1cbiAgY29uc3Qgc3RyaW5naWZ5U2FmZSA9IGluc3RhbmNlW3N0cmluZ2lmeVNhZmVTeW1dXG4gIGNvbnN0IHN0cmluZ2lmaWVycyA9IGluc3RhbmNlW3N0cmluZ2lmaWVyc1N5bV1cbiAgY29uc3Qgd2lsZGNhcmRTdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyc1t3aWxkY2FyZEZpcnN0U3ltXVxuICBjb25zdCBzZXJpYWxpemVycyA9IGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXVxuICBjb25zdCBmb3JtYXR0ZXIgPSBpbnN0YW5jZVtmb3JtYXR0ZXJzU3ltXS5iaW5kaW5nc1xuICBiaW5kaW5ncyA9IGZvcm1hdHRlcihiaW5kaW5ncylcblxuICBmb3IgKGNvbnN0IGtleSBpbiBiaW5kaW5ncykge1xuICAgIHZhbHVlID0gYmluZGluZ3Nba2V5XVxuICAgIGNvbnN0IHZhbGlkID0ga2V5ICE9PSAnbGV2ZWwnICYmXG4gICAgICBrZXkgIT09ICdzZXJpYWxpemVycycgJiZcbiAgICAgIGtleSAhPT0gJ2Zvcm1hdHRlcnMnICYmXG4gICAgICBrZXkgIT09ICdjdXN0b21MZXZlbHMnICYmXG4gICAgICBiaW5kaW5ncy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgaWYgKHZhbGlkID09PSB0cnVlKSB7XG4gICAgICB2YWx1ZSA9IHNlcmlhbGl6ZXJzW2tleV0gPyBzZXJpYWxpemVyc1trZXldKHZhbHVlKSA6IHZhbHVlXG4gICAgICB2YWx1ZSA9IChzdHJpbmdpZmllcnNba2V5XSB8fCB3aWxkY2FyZFN0cmluZ2lmaWVyIHx8IHN0cmluZ2lmeSkodmFsdWUsIHN0cmluZ2lmeVNhZmUpXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWVcbiAgICAgIGRhdGEgKz0gJyxcIicgKyBrZXkgKyAnXCI6JyArIHZhbHVlXG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIGhhc0JlZW5UYW1wZXJlZCAoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW0ud3JpdGUgIT09IHN0cmVhbS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUud3JpdGVcbn1cblxuY29uc3QgaGFzTm9kZUNvZGVDb3ZlcmFnZSA9IHByb2Nlc3MuZW52Lk5PREVfVjhfQ09WRVJBR0UgfHwgcHJvY2Vzcy5lbnYuVjhfQ09WRVJBR0VcblxuZnVuY3Rpb24gYnVpbGRTYWZlU29uaWNCb29tIChvcHRzKSB7XG4gIGNvbnN0IHN0cmVhbSA9IG5ldyBTb25pY0Jvb20ob3B0cylcbiAgc3RyZWFtLm9uKCdlcnJvcicsIGZpbHRlckJyb2tlblBpcGUpXG4gIC8vIElmIHdlIGFyZSBzeW5jOiBmYWxzZSwgd2UgbXVzdCBmbHVzaCBvbiBleGl0XG4gIC8vIFdlIG11c3QgZGlzYWJsZSB0aGlzIGlmIHRoZXJlIGlzIG5vZGUgY29kZSBjb3ZlcmFnZSBkdWUgdG9cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy80OTM0NCNpc3N1ZWNvbW1lbnQtMTc0MTc3NjMwOC5cbiAgaWYgKCFoYXNOb2RlQ29kZUNvdmVyYWdlICYmICFvcHRzLnN5bmMgJiYgaXNNYWluVGhyZWFkKSB7XG4gICAgb25FeGl0LnJlZ2lzdGVyKHN0cmVhbSwgYXV0b0VuZClcblxuICAgIHN0cmVhbS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBvbkV4aXQudW5yZWdpc3RlcihzdHJlYW0pXG4gICAgfSlcbiAgfVxuICByZXR1cm4gc3RyZWFtXG5cbiAgZnVuY3Rpb24gZmlsdGVyQnJva2VuUGlwZSAoZXJyKSB7XG4gICAgLy8gSW1wb3NzaWJsZSB0byByZXBsaWNhdGUgYWNyb3NzIGFsbCBvcGVyYXRpbmcgc3lzdGVtc1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGVyci5jb2RlID09PSAnRVBJUEUnKSB7XG4gICAgICAvLyBJZiB3ZSBnZXQgRVBJUEUsIHdlIHNob3VsZCBzdG9wIGxvZ2dpbmcgaGVyZVxuICAgICAgLy8gaG93ZXZlciB3ZSBoYXZlIG5vIGNvbnRyb2wgdG8gdGhlIGNvbnN1bWVyIG9mXG4gICAgICAvLyBTb25pY0Jvb20sIHNvIHdlIGp1c3Qgb3ZlcndyaXRlIHRoZSB3cml0ZSBtZXRob2RcbiAgICAgIHN0cmVhbS53cml0ZSA9IG5vb3BcbiAgICAgIHN0cmVhbS5lbmQgPSBub29wXG4gICAgICBzdHJlYW0uZmx1c2hTeW5jID0gbm9vcFxuICAgICAgc3RyZWFtLmRlc3Ryb3kgPSBub29wXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGZpbHRlckJyb2tlblBpcGUpXG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGF1dG9FbmQgKHN0cmVhbSwgZXZlbnROYW1lKSB7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIG9ubHkgb24gc29tZSBwbGF0Zm9ybXNcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHN0cmVhbS5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChldmVudE5hbWUgPT09ICdiZWZvcmVFeGl0Jykge1xuICAgIC8vIFdlIHN0aWxsIGhhdmUgYW4gZXZlbnQgbG9vcCwgbGV0J3MgdXNlIGl0XG4gICAgc3RyZWFtLmZsdXNoKClcbiAgICBzdHJlYW0ub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgc3RyZWFtLmVuZCgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3Igc29tZSByZWFzb24gaXN0YW5idWwgaXMgbm90IGRldGVjdGluZyB0aGlzLCBidXQgaXQncyB0aGVyZVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLy8gV2UgZG8gbm90IGhhdmUgYW4gZXZlbnQgbG9vcCwgc28gZmx1c2ggc3luY2hyb25vdXNseVxuICAgIHN0cmVhbS5mbHVzaFN5bmMoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFyZ3NOb3JtYWxpemVyIChkZWZhdWx0T3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gbm9ybWFsaXplQXJncyAoaW5zdGFuY2UsIGNhbGxlciwgb3B0cyA9IHt9LCBzdHJlYW0pIHtcbiAgICAvLyBzdXBwb3J0IHN0cmVhbSBhcyBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHN0cmVhbSA9IGJ1aWxkU2FmZVNvbmljQm9vbSh7IGRlc3Q6IG9wdHMgfSlcbiAgICAgIG9wdHMgPSB7fVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0cmVhbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChvcHRzICYmIG9wdHMudHJhbnNwb3J0KSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IG9uZSBvZiBvcHRpb24udHJhbnNwb3J0IG9yIHN0cmVhbSBjYW4gYmUgc3BlY2lmaWVkJylcbiAgICAgIH1cbiAgICAgIHN0cmVhbSA9IGJ1aWxkU2FmZVNvbmljQm9vbSh7IGRlc3Q6IHN0cmVhbSB9KVxuICAgIH0gZWxzZSBpZiAob3B0cyBpbnN0YW5jZW9mIFNvbmljQm9vbSB8fCBvcHRzLndyaXRhYmxlIHx8IG9wdHMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICAgIHN0cmVhbSA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH0gZWxzZSBpZiAob3B0cy50cmFuc3BvcnQpIHtcbiAgICAgIGlmIChvcHRzLnRyYW5zcG9ydCBpbnN0YW5jZW9mIFNvbmljQm9vbSB8fCBvcHRzLnRyYW5zcG9ydC53cml0YWJsZSB8fCBvcHRzLnRyYW5zcG9ydC5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb3B0aW9uLnRyYW5zcG9ydCBkbyBub3QgYWxsb3cgc3RyZWFtLCBwbGVhc2UgcGFzcyB0byBvcHRpb24gZGlyZWN0bHkuIGUuZy4gcGlubyh0cmFuc3BvcnQpJylcbiAgICAgIH1cbiAgICAgIGlmIChvcHRzLnRyYW5zcG9ydC50YXJnZXRzICYmIG9wdHMudHJhbnNwb3J0LnRhcmdldHMubGVuZ3RoICYmIG9wdHMuZm9ybWF0dGVycyAmJiB0eXBlb2Ygb3B0cy5mb3JtYXR0ZXJzLmxldmVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvcHRpb24udHJhbnNwb3J0LnRhcmdldHMgZG8gbm90IGFsbG93IGN1c3RvbSBsZXZlbCBmb3JtYXR0ZXJzJylcbiAgICAgIH1cblxuICAgICAgbGV0IGN1c3RvbUxldmVsc1xuICAgICAgaWYgKG9wdHMuY3VzdG9tTGV2ZWxzKSB7XG4gICAgICAgIGN1c3RvbUxldmVscyA9IG9wdHMudXNlT25seUN1c3RvbUxldmVscyA/IG9wdHMuY3VzdG9tTGV2ZWxzIDogT2JqZWN0LmFzc2lnbih7fSwgb3B0cy5sZXZlbHMsIG9wdHMuY3VzdG9tTGV2ZWxzKVxuICAgICAgfVxuICAgICAgc3RyZWFtID0gdHJhbnNwb3J0KHsgY2FsbGVyLCAuLi5vcHRzLnRyYW5zcG9ydCwgbGV2ZWxzOiBjdXN0b21MZXZlbHMgfSlcbiAgICB9XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRzKVxuICAgIG9wdHMuc2VyaWFsaXplcnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucy5zZXJpYWxpemVycywgb3B0cy5zZXJpYWxpemVycylcbiAgICBvcHRzLmZvcm1hdHRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdHRlcnMpXG5cbiAgICBpZiAob3B0cy5wcmV0dHlQcmludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmV0dHlQcmludCBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCwgc2VlIHRoZSBwaW5vLXByZXR0eSBwYWNrYWdlIChodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3Bpbm8tcHJldHR5KScpXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbmFibGVkLCBvbkNoaWxkIH0gPSBvcHRzXG4gICAgaWYgKGVuYWJsZWQgPT09IGZhbHNlKSBvcHRzLmxldmVsID0gJ3NpbGVudCdcbiAgICBpZiAoIW9uQ2hpbGQpIG9wdHMub25DaGlsZCA9IG5vb3BcbiAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgaWYgKCFoYXNCZWVuVGFtcGVyZWQocHJvY2Vzcy5zdGRvdXQpKSB7XG4gICAgICAgIC8vIElmIHByb2Nlc3Muc3Rkb3V0LmZkIGlzIHVuZGVmaW5lZCwgaXQgbWVhbnMgdGhhdCB3ZSBhcmUgcnVubmluZ1xuICAgICAgICAvLyBpbiBhIHdvcmtlciB0aHJlYWQuIExldCdzIGFzc3VtZSB3ZSBhcmUgbG9nZ2luZyB0byBmaWxlIGRlc2NyaXB0b3IgMS5cbiAgICAgICAgc3RyZWFtID0gYnVpbGRTYWZlU29uaWNCb29tKHsgZmQ6IHByb2Nlc3Muc3Rkb3V0LmZkIHx8IDEgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbSA9IHByb2Nlc3Muc3Rkb3V0XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG9wdHMsIHN0cmVhbSB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5IChvYmosIHN0cmluZ2lmeVNhZmVGbikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gIH0gY2F0Y2ggKF8pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RyaW5naWZ5ID0gc3RyaW5naWZ5U2FmZUZuIHx8IHRoaXNbc3RyaW5naWZ5U2FmZVN5bV1cbiAgICAgIHJldHVybiBzdHJpbmdpZnkob2JqKVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVybiAnXCJbdW5hYmxlIHRvIHNlcmlhbGl6ZSwgY2lyY3VsYXIgcmVmZXJlbmNlIGlzIHRvbyBjb21wbGV4IHRvIGFuYWx5emVdXCInXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybWF0dGVycyAobGV2ZWwsIGJpbmRpbmdzLCBsb2cpIHtcbiAgcmV0dXJuIHtcbiAgICBsZXZlbCxcbiAgICBiaW5kaW5ncyxcbiAgICBsb2dcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgaW50ZWdlciBmaWxlIGRlc2NyaXB0b3IgdG8gYSBwcm9wZXIgbmF0aXZlIGludGVnZXJcbiAqIGZpbGUgZGVzY3JpcHRvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gVGhlIGZpbGUgZGVzY3JpcHRvciBzdHJpbmcgdG8gYXR0ZW1wdCB0byBjb252ZXJ0LlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZURlc3RGaWxlRGVzY3JpcHRvciAoZGVzdGluYXRpb24pIHtcbiAgY29uc3QgZmQgPSBOdW1iZXIoZGVzdGluYXRpb24pXG4gIGlmICh0eXBlb2YgZGVzdGluYXRpb24gPT09ICdzdHJpbmcnICYmIE51bWJlci5pc0Zpbml0ZShmZCkpIHtcbiAgICByZXR1cm4gZmRcbiAgfVxuICAvLyBkZXN0aW5hdGlvbiBjb3VsZCBiZSB1bmRlZmluZWQgaWYgd2UgYXJlIGluIGEgd29ya2VyXG4gIGlmIChkZXN0aW5hdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gVGhpcyBpcyBzdGRvdXQgaW4gVU5JWCBzeXN0ZW1zXG4gICAgcmV0dXJuIDFcbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb25cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5vb3AsXG4gIGJ1aWxkU2FmZVNvbmljQm9vbSxcbiAgYXNDaGluZGluZ3MsXG4gIGFzSnNvbixcbiAgZ2VuTG9nLFxuICBjcmVhdGVBcmdzTm9ybWFsaXplcixcbiAgc3RyaW5naWZ5LFxuICBidWlsZEZvcm1hdHRlcnMsXG4gIG5vcm1hbGl6ZURlc3RGaWxlRGVzY3JpcHRvclxufVxuIiwgIi8qKlxuICogUmVwcmVzZW50cyBkZWZhdWx0IGxvZyBsZXZlbCB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBERUZBVUxUX0xFVkVMUyA9IHtcbiAgdHJhY2U6IDEwLFxuICBkZWJ1ZzogMjAsXG4gIGluZm86IDMwLFxuICB3YXJuOiA0MCxcbiAgZXJyb3I6IDUwLFxuICBmYXRhbDogNjBcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHNvcnQgb3JkZXIgZGlyZWN0aW9uOiBgYXNjZW5kaW5nYCBvciBgZGVzY2VuZGluZ2BcbiAqXG4gKiBAZW51bSB7c3RyaW5nfVxuICovXG5jb25zdCBTT1JUSU5HX09SREVSID0ge1xuICBBU0M6ICdBU0MnLFxuICBERVNDOiAnREVTQydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIERFRkFVTFRfTEVWRUxTLFxuICBTT1JUSU5HX09SREVSXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG4vKiBlc2xpbnQgbm8tcHJvdG90eXBlLWJ1aWx0aW5zOiAwICovXG5jb25zdCB7XG4gIGxzQ2FjaGVTeW0sXG4gIGxldmVsVmFsU3ltLFxuICB1c2VPbmx5Q3VzdG9tTGV2ZWxzU3ltLFxuICBzdHJlYW1TeW0sXG4gIGZvcm1hdHRlcnNTeW0sXG4gIGhvb2tzU3ltLFxuICBsZXZlbENvbXBTeW1cbn0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxuY29uc3QgeyBub29wLCBnZW5Mb2cgfSA9IHJlcXVpcmUoJy4vdG9vbHMnKVxuY29uc3QgeyBERUZBVUxUX0xFVkVMUywgU09SVElOR19PUkRFUiB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuXG5jb25zdCBsZXZlbE1ldGhvZHMgPSB7XG4gIGZhdGFsOiAoaG9vaykgPT4ge1xuICAgIGNvbnN0IGxvZ0ZhdGFsID0gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLmZhdGFsLCBob29rKVxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgY29uc3Qgc3RyZWFtID0gdGhpc1tzdHJlYW1TeW1dXG4gICAgICBsb2dGYXRhbC5jYWxsKHRoaXMsIC4uLmFyZ3MpXG4gICAgICBpZiAodHlwZW9mIHN0cmVhbS5mbHVzaFN5bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdHJlYW0uZmx1c2hTeW5jKClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waW5vanMvcGluby9wdWxsLzc0MCNkaXNjdXNzaW9uX3IzNDY3ODgzMTNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZXJyb3I6IChob29rKSA9PiBnZW5Mb2coREVGQVVMVF9MRVZFTFMuZXJyb3IsIGhvb2spLFxuICB3YXJuOiAoaG9vaykgPT4gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLndhcm4sIGhvb2spLFxuICBpbmZvOiAoaG9vaykgPT4gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLmluZm8sIGhvb2spLFxuICBkZWJ1ZzogKGhvb2spID0+IGdlbkxvZyhERUZBVUxUX0xFVkVMUy5kZWJ1ZywgaG9vayksXG4gIHRyYWNlOiAoaG9vaykgPT4gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLnRyYWNlLCBob29rKVxufVxuXG5jb25zdCBudW1zID0gT2JqZWN0LmtleXMoREVGQVVMVF9MRVZFTFMpLnJlZHVjZSgobywgaykgPT4ge1xuICBvW0RFRkFVTFRfTEVWRUxTW2tdXSA9IGtcbiAgcmV0dXJuIG9cbn0sIHt9KVxuXG5jb25zdCBpbml0aWFsTHNDYWNoZSA9IE9iamVjdC5rZXlzKG51bXMpLnJlZHVjZSgobywgaykgPT4ge1xuICBvW2tdID0gJ3tcImxldmVsXCI6JyArIE51bWJlcihrKVxuICByZXR1cm4gb1xufSwge30pXG5cbmZ1bmN0aW9uIGdlbkxzQ2FjaGUgKGluc3RhbmNlKSB7XG4gIGNvbnN0IGZvcm1hdHRlciA9IGluc3RhbmNlW2Zvcm1hdHRlcnNTeW1dLmxldmVsXG4gIGNvbnN0IHsgbGFiZWxzIH0gPSBpbnN0YW5jZS5sZXZlbHNcbiAgY29uc3QgY2FjaGUgPSB7fVxuICBmb3IgKGNvbnN0IGxhYmVsIGluIGxhYmVscykge1xuICAgIGNvbnN0IGxldmVsID0gZm9ybWF0dGVyKGxhYmVsc1tsYWJlbF0sIE51bWJlcihsYWJlbCkpXG4gICAgY2FjaGVbbGFiZWxdID0gSlNPTi5zdHJpbmdpZnkobGV2ZWwpLnNsaWNlKDAsIC0xKVxuICB9XG4gIGluc3RhbmNlW2xzQ2FjaGVTeW1dID0gY2FjaGVcbiAgcmV0dXJuIGluc3RhbmNlXG59XG5cbmZ1bmN0aW9uIGlzU3RhbmRhcmRMZXZlbCAobGV2ZWwsIHVzZU9ubHlDdXN0b21MZXZlbHMpIHtcbiAgaWYgKHVzZU9ubHlDdXN0b21MZXZlbHMpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHN3aXRjaCAobGV2ZWwpIHtcbiAgICBjYXNlICdmYXRhbCc6XG4gICAgY2FzZSAnZXJyb3InOlxuICAgIGNhc2UgJ3dhcm4nOlxuICAgIGNhc2UgJ2luZm8nOlxuICAgIGNhc2UgJ2RlYnVnJzpcbiAgICBjYXNlICd0cmFjZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRMZXZlbCAobGV2ZWwpIHtcbiAgY29uc3QgeyBsYWJlbHMsIHZhbHVlcyB9ID0gdGhpcy5sZXZlbHNcbiAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAobGFiZWxzW2xldmVsXSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcigndW5rbm93biBsZXZlbCB2YWx1ZScgKyBsZXZlbClcbiAgICBsZXZlbCA9IGxhYmVsc1tsZXZlbF1cbiAgfVxuICBpZiAodmFsdWVzW2xldmVsXSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcigndW5rbm93biBsZXZlbCAnICsgbGV2ZWwpXG4gIGNvbnN0IHByZUxldmVsVmFsID0gdGhpc1tsZXZlbFZhbFN5bV1cbiAgY29uc3QgbGV2ZWxWYWwgPSB0aGlzW2xldmVsVmFsU3ltXSA9IHZhbHVlc1tsZXZlbF1cbiAgY29uc3QgdXNlT25seUN1c3RvbUxldmVsc1ZhbCA9IHRoaXNbdXNlT25seUN1c3RvbUxldmVsc1N5bV1cbiAgY29uc3QgbGV2ZWxDb21wYXJpc29uID0gdGhpc1tsZXZlbENvbXBTeW1dXG4gIGNvbnN0IGhvb2sgPSB0aGlzW2hvb2tzU3ltXS5sb2dNZXRob2RcblxuICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZXMpIHtcbiAgICBpZiAobGV2ZWxDb21wYXJpc29uKHZhbHVlc1trZXldLCBsZXZlbFZhbCkgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzW2tleV0gPSBub29wXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICB0aGlzW2tleV0gPSBpc1N0YW5kYXJkTGV2ZWwoa2V5LCB1c2VPbmx5Q3VzdG9tTGV2ZWxzVmFsKSA/IGxldmVsTWV0aG9kc1trZXldKGhvb2spIDogZ2VuTG9nKHZhbHVlc1trZXldLCBob29rKVxuICB9XG5cbiAgdGhpcy5lbWl0KFxuICAgICdsZXZlbC1jaGFuZ2UnLFxuICAgIGxldmVsLFxuICAgIGxldmVsVmFsLFxuICAgIGxhYmVsc1twcmVMZXZlbFZhbF0sXG4gICAgcHJlTGV2ZWxWYWwsXG4gICAgdGhpc1xuICApXG59XG5cbmZ1bmN0aW9uIGdldExldmVsIChsZXZlbCkge1xuICBjb25zdCB7IGxldmVscywgbGV2ZWxWYWwgfSA9IHRoaXNcbiAgLy8gcHJvdGVjdGlvbiBhZ2FpbnN0IHBvdGVudGlhbCBsb3NzIG9mIFBpbm8gc2NvcGUgZnJvbSBzZXJpYWxpemVycyAoZWRnZSBjYXNlIHdpdGggY2lyY3VsYXIgcmVmcyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9waW5vanMvcGluby9pc3N1ZXMvODMzKVxuICByZXR1cm4gKGxldmVscyAmJiBsZXZlbHMubGFiZWxzKSA/IGxldmVscy5sYWJlbHNbbGV2ZWxWYWxdIDogJydcbn1cblxuZnVuY3Rpb24gaXNMZXZlbEVuYWJsZWQgKGxvZ0xldmVsKSB7XG4gIGNvbnN0IHsgdmFsdWVzIH0gPSB0aGlzLmxldmVsc1xuICBjb25zdCBsb2dMZXZlbFZhbCA9IHZhbHVlc1tsb2dMZXZlbF1cbiAgcmV0dXJuIGxvZ0xldmVsVmFsICE9PSB1bmRlZmluZWQgJiYgdGhpc1tsZXZlbENvbXBTeW1dKGxvZ0xldmVsVmFsLCB0aGlzW2xldmVsVmFsU3ltXSlcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdGhlIGdpdmVuIGBjdXJyZW50YCBsZXZlbCBpcyBlbmFibGVkIGJ5IGNvbXBhcmluZyBpdFxuICogYWdhaW5zdCB0aGUgY3VycmVudCB0aHJlc2hvbGQgKGBleHBlY3RlZGApLlxuICpcbiAqIEBwYXJhbSB7U09SVElOR19PUkRFUn0gZGlyZWN0aW9uIGNvbXBhcmlzb24gZGlyZWN0aW9uIFwiQVNDXCIgb3IgXCJERVNDXCJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50IGN1cnJlbnQgbG9nIGxldmVsIG51bWJlciByZXByZXNlbnRhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGV4cGVjdGVkIHRocmVzaG9sZCB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBjb21wYXJlTGV2ZWwgKGRpcmVjdGlvbiwgY3VycmVudCwgZXhwZWN0ZWQpIHtcbiAgaWYgKGRpcmVjdGlvbiA9PT0gU09SVElOR19PUkRFUi5ERVNDKSB7XG4gICAgcmV0dXJuIGN1cnJlbnQgPD0gZXhwZWN0ZWRcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50ID49IGV4cGVjdGVkXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbGV2ZWwgY29tcGFyaXNvbiBmdW5jdGlvbiBiYXNlZCBvbiBgbGV2ZWxDb21wYXJpc29uYFxuICogaXQgY291bGQgYSBkZWZhdWx0IGZ1bmN0aW9uIHdoaWNoIGNvbXBhcmVzIGxldmVscyBlaXRoZXIgaW4gXCJhc2NlbmRpbmdcIiBvciBcImRlc2NlbmRpbmdcIiBvcmRlciBvciBjdXN0b20gY29tcGFyaXNvbiBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U09SVElOR19PUkRFUiB8IEZ1bmN0aW9ufSBsZXZlbENvbXBhcmlzb24gc29ydCBsZXZlbHMgb3JkZXIgZGlyZWN0aW9uIG9yIGN1c3RvbSBjb21wYXJpc29uIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBGdW5jdGlvblxuICovXG5mdW5jdGlvbiBnZW5MZXZlbENvbXBhcmlzb24gKGxldmVsQ29tcGFyaXNvbikge1xuICBpZiAodHlwZW9mIGxldmVsQ29tcGFyaXNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gY29tcGFyZUxldmVsLmJpbmQobnVsbCwgbGV2ZWxDb21wYXJpc29uKVxuICB9XG5cbiAgcmV0dXJuIGxldmVsQ29tcGFyaXNvblxufVxuXG5mdW5jdGlvbiBtYXBwaW5ncyAoY3VzdG9tTGV2ZWxzID0gbnVsbCwgdXNlT25seUN1c3RvbUxldmVscyA9IGZhbHNlKSB7XG4gIGNvbnN0IGN1c3RvbU51bXMgPSBjdXN0b21MZXZlbHNcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgID8gT2JqZWN0LmtleXMoY3VzdG9tTGV2ZWxzKS5yZWR1Y2UoKG8sIGspID0+IHtcbiAgICAgICAgb1tjdXN0b21MZXZlbHNba11dID0ga1xuICAgICAgICByZXR1cm4gb1xuICAgICAgfSwge30pXG4gICAgOiBudWxsXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIGNvbnN0IGxhYmVscyA9IE9iamVjdC5hc3NpZ24oXG4gICAgT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7IEluZmluaXR5OiB7IHZhbHVlOiAnc2lsZW50JyB9IH0pLFxuICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBudWxsIDogbnVtcyxcbiAgICBjdXN0b21OdW1zXG4gIClcbiAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmFzc2lnbihcbiAgICBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHsgc2lsZW50OiB7IHZhbHVlOiBJbmZpbml0eSB9IH0pLFxuICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBudWxsIDogREVGQVVMVF9MRVZFTFMsXG4gICAgY3VzdG9tTGV2ZWxzXG4gIClcbiAgcmV0dXJuIHsgbGFiZWxzLCB2YWx1ZXMgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnREZWZhdWx0TGV2ZWxGb3VuZCAoZGVmYXVsdExldmVsLCBjdXN0b21MZXZlbHMsIHVzZU9ubHlDdXN0b21MZXZlbHMpIHtcbiAgaWYgKHR5cGVvZiBkZWZhdWx0TGV2ZWwgPT09ICdudW1iZXInKSB7XG4gICAgY29uc3QgdmFsdWVzID0gW10uY29uY2F0KFxuICAgICAgT2JqZWN0LmtleXMoY3VzdG9tTGV2ZWxzIHx8IHt9KS5tYXAoa2V5ID0+IGN1c3RvbUxldmVsc1trZXldKSxcbiAgICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBbXSA6IE9iamVjdC5rZXlzKG51bXMpLm1hcChsZXZlbCA9PiArbGV2ZWwpLFxuICAgICAgSW5maW5pdHlcbiAgICApXG4gICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXMoZGVmYXVsdExldmVsKSkge1xuICAgICAgdGhyb3cgRXJyb3IoYGRlZmF1bHQgbGV2ZWw6JHtkZWZhdWx0TGV2ZWx9IG11c3QgYmUgaW5jbHVkZWQgaW4gY3VzdG9tIGxldmVsc2ApXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgbGFiZWxzID0gT2JqZWN0LmFzc2lnbihcbiAgICBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHsgc2lsZW50OiB7IHZhbHVlOiBJbmZpbml0eSB9IH0pLFxuICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBudWxsIDogREVGQVVMVF9MRVZFTFMsXG4gICAgY3VzdG9tTGV2ZWxzXG4gIClcbiAgaWYgKCEoZGVmYXVsdExldmVsIGluIGxhYmVscykpIHtcbiAgICB0aHJvdyBFcnJvcihgZGVmYXVsdCBsZXZlbDoke2RlZmF1bHRMZXZlbH0gbXVzdCBiZSBpbmNsdWRlZCBpbiBjdXN0b20gbGV2ZWxzYClcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnROb0xldmVsQ29sbGlzaW9ucyAobGV2ZWxzLCBjdXN0b21MZXZlbHMpIHtcbiAgY29uc3QgeyBsYWJlbHMsIHZhbHVlcyB9ID0gbGV2ZWxzXG4gIGZvciAoY29uc3QgayBpbiBjdXN0b21MZXZlbHMpIHtcbiAgICBpZiAoayBpbiB2YWx1ZXMpIHtcbiAgICAgIHRocm93IEVycm9yKCdsZXZlbHMgY2Fubm90IGJlIG92ZXJyaWRkZW4nKVxuICAgIH1cbiAgICBpZiAoY3VzdG9tTGV2ZWxzW2tdIGluIGxhYmVscykge1xuICAgICAgdGhyb3cgRXJyb3IoJ3ByZS1leGlzdGluZyBsZXZlbCB2YWx1ZXMgY2Fubm90IGJlIHVzZWQgZm9yIG5ldyBsZXZlbHMnKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIGBsZXZlbENvbXBhcmlzb25gIGlzIGNvcnJlY3RcbiAqXG4gKiBAdGhyb3dzIEVycm9yXG4gKiBAcGFyYW0ge1NPUlRJTkdfT1JERVIgfCBGdW5jdGlvbn0gbGV2ZWxDb21wYXJpc29uIC0gdmFsdWUgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIGFzc2VydExldmVsQ29tcGFyaXNvbiAobGV2ZWxDb21wYXJpc29uKSB7XG4gIGlmICh0eXBlb2YgbGV2ZWxDb21wYXJpc29uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIGxldmVsQ29tcGFyaXNvbiA9PT0gJ3N0cmluZycgJiYgT2JqZWN0LnZhbHVlcyhTT1JUSU5HX09SREVSKS5pbmNsdWRlcyhsZXZlbENvbXBhcmlzb24pKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ0xldmVscyBjb21wYXJpc29uIHNob3VsZCBiZSBvbmUgb2YgXCJBU0NcIiwgXCJERVNDXCIgb3IgXCJmdW5jdGlvblwiIHR5cGUnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdGlhbExzQ2FjaGUsXG4gIGdlbkxzQ2FjaGUsXG4gIGxldmVsTWV0aG9kcyxcbiAgZ2V0TGV2ZWwsXG4gIHNldExldmVsLFxuICBpc0xldmVsRW5hYmxlZCxcbiAgbWFwcGluZ3MsXG4gIGFzc2VydE5vTGV2ZWxDb2xsaXNpb25zLFxuICBhc3NlcnREZWZhdWx0TGV2ZWxGb3VuZCxcbiAgZ2VuTGV2ZWxDb21wYXJpc29uLFxuICBhc3NlcnRMZXZlbENvbXBhcmlzb25cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICc5LjUuMCcgfVxuIiwgIid1c2Ugc3RyaWN0J1xuXG4vKiBlc2xpbnQgbm8tcHJvdG90eXBlLWJ1aWx0aW5zOiAwICovXG5cbmNvbnN0IHsgRXZlbnRFbWl0dGVyIH0gPSByZXF1aXJlKCdub2RlOmV2ZW50cycpXG5jb25zdCB7XG4gIGxzQ2FjaGVTeW0sXG4gIGxldmVsVmFsU3ltLFxuICBzZXRMZXZlbFN5bSxcbiAgZ2V0TGV2ZWxTeW0sXG4gIGNoaW5kaW5nc1N5bSxcbiAgcGFyc2VkQ2hpbmRpbmdzU3ltLFxuICBtaXhpblN5bSxcbiAgYXNKc29uU3ltLFxuICB3cml0ZVN5bSxcbiAgbWl4aW5NZXJnZVN0cmF0ZWd5U3ltLFxuICB0aW1lU3ltLFxuICB0aW1lU2xpY2VJbmRleFN5bSxcbiAgc3RyZWFtU3ltLFxuICBzZXJpYWxpemVyc1N5bSxcbiAgZm9ybWF0dGVyc1N5bSxcbiAgZXJyb3JLZXlTeW0sXG4gIG1lc3NhZ2VLZXlTeW0sXG4gIHVzZU9ubHlDdXN0b21MZXZlbHNTeW0sXG4gIG5lZWRzTWV0YWRhdGFHc3ltLFxuICByZWRhY3RGbXRTeW0sXG4gIHN0cmluZ2lmeVN5bSxcbiAgZm9ybWF0T3B0c1N5bSxcbiAgc3RyaW5naWZpZXJzU3ltLFxuICBtc2dQcmVmaXhTeW1cbn0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxuY29uc3Qge1xuICBnZXRMZXZlbCxcbiAgc2V0TGV2ZWwsXG4gIGlzTGV2ZWxFbmFibGVkLFxuICBtYXBwaW5ncyxcbiAgaW5pdGlhbExzQ2FjaGUsXG4gIGdlbkxzQ2FjaGUsXG4gIGFzc2VydE5vTGV2ZWxDb2xsaXNpb25zXG59ID0gcmVxdWlyZSgnLi9sZXZlbHMnKVxuY29uc3Qge1xuICBhc0NoaW5kaW5ncyxcbiAgYXNKc29uLFxuICBidWlsZEZvcm1hdHRlcnMsXG4gIHN0cmluZ2lmeVxufSA9IHJlcXVpcmUoJy4vdG9vbHMnKVxuY29uc3Qge1xuICB2ZXJzaW9uXG59ID0gcmVxdWlyZSgnLi9tZXRhJylcbmNvbnN0IHJlZGFjdGlvbiA9IHJlcXVpcmUoJy4vcmVkYWN0aW9uJylcblxuLy8gbm90ZTogdXNlIG9mIGNsYXNzIGlzIHNhdGlyaWNhbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bpbm9qcy9waW5vL3B1bGwvNDMzI3B1bGxyZXF1ZXN0cmV2aWV3LTEyNzcwMzEyN1xuY29uc3QgY29uc3RydWN0b3IgPSBjbGFzcyBQaW5vIHt9XG5jb25zdCBwcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yLFxuICBjaGlsZCxcbiAgYmluZGluZ3MsXG4gIHNldEJpbmRpbmdzLFxuICBmbHVzaCxcbiAgaXNMZXZlbEVuYWJsZWQsXG4gIHZlcnNpb24sXG4gIGdldCBsZXZlbCAoKSB7IHJldHVybiB0aGlzW2dldExldmVsU3ltXSgpIH0sXG4gIHNldCBsZXZlbCAobHZsKSB7IHRoaXNbc2V0TGV2ZWxTeW1dKGx2bCkgfSxcbiAgZ2V0IGxldmVsVmFsICgpIHsgcmV0dXJuIHRoaXNbbGV2ZWxWYWxTeW1dIH0sXG4gIHNldCBsZXZlbFZhbCAobikgeyB0aHJvdyBFcnJvcignbGV2ZWxWYWwgaXMgcmVhZC1vbmx5JykgfSxcbiAgW2xzQ2FjaGVTeW1dOiBpbml0aWFsTHNDYWNoZSxcbiAgW3dyaXRlU3ltXTogd3JpdGUsXG4gIFthc0pzb25TeW1dOiBhc0pzb24sXG4gIFtnZXRMZXZlbFN5bV06IGdldExldmVsLFxuICBbc2V0TGV2ZWxTeW1dOiBzZXRMZXZlbFxufVxuXG5PYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG90eXBlLCBFdmVudEVtaXR0ZXIucHJvdG90eXBlKVxuXG4vLyBleHBvcnRpbmcgYW5kIGNvbnN1bWluZyB0aGUgcHJvdG90eXBlIG9iamVjdCB1c2luZyBmYWN0b3J5IHBhdHRlcm4gZml4ZXMgc2NvcGluZyBpc3N1ZXMgd2l0aCBnZXR0ZXJzIHdoZW4gc2VyaWFsaXppbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpXG59XG5cbmNvbnN0IHJlc2V0Q2hpbGRpbmdzRm9ybWF0dGVyID0gYmluZGluZ3MgPT4gYmluZGluZ3NcbmZ1bmN0aW9uIGNoaWxkIChiaW5kaW5ncywgb3B0aW9ucykge1xuICBpZiAoIWJpbmRpbmdzKSB7XG4gICAgdGhyb3cgRXJyb3IoJ21pc3NpbmcgYmluZGluZ3MgZm9yIGNoaWxkIFBpbm8nKVxuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9IC8vIGRlZmF1bHQgb3B0aW9ucyB0byBlbXB0eSBvYmplY3RcbiAgY29uc3Qgc2VyaWFsaXplcnMgPSB0aGlzW3NlcmlhbGl6ZXJzU3ltXVxuICBjb25zdCBmb3JtYXR0ZXJzID0gdGhpc1tmb3JtYXR0ZXJzU3ltXVxuICBjb25zdCBpbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUodGhpcylcblxuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2VyaWFsaXplcnMnKSA9PT0gdHJ1ZSkge1xuICAgIGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICAgIGZvciAoY29uc3QgayBpbiBzZXJpYWxpemVycykge1xuICAgICAgaW5zdGFuY2Vbc2VyaWFsaXplcnNTeW1dW2tdID0gc2VyaWFsaXplcnNba11cbiAgICB9XG4gICAgY29uc3QgcGFyZW50U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc2VyaWFsaXplcnMpXG4gICAgLyogZXNsaW50IG5vLXZhcjogb2ZmICovXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnRTeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrcyA9IHBhcmVudFN5bWJvbHNbaV1cbiAgICAgIGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXVtrc10gPSBzZXJpYWxpemVyc1trc11cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGJrIGluIG9wdGlvbnMuc2VyaWFsaXplcnMpIHtcbiAgICAgIGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXVtia10gPSBvcHRpb25zLnNlcmlhbGl6ZXJzW2JrXVxuICAgIH1cbiAgICBjb25zdCBiaW5kaW5nc1N5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9wdGlvbnMuc2VyaWFsaXplcnMpXG4gICAgZm9yICh2YXIgYmkgPSAwOyBiaSA8IGJpbmRpbmdzU3ltYm9scy5sZW5ndGg7IGJpKyspIHtcbiAgICAgIGNvbnN0IGJrcyA9IGJpbmRpbmdzU3ltYm9sc1tiaV1cbiAgICAgIGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXVtia3NdID0gb3B0aW9ucy5zZXJpYWxpemVyc1tia3NdXG4gICAgfVxuICB9IGVsc2UgaW5zdGFuY2Vbc2VyaWFsaXplcnNTeW1dID0gc2VyaWFsaXplcnNcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Zvcm1hdHRlcnMnKSkge1xuICAgIGNvbnN0IHsgbGV2ZWwsIGJpbmRpbmdzOiBjaGluZGluZ3MsIGxvZyB9ID0gb3B0aW9ucy5mb3JtYXR0ZXJzXG4gICAgaW5zdGFuY2VbZm9ybWF0dGVyc1N5bV0gPSBidWlsZEZvcm1hdHRlcnMoXG4gICAgICBsZXZlbCB8fCBmb3JtYXR0ZXJzLmxldmVsLFxuICAgICAgY2hpbmRpbmdzIHx8IHJlc2V0Q2hpbGRpbmdzRm9ybWF0dGVyLFxuICAgICAgbG9nIHx8IGZvcm1hdHRlcnMubG9nXG4gICAgKVxuICB9IGVsc2Uge1xuICAgIGluc3RhbmNlW2Zvcm1hdHRlcnNTeW1dID0gYnVpbGRGb3JtYXR0ZXJzKFxuICAgICAgZm9ybWF0dGVycy5sZXZlbCxcbiAgICAgIHJlc2V0Q2hpbGRpbmdzRm9ybWF0dGVyLFxuICAgICAgZm9ybWF0dGVycy5sb2dcbiAgICApXG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2N1c3RvbUxldmVscycpID09PSB0cnVlKSB7XG4gICAgYXNzZXJ0Tm9MZXZlbENvbGxpc2lvbnModGhpcy5sZXZlbHMsIG9wdGlvbnMuY3VzdG9tTGV2ZWxzKVxuICAgIGluc3RhbmNlLmxldmVscyA9IG1hcHBpbmdzKG9wdGlvbnMuY3VzdG9tTGV2ZWxzLCBpbnN0YW5jZVt1c2VPbmx5Q3VzdG9tTGV2ZWxzU3ltXSlcbiAgICBnZW5Mc0NhY2hlKGluc3RhbmNlKVxuICB9XG5cbiAgLy8gcmVkYWN0IG11c3QgcGxhY2UgYmVmb3JlIGFzQ2hpbmRpbmdzIGFuZCBvbmx5IHJlcGxhY2UgaWYgZXhpc3RcbiAgaWYgKCh0eXBlb2Ygb3B0aW9ucy5yZWRhY3QgPT09ICdvYmplY3QnICYmIG9wdGlvbnMucmVkYWN0ICE9PSBudWxsKSB8fCBBcnJheS5pc0FycmF5KG9wdGlvbnMucmVkYWN0KSkge1xuICAgIGluc3RhbmNlLnJlZGFjdCA9IG9wdGlvbnMucmVkYWN0IC8vIHJlcGxhY2UgcmVkYWN0IGRpcmVjdGx5XG4gICAgY29uc3Qgc3RyaW5naWZpZXJzID0gcmVkYWN0aW9uKGluc3RhbmNlLnJlZGFjdCwgc3RyaW5naWZ5KVxuICAgIGNvbnN0IGZvcm1hdE9wdHMgPSB7IHN0cmluZ2lmeTogc3RyaW5naWZpZXJzW3JlZGFjdEZtdFN5bV0gfVxuICAgIGluc3RhbmNlW3N0cmluZ2lmeVN5bV0gPSBzdHJpbmdpZnlcbiAgICBpbnN0YW5jZVtzdHJpbmdpZmllcnNTeW1dID0gc3RyaW5naWZpZXJzXG4gICAgaW5zdGFuY2VbZm9ybWF0T3B0c1N5bV0gPSBmb3JtYXRPcHRzXG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMubXNnUHJlZml4ID09PSAnc3RyaW5nJykge1xuICAgIGluc3RhbmNlW21zZ1ByZWZpeFN5bV0gPSAodGhpc1ttc2dQcmVmaXhTeW1dIHx8ICcnKSArIG9wdGlvbnMubXNnUHJlZml4XG4gIH1cblxuICBpbnN0YW5jZVtjaGluZGluZ3NTeW1dID0gYXNDaGluZGluZ3MoaW5zdGFuY2UsIGJpbmRpbmdzKVxuICBjb25zdCBjaGlsZExldmVsID0gb3B0aW9ucy5sZXZlbCB8fCB0aGlzLmxldmVsXG4gIGluc3RhbmNlW3NldExldmVsU3ltXShjaGlsZExldmVsKVxuICB0aGlzLm9uQ2hpbGQoaW5zdGFuY2UpXG4gIHJldHVybiBpbnN0YW5jZVxufVxuXG5mdW5jdGlvbiBiaW5kaW5ncyAoKSB7XG4gIGNvbnN0IGNoaW5kaW5ncyA9IHRoaXNbY2hpbmRpbmdzU3ltXVxuICBjb25zdCBjaGluZGluZ3NKc29uID0gYHske2NoaW5kaW5ncy5zdWJzdHIoMSl9fWAgLy8gYXQgbGVhc3QgY29udGFpbnMgLFwicGlkXCI6NzA2OCxcImhvc3RuYW1lXCI6XCJteU1hY1wiXG4gIGNvbnN0IGJpbmRpbmdzRnJvbUpzb24gPSBKU09OLnBhcnNlKGNoaW5kaW5nc0pzb24pXG4gIGRlbGV0ZSBiaW5kaW5nc0Zyb21Kc29uLnBpZFxuICBkZWxldGUgYmluZGluZ3NGcm9tSnNvbi5ob3N0bmFtZVxuICByZXR1cm4gYmluZGluZ3NGcm9tSnNvblxufVxuXG5mdW5jdGlvbiBzZXRCaW5kaW5ncyAobmV3QmluZGluZ3MpIHtcbiAgY29uc3QgY2hpbmRpbmdzID0gYXNDaGluZGluZ3ModGhpcywgbmV3QmluZGluZ3MpXG4gIHRoaXNbY2hpbmRpbmdzU3ltXSA9IGNoaW5kaW5nc1xuICBkZWxldGUgdGhpc1twYXJzZWRDaGluZGluZ3NTeW1dXG59XG5cbi8qKlxuICogRGVmYXVsdCBzdHJhdGVneSBmb3IgY3JlYXRpbmcgYG1lcmdlT2JqZWN0YCBmcm9tIGFyZ3VtZW50cyBhbmQgdGhlIHJlc3VsdCBmcm9tIGBtaXhpbigpYC5cbiAqIEZpZWxkcyBmcm9tIGBtZXJnZU9iamVjdGAgaGF2ZSBoaWdoZXIgcHJpb3JpdHkgaW4gdGhpcyBzdHJhdGVneS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbWVyZ2VPYmplY3QgVGhlIG9iamVjdCBhIHVzZXIgaGFzIHN1cHBsaWVkIHRvIHRoZSBsb2dnaW5nIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG1peGluT2JqZWN0IFRoZSByZXN1bHQgb2YgdGhlIGBtaXhpbmAgbWV0aG9kLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBkZWZhdWx0TWl4aW5NZXJnZVN0cmF0ZWd5IChtZXJnZU9iamVjdCwgbWl4aW5PYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWl4aW5PYmplY3QsIG1lcmdlT2JqZWN0KVxufVxuXG5mdW5jdGlvbiB3cml0ZSAoX29iaiwgbXNnLCBudW0pIHtcbiAgY29uc3QgdCA9IHRoaXNbdGltZVN5bV0oKVxuICBjb25zdCBtaXhpbiA9IHRoaXNbbWl4aW5TeW1dXG4gIGNvbnN0IGVycm9yS2V5ID0gdGhpc1tlcnJvcktleVN5bV1cbiAgY29uc3QgbWVzc2FnZUtleSA9IHRoaXNbbWVzc2FnZUtleVN5bV1cbiAgY29uc3QgbWl4aW5NZXJnZVN0cmF0ZWd5ID0gdGhpc1ttaXhpbk1lcmdlU3RyYXRlZ3lTeW1dIHx8IGRlZmF1bHRNaXhpbk1lcmdlU3RyYXRlZ3lcbiAgbGV0IG9ialxuXG4gIGlmIChfb2JqID09PSB1bmRlZmluZWQgfHwgX29iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHt9XG4gIH0gZWxzZSBpZiAoX29iaiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgb2JqID0geyBbZXJyb3JLZXldOiBfb2JqIH1cbiAgICBpZiAobXNnID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1zZyA9IF9vYmoubWVzc2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBvYmogPSBfb2JqXG4gICAgaWYgKG1zZyA9PT0gdW5kZWZpbmVkICYmIF9vYmpbbWVzc2FnZUtleV0gPT09IHVuZGVmaW5lZCAmJiBfb2JqW2Vycm9yS2V5XSkge1xuICAgICAgbXNnID0gX29ialtlcnJvcktleV0ubWVzc2FnZVxuICAgIH1cbiAgfVxuXG4gIGlmIChtaXhpbikge1xuICAgIG9iaiA9IG1peGluTWVyZ2VTdHJhdGVneShvYmosIG1peGluKG9iaiwgbnVtLCB0aGlzKSlcbiAgfVxuXG4gIGNvbnN0IHMgPSB0aGlzW2FzSnNvblN5bV0ob2JqLCBtc2csIG51bSwgdClcblxuICBjb25zdCBzdHJlYW0gPSB0aGlzW3N0cmVhbVN5bV1cbiAgaWYgKHN0cmVhbVtuZWVkc01ldGFkYXRhR3N5bV0gPT09IHRydWUpIHtcbiAgICBzdHJlYW0ubGFzdExldmVsID0gbnVtXG4gICAgc3RyZWFtLmxhc3RPYmogPSBvYmpcbiAgICBzdHJlYW0ubGFzdE1zZyA9IG1zZ1xuICAgIHN0cmVhbS5sYXN0VGltZSA9IHQuc2xpY2UodGhpc1t0aW1lU2xpY2VJbmRleFN5bV0pXG4gICAgc3RyZWFtLmxhc3RMb2dnZXIgPSB0aGlzIC8vIGZvciBjaGlsZCBsb2dnZXJzXG4gIH1cbiAgc3RyZWFtLndyaXRlKHMpXG59XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gZmx1c2ggKGNiKSB7XG4gIGlmIChjYiAhPSBudWxsICYmIHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IEVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB9XG5cbiAgY29uc3Qgc3RyZWFtID0gdGhpc1tzdHJlYW1TeW1dXG5cbiAgaWYgKHR5cGVvZiBzdHJlYW0uZmx1c2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICBzdHJlYW0uZmx1c2goY2IgfHwgbm9vcClcbiAgfSBlbHNlIGlmIChjYikgY2IoKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IGhhc093blByb3BlcnR5IH0gPSBPYmplY3QucHJvdG90eXBlXG5cbmNvbnN0IHN0cmluZ2lmeSA9IGNvbmZpZ3VyZSgpXG5cbi8vIEB0cy1leHBlY3QtZXJyb3JcbnN0cmluZ2lmeS5jb25maWd1cmUgPSBjb25maWd1cmVcbi8vIEB0cy1leHBlY3QtZXJyb3JcbnN0cmluZ2lmeS5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuc3RyaW5naWZ5LmRlZmF1bHQgPSBzdHJpbmdpZnlcblxuLy8gQHRzLWV4cGVjdC1lcnJvciB1c2VkIGZvciBuYW1lZCBleHBvcnRcbmV4cG9ydHMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5XG4vLyBAdHMtZXhwZWN0LWVycm9yIHVzZWQgZm9yIG5hbWVkIGV4cG9ydFxuZXhwb3J0cy5jb25maWd1cmUgPSBjb25maWd1cmVcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbmNvbnN0IHN0ckVzY2FwZVNlcXVlbmNlc1JlZ0V4cCA9IC9bXFx1MDAwMC1cXHUwMDFmXFx1MDAyMlxcdTAwNWNcXHVkODAwLVxcdWRmZmZdL1xuXG4vLyBFc2NhcGUgQzAgY29udHJvbCBjaGFyYWN0ZXJzLCBkb3VibGUgcXVvdGVzLCB0aGUgYmFja3NsYXNoIGFuZCBldmVyeSBjb2RlXG4vLyB1bml0IHdpdGggYSBudW1lcmljIHZhbHVlIGluIHRoZSBpbmNsdXNpdmUgcmFuZ2UgMHhEODAwIHRvIDB4REZGRi5cbmZ1bmN0aW9uIHN0ckVzY2FwZSAoc3RyKSB7XG4gIC8vIFNvbWUgbWFnaWMgbnVtYmVycyB0aGF0IHdvcmtlZCBvdXQgZmluZSB3aGlsZSBiZW5jaG1hcmtpbmcgd2l0aCB2OCA4LjBcbiAgaWYgKHN0ci5sZW5ndGggPCA1MDAwICYmICFzdHJFc2NhcGVTZXF1ZW5jZXNSZWdFeHAudGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIGBcIiR7c3RyfVwiYFxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShzdHIpXG59XG5cbmZ1bmN0aW9uIHNvcnQgKGFycmF5LCBjb21wYXJhdG9yKSB7XG4gIC8vIEluc2VydGlvbiBzb3J0IGlzIHZlcnkgZWZmaWNpZW50IGZvciBzbWFsbCBpbnB1dCBzaXplcywgYnV0IGl0IGhhcyBhIGJhZFxuICAvLyB3b3JzdCBjYXNlIGNvbXBsZXhpdHkuIFRodXMsIHVzZSBuYXRpdmUgYXJyYXkgc29ydCBmb3IgYmlnZ2VyIHZhbHVlcy5cbiAgaWYgKGFycmF5Lmxlbmd0aCA+IDJlMiB8fCBjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIGFycmF5LnNvcnQoY29tcGFyYXRvcilcbiAgfVxuICBmb3IgKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gYXJyYXlbaV1cbiAgICBsZXQgcG9zaXRpb24gPSBpXG4gICAgd2hpbGUgKHBvc2l0aW9uICE9PSAwICYmIGFycmF5W3Bvc2l0aW9uIC0gMV0gPiBjdXJyZW50VmFsdWUpIHtcbiAgICAgIGFycmF5W3Bvc2l0aW9uXSA9IGFycmF5W3Bvc2l0aW9uIC0gMV1cbiAgICAgIHBvc2l0aW9uLS1cbiAgICB9XG4gICAgYXJyYXlbcG9zaXRpb25dID0gY3VycmVudFZhbHVlXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmNvbnN0IHR5cGVkQXJyYXlQcm90b3R5cGVHZXRTeW1ib2xUb1N0cmluZ1RhZyA9XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKFxuICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKFxuICAgICAgICBuZXcgSW50OEFycmF5KClcbiAgICAgIClcbiAgICApLFxuICAgIFN5bWJvbC50b1N0cmluZ1RhZ1xuICApLmdldFxuXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXlXaXRoRW50cmllcyAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVkQXJyYXlQcm90b3R5cGVHZXRTeW1ib2xUb1N0cmluZ1RhZy5jYWxsKHZhbHVlKSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmxlbmd0aCAhPT0gMFxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlUeXBlZEFycmF5IChhcnJheSwgc2VwYXJhdG9yLCBtYXhpbXVtQnJlYWR0aCkge1xuICBpZiAoYXJyYXkubGVuZ3RoIDwgbWF4aW11bUJyZWFkdGgpIHtcbiAgICBtYXhpbXVtQnJlYWR0aCA9IGFycmF5Lmxlbmd0aFxuICB9XG4gIGNvbnN0IHdoaXRlc3BhY2UgPSBzZXBhcmF0b3IgPT09ICcsJyA/ICcnIDogJyAnXG4gIGxldCByZXMgPSBgXCIwXCI6JHt3aGl0ZXNwYWNlfSR7YXJyYXlbMF19YFxuICBmb3IgKGxldCBpID0gMTsgaSA8IG1heGltdW1CcmVhZHRoOyBpKyspIHtcbiAgICByZXMgKz0gYCR7c2VwYXJhdG9yfVwiJHtpfVwiOiR7d2hpdGVzcGFjZX0ke2FycmF5W2ldfWBcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGdldENpcmN1bGFyVmFsdWVPcHRpb24gKG9wdGlvbnMpIHtcbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgJ2NpcmN1bGFyVmFsdWUnKSkge1xuICAgIGNvbnN0IGNpcmN1bGFyVmFsdWUgPSBvcHRpb25zLmNpcmN1bGFyVmFsdWVcbiAgICBpZiAodHlwZW9mIGNpcmN1bGFyVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gYFwiJHtjaXJjdWxhclZhbHVlfVwiYFxuICAgIH1cbiAgICBpZiAoY2lyY3VsYXJWYWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY2lyY3VsYXJWYWx1ZVxuICAgIH1cbiAgICBpZiAoY2lyY3VsYXJWYWx1ZSA9PT0gRXJyb3IgfHwgY2lyY3VsYXJWYWx1ZSA9PT0gVHlwZUVycm9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b1N0cmluZyAoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ29udmVydGluZyBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gSlNPTicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiY2lyY3VsYXJWYWx1ZVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBzdHJpbmcgb3IgdGhlIHZhbHVlIG51bGwgb3IgdW5kZWZpbmVkJylcbiAgfVxuICByZXR1cm4gJ1wiW0NpcmN1bGFyXVwiJ1xufVxuXG5mdW5jdGlvbiBnZXREZXRlcm1pbmlzdGljT3B0aW9uIChvcHRpb25zKSB7XG4gIGxldCB2YWx1ZVxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpKSB7XG4gICAgdmFsdWUgPSBvcHRpb25zLmRldGVybWluaXN0aWNcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJkZXRlcm1pbmlzdGljXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIGJvb2xlYW4gb3IgY29tcGFyYXRvciBmdW5jdGlvbicpXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIGdldEJvb2xlYW5PcHRpb24gKG9wdGlvbnMsIGtleSkge1xuICBsZXQgdmFsdWVcbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywga2V5KSkge1xuICAgIHZhbHVlID0gb3B0aW9uc1trZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXCIke2tleX1cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbmApXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIGdldFBvc2l0aXZlSW50ZWdlck9wdGlvbiAob3B0aW9ucywga2V5KSB7XG4gIGxldCB2YWx1ZVxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBrZXkpKSB7XG4gICAgdmFsdWUgPSBvcHRpb25zW2tleV1cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFwiJHtrZXl9XCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcmApXG4gICAgfVxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcIiR7a2V5fVwiIGFyZ3VtZW50IG11c3QgYmUgYW4gaW50ZWdlcmApXG4gICAgfVxuICAgIGlmICh2YWx1ZSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgXCIke2tleX1cIiBhcmd1bWVudCBtdXN0IGJlID49IDFgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IEluZmluaXR5IDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZ2V0SXRlbUNvdW50IChudW1iZXIpIHtcbiAgaWYgKG51bWJlciA9PT0gMSkge1xuICAgIHJldHVybiAnMSBpdGVtJ1xuICB9XG4gIHJldHVybiBgJHtudW1iZXJ9IGl0ZW1zYFxufVxuXG5mdW5jdGlvbiBnZXRVbmlxdWVSZXBsYWNlclNldCAocmVwbGFjZXJBcnJheSkge1xuICBjb25zdCByZXBsYWNlclNldCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHJlcGxhY2VyQXJyYXkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXBsYWNlclNldC5hZGQoU3RyaW5nKHZhbHVlKSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2VyU2V0XG59XG5cbmZ1bmN0aW9uIGdldFN0cmljdE9wdGlvbiAob3B0aW9ucykge1xuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAnc3RyaWN0JykpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMuc3RyaWN0XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJzdHJpY3RcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbicpXG4gICAgfVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IGBPYmplY3QgY2FuIG5vdCBzYWZlbHkgYmUgc3RyaW5naWZpZWQuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgdmFsdWV9YFxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSBtZXNzYWdlICs9IGAgKCR7dmFsdWUudG9TdHJpbmcoKX0pYFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY29uZmlndXJlIChvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfVxuICBjb25zdCBmYWlsID0gZ2V0U3RyaWN0T3B0aW9uKG9wdGlvbnMpXG4gIGlmIChmYWlsKSB7XG4gICAgaWYgKG9wdGlvbnMuYmlnaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuYmlnaW50ID0gZmFsc2VcbiAgICB9XG4gICAgaWYgKCEoJ2NpcmN1bGFyVmFsdWUnIGluIG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLmNpcmN1bGFyVmFsdWUgPSBFcnJvclxuICAgIH1cbiAgfVxuICBjb25zdCBjaXJjdWxhclZhbHVlID0gZ2V0Q2lyY3VsYXJWYWx1ZU9wdGlvbihvcHRpb25zKVxuICBjb25zdCBiaWdpbnQgPSBnZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdiaWdpbnQnKVxuICBjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0RGV0ZXJtaW5pc3RpY09wdGlvbihvcHRpb25zKVxuICBjb25zdCBjb21wYXJhdG9yID0gdHlwZW9mIGRldGVybWluaXN0aWMgPT09ICdmdW5jdGlvbicgPyBkZXRlcm1pbmlzdGljIDogdW5kZWZpbmVkXG4gIGNvbnN0IG1heGltdW1EZXB0aCA9IGdldFBvc2l0aXZlSW50ZWdlck9wdGlvbihvcHRpb25zLCAnbWF4aW11bURlcHRoJylcbiAgY29uc3QgbWF4aW11bUJyZWFkdGggPSBnZXRQb3NpdGl2ZUludGVnZXJPcHRpb24ob3B0aW9ucywgJ21heGltdW1CcmVhZHRoJylcblxuICBmdW5jdGlvbiBzdHJpbmdpZnlGblJlcGxhY2VyIChrZXksIHBhcmVudCwgc3RhY2ssIHJlcGxhY2VyLCBzcGFjZXIsIGluZGVudGF0aW9uKSB7XG4gICAgbGV0IHZhbHVlID0gcGFyZW50W2tleV1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSlcbiAgICB9XG4gICAgdmFsdWUgPSByZXBsYWNlci5jYWxsKHBhcmVudCwga2V5LCB2YWx1ZSlcblxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gc3RyRXNjYXBlKHZhbHVlKVxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBjaXJjdWxhclZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzID0gJydcbiAgICAgICAgbGV0IGpvaW4gPSAnLCdcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxJbmRlbnRhdGlvbiA9IGluZGVudGF0aW9uXG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICdbXSdcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1heGltdW1EZXB0aCA8IHN0YWNrLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAnXCJbQXJyYXldXCInXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrLnB1c2godmFsdWUpXG4gICAgICAgICAgaWYgKHNwYWNlciAhPT0gJycpIHtcbiAgICAgICAgICAgIGluZGVudGF0aW9uICs9IHNwYWNlclxuICAgICAgICAgICAgcmVzICs9IGBcXG4ke2luZGVudGF0aW9ufWBcbiAgICAgICAgICAgIGpvaW4gPSBgLFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBtYXhpbXVtVmFsdWVzVG9TdHJpbmdpZnkgPSBNYXRoLm1pbih2YWx1ZS5sZW5ndGgsIG1heGltdW1CcmVhZHRoKVxuICAgICAgICAgIGxldCBpID0gMFxuICAgICAgICAgIGZvciAoOyBpIDwgbWF4aW11bVZhbHVlc1RvU3RyaW5naWZ5IC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlGblJlcGxhY2VyKFN0cmluZyhpKSwgdmFsdWUsIHN0YWNrLCByZXBsYWNlciwgc3BhY2VyLCBpbmRlbnRhdGlvbilcbiAgICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgICAgcmVzICs9IGpvaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5Rm5SZXBsYWNlcihTdHJpbmcoaSksIHZhbHVlLCBzdGFjaywgcmVwbGFjZXIsIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgcmVzICs9IHRtcCAhPT0gdW5kZWZpbmVkID8gdG1wIDogJ251bGwnXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAtIDEgPiBtYXhpbXVtQnJlYWR0aCkge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZEtleXMgPSB2YWx1ZS5sZW5ndGggLSBtYXhpbXVtQnJlYWR0aCAtIDFcbiAgICAgICAgICAgIHJlcyArPSBgJHtqb2lufVwiLi4uICR7Z2V0SXRlbUNvdW50KHJlbW92ZWRLZXlzKX0gbm90IHN0cmluZ2lmaWVkXCJgXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzcGFjZXIgIT09ICcnKSB7XG4gICAgICAgICAgICByZXMgKz0gYFxcbiR7b3JpZ2luYWxJbmRlbnRhdGlvbn1gXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgcmV0dXJuIGBbJHtyZXN9XWBcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAgIGNvbnN0IGtleUxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAgIGlmIChrZXlMZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gJ3t9J1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXhpbXVtRGVwdGggPCBzdGFjay5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgcmV0dXJuICdcIltPYmplY3RdXCInXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdoaXRlc3BhY2UgPSAnJ1xuICAgICAgICBsZXQgc2VwYXJhdG9yID0gJydcbiAgICAgICAgaWYgKHNwYWNlciAhPT0gJycpIHtcbiAgICAgICAgICBpbmRlbnRhdGlvbiArPSBzcGFjZXJcbiAgICAgICAgICBqb2luID0gYCxcXG4ke2luZGVudGF0aW9ufWBcbiAgICAgICAgICB3aGl0ZXNwYWNlID0gJyAnXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF4aW11bVByb3BlcnRpZXNUb1N0cmluZ2lmeSA9IE1hdGgubWluKGtleUxlbmd0aCwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgIGlmIChkZXRlcm1pbmlzdGljICYmICFpc1R5cGVkQXJyYXlXaXRoRW50cmllcyh2YWx1ZSkpIHtcbiAgICAgICAgICBrZXlzID0gc29ydChrZXlzLCBjb21wYXJhdG9yKVxuICAgICAgICB9XG4gICAgICAgIHN0YWNrLnB1c2godmFsdWUpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4aW11bVByb3BlcnRpZXNUb1N0cmluZ2lmeTsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeUZuUmVwbGFjZXIoa2V5LCB2YWx1ZSwgc3RhY2ssIHJlcGxhY2VyLCBzcGFjZXIsIGluZGVudGF0aW9uKVxuICAgICAgICAgIGlmICh0bXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzICs9IGAke3NlcGFyYXRvcn0ke3N0ckVzY2FwZShrZXkpfToke3doaXRlc3BhY2V9JHt0bXB9YFxuICAgICAgICAgICAgc2VwYXJhdG9yID0gam9pblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5TGVuZ3RoID4gbWF4aW11bUJyZWFkdGgpIHtcbiAgICAgICAgICBjb25zdCByZW1vdmVkS2V5cyA9IGtleUxlbmd0aCAtIG1heGltdW1CcmVhZHRoXG4gICAgICAgICAgcmVzICs9IGAke3NlcGFyYXRvcn1cIi4uLlwiOiR7d2hpdGVzcGFjZX1cIiR7Z2V0SXRlbUNvdW50KHJlbW92ZWRLZXlzKX0gbm90IHN0cmluZ2lmaWVkXCJgXG4gICAgICAgICAgc2VwYXJhdG9yID0gam9pblxuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZXIgIT09ICcnICYmIHNlcGFyYXRvci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcmVzID0gYFxcbiR7aW5kZW50YXRpb259JHtyZXN9XFxuJHtvcmlnaW5hbEluZGVudGF0aW9ufWBcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICByZXR1cm4gYHske3Jlc319YFxuICAgICAgfVxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiBmYWlsID8gZmFpbCh2YWx1ZSkgOiAnbnVsbCdcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgICBpZiAoYmlnaW50KSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyBmYWxsdGhyb3VnaFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhaWwgPyBmYWlsKHZhbHVlKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeUFycmF5UmVwbGFjZXIgKGtleSwgdmFsdWUsIHN0YWNrLCByZXBsYWNlciwgc3BhY2VyLCBpbmRlbnRhdGlvbikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSlcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIHN0ckVzY2FwZSh2YWx1ZSlcbiAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuICdudWxsJ1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gY2lyY3VsYXJWYWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxJbmRlbnRhdGlvbiA9IGluZGVudGF0aW9uXG4gICAgICAgIGxldCByZXMgPSAnJ1xuICAgICAgICBsZXQgam9pbiA9ICcsJ1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnW10nXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXhpbXVtRGVwdGggPCBzdGFjay5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1wiW0FycmF5XVwiJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKVxuICAgICAgICAgIGlmIChzcGFjZXIgIT09ICcnKSB7XG4gICAgICAgICAgICBpbmRlbnRhdGlvbiArPSBzcGFjZXJcbiAgICAgICAgICAgIHJlcyArPSBgXFxuJHtpbmRlbnRhdGlvbn1gXG4gICAgICAgICAgICBqb2luID0gYCxcXG4ke2luZGVudGF0aW9ufWBcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbWF4aW11bVZhbHVlc1RvU3RyaW5naWZ5ID0gTWF0aC5taW4odmFsdWUubGVuZ3RoLCBtYXhpbXVtQnJlYWR0aClcbiAgICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgICBmb3IgKDsgaSA8IG1heGltdW1WYWx1ZXNUb1N0cmluZ2lmeSAtIDE7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5QXJyYXlSZXBsYWNlcihTdHJpbmcoaSksIHZhbHVlW2ldLCBzdGFjaywgcmVwbGFjZXIsIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgICByZXMgKz0gdG1wICE9PSB1bmRlZmluZWQgPyB0bXAgOiAnbnVsbCdcbiAgICAgICAgICAgIHJlcyArPSBqb2luXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeUFycmF5UmVwbGFjZXIoU3RyaW5nKGkpLCB2YWx1ZVtpXSwgc3RhY2ssIHJlcGxhY2VyLCBzcGFjZXIsIGluZGVudGF0aW9uKVxuICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggLSAxID4gbWF4aW11bUJyZWFkdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRLZXlzID0gdmFsdWUubGVuZ3RoIC0gbWF4aW11bUJyZWFkdGggLSAxXG4gICAgICAgICAgICByZXMgKz0gYCR7am9pbn1cIi4uLiAke2dldEl0ZW1Db3VudChyZW1vdmVkS2V5cyl9IG5vdCBzdHJpbmdpZmllZFwiYFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3BhY2VyICE9PSAnJykge1xuICAgICAgICAgICAgcmVzICs9IGBcXG4ke29yaWdpbmFsSW5kZW50YXRpb259YFxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHJldHVybiBgWyR7cmVzfV1gXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgbGV0IHdoaXRlc3BhY2UgPSAnJ1xuICAgICAgICBpZiAoc3BhY2VyICE9PSAnJykge1xuICAgICAgICAgIGluZGVudGF0aW9uICs9IHNwYWNlclxuICAgICAgICAgIGpvaW4gPSBgLFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgIHdoaXRlc3BhY2UgPSAnICdcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VwYXJhdG9yID0gJydcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgcmVwbGFjZXIpIHtcbiAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlBcnJheVJlcGxhY2VyKGtleSwgdmFsdWVba2V5XSwgc3RhY2ssIHJlcGxhY2VyLCBzcGFjZXIsIGluZGVudGF0aW9uKVxuICAgICAgICAgIGlmICh0bXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzICs9IGAke3NlcGFyYXRvcn0ke3N0ckVzY2FwZShrZXkpfToke3doaXRlc3BhY2V9JHt0bXB9YFxuICAgICAgICAgICAgc2VwYXJhdG9yID0gam9pblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VyICE9PSAnJyAmJiBzZXBhcmF0b3IubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHJlcyA9IGBcXG4ke2luZGVudGF0aW9ufSR7cmVzfVxcbiR7b3JpZ2luYWxJbmRlbnRhdGlvbn1gXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgcmV0dXJuIGB7JHtyZXN9fWBcbiAgICAgIH1cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogZmFpbCA/IGZhaWwodmFsdWUpIDogJ251bGwnXG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgICAgaWYgKGJpZ2ludCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWlsID8gZmFpbCh2YWx1ZSkgOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlJbmRlbnQgKGtleSwgdmFsdWUsIHN0YWNrLCBzcGFjZXIsIGluZGVudGF0aW9uKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBzdHJFc2NhcGUodmFsdWUpXG4gICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiAnbnVsbCdcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSlcbiAgICAgICAgICAvLyBQcmV2ZW50IGNhbGxpbmcgYHRvSlNPTmAgYWdhaW4uXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnlJbmRlbnQoa2V5LCB2YWx1ZSwgc3RhY2ssIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICdudWxsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGNpcmN1bGFyVmFsdWVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbEluZGVudGF0aW9uID0gaW5kZW50YXRpb25cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tdJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF4aW11bURlcHRoIDwgc3RhY2subGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgcmV0dXJuICdcIltBcnJheV1cIidcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgICBpbmRlbnRhdGlvbiArPSBzcGFjZXJcbiAgICAgICAgICBsZXQgcmVzID0gYFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgIGNvbnN0IGpvaW4gPSBgLFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgIGNvbnN0IG1heGltdW1WYWx1ZXNUb1N0cmluZ2lmeSA9IE1hdGgubWluKHZhbHVlLmxlbmd0aCwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgICAgZm9yICg7IGkgPCBtYXhpbXVtVmFsdWVzVG9TdHJpbmdpZnkgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeUluZGVudChTdHJpbmcoaSksIHZhbHVlW2ldLCBzdGFjaywgc3BhY2VyLCBpbmRlbnRhdGlvbilcbiAgICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgICAgcmVzICs9IGpvaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5SW5kZW50KFN0cmluZyhpKSwgdmFsdWVbaV0sIHN0YWNrLCBzcGFjZXIsIGluZGVudGF0aW9uKVxuICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggLSAxID4gbWF4aW11bUJyZWFkdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRLZXlzID0gdmFsdWUubGVuZ3RoIC0gbWF4aW11bUJyZWFkdGggLSAxXG4gICAgICAgICAgICByZXMgKz0gYCR7am9pbn1cIi4uLiAke2dldEl0ZW1Db3VudChyZW1vdmVkS2V5cyl9IG5vdCBzdHJpbmdpZmllZFwiYFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMgKz0gYFxcbiR7b3JpZ2luYWxJbmRlbnRhdGlvbn1gXG4gICAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgICByZXR1cm4gYFske3Jlc31dYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgICAgY29uc3Qga2V5TGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICAgaWYgKGtleUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiAne30nXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heGltdW1EZXB0aCA8IHN0YWNrLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICByZXR1cm4gJ1wiW09iamVjdF1cIidcbiAgICAgICAgfVxuICAgICAgICBpbmRlbnRhdGlvbiArPSBzcGFjZXJcbiAgICAgICAgY29uc3Qgam9pbiA9IGAsXFxuJHtpbmRlbnRhdGlvbn1gXG4gICAgICAgIGxldCByZXMgPSAnJ1xuICAgICAgICBsZXQgc2VwYXJhdG9yID0gJydcbiAgICAgICAgbGV0IG1heGltdW1Qcm9wZXJ0aWVzVG9TdHJpbmdpZnkgPSBNYXRoLm1pbihrZXlMZW5ndGgsIG1heGltdW1CcmVhZHRoKVxuICAgICAgICBpZiAoaXNUeXBlZEFycmF5V2l0aEVudHJpZXModmFsdWUpKSB7XG4gICAgICAgICAgcmVzICs9IHN0cmluZ2lmeVR5cGVkQXJyYXkodmFsdWUsIGpvaW4sIG1heGltdW1CcmVhZHRoKVxuICAgICAgICAgIGtleXMgPSBrZXlzLnNsaWNlKHZhbHVlLmxlbmd0aClcbiAgICAgICAgICBtYXhpbXVtUHJvcGVydGllc1RvU3RyaW5naWZ5IC09IHZhbHVlLmxlbmd0aFxuICAgICAgICAgIHNlcGFyYXRvciA9IGpvaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGV0ZXJtaW5pc3RpYykge1xuICAgICAgICAgIGtleXMgPSBzb3J0KGtleXMsIGNvbXBhcmF0b3IpXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhpbXVtUHJvcGVydGllc1RvU3RyaW5naWZ5OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5SW5kZW50KGtleSwgdmFsdWVba2V5XSwgc3RhY2ssIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgaWYgKHRtcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXMgKz0gYCR7c2VwYXJhdG9yfSR7c3RyRXNjYXBlKGtleSl9OiAke3RtcH1gXG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBqb2luXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXlMZW5ndGggPiBtYXhpbXVtQnJlYWR0aCkge1xuICAgICAgICAgIGNvbnN0IHJlbW92ZWRLZXlzID0ga2V5TGVuZ3RoIC0gbWF4aW11bUJyZWFkdGhcbiAgICAgICAgICByZXMgKz0gYCR7c2VwYXJhdG9yfVwiLi4uXCI6IFwiJHtnZXRJdGVtQ291bnQocmVtb3ZlZEtleXMpfSBub3Qgc3RyaW5naWZpZWRcImBcbiAgICAgICAgICBzZXBhcmF0b3IgPSBqb2luXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcGFyYXRvciAhPT0gJycpIHtcbiAgICAgICAgICByZXMgPSBgXFxuJHtpbmRlbnRhdGlvbn0ke3Jlc31cXG4ke29yaWdpbmFsSW5kZW50YXRpb259YFxuICAgICAgICB9XG4gICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgIHJldHVybiBgeyR7cmVzfX1gXG4gICAgICB9XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6IGZhaWwgPyBmYWlsKHZhbHVlKSA6ICdudWxsJ1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIGNhc2UgJ2JpZ2ludCc6XG4gICAgICAgIGlmIChiaWdpbnQpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFpbCA/IGZhaWwodmFsdWUpIDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyaW5naWZ5U2ltcGxlIChrZXksIHZhbHVlLCBzdGFjaykge1xuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gc3RyRXNjYXBlKHZhbHVlKVxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihrZXkpXG4gICAgICAgICAgLy8gUHJldmVudCBjYWxsaW5nIGB0b0pTT05gIGFnYWluXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnlTaW1wbGUoa2V5LCB2YWx1ZSwgc3RhY2spXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICdudWxsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGNpcmN1bGFyVmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXMgPSAnJ1xuXG4gICAgICAgIGNvbnN0IGhhc0xlbmd0aCA9IHZhbHVlLmxlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICAgIGlmIChoYXNMZW5ndGggJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tdJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF4aW11bURlcHRoIDwgc3RhY2subGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgcmV0dXJuICdcIltBcnJheV1cIidcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgICBjb25zdCBtYXhpbXVtVmFsdWVzVG9TdHJpbmdpZnkgPSBNYXRoLm1pbih2YWx1ZS5sZW5ndGgsIG1heGltdW1CcmVhZHRoKVxuICAgICAgICAgIGxldCBpID0gMFxuICAgICAgICAgIGZvciAoOyBpIDwgbWF4aW11bVZhbHVlc1RvU3RyaW5naWZ5IC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlTaW1wbGUoU3RyaW5nKGkpLCB2YWx1ZVtpXSwgc3RhY2spXG4gICAgICAgICAgICByZXMgKz0gdG1wICE9PSB1bmRlZmluZWQgPyB0bXAgOiAnbnVsbCdcbiAgICAgICAgICAgIHJlcyArPSAnLCdcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5U2ltcGxlKFN0cmluZyhpKSwgdmFsdWVbaV0sIHN0YWNrKVxuICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggLSAxID4gbWF4aW11bUJyZWFkdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRLZXlzID0gdmFsdWUubGVuZ3RoIC0gbWF4aW11bUJyZWFkdGggLSAxXG4gICAgICAgICAgICByZXMgKz0gYCxcIi4uLiAke2dldEl0ZW1Db3VudChyZW1vdmVkS2V5cyl9IG5vdCBzdHJpbmdpZmllZFwiYFxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHJldHVybiBgWyR7cmVzfV1gXG4gICAgICAgIH1cblxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKVxuICAgICAgICBjb25zdCBrZXlMZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgICBpZiAoa2V5TGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuICd7fSdcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4aW11bURlcHRoIDwgc3RhY2subGVuZ3RoICsgMSkge1xuICAgICAgICAgIHJldHVybiAnXCJbT2JqZWN0XVwiJ1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZXBhcmF0b3IgPSAnJ1xuICAgICAgICBsZXQgbWF4aW11bVByb3BlcnRpZXNUb1N0cmluZ2lmeSA9IE1hdGgubWluKGtleUxlbmd0aCwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgIGlmIChoYXNMZW5ndGggJiYgaXNUeXBlZEFycmF5V2l0aEVudHJpZXModmFsdWUpKSB7XG4gICAgICAgICAgcmVzICs9IHN0cmluZ2lmeVR5cGVkQXJyYXkodmFsdWUsICcsJywgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgICAga2V5cyA9IGtleXMuc2xpY2UodmFsdWUubGVuZ3RoKVxuICAgICAgICAgIG1heGltdW1Qcm9wZXJ0aWVzVG9TdHJpbmdpZnkgLT0gdmFsdWUubGVuZ3RoXG4gICAgICAgICAgc2VwYXJhdG9yID0gJywnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRldGVybWluaXN0aWMpIHtcbiAgICAgICAgICBrZXlzID0gc29ydChrZXlzLCBjb21wYXJhdG9yKVxuICAgICAgICB9XG4gICAgICAgIHN0YWNrLnB1c2godmFsdWUpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4aW11bVByb3BlcnRpZXNUb1N0cmluZ2lmeTsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeVNpbXBsZShrZXksIHZhbHVlW2tleV0sIHN0YWNrKVxuICAgICAgICAgIGlmICh0bXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzICs9IGAke3NlcGFyYXRvcn0ke3N0ckVzY2FwZShrZXkpfToke3RtcH1gXG4gICAgICAgICAgICBzZXBhcmF0b3IgPSAnLCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleUxlbmd0aCA+IG1heGltdW1CcmVhZHRoKSB7XG4gICAgICAgICAgY29uc3QgcmVtb3ZlZEtleXMgPSBrZXlMZW5ndGggLSBtYXhpbXVtQnJlYWR0aFxuICAgICAgICAgIHJlcyArPSBgJHtzZXBhcmF0b3J9XCIuLi5cIjpcIiR7Z2V0SXRlbUNvdW50KHJlbW92ZWRLZXlzKX0gbm90IHN0cmluZ2lmaWVkXCJgXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgcmV0dXJuIGB7JHtyZXN9fWBcbiAgICAgIH1cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogZmFpbCA/IGZhaWwodmFsdWUpIDogJ251bGwnXG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgICAgaWYgKGJpZ2ludCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWlsID8gZmFpbCh2YWx1ZSkgOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnkgKHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGxldCBzcGFjZXIgPSAnJ1xuICAgICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgc3BhY2VyID0gJyAnLnJlcGVhdChNYXRoLm1pbihzcGFjZSwgMTApKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNwYWNlciA9IHNwYWNlLnNsaWNlKDAsIDEwKVxuICAgICAgfVxuICAgICAgaWYgKHJlcGxhY2VyICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXBsYWNlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBzdHJpbmdpZnlGblJlcGxhY2VyKCcnLCB7ICcnOiB2YWx1ZSB9LCBbXSwgcmVwbGFjZXIsIHNwYWNlciwgJycpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeUFycmF5UmVwbGFjZXIoJycsIHZhbHVlLCBbXSwgZ2V0VW5pcXVlUmVwbGFjZXJTZXQocmVwbGFjZXIpLCBzcGFjZXIsICcnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3BhY2VyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5SW5kZW50KCcnLCB2YWx1ZSwgW10sIHNwYWNlciwgJycpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdpZnlTaW1wbGUoJycsIHZhbHVlLCBbXSlcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnlcbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgbWV0YWRhdGEgPSBTeW1ib2wuZm9yKCdwaW5vLm1ldGFkYXRhJylcbmNvbnN0IHsgREVGQVVMVF9MRVZFTFMgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcblxuY29uc3QgREVGQVVMVF9JTkZPX0xFVkVMID0gREVGQVVMVF9MRVZFTFMuaW5mb1xuXG5mdW5jdGlvbiBtdWx0aXN0cmVhbSAoc3RyZWFtc0FycmF5LCBvcHRzKSB7XG4gIGxldCBjb3VudGVyID0gMFxuICBzdHJlYW1zQXJyYXkgPSBzdHJlYW1zQXJyYXkgfHwgW11cbiAgb3B0cyA9IG9wdHMgfHwgeyBkZWR1cGU6IGZhbHNlIH1cblxuICBjb25zdCBzdHJlYW1MZXZlbHMgPSBPYmplY3QuY3JlYXRlKERFRkFVTFRfTEVWRUxTKVxuICBzdHJlYW1MZXZlbHMuc2lsZW50ID0gSW5maW5pdHlcbiAgaWYgKG9wdHMubGV2ZWxzICYmIHR5cGVvZiBvcHRzLmxldmVscyA9PT0gJ29iamVjdCcpIHtcbiAgICBPYmplY3Qua2V5cyhvcHRzLmxldmVscykuZm9yRWFjaChpID0+IHtcbiAgICAgIHN0cmVhbUxldmVsc1tpXSA9IG9wdHMubGV2ZWxzW2ldXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHJlcyA9IHtcbiAgICB3cml0ZSxcbiAgICBhZGQsXG4gICAgZW1pdCxcbiAgICBmbHVzaFN5bmMsXG4gICAgZW5kLFxuICAgIG1pbkxldmVsOiAwLFxuICAgIHN0cmVhbXM6IFtdLFxuICAgIGNsb25lLFxuICAgIFttZXRhZGF0YV06IHRydWUsXG4gICAgc3RyZWFtTGV2ZWxzXG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzdHJlYW1zQXJyYXkpKSB7XG4gICAgc3RyZWFtc0FycmF5LmZvckVhY2goYWRkLCByZXMpXG4gIH0gZWxzZSB7XG4gICAgYWRkLmNhbGwocmVzLCBzdHJlYW1zQXJyYXkpXG4gIH1cblxuICAvLyBjbGVhbiB0aGlzIG9iamVjdCB1cFxuICAvLyBvciBpdCB3aWxsIHN0YXkgYWxsb2NhdGVkIGZvcmV2ZXJcbiAgLy8gYXMgaXQgaXMgY2xvc2VkIG9uIHRoZSBmb2xsb3dpbmcgY2xvc3VyZXNcbiAgc3RyZWFtc0FycmF5ID0gbnVsbFxuXG4gIHJldHVybiByZXNcblxuICAvLyB3ZSBjYW4gZXhpdCBlYXJseSBiZWNhdXNlIHRoZSBzdHJlYW1zIGFyZSBvcmRlcmVkIGJ5IGxldmVsXG4gIGZ1bmN0aW9uIHdyaXRlIChkYXRhKSB7XG4gICAgbGV0IGRlc3RcbiAgICBjb25zdCBsZXZlbCA9IHRoaXMubGFzdExldmVsXG4gICAgY29uc3QgeyBzdHJlYW1zIH0gPSB0aGlzXG4gICAgLy8gZm9yIGhhbmRsaW5nIHNpdHVhdGlvbiB3aGVuIHNldmVyYWwgc3RyZWFtcyBoYXMgdGhlIHNhbWUgbGV2ZWxcbiAgICBsZXQgcmVjb3JkZWRMZXZlbCA9IDBcbiAgICBsZXQgc3RyZWFtXG5cbiAgICAvLyBpZiBkZWR1cGUgc2V0IHRvIHRydWUgd2Ugc2VuZCBsb2dzIHRvIHRoZSBzdHJlYW0gd2l0aCB0aGUgaGlnaGVzdCBsZXZlbFxuICAgIC8vIHRoZXJlZm9yZSwgd2UgaGF2ZSB0byBjaGFuZ2Ugc29ydGluZyBvcmRlclxuICAgIGZvciAobGV0IGkgPSBpbml0TG9vcFZhcihzdHJlYW1zLmxlbmd0aCwgb3B0cy5kZWR1cGUpOyBjaGVja0xvb3BWYXIoaSwgc3RyZWFtcy5sZW5ndGgsIG9wdHMuZGVkdXBlKTsgaSA9IGFkanVzdExvb3BWYXIoaSwgb3B0cy5kZWR1cGUpKSB7XG4gICAgICBkZXN0ID0gc3RyZWFtc1tpXVxuICAgICAgaWYgKGRlc3QubGV2ZWwgPD0gbGV2ZWwpIHtcbiAgICAgICAgaWYgKHJlY29yZGVkTGV2ZWwgIT09IDAgJiYgcmVjb3JkZWRMZXZlbCAhPT0gZGVzdC5sZXZlbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtID0gZGVzdC5zdHJlYW1cbiAgICAgICAgaWYgKHN0cmVhbVttZXRhZGF0YV0pIHtcbiAgICAgICAgICBjb25zdCB7IGxhc3RUaW1lLCBsYXN0TXNnLCBsYXN0T2JqLCBsYXN0TG9nZ2VyIH0gPSB0aGlzXG4gICAgICAgICAgc3RyZWFtLmxhc3RMZXZlbCA9IGxldmVsXG4gICAgICAgICAgc3RyZWFtLmxhc3RUaW1lID0gbGFzdFRpbWVcbiAgICAgICAgICBzdHJlYW0ubGFzdE1zZyA9IGxhc3RNc2dcbiAgICAgICAgICBzdHJlYW0ubGFzdE9iaiA9IGxhc3RPYmpcbiAgICAgICAgICBzdHJlYW0ubGFzdExvZ2dlciA9IGxhc3RMb2dnZXJcbiAgICAgICAgfVxuICAgICAgICBzdHJlYW0ud3JpdGUoZGF0YSlcbiAgICAgICAgaWYgKG9wdHMuZGVkdXBlKSB7XG4gICAgICAgICAgcmVjb3JkZWRMZXZlbCA9IGRlc3QubGV2ZWxcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghb3B0cy5kZWR1cGUpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0ICguLi5hcmdzKSB7XG4gICAgZm9yIChjb25zdCB7IHN0cmVhbSB9IG9mIHRoaXMuc3RyZWFtcykge1xuICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZW1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdHJlYW0uZW1pdCguLi5hcmdzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoU3luYyAoKSB7XG4gICAgZm9yIChjb25zdCB7IHN0cmVhbSB9IG9mIHRoaXMuc3RyZWFtcykge1xuICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZmx1c2hTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHN0cmVhbS5mbHVzaFN5bmMoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAoZGVzdCkge1xuICAgIGlmICghZGVzdCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRoYXQgZGVzdCBpbXBsZW1lbnRzIGVpdGhlciBTdHJlYW1FbnRyeSBvciBEZXN0aW5hdGlvblN0cmVhbVxuICAgIGNvbnN0IGlzU3RyZWFtID0gdHlwZW9mIGRlc3Qud3JpdGUgPT09ICdmdW5jdGlvbicgfHwgZGVzdC5zdHJlYW1cbiAgICBjb25zdCBzdHJlYW1fID0gZGVzdC53cml0ZSA/IGRlc3QgOiBkZXN0LnN0cmVhbVxuICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHByb3ZpZGUgYSBtZWFuaW5nZnVsIGVycm9yIG1lc3NhZ2UsIG90aGVyd2lzZSBpdCB0aHJvd3Mgc29tZXdoZXJlIGluc2lkZSB3cml0ZSgpXG4gICAgaWYgKCFpc1N0cmVhbSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3N0cmVhbSBvYmplY3QgbmVlZHMgdG8gaW1wbGVtZW50IGVpdGhlciBTdHJlYW1FbnRyeSBvciBEZXN0aW5hdGlvblN0cmVhbSBpbnRlcmZhY2UnKVxuICAgIH1cblxuICAgIGNvbnN0IHsgc3RyZWFtcywgc3RyZWFtTGV2ZWxzIH0gPSB0aGlzXG5cbiAgICBsZXQgbGV2ZWxcbiAgICBpZiAodHlwZW9mIGRlc3QubGV2ZWxWYWwgPT09ICdudW1iZXInKSB7XG4gICAgICBsZXZlbCA9IGRlc3QubGV2ZWxWYWxcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXN0LmxldmVsID09PSAnc3RyaW5nJykge1xuICAgICAgbGV2ZWwgPSBzdHJlYW1MZXZlbHNbZGVzdC5sZXZlbF1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXN0LmxldmVsID09PSAnbnVtYmVyJykge1xuICAgICAgbGV2ZWwgPSBkZXN0LmxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldmVsID0gREVGQVVMVF9JTkZPX0xFVkVMXG4gICAgfVxuXG4gICAgY29uc3QgZGVzdF8gPSB7XG4gICAgICBzdHJlYW06IHN0cmVhbV8sXG4gICAgICBsZXZlbCxcbiAgICAgIGxldmVsVmFsOiB1bmRlZmluZWQsXG4gICAgICBpZDogY291bnRlcisrXG4gICAgfVxuXG4gICAgc3RyZWFtcy51bnNoaWZ0KGRlc3RfKVxuICAgIHN0cmVhbXMuc29ydChjb21wYXJlQnlMZXZlbClcblxuICAgIHRoaXMubWluTGV2ZWwgPSBzdHJlYW1zWzBdLmxldmVsXG5cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBmdW5jdGlvbiBlbmQgKCkge1xuICAgIGZvciAoY29uc3QgeyBzdHJlYW0gfSBvZiB0aGlzLnN0cmVhbXMpIHtcbiAgICAgIGlmICh0eXBlb2Ygc3RyZWFtLmZsdXNoU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdHJlYW0uZmx1c2hTeW5jKClcbiAgICAgIH1cbiAgICAgIHN0cmVhbS5lbmQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb25lIChsZXZlbCkge1xuICAgIGNvbnN0IHN0cmVhbXMgPSBuZXcgQXJyYXkodGhpcy5zdHJlYW1zLmxlbmd0aClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyZWFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyZWFtc1tpXSA9IHtcbiAgICAgICAgbGV2ZWwsXG4gICAgICAgIHN0cmVhbTogdGhpcy5zdHJlYW1zW2ldLnN0cmVhbVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB3cml0ZSxcbiAgICAgIGFkZCxcbiAgICAgIG1pbkxldmVsOiBsZXZlbCxcbiAgICAgIHN0cmVhbXMsXG4gICAgICBjbG9uZSxcbiAgICAgIGVtaXQsXG4gICAgICBmbHVzaFN5bmMsXG4gICAgICBbbWV0YWRhdGFdOiB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVCeUxldmVsIChhLCBiKSB7XG4gIHJldHVybiBhLmxldmVsIC0gYi5sZXZlbFxufVxuXG5mdW5jdGlvbiBpbml0TG9vcFZhciAobGVuZ3RoLCBkZWR1cGUpIHtcbiAgcmV0dXJuIGRlZHVwZSA/IGxlbmd0aCAtIDEgOiAwXG59XG5cbmZ1bmN0aW9uIGFkanVzdExvb3BWYXIgKGksIGRlZHVwZSkge1xuICByZXR1cm4gZGVkdXBlID8gaSAtIDEgOiBpICsgMVxufVxuXG5mdW5jdGlvbiBjaGVja0xvb3BWYXIgKGksIGxlbmd0aCwgZGVkdXBlKSB7XG4gIHJldHVybiBkZWR1cGUgPyBpID49IDAgOiBpIDwgbGVuZ3RoXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbXVsdGlzdHJlYW1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3Qgb3MgPSByZXF1aXJlKCdub2RlOm9zJylcbmNvbnN0IHN0ZFNlcmlhbGl6ZXJzID0gcmVxdWlyZSgncGluby1zdGQtc2VyaWFsaXplcnMnKVxuY29uc3QgY2FsbGVyID0gcmVxdWlyZSgnLi9saWIvY2FsbGVyJylcbmNvbnN0IHJlZGFjdGlvbiA9IHJlcXVpcmUoJy4vbGliL3JlZGFjdGlvbicpXG5jb25zdCB0aW1lID0gcmVxdWlyZSgnLi9saWIvdGltZScpXG5jb25zdCBwcm90byA9IHJlcXVpcmUoJy4vbGliL3Byb3RvJylcbmNvbnN0IHN5bWJvbHMgPSByZXF1aXJlKCcuL2xpYi9zeW1ib2xzJylcbmNvbnN0IHsgY29uZmlndXJlIH0gPSByZXF1aXJlKCdzYWZlLXN0YWJsZS1zdHJpbmdpZnknKVxuY29uc3QgeyBhc3NlcnREZWZhdWx0TGV2ZWxGb3VuZCwgbWFwcGluZ3MsIGdlbkxzQ2FjaGUsIGdlbkxldmVsQ29tcGFyaXNvbiwgYXNzZXJ0TGV2ZWxDb21wYXJpc29uIH0gPSByZXF1aXJlKCcuL2xpYi9sZXZlbHMnKVxuY29uc3QgeyBERUZBVUxUX0xFVkVMUywgU09SVElOR19PUkRFUiB9ID0gcmVxdWlyZSgnLi9saWIvY29uc3RhbnRzJylcbmNvbnN0IHtcbiAgY3JlYXRlQXJnc05vcm1hbGl6ZXIsXG4gIGFzQ2hpbmRpbmdzLFxuICBidWlsZFNhZmVTb25pY0Jvb20sXG4gIGJ1aWxkRm9ybWF0dGVycyxcbiAgc3RyaW5naWZ5LFxuICBub3JtYWxpemVEZXN0RmlsZURlc2NyaXB0b3IsXG4gIG5vb3Bcbn0gPSByZXF1aXJlKCcuL2xpYi90b29scycpXG5jb25zdCB7IHZlcnNpb24gfSA9IHJlcXVpcmUoJy4vbGliL21ldGEnKVxuY29uc3Qge1xuICBjaGluZGluZ3NTeW0sXG4gIHJlZGFjdEZtdFN5bSxcbiAgc2VyaWFsaXplcnNTeW0sXG4gIHRpbWVTeW0sXG4gIHRpbWVTbGljZUluZGV4U3ltLFxuICBzdHJlYW1TeW0sXG4gIHN0cmluZ2lmeVN5bSxcbiAgc3RyaW5naWZ5U2FmZVN5bSxcbiAgc3RyaW5naWZpZXJzU3ltLFxuICBzZXRMZXZlbFN5bSxcbiAgZW5kU3ltLFxuICBmb3JtYXRPcHRzU3ltLFxuICBtZXNzYWdlS2V5U3ltLFxuICBlcnJvcktleVN5bSxcbiAgbmVzdGVkS2V5U3ltLFxuICBtaXhpblN5bSxcbiAgbGV2ZWxDb21wU3ltLFxuICB1c2VPbmx5Q3VzdG9tTGV2ZWxzU3ltLFxuICBmb3JtYXR0ZXJzU3ltLFxuICBob29rc1N5bSxcbiAgbmVzdGVkS2V5U3RyU3ltLFxuICBtaXhpbk1lcmdlU3RyYXRlZ3lTeW0sXG4gIG1zZ1ByZWZpeFN5bVxufSA9IHN5bWJvbHNcbmNvbnN0IHsgZXBvY2hUaW1lLCBudWxsVGltZSB9ID0gdGltZVxuY29uc3QgeyBwaWQgfSA9IHByb2Nlc3NcbmNvbnN0IGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKVxuY29uc3QgZGVmYXVsdEVycm9yU2VyaWFsaXplciA9IHN0ZFNlcmlhbGl6ZXJzLmVyclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGxldmVsOiAnaW5mbycsXG4gIGxldmVsQ29tcGFyaXNvbjogU09SVElOR19PUkRFUi5BU0MsXG4gIGxldmVsczogREVGQVVMVF9MRVZFTFMsXG4gIG1lc3NhZ2VLZXk6ICdtc2cnLFxuICBlcnJvcktleTogJ2VycicsXG4gIG5lc3RlZEtleTogbnVsbCxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgYmFzZTogeyBwaWQsIGhvc3RuYW1lIH0sXG4gIHNlcmlhbGl6ZXJzOiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIHtcbiAgICBlcnI6IGRlZmF1bHRFcnJvclNlcmlhbGl6ZXJcbiAgfSksXG4gIGZvcm1hdHRlcnM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwge1xuICAgIGJpbmRpbmdzIChiaW5kaW5ncykge1xuICAgICAgcmV0dXJuIGJpbmRpbmdzXG4gICAgfSxcbiAgICBsZXZlbCAobGFiZWwsIG51bWJlcikge1xuICAgICAgcmV0dXJuIHsgbGV2ZWw6IG51bWJlciB9XG4gICAgfVxuICB9KSxcbiAgaG9va3M6IHtcbiAgICBsb2dNZXRob2Q6IHVuZGVmaW5lZFxuICB9LFxuICB0aW1lc3RhbXA6IGVwb2NoVGltZSxcbiAgbmFtZTogdW5kZWZpbmVkLFxuICByZWRhY3Q6IG51bGwsXG4gIGN1c3RvbUxldmVsczogbnVsbCxcbiAgdXNlT25seUN1c3RvbUxldmVsczogZmFsc2UsXG4gIGRlcHRoTGltaXQ6IDUsXG4gIGVkZ2VMaW1pdDogMTAwXG59XG5cbmNvbnN0IG5vcm1hbGl6ZSA9IGNyZWF0ZUFyZ3NOb3JtYWxpemVyKGRlZmF1bHRPcHRpb25zKVxuXG5jb25zdCBzZXJpYWxpemVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgc3RkU2VyaWFsaXplcnMpXG5cbmZ1bmN0aW9uIHBpbm8gKC4uLmFyZ3MpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSB7fVxuICBjb25zdCB7IG9wdHMsIHN0cmVhbSB9ID0gbm9ybWFsaXplKGluc3RhbmNlLCBjYWxsZXIoKSwgLi4uYXJncylcblxuICBpZiAob3B0cy5sZXZlbCAmJiB0eXBlb2Ygb3B0cy5sZXZlbCA9PT0gJ3N0cmluZycgJiYgREVGQVVMVF9MRVZFTFNbb3B0cy5sZXZlbC50b0xvd2VyQ2FzZSgpXSAhPT0gdW5kZWZpbmVkKSBvcHRzLmxldmVsID0gb3B0cy5sZXZlbC50b0xvd2VyQ2FzZSgpXG5cbiAgY29uc3Qge1xuICAgIHJlZGFjdCxcbiAgICBjcmxmLFxuICAgIHNlcmlhbGl6ZXJzLFxuICAgIHRpbWVzdGFtcCxcbiAgICBtZXNzYWdlS2V5LFxuICAgIGVycm9yS2V5LFxuICAgIG5lc3RlZEtleSxcbiAgICBiYXNlLFxuICAgIG5hbWUsXG4gICAgbGV2ZWwsXG4gICAgY3VzdG9tTGV2ZWxzLFxuICAgIGxldmVsQ29tcGFyaXNvbixcbiAgICBtaXhpbixcbiAgICBtaXhpbk1lcmdlU3RyYXRlZ3ksXG4gICAgdXNlT25seUN1c3RvbUxldmVscyxcbiAgICBmb3JtYXR0ZXJzLFxuICAgIGhvb2tzLFxuICAgIGRlcHRoTGltaXQsXG4gICAgZWRnZUxpbWl0LFxuICAgIG9uQ2hpbGQsXG4gICAgbXNnUHJlZml4XG4gIH0gPSBvcHRzXG5cbiAgY29uc3Qgc3RyaW5naWZ5U2FmZSA9IGNvbmZpZ3VyZSh7XG4gICAgbWF4aW11bURlcHRoOiBkZXB0aExpbWl0LFxuICAgIG1heGltdW1CcmVhZHRoOiBlZGdlTGltaXRcbiAgfSlcblxuICBjb25zdCBhbGxGb3JtYXR0ZXJzID0gYnVpbGRGb3JtYXR0ZXJzKFxuICAgIGZvcm1hdHRlcnMubGV2ZWwsXG4gICAgZm9ybWF0dGVycy5iaW5kaW5ncyxcbiAgICBmb3JtYXR0ZXJzLmxvZ1xuICApXG5cbiAgY29uc3Qgc3RyaW5naWZ5Rm4gPSBzdHJpbmdpZnkuYmluZCh7XG4gICAgW3N0cmluZ2lmeVNhZmVTeW1dOiBzdHJpbmdpZnlTYWZlXG4gIH0pXG4gIGNvbnN0IHN0cmluZ2lmaWVycyA9IHJlZGFjdCA/IHJlZGFjdGlvbihyZWRhY3QsIHN0cmluZ2lmeUZuKSA6IHt9XG4gIGNvbnN0IGZvcm1hdE9wdHMgPSByZWRhY3RcbiAgICA/IHsgc3RyaW5naWZ5OiBzdHJpbmdpZmllcnNbcmVkYWN0Rm10U3ltXSB9XG4gICAgOiB7IHN0cmluZ2lmeTogc3RyaW5naWZ5Rm4gfVxuICBjb25zdCBlbmQgPSAnfScgKyAoY3JsZiA/ICdcXHJcXG4nIDogJ1xcbicpXG4gIGNvbnN0IGNvcmVDaGluZGluZ3MgPSBhc0NoaW5kaW5ncy5iaW5kKG51bGwsIHtcbiAgICBbY2hpbmRpbmdzU3ltXTogJycsXG4gICAgW3NlcmlhbGl6ZXJzU3ltXTogc2VyaWFsaXplcnMsXG4gICAgW3N0cmluZ2lmaWVyc1N5bV06IHN0cmluZ2lmaWVycyxcbiAgICBbc3RyaW5naWZ5U3ltXTogc3RyaW5naWZ5LFxuICAgIFtzdHJpbmdpZnlTYWZlU3ltXTogc3RyaW5naWZ5U2FmZSxcbiAgICBbZm9ybWF0dGVyc1N5bV06IGFsbEZvcm1hdHRlcnNcbiAgfSlcblxuICBsZXQgY2hpbmRpbmdzID0gJydcbiAgaWYgKGJhc2UgIT09IG51bGwpIHtcbiAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjaGluZGluZ3MgPSBjb3JlQ2hpbmRpbmdzKGJhc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaW5kaW5ncyA9IGNvcmVDaGluZGluZ3MoT2JqZWN0LmFzc2lnbih7fSwgYmFzZSwgeyBuYW1lIH0pKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRpbWUgPSAodGltZXN0YW1wIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgPyB0aW1lc3RhbXBcbiAgICA6ICh0aW1lc3RhbXAgPyBlcG9jaFRpbWUgOiBudWxsVGltZSlcbiAgY29uc3QgdGltZVNsaWNlSW5kZXggPSB0aW1lKCkuaW5kZXhPZignOicpICsgMVxuXG4gIGlmICh1c2VPbmx5Q3VzdG9tTGV2ZWxzICYmICFjdXN0b21MZXZlbHMpIHRocm93IEVycm9yKCdjdXN0b21MZXZlbHMgaXMgcmVxdWlyZWQgaWYgdXNlT25seUN1c3RvbUxldmVscyBpcyBzZXQgdHJ1ZScpXG4gIGlmIChtaXhpbiAmJiB0eXBlb2YgbWl4aW4gIT09ICdmdW5jdGlvbicpIHRocm93IEVycm9yKGBVbmtub3duIG1peGluIHR5cGUgXCIke3R5cGVvZiBtaXhpbn1cIiAtIGV4cGVjdGVkIFwiZnVuY3Rpb25cImApXG4gIGlmIChtc2dQcmVmaXggJiYgdHlwZW9mIG1zZ1ByZWZpeCAhPT0gJ3N0cmluZycpIHRocm93IEVycm9yKGBVbmtub3duIG1zZ1ByZWZpeCB0eXBlIFwiJHt0eXBlb2YgbXNnUHJlZml4fVwiIC0gZXhwZWN0ZWQgXCJzdHJpbmdcImApXG5cbiAgYXNzZXJ0RGVmYXVsdExldmVsRm91bmQobGV2ZWwsIGN1c3RvbUxldmVscywgdXNlT25seUN1c3RvbUxldmVscylcbiAgY29uc3QgbGV2ZWxzID0gbWFwcGluZ3MoY3VzdG9tTGV2ZWxzLCB1c2VPbmx5Q3VzdG9tTGV2ZWxzKVxuXG4gIGlmICh0eXBlb2Ygc3RyZWFtLmVtaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzdHJlYW0uZW1pdCgnbWVzc2FnZScsIHsgY29kZTogJ1BJTk9fQ09ORklHJywgY29uZmlnOiB7IGxldmVscywgbWVzc2FnZUtleSwgZXJyb3JLZXkgfSB9KVxuICB9XG5cbiAgYXNzZXJ0TGV2ZWxDb21wYXJpc29uKGxldmVsQ29tcGFyaXNvbilcbiAgY29uc3QgbGV2ZWxDb21wRnVuYyA9IGdlbkxldmVsQ29tcGFyaXNvbihsZXZlbENvbXBhcmlzb24pXG5cbiAgT2JqZWN0LmFzc2lnbihpbnN0YW5jZSwge1xuICAgIGxldmVscyxcbiAgICBbbGV2ZWxDb21wU3ltXTogbGV2ZWxDb21wRnVuYyxcbiAgICBbdXNlT25seUN1c3RvbUxldmVsc1N5bV06IHVzZU9ubHlDdXN0b21MZXZlbHMsXG4gICAgW3N0cmVhbVN5bV06IHN0cmVhbSxcbiAgICBbdGltZVN5bV06IHRpbWUsXG4gICAgW3RpbWVTbGljZUluZGV4U3ltXTogdGltZVNsaWNlSW5kZXgsXG4gICAgW3N0cmluZ2lmeVN5bV06IHN0cmluZ2lmeSxcbiAgICBbc3RyaW5naWZ5U2FmZVN5bV06IHN0cmluZ2lmeVNhZmUsXG4gICAgW3N0cmluZ2lmaWVyc1N5bV06IHN0cmluZ2lmaWVycyxcbiAgICBbZW5kU3ltXTogZW5kLFxuICAgIFtmb3JtYXRPcHRzU3ltXTogZm9ybWF0T3B0cyxcbiAgICBbbWVzc2FnZUtleVN5bV06IG1lc3NhZ2VLZXksXG4gICAgW2Vycm9yS2V5U3ltXTogZXJyb3JLZXksXG4gICAgW25lc3RlZEtleVN5bV06IG5lc3RlZEtleSxcbiAgICAvLyBwcm90ZWN0IGFnYWluc3QgaW5qZWN0aW9uXG4gICAgW25lc3RlZEtleVN0clN5bV06IG5lc3RlZEtleSA/IGAsJHtKU09OLnN0cmluZ2lmeShuZXN0ZWRLZXkpfTp7YCA6ICcnLFxuICAgIFtzZXJpYWxpemVyc1N5bV06IHNlcmlhbGl6ZXJzLFxuICAgIFttaXhpblN5bV06IG1peGluLFxuICAgIFttaXhpbk1lcmdlU3RyYXRlZ3lTeW1dOiBtaXhpbk1lcmdlU3RyYXRlZ3ksXG4gICAgW2NoaW5kaW5nc1N5bV06IGNoaW5kaW5ncyxcbiAgICBbZm9ybWF0dGVyc1N5bV06IGFsbEZvcm1hdHRlcnMsXG4gICAgW2hvb2tzU3ltXTogaG9va3MsXG4gICAgc2lsZW50OiBub29wLFxuICAgIG9uQ2hpbGQsXG4gICAgW21zZ1ByZWZpeFN5bV06IG1zZ1ByZWZpeFxuICB9KVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgcHJvdG8oKSlcblxuICBnZW5Mc0NhY2hlKGluc3RhbmNlKVxuXG4gIGluc3RhbmNlW3NldExldmVsU3ltXShsZXZlbClcblxuICByZXR1cm4gaW5zdGFuY2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaW5vXG5cbm1vZHVsZS5leHBvcnRzLmRlc3RpbmF0aW9uID0gKGRlc3QgPSBwcm9jZXNzLnN0ZG91dC5mZCkgPT4ge1xuICBpZiAodHlwZW9mIGRlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgZGVzdC5kZXN0ID0gbm9ybWFsaXplRGVzdEZpbGVEZXNjcmlwdG9yKGRlc3QuZGVzdCB8fCBwcm9jZXNzLnN0ZG91dC5mZClcbiAgICByZXR1cm4gYnVpbGRTYWZlU29uaWNCb29tKGRlc3QpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJ1aWxkU2FmZVNvbmljQm9vbSh7IGRlc3Q6IG5vcm1hbGl6ZURlc3RGaWxlRGVzY3JpcHRvcihkZXN0KSwgbWluTGVuZ3RoOiAwIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMudHJhbnNwb3J0ID0gcmVxdWlyZSgnLi9saWIvdHJhbnNwb3J0Jylcbm1vZHVsZS5leHBvcnRzLm11bHRpc3RyZWFtID0gcmVxdWlyZSgnLi9saWIvbXVsdGlzdHJlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cy5sZXZlbHMgPSBtYXBwaW5ncygpXG5tb2R1bGUuZXhwb3J0cy5zdGRTZXJpYWxpemVycyA9IHNlcmlhbGl6ZXJzXG5tb2R1bGUuZXhwb3J0cy5zdGRUaW1lRnVuY3Rpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGltZSlcbm1vZHVsZS5leHBvcnRzLnN5bWJvbHMgPSBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvblxuXG4vLyBFbmFibGVzIGRlZmF1bHQgYW5kIG5hbWUgZXhwb3J0IHdpdGggVHlwZVNjcmlwdCBhbmQgQmFiZWxcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwaW5vXG5tb2R1bGUuZXhwb3J0cy5waW5vID0gcGlub1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIHR0eSA9IHJlcXVpcmUoJ3R0eScpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcE5hbWVzcGFjZShlKSB7XG4gIGlmIChlICYmIGUuX19lc01vZHVsZSkgcmV0dXJuIGU7XG4gIHZhciBuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKGUpIHtcbiAgICBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoayAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIHZhciBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCBrKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sIGssIGQuZ2V0ID8gZCA6IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZVtrXTsgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuW1wiZGVmYXVsdFwiXSA9IGU7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKG4pO1xufVxuXG52YXIgdHR5X19uYW1lc3BhY2UgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BOYW1lc3BhY2UodHR5KTtcblxuY29uc3Qge1xuICBlbnYgPSB7fSxcbiAgYXJndiA9IFtdLFxuICBwbGF0Zm9ybSA9IFwiXCIsXG59ID0gdHlwZW9mIHByb2Nlc3MgPT09IFwidW5kZWZpbmVkXCIgPyB7fSA6IHByb2Nlc3M7XG5cbmNvbnN0IGlzRGlzYWJsZWQgPSBcIk5PX0NPTE9SXCIgaW4gZW52IHx8IGFyZ3YuaW5jbHVkZXMoXCItLW5vLWNvbG9yXCIpO1xuY29uc3QgaXNGb3JjZWQgPSBcIkZPUkNFX0NPTE9SXCIgaW4gZW52IHx8IGFyZ3YuaW5jbHVkZXMoXCItLWNvbG9yXCIpO1xuY29uc3QgaXNXaW5kb3dzID0gcGxhdGZvcm0gPT09IFwid2luMzJcIjtcbmNvbnN0IGlzRHVtYlRlcm1pbmFsID0gZW52LlRFUk0gPT09IFwiZHVtYlwiO1xuXG5jb25zdCBpc0NvbXBhdGlibGVUZXJtaW5hbCA9XG4gIHR0eV9fbmFtZXNwYWNlICYmIHR0eV9fbmFtZXNwYWNlLmlzYXR0eSAmJiB0dHlfX25hbWVzcGFjZS5pc2F0dHkoMSkgJiYgZW52LlRFUk0gJiYgIWlzRHVtYlRlcm1pbmFsO1xuXG5jb25zdCBpc0NJID1cbiAgXCJDSVwiIGluIGVudiAmJlxuICAoXCJHSVRIVUJfQUNUSU9OU1wiIGluIGVudiB8fCBcIkdJVExBQl9DSVwiIGluIGVudiB8fCBcIkNJUkNMRUNJXCIgaW4gZW52KTtcblxuY29uc3QgaXNDb2xvclN1cHBvcnRlZCA9XG4gICFpc0Rpc2FibGVkICYmXG4gIChpc0ZvcmNlZCB8fCAoaXNXaW5kb3dzICYmICFpc0R1bWJUZXJtaW5hbCkgfHwgaXNDb21wYXRpYmxlVGVybWluYWwgfHwgaXNDSSk7XG5cbmNvbnN0IHJlcGxhY2VDbG9zZSA9IChcbiAgaW5kZXgsXG4gIHN0cmluZyxcbiAgY2xvc2UsXG4gIHJlcGxhY2UsXG4gIGhlYWQgPSBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGV4KSArIHJlcGxhY2UsXG4gIHRhaWwgPSBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgY2xvc2UubGVuZ3RoKSxcbiAgbmV4dCA9IHRhaWwuaW5kZXhPZihjbG9zZSlcbikgPT4gaGVhZCArIChuZXh0IDwgMCA/IHRhaWwgOiByZXBsYWNlQ2xvc2UobmV4dCwgdGFpbCwgY2xvc2UsIHJlcGxhY2UpKTtcblxuY29uc3QgY2xlYXJCbGVlZCA9IChpbmRleCwgc3RyaW5nLCBvcGVuLCBjbG9zZSwgcmVwbGFjZSkgPT5cbiAgaW5kZXggPCAwXG4gICAgPyBvcGVuICsgc3RyaW5nICsgY2xvc2VcbiAgICA6IG9wZW4gKyByZXBsYWNlQ2xvc2UoaW5kZXgsIHN0cmluZywgY2xvc2UsIHJlcGxhY2UpICsgY2xvc2U7XG5cbmNvbnN0IGZpbHRlckVtcHR5ID1cbiAgKG9wZW4sIGNsb3NlLCByZXBsYWNlID0gb3BlbiwgYXQgPSBvcGVuLmxlbmd0aCArIDEpID0+XG4gIChzdHJpbmcpID0+XG4gICAgc3RyaW5nIHx8ICEoc3RyaW5nID09PSBcIlwiIHx8IHN0cmluZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgPyBjbGVhckJsZWVkKFxuICAgICAgICAgIChcIlwiICsgc3RyaW5nKS5pbmRleE9mKGNsb3NlLCBhdCksXG4gICAgICAgICAgc3RyaW5nLFxuICAgICAgICAgIG9wZW4sXG4gICAgICAgICAgY2xvc2UsXG4gICAgICAgICAgcmVwbGFjZVxuICAgICAgICApXG4gICAgICA6IFwiXCI7XG5cbmNvbnN0IGluaXQgPSAob3BlbiwgY2xvc2UsIHJlcGxhY2UpID0+XG4gIGZpbHRlckVtcHR5KGBcXHgxYlske29wZW59bWAsIGBcXHgxYlske2Nsb3NlfW1gLCByZXBsYWNlKTtcblxuY29uc3QgY29sb3JzID0ge1xuICByZXNldDogaW5pdCgwLCAwKSxcbiAgYm9sZDogaW5pdCgxLCAyMiwgXCJcXHgxYlsyMm1cXHgxYlsxbVwiKSxcbiAgZGltOiBpbml0KDIsIDIyLCBcIlxceDFiWzIybVxceDFiWzJtXCIpLFxuICBpdGFsaWM6IGluaXQoMywgMjMpLFxuICB1bmRlcmxpbmU6IGluaXQoNCwgMjQpLFxuICBpbnZlcnNlOiBpbml0KDcsIDI3KSxcbiAgaGlkZGVuOiBpbml0KDgsIDI4KSxcbiAgc3RyaWtldGhyb3VnaDogaW5pdCg5LCAyOSksXG4gIGJsYWNrOiBpbml0KDMwLCAzOSksXG4gIHJlZDogaW5pdCgzMSwgMzkpLFxuICBncmVlbjogaW5pdCgzMiwgMzkpLFxuICB5ZWxsb3c6IGluaXQoMzMsIDM5KSxcbiAgYmx1ZTogaW5pdCgzNCwgMzkpLFxuICBtYWdlbnRhOiBpbml0KDM1LCAzOSksXG4gIGN5YW46IGluaXQoMzYsIDM5KSxcbiAgd2hpdGU6IGluaXQoMzcsIDM5KSxcbiAgZ3JheTogaW5pdCg5MCwgMzkpLFxuICBiZ0JsYWNrOiBpbml0KDQwLCA0OSksXG4gIGJnUmVkOiBpbml0KDQxLCA0OSksXG4gIGJnR3JlZW46IGluaXQoNDIsIDQ5KSxcbiAgYmdZZWxsb3c6IGluaXQoNDMsIDQ5KSxcbiAgYmdCbHVlOiBpbml0KDQ0LCA0OSksXG4gIGJnTWFnZW50YTogaW5pdCg0NSwgNDkpLFxuICBiZ0N5YW46IGluaXQoNDYsIDQ5KSxcbiAgYmdXaGl0ZTogaW5pdCg0NywgNDkpLFxuICBibGFja0JyaWdodDogaW5pdCg5MCwgMzkpLFxuICByZWRCcmlnaHQ6IGluaXQoOTEsIDM5KSxcbiAgZ3JlZW5CcmlnaHQ6IGluaXQoOTIsIDM5KSxcbiAgeWVsbG93QnJpZ2h0OiBpbml0KDkzLCAzOSksXG4gIGJsdWVCcmlnaHQ6IGluaXQoOTQsIDM5KSxcbiAgbWFnZW50YUJyaWdodDogaW5pdCg5NSwgMzkpLFxuICBjeWFuQnJpZ2h0OiBpbml0KDk2LCAzOSksXG4gIHdoaXRlQnJpZ2h0OiBpbml0KDk3LCAzOSksXG4gIGJnQmxhY2tCcmlnaHQ6IGluaXQoMTAwLCA0OSksXG4gIGJnUmVkQnJpZ2h0OiBpbml0KDEwMSwgNDkpLFxuICBiZ0dyZWVuQnJpZ2h0OiBpbml0KDEwMiwgNDkpLFxuICBiZ1llbGxvd0JyaWdodDogaW5pdCgxMDMsIDQ5KSxcbiAgYmdCbHVlQnJpZ2h0OiBpbml0KDEwNCwgNDkpLFxuICBiZ01hZ2VudGFCcmlnaHQ6IGluaXQoMTA1LCA0OSksXG4gIGJnQ3lhbkJyaWdodDogaW5pdCgxMDYsIDQ5KSxcbiAgYmdXaGl0ZUJyaWdodDogaW5pdCgxMDcsIDQ5KSxcbn07XG5cbmNvbnN0IGNyZWF0ZUNvbG9ycyA9ICh7IHVzZUNvbG9yID0gaXNDb2xvclN1cHBvcnRlZCB9ID0ge30pID0+XG4gIHVzZUNvbG9yXG4gICAgPyBjb2xvcnNcbiAgICA6IE9iamVjdC5rZXlzKGNvbG9ycykucmVkdWNlKFxuICAgICAgICAoY29sb3JzLCBrZXkpID0+ICh7IC4uLmNvbG9ycywgW2tleV06IFN0cmluZyB9KSxcbiAgICAgICAge31cbiAgICAgICk7XG5cbmNvbnN0IHtcbiAgcmVzZXQsXG4gIGJvbGQsXG4gIGRpbSxcbiAgaXRhbGljLFxuICB1bmRlcmxpbmUsXG4gIGludmVyc2UsXG4gIGhpZGRlbixcbiAgc3RyaWtldGhyb3VnaCxcbiAgYmxhY2ssXG4gIHJlZCxcbiAgZ3JlZW4sXG4gIHllbGxvdyxcbiAgYmx1ZSxcbiAgbWFnZW50YSxcbiAgY3lhbixcbiAgd2hpdGUsXG4gIGdyYXksXG4gIGJnQmxhY2ssXG4gIGJnUmVkLFxuICBiZ0dyZWVuLFxuICBiZ1llbGxvdyxcbiAgYmdCbHVlLFxuICBiZ01hZ2VudGEsXG4gIGJnQ3lhbixcbiAgYmdXaGl0ZSxcbiAgYmxhY2tCcmlnaHQsXG4gIHJlZEJyaWdodCxcbiAgZ3JlZW5CcmlnaHQsXG4gIHllbGxvd0JyaWdodCxcbiAgYmx1ZUJyaWdodCxcbiAgbWFnZW50YUJyaWdodCxcbiAgY3lhbkJyaWdodCxcbiAgd2hpdGVCcmlnaHQsXG4gIGJnQmxhY2tCcmlnaHQsXG4gIGJnUmVkQnJpZ2h0LFxuICBiZ0dyZWVuQnJpZ2h0LFxuICBiZ1llbGxvd0JyaWdodCxcbiAgYmdCbHVlQnJpZ2h0LFxuICBiZ01hZ2VudGFCcmlnaHQsXG4gIGJnQ3lhbkJyaWdodCxcbiAgYmdXaGl0ZUJyaWdodCxcbn0gPSBjcmVhdGVDb2xvcnMoKTtcblxuZXhwb3J0cy5iZ0JsYWNrID0gYmdCbGFjaztcbmV4cG9ydHMuYmdCbGFja0JyaWdodCA9IGJnQmxhY2tCcmlnaHQ7XG5leHBvcnRzLmJnQmx1ZSA9IGJnQmx1ZTtcbmV4cG9ydHMuYmdCbHVlQnJpZ2h0ID0gYmdCbHVlQnJpZ2h0O1xuZXhwb3J0cy5iZ0N5YW4gPSBiZ0N5YW47XG5leHBvcnRzLmJnQ3lhbkJyaWdodCA9IGJnQ3lhbkJyaWdodDtcbmV4cG9ydHMuYmdHcmVlbiA9IGJnR3JlZW47XG5leHBvcnRzLmJnR3JlZW5CcmlnaHQgPSBiZ0dyZWVuQnJpZ2h0O1xuZXhwb3J0cy5iZ01hZ2VudGEgPSBiZ01hZ2VudGE7XG5leHBvcnRzLmJnTWFnZW50YUJyaWdodCA9IGJnTWFnZW50YUJyaWdodDtcbmV4cG9ydHMuYmdSZWQgPSBiZ1JlZDtcbmV4cG9ydHMuYmdSZWRCcmlnaHQgPSBiZ1JlZEJyaWdodDtcbmV4cG9ydHMuYmdXaGl0ZSA9IGJnV2hpdGU7XG5leHBvcnRzLmJnV2hpdGVCcmlnaHQgPSBiZ1doaXRlQnJpZ2h0O1xuZXhwb3J0cy5iZ1llbGxvdyA9IGJnWWVsbG93O1xuZXhwb3J0cy5iZ1llbGxvd0JyaWdodCA9IGJnWWVsbG93QnJpZ2h0O1xuZXhwb3J0cy5ibGFjayA9IGJsYWNrO1xuZXhwb3J0cy5ibGFja0JyaWdodCA9IGJsYWNrQnJpZ2h0O1xuZXhwb3J0cy5ibHVlID0gYmx1ZTtcbmV4cG9ydHMuYmx1ZUJyaWdodCA9IGJsdWVCcmlnaHQ7XG5leHBvcnRzLmJvbGQgPSBib2xkO1xuZXhwb3J0cy5jcmVhdGVDb2xvcnMgPSBjcmVhdGVDb2xvcnM7XG5leHBvcnRzLmN5YW4gPSBjeWFuO1xuZXhwb3J0cy5jeWFuQnJpZ2h0ID0gY3lhbkJyaWdodDtcbmV4cG9ydHMuZGltID0gZGltO1xuZXhwb3J0cy5ncmF5ID0gZ3JheTtcbmV4cG9ydHMuZ3JlZW4gPSBncmVlbjtcbmV4cG9ydHMuZ3JlZW5CcmlnaHQgPSBncmVlbkJyaWdodDtcbmV4cG9ydHMuaGlkZGVuID0gaGlkZGVuO1xuZXhwb3J0cy5pbnZlcnNlID0gaW52ZXJzZTtcbmV4cG9ydHMuaXNDb2xvclN1cHBvcnRlZCA9IGlzQ29sb3JTdXBwb3J0ZWQ7XG5leHBvcnRzLml0YWxpYyA9IGl0YWxpYztcbmV4cG9ydHMubWFnZW50YSA9IG1hZ2VudGE7XG5leHBvcnRzLm1hZ2VudGFCcmlnaHQgPSBtYWdlbnRhQnJpZ2h0O1xuZXhwb3J0cy5yZWQgPSByZWQ7XG5leHBvcnRzLnJlZEJyaWdodCA9IHJlZEJyaWdodDtcbmV4cG9ydHMucmVzZXQgPSByZXNldDtcbmV4cG9ydHMuc3RyaWtldGhyb3VnaCA9IHN0cmlrZXRocm91Z2g7XG5leHBvcnRzLnVuZGVybGluZSA9IHVuZGVybGluZTtcbmV4cG9ydHMud2hpdGUgPSB3aGl0ZTtcbmV4cG9ydHMud2hpdGVCcmlnaHQgPSB3aGl0ZUJyaWdodDtcbmV4cG9ydHMueWVsbG93ID0geWVsbG93O1xuZXhwb3J0cy55ZWxsb3dCcmlnaHQgPSB5ZWxsb3dCcmlnaHQ7XG4iLCAiLy8gUmV0dXJucyBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgd3JhcHBlZCBjYWxsYmFja1xuLy8gVGhlIHdyYXBwZXIgZnVuY3Rpb24gc2hvdWxkIGRvIHNvbWUgc3R1ZmYsIGFuZCByZXR1cm4gYVxuLy8gcHJlc3VtYWJseSBkaWZmZXJlbnQgY2FsbGJhY2sgZnVuY3Rpb24uXG4vLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBvd24gcHJvcGVydGllcyBhcmUgcmV0YWluZWQsIHNvIHRoYXRcbi8vIGRlY29yYXRpb25zIGFuZCBzdWNoIGFyZSBub3QgbG9zdCBhbG9uZyB0aGUgd2F5LlxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHlcbmZ1bmN0aW9uIHdyYXBweSAoZm4sIGNiKSB7XG4gIGlmIChmbiAmJiBjYikgcmV0dXJuIHdyYXBweShmbikoY2IpXG5cbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduZWVkIHdyYXBwZXIgZnVuY3Rpb24nKVxuXG4gIE9iamVjdC5rZXlzKGZuKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgd3JhcHBlcltrXSA9IGZuW2tdXG4gIH0pXG5cbiAgcmV0dXJuIHdyYXBwZXJcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKVxuICAgIHZhciBjYiA9IGFyZ3NbYXJncy5sZW5ndGgtMV1cbiAgICBpZiAodHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJyAmJiByZXQgIT09IGNiKSB7XG4gICAgICBPYmplY3Qua2V5cyhjYikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICByZXRba10gPSBjYltrXVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG59XG4iLCAidmFyIHdyYXBweSA9IHJlcXVpcmUoJ3dyYXBweScpXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweShvbmNlKVxubW9kdWxlLmV4cG9ydHMuc3RyaWN0ID0gd3JhcHB5KG9uY2VTdHJpY3QpXG5cbm9uY2UucHJvdG8gPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2UnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlKHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVuY3Rpb24ucHJvdG90eXBlLCAnb25jZVN0cmljdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9uY2VTdHJpY3QodGhpcylcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufSlcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKSByZXR1cm4gZi52YWx1ZVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cblxuZnVuY3Rpb24gb25jZVN0cmljdCAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGYub25jZUVycm9yKVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIHZhciBuYW1lID0gZm4ubmFtZSB8fCAnRnVuY3Rpb24gd3JhcHBlZCB3aXRoIGBvbmNlYCdcbiAgZi5vbmNlRXJyb3IgPSBuYW1lICsgXCIgc2hvdWxkbid0IGJlIGNhbGxlZCBtb3JlIHRoYW4gb25jZVwiXG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cbiIsICJ2YXIgb25jZSA9IHJlcXVpcmUoJ29uY2UnKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG52YXIgaXNSZXF1ZXN0ID0gZnVuY3Rpb24oc3RyZWFtKSB7XG5cdHJldHVybiBzdHJlYW0uc2V0SGVhZGVyICYmIHR5cGVvZiBzdHJlYW0uYWJvcnQgPT09ICdmdW5jdGlvbic7XG59O1xuXG52YXIgaXNDaGlsZFByb2Nlc3MgPSBmdW5jdGlvbihzdHJlYW0pIHtcblx0cmV0dXJuIHN0cmVhbS5zdGRpbyAmJiBBcnJheS5pc0FycmF5KHN0cmVhbS5zdGRpbykgJiYgc3RyZWFtLnN0ZGlvLmxlbmd0aCA9PT0gM1xufTtcblxudmFyIGVvcyA9IGZ1bmN0aW9uKHN0cmVhbSwgb3B0cywgY2FsbGJhY2spIHtcblx0aWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSByZXR1cm4gZW9zKHN0cmVhbSwgbnVsbCwgb3B0cyk7XG5cdGlmICghb3B0cykgb3B0cyA9IHt9O1xuXG5cdGNhbGxiYWNrID0gb25jZShjYWxsYmFjayB8fCBub29wKTtcblxuXHR2YXIgd3MgPSBzdHJlYW0uX3dyaXRhYmxlU3RhdGU7XG5cdHZhciBycyA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcblx0dmFyIHJlYWRhYmxlID0gb3B0cy5yZWFkYWJsZSB8fCAob3B0cy5yZWFkYWJsZSAhPT0gZmFsc2UgJiYgc3RyZWFtLnJlYWRhYmxlKTtcblx0dmFyIHdyaXRhYmxlID0gb3B0cy53cml0YWJsZSB8fCAob3B0cy53cml0YWJsZSAhPT0gZmFsc2UgJiYgc3RyZWFtLndyaXRhYmxlKTtcblx0dmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuXG5cdHZhciBvbmxlZ2FjeWZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICghc3RyZWFtLndyaXRhYmxlKSBvbmZpbmlzaCgpO1xuXHR9O1xuXG5cdHZhciBvbmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdHdyaXRhYmxlID0gZmFsc2U7XG5cdFx0aWYgKCFyZWFkYWJsZSkgY2FsbGJhY2suY2FsbChzdHJlYW0pO1xuXHR9O1xuXG5cdHZhciBvbmVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdHJlYWRhYmxlID0gZmFsc2U7XG5cdFx0aWYgKCF3cml0YWJsZSkgY2FsbGJhY2suY2FsbChzdHJlYW0pO1xuXHR9O1xuXG5cdHZhciBvbmV4aXQgPSBmdW5jdGlvbihleGl0Q29kZSkge1xuXHRcdGNhbGxiYWNrLmNhbGwoc3RyZWFtLCBleGl0Q29kZSA/IG5ldyBFcnJvcignZXhpdGVkIHdpdGggZXJyb3IgY29kZTogJyArIGV4aXRDb2RlKSA6IG51bGwpO1xuXHR9O1xuXG5cdHZhciBvbmVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG5cdFx0Y2FsbGJhY2suY2FsbChzdHJlYW0sIGVycik7XG5cdH07XG5cblx0dmFyIG9uY2xvc2UgPSBmdW5jdGlvbigpIHtcblx0XHRwcm9jZXNzLm5leHRUaWNrKG9uY2xvc2VuZXh0dGljayk7XG5cdH07XG5cblx0dmFyIG9uY2xvc2VuZXh0dGljayA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmIChjYW5jZWxsZWQpIHJldHVybjtcblx0XHRpZiAocmVhZGFibGUgJiYgIShycyAmJiAocnMuZW5kZWQgJiYgIXJzLmRlc3Ryb3llZCkpKSByZXR1cm4gY2FsbGJhY2suY2FsbChzdHJlYW0sIG5ldyBFcnJvcigncHJlbWF0dXJlIGNsb3NlJykpO1xuXHRcdGlmICh3cml0YWJsZSAmJiAhKHdzICYmICh3cy5lbmRlZCAmJiAhd3MuZGVzdHJveWVkKSkpIHJldHVybiBjYWxsYmFjay5jYWxsKHN0cmVhbSwgbmV3IEVycm9yKCdwcmVtYXR1cmUgY2xvc2UnKSk7XG5cdH07XG5cblx0dmFyIG9ucmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuXHRcdHN0cmVhbS5yZXEub24oJ2ZpbmlzaCcsIG9uZmluaXNoKTtcblx0fTtcblxuXHRpZiAoaXNSZXF1ZXN0KHN0cmVhbSkpIHtcblx0XHRzdHJlYW0ub24oJ2NvbXBsZXRlJywgb25maW5pc2gpO1xuXHRcdHN0cmVhbS5vbignYWJvcnQnLCBvbmNsb3NlKTtcblx0XHRpZiAoc3RyZWFtLnJlcSkgb25yZXF1ZXN0KCk7XG5cdFx0ZWxzZSBzdHJlYW0ub24oJ3JlcXVlc3QnLCBvbnJlcXVlc3QpO1xuXHR9IGVsc2UgaWYgKHdyaXRhYmxlICYmICF3cykgeyAvLyBsZWdhY3kgc3RyZWFtc1xuXHRcdHN0cmVhbS5vbignZW5kJywgb25sZWdhY3lmaW5pc2gpO1xuXHRcdHN0cmVhbS5vbignY2xvc2UnLCBvbmxlZ2FjeWZpbmlzaCk7XG5cdH1cblxuXHRpZiAoaXNDaGlsZFByb2Nlc3Moc3RyZWFtKSkgc3RyZWFtLm9uKCdleGl0Jywgb25leGl0KTtcblxuXHRzdHJlYW0ub24oJ2VuZCcsIG9uZW5kKTtcblx0c3RyZWFtLm9uKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cdGlmIChvcHRzLmVycm9yICE9PSBmYWxzZSkgc3RyZWFtLm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuXHRzdHJlYW0ub24oJ2Nsb3NlJywgb25jbG9zZSk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNhbmNlbGxlZCA9IHRydWU7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdjb21wbGV0ZScsIG9uZmluaXNoKTtcblx0XHRzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Fib3J0Jywgb25jbG9zZSk7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdyZXF1ZXN0Jywgb25yZXF1ZXN0KTtcblx0XHRpZiAoc3RyZWFtLnJlcSkgc3RyZWFtLnJlcS5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuXHRcdHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25sZWdhY3lmaW5pc2gpO1xuXHRcdHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmxlZ2FjeWZpbmlzaCk7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdleGl0Jywgb25leGl0KTtcblx0XHRzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcblx0XHRzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlb3M7XG4iLCAidmFyIG9uY2UgPSByZXF1aXJlKCdvbmNlJylcbnZhciBlb3MgPSByZXF1aXJlKCdlbmQtb2Ytc3RyZWFtJylcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJykgLy8gd2Ugb25seSBuZWVkIGZzIHRvIGdldCB0aGUgUmVhZFN0cmVhbSBhbmQgV3JpdGVTdHJlYW0gcHJvdG90eXBlc1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG52YXIgYW5jaWVudCA9IC9edj9cXC4wLy50ZXN0KHByb2Nlc3MudmVyc2lvbilcblxudmFyIGlzRm4gPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG52YXIgaXNGUyA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgaWYgKCFhbmNpZW50KSByZXR1cm4gZmFsc2UgLy8gbmV3ZXIgbm9kZSB2ZXJzaW9uIGRvIG5vdCBuZWVkIHRvIGNhcmUgYWJvdXQgZnMgaXMgYSBzcGVjaWFsIHdheVxuICBpZiAoIWZzKSByZXR1cm4gZmFsc2UgLy8gYnJvd3NlclxuICByZXR1cm4gKHN0cmVhbSBpbnN0YW5jZW9mIChmcy5SZWFkU3RyZWFtIHx8IG5vb3ApIHx8IHN0cmVhbSBpbnN0YW5jZW9mIChmcy5Xcml0ZVN0cmVhbSB8fCBub29wKSkgJiYgaXNGbihzdHJlYW0uY2xvc2UpXG59XG5cbnZhciBpc1JlcXVlc3QgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW0uc2V0SGVhZGVyICYmIGlzRm4oc3RyZWFtLmFib3J0KVxufVxuXG52YXIgZGVzdHJveWVyID0gZnVuY3Rpb24gKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrKVxuXG4gIHZhciBjbG9zZWQgPSBmYWxzZVxuICBzdHJlYW0ub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGNsb3NlZCA9IHRydWVcbiAgfSlcblxuICBlb3Moc3RyZWFtLCB7cmVhZGFibGU6IHJlYWRpbmcsIHdyaXRhYmxlOiB3cml0aW5nfSwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgY2xvc2VkID0gdHJ1ZVxuICAgIGNhbGxiYWNrKClcbiAgfSlcblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2VcbiAgcmV0dXJuIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoY2xvc2VkKSByZXR1cm5cbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBkZXN0cm95ZWQgPSB0cnVlXG5cbiAgICBpZiAoaXNGUyhzdHJlYW0pKSByZXR1cm4gc3RyZWFtLmNsb3NlKG5vb3ApIC8vIHVzZSBjbG9zZSBmb3IgZnMgc3RyZWFtcyB0byBhdm9pZCBmZCBsZWFrc1xuICAgIGlmIChpc1JlcXVlc3Qoc3RyZWFtKSkgcmV0dXJuIHN0cmVhbS5hYm9ydCgpIC8vIHJlcXVlc3QuZGVzdHJveSBqdXN0IGRvIC5lbmQgLSAuYWJvcnQgaXMgd2hhdCB3ZSB3YW50XG5cbiAgICBpZiAoaXNGbihzdHJlYW0uZGVzdHJveSkpIHJldHVybiBzdHJlYW0uZGVzdHJveSgpXG5cbiAgICBjYWxsYmFjayhlcnIgfHwgbmV3IEVycm9yKCdzdHJlYW0gd2FzIGRlc3Ryb3llZCcpKVxuICB9XG59XG5cbnZhciBjYWxsID0gZnVuY3Rpb24gKGZuKSB7XG4gIGZuKClcbn1cblxudmFyIHBpcGUgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgcmV0dXJuIGZyb20ucGlwZSh0bylcbn1cblxudmFyIHB1bXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdHJlYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICB2YXIgY2FsbGJhY2sgPSBpc0ZuKHN0cmVhbXNbc3RyZWFtcy5sZW5ndGggLSAxXSB8fCBub29wKSAmJiBzdHJlYW1zLnBvcCgpIHx8IG5vb3BcblxuICBpZiAoQXJyYXkuaXNBcnJheShzdHJlYW1zWzBdKSkgc3RyZWFtcyA9IHN0cmVhbXNbMF1cbiAgaWYgKHN0cmVhbXMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKCdwdW1wIHJlcXVpcmVzIHR3byBzdHJlYW1zIHBlciBtaW5pbXVtJylcblxuICB2YXIgZXJyb3JcbiAgdmFyIGRlc3Ryb3lzID0gc3RyZWFtcy5tYXAoZnVuY3Rpb24gKHN0cmVhbSwgaSkge1xuICAgIHZhciByZWFkaW5nID0gaSA8IHN0cmVhbXMubGVuZ3RoIC0gMVxuICAgIHZhciB3cml0aW5nID0gaSA+IDBcbiAgICByZXR1cm4gZGVzdHJveWVyKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKCFlcnJvcikgZXJyb3IgPSBlcnJcbiAgICAgIGlmIChlcnIpIGRlc3Ryb3lzLmZvckVhY2goY2FsbClcbiAgICAgIGlmIChyZWFkaW5nKSByZXR1cm5cbiAgICAgIGRlc3Ryb3lzLmZvckVhY2goY2FsbClcbiAgICAgIGNhbGxiYWNrKGVycm9yKVxuICAgIH0pXG4gIH0pXG5cbiAgcmV0dXJuIHN0cmVhbXMucmVkdWNlKHBpcGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHVtcFxuIiwgIi8qXG5Db3B5cmlnaHQgKGMpIDIwMTQtMjAyMSwgTWF0dGVvIENvbGxpbmEgPGhlbGxvQG1hdHRlb2NvbGxpbmEuY29tPlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbmNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTXG5XSVRIIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GXG5NRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUlxuQU5ZIFNQRUNJQUwsIERJUkVDVCwgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFU1xuV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTSBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOXG5BQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1IgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUlxuSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1IgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IFRyYW5zZm9ybSB9ID0gcmVxdWlyZSgnc3RyZWFtJylcbmNvbnN0IHsgU3RyaW5nRGVjb2RlciB9ID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXInKVxuY29uc3Qga0xhc3QgPSBTeW1ib2woJ2xhc3QnKVxuY29uc3Qga0RlY29kZXIgPSBTeW1ib2woJ2RlY29kZXInKVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0gKGNodW5rLCBlbmMsIGNiKSB7XG4gIGxldCBsaXN0XG4gIGlmICh0aGlzLm92ZXJmbG93KSB7IC8vIExpbmUgYnVmZmVyIGlzIGZ1bGwuIFNraXAgdG8gc3RhcnQgb2YgbmV4dCBsaW5lLlxuICAgIGNvbnN0IGJ1ZiA9IHRoaXNba0RlY29kZXJdLndyaXRlKGNodW5rKVxuICAgIGxpc3QgPSBidWYuc3BsaXQodGhpcy5tYXRjaGVyKVxuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm4gY2IoKSAvLyBMaW5lIGVuZGluZyBub3QgZm91bmQuIERpc2NhcmQgZW50aXJlIGNodW5rLlxuXG4gICAgLy8gTGluZSBlbmRpbmcgZm91bmQuIERpc2NhcmQgdHJhaWxpbmcgZnJhZ21lbnQgb2YgcHJldmlvdXMgbGluZSBhbmQgcmVzZXQgb3ZlcmZsb3cgc3RhdGUuXG4gICAgbGlzdC5zaGlmdCgpXG4gICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gIH0gZWxzZSB7XG4gICAgdGhpc1trTGFzdF0gKz0gdGhpc1trRGVjb2Rlcl0ud3JpdGUoY2h1bmspXG4gICAgbGlzdCA9IHRoaXNba0xhc3RdLnNwbGl0KHRoaXMubWF0Y2hlcilcbiAgfVxuXG4gIHRoaXNba0xhc3RdID0gbGlzdC5wb3AoKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHRyeSB7XG4gICAgICBwdXNoKHRoaXMsIHRoaXMubWFwcGVyKGxpc3RbaV0pKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5vdmVyZmxvdyA9IHRoaXNba0xhc3RdLmxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoXG4gIGlmICh0aGlzLm92ZXJmbG93ICYmICF0aGlzLnNraXBPdmVyZmxvdykge1xuICAgIGNiKG5ldyBFcnJvcignbWF4aW11bSBidWZmZXIgcmVhY2hlZCcpKVxuICAgIHJldHVyblxuICB9XG5cbiAgY2IoKVxufVxuXG5mdW5jdGlvbiBmbHVzaCAoY2IpIHtcbiAgLy8gZm9yd2FyZCBhbnkgZ2liYmVyaXNoIGxlZnQgaW4gdGhlcmVcbiAgdGhpc1trTGFzdF0gKz0gdGhpc1trRGVjb2Rlcl0uZW5kKClcblxuICBpZiAodGhpc1trTGFzdF0pIHtcbiAgICB0cnkge1xuICAgICAgcHVzaCh0aGlzLCB0aGlzLm1hcHBlcih0aGlzW2tMYXN0XSkpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYihlcnJvcilcbiAgICB9XG4gIH1cblxuICBjYigpXG59XG5cbmZ1bmN0aW9uIHB1c2ggKHNlbGYsIHZhbCkge1xuICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBzZWxmLnB1c2godmFsKVxuICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AgKGluY29taW5nKSB7XG4gIHJldHVybiBpbmNvbWluZ1xufVxuXG5mdW5jdGlvbiBzcGxpdCAobWF0Y2hlciwgbWFwcGVyLCBvcHRpb25zKSB7XG4gIC8vIFNldCBkZWZhdWx0cyBmb3IgYW55IGFyZ3VtZW50cyBub3Qgc3VwcGxpZWQuXG4gIG1hdGNoZXIgPSBtYXRjaGVyIHx8IC9cXHI/XFxuL1xuICBtYXBwZXIgPSBtYXBwZXIgfHwgbm9vcFxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIC8vIFRlc3QgYXJndW1lbnRzIGV4cGxpY2l0bHkuXG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIC8vIElmIG1hcHBlciBpcyBvbmx5IGFyZ3VtZW50LlxuICAgICAgaWYgKHR5cGVvZiBtYXRjaGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1hcHBlciA9IG1hdGNoZXJcbiAgICAgICAgbWF0Y2hlciA9IC9cXHI/XFxuL1xuICAgICAgLy8gSWYgb3B0aW9ucyBpcyBvbmx5IGFyZ3VtZW50LlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ29iamVjdCcgJiYgIShtYXRjaGVyIGluc3RhbmNlb2YgUmVnRXhwKSAmJiAhbWF0Y2hlcltTeW1ib2wuc3BsaXRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBtYXRjaGVyXG4gICAgICAgIG1hdGNoZXIgPSAvXFxyP1xcbi9cbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlIDI6XG4gICAgICAvLyBJZiBtYXBwZXIgYW5kIG9wdGlvbnMgYXJlIGFyZ3VtZW50cy5cbiAgICAgIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zID0gbWFwcGVyXG4gICAgICAgIG1hcHBlciA9IG1hdGNoZXJcbiAgICAgICAgbWF0Y2hlciA9IC9cXHI/XFxuL1xuICAgICAgLy8gSWYgbWF0Y2hlciBhbmQgb3B0aW9ucyBhcmUgYXJndW1lbnRzLlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWFwcGVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gbWFwcGVyXG4gICAgICAgIG1hcHBlciA9IG5vb3BcbiAgICAgIH1cbiAgfVxuXG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKVxuICBvcHRpb25zLmF1dG9EZXN0cm95ID0gdHJ1ZVxuICBvcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuICBvcHRpb25zLmZsdXNoID0gZmx1c2hcbiAgb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGUgPSB0cnVlXG5cbiAgY29uc3Qgc3RyZWFtID0gbmV3IFRyYW5zZm9ybShvcHRpb25zKVxuXG4gIHN0cmVhbVtrTGFzdF0gPSAnJ1xuICBzdHJlYW1ba0RlY29kZXJdID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKVxuICBzdHJlYW0ubWF0Y2hlciA9IG1hdGNoZXJcbiAgc3RyZWFtLm1hcHBlciA9IG1hcHBlclxuICBzdHJlYW0ubWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGhcbiAgc3RyZWFtLnNraXBPdmVyZmxvdyA9IG9wdGlvbnMuc2tpcE92ZXJmbG93IHx8IGZhbHNlXG4gIHN0cmVhbS5vdmVyZmxvdyA9IGZhbHNlXG4gIHN0cmVhbS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gICAgLy8gV2VpcmQgTm9kZSB2MTIgYnVnIHRoYXQgd2UgbmVlZCB0byB3b3JrIGFyb3VuZFxuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gZmFsc2VcbiAgICBjYihlcnIpXG4gIH1cblxuICByZXR1cm4gc3RyZWFtXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3BsaXRcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgbWV0YWRhdGEgPSBTeW1ib2wuZm9yKCdwaW5vLm1ldGFkYXRhJylcbmNvbnN0IHNwbGl0ID0gcmVxdWlyZSgnc3BsaXQyJylcbmNvbnN0IHsgRHVwbGV4IH0gPSByZXF1aXJlKCdzdHJlYW0nKVxuY29uc3QgeyBwYXJlbnRQb3J0LCB3b3JrZXJEYXRhIH0gPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpXG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmVycmVkICgpIHtcbiAgbGV0IHJlc29sdmVcbiAgbGV0IHJlamVjdFxuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgcmVzb2x2ZSA9IF9yZXNvbHZlXG4gICAgcmVqZWN0ID0gX3JlamVjdFxuICB9KVxuICBwcm9taXNlLnJlc29sdmUgPSByZXNvbHZlXG4gIHByb21pc2UucmVqZWN0ID0gcmVqZWN0XG4gIHJldHVybiBwcm9taXNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGQgKGZuLCBvcHRzID0ge30pIHtcbiAgY29uc3Qgd2FpdEZvckNvbmZpZyA9IG9wdHMuZXhwZWN0UGlub0NvbmZpZyA9PT0gdHJ1ZSAmJiB3b3JrZXJEYXRhPy53b3JrZXJEYXRhPy5waW5vV2lsbFNlbmRDb25maWcgPT09IHRydWVcbiAgY29uc3QgcGFyc2VMaW5lcyA9IG9wdHMucGFyc2UgPT09ICdsaW5lcydcbiAgY29uc3QgcGFyc2VMaW5lID0gdHlwZW9mIG9wdHMucGFyc2VMaW5lID09PSAnZnVuY3Rpb24nID8gb3B0cy5wYXJzZUxpbmUgOiBKU09OLnBhcnNlXG4gIGNvbnN0IGNsb3NlID0gb3B0cy5jbG9zZSB8fCBkZWZhdWx0Q2xvc2VcbiAgY29uc3Qgc3RyZWFtID0gc3BsaXQoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICBsZXQgdmFsdWVcblxuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IHBhcnNlTGluZShsaW5lKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmVtaXQoJ3Vua25vd24nLCBsaW5lLCBlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5lbWl0KCd1bmtub3duJywgbGluZSwgJ051bGwgdmFsdWUgaWdub3JlZCcpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFsdWUgPSB7XG4gICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbVttZXRhZGF0YV0pIHtcbiAgICAgIHN0cmVhbS5sYXN0VGltZSA9IHZhbHVlLnRpbWVcbiAgICAgIHN0cmVhbS5sYXN0TGV2ZWwgPSB2YWx1ZS5sZXZlbFxuICAgICAgc3RyZWFtLmxhc3RPYmogPSB2YWx1ZVxuICAgIH1cblxuICAgIGlmIChwYXJzZUxpbmVzKSB7XG4gICAgICByZXR1cm4gbGluZVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9LCB7IGF1dG9EZXN0cm95OiB0cnVlIH0pXG5cbiAgc3RyZWFtLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgICBjb25zdCBwcm9taXNlID0gY2xvc2UoZXJyLCBjYilcbiAgICBpZiAocHJvbWlzZSAmJiB0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9taXNlLnRoZW4oY2IsIGNiKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLmV4cGVjdFBpbm9Db25maWcgPT09IHRydWUgJiYgd29ya2VyRGF0YT8ud29ya2VyRGF0YT8ucGlub1dpbGxTZW5kQ29uZmlnICE9PSB0cnVlKSB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignVGhpcyB0cmFuc3BvcnQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHBpbm8uIFBsZWFzZSB1cGdyYWRlIHBpbm8gdG8gdGhlIGxhdGVzdCB2ZXJzaW9uLicpKVxuICAgIH0pXG4gIH1cblxuICBpZiAob3B0cy5tZXRhZGF0YSAhPT0gZmFsc2UpIHtcbiAgICBzdHJlYW1bbWV0YWRhdGFdID0gdHJ1ZVxuICAgIHN0cmVhbS5sYXN0VGltZSA9IDBcbiAgICBzdHJlYW0ubGFzdExldmVsID0gMFxuICAgIHN0cmVhbS5sYXN0T2JqID0gbnVsbFxuICB9XG5cbiAgaWYgKHdhaXRGb3JDb25maWcpIHtcbiAgICBsZXQgcGlub0NvbmZpZyA9IHt9XG4gICAgY29uc3QgY29uZmlnUmVjZWl2ZWQgPSBjcmVhdGVEZWZlcnJlZCgpXG4gICAgcGFyZW50UG9ydC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UgKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChtZXNzYWdlLmNvZGUgPT09ICdQSU5PX0NPTkZJRycpIHtcbiAgICAgICAgcGlub0NvbmZpZyA9IG1lc3NhZ2UuY29uZmlnXG4gICAgICAgIGNvbmZpZ1JlY2VpdmVkLnJlc29sdmUoKVxuICAgICAgICBwYXJlbnRQb3J0Lm9mZignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0cmVhbSwge1xuICAgICAgbGV2ZWxzOiB7XG4gICAgICAgIGdldCAoKSB7IHJldHVybiBwaW5vQ29uZmlnLmxldmVscyB9XG4gICAgICB9LFxuICAgICAgbWVzc2FnZUtleToge1xuICAgICAgICBnZXQgKCkgeyByZXR1cm4gcGlub0NvbmZpZy5tZXNzYWdlS2V5IH1cbiAgICAgIH0sXG4gICAgICBlcnJvcktleToge1xuICAgICAgICBnZXQgKCkgeyByZXR1cm4gcGlub0NvbmZpZy5lcnJvcktleSB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBjb25maWdSZWNlaXZlZC50aGVuKGZpbmlzaClcbiAgfVxuXG4gIHJldHVybiBmaW5pc2goKVxuXG4gIGZ1bmN0aW9uIGZpbmlzaCAoKSB7XG4gICAgbGV0IHJlcyA9IGZuKHN0cmVhbSlcblxuICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVzLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgc3RyZWFtLmRlc3Ryb3koZXJyKVxuICAgICAgfSlcblxuICAgICAgLy8gc2V0IGl0IHRvIG51bGwgdG8gbm90IHJldGFpbiBhIHJlZmVyZW5jZSB0byB0aGUgcHJvbWlzZVxuICAgICAgcmVzID0gbnVsbFxuICAgIH0gZWxzZSBpZiAob3B0cy5lbmFibGVQaXBlbGluaW5nICYmIHJlcykge1xuICAgICAgcmV0dXJuIER1cGxleC5mcm9tKHsgd3JpdGFibGU6IHN0cmVhbSwgcmVhZGFibGU6IHJlcyB9KVxuICAgIH1cblxuICAgIHJldHVybiBzdHJlYW1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xvc2UgKGVyciwgY2IpIHtcbiAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXJyKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEEgc2V0IG9mIHByb3BlcnR5IG5hbWVzIHRoYXQgaW5kaWNhdGUgdGhlIHZhbHVlIHJlcHJlc2VudHMgYW4gZXJyb3Igb2JqZWN0LlxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmdbXX0gS19FUlJPUl9MSUtFX0tFWVNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgREFURV9GT1JNQVQ6ICd5eXl5LW1tLWRkIEhIOk1NOnNzLmwgbycsXG4gIERBVEVfRk9STUFUX1NJTVBMRTogJ0hIOk1NOnNzLmwnLFxuXG4gIC8qKlxuICAgKiBAdHlwZSB7S19FUlJPUl9MSUtFX0tFWVN9XG4gICAqL1xuICBFUlJPUl9MSUtFX0tFWVM6IFsnZXJyJywgJ2Vycm9yJ10sXG5cbiAgTUVTU0FHRV9LRVk6ICdtc2cnLFxuXG4gIExFVkVMX0tFWTogJ2xldmVsJyxcblxuICBMRVZFTF9MQUJFTDogJ2xldmVsTGFiZWwnLFxuXG4gIFRJTUVTVEFNUF9LRVk6ICd0aW1lJyxcblxuICBMRVZFTFM6IHtcbiAgICBkZWZhdWx0OiAnVVNFUkxWTCcsXG4gICAgNjA6ICdGQVRBTCcsXG4gICAgNTA6ICdFUlJPUicsXG4gICAgNDA6ICdXQVJOJyxcbiAgICAzMDogJ0lORk8nLFxuICAgIDIwOiAnREVCVUcnLFxuICAgIDEwOiAnVFJBQ0UnXG4gIH0sXG5cbiAgTEVWRUxfTkFNRVM6IHtcbiAgICBmYXRhbDogNjAsXG4gICAgZXJyb3I6IDUwLFxuICAgIHdhcm46IDQwLFxuICAgIGluZm86IDMwLFxuICAgIGRlYnVnOiAyMCxcbiAgICB0cmFjZTogMTBcbiAgfSxcblxuICAvLyBPYmplY3Qga2V5cyB0aGF0IHByb2JhYmx5IGNhbWUgZnJvbSBhIGxvZ2dlciBsaWtlIFBpbm8gb3IgQnVueWFuLlxuICBMT0dHRVJfS0VZUzogW1xuICAgICdwaWQnLFxuICAgICdob3N0bmFtZScsXG4gICAgJ25hbWUnLFxuICAgICdsZXZlbCcsXG4gICAgJ3RpbWUnLFxuICAgICd0aW1lc3RhbXAnLFxuICAgICdjYWxsZXInXG4gIF1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZXZlbExhYmVsRGF0YVxuY29uc3QgeyBMRVZFTFMsIExFVkVMX05BTUVTIH0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG4vKipcbiAqIEdpdmVuIGluaXRpYWwgc2V0dGluZ3MgZm9yIGN1c3RvbSBsZXZlbHMvbmFtZXMgYW5kIHVzZSBvZiBvbmx5IGN1c3RvbSBwcm9wc1xuICogZ2V0IHRoZSBsZXZlbCBsYWJlbCB0aGF0IGNvcnJlc3BvbmRzIHdpdGggYSBnaXZlbiBsZXZlbCBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZU9ubHlDdXN0b21Qcm9wc1xuICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbUxldmVsc1xuICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbUxldmVsTmFtZXNcbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIG51bWJlciBsZXZlbCBhbmQgcmV0dXJucyB0aGUgbGV2ZWwncyBsYWJlbCBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0TGV2ZWxMYWJlbERhdGEgKHVzZU9ubHlDdXN0b21Qcm9wcywgY3VzdG9tTGV2ZWxzLCBjdXN0b21MZXZlbE5hbWVzKSB7XG4gIGNvbnN0IGxldmVscyA9IHVzZU9ubHlDdXN0b21Qcm9wcyA/IGN1c3RvbUxldmVscyB8fCBMRVZFTFMgOiBPYmplY3QuYXNzaWduKHt9LCBMRVZFTFMsIGN1c3RvbUxldmVscylcbiAgY29uc3QgbGV2ZWxOYW1lcyA9IHVzZU9ubHlDdXN0b21Qcm9wcyA/IGN1c3RvbUxldmVsTmFtZXMgfHwgTEVWRUxfTkFNRVMgOiBPYmplY3QuYXNzaWduKHt9LCBMRVZFTF9OQU1FUywgY3VzdG9tTGV2ZWxOYW1lcylcbiAgcmV0dXJuIGZ1bmN0aW9uIChsZXZlbCkge1xuICAgIGxldCBsZXZlbE51bSA9ICdkZWZhdWx0J1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKCtsZXZlbCkpIHtcbiAgICAgIGxldmVsTnVtID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGxldmVscywgbGV2ZWwpID8gbGV2ZWwgOiBsZXZlbE51bVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXZlbE51bSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsZXZlbE5hbWVzLCBsZXZlbC50b0xvd2VyQ2FzZSgpKSA/IGxldmVsTmFtZXNbbGV2ZWwudG9Mb3dlckNhc2UoKV0gOiBsZXZlbE51bVxuICAgIH1cblxuICAgIHJldHVybiBbbGV2ZWxzW2xldmVsTnVtXSwgbGV2ZWxOdW1dXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3Qgbm9jb2xvciA9IGlucHV0ID0+IGlucHV0XG5jb25zdCBwbGFpbiA9IHtcbiAgZGVmYXVsdDogbm9jb2xvcixcbiAgNjA6IG5vY29sb3IsXG4gIDUwOiBub2NvbG9yLFxuICA0MDogbm9jb2xvcixcbiAgMzA6IG5vY29sb3IsXG4gIDIwOiBub2NvbG9yLFxuICAxMDogbm9jb2xvcixcbiAgbWVzc2FnZTogbm9jb2xvcixcbiAgZ3JleU1lc3NhZ2U6IG5vY29sb3Jcbn1cblxuY29uc3QgeyBjcmVhdGVDb2xvcnMgfSA9IHJlcXVpcmUoJ2NvbG9yZXR0ZScpXG5jb25zdCBnZXRMZXZlbExhYmVsRGF0YSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWxldmVsLWxhYmVsLWRhdGEnKVxuY29uc3QgYXZhaWxhYmxlQ29sb3JzID0gY3JlYXRlQ29sb3JzKHsgdXNlQ29sb3I6IHRydWUgfSlcbmNvbnN0IHsgd2hpdGUsIGJnUmVkLCByZWQsIHllbGxvdywgZ3JlZW4sIGJsdWUsIGdyYXksIGN5YW4gfSA9IGF2YWlsYWJsZUNvbG9yc1xuXG5jb25zdCBjb2xvcmVkID0ge1xuICBkZWZhdWx0OiB3aGl0ZSxcbiAgNjA6IGJnUmVkLFxuICA1MDogcmVkLFxuICA0MDogeWVsbG93LFxuICAzMDogZ3JlZW4sXG4gIDIwOiBibHVlLFxuICAxMDogZ3JheSxcbiAgbWVzc2FnZTogY3lhbixcbiAgZ3JleU1lc3NhZ2U6IGdyYXlcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUN1c3RvbUNvbG9yZWRDb2xvcml6ZXIgKGN1c3RvbUNvbG9ycykge1xuICByZXR1cm4gY3VzdG9tQ29sb3JzLnJlZHVjZShcbiAgICBmdW5jdGlvbiAoYWdnLCBbbGV2ZWwsIGNvbG9yXSkge1xuICAgICAgYWdnW2xldmVsXSA9IHR5cGVvZiBhdmFpbGFibGVDb2xvcnNbY29sb3JdID09PSAnZnVuY3Rpb24nID8gYXZhaWxhYmxlQ29sb3JzW2NvbG9yXSA6IHdoaXRlXG5cbiAgICAgIHJldHVybiBhZ2dcbiAgICB9LFxuICAgIHsgZGVmYXVsdDogd2hpdGUsIG1lc3NhZ2U6IGN5YW4sIGdyZXlNZXNzYWdlOiBncmF5IH1cbiAgKVxufVxuXG5mdW5jdGlvbiBjb2xvcml6ZUxldmVsICh1c2VPbmx5Q3VzdG9tUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgY29sb3JpemVyLCB7IGN1c3RvbUxldmVscywgY3VzdG9tTGV2ZWxOYW1lcyB9ID0ge30pIHtcbiAgICBjb25zdCBbbGV2ZWxTdHIsIGxldmVsTnVtXSA9IGdldExldmVsTGFiZWxEYXRhKHVzZU9ubHlDdXN0b21Qcm9wcywgY3VzdG9tTGV2ZWxzLCBjdXN0b21MZXZlbE5hbWVzKShsZXZlbClcblxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sb3JpemVyLCBsZXZlbE51bSkgPyBjb2xvcml6ZXJbbGV2ZWxOdW1dKGxldmVsU3RyKSA6IGNvbG9yaXplci5kZWZhdWx0KGxldmVsU3RyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWluQ29sb3JpemVyICh1c2VPbmx5Q3VzdG9tUHJvcHMpIHtcbiAgY29uc3QgbmV3UGxhaW5Db2xvcml6ZXIgPSBjb2xvcml6ZUxldmVsKHVzZU9ubHlDdXN0b21Qcm9wcylcbiAgY29uc3QgY3VzdG9tQ29sb3JlZENvbG9yaXplciA9IGZ1bmN0aW9uIChsZXZlbCwgb3B0cykge1xuICAgIHJldHVybiBuZXdQbGFpbkNvbG9yaXplcihsZXZlbCwgcGxhaW4sIG9wdHMpXG4gIH1cbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5tZXNzYWdlID0gcGxhaW4ubWVzc2FnZVxuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLmdyZXlNZXNzYWdlID0gcGxhaW4uZ3JleU1lc3NhZ2VcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5jb2xvcnMgPSBjcmVhdGVDb2xvcnMoeyB1c2VDb2xvcjogZmFsc2UgfSlcbiAgcmV0dXJuIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXJcbn1cblxuZnVuY3Rpb24gY29sb3JlZENvbG9yaXplciAodXNlT25seUN1c3RvbVByb3BzKSB7XG4gIGNvbnN0IG5ld0NvbG9yZWRDb2xvcml6ZXIgPSBjb2xvcml6ZUxldmVsKHVzZU9ubHlDdXN0b21Qcm9wcylcbiAgY29uc3QgY3VzdG9tQ29sb3JlZENvbG9yaXplciA9IGZ1bmN0aW9uIChsZXZlbCwgb3B0cykge1xuICAgIHJldHVybiBuZXdDb2xvcmVkQ29sb3JpemVyKGxldmVsLCBjb2xvcmVkLCBvcHRzKVxuICB9XG4gIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIubWVzc2FnZSA9IGNvbG9yZWQubWVzc2FnZVxuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLmdyZXlNZXNzYWdlID0gY29sb3JlZC5ncmV5TWVzc2FnZVxuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLmNvbG9ycyA9IGF2YWlsYWJsZUNvbG9yc1xuICByZXR1cm4gY3VzdG9tQ29sb3JlZENvbG9yaXplclxufVxuXG5mdW5jdGlvbiBjdXN0b21Db2xvcmVkQ29sb3JpemVyRmFjdG9yeSAoY3VzdG9tQ29sb3JzLCB1c2VPbmx5Q3VzdG9tUHJvcHMpIHtcbiAgY29uc3Qgb25seUN1c3RvbUNvbG9yZWQgPSByZXNvbHZlQ3VzdG9tQ29sb3JlZENvbG9yaXplcihjdXN0b21Db2xvcnMpXG4gIGNvbnN0IGN1c3RvbUNvbG9yZWQgPSB1c2VPbmx5Q3VzdG9tUHJvcHMgPyBvbmx5Q3VzdG9tQ29sb3JlZCA6IE9iamVjdC5hc3NpZ24oe30sIGNvbG9yZWQsIG9ubHlDdXN0b21Db2xvcmVkKVxuICBjb25zdCBjb2xvcml6ZUxldmVsQ3VzdG9tID0gY29sb3JpemVMZXZlbCh1c2VPbmx5Q3VzdG9tUHJvcHMpXG5cbiAgY29uc3QgY3VzdG9tQ29sb3JlZENvbG9yaXplciA9IGZ1bmN0aW9uIChsZXZlbCwgb3B0cykge1xuICAgIHJldHVybiBjb2xvcml6ZUxldmVsQ3VzdG9tKGxldmVsLCBjdXN0b21Db2xvcmVkLCBvcHRzKVxuICB9XG4gIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIuY29sb3JzID0gYXZhaWxhYmxlQ29sb3JzXG4gIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIubWVzc2FnZSA9IGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIubWVzc2FnZSB8fCBjdXN0b21Db2xvcmVkLm1lc3NhZ2VcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5ncmV5TWVzc2FnZSA9IGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIuZ3JleU1lc3NhZ2UgfHwgY3VzdG9tQ29sb3JlZC5ncmV5TWVzc2FnZVxuXG4gIHJldHVybiBjdXN0b21Db2xvcmVkQ29sb3JpemVyXG59XG5cbi8qKlxuICogQXBwbGllcyBjb2xvcml6YXRpb24sIGlmIHBvc3NpYmxlLCB0byBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBhc3NlZCBpblxuICogYGxldmVsYC4gRm9yIGV4YW1wbGUsIHRoZSBkZWZhdWx0IGNvbG9yaXplciB3aWxsIHJldHVybiBhIFwiZ3JlZW5cIiBjb2xvcmVkXG4gKiBzdHJpbmcgZm9yIHRoZSBcImluZm9cIiBsZXZlbC5cbiAqXG4gKiBAdHlwZWRlZiB7ZnVuY3Rpb259IENvbG9yaXplckZ1bmNcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbGV2ZWwgSW4gZWl0aGVyIGNhc2UsIHRoZSBpbnB1dCB3aWxsIG1hcCB0byBhIGNvbG9yXG4gKiBmb3IgdGhlIHNwZWNpZmllZCBsZXZlbCBvciB0byB0aGUgY29sb3IgZm9yIGBVU0VSTFZMYCBpZiB0aGUgbGV2ZWwgaXMgbm90XG4gKiByZWNvZ25pemVkLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbWVzc2FnZSBBY2NlcHRzIG9uZSBzdHJpbmcgcGFyYW1ldGVyIHRoYXQgd2lsbCBiZVxuICogY29sb3JpemVkIHRvIGEgcHJlZGVmaW5lZCBjb2xvci5cbiAqIEBwcm9wZXJ0eSB7Q29sb3JldHRlLkNvbG9yZXR0ZX0gY29sb3JzIEF2YWlsYWJsZSBjb2xvciBmdW5jdGlvbnMgYmFzZWQgb24gYHVzZUNvbG9yYCAob3IgYGNvbG9yaXplYCkgY29udGV4dFxuICovXG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiBnZXQgYSBmdW5jdGlvbiB0byBjb2xvcml6ZWQgbGV2ZWxzLiBUaGUgcmV0dXJuZWQgZnVuY3Rpb25cbiAqIGFsc28gaW5jbHVkZXMgYSBgLm1lc3NhZ2Uoc3RyKWAgbWV0aG9kIHRvIGNvbG9yaXplIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBbdXNlQ29sb3JzPWZhbHNlXSBXaGVuIGB0cnVlYCBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBzdGFuZGFyZFxuICogdGVybWluYWwgY29sb3JzIGlzIHJldHVybmVkLlxuICogQHBhcmFtIHthcnJheVtdfSBbY3VzdG9tQ29sb3JzXSBUdXBsZSB3aGVyZSBmaXJzdCBpdGVtIG9mIGVhY2ggYXJyYXkgaXMgdGhlXG4gKiBsZXZlbCBpbmRleCBhbmQgdGhlIHNlY29uZCBpdGVtIGlzIHRoZSBjb2xvclxuICogQHBhcmFtIHtib29sZWFufSBbdXNlT25seUN1c3RvbVByb3BzXSBXaGVuIGB0cnVlYCwgb25seSB1c2UgdGhlIHByb3ZpZGVkXG4gKiBjdXN0b20gY29sb3JzIHByb3ZpZGVkIGFuZCBub3QgZmFsbGJhY2sgdG8gZGVmYXVsdFxuICpcbiAqIEByZXR1cm5zIHtDb2xvcml6ZXJGdW5jfSBgZnVuY3Rpb24gKGxldmVsKSB7fWAgaGFzIGEgYC5tZXNzYWdlKHN0cilgIG1ldGhvZCB0b1xuICogYXBwbHkgY29sb3JpemF0aW9uIHRvIGEgc3RyaW5nLiBUaGUgY29yZSBmdW5jdGlvbiBhY2NlcHRzIGVpdGhlciBhbiBpbnRlZ2VyXG4gKiBgbGV2ZWxgIG9yIGEgYHN0cmluZ2AgbGV2ZWwuIFRoZSBpbnRlZ2VyIGxldmVsIHdpbGwgbWFwIHRvIGEga25vd24gbGV2ZWxcbiAqIHN0cmluZyBvciB0byBgVVNFUkxWTGAgaWYgbm90IGtub3duLiAgVGhlIHN0cmluZyBgbGV2ZWxgIHdpbGwgbWFwIHRvIHRoZSBzYW1lXG4gKiBjb2xvcnMgYXMgdGhlIGludGVnZXIgYGxldmVsYCBhbmQgd2lsbCBhbHNvIGRlZmF1bHQgdG8gYFVTRVJMVkxgIGlmIHRoZSBnaXZlblxuICogc3RyaW5nIGlzIG5vdCBhIHJlY29nbml6ZWQgbGV2ZWwgbmFtZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRDb2xvcml6ZXIgKHVzZUNvbG9ycyA9IGZhbHNlLCBjdXN0b21Db2xvcnMsIHVzZU9ubHlDdXN0b21Qcm9wcykge1xuICBpZiAodXNlQ29sb3JzICYmIGN1c3RvbUNvbG9ycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXJGYWN0b3J5KGN1c3RvbUNvbG9ycywgdXNlT25seUN1c3RvbVByb3BzKVxuICB9IGVsc2UgaWYgKHVzZUNvbG9ycykge1xuICAgIHJldHVybiBjb2xvcmVkQ29sb3JpemVyKHVzZU9ubHlDdXN0b21Qcm9wcylcbiAgfVxuXG4gIHJldHVybiBwbGFpbkNvbG9yaXplcih1c2VPbmx5Q3VzdG9tUHJvcHMpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9vcCAoKSB7fVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkU2FmZVNvbmljQm9vbVxuXG5jb25zdCB7IGlzTWFpblRocmVhZCB9ID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKVxuY29uc3QgU29uaWNCb29tID0gcmVxdWlyZSgnc29uaWMtYm9vbScpXG5jb25zdCBub29wID0gcmVxdWlyZSgnLi9ub29wJylcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2FmZSBTb25pY0Jvb20gaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0cyBPcHRpb25zIGZvciBTb25pY0Jvb21cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIG5ldyBTb25pY0Jvb20gc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2FmZVNvbmljQm9vbSAob3B0cykge1xuICBjb25zdCBzdHJlYW0gPSBuZXcgU29uaWNCb29tKG9wdHMpXG4gIHN0cmVhbS5vbignZXJyb3InLCBmaWx0ZXJCcm9rZW5QaXBlKVxuICAvLyBpZiB3ZSBhcmUgc3luYzogZmFsc2UsIHdlIG11c3QgZmx1c2ggb24gZXhpdFxuICAvLyBOT0RFX1Y4X0NPVkVSQUdFIG11c3QgYnJlYWtzIGV2ZXJ5dGhpbmdcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy80OTM0NFxuICBpZiAoIXByb2Nlc3MuZW52Lk5PREVfVjhfQ09WRVJBR0UgJiYgIW9wdHMuc3luYyAmJiBpc01haW5UaHJlYWQpIHtcbiAgICBzZXR1cE9uRXhpdChzdHJlYW0pXG4gIH1cbiAgcmV0dXJuIHN0cmVhbVxuXG4gIGZ1bmN0aW9uIGZpbHRlckJyb2tlblBpcGUgKGVycikge1xuICAgIGlmIChlcnIuY29kZSA9PT0gJ0VQSVBFJykge1xuICAgICAgc3RyZWFtLndyaXRlID0gbm9vcFxuICAgICAgc3RyZWFtLmVuZCA9IG5vb3BcbiAgICAgIHN0cmVhbS5mbHVzaFN5bmMgPSBub29wXG4gICAgICBzdHJlYW0uZGVzdHJveSA9IG5vb3BcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZmlsdGVyQnJva2VuUGlwZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cE9uRXhpdCAoc3RyZWFtKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChnbG9iYWwuV2Vha1JlZiAmJiBnbG9iYWwuV2Vha01hcCAmJiBnbG9iYWwuRmluYWxpemF0aW9uUmVnaXN0cnkpIHtcbiAgICAvLyBUaGlzIGlzIGxlYWsgZnJlZSwgaXQgZG9lcyBub3QgbGVhdmUgZXZlbnQgaGFuZGxlcnNcbiAgICBjb25zdCBvbkV4aXQgPSByZXF1aXJlKCdvbi1leGl0LWxlYWstZnJlZScpXG5cbiAgICBvbkV4aXQucmVnaXN0ZXIoc3RyZWFtLCBhdXRvRW5kKVxuXG4gICAgc3RyZWFtLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG9uRXhpdC51bnJlZ2lzdGVyKHN0cmVhbSlcbiAgICB9KVxuICB9XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBhdXRvRW5kIChzdHJlYW0sIGV2ZW50TmFtZSkge1xuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBvbmx5IG9uIHNvbWUgcGxhdGZvcm1zXG5cbiAgaWYgKHN0cmVhbS5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChldmVudE5hbWUgPT09ICdiZWZvcmVFeGl0Jykge1xuICAgIC8vIFdlIHN0aWxsIGhhdmUgYW4gZXZlbnQgbG9vcCwgbGV0J3MgdXNlIGl0XG4gICAgc3RyZWFtLmZsdXNoKClcbiAgICBzdHJlYW0ub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgc3RyZWFtLmVuZCgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBXZSBkbyBub3QgaGF2ZSBhbiBldmVudCBsb29wLCBzbyBmbHVzaCBzeW5jaHJvbm91c2x5XG4gICAgc3RyZWFtLmZsdXNoU3luYygpXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBpc1ZhbGlkRGF0ZVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgYXJndW1lbnQgaXMgYSBKUyBEYXRlIGFuZCBub3QgJ0ludmFsaWQgRGF0ZScuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIFRoZSBkYXRlIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcmd1bWVudCBpcyBhIEpTIERhdGUgYW5kIG5vdCAnSW52YWxpZCBEYXRlJy5cbiAqL1xuZnVuY3Rpb24gaXNWYWxpZERhdGUgKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGF0ZVxuXG5jb25zdCBpc1ZhbGlkRGF0ZSA9IHJlcXVpcmUoJy4vaXMtdmFsaWQtZGF0ZScpXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIEpTIERhdGUgZnJvbSBhIG51bWJlciBvciBzdHJpbmcuIEFjY2VwdHMgYW55IHNpbmdsZSBudW1iZXJcbiAqIG9yIHNpbmdsZSBzdHJpbmcgYXJndW1lbnQgdGhhdCBpcyB2YWxpZCBmb3IgdGhlIERhdGUoKSBjb25zdHJ1Y3RvcixcbiAqIG9yIGFuIGVwb2NoIGFzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gZXBvY2ggVGhlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBEYXRlLlxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgY29uc3RydWN0ZWQgRGF0ZS5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGF0ZSAoZXBvY2gpIHtcbiAgLy8gSWYgZXBvY2ggaXMgYWxyZWFkeSBhIHZhbGlkIGFyZ3VtZW50LCByZXR1cm4gdGhlIHZhbGlkIERhdGVcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaClcbiAgaWYgKGlzVmFsaWREYXRlKGRhdGUpKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gYSBudW1iZXIgdG8gcGVybWl0IGVwb2NoIGFzIGEgc3RyaW5nXG4gIGRhdGUgPSBuZXcgRGF0ZSgrZXBvY2gpXG4gIHJldHVybiBkYXRlXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gc3BsaXRQcm9wZXJ0eUtleVxuXG4vKipcbiAqIFNwbGl0cyB0aGUgcHJvcGVydHkga2V5IGRlbGltaXRlZCBieSBhIGRvdCBjaGFyYWN0ZXIgYnV0IG5vdCB3aGVuIGl0IGlzIHByZWNlZGVkXG4gKiBieSBhIGJhY2tzbGFzaC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEEgc3RyaW5nIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nW119IFJldHVybnMgYSBsaXN0IG9mIHN0cmluZyBjb250YWluaW5nIGVhY2ggZGVsaW1pdGVkIHByb3BlcnR5LlxuICogZS5nLiBgJ3Byb3AyXFwuZG9tYWluXFwuY29ycC5wcm9wMidgIHNob3VsZCByZXR1cm4gWyAncHJvcDIuZG9tYWluLmNvbScsICdwcm9wMicgXVxuICovXG5mdW5jdGlvbiBzcGxpdFByb3BlcnR5S2V5IChrZXkpIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGJhY2tzbGFzaCA9IGZhbHNlXG4gIGxldCBzZWdtZW50ID0gJydcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGMgPSBrZXkuY2hhckF0KGkpXG5cbiAgICBpZiAoYyA9PT0gJ1xcXFwnKSB7XG4gICAgICBiYWNrc2xhc2ggPSB0cnVlXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChiYWNrc2xhc2gpIHtcbiAgICAgIGJhY2tzbGFzaCA9IGZhbHNlXG4gICAgICBzZWdtZW50ICs9IGNcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgLyogTm9uLWVzY2FwZWQgZG90LCBwdXNoIHRvIHJlc3VsdCAqL1xuICAgIGlmIChjID09PSAnLicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHNlZ21lbnQpXG4gICAgICBzZWdtZW50ID0gJydcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc2VnbWVudCArPSBjXG4gIH1cblxuICAvKiBQdXNoIGxhc3QgZW50cnkgdG8gcmVzdWx0ICovXG4gIGlmIChzZWdtZW50Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5wdXNoKHNlZ21lbnQpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvcGVydHlWYWx1ZVxuXG5jb25zdCBzcGxpdFByb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi9zcGxpdC1wcm9wZXJ0eS1rZXknKVxuXG4vKipcbiAqIEdldHMgYSBzcGVjaWZpZWQgcHJvcGVydHkgZnJvbSBhbiBvYmplY3QgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBiZSBzZWFyY2hlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwcm9wZXJ0eSBBIHN0cmluZywgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncywgaWRlbnRpZnlpbmdcbiAqIHRoZSBwcm9wZXJ0eSB0byBiZSByZXRyaWV2ZWQgZnJvbSB0aGUgb2JqZWN0LlxuICogQWNjZXB0cyBuZXN0ZWQgcHJvcGVydGllcyBkZWxpbWl0ZWQgYnkgYSBgLmAuXG4gKiBEZWxpbWl0ZXIgY2FuIGJlIGVzY2FwZWQgdG8gcHJlc2VydmUgcHJvcGVydHkgbmFtZXMgdGhhdCBjb250YWluIHRoZSBkZWxpbWl0ZXIuXG4gKiBlLmcuIGAncHJvcDEucHJvcDInYCBvciBgJ3Byb3AyXFwuZG9tYWluXFwuY29ycC5wcm9wMidgLlxuICpcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eVZhbHVlIChvYmosIHByb3BlcnR5KSB7XG4gIGNvbnN0IHByb3BzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eSkgPyBwcm9wZXJ0eSA6IHNwbGl0UHJvcGVydHlLZXkocHJvcGVydHkpXG5cbiAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iaiA9IG9ialtwcm9wXVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGV0ZUxvZ1Byb3BlcnR5XG5cbmNvbnN0IGdldFByb3BlcnR5VmFsdWUgPSByZXF1aXJlKCcuL2dldC1wcm9wZXJ0eS12YWx1ZScpXG5jb25zdCBzcGxpdFByb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi9zcGxpdC1wcm9wZXJ0eS1rZXknKVxuXG4vKipcbiAqIERlbGV0ZXMgYSBzcGVjaWZpZWQgcHJvcGVydHkgZnJvbSBhIGxvZyBvYmplY3QgaWYgaXQgZXhpc3RzLlxuICogVGhpcyBmdW5jdGlvbiBtdXRhdGVzIHRoZSBwYXNzZWQgaW4gYGxvZ2Agb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgQSBzdHJpbmcgaWRlbnRpZnlpbmcgdGhlIHByb3BlcnR5IHRvIGJlIGRlbGV0ZWQgZnJvbVxuICogdGhlIGxvZyBvYmplY3QuIEFjY2VwdHMgbmVzdGVkIHByb3BlcnRpZXMgZGVsaW1pdGVkIGJ5IGEgYC5gXG4gKiBEZWxpbWl0ZXIgY2FuIGJlIGVzY2FwZWQgdG8gcHJlc2VydmUgcHJvcGVydHkgbmFtZXMgdGhhdCBjb250YWluIHRoZSBkZWxpbWl0ZXIuXG4gKiBlLmcuIGAncHJvcDEucHJvcDInYCBvciBgJ3Byb3AyXFwuZG9tYWluXFwuY29ycC5wcm9wMidgXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUxvZ1Byb3BlcnR5IChsb2csIHByb3BlcnR5KSB7XG4gIGNvbnN0IHByb3BzID0gc3BsaXRQcm9wZXJ0eUtleShwcm9wZXJ0eSlcbiAgY29uc3QgcHJvcFRvRGVsZXRlID0gcHJvcHMucG9wKClcblxuICBsb2cgPSBnZXRQcm9wZXJ0eVZhbHVlKGxvZywgcHJvcHMpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGxvZyAhPT0gbnVsbCAmJiB0eXBlb2YgbG9nID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobG9nLCBwcm9wVG9EZWxldGUpKSB7XG4gICAgZGVsZXRlIGxvZ1twcm9wVG9EZWxldGVdXG4gIH1cbn1cbiIsICJleHBvcnQgaW50ZXJmYWNlIENhY2hlIHtcbiAgaGFzOiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcbiAgc2V0OiAoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIGdldDogKGtleTogYW55KSA9PiBhbnk7XG59XG5cbmNvbnN0IHsgdG9TdHJpbmc6IHRvU3RyaW5nRnVuY3Rpb24gfSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbmNvbnN0IHsgY3JlYXRlIH0gPSBPYmplY3Q7XG5jb25zdCB7IHRvU3RyaW5nOiB0b1N0cmluZ09iamVjdCB9ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEZhbGxiYWNrIGNhY2hlIGZvciB3aGVuIFdlYWtNYXAgaXMgbm90IG5hdGl2ZWx5IHN1cHBvcnRlZFxuICovXG5jbGFzcyBMZWdhY3lDYWNoZSB7XG4gIHByaXZhdGUgX2tleXM6IGFueVtdID0gW107XG4gIHByaXZhdGUgX3ZhbHVlczogYW55W10gPSBbXTtcblxuICBoYXMoa2V5OiBhbnkpIHtcbiAgICByZXR1cm4gISF+dGhpcy5fa2V5cy5pbmRleE9mKGtleSk7XG4gIH1cblxuICBnZXQoa2V5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzW3RoaXMuX2tleXMuaW5kZXhPZihrZXkpXTtcbiAgfVxuXG4gIHNldChrZXk6IGFueSwgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2tleXMucHVzaChrZXkpO1xuICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYWNoZUxlZ2FjeSgpOiBDYWNoZSB7XG4gIHJldHVybiBuZXcgTGVnYWN5Q2FjaGUoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FjaGVNb2Rlcm4oKTogQ2FjaGUge1xuICByZXR1cm4gbmV3IFdlYWtNYXAoKTtcbn1cblxuLyoqXG4gKiBHZXQgYSBuZXcgY2FjaGUgb2JqZWN0IHRvIHByZXZlbnQgY2lyY3VsYXIgcmVmZXJlbmNlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhY2hlID1cbiAgdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnID8gY3JlYXRlQ2FjaGVNb2Rlcm4gOiBjcmVhdGVDYWNoZUxlZ2FjeTtcblxuLyoqXG4gKiBHZXQgYW4gZW1wdHkgdmVyc2lvbiBvZiB0aGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgcHJvdG90eXBlIGl0IGhhcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENsZWFuQ2xvbmUocHJvdG90eXBlOiBhbnkpOiBhbnkge1xuICBpZiAoIXByb3RvdHlwZSkge1xuICAgIHJldHVybiBjcmVhdGUobnVsbCk7XG4gIH1cblxuICBjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuICBpZiAoQ29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgIHJldHVybiBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgPyB7fSA6IGNyZWF0ZShwcm90b3R5cGUpO1xuICB9XG5cbiAgaWYgKFxuICAgIENvbnN0cnVjdG9yICYmXG4gICAgfnRvU3RyaW5nRnVuY3Rpb24uY2FsbChDb25zdHJ1Y3RvcikuaW5kZXhPZignW25hdGl2ZSBjb2RlXScpXG4gICkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZShwcm90b3R5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWdFeHBGbGFnc0xlZ2FjeShyZWdFeHA6IFJlZ0V4cCk6IHN0cmluZyB7XG4gIGxldCBmbGFncyA9ICcnO1xuXG4gIGlmIChyZWdFeHAuZ2xvYmFsKSB7XG4gICAgZmxhZ3MgKz0gJ2cnO1xuICB9XG5cbiAgaWYgKHJlZ0V4cC5pZ25vcmVDYXNlKSB7XG4gICAgZmxhZ3MgKz0gJ2knO1xuICB9XG5cbiAgaWYgKHJlZ0V4cC5tdWx0aWxpbmUpIHtcbiAgICBmbGFncyArPSAnbSc7XG4gIH1cblxuICBpZiAocmVnRXhwLnVuaWNvZGUpIHtcbiAgICBmbGFncyArPSAndSc7XG4gIH1cblxuICBpZiAocmVnRXhwLnN0aWNreSkge1xuICAgIGZsYWdzICs9ICd5JztcbiAgfVxuXG4gIHJldHVybiBmbGFncztcbn1cblxuZnVuY3Rpb24gZ2V0UmVnRXhwRmxhZ3NNb2Rlcm4ocmVnRXhwOiBSZWdFeHApOiBzdHJpbmcge1xuICByZXR1cm4gcmVnRXhwLmZsYWdzO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgdG8gYXBwbHkgdG8gdGhlIGNvcGllZCByZWdleHAuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWdFeHBGbGFncyA9XG4gIC90ZXN0L2cuZmxhZ3MgPT09ICdnJyA/IGdldFJlZ0V4cEZsYWdzTW9kZXJuIDogZ2V0UmVnRXhwRmxhZ3NMZWdhY3k7XG5cbmZ1bmN0aW9uIGdldFRhZ0xlZ2FjeSh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgdHlwZSA9IHRvU3RyaW5nT2JqZWN0LmNhbGwodmFsdWUpO1xuXG4gIHJldHVybiB0eXBlLnN1YnN0cmluZyg4LCB0eXBlLmxlbmd0aCAtIDEpO1xufVxuXG5mdW5jdGlvbiBnZXRUYWdNb2Rlcm4odmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddIHx8IGdldFRhZ0xlZ2FjeSh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0YWcgb2YgdGhlIHZhbHVlIHBhc3NlZCwgc28gdGhhdCB0aGUgY29ycmVjdCBjb3BpZXIgY2FuIGJlIHVzZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUYWcgPVxuICB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IGdldFRhZ01vZGVybiA6IGdldFRhZ0xlZ2FjeTtcbiIsICJpbXBvcnQgeyBnZXRDbGVhbkNsb25lLCBnZXRSZWdFeHBGbGFncyB9IGZyb20gJy4vdXRpbHMnO1xuXG5pbXBvcnQgdHlwZSB7IENhY2hlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEludGVybmFsQ29waWVyPFZhbHVlPiA9ICh2YWx1ZTogVmFsdWUsIHN0YXRlOiBTdGF0ZSkgPT4gVmFsdWU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBDb25zdHJ1Y3RvcjogYW55O1xuICBjYWNoZTogQ2FjaGU7XG4gIGNvcGllcjogSW50ZXJuYWxDb3BpZXI8YW55PjtcbiAgcHJvdG90eXBlOiBhbnk7XG59XG5cbmNvbnN0IHtcbiAgZGVmaW5lUHJvcGVydHksXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxufSA9IE9iamVjdDtcbmNvbnN0IHsgaGFzT3duUHJvcGVydHksIHByb3BlcnR5SXNFbnVtZXJhYmxlIH0gPSBPYmplY3QucHJvdG90eXBlO1xuXG5jb25zdCBTVVBQT1JUU19TWU1CT0wgPSB0eXBlb2YgZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nO1xuXG5mdW5jdGlvbiBnZXRTdHJpY3RQcm9wZXJ0aWVzTW9kZXJuKG9iamVjdDogYW55KTogQXJyYXk8c3RyaW5nIHwgc3ltYm9sPiB7XG4gIHJldHVybiAoZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpIGFzIEFycmF5PHN0cmluZyB8IHN5bWJvbD4pLmNvbmNhdChcbiAgICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KVxuICApO1xufVxuXG4vKipcbiAqIEdldCB0aGUgcHJvcGVyaXRlcyB1c2VkIHdoZW4gY29weWluZyBvYmplY3RzIHN0cmljdGx5LiBUaGlzIGluY2x1ZGVzIGJvdGgga2V5cyBhbmQgc3ltYm9scy5cbiAqL1xuY29uc3QgZ2V0U3RyaWN0UHJvcGVydGllcyA9IFNVUFBPUlRTX1NZTUJPTFxuICA/IGdldFN0cmljdFByb3BlcnRpZXNNb2Rlcm5cbiAgOiBnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuXG4vKipcbiAqIFN0cmljbHR5IGNvcHkgYWxsIHByb3BlcnRpZXMgY29udGFpbmVkIG9uIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPd25Qcm9wZXJ0aWVzU3RyaWN0PFZhbHVlPihcbiAgdmFsdWU6IFZhbHVlLFxuICBjbG9uZTogVmFsdWUsXG4gIHN0YXRlOiBTdGF0ZVxuKTogVmFsdWUge1xuICBjb25zdCBwcm9wZXJ0aWVzID0gZ2V0U3RyaWN0UHJvcGVydGllcyh2YWx1ZSk7XG5cbiAgZm9yIChcbiAgICBsZXQgaW5kZXggPSAwLCBsZW5ndGggPSBwcm9wZXJ0aWVzLmxlbmd0aCwgcHJvcGVydHksIGRlc2NyaXB0b3I7XG4gICAgaW5kZXggPCBsZW5ndGg7XG4gICAgKytpbmRleFxuICApIHtcbiAgICBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaW5kZXhdO1xuXG4gICAgaWYgKHByb3BlcnR5ID09PSAnY2FsbGVlJyB8fCBwcm9wZXJ0eSA9PT0gJ2NhbGxlcicpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIHByb3BlcnR5KTtcblxuICAgIGlmICghZGVzY3JpcHRvcikge1xuICAgICAgLy8gSW4gZXh0cmEgZWRnZSBjYXNlcyB3aGVyZSB0aGUgcHJvcGVydHkgZGVzY3JpcHRvciBjYW5ub3QgYmUgcmV0cml2ZWQsIGZhbGwgYmFjayB0b1xuICAgICAgLy8gdGhlIGxvb3NlIGFzc2lnbm1lbnQuXG4gICAgICAoY2xvbmUgYXMgYW55KVtwcm9wZXJ0eV0gPSBzdGF0ZS5jb3BpZXIoKHZhbHVlIGFzIGFueSlbcHJvcGVydHldLCBzdGF0ZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IGNsb25lIHRoZSB2YWx1ZSBpZiBhY3R1YWxseSBhIHZhbHVlLCBub3QgYSBnZXR0ZXIgLyBzZXR0ZXIuXG4gICAgaWYgKCFkZXNjcmlwdG9yLmdldCAmJiAhZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBzdGF0ZS5jb3BpZXIoZGVzY3JpcHRvci52YWx1ZSwgc3RhdGUpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eShjbG9uZSwgcHJvcGVydHksIGRlc2NyaXB0b3IpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBUZWUgYWJvdmUgY2FuIGZhaWwgb24gbm9kZSBpbiBlZGdlIGNhc2VzLCBzbyBmYWxsIGJhY2sgdG8gdGhlIGxvb3NlIGFzc2lnbm1lbnQuXG4gICAgICAoY2xvbmUgYXMgYW55KVtwcm9wZXJ0eV0gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9uZTtcbn1cblxuLyoqXG4gKiBEZWVwbHkgY29weSB0aGUgaW5kZXhlZCB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weUFycmF5TG9vc2UoYXJyYXk6IGFueVtdLCBzdGF0ZTogU3RhdGUpIHtcbiAgY29uc3QgY2xvbmUgPSBuZXcgc3RhdGUuQ29uc3RydWN0b3IoKTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQoYXJyYXksIGNsb25lKTtcblxuICBmb3IgKGxldCBpbmRleCA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7ICsraW5kZXgpIHtcbiAgICBjbG9uZVtpbmRleF0gPSBzdGF0ZS5jb3BpZXIoYXJyYXlbaW5kZXhdLCBzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIGluZGV4ZWQgdmFsdWVzIGluIHRoZSBhcnJheSwgYXMgd2VsbCBhcyBhbnkgY3VzdG9tIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5QXJyYXlTdHJpY3Q8VmFsdWUgZXh0ZW5kcyBhbnlbXT4oXG4gIGFycmF5OiBWYWx1ZSxcbiAgc3RhdGU6IFN0YXRlXG4pIHtcbiAgY29uc3QgY2xvbmUgPSBuZXcgc3RhdGUuQ29uc3RydWN0b3IoKSBhcyBWYWx1ZTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQoYXJyYXksIGNsb25lKTtcblxuICByZXR1cm4gY29weU93blByb3BlcnRpZXNTdHJpY3QoYXJyYXksIGNsb25lLCBzdGF0ZSk7XG59XG5cbi8qKlxuICogQ29weSB0aGUgY29udGVudHMgb2YgdGhlIEFycmF5QnVmZmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weUFycmF5QnVmZmVyPFZhbHVlIGV4dGVuZHMgQXJyYXlCdWZmZXI+KFxuICBhcnJheUJ1ZmZlcjogVmFsdWUsXG4gIF9zdGF0ZTogU3RhdGVcbik6IFZhbHVlIHtcbiAgcmV0dXJuIGFycmF5QnVmZmVyLnNsaWNlKDApIGFzIFZhbHVlO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBCbG9iIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSBvcmlnaW5hbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlCbG9iPFZhbHVlIGV4dGVuZHMgQmxvYj4oXG4gIGJsb2I6IFZhbHVlLFxuICBfc3RhdGU6IFN0YXRlXG4pOiBWYWx1ZSB7XG4gIHJldHVybiBibG9iLnNsaWNlKDAsIGJsb2Iuc2l6ZSwgYmxvYi50eXBlKSBhcyBWYWx1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgRGF0YVZpZXcgd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIG9yaWdpbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weURhdGFWaWV3PFZhbHVlIGV4dGVuZHMgRGF0YVZpZXc+KFxuICBkYXRhVmlldzogVmFsdWUsXG4gIHN0YXRlOiBTdGF0ZVxuKTogVmFsdWUge1xuICByZXR1cm4gbmV3IHN0YXRlLkNvbnN0cnVjdG9yKGNvcHlBcnJheUJ1ZmZlcihkYXRhVmlldy5idWZmZXIsIHN0YXRlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IERhdGUgYmFzZWQgb24gdGhlIHRpbWUgb2YgdGhlIG9yaWdpbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weURhdGU8VmFsdWUgZXh0ZW5kcyBEYXRlPihkYXRlOiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICByZXR1cm4gbmV3IHN0YXRlLkNvbnN0cnVjdG9yKGRhdGUuZ2V0VGltZSgpKTtcbn1cblxuLyoqXG4gKiBEZWVwbHkgY29weSB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIHRoZSBvcmlnaW5hbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlNYXBMb29zZTxWYWx1ZSBleHRlbmRzIE1hcDxhbnksIGFueT4+KFxuICBtYXA6IFZhbHVlLFxuICBzdGF0ZTogU3RhdGVcbik6IFZhbHVlIHtcbiAgY29uc3QgY2xvbmUgPSBuZXcgc3RhdGUuQ29uc3RydWN0b3IoKSBhcyBWYWx1ZTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQobWFwLCBjbG9uZSk7XG5cbiAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICBjbG9uZS5zZXQoa2V5LCBzdGF0ZS5jb3BpZXIodmFsdWUsIHN0YXRlKSk7XG4gIH0pO1xuXG4gIHJldHVybiBjbG9uZTtcbn1cblxuLyoqXG4gKiBEZWVwbHkgY29weSB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIHRoZSBvcmlnaW5hbCwgYXMgd2VsbCBhcyBhbnkgY3VzdG9tIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5TWFwU3RyaWN0PFZhbHVlIGV4dGVuZHMgTWFwPGFueSwgYW55Pj4oXG4gIG1hcDogVmFsdWUsXG4gIHN0YXRlOiBTdGF0ZVxuKSB7XG4gIHJldHVybiBjb3B5T3duUHJvcGVydGllc1N0cmljdChtYXAsIGNvcHlNYXBMb29zZShtYXAsIHN0YXRlKSwgc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjb3B5T2JqZWN0TG9vc2VMZWdhY3k8VmFsdWUgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PihcbiAgb2JqZWN0OiBWYWx1ZSxcbiAgc3RhdGU6IFN0YXRlXG4pOiBWYWx1ZSB7XG4gIGNvbnN0IGNsb25lOiBhbnkgPSBnZXRDbGVhbkNsb25lKHN0YXRlLnByb3RvdHlwZSk7XG5cbiAgLy8gc2V0IGluIHRoZSBjYWNoZSBpbW1lZGlhdGVseSB0byBiZSBhYmxlIHRvIHJldXNlIHRoZSBvYmplY3QgcmVjdXJzaXZlbHlcbiAgc3RhdGUuY2FjaGUuc2V0KG9iamVjdCwgY2xvbmUpO1xuXG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgY2xvbmVba2V5XSA9IHN0YXRlLmNvcGllcihvYmplY3Rba2V5XSwgc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gY29weU9iamVjdExvb3NlTW9kZXJuPFZhbHVlIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4oXG4gIG9iamVjdDogVmFsdWUsXG4gIHN0YXRlOiBTdGF0ZVxuKTogVmFsdWUge1xuICBjb25zdCBjbG9uZSA9IGdldENsZWFuQ2xvbmUoc3RhdGUucHJvdG90eXBlKTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQob2JqZWN0LCBjbG9uZSk7XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICBjbG9uZVtrZXldID0gc3RhdGUuY29waWVyKG9iamVjdFtrZXldLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpO1xuXG4gIGZvciAoXG4gICAgbGV0IGluZGV4ID0gMCwgbGVuZ3RoID0gc3ltYm9scy5sZW5ndGgsIHN5bWJvbDtcbiAgICBpbmRleCA8IGxlbmd0aDtcbiAgICArK2luZGV4XG4gICkge1xuICAgIHN5bWJvbCA9IHN5bWJvbHNbaW5kZXhdO1xuXG4gICAgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBzeW1ib2wpKSB7XG4gICAgICBjbG9uZVtzeW1ib2xdID0gc3RhdGUuY29waWVyKChvYmplY3QgYXMgYW55KVtzeW1ib2xdLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lO1xufVxuXG4vKipcbiAqIERlZXBseSBjb3B5IHRoZSBwcm9wZXJ0aWVzIChrZXlzIGFuZCBzeW1ib2xzKSBhbmQgdmFsdWVzIG9mIHRoZSBvcmlnaW5hbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlPYmplY3RMb29zZSA9IFNVUFBPUlRTX1NZTUJPTFxuICA/IGNvcHlPYmplY3RMb29zZU1vZGVyblxuICA6IGNvcHlPYmplY3RMb29zZUxlZ2FjeTtcblxuLyoqXG4gKiBEZWVwbHkgY29weSB0aGUgcHJvcGVydGllcyAoa2V5cyBhbmQgc3ltYm9scykgYW5kIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwsIGFzIHdlbGxcbiAqIGFzIGFueSBoaWRkZW4gb3Igbm9uLWVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlPYmplY3RTdHJpY3Q8VmFsdWUgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PihcbiAgb2JqZWN0OiBWYWx1ZSxcbiAgc3RhdGU6IFN0YXRlXG4pOiBWYWx1ZSB7XG4gIGNvbnN0IGNsb25lID0gZ2V0Q2xlYW5DbG9uZShzdGF0ZS5wcm90b3R5cGUpO1xuXG4gIC8vIHNldCBpbiB0aGUgY2FjaGUgaW1tZWRpYXRlbHkgdG8gYmUgYWJsZSB0byByZXVzZSB0aGUgb2JqZWN0IHJlY3Vyc2l2ZWx5XG4gIHN0YXRlLmNhY2hlLnNldChvYmplY3QsIGNsb25lKTtcblxuICByZXR1cm4gY29weU93blByb3BlcnRpZXNTdHJpY3Qob2JqZWN0LCBjbG9uZSwgc3RhdGUpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBwcmltaXRpdmUgd3JhcHBlciBmcm9tIHRoZSB2YWx1ZSBvZiB0aGUgb3JpZ2luYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5UHJpbWl0aXZlV3JhcHBlcjxcbiAgLy8gU3BlY2lmaWNhbGx5IHVzZSB0aGUgb2JqZWN0IGNvbnN0cnVjdG9yIHR5cGVzXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG4gIFZhbHVlIGV4dGVuZHMgQm9vbGVhbiB8IE51bWJlciB8IFN0cmluZ1xuPihwcmltaXRpdmVPYmplY3Q6IFZhbHVlLCBzdGF0ZTogU3RhdGUpOiBWYWx1ZSB7XG4gIHJldHVybiBuZXcgc3RhdGUuQ29uc3RydWN0b3IocHJpbWl0aXZlT2JqZWN0LnZhbHVlT2YoKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IFJlZ0V4cCBiYXNlZCBvbiB0aGUgdmFsdWUgYW5kIGZsYWdzIG9mIHRoZSBvcmlnaW5hbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlSZWdFeHA8VmFsdWUgZXh0ZW5kcyBSZWdFeHA+KFxuICByZWdFeHA6IFZhbHVlLFxuICBzdGF0ZTogU3RhdGVcbik6IFZhbHVlIHtcbiAgY29uc3QgY2xvbmUgPSBuZXcgc3RhdGUuQ29uc3RydWN0b3IoXG4gICAgcmVnRXhwLnNvdXJjZSxcbiAgICBnZXRSZWdFeHBGbGFncyhyZWdFeHApXG4gICkgYXMgVmFsdWU7XG5cbiAgY2xvbmUubGFzdEluZGV4ID0gcmVnRXhwLmxhc3RJbmRleDtcblxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBvcmlnaW5hbCB2YWx1ZSAoYW4gaWRlbnRpdHkgZnVuY3Rpb24pLlxuICpcbiAqIEBub3RlXG4gKiBUSGlzIGlzIHVzZWQgZm9yIG9iamVjdHMgdGhhdCBjYW5ub3QgYmUgY29waWVkLCBzdWNoIGFzIFdlYWtNYXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U2VsZjxWYWx1ZT4odmFsdWU6IFZhbHVlLCBfc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U2V0TG9vc2U8VmFsdWUgZXh0ZW5kcyBTZXQ8YW55Pj4oXG4gIHNldDogVmFsdWUsXG4gIHN0YXRlOiBTdGF0ZVxuKTogVmFsdWUge1xuICBjb25zdCBjbG9uZSA9IG5ldyBzdGF0ZS5Db25zdHJ1Y3RvcigpIGFzIFZhbHVlO1xuXG4gIC8vIHNldCBpbiB0aGUgY2FjaGUgaW1tZWRpYXRlbHkgdG8gYmUgYWJsZSB0byByZXVzZSB0aGUgb2JqZWN0IHJlY3Vyc2l2ZWx5XG4gIHN0YXRlLmNhY2hlLnNldChzZXQsIGNsb25lKTtcblxuICBzZXQuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBjbG9uZS5hZGQoc3RhdGUuY29waWVyKHZhbHVlLCBzdGF0ZSkpO1xuICB9KTtcblxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwsIGFzIHdlbGwgYXMgYW55IGN1c3RvbSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weVNldFN0cmljdDxWYWx1ZSBleHRlbmRzIFNldDxhbnk+PihcbiAgc2V0OiBWYWx1ZSxcbiAgc3RhdGU6IFN0YXRlXG4pOiBWYWx1ZSB7XG4gIHJldHVybiBjb3B5T3duUHJvcGVydGllc1N0cmljdChzZXQsIGNvcHlTZXRMb29zZShzZXQsIHN0YXRlKSwgc3RhdGUpO1xufVxuIiwgImltcG9ydCB7XG4gIGNvcHlBcnJheUJ1ZmZlcixcbiAgY29weUFycmF5TG9vc2UsXG4gIGNvcHlBcnJheVN0cmljdCxcbiAgY29weUJsb2IsXG4gIGNvcHlEYXRhVmlldyxcbiAgY29weURhdGUsXG4gIGNvcHlNYXBMb29zZSxcbiAgY29weU1hcFN0cmljdCxcbiAgY29weU9iamVjdExvb3NlLFxuICBjb3B5T2JqZWN0U3RyaWN0LFxuICBjb3B5UHJpbWl0aXZlV3JhcHBlcixcbiAgY29weVJlZ0V4cCxcbiAgY29weVNlbGYsXG4gIGNvcHlTZXRMb29zZSxcbiAgY29weVNldFN0cmljdCxcbn0gZnJvbSAnLi9jb3BpZXInO1xuaW1wb3J0IHsgY3JlYXRlQ2FjaGUsIGdldFRhZyB9IGZyb20gJy4vdXRpbHMnO1xuXG5pbXBvcnQgdHlwZSB7IEludGVybmFsQ29waWVyLCBTdGF0ZSB9IGZyb20gJy4vY29waWVyJztcblxuZXhwb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gJy4vY29waWVyJztcblxuY29uc3QgeyBpc0FycmF5IH0gPSBBcnJheTtcbmNvbnN0IHsgYXNzaWduIH0gPSBPYmplY3Q7XG5jb25zdCBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCAoKG9iaikgPT4gb2JqLl9fcHJvdG9fXylcblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVDb3BpZXJPcHRpb25zIHtcbiAgYXJyYXk/OiBJbnRlcm5hbENvcGllcjxhbnlbXT47XG4gIGFycmF5QnVmZmVyPzogSW50ZXJuYWxDb3BpZXI8QXJyYXlCdWZmZXI+O1xuICBibG9iPzogSW50ZXJuYWxDb3BpZXI8QmxvYj47XG4gIGRhdGFWaWV3PzogSW50ZXJuYWxDb3BpZXI8RGF0YVZpZXc+O1xuICBkYXRlPzogSW50ZXJuYWxDb3BpZXI8RGF0ZT47XG4gIGVycm9yPzogSW50ZXJuYWxDb3BpZXI8YW55PjtcbiAgbWFwPzogSW50ZXJuYWxDb3BpZXI8TWFwPGFueSwgYW55Pj47XG4gIG9iamVjdD86IEludGVybmFsQ29waWVyPFJlY29yZDxzdHJpbmcsIGFueT4+O1xuICByZWdFeHA/OiBJbnRlcm5hbENvcGllcjxSZWdFeHA+O1xuICBzZXQ/OiBJbnRlcm5hbENvcGllcjxTZXQ8YW55Pj47XG59XG5cbmNvbnN0IERFRkFVTFRfTE9PU0VfT1BUSU9OUzogUmVxdWlyZWQ8Q3JlYXRlQ29waWVyT3B0aW9ucz4gPSB7XG4gIGFycmF5OiBjb3B5QXJyYXlMb29zZSxcbiAgYXJyYXlCdWZmZXI6IGNvcHlBcnJheUJ1ZmZlcixcbiAgYmxvYjogY29weUJsb2IsXG4gIGRhdGFWaWV3OiBjb3B5RGF0YVZpZXcsXG4gIGRhdGU6IGNvcHlEYXRlLFxuICBlcnJvcjogY29weVNlbGYsXG4gIG1hcDogY29weU1hcExvb3NlLFxuICBvYmplY3Q6IGNvcHlPYmplY3RMb29zZSxcbiAgcmVnRXhwOiBjb3B5UmVnRXhwLFxuICBzZXQ6IGNvcHlTZXRMb29zZSxcbn07XG5jb25zdCBERUZBVUxUX1NUUklDVF9PUFRJT05TOiBSZXF1aXJlZDxDcmVhdGVDb3BpZXJPcHRpb25zPiA9IGFzc2lnbihcbiAge30sXG4gIERFRkFVTFRfTE9PU0VfT1BUSU9OUyxcbiAge1xuICAgIGFycmF5OiBjb3B5QXJyYXlTdHJpY3QsXG4gICAgbWFwOiBjb3B5TWFwU3RyaWN0LFxuICAgIG9iamVjdDogY29weU9iamVjdFN0cmljdCxcbiAgICBzZXQ6IGNvcHlTZXRTdHJpY3QsXG4gIH1cbik7XG5cbi8qKlxuICogR2V0IHRoZSBjb3BpZXJzIHVzZWQgZm9yIGVhY2ggc3BlY2lmaWMgb2JqZWN0IHRhZy5cbiAqL1xuZnVuY3Rpb24gZ2V0VGFnU3BlY2lmaWNDb3BpZXJzKFxuICBvcHRpb25zOiBSZXF1aXJlZDxDcmVhdGVDb3BpZXJPcHRpb25zPlxuKTogUmVjb3JkPHN0cmluZywgSW50ZXJuYWxDb3BpZXI8YW55Pj4ge1xuICByZXR1cm4ge1xuICAgIEFyZ3VtZW50czogb3B0aW9ucy5vYmplY3QsXG4gICAgQXJyYXk6IG9wdGlvbnMuYXJyYXksXG4gICAgQXJyYXlCdWZmZXI6IG9wdGlvbnMuYXJyYXlCdWZmZXIsXG4gICAgQmxvYjogb3B0aW9ucy5ibG9iLFxuICAgIEJvb2xlYW46IGNvcHlQcmltaXRpdmVXcmFwcGVyLFxuICAgIERhdGFWaWV3OiBvcHRpb25zLmRhdGFWaWV3LFxuICAgIERhdGU6IG9wdGlvbnMuZGF0ZSxcbiAgICBFcnJvcjogb3B0aW9ucy5lcnJvcixcbiAgICBGbG9hdDMyQXJyYXk6IG9wdGlvbnMuYXJyYXlCdWZmZXIsXG4gICAgRmxvYXQ2NEFycmF5OiBvcHRpb25zLmFycmF5QnVmZmVyLFxuICAgIEludDhBcnJheTogb3B0aW9ucy5hcnJheUJ1ZmZlcixcbiAgICBJbnQxNkFycmF5OiBvcHRpb25zLmFycmF5QnVmZmVyLFxuICAgIEludDMyQXJyYXk6IG9wdGlvbnMuYXJyYXlCdWZmZXIsXG4gICAgTWFwOiBvcHRpb25zLm1hcCxcbiAgICBOdW1iZXI6IGNvcHlQcmltaXRpdmVXcmFwcGVyLFxuICAgIE9iamVjdDogb3B0aW9ucy5vYmplY3QsXG4gICAgUHJvbWlzZTogY29weVNlbGYsXG4gICAgUmVnRXhwOiBvcHRpb25zLnJlZ0V4cCxcbiAgICBTZXQ6IG9wdGlvbnMuc2V0LFxuICAgIFN0cmluZzogY29weVByaW1pdGl2ZVdyYXBwZXIsXG4gICAgV2Vha01hcDogY29weVNlbGYsXG4gICAgV2Vha1NldDogY29weVNlbGYsXG4gICAgVWludDhBcnJheTogb3B0aW9ucy5hcnJheUJ1ZmZlcixcbiAgICBVaW50OENsYW1wZWRBcnJheTogb3B0aW9ucy5hcnJheUJ1ZmZlcixcbiAgICBVaW50MTZBcnJheTogb3B0aW9ucy5hcnJheUJ1ZmZlcixcbiAgICBVaW50MzJBcnJheTogb3B0aW9ucy5hcnJheUJ1ZmZlcixcbiAgICBVaW50NjRBcnJheTogb3B0aW9ucy5hcnJheUJ1ZmZlcixcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjdXN0b20gY29waWVyIGJhc2VkIG9uIHRoZSBvYmplY3Qtc3BlY2lmaWMgY29weSBtZXRob2RzIHBhc3NlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvcGllcihvcHRpb25zOiBDcmVhdGVDb3BpZXJPcHRpb25zKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRPcHRpb25zID0gYXNzaWduKHt9LCBERUZBVUxUX0xPT1NFX09QVElPTlMsIG9wdGlvbnMpO1xuICBjb25zdCB0YWdTcGVjaWZpY0NvcGllcnMgPSBnZXRUYWdTcGVjaWZpY0NvcGllcnMobm9ybWFsaXplZE9wdGlvbnMpO1xuICBjb25zdCB7IEFycmF5OiBhcnJheSwgT2JqZWN0OiBvYmplY3QgfSA9IHRhZ1NwZWNpZmljQ29waWVycztcblxuICBmdW5jdGlvbiBjb3BpZXIodmFsdWU6IGFueSwgc3RhdGU6IFN0YXRlKTogYW55IHtcbiAgICBzdGF0ZS5wcm90b3R5cGUgPSBzdGF0ZS5Db25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcblxuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5jYWNoZS5oYXModmFsdWUpKSB7XG4gICAgICByZXR1cm4gc3RhdGUuY2FjaGUuZ2V0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5wcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gICAgc3RhdGUuQ29uc3RydWN0b3IgPSBzdGF0ZS5wcm90b3R5cGUgJiYgc3RhdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gcGxhaW4gb2JqZWN0c1xuICAgIGlmICghc3RhdGUuQ29uc3RydWN0b3IgfHwgc3RhdGUuQ29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgcmV0dXJuIG9iamVjdCh2YWx1ZSwgc3RhdGUpO1xuICAgIH1cblxuICAgIC8vIGFycmF5c1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGFycmF5KHZhbHVlLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFnU3BlY2lmaWNDb3BpZXIgPSB0YWdTcGVjaWZpY0NvcGllcnNbZ2V0VGFnKHZhbHVlKV07XG5cbiAgICBpZiAodGFnU3BlY2lmaWNDb3BpZXIpIHtcbiAgICAgIHJldHVybiB0YWdTcGVjaWZpY0NvcGllcih2YWx1ZSwgc3RhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlIDogb2JqZWN0KHZhbHVlLCBzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29weTxWYWx1ZT4odmFsdWU6IFZhbHVlKTogVmFsdWUge1xuICAgIHJldHVybiBjb3BpZXIodmFsdWUsIHtcbiAgICAgIENvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG4gICAgICBjYWNoZTogY3JlYXRlQ2FjaGUoKSxcbiAgICAgIGNvcGllcixcbiAgICAgIHByb3RvdHlwZTogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGN1c3RvbSBjb3BpZXIgYmFzZWQgb24gdGhlIG9iamVjdC1zcGVjaWZpYyBjb3B5IG1ldGhvZHMgcGFzc2VkLCBkZWZhdWx0aW5nIHRvIHRoZVxuICogc2FtZSBpbnRlcm5hbHMgYXMgYGNvcHlTdHJpY3RgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaWN0Q29waWVyKG9wdGlvbnM6IENyZWF0ZUNvcGllck9wdGlvbnMpIHtcbiAgcmV0dXJuIGNyZWF0ZUNvcGllcihhc3NpZ24oe30sIERFRkFVTFRfU1RSSUNUX09QVElPTlMsIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBDb3B5IGFuIHZhbHVlIGRlZXBseSBhcyBtdWNoIGFzIHBvc3NpYmxlLCB3aGVyZSBzdHJpY3QgcmVjcmVhdGlvbiBvZiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1haW50YWluZWQuIEFsbCBwcm9wZXJ0aWVzIChpbmNsdWRpbmcgbm9uLWVudW1lcmFibGUgb25lcykgYXJlIGNvcGllZCB3aXRoIHRoZWlyXG4gKiBvcmlnaW5hbCBwcm9wZXJ0eSBkZXNjcmlwdG9ycyBvbiBib3RoIG9iamVjdHMgYW5kIGFycmF5cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlTdHJpY3QgPSBjcmVhdGVTdHJpY3RDb3BpZXIoe30pO1xuXG4vKipcbiAqIENvcHkgYW4gdmFsdWUgZGVlcGx5IGFzIG11Y2ggYXMgcG9zc2libGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvcGllcih7fSk7XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyTG9nXG5cbmNvbnN0IHsgY3JlYXRlQ29waWVyIH0gPSByZXF1aXJlKCdmYXN0LWNvcHknKVxuY29uc3QgZmFzdENvcHkgPSBjcmVhdGVDb3BpZXIoe30pXG5cbmNvbnN0IGRlbGV0ZUxvZ1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9kZWxldGUtbG9nLXByb3BlcnR5JylcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBGaWx0ZXJMb2dQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcHJvcGVydHkge1ByZXR0eUNvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2JqZWN0IGJ1aWx0IGZyb20gcGFyc2luZ1xuICogdGhlIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBGaWx0ZXIgYSBsb2cgb2JqZWN0IGJ5IHJlbW92aW5nIG9yIGluY2x1ZGluZyBrZXlzIGFjY29yZGluZ2x5LlxuICogV2hlbiBgaW5jbHVkZUtleXNgIGlzIHBhc3NlZCwgYGlnbm9yZWRLZXlzYCB3aWxsIGJlIGlnbm9yZWQuXG4gKiBPbmUgb2YgaWdub3JlS2V5cyBvciBpbmNsdWRlS2V5cyBtdXN0IGJlIHBhc3MgaW4uXG4gKlxuICogQHBhcmFtIHtGaWx0ZXJMb2dQYXJhbXN9IGlucHV0XG4gKlxuICogQHJldHVybnMge29iamVjdH0gQSBuZXcgYGxvZ2Agb2JqZWN0IGluc3RhbmNlIHRoYXRcbiAqICBlaXRoZXIgb25seSBpbmNsdWRlcyB0aGUga2V5cyBpbiBpZ25vcmVLZXlzXG4gKiAgb3IgZG9lcyBub3QgaW5jbHVkZSB0aG9zZSBpbiBpZ25vcmVkS2V5cy5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyTG9nICh7IGxvZywgY29udGV4dCB9KSB7XG4gIGNvbnN0IHsgaWdub3JlS2V5cywgaW5jbHVkZUtleXMgfSA9IGNvbnRleHRcbiAgY29uc3QgbG9nQ29weSA9IGZhc3RDb3B5KGxvZylcblxuICBpZiAoaW5jbHVkZUtleXMpIHtcbiAgICBjb25zdCBsb2dJbmNsdWRlZCA9IHt9XG5cbiAgICBpbmNsdWRlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGxvZ0luY2x1ZGVkW2tleV0gPSBsb2dDb3B5W2tleV1cbiAgICB9KVxuICAgIHJldHVybiBsb2dJbmNsdWRlZFxuICB9XG5cbiAgaWdub3JlS2V5cy5mb3JFYWNoKChpZ25vcmVLZXkpID0+IHtcbiAgICBkZWxldGVMb2dQcm9wZXJ0eShsb2dDb3B5LCBpZ25vcmVLZXkpXG4gIH0pXG4gIHJldHVybiBsb2dDb3B5XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX3R5cGVvZihvYmope1wiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtpZih0eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgU3ltYm9sLml0ZXJhdG9yPT09XCJzeW1ib2xcIil7X3R5cGVvZj1mdW5jdGlvbiBfdHlwZW9mKG9iail7cmV0dXJuIHR5cGVvZiBvYmp9fWVsc2V7X3R5cGVvZj1mdW5jdGlvbiBfdHlwZW9mKG9iail7cmV0dXJuIG9iaiYmdHlwZW9mIFN5bWJvbD09PVwiZnVuY3Rpb25cIiYmb2JqLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZvYmohPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIG9ian19cmV0dXJuIF90eXBlb2Yob2JqKX0oZnVuY3Rpb24oZ2xvYmFsKXt2YXIgX2FyZ3VtZW50cz1hcmd1bWVudHM7dmFyIGRhdGVGb3JtYXQ9ZnVuY3Rpb24oKXt2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO3JldHVybiBmdW5jdGlvbihkYXRlLG1hc2ssdXRjLGdtdCl7aWYoX2FyZ3VtZW50cy5sZW5ndGg9PT0xJiZraW5kT2YoZGF0ZSk9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKGRhdGVGb3JtYXQubWFza3NbbWFza118fG1hc2t8fGRhdGVGb3JtYXQubWFza3NbXCJkZWZhdWx0XCJdKTt2YXIgbWFza1NsaWNlPW1hc2suc2xpY2UoMCw0KTtpZihtYXNrU2xpY2U9PT1cIlVUQzpcInx8bWFza1NsaWNlPT09XCJHTVQ6XCIpe21hc2s9bWFzay5zbGljZSg0KTt1dGM9dHJ1ZTtpZihtYXNrU2xpY2U9PT1cIkdNVDpcIil7Z210PXRydWV9fXZhciBfPWZ1bmN0aW9uIF8oKXtyZXR1cm4gdXRjP1wiZ2V0VVRDXCI6XCJnZXRcIn07dmFyIF9kPWZ1bmN0aW9uIGQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXRlXCJdKCl9O3ZhciBEPWZ1bmN0aW9uIEQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXlcIl0oKX07dmFyIF9tPWZ1bmN0aW9uIG0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNb250aFwiXSgpfTt2YXIgeT1mdW5jdGlvbiB5KCl7cmV0dXJuIGRhdGVbXygpK1wiRnVsbFllYXJcIl0oKX07dmFyIF9IPWZ1bmN0aW9uIEgoKXtyZXR1cm4gZGF0ZVtfKCkrXCJIb3Vyc1wiXSgpfTt2YXIgX009ZnVuY3Rpb24gTSgpe3JldHVybiBkYXRlW18oKStcIk1pbnV0ZXNcIl0oKX07dmFyIF9zPWZ1bmN0aW9uIHMoKXtyZXR1cm4gZGF0ZVtfKCkrXCJTZWNvbmRzXCJdKCl9O3ZhciBfTD1mdW5jdGlvbiBMKCl7cmV0dXJuIGRhdGVbXygpK1wiTWlsbGlzZWNvbmRzXCJdKCl9O3ZhciBfbz1mdW5jdGlvbiBvKCl7cmV0dXJuIHV0Yz8wOmRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKX07dmFyIF9XPWZ1bmN0aW9uIFcoKXtyZXR1cm4gZ2V0V2VlayhkYXRlKX07dmFyIF9OPWZ1bmN0aW9uIE4oKXtyZXR1cm4gZ2V0RGF5T2ZXZWVrKGRhdGUpfTt2YXIgZmxhZ3M9e2Q6ZnVuY3Rpb24gZCgpe3JldHVybiBfZCgpfSxkZDpmdW5jdGlvbiBkZCgpe3JldHVybiBwYWQoX2QoKSl9LGRkZDpmdW5jdGlvbiBkZGQoKXtyZXR1cm4gZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEKCkrN119LEREREQ6ZnVuY3Rpb24gRERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6ZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW19tKCkrMTJdfSx5eTpmdW5jdGlvbiB5eSgpe3JldHVybiBTdHJpbmcoeSgpKS5zbGljZSgyKX0seXl5eTpmdW5jdGlvbiB5eXl5KCl7cmV0dXJuIHBhZCh5KCksNCl9LGg6ZnVuY3Rpb24gaCgpe3JldHVybiBfSCgpJTEyfHwxMn0saGg6ZnVuY3Rpb24gaGgoKXtyZXR1cm4gcGFkKF9IKCklMTJ8fDEyKX0sSDpmdW5jdGlvbiBIKCl7cmV0dXJuIF9IKCl9LEhIOmZ1bmN0aW9uIEhIKCl7cmV0dXJuIHBhZChfSCgpKX0sTTpmdW5jdGlvbiBNKCl7cmV0dXJuIF9NKCl9LE1NOmZ1bmN0aW9uIE1NKCl7cmV0dXJuIHBhZChfTSgpKX0sczpmdW5jdGlvbiBzKCl7cmV0dXJuIF9zKCl9LHNzOmZ1bmN0aW9uIHNzKCl7cmV0dXJuIHBhZChfcygpKX0sbDpmdW5jdGlvbiBsKCl7cmV0dXJuIHBhZChfTCgpLDMpfSxMOmZ1bmN0aW9uIEwoKXtyZXR1cm4gcGFkKE1hdGguZmxvb3IoX0woKS8xMCkpfSx0OmZ1bmN0aW9uIHQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzBdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXTpkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzRdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV19LFRUOmZ1bmN0aW9uIFRUKCl7cmV0dXJuIF9IKCk8MTI/ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s2XTpkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6KFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9fSgpO2RhdGVGb3JtYXQubWFza3M9e2RlZmF1bHQ6XCJkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3NcIixzaG9ydERhdGU6XCJtL2QveXlcIixwYWRkZWRTaG9ydERhdGU6XCJtbS9kZC95eXl5XCIsbWVkaXVtRGF0ZTpcIm1tbSBkLCB5eXl5XCIsbG9uZ0RhdGU6XCJtbW1tIGQsIHl5eXlcIixmdWxsRGF0ZTpcImRkZGQsIG1tbW0gZCwgeXl5eVwiLHNob3J0VGltZTpcImg6TU0gVFRcIixtZWRpdW1UaW1lOlwiaDpNTTpzcyBUVFwiLGxvbmdUaW1lOlwiaDpNTTpzcyBUVCBaXCIsaXNvRGF0ZTpcInl5eXktbW0tZGRcIixpc29UaW1lOlwiSEg6TU06c3NcIixpc29EYXRlVGltZTpcInl5eXktbW0tZGQnVCdISDpNTTpzc29cIixpc29VdGNEYXRlVGltZTpcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIixleHBpcmVzSGVhZGVyRm9ybWF0OlwiZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaXCJ9O2RhdGVGb3JtYXQuaTE4bj17ZGF5TmFtZXM6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCIsXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxtb250aE5hbWVzOltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIixcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSx0aW1lTmFtZXM6W1wiYVwiLFwicFwiLFwiYW1cIixcInBtXCIsXCJBXCIsXCJQXCIsXCJBTVwiLFwiUE1cIl19O3ZhciBwYWQ9ZnVuY3Rpb24gcGFkKHZhbCxsZW4pe3ZhbD1TdHJpbmcodmFsKTtsZW49bGVufHwyO3doaWxlKHZhbC5sZW5ndGg8bGVuKXt2YWw9XCIwXCIrdmFsfXJldHVybiB2YWx9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307dmFyIGtpbmRPZj1mdW5jdGlvbiBraW5kT2YodmFsKXtpZih2YWw9PT1udWxsKXtyZXR1cm5cIm51bGxcIn1pZih2YWw9PT11bmRlZmluZWQpe3JldHVyblwidW5kZWZpbmVkXCJ9aWYoX3R5cGVvZih2YWwpIT09XCJvYmplY3RcIil7cmV0dXJuIF90eXBlb2YodmFsKX1pZihBcnJheS5pc0FycmF5KHZhbCkpe3JldHVyblwiYXJyYXlcIn1yZXR1cm57fS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwtMSkudG9Mb3dlckNhc2UoKX07aWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGRhdGVGb3JtYXR9KX1lbHNlIGlmKCh0eXBlb2YgZXhwb3J0cz09PVwidW5kZWZpbmVkXCI/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGV4cG9ydHMpKT09PVwib2JqZWN0XCIpe21vZHVsZS5leHBvcnRzPWRhdGVGb3JtYXR9ZWxzZXtnbG9iYWwuZGF0ZUZvcm1hdD1kYXRlRm9ybWF0fX0pKHZvaWQgMCk7IiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdFRpbWVcblxuY29uc3Qge1xuICBEQVRFX0ZPUk1BVCxcbiAgREFURV9GT1JNQVRfU0lNUExFXG59ID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJylcblxuY29uc3QgZGF0ZWZvcm1hdCA9IHJlcXVpcmUoJ2RhdGVmb3JtYXQnKVxuY29uc3QgY3JlYXRlRGF0ZSA9IHJlcXVpcmUoJy4vY3JlYXRlLWRhdGUnKVxuY29uc3QgaXNWYWxpZERhdGUgPSByZXF1aXJlKCcuL2lzLXZhbGlkLWRhdGUnKVxuXG4vKipcbiAqIENvbnZlcnRzIGEgZ2l2ZW4gYGVwb2NoYCB0byBhIGRlc2lyZWQgZGlzcGxheSBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlcG9jaCBUaGUgdGltZSB0byBjb252ZXJ0LiBNYXkgYmUgYW55IHZhbHVlIHRoYXQgaXNcbiAqIHZhbGlkIGZvciBgbmV3IERhdGUoKWAuXG4gKiBAcGFyYW0ge2Jvb2xlYW58c3RyaW5nfSBbdHJhbnNsYXRlVGltZT1mYWxzZV0gV2hlbiBgZmFsc2VgLCB0aGUgZ2l2ZW4gYGVwb2NoYFxuICogd2lsbCBzaW1wbHkgYmUgcmV0dXJuZWQuIFdoZW4gYHRydWVgLCB0aGUgZ2l2ZW4gYGVwb2NoYCB3aWxsIGJlIGNvbnZlcnRlZFxuICogdG8gYSBzdHJpbmcgYXQgVVRDIHVzaW5nIHRoZSBgREFURV9GT1JNQVRgIGNvbnN0YW50LiBJZiBgdHJhbnNsYXRlVGltZWAgaXNcbiAqIGEgc3RyaW5nLCB0aGUgZm9sbG93aW5nIHJ1bGVzIGFyZSBhdmFpbGFibGU6XG4gKlxuICogLSBgPGZvcm1hdCBzdHJpbmc+YDogVGhlIHN0cmluZyBpcyBhIGxpdGVyYWwgZm9ybWF0IHN0cmluZy4gVGhpcyBmb3JtYXRcbiAqIHN0cmluZyB3aWxsIGJlIHVzZWQgdG8gaW50ZXJwcmV0IHRoZSBgZXBvY2hgIGFuZCByZXR1cm4gYSBkaXNwbGF5IHN0cmluZ1xuICogYXQgVVRDLlxuICogLSBgU1lTOlNUQU5EQVJEYDogVGhlIHJldHVybmVkIGRpc3BsYXkgc3RyaW5nIHdpbGwgZm9sbG93IHRoZSBgREFURV9GT1JNQVRgXG4gKiBjb25zdGFudCBhdCB0aGUgc3lzdGVtJ3MgbG9jYWwgdGltZXpvbmUuXG4gKiAtIGBTWVM6PGZvcm1hdCBzdHJpbmc+YDogVGhlIHJldHVybmVkIGRpc3BsYXkgc3RyaW5nIHdpbGwgZm9sbG93IHRoZSBnaXZlblxuICogYDxmb3JtYXQgc3RyaW5nPmAgYXQgdGhlIHN5c3RlbSdzIGxvY2FsIHRpbWV6b25lLlxuICogLSBgVVRDOjxmb3JtYXQgc3RyaW5nPmA6IFRoZSByZXR1cm5lZCBkaXNwbGF5IHN0cmluZyB3aWxsIGZvbGxvdyB0aGUgZ2l2ZW5cbiAqIGA8Zm9ybWF0IHN0cmluZz5gIGF0IFVUQy5cbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ30gVGhlIGZvcm1hdHRlZCB0aW1lLlxuICovXG5mdW5jdGlvbiBmb3JtYXRUaW1lIChlcG9jaCwgdHJhbnNsYXRlVGltZSA9IGZhbHNlKSB7XG4gIGlmICh0cmFuc2xhdGVUaW1lID09PSBmYWxzZSkge1xuICAgIHJldHVybiBlcG9jaFxuICB9XG5cbiAgY29uc3QgaW5zdGFudCA9IGNyZWF0ZURhdGUoZXBvY2gpXG5cbiAgLy8gSWYgdGhlIERhdGUgaXMgaW52YWxpZCwgZG8gbm90IGF0dGVtcHQgdG8gZm9ybWF0XG4gIGlmICghaXNWYWxpZERhdGUoaW5zdGFudCkpIHtcbiAgICByZXR1cm4gZXBvY2hcbiAgfVxuXG4gIGlmICh0cmFuc2xhdGVUaW1lID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGRhdGVmb3JtYXQoaW5zdGFudCwgREFURV9GT1JNQVRfU0lNUExFKVxuICB9XG5cbiAgY29uc3QgdXBwZXJGb3JtYXQgPSB0cmFuc2xhdGVUaW1lLnRvVXBwZXJDYXNlKClcbiAgaWYgKHVwcGVyRm9ybWF0ID09PSAnU1lTOlNUQU5EQVJEJykge1xuICAgIHJldHVybiBkYXRlZm9ybWF0KGluc3RhbnQsIERBVEVfRk9STUFUKVxuICB9XG5cbiAgY29uc3QgcHJlZml4ID0gdXBwZXJGb3JtYXQuc3Vic3RyKDAsIDQpXG4gIGlmIChwcmVmaXggPT09ICdTWVM6JyB8fCBwcmVmaXggPT09ICdVVEM6Jykge1xuICAgIGlmIChwcmVmaXggPT09ICdVVEM6Jykge1xuICAgICAgcmV0dXJuIGRhdGVmb3JtYXQoaW5zdGFudCwgdHJhbnNsYXRlVGltZSlcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVmb3JtYXQoaW5zdGFudCwgdHJhbnNsYXRlVGltZS5zbGljZSg0KSlcbiAgfVxuXG4gIHJldHVybiBkYXRlZm9ybWF0KGluc3RhbnQsIGBVVEM6JHt0cmFuc2xhdGVUaW1lfWApXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlQ3VzdG9tTGV2ZWxzTmFtZXNPcHRzXG5cbi8qKlxuICogUGFyc2UgYSBDU1Ygc3RyaW5nIG9yIG9wdGlvbnMgb2JqZWN0IHRoYXQgbWFwcyBsZXZlbFxuICogbGFiZWxzIHRvIGxldmVsIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGNMZXZlbHMgQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxcbiAqIG5hbWVzIHRvIGxldmVsIHZhbHVlcywgZS5nLiBgeyBpbmZvOiAzMCwgZGVidWc6IDY1IH1gLCBvciBhXG4gKiBDU1Ygc3RyaW5nIGluIHRoZSBmb3JtYXQgYGxldmVsX25hbWU6bGV2ZWxfdmFsdWVgLCBlLmcuXG4gKiBgaW5mbzozMCxkZWJ1Zzo2NWAuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxzIG5hbWVzIHRvIGxldmVsIHZhbHVlc1xuICogZS5nLiBgeyBpbmZvOiAzMCwgZGVidWc6IDY1IH1gLlxuICovXG5mdW5jdGlvbiBoYW5kbGVDdXN0b21MZXZlbHNOYW1lc09wdHMgKGNMZXZlbHMpIHtcbiAgaWYgKCFjTGV2ZWxzKSByZXR1cm4ge31cblxuICBpZiAodHlwZW9mIGNMZXZlbHMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNMZXZlbHNcbiAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAucmVkdWNlKChhZ2csIHZhbHVlLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgW2xldmVsTmFtZSwgbGV2ZWxOdW0gPSBpZHhdID0gdmFsdWUuc3BsaXQoJzonKVxuICAgICAgICBhZ2dbbGV2ZWxOYW1lLnRvTG93ZXJDYXNlKCldID0gbGV2ZWxOdW1cbiAgICAgICAgcmV0dXJuIGFnZ1xuICAgICAgfSwge30pXG4gIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNMZXZlbHMpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBPYmplY3RcbiAgICAgIC5rZXlzKGNMZXZlbHMpXG4gICAgICAucmVkdWNlKChhZ2csIGxldmVsTmFtZSkgPT4ge1xuICAgICAgICBhZ2dbbGV2ZWxOYW1lLnRvTG93ZXJDYXNlKCldID0gY0xldmVsc1tsZXZlbE5hbWVdXG4gICAgICAgIHJldHVybiBhZ2dcbiAgICAgIH0sIHt9KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7fVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlQ3VzdG9tTGV2ZWxzT3B0c1xuXG4vKipcbiAqIFBhcnNlIGEgQ1NWIHN0cmluZyBvciBvcHRpb25zIG9iamVjdCB0aGF0IHNwZWNpZmllc1xuICogY29uZmlndXJhdGlvbiBmb3IgY3VzdG9tIGxldmVscy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGNMZXZlbHMgQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxcbiAqIG5hbWVzIHRvIHZhbHVlcywgZS5nLiBgeyBpbmZvOiAzMCwgZGVidWc6IDY1IH1gLCBvciBhXG4gKiBDU1Ygc3RyaW5nIGluIHRoZSBmb3JtYXQgYGxldmVsX25hbWU6bGV2ZWxfdmFsdWVgLCBlLmcuXG4gKiBgaW5mbzozMCxkZWJ1Zzo2NWAuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxzIHRvIGxhYmVscyB0aGF0XG4gKiBhcHBlYXIgaW4gbG9ncywgZS5nLiBgeyAnMzAnOiAnSU5GTycsICc2NSc6ICdERUJVRycgfWAuXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbUxldmVsc09wdHMgKGNMZXZlbHMpIHtcbiAgaWYgKCFjTGV2ZWxzKSByZXR1cm4ge31cblxuICBpZiAodHlwZW9mIGNMZXZlbHMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNMZXZlbHNcbiAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAucmVkdWNlKChhZ2csIHZhbHVlLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgW2xldmVsTmFtZSwgbGV2ZWxOdW0gPSBpZHhdID0gdmFsdWUuc3BsaXQoJzonKVxuICAgICAgICBhZ2dbbGV2ZWxOdW1dID0gbGV2ZWxOYW1lLnRvVXBwZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIGFnZ1xuICAgICAgfSxcbiAgICAgIHsgZGVmYXVsdDogJ1VTRVJMVkwnIH0pXG4gIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNMZXZlbHMpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBPYmplY3RcbiAgICAgIC5rZXlzKGNMZXZlbHMpXG4gICAgICAucmVkdWNlKChhZ2csIGxldmVsTmFtZSkgPT4ge1xuICAgICAgICBhZ2dbY0xldmVsc1tsZXZlbE5hbWVdXSA9IGxldmVsTmFtZS50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBhZ2dcbiAgICAgIH0sIHsgZGVmYXVsdDogJ1VTRVJMVkwnIH0pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnByZXRDb25kaXRpb25hbHNcblxuY29uc3QgZ2V0UHJvcGVydHlWYWx1ZSA9IHJlcXVpcmUoJy4vZ2V0LXByb3BlcnR5LXZhbHVlJylcblxuLyoqXG4gKiBUcmFuc2xhdGVzIGFsbCBjb25kaXRpb25hbCBibG9ja3MgZnJvbSB3aXRoaW4gdGhlIG1lc3NhZ2VGb3JtYXQuIFRyYW5zbGF0ZXNcbiAqIGFueSBtYXRjaGluZyB7aWYga2V5fXtrZXl9e2VuZH0gc3RhdGVtZW50cyBhbmQgcmV0dXJucyBldmVyeXRoaW5nIGJldHdlZW5cbiAqIGlmIGFuZCBlbHNlIGJsb2NrcyBpZiB0aGUga2V5IHByb3ZpZGVkIHdhcyBmb3VuZCBpbiBsb2cuXG4gKlxuICogQHBhcmFtIHtNZXNzYWdlRm9ybWF0U3RyaW5nfE1lc3NhZ2VGb3JtYXRGdW5jdGlvbn0gbWVzc2FnZUZvcm1hdCBBIGZvcm1hdFxuICogc3RyaW5nIG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBob3cgdGhlIGxvZ2dlZCBtZXNzYWdlIHNob3VsZCBiZVxuICogY29uZGl0aW9uYWxseSBmb3JtYXR0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nIFRoZSBsb2cgb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXJzZWQgbWVzc2FnZUZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gaW50ZXJwcmV0Q29uZGl0aW9uYWxzIChtZXNzYWdlRm9ybWF0LCBsb2cpIHtcbiAgbWVzc2FnZUZvcm1hdCA9IG1lc3NhZ2VGb3JtYXQucmVwbGFjZSgve2lmICguKj8pfSguKj8pe2VuZH0vZywgcmVwbGFjZXIpXG5cbiAgLy8gUmVtb3ZlIG5vbi10ZXJtaW5hdGVkIGlmIGJsb2Nrc1xuICBtZXNzYWdlRm9ybWF0ID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC97aWYgKC4qPyl9L2csICcnKVxuICAvLyBSZW1vdmUgZmxvYXRpbmcgZW5kIGJsb2Nrc1xuICBtZXNzYWdlRm9ybWF0ID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC97ZW5kfS9nLCAnJylcblxuICByZXR1cm4gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG5cbiAgZnVuY3Rpb24gcmVwbGFjZXIgKF8sIGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gZ2V0UHJvcGVydHlWYWx1ZShsb2csIGtleSlcbiAgICBpZiAocHJvcGVydHlWYWx1ZSAmJiB2YWx1ZS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKCd7JyArIGtleSArICd9JywgJ2cnKSwgcHJvcGVydHlWYWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RcblxuZnVuY3Rpb24gaXNPYmplY3QgKGlucHV0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBqb2luTGluZXNXaXRoSW5kZW50YXRpb25cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBKb2luTGluZXNXaXRoSW5kZW50YXRpb25QYXJhbXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIHRvIHNwbGl0IGFuZCByZWZvcm1hdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbaWRlbnRdIFRoZSBpbmRlbnRhdGlvbiBzdHJpbmcuIERlZmF1bHQ6IGAgICAgYCAoNCBzcGFjZXMpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtlb2xdIFRoZSBlbmQgb2YgbGluZSBzZXF1ZW5jZSB0byB1c2Ugd2hlbiByZWpvaW5pbmdcbiAqIHRoZSBsaW5lcy4gRGVmYXVsdDogYCdcXG4nYC5cbiAqL1xuXG4vKipcbiAqIEdpdmVuIGEgc3RyaW5nIHdpdGggbGluZSBzZXBhcmF0b3JzLCBlaXRoZXIgYFxcclxcbmAgb3IgYFxcbmAsIGFkZCBpbmRlbnRhdGlvblxuICogdG8gYWxsIGxpbmVzIHN1YnNlcXVlbnQgdG8gdGhlIGZpcnN0IGxpbmUgYW5kIHJlam9pbiB0aGUgbGluZXMgdXNpbmcgYW5cbiAqIGVuZCBvZiBsaW5lIHNlcXVlbmNlLlxuICpcbiAqIEBwYXJhbSB7Sm9pbkxpbmVzV2l0aEluZGVudGF0aW9uUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIHdpdGggbGluZXMgc3Vic2VxdWVudCB0byB0aGUgZmlyc3QgaW5kZW50ZWRcbiAqIHdpdGggdGhlIGdpdmVuIGluZGVudGF0aW9uIHNlcXVlbmNlLlxuICovXG5mdW5jdGlvbiBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gKHsgaW5wdXQsIGlkZW50ID0gJyAgICAnLCBlb2wgPSAnXFxuJyB9KSB7XG4gIGNvbnN0IGxpbmVzID0gaW5wdXQuc3BsaXQoL1xccj9cXG4vKVxuICBmb3IgKGxldCBpID0gMTsgaSA8IGxpbmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgbGluZXNbaV0gPSBpZGVudCArIGxpbmVzW2ldXG4gIH1cbiAgcmV0dXJuIGxpbmVzLmpvaW4oZW9sKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlRmFjdG9yeU9wdGlvbnNcblxuY29uc3Qge1xuICBMRVZFTF9OQU1FU1xufSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpXG5jb25zdCBjb2xvcnMgPSByZXF1aXJlKCcuLi9jb2xvcnMnKVxuY29uc3QgaGFuZGxlQ3VzdG9tTGV2ZWxzT3B0cyA9IHJlcXVpcmUoJy4vaGFuZGxlLWN1c3RvbS1sZXZlbHMtb3B0cycpXG5jb25zdCBoYW5kbGVDdXN0b21MZXZlbHNOYW1lc09wdHMgPSByZXF1aXJlKCcuL2hhbmRsZS1jdXN0b20tbGV2ZWxzLW5hbWVzLW9wdHMnKVxuY29uc3QgaGFuZGxlTGV2ZWxMYWJlbERhdGEgPSByZXF1aXJlKCcuL2dldC1sZXZlbC1sYWJlbC1kYXRhJylcblxuLyoqXG4gKiBBIGBQcmV0dHlDb250ZXh0YCBpcyBhbiBvYmplY3QgdG8gYmUgdXNlZCBieSB0aGUgdmFyaW91cyBmdW5jdGlvbnMgdGhhdFxuICogcHJvY2VzcyBsb2cgZGF0YS4gSXQgaXMgZGVyaXZlZCBmcm9tIHRoZSBwcm92aWRlZCB7QGxpbmsgUGlub1ByZXR0eU9wdGlvbnN9LlxuICogSXQgbWF5IGJlIHVzZWQgYXMgYSBgdGhpc2AgY29udGV4dC5cbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQcmV0dHlDb250ZXh0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gRU9MIFRoZSBlc2NhcGUgc2VxdWVuY2UgY2hvc2VuIGFzIHRoZSBsaW5lIHRlcm1pbmF0b3IuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gSURFTlQgVGhlIHN0cmluZyB0byB1c2UgYXMgdGhlIGluZGVudGF0aW9uIHNlcXVlbmNlLlxuICogQHByb3BlcnR5IHtDb2xvcml6ZXJGdW5jfSBjb2xvcml6ZXIgQSBjb25maWd1cmVkIGNvbG9yaXplciBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7QXJyYXlbQXJyYXk8bnVtYmVyLCBzdHJpbmc+XX0gY3VzdG9tQ29sb3JzIEEgc2V0IG9mIGN1c3RvbSBjb2xvclxuICogbmFtZXMgYXNzb2NpYXRlZCB3aXRoIGxldmVsIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gY3VzdG9tTGV2ZWxOYW1lcyBBIGhhc2ggb2YgbGV2ZWwgbnVtYmVycyB0byBsZXZlbCBuYW1lcyxcbiAqIGUuZy4gYHsgMzA6IFwiaW5mb1wiIH1gLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGN1c3RvbUxldmVscyBBIGhhc2ggb2YgbGV2ZWwgbmFtZXMgdG8gbGV2ZWwgbnVtYmVycyxcbiAqIGUuZy4gYHsgaW5mbzogMzAgfWAuXG4gKiBAcHJvcGVydHkge0N1c3RvbVByZXR0aWZpZXJzfSBjdXN0b21QcmV0dGlmaWVycyBBIGhhc2ggb2YgY3VzdG9tIHByZXR0aWZpZXJcbiAqIGZ1bmN0aW9ucy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjdXN0b21Qcm9wZXJ0aWVzIENvbXByaXNlZCBvZiBgY3VzdG9tTGV2ZWxzYCBhbmRcbiAqIGBjdXN0b21MZXZlbE5hbWVzYCBpZiBzdWNoIG9wdGlvbnMgYXJlIHByb3ZpZGVkLlxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gZXJyb3JMaWtlT2JqZWN0S2V5cyBUaGUga2V5IG5hbWVzIGluIHRoZSBsb2cgZGF0YSB0aGF0XG4gKiBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBob2xkaW5nIGVycm9yIG9iamVjdHMuXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBlcnJvclByb3BzIEEgbGlzdCBvZiBlcnJvciBvYmplY3Qga2V5cyB0aGF0IHNob3VsZCBiZVxuICogaW5jbHVkZWQgaW4gdGhlIG91dHB1dC5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGdldExldmVsTGFiZWxEYXRhIFBhc3MgYSBudW1lcmljIGxldmVsIHRvIHJldHVybiBbbGV2ZWxMYWJlbFN0cmluZyxsZXZlbE51bV1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaGlkZU9iamVjdCBJbmRpY2F0ZXMgdGhlIHByZXR0aWZpZXIgc2hvdWxkIG9taXQgb2JqZWN0c1xuICogaW4gdGhlIG91dHB1dC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGlnbm9yZUtleXMgU2V0IG9mIGxvZyBkYXRhIGtleXMgdG8gb21pdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGluY2x1ZGVLZXlzIE9wcG9zaXRlIG9mIGBpZ25vcmVLZXlzYC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbGV2ZWxGaXJzdCBJbmRpY2F0ZXMgdGhlIGxldmVsIHNob3VsZCBiZSBwcmludGVkIGZpcnN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxldmVsS2V5IE5hbWUgb2YgdGhlIGtleSBpbiB0aGUgbG9nIGRhdGEgdGhhdCBjb250YWluc1xuICogdGhlIG1lc3NhZ2UuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGV2ZWxMYWJlbCBGb3JtYXQgdG9rZW4gdG8gcmVwcmVzZW50IHRoZSBwb3NpdGlvbiBvZiB0aGVcbiAqIGxldmVsIG5hbWUgaW4gdGhlIG91dHB1dCBzdHJpbmcuXG4gKiBAcHJvcGVydHkge01lc3NhZ2VGb3JtYXRTdHJpbmd8TWVzc2FnZUZvcm1hdEZ1bmN0aW9ufSBtZXNzYWdlRm9ybWF0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZUtleSBOYW1lIG9mIHRoZSBrZXkgaW4gdGhlIGxvZyBkYXRhIHRoYXQgY29udGFpbnNcbiAqIHRoZSBtZXNzYWdlLlxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfSBtaW5pbXVtTGV2ZWwgVGhlIG1pbmltdW0gbG9nIGxldmVsIHRvIHByb2Nlc3NcbiAqIGFuZCBvdXRwdXQuXG4gKiBAcHJvcGVydHkge0NvbG9yaXplckZ1bmN9IG9iamVjdENvbG9yaXplclxuICogQHByb3BlcnR5IHtib29sZWFufSBzaW5nbGVMaW5lIEluZGljYXRlcyBvYmplY3RzIHNob3VsZCBiZSBwcmludGVkIG9uIGFcbiAqIHNpbmdsZSBvdXRwdXQgbGluZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aW1lc3RhbXBLZXkgVGhlIG5hbWUgb2YgdGhlIGtleSBpbiB0aGUgbG9nIGRhdGEgdGhhdFxuICogY29udGFpbnMgdGhlIGxvZyB0aW1lc3RhbXAuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHRyYW5zbGF0ZVRpbWUgSW5kaWNhdGVzIGlmIHRpbWVzdGFtcHMgc2hvdWxkIGJlXG4gKiB0cmFuc2xhdGVkIHRvIGEgaHVtYW4tcmVhZGFibGUgc3RyaW5nLlxuICogQHByb3BlcnR5IHtib29sZWFufSB1c2VPbmx5Q3VzdG9tUHJvcHNcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7UGlub1ByZXR0eU9wdGlvbnN9IG9wdGlvbnMgVGhlIHVzZXIgc3VwcGxpZWQgb2JqZWN0IG9mIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMge1ByZXR0eUNvbnRleHR9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlRmFjdG9yeU9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgY29uc3QgRU9MID0gb3B0aW9ucy5jcmxmID8gJ1xcclxcbicgOiAnXFxuJ1xuICBjb25zdCBJREVOVCA9ICcgICAgJ1xuICBjb25zdCB7XG4gICAgY3VzdG9tUHJldHRpZmllcnMsXG4gICAgZXJyb3JMaWtlT2JqZWN0S2V5cyxcbiAgICBoaWRlT2JqZWN0LFxuICAgIGxldmVsRmlyc3QsXG4gICAgbGV2ZWxLZXksXG4gICAgbGV2ZWxMYWJlbCxcbiAgICBtZXNzYWdlRm9ybWF0LFxuICAgIG1lc3NhZ2VLZXksXG4gICAgbWluaW11bUxldmVsLFxuICAgIHNpbmdsZUxpbmUsXG4gICAgdGltZXN0YW1wS2V5LFxuICAgIHRyYW5zbGF0ZVRpbWVcbiAgfSA9IG9wdGlvbnNcbiAgY29uc3QgZXJyb3JQcm9wcyA9IG9wdGlvbnMuZXJyb3JQcm9wcy5zcGxpdCgnLCcpXG4gIGNvbnN0IHVzZU9ubHlDdXN0b21Qcm9wcyA9IHR5cGVvZiBvcHRpb25zLnVzZU9ubHlDdXN0b21Qcm9wcyA9PT0gJ2Jvb2xlYW4nXG4gICAgPyBvcHRpb25zLnVzZU9ubHlDdXN0b21Qcm9wc1xuICAgIDogKG9wdGlvbnMudXNlT25seUN1c3RvbVByb3BzID09PSAndHJ1ZScpXG4gIGNvbnN0IGN1c3RvbUxldmVscyA9IGhhbmRsZUN1c3RvbUxldmVsc09wdHMob3B0aW9ucy5jdXN0b21MZXZlbHMpXG4gIGNvbnN0IGN1c3RvbUxldmVsTmFtZXMgPSBoYW5kbGVDdXN0b21MZXZlbHNOYW1lc09wdHMob3B0aW9ucy5jdXN0b21MZXZlbHMpXG4gIGNvbnN0IGdldExldmVsTGFiZWxEYXRhID0gaGFuZGxlTGV2ZWxMYWJlbERhdGEodXNlT25seUN1c3RvbVByb3BzLCBjdXN0b21MZXZlbHMsIGN1c3RvbUxldmVsTmFtZXMpXG5cbiAgbGV0IGN1c3RvbUNvbG9yc1xuICBpZiAob3B0aW9ucy5jdXN0b21Db2xvcnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuY3VzdG9tQ29sb3JzID09PSAnc3RyaW5nJykge1xuICAgICAgY3VzdG9tQ29sb3JzID0gb3B0aW9ucy5jdXN0b21Db2xvcnMuc3BsaXQoJywnKS5yZWR1Y2UoKGFnZywgdmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgW2xldmVsLCBjb2xvcl0gPSB2YWx1ZS5zcGxpdCgnOicpXG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IHVzZU9ubHlDdXN0b21Qcm9wc1xuICAgICAgICAgID8gb3B0aW9ucy5jdXN0b21MZXZlbHNcbiAgICAgICAgICA6IGN1c3RvbUxldmVsTmFtZXNbbGV2ZWxdICE9PSB1bmRlZmluZWRcbiAgICAgICAgY29uc3QgbGV2ZWxOdW0gPSBjb25kaXRpb25cbiAgICAgICAgICA/IGN1c3RvbUxldmVsTmFtZXNbbGV2ZWxdXG4gICAgICAgICAgOiBMRVZFTF9OQU1FU1tsZXZlbF1cbiAgICAgICAgY29uc3QgY29sb3JJZHggPSBsZXZlbE51bSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBsZXZlbE51bVxuICAgICAgICAgIDogbGV2ZWxcbiAgICAgICAgYWdnLnB1c2goW2NvbG9ySWR4LCBjb2xvcl0pXG4gICAgICAgIHJldHVybiBhZ2dcbiAgICAgIH0sIFtdKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuY3VzdG9tQ29sb3JzID09PSAnb2JqZWN0Jykge1xuICAgICAgY3VzdG9tQ29sb3JzID0gT2JqZWN0LmtleXMob3B0aW9ucy5jdXN0b21Db2xvcnMpLnJlZHVjZSgoYWdnLCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBbbGV2ZWwsIGNvbG9yXSA9IFt2YWx1ZSwgb3B0aW9ucy5jdXN0b21Db2xvcnNbdmFsdWVdXVxuICAgICAgICBjb25zdCBjb25kaXRpb24gPSB1c2VPbmx5Q3VzdG9tUHJvcHNcbiAgICAgICAgICA/IG9wdGlvbnMuY3VzdG9tTGV2ZWxzXG4gICAgICAgICAgOiBjdXN0b21MZXZlbE5hbWVzW2xldmVsXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgIGNvbnN0IGxldmVsTnVtID0gY29uZGl0aW9uXG4gICAgICAgICAgPyBjdXN0b21MZXZlbE5hbWVzW2xldmVsXVxuICAgICAgICAgIDogTEVWRUxfTkFNRVNbbGV2ZWxdXG4gICAgICAgIGNvbnN0IGNvbG9ySWR4ID0gbGV2ZWxOdW0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gbGV2ZWxOdW1cbiAgICAgICAgICA6IGxldmVsXG4gICAgICAgIGFnZy5wdXNoKFtjb2xvcklkeCwgY29sb3JdKVxuICAgICAgICByZXR1cm4gYWdnXG4gICAgICB9LCBbXSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLmN1c3RvbUNvbG9ycyBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nIG9yIG9iamVjdC4nKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGN1c3RvbVByb3BlcnRpZXMgPSB7IGN1c3RvbUxldmVscywgY3VzdG9tTGV2ZWxOYW1lcyB9XG4gIGlmICh1c2VPbmx5Q3VzdG9tUHJvcHMgPT09IHRydWUgJiYgIW9wdGlvbnMuY3VzdG9tTGV2ZWxzKSB7XG4gICAgY3VzdG9tUHJvcGVydGllcy5jdXN0b21MZXZlbHMgPSB1bmRlZmluZWRcbiAgICBjdXN0b21Qcm9wZXJ0aWVzLmN1c3RvbUxldmVsTmFtZXMgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IGluY2x1ZGVLZXlzID0gb3B0aW9ucy5pbmNsdWRlICE9PSB1bmRlZmluZWRcbiAgICA/IG5ldyBTZXQob3B0aW9ucy5pbmNsdWRlLnNwbGl0KCcsJykpXG4gICAgOiB1bmRlZmluZWRcbiAgY29uc3QgaWdub3JlS2V5cyA9ICghaW5jbHVkZUtleXMgJiYgb3B0aW9ucy5pZ25vcmUpXG4gICAgPyBuZXcgU2V0KG9wdGlvbnMuaWdub3JlLnNwbGl0KCcsJykpXG4gICAgOiB1bmRlZmluZWRcblxuICBjb25zdCBjb2xvcml6ZXIgPSBjb2xvcnMob3B0aW9ucy5jb2xvcml6ZSwgY3VzdG9tQ29sb3JzLCB1c2VPbmx5Q3VzdG9tUHJvcHMpXG4gIGNvbnN0IG9iamVjdENvbG9yaXplciA9IG9wdGlvbnMuY29sb3JpemVPYmplY3RzXG4gICAgPyBjb2xvcml6ZXJcbiAgICA6IGNvbG9ycyhmYWxzZSwgW10sIGZhbHNlKVxuXG4gIHJldHVybiB7XG4gICAgRU9MLFxuICAgIElERU5ULFxuICAgIGNvbG9yaXplcixcbiAgICBjdXN0b21Db2xvcnMsXG4gICAgY3VzdG9tTGV2ZWxOYW1lcyxcbiAgICBjdXN0b21MZXZlbHMsXG4gICAgY3VzdG9tUHJldHRpZmllcnMsXG4gICAgY3VzdG9tUHJvcGVydGllcyxcbiAgICBlcnJvckxpa2VPYmplY3RLZXlzLFxuICAgIGVycm9yUHJvcHMsXG4gICAgZ2V0TGV2ZWxMYWJlbERhdGEsXG4gICAgaGlkZU9iamVjdCxcbiAgICBpZ25vcmVLZXlzLFxuICAgIGluY2x1ZGVLZXlzLFxuICAgIGxldmVsRmlyc3QsXG4gICAgbGV2ZWxLZXksXG4gICAgbGV2ZWxMYWJlbCxcbiAgICBtZXNzYWdlRm9ybWF0LFxuICAgIG1lc3NhZ2VLZXksXG4gICAgbWluaW11bUxldmVsLFxuICAgIG9iamVjdENvbG9yaXplcixcbiAgICBzaW5nbGVMaW5lLFxuICAgIHRpbWVzdGFtcEtleSxcbiAgICB0cmFuc2xhdGVUaW1lLFxuICAgIHVzZU9ubHlDdXN0b21Qcm9wc1xuICB9XG59XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbnN0cmluZ2lmeS5kZWZhdWx0ID0gc3RyaW5naWZ5XG5zdHJpbmdpZnkuc3RhYmxlID0gZGV0ZXJtaW5pc3RpY1N0cmluZ2lmeVxuc3RyaW5naWZ5LnN0YWJsZVN0cmluZ2lmeSA9IGRldGVybWluaXN0aWNTdHJpbmdpZnlcblxudmFyIExJTUlUX1JFUExBQ0VfTk9ERSA9ICdbLi4uXSdcbnZhciBDSVJDVUxBUl9SRVBMQUNFX05PREUgPSAnW0NpcmN1bGFyXSdcblxudmFyIGFyciA9IFtdXG52YXIgcmVwbGFjZXJTdGFjayA9IFtdXG5cbmZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zICgpIHtcbiAgcmV0dXJuIHtcbiAgICBkZXB0aExpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICBlZGdlc0xpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICB9XG59XG5cbi8vIFJlZ3VsYXIgc3RyaW5naWZ5XG5mdW5jdGlvbiBzdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKClcbiAgfVxuXG4gIGRlY2lyYyhvYmosICcnLCAwLCBbXSwgdW5kZWZpbmVkLCAwLCBvcHRpb25zKVxuICB2YXIgcmVzXG4gIHRyeSB7XG4gICAgaWYgKHJlcGxhY2VyU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyA9IEpTT04uc3RyaW5naWZ5KG9iaiwgcmVwbGFjZUdldHRlclZhbHVlcyhyZXBsYWNlciksIHNwYWNlcilcbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoJ1t1bmFibGUgdG8gc2VyaWFsaXplLCBjaXJjdWxhciByZWZlcmVuY2UgaXMgdG9vIGNvbXBsZXggdG8gYW5hbHl6ZV0nKVxuICB9IGZpbmFsbHkge1xuICAgIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0WzBdLCBwYXJ0WzFdLCBwYXJ0WzNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydFswXVtwYXJ0WzFdXSA9IHBhcnRbMl1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBzZXRSZXBsYWNlIChyZXBsYWNlLCB2YWwsIGssIHBhcmVudCkge1xuICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIGspXG4gIGlmIChwcm9wZXJ0eURlc2NyaXB0b3IuZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocHJvcGVydHlEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBhcmVudCwgaywgeyB2YWx1ZTogcmVwbGFjZSB9KVxuICAgICAgYXJyLnB1c2goW3BhcmVudCwgaywgdmFsLCBwcm9wZXJ0eURlc2NyaXB0b3JdKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXBsYWNlclN0YWNrLnB1c2goW3ZhbCwgaywgcmVwbGFjZV0pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhcmVudFtrXSA9IHJlcGxhY2VcbiAgICBhcnIucHVzaChbcGFyZW50LCBrLCB2YWxdKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlY2lyYyAodmFsLCBrLCBlZGdlSW5kZXgsIHN0YWNrLCBwYXJlbnQsIGRlcHRoLCBvcHRpb25zKSB7XG4gIGRlcHRoICs9IDFcbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSB2YWwpIHtcbiAgICAgICAgc2V0UmVwbGFjZShDSVJDVUxBUl9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9ucy5kZXB0aExpbWl0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZGVwdGggPiBvcHRpb25zLmRlcHRoTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmVkZ2VzTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBlZGdlSW5kZXggKyAxID4gb3B0aW9ucy5lZGdlc0xpbWl0XG4gICAgKSB7XG4gICAgICBzZXRSZXBsYWNlKExJTUlUX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbClcbiAgICAvLyBPcHRpbWl6ZSBmb3IgQXJyYXlzLiBCaWcgYXJyYXlzIGNvdWxkIGtpbGwgdGhlIHBlcmZvcm1hbmNlIG90aGVyd2lzZSFcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY2lyYyh2YWxbaV0sIGksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgIGRlY2lyYyh2YWxba2V5XSwga2V5LCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2sucG9wKClcbiAgfVxufVxuXG4vLyBTdGFibGUtc3RyaW5naWZ5XG5mdW5jdGlvbiBjb21wYXJlRnVuY3Rpb24gKGEsIGIpIHtcbiAgaWYgKGEgPCBiKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKGEgPiBiKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljU3RyaW5naWZ5IChvYmosIHJlcGxhY2VyLCBzcGFjZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucygpXG4gIH1cblxuICB2YXIgdG1wID0gZGV0ZXJtaW5pc3RpY0RlY2lyYyhvYmosICcnLCAwLCBbXSwgdW5kZWZpbmVkLCAwLCBvcHRpb25zKSB8fCBvYmpcbiAgdmFyIHJlc1xuICB0cnkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzID0gSlNPTi5zdHJpbmdpZnkodG1wLCByZXBsYWNlciwgc3BhY2VyKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeSh0bXAsIHJlcGxhY2VHZXR0ZXJWYWx1ZXMocmVwbGFjZXIpLCBzcGFjZXIpXG4gICAgfVxuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KCdbdW5hYmxlIHRvIHNlcmlhbGl6ZSwgY2lyY3VsYXIgcmVmZXJlbmNlIGlzIHRvbyBjb21wbGV4IHRvIGFuYWx5emVdJylcbiAgfSBmaW5hbGx5IHtcbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSByZXN0b3JlIHRoZSBvYmplY3QgYXMgaXQgd2FzLlxuICAgIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0WzBdLCBwYXJ0WzFdLCBwYXJ0WzNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydFswXVtwYXJ0WzFdXSA9IHBhcnRbMl1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljRGVjaXJjICh2YWwsIGssIGVkZ2VJbmRleCwgc3RhY2ssIHBhcmVudCwgZGVwdGgsIG9wdGlvbnMpIHtcbiAgZGVwdGggKz0gMVxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc3RhY2tbaV0gPT09IHZhbCkge1xuICAgICAgICBzZXRSZXBsYWNlKENJUkNVTEFSX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmRlcHRoTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBkZXB0aCA+IG9wdGlvbnMuZGVwdGhMaW1pdFxuICAgICkge1xuICAgICAgc2V0UmVwbGFjZShMSU1JVF9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMuZWRnZXNMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGVkZ2VJbmRleCArIDEgPiBvcHRpb25zLmVkZ2VzTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsKVxuICAgIC8vIE9wdGltaXplIGZvciBBcnJheXMuIEJpZyBhcnJheXMgY291bGQga2lsbCB0aGUgcGVyZm9ybWFuY2Ugb3RoZXJ3aXNlIVxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxbaV0sIGksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgb2JqZWN0IGluIHRoZSByZXF1aXJlZCB3YXlcbiAgICAgIHZhciB0bXAgPSB7fVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxba2V5XSwga2V5LCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgICAgdG1wW2tleV0gPSB2YWxba2V5XVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXJlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbF0pXG4gICAgICAgIHBhcmVudFtrXSA9IHRtcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRtcFxuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5wb3AoKVxuICB9XG59XG5cbi8vIHdyYXBzIHJlcGxhY2VyIGZ1bmN0aW9uIHRvIGhhbmRsZSB2YWx1ZXMgd2UgY291bGRuJ3QgcmVwbGFjZVxuLy8gYW5kIG1hcmsgdGhlbSBhcyByZXBsYWNlZCB2YWx1ZVxuZnVuY3Rpb24gcmVwbGFjZUdldHRlclZhbHVlcyAocmVwbGFjZXIpIHtcbiAgcmVwbGFjZXIgPVxuICAgIHR5cGVvZiByZXBsYWNlciAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gcmVwbGFjZXJcbiAgICAgIDogZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgcmV0dXJuIHZcbiAgICAgIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwbGFjZXJTdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IHJlcGxhY2VyU3RhY2tbaV1cbiAgICAgICAgaWYgKHBhcnRbMV0gPT09IGtleSAmJiBwYXJ0WzBdID09PSB2YWwpIHtcbiAgICAgICAgICB2YWwgPSBwYXJ0WzJdXG4gICAgICAgICAgcmVwbGFjZXJTdGFjay5zcGxpY2UoaSwgMSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsKVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHRpZnlFcnJvclxuXG5jb25zdCBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gPSByZXF1aXJlKCcuL2pvaW4tbGluZXMtd2l0aC1pbmRlbnRhdGlvbicpXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlFcnJvclBhcmFtc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleU5hbWUgVGhlIGtleSBhc3NpZ25lZCB0byB0aGlzIGVycm9yIGluIHRoZSBsb2cgb2JqZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpbmVzIFRoZSBTVFJJTkdJRklFRCBlcnJvci4gSWYgdGhlIGVycm9yIGZpZWxkIGhhcyBhXG4gKiAgY3VzdG9tIHByZXR0aWZpZXIsIHRoYXQgc2hvdWxkIGJlIHByZS1hcHBsaWVkIGFzIHdlbGwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRlbnQgVGhlIGluZGVudGF0aW9uIHNlcXVlbmNlIHRvIHVzZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlb2wgVGhlIEVPTCBzZXF1ZW5jZSB0byB1c2UuXG4gKi9cblxuLyoqXG4gKiBQcmV0dGlmaWVzIGFuIGVycm9yIHN0cmluZyBpbnRvIGEgbXVsdGktbGluZSBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtQcmV0dGlmeUVycm9yUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHByZXR0aWZ5RXJyb3IgKHsga2V5TmFtZSwgbGluZXMsIGVvbCwgaWRlbnQgfSkge1xuICBsZXQgcmVzdWx0ID0gJydcbiAgY29uc3Qgam9pbmVkTGluZXMgPSBqb2luTGluZXNXaXRoSW5kZW50YXRpb24oeyBpbnB1dDogbGluZXMsIGlkZW50LCBlb2wgfSlcbiAgY29uc3Qgc3BsaXRMaW5lcyA9IGAke2lkZW50fSR7a2V5TmFtZX06ICR7am9pbmVkTGluZXN9JHtlb2x9YC5zcGxpdChlb2wpXG5cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBzcGxpdExpbmVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgaWYgKGogIT09IDApIHJlc3VsdCArPSBlb2xcblxuICAgIGNvbnN0IGxpbmUgPSBzcGxpdExpbmVzW2pdXG4gICAgaWYgKC9eXFxzKlwic3RhY2tcIi8udGVzdChsaW5lKSkge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IC9eKFxccypcInN0YWNrXCI6KVxccyooXCIuKlwiKSw/JC8uZXhlYyhsaW5lKVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGNvbnN0IGluZGVudFNpemUgPSAvXlxccyovLmV4ZWMobGluZSlbMF0ubGVuZ3RoICsgNFxuICAgICAgICBjb25zdCBpbmRlbnRhdGlvbiA9ICcgJy5yZXBlYXQoaW5kZW50U2l6ZSlcbiAgICAgICAgY29uc3Qgc3RhY2tNZXNzYWdlID0gbWF0Y2hlc1syXVxuICAgICAgICByZXN1bHQgKz0gbWF0Y2hlc1sxXSArIGVvbCArIGluZGVudGF0aW9uICsgSlNPTi5wYXJzZShzdGFja01lc3NhZ2UpLnJlcGxhY2UoL1xcbi9nLCBlb2wgKyBpbmRlbnRhdGlvbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBsaW5lXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSBsaW5lXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByZXR0aWZ5T2JqZWN0XG5cbmNvbnN0IHtcbiAgTE9HR0VSX0tFWVNcbn0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG5jb25zdCBzdHJpbmdpZnlTYWZlID0gcmVxdWlyZSgnZmFzdC1zYWZlLXN0cmluZ2lmeScpXG5jb25zdCBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gPSByZXF1aXJlKCcuL2pvaW4tbGluZXMtd2l0aC1pbmRlbnRhdGlvbicpXG5jb25zdCBwcmV0dGlmeUVycm9yID0gcmVxdWlyZSgnLi9wcmV0dGlmeS1lcnJvcicpXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlPYmplY3RQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIG9iamVjdCB0byBwcmV0dGlmeS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2V4Y2x1ZGVMb2dnZXJLZXlzXSBJbmRpY2F0ZXMgaWYga25vd24gbG9nZ2VyIHNwZWNpZmljXG4gKiBrZXlzIHNob3VsZCBiZSBleGNsdWRlZCBmcm9tIHByZXR0aWZpY2F0aW9uLiBEZWZhdWx0OiBgdHJ1ZWAuXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBbc2tpcEtleXNdIEEgc2V0IG9mIG9iamVjdCBrZXlzIHRvIGV4Y2x1ZGUgZnJvbSB0aGVcbiAqICAqIHByZXR0aWZpZWQgcmVzdWx0LiBEZWZhdWx0OiBgW11gLlxuICogQHByb3BlcnR5IHtQcmV0dHlDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IG9iamVjdCBidWlsdCBmcm9tIHBhcnNpbmdcbiAqIHRoZSBvcHRpb25zLlxuICovXG5cbi8qKlxuICogUHJldHRpZmllcyBhIHN0YW5kYXJkIG9iamVjdC4gU3BlY2lhbCBjYXJlIGlzIHRha2VuIHdoZW4gcHJvY2Vzc2luZyB0aGUgb2JqZWN0XG4gKiB0byBoYW5kbGUgY2hpbGQgb2JqZWN0cyB0aGF0IGFyZSBhdHRhY2hlZCB0byBrZXlzIGtub3duIHRvIGNvbnRhaW4gZXJyb3JcbiAqIG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHtQcmV0dGlmeU9iamVjdFBhcmFtc30gaW5wdXRcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcHJldHRpZmllZCBzdHJpbmcuIFRoaXMgY2FuIGJlIGFzIGxpdHRsZSBhcyBgJydgIGlmXG4gKiB0aGVyZSB3YXMgbm90aGluZyB0byBwcmV0dGlmeS5cbiAqL1xuZnVuY3Rpb24gcHJldHRpZnlPYmplY3QgKHtcbiAgbG9nLFxuICBleGNsdWRlTG9nZ2VyS2V5cyA9IHRydWUsXG4gIHNraXBLZXlzID0gW10sXG4gIGNvbnRleHRcbn0pIHtcbiAgY29uc3Qge1xuICAgIEVPTDogZW9sLFxuICAgIElERU5UOiBpZGVudCxcbiAgICBjdXN0b21QcmV0dGlmaWVycyxcbiAgICBlcnJvckxpa2VPYmplY3RLZXlzOiBlcnJvckxpa2VLZXlzLFxuICAgIG9iamVjdENvbG9yaXplcixcbiAgICBzaW5nbGVMaW5lLFxuICAgIGNvbG9yaXplclxuICB9ID0gY29udGV4dFxuICBjb25zdCBrZXlzVG9JZ25vcmUgPSBbXS5jb25jYXQoc2tpcEtleXMpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGV4Y2x1ZGVMb2dnZXJLZXlzID09PSB0cnVlKSBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShrZXlzVG9JZ25vcmUsIExPR0dFUl9LRVlTKVxuXG4gIGxldCByZXN1bHQgPSAnJ1xuXG4gIC8vIFNwbGl0IG9iamVjdCBrZXlzIGludG8gdHdvIGNhdGVnb3JpZXM6IGVycm9yIGFuZCBub24tZXJyb3JcbiAgY29uc3QgeyBwbGFpbiwgZXJyb3JzIH0gPSBPYmplY3QuZW50cmllcyhsb2cpLnJlZHVjZSgoeyBwbGFpbiwgZXJyb3JzIH0sIFtrLCB2XSkgPT4ge1xuICAgIGlmIChrZXlzVG9JZ25vcmUuaW5jbHVkZXMoaykgPT09IGZhbHNlKSB7XG4gICAgICAvLyBQcmUtYXBwbHkgY3VzdG9tIHByZXR0aWZpZXJzLCBiZWNhdXNlIGFsbCAzIGNhc2VzIGJlbG93IHdpbGwgbmVlZCB0aGlzXG4gICAgICBjb25zdCBwcmV0dHkgPSB0eXBlb2YgY3VzdG9tUHJldHRpZmllcnNba10gPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBjdXN0b21QcmV0dGlmaWVyc1trXSh2LCBrLCBsb2csIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgICAgIDogdlxuICAgICAgaWYgKGVycm9yTGlrZUtleXMuaW5jbHVkZXMoaykpIHtcbiAgICAgICAgZXJyb3JzW2tdID0gcHJldHR5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGFpbltrXSA9IHByZXR0eVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBwbGFpbiwgZXJyb3JzIH1cbiAgfSwgeyBwbGFpbjoge30sIGVycm9yczoge30gfSlcblxuICBpZiAoc2luZ2xlTGluZSkge1xuICAgIC8vIFN0cmluZ2lmeSB0aGUgZW50aXJlIG9iamVjdCBhcyBhIHNpbmdsZSBKU09OIGxpbmVcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChPYmplY3Qua2V5cyhwbGFpbikubGVuZ3RoID4gMCkge1xuICAgICAgcmVzdWx0ICs9IG9iamVjdENvbG9yaXplci5ncmV5TWVzc2FnZShzdHJpbmdpZnlTYWZlKHBsYWluKSlcbiAgICB9XG4gICAgcmVzdWx0ICs9IGVvbFxuICAgIC8vIEF2b2lkIHByaW50aW5nIHRoZSBlc2NhcGUgY2hhcmFjdGVyIG9uIGVzY2FwZWQgYmFja3NsYXNoZXMuXG4gICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcXFxcXFxcL2dpLCAnXFxcXCcpXG4gIH0gZWxzZSB7XG4gICAgLy8gUHV0IGVhY2ggb2JqZWN0IGVudHJ5IG9uIGl0cyBvd24gbGluZVxuICAgIE9iamVjdC5lbnRyaWVzKHBsYWluKS5mb3JFYWNoKChba2V5TmFtZSwga2V5VmFsdWVdKSA9PiB7XG4gICAgICAvLyBjdXN0b20gcHJldHRpZmllcnMgYXJlIGFscmVhZHkgYXBwbGllZCBhYm92ZSwgc28gd2UgY2FuIHNraXAgaXQgbm93XG4gICAgICBsZXQgbGluZXMgPSB0eXBlb2YgY3VzdG9tUHJldHRpZmllcnNba2V5TmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBrZXlWYWx1ZVxuICAgICAgICA6IHN0cmluZ2lmeVNhZmUoa2V5VmFsdWUsIG51bGwsIDIpXG5cbiAgICAgIGlmIChsaW5lcyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgLy8gQXZvaWQgcHJpbnRpbmcgdGhlIGVzY2FwZSBjaGFyYWN0ZXIgb24gZXNjYXBlZCBiYWNrc2xhc2hlcy5cbiAgICAgIGxpbmVzID0gbGluZXMucmVwbGFjZSgvXFxcXFxcXFwvZ2ksICdcXFxcJylcblxuICAgICAgY29uc3Qgam9pbmVkTGluZXMgPSBqb2luTGluZXNXaXRoSW5kZW50YXRpb24oeyBpbnB1dDogbGluZXMsIGlkZW50LCBlb2wgfSlcbiAgICAgIHJlc3VsdCArPSBgJHtpZGVudH0ke2tleU5hbWV9OiR7am9pbmVkTGluZXMuc3RhcnRzV2l0aChlb2wpID8gJycgOiAnICd9JHtqb2luZWRMaW5lc30ke2VvbH1gXG4gICAgfSlcbiAgfVxuXG4gIC8vIEVycm9yc1xuICBPYmplY3QuZW50cmllcyhlcnJvcnMpLmZvckVhY2goKFtrZXlOYW1lLCBrZXlWYWx1ZV0pID0+IHtcbiAgICAvLyBjdXN0b20gcHJldHRpZmllcnMgYXJlIGFscmVhZHkgYXBwbGllZCBhYm92ZSwgc28gd2UgY2FuIHNraXAgaXQgbm93XG4gICAgY29uc3QgbGluZXMgPSB0eXBlb2YgY3VzdG9tUHJldHRpZmllcnNba2V5TmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgID8ga2V5VmFsdWVcbiAgICAgIDogc3RyaW5naWZ5U2FmZShrZXlWYWx1ZSwgbnVsbCwgMilcblxuICAgIGlmIChsaW5lcyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgIHJlc3VsdCArPSBwcmV0dGlmeUVycm9yKHsga2V5TmFtZSwgbGluZXMsIGVvbCwgaWRlbnQgfSlcbiAgfSlcblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHRpZnlFcnJvckxvZ1xuXG5jb25zdCB7XG4gIExPR0dFUl9LRVlTXG59ID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJylcblxuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpXG5jb25zdCBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gPSByZXF1aXJlKCcuL2pvaW4tbGluZXMtd2l0aC1pbmRlbnRhdGlvbicpXG5jb25zdCBwcmV0dGlmeU9iamVjdCA9IHJlcXVpcmUoJy4vcHJldHRpZnktb2JqZWN0JylcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQcmV0dGlmeUVycm9yTG9nUGFyYW1zXG4gKiBAcHJvcGVydHkge29iamVjdH0gbG9nIFRoZSBlcnJvciBsb2cgdG8gcHJldHRpZnkuXG4gKiBAcHJvcGVydHkge1ByZXR0eUNvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2JqZWN0IGJ1aWx0IGZyb20gcGFyc2luZ1xuICogdGhlIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBHaXZlbiBhIGxvZyBvYmplY3QgdGhhdCBoYXMgYSBgdHlwZTogJ0Vycm9yJ2Aga2V5LCBwcmV0dGlmeSB0aGUgb2JqZWN0IGFuZFxuICogcmV0dXJuIHRoZSByZXN1bHQuIEluIG90aGVyXG4gKlxuICogQHBhcmFtIHtQcmV0dGlmeUVycm9yTG9nUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUgcHJldHRpZmllZCBlcnJvciBsb2cuXG4gKi9cbmZ1bmN0aW9uIHByZXR0aWZ5RXJyb3JMb2cgKHsgbG9nLCBjb250ZXh0IH0pIHtcbiAgY29uc3Qge1xuICAgIEVPTDogZW9sLFxuICAgIElERU5UOiBpZGVudCxcbiAgICBlcnJvclByb3BzOiBlcnJvclByb3BlcnRpZXMsXG4gICAgbWVzc2FnZUtleVxuICB9ID0gY29udGV4dFxuICBjb25zdCBzdGFjayA9IGxvZy5zdGFja1xuICBjb25zdCBqb2luZWRMaW5lcyA9IGpvaW5MaW5lc1dpdGhJbmRlbnRhdGlvbih7IGlucHV0OiBzdGFjaywgaWRlbnQsIGVvbCB9KVxuICBsZXQgcmVzdWx0ID0gYCR7aWRlbnR9JHtqb2luZWRMaW5lc30ke2VvbH1gXG5cbiAgaWYgKGVycm9yUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZXhjbHVkZVByb3BlcnRpZXMgPSBMT0dHRVJfS0VZUy5jb25jYXQobWVzc2FnZUtleSwgJ3R5cGUnLCAnc3RhY2snKVxuICAgIGxldCBwcm9wZXJ0aWVzVG9QcmludFxuICAgIGlmIChlcnJvclByb3BlcnRpZXNbMF0gPT09ICcqJykge1xuICAgICAgLy8gUHJpbnQgYWxsIHNpYmxpbmcgcHJvcGVydGllcyBleGNlcHQgZm9yIHRoZSBzdGFuZGFyZCBleGNsdXNpb25zLlxuICAgICAgcHJvcGVydGllc1RvUHJpbnQgPSBPYmplY3Qua2V5cyhsb2cpLmZpbHRlcihrID0+IGV4Y2x1ZGVQcm9wZXJ0aWVzLmluY2x1ZGVzKGspID09PSBmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUHJpbnQgb25seSBzcGVjaWZpZWQgcHJvcGVydGllcyB1bmxlc3MgdGhlIHByb3BlcnR5IGlzIGEgc3RhbmRhcmQgZXhjbHVzaW9uLlxuICAgICAgcHJvcGVydGllc1RvUHJpbnQgPSBlcnJvclByb3BlcnRpZXMuZmlsdGVyKGsgPT4gZXhjbHVkZVByb3BlcnRpZXMuaW5jbHVkZXMoaykgPT09IGZhbHNlKVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllc1RvUHJpbnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGtleSA9IHByb3BlcnRpZXNUb1ByaW50W2ldXG4gICAgICBpZiAoa2V5IGluIGxvZyA9PT0gZmFsc2UpIGNvbnRpbnVlXG4gICAgICBpZiAoaXNPYmplY3QobG9nW2tleV0pKSB7XG4gICAgICAgIC8vIFRoZSBuZXN0ZWQgb2JqZWN0IG1heSBoYXZlIFwibG9nZ2VyXCIgdHlwZSBrZXlzIGJ1dCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgICAgLy8gYXQgdGhlIHJvb3QgbGV2ZWwgb2YgdGhlIG9iamVjdCBiZWluZyBwcm9jZXNzZWQsIHdlIHdhbnQgdG8gcHJpbnQgdGhlbS5cbiAgICAgICAgLy8gVGh1cywgd2UgaW52b2tlIHdpdGggYGV4Y2x1ZGVMb2dnZXJLZXlzOiBmYWxzZWAuXG4gICAgICAgIGNvbnN0IHByZXR0aWZpZWRPYmplY3QgPSBwcmV0dGlmeU9iamVjdCh7XG4gICAgICAgICAgbG9nOiBsb2dba2V5XSxcbiAgICAgICAgICBleGNsdWRlTG9nZ2VyS2V5czogZmFsc2UsXG4gICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgIElERU5UOiBpZGVudCArIGlkZW50XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXN1bHQgPSBgJHtyZXN1bHR9JHtpZGVudH0ke2tleX06IHske2VvbH0ke3ByZXR0aWZpZWRPYmplY3R9JHtpZGVudH19JHtlb2x9YFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgcmVzdWx0ID0gYCR7cmVzdWx0fSR7aWRlbnR9JHtrZXl9OiAke2xvZ1trZXldfSR7ZW9sfWBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHRpZnlMZXZlbFxuXG5jb25zdCBnZXRQcm9wZXJ0eVZhbHVlID0gcmVxdWlyZSgnLi9nZXQtcHJvcGVydHktdmFsdWUnKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFByZXR0aWZ5TGV2ZWxQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3QuXG4gKiBAcHJvcGVydHkge1ByZXR0eUNvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2JqZWN0IGJ1aWx0IGZyb20gcGFyc2luZ1xuICogdGhlIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBpbiBsb2cgaGFzIGEgYGxldmVsYCB2YWx1ZSBhbmQgcmV0dXJucyBhIHByZXR0aWZpZWRcbiAqIHN0cmluZyBmb3IgdGhhdCBsZXZlbCBpZiBzby5cbiAqXG4gKiBAcGFyYW0ge1ByZXR0aWZ5TGV2ZWxQYXJhbXN9IGlucHV0XG4gKlxuICogQHJldHVybnMge3VuZGVmaW5lZHxzdHJpbmd9IElmIGBsb2dgIGRvZXMgbm90IGhhdmUgYSBgbGV2ZWxgIHByb3BlcnR5IHRoZW5cbiAqIGB1bmRlZmluZWRgIHdpbGwgYmUgcmV0dXJuZWQuIE90aGVyd2lzZSwgYSBzdHJpbmcgZnJvbSB0aGUgc3BlY2lmaWVkXG4gKiBgY29sb3JpemVyYCBpcyByZXR1cm5lZC5cbiAqL1xuZnVuY3Rpb24gcHJldHRpZnlMZXZlbCAoeyBsb2csIGNvbnRleHQgfSkge1xuICBjb25zdCB7XG4gICAgY29sb3JpemVyLFxuICAgIGN1c3RvbUxldmVscyxcbiAgICBjdXN0b21MZXZlbE5hbWVzLFxuICAgIGxldmVsS2V5LFxuICAgIGdldExldmVsTGFiZWxEYXRhXG4gIH0gPSBjb250ZXh0XG4gIGNvbnN0IHByZXR0aWZpZXIgPSBjb250ZXh0LmN1c3RvbVByZXR0aWZpZXJzPy5sZXZlbFxuICBjb25zdCBvdXRwdXQgPSBnZXRQcm9wZXJ0eVZhbHVlKGxvZywgbGV2ZWxLZXkpXG4gIGlmIChvdXRwdXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICBjb25zdCBsYWJlbENvbG9yaXplZCA9IGNvbG9yaXplcihvdXRwdXQsIHsgY3VzdG9tTGV2ZWxzLCBjdXN0b21MZXZlbE5hbWVzIH0pXG4gIGlmIChwcmV0dGlmaWVyKSB7XG4gICAgY29uc3QgW2xhYmVsXSA9IGdldExldmVsTGFiZWxEYXRhKG91dHB1dClcbiAgICByZXR1cm4gcHJldHRpZmllcihvdXRwdXQsIGxldmVsS2V5LCBsb2csIHsgbGFiZWwsIGxhYmVsQ29sb3JpemVkLCBjb2xvcnM6IGNvbG9yaXplci5jb2xvcnMgfSlcbiAgfVxuICByZXR1cm4gbGFiZWxDb2xvcml6ZWRcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBwcmV0dGlmeU1lc3NhZ2VcblxuY29uc3Qge1xuICBMRVZFTFNcbn0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG5jb25zdCBnZXRQcm9wZXJ0eVZhbHVlID0gcmVxdWlyZSgnLi9nZXQtcHJvcGVydHktdmFsdWUnKVxuY29uc3QgaW50ZXJwcmV0Q29uZGl0aW9uYWxzID0gcmVxdWlyZSgnLi9pbnRlcnByZXQtY29uZGl0aW9uYWxzJylcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQcmV0dGlmeU1lc3NhZ2VQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3Qgd2l0aCB0aGUgbWVzc2FnZSB0byBjb2xvcml6ZS5cbiAqIEBwcm9wZXJ0eSB7UHJldHR5Q29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgYnVpbHQgZnJvbSBwYXJzaW5nXG4gKiB0aGUgb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIFByZXR0aWZpZXMgYSBtZXNzYWdlIHN0cmluZyBpZiB0aGUgZ2l2ZW4gYGxvZ2AgaGFzIGEgbWVzc2FnZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1ByZXR0aWZ5TWVzc2FnZVBhcmFtc30gaW5wdXRcbiAqXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfHN0cmluZ30gSWYgdGhlIG1lc3NhZ2Uga2V5IGlzIG5vdCBmb3VuZCwgb3IgdGhlIG1lc3NhZ2VcbiAqIGtleSBpcyBub3QgYSBzdHJpbmcsIHRoZW4gYHVuZGVmaW5lZGAgd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhIHN0cmluZ1xuICogdGhhdCBpcyB0aGUgcHJldHRpZmllZCBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBwcmV0dGlmeU1lc3NhZ2UgKHsgbG9nLCBjb250ZXh0IH0pIHtcbiAgY29uc3Qge1xuICAgIGNvbG9yaXplcixcbiAgICBjdXN0b21MZXZlbHMsXG4gICAgbGV2ZWxLZXksXG4gICAgbGV2ZWxMYWJlbCxcbiAgICBtZXNzYWdlRm9ybWF0LFxuICAgIG1lc3NhZ2VLZXksXG4gICAgdXNlT25seUN1c3RvbVByb3BzXG4gIH0gPSBjb250ZXh0XG4gIGlmIChtZXNzYWdlRm9ybWF0ICYmIHR5cGVvZiBtZXNzYWdlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHBhcnNlZE1lc3NhZ2VGb3JtYXQgPSBpbnRlcnByZXRDb25kaXRpb25hbHMobWVzc2FnZUZvcm1hdCwgbG9nKVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IFN0cmluZyhwYXJzZWRNZXNzYWdlRm9ybWF0KS5yZXBsYWNlKFxuICAgICAgL3soW157fV0rKX0vZyxcbiAgICAgIGZ1bmN0aW9uIChtYXRjaCwgcDEpIHtcbiAgICAgICAgLy8gcmV0dXJuIGxvZyBsZXZlbCBhcyBzdHJpbmcgaW5zdGVhZCBvZiBpbnRcbiAgICAgICAgbGV0IGxldmVsXG4gICAgICAgIGlmIChwMSA9PT0gbGV2ZWxMYWJlbCAmJiAobGV2ZWwgPSBnZXRQcm9wZXJ0eVZhbHVlKGxvZywgbGV2ZWxLZXkpKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgY29uZGl0aW9uID0gdXNlT25seUN1c3RvbVByb3BzID8gY3VzdG9tTGV2ZWxzID09PSB1bmRlZmluZWQgOiBjdXN0b21MZXZlbHNbbGV2ZWxdID09PSB1bmRlZmluZWRcbiAgICAgICAgICByZXR1cm4gY29uZGl0aW9uID8gTEVWRUxTW2xldmVsXSA6IGN1c3RvbUxldmVsc1tsZXZlbF1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBhcnNlIG5lc3RlZCBrZXkgYWNjZXNzLCBlLmcuIGB7a2V5QS5zdWJLZXlCfWAuXG4gICAgICAgIHJldHVybiBnZXRQcm9wZXJ0eVZhbHVlKGxvZywgcDEpIHx8ICcnXG4gICAgICB9KVxuICAgIHJldHVybiBjb2xvcml6ZXIubWVzc2FnZShtZXNzYWdlKVxuICB9XG4gIGlmIChtZXNzYWdlRm9ybWF0ICYmIHR5cGVvZiBtZXNzYWdlRm9ybWF0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgbXNnID0gbWVzc2FnZUZvcm1hdChsb2csIG1lc3NhZ2VLZXksIGxldmVsTGFiZWwsIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgcmV0dXJuIGNvbG9yaXplci5tZXNzYWdlKG1zZylcbiAgfVxuICBpZiAobWVzc2FnZUtleSBpbiBsb2cgPT09IGZhbHNlKSByZXR1cm4gdW5kZWZpbmVkXG4gIGlmICh0eXBlb2YgbG9nW21lc3NhZ2VLZXldICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgbG9nW21lc3NhZ2VLZXldICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgbG9nW21lc3NhZ2VLZXldICE9PSAnYm9vbGVhbicpIHJldHVybiB1bmRlZmluZWRcbiAgcmV0dXJuIGNvbG9yaXplci5tZXNzYWdlKGxvZ1ttZXNzYWdlS2V5XSlcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBwcmV0dGlmeU1ldGFkYXRhXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlNZXRhZGF0YVBhcmFtc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGxvZyBUaGUgbG9nIHRoYXQgbWF5IG9yIG1heSBub3QgY29udGFpbiBtZXRhZGF0YSB0b1xuICogYmUgcHJldHRpZmllZC5cbiAqIEBwcm9wZXJ0eSB7UHJldHR5Q29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgYnVpbHQgZnJvbSBwYXJzaW5nXG4gKiB0aGUgb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIFByZXR0aWZpZXMgbWV0YWRhdGEgdGhhdCBpcyB1c3VhbGx5IHByZXNlbnQgaW4gYSBQaW5vIGxvZyBsaW5lLiBJdCBsb29rcyBmb3JcbiAqIGZpZWxkcyBgbmFtZWAsIGBwaWRgLCBgaG9zdG5hbWVgLCBhbmQgYGNhbGxlcmAgYW5kIHJldHVybnMgYSBmb3JtYXR0ZWQgc3RyaW5nIHVzaW5nXG4gKiB0aGUgZmllbGRzIGl0IGZpbmRzLlxuICpcbiAqIEBwYXJhbSB7UHJldHRpZnlNZXRhZGF0YVBhcmFtc30gaW5wdXRcbiAqXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfHN0cmluZ30gSWYgbm8gbWV0YWRhdGEgaXMgZm91bmQgdGhlbiBgdW5kZWZpbmVkYCBpc1xuICogcmV0dXJuZWQuIE90aGVyd2lzZSwgYSBzdHJpbmcgb2YgcHJldHRpZmllZCBtZXRhZGF0YSBpcyByZXR1cm5lZC5cbiAqL1xuZnVuY3Rpb24gcHJldHRpZnlNZXRhZGF0YSAoeyBsb2csIGNvbnRleHQgfSkge1xuICBjb25zdCB7IGN1c3RvbVByZXR0aWZpZXJzOiBwcmV0dGlmaWVycywgY29sb3JpemVyIH0gPSBjb250ZXh0XG4gIGxldCBsaW5lID0gJydcblxuICBpZiAobG9nLm5hbWUgfHwgbG9nLnBpZCB8fCBsb2cuaG9zdG5hbWUpIHtcbiAgICBsaW5lICs9ICcoJ1xuXG4gICAgaWYgKGxvZy5uYW1lKSB7XG4gICAgICBsaW5lICs9IHByZXR0aWZpZXJzLm5hbWVcbiAgICAgICAgPyBwcmV0dGlmaWVycy5uYW1lKGxvZy5uYW1lLCAnbmFtZScsIGxvZywgeyBjb2xvcnM6IGNvbG9yaXplci5jb2xvcnMgfSlcbiAgICAgICAgOiBsb2cubmFtZVxuICAgIH1cblxuICAgIGlmIChsb2cucGlkKSB7XG4gICAgICBjb25zdCBwcmV0dHlQaWQgPSBwcmV0dGlmaWVycy5waWRcbiAgICAgICAgPyBwcmV0dGlmaWVycy5waWQobG9nLnBpZCwgJ3BpZCcsIGxvZywgeyBjb2xvcnM6IGNvbG9yaXplci5jb2xvcnMgfSlcbiAgICAgICAgOiBsb2cucGlkXG4gICAgICBpZiAobG9nLm5hbWUgJiYgbG9nLnBpZCkge1xuICAgICAgICBsaW5lICs9ICcvJyArIHByZXR0eVBpZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluZSArPSBwcmV0dHlQaWRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobG9nLmhvc3RuYW1lKSB7XG4gICAgICAvLyBJZiBgcGlkYCBhbmQgYG5hbWVgIHdlcmUgaW4gdGhlIGlnbm9yZSBrZXlzIGxpc3QgdGhlbiB3ZSBkb24ndCBuZWVkXG4gICAgICAvLyB0aGUgbGVhZGluZyBzcGFjZS5cbiAgICAgIGNvbnN0IHByZXR0eUhvc3RuYW1lID0gcHJldHRpZmllcnMuaG9zdG5hbWVcbiAgICAgICAgPyBwcmV0dGlmaWVycy5ob3N0bmFtZShsb2cuaG9zdG5hbWUsICdob3N0bmFtZScsIGxvZywgeyBjb2xvcnM6IGNvbG9yaXplci5jb2xvcnMgfSlcbiAgICAgICAgOiBsb2cuaG9zdG5hbWVcblxuICAgICAgbGluZSArPSBgJHtsaW5lID09PSAnKCcgPyAnb24nIDogJyBvbid9ICR7cHJldHR5SG9zdG5hbWV9YFxuICAgIH1cblxuICAgIGxpbmUgKz0gJyknXG4gIH1cblxuICBpZiAobG9nLmNhbGxlcikge1xuICAgIGNvbnN0IHByZXR0eUNhbGxlciA9IHByZXR0aWZpZXJzLmNhbGxlclxuICAgICAgPyBwcmV0dGlmaWVycy5jYWxsZXIobG9nLmNhbGxlciwgJ2NhbGxlcicsIGxvZywgeyBjb2xvcnM6IGNvbG9yaXplci5jb2xvcnMgfSlcbiAgICAgIDogbG9nLmNhbGxlclxuXG4gICAgbGluZSArPSBgJHtsaW5lID09PSAnJyA/ICcnIDogJyAnfTwke3ByZXR0eUNhbGxlcn0+YFxuICB9XG5cbiAgaWYgKGxpbmUgPT09ICcnKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaW5lXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBwcmV0dGlmeVRpbWVcblxuY29uc3QgZm9ybWF0VGltZSA9IHJlcXVpcmUoJy4vZm9ybWF0LXRpbWUnKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFByZXR0aWZ5VGltZVBhcmFtc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGxvZyBUaGUgbG9nIG9iamVjdCB3aXRoIHRoZSB0aW1lc3RhbXAgdG8gYmUgcHJldHRpZmllZC5cbiAqIEBwcm9wZXJ0eSB7UHJldHR5Q29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgYnVpbHQgZnJvbSBwYXJzaW5nXG4gKiB0aGUgb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIFByZXR0aWZpZXMgYSB0aW1lc3RhbXAgaWYgdGhlIGdpdmVuIGBsb2dgIGhhcyBlaXRoZXIgYHRpbWVgLCBgdGltZXN0YW1wYCBvciBjdXN0b20gc3BlY2lmaWVkIHRpbWVzdGFtcFxuICogcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtQcmV0dGlmeVRpbWVQYXJhbXN9IGlucHV0XG4gKlxuICogQHJldHVybnMge3VuZGVmaW5lZHxzdHJpbmd9IElmIGEgdGltZXN0YW1wIHByb3BlcnR5IGNhbm5vdCBiZSBmb3VuZCB0aGVuXG4gKiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCB0aGUgcHJldHRpZmllZCB0aW1lIGlzIHJldHVybmVkIGFzIGFcbiAqIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gcHJldHRpZnlUaW1lICh7IGxvZywgY29udGV4dCB9KSB7XG4gIGNvbnN0IHtcbiAgICB0aW1lc3RhbXBLZXksXG4gICAgdHJhbnNsYXRlVGltZTogdHJhbnNsYXRlRm9ybWF0XG4gIH0gPSBjb250ZXh0XG4gIGNvbnN0IHByZXR0aWZpZXIgPSBjb250ZXh0LmN1c3RvbVByZXR0aWZpZXJzPy50aW1lXG4gIGxldCB0aW1lID0gbnVsbFxuXG4gIGlmICh0aW1lc3RhbXBLZXkgaW4gbG9nKSB7XG4gICAgdGltZSA9IGxvZ1t0aW1lc3RhbXBLZXldXG4gIH0gZWxzZSBpZiAoJ3RpbWVzdGFtcCcgaW4gbG9nKSB7XG4gICAgdGltZSA9IGxvZy50aW1lc3RhbXBcbiAgfVxuXG4gIGlmICh0aW1lID09PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IG91dHB1dCA9IHRyYW5zbGF0ZUZvcm1hdCA/IGZvcm1hdFRpbWUodGltZSwgdHJhbnNsYXRlRm9ybWF0KSA6IHRpbWVcblxuICByZXR1cm4gcHJldHRpZmllciA/IHByZXR0aWZpZXIob3V0cHV0KSA6IGBbJHtvdXRwdXR9XWBcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJ1aWxkU2FmZVNvbmljQm9vbTogcmVxdWlyZSgnLi9idWlsZC1zYWZlLXNvbmljLWJvb20uanMnKSxcbiAgY3JlYXRlRGF0ZTogcmVxdWlyZSgnLi9jcmVhdGUtZGF0ZS5qcycpLFxuICBkZWxldGVMb2dQcm9wZXJ0eTogcmVxdWlyZSgnLi9kZWxldGUtbG9nLXByb3BlcnR5LmpzJyksXG4gIGZpbHRlckxvZzogcmVxdWlyZSgnLi9maWx0ZXItbG9nLmpzJyksXG4gIGZvcm1hdFRpbWU6IHJlcXVpcmUoJy4vZm9ybWF0LXRpbWUuanMnKSxcbiAgZ2V0UHJvcGVydHlWYWx1ZTogcmVxdWlyZSgnLi9nZXQtcHJvcGVydHktdmFsdWUuanMnKSxcbiAgaGFuZGxlQ3VzdG9tTGV2ZWxzTmFtZXNPcHRzOiByZXF1aXJlKCcuL2hhbmRsZS1jdXN0b20tbGV2ZWxzLW5hbWVzLW9wdHMuanMnKSxcbiAgaGFuZGxlQ3VzdG9tTGV2ZWxzT3B0czogcmVxdWlyZSgnLi9oYW5kbGUtY3VzdG9tLWxldmVscy1vcHRzLmpzJyksXG4gIGludGVycHJldENvbmRpdGlvbmFsczogcmVxdWlyZSgnLi9pbnRlcnByZXQtY29uZGl0aW9uYWxzLmpzJyksXG4gIGlzT2JqZWN0OiByZXF1aXJlKCcuL2lzLW9iamVjdC5qcycpLFxuICBpc1ZhbGlkRGF0ZTogcmVxdWlyZSgnLi9pcy12YWxpZC1kYXRlLmpzJyksXG4gIGpvaW5MaW5lc1dpdGhJbmRlbnRhdGlvbjogcmVxdWlyZSgnLi9qb2luLWxpbmVzLXdpdGgtaW5kZW50YXRpb24uanMnKSxcbiAgbm9vcDogcmVxdWlyZSgnLi9ub29wLmpzJyksXG4gIHBhcnNlRmFjdG9yeU9wdGlvbnM6IHJlcXVpcmUoJy4vcGFyc2UtZmFjdG9yeS1vcHRpb25zLmpzJyksXG4gIHByZXR0aWZ5RXJyb3JMb2c6IHJlcXVpcmUoJy4vcHJldHRpZnktZXJyb3ItbG9nLmpzJyksXG4gIHByZXR0aWZ5RXJyb3I6IHJlcXVpcmUoJy4vcHJldHRpZnktZXJyb3IuanMnKSxcbiAgcHJldHRpZnlMZXZlbDogcmVxdWlyZSgnLi9wcmV0dGlmeS1sZXZlbC5qcycpLFxuICBwcmV0dGlmeU1lc3NhZ2U6IHJlcXVpcmUoJy4vcHJldHRpZnktbWVzc2FnZS5qcycpLFxuICBwcmV0dGlmeU1ldGFkYXRhOiByZXF1aXJlKCcuL3ByZXR0aWZ5LW1ldGFkYXRhLmpzJyksXG4gIHByZXR0aWZ5T2JqZWN0OiByZXF1aXJlKCcuL3ByZXR0aWZ5LW9iamVjdC5qcycpLFxuICBwcmV0dGlmeVRpbWU6IHJlcXVpcmUoJy4vcHJldHRpZnktdGltZS5qcycpLFxuICBzcGxpdFByb3BlcnR5S2V5OiByZXF1aXJlKCcuL3NwbGl0LXByb3BlcnR5LWtleS5qcycpLFxuICBnZXRMZXZlbExhYmVsRGF0YTogcmVxdWlyZSgnLi9nZXQtbGV2ZWwtbGFiZWwtZGF0YScpXG59XG5cbi8vIFRoZSByZW1haW5kZXIgb2YgdGhpcyBmaWxlIGNvbnNpc3RzIG9mIGpzZG9jIGJsb2NrcyB0aGF0IGFyZSBkaWZmaWN1bHQgdG9cbi8vIGRldGVybWluZSBhIG1vcmUgYXBwcm9wcmlhdGUgXCJob21lXCIgZm9yLiBBcyBhbiBleGFtcGxlLCB0aGUgYmxvY2tzIGFzc29jaWF0ZWRcbi8vIHdpdGggY3VzdG9tIHByZXR0aWZpZXJzIGNvdWxkIGxpdmUgaW4gZWl0aGVyIHRoZSBgcHJldHRpZnktbGV2ZWxgLFxuLy8gYHByZXR0aWZ5LW1ldGFkYXRhYCwgb3IgYHByZXR0aWZ5LXRpbWVgIGZpbGVzIHNpbmNlIHRoZXkgYXJlIHRoZSBwcmltYXJ5XG4vLyBmaWxlcyB3aGVyZSBzdWNoIGNvZGUgaXMgdXNlZC4gQnV0IHdlIHdhbnQgYSBjZW50cmFsIHBsYWNlIHRvIGRlZmluZSBjb21tb25cbi8vIGRvYyBibG9ja3MsIHNvIHdlIGFyZSBwaWNraW5nIHRoaXMgZmlsZSBhcyB0aGUgYW5zd2VyLlxuXG4vKipcbiAqIEEgaGFzaCBvZiBsb2cgcHJvcGVydHkgbmFtZXMgbWFwcGVkIHRvIHByZXR0aWZpZXIgZnVuY3Rpb25zLiBXaGVuIHRoZVxuICogaW5jb21pbmcgbG9nIGRhdGEgaXMgYmVpbmcgcHJvY2Vzc2VkIGZvciBwcmV0dGlmaWNhdGlvbiwgYW55IGtleSBvbiB0aGUgbG9nXG4gKiB0aGF0IG1hdGNoZXMgYSBrZXkgaW4gYSBjdXN0b20gcHJldHRpZmllcnMgaGFzaCB3aWxsIGJlIHByZXR0aWZpZWQgdXNpbmdcbiAqIHRoYXQgbWF0Y2hpbmcgY3VzdG9tIHByZXR0aWZpZXIuIFRoZSB2YWx1ZSBwYXNzZWQgdG8gdGhlIGN1c3RvbSBwcmV0dGlmaWVyXG4gKiB3aWxsIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgbG9nIGtleS5cbiAqXG4gKiBUaGUgaGFzaCBtYXkgY29udGFpbiBhbnkgYXJiaXRyYXJ5IGtleXMgZm9yIGFyYml0cmFyeSBsb2cgcHJvcGVydGllcywgYnV0IGl0XG4gKiBtYXkgYWxzbyBjb250YWluIGEgc2V0IG9mIHByZWRlZmluZWQga2V5IG5hbWVzIHRoYXQgbWFwIHRvIHdlbGwta25vd24gbG9nXG4gKiBwcm9wZXJ0aWVzLiBUaGVzZSBrZXlzIGFyZTpcbiAqXG4gKiArIGB0aW1lYCAoZm9yIHRoZSB0aW1lc3RhbXAgZmllbGQpXG4gKiArIGBsZXZlbGAgKGZvciB0aGUgbGV2ZWwgbGFiZWwgZmllbGQ7IHZhbHVlIG1heSBiZSBhIGxldmVsIG51bWJlciBpbnN0ZWFkXG4gKiBvZiBhIGxldmVsIGxhYmVsKVxuICogKyBgaG9zdG5hbWVgXG4gKiArIGBwaWRgXG4gKiArIGBuYW1lYFxuICogKyBgY2FsbGVyYFxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3QuPHN0cmluZywgQ3VzdG9tUHJldHRpZmllckZ1bmM+fSBDdXN0b21QcmV0dGlmaWVyc1xuICovXG5cbi8qKlxuICogQSBzeW5jaHJvbm91cyBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBwcmV0dGlmeWluZyBhIGxvZyBwcm9wZXJ0eS4gSXQgbXVzdFxuICogcmV0dXJuIGEgc3RyaW5nLlxuICpcbiAqIEB0eXBlZGVmIHtmdW5jdGlvbn0gQ3VzdG9tUHJldHRpZmllckZ1bmNcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSBUaGUgdmFsdWUgdG8gYmUgcHJldHRpZmllZCBmb3IgdGhlIGtleSBhc3NvY2lhdGVkIHdpdGhcbiAqIHRoZSBwcmV0dGlmaWVyLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG4vKipcbiAqIEEgdG9rZW5pemVkIHN0cmluZyB0aGF0IGluZGljYXRlcyBob3cgdGhlIHByZXR0aWZpZWQgbG9nIGxpbmUgc2hvdWxkIGJlXG4gKiBmb3JtYXR0ZWQuIFRva2VucyBhcmUgZWl0aGVyIGxvZyBwcm9wZXJ0aWVzIGVuY2xvc2VkIGluIGN1cmx5IGJyYWNlcywgZS5nLlxuICogYHtsZXZlbExhYmVsfWAsIGB7cGlkfWAsIG9yIGB7cmVxLnVybH1gLCBvciBjb25kaXRpb25hbCBkaXJlY3RpdmVzIGluIGN1cmx5XG4gKiBicmFjZXMuIFRoZSBvbmx5IGNvbmRpdGlvbmFsIGRpcmVjdGl2ZXMgc3VwcG9ydGVkIGFyZSBgaWZgIGFuZCBgZW5kYCwgZS5nLlxuICogYHtpZiBwaWR9e3BpZH17ZW5kfWA7IGV2ZXJ5IGBpZmAgbXVzdCBoYXZlIGEgbWF0Y2hpbmcgYGVuZGAuIE5lc3RlZFxuICogY29uZGl0aW9ucyBhcmUgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nfSBNZXNzYWdlRm9ybWF0U3RyaW5nXG4gKlxuICogQGV4YW1wbGVcbiAqIGB7bGV2ZWxMYWJlbH0gLSB7aWYgcGlkfXtwaWR9IC0ge2VuZH11cmw6e3JlcS51cmx9YFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlNZXNzYWdlRXh0cmFzXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29sb3JzIEF2YWlsYWJsZSBjb2xvciBmdW5jdGlvbnMgYmFzZWQgb24gYHVzZUNvbG9yYCAob3IgYGNvbG9yaXplYCkgY29udGV4dFxuICogdGhlIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIGxvZyBvYmplY3QsIG5hbWUgb2YgdGhlIG1lc3NhZ2Uga2V5LCBhbmQgbmFtZSBvZlxuICogdGhlIGxldmVsIGxhYmVsIGtleSBhbmQgcmV0dXJucyBhIGZvcm1hdHRlZCBsb2cgbGluZS5cbiAqXG4gKiBOb3RlOiB0aGlzIGZ1bmN0aW9uIG11c3QgYmUgc3luY2hyb25vdXMuXG4gKlxuICogQHR5cGVkZWYge2Z1bmN0aW9ufSBNZXNzYWdlRm9ybWF0RnVuY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3QgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VLZXkgVGhlIG5hbWUgb2YgdGhlIGtleSBpbiB0aGUgYGxvZ2Agb2JqZWN0IHRoYXRcbiAqIGNvbnRhaW5zIHRoZSBsb2cgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbExhYmVsIFRoZSBuYW1lIG9mIHRoZSBrZXkgaW4gdGhlIGBsb2dgIG9iamVjdCB0aGF0XG4gKiBjb250YWlucyB0aGUgbG9nIGxldmVsIG5hbWUuXG4gKiBAcGFyYW0ge1ByZXR0aWZ5TWVzc2FnZUV4dHJhc30gZXh0cmFzIEFkZGl0aW9uYWwgZGF0YSBhdmFpbGFibGUgZm9yIG1lc3NhZ2UgY29udGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gKGxvZywgbWVzc2FnZUtleSwgbGV2ZWxMYWJlbCkge1xuICogICByZXR1cm4gYCR7bG9nW2xldmVsTGFiZWxdfSAtICR7bG9nW21lc3NhZ2VLZXldfWBcbiAqIH1cbiAqL1xuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBoYXNCdWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJ1xuY29uc3Qgc3VzcGVjdFByb3RvUnggPSAvXCIoPzpffFxcXFx1MDA1W0ZmXSkoPzpffFxcXFx1MDA1W0ZmXSkoPzpwfFxcXFx1MDA3MCkoPzpyfFxcXFx1MDA3MikoPzpvfFxcXFx1MDA2W0ZmXSkoPzp0fFxcXFx1MDA3NCkoPzpvfFxcXFx1MDA2W0ZmXSkoPzpffFxcXFx1MDA1W0ZmXSkoPzpffFxcXFx1MDA1W0ZmXSlcIlxccyo6L1xuY29uc3Qgc3VzcGVjdENvbnN0cnVjdG9yUnggPSAvXCIoPzpjfFxcXFx1MDA2MykoPzpvfFxcXFx1MDA2W0ZmXSkoPzpufFxcXFx1MDA2W0VlXSkoPzpzfFxcXFx1MDA3MykoPzp0fFxcXFx1MDA3NCkoPzpyfFxcXFx1MDA3MikoPzp1fFxcXFx1MDA3NSkoPzpjfFxcXFx1MDA2MykoPzp0fFxcXFx1MDA3NCkoPzpvfFxcXFx1MDA2W0ZmXSkoPzpyfFxcXFx1MDA3MilcIlxccyo6L1xuXG5mdW5jdGlvbiBfcGFyc2UgKHRleHQsIHJldml2ZXIsIG9wdGlvbnMpIHtcbiAgLy8gTm9ybWFsaXplIGFyZ3VtZW50c1xuICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgaWYgKHJldml2ZXIgIT09IG51bGwgJiYgdHlwZW9mIHJldml2ZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gcmV2aXZlclxuICAgICAgcmV2aXZlciA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGlmIChoYXNCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKHRleHQpKSB7XG4gICAgdGV4dCA9IHRleHQudG9TdHJpbmcoKVxuICB9XG5cbiAgLy8gQk9NIGNoZWNrZXJcbiAgaWYgKHRleHQgJiYgdGV4dC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICB0ZXh0ID0gdGV4dC5zbGljZSgxKVxuICB9XG5cbiAgLy8gUGFyc2Ugbm9ybWFsbHksIGFsbG93aW5nIGV4Y2VwdGlvbnNcbiAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZSh0ZXh0LCByZXZpdmVyKVxuXG4gIC8vIElnbm9yZSBudWxsIGFuZCBub24tb2JqZWN0c1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9ialxuICB9XG5cbiAgY29uc3QgcHJvdG9BY3Rpb24gPSAob3B0aW9ucyAmJiBvcHRpb25zLnByb3RvQWN0aW9uKSB8fCAnZXJyb3InXG4gIGNvbnN0IGNvbnN0cnVjdG9yQWN0aW9uID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5jb25zdHJ1Y3RvckFjdGlvbikgfHwgJ2Vycm9yJ1xuXG4gIC8vIG9wdGlvbnM6ICdlcnJvcicgKGRlZmF1bHQpIC8gJ3JlbW92ZScgLyAnaWdub3JlJ1xuICBpZiAocHJvdG9BY3Rpb24gPT09ICdpZ25vcmUnICYmIGNvbnN0cnVjdG9yQWN0aW9uID09PSAnaWdub3JlJykge1xuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIGlmIChwcm90b0FjdGlvbiAhPT0gJ2lnbm9yZScgJiYgY29uc3RydWN0b3JBY3Rpb24gIT09ICdpZ25vcmUnKSB7XG4gICAgaWYgKHN1c3BlY3RQcm90b1J4LnRlc3QodGV4dCkgPT09IGZhbHNlICYmIHN1c3BlY3RDb25zdHJ1Y3RvclJ4LnRlc3QodGV4dCkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9IGVsc2UgaWYgKHByb3RvQWN0aW9uICE9PSAnaWdub3JlJyAmJiBjb25zdHJ1Y3RvckFjdGlvbiA9PT0gJ2lnbm9yZScpIHtcbiAgICBpZiAoc3VzcGVjdFByb3RvUngudGVzdCh0ZXh0KSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBvYmpcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHN1c3BlY3RDb25zdHJ1Y3RvclJ4LnRlc3QodGV4dCkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9XG5cbiAgLy8gU2NhbiByZXN1bHQgZm9yIHByb3RvIGtleXNcbiAgcmV0dXJuIGZpbHRlcihvYmosIHsgcHJvdG9BY3Rpb24sIGNvbnN0cnVjdG9yQWN0aW9uLCBzYWZlOiBvcHRpb25zICYmIG9wdGlvbnMuc2FmZSB9KVxufVxuXG5mdW5jdGlvbiBmaWx0ZXIgKG9iaiwgeyBwcm90b0FjdGlvbiA9ICdlcnJvcicsIGNvbnN0cnVjdG9yQWN0aW9uID0gJ2Vycm9yJywgc2FmZSB9ID0ge30pIHtcbiAgbGV0IG5leHQgPSBbb2JqXVxuXG4gIHdoaWxlIChuZXh0Lmxlbmd0aCkge1xuICAgIGNvbnN0IG5vZGVzID0gbmV4dFxuICAgIG5leHQgPSBbXVxuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBpZiAocHJvdG9BY3Rpb24gIT09ICdpZ25vcmUnICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCAnX19wcm90b19fJykpIHsgLy8gQXZvaWQgY2FsbGluZyBub2RlLmhhc093blByb3BlcnR5IGRpcmVjdGx5XG4gICAgICAgIGlmIChzYWZlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSBlbHNlIGlmIChwcm90b0FjdGlvbiA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignT2JqZWN0IGNvbnRhaW5zIGZvcmJpZGRlbiBwcm90b3R5cGUgcHJvcGVydHknKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG5vZGUuX19wcm90b19fIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnN0cnVjdG9yQWN0aW9uICE9PSAnaWdub3JlJyAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCAnY29uc3RydWN0b3InKSAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLmNvbnN0cnVjdG9yLCAncHJvdG90eXBlJykpIHsgLy8gQXZvaWQgY2FsbGluZyBub2RlLmhhc093blByb3BlcnR5IGRpcmVjdGx5XG4gICAgICAgIGlmIChzYWZlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvckFjdGlvbiA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignT2JqZWN0IGNvbnRhaW5zIGZvcmJpZGRlbiBwcm90b3R5cGUgcHJvcGVydHknKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG5vZGUuY29uc3RydWN0b3JcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG5vZGVba2V5XVxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG5leHQucHVzaCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIHBhcnNlICh0ZXh0LCByZXZpdmVyLCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0YWNrVHJhY2VMaW1pdCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdFxuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAwXG4gIHRyeSB7XG4gICAgcmV0dXJuIF9wYXJzZSh0ZXh0LCByZXZpdmVyLCBvcHRpb25zKVxuICB9IGZpbmFsbHkge1xuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IHN0YWNrVHJhY2VMaW1pdFxuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVQYXJzZSAodGV4dCwgcmV2aXZlcikge1xuICBjb25zdCBzdGFja1RyYWNlTGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXRcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMFxuICB0cnkge1xuICAgIHJldHVybiBfcGFyc2UodGV4dCwgcmV2aXZlciwgeyBzYWZlOiB0cnVlIH0pXG4gIH0gY2F0Y2ggKF9lKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBmaW5hbGx5IHtcbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBzdGFja1RyYWNlTGltaXRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLnNhZmVQYXJzZSA9IHNhZmVQYXJzZVxubW9kdWxlLmV4cG9ydHMuc2NhbiA9IGZpbHRlclxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByZXR0eVxuXG5jb25zdCBzanMgPSByZXF1aXJlKCdzZWN1cmUtanNvbi1wYXJzZScpXG5cbmNvbnN0IGlzT2JqZWN0ID0gcmVxdWlyZSgnLi91dGlscy9pcy1vYmplY3QnKVxuY29uc3QgcHJldHRpZnlFcnJvckxvZyA9IHJlcXVpcmUoJy4vdXRpbHMvcHJldHRpZnktZXJyb3ItbG9nJylcbmNvbnN0IHByZXR0aWZ5TGV2ZWwgPSByZXF1aXJlKCcuL3V0aWxzL3ByZXR0aWZ5LWxldmVsJylcbmNvbnN0IHByZXR0aWZ5TWVzc2FnZSA9IHJlcXVpcmUoJy4vdXRpbHMvcHJldHRpZnktbWVzc2FnZScpXG5jb25zdCBwcmV0dGlmeU1ldGFkYXRhID0gcmVxdWlyZSgnLi91dGlscy9wcmV0dGlmeS1tZXRhZGF0YScpXG5jb25zdCBwcmV0dGlmeU9iamVjdCA9IHJlcXVpcmUoJy4vdXRpbHMvcHJldHRpZnktb2JqZWN0JylcbmNvbnN0IHByZXR0aWZ5VGltZSA9IHJlcXVpcmUoJy4vdXRpbHMvcHJldHRpZnktdGltZScpXG5jb25zdCBmaWx0ZXJMb2cgPSByZXF1aXJlKCcuL3V0aWxzL2ZpbHRlci1sb2cnKVxuXG5jb25zdCB7XG4gIExFVkVMUyxcbiAgTEVWRUxfS0VZLFxuICBMRVZFTF9OQU1FU1xufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcblxuY29uc3QganNvblBhcnNlciA9IGlucHV0ID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyB2YWx1ZTogc2pzLnBhcnNlKGlucHV0LCB7IHByb3RvQWN0aW9uOiAncmVtb3ZlJyB9KSB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB7IGVyciB9XG4gIH1cbn1cblxuLyoqXG4gKiBPcmNoZXN0cmF0ZXMgcHJvY2Vzc2luZyB0aGUgcmVjZWl2ZWQgbG9nIGRhdGEgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlZFxuICogY29uZmlndXJhdGlvbiBhbmQgcmV0dXJucyBhIHByZXR0aWZpZWQgbG9nIHN0cmluZy5cbiAqXG4gKiBAdHlwZWRlZiB7ZnVuY3Rpb259IExvZ1ByZXR0aWZpZXJGdW5jXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGlucHV0RGF0YSBBIGxvZyBzdHJpbmcgb3IgYSBsb2ctbGlrZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIHByZXR0aWZpZWQgbG9nIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIHByZXR0eSAoaW5wdXREYXRhKSB7XG4gIGxldCBsb2dcbiAgaWYgKCFpc09iamVjdChpbnB1dERhdGEpKSB7XG4gICAgY29uc3QgcGFyc2VkID0ganNvblBhcnNlcihpbnB1dERhdGEpXG4gICAgaWYgKHBhcnNlZC5lcnIgfHwgIWlzT2JqZWN0KHBhcnNlZC52YWx1ZSkpIHtcbiAgICAgIC8vIHBhc3MgdGhyb3VnaFxuICAgICAgcmV0dXJuIGlucHV0RGF0YSArIHRoaXMuRU9MXG4gICAgfVxuICAgIGxvZyA9IHBhcnNlZC52YWx1ZVxuICB9IGVsc2Uge1xuICAgIGxvZyA9IGlucHV0RGF0YVxuICB9XG5cbiAgaWYgKHRoaXMubWluaW11bUxldmVsKSB7XG4gICAgLy8gV2UgbmVlZCB0byBmaWd1cmUgb3V0IGlmIHRoZSBjdXN0b20gbGV2ZWxzIGhhcyB0aGUgZGVzaXJlZCBtaW5pbXVtXG4gICAgLy8gbGV2ZWwgJiB1c2UgdGhhdCBvbmUgaWYgZm91bmQuIElmIG5vdCwgZGV0ZXJtaW5lIGlmIHRoZSBsZXZlbCBleGlzdHNcbiAgICAvLyBpbiB0aGUgc3RhbmRhcmQgbGV2ZWxzLiBJbiBib3RoIGNhc2VzLCBtYWtlIHN1cmUgd2UgaGF2ZSB0aGUgbGV2ZWxcbiAgICAvLyBudW1iZXIgaW5zdGVhZCBvZiB0aGUgbGV2ZWwgbmFtZS5cbiAgICBsZXQgY29uZGl0aW9uXG4gICAgaWYgKHRoaXMudXNlT25seUN1c3RvbVByb3BzKSB7XG4gICAgICBjb25kaXRpb24gPSB0aGlzLmN1c3RvbUxldmVsc1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25kaXRpb24gPSB0aGlzLmN1c3RvbUxldmVsTmFtZXNbdGhpcy5taW5pbXVtTGV2ZWxdICE9PSB1bmRlZmluZWRcbiAgICB9XG4gICAgbGV0IG1pbmltdW1cbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICBtaW5pbXVtID0gdGhpcy5jdXN0b21MZXZlbE5hbWVzW3RoaXMubWluaW11bUxldmVsXVxuICAgIH0gZWxzZSB7XG4gICAgICBtaW5pbXVtID0gTEVWRUxfTkFNRVNbdGhpcy5taW5pbXVtTGV2ZWxdXG4gICAgfVxuICAgIGlmICghbWluaW11bSkge1xuICAgICAgbWluaW11bSA9IHR5cGVvZiB0aGlzLm1pbmltdW1MZXZlbCA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBMRVZFTF9OQU1FU1t0aGlzLm1pbmltdW1MZXZlbF1cbiAgICAgICAgOiBMRVZFTF9OQU1FU1tMRVZFTFNbdGhpcy5taW5pbXVtTGV2ZWxdLnRvTG93ZXJDYXNlKCldXG4gICAgfVxuXG4gICAgY29uc3QgbGV2ZWwgPSBsb2dbdGhpcy5sZXZlbEtleSA9PT0gdW5kZWZpbmVkID8gTEVWRUxfS0VZIDogdGhpcy5sZXZlbEtleV1cbiAgICBpZiAobGV2ZWwgPCBtaW5pbXVtKSByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHByZXR0aWZpZWRNZXNzYWdlID0gcHJldHRpZnlNZXNzYWdlKHsgbG9nLCBjb250ZXh0OiB0aGlzLmNvbnRleHQgfSlcblxuICBpZiAodGhpcy5pZ25vcmVLZXlzIHx8IHRoaXMuaW5jbHVkZUtleXMpIHtcbiAgICBsb2cgPSBmaWx0ZXJMb2coeyBsb2csIGNvbnRleHQ6IHRoaXMuY29udGV4dCB9KVxuICB9XG5cbiAgY29uc3QgcHJldHRpZmllZExldmVsID0gcHJldHRpZnlMZXZlbCh7XG4gICAgbG9nLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIC4uLnRoaXMuY29udGV4dCxcbiAgICAgIC8vIFRoaXMgaXMgb2RkLiBUaGUgY29sb3JpemVyIGVuZHMgdXAgcmVseWluZyBvbiB0aGUgdmFsdWUgb2ZcbiAgICAgIC8vIGBjdXN0b21Qcm9wZXJ0aWVzYCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBgY3VzdG9tTGV2ZWxzYCBhbmRcbiAgICAgIC8vIGBjdXN0b21MZXZlbE5hbWVzYC5cbiAgICAgIC4uLnRoaXMuY29udGV4dC5jdXN0b21Qcm9wZXJ0aWVzXG4gICAgfVxuICB9KVxuICBjb25zdCBwcmV0dGlmaWVkTWV0YWRhdGEgPSBwcmV0dGlmeU1ldGFkYXRhKHsgbG9nLCBjb250ZXh0OiB0aGlzLmNvbnRleHQgfSlcbiAgY29uc3QgcHJldHRpZmllZFRpbWUgPSBwcmV0dGlmeVRpbWUoeyBsb2csIGNvbnRleHQ6IHRoaXMuY29udGV4dCB9KVxuXG4gIGxldCBsaW5lID0gJydcbiAgaWYgKHRoaXMubGV2ZWxGaXJzdCAmJiBwcmV0dGlmaWVkTGV2ZWwpIHtcbiAgICBsaW5lID0gYCR7cHJldHRpZmllZExldmVsfWBcbiAgfVxuXG4gIGlmIChwcmV0dGlmaWVkVGltZSAmJiBsaW5lID09PSAnJykge1xuICAgIGxpbmUgPSBgJHtwcmV0dGlmaWVkVGltZX1gXG4gIH0gZWxzZSBpZiAocHJldHRpZmllZFRpbWUpIHtcbiAgICBsaW5lID0gYCR7bGluZX0gJHtwcmV0dGlmaWVkVGltZX1gXG4gIH1cblxuICBpZiAoIXRoaXMubGV2ZWxGaXJzdCAmJiBwcmV0dGlmaWVkTGV2ZWwpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICBsaW5lID0gYCR7bGluZX0gJHtwcmV0dGlmaWVkTGV2ZWx9YFxuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lID0gcHJldHRpZmllZExldmVsXG4gICAgfVxuICB9XG5cbiAgaWYgKHByZXR0aWZpZWRNZXRhZGF0YSkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgIGxpbmUgPSBgJHtsaW5lfSAke3ByZXR0aWZpZWRNZXRhZGF0YX06YFxuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lID0gcHJldHRpZmllZE1ldGFkYXRhXG4gICAgfVxuICB9XG5cbiAgaWYgKGxpbmUuZW5kc1dpdGgoJzonKSA9PT0gZmFsc2UgJiYgbGluZSAhPT0gJycpIHtcbiAgICBsaW5lICs9ICc6J1xuICB9XG5cbiAgaWYgKHByZXR0aWZpZWRNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICBsaW5lID0gYCR7bGluZX0gJHtwcmV0dGlmaWVkTWVzc2FnZX1gXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmUgPSBwcmV0dGlmaWVkTWVzc2FnZVxuICAgIH1cbiAgfVxuXG4gIGlmIChsaW5lLmxlbmd0aCA+IDAgJiYgIXRoaXMuc2luZ2xlTGluZSkge1xuICAgIGxpbmUgKz0gdGhpcy5FT0xcbiAgfVxuXG4gIC8vIHBpbm9ANysgZG9lcyBub3QgbG9nIHRoaXMgYW55bW9yZVxuICBpZiAobG9nLnR5cGUgPT09ICdFcnJvcicgJiYgdHlwZW9mIGxvZy5zdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBwcmV0dGlmaWVkRXJyb3JMb2cgPSBwcmV0dGlmeUVycm9yTG9nKHsgbG9nLCBjb250ZXh0OiB0aGlzLmNvbnRleHQgfSlcbiAgICBpZiAodGhpcy5zaW5nbGVMaW5lKSBsaW5lICs9IHRoaXMuRU9MXG4gICAgbGluZSArPSBwcmV0dGlmaWVkRXJyb3JMb2dcbiAgfSBlbHNlIGlmICh0aGlzLmhpZGVPYmplY3QgPT09IGZhbHNlKSB7XG4gICAgY29uc3Qgc2tpcEtleXMgPSBbXG4gICAgICB0aGlzLm1lc3NhZ2VLZXksXG4gICAgICB0aGlzLmxldmVsS2V5LFxuICAgICAgdGhpcy50aW1lc3RhbXBLZXlcbiAgICBdXG4gICAgICAubWFwKChrZXkpID0+IGtleS5yZXBsYWNlQWxsKC9cXFxcL2csICcnKSlcbiAgICAgIC5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBsb2dba2V5XSA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICB0eXBlb2YgbG9nW2tleV0gPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgdHlwZW9mIGxvZ1trZXldID09PSAnYm9vbGVhbidcbiAgICAgIH0pXG4gICAgY29uc3QgcHJldHRpZmllZE9iamVjdCA9IHByZXR0aWZ5T2JqZWN0KHtcbiAgICAgIGxvZyxcbiAgICAgIHNraXBLZXlzLFxuICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0XG4gICAgfSlcblxuICAgIC8vIEluIHNpbmdsZSBsaW5lIG1vZGUsIGluY2x1ZGUgYSBzcGFjZSBvbmx5IGlmIHByZXR0aWZpZWQgdmVyc2lvbiBpc24ndCBlbXB0eVxuICAgIGlmICh0aGlzLnNpbmdsZUxpbmUgJiYgIS9eXFxzJC8udGVzdChwcmV0dGlmaWVkT2JqZWN0KSkge1xuICAgICAgbGluZSArPSAnICdcbiAgICB9XG4gICAgbGluZSArPSBwcmV0dGlmaWVkT2JqZWN0XG4gIH1cblxuICByZXR1cm4gbGluZVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IGlzQ29sb3JTdXBwb3J0ZWQgfSA9IHJlcXVpcmUoJ2NvbG9yZXR0ZScpXG5jb25zdCBwdW1wID0gcmVxdWlyZSgncHVtcCcpXG5jb25zdCB7IFRyYW5zZm9ybSB9ID0gcmVxdWlyZSgnc3RyZWFtJylcbmNvbnN0IGFic3RyYWN0VHJhbnNwb3J0ID0gcmVxdWlyZSgncGluby1hYnN0cmFjdC10cmFuc3BvcnQnKVxuY29uc3QgY29sb3JzID0gcmVxdWlyZSgnLi9saWIvY29sb3JzJylcbmNvbnN0IHtcbiAgRVJST1JfTElLRV9LRVlTLFxuICBMRVZFTF9LRVksXG4gIExFVkVMX0xBQkVMLFxuICBNRVNTQUdFX0tFWSxcbiAgVElNRVNUQU1QX0tFWVxufSA9IHJlcXVpcmUoJy4vbGliL2NvbnN0YW50cycpXG5jb25zdCB7XG4gIGJ1aWxkU2FmZVNvbmljQm9vbSxcbiAgcGFyc2VGYWN0b3J5T3B0aW9uc1xufSA9IHJlcXVpcmUoJy4vbGliL3V0aWxzJylcbmNvbnN0IHByZXR0eSA9IHJlcXVpcmUoJy4vbGliL3ByZXR0eScpXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUGlub1ByZXR0eU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2NvbG9yaXplXSBJbmRpY2F0ZXMgaWYgY29sb3JzIHNob3VsZCBiZSB1c2VkIHdoZW5cbiAqIHByZXR0aWZ5aW5nLiBUaGUgZGVmYXVsdCB3aWxsIGJlIGRldGVybWluZWQgYnkgdGhlIHRlcm1pbmFsIGNhcGFiaWxpdGllcyBhdFxuICogcnVuIHRpbWUuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtjb2xvcml6ZU9iamVjdHM9dHJ1ZV0gQXBwbHkgY29sb3JpbmcgdG8gcmVuZGVyZWQgb2JqZWN0c1xuICogd2hlbiBjb2xvcmluZyBpcyBlbmFibGVkLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbY3JsZj1mYWxzZV0gRW5kIGxpbmVzIHdpdGggYFxcclxcbmAgaW5zdGVhZCBvZiBgXFxuYC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtjdXN0b21Db2xvcnM9bnVsbF0gQSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBjb2xvcnNcbiAqIHRvIHVzZSBmb3Igc3BlY2lmaWMgbGV2ZWwgbGFiZWxzLCBlLmcuIGBlcnI6cmVkLGluZm86Ymx1ZWAuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbY3VzdG9tTGV2ZWxzPW51bGxdIEEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgdXNlclxuICogZGVmaW5lZCBsZXZlbCBuYW1lcyBhbmQgbnVtYmVycywgZS5nLiBgZXJyOjk5LGluZm86MWAuXG4gKiBAcHJvcGVydHkge0N1c3RvbVByZXR0aWZpZXJzfSBbY3VzdG9tUHJldHRpZmllcnM9e31dIEEgc2V0IG9mIHByZXR0aWZpZXJcbiAqIGZ1bmN0aW9ucyB0byBhcHBseSB0byBrZXlzIGRlZmluZWQgaW4gdGhpcyBvYmplY3QuXG4gKiBAcHJvcGVydHkge0tfRVJST1JfTElLRV9LRVlTfSBbZXJyb3JMaWtlT2JqZWN0S2V5c10gQSBsaXN0IG9mIHN0cmluZyBwcm9wZXJ0eVxuICogbmFtZXMgdG8gY29uc2lkZXIgYXMgZXJyb3Igb2JqZWN0cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZXJyb3JQcm9wcz0nJ10gQSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwcm9wZXJ0aWVzIG9uXG4gKiBlcnJvciBvYmplY3RzIHRvIGluY2x1ZGUgaW4gdGhlIG91dHB1dC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2hpZGVPYmplY3Q9ZmFsc2VdIFdoZW4gYHRydWVgLCBkYXRhIG9iamVjdHMgd2lsbCBiZVxuICogb21pdHRlZCBmcm9tIHRoZSBvdXRwdXQgKGV4Y2VwdCBmb3IgZXJyb3Igb2JqZWN0cykuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2lnbm9yZT0naG9zdG5hbWUnXSBBIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGxvZyBrZXlzXG4gKiB0byBvbWl0IHdoZW4gb3V0cHV0dGluZyB0aGUgcHJldHRpZmllZCBsb2cgaW5mb3JtYXRpb24uXG4gKiBAcHJvcGVydHkge3VuZGVmaW5lZHxzdHJpbmd9IFtpbmNsdWRlPXVuZGVmaW5lZF0gQSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZlxuICogbG9nIGtleXMgdG8gaW5jbHVkZSBpbiB0aGUgcHJldHRpZmllZCBsb2cgaW5mb3JtYXRpb24uIE9ubHkgdGhlIGtleXMgaW4gdGhpc1xuICogbGlzdCB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSBvdXRwdXQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtsZXZlbEZpcnN0PWZhbHNlXSBXaGVuIHRydWUsIHRoZSBsb2cgbGV2ZWwgd2lsbCBiZSB0aGVcbiAqIGZpcnN0IGZpZWxkIGluIHRoZSBwcmV0dGlmaWVkIG91dHB1dC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbGV2ZWxLZXk9J2xldmVsJ10gVGhlIGtleSBuYW1lIGluIHRoZSBsb2cgZGF0YSB0aGF0XG4gKiBjb250YWlucyB0aGUgbGV2ZWwgdmFsdWUgZm9yIHRoZSBsb2cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xldmVsTGFiZWw9J2xldmVsTGFiZWwnXSBUb2tlbiBuYW1lIHRvIHVzZSBpblxuICogYG1lc3NhZ2VGb3JtYXRgIHRvIHJlcHJlc2VudCB0aGUgbmFtZSBvZiB0aGUgbG9nZ2VkIGxldmVsLlxuICogQHByb3BlcnR5IHtudWxsfE1lc3NhZ2VGb3JtYXRTdHJpbmd8TWVzc2FnZUZvcm1hdEZ1bmN0aW9ufSBbbWVzc2FnZUZvcm1hdD1udWxsXVxuICogV2hlbiBhIHN0cmluZywgZGVmaW5lcyBob3cgdGhlIHByZXR0aWZpZWQgbGluZSBzaG91bGQgYmUgZm9ybWF0dGVkIGFjY29yZGluZ1xuICogdG8gZGVmaW5lZCB0b2tlbnMuIFdoZW4gYSBmdW5jdGlvbiwgYSBzeW5jaHJvbm91cyBmdW5jdGlvbiB0aGF0IHJldHVybnMgYVxuICogZm9ybWF0dGVkIHN0cmluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbWVzc2FnZUtleT0nbXNnJ10gRGVmaW5lcyB0aGUga2V5IGluIGluY29taW5nIGxvZ3MgdGhhdFxuICogY29udGFpbnMgdGhlIG1lc3NhZ2Ugb2YgdGhlIGxvZywgaWYgcHJlc2VudC5cbiAqIEBwcm9wZXJ0eSB7dW5kZWZpbmVkfHN0cmluZ3xudW1iZXJ9IFttaW5pbXVtTGV2ZWw9dW5kZWZpbmVkXSBUaGUgbWluaW11bVxuICogbGV2ZWwgZm9yIGxvZ3MgdGhhdCBzaG91bGQgYmUgcHJvY2Vzc2VkLiBBbnkgbG9ncyBiZWxvdyB0aGlzIGxldmVsIHdpbGxcbiAqIGJlIG9taXR0ZWQuXG4gKiBAcHJvcGVydHkge29iamVjdH0gW291dHB1dFN0cmVhbT1wcm9jZXNzLnN0ZG91dF0gVGhlIHN0cmVhbSB0byB3cml0ZVxuICogcHJldHRpZmllZCBsb2cgbGluZXMgdG8uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzaW5nbGVMaW5lPWZhbHNlXSBXaGVuIGB0cnVlYCBhbnkgb2JqZWN0cywgZXhjZXB0IGVycm9yXG4gKiBvYmplY3RzLCBpbiB0aGUgbG9nIGRhdGEgd2lsbCBiZSBwcmludGVkIGFzIGEgc2luZ2xlIGxpbmUgaW5zdGVhZCBhcyBtdWx0aXBsZVxuICogbGluZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RpbWVzdGFtcEtleT0ndGltZSddIERlZmluZXMgdGhlIGtleSBpbiBpbmNvbWluZyBsb2dzXG4gKiB0aGF0IGNvbnRhaW5zIHRoZSB0aW1lc3RhbXAgb2YgdGhlIGxvZywgaWYgcHJlc2VudC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbnxzdHJpbmd9IFt0cmFuc2xhdGVUaW1lPXRydWVdIFdoZW4gdHJ1ZSwgd2lsbCB0cmFuc2xhdGUgYVxuICogSmF2YVNjcmlwdCBkYXRlIGludGVnZXIgaW50byBhIGh1bWFuLXJlYWRhYmxlIHN0cmluZy4gSWYgc2V0IHRvIGEgc3RyaW5nLFxuICogaXQgbXVzdCBiZSBhIGZvcm1hdCBzdHJpbmcuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFt1c2VPbmx5Q3VzdG9tUHJvcHM9dHJ1ZV0gV2hlbiB0cnVlLCBvbmx5IGN1c3RvbSBsZXZlbHNcbiAqIGFuZCBjb2xvcnMgd2lsbCBiZSB1c2VkIGlmIHRoZXkgaGF2ZSBiZWVuIHByb3ZpZGVkLlxuICovXG5cbi8qKlxuICogVGhlIGRlZmF1bHQgb3B0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHByZXR0aWZ5aW5nIGxvZyBsaW5lcy5cbiAqXG4gKiBAdHlwZSB7UGlub1ByZXR0eU9wdGlvbnN9XG4gKi9cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBjb2xvcml6ZTogaXNDb2xvclN1cHBvcnRlZCxcbiAgY29sb3JpemVPYmplY3RzOiB0cnVlLFxuICBjcmxmOiBmYWxzZSxcbiAgY3VzdG9tQ29sb3JzOiBudWxsLFxuICBjdXN0b21MZXZlbHM6IG51bGwsXG4gIGN1c3RvbVByZXR0aWZpZXJzOiB7fSxcbiAgZXJyb3JMaWtlT2JqZWN0S2V5czogRVJST1JfTElLRV9LRVlTLFxuICBlcnJvclByb3BzOiAnJyxcbiAgaGlkZU9iamVjdDogZmFsc2UsXG4gIGlnbm9yZTogJ2hvc3RuYW1lJyxcbiAgaW5jbHVkZTogdW5kZWZpbmVkLFxuICBsZXZlbEZpcnN0OiBmYWxzZSxcbiAgbGV2ZWxLZXk6IExFVkVMX0tFWSxcbiAgbGV2ZWxMYWJlbDogTEVWRUxfTEFCRUwsXG4gIG1lc3NhZ2VGb3JtYXQ6IG51bGwsXG4gIG1lc3NhZ2VLZXk6IE1FU1NBR0VfS0VZLFxuICBtaW5pbXVtTGV2ZWw6IHVuZGVmaW5lZCxcbiAgb3V0cHV0U3RyZWFtOiBwcm9jZXNzLnN0ZG91dCxcbiAgc2luZ2xlTGluZTogZmFsc2UsXG4gIHRpbWVzdGFtcEtleTogVElNRVNUQU1QX0tFWSxcbiAgdHJhbnNsYXRlVGltZTogdHJ1ZSxcbiAgdXNlT25seUN1c3RvbVByb3BzOiB0cnVlXG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIHRoZSBzdXBwbGllZCBvcHRpb25zIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGxvZyBkYXRhXG4gKiBhbmQgcHJvZHVjZXMgYSBwcmV0dGlmaWVkIGxvZyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtQaW5vUHJldHR5T3B0aW9uc30gb3B0aW9ucyBDb25maWd1cmF0aW9uIGZvciB0aGUgcHJldHRpZmllci5cbiAqIEByZXR1cm5zIHtMb2dQcmV0dGlmaWVyRnVuY31cbiAqL1xuZnVuY3Rpb24gcHJldHR5RmFjdG9yeSAob3B0aW9ucykge1xuICBjb25zdCBjb250ZXh0ID0gcGFyc2VGYWN0b3J5T3B0aW9ucyhPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucykpXG4gIHJldHVybiBwcmV0dHkuYmluZCh7IC4uLmNvbnRleHQsIGNvbnRleHQgfSlcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7UGlub1ByZXR0eU9wdGlvbnN9IEJ1aWxkU3RyZWFtT3B0c1xuICogQHByb3BlcnR5IHtvYmplY3R8bnVtYmVyfHN0cmluZ30gW2Rlc3RpbmF0aW9uXSBBIGRlc3RpbmF0aW9uIHN0cmVhbSwgZmlsZVxuICogZGVzY3JpcHRvciwgb3IgdGFyZ2V0IHBhdGggdG8gYSBmaWxlLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbYXBwZW5kXVxuICogQHByb3BlcnR5IHtib29sZWFufSBbbWtkaXJdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzeW5jPWZhbHNlXVxuICovXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIHtAbGluayBMb2dQcmV0dGlmaWVyRnVuY30gYW5kIGEgc3RyZWFtIHRvIHdoaWNoIHRoZSBwcm9kdWNlZFxuICogcHJldHRpZmllZCBsb2cgZGF0YSB3aWxsIGJlIHdyaXR0ZW4uXG4gKlxuICogQHBhcmFtIHtCdWlsZFN0cmVhbU9wdHN9IG9wdHNcbiAqIEByZXR1cm5zIHtUcmFuc2Zvcm0gfCAoVHJhbnNmb3JtICYgT25Vbmtub3duKX1cbiAqL1xuZnVuY3Rpb24gYnVpbGQgKG9wdHMgPSB7fSkge1xuICBsZXQgcHJldHR5ID0gcHJldHR5RmFjdG9yeShvcHRzKVxuICBsZXQgZGVzdGluYXRpb25cbiAgcmV0dXJuIGFic3RyYWN0VHJhbnNwb3J0KGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICBzb3VyY2Uub24oJ21lc3NhZ2UnLCBmdW5jdGlvbiBwaW5vQ29uZmlnTGlzdGVuZXIgKG1lc3NhZ2UpIHtcbiAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLmNvZGUgIT09ICdQSU5PX0NPTkZJRycpIHJldHVyblxuICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCB7XG4gICAgICAgIG1lc3NhZ2VLZXk6IG1lc3NhZ2UuY29uZmlnLm1lc3NhZ2VLZXksXG4gICAgICAgIGVycm9yTGlrZU9iamVjdEtleXM6IEFycmF5LmZyb20obmV3IFNldChbLi4uKG9wdHMuZXJyb3JMaWtlT2JqZWN0S2V5cyB8fCBFUlJPUl9MSUtFX0tFWVMpLCBtZXNzYWdlLmNvbmZpZy5lcnJvcktleV0pKSxcbiAgICAgICAgY3VzdG9tTGV2ZWxzOiBtZXNzYWdlLmNvbmZpZy5sZXZlbHMudmFsdWVzXG4gICAgICB9KVxuICAgICAgcHJldHR5ID0gcHJldHR5RmFjdG9yeShvcHRzKVxuICAgICAgc291cmNlLm9mZignbWVzc2FnZScsIHBpbm9Db25maWdMaXN0ZW5lcilcbiAgICB9KVxuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBUcmFuc2Zvcm0oe1xuICAgICAgb2JqZWN0TW9kZTogdHJ1ZSxcbiAgICAgIGF1dG9EZXN0cm95OiB0cnVlLFxuICAgICAgdHJhbnNmb3JtIChjaHVuaywgZW5jLCBjYikge1xuICAgICAgICBjb25zdCBsaW5lID0gcHJldHR5KGNodW5rKVxuICAgICAgICBjYihudWxsLCBsaW5lKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAodHlwZW9mIG9wdHMuZGVzdGluYXRpb24gPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRzLmRlc3RpbmF0aW9uLndyaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZXN0aW5hdGlvbiA9IG9wdHMuZGVzdGluYXRpb25cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdGluYXRpb24gPSBidWlsZFNhZmVTb25pY0Jvb20oe1xuICAgICAgICBkZXN0OiBvcHRzLmRlc3RpbmF0aW9uIHx8IDEsXG4gICAgICAgIGFwcGVuZDogb3B0cy5hcHBlbmQsXG4gICAgICAgIG1rZGlyOiBvcHRzLm1rZGlyLFxuICAgICAgICBzeW5jOiBvcHRzLnN5bmMgLy8gYnkgZGVmYXVsdCBzb25pYyB3aWxsIGJlIGFzeW5jXG4gICAgICB9KVxuICAgIH1cblxuICAgIHNvdXJjZS5vbigndW5rbm93bicsIGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICBkZXN0aW5hdGlvbi53cml0ZShsaW5lICsgJ1xcbicpXG4gICAgfSlcblxuICAgIHB1bXAoc291cmNlLCBzdHJlYW0sIGRlc3RpbmF0aW9uKVxuICAgIHJldHVybiBzdHJlYW1cbiAgfSwge1xuICAgIHBhcnNlOiAnbGluZXMnLFxuICAgIGNsb3NlIChlcnIsIGNiKSB7XG4gICAgICBkZXN0aW5hdGlvbi5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIGNiKGVycilcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkXG5tb2R1bGUuZXhwb3J0cy5idWlsZCA9IGJ1aWxkXG5tb2R1bGUuZXhwb3J0cy5QaW5vUHJldHR5ID0gYnVpbGRcbm1vZHVsZS5leHBvcnRzLnByZXR0eUZhY3RvcnkgPSBwcmV0dHlGYWN0b3J5XG5tb2R1bGUuZXhwb3J0cy5jb2xvcml6ZXJGYWN0b3J5ID0gY29sb3JzXG5tb2R1bGUuZXhwb3J0cy5pc0NvbG9yU3VwcG9ydGVkID0gaXNDb2xvclN1cHBvcnRlZFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGJ1aWxkXG4iLCAiaW1wb3J0IHsgYmFzZW5hbWUsIGpvaW4gfSBmcm9tIFwibm9kZTpwYXRoXCJcbmltcG9ydCB7IGdldERhdGFiYXNlIH0gZnJvbSBcIi4vY29ubmVjdGlvblwiXG5pbXBvcnQgeyBjd2QgfSBmcm9tIFwibm9kZTpwcm9jZXNzXCJcbmltcG9ydCB7IHJlYWRGaWxlLCByZWFkZGlyIH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIlxuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCJub2RlOmNyeXB0b1wiXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiQC9sb2dnaW5nXCJcblxudHlwZSBNaWdyYXRpb24gPSB7XG4gIGlkOiBudW1iZXJcbiAgaGFzaDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xufVxuXG5mdW5jdGlvbiBpc0ZpcnN0U3RhcnR1cCgpIHtcbiAgY29uc3QgZGIgPSBnZXREYXRhYmFzZSgpXG4gIHRyeSB7XG4gICAgY29uc3Qgcm93ID0gZGJcbiAgICAgIC5wcmVwYXJlKFxuICAgICAgICBgXG5TRUxFQ1QgQ09VTlQoKikgYXMgbWlncmF0aW9uX2NvdW50XG5GUk9NIG1pZ3JhdGlvblxuYCxcbiAgICAgIClcbiAgICAgIC5nZXQoKSBhcyB7IG1pZ3JhdGlvbl9jb3VudDogbnVtYmVyIH1cbiAgICByZXR1cm4gcm93Lm1pZ3JhdGlvbl9jb3VudCA9PT0gMFxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldE1pZ3JhdGlvbihoYXNoOiBzdHJpbmcpIHtcbiAgY29uc3QgZGIgPSBnZXREYXRhYmFzZSgpXG4gIHRyeSB7XG4gICAgY29uc3Qgcm93ID0gZGJcbiAgICAgIC5wcmVwYXJlPHsgaGFzaDogc3RyaW5nIH0+KFxuICAgICAgICBgXG4gICAgICBTRUxFQ1QgaWQsIGhhc2gsIG5hbWVcbiAgICAgIEZST00gbWlncmF0aW9uXG4gICAgICBXSEVSRSBoYXNoID0gJGhhc2hcbiAgICAgIGAsXG4gICAgICApXG4gICAgICAuZ2V0KHsgaGFzaCB9KSBhcyBNaWdyYXRpb24gfCB1bmRlZmluZWRcbiAgICByZXR1cm4gcm93ID8/IG51bGxcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTWlncmF0aW9uKGhhc2g6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGRiID0gZ2V0RGF0YWJhc2UoKVxuICBkYi5wcmVwYXJlPHsgbmFtZTogc3RyaW5nOyBoYXNoOiBzdHJpbmcgfT4oXG4gICAgYFxuICAgIElOU0VSVCBJTlRPIG1pZ3JhdGlvbiAoaGFzaCwgbmFtZSlcbiAgICBWQUxVRVMgKCRoYXNoLCAkbmFtZSlcbiAgICBgLFxuICApLnJ1bih7IGhhc2gsIG5hbWUgfSlcbn1cblxuZnVuY3Rpb24gc2V0SW5pdGlhbEF1ZGlvQ29kZWMob3B0aW9uczoge1xuICBjb2RlYzogc3RyaW5nXG4gIGJpdHJhdGU6IHN0cmluZyB8IHVuZGVmaW5lZFxufSkge1xuICBjb25zdCBkYiA9IGdldERhdGFiYXNlKClcbiAgZGIucHJlcGFyZTx7IGNvZGVjOiBzdHJpbmcgfT4oXG4gICAgYFxuICAgIFVQREFURSBzZXR0aW5nc1xuICAgIFNFVCB2YWx1ZSA9ICRjb2RlY1xuICAgIFdIRVJFIG5hbWUgPSAnY29kZWMnO1xuICAgIGAsXG4gICkucnVuKHtcbiAgICBjb2RlYzogSlNPTi5zdHJpbmdpZnkoXG4gICAgICBvcHRpb25zLmNvZGVjID09PSBcIm9wdXNcIlxuICAgICAgICA/IFwibGlib3B1c1wiXG4gICAgICAgIDogb3B0aW9ucy5jb2RlYyA9PT0gXCJtcDNcIlxuICAgICAgICAgID8gXCJsaWJtcDNsYW1lXCJcbiAgICAgICAgICA6IFwiYWNjXCIsXG4gICAgKSxcbiAgfSlcblxuICBpZiAob3B0aW9ucy5iaXRyYXRlKSB7XG4gICAgZGIucHJlcGFyZTx7IGJpdHJhdGU6IHN0cmluZyB9PihcbiAgICAgIGBcbiAgICAgIFVQREFURSBzZXR0aW5nc1xuICAgICAgU0VUIHZhbHVlID0gJGJpdHJhdGVcbiAgICAgIFdIRVJFIG5hbWUgPSAnYml0cmF0ZSc7XG4gICAgICBgLFxuICAgICkucnVuKHtcbiAgICAgIGJpdHJhdGU6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYml0cmF0ZSksXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRJbml0aWFsQXVkaW9Db2RlYygpIHtcbiAgY29uc3QgZW52ID0gcHJvY2Vzcy5lbnZbXCJTVE9SWVRFTExFUl9JTklUSUFMX0FVRElPX0NPREVDXCJdXG4gIGlmICghZW52KSByZXR1cm4gbnVsbFxuICBjb25zdCBtYXRjaCA9IGVudi5tYXRjaCgvXihtcDN8YWFjfG9wdXMpKD86LSgxNnwyNHwzMnw2NHw5NikpPyQvKVxuICBpZiAoIW1hdGNoPy5bMV0pIHJldHVybiBudWxsXG4gIHJldHVybiB7IGNvZGVjOiBtYXRjaFsxXSwgYml0cmF0ZTogbWF0Y2hbMl0gJiYgYCR7bWF0Y2hbMl19a2AgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtaWdyYXRlRmlsZShwYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgZGIgPSBnZXREYXRhYmFzZSgpXG5cbiAgY29uc3QgY29udGVudHMgPSBhd2FpdCByZWFkRmlsZShwYXRoLCB7XG4gICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgfSlcbiAgY29uc3QgaGFzaCA9IGNyZWF0ZUhhc2goXCJzaGEyNTZcIikudXBkYXRlKGNvbnRlbnRzKS5kaWdlc3QoXCJoZXhcIilcblxuICBjb25zdCBleGlzdGluZ01pZ3JhdGlvbiA9IGdldE1pZ3JhdGlvbihoYXNoKVxuICBpZiAoIWV4aXN0aW5nTWlncmF0aW9uKSB7XG4gICAgbG9nZ2VyLmluZm8oYFJ1bm5pbmcgbWlncmF0aW9uOiBcIiR7YmFzZW5hbWUocGF0aCwgXCIuc3FsXCIpfVwiXFxuYClcbiAgICBsb2dnZXIuaW5mbyhjb250ZW50cylcbiAgICBjb25zdCBzdGF0ZW1lbnRzID0gY29udGVudHNcbiAgICAgIC5zcGxpdChcIjtcIilcbiAgICAgIC5tYXAoKHN0YXRlbWVudCkgPT4gc3RhdGVtZW50LnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKHN0YXRlbWVudCkgPT4gISFzdGF0ZW1lbnQubGVuZ3RoKVxuXG4gICAgZm9yIChjb25zdCBzdGF0ZW1lbnQgb2Ygc3RhdGVtZW50cykge1xuICAgICAgZGIucHJlcGFyZShzdGF0ZW1lbnQpLnJ1bigpXG4gICAgfVxuXG4gICAgY3JlYXRlTWlncmF0aW9uKGhhc2gsIGJhc2VuYW1lKHBhdGgpKVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGUoKSB7XG4gIC8vIE1ha2Ugc3VyZSB0byBldmFsdWF0ZSB0aGlzIF9iZWZvcmVfIHJ1bm5pbmcgYW55IG1pZ3JhdGlvbnNcbiAgY29uc3QgZm91bmRGaXJzdFN0YXJ0dXAgPSBpc0ZpcnN0U3RhcnR1cCgpXG4gIGlmIChmb3VuZEZpcnN0U3RhcnR1cCkgbG9nZ2VyLmluZm8oXCJGaXJzdCBzdGFydHVwIC0gaW5pdGlhbGl6aW5nIGRhdGFiYXNlXCIpXG5cbiAgY29uc3QgaW5pdGlhbENvZGVjID0gZ2V0SW5pdGlhbEF1ZGlvQ29kZWMoKVxuXG4gIGNvbnN0IG1pZ3JhdGlvbnNEaXIgPSBqb2luKGN3ZCgpLCBcIm1pZ3JhdGlvbnNcIilcbiAgY29uc3QgbWlncmF0aW9uRmlsZXMgPSBhd2FpdCByZWFkZGlyKG1pZ3JhdGlvbnNEaXIpXG4gIG1pZ3JhdGlvbkZpbGVzLnNvcnQoKVxuXG4gIC8vIFdlIGhhdmUgdG8gc3BlY2lhbCBjYXNlIHRoZSBcInplcm8tdGhcIiBtaWdyYXRpb24sXG4gIC8vIGJlY2F1c2Ugd2UgZ29vZmVkIGFuZCBkaWRuJ3QgYWRkIGl0IGFzIGEgbWlncmF0aW9uXG4gIC8vIHVudGlsIGFmdGVyIHRoZSBmaXJzdCBtaWdyYXRpb24uXG4gIGZvciAoY29uc3QgbWlncmF0aW9uRmlsZSBvZiBtaWdyYXRpb25GaWxlcykge1xuICAgIGF3YWl0IG1pZ3JhdGVGaWxlKGpvaW4obWlncmF0aW9uc0RpciwgbWlncmF0aW9uRmlsZSkpXG4gIH1cblxuICBpZiAoZm91bmRGaXJzdFN0YXJ0dXAgJiYgaW5pdGlhbENvZGVjKSB7XG4gICAgc2V0SW5pdGlhbEF1ZGlvQ29kZWMoaW5pdGlhbENvZGVjKVxuICB9XG59XG5cbnZvaWQgbWlncmF0ZSgpXG4iLCAiaW1wb3J0IHsgREFUQV9ESVIgfSBmcm9tIFwiQC9kaXJlY3Rvcmllc1wiXG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcIm5vZGU6cGF0aFwiXG5pbXBvcnQgeyBjd2QgfSBmcm9tIFwibm9kZTpwcm9jZXNzXCJcbmltcG9ydCBEYiwgeyBEYXRhYmFzZSB9IGZyb20gXCJiZXR0ZXItc3FsaXRlM1wiXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiQC9sb2dnaW5nXCJcblxubGV0IGRiOiBEYXRhYmFzZSB8IHVuZGVmaW5lZFxuXG5jb25zdCBEQVRBQkFTRV9VUkwgPSBqb2luKERBVEFfRElSLCBcInN0b3J5dGVsbGVyLmRiXCIpXG5cbmNvbnN0IFVVSURfRVhUX1BBVEggPSBqb2luKGN3ZCgpLCBcInNxbGl0ZVwiLCBcInV1aWQuY1wiKVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YWJhc2UoKTogRGF0YWJhc2Uge1xuICBpZiAoZGIpIHJldHVybiBkYlxuXG4gIGRiID0gbmV3IERiKFxuICAgIERBVEFCQVNFX1VSTCxcbiAgICBwcm9jZXNzLmVudltcIlNRTElURV9OQVRJVkVfQklORElOR1wiXVxuICAgICAgPyB7XG4gICAgICAgICAgbmF0aXZlQmluZGluZzogcHJvY2Vzcy5lbnZbXCJTUUxJVEVfTkFUSVZFX0JJTkRJTkdcIl0sXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICApXG4gIGRiLnByYWdtYShcImpvdXJuYWxfbW9kZSA9IFdBTFwiKVxuICB0cnkge1xuICAgIGRiLmxvYWRFeHRlbnNpb24oVVVJRF9FWFRfUEFUSClcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKVxuICB9XG4gIHJldHVybiBkYlxufVxuIiwgImltcG9ydCB7IGpvaW4gfSBmcm9tIFwibm9kZTpwYXRoXCJcblxuZXhwb3J0IGNvbnN0IERBVEFfRElSID0gcHJvY2Vzcy5lbnZbXCJTVE9SWVRFTExFUl9EQVRBX0RJUlwiXSA/PyBcIi5cIlxuXG5leHBvcnQgY29uc3QgQVVESU9fRElSID0gam9pbihEQVRBX0RJUiwgXCJhc3NldHNcIiwgXCJhdWRpb1wiKVxuXG5leHBvcnQgY29uc3QgVEVYVF9ESVIgPSBqb2luKERBVEFfRElSLCBcImFzc2V0c1wiLCBcInRleHRcIilcblxuZXhwb3J0IGNvbnN0IElNQUdFX0RJUiA9IGpvaW4oREFUQV9ESVIsIFwiYXNzZXRzXCIsIFwiaW1hZ2VzXCIpXG5cbmV4cG9ydCBjb25zdCBDQUNIRV9ESVIgPSBqb2luKERBVEFfRElSLCBcImNhY2hlXCIpXG5cbmV4cG9ydCBjb25zdCBXSElTUEVSX0JVSUxEX0RJUiA9IGpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJ3aGlzcGVyLWJ1aWxkc1wiKVxuIiwgImltcG9ydCBwaW5vIGZyb20gXCJwaW5vXCJcbmltcG9ydCBQaW5vUHJldHR5IGZyb20gXCJwaW5vLXByZXR0eVwiXG5cbmV4cG9ydCBjb25zdCBsb2dnZXIgPSBwaW5vKFxuICBQaW5vUHJldHR5KHtcbiAgICBpZ25vcmU6IFwicGlkLGhvc3RuYW1lXCIsXG4gIH0pLFxuKVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQWE7QUFBYjtBQUFBO0FBQUE7QUFBTyxJQUFNLGtCQUNYLE9BQU8sYUFBYSxjQUNoQixLQUFLLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUUsSUFBSyxVQUFVLFVBQVUsRUFBRSxPQUM5RCxTQUFTLGlCQUFpQixT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Q0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNoUEE7QUFBQSxxQ0FBQUMsVUFBQUMsU0FBQTtBQUFBO0FBQUE7QUFFQSxJQUFBQSxRQUFPLFVBQVUsRUFBRSxTQUFTLFFBQVE7QUFBQTtBQUFBOzs7QUNGcEM7QUFBQSxzQ0FBQUMsVUFBQUMsU0FBQTtBQUFBO0FBQUE7QUFJQSxRQUFNLEVBQUUsYUFBYSxJQUFJLFFBQVEsYUFBYTtBQUM5QyxRQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixJQUFJO0FBQ0osUUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLElBQUk7QUFDSixRQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsSUFBSTtBQUNKLFFBQU07QUFBQSxNQUNKO0FBQUEsSUFDRixJQUFJO0FBQ0osUUFBTSxZQUFZO0FBSWxCLFFBQU0sY0FBYyxNQUFNLEtBQUs7QUFBQSxJQUFDO0FBQ2hDLFFBQU0sWUFBWTtBQUFBLE1BQ2hCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxJQUFJLFFBQVM7QUFBRSxlQUFPLEtBQUss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RUFBRSxJQUFFLFNBQVMsRUFBRTtBQUFBLFVBQUM7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sS0FBSyxFQUFFLElBQUUsU0FBUyxFQUFFO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxjQUFjLEVBQUU7QUFBQSxVQUFDO0FBQUUsY0FBSSxLQUFHLFNBQVMsSUFBRztBQUFDLG1CQUFPLE1BQUksSUFBRSxLQUFLLGtCQUFrQjtBQUFBLFVBQUM7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sUUFBUSxJQUFJO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxhQUFhLElBQUk7QUFBQSxVQUFDO0FBQUUsY0FBSSxRQUFNLEVBQUMsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsS0FBSSxTQUFTLE1BQUs7QUFBQyxtQkFBTyxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsS0FBSSxTQUFTLE1BQUs7QUFBQyxtQkFBTyxXQUFXLEVBQUMsR0FBRSxFQUFFLEdBQUUsR0FBRSxHQUFHLEdBQUUsR0FBRSxHQUFHLEdBQUUsR0FBRSxFQUFFLEdBQUUsU0FBUSxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUMsR0FBRSxPQUFNLEtBQUksQ0FBQztBQUFBLFVBQUMsR0FBRSxNQUFLLFNBQVMsT0FBTTtBQUFDLG1CQUFPLFdBQVcsS0FBSyxTQUFTLEVBQUUsSUFBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLE1BQUssU0FBUyxPQUFNO0FBQUMsbUJBQU8sV0FBVyxFQUFDLEdBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRyxHQUFFLEdBQUUsR0FBRyxHQUFFLEdBQUUsRUFBRSxHQUFFLFNBQVEsV0FBVyxLQUFLLFNBQVMsRUFBRSxJQUFFLENBQUMsRUFBQyxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRyxJQUFFO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLElBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxLQUFJLFNBQVMsTUFBSztBQUFDLG1CQUFPLFdBQVcsS0FBSyxXQUFXLEdBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxNQUFLLFNBQVMsT0FBTTtBQUFDLG1CQUFPLFdBQVcsS0FBSyxXQUFXLEdBQUcsSUFBRSxFQUFFO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUM7QUFBQSxVQUFDLEdBQUUsTUFBSyxTQUFTLE9BQU07QUFBQyxtQkFBTyxJQUFJLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRyxJQUFFLE1BQUk7QUFBQSxVQUFFLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsSUFBRSxNQUFJLEVBQUU7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxJQUFJLEdBQUcsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFFLEVBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHLFdBQVcsS0FBSyxVQUFVLENBQUMsSUFBRSxXQUFXLEtBQUssVUFBVSxDQUFDO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sR0FBRyxJQUFFLEtBQUcsV0FBVyxLQUFLLFVBQVUsQ0FBQyxJQUFFLFdBQVcsS0FBSyxVQUFVLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHLElBQUUsS0FBRyxXQUFXLEtBQUssVUFBVSxDQUFDLElBQUUsV0FBVyxLQUFLLFVBQVUsQ0FBQztBQUFBLFVBQUMsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHLFdBQVcsS0FBSyxVQUFVLENBQUMsSUFBRSxXQUFXLEtBQUssVUFBVSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sTUFBSSxRQUFNLE1BQUksU0FBTyxPQUFPLElBQUksRUFBRSxNQUFNLFFBQVEsS0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsUUFBUSxjQUFhLEVBQUUsRUFBRSxRQUFRLGNBQWEsS0FBSztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG9CQUFPLEdBQUcsSUFBRSxJQUFFLE1BQUksT0FBSyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUUsRUFBRSxJQUFFLE1BQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFFLElBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG9CQUFPLEdBQUcsSUFBRSxJQUFFLE1BQUksT0FBSyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUUsRUFBRSxHQUFFLENBQUMsSUFBRSxNQUFJ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LE1BQUksQ0FBQyxtQkFBbUI7QUFDdEIsV0FBTyxLQUFLLDJCQUF1Qiw0QkFBUyxNQUFNLE1BQU0sQ0FBQztBQUFBLENBQUs7QUFDOUQsV0FBTyxLQUFLLFFBQVE7QUFDcEIsVUFBTSxhQUFhLFNBQ2hCLE1BQU0sR0FBRyxFQUNULElBQUksQ0FBQyxjQUFjLFVBQVUsS0FBSyxDQUFDLEVBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLE1BQU07QUFFM0MsZUFBVyxhQUFhLFlBQVk7QUFDbEMsTUFBQUEsSUFBRyxRQUFRLFNBQVMsRUFBRSxJQUFJO0FBQUEsSUFDNUI7QUFFQSxvQkFBZ0IsVUFBTSw0QkFBUyxJQUFJLENBQUM7QUFBQSxFQUN0QztBQUNGO0FBRUEsZUFBZSxVQUFVO0FBRXZCLFFBQU0sb0JBQW9CLGVBQWU7QUFDekMsTUFBSSxrQkFBbUIsUUFBTyxLQUFLLHVDQUF1QztBQUUxRSxRQUFNLGVBQWUscUJBQXFCO0FBRTFDLFFBQU0sb0JBQWdCLDRCQUFLLDBCQUFJLEdBQUcsWUFBWTtBQUM5QyxRQUFNLGlCQUFpQixVQUFNLHlCQUFRLGFBQWE7QUFDbEQsaUJBQWUsS0FBSztBQUtwQixhQUFXLGlCQUFpQixnQkFBZ0I7QUFDMUMsVUFBTSxnQkFBWSx3QkFBSyxlQUFlLGFBQWEsQ0FBQztBQUFBLEVBQ3REO0FBRUEsTUFBSSxxQkFBcUIsY0FBYztBQUNyQyx5QkFBcUIsWUFBWTtBQUFBLEVBQ25DO0FBQ0Y7QUFFQSxLQUFLLFFBQVE7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiam9pbiIsICJwYXRoIiwgImkiLCAiZXhwb3J0cyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJkYiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJEYXRhYmFzZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJEYXRhYmFzZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJlcnIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXJyIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImkiLCAibm9kZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJlcnIiLCAibiIsICJyZWxlYXNlZEJ1Zk9iaiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJqb2luIiwgIkZpbmFsaXphdGlvblJlZ2lzdHJ5IiwgIldlYWtSZWYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiam9pbiIsICJvbkV4aXQiLCAiZml4VGFyZ2V0IiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0cmluZ2lmeSIsICJfIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImJpbmRpbmdzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInZhbHVlIiwgImpvaW4iLCAidG1wIiwgImtleSIsICJyZXMiLCAic3RyaW5naWZ5IiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0cmVhbUxldmVscyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJwaW5vIiwgInNlcmlhbGl6ZXJzIiwgInRpbWUiLCAiZXhwb3J0cyIsICJjb2xvcnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiY2IiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicmVxdWlyZV9jb25zdGFudHMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiTGVnYWN5Q2FjaGUiLCAiX2EiLCAiaW5kZXgiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiX3R5cGVvZiIsICJvYmoiLCAiZ2xvYmFsIiwgIl8iLCAiRCIsICJ5IiwgInBhZCIsICJnZXREYXlOYW1lIiwgInRvZGF5X2QiLCAidG9kYXlfbSIsICJ0b2RheV95IiwgInllc3RlcmRheV9kIiwgInllc3RlcmRheV9tIiwgInllc3RlcmRheV95IiwgInRvbW9ycm93X2QiLCAidG9tb3Jyb3dfbSIsICJ0b21vcnJvd195IiwgImdldFdlZWsiLCAiZ2V0RGF5T2ZXZWVrIiwgImtpbmRPZiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJwbGFpbiIsICJlcnJvcnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicHJldHR5IiwgImltcG9ydF9ub2RlX3BhdGgiLCAiaW1wb3J0X25vZGVfcGF0aCIsICJwaW5vIiwgIlBpbm9QcmV0dHkiLCAiRGIiLCAiaW1wb3J0X25vZGVfcHJvY2VzcyIsICJkYiJdCn0K
