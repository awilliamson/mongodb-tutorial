var context={_listeners:[],initialize:function(e,t,n){this.host=e,this.port=t,this.databases=n,this.trigger("new")},select:function(e,t){this.database=e,this.collections=t,this.trigger("database")},register:function(e){this._listeners.push(e)},trigger:function(e){for(var t=0;t<this._listeners.length;++t)this._listeners[t](e,this)},erase:function(){this.host=null,this.port=null,this.databases=null,this.database=null,this.collections=null,this.trigger("new"),this.trigger("database")}};