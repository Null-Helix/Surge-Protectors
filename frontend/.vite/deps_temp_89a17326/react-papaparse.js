import {
  __commonJS,
  __toESM,
  require_react
} from "./chunk-UPDK7Z2H.js";

// node_modules/papaparse/papaparse.min.js
var require_papaparse_min = __commonJS({
  "node_modules/papaparse/papaparse.min.js"(exports, module) {
    !function(e2, t2) {
      "function" == typeof define && define.amd ? define([], t2) : "object" == typeof module && "undefined" != typeof exports ? module.exports = t2() : e2.Papa = t2();
    }(exports, function s2() {
      "use strict";
      var f2 = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== f2 ? f2 : {};
      var n2 = !f2.document && !!f2.postMessage, o2 = f2.IS_PAPA_WORKER || false, a2 = {}, u2 = 0, b2 = { parse: function(e2, t2) {
        var r3 = (t2 = t2 || {}).dynamicTyping || false;
        J(r3) && (t2.dynamicTypingFunction = r3, r3 = {});
        if (t2.dynamicTyping = r3, t2.transform = !!J(t2.transform) && t2.transform, t2.worker && b2.WORKERS_SUPPORTED) {
          var i2 = function() {
            if (!b2.WORKERS_SUPPORTED)
              return false;
            var e3 = (r4 = f2.URL || f2.webkitURL || null, i3 = s2.toString(), b2.BLOB_URL || (b2.BLOB_URL = r4.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", i3, ")();"], { type: "text/javascript" })))), t3 = new f2.Worker(e3);
            var r4, i3;
            return t3.onmessage = _2, t3.id = u2++, a2[t3.id] = t3;
          }();
          return i2.userStep = t2.step, i2.userChunk = t2.chunk, i2.userComplete = t2.complete, i2.userError = t2.error, t2.step = J(t2.step), t2.chunk = J(t2.chunk), t2.complete = J(t2.complete), t2.error = J(t2.error), delete t2.worker, void i2.postMessage({ input: e2, config: t2, workerId: i2.id });
        }
        var n3 = null;
        b2.NODE_STREAM_INPUT, "string" == typeof e2 ? (e2 = function(e3) {
          if (65279 === e3.charCodeAt(0))
            return e3.slice(1);
          return e3;
        }(e2), n3 = t2.download ? new l2(t2) : new p2(t2)) : true === e2.readable && J(e2.read) && J(e2.on) ? n3 = new g2(t2) : (f2.File && e2 instanceof File || e2 instanceof Object) && (n3 = new c2(t2));
        return n3.stream(e2);
      }, unparse: function(e2, t2) {
        var n3 = false, _3 = true, m3 = ",", y3 = "\r\n", s3 = '"', a3 = s3 + s3, r3 = false, i2 = null, o3 = false;
        !function() {
          if ("object" != typeof t2)
            return;
          "string" != typeof t2.delimiter || b2.BAD_DELIMITERS.filter(function(e3) {
            return -1 !== t2.delimiter.indexOf(e3);
          }).length || (m3 = t2.delimiter);
          ("boolean" == typeof t2.quotes || "function" == typeof t2.quotes || Array.isArray(t2.quotes)) && (n3 = t2.quotes);
          "boolean" != typeof t2.skipEmptyLines && "string" != typeof t2.skipEmptyLines || (r3 = t2.skipEmptyLines);
          "string" == typeof t2.newline && (y3 = t2.newline);
          "string" == typeof t2.quoteChar && (s3 = t2.quoteChar);
          "boolean" == typeof t2.header && (_3 = t2.header);
          if (Array.isArray(t2.columns)) {
            if (0 === t2.columns.length)
              throw new Error("Option columns is empty");
            i2 = t2.columns;
          }
          void 0 !== t2.escapeChar && (a3 = t2.escapeChar + s3);
          ("boolean" == typeof t2.escapeFormulae || t2.escapeFormulae instanceof RegExp) && (o3 = t2.escapeFormulae instanceof RegExp ? t2.escapeFormulae : /^[=+\-@\t\r].*$/);
        }();
        var u3 = new RegExp(Q(s3), "g");
        "string" == typeof e2 && (e2 = JSON.parse(e2));
        if (Array.isArray(e2)) {
          if (!e2.length || Array.isArray(e2[0]))
            return h3(null, e2, r3);
          if ("object" == typeof e2[0])
            return h3(i2 || Object.keys(e2[0]), e2, r3);
        } else if ("object" == typeof e2)
          return "string" == typeof e2.data && (e2.data = JSON.parse(e2.data)), Array.isArray(e2.data) && (e2.fields || (e2.fields = e2.meta && e2.meta.fields || i2), e2.fields || (e2.fields = Array.isArray(e2.data[0]) ? e2.fields : "object" == typeof e2.data[0] ? Object.keys(e2.data[0]) : []), Array.isArray(e2.data[0]) || "object" == typeof e2.data[0] || (e2.data = [e2.data])), h3(e2.fields || [], e2.data || [], r3);
        throw new Error("Unable to serialize unrecognized input");
        function h3(e3, t3, r4) {
          var i3 = "";
          "string" == typeof e3 && (e3 = JSON.parse(e3)), "string" == typeof t3 && (t3 = JSON.parse(t3));
          var n4 = Array.isArray(e3) && 0 < e3.length, s4 = !Array.isArray(t3[0]);
          if (n4 && _3) {
            for (var a4 = 0; a4 < e3.length; a4++)
              0 < a4 && (i3 += m3), i3 += v3(e3[a4], a4);
            0 < t3.length && (i3 += y3);
          }
          for (var o4 = 0; o4 < t3.length; o4++) {
            var u4 = n4 ? e3.length : t3[o4].length, h4 = false, f3 = n4 ? 0 === Object.keys(t3[o4]).length : 0 === t3[o4].length;
            if (r4 && !n4 && (h4 = "greedy" === r4 ? "" === t3[o4].join("").trim() : 1 === t3[o4].length && 0 === t3[o4][0].length), "greedy" === r4 && n4) {
              for (var d3 = [], l3 = 0; l3 < u4; l3++) {
                var c3 = s4 ? e3[l3] : l3;
                d3.push(t3[o4][c3]);
              }
              h4 = "" === d3.join("").trim();
            }
            if (!h4) {
              for (var p3 = 0; p3 < u4; p3++) {
                0 < p3 && !f3 && (i3 += m3);
                var g3 = n4 && s4 ? e3[p3] : p3;
                i3 += v3(t3[o4][g3], p3);
              }
              o4 < t3.length - 1 && (!r4 || 0 < u4 && !f3) && (i3 += y3);
            }
          }
          return i3;
        }
        function v3(e3, t3) {
          if (null == e3)
            return "";
          if (e3.constructor === Date)
            return JSON.stringify(e3).slice(1, 25);
          var r4 = false;
          o3 && "string" == typeof e3 && o3.test(e3) && (e3 = "'" + e3, r4 = true);
          var i3 = e3.toString().replace(u3, a3);
          return (r4 = r4 || true === n3 || "function" == typeof n3 && n3(e3, t3) || Array.isArray(n3) && n3[t3] || function(e4, t4) {
            for (var r5 = 0; r5 < t4.length; r5++)
              if (-1 < e4.indexOf(t4[r5]))
                return true;
            return false;
          }(i3, b2.BAD_DELIMITERS) || -1 < i3.indexOf(m3) || " " === i3.charAt(0) || " " === i3.charAt(i3.length - 1)) ? s3 + i3 + s3 : i3;
        }
      } };
      if (b2.RECORD_SEP = String.fromCharCode(30), b2.UNIT_SEP = String.fromCharCode(31), b2.BYTE_ORDER_MARK = "\uFEFF", b2.BAD_DELIMITERS = ["\r", "\n", '"', b2.BYTE_ORDER_MARK], b2.WORKERS_SUPPORTED = !n2 && !!f2.Worker, b2.NODE_STREAM_INPUT = 1, b2.LocalChunkSize = 10485760, b2.RemoteChunkSize = 5242880, b2.DefaultDelimiter = ",", b2.Parser = E2, b2.ParserHandle = r2, b2.NetworkStreamer = l2, b2.FileStreamer = c2, b2.StringStreamer = p2, b2.ReadableStreamStreamer = g2, f2.jQuery) {
        var d2 = f2.jQuery;
        d2.fn.parse = function(o3) {
          var r3 = o3.config || {}, u3 = [];
          return this.each(function(e3) {
            if (!("INPUT" === d2(this).prop("tagName").toUpperCase() && "file" === d2(this).attr("type").toLowerCase() && f2.FileReader) || !this.files || 0 === this.files.length)
              return true;
            for (var t2 = 0; t2 < this.files.length; t2++)
              u3.push({ file: this.files[t2], inputElem: this, instanceConfig: d2.extend({}, r3) });
          }), e2(), this;
          function e2() {
            if (0 !== u3.length) {
              var e3, t2, r4, i2, n3 = u3[0];
              if (J(o3.before)) {
                var s3 = o3.before(n3.file, n3.inputElem);
                if ("object" == typeof s3) {
                  if ("abort" === s3.action)
                    return e3 = "AbortError", t2 = n3.file, r4 = n3.inputElem, i2 = s3.reason, void (J(o3.error) && o3.error({ name: e3 }, t2, r4, i2));
                  if ("skip" === s3.action)
                    return void h3();
                  "object" == typeof s3.config && (n3.instanceConfig = d2.extend(n3.instanceConfig, s3.config));
                } else if ("skip" === s3)
                  return void h3();
              }
              var a3 = n3.instanceConfig.complete;
              n3.instanceConfig.complete = function(e4) {
                J(a3) && a3(e4, n3.file, n3.inputElem), h3();
              }, b2.parse(n3.file, n3.instanceConfig);
            } else
              J(o3.complete) && o3.complete();
          }
          function h3() {
            u3.splice(0, 1), e2();
          }
        };
      }
      function h2(e2) {
        this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, (function(e3) {
          var t2 = w2(e3);
          t2.chunkSize = parseInt(t2.chunkSize), e3.step || e3.chunk || (t2.chunkSize = null);
          this._handle = new r2(t2), (this._handle.streamer = this)._config = t2;
        }).call(this, e2), this.parseChunk = function(e3, t2) {
          if (this.isFirstChunk && J(this._config.beforeFirstChunk)) {
            var r3 = this._config.beforeFirstChunk(e3);
            void 0 !== r3 && (e3 = r3);
          }
          this.isFirstChunk = false, this._halted = false;
          var i2 = this._partialLine + e3;
          this._partialLine = "";
          var n3 = this._handle.parse(i2, this._baseIndex, !this._finished);
          if (!this._handle.paused() && !this._handle.aborted()) {
            var s3 = n3.meta.cursor;
            this._finished || (this._partialLine = i2.substring(s3 - this._baseIndex), this._baseIndex = s3), n3 && n3.data && (this._rowCount += n3.data.length);
            var a3 = this._finished || this._config.preview && this._rowCount >= this._config.preview;
            if (o2)
              f2.postMessage({ results: n3, workerId: b2.WORKER_ID, finished: a3 });
            else if (J(this._config.chunk) && !t2) {
              if (this._config.chunk(n3, this._handle), this._handle.paused() || this._handle.aborted())
                return void (this._halted = true);
              n3 = void 0, this._completeResults = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n3.data), this._completeResults.errors = this._completeResults.errors.concat(n3.errors), this._completeResults.meta = n3.meta), this._completed || !a3 || !J(this._config.complete) || n3 && n3.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), a3 || n3 && n3.meta.paused || this._nextChunk(), n3;
          }
          this._halted = true;
        }, this._sendError = function(e3) {
          J(this._config.error) ? this._config.error(e3) : o2 && this._config.error && f2.postMessage({ workerId: b2.WORKER_ID, error: e3, finished: false });
        };
      }
      function l2(e2) {
        var i2;
        (e2 = e2 || {}).chunkSize || (e2.chunkSize = b2.RemoteChunkSize), h2.call(this, e2), this._nextChunk = n2 ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(e3) {
          this._input = e3, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished)
            this._chunkLoaded();
          else {
            if (i2 = new XMLHttpRequest(), this._config.withCredentials && (i2.withCredentials = this._config.withCredentials), n2 || (i2.onload = v2(this._chunkLoaded, this), i2.onerror = v2(this._chunkError, this)), i2.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n2), this._config.downloadRequestHeaders) {
              var e3 = this._config.downloadRequestHeaders;
              for (var t2 in e3)
                i2.setRequestHeader(t2, e3[t2]);
            }
            if (this._config.chunkSize) {
              var r3 = this._start + this._config.chunkSize - 1;
              i2.setRequestHeader("Range", "bytes=" + this._start + "-" + r3);
            }
            try {
              i2.send(this._config.downloadRequestBody);
            } catch (e4) {
              this._chunkError(e4.message);
            }
            n2 && 0 === i2.status && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          4 === i2.readyState && (i2.status < 200 || 400 <= i2.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : i2.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(e3) {
            var t2 = e3.getResponseHeader("Content-Range");
            if (null === t2)
              return -1;
            return parseInt(t2.substring(t2.lastIndexOf("/") + 1));
          }(i2), this.parseChunk(i2.responseText)));
        }, this._chunkError = function(e3) {
          var t2 = i2.statusText || e3;
          this._sendError(new Error(t2));
        };
      }
      function c2(e2) {
        var i2, n3;
        (e2 = e2 || {}).chunkSize || (e2.chunkSize = b2.LocalChunkSize), h2.call(this, e2);
        var s3 = "undefined" != typeof FileReader;
        this.stream = function(e3) {
          this._input = e3, n3 = e3.slice || e3.webkitSlice || e3.mozSlice, s3 ? ((i2 = new FileReader()).onload = v2(this._chunkLoaded, this), i2.onerror = v2(this._chunkError, this)) : i2 = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var e3 = this._input;
          if (this._config.chunkSize) {
            var t2 = Math.min(this._start + this._config.chunkSize, this._input.size);
            e3 = n3.call(e3, this._start, t2);
          }
          var r3 = i2.readAsText(e3, this._config.encoding);
          s3 || this._chunkLoaded({ target: { result: r3 } });
        }, this._chunkLoaded = function(e3) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e3.target.result);
        }, this._chunkError = function() {
          this._sendError(i2.error);
        };
      }
      function p2(e2) {
        var r3;
        h2.call(this, e2 = e2 || {}), this.stream = function(e3) {
          return r3 = e3, this._nextChunk();
        }, this._nextChunk = function() {
          if (!this._finished) {
            var e3, t2 = this._config.chunkSize;
            return t2 ? (e3 = r3.substring(0, t2), r3 = r3.substring(t2)) : (e3 = r3, r3 = ""), this._finished = !r3, this.parseChunk(e3);
          }
        };
      }
      function g2(e2) {
        h2.call(this, e2 = e2 || {});
        var t2 = [], r3 = true, i2 = false;
        this.pause = function() {
          h2.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          h2.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e3) {
          this._input = e3, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          i2 && 1 === t2.length && (this._finished = true);
        }, this._nextChunk = function() {
          this._checkIsFinished(), t2.length ? this.parseChunk(t2.shift()) : r3 = true;
        }, this._streamData = v2(function(e3) {
          try {
            t2.push("string" == typeof e3 ? e3 : e3.toString(this._config.encoding)), r3 && (r3 = false, this._checkIsFinished(), this.parseChunk(t2.shift()));
          } catch (e4) {
            this._streamError(e4);
          }
        }, this), this._streamError = v2(function(e3) {
          this._streamCleanUp(), this._sendError(e3);
        }, this), this._streamEnd = v2(function() {
          this._streamCleanUp(), i2 = true, this._streamData("");
        }, this), this._streamCleanUp = v2(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function r2(m3) {
        var a3, o3, u3, i2 = Math.pow(2, 53), n3 = -i2, s3 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, h3 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, t2 = this, r3 = 0, f3 = 0, d3 = false, e2 = false, l3 = [], c3 = { data: [], errors: [], meta: {} };
        if (J(m3.step)) {
          var p3 = m3.step;
          m3.step = function(e3) {
            if (c3 = e3, _3())
              g3();
            else {
              if (g3(), 0 === c3.data.length)
                return;
              r3 += e3.data.length, m3.preview && r3 > m3.preview ? o3.abort() : (c3.data = c3.data[0], p3(c3, t2));
            }
          };
        }
        function y3(e3) {
          return "greedy" === m3.skipEmptyLines ? "" === e3.join("").trim() : 1 === e3.length && 0 === e3[0].length;
        }
        function g3() {
          return c3 && u3 && (k2("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b2.DefaultDelimiter + "'"), u3 = false), m3.skipEmptyLines && (c3.data = c3.data.filter(function(e3) {
            return !y3(e3);
          })), _3() && function() {
            if (!c3)
              return;
            function e3(e4, t4) {
              J(m3.transformHeader) && (e4 = m3.transformHeader(e4, t4)), l3.push(e4);
            }
            if (Array.isArray(c3.data[0])) {
              for (var t3 = 0; _3() && t3 < c3.data.length; t3++)
                c3.data[t3].forEach(e3);
              c3.data.splice(0, 1);
            } else
              c3.data.forEach(e3);
          }(), function() {
            if (!c3 || !m3.header && !m3.dynamicTyping && !m3.transform)
              return c3;
            function e3(e4, t4) {
              var r4, i3 = m3.header ? {} : [];
              for (r4 = 0; r4 < e4.length; r4++) {
                var n4 = r4, s4 = e4[r4];
                m3.header && (n4 = r4 >= l3.length ? "__parsed_extra" : l3[r4]), m3.transform && (s4 = m3.transform(s4, n4)), s4 = v3(n4, s4), "__parsed_extra" === n4 ? (i3[n4] = i3[n4] || [], i3[n4].push(s4)) : i3[n4] = s4;
              }
              return m3.header && (r4 > l3.length ? k2("FieldMismatch", "TooManyFields", "Too many fields: expected " + l3.length + " fields but parsed " + r4, f3 + t4) : r4 < l3.length && k2("FieldMismatch", "TooFewFields", "Too few fields: expected " + l3.length + " fields but parsed " + r4, f3 + t4)), i3;
            }
            var t3 = 1;
            !c3.data.length || Array.isArray(c3.data[0]) ? (c3.data = c3.data.map(e3), t3 = c3.data.length) : c3.data = e3(c3.data, 0);
            m3.header && c3.meta && (c3.meta.fields = l3);
            return f3 += t3, c3;
          }();
        }
        function _3() {
          return m3.header && 0 === l3.length;
        }
        function v3(e3, t3) {
          return r4 = e3, m3.dynamicTypingFunction && void 0 === m3.dynamicTyping[r4] && (m3.dynamicTyping[r4] = m3.dynamicTypingFunction(r4)), true === (m3.dynamicTyping[r4] || m3.dynamicTyping) ? "true" === t3 || "TRUE" === t3 || "false" !== t3 && "FALSE" !== t3 && (function(e4) {
            if (s3.test(e4)) {
              var t4 = parseFloat(e4);
              if (n3 < t4 && t4 < i2)
                return true;
            }
            return false;
          }(t3) ? parseFloat(t3) : h3.test(t3) ? new Date(t3) : "" === t3 ? null : t3) : t3;
          var r4;
        }
        function k2(e3, t3, r4, i3) {
          var n4 = { type: e3, code: t3, message: r4 };
          void 0 !== i3 && (n4.row = i3), c3.errors.push(n4);
        }
        this.parse = function(e3, t3, r4) {
          var i3 = m3.quoteChar || '"';
          if (m3.newline || (m3.newline = function(e4, t4) {
            e4 = e4.substring(0, 1048576);
            var r5 = new RegExp(Q(t4) + "([^]*?)" + Q(t4), "gm"), i4 = (e4 = e4.replace(r5, "")).split("\r"), n5 = e4.split("\n"), s5 = 1 < n5.length && n5[0].length < i4[0].length;
            if (1 === i4.length || s5)
              return "\n";
            for (var a4 = 0, o4 = 0; o4 < i4.length; o4++)
              "\n" === i4[o4][0] && a4++;
            return a4 >= i4.length / 2 ? "\r\n" : "\r";
          }(e3, i3)), u3 = false, m3.delimiter)
            J(m3.delimiter) && (m3.delimiter = m3.delimiter(e3), c3.meta.delimiter = m3.delimiter);
          else {
            var n4 = function(e4, t4, r5, i4, n5) {
              var s5, a4, o4, u4;
              n5 = n5 || [",", "	", "|", ";", b2.RECORD_SEP, b2.UNIT_SEP];
              for (var h4 = 0; h4 < n5.length; h4++) {
                var f4 = n5[h4], d4 = 0, l4 = 0, c4 = 0;
                o4 = void 0;
                for (var p4 = new E2({ comments: i4, delimiter: f4, newline: t4, preview: 10 }).parse(e4), g4 = 0; g4 < p4.data.length; g4++)
                  if (r5 && y3(p4.data[g4]))
                    c4++;
                  else {
                    var _4 = p4.data[g4].length;
                    l4 += _4, void 0 !== o4 ? 0 < _4 && (d4 += Math.abs(_4 - o4), o4 = _4) : o4 = _4;
                  }
                0 < p4.data.length && (l4 /= p4.data.length - c4), (void 0 === a4 || d4 <= a4) && (void 0 === u4 || u4 < l4) && 1.99 < l4 && (a4 = d4, s5 = f4, u4 = l4);
              }
              return { successful: !!(m3.delimiter = s5), bestDelimiter: s5 };
            }(e3, m3.newline, m3.skipEmptyLines, m3.comments, m3.delimitersToGuess);
            n4.successful ? m3.delimiter = n4.bestDelimiter : (u3 = true, m3.delimiter = b2.DefaultDelimiter), c3.meta.delimiter = m3.delimiter;
          }
          var s4 = w2(m3);
          return m3.preview && m3.header && s4.preview++, a3 = e3, o3 = new E2(s4), c3 = o3.parse(a3, t3, r4), g3(), d3 ? { meta: { paused: true } } : c3 || { meta: { paused: false } };
        }, this.paused = function() {
          return d3;
        }, this.pause = function() {
          d3 = true, o3.abort(), a3 = J(m3.chunk) ? "" : a3.substring(o3.getCharIndex());
        }, this.resume = function() {
          t2.streamer._halted ? (d3 = false, t2.streamer.parseChunk(a3, true)) : setTimeout(t2.resume, 3);
        }, this.aborted = function() {
          return e2;
        }, this.abort = function() {
          e2 = true, o3.abort(), c3.meta.aborted = true, J(m3.complete) && m3.complete(c3), a3 = "";
        };
      }
      function Q(e2) {
        return e2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function E2(j2) {
        var z2, M2 = (j2 = j2 || {}).delimiter, P2 = j2.newline, U2 = j2.comments, q2 = j2.step, N2 = j2.preview, B2 = j2.fastMode, K2 = z2 = void 0 === j2.quoteChar || null === j2.quoteChar ? '"' : j2.quoteChar;
        if (void 0 !== j2.escapeChar && (K2 = j2.escapeChar), ("string" != typeof M2 || -1 < b2.BAD_DELIMITERS.indexOf(M2)) && (M2 = ","), U2 === M2)
          throw new Error("Comment character same as delimiter");
        true === U2 ? U2 = "#" : ("string" != typeof U2 || -1 < b2.BAD_DELIMITERS.indexOf(U2)) && (U2 = false), "\n" !== P2 && "\r" !== P2 && "\r\n" !== P2 && (P2 = "\n");
        var W = 0, H = false;
        this.parse = function(i2, t2, r3) {
          if ("string" != typeof i2)
            throw new Error("Input must be a string");
          var n3 = i2.length, e2 = M2.length, s3 = P2.length, a3 = U2.length, o3 = J(q2), u3 = [], h3 = [], f3 = [], d3 = W = 0;
          if (!i2)
            return L2();
          if (j2.header && !t2) {
            var l3 = i2.split(P2)[0].split(M2), c3 = [], p3 = {}, g3 = false;
            for (var _3 in l3) {
              var m3 = l3[_3];
              J(j2.transformHeader) && (m3 = j2.transformHeader(m3, _3));
              var y3 = m3, v3 = p3[m3] || 0;
              for (0 < v3 && (g3 = true, y3 = m3 + "_" + v3), p3[m3] = v3 + 1; c3.includes(y3); )
                y3 = y3 + "_" + v3;
              c3.push(y3);
            }
            if (g3) {
              var k2 = i2.split(P2);
              k2[0] = c3.join(M2), i2 = k2.join(P2);
            }
          }
          if (B2 || false !== B2 && -1 === i2.indexOf(z2)) {
            for (var b3 = i2.split(P2), E3 = 0; E3 < b3.length; E3++) {
              if (f3 = b3[E3], W += f3.length, E3 !== b3.length - 1)
                W += P2.length;
              else if (r3)
                return L2();
              if (!U2 || f3.substring(0, a3) !== U2) {
                if (o3) {
                  if (u3 = [], I2(f3.split(M2)), F2(), H)
                    return L2();
                } else
                  I2(f3.split(M2));
                if (N2 && N2 <= E3)
                  return u3 = u3.slice(0, N2), L2(true);
              }
            }
            return L2();
          }
          for (var w3 = i2.indexOf(M2, W), R2 = i2.indexOf(P2, W), C2 = new RegExp(Q(K2) + Q(z2), "g"), S2 = i2.indexOf(z2, W); ; )
            if (i2[W] !== z2)
              if (U2 && 0 === f3.length && i2.substring(W, W + a3) === U2) {
                if (-1 === R2)
                  return L2();
                W = R2 + s3, R2 = i2.indexOf(P2, W), w3 = i2.indexOf(M2, W);
              } else if (-1 !== w3 && (w3 < R2 || -1 === R2))
                f3.push(i2.substring(W, w3)), W = w3 + e2, w3 = i2.indexOf(M2, W);
              else {
                if (-1 === R2)
                  break;
                if (f3.push(i2.substring(W, R2)), D2(R2 + s3), o3 && (F2(), H))
                  return L2();
                if (N2 && u3.length >= N2)
                  return L2(true);
              }
            else
              for (S2 = W, W++; ; ) {
                if (-1 === (S2 = i2.indexOf(z2, S2 + 1)))
                  return r3 || h3.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: u3.length, index: W }), T2();
                if (S2 === n3 - 1)
                  return T2(i2.substring(W, S2).replace(C2, z2));
                if (z2 !== K2 || i2[S2 + 1] !== K2) {
                  if (z2 === K2 || 0 === S2 || i2[S2 - 1] !== K2) {
                    -1 !== w3 && w3 < S2 + 1 && (w3 = i2.indexOf(M2, S2 + 1)), -1 !== R2 && R2 < S2 + 1 && (R2 = i2.indexOf(P2, S2 + 1));
                    var O2 = A2(-1 === R2 ? w3 : Math.min(w3, R2));
                    if (i2.substr(S2 + 1 + O2, e2) === M2) {
                      f3.push(i2.substring(W, S2).replace(C2, z2)), i2[W = S2 + 1 + O2 + e2] !== z2 && (S2 = i2.indexOf(z2, W)), w3 = i2.indexOf(M2, W), R2 = i2.indexOf(P2, W);
                      break;
                    }
                    var x2 = A2(R2);
                    if (i2.substring(S2 + 1 + x2, S2 + 1 + x2 + s3) === P2) {
                      if (f3.push(i2.substring(W, S2).replace(C2, z2)), D2(S2 + 1 + x2 + s3), w3 = i2.indexOf(M2, W), S2 = i2.indexOf(z2, W), o3 && (F2(), H))
                        return L2();
                      if (N2 && u3.length >= N2)
                        return L2(true);
                      break;
                    }
                    h3.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: u3.length, index: W }), S2++;
                  }
                } else
                  S2++;
              }
          return T2();
          function I2(e3) {
            u3.push(e3), d3 = W;
          }
          function A2(e3) {
            var t3 = 0;
            if (-1 !== e3) {
              var r4 = i2.substring(S2 + 1, e3);
              r4 && "" === r4.trim() && (t3 = r4.length);
            }
            return t3;
          }
          function T2(e3) {
            return r3 || (void 0 === e3 && (e3 = i2.substring(W)), f3.push(e3), W = n3, I2(f3), o3 && F2()), L2();
          }
          function D2(e3) {
            W = e3, I2(f3), f3 = [], R2 = i2.indexOf(P2, W);
          }
          function L2(e3) {
            return { data: u3, errors: h3, meta: { delimiter: M2, linebreak: P2, aborted: H, truncated: !!e3, cursor: d3 + (t2 || 0) } };
          }
          function F2() {
            q2(L2()), u3 = [], h3 = [];
          }
        }, this.abort = function() {
          H = true;
        }, this.getCharIndex = function() {
          return W;
        };
      }
      function _2(e2) {
        var t2 = e2.data, r3 = a2[t2.workerId], i2 = false;
        if (t2.error)
          r3.userError(t2.error, t2.file);
        else if (t2.results && t2.results.data) {
          var n3 = { abort: function() {
            i2 = true, m2(t2.workerId, { data: [], errors: [], meta: { aborted: true } });
          }, pause: y2, resume: y2 };
          if (J(r3.userStep)) {
            for (var s3 = 0; s3 < t2.results.data.length && (r3.userStep({ data: t2.results.data[s3], errors: t2.results.errors, meta: t2.results.meta }, n3), !i2); s3++)
              ;
            delete t2.results;
          } else
            J(r3.userChunk) && (r3.userChunk(t2.results, n3, t2.file), delete t2.results);
        }
        t2.finished && !i2 && m2(t2.workerId, t2.results);
      }
      function m2(e2, t2) {
        var r3 = a2[e2];
        J(r3.userComplete) && r3.userComplete(t2), r3.terminate(), delete a2[e2];
      }
      function y2() {
        throw new Error("Not implemented.");
      }
      function w2(e2) {
        if ("object" != typeof e2 || null === e2)
          return e2;
        var t2 = Array.isArray(e2) ? [] : {};
        for (var r3 in e2)
          t2[r3] = w2(e2[r3]);
        return t2;
      }
      function v2(e2, t2) {
        return function() {
          e2.apply(t2, arguments);
        };
      }
      function J(e2) {
        return "function" == typeof e2;
      }
      return o2 && (f2.onmessage = function(e2) {
        var t2 = e2.data;
        void 0 === b2.WORKER_ID && t2 && (b2.WORKER_ID = t2.workerId);
        if ("string" == typeof t2.input)
          f2.postMessage({ workerId: b2.WORKER_ID, results: b2.parse(t2.input, t2.config), finished: true });
        else if (f2.File && t2.input instanceof File || t2.input instanceof Object) {
          var r3 = b2.parse(t2.input, t2.config);
          r3 && f2.postMessage({ workerId: b2.WORKER_ID, results: r3, finished: true });
        }
      }), (l2.prototype = Object.create(h2.prototype)).constructor = l2, (c2.prototype = Object.create(h2.prototype)).constructor = c2, (p2.prototype = Object.create(p2.prototype)).constructor = p2, (g2.prototype = Object.create(h2.prototype)).constructor = g2, b2;
    });
  }
});

// node_modules/react-papaparse/dist/react-papaparse.es.js
var import_papaparse = __toESM(require_papaparse_min());
var import_react = __toESM(require_react());
var u = function() {
  return u = Object.assign || function(e2) {
    for (var n2, t2 = 1, r2 = arguments.length; t2 < r2; t2++)
      for (var o2 in n2 = arguments[t2])
        Object.prototype.hasOwnProperty.call(n2, o2) && (e2[o2] = n2[o2]);
    return e2;
  }, u.apply(this, arguments);
};
function l(e2, n2) {
  var t2 = {};
  for (var r2 in e2)
    Object.prototype.hasOwnProperty.call(e2, r2) && n2.indexOf(r2) < 0 && (t2[r2] = e2[r2]);
  if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
    var o2 = 0;
    for (r2 = Object.getOwnPropertySymbols(e2); o2 < r2.length; o2++)
      n2.indexOf(r2[o2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, r2[o2]) && (t2[r2[o2]] = e2[r2[o2]]);
  }
  return t2;
}
function s(e2, n2, t2, r2) {
  return new (t2 || (t2 = Promise))(function(o2, i2) {
    function a2(e3) {
      try {
        u2(r2.next(e3));
      } catch (e4) {
        i2(e4);
      }
    }
    function c2(e3) {
      try {
        u2(r2.throw(e3));
      } catch (e4) {
        i2(e4);
      }
    }
    function u2(e3) {
      var n3;
      e3.done ? o2(e3.value) : (n3 = e3.value, n3 instanceof t2 ? n3 : new t2(function(e4) {
        e4(n3);
      })).then(a2, c2);
    }
    u2((r2 = r2.apply(e2, n2 || [])).next());
  });
}
function f(e2, n2) {
  var t2, r2, o2, i2, a2 = { label: 0, sent: function() {
    if (1 & o2[0])
      throw o2[1];
    return o2[1];
  }, trys: [], ops: [] };
  return i2 = { next: c2(0), throw: c2(1), return: c2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function c2(c3) {
    return function(u2) {
      return function(c4) {
        if (t2)
          throw new TypeError("Generator is already executing.");
        for (; i2 && (i2 = 0, c4[0] && (a2 = 0)), a2; )
          try {
            if (t2 = 1, r2 && (o2 = 2 & c4[0] ? r2.return : c4[0] ? r2.throw || ((o2 = r2.return) && o2.call(r2), 0) : r2.next) && !(o2 = o2.call(r2, c4[1])).done)
              return o2;
            switch (r2 = 0, o2 && (c4 = [2 & c4[0], o2.value]), c4[0]) {
              case 0:
              case 1:
                o2 = c4;
                break;
              case 4:
                return a2.label++, { value: c4[1], done: false };
              case 5:
                a2.label++, r2 = c4[1], c4 = [0];
                continue;
              case 7:
                c4 = a2.ops.pop(), a2.trys.pop();
                continue;
              default:
                if (!(o2 = a2.trys, (o2 = o2.length > 0 && o2[o2.length - 1]) || 6 !== c4[0] && 2 !== c4[0])) {
                  a2 = 0;
                  continue;
                }
                if (3 === c4[0] && (!o2 || c4[1] > o2[0] && c4[1] < o2[3])) {
                  a2.label = c4[1];
                  break;
                }
                if (6 === c4[0] && a2.label < o2[1]) {
                  a2.label = o2[1], o2 = c4;
                  break;
                }
                if (o2 && a2.label < o2[2]) {
                  a2.label = o2[2], a2.ops.push(c4);
                  break;
                }
                o2[2] && a2.ops.pop(), a2.trys.pop();
                continue;
            }
            c4 = n2.call(e2, a2);
          } catch (e3) {
            c4 = [6, e3], r2 = 0;
          } finally {
            t2 = o2 = 0;
          }
        if (5 & c4[0])
          throw c4[1];
        return { value: c4[0] ? c4[1] : void 0, done: true };
      }([c3, u2]);
    };
  }
}
function d(e2, n2, t2) {
  if (t2 || 2 === arguments.length)
    for (var r2, o2 = 0, i2 = n2.length; o2 < i2; o2++)
      !r2 && o2 in n2 || (r2 || (r2 = Array.prototype.slice.call(n2, 0, o2)), r2[o2] = n2[o2]);
  return e2.concat(r2 || Array.prototype.slice.call(n2));
}
function p(e2) {
  var n2 = 1024, t2 = 1048576, r2 = 1073741824;
  if (e2 < t2) {
    var o2 = Number((e2 / n2).toFixed(0));
    return o2 <= 0 ? e2 + " B" : o2 + " KB";
  }
  return e2 < r2 ? (e2 / t2).toFixed(0) + " MB" : e2 < 1099511627776 ? (e2 / r2).toFixed(0) + " GB" : "";
}
function v(e2, n2) {
  var t2 = false;
  "#" == e2[0] && (e2 = e2.slice(1), t2 = true);
  var r2 = parseInt(e2, 16), o2 = (r2 >> 16) + n2;
  o2 > 255 ? o2 = 255 : o2 < 0 && (o2 = 0);
  var i2 = (r2 >> 8 & 255) + n2;
  i2 > 255 ? i2 = 255 : i2 < 0 && (i2 = 0);
  var a2 = (255 & r2) + n2;
  return a2 > 255 ? a2 = 255 : a2 < 0 && (a2 = 0), (t2 ? "#" : "") + (a2 | i2 << 8 | o2 << 16).toString(16);
}
function g(e2) {
  return "function" == typeof e2.isPropagationStopped ? e2.isPropagationStopped() : void 0 !== e2.cancelBubble && e2.cancelBubble;
}
function y() {
  for (var e2 = [], n2 = 0; n2 < arguments.length; n2++)
    e2[n2] = arguments[n2];
  return function(n3) {
    for (var t2 = [], r2 = 1; r2 < arguments.length; r2++)
      t2[r2 - 1] = arguments[r2];
    return e2.some(function(e3) {
      return !g(n3) && e3 && e3.apply(void 0, d([n3], t2, false)), g(n3);
    });
  };
}
function m(e2) {
  return e2.dataTransfer ? Array.prototype.some.call(e2.dataTransfer.types, function(e3) {
    return "Files" === e3 || "application/x-moz-file" === e3;
  }) : !!e2.target && !!e2.target.files;
}
var h = function(e2) {
  e2 = Array.isArray(e2) && 1 === e2.length ? e2[0] : e2;
  var n2 = Array.isArray(e2) ? "one of ".concat(e2.join(", ")) : e2;
  return { code: "file-invalid-type", message: "File type must be ".concat(n2) };
};
function b(e2, n2) {
  var t2 = "application/x-moz-file" === e2.type || function(e3, n3) {
    if (e3 && n3) {
      var t3 = Array.isArray(n3) ? n3 : n3.split(","), r2 = e3.name || "", o2 = (e3.type || "").toLowerCase(), i2 = o2.replace(/\/.*$/, "");
      return t3.some(function(e4) {
        var n4 = e4.trim().toLowerCase();
        return "." === n4.charAt(0) ? r2.toLowerCase().endsWith(n4) : n4.endsWith("/*") ? i2 === n4.replace(/\/.*$/, "") : o2 === n4;
      });
    }
    return true;
  }(e2, n2);
  return [t2, t2 ? null : h(n2)];
}
function w(e2) {
  return null != e2;
}
var D = function(e2) {
  return { code: "file-too-large", message: "File is larger than ".concat(e2, " bytes") };
};
var F = function(e2) {
  return { code: "file-too-small", message: "File is smaller than ".concat(e2, " bytes") };
};
var E = { code: "too-many-files", message: "Too many files" };
function B(e2) {
  e2.preventDefault();
}
function P(n2, t2) {
  return import_papaparse.default.parse(n2, t2);
}
function x(n2, t2) {
  import_papaparse.default.parse(n2, Object.assign({}, { download: true }, t2));
}
function O(n2, t2) {
  return void 0 === t2 && (t2 = {}), import_papaparse.default.unparse(n2, t2);
}
function S() {
  return { readString: P, readRemoteFile: x, jsonToCSV: O };
}
var k = { Link: "link", Button: "button" };
function C() {
  return { CSVDownloader: function() {
    var t2 = this, r2 = function(r3) {
      var o2 = r3.children, i2 = r3.data, a2 = void 0 === i2 ? {} : i2, c2 = r3.filename, u2 = r3.type, l2 = void 0 === u2 ? k.Link : u2, d2 = r3.style, p2 = void 0 === d2 ? {} : d2, v2 = r3.className, g2 = void 0 === v2 ? "" : v2, y2 = r3.bom, m2 = void 0 !== y2 && y2, h2 = r3.config, b2 = void 0 === h2 ? {} : h2, w2 = function() {
        return s(t2, void 0, void 0, function() {
          var n2, t3, r4, o3, i3, u3;
          return f(this, function(l3) {
            switch (l3.label) {
              case 0:
                return n2 = m2 ? "\uFEFF" : "", t3 = null, r4 = null, "function" != typeof a2 ? [3, 2] : [4, a2()];
              case 1:
                a2 = l3.sent(), l3.label = 2;
              case 2:
                return t3 = "object" == typeof a2 ? import_papaparse.default.unparse(a2, b2) : a2, o3 = new Blob(["".concat(n2).concat(t3)], { type: "text/csv;charset=utf-8;" }), i3 = window.navigator, r4 = i3.msSaveBlob ? i3.msSaveBlob(o3, "".concat(c2, ".csv")) : window.URL.createObjectURL(o3), (u3 = document.createElement("a")).href = r4, u3.setAttribute("download", "".concat(c2, ".csv")), u3.click(), u3.remove(), [2];
            }
          });
        });
      };
      return import_react.default.createElement(import_react.default.Fragment, null, l2 === k.Button ? import_react.default.createElement("button", { onClick: function() {
        return w2();
      }, style: p2, className: g2 }, o2) : import_react.default.createElement("a", { onClick: function() {
        return w2();
      }, style: p2, className: g2 }, o2));
    };
    return import_react.default.useMemo(function() {
      return r2;
    }, []);
  }(), Type: k };
}
var A = { progressBar: { borderRadius: 3, boxShadow: "inset 0 1px 3px rgba(0, 0, 0, .2)", bottom: 14, width: "100%" }, button: { position: "inherit", width: "100%" }, fill: { backgroundColor: "#659cef", borderRadius: 3, height: 10, transition: "width 500ms ease-in-out" } };
function L(e2) {
  var o2 = e2.style, i2 = e2.className, a2 = e2.display, c2 = (0, import_react.useState)(0), u2 = c2[0], l2 = c2[1];
  return (0, import_react.useEffect)(function() {
    l2(e2.percentage);
  }, [e2.percentage]), import_react.default.createElement("span", { style: Object.assign({}, A.progressBar, A.fill, o2, { width: "".concat(u2, "%"), display: a2 }), className: i2 });
}
function R(e2) {
  var t2 = e2.color, r2 = e2.width, o2 = void 0 === r2 ? 23 : r2, i2 = e2.height, a2 = void 0 === i2 ? 23 : i2;
  return import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: o2, height: a2, viewBox: "0 0 512 512" }, import_react.default.createElement("path", { fill: t2, d: "M504.1 256C504.1 119 393 7.9 256 7.9S7.9 119 7.9 256 119 504.1 256 504.1 504.1 393 504.1 256z" }), import_react.default.createElement("path", { fill: "#FFF", d: "M285 256l72.5-84.2c7.9-9.2 6.9-23-2.3-31-9.2-7.9-23-6.9-30.9 2.3L256 222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3-9.2 7.9-10.2 21.8-2.3 31L227 256l-72.5 84.2c-7.9 9.2-6.9 23 2.3 31 4.1 3.6 9.2 5.3 14.3 5.3 6.2 0 12.3-2.6 16.6-7.6l68.2-79.2 68.2 79.2c4.3 5 10.5 7.6 16.6 7.6 5.1 0 10.2-1.7 14.3-5.3 9.2-7.9 10.2-21.8 2.3-31L285 256z" }));
}
var T = "text/csv, .csv, application/vnd.ms-excel";
function j() {
  var t2 = function(t3) {
    var s2 = t3.children, f2 = t3.accept, p2 = void 0 === f2 ? T : f2, v2 = t3.config, h2 = void 0 === v2 ? {} : v2, P2 = t3.minSize, x2 = void 0 === P2 ? 0 : P2, O2 = t3.maxSize, S2 = void 0 === O2 ? 1 / 0 : O2, k2 = t3.maxFiles, C2 = void 0 === k2 ? 1 : k2, A2 = t3.disabled, j2 = void 0 !== A2 && A2, z2 = t3.noClick, N2 = void 0 !== z2 && z2, I2 = t3.noDrag, U2 = void 0 !== I2 && I2, _2 = t3.noDragEventsBubbling, q2 = void 0 !== _2 && _2, V2 = t3.noKeyboard, W = void 0 !== V2 && V2, G = t3.multiple, $ = void 0 !== G && G, H = t3.required, J = void 0 !== H && H, Q = t3.preventDropOnDocument, X = void 0 === Q || Q, Y = t3.onUploadAccepted, Z = t3.validator, ee = t3.onUploadRejected, ne = t3.onDragEnter, te = t3.onDragOver, re = t3.onDragLeave, oe = (0, import_react.useRef)(null), ie = (0, import_react.useRef)(null), ae = (0, import_react.useRef)([]), ce = (0, import_react.useReducer)(M, K), ue = ce[0], le = ce[1], se = ue.acceptedFile, fe = ue.displayProgressBar, de = ue.progressBarPercentage, pe = ue.draggedFiles, ve = ue.isFileDialogActive, ge = function(e2) {
      ie.current && ie.current.contains(e2.target) || (e2.preventDefault(), ae.current = []);
    };
    (0, import_react.useEffect)(function() {
      return X && (document.addEventListener("dragover", B, false), document.addEventListener("drop", ge, false)), function() {
        X && (document.removeEventListener("dragover", B), document.removeEventListener("drop", ge));
      };
    }, [ie, X]);
    var ye = function(e2) {
      return j2 ? null : e2;
    }, me = function(e2) {
      return U2 ? null : ye(e2);
    }, he = function(e2) {
      q2 && e2.stopPropagation();
    }, be = function(e2) {
      e2.preventDefault(e2), e2.persist(), he(e2);
    }, we = function(e2) {
      le({ displayProgressBar: e2, type: "setDisplayProgressBar" });
    }, De = function(e2) {
      le({ progressBarPercentage: e2, type: "setProgressBarPercentage" });
    }, Fe = function(e2) {
      return import_react.default.createElement(L, u({ display: fe, percentage: de }, e2));
    }, Ee = function(e2) {
      return import_react.default.createElement(R, u({}, e2));
    }, Be = (0, import_react.useCallback)(function() {
      oe.current && ue.displayProgressBar && (le({ type: "openDialog" }), oe.current.value = null, oe.current.click());
    }, [le]), Pe = function() {
      ve && setTimeout(function() {
        oe.current && (oe.current.files.length || le({ type: "closeDialog" }));
      }, 300);
    };
    (0, import_react.useEffect)(function() {
      return window.addEventListener("focus", Pe, false), function() {
        window.removeEventListener("focus", Pe, false);
      };
    }, [oe, ve]);
    var xe = (0, import_react.useCallback)(function() {
      var e2;
      N2 || (void 0 === e2 && (e2 = window.navigator.userAgent), function(e3) {
        return -1 !== e3.indexOf("MSIE") || -1 !== e3.indexOf("Trident/");
      }(e2) || function(e3) {
        return -1 !== e3.indexOf("Edge/");
      }(e2) ? setTimeout(Be, 0) : Be());
    }, [oe, N2]), Oe = (0, import_react.useCallback)(function(n2) {
      if (be(n2), De(0), ae.current = [], m(n2)) {
        if (g(n2) && !q2)
          return;
        var t4 = [], r2 = [], o2 = n2.target.files || n2.dataTransfer && n2.dataTransfer.files;
        if (Array.from(o2).forEach(function(e2) {
          var n3 = b(e2, p2), o3 = n3[0], i3 = n3[1], a3 = function(e3, n4, t5) {
            if (w(e3.size))
              if (w(n4) && w(t5)) {
                if (e3.size > t5)
                  return [false, D(t5)];
                if (e3.size < n4)
                  return [false, F(n4)];
              } else {
                if (w(n4) && e3.size < n4)
                  return [false, F(n4)];
                if (w(t5) && e3.size > t5)
                  return [false, D(t5)];
              }
            return [true, null];
          }(e2, x2, S2), c3 = a3[0], u3 = a3[1], l3 = Z ? Z(e2) : null;
          if (o3 && c3 && !l3)
            t4.push(e2);
          else {
            var s4 = [i3, u3];
            l3 && (s4 = s4.concat(l3)), r2.push({ file: e2, errors: s4.filter(function(e3) {
              return e3;
            }) });
          }
        }), (!$ && t4.length > 1 || $ && C2 >= 1 && t4.length > C2) && (t4.forEach(function(e2) {
          r2.push({ file: e2, errors: [E] });
        }), t4.splice(0)), le({ acceptedFiles: t4, fileRejections: r2, type: "setFiles" }), we("block"), r2.length > 0 && ee && ee(r2, n2), t4.length > 0 && Y) {
          var i2 = {}, a2 = [], c2 = [], u2 = [], l2 = new window.FileReader(), s3 = 0;
          t4.forEach(function(n3) {
            le({ acceptedFile: n3, type: "setFile" }), i2 = { complete: (null == h2 ? void 0 : h2.complete) || (null == h2 ? void 0 : h2.step) ? h2.complete : function() {
              Y({ data: a2, errors: c2, meta: u2 }, n3);
            }, step: (null == h2 ? void 0 : h2.step) ? h2.step : function(e2) {
              if (a2.push(e2.data), e2.errors.length > 0 && c2.push(e2.errors), e2.length > 0 && u2.push(e2[0].meta), h2 && h2.preview) {
                if (s3 = Math.round(a2.length / h2.preview * 100), a2.length === h2.preview)
                  Y({ data: a2, errors: c2, meta: u2 }, n3);
              } else {
                var t5 = e2.meta.cursor, r3 = Math.round(t5 / n3.size * 100);
                if (r3 === s3)
                  return;
                s3 = r3;
              }
              De(s3);
            } }, i2 = Object.assign({}, h2, i2), l2.onload = function(n4) {
              import_papaparse.default.parse(n4.target.result, i2);
            }, l2.onloadend = function() {
              setTimeout(function() {
                we("none");
              }, 2e3);
            }, l2.readAsText(n3, h2.encoding || "utf-8");
          });
        }
      }
    }, [$, p2, x2, S2, C2, Z, Y]), Se = (0, import_react.useCallback)(function(e2) {
      he(e2);
    }, []), ke = function(e2) {
      return W ? null : ye(e2);
    }, Ce = (0, import_react.useCallback)(function(e2) {
      if (be(e2), ae.current = d(d([], ae.current, true), [e2.target], false), m(e2)) {
        if (g(e2) && !q2)
          return;
        le({ draggedFiles: pe, isDragActive: true, type: "setDraggedFiles" }), ne && ne(e2);
      }
    }, [ne, q2]), Ae = (0, import_react.useCallback)(function(e2) {
      be(e2);
      var n2 = m(e2);
      if (n2 && e2.dataTransfer)
        try {
          e2.dataTransfer.dropEffect = "copy";
        } catch (e3) {
        }
      return n2 && te && te(e2), false;
    }, [te, q2]), Le = (0, import_react.useCallback)(function(e2) {
      be(e2);
      var n2 = ae.current.filter(function(e3) {
        return ie.current && ie.current.contains(e3);
      }), t4 = n2.indexOf(e2.target);
      -1 !== t4 && n2.splice(t4, 1), ae.current = n2, n2.length > 0 || (le({ isDragActive: false, type: "setDraggedFiles", draggedFiles: [] }), m(e2) && re && re(e2));
    }, [ie, re, q2]), Re = (0, import_react.useCallback)(function(e2) {
      ie.current && ie.current.isEqualNode(e2.target) && ("Space" !== e2.key && "Enter" !== e2.key || (e2.preventDefault(), Be()));
    }, [ie, oe]), Te = (0, import_react.useCallback)(function() {
      le({ type: "focus" });
    }, []), je = (0, import_react.useCallback)(function() {
      le({ type: "blur" });
    }, []), ze = (0, import_react.useMemo)(function() {
      return function(e2) {
        void 0 === e2 && (e2 = {});
        var n2 = e2.onClick, t4 = void 0 === n2 ? function() {
        } : n2, r2 = e2.onDrop, o2 = void 0 === r2 ? function() {
        } : r2, i2 = e2.onDragOver, a2 = void 0 === i2 ? function() {
        } : i2, c2 = e2.onDragLeave, s3 = void 0 === c2 ? function() {
        } : c2, f3 = e2.onKeyDown, d2 = void 0 === f3 ? function() {
        } : f3, p3 = e2.onFocus, v3 = void 0 === p3 ? function() {
        } : p3, g2 = e2.onBlur, m2 = void 0 === g2 ? function() {
        } : g2, h3 = e2.onDragEnter, b2 = void 0 === h3 ? function() {
        } : h3, w2 = l(e2, ["onClick", "onDrop", "onDragOver", "onDragLeave", "onKeyDown", "onFocus", "onBlur", "onDragEnter"]);
        return u({ onClick: ye(y(t4, xe)), onDrop: me(y(o2, Oe)), onDragEnter: me(y(b2, Ce)), onDragOver: me(y(a2, Ae)), onDragLeave: me(y(s3, Le)), onKeyDown: ke(y(d2, Re)), onFocus: ke(y(v3, Te)), onBlur: ke(y(m2, je)) }, w2);
      };
    }, [ie, Re, Te, je, xe, Ce, Ae, Le, Oe, W, U2, j2]), Ke = (0, import_react.useMemo)(function() {
      return function(e2) {
        var n2;
        void 0 === e2 && (e2 = {});
        var t4 = e2.refKey, r2 = void 0 === t4 ? "ref" : t4, o2 = e2.onChange, i2 = void 0 === o2 ? function() {
        } : o2, a2 = e2.onClick, c2 = void 0 === a2 ? function() {
        } : a2, s3 = l(e2, ["refKey", "onChange", "onClick"]), f3 = ((n2 = { accept: p2, multiple: $, required: J, type: "file", style: { display: "none" }, onChange: ye(y(i2, Oe)), onClick: ye(y(c2, Se)), autoComplete: "off", tabIndex: -1 })[r2] = oe, n2);
        return u(u({}, f3), s3);
      };
    }, [oe, p2, Oe, j2]), Me = (0, import_react.useCallback)(function(e2) {
      oe.current.value = "", le({ type: "reset" }), e2.stopPropagation();
    }, []), Ne = (0, import_react.useMemo)(function() {
      return function(e2) {
        void 0 === e2 && (e2 = {});
        var n2 = e2.onClick, t4 = void 0 === n2 ? function() {
        } : n2, r2 = l(e2, ["onClick"]);
        return u({ onClick: ye(y(t4, Me)) }, r2);
      };
    }, [Me]);
    return import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("input", u({}, Ke())), s2({ getRootProps: ze, acceptedFile: se, ProgressBar: Fe, getRemoveFileProps: Ne, Remove: Ee }));
  };
  return (0, import_react.useMemo)(function() {
    return t2;
  }, []);
}
function z() {
  return { CSVReader: j() };
}
var K = { displayProgressBar: "none", progressBarPercentage: 0, isDragActive: false, isFileDialogActive: false, isFocused: false, draggedFiles: [], acceptedFiles: [], acceptedFile: null };
function M(e2, n2) {
  switch (n2.type) {
    case "openDialog":
      return u(u({}, e2), { isFileDialogActive: true });
    case "closeDialog":
      return u(u({}, e2), { isFileDialogActive: false });
    case "setFiles":
      return u(u({}, e2), { acceptedFiles: n2.acceptedFiles, fileRejections: n2.fileRejections });
    case "setFile":
      return u(u({}, e2), { acceptedFile: n2.acceptedFile });
    case "setDisplayProgressBar":
      return u(u({}, e2), { displayProgressBar: n2.displayProgressBar });
    case "setProgressBarPercentage":
      return u(u({}, e2), { progressBarPercentage: n2.progressBarPercentage });
    case "setDraggedFiles":
      var t2 = n2.isDragActive, r2 = n2.draggedFiles;
      return u(u({}, e2), { draggedFiles: r2, isDragActive: t2 });
    case "focus":
      return u(u({}, e2), { isFocused: true });
    case "blur":
      return u(u({}, e2), { isFocused: false });
    case "reset":
      return u({}, K);
    default:
      return e2;
  }
}
var N = import_papaparse.default.BAD_DELIMITERS;
var I = import_papaparse.default.RECORD_SEP;
var U = import_papaparse.default.UNIT_SEP;
var _ = import_papaparse.default.WORKERS_SUPPORTED;
var q = import_papaparse.default.LocalChunkSize;
var V = import_papaparse.default.DefaultDelimiter;
export {
  N as BAD_DELIMITERS,
  V as DefaultDelimiter,
  q as LocalChunkSize,
  I as RECORD_SEP,
  U as UNIT_SEP,
  _ as WORKERS_SUPPORTED,
  p as formatFileSize,
  O as jsonToCSV,
  v as lightenDarkenColor,
  x as readRemoteFile,
  P as readString,
  C as useCSVDownloader,
  z as useCSVReader,
  S as usePapaParse
};
/*! Bundled license information:

papaparse/papaparse.min.js:
  (* @license
  Papa Parse
  v5.4.1
  https://github.com/mholt/PapaParse
  License: MIT
  *)
*/
//# sourceMappingURL=react-papaparse.js.map
