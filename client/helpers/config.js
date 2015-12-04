//Helpers for hooks
var successfulSubmit = function(error, state) {
	if(!error) {
		if(state === 'signIn') {
			$('#signIn').closeModal();
		}

		if(state === 'signUp') {
			$('#signIn').closeModal();
		}
	}
}

var successfulLogout = function() {
	Router.go('/');
}

userLoggedIn = function() {
	if(!Accounts.user()){
		return false;
	} else {
		return true;
	}
}

//Template fields
AccountsTemplates.addField({
	_id: 'username',
	type: 'text',
	minLength: 6,
	required: true,
	func: function(value) {
		var self = this;
		Meteor.call("userExists",value,function(err,userExists){
			if(!userExists) {
				self.setSuccess();
			} else {
				self.setError(userExists);
			}
			self.setValidating(false);
		});
		return;
	}
});

//Template Config
AccountsTemplates.configure({
	//behavior
	//appearance
	showForgotPasswordLink: true,
	//texts
	//links
	//hooks
	onSubmitHook: successfulSubmit,
	onLogoutHook: successfulLogout
});

