const _0x2f197f=_0x34f6;function _0x1988(){const _0x263265=['bi-sunset','dispatchEvent','label','.cam-select','bi-stop-fill','qrCode','applyVideoConstraints','btn-dark','483752VukvkO','hide','for','26343KJPQnS','start','getCamera','#torch\x20i','trigger','scanned','forEach','scanState','info','lastScanned','reader','failed\x20to\x20start\x20camera:\x0a','length','#torch\x20input','warn','eventScannedName','click','85967AuZKlE','button.player','btn-danger','attr','text','done','appendTo','btn-primary','find','eventStateName','stop','val','40osByQz','html','296SEbTfG','decoded\x20text:\x0a','Camera\x20not\x20selected!','#tmp-radio','131916SwDQaT','getCameras','detail','log','2553UtnTPX','Status:','children','prop','#result','#modal-cam\x20.btn-primary','#modal-cam','remove','camSelect','getScript','#player','scanning','#modal-cam\x20[name=\x27camera\x27]:checked','target','setupScanner','play','Cameras:\x0a','message','eventName','init','bi-sun-fill','#audio','getModal','11HqGsNU','884622qRhadC','#torch\x20label','error','scanner','1432XfGixy','bi-qr-code-scan','lastCamId','checked','btn-light','1170srvIfJ','clone','decoded\x20result:\x0a','input','15628836wMJeBH','toggleClass'];_0x1988=function(){return _0x263265;};return _0x1988();}function _0x34f6(_0x552134,_0x1cadc0){const _0x1988f2=_0x1988();return _0x34f6=function(_0x34f651,_0x4b0098){_0x34f651=_0x34f651-0x113;let _0x3be369=_0x1988f2[_0x34f651];return _0x3be369;},_0x34f6(_0x552134,_0x1cadc0);}(function(_0x47919a,_0x34216d){const _0x2c96d7=_0x34f6,_0x274981=_0x47919a();while(!![]){try{const _0x6fca2e=-parseInt(_0x2c96d7(0x147))/0x1+parseInt(_0x2c96d7(0x130))/0x2+-parseInt(_0x2c96d7(0x118))/0x3*(parseInt(_0x2c96d7(0x134))/0x4)+-parseInt(_0x2c96d7(0x167))/0x5*(-parseInt(_0x2c96d7(0x114))/0x6)+parseInt(_0x2c96d7(0x15b))/0x7*(-parseInt(_0x2c96d7(0x169))/0x8)+-parseInt(_0x2c96d7(0x14a))/0x9*(parseInt(_0x2c96d7(0x139))/0xa)+-parseInt(_0x2c96d7(0x12f))/0xb*(-parseInt(_0x2c96d7(0x13d))/0xc);if(_0x6fca2e===_0x34216d)break;else _0x274981['push'](_0x274981['shift']());}catch(_0x390289){_0x274981['push'](_0x274981['shift']());}}}(_0x1988,0x51de8));const modal={'eventName':_0x2f197f(0x120),'getModal':new bootstrap['Modal']('#modal-cam',{'backdrop':!0x0,'focus':!0x0,'keyboard':!0x0}),'renderModal':function(_0x392010=[]){const _0x192281=_0x2f197f,_0x1045ed=$(_0x192281(0x11e)),_0xa465a1=_0x1045ed[_0x192281(0x163)](_0x192281(0x142));_0xa465a1[_0x192281(0x11a)]()[_0x192281(0x11f)](),_0x392010[_0x192281(0x150)](_0x1a7268=>{const _0x4a9012=_0x192281;var _0x338acf=$($(_0x4a9012(0x113))[_0x4a9012(0x13a)]()[_0x4a9012(0x168)]()),_0x17aaf4=_0x1a7268['id'];_0x338acf[_0x4a9012(0x163)](_0x4a9012(0x141))[_0x4a9012(0x15e)](_0x4a9012(0x149),_0x17aaf4)[_0x4a9012(0x168)](_0x1a7268['label']),_0x338acf[_0x4a9012(0x163)](_0x4a9012(0x13c))[_0x4a9012(0x15e)]('id',_0x17aaf4)[_0x4a9012(0x166)](_0x17aaf4)['on'](_0x4a9012(0x13c),_0x93225c=>{const _0x157630=_0x4a9012;_0x1045ed[_0x157630(0x163)]('.btn-primary')[_0x157630(0x11b)]('disabled',!0x1);}),_0x338acf[_0x4a9012(0x161)](_0xa465a1);}),modal[_0x192281(0x12e)]['show']();},'init':()=>{const _0x23a382=_0x2f197f;$(_0x23a382(0x11d))['on'](_0x23a382(0x15a),_0x526639=>{const _0x474d81=_0x23a382;var _0x4e0447=$(_0x474d81(0x124))[_0x474d81(0x166)]();null!=_0x4e0447?(document[_0x474d81(0x140)](new CustomEvent(modal[_0x474d81(0x12a)],{'detail':_0x4e0447})),modal[_0x474d81(0x12e)][_0x474d81(0x148)]()):alert(_0x474d81(0x16b));});}},scanner={'eventScannedName':_0x2f197f(0x14f),'eventStateName':_0x2f197f(0x151),'scanner':void 0x0,'lastScanned':'','lastCamId':'','getCamera':async function(){const _0x5ef8da=_0x2f197f;try{var _0x35ddeb=await Html5Qrcode[_0x5ef8da(0x115)]();if(!_0x35ddeb||0x0==_0x35ddeb[_0x5ef8da(0x156)])return console[_0x5ef8da(0x132)]('no\x20camera\x20found!');console[_0x5ef8da(0x117)](_0x5ef8da(0x128),_0x35ddeb),modal['renderModal'](_0x35ddeb);}catch(_0x5d571d){alert(_0x5d571d['message']);}},'scanning':function(_0x5bbf7b,_0x4bbcc1,_0xc3f455=!0x1){const _0x260f8c=new Html5Qrcode(_0x4bbcc1,!0x1);async function _0x15f03e(){const _0x4c36bd=_0x34f6;try{await _0x260f8c['stop'](),scanner[_0x4c36bd(0x153)]='',document[_0x4c36bd(0x140)](new CustomEvent(scanner[_0x4c36bd(0x164)],{'detail':!0x1}));}catch(_0x4c37eb){}}return{'start':async function(){const _0x4c6110=_0x34f6;document[_0x4c6110(0x140)](new CustomEvent(scanner[_0x4c6110(0x164)],{'detail':!0x0}));try{await _0x260f8c[_0x4c6110(0x14b)](_0x5bbf7b,{'fps':0xa,'qrbox':{'width':0xfa,'height':0xfa}},(_0x4a77bb,_0x51af25)=>{const _0x51032a=_0x4c6110;_0x4a77bb!=scanner[_0x51032a(0x153)]&&(document['dispatchEvent'](new CustomEvent(scanner[_0x51032a(0x159)],{'detail':{'text':_0x4a77bb,'result':_0x51af25}})),scanner[_0x51032a(0x153)]=_0x4a77bb,_0xc3f455)&&_0x15f03e();},_0x2f6724=>{}),$(_0x4c6110(0x157))[_0x4c6110(0x14e)](_0x4c6110(0x13c));}catch(_0x18f738){console[_0x4c6110(0x158)](_0x4c6110(0x155),_0x18f738),document[_0x4c6110(0x140)](new CustomEvent(scanner[_0x4c6110(0x164)],{'detail':!0x1})),alert(_0x18f738[_0x4c6110(0x129)]);}},'stop':_0x15f03e,'torch':async function(_0x37ac66){const _0x9fe648=_0x34f6;try{scanner[_0x9fe648(0x133)][_0x9fe648(0x144)][_0x9fe648(0x145)]({'advanced':[{'torch':_0x37ac66}]});}catch(_0x2e65c6){throw _0x2e65c6;}},'qrCode':_0x260f8c};},'setupScanner':function(){const _0x55d549=_0x2f197f;scanner[_0x55d549(0x133)]=scanner[_0x55d549(0x123)](scanner[_0x55d549(0x136)],_0x55d549(0x154)),console['log'](_0x55d549(0x119),scanner['scanner']),scanner[_0x55d549(0x133)][_0x55d549(0x14b)]();},'init':function(){const _0x557797=_0x2f197f;$(document)['on'](scanner[_0x557797(0x159)],_0x1b77ed=>{const _0x3b1cfa=_0x557797;console[_0x3b1cfa(0x152)](_0x3b1cfa(0x16a),_0x1b77ed[_0x3b1cfa(0x116)]['text'],_0x3b1cfa(0x13b),_0x1b77ed[_0x3b1cfa(0x116)]['result']),$(_0x3b1cfa(0x12d))[0x0][_0x3b1cfa(0x127)](),$(_0x3b1cfa(0x11c))[_0x3b1cfa(0x168)](_0x1b77ed[_0x3b1cfa(0x116)][_0x3b1cfa(0x15f)]);}),$(document)['on'](scanner[_0x557797(0x164)],_0x25938c=>{const _0x444a9c=_0x557797;_0x25938c=_0x25938c[_0x444a9c(0x116)];const _0x20d025=$(_0x444a9c(0x15c));_0x25938c||(scanner[_0x444a9c(0x133)]=void 0x0),function(_0x51f5a6){const _0x58ffdf=_0x444a9c,_0x830419=_0x20d025[_0x58ffdf(0x163)]('i'),_0x5c860a=_0x58ffdf(0x162),_0x389ca8=_0x58ffdf(0x15d),_0x495dd3=_0x58ffdf(0x135),_0x3ba258=_0x58ffdf(0x143);_0x20d025[_0x58ffdf(0x13e)](_0x5c860a,!_0x51f5a6),_0x830419[_0x58ffdf(0x13e)](_0x495dd3,!_0x51f5a6),_0x20d025[_0x58ffdf(0x13e)](_0x389ca8,_0x51f5a6),_0x830419[_0x58ffdf(0x13e)](_0x3ba258,_0x51f5a6);}(_0x25938c);}),$(_0x557797(0x122))['on']('click',_0x509c83=>{const _0x181eff=_0x557797;void 0x0!==scanner[_0x181eff(0x133)]?scanner[_0x181eff(0x133)][_0x181eff(0x165)]():''==scanner[_0x181eff(0x136)]?scanner[_0x181eff(0x14c)]():this['setupScanner']();}),$(_0x557797(0x157))['on'](_0x557797(0x13c),async _0xfd6d4c=>{const _0x46867f=_0x557797;var _0x44be6f=_0xfd6d4c['target']['checked'];if(void 0x0!==scanner['scanner'])try{await scanner['scanner']['torch'](_0x44be6f),_0x30740d(_0x44be6f);}catch(_0x2b0873){_0x30740d(_0xfd6d4c[_0x46867f(0x125)][_0x46867f(0x137)]=!0x1);}else _0x30740d(_0xfd6d4c[_0x46867f(0x125)]['checked']=!0x1);function _0x30740d(_0x426bd2){const _0x3be968=_0x46867f;var _0x4f7e1f=$(_0x3be968(0x131)),_0x4f7e1f=(_0x4f7e1f[_0x3be968(0x13e)](_0x3be968(0x138),_0x426bd2),_0x4f7e1f[_0x3be968(0x13e)](_0x3be968(0x146),!_0x426bd2),$(_0x3be968(0x14d)));_0x4f7e1f[_0x3be968(0x13e)](_0x3be968(0x12c),_0x426bd2),_0x4f7e1f['toggleClass'](_0x3be968(0x13f),!_0x426bd2);}})['trigger'](_0x557797(0x13c)),$(document)['on'](modal[_0x557797(0x12a)],_0x4d32eb=>{const _0x43caf3=_0x557797;_0x4d32eb=_0x4d32eb[_0x43caf3(0x116)],(scanner[_0x43caf3(0x136)]=_0x4d32eb,this[_0x43caf3(0x126)]());});}};$[_0x2f197f(0x121)]('https://unpkg.com/html5-qrcode')[_0x2f197f(0x160)](_0x20a73a=>{const _0x5a75ec=_0x2f197f;modal[_0x5a75ec(0x12b)](),scanner['init']();});