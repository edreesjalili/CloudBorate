Template.postEdit.helpers({
	post: function() {
		return Posts.findOne(this._id);
	}
});

Template.postEdit.events({
	'submit #editPost': function(event) {
		event.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			course: $(event.target).find('[id=course]').val(),
			body: $(event.target).find('[id=body]').val(),
			editedAt: new Date().getTime()
		}

		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if(error) {
				alert(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},
	'click #delete': function(event) {
		event.preventDefault();

		if(confirm('Are you sure you want to delete this post?')) {
			Posts.remove(this._id);
			Meteor.call('removePostComments', this._id, function(error, removeCount) {
				if(error) {
					throwError(error.reason);
				}
			});
			Router.go('postsList');
		}
	}

});