var App = App || {};

App.List = function() {
    this._length = 0;
    this.head = null;
    this.tail = null;
    this.messages = {
      failure: "Failure: Non-existent node in the list.",
      success: "Success: You have successfully removed the node."
    };
};

App.List.prototype.Add = function (value) {
    var node = new App.Node(value);

    if (!this.head) {
        this.head = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    }

    this._length++;

    return node;
};

App.List.prototype.Remove = function (position) {
    // 1st case: an invalid position
    if (position > -1 && position < this._length) {
        var current = this.head;
        var count = 0;

        if (position === 0) {
            this.head = current.next;

            if (!this.head) {
              this.tail = null;
            } else {
              this.head.previous = null;
            }
        } else if (position === this._length -1) {
          current = this.tail;
          this.tail = current.previous;
          this.tail.next = null;
        } else {
            while (count++ < position) {
                current = current.next;
            }

            current.prev.next = current.next;
        }

        this._length--;

        return current.data;
    } else {
      return null;
    }
};

App.List.prototype.GetNodeAt = function (position) {
    if (position >= 0 && position < this._length) {
        var node = this.head;

        while (position--) {
          node = node.next;
        }

        return node;
    }
};

App.List.prototype.Reverse = function() {
  var node = this;
  var previous = null;

  while(node) {
    // save next or you lose it!!!
    var save = node.next;
    // reverse pointer
    node.next = previous;
    // increment previous to current node
    previous = node;
    // increment node to next node or null at end of list
    node = save;
  }
  return previous;   // Change the list head !!!
};
