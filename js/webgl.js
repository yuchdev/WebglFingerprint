/* WebGL */
$(function () {

    function a(b, m) {

        if (q) {
            var n = performance.now();
        }

        // if b is undefined
        if(void 0 === b) {
            b = !1;
        }

        var u = 0, v = 0;

        window.WebGLRenderingContext && (u = 1), window.WebGL2RenderingContext && (v = 1);
        var w = !!window.WebGL2RenderingContext, x = c(b);

        if (!b)
            var m = x.name;

        if (1 != u || x || (u = 2), 1 == v) {
            var y = !1;
            for (var z in m) {
                "2" == m[z].slice(-1) && (y = !0);
                y || (v = 2)
            }
        }

        var A = !1;
        if (q) {
            var B = performance.now();
            console.log("t2 - t1", B - n)
        }

        if (x) {
            var C = x.gl;
            if ("2" == x.name[0].slice(-1)) {
                A = 2, $("#webgl-table tbody.w2").removeClass("n"), $("#webgl-table tbody.w1").addClass("n");
            }
            else {
                if ("fake-webgl" == x.name[0] || "function" != typeof C.getParameter && "object" != typeof C.getParameter) {
                    var u = 3;
                    return !1
                }
                A = 1, $("#webgl-table tbody.w1").removeClass("n"), $("#webgl-table tbody.w2").addClass("n")
            }

            if (w && "" == webgl2_support_functions && 2 == A) {

                for (var D = ["copyBufferSubData"
                    , "getBufferSubData"
                    , "blitFramebuffer"
                    , "framebufferTextureLayer"
                    , "getInternalformatParameter"
                    , "invalidateFramebuffer"
                    , "invalidateSubFramebuffer"
                    , "readBuffer"
                    , "renderbufferStorageMultisample"
                    , "texStorage2D"
                    , "texStorage3D"
                    , "texImage3D"
                    , "texSubImage3D"
                    , "copyTexSubImage3D"
                    , "compressedTexImage3D"
                    , "compressedTexSubImage3D"
                    , "getFragDataLocation"
                    , "uniform1ui"
                    , "uniform2ui"
                    , "uniform3ui"
                    , "uniform4ui"
                    , "uniform1uiv"
                    , "uniform2uiv"
                    , "uniform3uiv"
                    , "uniform4uiv"
                    , "uniformMatrix2x3fv"
                    , "uniformMatrix3x2fv"
                    , "uniformMatrix2x4fv"
                    , "uniformMatrix4x2fv"
                    , "uniformMatrix3x4fv"
                    , "uniformMatrix4x3fv"
                    , "vertexAttribI4i"
                    , "vertexAttribI4iv"
                    , "vertexAttribI4ui"
                    , "vertexAttribI4uiv"
                    , "vertexAttribIPointer"
                    , "vertexAttribDivisor"
                    , "drawArraysInstanced"
                    , "drawElementsInstanced"
                    , "drawRangeElements"
                    , "drawBuffers"
                    , "clearBufferiv"
                    , "clearBufferuiv"
                    , "clearBufferfv"
                    , "clearBufferfi"
                    , "createQuery"
                    , "deleteQuery"
                    , "isQuery"
                    , "beginQuery"
                    , "endQuery"
                    , "getQuery"
                    , "getQueryParameter"
                    , "createSampler"
                    , "deleteSampler"
                    , "isSampler"
                    , "bindSampler"
                    , "samplerParameteri"
                    , "samplerParameterf"
                    , "getSamplerParameter"
                    , "fenceSync"
                    , "isSync"
                    , "deleteSync"
                    , "clientWaitSync"
                    , "waitSync"
                    , "getSyncParameter"
                    , "createTransformFeedback"
                    , "deleteTransformFeedback"
                    , "isTransformFeedback"
                    , "bindTransformFeedback"
                    , "beginTransformFeedback"
                    , "endTransformFeedback"
                    , "transformFeedbackVaryings"
                    , "getTransformFeedbackVarying"
                    , "pauseTransformFeedback"
                    , "resumeTransformFeedback"
                    , "bindBufferBase"
                    , "bindBufferRange"
                    , "getIndexedParameter"
                    , "getUniformIndices"
                    , "getActiveUniforms"
                    , "getUniformBlockIndex"
                    , "getActiveUniformBlockParameter"
                    , "getActiveUniformBlockName"
                    , "uniformBlockBinding"
                    , "createVertexArray"
                    , "deleteVertexArray"
                    , "isVertexArray"
                    , "bindVertexArray"], E = 0, z = 0; z < D.length; z++) {

                    var F = D[z], G = $("#n" + z);
                    C[F] ? (E++, G.html(r + "True")) : G.html(s + "False")
                }

                E > 0 && (webgl2_support_functions = " ("
                    + E
                    + ' of '
                    + D.length
                    + ' new functions implemented) <input type="button" value="more" />')
            }

            if (0 == b) {
                var H;
                $("#webgl-table td:nth-child(2)").each(function (a) {
                    H = $(this).text(), H.length && "n/a" != H && $(this).prev().attr("title", H)
                })
            }

            if (q) {
                var I = performance.now();
                console.log("t3-t2", I - B)
            }

            var J = ["VERSION"
                , "SHADING_LANGUAGE_VERSION"
                , "VENDOR", "RENDERER"
                , "MAX_VERTEX_ATTRIBS"
                , "MAX_VERTEX_UNIFORM_VECTORS"
                , "MAX_VERTEX_TEXTURE_IMAGE_UNITS"
                , "MAX_VARYING_VECTORS"
                , "ALIASED_LINE_WIDTH_RANGE"
                , "ALIASED_POINT_SIZE_RANGE"
                , "MAX_FRAGMENT_UNIFORM_VECTORS"
                , "MAX_TEXTURE_IMAGE_UNITS"
                , ["RED_BITS", "GREEN_BITS", "BLUE_BITS", "ALPHA_BITS"]
                , ["DEPTH_BITS", "STENCIL_BITS"]
                , "MAX_RENDERBUFFER_SIZE"
                , "MAX_VIEWPORT_DIMS"
                , "MAX_TEXTURE_SIZE"
                , "MAX_CUBE_MAP_TEXTURE_SIZE"
                , "MAX_COMBINED_TEXTURE_IMAGE_UNITS"];

            if (2 == A) {
                var K = ["MAX_VERTEX_UNIFORM_COMPONENTS"
                    , "MAX_VERTEX_UNIFORM_BLOCKS"
                    , "MAX_VERTEX_OUTPUT_COMPONENTS"
                    , "MAX_VARYING_COMPONENTS"
                    , "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS"
                    , "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS"
                    , "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS"
                    , "MAX_FRAGMENT_UNIFORM_COMPONENTS"
                    , "MAX_FRAGMENT_UNIFORM_BLOCKS"
                    , "MAX_FRAGMENT_INPUT_COMPONENTS"
                    , "MIN_PROGRAM_TEXEL_OFFSET"
                    , "MAX_PROGRAM_TEXEL_OFFSET"
                    , "MAX_DRAW_BUFFERS"
                    , "MAX_COLOR_ATTACHMENTS"
                    , "MAX_SAMPLES"
                    , "MAX_3D_TEXTURE_SIZE"
                    , "MAX_ARRAY_TEXTURE_LAYERS"
                    , "MAX_TEXTURE_LOD_BIAS"
                    , "MAX_UNIFORM_BUFFER_BINDINGS"
                    , "MAX_UNIFORM_BLOCK_SIZE"
                    , "UNIFORM_BUFFER_OFFSET_ALIGNMENT"
                    , "MAX_COMBINED_UNIFORM_BLOCKS"
                    , "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS"
                    , "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"];
                J = J.concat(K)
            }

            for (var z in J) {
                var L = "";
                if (J[z] instanceof Array) {
                    for (var M in J[z]) L.length && (L += ", "), L += C.getParameter(C[J[z][M]]);
                    L = "[" + L + "]"
                }
                else {
                    L = C.getParameter(C[J[z]]), null === L ? L = "n/a" : "object" == typeof L && null != L && (L = d(L));
                    $("#f" + z).text(L)
                }
            }

            var N = "";
            for (var z in m) {
                "" != N && (N += ", "), m[z] != x.name[0] ? N += '<span class="href" id="switch-' + m[z] + '" title="switch to &quot;' + m[z] + '&quot;">' : m.length > 1 && (N += "<strong>"), N += m[z], m[z] != x.name[0] ? N += "</span>" : m.length > 1 && (N += "</strong>");
            }


            if ($("#f_name").html(N), q) {
                var O = performance.now();
                console.log("t4-t3", O - I)
            }

            for (var z in m) {
                $("#switch-" + m[z]).click(function (b) {
                    b.preventDefault(), $(this).off("click"), a($(this).attr("id").slice(7), m)
                });
            }

            $("#f_alias").text(e(C));
            var P = f(C);
            $("#u_vendor").html(P.vendor)
                , $("#u_renderer").html(P.renderer)
                , $("#f_angle").text(g(C))
                , $("#f_anisotropy").text(h(C))
                , $("#f_caveat").text(i(x.name[0]))
                , 1 == A && $("#f_max_draw_buffers").text(j(C))
                , $("#f_float_int").text(k(C))
                , $("#f_ext").html(l(C))
                , $("#f_vertext").html(o(C, C.VERTEX_SHADER))
                , $("#f_fragment").html(o(C, C.FRAGMENT_SHADER))
                , $(".ext-link").each(function () {
                $(this).on("mouseover", function () {
                    $(this).off();
                    var a = ext_link = $(this).first().text();
                    "WEBKIT_lose_context" === ext_link
                        ? ext_link = "WEBGL_lose_context"
                        : "WEBKIT_WEBGL_compressed_textures" === ext_link && (ext_link = "")
                        , ext_link = ext_link.replace(/^WEBKIT_|MOZ_|_EXT_/, "")
                        , $(this).html('<a href="https://www.khronos.org/registry/webgl/extensions/'
                        + ext_link
                        + '" title="'
                        + ("" != ext_link
                            ? ext_link += " — "
                            : "") + 'WebGL Extension Specification" rel="noopener nofollow" target="_blank">'
                        + a
                        + "</a>")
                })
            }), window.location.hash && !b && clck(), 1 == A
                ? $(".w1").addClass("w1only")
                : 2 == A && $(".w2").addClass("w2only"), p(C)
        }
        else
            $("#webgl-table").removeClass("script").addClass("opac"), $("#webgl-table em.ns").removeClass("ns");

        if (q) {
            var Q = performance.now();
            console.log("t5-t4", Q - O)
        }

        if ($("#webgl1-status").html(t[u])
            , $("#webgl2-status").html(t[v] + (1 == v ? webgl2_support_functions : ""))
            , A && "" != webgl2_support_functions) {

            var R = $("#webgl2-status input"), S = $("#webgl2-tbody");
            R.click(function (a) {
                "more" == R.attr("value")
                    ? (R.attr("value", "less"), S.removeClass("n"))
                    : (R.attr("value", "more"), S.addClass("n"))
            }).parent().addClass("webgl2-more-func")
        }

        if (q) {
            var T = performance.now();
            console.log("t6-t5", T - Q), console.log("total", T - n, "ms")
        }
    }

    function c(a) {
        if (a) var b = [a]; else var b = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl", "moz-webgl", "fake-webgl"];
        var c = [], d = !1, e = !1;
        for (var f in b) {
            e = !1;
            try {
                e = document.createElement("canvas").getContext(b[f], {stencil: !0}), e && (d ? p(e) : d = e, c.push(b[f]))
            } catch (a) {
                q && console.warn("webgl_detect", a)
            }
        }
        return !!d && {name: c, gl: d}
    }

    function d(a) {
        return null == a ? "null" : "[" + a[0] + ", " + a[1] + "]"
    }

    function e(a) {
        var b = !1;
        try {
            b = a.getContextAttributes().antialias
        } catch (a) {
            q && console.warn("getAntialiasing", a)
        }
        return b ? "True" : "False"
    }

    function f(a) {
        var b = '<span class="bad">!</span> ', c = {renderer: "n/a", vendor: "n/a"},
            d = a.getExtension("WEBGL_debug_renderer_info");
        return null != d && (c.renderer = b + a.getParameter(d.UNMASKED_RENDERER_WEBGL), c.vendor = b + a.getParameter(d.UNMASKED_VENDOR_WEBGL)), c
    }

    function g(a) {
        function b(a) {
            return 0 !== a && 0 == (a & a - 1)
        }

        var c = d(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE));
        return "Win32" !== navigator.platform && "Win64" !== navigator.platform || "Internet Explorer" === a.getParameter(a.RENDERER) || "Microsoft Edge" === a.getParameter(a.RENDERER) || c !== d([1, 1]) ? "False" : b(a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)) && b(a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS)) ? "True, Direct3D 11" : "True, Direct3D 9"
    }

    function h(a) {
        var b = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (b) {
            var c = a.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            return 0 === c && (c = 2), c
        }
        return "n/a"
    }

    function i(a) {
        try {
            var b = $("<canvas />", {width: "1", height: "1"}).appendTo("body"),
                c = b[0].getContext(a, {failIfMajorPerformanceCaveat: !0});
            return b.remove(), c ? void 0 === c.getContextAttributes().failIfMajorPerformanceCaveat ? (p(c), "Not implemented") : (p(c), "False") : "True"
        } catch (a) {
            return q && console.warn("getMajorPerformanceCaveat", a), "n/a"
        }
    }

    function j(a) {
        var b = 1, c = a.getExtension("WEBGL_draw_buffers");
        return null != c && (b = a.getParameter(c.MAX_DRAW_BUFFERS_WEBGL)), b
    }

    function k(a) {
        try {
            var b = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT),
                c = 0 !== b.precision ? "highp/" : "mediump/";
            return b = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT), c += 0 !== b.rangeMax ? "highp" : "lowp"
        } catch (a) {
            return q && console.warn("getFloatIntPrecision", a), "n/a"
        }
    }

    function l(a) {
        var b = [];
        try {
            b = a.getSupportedExtensions()
        } catch (a) {
            q && console.warn("getWebGLExtensionsWithLinks", a)
        }
        var c = "<tr><td>Supported WebGL Extensions</td>", d = [];
        if (void 0 !== b && b.length) {
            for (var e = 0, f = b.length; e < f; e++) "WEBGL_debug_renderer_info" != b[e] && "WEBGL_debug_shaders" != b[e] ? (e > 0 && (c += '<tr><td class="nt"></td>'), c += '<td class="ext-link"><span class="href">' + b[e] + "</span></td></tr>") : d.push(b[e]);
            if (c += "<tr><td>Supported Privileged Extensions</td>", d.length > 0) for (var e in d) e > 0 && (c += '<tr><td class="nt"></td>'), c += '<td class="ext-link"><span class="href">' + d[e] + "</span></td></tr>"; else c += "<td>n/a</td></tr>"
        } else c += "<td>No extensions were found</td></tr>";
        return c
    }

    function m(a, b) {
        return b ? "" + Math.pow(2, a) : "2<sup>" + a + "</sup>"
    }

    function n(a, b) {
        var c = b ? " bit mantissa" : "";
        return "[-" + m(a.rangeMin, b) + ", " + m(a.rangeMax, b) + "] (" + a.precision + c + ")"
    }

    function o(a, b) {
        try {
            var c = a.getShaderPrecisionFormat(b, a.HIGH_FLOAT), d = a.getShaderPrecisionFormat(b, a.MEDIUM_FLOAT),
                e = a.getShaderPrecisionFormat(b, a.LOW_FLOAT), f = c;
            return 0 === c.precision && (f = d), '<span title="High: ' + n(c, !0) + "\n\nMedium: " + n(d, !0) + "\n\nLow: " + n(e, !0) + '">' + n(f, !1) + "</span>"
        } catch (a) {
            return q && console.warn("describePrecision", a), "n/a"
        }
    }

    function p(a) {
        try {
            var b = a.getExtension("WEBGL_lose_context") || a.getExtension("WEBKIT_WEBGL_lose_context") || a.getExtension("MOZ_WEBGL_lose_context");
            null != b && b.loseContext()
        } catch (a) {
            q && console.warn("lose_context", a)
        }
    }

    var q = !1
        , r = '<span class="good">&#10004;</span>'
        , s = '<span class="bad">&#215;</span>'
        , t = [
            s + "False",
            r + "True",
            s + "False (supported, but disabled in browser settings, or blocked by extensions)",
            s + "False (supported, but blocked by browser extensions)"];

    webgl2_support_functions = "", a() , function () {

        setTimeout(function () {
            var a;
            try {
                var b = document.createElement("canvas");
                b.width = 256,
                    b.height = 128,
                    a = b.getContext("webgl2")
                        || b.getContext("experimental-webgl2")
                        || b.getContext("webgl")
                        || b.getContext("experimental-webgl")
                        || b.getContext("moz-webgl");
            }
            catch (a) {
                q && console.warn("WebGL Image Hash", a)
            }

            if (null == a){
                return !1;
            }

            var c = document.getElementById("webgl-table").innerHTML;
            $("#hash").text(c), c = md5(c), $("#webgl-fp-context").addClass("mono upper").text(c);
            try {
                var d = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, d);
                var e = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]);
                a.bufferData(a.ARRAY_BUFFER, e, a.STATIC_DRAW), d.itemSize = 3, d.numItems = 3;
                var f = a.createProgram(), g = a.createShader(a.VERTEX_SHADER);
                a.shaderSource(g, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform\
                    vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;\
                    gl_Position=vec4(attrVertex,0,1);}"), a.compileShader(g);

                var h = a.createShader(a.FRAGMENT_SHADER);
                a.shaderSource(h, "precision mediump float;varying vec2 varyinTexCoordinate;void main()\
                    {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),
                    a.compileShader(h),
                    a.attachShader(f, g),
                    a.attachShader(f, h),
                    a.linkProgram(f),
                    a.useProgram(f),
                    f.vertexPosAttrib = a.getAttribLocation(f, "attrVertex"),
                    f.offsetUniform = a.getUniformLocation(f, "uniformOffset"),
                    a.enableVertexAttribArray(f.vertexPosArray),
                    a.vertexAttribPointer(f.vertexPosAttrib, d.itemSize, a.FLOAT, !1, 0, 0),
                    a.uniform2f(f.offsetUniform, 1, 1),
                    a.drawArrays(a.TRIANGLE_STRIP, 0, d.numItems),
                    $(b).prependTo("#webgl-img");
            }
            catch (a) {
                q && console.warn("Draw WebGL Image", a), $("#webgl-img").text("n/a");
            }

            var i = "";

            try {
                var j = new Uint8Array(131072);

                if (a.readPixels(0, 0, 256, 128, a.RGBA, a.UNSIGNED_BYTE, j),
                    i = JSON.stringify(j).replace(/,?"[0-9]+":/g, ""),
                    "" == i.replace(/^{[0]+}$/g, "")) {

                    throw "JSON.stringify only ZEROes";
                }

                i = md5(i), $("#webgl-fp-img").addClass("mono upper")
            }
            catch (a) {
                q && console.warn("WebGL Image readPixels Hash", a), i = "n/a"
            }

            $("#webgl-fp-img").text(i);
        }, 1)
    }
()});
