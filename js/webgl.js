/* WebGL fingerprint calculation */
$(function () {

    "use strict";

    const ICON_SUPPORTED = '<span class="good">&#10004;</span>';
    const ICON_UNSUPPORTED = '<span class="bad">&#215;</span>';
    const HTML_VALUE_MAP = [
            ICON_UNSUPPORTED + "False",
            ICON_SUPPORTED + "True",
            ICON_UNSUPPORTED + "False (supported, but disabled in browser settings, or blocked by extensions)",
            ICON_UNSUPPORTED + "False (supported, but blocked by browser extensions)"];

    const GL_UNSUPPORTED = 0;
    const GL_SUPPORTED = 1;
    const GL_DISABLED = 2;
    const GL_BLOCKED = 3;

    /// @function: renderWebglTable
    /// @param: webgl_implementation
    /// @param: supported_webgl_implementations
    function renderWebglTable(webgl_implementation, supported_webgl_implementations) {

        // Profiling points in debug mode
        let t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0;

        if (DEBUG) {
            t1 = performance.now();
        }

        // if b is undefined
        if (webgl_implementation === undefined) {
            webgl_implementation = false;
        }
        else {
            console.log()
        }

        let webgl_1_status = GL_UNSUPPORTED;
        let webgl_2_status = GL_UNSUPPORTED;

        if (window.WebGLRenderingContext){
            webgl_1_status = GL_SUPPORTED;
        }
        if (window.WebGL2RenderingContext){
            webgl_2_status = GL_SUPPORTED;
        }

        let is_webgl2_supported = !!window.WebGL2RenderingContext;
        let webgl_impl = webglDetect();

        if (!webgl_implementation) {
            supported_webgl_implementations = webgl_impl.name;
        }

        if (GL_SUPPORTED === webgl_1_status && !webgl_impl) {
            webgl_1_status = GL_DISABLED;
        }

        if (GL_SUPPORTED === webgl_2_status) {

            const webgl_2_implementations = supported_webgl_implementations.filter(function (impl){
                    return impl.slice(-1) === "2";
            });

            if (webgl_2_implementations.length === 0){
                webgl_2_status = GL_DISABLED;
            }
        }

        let maximum_webgl_version = 0;

        if (DEBUG) {
            t2 = performance.now();
            console.log("t2-t1 = ", t2 - t1, "ms");
        }

        if (webgl_impl) {
            let render_context = webgl_impl.gl;
            if ("2" === webgl_impl.name[0].slice(-1)) {
                maximum_webgl_version = 2;
                $("#webgl-table tbody.w2").removeClass("n");
                $("#webgl-table tbody.w1").addClass("n");
            }
            else {
                if ("fake-webgl" === webgl_impl.name[0]
                    || "function" !== typeof render_context.getParameter
                    && "object" !== typeof render_context.getParameter) {

                    webgl_1_status = GL_BLOCKED;
                    return false;
                }
                maximum_webgl_version = 1;
                $("#webgl-table tbody.w1").removeClass("n");
                $("#webgl-table tbody.w2").addClass("n");
            }

            if (is_webgl2_supported && "" === webgl2_support_functions && 2 === maximum_webgl_version) {

                const WEBGL_FUNCTIONS = ["copyBufferSubData"
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
                    , "bindVertexArray"];

                let supported_gl_functions_count = 0;

                for (let func_idx = 0; func_idx < WEBGL_FUNCTIONS.length; func_idx++) {

                    let gl_function_name = WEBGL_FUNCTIONS[func_idx];
                    let html_table_row = $("#n" + func_idx);

                    if (render_context[gl_function_name]){
                        supported_gl_functions_count++;
                        html_table_row.html(ICON_SUPPORTED + "True");
                    }
                    else {
                        html_table_row.html(ICON_UNSUPPORTED + "False")
                    }
                }

                if (supported_gl_functions_count > 0) {
                    webgl2_support_functions = " ("
                        + supported_gl_functions_count
                        + ' of '
                        + WEBGL_FUNCTIONS.length
                        + ' new functions implemented)<input type="button" value="more" />';
                }
            }

            if (webgl_implementation === false) {
                let extensions_list_str = "";
                $("#webgl-table td:nth-child(2)").each(function () {
                    extensions_list_str = $(this).text();
                    if (extensions_list_str.length && "n/a" !== extensions_list_str){
                        $(this).prev().attr("title", extensions_list_str);
                    }
                })
            }

            if (DEBUG) {
                t3 = performance.now();
                console.log("t3-t2 = ", t3 - t2, "ms");
            }

            let webgl_params = ["VERSION"
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

            if (2 === maximum_webgl_version) {
                const webgl_v2_params = ["MAX_VERTEX_UNIFORM_COMPONENTS"
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
                webgl_params = webgl_params.concat(webgl_v2_params)
            }

            for (let webgl_param_index in webgl_params) {

                let webgl_param_value = "";
                if (webgl_params[webgl_param_index] instanceof Array) {

                    for (let webgl_param_subindex in webgl_params[webgl_param_index]){

                        if(webgl_param_value.length > 0){
                            webgl_param_value += ", ";
                        }

                        webgl_param_value += render_context.getParameter(
                                render_context[webgl_params[webgl_param_index][webgl_param_subindex]]);
                    }

                    webgl_param_value = "[" + webgl_param_value + "]";
                }
                else {
                    webgl_param_value = render_context.getParameter(render_context[webgl_params[webgl_param_index]]);

                    if(null === webgl_param_value){
                        webgl_param_value = "n/a";
                    }
                    else {
                        if(("object" === typeof webgl_param_value) && (null !== webgl_param_value)){
                            let webgl_pair_param = expandParamPair(webgl_param_value);
                            webgl_param_value = webgl_pair_param;
                        }
                    }
                }

                // WebGL context info, render to HTML table
                $("#f" + webgl_param_index).text(webgl_param_value);

                if(DEBUG){
                    console.log(webgl_params[webgl_param_index] + " = " + webgl_param_value);
                }
            }

            let webgl_implementations_html = "";
            for (let impl_idx in supported_webgl_implementations) {
                if ("" !== webgl_implementations_html){
                    webgl_implementations_html += ", ";
                }
                if (supported_webgl_implementations[impl_idx] !== webgl_impl.name[0]) {
                    webgl_implementations_html += '<span class="href" id="switch-'
                        + supported_webgl_implementations[impl_idx]
                        + '" title="switch to &quot;'
                        + supported_webgl_implementations[impl_idx]
                        + '&quot;">';

                }
                else if (supported_webgl_implementations.length > 1) {
                    webgl_implementations_html += "<strong>";
                }
                webgl_implementations_html += supported_webgl_implementations[impl_idx];
                if (supported_webgl_implementations[impl_idx] != webgl_impl.name[0]) {
                    webgl_implementations_html += "</span>";
                }
                else if (supported_webgl_implementations.length > 1) {
                    webgl_implementations_html += "</strong>";
                }
            }

            $("#f_name").html(webgl_implementations_html);

            if (DEBUG) {
                t4 = performance.now();
                console.log("t4-t3 = ", t4 - t3, "ms");
            }

            for (let impl_idx in supported_webgl_implementations) {
                $("#switch-" + supported_webgl_implementations[impl_idx]).click(function (event) {
                    event.preventDefault();
                    $(this).off("click");
                    renderWebglTable($(this).attr("id").slice(7), supported_webgl_implementations);
                });
            }

            $("#f_alias").text(getAntialiasingString(render_context));
            let debug_renderer_info = htmlRendererInfo(render_context);

            // render html
            $("#u_vendor").html(debug_renderer_info.vendor);
            $("#u_renderer").html(debug_renderer_info.renderer);
            $("#f_angle").text(getANGLE(render_context));
            $("#f_anisotropy").text(getAnisotropy(render_context));
            $("#f_caveat").text(getMajorPerformanceCaveat(webgl_impl.name[0]));

            if(1 === maximum_webgl_version) {
                $("#f_max_draw_buffers").text(getMaxDrawBuffers(render_context));
            }

            $("#f_float_int").text(getFloatIntPrecision(render_context));
            $("#f_ext").html(getWebGLExtensionsWithLinks(render_context));
            $("#f_vertext").html(describePrecision(render_context, render_context.VERTEX_SHADER));
            $("#f_fragment").html(describePrecision(render_context, render_context.FRAGMENT_SHADER));

            // Hover extension handlers
            $(".ext-link").each(function () {

                $(this).on("mouseover", function () {

                    $(this).off();
                    let ext_link;
                    let a = ext_link = $(this).first().text();
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
                        + "</a>");
                })
            });

            if(window.location.hash && !webgl_implementation) {
                // plugins.js
                clck();
            }

            1 === maximum_webgl_version
                ? $(".w1").addClass("w1only")
                : 2 === maximum_webgl_version && $(".w2").addClass("w2only");
            destroyWebgl(render_context);
        }
        else {
            $("#webgl-table").removeClass("script").addClass("opac");
            $("#webgl-table em.ns").removeClass("ns");
        }

        if (DEBUG) {
            t5 = performance.now();
            console.log("t5-t4 = ", t5 - t4, "ms");
        }

        $("#webgl1-status").html(HTML_VALUE_MAP[webgl_1_status]);
        $("#webgl2-status").html(HTML_VALUE_MAP[webgl_2_status] + (1 === webgl_2_status
            ? webgl2_support_functions
            : ""));

        if (maximum_webgl_version && "" !== webgl2_support_functions) {
            let webgl2_td_html = $("#webgl2-status input");
            let webgl2_expanded_html = $("#webgl2-tbody");

            // Expand list of supported functions
            webgl2_td_html.click(function (a) {
                if (webgl2_td_html.attr("value") == "more") {
                    webgl2_td_html.attr("value", "less");
                    webgl2_expanded_html.removeClass("n");
                }
                else {
                    webgl2_td_html.attr("value", "more");
                    webgl2_expanded_html.addClass("n");
                }
            }).parent().addClass("webgl2-more-func");
        }

        if (DEBUG) {
            t6 = performance.now();
            console.log("t6-t5 = ", t6 - t5, "ms");
            console.log("total = ", t6 - t1, "ms");
        }
    }

    /// @function: webglDetect
    /// @return: Object {gl: WebGL context, name: array of supported WebGL implementation names}
    function webglDetect() {

        const gl_implementations = [
            "webgl2", "experimental-webgl2", "webgl", "experimental-webgl", "moz-webgl", "fake-webgl"
        ];

        let supported_implementations = [];
        let ctx = false;
        let impl_ctx = ctx;

        for (let index in gl_implementations) {
            impl_ctx = false;
            try {
                impl_ctx = document.createElement("canvas").getContext(gl_implementations[index], {stencil: true});

                if (impl_ctx){
                    if (ctx) {
                        destroyWebgl(impl_ctx);
                    }
                    else {
                        ctx = impl_ctx;
                    }
                    supported_implementations.push(gl_implementations[index]);
                }
            }
            catch (exc) {
                if (DEBUG) {
                    console.warn("webglDetect", exc);
                }
            }
        }
        return !!ctx && {name: supported_implementations, gl: ctx}
    }

    /// @function: expandParamPair
    /// @param pair_param: Float32Array of 2 elements
    /// @return: String formatted like "[%1, %2]" or "null" string
    function expandParamPair(pair_param) {
        return null == pair_param ? "null" : "[" + pair_param[0] + ", " + pair_param[1] + "]"
    }

    /// @function: getAntialiasingString
    /// @param render_ctx: WebGL rendering context
    /// @return: String representing Boolean, i.e. "True" or "False"
    function getAntialiasingString(render_ctx) {
        let bool_2_string = false;
        try {
            bool_2_string = render_ctx.getContextAttributes().antialias
        }
        catch (exc) {
            if (DEBUG) {
                console.warn("getAntialiasingString", exc);
            }
        }
        return bool_2_string ? "True" : "False"
    }

    /// @function: htmlRendererInfo
    /// @param render_ctx: WebGL rendering context
    /// @return: Object containing HTML strings for renderer and vendor
    function htmlRendererInfo(render_ctx) {
        let html_prefix = '<span class="bad">!</span> ';
        let renderer_html_info = {renderer: "n/render_ctx", vendor: "n/render_ctx"};
        let webgl_renderer_info = render_ctx.getExtension("WEBGL_debug_renderer_info");
        if(null != webgl_renderer_info) {
            renderer_html_info.renderer = html_prefix + render_ctx.getParameter(webgl_renderer_info.UNMASKED_RENDERER_WEBGL);
        }
        renderer_html_info.vendor = html_prefix + render_ctx.getParameter(webgl_renderer_info.UNMASKED_VENDOR_WEBGL);
        return renderer_html_info;
    }

    /// @function: getANGLE
    /// ANGLE - Almost Native Graphics Layer Engine
    /// See details at: https://chromium.googlesource.com/angle/angle/+/master/README.md
    /// @param render_ctx: WebGL rendering context
    function getANGLE(render_ctx) {

        function b(a) {
            return 0 !== a && 0 === (a & a - 1);
        }

        let c = expandParamPair(render_ctx.getParameter(render_ctx.ALIASED_LINE_WIDTH_RANGE));
        return "Win32" !== navigator.platform
        && "Win64" !== navigator.platform
        || "Internet Explorer" === render_ctx.getParameter(render_ctx.RENDERER)
        || "Microsoft Edge" === render_ctx.getParameter(render_ctx.RENDERER)
        || c !== expandParamPair([1, 1]) ? "False" : b(render_ctx.getParameter(render_ctx.MAX_VERTEX_UNIFORM_VECTORS))
        && b(render_ctx.getParameter(render_ctx.MAX_FRAGMENT_UNIFORM_VECTORS)) ? "True, Direct3D 11" : "True, Direct3D 9";
    }

    /// @function: getAnisotropy
    /// @param: gl
    function getAnisotropy(gl) {
        var b = gl.getExtension("EXT_texture_filter_anisotropic")
                || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic")
                || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");

        if (b) {
            var c = gl.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            return 0 === c && (c = 2), c;
        }
        return "n/a"
    }

    /// @function: getMajorPerformanceCaveat
    /// @param: gl
    function getMajorPerformanceCaveat(gl) {
        try {
            var b = $("<canvas />", {width: "1", height: "1"}).appendTo("body"),
                ctx = b[0].getContext(gl, {failIfMajorPerformanceCaveat: true});
            b.remove();
            if (ctx) {
                if (void 0 === ctx.getContextAttributes().failIfMajorPerformanceCaveat) {
                    destroyWebgl(ctx);
                    return "Not implemented";
                }
                else {
                    destroyWebgl(ctx);
                    return "False";
                }
            }
            else {
                return "True";
            }
        }
        catch (exc) {
            if (DEBUG) {
                console.warn("getMajorPerformanceCaveat", exc);
            }
            return "n/gl";
        }
    }

    /// @function: getMaxDrawBuffers
    /// @param: gl
    function getMaxDrawBuffers(gl) {
        var b = 0, 
            draw_buffers_ext = gl.getExtension("WEBGL_draw_buffers");
        if (draw_buffers_ext !== null) {
            b = gl.getParameter(draw_buffers_ext.MAX_DRAW_BUFFERS_WEBGL);
        }
        return b;
    }

    /// @function: getFloatIntPrecision
    /// @param: gl
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

    /// @function: getWebGLExtensionsWithLinks
    /// @param: gl
    function getWebGLExtensionsWithLinks(gl) {

        var extensions = [];
        try {
            extensions = gl.getSupportedExtensions();
        }
        catch (exc) {
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

    /// @function: renderRangeValue
    /// @param: gl
    /// @param: as_number
    function renderRangeValue(value, as_number) {
        return as_number ? "" + Math.pow(2, value) : "2<sup>" + value + "</sup>";
    }

    /// @function: renderRange
    /// @param: gl
    /// @param: as_number
    function renderRange(value, as_number) {
        var c = as_number ? " bit mantissa" : "";
        return "[-" + renderRangeValue(value.rangeMin, as_number) + ", " + renderRangeValue(value.rangeMax, as_number) + "] (" + value.precision + c + ")"
    }

    /// @function: describePrecision
    /// @param: gl
    /// @param: shaderType
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
            return '<span title="High: ' + renderRange(high, true) + "\n\nMedium: " + renderRange(med, true) + "\n\nLow: " + renderRange(low, true) + '">' + renderRange(label, false) + "</span>";
        }
        catch (exc) {
            if (DEBUG) {
                console.warn("describePrecision", exc);
            }
            return "n/a";
        }
    }

    /// @function: destroyWebgl
    /// @param: gl
    function destroyWebgl(gl) {
        try {
            var lc_ext = gl.getExtension("WEBGL_lose_context") 
                        || gl.getExtension("WEBKIT_WEBGL_lose_context")
                        || gl.getExtension("MOZ_WEBGL_lose_context");
            if (lc_ext !== null) {
                lc_ext.loseContext();
            }
        }
        catch (exc) {
            if (DEBUG) {
                console.warn("lose_context", exc);
            }
        }
    }

    var DEBUG = true,
        VERBOSE_DEBUG = false,
        webgl2_support_functions = "";

    renderWebglTable();

    (function () {

        setTimeout(function () {
            var canvas, ctx;
            const width = 256;
            const height = 128;  // var a;
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
            if (VERBOSE_DEBUG) {
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
                
                var f = ctx.createProgram();
                var vtx_shader = ctx.createShader(ctx.VERTEX_SHADER);

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
                // 256x128 is size, 4 bytes for RGBA
                const picture_webgl_size = 256*128*4;
                var j = new Uint8Array(picture_webgl_size);
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
