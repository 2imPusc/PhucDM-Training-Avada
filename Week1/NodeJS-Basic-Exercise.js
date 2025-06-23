async function mapUserData() {
  // 1, 2. Get all users, posts, comments from the JSONPlaceholder API
  const [users, posts, comments] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()),
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
    fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json())
  ])

  //3. Map the data with the users array
  const mappedUsers = users.map( user => {
    const userPosts = posts.filter(post => post.userId === user.id);
    const userPostIds = userPosts.map(post => post.id);
    const userComments = comments.filter(comment => userPostIds.includes(comment.postId));

    const { id, name, username, email } = user;
    return {
      id,
      name,
      username,
      email,
      comments: userComments.map(({id, postId, name, body}) => ({id, postId, name, body})),
      posts: userPosts.map(({id, title, body}) => ({id, title, body})),
    }
  })

  console.log('Mapped user informations: ', mappedUsers);

  // 4. Filter only users with more than 3 comments.
  const usersWithMoreThan3Comments = mappedUsers.filter(user => user.comments.length > 3);
  console.log('Users with more than 3 comments:', usersWithMoreThan3Comments);

  // 5. reformat the data with the count of comments and posts
  const reformattedData = mappedUsers.map( user => {
    const { id, name, username, email, comments, posts } = user;
    return {
      id,
      name,
      username,
      email,
      commentsCount: comments.length,
      postsCount: posts.length
    }
  });

  console.log('Reformatted Data:', reformattedData);

  //6. Who is the user with the most comments/posts
  const userWithMostPost = reformattedData.reduce((max, user) => user.postsCount > max.postsCount ? user : max);
  console.log('User with the most posts:', userWithMostPost);

  const userWithMostComments = reformattedData.reduce((max, user) => user.commentsCount > max.commentsCount ? user : max)
  console.log('User with the most comments:', userWithMostComments);

  //7. Sort the list of users by the postsCount value descending
  const sortUsersByPostsCount = [...reformattedData].sort((a, b) => b.postsCount - a.postsCount);
  console.log('Users sorted by posts count:', sortUsersByPostsCount);
}

mapUserData();


// 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
async function getPostWithComments () {
  const [post, comments] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json()),
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1').then(response => response.json())
  ]);

  const {userId, id, title, body} = post;
  return {
    userId,
    id,
    title,
    body,
    comments: comments.map(({postId, id, name, email, body}) => ({postId, id, name, email, body}))
  }
}

getPostWithComments().then(postWithComments => {
  console.log('Post with comments:', postWithComments);
}).catch(error => {
  console.error('Error fetching post with comments:', error);
});