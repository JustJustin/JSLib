var $js = function(selector, root){
    if(root == null) {
        root = document.body;
    }
    return root.querySelector(selector);
};
var $$js = function(selector, root){
    if(root == null) {
        root = document.body;
    }
    return root.querySelectorAll(selector);
};
$js.extend = function(object, data){
    var key, val;
    for(key in data){
        val = data[key];
        object[key] = val;
    }
};

$js.extend($js, {
    engine: /WebKit|Presto|Gecko/.exec(navigator.userAgent)[0].toLowerCase(),
    addClass: function(el, klass){
        el.classList.add(klass);
    },
    rmClass: function(el, klass){
        el.classList.remove(klass);
    },
    hasClass: function(el, klass){
        var i;
        for(i = 0; i < el.classList.length; ++i){
            if(el.classList[i] == klass){
                return true;
            }
        }
        return false;
    },
    id: function(id) {
        return document.getElementById(id);
    },
    attr: function(el, val) {
        var attributes = el.attributes;
        return (attributes[val] === undefined) ? false: attributes[val].value;
    },
    after: function(root, el) {
        if(root.nextSibling){
            return root.parentNode.insertBefore(el, root.nextSibling);
        }
        return root.parentNode.appendChild(el);
    },
    before: function(root, el) {
        return root.parentNode.insertBefore(el, root);
    },
    space: function(el) {
        el.appendChild(document.createTextNode(' '));
    },
    css: function(el, css) {
        $js.extend(el.style, css);
    },
    el: function(tagname, attrs) {
        var el = document.createElement(tagname);
        if(attrs == undefined) {
            attrs = {};
        }
        $js.extend(el, attrs);
        if(attrs['class']) {
            el.className = attrs['class'];
        }
        return el;
    },
    indexIn: function(array, object) {
        var index = -1;
        for(var i = 0; i < array.length; ++i) {
            if(array[i] > object) {
                index = i;
                break;
            }
        }
        return index;
    },
    firstParent: function(root, tag, limit) {
        if(limit === 0) { return false; }
        if( root.parentNode.tagName.toLowerCase() == tag.toLowerCase() ) {
            return root.parentNode;
        }
        if(root.parentNode == document.body){
            return false;
        }
        return $js.firstParent(root.parentNode, tag, limit - 1);
    },
    remove: function(el) {
        return el.parentNode.removeChild(el);
    },
    log: function(obj, severe) {
        if(severe || config.debug) {
            console.log(obj);
        }
    },
    prepend: function(base, el) {
        if(base.firstChild) {
            $js.before(base.firstChild, el);
        } else {
            base.appendChild(el);
        }
    },
    addStyle: function(css) {
        var style;
        style = $js.el('style', {
            textContent: css
        });
        document.head.appendChild(style);
        return style;
    }
});
