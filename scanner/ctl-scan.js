// --- modal
const modal = {
  eventName: "camSelect",
  getModal: new bootstrap.Modal("#modal-cam", {
    backdrop: true,
    focus: true,
    keyboard: true,
  }),
  
  renderModal: function (items = []) {
    const mod = $("#modal-cam");
    const ul = mod.find(".cam-select");
    ul.children().remove();
  
    items.forEach((item) => {
      const li = $($("#tmp-radio").clone().html());
      const id = item.id;
      li.find("label").attr("for", id).html(item.label);
      li.find("input")
        .attr("id", id)
        .val(id)
        .on("input", (e) => {
          const btn = mod.find(".btn-primary");
          btn.prop("disabled", false);
        });
      li.appendTo(ul);
    });
  
    modal.getModal.show();
  },
  
  init: () => {
    $("#modal-cam .btn-primary").on("click", (e) => {
      const sel = $("#modal-cam [name='camera']:checked").val();

      if (sel != null) {
        document.dispatchEvent(
          new CustomEvent(modal.eventName, {
            detail: sel,
          })
        );
        modal.getModal.hide();

      } else {
        alert("Camera not selected!");
      }
    });
  },
};

// --- scanner
const scanner = {
  eventScannedName: "scanned",
  eventStateName: "scanState",
  scanner: undefined,
  lastScanned: "",
  lastCamId: "",
  
  getCamera: async function () {
    try {
      const exist = await Html5Qrcode.getCameras();
      if (!exist || exist.length == 0) {
        return console.error("no camera found!");
      }
  
      console.log("Cameras:\n", exist);
      modal.renderModal(exist);

    } catch (error) {
      alert(error.message);
    }
  },
  
  scanning: function (camId, videoId, singleScan = false) {
    const qrCode = new Html5Qrcode(videoId, false);
  
    function start() {
      try {
        document.dispatchEvent(
          new CustomEvent(scanner.eventStateName, {
            detail: true,
          })
        );
  
        qrCode.start(
          camId,
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
          },
          (decodedText, decodedResult) => {
            // do something when code is ready
            if (decodedText == scanner.lastScanned) return;
  
            document.dispatchEvent(
              new CustomEvent(scanner.eventScannedName, {
                detail: {
                  text: decodedText,
                  result: decodedResult,
                },
              })
            );
            scanner.lastScanned = decodedText;
  
            if (singleScan) stop();
          },
          (errorMessage) => {
            // parse error, ignore it.
          }
        );
      } catch (err) {
        // Start failed, handle it.
        console.warn("failed to start camera:\n", err);
        document.dispatchEvent(
          new CustomEvent(scanner.eventStateName, {
            detail: false,
          })
        );
        alert(err.message);
      }
    }
  
    async function stop() {
      try {
        await qrCode.stop();
        scanner.lastScanned = "";

        // QR Code scanning is stopped.
        document.dispatchEvent(
          new CustomEvent(scanner.eventStateName, {
            detail: false,
          })
        );
      } catch (err) {
        // Stop failed, handle it.
      }
    }
  
    return {
      start,
      stop,
      scanner: qrCode,
    };
  },
  
  setupScanner: function () {
      scanner.scanner = scanner.scanning(scanner.lastCamId, "reader");
      console.log("Status:", scanner.scanner);
      scanner.scanner.start();
  },

  init: function () {
    // on get scanned
    $(document).on(scanner.eventScannedName, (e) => {
      console.info(
        "decoded text:\n",
        e.detail.text,
        "decoded result:\n",
        e.detail.result
      );
      $("#audio")[0].play();

      const result = $("#result");
      result.html(e.detail.text);
    });
    // on scan state changed
    $(document).on(scanner.eventStateName, (e) => {
      const isPlay = e.detail;
      const btn = $("button.player");
    
      if (!isPlay) scanner.scanner = undefined;
      setCss(isPlay);
    
      function setCss(isPlaying) {
        const icon = btn.find("i");
        const img = {
          playBtn: "btn-primary",
          stopBtn: "btn-danger",
          playIcon: "bi-qr-code-scan",
          stopIcon: "bi-stop-fill",
        };
    
        btn.toggleClass(img.playBtn, !isPlaying);
        icon.toggleClass(img.playIcon, !isPlaying);
        btn.toggleClass(img.stopBtn, isPlaying);
        icon.toggleClass(img.stopIcon, isPlaying);
      }
    });
    // on scan clicked
    $("button.player").on("click", (e) => {
      if (typeof scanner.scanner != "undefined") {
        scanner.scanner.stop();
      } else {
        if (scanner.lastCamId == "") scanner.getCamera();
        else this.setupScanner();
      }
    });
    // on camera selected
    $(document).on(modal.eventName, (e) => {
      const camId = e.detail;
      scanner.lastCamId = camId;
      this.setupScanner();
    });
  },
};

$.getScript("https://unpkg.com/html5-qrcode").done((res) => {
  modal.init();
  scanner.init();
});