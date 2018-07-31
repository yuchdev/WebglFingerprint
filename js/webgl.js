/* WebGL */
$(function () {

    function render_webgl_table(webgl_implementation, supported_webgl_implementations) {
        // b -> webgl_implementation
        // m -> supported_webgl_implementations
        if (DEBUG) {
            var n = performance.now();
        }

        // if b is undefined
        if (webgl_implementation === undefined) {
            webgl_implementation = false;
        }

        var u = 0, v = 0;

        if (window.WebGLRenderingContext){
            u = 1;
        }
        if (window.WebGL2RenderingContext){
            v = 1;
        }
        var w = !!window.WebGL2RenderingContext,
            x = webgl_detect(webgl_implementation);

        if (!webgl_implementation) {
            // var m = x.name;
            supported_webgl_implementations = x.name;
        }

        if (1 != u || x || (u = 2), 1 == v) {
            var y = false;
            for (var i in supported_webgl_implementations) {
                // Поддерживается ли 2-ая версия webgl/experimental-webgl
                if (supported_webgl_implementations[i].slice(-1) == "2") {
                    y = true;
                }
                if (!y){
                    v = 2;
                }
            }
        }

        var A = false;
        if (DEBUG) {
            var B = performance.now();
            console.log("t2 - t1", B - n);
        }

        if (x) {
            var ctx = x.gl;
            if ("2" == x.name[0].slice(-1)) {
                A = 2;
                $("#webgl-table tbody.w2").removeClass("n");
                $("#webgl-table tbody.w1").addClass("n");
            }
            else {
                if ("fake-webgl" == x.name[0] || "function" != typeof ctx.getParameter && "object" != typeof ctx.getParameter) {
                    var u = 3;
                    return false
                }
                A = 1;
                $("#webgl-table tbody.w1").removeClass("n");
                $("#webgl-table tbody.w2").addClass("n");
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

                    var F = D[z],
                        G = $("#n" + z);
                    if (ctx[F]){
                        E++;
                        G.html(icon_supported + "True");
                    } else {
                        G.html(icon_unsupported + "False")
                    }
                }

                if (E > 0) {
                    webgl2_support_functions = " ("
                        + E
                        + ' of '
                        + D.length
                        + ' new functions implemented) <input type="button" value="more" />';
                }
            }

            if (webgl_implementation == false) {
                var H;
                $("#webgl-table td:nth-child(2)").each(function (a) {
                    H = $(this).text();
                    if (H.length && "n/a" != H){
                        $(this).prev().attr("title", H);
                    }
                })
            }

            if (DEBUG) {
                var I = performance.now();
                console.log("t3-t2", I - B)
            }

            var PROPERTIES = [
                "VERSION",
                "SHADING_LANGUAGE_VERSION", 
                "VENDOR", 
                "RENDERER", 
                "MAX_VERTEX_ATTRIBS", 
                "MAX_VERTEX_UNIFORM_VECTORS", 
                "MAX_VERTEX_TEXTURE_IMAGE_UNITS", 
                "MAX_VARYING_VECTORS", 
                "ALIASED_LINE_WIDTH_RANGE", 
                "ALIASED_POINT_SIZE_RANGE", 
                "MAX_FRAGMENT_UNIFORM_VECTORS", 
                "MAX_TEXTURE_IMAGE_UNITS", 
                ["RED_BITS", "GREEN_BITS", "BLUE_BITS", "ALPHA_BITS"], 
                ["DEPTH_BITS", "STENCIL_BITS"], 
                "MAX_RENDERBUFFER_SIZE", 
                "MAX_VIEWPORT_DIMS", 
                "MAX_TEXTURE_SIZE", 
                "MAX_CUBE_MAP_TEXTURE_SIZE", 
                "MAX_COMBINED_TEXTURE_IMAGE_UNITS"
            ];

            if (2 == A) {
                PROPERTIES = PROPERTIES.concat([
                    "MAX_VERTEX_UNIFORM_COMPONENTS", 
                    "MAX_VERTEX_UNIFORM_BLOCKS", 
                    "MAX_VERTEX_OUTPUT_COMPONENTS", 
                    "MAX_VARYING_COMPONENTS", 
                    "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS", 
                    "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS", 
                    "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS", 
                    "MAX_FRAGMENT_UNIFORM_COMPONENTS", 
                    "MAX_FRAGMENT_UNIFORM_BLOCKS", 
                    "MAX_FRAGMENT_INPUT_COMPONENTS", 
                    "MIN_PROGRAM_TEXEL_OFFSET", 
                    "MAX_PROGRAM_TEXEL_OFFSET", 
                    "MAX_DRAW_BUFFERS", 
                    "MAX_COLOR_ATTACHMENTS", 
                    "MAX_SAMPLES", 
                    "MAX_3D_TEXTURE_SIZE", 
                    "MAX_ARRAY_TEXTURE_LAYERS", 
                    "MAX_TEXTURE_LOD_BIAS", 
                    "MAX_UNIFORM_BUFFER_BINDINGS", 
                    "MAX_UNIFORM_BLOCK_SIZE", 
                    "UNIFORM_BUFFER_OFFSET_ALIGNMENT", 
                    "MAX_COMBINED_UNIFORM_BLOCKS", 
                    "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS", 
                    "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"
                ]);
            }

            for (var i in PROPERTIES) {
                var prop_str = "";
                if (PROPERTIES[i] instanceof Array) {
                    for (var j in PROPERTIES[i]) {
                        if (prop_str.length){
                            prop_str += ", ";
                        }
                        prop_str += ctx.getParameter(ctx[PROPERTIES[i][j]]);
                    }
                    prop_str = "[" + prop_str + "]";
                } else {
                    prop_str = ctx.getParameter(ctx[PROPERTIES[i]]);
                    if (prop_str === null){
                        prop_str = "n/a";
                    } else if (typeof prop_str === "object" && prop_str != null) {
                        prop_str = range_to_str(prop_str);
                    }
                    $("#f" + i).text(prop_str);
                }
            }

            var N = "";
            for (var i in supported_webgl_implementations) {
                if ("" != N){
                    N += ", ";
                }
                if (supported_webgl_implementations[i] != x.name[0]) {
                    N += '<span class="href" id="switch-' + supported_webgl_implementations[i] + '" title="switch to &quot;' + supported_webgl_implementations[i] + '&quot;">';
                } else if (supported_webgl_implementations.length > 1) {
                    N += "<strong>";
                }
                N += supported_webgl_implementations[i];
                if (supported_webgl_implementations[i] != x.name[0]) {
                    N += "</span>";
                } else if (supported_webgl_implementations.length > 1) {
                    N += "</strong>";
                }
            }

            $("#f_name").html(N);
            if (DEBUG) {
                var O = performance.now();
                console.log("t4-t3", O - I);
            }

            for (var i in supported_webgl_implementations) {
                $("#switch-" + supported_webgl_implementations[i]).click(function (event) {
                    event.preventDefault();
                    $(this).off("click");
                    render_webgl_table($(this).attr("id").slice(7), supported_webgl_implementations);
                });
            }

            $("#f_alias").text(getAntialiasing(ctx));
            var debug_renderer_info = getDebugRendererInfo(ctx);
            $("#u_vendor").html(debug_renderer_info.vendor);
            $("#u_renderer").html(debug_renderer_info.renderer);
            $("#f_angle").text(getANGLE(ctx));
            $("#f_anisotropy").text(getAnisotropy(ctx));
            $("#f_caveat").text(getMajorPerformanceCaveat(x.name[0]));

            if (1 == A) {
                $("#f_max_draw_buffers").text(getMaxDrawBuffers(ctx));
            }
            
            $("#f_float_int").text(getFloatIntPrecision(ctx));
            $("#f_ext").html(getWebGLExtensionsWithLinks(ctx));
            $("#f_vertext").html(describePrecision(ctx, ctx.VERTEX_SHADER));
            $("#f_fragment").html(describePrecision(ctx, ctx.FRAGMENT_SHADER));
            $(".ext-link").each(function () {
                $(this).on("mouseover", function () {
                    $(this).off();
                    var orig_value = ext_link = $(this).first().text();
                    if ("WEBKIT_lose_context" === ext_link) {
                        ext_link = "WEBGL_lose_context";
                    } else if ("WEBKIT_WEBGL_compressed_textures" === ext_link) {
                        ext_link = "";
                    }
                    ext_link = ext_link.replace(/^WEBKIT_|MOZ_|_EXT_/, "");
                    $(this).html(
                        '<a href="https://www.khronos.org/registry/webgl/extensions/'
                        + ext_link
                        + '" title="'
                        + ("" != ext_link
                            ? ext_link += " — "
                            : "")
                        + 'WebGL Extension Specification" rel="noopener nofollow" target="_blank">'
                        + orig_value
                        + "</a>"
                    );
                })
            });
            if (window.location.hash && !webgl_implementation) {
                //
                // !!! Потеряли где-то эту функцию.
                clck();
            }
            if (1 == A) {
                $(".w1").addClass("w1only");
            } else if (2 == A) {
                $(".w2").addClass("w2only");
            }
            destroy_webgl(ctx);
        } else {
            $("#webgl-table").removeClass("script").addClass("opac");
            $("#webgl-table em.ns").removeClass("ns");
        }

        if (DEBUG) {
            var Q = performance.now();
            console.log("t5-t4", Q - O);
        }

        $("#webgl1-status").html(html_value_map[u]);
        $("#webgl2-status").html(html_value_map[v] + (1 == v ? webgl2_support_functions : ""));
        if (A && "" != webgl2_support_functions) {
            var R = $("#webgl2-status input"),
                S = $("#webgl2-tbody");
            R.click(function (a) {
                if (R.attr("value") == "more") {
                    R.attr("value", "less");
                    S.removeClass("n");
                } else {
                    R.attr("value", "more");
                    S.addClass("n");
                }
            }).parent().addClass("webgl2-more-func");
        }

        if (DEBUG) {
            var T = performance.now();
            console.log("t6-t5", T - Q);
            console.log("total", T - n, "ms");
        }
    }

    function webgl_detect(webgl_implementation) {
        if (webgl_implementation) 
            var gl_implementations = [webgl_implementation];
        else 
            var gl_implementations = [
                "webgl2", "experimental-webgl2", "webgl", "experimental-webgl", 
                "moz-webgl", "fake-webgl"
            ];

        var supported_implementations = [],
            ctx = false, 
            impl_ctx = false;

        for (var index in gl_implementations) {
            impl_ctx = false;
            try {
                impl_ctx = document.createElement("canvas")
                                   .getContext(gl_implementations[index], {stencil: true});
                if (impl_ctx){
                    if (ctx) {
                        destroy_webgl(impl_ctx);
                    } else {
                        ctx = impl_ctx;
                    }
                    supported_implementations.push(gl_implementations[index]);
                }
            } catch (exc) {
                if (DEBUG) {
                    console.warn("webgl_detect", exc);
                }
            }
        }
        return !!ctx && { name: supported_implementations, gl: ctx}
    }

    function range_to_str(arr) {
        if (arr == null) {
            return "null";
        } else {
            return "[" + arr[0] + ", " + arr[1] + "]";
        }
    }

    function getAntialiasing(gl) {
        var is_supported = false;
        try {
            is_supported = gl.getContextAttributes().antialias
        } catch (exc) {
            if (DEBUG) {
                console.warn("getAntialiasing", exc);
            }
        }
        return is_supported ? "True" : "False"
    }

    function getDebugRendererInfo(gl) {
        var icon_html = '<span class="bad">!</span> ', 
            result = {renderer: "n/a", vendor: "n/a"},
            debug_renderer_info = gl.getExtension("WEBGL_debug_renderer_info");

        if (debug_renderer_info != null) {
            result.renderer = icon_html + gl.getParameter(debug_renderer_info.UNMASKED_RENDERER_WEBGL);
            result.vendor = icon_html + gl.getParameter(debug_renderer_info.UNMASKED_VENDOR_WEBGL);
        }
        return result;
    }

    function getANGLE(a) {
        // ANGLE - Almost Native Graphics Layer Engine
        function b(a) {
            return 0 !== a && 0 == (a & a - 1)
        }

        var c = range_to_str(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE));
        if ("Win32" !== navigator.platform 
            && "Win64" !== navigator.platform 
            || "Internet Explorer" === a.getParameter(a.RENDERER) 
            || "Microsoft Edge" === a.getParameter(a.RENDERER) 
            || c !== range_to_str([1, 1])) {
                return "False";
        } else if (b(a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)) 
                    && b(a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS))){
            return "True, Direct3D 11";
        } else {
            return "True, Direct3D 9";
        }
        //return "Win32" !== navigator.platform && "Win64" !== navigator.platform || "Internet Explorer" === a.getParameter(a.RENDERER) || "Microsoft Edge" === a.getParameter(a.RENDERER) || c !== d([1, 1]) ? "False" : b(a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)) && b(a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS)) ? "True, Direct3D 11" : "True, Direct3D 9"
    }

    function getAnisotropy(gl) {
        var b = gl.getExtension("EXT_texture_filter_anisotropic")
                || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic")
                || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (b) {
            var c = gl.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            if (c === 0){
                c = 2;
            }
            return c;
        }
        return "n/a"
    }

    function getMajorPerformanceCaveat(a) {
        try {
            var b = $("<canvas />", {width: "1", height: "1"}).appendTo("body"),
                c = b[0].getContext(a, {failIfMajorPerformanceCaveat: true});
            b.remove();
            if (c) {
                if (void 0 === c.getContextAttributes().failIfMajorPerformanceCaveat) {
                    destroy_webgl(c);
                    return "Not implemented";
                } else {
                    destroy_webgl(c);
                    return "False";
                }
            } else {
                return "True";
            }
        } catch (exc) {
            if (DEBUG) {
                console.warn("getMajorPerformanceCaveat", exc);
            }
            return "n/a";
        }
    }

    function getMaxDrawBuffers(gl) {
        var b = 0, 
            draw_buffers_ext = gl.getExtension("WEBGL_draw_buffers");
        if (draw_buffers_ext !== null) {
            b = gl.getParameter(draw_buffers_ext.MAX_DRAW_BUFFERS_WEBGL);
        }
        return b;
    }

    function getFloatIntPrecision(gl) {
        try {
            var frag_prec_h_float = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT),
                frag_prec_h_int = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT), 
                html = 0 !== frag_prec_h_float.precision ? "highp/" : "mediump/";
            html += 0 !== frag_prec_h_int.rangeMax ? "highp" : "lowp";
            return html;
        } catch (exc) {
            if (DEBUG) {
                console.warn("getFloatIntPrecision", ctx);
            }
            return "n/a";
        }
    }

    function getWebGLExtensionsWithLinks(gl) {
        var extensions = [];
        try {
            extensions = gl.getSupportedExtensions();
        } catch (exc) {
            if (DEBUG) {
                console.warn("getWebGLExtensionsWithLinks", exc);
            }
        }
        var html = "<tr><td>Supported WebGL Extensions</td>", 
            supported_extensions = [];
        if (extensions !== undefined && extensions.length){
            for (var i = 0, len = extensions.length; i < len; i++) {
                if ("WEBGL_debug_renderer_info" != extensions[i] && "WEBGL_debug_shaders" != extensions[i]){
                    if (i > 0) {
                        html += '<tr><td class="nt"></td>';
                    }
                    html += '<td class="ext-link"><span class="href">' + extensions[i] + "</span></td></tr>";
                } else {
                    supported_extensions.push(extensions[i]);
                }
            }
            html += "<tr><td>Supported Privileged Extensions</td>";
            if (supported_extensions.length > 0) {
                for (var index in supported_extensions) {
                    if (index > 0){
                        html += '<tr><td class="nt"></td>';
                    }
                    html += '<td class="ext-link"><span class="href">' + supported_extensions[index] + "</span></td></tr>";
                }
            } else {
                html += "<td>n/a</td></tr>";
            }
        } else {
            html += "<td>No extensions were found</td></tr>";
        }
        return html;
    }

    function render_range_value(value, as_number) {
        return as_number ? "" + Math.pow(2, value) : "2<sup>" + value + "</sup>";
    }

    function render_range(value, as_number) {
        var c = as_number ? " bit mantissa" : "";
        return "[-" + render_range_value(value.rangeMin, as_number) + ", " + render_range_value(value.rangeMax, as_number) + "] (" + value.precision + c + ")"
    }

    function describePrecision(gl, shaderType) {
        // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
        try {
            var high = gl.getShaderPrecisionFormat(shaderType, gl.HIGH_FLOAT),
                med = gl.getShaderPrecisionFormat(shaderType, gl.MEDIUM_FLOAT),
                low = gl.getShaderPrecisionFormat(shaderType, gl.LOW_FLOAT), 
                label = high;
            if (high.precision === 0) {
                label = med;
            }
            return '<span title="High: ' + render_range(high, true) + "\n\nMedium: " + render_range(med, true) + "\n\nLow: " + render_range(low, true) + '">' + render_range(label, false) + "</span>";
        } catch (exc) {
            if (DEBUG) {
                console.warn("describePrecision", exc);
            }
            return "n/a";
        }
    }

    function destroy_webgl(gl) {
        try {
            var lc_ext = gl.getExtension("WEBGL_lose_context") 
                        || gl.getExtension("WEBKIT_WEBGL_lose_context")
                        || gl.getExtension("MOZ_WEBGL_lose_context");
            if (lc_ext !== null) {
                lc_ext.loseContext();
            }
        } catch (exc) {
            if (DEBUG) {
                console.warn("lose_context", exc);
            }
        }
    }

    var DEBUG = true, 
        icon_supported = '<span class="good">&#10004;</span>',
        icon_unsupported = '<span class="bad">&#215;</span>', 
        html_value_map = [
            icon_unsupported + "False",
            icon_supported + "True",
            icon_unsupported + "False (supported, but disabled in browser settings, or blocked by extensions)",
            icon_unsupported + "False (supported, but blocked by browser extensions)"
        ],
        webgl2_support_functions = "";

    render_webgl_table();
    (function () {
        setTimeout(function () {
            var canvas, ctx, width = 256, height = 128;  // var a;
            try {
                canvas = document.createElement("canvas");  // var b = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext("webgl2")
                    || canvas.getContext("experimental-webgl2")
                    || canvas.getContext("webgl")
                    || canvas.getContext("experimental-webgl")
                    || canvas.getContext("moz-webgl");
            }
            catch (exc) {
                if (DEBUG){
                    console.warn("WebGL Image Hash", exc);
                }
            }

            if (ctx === null){
                return false;
            }

            var c = document.getElementById("webgl-table").innerHTML;
            if (DEBUG) {
                console.log("webgl_table:", c);
            }
            $("#hash").text(c);
            c = md5(c);
            $("#webgl-fp-context").addClass("mono upper").text(c);

            try {
                var d = ctx.createBuffer();
                ctx.bindBuffer(ctx.ARRAY_BUFFER, d);
                var e = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]);
                ctx.bufferData(ctx.ARRAY_BUFFER, e, ctx.STATIC_DRAW);
                d.itemSize = 3;
                d.numItems = 3;
                
                var f = ctx.createProgram(),
                    vtx_shader = ctx.createShader(ctx.VERTEX_SHADER);

                ctx.shaderSource(vtx_shader, 
                    "attribute vec2 attrVertex;" +
                    "varying vec2 varyinTexCoordinate;" +
                    "uniform vec2 uniformOffset;" +
                    "void main(){"+
                    "    varyinTexCoordinate = attrVertex + uniformOffset;" +
                    "    gl_Position = vec4(attrVertex, 0, 1);" + 
                    "}"
                );
                ctx.compileShader(vtx_shader);

                var frag_shader = ctx.createShader(ctx.FRAGMENT_SHADER);
                ctx.shaderSource(frag_shader, 
                    "precision mediump float;" + 
                    "varying vec2 varyinTexCoordinate;" +
                    "void main(){" + 
                    "    gl_FragColor = vec4(varyinTexCoordinate, 0, 1);" +
                    "}"
                );
                ctx.compileShader(frag_shader);
                ctx.attachShader(f, vtx_shader);
                ctx.attachShader(f, frag_shader);
                ctx.linkProgram(f);
                ctx.useProgram(f);
                f.vertexPosAttrib = ctx.getAttribLocation(f, "attrVertex");
                f.offsetUniform = ctx.getUniformLocation(f, "uniformOffset");
                ctx.enableVertexAttribArray(f.vertexPosArray);
                ctx.vertexAttribPointer(f.vertexPosAttrib, d.itemSize, ctx.FLOAT, false, 0, 0);
                ctx.uniform2f(f.offsetUniform, 1, 1);
                ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, d.numItems);
                $(canvas).prependTo("#webgl-img");
            }
            catch (exc) {
                if (DEBUG){
                    console.warn("Draw WebGL Image", exc);
                    $("#webgl-img").text("n/a");
                }
            }

            var img_fingerprint = "";

            try {
                var j = new Uint8Array(131072);
                ctx.readPixels(0, 0, 256, 128, ctx.RGBA, ctx.UNSIGNED_BYTE, j);
                img_fingerprint = JSON.stringify(j).replace(/,?"[0-9]+":/g, "");
                if (img_fingerprint.replace(/^{[0]+}$/g, "") == "") {
                    throw "JSON.stringify only ZEROes";
                }

                img_fingerprint = md5(img_fingerprint);
                $("#webgl-fp-img").addClass("mono upper");
            }
            catch (exc) {
                if (DEBUG) {
                    console.warn("WebGL Image readPixels Hash", exc);
                    img_fingerprint = "n/a";
                }
            }

            $("#webgl-fp-img").text(img_fingerprint);
        }, 1);
    })();
});
