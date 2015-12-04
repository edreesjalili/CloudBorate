Template.postSubmit.events({
	"submit #createNewPost": function(event) {
		//prevent default
		event.preventDefault();

		var d = new Date().getTime();

		//create post
		var post = {
			course: $(event.target).find('[id=course]').val(),
			title: $(event.target).find('[id=title]').val(),
			body: $(event.target).find('[id=body]').val(),
			createdAt: d,
			editedAt: d
		}

		Meteor.call('post', post, function(error, id) {
			if(error) {
				throwError(error.reason);

				if(error.error === 302) {
					Router.go('postPage', {_id:error.details});
				} else {
					Router.go('postPage', {_id: id});
				}
			}
			Router.go('postPage', {_id: id});
		});
	}
});