(function() {
  packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }
      classes.forEach(function(d) {
        find(d.name, d);
      });
      return map[""];
    },

    // Return a list of imports for the given array of nodes.
    imports: function(nodes) {
      var map = {},
          imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.imports) {
          if(typeof d.imports.forEach === 'function'){
          d.imports.forEach(function(i,j) {
          imports.push({source: map[d.name], target: map[i], lty: d.lty[j], opacity: d.opacity[j] });
        })
        } else {
          // if there's only one import in d.imports then you need to do
          // something different because the .forEach attribute doesn't
          // exist:
          imports.push({source: map[d.name], target: map[d.imports], lty: d.lty, opacity: d.opacity});
        };
        };
      });

      return imports;
    }

  };
})();
