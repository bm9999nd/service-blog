const rows = [
  {
    barcode: "8998989110167",
    nama: "Gudang Garam Merah 16",
    harga: 35000,
    qty: 100,
    unit: "slop",
    img: "https://3.bp.blogspot.com/-zL0nkd6yV8s/WOTgaggROcI/AAAAAAAABzo/43uqvM3kWSoqj68-M32IPzWvfI1j9skSACLcB/s1600/20170404_171137.jpg",
  },
  {
    barcode: "8886419710394",
    nama: "Luffman Merah 20",
    harga: 10000,
    qty: 300,
    unit: "slop",
    img: "https://gegeronline.co.id/wp-content/uploads/2023/02/IMG20230225134320-scaled.jpg",
  },
];
const ctl = {
  tbl: $("#datatable"),
  search: $("#find"),
  chkImg: $("#chkImg"),
};

// load data
rows.forEach((item) => {
  const tmp = $($("#tmp-data").clone().html());
  tmp.data("item", item);
  tmp.find(`[data-key=img]`).attr("src", item.img);
  tmp.find(`[data-key=img]`).attr("alt", "gambar " + item.img != "" ? item.nama : "");
  tmp.find(`[data-key=barcode]`).html(item.barcode);
  tmp.find(`[data-key=nama]`).html(item.nama);
  tmp.find(`[data-key=harga]`).html(item.harga);
  tmp.find(`[data-key=qty]`).html(item.qty);
  tmp.find(`[data-key=unit]`).html(item.unit);
  tmp.appendTo(ctl.tbl);
});

// assign controls events
ctl.search.on("input", (e) => {
  const val = $(e.target).val().toLowerCase();
  // tbl
  const row = ctl.tbl.find("tbody tr:not([id=info])");
  const info = ctl.tbl.find("tbody tr#info");
  const filter = row.find("td").filter((i, el) => {
    const n = $(el).index();
    let match = $(el).html().toLowerCase().includes(val);
    // if (n > 1) match = false;
    return match;
  });
  row.hide();
  filter.parent("tr").show();

  if (filter.length == 0) info.show();
  else info.hide();
});
ctl.chkImg.on("input", e => {
  const check = e.target.checked;
  const imgs = ctl.tbl.find("img");
  imgs.prop("hidden", !check);
}).trigger("input");

// load scanner last
$.ajax("./ctl-scan.html").done(str => {
    const parent = $("section[id=scanner]");
    const html = $("<div hidden>").append(str);
    const camContainer = html.find("#scanner-container");
    const camModal = html.find("#modal-cam");
    camContainer.appendTo(parent);
    camModal.appendTo("section#scan-modal");
    html.appendTo(parent);

    $(document).on("scanned", (e) => {
      ctl.search.val(e.detail.text).trigger("input");
    });
  }
);
