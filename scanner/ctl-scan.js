const events = {
  qrLoaded: () => document.dispatchEvent(new CustomEvent("scanLoaded")),
  scanStateChanged: (state, qr) => {
    document.dispatchEvent(
      new CustomEvent("scanState", {
        detail: {
          state: state,
          qr: qr,
        }
      })
    );
  },
  torchChanged: (state) => {
    document.dispatchEvent(
      new CustomEvent("torchState", {
        detail: state,
      })
    );
  },
  getScanned: (decodedText, decodedResult) => {
    document.dispatchEvent(
      new CustomEvent("scanned", {
        detail: {
          text: decodedText,
          result: decodedResult,
        },
      })
    );
  },
  getCameraId: (deviceId) => {
    document.dispatchEvent(
      new CustomEvent("camSelect", {
        detail: deviceId,
      })
    );
  },
};

// --- modal
const modal = {
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
        events.getCameraId(sel);
        modal.getModal.hide();
      } else {
        alert("Camera not selected!");
      }
    });
  },
};

// --- scanner
const scanner = {
  scanner: undefined,
  lastScanned: "",
  lastCamId: "",

  getCamera: async function () {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length == 0) {
        return console.error("no camera found!");
      }

      console.log("Cameras:\n", devices);
      modal.renderModal(devices);
    } catch (error) {
      alert(error.message);
    }
  },

  scanning: function (camId, videoId, singleScan = false) {
    const qrCode = new Html5Qrcode(videoId, false);

    async function start() {
      try {
        const vid = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: camId },
        });
        const settings = vid.getTracks()[0].getSettings();

        qrCode.start(
          camId,
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
          },
          (decodedText, decodedResult) => {
            // do something when code is ready
            if (decodedText == scanner.lastScanned) return;

            events.getScanned(decodedText, decodedResult);
            scanner.lastScanned = decodedText;

            if (singleScan) stop();
          },
          (errorMessage) => {
            // parse error, ignore it.
          }
        );

        $("#torch input").trigger("input"); // apply current flashlight state
        events.scanStateChanged(true, qrCode); // tell if camera succeeded running

      } catch (err) {
        // Start failed, handle it.
        console.warn("failed to start camera:\n", err);
        events.scanStateChanged(false);
        alert(err.message);
      }
    }

    async function stop() {
      try {
        await qrCode.stop();
        scanner.lastScanned = "";

        // QR Code scanning is stopped.
        events.scanStateChanged(false);
      } catch (err) {
        // Stop failed, handle it.
      }
    }

    async function torch(state) {
      try {
        scanner.scanner.qrCode.applyVideoConstraints({
          advanced: [{ torch: state }],
        });
      } catch (error) {
        throw error;
      }
    }

    return {
      start,
      stop,
      torch,
      qrCode,
    };
  },

  setupScanner: function () {
    scanner.scanner = scanner.scanning(scanner.lastCamId, "reader");
    console.log("Status:", scanner.scanner);
    scanner.scanner.start();
  },

  init: function () {
    // on get scanned
    $(document).on("scanned", (e) => {
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
    $(document).on("scanState", (e) => {
      const isPlay = e.detail.state;
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

        $("#controllers > div")
        .toggleClass("justify-content-between", isPlaying)
        .toggleClass("justify-content-around", !isPlaying);
        
        if (isPlaying) {
          $("#torch").show("fast");
          $("#vid-container")
          .fadeIn("fast", () => {
            $("#vid-container").css("display", "grid");
          });
        }
        else {
          $("#torch").hide("slow");
          $("#vid-container").fadeOut("slow");
        }
      }
    });
    // on scan clicked
    $("#player").on("click", (e) => {
      if (typeof scanner.scanner != "undefined") {
        scanner.scanner.stop();
      } else {
        if (scanner.lastCamId == "") scanner.getCamera();
        else this.setupScanner();
      }
    });
    // on torch clicked
    $("#torch input").on("input", async (e) => {
      const check = e.target.checked;

      if (typeof scanner.scanner != "undefined") {
        try {
          await scanner.scanner.torch(check);
          toggle(check);
        } catch (error) {
          e.target.checked = false;
          toggle(false);
        }
      } else {
        e.target.checked = false;
        toggle(false);
      }

      function toggle(state) {
        const btn = $("#torch label");
        btn.toggleClass("btn-light", state);
        btn.toggleClass("btn-dark", !state);

        const icon = $("#torch i");
        icon.toggleClass("bi-sun-fill", state);
        icon.toggleClass("bi-sunset", !state);

        events.torchChanged(state);
      }
    }).trigger("input");

    // on camera selected
    $(document).on("camSelect", (e) => {
      const camId = e.detail;
      scanner.lastCamId = camId;
      this.setupScanner();
    });
  },
};

$.getScript("https://unpkg.com/html5-qrcode").done((res) => {
  modal.init();
  scanner.init();
  events.qrLoaded();
});
