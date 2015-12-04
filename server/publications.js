Meteor.publish('posts', function(options) {
	return Posts.find({}, options);
});

Meteor.publish('singlePost', function(pid) {
	return Posts.find(pid);
});

Meteor.publish('usersPosts', function(uid) {
	return Posts.find({userId: uid});
});

Meteor.publish('usersComments', function(uid) {
	return Comments.find({userId: uid});
});

Meteor.publish('comments', function(pid) {
	return Comments.find({postId: pid});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});

Meteor.publish('suggestions',function() {
	return Suggestions.find();
});