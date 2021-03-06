define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"./Container"
], function(declare, domClass, Container){

	// module:
	//		dui/mobile/RoundRect

	return declare("dui.mobile.RoundRect", Container, {
		// summary:
		//		A simple round rectangle container.
		// description:
		//		RoundRect is a simple round rectangle container for any HTML
		//		and/or widgets. You can achieve the same appearance by just
		//		applying the -webkit-border-radius style to a div tag. However,
		//		if you use RoundRect, you can get a round rectangle even on
		//		non-CSS3 browsers such as (older) IE.

		// shadow: [const] Boolean
		//		If true, adds a shadow effect to the container element by adding
		//		the CSS class "duiShadow" to widget's domNode. The default value
		//		is false. Note that changing the value of the property after
		//		the widget creation has no effect.
		shadow: false,

		/* internal properties */	
		
		// baseClass: String
		//		The name of the CSS class of this widget.
		baseClass: "duiRoundRect",

		buildRendering: function(){
			this.inherited(arguments);
			if(this.shadow){
				domClass.add(this.domNode, "duiShadow");
			}
		}
	});
});
