Template.notifications.helpers({
	notes: function() {
		if(Notifications.find({ read: false}).count() > 0) {
			return true;
		} else {
			return false;
		}
	},
	notifications: function() {
		return Notifications.find({read: false});
	}
});