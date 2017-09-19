var App = App || {};

App.List = function() {
    this.head = null;
    this.tail = null;
    this.length = 0;
};

App.List.prototype = {
  Head: function(){
    if (this.head != null) {
      return this.head;
    } else {
      throw new Error("List head is empty.");
    }
  },

  Tail: function () {
    if (this.tail != null) {
      return this.tail;
    } else {
      throw new Error("List tail is empty.");
    }
  },

  Add: function (value) {
      var node = new App.Node(value);

      if (this.head === null) {
        this.head = node;
      }

      if (this.tail === null) {
        this.tail = node;
        this.tail.previous = this.head;
        this.head.next = this.tail;
      }

      this.tail.next = node;
      node.previous=this.tail;
      this.tail = node;
      this.length++;

      return node;
  },

  Remove: function (position) {
      // 1st case: an invalid position
      if (position > -1 && position < this.length) {
          var current = this.head;
          var count = 0;

          if (position === 0) {
              this.head = current.next;

              if (!this.head) {
                this.tail = null;
              } else {
                this.head.previous = null;
              }
          } else if (position === this.length -1) {
            current = this.tail;
            this.tail = current.previous;
            this.tail.next = null;
          } else {
              while (count++ < position) {
                  current = current.next;
              }

              current.prev.next = current.next;
          }

          this.length--;

          return current.data;
      } else {
        return null;
      }
  },

  GetNodeAt: function (position) {
      if (position >= 0 && position < this.length) {
          var node = this.head;

          while (position--) {
            node = node.next;
          }

          return node;
      }
  },

  GetNodePosition: function (value) {
      var node = this.head;
      var i = 0;
      while (i != this.length) {
        if (node.data === value) {
          return i;
        }

        node = node.next;
        i++;
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
