var executor={invalid:{},rawExecute:function(e){$("#input").val(e).trigger("trigger")},execute:function(e){var t=executor.getCommand(e);if(t==executor.invalid)return $("#history").inputHistory({command:"add",type:"error",text:e}),void 0;if(!t||!t.mongo_serialize){if(t==executor.useDb)return;return t==help||t==reset||t==restart?(t(),void 0):($("#history").inputHistory({command:"add",type:"ok",text:e}),void 0)}if(!teacher.specialHandling(t)){if(!teacher.canExecute(t))return $("#history").inputHistory({command:"add",type:"error",text:e}),void 0;var r=new Date;return executor.sendCommand(t,function(e){executor.executed("ok",t.response(e),r,e,t)},function(e){executor.executed("error",renderer.single(e.responseText),r)},!0),!0}},sendCommand:function(e,t,r,n){var i=e.mongo_serialize();i.authenticity_token=authenticity_token,$.ajax({url:"/"+i.endpoint+"/"+i.command,type:"POST",async:n,contentType:"application/json",data:JSON.stringify(i),dataType:"json",success:t,error:r})},getCommand:function(text){for(var i=0;i<executor.specials.length;++i){var matches=executor.specials[i].exec(text);if(null!=matches){var callback=executor.callbacks[i];return callback.loadParams?callback.loadParams(matches):callback}}try{with(window)return eval(text)}catch(error){return console&&console.log&&console.log(error),executor.invalid}},executed:function(e,t,r,n,i){var a=$("#input"),o=a.val();o&&(a.commandInput({command:"unlock"}),$("#history").inputHistory({command:"add",type:e,text:o,time:new Date-r+" ms"}),t instanceof jQuery&&t.is("#grid")||$("#pager").hide(),$("#results").html(t),$("#input").focus(),teacher.got(n,i))},useDb:{loadParams:function(e){return this._name=e[1],this}},clear:{mongo_serialize:function(){return{endpoint:"database",command:"noop"}},response:function(){return""}}};executor.specials=[/clear(\(\);?)?/,/show collections;?/,/help/,/reset/,/restart/,/lesson(\d+);?/],executor.callbacks=[executor.clear,db.getCollectionNames(),help,reset,restart,lesson];