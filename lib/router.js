/* =============================================== Start Controllers =============================================== */
PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 10,
	postsLimit: function() {
		return parseInt(this.params.postLimit) || this.increment;
	},
	findOptions: function() {
		return {limit: this.postsLimit(), sort: {"createdAt": -1}};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMorePosts = this.posts().fetch().length === this.postsLimit();
		var nextPath = this.route.path({postLimit: this.postsLimit() + this.increment});
		return {
			posts: this.posts(),
			nextPath: hasMorePosts ? nextPath: null
		};
	}
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {return [Meteor.subscribe('notifications')]; }
});
/* =============================================== End Controllers =============================================== */
/* =============================================== Start Post Routes =============================================== */
Router.route('/posts/:_id',function() {
	this.render('postPage');
},
{
	name: 'postPage',
	waitOn: function() {
		return [Meteor.subscribe('comments', this.params._id),
				Meteor.subscribe('singlePost', this.params._id)];
	},
	data: function() {
		return {
			post: Posts.findOne(),
			comments: Comments.find()
		};
	}
});

Router.route('/posts/:_id/edit', function() {
	this.render('postEdit');
},
{
	name: 'postEdit',
	waitOn: function() {
		return Meteor.subscribe('singlePost', this.params._id);
	},
	data: function() {
		return Posts.findOne({_id: this.params._id});
	}
});

Router.route('/submit', function() {
	this.render('postSubmit');
},
{
	name: 'postSubmit',
	progress: false
});
/* =============================================== End Post Routes =============================================== */
/* =============================================== User Routes =============================================== */

Router.route('/user/:_id/posts', function() {
	this.render('postsList');
},
{
	name: 'usersPosts',
	waitOn: function() {
		return Meteor.subscribe('usersPosts', this.params._id);
	},
	data: function() {
		return {posts: Posts.find()};
	}
});

Router.route('/user/:_id/comments', function() {
	this.render('usersComments');
},
{
	name: 'usersComments',
	waitOn: function() {
		Meteor.subscribe('usersComments', this.params._id);
	},
	data: function() {
		return {comments: Comments.find()};
	}
});

/* =============================================== End User Routes =============================================== */
/* =============================================== Suggestions Routes =============================================== */
Router.route('/suggestions', function() {
	this.render('suggestionsList');
},
{
	name: 'suggestionsList',
	waitOn: function() {
		return Meteor.subscribe('suggestions');
	},
	data: function() {
		return {suggestions: Suggestions.find()};
	}
});
/* =============================================== End Suggestions Routes =============================================== */


Router.route('/:postLimit?', function() {
	this.render('postsList');
},
{
	name: 'postsList',
	controller: PostsListController
});
var requireLogin = function() {
	if(!Accounts.user()) {
		if(Accounts.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
		this.stop();
	} else {
		this.next();
	}
}

Router.before(requireLogin, {only: 'postSubmit'});
Router.before(function() { cleanErrors(); this.next(); });