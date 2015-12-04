Posts = new Meteor.Collection('posts');

//check if the user owns the doc
ownsDocument = function(userId, doc) {
	return doc && doc.userId == userId;
};

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fields) {
		return (_.without(fields, 'course', 'body', 'editedAt').length > 0)
	}
});