Template.suggestionsBox.events({
	"submit #suggestion-box": function(event) {
		event.preventDefault();

		var $body = $(event.target).find('[id=suggestion-body]');
		var data = {
			body: $body.val()
		}
		console.log($body.val());
		Meteor.call('suggest', data, function(error, suggestion) {
			if(error) {
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
	}
});