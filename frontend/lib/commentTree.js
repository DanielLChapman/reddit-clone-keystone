let json = {};

class TreeNode {
    //constructors name and data for displaying information
    //parent incase we wanted to backwards traverse
    constructor(content,parent, id, comment) {
        this.content = content;
        this.parent = parent;
        this.descendents = [];
        this.id = id;
        this.commentObject = comment
    }

    setContent(value) {
        this.content = value;
    }
    setParent(value) {
        this.parent = value;
    }

    setID(value) {
        this.id = value;
    }
}

export default class Tree {
    constructor() {
        this.root = new TreeNode('Root', null, 1, null);
    }

    addNew = function(content, parentId, commentId, comment) {
        let parent;
        if (parentId === 1) {
            parent = this.root;
        }
        //find parent
        else {
            parent = this.contains(parentId, this.traverseBF);
        }
        
        if (parent === null) {
            return {
                error: 'Error, parent not found'
            }
        }

        //create new node
        let y = new TreeNode(content, parentId, commentId, comment);

        //add to parent
        parent.descendents.push(y); 
    };


    contains = function(id, traversal) {
        let x = traversal(this, id);
        return x;
    }

    //breadth-first search with an array instead of a queue
    traverseBF = function(tree, id) {
        var queue = [];
        let descendents = tree.root.descendents
        queue = [...descendents];
        let currentNode = queue.shift();

        while (currentNode) {
            
            for (var i = 0; i < currentNode.descendents.length; i++) {
                queue.push(currentNode.descendents[i]);
            }	

            if (currentNode.id === id) {
                
                return currentNode;
            }
            currentNode = queue.shift();
        }
        return null;
    }
		
    

}