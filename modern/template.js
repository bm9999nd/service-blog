document.addEventListener("readystatechange",()=>{{document.querySelectorAll(".widget.Profile a").forEach(e=>{e.target="_blank"});var e=document.querySelectorAll(".widget.Label"),t=e[0].parentElement;const a=document.createElement("div");a.className="grid-label",e.forEach(e=>{e.querySelector("details").open=!0,a.appendChild(e)}),t.append(a)}0<$("body.item-view .post-wrapper").length&&$(".check li").each((e,t)=>{let a=$($(t).html());null==a.prop("tagName")&&(a=$("<span>")).html($(t).html()),$(t).html("");const l=$("<input type='checkbox'>");var n=$("<div>");l.appendTo(n),a.appendTo(n),n.appendTo(t),$(t).on("click",e=>{"input"!=e.target.tagName.toLowerCase()&&(l[0].checked=!l.checked,e.stopPropagation(),e.preventDefault())})})});