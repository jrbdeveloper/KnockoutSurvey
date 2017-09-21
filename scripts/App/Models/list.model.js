var App = App || {};

App.List = function() {
    this.head = null;
    this.length = 0;
};

App.List.prototype = {
    Add: function (value) {
        var node = new App.Node(value);
        var currentNode = this.head;

        // 1st use-case: an empty list
        if (!currentNode) {
            this.head = node;
        } else {
          // 2nd use-case: a non-empty list
          while (currentNode.next) {
              currentNode = currentNode.next;
          }

          currentNode.next = node;
        }

        this.length++;

        return node;
    },

    Remove: function (position) {
        var currentNode = this.head,
        length = this.length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;

        // 1st use-case: an invalid position
        if (position < 0 || position > length) {
            throw new Error("Error");
        }

        // 2nd use-case: the first node is removed
        if (position === 1) {
            this.head = currentNode.next;
            deletedNode = currentNode;
            currentNode = null;
            this.length--;

            return deletedNode;
        }

        // 3rd use-case: any other node is removed
        while (count < position) {
            beforeNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            count++;
        }

        beforeNodeToDelete.next = nodeToDelete.next;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this.length--;

        return deletedNode;
    },

    GetNodeAt: function(position) {
        var currentNode = this.head;
        var length = this.length;
        var count = 1;

        // 1st use-case: an invalid position
        //if (length === 0 || position < 1 || position > length) {
        //    throw new Error("Error");
        //}

        // 2nd use-case: a valid position
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    },

    GetNodePosition: function(value) {
        var currentNode = this.head;
        var length = this.length;
        var count = 1;

        // 2nd use-case: a valid position
        while (count < length) {
            currentNode = currentNode.next;
            count++;
        }

        return count;
    },

    Traverse: function(fn) {
        var current = this.head;

        while(current) {
            if(fn) {
                fn(current);
            }

            current = current.next;
        }
    },

  Reverse: function() {
    var node = this.head;
    var previous = null;

    while(node != null) {
      // save next or you lose it!!!
      var save = node.next;
      // reverse pointer
      node.next = previous;
      // increment previous to current node
      previous = node;
      // increment node to next node or null at end of list
      node = save;
    }
    return this;   // Change the list head !!!
  }
};
