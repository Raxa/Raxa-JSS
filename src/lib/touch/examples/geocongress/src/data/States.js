// Congressional District Info
// http://en.wikipedia.org/wiki/List_of_United_States_congressional_districts
// At-large States which need to be passed district: 0
// ['AK','DE','MO','ND','SD','VT','WY']
Geo.states = [{
    state: "Alabama",
    abbr: "AL",
    maxDistrict: 10
},{
    state: "Alaska",
    abbr: "AK",
    maxDistrict: 0
},{
    state: "Arizona",
    abbr: "AZ",
    maxDistrict: 8
},{
    state: "Arkansas",
    abbr: "AR",
    maxDistrict: 7
},{
    state: "California",
    abbr: "CA",
    maxDistrict: 53
},{
    state: "Colorado",
    abbr: "CO",
    maxDistrict: 7
},{
    state: "Connecticut",
    abbr: "CT",
    maxDistrict: 6
},{
    state: "Delaware",
    abbr: "DE",
    maxDistrict: 0
},{
    state: "District of Columbia",
    abbr: "DC",
    maxDistrict: 0
},{
    state: "Florida",
    abbr: "FL",
    maxDistrict: 25
},{
    state: "Georgia",
    abbr: "GA",
    maxDistrict: 13
},{
    state: "Hawaii",
    abbr: "HI",
    maxDistrict: 2
},{
    state: "Idaho",
    abbr: "ID",
    maxDistrict: 2
},{
    state: "Illinois",
    abbr: "IL",
    maxDistrict: 19
},{
    state: "Indiana",
    abbr: "IN",
    maxDistrict: 9
},{
    state: "Iowa",
    abbr: "IA",
    maxDistrict: 5
},{
    state: "Kansas",
    abbr: "KS",
    maxDistrict: 4
},{
    state: "Kentucky",
    abbr: "KY",
    maxDistrict: 6
},{
    state: "Louisiana",
    abbr: "LA",
    maxDistrict: 7
},{
    state: "Maine",
    abbr: "ME",
    maxDistrict: 2
},{
    state: "Maryland",
    abbr: "MD",
    maxDistrict: 8
},{
    state: "Massachusetts",
    abbr: "MA",
    maxDistrict: 10
},{
    state: "Michigan",
    abbr: "MI",
    maxDistrict: 15
},{
    state: "Minnesota",
    abbr: "MN",
    maxDistrict: 8
},{
    state: "Mississippi",
    abbr: "MS",
    maxDistrict: 4
},{
    state: "Missouri",
    abbr: "MO",
    maxDistrict: 9
},{
    state: "Montana",
    abbr: "MT",
    maxDistrict: 0
},{
    state: "Nebraska",
    abbr: "NE",
    maxDistrict: 3
},{
    state: "Nevada",
    abbr: "NV",
    maxDistrict: 3
},{
    state: "New Hampshire",
    abbr: "NH",
    maxDistrict: 2
},{
    state: "New Jersey",
    abbr: "NJ",
    maxDistrict: 13
},{
    state: "New Mexico",
    abbr: "NM",
    maxDistrict: 3
},{
    state: "New York",
    abbr: "NY",
    maxDistrict: 29
},{
    state: "North Carolina",
    abbr: "NC",
    maxDistrict: 13
},{
    state: "North Dakota",
    abbr: "ND",
    maxDistrict: 0
},{
    state: "Ohio",
    abbr: "OH",
    maxDistrict: 18
},{
    state: "Oklahoma",
    abbr: "OK",
    maxDistrict: 5
},{
    state: "Oregon",
    abbr: "OR",
    maxDistrict: 0
},{
    state: "Pennsylvania",
    abbr: "PA",
    maxDistrict: 19
},{
    state: "Rhode Island",
    abbr: "RI",
    maxDistrict: 2
},{
    state: "South Carolina",
    abbr: "SC",
    maxDistrict: 6
},{
    state: "South Dakota",
    abbr: "SD",
    maxDistrict: 0
},{
    state: "Tennessee",
    abbr: "TN",
    maxDistrict: 9
},{
    state: "Texas",
    abbr: "TX",
    maxDistrict: 32
},{
    state: "Utah",
    abbr: "UT",
    maxDistrict: 3
},{
    state: "Vermont",
    abbr: "VT",
    maxDistrict: 0
},{
    state: "Virginia",
    abbr: "VA",
    maxDistrict: 11
},{
    state: "Washington",
    abbr: "WA",
    maxDistrict: 9
},{
    state: "West Virginia",
    abbr: "WV",
    maxDistrict: 3
},{
    state: "Wisconsin",
    abbr: "WI",
    maxDistrict: 8
},{
    state: "Wyoming",
    abbr: "WY",
    maxDistrict: 0
}];

Ext.regModel('State', {
    idProperty: 'abbr',
    fields: ['state','abbr','maxDistrict']
});

Geo.stores.States = new Ext.data.Store({
    model: 'State',
    data: Geo.states
});