import casual from 'casual';

  
// seed it so we get consistent results
casual.seed(777);

const fakeUser = (overrides) => (
    {
    __typename: 'User',
    id: '4234',
    name: casual.name,
    username: casual.name,
    owner: [],
    email: casual.email,
    permissions: ['ADMIN'],
    moderating: [],
    subreddits: [],
    posts: [],
    postvotes: [],
    firstSignin: false,
    comments: [],
    commentvotes:[],
    ...overrides,
});

const fakeSubreddit = (overrides) => (
    {
        __typename: 'Subreddit',
        id: casual.uuid,
        name: casual.string,
        title: casual.string,
        slug: casual.string,
        sidebar: casual.string,
        rules: casual.string,
        description: casual.string,
        status: 'PUBLIC',
        ownder: fakeUser(),
        moderators: [],
        subscriber: [],
        posts: [],
        createdAt: Date.now(),
    }
);

const fakeLinkPost = (overrides) => (
    {
    __typename: 'Post',
    title: casual.sentence,
    user: fakeUser(),
    subreddit: fakeSubreddit(),
    createdAt: Date.now(),
    votes: [],
    post_slug: casual.string,
    link: 'www.google.com',
    type: 'Link',
    comments: [],
    removed: 'False',
    id: casual.uuid,


});

const fakeMediaPost = (overrides) => (
    {
    __typename: 'Post',
    title: casual.sentence,
    user: fakeUser(),
    subreddit: fakeSubreddit(),
    createdAt: Date.now(),
    votes: [],
    post_slug: casual.string,
    link: 'https://cdn.fileinfo.com/img/ss/sm/png_79.jpg',
    type: 'Link',
    comments: [],
    id: casual.uuid,
    removed: 'False'

});

const fakeTextPost = (overrides) => (
    {
    __typename: 'Post',
    title: casual.sentence,
    content: casual.sentence,
    user: fakeUser(),
    subreddit: fakeSubreddit(),
    createdAt: Date.now(),
    votes: [],
    post_slug: casual.string,
    link: '',
    type: 'Text',
    comments: [],
    id: casual.uuid,
    removed: 'False'

});

const fakeComment = (overrides) => (
    {
    __typename: 'Comment',
    content: casual.sentence,
    user: fakeUser(),
    post: fakeTextPost(),
    createdAt: Date.now(),
    votes: [],
    parent: null,
    id: casual.uuid,
    children: [],

});


// Fake LocalStorage
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }



export {

    LocalStorageMock,
    fakeLinkPost,
    fakeComment,
    fakeMediaPost,
    fakeSubreddit,
    fakeTextPost,
    fakeUser,

  };