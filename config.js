/* Requires $jslib */
var config = {
    configkey: "",
    settings: {https: true}, /* Initial settings fill out to default values, will be overwritten by localstorage */
    current: null,
    pages: {},
    init: function() {
        if ((this.configkey in window.localStorage)) {
            $js.extend(this.settings, JSON.parse(window.localStorage[this.configkey]));
        }
        // do configuration
        this.buildSettingsDialog();
        this.main();
    },
    buildSettingsDialog: function() {
        $js.addStyle(".JSconfig {\
            position: fixed; \
            bottom: 10px; \
            right: 10px; \
            width: 300px; \
            height: 300px; \
            display: none; \
            border: solid 2px line grey; \
            background: #f0f0f0; \
        }\
        .JSconfignub {\
            position: fixed; \
            right: 10px; \
            bottom: 10px; \
            opacity: 0.5; \
            color: white; \
        }\
        .JSconfighead {\
            position: relative;\
            height: 20px;\
            overflow: auto;\
            border-bottom: 1px solid black;\
        }\
        .JSconfigpage {\
            position: relative;\
            height: 279px;\
            width: 300px;\
            display: none;\
            padding-top: 5px; \
        }\
        .JSconfighead .JSconfigclose { float: right; max-height: 20px; cursor: pointer; }\
        .JSconfignub:hover { opacity: 1; cursor: pointer; }\
        .JSconfigpage>span { margin-left: 5px; margin-right: 5px; }\
        .JSconfigpage label { margin-left: 5px; }");
        var $nub = $js.el("div", {class: "JSconfignub", innerHTML: "{+}"});
        var $box = $js.el("div", {class: "JSconfig"});
        $nub.addEventListener("click", function () {
            if (getComputedStyle($box).display == "none") {$box.style['display'] = "block";}
            else {$box.style['display'] = "none";}
        });
        var $head = $js.el("div", {class: "JSconfighead"});
        var $exit = $js.el("span", {class: "JSconfigclose", innerHTML: "{x}"});
        $exit.addEventListener("click", function() {
            $box.style['display'] = "none";
        });
        $head.appendChild($exit);
        $box.appendChild($head);
        document.body.appendChild($nub);
        document.body.appendChild($box);
        this.$box = $box;
        this.$head = $head;
    },
    createPage: function(page) {
        var $conf = $js("JSconfig");
        var $tab = $js.el("span", {class: "JSconfigtab", innerHTML: page});
        var $page = $js.el("div", {class: "JSconfigpage"});
        
        if (Object.keys(this.pages).length == 0) {
            $page.style.display="block";
            $js.addClass($tab, "JSconfigtabsel");
            this.current = $page;
        }
        this.pages[page] = $page;
        this.$box.appendChild($page);
        this.$head.appendChild($tab);
        return $page;
    },
    addCheckBox: function(id, settingskey, label) { // helper for creating checkbox
        var $span = $js.el("span");
        var $box = $js.el("input", {id:id, type:"checkbox", checked: this.settings[settingskey]});
        var $lbl = $js.el("label", {innerHTML: label});
        $lbl.setAttribute("for", id);
        $box.onclick = function () {config.settings[settingskey] = this.checked; config.save();}
        $span.appendChild($box); $span.appendChild($lbl);
    },
    addDefaultSettings: function(settings) {/* adds default settings. */
        for (var key in settings) {
            if (!(key in this.settings)) {
                this.settings[key] = settings[key];
            }
        }
    },
    save: function() {
        window.localStorage[this.configkey] = JSON.stringify(this.settings);
    },
    main: function() { // creates main settings page
        var $main = this.createPage("Main");
        $main.appendChild(this.addCheckBox("JShttps", "https", "Use HTTPS"));
    },
};
