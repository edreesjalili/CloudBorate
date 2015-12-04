Meteor.methods({
	'userExists': function(username) {
		return !!Meteor.users.findOne({username: username});
	},
	'post': function(post) {

		var user = Accounts.user();

		/* Check if user is logged in */
		if(!user) {
			throw new Meteor.Error(401, "You need to be logged in to post!");
		}

		/* Make sure there is a title */
		if(!post.title) {
			throw new Meteor.Error(422, "Please add a title!");
		}

		/* Get the proper keywords */
		var p = _.extend(_.pick(post, 'course', 'title', 'body', 'createdAt', 'editedAt'),{
			userId: user._id,
			author: user.username,
			commentsCount: 0,
			upvotes: 0
		});

		var postId = Posts.insert(p);

		return postId;
	},
	'comment': function(comment) {
		var user = Accounts.user();
		var post = Posts.findOne(comment.postId);

		if(!user) {
			throw new Meteor.Error(401, "You need to be logged in to comment!");
		} else if(comment.body === '') {
			throw new Meteor.Error(422, "Please write some content!");
		} else if(!post) {
			throw new Meteor.Error(422, "You need to comment on a post!");
		}

		var com = _.extend(_.pick(comment, 'body', 'postId', 'submittedAt'), {
			userId: user._id,
			submittedBy: user.username,
			likers: [],
			likes: 0
		});

		Posts.update(comment.postId, {$inc: {commentsCount: 1}});

		com._id =  Comments.insert(com);
		createNotification(com);
		return com._id;
	},
	'like': function(cid) {
		var user = Accounts.user();
		var comment = Comments.findOne(cid);

		if(!user) {
			throw new Meteor.Error(401, "You need to be logged in to like a comment!");
		}

		return Comments.update({
			_id: comment._id,
			likers: {$ne: user._id}
			},
			{
			$addToSet: {likers: user._id},
			$inc: {likes: 1}
		});
	},
	'removePostComments': function(pid) {
		var post = Posts.findOne(pid);
		if(post != null) {
			throw new Meteor.Error("post-exists", "The post has to be deleted before all the comments can be removed!");
		}
		return Comments.remove({postId: pid});
	},
	'upvote': function(pid) {
		var post = Posts.findOne(pid);
		var user = Accounts.user();

		if(!user) {
			throw new Meteor.Error(401, "Need to be logged in to upvote!");
		}

		return Posts.update({
			_id: post._id,
			upvoters: {$ne: user._id}
			},
			{
			$addToSet: {upvoters: user._id},
			$inc: {upvotes: 1}
		});
	},
	'suggest': function(data) {
		var user = Accounts.user();

		if(!user) {
			throw new Meteor.Error(401, "Need to be logged in to update!");
		}
		if(data.body === '' || data.body === undefined) {
			throw new Meteor.Error(403, "Not a valid suggestion. No body text");
		}

		var suggestion = _.extend(_.pick(data, 'body'), {
			userId: user._id,
			submittedBy: user.username,
			codeIts: 0,
			coders:[],
			inProgress: false
		});

		return Suggestions.insert(suggestion);
	},
	'codeIt': function(sid){
		var user = Accounts.user();
		var suggestion = Suggestions.findOne(sid);

		if(!user) {
			throw new Meteor.Error(401, "Need to be logged in to update!");
		}

		return Suggestions.update({
			_id: suggestion._id,
			coders: {$ne: user._id}
		},
		{
			$addToSet: {coders: user._id},
			$inc: {codeIts: 1}
		});
	}
});