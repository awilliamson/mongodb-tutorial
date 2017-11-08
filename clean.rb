require 'mongo'
connection = Mongo::Connection.new('127.0.0.1', 27017)
db = connection['learn_1']
db.collection_names.each do |coll_name|
	id = coll_name.split(/_/)[1]
	next unless BSON::ObjectId.legal?(id)
	if ((Time.now - BSON::ObjectId.from_string(id).generation_time) / 3600).floor > 6
	    db.drop_collection(coll_name)
	end
end
