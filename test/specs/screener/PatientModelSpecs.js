describe("PatientsList", function () {
    var mainList = null;
	var timeOut = 4000;
    beforeEach(function () {
        if (!mainList) {
            mainList = Ext.create('Screener.store.PatientsList');
        }
        expect(mainList).toBeTruthy();
        waitsFor(

        function () {
            return !mainList.isLoading();
        }, "load never completed", timeOut);
    });


    it(" loads JSON", function () {
        expect(mainList.getData().getAt(0).get('patients')[0].encounters[0].obs[0].links).toEqual("tok21-block-tok");
        expect(mainList.getData().getAt(0).get('patients')[2].encounters[0].obs[1].uuid).toEqual("2283b156-fef7-4887-bea8-957c37a80796");
        expect(mainList.getData().getAt(0).get('patients')[3].display).toEqual("Mr.ShaunMPatient");
        expect(mainList.getData().getAt(0).get('patients')[1].encounters[0].display).toEqual("ADULTINITIAL05/05/2012");
        expect(mainList.getData().getAt(0).get('searchQuery')).toEqual("?encounterType=6a8d146d-ac54-4ab3-a22b-3513f3dac88e");
    });
});
