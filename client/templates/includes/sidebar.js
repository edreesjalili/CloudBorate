Template.sidebar.helpers({
	signedIn: function() {
		return userLoggedIn();
	},
	notificationCount: function() {
		return Notifications.find({read: false}).count();
	},
	getUser: function() {
		return {_id: Accounts.userId()};
	}
});

Template.sidebar.events({
	"click #logout": function() {
		AccountsTemplates.logout();
	},
	"click #login": function() {
		$('#signIn').openModal();
	},
	"click #view-notifications": function() {
		$('#notificationsModal').openModal();
	}
});