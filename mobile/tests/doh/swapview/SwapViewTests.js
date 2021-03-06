require([
	"dojo/parser",		// This mobile app uses declarative programming with fast mobile parser
	"dojo/dom-construct", // dojo.place
	"dojo/dom-class", // dojo.hasClass
	"dojo/domReady!", // dojo.ready
	"dui/registry",  // dui.byId
	"doh/runner",	//doh functions
	"dui/mobile/SwapView",	// This mobile app uses mobile view
	"dui/mobile/compat"		// This mobile app supports running on desktop browsers
], function(parser, domConst, domClass, ready, registry, runner, SwapView){

	parser.parse();

	var timeoutInterval = 1000;
	var WIDGET_CLASSNAME1 = "duiView";
	var WIDGET_CLASSNAME2 = "duiSwapView";


	function _createSwapViewProgrammatically(placeHolderId, widgetId, selected, innerHTML){
		// Create SwapView
		var r = new dui.mobile.SwapView({id: widgetId, selected: selected, innerHTML: innerHTML});
		runner.assertNotEqual(null, r);
		domConst.place(r.domNode, placeHolderId, "replace");
		r.startup();

		return r;
	};

	function _createSwapViewProgrammaticallyWithSourceNodeReference(widgetId, selected){
		// Create IconContainer
		var r = new SwapView({id: widgetId, selected: selected}, widgetId);

		r.startup();
		return r;
	};

	function _assertCorrectSwapView(widget, display){
		runner.assertNotEqual(null, widget, "IconContainer: Did not instantiate.");
		runner.assertTrue(domClass.contains(widget.domNode, WIDGET_CLASSNAME1), WIDGET_CLASSNAME1);
		runner.assertTrue(domClass.contains(widget.domNode, WIDGET_CLASSNAME2), WIDGET_CLASSNAME2);
		runner.assertEqual(display ? "" : "none", widget.domNode.style.display, "widget.domNode.style.display");

	};

	if(WIDGET_PROGRAMMATICALLY === 1){
		_createSwapViewProgrammatically("fooPlace", "foo", true, "<h1>SwapView 1</h1>");
		_createSwapViewProgrammatically("barPlace", "bar", false, "<h1>SwapView 2</h1>");
	}else if(WIDGET_PROGRAMMATICALLY === 2){
		_createSwapViewProgrammaticallyWithSourceNodeReference("foo", true);
		_createSwapViewProgrammaticallyWithSourceNodeReference("bar", false);
	}

	runner.register("dui.mobile.test.doh.SwapViewTests", [
		{
			name: "SwapView Verification1",
			timeout: 4000,
			runTest: function(){

				var d = new runner.Deferred();
				setTimeout(d.getTestCallback(function(){
					var widget1 = registry.byId("foo");
					var widget2 = registry.byId("bar");
					_assertCorrectSwapView(widget1, true);
					_assertCorrectSwapView(widget2, false);
					widget1.goTo(1);
				}), timeoutInterval);
				return d;

			}
		},
		{
			name: "SwapView Verification2",
			timeout: 4000,
			runTest: function(){
				var d = new runner.Deferred();
				setTimeout(d.getTestCallback(function(){
					var widget1 = registry.byId("foo");
					var widget2 = registry.byId("bar");
					_assertCorrectSwapView(widget1, false);
					_assertCorrectSwapView(widget2, true);
				}), timeoutInterval);
				return d;
			}
		}
	]);
	runner.run();
});
