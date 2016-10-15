function ObjectId(e){return{$oid:e}}function collection(e){this._name=e,this.find=function(e,t){return new collection_find(e,t,this)},this.count=function(e){return new collection_count(e,this)},this.stats=function(){return new collection_stats(this)},this.getIndexes=function(){return new collection_getIndexes(this)},this.ensureIndex=function(e,t){return new collection_ensureIndex(e,t,this)},this.dropIndex=function(e){return new collection_dropIndex(e,this)},this.dropIndexes=function(){return new collection_dropIndexes(this)},this.remove=function(e){return new collection_remove(e,this)},this.update=function(e,t,n,i){return new collection_update(e,t,n,i,this)},this.insert=function(e){return new collection_insert(e,this)},this.distinct=function(e,t){return new collection_distinct(e,t,this)}}function collection_find(e,t,n){this._selector=e,this._fields=t,this._collection=n,this._explain=!1,this.teacherName=function(){return"find"},this.limit=function(e){return this._limit=e,this},this.sort=function(e){return this._sort=e,this},this.skip=function(e){return this._skip=e,this},this.explain=function(){return this._explain=!0,this},this.mongo_serialize=function(){return{endpoint:"collection",command:"find",collection:this._collection._name,selector:db.toSelector(this._selector),fields:this._fields,limit:this._limit,sort:this._sort,skip:this._skip,explain:this._explain}},this.response=function(e){return $.resultGrid.display(e,this.mongo_serialize())}}function collection_count(e,t){this._selector=e,this._collection=t,this.teacherName=function(){return"count"},this.mongo_serialize=function(){return{endpoint:"collection",command:"count",collection:this._collection._name,selector:db.toSelector(this._selector)}},this.response=function(e){var t=1==e.count?" document":" documents";return renderer.single(e.count+t+" in "+this._collection._name)}}function collection_stats(e){this._collection=e,this.mongo_serialize=function(){return{endpoint:"collection",command:"stats",collection:this._collection._name}},this.response=function(e){return $.resultGrid.display({documents:e},null)}}function collection_getIndexes(e){this._collection=e,this.mongo_serialize=function(){return{endpoint:"collection",command:"get_indexes",collection:this._collection._name}},this.response=function(e){return $.resultGrid.display({documents:e},null)}}function collection_ensureIndex(e,t,n){this._fields=e,this._options=t,this._collection=n,this.mongo_serialize=function(){return{endpoint:"collection",command:"ensure_index",collection:this._collection._name,fields:this._fields,options:this._options}},this.response=function(){return renderer.ok()}}function collection_dropIndex(e,t){this._fields=e,this._collection=t,this.mongo_serialize=function(){return{endpoint:"collection",command:"drop_index",collection:this._collection._name,fields:this._fields}},this.response=function(){return renderer.ok()}}function collection_dropIndexes(e){this._collection=e,this.mongo_serialize=function(){return{endpoint:"collection",command:"drop_indexes",collection:this._collection._name}},this.response=function(){return renderer.ok()}}function collection_remove(e,t){this._selector=e,this._collection=t,this.teacherName=function(){return"remove"},this.mongo_serialize=function(){return{endpoint:"collection",command:"remove",selector:db.toSelector(this._selector),collection:this._collection._name}},this.response=function(e){return renderer.count(e)}}function collection_update(e,t,n,i,o){this._selector=e,this._values=t,this._upsert=n,this._multiple=i,this._collection=o,this.teacherName=function(){return"update"},this.mongo_serialize=function(){return{endpoint:"collection",command:"update",selector:db.toSelector(this._selector),values:db.toSelector(this._values),upsert:this._upsert,multiple:this._multiple,collection:this._collection._name}},this.response=function(e){return renderer.count(e)}}function collection_insert(e,t){this._object=e,this._collection=t,this.teacherName=function(){return"insert"},this.mongo_serialize=function(){return{endpoint:"collection",command:"insert",object:db.toSelector(this._object),collection:this._collection._name}},this.response=function(e){$.isArray(e)||(e=[e]);for(var t=1==e.length?" is":" are",n="",i=0;i<e.length;++i)n+=e[i].$oid+", ";return n=n.substring(0,n.length-2),renderer.single("insert successful, the id "+t+": "+n)}}function collection_distinct(e,t,n){this._field=e,this._query=t,this._collection=n,this.mongo_serialize=function(){return{endpoint:"collection",command:"distinct",field:this._field,query:this._query,collection:this._collection._name}},this.response=function(e){return renderer.simpleList(e)}}Date.prototype.to_mongo=function(){return{$date:this.getTime()/1e3}};var db={__context:function(){db.unicorns=new collection("unicorns")},__clear:function(){for(var e in db)"object"==typeof db[e]&&delete db[e]},getCollectionNames:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"collections"}},this.response=function(e){return renderer.simpleList(e)}}},stats:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"stats"}},this.response=function(e){return $.resultGrid.display({documents:e},null)}}},getLastError:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"get_last_error"}},this.response=function(e){return $.resultGrid.display({documents:e},null)}}},listDatabases:function(){return new function(){this.mongo_serialize=function(){return{endpoint:"database",command:"list_databases"}},this.response=function(e){return renderer.simpleList(e)}}},toSelector:function(e){for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];n.to_mongo?e[t]=n.to_mongo():"object"==typeof n&&db.toSelector(n)}return e}};context.register(db.__context);