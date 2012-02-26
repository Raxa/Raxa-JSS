Ext.ns('Geo', 'Geo.views', 'Geo.cache', 'Geo.stores');

Ext.setup({
    phoneStartupScreen: 'startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        var app = new Geo.App();
    }
});


// Example API snippets (for reference)
// SELECT * FROM sunlight.districts.getDistrictFromLatLong WHERE apikey="8a341f85c657435989e75c9a83294762" and latitude=37.47 and longitude=122.12
// select * from sunlight.legislators.getList  WHERE apikey="" and state="CA" and (district=14 or title="sen")
// http://www.govtrack.us/data/photos/{govtrack_id}-50px.jpeg
// http://www.govtrack.us/congress/votes_download_xml.xpd?year=2009&person=300022