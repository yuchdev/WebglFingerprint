/* WebGL fingerprint calculation using Fingerprint class */
{
    'use strict';

    const DEBUG = true;
    const VERBOSE_DEBUG = false;
    const fp = typeof Fingerprint !== 'undefined' ? new Fingerprint() : null;

    if (!fp) {
        if (typeof window !== 'undefined') {
            console.error('Fingerprint class is required for webgl.js');
        }
    } else {
        let webgl2SupportFunctions = '';

        /**
         * Renders the WebGL information table.
         * @param {string|boolean} [requestedImplementation=false] - Specific implementation to use.
         * @param {string[]} [supportedImplementations] - List of supported implementations.
         */
        const renderWebglTable = (requestedImplementation = false, supportedImplementations) => {
            let t1 = 0;
            let t2 = 0;

            if (DEBUG) t1 = performance.now();

            let webgl1Status = fp.GL_UNSUPPORTED;
            let webgl2Status = fp.GL_UNSUPPORTED;

            if (window.WebGLRenderingContext) webgl1Status = fp.GL_SUPPORTED;
            if (window.WebGL2RenderingContext) webgl2Status = fp.GL_SUPPORTED;

            const isWebgl2Supported = !!window.WebGL2RenderingContext;
            const detectionResult = fp.detect();

            if (!requestedImplementation) {
                supportedImplementations = detectionResult ? detectionResult.name : [];
            }

            if (fp.GL_SUPPORTED === webgl1Status && !detectionResult) {
                webgl1Status = fp.GL_DISABLED;
            }

            if (fp.GL_SUPPORTED === webgl2Status) {
                const webgl2Implementations = supportedImplementations.filter((impl) => impl.endsWith('2'));
                if (webgl2Implementations.length === 0) {
                    webgl2Status = fp.GL_DISABLED;
                }
            }

            if (DEBUG) {
                t2 = performance.now();
                console.log('Detection time: ', t2 - t1, 'ms');
            }

            if (detectionResult) {
                const gl = detectionResult.gl;
                const currentImpl = requestedImplementation || detectionResult.name[0];
                const maxVersion = currentImpl.includes('2') ? 2 : 1;

                if (maxVersion === 2) {
                    document.querySelectorAll('.w2').forEach((el) => el.classList.remove('n'));
                    document.querySelectorAll('.w1').forEach((el) => el.classList.add('n'));
                } else {
                    if (currentImpl === 'fake-webgl' || typeof gl.getParameter !== 'function') {
                        return false;
                    }
                    document.querySelectorAll('.w1').forEach((el) => el.classList.remove('n'));
                    document.querySelectorAll('.w2').forEach((el) => el.classList.add('n'));
                }

                // WebGL 2 functions check
                if (isWebgl2Supported && webgl2SupportFunctions === '' && maxVersion === 2) {
                    const WEBGL2_FUNCTIONS = [
                        'copyBufferSubData',
                        'getBufferSubData',
                        'blitFramebuffer',
                        'framebufferTextureLayer',
                        'getInternalformatParameter',
                        'invalidateFramebuffer',
                        'invalidateSubFramebuffer',
                        'readBuffer',
                        'renderbufferStorageMultisample',
                        'texStorage2D',
                        'texStorage3D',
                        'texImage3D',
                        'texSubImage3D',
                        'copyTexSubImage3D',
                        'compressedTexImage3D',
                        'compressedTexSubImage3D',
                        'getFragDataLocation',
                        'uniform1ui',
                        'uniform2ui',
                        'uniform3ui',
                        'uniform4ui',
                        'uniform1uiv',
                        'uniform2uiv',
                        'uniform3uiv',
                        'uniform4uiv',
                        'uniformMatrix2x3fv',
                        'uniformMatrix3x2fv',
                        'uniformMatrix2x4fv',
                        'uniformMatrix4x2fv',
                        'uniformMatrix3x4fv',
                        'uniformMatrix4x3fv',
                        'vertexAttribI4i',
                        'vertexAttribI4iv',
                        'vertexAttribI4ui',
                        'vertexAttribI4uiv',
                        'vertexAttribIPointer',
                        'vertexAttribDivisor',
                        'drawArraysInstanced',
                        'drawElementsInstanced',
                        'drawRangeElements',
                        'drawBuffers',
                        'clearBufferiv',
                        'clearBufferuiv',
                        'clearBufferfv',
                        'clearBufferfi',
                        'createQuery',
                        'deleteQuery',
                        'isQuery',
                        'beginQuery',
                        'endQuery',
                        'getQuery',
                        'getQueryParameter',
                        'createSampler',
                        'deleteSampler',
                        'isSampler',
                        'bindSampler',
                        'samplerParameteri',
                        'samplerParameterf',
                        'getSamplerParameter',
                        'fenceSync',
                        'isSync',
                        'deleteSync',
                        'clientWaitSync',
                        'waitSync',
                        'getSyncParameter',
                        'createTransformFeedback',
                        'deleteTransformFeedback',
                        'isTransformFeedback',
                        'bindTransformFeedback',
                        'beginTransformFeedback',
                        'endTransformFeedback',
                        'transformFeedbackVaryings',
                        'getTransformFeedbackVarying',
                        'pauseTransformFeedback',
                        'resumeTransformFeedback',
                        'bindBufferBase',
                        'bindBufferRange',
                        'getIndexedParameter',
                        'getUniformIndices',
                        'getActiveUniforms',
                        'getUniformBlockIndex',
                        'getActiveUniformBlockParameter',
                        'getActiveUniformBlockName',
                        'uniformBlockBinding',
                        'createVertexArray',
                        'deleteVertexArray',
                        'isVertexArray',
                        'bindVertexArray',
                    ];

                    let supportedCount = 0;
                    WEBGL2_FUNCTIONS.forEach((func, idx) => {
                        const isSupported = typeof gl[func] === 'function';
                        if (isSupported) supportedCount++;
                        const el = document.getElementById('n' + idx);
                        if (el) el.innerHTML = isSupported ? fp.ICON_SUPPORTED + 'True' : fp.ICON_UNSUPPORTED + 'False';
                    });

                    if (supportedCount > 0) {
                        webgl2SupportFunctions = ` (${supportedCount} of ${WEBGL2_FUNCTIONS.length} new functions implemented)<input type="button" value="more" />`;
                    }
                }

                // Fill parameters
                const params = fp.getWebGlParameters(gl);
                const paramOrder = [
                    'VERSION',
                    'SHADING_LANGUAGE_VERSION',
                    'VENDOR',
                    'RENDERER',
                    'MAX_VERTEX_ATTRIBS',
                    'MAX_VERTEX_UNIFORM_VECTORS',
                    'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
                    'MAX_VARYING_VECTORS',
                    'ALIASED_LINE_WIDTH_RANGE',
                    'ALIASED_POINT_SIZE_RANGE',
                    'MAX_FRAGMENT_UNIFORM_VECTORS',
                    'MAX_TEXTURE_IMAGE_UNITS',
                    'RED_BITS_GREEN_BITS_BLUE_BITS_ALPHA_BITS',
                    'DEPTH_BITS_STENCIL_BITS',
                    'MAX_RENDERBUFFER_SIZE',
                    'MAX_VIEWPORT_DIMS',
                    'MAX_TEXTURE_SIZE',
                    'MAX_CUBE_MAP_TEXTURE_SIZE',
                    'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
                ];
                if (maxVersion === 2) {
                    paramOrder.push(
                        'MAX_VERTEX_UNIFORM_COMPONENTS',
                        'MAX_VERTEX_UNIFORM_BLOCKS',
                        'MAX_VERTEX_OUTPUT_COMPONENTS',
                        'MAX_VARYING_COMPONENTS',
                        'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS',
                        'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS',
                        'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS',
                        'MAX_FRAGMENT_UNIFORM_COMPONENTS',
                        'MAX_FRAGMENT_UNIFORM_BLOCKS',
                        'MAX_FRAGMENT_INPUT_COMPONENTS',
                        'MIN_PROGRAM_TEXEL_OFFSET',
                        'MAX_PROGRAM_TEXEL_OFFSET',
                        'MAX_DRAW_BUFFERS',
                        'MAX_COLOR_ATTACHMENTS',
                        'MAX_SAMPLES',
                        'MAX_3D_TEXTURE_SIZE',
                        'MAX_ARRAY_TEXTURE_LAYERS',
                        'MAX_TEXTURE_LOD_BIAS',
                        'MAX_UNIFORM_BUFFER_BINDINGS',
                        'MAX_UNIFORM_BLOCK_SIZE',
                        'UNIFORM_BUFFER_OFFSET_ALIGNMENT',
                        'MAX_COMBINED_UNIFORM_BLOCKS',
                        'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS',
                        'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS'
                    );
                }

                paramOrder.forEach((key, idx) => {
                    const el = document.getElementById('f' + idx);
                    if (el) el.textContent = params[key] || 'n/a';
                });

                // Implementations list and switcher
                const implementationsHtml = supportedImplementations
                    .map((impl) => {
                        if (impl !== currentImpl) {
                            return `<span class="href" id="switch-${impl}" title="switch to &quot;${impl}&quot;">${impl}</span>`;
                        }
                        return supportedImplementations.length > 1 ? `<strong>${impl}</strong>` : impl;
                    })
                    .join(', ');

                const fNameEl = document.getElementById('f_name');
                if (fNameEl) fNameEl.innerHTML = implementationsHtml;

                supportedImplementations.forEach((impl) => {
                    const el = document.getElementById(`switch-${impl}`);
                    if (el) {
                        el.addEventListener(
                            'click',
                            (e) => {
                                e.preventDefault();
                                renderWebglTable(impl, supportedImplementations);
                            },
                            { once: true }
                        );
                    }
                });

                // Additional info
                const fAliasEl = document.getElementById('f_alias');
                if (fAliasEl) fAliasEl.textContent = fp.getAntialiasingString(gl);
                const debugRendererInfo = fp.getRendererInfo(gl);
                const uVendorEl = document.getElementById('u_vendor');
                if (uVendorEl) uVendorEl.innerHTML = `<span class="bad">!</span> ${debugRendererInfo.vendor}`;
                const uRendererEl = document.getElementById('u_renderer');
                if (uRendererEl) uRendererEl.innerHTML = `<span class="bad">!</span> ${debugRendererInfo.renderer}`;
                const fAngleEl = document.getElementById('f_angle');
                if (fAngleEl) fAngleEl.textContent = fp.getAngle(gl);
                const fAnisotropyEl = document.getElementById('f_anisotropy');
                if (fAnisotropyEl) fAnisotropyEl.textContent = fp.getAnisotropy(gl);
                const fCaveatEl = document.getElementById('f_caveat');
                if (fCaveatEl) fCaveatEl.textContent = fp.getMajorPerformanceCaveat(currentImpl);

                if (maxVersion === 1) {
                    const fMaxDrawBuffersEl = document.getElementById('f_max_draw_buffers');
                    if (fMaxDrawBuffersEl) fMaxDrawBuffersEl.textContent = fp.getMaxDrawBuffers(gl);
                }

                const fFloatIntEl = document.getElementById('f_float_int');
                if (fFloatIntEl) fFloatIntEl.textContent = fp.getFloatIntPrecision(gl);

                // Extensions with links
                const extensions = gl.getSupportedExtensions();
                let extHtml = '<tr><td>Supported WebGL Extensions</td>';
                const privilegedExts = [];
                extensions.forEach((ext, i) => {
                    if (ext !== 'WEBGL_debug_renderer_info' && ext !== 'WEBGL_debug_shaders') {
                        if (i > 0) extHtml += '<tr><td class="nt"></td>';
                        extHtml += `<td class="ext-link"><span class="href">${ext}</span></td></tr>`;
                    } else {
                        privilegedExts.push(ext);
                    }
                });
                extHtml += '<tr><td>Supported Privileged Extensions</td>';
                if (privilegedExts.length > 0) {
                    privilegedExts.forEach((ext, i) => {
                        if (i > 0) extHtml += '<tr><td class="nt"></td>';
                        extHtml += `<td class="ext-link"><span class="href">${ext}</span></td></tr>`;
                    });
                } else {
                    extHtml += '<td>n/a</td></tr>';
                }
                const fExtEl = document.getElementById('f_ext');
                if (fExtEl) fExtEl.innerHTML = extHtml;

                const fVertexEl = document.getElementById('f_vertext');
                if (fVertexEl) fVertexEl.innerHTML = fp.describePrecision(gl, gl.VERTEX_SHADER);
                const fFragmentEl = document.getElementById('f_fragment');
                if (fFragmentEl) fFragmentEl.innerHTML = fp.describePrecision(gl, gl.FRAGMENT_SHADER);

                // Extension hover handlers
                document.querySelectorAll('.ext-link').forEach((el) => {
                    el.addEventListener(
                        'mouseover',
                        function () {
                            const spanEl = this.querySelector('span');
                            if (!spanEl) return;
                            const originalText = spanEl.textContent;
                            let extName = originalText.replace(/^WEBKIT_|MOZ_|_EXT_/, '');
                            if (originalText === 'WEBKIT_lose_context') extName = 'WEBGL_lose_context';

                            this.innerHTML = `<a href="https://www.khronos.org/registry/webgl/extensions/${extName}" title="${
                                extName ? extName + ' — ' : ''
                            }WebGL Extension Specification" rel="noopener nofollow" target="_blank">${originalText}</a>`;
                        },
                        { once: true }
                    );
                });

                if (window.location.hash && !requestedImplementation) {
                    if (typeof clck === 'function') clck();
                }

                maxVersion === 1
                    ? document.querySelectorAll('.w1').forEach((el) => el.classList.add('w1only'))
                    : document.querySelectorAll('.w2').forEach((el) => el.classList.add('w2only'));
                fp.destroyWebgl(gl);
            } else {
                const tableEl = document.getElementById('webgl-table');
                if (tableEl) {
                    tableEl.classList.remove('script');
                    tableEl.classList.add('opac');
                    const emNs = tableEl.querySelector('em.ns');
                    if (emNs) emNs.classList.remove('ns');
                }
            }

            const webgl1StatusEl = document.getElementById('webgl1-status');
            if (webgl1StatusEl) webgl1StatusEl.innerHTML = fp.HTML_VALUE_MAP[webgl1Status];
            const webgl2StatusEl = document.getElementById('webgl2-status');
            if (webgl2StatusEl) {
                webgl2StatusEl.innerHTML =
                    fp.HTML_VALUE_MAP[webgl2Status] + (webgl2Status === fp.GL_SUPPORTED ? webgl2SupportFunctions : '');
            }

            if (webgl2SupportFunctions !== '') {
                const btn = webgl2StatusEl.querySelector('input');
                const tbody = document.getElementById('webgl2-tbody');
                if (btn && tbody) {
                    btn.addEventListener('click', function () {
                        if (this.value === 'more') {
                            this.value = 'less';
                            tbody.classList.remove('n');
                        } else {
                            this.value = 'more';
                            tbody.classList.add('n');
                        }
                    });
                    if (btn.parentElement) btn.parentElement.classList.add('webgl2-more-func');
                }
            }
        };

        renderWebglTable();

        // Image Fingerprinting replacement
        document.addEventListener('DOMContentLoaded', async () => {
            const hash = await fp.generateImageHash();

            // Context hash (of the table content)
            setTimeout(() => {
                const tableEl = document.getElementById('webgl-table');
                const tableContent = tableEl ? tableEl.innerText : '';
                if (VERBOSE_DEBUG) console.log('Table Content:', tableContent);
                const hashEl = document.getElementById('hash');
                if (hashEl) hashEl.textContent = tableContent;
                const contextHash = md5(tableContent);
                const contextFpEl = document.getElementById('webgl-fp-context');
                if (contextFpEl) contextFpEl.textContent = contextHash;

                // Image hash
                const imgFpEl = document.getElementById('webgl-fp-img');
                if (imgFpEl) imgFpEl.textContent = hash;

                // Prepend the canvas to show it
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 128;
                const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
                if (gl) {
                    // We need to redraw for the display canvas
                    const program = gl.createProgram();
                    const vtxShader = gl.createShader(gl.VERTEX_SHADER);
                    gl.shaderSource(
                        vtxShader,
                        'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate = attrVertex + uniformOffset;gl_Position = vec4(attrVertex, 0, 1);}'
                    );
                    gl.compileShader(vtxShader);
                    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
                    gl.shaderSource(
                        fragShader,
                        'precision mediump float;varying vec2 varyinTexCoordinate;void main(){gl_FragColor = vec4(varyinTexCoordinate, 0, 1);}'
                    );
                    gl.compileShader(fragShader);
                    gl.attachShader(program, vtxShader);
                    gl.attachShader(program, fragShader);
                    gl.linkProgram(program);
                    gl.useProgram(program);
                    const buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                    gl.bufferData(
                        gl.ARRAY_BUFFER,
                        new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]),
                        gl.STATIC_DRAW
                    );
                    const attrVertex = gl.getAttribLocation(program, 'attrVertex');
                    gl.enableVertexAttribArray(attrVertex);
                    gl.vertexAttribPointer(attrVertex, 3, gl.FLOAT, false, 0, 0);
                    const uniformOffset = gl.getUniformLocation(program, 'uniformOffset');
                    gl.uniform2f(uniformOffset, 1, 1);
                    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
                    const webglImgEl = document.getElementById('webgl-img');
                    if (webglImgEl) webglImgEl.prepend(canvas);
                } else {
                    const webglImgEl = document.getElementById('webgl-img');
                    if (webglImgEl) webglImgEl.textContent = 'n/a';
                }
            }, 100);
        });
    }
}
