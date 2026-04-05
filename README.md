# WebGL Device Fingerprinting Report

WebGL Device Fingerprinting algorithm implementation in JavaScript. For usage just open `index.html` or start a web-server in the project directory.

## Project Structure

- `index.html`: Main application entry point.
- `js/Fingerprint.js`: Modern OOP implementation of the WebGL fingerprinting logic.
- `js/webgl.js`: Script to interact with the DOM and use `Fingerprint` class.
- `js/md5.js`: MD5 hashing library.
- `js/plugins.js`: Additional browser capability checks and utility functions.
- `css/style.css`: Project styling.
- `img/logo.png`: Project logo.
- `tests/index.html`: Unit tests using QUnit.
- `docs/fingerprinting.md`: Documentation of the fingerprinting algorithm.

## Setup and Usage

1. Clone or download the repository.
2. Open `index.html` in a modern web browser to view the WebGL report and fingerprint. 
3. To run tests, open `tests/index.html` in your browser.

## Features

- **Detection**: Automatically detects all supported WebGL versions (1.0 and 2.0).
- **Parameters**: Gathers over 50 different WebGL context parameters.
- **Image Hashing**: Generates a unique image-based fingerprint through GPU rendering.
- **Modern JS**: Rewritten using modern JavaScript (ES6+) and OOP principles.
- **Documentation**: Comprehensive documentation of the algorithm and code.

