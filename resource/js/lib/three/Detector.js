Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: function() {
        try {
            return !! window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
        } catch(n) {
            return ! 1
        }
    } (),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
        var n = document.createElement("div");
        return n.id = "webgl-error-message",
        n.style.fontFamily = "arial",
        n.style.fontSize = "13px",
        n.style.fontWeight = "normal",
        n.style.textAlign = "center",
        n.style.background = "#222222",
        n.style.color = "#ffffff",
        n.style.padding = "1.5em",
        n.style.width = "100%",
        n.style.margin = "5em auto 0",
        n.style.zIndex = "500000",
        n.style.position = "absolute",
        n.style.pointerEvents = "all",
        this.webgl || (n.innerHTML = ['Either your graphics card or your browser does not support WebGL.. Try <a href="http://www.google.com/chrome/" style="color:#ffffff; text-decoration:underline; text-transform:capitalize">Google Chrome</a><br>', 'or <a href="http://www.khronos.org/webgl/wiki_1_15/index.php/Getting_a_WebGL_Implementation" style="color:#ffffff; text-decoration:underline; text-transform:none">view a list</a> of WebGL compatible browsers.'].join("\n")),
        n
    },
    addGetWebGLMessage: function(n) {
        var i, r, t;
        n = n || {},
        i = n.parent !== undefined ? n.parent: document.body,
        r = n.id !== undefined ? n.id: "oldie",
        t = Detector.getWebGLErrorMessage(),
        t.id = r,
        i.appendChild(t)
    }
}