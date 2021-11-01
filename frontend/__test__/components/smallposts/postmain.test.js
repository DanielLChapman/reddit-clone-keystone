import { render, screen } from '@testing-library/react';
import PostMain from '../../../components/SmallPosts/PostMain';
import { fakeLinkPost, fakeMediaPost, fakeTextPost, fakeUser } from '../../../lib/testUtils';
import {MockedProvider} from '@apollo/react-testing';

const post = fakeTextPost();
const postMedia = fakeLinkPost();
const postMediaImage = fakeMediaPost();
const user = fakeUser();

describe('<PostMain />', () => {
    it('renders out the title and user', () => {
        const { container, debug } = render(
        <MockedProvider>
            <PostMain post={post} user={user} />
        </MockedProvider>);
        

        expect(screen.getByText('Posted by')).toBeInTheDocument();
        expect(screen.getByText(`Posted 0 minutes ago`)).toBeInTheDocument();
        expect(screen.getByText(`r/${post.subreddit.name}`)).toBeInTheDocument();
        expect(screen.getByText(`u/${post.user.username}`)).toBeInTheDocument();
        expect(screen.getByText(`${post.title}`)).toBeInTheDocument();
        
        let comments = container.querySelector('.reddit-post-right-bottom-footer .subreddit-link');

        expect(comments.textContent).toBe("0 Comments");

        const link = container.querySelectorAll('a');

        //link to user
        //link to subreddit
        //link to comments
        expect(link.length).toBe(3);
    });

    it ('renders out an up and downvote arrow', () => {
        const { container, debug } = render(
        <MockedProvider>
            <PostMain post={post} user={user} />
        </MockedProvider>);

        const leftSide = container.querySelector('.reddit-post .reddit-post-left');
        expect(leftSide).toBeDefined();
        let svg = leftSide.querySelectorAll('svg');

        expect(svg.length).toBe(2);

        expect(leftSide.textContent).toBe('0');
    });

    it('correctly renders the right post, media vs text', () => {
        let { container, debug } = render(
            <MockedProvider>
                <PostMain post={post} user={user} />
            </MockedProvider>);

        expect(container.querySelectorAll('.reddit-post-right-bottom-description').length).toBe(1);

        let { container: container2, debug: debug2 } = render(
            <MockedProvider>
                <PostMain post={postMedia} user={user} />
            </MockedProvider>);

        expect(container.querySelectorAll('.media-output-small-post').length).toBe(0);
        expect(container2.querySelectorAll('.media-output-small-post').length).toBe(1);
        expect(container2.querySelectorAll('.media-output-small-post a').length).toBe(1);
    })

    it('renders and matches the snapshop', () => {
        let { container, debug } = render(
            <MockedProvider>
                <PostMain post={post} user={user} />
            </MockedProvider>);

        expect(container).toMatchSnapshot();
    });

    it('renders the image properly', () => {
        let { container, debug } = render(
            <MockedProvider>
                <PostMain post={postMediaImage} user={user} />
            </MockedProvider>);

            const img = screen.getByAltText(postMediaImage.title);
            expect(img).toBeInTheDocument();
    })
})