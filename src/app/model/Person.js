// Let's register this model with our application and it to the models object associated with OpenMRS person
raxaemr.models.Person = Ext.regModel("raxaemr.models.Person", {
    fields: [
        {name: "uuid", type: "string"},
		{name: "display", type: "string"},
        {name: "link", type: "string"},
    ]
});
