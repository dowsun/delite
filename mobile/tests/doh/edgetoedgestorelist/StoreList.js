require([
	"dojo/parser",
	"dojo/store/Cache",
	"dojo/store/JsonRest",
	"dojo/store/Memory",
	"dojo/store/Observable",
	"dojo/domReady!", // dojo.ready
	"dui/registry",
	"doh/runner",	//doh functions
	"dui/mobile/EdgeToEdgeStoreList",
	"dui/mobile/RoundRectStoreList",
	"dui/mobile/tests/doh/CustomListItem",
	/*"dui/mobile/parser",*/
	"dui/mobile/compat"
], function(parser, Cache, JsonRest, Memory, Observable, ready, registry, runner, EdgeToEdgeStoreList, RoundRectStoreList){

	var CLASS_NAME;
	var DataList;
	var testName;

	if(IsEdgeToEdgeList){
		CLASS_NAME = "duiEdgeToEdgeList";
		DataList = EdgeToEdgeStoreList;
		testName = "dui.mobile.test.doh.EdgeToEdgeStoreList";
	}else{
		CLASS_NAME = "duiRoundRectList";
		DataList = RoundRectStoreList;
		testName = "dui.mobile.test.doh.RoundRectStoreList";
	}

	var static_data2 = [
		{label: "Apple", 	moveTo: "dummy"},
		{label: "Banana", 	moveTo: "dummy"},
		{label: "Cherry", 	moveTo: "dummy"},
		{label: "Grape", 	moveTo: "dummy"},
		{label: "Kiwi", 	moveTo: "dummy"},
		{label: "Lemon", 	moveTo: "dummy"},
		{label: "Melon", 	moveTo: "dummy"},
		{label: "Orange", 	moveTo: "dummy"},
		{label: "Peach", 	moveTo: "dummy"}
	];
	var url = "settings2.json";
	store1 = new JsonRest({idProperty:"label", target: url});
	store2 = Observable(new Memory({idProperty:"label", data: static_data2}));
	store1.__counter = store2.__counter = 1;
	store = store1;

	// switch to the selected store
	switchTo = function(store){
		window.store = store;
		registry.byId("list").setStore(store);
	};
	// add a new item
	add1 = function(){
		store.add({
			label: "New Item "+(store.__counter++),
			icon: "../../images/i-icon-1.png",
			moveTo: "dummy"
		});
	};
	// delete the added item
	delete1 = function(){
		if(store.__counter > 1){
			store.remove("New Item "+(--store.__counter));
		}
	};
	// modify the added item
	var modif_counter = 0;
	modify1 = function(){
		if(store.__counter > 1){
			store.put({
				label: "New Item "+(store.__counter-1),
				rightText: ++modif_counter + " changes"
			});
		}
	};

	ready(function(){
		runner.register(testName, [
			{
				name: DataList + " Verification",
				timeout: 4000,
				runTest: function(){
					var d = new runner.Deferred();
					setTimeout(d.getTestCallback(function(){
						var demoWidget = registry.byId("dui_mobile_ListItem_0");
						// check whether we correctly constructed a custom item
						runner.assertTrue(demoWidget.customProp);
						runner.assertEqual('duiListItem', demoWidget.domNode.className);
						runner.assertEqual('duiImageIcon duiListItemIcon', demoWidget.iconNode.className);
						runner.assertTrue(demoWidget.iconNode.src.search(/i-icon-1.png/i) != -1);
						runner.assertEqual('duiListItemRightIcon', demoWidget.rightIconNode.className);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('Wi-Fi', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);

						demoWidget = registry.byId("dui_mobile_ListItem_3");
						runner.assertEqual('duiListItem duiListItemSelected', demoWidget.domNode.className);
						runner.assertEqual('duiImageIcon duiListItemIcon', demoWidget.iconNode.className);
						runner.assertTrue(demoWidget.iconNode.src.search(/i-icon-4.png/i) != -1);
						runner.assertEqual('duiListItemRightIcon', demoWidget.rightIconNode.className);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('General', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);
						
					}),500);
					return d;
				}
			},
			{
				name: DataList + " Verification2",
				timeout: 10000,
				runTest: function(){
					var d = new doh.Deferred();
					setTimeout(d.getTestCallback(function(){

						switchTo(store2);
						var demoWidget = registry.byId("dui_mobile_ListItem_13");
						runner.assertEqual('duiListItem', demoWidget.domNode.className);
						runner.assertEqual(null, demoWidget.iconNode);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('Grape', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);


					}),2500);
					return d;
				}
			},
			{
				name: DataList + " Verification3",
				timeout: 10000,
				runTest: function(){
					var d = new runner.Deferred();
					setTimeout(d.getTestCallback(function(){

						add1();
						add1();
						add1();
						var demoWidget = registry.byId("dui_mobile_ListItem_19");
						runner.assertEqual('duiListItem', demoWidget.domNode.className);
						runner.assertEqual('duiImageIcon duiListItemIcon', demoWidget.iconNode.className);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('New Item 1', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);

						delete1();
						demoWidget = registry.byId("dui_mobile_ListItem_21");
						runner.assertTrue(!demoWidget);

						demoWidget = registry.byId("dui_mobile_ListItem_20");
						runner.assertEqual('duiListItem', demoWidget.domNode.className);
						runner.assertEqual('duiImageIcon duiListItemIcon', demoWidget.iconNode.className);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('New Item 2', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);

						modify1();
						runner.assertEqual(modif_counter+' changes', demoWidget.get("rightText"), "modify store item");
					}),1500);
					return d;
				}
			},
			{
				name: DataList + " Verification4 (1.8 compat mode)",
				timeout: 10000,
				runTest: function(){
					var d = new runner.Deferred();
					setTimeout(d.getTestCallback(function(){

						// Check compatibility with old-style widgets that define only an onUpdate method and no onAdd method
						// (like in Dojo Mobile 1.8). In that case onUpdate is called instead of onAdd, and put() is not handled.
						var listWidget = registry.byId("list");
						listWidget.onAdd = undefined;
						listWidget.onUpdate = function(/*Object*/item, /*Number*/insertedInto){
							// summary:
							//		Adds a new item or updates an existing item.
							if(insertedInto === this.getChildren().length){
								this.addChild(this.createListItem(item)); // add a new ListItem
							}else{
								this.getChildren()[insertedInto].set(item); // update the existing ListItem
							}
						};

						add1();
						add1();
						add1();
						var demoWidget = registry.byId("dui_mobile_ListItem_22");
						runner.assertEqual('duiListItem', demoWidget.domNode.className);
						runner.assertEqual('duiImageIcon duiListItemIcon', demoWidget.iconNode.className);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('New Item 3', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);

						delete1();
						demoWidget = registry.byId("dui_mobile_ListItem_24");
						runner.assertTrue(!demoWidget);

						demoWidget = registry.byId("dui_mobile_ListItem_23");
						runner.assertEqual('duiListItem', demoWidget.domNode.className);
						runner.assertEqual('duiImageIcon duiListItemIcon', demoWidget.iconNode.className);
						runner.assertEqual('duiListItemLabel', demoWidget.labelNode.className);
						runner.assertEqual('New Item 4', demoWidget.labelNode.innerHTML);
						runner.assertEqual('duiDomButtonArrow duiDomButton', demoWidget.rightIconNode.childNodes[0].className);

						modify1();
						runner.assertEqual("", demoWidget.get("rightText"), "modify store item (noop in compat mode)");
					}),1500);
					return d;
				}
			}
		]);
		runner.run();
	});
});
