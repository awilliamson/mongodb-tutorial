function ObjectId(t){return{$oid:t}}function collection(t){this._name=t,this.find=function(t,e){return new collection_find(t,e,this)},this.count=function(t){return new collection_count(t,this)},this.stats=function(){return new collection_stats(this)},this.getIndexes=function(){return new collection_getIndexes(this)},this.dropIndexes=function(){return new collection_dropIndexes(this)},this.ensureIndex=function(t,e){return new collection_ensureIndex(t,e,this)},this.distinct=function(t,e){return new collection_distinct(t,e,this)}}function collection_find(t,e,n){this._selector=t,this._fields=e,this._collection=n,this._explain=!1,this.teacherName=function(){return"find"},this.limit=function(t){return this._limit=t,this},this.sort=function(t){return this._sort=t,this},this.skip=function(t){return this._skip=t,this},this.explain=function(){return this._explain=!0,this},this.mongo_serialize=function(){return{endpoint:"geo",command:"find",collection:this._collection._name,selector:db.toSelector(this._selector),fields:this._fields,limit:this._limit,sort:this._sort,skip:this._skip,explain:this._explain}},this.response=function(t){return grid.displayResults(t.documents),$.resultGrid.display(t,this.mongo_serialize())}}function collection_count(t,e){this._selector=t,this._collection=e,this.teacherName=function(){return"count"},this.mongo_serialize=function(){return{endpoint:"geo",command:"count",collection:this._collection._name,selector:db.toSelector(this._selector)}},this.response=function(t){var e=1==t.count?" document":" documents";return renderer.single(t.count+e+" in "+this._collection._name)}}function collection_ensureIndex(t,e,n){this._fields=t,this._options=e,this._collection=n,this.teacherName=function(){return"ensureIndex"},this.mongo_serialize=function(){return{endpoint:"geo",command:"ensureIndex",collection:this._collection._name,fields:this._fields,options:this._options}},this.response=function(){return renderer.ok()}}function collection_dropIndexes(t){this._collection=t,this.teacherName=function(){return"dropIndexes"},this.mongo_serialize=function(){return{endpoint:"geo",command:"dropIndexes",collection:this._collection._name}},this.response=function(){return renderer.ok()}}function collection_stats(t){this._collection=t,this.mongo_serialize=function(){return{endpoint:"geo",command:"stats",collection:this._collection._name}},this.response=function(t){return $.resultGrid.display({documents:t},null)}}function collection_getIndexes(t){this._collection=t,this.mongo_serialize=function(){return{endpoint:"geo",command:"get_indexes",collection:this._collection._name}},this.response=function(t){return $.resultGrid.display({documents:t},null)}}function collection_distinct(t,e,n){this._field=t,this._query=e,this._collection=n,this.mongo_serialize=function(){return{endpoint:"geo",command:"distinct",field:this._field,query:this._query,collection:this._collection._name}},this.response=function(t){return renderer.simpleList(t)}}Date.prototype.to_mongo=function(){return{$date:this.getTime()/1e3}};var db={__context:function(){db.treasures=new collection("treasures")},__clear:function(){for(var t in db)"object"==typeof db[t]&&delete db[t]},getCollectionNames:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"collections"}},this.response=function(t){return renderer.simpleList(t)}}},stats:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"stats"}},this.response=function(t){return $.resultGrid.display({documents:t},null)}}},getLastError:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"get_last_error"}},this.response=function(t){return $.resultGrid.display({documents:t},null)}}},toSelector:function(t){for(var e in t)if(t.hasOwnProperty(e)){var n=t[e];n.to_mongo?t[e]=n.to_mongo():"object"==typeof n&&db.toSelector(n)}return t}};context.register(db.__context);