((n, o) => {
  o(window), o("body"), n.Break;
  var e = o(".file-dl-toast");
  (n.FileManager = function () {
    e.on("click", function (o) {
      o.preventDefault(),
        n.Toast(
          "<h5>Downloading File</h5><p>Generating the file to start download.</p>",
          "success",
          {
            position: "bottom-center",
            icon: "ni ni-download-cloud",
            ui: "is-dark",
          }
        );
    });
  }),
    n.coms.docReady.push(n.FileManager);
})(NioApp, jQuery);
