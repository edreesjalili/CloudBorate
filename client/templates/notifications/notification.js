Template.notification.helpers({
	postLink: function() {
		return Router.routes.postPage.path({_id: this.postId});
	}
});

Template.notification.events({
	'click .dismiss-notification': function() {
		Notifications.update(this._id, {$set: {read: true}});
	},
	'click .view-notification': function() {
		$('#notificationsModal').closeModal();
		Notifications.update(this._id, {$set: {read: true}});
	}
});