/**
 * Class representing a WebGL Fingerprint.
 * Provides methods to detect WebGL capabilities, gather parameters, and generate a fingerprint.
 */
class Fingerprint {
    /**
     * Initialize constants and state.
     */
    constructor() {
        /** @type {string} */
        this.ICON_SUPPORTED = '<span class="good">&#10004;</span>';
        /** @type {string} */
        this.ICON_UNSUPPORTED = '<span class="bad">&#215;</span>';
        /** @type {string[]} */
        this.HTML_VALUE_MAP = [
            this.ICON_UNSUPPORTED + "False",
            this.ICON_SUPPORTED + "True",
            this.ICON_UNSUPPORTED + "False (supported, but disabled in browser settings, or blocked by extensions)",
            this.ICON_UNSUPPORTED + "False (supported, but blocked by browser extensions)"
        ];

        /** @type {number} */
        this.GL_UNSUPPORTED = 0;
        /** @type {number} */
        this.GL_SUPPORTED = 1;
        /** @type {number} */
        this.GL_DISABLED = 2;
        /** @type {number} */
        this.GL_BLOCKED = 3;

        /** @type {string[]} */
        this.glImplementations = [
            "webgl2", "experimental-webgl2", "webgl", "experimental-webgl", "moz-webgl", "fake-webgl"
        ];
    }

    /**
     * Detect supported WebGL implementations and returns the first successful context.
     * @returns {{gl: WebGLRenderingContext|WebGL2RenderingContext, name: string[]}|boolean} Object with context and names, or false if not supported.
     */
    detect() {
        let supportedImplementations = [];
        let firstCtx = null;

        for (const implName of this.glImplementations) {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext(implName, { stencil: true });

                if (ctx) {
                    if (firstCtx) {
                        this.destroyWebgl(ctx);
                    } else {
                        firstCtx = ctx;
                    }
                    supportedImplementations.push(implName);
                }
            } catch (exc) {
                console.warn(`WebGlFingerprint.detect: ${implName}`, exc);
            }
        }
        return firstCtx ? { name: supportedImplementations, gl: firstCtx } : false;
    }

    /**
     * Destroys a WebGL context using the lose_context extension.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context to destroy.
     */
    destroyWebgl(gl) {
        try {
            const lcExt = gl.getExtension("WEBGL_lose_context")
                || gl.getExtension("WEBKIT_WEBGL_lose_context")
                || gl.getExtension("MOZ_WEBGL_lose_context");
            if (lcExt !== null) {
                lcExt.loseContext();
            }
        } catch (exc) {
            console.warn("Fingerprint.destroyWebgl", exc);
        }
    }

    /**
     * Formats a Float32Array of 2 elements into a string.
     * @param {Float32Array|Int32Array|number[]|null} pairParam - The parameter to format.
     * @returns {string} Formatted string.
     */
    expandParamPair(pairParam) {
        return pairParam === null ? "null" : `[${pairParam[0]}, ${pairParam[1]}]`;
    }

    /**
     * Gets the antialiasing status as a string.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {string} "True" or "False".
     */
    getAntialiasingString(gl) {
        try {
            return gl.getContextAttributes().antialias ? "True" : "False";
        } catch (exc) {
            console.warn("Fingerprint.getAntialiasingString", exc);
            return "False";
        }
    }

    /**
     * Gets unmasked renderer and vendor information.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {{renderer: string, vendor: string}} Object with renderer and vendor info.
     */
    getRendererInfo(gl) {
        const info = { renderer: "n/a", vendor: "n/a" };
        const extension = gl.getExtension("WEBGL_debug_renderer_info");
        if (extension) {
            const renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
            const vendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
            info.renderer = renderer;
            info.vendor = vendor;
        }
        return info;
    }

    /**
     * Detects if ANGLE is used.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {string} "True, Direct3D 11", "True, Direct3D 9", or "False".
     */
    getAngle(gl) {
        const isPowerOfTwo = (n) => n !== 0 && (n & (n - 1)) === 0;
        const aliasedLineWidthRange = this.expandParamPair(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE));
        const platform = navigator.platform;

        if ((platform !== "Win32" && platform !== "Win64") ||
            gl.getParameter(gl.RENDERER) === "Internet Explorer" ||
            gl.getParameter(gl.RENDERER) === "Microsoft Edge" ||
            aliasedLineWidthRange !== "[1, 1]") {
            return "False";
        }

        if (isPowerOfTwo(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)) &&
            isPowerOfTwo(gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))) {
            return "True, Direct3D 11";
        }

        return "True, Direct3D 9";
    }

    /**
     * Gets the maximum anisotropy value.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {number|string} Maximum anisotropy or "n/a".
     */
    getAnisotropy(gl) {
        const ext = gl.getExtension("EXT_texture_filter_anisotropic")
            || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic")
            || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");

        if (ext) {
            let max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            if (max === 0) max = 2;
            return max;
        }
        return "n/a";
    }

    /**
     * Checks for major performance caveat.
     * @param {string} implName - The implementation name (e.g., "webgl").
     * @returns {string} "True", "False", or "Not implemented".
     */
    getMajorPerformanceCaveat(implName) {
        try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext(implName, { failIfMajorPerformanceCaveat: true });
            if (!ctx) return "True";
            
            if (ctx.getContextAttributes().failIfMajorPerformanceCaveat === undefined) {
                this.destroyWebgl(ctx);
                return "Not implemented";
            }
            this.destroyWebgl(ctx);
            return "False";
        } catch (exc) {
            return "True";
        }
    }

    /**
     * Gets the maximum number of draw buffers.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {number} Maximum number of draw buffers.
     */
    getMaxDrawBuffers(gl) {
        let maxDrawBuffers = 0;
        const ext = gl.getExtension("WEBGL_draw_buffers");
        if (ext) {
            maxDrawBuffers = gl.getParameter(ext.MAX_DRAW_BUFFERS_WEBGL);
        }
        return maxDrawBuffers;
    }

    /**
     * Gets highp float and highp int precision support.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {string} Precision support string (e.g., "highp/highp").
     */
    getFloatIntPrecision(gl) {
        try {
            const fragPrecHFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
            const fragPrecHInt = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT);
            let html = fragPrecHFloat.precision !== 0 ? "highp/" : "mediump/";
            html += fragPrecHInt.rangeMax !== 0 ? "highp" : "lowp";
            return html;
        } catch (exc) {
            return "n/a";
        }
    }

    /**
     * Renders a range value.
     * @param {number} value - The value to render.
     * @param {boolean} asNumber - Whether to render as a plain number or as power of 2.
     * @returns {string} Rendered value.
     */
    renderRangeValue(value, asNumber) {
        return asNumber ? "" + Math.pow(2, value) : `2<sup>${value}</sup>`;
    }

    /**
     * Renders a range.
     * @param {WebGLShaderPrecisionFormat} value - The precision format object.
     * @param {boolean} asNumber - Whether to render as numbers or powers of 2.
     * @returns {string} Rendered range.
     */
    renderRange(value, asNumber) {
        const suffix = asNumber ? " bit mantissa" : "";
        return `[-${this.renderRangeValue(value.rangeMin, asNumber)}, ${this.renderRangeValue(value.rangeMax, asNumber)}] (${value.precision}${suffix})`;
    }

    /**
     * Describes the precision of a shader type.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @param {number} shaderType - The shader type (VERTEX_SHADER or FRAGMENT_SHADER).
     * @returns {string} HTML string describing precision.
     */
    describePrecision(gl, shaderType) {
        try {
            const high = gl.getShaderPrecisionFormat(shaderType, gl.HIGH_FLOAT);
            const med = gl.getShaderPrecisionFormat(shaderType, gl.MEDIUM_FLOAT);
            const low = gl.getShaderPrecisionFormat(shaderType, gl.LOW_FLOAT);
            let label = high;
            if (high.precision === 0) {
                label = med;
            }
            return `<span title="High: ${this.renderRange(high, true)}\n\nMedium: ${this.renderRange(med, true)}\n\nLow: ${this.renderRange(low, true)}">${this.renderRange(label, false)}</span>`;
        } catch (exc) {
            return "n/a";
        }
    }

    /**
     * Gathers all WebGL parameters.
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @returns {Object} Object containing gathered parameters.
     */
    getWebGlParameters(gl) {
        const params = [
            "VERSION", "SHADING_LANGUAGE_VERSION", "VENDOR", "RENDERER",
            "MAX_VERTEX_ATTRIBS", "MAX_VERTEX_UNIFORM_VECTORS", "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
            "MAX_VARYING_VECTORS", "ALIASED_LINE_WIDTH_RANGE", "ALIASED_POINT_SIZE_RANGE",
            "MAX_FRAGMENT_UNIFORM_VECTORS", "MAX_TEXTURE_IMAGE_UNITS",
            ["RED_BITS", "GREEN_BITS", "BLUE_BITS", "ALPHA_BITS"],
            ["DEPTH_BITS", "STENCIL_BITS"],
            "MAX_RENDERBUFFER_SIZE", "MAX_VIEWPORT_DIMS", "MAX_TEXTURE_SIZE",
            "MAX_CUBE_MAP_TEXTURE_SIZE", "MAX_COMBINED_TEXTURE_IMAGE_UNITS"
        ];

        const isWebGl2 = gl instanceof (window.WebGL2RenderingContext || Object);
        if (isWebGl2) {
            params.push(
                "MAX_VERTEX_UNIFORM_COMPONENTS", "MAX_VERTEX_UNIFORM_BLOCKS",
                "MAX_VERTEX_OUTPUT_COMPONENTS", "MAX_VARYING_COMPONENTS",
                "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS", "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",
                "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS", "MAX_FRAGMENT_UNIFORM_COMPONENTS",
                "MAX_FRAGMENT_UNIFORM_BLOCKS", "MAX_FRAGMENT_INPUT_COMPONENTS",
                "MIN_PROGRAM_TEXEL_OFFSET", "MAX_PROGRAM_TEXEL_OFFSET",
                "MAX_DRAW_BUFFERS", "MAX_COLOR_ATTACHMENTS", "MAX_SAMPLES",
                "MAX_3D_TEXTURE_SIZE", "MAX_ARRAY_TEXTURE_LAYERS", "MAX_TEXTURE_LOD_BIAS",
                "MAX_UNIFORM_BUFFER_BINDINGS", "MAX_UNIFORM_BLOCK_SIZE",
                "UNIFORM_BUFFER_OFFSET_ALIGNMENT", "MAX_COMBINED_UNIFORM_BLOCKS",
                "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS", "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"
            );
        }

        const result = {};
        for (const param of params) {
            if (Array.isArray(param)) {
                const subValues = param.map(p => gl.getParameter(gl[p]));
                result[param.join("_")] = `[${subValues.join(", ")}]`;
            } else {
                let val = gl.getParameter(gl[param]);
                if (val === null) {
                    val = "n/a";
                } else if (typeof val === "object" && (val.length !== undefined)) {
                    val = this.expandParamPair(val);
                }
                result[param] = val;
            }
        }
        return result;
    }

    /**
     * Generates a WebGL image hash.
     * @returns {Promise<string>} MD5 hash of the generated WebGL image.
     */
    async generateImageHash() {
        return new Promise((resolve) => {
            const width = 256;
            const height = 128;
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const gl = canvas.getContext("webgl2")
                || canvas.getContext("experimental-webgl2")
                || canvas.getContext("webgl")
                || canvas.getContext("experimental-webgl")
                || canvas.getContext("moz-webgl");

            if (!gl) {
                resolve("n/a");
                return;
            }

            try {
                const program = gl.createProgram();
                const vtxShader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vtxShader,
                    "attribute vec2 attrVertex;" +
                    "varying vec2 varyinTexCoordinate;" +
                    "uniform vec2 uniformOffset;" +
                    "void main(){" +
                    "    varyinTexCoordinate = attrVertex + uniformOffset;" +
                    "    gl_Position = vec4(attrVertex, 0, 1);" +
                    "}"
                );
                gl.compileShader(vtxShader);

                const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fragShader,
                    "precision mediump float;" +
                    "varying vec2 varyinTexCoordinate;" +
                    "void main(){" +
                    "    gl_FragColor = vec4(varyinTexCoordinate, 0, 1);" +
                    "}"
                );
                gl.compileShader(fragShader);
                gl.attachShader(program, vtxShader);
                gl.attachShader(program, fragShader);
                gl.linkProgram(program);
                gl.useProgram(program);

                const buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]), gl.STATIC_DRAW);

                const attrVertex = gl.getAttribLocation(program, "attrVertex");
                gl.enableVertexAttribArray(attrVertex);
                gl.vertexAttribPointer(attrVertex, 3, gl.FLOAT, false, 0, 0);

                const uniformOffset = gl.getUniformLocation(program, "uniformOffset");
                gl.uniform2f(uniformOffset, 1, 1);

                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

                const pixels = new Uint8Array(width * height * 4);
                gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                const fingerprint = JSON.stringify(pixels).replace(/,?"[0-9]+":/g, "");
                
                if (fingerprint.replace(/^{0+}$/g, "") === "") {
                    resolve("n/a");
                } else {
                    resolve(md5(fingerprint));
                }
            } catch (exc) {
                console.warn("Fingerprint.generateImageHash", exc);
                resolve("n/a");
            } finally {
                this.destroyWebgl(gl);
            }
        });
    }
}
