module("smart_med_display test", { 
	setup: function(){
        S.open("//smart_med_display/smart_med_display.html");
	}
})

test("Copy Test", function(){
	S("h1").text(function(val){
		equals(val, "Welcome to JavaScriptMVC 3.0!","welcome text");
	})
})