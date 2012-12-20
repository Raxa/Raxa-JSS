/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var c; // a global variable keeping the id of the patient entered in by the user in main.js.Used to get his old bills.
var bal; // cumulative balance remaining to be paid
var global_amount = 0; // total amount = current amount+previous balance
var tot1 = 0; // current total of the bill
var global_row;
var BILL_PAGES = { // not used
    MAIN: {
        value: 0,
        name: "main"
    },
    CURRENT_BILL: {
        value: 1,
        name: "currentBill_main"
    }
    /* REPORTS: {
        value: 2,
        name: "reports"
    },
    DRUGGROUPS: {
        value: 3,
        name: "dr ugGroups"
    },
    ALLSTOCK: {
        value: 4,
        name: "allStock"
    },
    REQUISITION: {
        value: 5,
        name: "requisition"
    },
    GOODRECEIPT: {
        value: 6,
        name: "goodReceipt"
    }*/
};

Ext.define("RaxaEmr.billing.controller.billings", {
    extend: 'Ext.app.Controller',
    views: ['RaxaEmr.billing.view.EditItem', 'RaxaEmr.billing.view.Viewport', 'RaxaEmr.billing.view.currentbill', 'RaxaEmr.billing.view.main', 'RaxaEmr.billing.view.discount', 'RaxaEmr.billing.view.previousBills', 'RaxaEmr.billing.view.currentBill_main', 'RaxaEmr.billing.view.print_Final', 'RaxaEmr.billing.view.searchPatient', 'RaxaEmr.billing.view.previousShow', 'RaxaEmr.billing.view.AddItem'],
    stores: ['RaxaEmr.billing.store.itemS', 'RaxaEmr.billing.store.billingstore', 'RaxaEmr.billing.store.itemStore', 'RaxaEmr.billing.store.billingItemstore', 'RaxaEmr.billing.store.previousshow'],

    init: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');

        this.control({

            "main button[action=findPatient]": {


                click: this.getbill // called when Find Patient button is clicked by the user after entering Patient Id(This patient Id is not the raxa id, but the PatientId in the Patient table)


            },
            'currentBill_main': {


                itemEdit: this.onItemEdit,
                // called when an item needs to be editted in CurrentBill_main
                itemDelete: this.onItemDelete // called when an item needs to be deleted in currentBill_main

            },

            "EditItem button[action=editItem]": {


                click: this.editItem // called when Edit button in EditItem.js is clicked. Used to store the new values of the item.
            },
            "EditItem button[action=cancelEdit]": {
                click: this.back2 // called when cancel button is clicked in EditItem.js.Just returns to CurrentBill_main.js
            },

            "currentBill_main button[action=findPatient1]": {


                click: this.displayForm // called when clicked on AddItem button in currentBill_main.js.Just redirects to AddItem.js
            },
            "currentBill_main button[action=saveBill]": {


                click: this.postbill // called when clicked on Save and PrintBill.Saves the Bill and opens print Screen.
            },
            "currentBill_main button[action=payBill]": {


                click: this.payBill // called when Clicked on PayBill button in currentMain.js.Clicked when payment is to be done, used to calculate the balance amount.
            },
            "previousBills button[action=findPatient2]": {


                click: this.displayForm2 // Called when clicked on Create New Bill button in previousBills.js
            },


            "previousShow button[action=back]": {

                //click: this.displayForm
                click: this.back3 //  called on clicking the back button in previousShow.js, returns to previousBills.js
            },

            "AddItem button[action=addItem]": {

                //click: this.displayForm
                //  click: this.postbill
                click: this.addItem // called when ADD button in AddItem.js is Clicked.Used to add the values of teh Item in the grid in currentBill_main.js
            },
            "AddItem button[action=cancel]": {
                click: this.back1 // called when cancel button is clicked in AddItem.js.Just returns to CurrentBill_main.js
            },


            'previousBills': {


                showBill: this.onShowBill // called when Show Icon in front of a grid Item in PreviousBills.js is clicked. Redirects to previousShow.js 

            }



        })
    },
    /*Called when clicked on Save and Print Bill in currentBill.js 
     *used to save the bill by the post call using billingStore.js
     *All the Items in a Bill are in itemStore.js in Store
     *This store is associated with the Grid in currentBill_main.js
     *For the time being providerId is set to static value 1.
     *Saving bill using Post call is followed by printing of the bill
     */

    postbill: function() {


        var adjustArray = new Array(); // not used


        var itemArray = new Array(); // array containing the bill items
        var billitem = Ext.getStore('RaxaEmr.billing.store.itemStore').data;


        /* for (var i1 = 0; i1 < billitem.items.length; i1++) {
            adjustArray.push({
    discount : billitem.items[i1].data.discount,
        discountreason: billitem.items[i1].data.discountReason
});
            
        }
        */
        for(var i = 0; i < billitem.items.length; i++) {


            // putting values in the itemArray from data stored in itemStore.js
            itemArray.push({
                name: billitem.items[i].data.item_name,


                description: billitem.items[i].data.category,
                quantity: billitem.items[i].data.quantity,
                value: billitem.items[i].data.price,
                discount: billitem.items[i].data.discount,
                discountReason: billitem.items[i].data.discountReason
                // adjusts : adjustArray[i]
            });

        }
        var stat; // used to set the status of the bill depending the amount paid by the Patient
        var tot1 = Ext.getCmp('current_amount').getValue();
        console.log("j" + tot1);
        if(bal == 0) {
            stat = 'Paid'; // if bill is fully paid
        } else {
            stat = 'Pending'; // if bill is partially paid
        }

        //  var balance = Ext.getComp('balance1').getValue();
        console.log("balance is " + bal);
        // creating model and putting values in it. 
        var newDrug = Ext.create('RaxaEmr.billing.model.billModel', {
            status: stat,
            name: 'Successful',
            balance: bal,

            patientId: c,
            description: 'RAXA Bill',
            providerId: '1',
            // static value for the tiem being.
            billItems: itemArray,
            totalAmount: tot1

        });


        var store = this.getStore('billingstore');
        console.log(store.getCount());
        store.add(newDrug); // post call in the store(billingstore)
        store.sync();


        this.printbill(); // opening print screen after saving the bill.



    },
    /*
     *Called when Find patient button is clicked in main.js
     *Retrieves all the previous bills of that patient using the id entered by a get call and filling the result in the grid in PreviousBills.js
     */
    getbill: function() {

        c = Ext.getCmp('pid').getValue(); // extracting the id of the patient

        url = 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billing' + '?q=' + c; // get call tgo retrive all the previous bills of the patient.
        console.log(url);
        // store = Ext.create('RaxaEmr.billing.store.billingstore');
        //storing results in the store. 
        Ext.getStore('RaxaEmr.billing.store.billingstore').setProxy({
            type: 'rest',

            url: url,
            headers: Util.getBasicAuthHeaders(),

            reader: {
                type: 'json',
                root: 'results'
            },
            writer: {
                type: 'json'
            },
            afterRequest: function(request, success) {
                console.log("success");
                var number = Ext.getStore('RaxaEmr.billing.store.billingstore');
                console.log(number.getCount());
                // calculating the previous remaing balance bill of the patient.
                //  Last Bill has the cumulative balance hence only using the latest bill's balance'
                for(var i = number.getCount() - 1; i < number.getCount(); i++) {
                    if(number.getAt(i).getData().status == "Pending") {
                        global_amount = global_amount + number.getAt(i).getData().balance;

                    }
                }
                console.log("Amount is " + global_amount);

                var prev = Ext.getCmp('previousamount'); // setting the value of the previous unpaid amount
                prev.setValue(global_amount);


            }
        });


        var store = this.getStore('billingstore');


        store.sync();
        store.load({
            scope: this,
            callback: function() {
                // associating the store with the grid to show the previous bills information in the grid.            
                var x1 = Ext.getCmp('gridPrevious').getStore();

                console.log("hye" + x1.getCount());
                x1.load();
                x1.sync();
                console.log("hye" + x1.getCount());

                var l = Ext.getCmp('mainarea').getLayout();

                l.setActiveItem(4);
                //  var global_amount=0;
                var number = Ext.getStore('RaxaEmr.billing.store.billingstore');


                store.sync();
                console.log("The count of store is" + store.getCount());


            }
        }



        );


    },
    /*
     *Called when add item button is clicked in AddItem.js
     * calculates the total of that particular item
     *Saves the item in the itemStore.js and item is associated with a grid in currentBill_main.
     */
    addItem: function() {


        //  Ext.Msg.alert("Item", "In add item form");
        // extracting the values entered.
        var obj1 = Ext.getCmp('item_name1');
        var itemName = obj1.getValue();
        var obj2 = Ext.getCmp('category1');
        var itemCategory = obj2.getValue();
        var obj3 = Ext.getCmp('quantity1');
        var itemQuantity = obj3.getValue();
        var obj4 = Ext.getCmp('price1');
        var itemPrice = obj4.getValue();
        var obj5 = Ext.getCmp('discount1');
        var discount = obj5.getValue();
        var obj6 = Ext.getCmp('discountReason1');
        var discountReason = obj6.getValue();
        console.log(itemName);
        console.log(itemCategory);
        console.log(itemQuantity);
        console.log(itemPrice);
        // few checks on the input values.
        if(itemName == '') {
            Ext.Msg.alert("Alert", "field misssing");
            var l = Ext.getCmp('mainarea').getLayout();
            //   console.log('Initialized Users! This happens before the Application launch function is called');
            l.setActiveItem(7);

        } else if(itemQuantity == 0) {
            Ext.Msg.alert("Alert", "Quantity can't be 0");
            var l = Ext.getCmp('mainarea').getLayout();
            //   console.log('Initialized Users! This happens before the Application launch function is called');
            l.setActiveItem(7);
        } else if(itemPrice == 0) {
            Ext.Msg.alert("Alert", "Price can't be 0");
            var l = Ext.getCmp('mainarea').getLayout();
            //   console.log('Initialized Users! This happens before the Application launch function is called');
            l.setActiveItem(7);
        } else {
            var inter = itemQuantity * itemPrice;
            var total = inter - (discount / 100) * inter; // calculating total value of the item added.
            var display = "Total price of the item is:" + total;
            // Ext.Msg.alert("Alert", display);
            //Ext.MessageBox.prompt("Confirm",display);
            //  Ext.Msg.confirm("Confirm", display);

            // adding item in the itemStore.js
            var itemStore = this.getStore('RaxaEmr.billing.store.itemStore');
            itemStore.add({
                item_name: itemName,
                category: itemCategory,
                quantity: itemQuantity,
                price: itemPrice,
                discount: discount,
                discountReason: discountReason,
                total: total
            })[0];

            itemStore.sync();
            itemStore.load({
                scope: this,
                callback: function() {
                    //  console.log(itemStore.getCount());
                    //console.log(store.getAt(0).getData().status );
                    //    console.log(store);
                    // adding the item in the grid(gridCurrentBill) in currentBill_main using itemStore.
                    var x2 = Ext.getCmp('gridCurrentBill').getStore();

                    // console.log(x2);
                    x2.load();
                    x2.sync();
                    //  console.log("hye"+x1.getCount());
                    Ext.Msg.alert("Confirm", display, function(btn) {
                        if(btn == "Yes") {
                            alert("abort");
                        } else {
                            var l = Ext.getCmp('mainarea').getLayout();
                            //   console.log('Initialized Users! This happens before the Application launch function is called');
                            l.setActiveItem(1);
                        }
                    });

                    console.log(itemStore.getCount());
                }
            }

            );
            itemStore.sync();
            var itemStore1 = this.getStore('RaxaEmr.billing.store.itemStore');
            var amount = Ext.getCmp('current_amount');
            var prev_amount = Ext.getCmp('prev_amount');
            var tot_amount = Ext.getCmp('total_amount');
            var paid = Ext.getCmp('amount_paid');
            var pay = paid.getValue();
            var balance = Ext.getCmp('balance1');
            var prev = global_amount;
            var total1;
            var tot = 0;
            //  updating the total current amount, total amount= current+previous, balance.
            for(var j = 0; j < itemStore1.getCount(); j++) {
                // order[j].concept = concept[j].getAt(0).getData().uuid;
                tot = tot + itemStore1.getAt(j).getData().total;
            }
            total1 = tot + prev;
            bal = total1 - pay;
            amount.setValue(tot);
            prev_amount.setValue(prev);
            tot_amount.setValue(total1);
            balance.setValue(bal);



            //  
            /* var x2  = Ext.getCmp('gridCurrentBill').getStore();
       // console.log(x2);
          x2.load();
          x2.sync();
                //  console.log("hye"+x1.getCount());
             
                //  console.log("hye"+x1.getCount());
                 var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
           console.log(itemStore.getCount());*/

        }

    },

    // unused
    displayForm1: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');

        var l = Ext.getCmp('mainarea').getLayout();
        //   console.log('Initialized Users! This happens before the Application launch function is called');

        l.setActiveItem(6);
        //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        // l1.setActiveItem(1);
    },
    /*
     *called when cancel button is clicked in AddItem.js.Just returns to CurrentBill_main.js
     */
    back1: function() {

        var x2 = Ext.getCmp('gridCurrentBill').getStore();

        // console.log(x2);
        x2.load();
        x2.sync();
        var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
        var amount = Ext.getCmp('current_amount');
        var prev_amount = Ext.getCmp('prev_amount');
        var tot_amount = Ext.getCmp('total_amount');
        var paid = Ext.getCmp('amount_paid');
        var pay = paid.getValue();
        var balance = Ext.getCmp('balance1');
        var prev = global_amount;
        var total;
        var tot = 0;
        // calculatin the current bill, total bill and balance
        for(var j = 0; j < itemStore1.getCount(); j++) {
            // order[j].concept = concept[j].getAt(0).getData().uuid;
            tot = tot + itemStore1.getAt(j).getData().total;
        }
        total = tot + prev;
        bal = total - pay;
        amount.setValue(tot);
        prev_amount.setValue(prev);
        tot_amount.setValue(total);
        balance.setValue(bal);

        //  console.log("hye"+x1.getCount());
        var l = Ext.getCmp('mainarea').getLayout();
        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1); // redirecting to currentBill_main.js
    },
    /*
     *Called when clicked on Create New Bill button in previousBills.js
     *Redircts to currentBill_main.
     */
    displayForm2: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');



        var url2;
        // get call to retrieve the details of that particular bill using the billId 
        // bill id extracted using the index of the row on which icon was clicked.
        url2 = 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billing' + '?v=' + c;
        console.log("the url is " + url2);

        var itemStore1 = this.getStore('RaxaEmr.billing.store.itemStore');
        var x2 = Ext.getCmp('gridCurrentBill').getStore();

        // console.log(x2);itemStore1.clearData();
        itemStore1.sync();
        x2.load();

        x2.sync();
        //  console.log(evtData.rowIndex);
        var i;
        // removing all th old data from the grid and localstorage in itemStore.js
        var count = itemStore1.getCount();
        for(i = 0; i < count; i++) {
            console.log(i);


            var record1 = itemStore1.getAt(0);

            itemStore1.remove(record1);

            itemStore1.sync();
            x2.sync();
        }



        Ext.getStore('RaxaEmr.billing.store.itemS').setProxy({
            type: 'rest',
            //getting all patients who have prescriptions that have not been filled
            url: url2,
            headers: Util.getBasicAuthHeaders(),

            reader: {
                type: 'json',
                root: 'results'
            },
            writer: {
                type: 'json'
            },
            afterRequest: function(request, success) {
                console.log("i was success");
                var store = Ext.getStore('RaxaEmr.billing.store.itemS');
                console.log(store.getCount());


                var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
                var j = 0;
                for(j = 0; j < store.getCount(); j++) {

                    itemStore1.add({
                        item_name: store.getAt(j).getData().item_name,
                        category: store.getAt(j).getData().category,
                        quantity: store.getAt(j).getData().quantity,
                        price: 0,
                        discount: 0,
                        discountReason: store.getAt(j).getData().discountreason,
                        total: 0
                    })[0];
                }

                itemStore1.load({
                    scope: this,
                    callback: function() {
                        //  console.log(itemStore.getCount());
                        //console.log(store.getAt(0).getData().status );
                        //    console.log(store);
                        // adding the item in the grid(gridCurrentBill) in currentBill_main using itemStore.
                        var x2 = Ext.getCmp('gridCurrentBill').getStore();

                        // console.log(x2);
                        x2.load();
                        x2.sync();
                        //  console.log("hye"+x1.getCount());

                        console.log(itemStore1.getCount());
                    }
                }

                );
                //    itemStore1.sync();
                var amount = Ext.getCmp('current_amount');
                var prev_amount = Ext.getCmp('prev_amount');
                var tot_amount = Ext.getCmp('total_amount');
                var balance = Ext.getCmp('balance1');
                var paid = Ext.getCmp('amount_paid');
                var pay = paid.getValue();
                var prev = global_amount;
                var total;
                var tot = 0;

                total = tot + prev;
                bal = total - pay;
                amount.setValue(tot);
                prev_amount.setValue(prev);
                tot_amount.setValue(total);
                balance.setValue(bal);
                var l = Ext.getCmp('mainarea').getLayout();
                //   console.log('Initialized Users! This happens before the Application launch function is called');

                l.setActiveItem(1);
            }


        });

        var itemStore1 = this.getStore('RaxaEmr.billing.store.itemS');
        itemStore1.load();

        itemStore1.sync();

        //  
        /*    var itemStore1=this.getStore('RaxaEmr.billing.store.itemStore');
        itemStore1.add({
            item_name: store.getAt(0).getData().item_name,
            category : store.getAt(0).getData().category,
            quantity: store.getAt(0).getData().quantity,
            price:store.getAt(0).getData().price,
            discount:store.getAt(0).getData().discount,
            discountReason:store.getAt(0).getData().discountreason,
            total:1
        })[0];
      
        itemStore1.sync();   
        itemStore1.load({
            scope: this ,
            callback : function(){
                //  console.log(itemStore.getCount());

                //console.log(store.getAt(0).getData().status );

                //    console.log(store);
                // adding the item in the grid(gridCurrentBill) in currentBill_main using itemStore.
                var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
                // console.log(x2);
                x2.load();
                x2.sync();
                //  console.log("hye"+x1.getCount());
             
                
                console.log(itemStore1.getCount());
            }
        }
         
        );*/
        //    itemStore1.sync();



        /* itemStore1.clearData();
                           itemStore1.sync();
                           x2.sync();*/


    },
    /*
     * For printing the bill, called by saveBill function after saving the bill to open printing bill screen
     *
     */
    printbill: function() {
        var x = this.getStore('RaxaEmr.billing.store.itemStore');
        var printItems = new Array(); // array to store all the items of a bill
        for(var i = 0; i < x.getCount(); i++) {
            printItems[i] = new Array(7); // array holdng indiviual values in the item
            printItems[i][0] = i + 1;
            printItems[i][1] = x.getAt(i).getData().item_name;
            printItems[i][2] = x.getAt(i).getData().category;
            printItems[i][3] = x.getAt(i).getData().quantity;
            printItems[i][4] = x.getAt(i).getData().price;
            printItems[i][5] = x.getAt(i).getData().discount;
            printItems[i][6] = x.getAt(i).getData().total;


        }

        var amount = Ext.getCmp('total_amount').getValue();
        var cur = Ext.getCmp('current_amount').getValue();
        var prev = Ext.getCmp('prev_amount').getValue();
        var paid = Ext.getCmp('amount_paid').getValue();
        tot1 = cur;

        console.log(cur + " " + prev + " " + amount + " " + paid + " " + bal);

        localStorage.setItem('rows', JSON.stringify(x.getCount()));
        localStorage.setItem('printItems', JSON.stringify(printItems));
        localStorage.setItem('amount', JSON.stringify(amount));

        localStorage.setItem('cur', JSON.stringify(cur));
        localStorage.setItem('prev', JSON.stringify(prev));
        localStorage.setItem('paid', JSON.stringify(paid));
        localStorage.setItem('balance', JSON.stringify(bal));

        // opening bill.html page through which bill can be printed.   
        popupWindow = window.open('app/bill.html', 'popUpWindow', 'height=500,width=1100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    },
    /*
     *called when add item button in currentBill_main.js is clicked
     *redircts to AddItem.js
     */
    displayForm: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');
        // setting the initial values in AddItem.js
        var name = Ext.getCmp('item_name1');

        name.setValue("");
        var category = Ext.getCmp('category1');
        category.setValue("Medicine");
        var quant = Ext.getCmp('quantity1');
        quant.setValue(0);
        var price = Ext.getCmp('price1');
        price.setValue(0);
        var disc = Ext.getCmp('discount1');
        disc.setValue(0);
        var discReason = Ext.getCmp('discountReason1');
        discReason.setValue("");
        var l = Ext.getCmp('mainarea').getLayout();


        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7); // redirction to AddItem.js
        //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        // l1.setActiveItem(1);
    },
    /*
     *Called when  edit icon is clicked on particular item in grid in currentBill_main.js
     *Edits the item in the itemStore.js and item is also editted in the grid in currentBill_main.
     */
    editItem: function() {
        //gets all the values after editting
        var obj1 = Ext.getCmp('item_name2');
        var itemName = obj1.getValue();
        var obj2 = Ext.getCmp('category2');
        var itemCategory = obj2.getValue();
        var obj3 = Ext.getCmp('quantity2');
        var itemQuantity = obj3.getValue();
        var obj4 = Ext.getCmp('price2');
        var itemPrice = obj4.getValue();
        var obj5 = Ext.getCmp('discount2');
        var discount = obj5.getValue();
        var obj6 = Ext.getCmp('discountReason2');
        var discountReason = obj6.getValue();
        var obj7 = Ext.getCmp('otherDiscount2');
        var otherDiscount = obj7.getValue();
        // checks for proper value inputs
        if(discountReason == "Other") {
            discountReason = otherDiscount;
        }
        if(itemName == '') {
            Ext.Msg.alert("Alert", "field misssing");
            var l = Ext.getCmp('mainarea').getLayout();
            //   console.log('Initialized Users! This happens before the Application launch function is called');
            l.setActiveItem(8);

        } else if(itemQuantity == 0) {
            Ext.Msg.alert("Alert", "Quantity can't be 0");
            var l = Ext.getCmp('mainarea').getLayout();
            //   console.log('Initialized Users! This happens before the Application launch function is called');
            l.setActiveItem(8);
        } else if(itemPrice == 0) {
            Ext.Msg.alert("Alert", "Price can't be 0");
            var l = Ext.getCmp('mainarea').getLayout();
            //   console.log('Initialized Users! This happens before the Application launch function is called');
            l.setActiveItem(8);
        } else {
            var inter = itemQuantity * itemPrice;
            var total = inter - (discount / 100) * inter;
            var display = "Total price of the item is:" + total;
            var itemStore = this.getStore('RaxaEmr.billing.store.itemStore');
            // sets the record that was clicked to be editted to new values. 
            var record = itemStore.getAt(global_row);
            record.set("item_name", itemName);
            record.set("quantity", itemQuantity);
            record.set("category", itemCategory);
            record.set("price", itemPrice);
            record.set("discount", discount);
            record.set("discountReason", discountReason);
            record.set("total", total);

            //   syncing the store
            itemStore.sync();
            itemStore.load({
                scope: this,
                callback: function() {
                    //  console.log(itemStore.getCount());
                    //console.log(store.getAt(0).getData().status );
                    //    console.log(store);
                    var x2 = Ext.getCmp('gridCurrentBill').getStore();

                    // console.log(x2);
                    x2.load();
                    x2.sync();
                    //  console.log("hye"+x1.getCount());
                    Ext.Msg.alert("Confirm", display, function(btn) {
                        if(btn == "Yes") {
                            alert("abort");
                        } else {
                            var l = Ext.getCmp('mainarea').getLayout();
                            //   console.log('Initialized Users! This happens before the Application launch function is called');
                            l.setActiveItem(1);
                        }
                    });

                    console.log(itemStore.getCount());
                }
            }

            );
            itemStore.sync();
            var itemStore1 = this.getStore('RaxaEmr.billing.store.itemStore');
            // calculatin current total amount, total amd balance amounts.
            var amount = Ext.getCmp('current_amount');
            var prev_amount = Ext.getCmp('prev_amount');
            var tot_amount = Ext.getCmp('total_amount');
            var paid = Ext.getCmp('amount_paid');
            var pay = paid.getValue();
            var balance = Ext.getCmp('balance1');
            var prev = global_amount;
            var total;
            //  var bal;
            var tot = 0;
            for(var j = 0; j < itemStore1.getCount(); j++) {
                // order[j].concept = concept[j].getAt(0).getData().uuid;
                tot = tot + itemStore1.getAt(j).getData().total;
            }
            total = tot + prev;
            bal = total - pay;
            amount.setValue(tot);
            prev_amount.setValue(prev);
            tot_amount.setValue(total);
            balance.setValue(bal);

            console.log("total is " + tot1);
            tot1 = total - bal;

        }

    },
    /*
     *called when cancel button is clicked in EditItem.js.Just returns to CurrentBill_main.js
     *redirects to currentBill_main.js
     */
    back2: function() {

        var x2 = Ext.getCmp('gridCurrentBill').getStore();

        // console.log(x2);
        x2.load();
        x2.sync();
        var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
        var amount = Ext.getCmp('current_amount');
        var prev_amount = Ext.getCmp('prev_amount');
        var tot_amount = Ext.getCmp('total_amount');
        var paid = Ext.getCmp('amount_paid');
        var pay = paid.getValue();
        var balance = Ext.getCmp('balance1');
        var prev = global_amount;
        var total;
        var tot = 0;
        // var bal;
        for(var j = 0; j < itemStore1.getCount(); j++) {
            // order[j].concept = concept[j].getAt(0).getData().uuid;
            tot = tot + itemStore1.getAt(j).getData().total;
        }
        total = tot + prev;
        bal = total - pay;
        amount.setValue(tot);
        prev_amount.setValue(prev);
        tot_amount.setValue(total);
        balance.setValue(bal);

        //  console.log("hye"+x1.getCount());
        var l = Ext.getCmp('mainarea').getLayout();
        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1); // redirecting to currentBill_main.js
    },
    /*
     *called when back button in previousShow is clicked.
     *redirects to previousBills .js
     */
    back3: function() {
        var l = Ext.getCmp('mainarea').getLayout();

        console.log("back called");
        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(4);
    },
    /*
     *called when addItem button in currentBill_main is clicked
     *Redirects to AddItem.js
     */
    displayForm: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');
        var name = Ext.getCmp('item_name1');

        name.setValue("");
        var category = Ext.getCmp('category1');
        category.setValue("Medicine");
        var quant = Ext.getCmp('quantity1');
        quant.setValue(1);
        var price = Ext.getCmp('price1');
        price.setValue(0);
        var disc = Ext.getCmp('discount1');
        disc.setValue(0);
        var discReason = Ext.getCmp('discountReason1');
        discReason.setValue("RSBY");
        var otherDiscount = Ext.getCmp('otherDiscount1');
        otherDiscount.setValue("");
        var l = Ext.getCmp('mainarea').getLayout();


        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7); // redirects to AddItem.js
        //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        // l1.setActiveItem(1);
    },
    /*
     *Called when Pay Bill button in currentBill_mai.js is clicked
     *Calculates the balance bill = total-paid.
     *
     */
    payBill: function() {

        var x2 = Ext.getCmp('gridCurrentBill').getStore();

        // console.log(x2);
        x2.load();
        x2.sync();
        var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
        var amount = Ext.getCmp('current_amount');
        var prev_amount = Ext.getCmp('prev_amount');
        var tot_amount = Ext.getCmp('total_amount');
        var paid = Ext.getCmp('amount_paid');
        var pay = paid.getValue();
        var balance = Ext.getCmp('balance1');
        var prev = global_amount;
        var total;
        var tot = 0;

        for(var j = 0; j < itemStore1.getCount(); j++) {
            // order[j].concept = concept[j].getAt(0).getData().uuid;
            tot = tot + itemStore1.getAt(j).getData().total;
        }
        total = tot + prev; // total bill is calculated
        // checking for valid payment
        if(total - pay <= -1) {
            pay = 0;
            paid.setValue(0);
            Ext.Msg.alert("alert", "Too much being paid");
        }
        bal = total - pay; // balance is calculated
        amount.setValue(tot);
        prev_amount.setValue(prev);
        tot_amount.setValue(total);
        balance.setValue(bal);

        //  console.log("hye"+x1.getCount());
        var l = Ext.getCmp('mainarea').getLayout();
        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1); // redirected to currentBill.js
    },


    setLayo: function() {
        var l = Ext.getCmp('mainarea').getLayout();

        console.log("Hello");
        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
    },

    /*
     * called when edit icon is pressed on a item in grid in currentBill_main.
     * redirects to EditBill.js
     */
    onItemEdit: function(evtData) {
        var store = this.getStore('RaxaEmr.billing.store.itemStore');
        /* var record = store.getAt(evtData.rowIndex);
        if(record) {
            this.rowEditor.startEdit(record, this.drugsEditor.columns[evtData.colIndex]);
        }*/
        console.log("-------------The eventdATA IS:" + evtData.rowIndex);
        global_row = evtData.rowIndex;
        // setting the values of the fields according to the row on which edit icon was clicked
        var name = Ext.getCmp('item_name2');

        name.setValue(store.getAt(evtData.rowIndex).getData().item_name);
        var category = Ext.getCmp('category2');
        category.setValue(store.getAt(evtData.rowIndex).getData().category);
        var quant = Ext.getCmp('quantity2');
        quant.setValue(store.getAt(evtData.rowIndex).getData().quantity);
        var price = Ext.getCmp('price2');
        price.setValue(store.getAt(evtData.rowIndex).getData().price);
        var disc = Ext.getCmp('discount2');
        disc.setValue(store.getAt(evtData.rowIndex).getData().discount);
        var discReason = Ext.getCmp('discountReason2');
        discReason.setValue(store.getAt(evtData.rowIndex).getData().discountReason);
        var otherDiscount = Ext.getCmp('otherDiscount2');
        otherDiscount.setValue("");


        var l = Ext.getCmp('mainarea').getLayout();
        //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(8); // redirecting to EditItem.js
    },
    /*
     *called when delete icon of a row in the grid in CurrentBill_main.js is clicked
     *deletes the item from the store and grid and recalcultes the amounts.
     */
    onItemDelete: function(evtData) {
        var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
        //  console.log(evtData.rowIndex);
        var rowIndex = evtData.rowIndex;
        var record = itemStore1.getAt(rowIndex);
        if(record) {
            itemStore1.remove(record);
            itemStore1.sync();


            var amount = Ext.getCmp('current_amount');
            var prev_amount = Ext.getCmp('prev_amount');
            var tot_amount = Ext.getCmp('total_amount');
            var paid = Ext.getCmp('amount_paid');
            var pay = paid.getValue();
            var balance = Ext.getCmp('balance1');
            var prev = prev_amount.getValue();
            var prev1 = parseInt(prev);
            var total;


            var tot = 0;
            for(var j = 0; j < itemStore1.getCount(); j++) {
                // order[j].concept = concept[j].getAt(0).getData().uuid;
                tot = tot + itemStore1.getAt(j).getData().total;
            }
            amount.setValue(tot);
            total = tot + prev1;
            bal = total - pay;
            amount.setValue(tot);

            tot_amount.setValue(total);
            balance.setValue(bal);
        }
    },

    /*
     * called when show bill icon in previousBills.js is clicked
     * retrieves all details of a particular bill and dispalys it.
     */
    onShowBill: function(evtData) {
        var billStore = this.getStore('RaxaEmr.billing.store.billingstore');

        var billId = billStore.getAt(evtData.rowIndex).getData().billId; // use this for get request
        // make get call here using billId
        console.log(billId);


        var url1;
        // get call to retrieve the details of that particular bill using the billId 
        // bill id extracted using the index of the row on which icon was clicked.
        url1 = 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billingitem' + '?q=' + billId;
        console.log(url1);

        // storing the bills in the previousshow Store.
        Ext.getStore('RaxaEmr.billing.store.previousshow').setProxy({
            type: 'rest',
            //getting all patients who have prescriptions that have not been filled
            url: url1,
            headers: Util.getBasicAuthHeaders(),

            reader: {
                type: 'json',
                root: 'results'
            },
            writer: {
                type: 'json'
            },
            afterRequest: function(request, success) {
                console.log("success");
                var number = Ext.getStore('RaxaEmr.billing.store.previousshow');
                console.log(number.getCount());
            }
        });


        var store = this.getStore('RaxaEmr.billing.store.previousshow');


        store.sync();
        store.load({
            scope: this,
            callback: function() {

                var x1 = Ext.getCmp('newGrid').getStore();

                console.log("hye" + x1.getCount());
                x1.load();
                x1.sync();
                console.log("hye" + x1.getCount());

                var l = Ext.getCmp('mainarea').getLayout();

                l.setActiveItem(9); // redirects tp previousShow.js to show the details of that particular bill.
                //  var global_amount=0;

                store.sync();
                console.log("The count of store is" + store.getCount());


            }
        }



        );


        var x6 = Ext.getCmp('total_amount3');



        var x7 = Ext.getCmp('balance3');

        x6.setValue(billStore.getAt(evtData.rowIndex).getData().totalAmount);
        x7.setValue(billStore.getAt(evtData.rowIndex).getData().balance);
    }

});