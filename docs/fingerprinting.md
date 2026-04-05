# WebGL Fingerprinting Algorithm

This document describes the algorithm used to generate WebGL fingerprints in this project.

## Overview

The fingerprinting process consists of two main parts:
1. **Context Parameter Gathering**: Collecting specific capabilities and parameters from the WebGL rendering context.
2. **Image Generation and Hashing**: Rendering a specific 3D scene and generating a hash of the resulting pixels.

## 1. Context Parameter Gathering

The algorithm attempts to detect all supported WebGL implementations (e.g., `webgl2`, `webgl`, `experimental-webgl`). For each implementation, it gathers a wide range of parameters, including:

- **Browser Information**: `VERSION`, `SHADING_LANGUAGE_VERSION`, `VENDOR`, `RENDERER`.
- **GPU Limits**: `MAX_VERTEX_ATTRIBS`, `MAX_VERTEX_UNIFORM_VECTORS`, `MAX_TEXTURE_SIZE`, etc.
- **Extensions**: A list of all supported WebGL extensions.
- **Precision Information**: Floating point and integer precision for vertex and fragment shaders.
- **Antialiasing**: Whether antialiasing is supported and enabled.
- **Unmasked Info**: If `WEBGL_debug_renderer_info` is available, it collects the unmasked vendor and renderer names.
- **Performance Caveats**: Whether the browser indicates a major performance caveat for the context.

These parameters are formatted and presented in a table, and a hash of the table's HTML content is generated as a "context fingerprint".

## 2. Image Generation and Hashing

To capture differences in how different GPUs and drivers render graphics, the algorithm performs a specific rendering task:

1. **Setup**: Create a 256x128 canvas.
2. **Shaders**:
   - **Vertex Shader**: Combines vertex attributes with a uniform offset to determine texture coordinates.
   - **Fragment Shader**: Uses the interpolated texture coordinates as the output color (`gl_FragColor`).
3. **Geometry**: A simple triangle strip is drawn using specific coordinates.
4. **Rendering**: The scene is drawn once.
5. **Pixel Extraction**: The `readPixels` method is used to extract the RGBA data from the framebuffer.
6. **Hashing**: The raw pixel data is serialized and hashed using the MD5 algorithm.

## Combining Results

The final fingerprint typically consists of both the context hash and the image hash, providing a multi-layered identification of the browser's WebGL environment.
