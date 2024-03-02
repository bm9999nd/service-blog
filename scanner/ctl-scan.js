// --- modal
const evSelect = "camSelect";
const modal = new bootstrap.Modal("#modal-cam", {
  backdrop: true,
  focus: true,
  keyboard: true,
});

function renderModal(items = []) {
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

  modal.show();
}

$("#modal-cam .btn-primary").on("click", (e) => {
  const sel = $("#modal-cam [name='camera']:checked").val();
  if (sel != null) {
    document.dispatchEvent(
      new CustomEvent(evSelect, {
        detail: sel,
      })
    );
    modal.hide();
  } else {
    alert("Camera not selected!");
  }
});

// --- scanner
const eventScanName = "scanState";
let lastScanned = "";
let scanner;

async function getCamera() {
  try {
    const exist = await Html5Qrcode.getCameras();
    if (!exist || exist.length == 0) {
      return console.error("no camera found!");
    }

    console.log("Cameras:\n", exist);
    renderModal(exist);
  } catch (error) {
    alert(error.message);
  }
}

function scanning(
  camId,
  videoId,
  resultId,
  eventName = "scanned",
  singleScan = false
) {
  const html5QrCode = new Html5Qrcode(videoId, false);
  const result = $(`#${resultId}`);

  function start() {
    try {
      document.dispatchEvent(
        new CustomEvent(eventScanName, {
          detail: true,
        })
      );

      html5QrCode.start(
        camId,
        {
          fps: 10, // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
          // do something when code is ready
          if (decodedText == lastScanned) return;

          result[0].dispatchEvent(
            new CustomEvent(eventName, {
              detail: {
                text: decodedText,
                result: decodedResult,
              },
            })
          );
          lastScanned = decodedText;

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
        new CustomEvent(eventScanName, {
          detail: false,
        })
      );
      alert(err.message);
    }
  }

  async function stop() {
    try {
      const stopped = await html5QrCode.stop();
      // QR Code scanning is stopped.
      document.dispatchEvent(
        new CustomEvent(eventScanName, {
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
    scanner: html5QrCode,
  };
}

$("#result").on("scanned", (e) => {
  console.info(
    "decoded text:\n",
    e.detail.text,
    "decoded result:\n",
    e.detail.result
  );
  $("#audio")[0].play();
  const c = $(e.target);
  c.html(e.detail.text);
});

$(document).on(eventScanName, (e) => {
  const isPlay = e.detail;
  const btn = $("button.player");

  if (!isPlay) scanner = undefined;
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

$(document).on(evSelect, (e) => {
  const camId = e.detail;
  scanner = scanning(camId, "reader", "result");

  console.log("Status:", scanner.scanner);
  scanner.start();
});

$("button.player").on("click", (e) => {
  if (typeof scanner != "undefined") {
    scanner.stop();
    lastScanned = "";
  } else getCamera();
});
