!function(e){var t={trigger:null,singleLineHeight:15,history:null};e.fn.commandInput=function(n){if(n&&"set"==n.command)return this.each(function(){this.commandInput.set(n.text)});if(n&&"unlock"==n.command)return this.each(function(){this.commandInput.unlock()});var i=e.extend({},t,n);return this.each(function(){if(this.commandInput)return!1;var t=this,n=e(t),r={initialize:function(){n.keydown(r.keyPressed).bind("adjust",function(){r.adjust(0)}).bind("trigger",r.triggered)},keyPressed:function(e){return r.shouldSubmit(e)?r.triggered():13==e.which?!1:38==e.which?r.selectPrevious():40==e.which?r.selectNext():!0},shouldSubmit:function(e){return 13!=e.which||0==n.val().length?!1:!0},triggered:function(){return i.trigger(n.val())?n.addClass("processing"):r.clear(),!1},clear:function(){n.val(""),r.adjust(0)},adjust:function(e){n.height(i.singleLineHeight*(n.val().split("\n").length+e))},unlock:function(){n.removeClass("processing"),r.clear()},set:function(e){n.val(e),r.adjust(0),n.focus(),n.setSelectionRange(e.length,e.length)},selectPrevious:function(){var e=n.val().indexOf("\n");return-1!=e&&e<=n.selectionStart()?!0:(i.history.inputHistory({command:"selectPrevious"}),!1)},selectNext:function(){return-1!=n.val().indexOf("\n",n.selectionStart())?!0:(i.history.inputHistory({command:"selectNext"}),!1)}};this.commandInput=r,r.initialize()})}}(jQuery);