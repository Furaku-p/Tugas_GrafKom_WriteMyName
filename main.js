function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        alert("WebGL tidak didukung oleh browser!");
        return;
    }

    var vertices = [

        // =========================
        // HURUF A
        // =========================

        // Batang kiri
        -0.85, -0.45,
        -0.71,  0.45,
        -0.64,  0.45,
        -0.78, -0.45,
        -0.85, -0.45,

        // Batang kanan
        -0.64,  0.45,
        -0.50, -0.45,
        -0.57, -0.45,
        -0.71,  0.45,
        -0.64,  0.45,

        // Garis tengah
        -0.78, -0.06,
        -0.58, -0.06,
        -0.58,  0.06,
        -0.75,  0.06,
        -0.78, -0.06,


        // =========================
        // HURUF R
        // =========================

        // Batang kiri
        -0.43,  0.45,
        -0.43, -0.45,
        -0.36, -0.45,
        -0.36,  0.45,
        -0.43,  0.45,

        // Bagian atas R
        -0.38,  0.45,
        -0.15,  0.45,
        -0.15,  0.33,
        -0.38,  0.33,
        -0.38,  0.45,

        // Bagian tengah R
        -0.38,  0.09,
        -0.15,  0.09,
        -0.15, -0.03,
        -0.38, -0.03,
        -0.38,  0.09,

        // Bagian Kanan Atas R
        -0.15,  0.33,
        -0.15,  0.09,
        -0.08,  0.09,
        -0.08,  0.33,
        -0.15,  0.33,

        // Miring Atas R
        -0.15,  0.45,
        -0.08,  0.33,
        -0.15,  0.33,
        -0.22,  0.45,
        -0.15,  0.45,

        // Miring Bawah R
        -0.08,  0.09,
        -0.15, -0.03,
        -0.22, -0.03,
        -0.15,  0.09,
        -0.08,  0.09,

        // Kaki R
        -0.38, -0.03,
        -0.29, -0.03,
        -0.08, -0.45,
        -0.17, -0.45,
        -0.38, -0.03,


        // =========================
        // HURUF I
        // =========================

        // Garis atas I
        -0.01,  0.45,
        0.26,  0.45,
        0.26,  0.33,
        -0.01,  0.33,
        -0.01,  0.45,

        // Batang I
        0.09,  0.35,
        0.16,  0.35,
        0.16, -0.35,
        0.09, -0.35,
        0.09,  0.35,

        // Garis Bawah I
        -0.01, -0.45,
        0.26, -0.45,
        0.26, -0.33,
        -0.01, -0.33,
        -0.01, -0.45,


        // =========================
        // HURUF L
        // =========================

        // Garis L
        0.33,  0.45,
        0.40,  0.45,
        0.40, -0.45,
        0.33, -0.45,
        0.33,  0.45,

        // Bagian bawah L
        0.40, -0.45,
        0.70, -0.45,
        0.70, -0.33,
        0.40, -0.33,
        0.40, -0.45
    ];


    // =========================
    // BUFFER
    // =========================

    var positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, null);


    // =========================
    // VERTEX SHADER
    // =========================

    var vertexShaderCode = `
        attribute vec2 aPosition;

        void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;


    // =========================
    // FRAGMENT SHADER
    // =========================

    var fragmentShaderCode = `
        precision mediump float;

        uniform vec4 uColor;

        void main() {
            gl_FragColor = uColor;
        }
    `;


    // =========================
    // BUAT SHADER
    // =========================

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);


    // =========================
    // PROGRAM
    // =========================

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.useProgram(program);


    // =========================
    // WARNA
    // =========================

    var uColor = gl.getUniformLocation(
        program,
        "uColor"
    );


    // =========================
    // HUBUNGKAN BUFFER
    // =========================

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var aPosition = gl.getAttribLocation(
        program,
        "aPosition"
    );

    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.enableVertexAttribArray(aPosition);


    // =========================
    // BACKGROUND
    // =========================

    gl.clearColor(
        1.0,
        1.0,
        1.0,
        1.0
    );

    gl.clear(gl.COLOR_BUFFER_BIT);


    // =========================
    // GAMBAR HURUF A
    // =========================

    // Biru
    gl.uniform4f(
        uColor,
        0.15, 0.40, 0.90, 1.0
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 5, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 10, 5);


    // =========================
    // GAMBAR HURUF R
    // =========================

    // Biru agak ungu
    gl.uniform4f(
        uColor,
        0.25, 0.32, 0.88, 1.0
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 15, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 20, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 25, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 30, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 35, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 40, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 45, 5);


    // =========================
    // GAMBAR HURUF I
    // =========================

    // Ungu
    gl.uniform4f(
        uColor,
        0.38, 0.25, 0.82, 1.0
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 50, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 55, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 60, 5);


    // =========================
    // GAMBAR HURUF L
    // =========================

    // Ungu lebih tua
    gl.uniform4f(
        uColor,
        0.50, 0.20, 0.75, 1.0
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 65, 5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 70, 5);
}