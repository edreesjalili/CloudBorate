Template.comment.events({
	'click .like-comment': function(event) {
		Meteor.call('like', this._id);
	}
});

Template.comment.helpers({
	liked: function() {
		var uid = Accounts.userId();
		if(uid && ! _.include(this.likers, uid)) {
			return true;
		} else {
			return false;
		}
	},
	likesText: function(){
		if (this.likes === 1) {
			return "Like";
		} else {
			return "Likes";
		}
	},
	commentTime: function() {
		return new Date(this.submittedAt).toLocaleString();
	}
});