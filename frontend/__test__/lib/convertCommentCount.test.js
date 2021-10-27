import convertCommentCount from '../../lib/convertCommentCount';

describe('convertCommentCount', () => {
    it ('works with thousands', () => {
        expect(convertCommentCount(1000)).toEqual('1.0 k');
        expect(convertCommentCount(10000)).toEqual('10.0 k');
        expect(convertCommentCount(356300)).toEqual('356.3 k');
        expect(convertCommentCount(555505)).toEqual('555.5 k');
        expect(convertCommentCount(100)).toEqual('100');
    });

    it('works with millions', () => {
        expect(convertCommentCount(1000000)).toEqual('1 million');
        expect(convertCommentCount(555505000)).toEqual('555.5 million');
    });
    
})