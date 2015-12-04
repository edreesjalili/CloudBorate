Suggestions = new Meteor.Collection('suggestions');

Suggestions.allow({
	remove: ownsDocument
});