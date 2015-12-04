Template.postItem.helpers({
	displayEdited: function() {
    if(this.editedAt !== this.createdAt) {
			return true;
		}
		return false;
	},
	createdTime: function() {
		return new Date(this.createdAt).toLocaleString();
	},
	editedTime: function() {
		return new Date(this.editedAt).toLocaleString();
	},
	owner: function() {
		if(this.userId === null || Accounts.user() === null) {
			return false;
		}

		if(this.userId == Accounts.user()._id) {
			return true;
		}

		return false;
	},
	displayUpvote: function() {
		var uid = Accounts.userId();
		if(uid && !_.include(this.upvoters, uid)) {
			return true;
		} else {
			return false;
		}
	},
	votesText: function() {
		if (this.upvotes === 1) {
			return "Vote";
		} else {
			return "Votes";
		}
	},
	commentsText: function() {
		if(this.commentsCount === 1) {
			return " comment";
		} else {
			return " comments";
		}
	},
	boxColor: function() {
		colors = ["amber accent-4", "pink accent-4", "lime accent-4", "cyan accent-4", "teal accent-4"];
		return colors[Math.ceil(Math.random()*5)-1];
	}
});

Template.postItem.events({
	"click .upvote": function(event) {
		Meteor.call('upvote', this._id);
	}
});