Template.suggestion.helpers({
	codedIt: function() {
		var uid = Accounts.userId();
		if(uid && !_.include(this.coders, uid)) {
			return false;
		} else {
			return true;
		}
	},
	createdSuggestion: function() {
		var uid = Accounts.userId();
		if(uid && this.userId === uid) {
			return true;
		} else {
			return false;
		}
	}
});

Template.suggestion.onRendered(function() {
	$(".tooltipped").tooltip({
		delay: 0,
		position: 'bottom'
	});
});

Template.suggestion.onDestroyed(function() {
	$(".tooltipped").tooltip('remove');
});

Template.suggestion.events({
	"click .codeIt": function(event) {
		Meteor.call('codeIt', this._id);
	},
	"click .delete": function(event) {
		if(this.userId === Accounts.userId()) {
			Suggestions.remove(this._id);
		}
	}
});