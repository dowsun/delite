define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"./Pane",
	"./iconUtils",
	"dojo/sniff"
], function(declare, domConstruct, Pane, iconUtils, has){

	// module:
	//		dui/mobile/_IconItemPane

	return declare("dui.mobile._IconItemPane", Pane, {
		// summary:
		//		An internal widget used for IconContainer.

		// iconPos: String
		//		The default icon position for child items.
		iconPos: "",
		
		// closeIconRole: String
		//		The HTML role of the close icon. Example: "button".
		closeIconRole: "",
		
		// closeIconTitle: String
		//		The title of the close icon.
		closeIconTitle: "",
		
		// label: String
		//		The label of the item.
		label: "",
		
		// closeIcon: String
		//		CSS class for the close icon.
		closeIcon: "duiDomButtonBlueMinus",
		
		// baseClass: String
		//		The name of the CSS class of this widget.
		baseClass: "duiIconItemPane",

		// tabIndex: String
		//		Tab index for the close button, such that users can hit the tab
		//		key to focus on it.
		tabIndex: "0",
		
		// _setTabIndexAttr: [private] String
		//		Sets tabIndex to closeIconNode.
		_setTabIndexAttr: "closeIconNode", 

		buildRendering: function(){
			this.inherited(arguments);
			this.hide();
			this.closeHeaderNode = domConstruct.create("h2", {className:"duiIconItemPaneHeading"}, this.domNode);
			this.closeIconNode = domConstruct.create("div", {
				className: "duiIconItemPaneIcon",
				role: this.closeIconRole,
				title: this.closeIconTitle
			}, this.closeHeaderNode);
			this.labelNode = domConstruct.create("span", {className:"duiIconItemPaneTitle"}, this.closeHeaderNode);
			this.containerNode = domConstruct.create("div", {className:"duiContent"}, this.domNode);
		},

		show: function(){
			// summary:
			//		Shows the widget.
			this.domNode.style.display = "";
		},

		hide: function(){
			// summary:
			//		Hides the widget.
			this.domNode.style.display = "none";
		},

		isOpen: function(){
			// summary:
			//		Tests whether the widget is open.
			return this.domNode.style.display !== "none";
		},

		_setLabelAttr: function(/*String*/text){
			// tags:
			//		private
			this._set("label", text);
			this.labelNode.innerHTML = text;
		},

		_setCloseIconAttr: function(icon){
			// tags:
			//		private
			this._set("closeIcon", icon);
			this.closeIconNode = iconUtils.setIcon(icon, this.iconPos, this.closeIconNode, null, this.closeHeaderNode);

			if(has("windows-theme") && this.closeIconTitle !== ""){
				this.closeButtonNode = domConstruct.create("span", {className:"duiButton duiCloseButton", innerHTML:this.closeIconTitle,
					style: {display: "none"}}, this.closeIconNode);
			}
		}
	});
});
