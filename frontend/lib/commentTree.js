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


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


export default class Tree {
    constructor() {
        this.root = new TreeNode('Root', null, 1, null);
        for (let x = 0; x < 10; x++) {
            let y = new TreeNode(makeid(10), 1, Math.floor(Math.random() * 10000), {});
            this.root.descendents.push(y);
        }
        let y = new TreeNode(makeid(10), 1, 55, {});

        let py = new TreeNode(makeid(10), 55, 550, {});
        y.descendents.push(py);
        this.root.descendents.push(y);
    }

    addNew = function(content, parentId, commentId, comment) {
        //find parent
        let parent = this.contains(parentId, this.traverseBF);

        let y = new TreeNode(content, parentId, commentId, comment);

        parent.descendents.push(y); 
    }


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
    }
		
    
    newPost(id, content, comment, parentId) {
        let newNode = new TreeNode(content, parentId, id, comment);
        //find parent
        let parent;

        if (parent === 1) {
            parent = root;
        }

        //start with root, go through descendents

        //if the parent id is in allBelowIds

        //loop through all descedents until parent is found

        //add to descendents

        //sort all descedents it was added to based on comment.total votes
    }



}