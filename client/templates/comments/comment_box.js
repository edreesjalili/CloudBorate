Template.commentBox.events({
	'submit #comment-form': function(event) {
		event.preventDefault();

		var $body = $(event.target).find('[id=comment-body]');
		var comment = {
			body: $body.val(),
			postId: this.post._id,
			submittedAt: new Date().getTime()
		};

		Meteor.call('comment', comment, function(error, commentId) {
			if(error) {
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
	}
});