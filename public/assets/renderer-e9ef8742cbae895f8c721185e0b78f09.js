var renderer={simpleList:function(e){for(var t="",n=0;n<e.length;++n)t+="<p>"+renderer.getValue(e[n])+"</p>";return renderer.single(t)},single:function(e){return'<div id="single">'+e+"</div>"},count:function(e){var t=1==e.count?" document was":" documents were";return renderer.single(e.count+t+" affected")},ok:function(){return renderer.single("the command completed successfully")},getValue:function(e){return 0===e?0:e===!1?!1:e?e&&"object"==typeof e?e.$oid?e.$oid:JSON.stringify(e):e:""}};