module("Model: SmartMedDisplay.Models.Med")

test("findAll", function(){
	stop(2000);
	SmartMedDisplay.Models.Med.findAll({}, function(meds){
		start()
		ok(meds)
        ok(meds.length)
        ok(meds[0].name)
        ok(meds[0].description)
	});
	
})

test("create", function(){
	stop(2000);
	new SmartMedDisplay.Models.Med({name: "dry cleaning", description: "take to street corner"}).save(function(med){
		start();
		ok(med);
        ok(med.id);
        equals(med.name,"dry cleaning")
        med.destroy()
	})
})
test("update" , function(){
	stop();
	new SmartMedDisplay.Models.Med({name: "cook dinner", description: "chicken"}).
            save(function(med){
            	equals(med.description,"chicken");
        		med.update({description: "steak"},function(med){
        			start()
        			equals(med.description,"steak");
        			med.destroy();
        		})
            })

});
test("destroy", function(){
	stop(2000);
	new SmartMedDisplay.Models.Med({name: "mow grass", description: "use riding mower"}).
            destroy(function(med){
            	start();
            	ok( true ,"Destroy called" )
            })
})