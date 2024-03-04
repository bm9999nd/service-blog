$.ajax("./ctl-scan.html").done(scanGui => {
  $("body").append(scanGui);
  $("#i-scanner").html($("#reader"));
  $("#i-result").html($("#result"));
  $("#i-controller").append($("#torch"));
  $("#i-controller").append($("#player"));

  $(document).on("scanLoaded", () => {
    $(document).on("scanned", onGetScanned);
    $(document).on("scanState", onScanStateChanged);
  });

  function onScanStateChanged(e) {
    const isScan = e.detail;
    const gse = $("#gse");
    const vc = $("#i-container");
    const vid = $("#i-scanner");
    const dur = isScan ? 1000 : 500;

    gse.toggleClass("on-scan", isScan);
    vc.fadeToggle(dur, "swing");
    vid.animate(
      {
        height: isScan ? vid.find("#reader").css("height") : 0,
      },
      dur,
      "swing",
      () => {
        if (isScan) {
          vid[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        } else {
          gse[0].scrollIntoView({
            behavior: "auto",
            block: "start",
            inline: "start",
          });
        }
      }
    );
  }
  function onGetScanned(e) {
    const res = e.detail.text;
    const inp = $(".gsc-input");
    const btn = $(".gsc-search-button");
    inp.val(res);
    btn.trigger("click");
  }

  // reset google search results
  let params = new URLSearchParams(location.href);
  if (params.has("gsc.q")) {
    const newUrl = location.href.replace(/&gsc.q.+/g, '');
    window.open(newUrl, "_self");
  }
});