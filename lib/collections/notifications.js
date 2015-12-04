Notifications = new Meteor.Collection('notifications');

//check if the user owns the doc
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
};

Notifications.allow({
	update: ownsDocument
});

createNotification = function(comment) {
	var post = Posts.findOne(comment.postId);
	if(comment.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: comment._id,
			commentAuthor: comment.submittedBy,
			commentBody: comment.body,
			read: false
		});
	}
}