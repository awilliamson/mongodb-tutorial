$(document).ready(function(){function e(){var e=$(window).height()-$("#menu").height()-n.height()-30;$("#explorer").height(e),$("#results").height(e-$("#history").height()-10),n.width(t.width()-20)}var t=$("#history"),n=$("#input").commandInput({trigger:executor.execute,history:t}),t=t.inputHistory({target:n});$("#pager").pager({}),$("#collections").delegate("li","click",explorer.collections.clicked),$(window).resize(e),e(),$("#toggleExplorer div").click(explorer.toggle)});var executor={invalid:{},rawExecute:function(e){$("#input").val(e).trigger("trigger")},execute:function(e){var t=executor.getCommand(e);if(t==executor.invalid)return $("#history").inputHistory({command:"add",type:"error",text:e}),void 0;if(!t||!t.mongo_serialize){if(t==executor.useDb)return;return t==help||t==reset||t==restart?(t(),void 0):($("#history").inputHistory({command:"add",type:"ok",text:e}),void 0)}if(!teacher.canExecute(t))return $("#history").inputHistory({command:"add",type:"error",text:e}),void 0;var n=new Date;return executor.sendCommand(t,function(e){executor.executed("ok",t.response(e),n,e,t)},function(e){executor.executed("error",renderer.single(e.responseText),n)},!0),!0},sendCommand:function(e,t,n,r){var i=e.mongo_serialize();i.authenticity_token=authenticity_token,$.ajax({url:"/"+i.endpoint+"/"+i.command,type:"POST",async:r,contentType:"application/json",data:JSON.stringify(i),dataType:"json",success:t,error:n})},getCommand:function(text){for(var i=0;i<executor.specials.length;++i){var matches=executor.specials[i].exec(text);if(null!=matches){var callback=executor.callbacks[i];return callback.loadParams?callback.loadParams(matches):callback}}try{with(window)return eval(text)}catch(error){return console&&console.log&&console.log(error),executor.invalid}},executed:function(e,t,n,r,i){var o=$("#input"),s=o.val();s&&(o.commandInput({command:"unlock"}),$("#history").inputHistory({command:"add",type:e,text:s,time:new Date-n+" ms"}),t instanceof jQuery&&t.is("#grid")||$("#pager").hide(),$("#results").html(t),$("#input").focus(),teacher.got(r,i))},useDb:{loadParams:function(e){return this._name=e[1],this}},clear:{mongo_serialize:function(){return{endpoint:"database",command:"noop"}},response:function(){return""}}};executor.specials=[/clear(\(\);?)?/,/show dbs;?/,/show collections;?/,/use (\w+);?/,/help/,/reset/,/restart/,/lesson(\d+);?/],executor.callbacks=[executor.clear,db.listDatabases(),db.getCollectionNames(),executor.useDb,help,reset,restart,lesson];