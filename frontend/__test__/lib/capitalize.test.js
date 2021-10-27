import capitalize from '../../lib/capitalize';

describe('capitlization', () => {
    it ('capitalizes', () => {
        expect(capitalize('hi')).toEqual('Hi');
        
    });

    
})