import Tree from "../../lib/commentTree"

describe('It creates a tree with nodes', () => {
    it ('creates a tree root', () => {
        let tree = new Tree();
        let x = "{\"content\":\"Root\",\"parent\":null,\"descendents\":[],\"id\":1,\"commentObject\":null}"
        
        expect(JSON.stringify(tree.root)).toEqual(x);
    });

    it ('adds nodes to tree root', () => {
        let tree = new Tree();

        tree.addNew(
            'hi',
            1,
            1,
            {}
        );

        expect(tree.root.descendents[0].content).toEqual('hi');
    });

    it('lets nodes have nodes', () => {
        let tree = new Tree();

        tree.addNew(
            'hi',
            1,
            2,
            {}
        );

        tree.addNew(
            'hi-2',
            2,
            4,
            {}
        );

        expect(tree.root.descendents[0].descendents[0].content).toEqual('hi-2');
    });

    it('accurately tracks nodes', () => {
        let tree = new Tree();

        tree.addNew(
            'hi',
            1,
            2,
            {}
        );

        tree.addNew(
            'hi-2',
            2,
            4,
            {}
        );

        tree.addNew(
            'hi-3',
            1,
            3,
            {}
        );

        expect(tree.root.descendents.length).toBe(2);

    })
})