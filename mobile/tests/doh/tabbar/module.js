define(["doh/main", "require", "dojo/sniff"], function(doh, require, has){

	doh.registerUrl("dui.mobile.tests.doh.TabBar", require.toUrl("./TabBar.html"),999999);
	doh.registerUrl("dui.mobile.tests.doh.TabBar", require.toUrl("./TabBar_Programmatic.html"),999999);
	if(!(has("ie") < 10)){
		doh.registerUrl("dui.mobile.tests.doh.TabBar", require.toUrl("./TabBarTests.html"),999999);
	}
});



