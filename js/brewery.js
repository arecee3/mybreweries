
let bDebugging = true;

const locStorageKey = "BrewerySearchInfo";

let aBreweries = [];

// variables to keep track of quiz state
// let currentQuestionIndex = 0;
// let time = questions.length * 15;
// let timerId;

// by_postal response:
// https://api.openbrewerydb.org/breweries?by_postal=92101

// [
//     {
//         "id":8041,
//         "obdb_id":"10-barrel-brewing-co-san-diego",
//         "name":"10 Barrel Brewing Co",
//         "brewery_type":"large",
//         "street":"1501 E St",
//         "address_2":null,
//         "address_3":null,
//         "city":"San Diego",
//         "state":"California",
//         "county_province":null,
//         "postal_code":"92101-6618",
//         "country":"United States",
//         "longitude":"-117.129593",
//         "latitude":"32.714813",
//         "phone":"6195782311",
//         "website_url":"http://10barrel.com",
//         "updated_at":"2018-08-23T23:23:42.000Z",
//         "created_at":"2018-07-24T01:32:51.000Z"
//     },
//     {
//         "id":8587,
//         "obdb_id":"ballast-point-brewing-company-little-italy-san-diego",
//         "name":"Ballast Point Brewing Company - Little Italy",
//         "brewery_type":"large",
//         "street":"2215 India St",
//         "address_2":null,
//         "address_3":null,
//         "city":"San Diego",
//         "state":"California",
//         "county_province":null,
//         "postal_code":"92101-1725",
//         "country":"United States",
//         "longitude":"-117.169738",
//         "latitude":"32.727777",
//         "phone":"6192557213",
//         "website_url":"http://www.ballastpoint.com",
//         "updated_at":"2018-08-23T23:24:51.000Z",
//         "created_at":"2018-07-24T01:32:52.000Z"
//     },
//     {"id":11294,"obdb_id":"half-door-brewing-company-san-diego","name":"Half Door Brewing Company","brewery_type":"brewpub","street":"903 Island Ave","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-7227","country":"United States","longitude":"-117.156268","latitude":"32.710248","phone":null,"website_url":"http://www.halfdoorbrewing.com","updated_at":"2018-08-23T23:29:07.000Z","created_at":"2018-07-24T01:32:56.000Z"},{"id":11904,"obdb_id":"karl-strauss-brewing-co-downtown-san-diego","name":"Karl Strauss Brewing Co - Downtown","brewery_type":"brewpub","street":"1157 Columbia St","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-3511","country":"United States","longitude":"-117.1672838","latitude":"32.71730086","phone":"6192342739","website_url":"http://www.karlstrauss.com","updated_at":"2018-08-23T23:58:22.000Z","created_at":"2018-07-24T01:32:57.000Z"},
    // {
    //     "id":11990,
    //     "obdb_id":"knotty-brewing-co-san-diego",
    //     "name":"Knotty Brewing Co.",
    //     "brewery_type":"micro",
    //     "street":"842 Market St",
    //     "address_2":null,
    //     "address_3":null,
    //     "city":"San Diego",
    //     "state":"California"
    //     "county_province":null,
    //     "postal_code":"92101-6425",
    //     "country":"United States",
    //     "longitude":"-117.127434",
    //     "latitude":"32.711658"
    //     "phone":"6192694337"
    //     "website_url":"http://www.knottybrewing.com",
    //     "updated_at":"2018-08-23T23:58:36.000Z",
    //     "created_at":"2018-07-24T01:32:57.000Z"
    // },
    // {"id":12695,"obdb_id":"mission-brewery-san-diego","name":"Mission Brewery","brewery_type":"micro","street":"1441 L St","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-8967","country":"United States","longitude":"-117.0682152","latitude":"32.6220746","phone":"6195440555","website_url":"http://www.missionbrewery.com","updated_at":"2018-08-23T23:59:36.000Z","created_at":"2018-07-24T01:32:58.000Z"},{"id":12734,"obdb_id":"monkey-paw-brewing-san-diego","name":"Monkey Paw Brewing","brewery_type":"micro","street":"807 16th St","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-6610","country":"United States","longitude":"-117.149375","latitude":"32.71384441","phone":"6198672226","website_url":"http://www.monkeypawbrewing.com","updated_at":"2018-08-23T23:59:41.000Z","created_at":"2018-07-24T01:32:58.000Z"},{"id":13790,"obdb_id":"resident-brewing-san-diego","name":"Resident Brewing","brewery_type":"micro","street":"411 C St","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-5105","country":"United States","longitude":"-117.1608785","latitude":"32.71667995","phone":"6197176622","website_url":"http://www.residentbrewing.com","updated_at":"2018-08-24T00:01:26.000Z","created_at":"2018-07-24T01:33:00.000Z"},{"id":14856,"obdb_id":"tenacious-brewing-company-san-diego","name":"Tenacious Brewing Company","brewery_type":"planning","street":null,"address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101","country":"United States","longitude":"-117.1627714","latitude":"32.7174209","phone":null,"website_url":null,"updated_at":"2018-08-24T00:03:45.000Z","created_at":"2018-07-24T01:33:02.000Z"},{"id":14893,"obdb_id":"the-bell-marker-san-diego","name":"The Bell Marker","brewery_type":"brewpub","street":"602 Broadway Ste 101","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-5449","country":"United States","longitude":"-117.0763473","latitude":"32.597261","phone":null,"website_url":"http://www.thebellmarker.com","updated_at":"2018-08-24T00:03:47.000Z","created_at":"2018-07-24T01:33:02.000Z"}
// ]

// by_postal=##### & by_type=micro response:
// https://api.openbrewerydb.org/breweries?by_postal=92101&by_type=micro
// 
// [
//     {
//         "id":11990,
//         "obdb_id":"knotty-brewing-co-san-diego",
//         "name":"Knotty Brewing Co.",
//         "brewery_type":"micro",
//         "street":"842 Market St",
//         "address_2":null,
//         "address_3":null,
//         "city":"San Diego",
//         "state":"California",
//         "county_province":null,
//         "postal_code":"92101-6425",
//         "country":"United States",
//         "longitude":"-117.127434"
//         "latitude":"32.711658"
//         "phone":"6192694337",
//         "website_url":"http://www.knottybrewing.com"
//         "updated_at":"2018-08-23T23:58:36.000Z",
//         "created_at":"2018-07-24T01:32:57.000Z"
//     },
//     {
//         "id":12695,
//         "obdb_id":"mission-brewery-san-diego",
//         "name":"Mission Brewery",
//         "brewery_type":"micro",
//         "street":"1441 L St",
//         "address_2":null,
//         "address_3":null,
//         "city":"San Diego",
//         "state":"California",
//         "county_province":null,
//         "postal_code":"92101-8967",
//         "country":"United States",
//         "longitude":"-117.0682152",
//         "latitude":"32.6220746",
//         "phone":"6195440555",
//         "website_url":"http://www.missionbrewery.com",
//         "updated_at":"2018-08-23T23:59:36.000Z",
//         "created_at":"2018-07-24T01:32:58.000Z"
//     },
//     {
//         "id":12734,
//         "obdb_id":"monkey-paw-brewing-san-diego","name":"Monkey Paw Brewing","brewery_type":"micro","street":"807 16th St","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-6610","country":"United States","longitude":"-117.149375","latitude":"32.71384441","phone":"6198672226","website_url":"http://www.monkeypawbrewing.com","updated_at":"2018-08-23T23:59:41.000Z","created_at":"2018-07-24T01:32:58.000Z"},{"id":13790,"obdb_id":"resident-brewing-san-diego","name":"Resident Brewing","brewery_type":"micro","street":"411 C St","address_2":null,"address_3":null,"city":"San Diego","state":"California","county_province":null,"postal_code":"92101-5105","country":"United States","longitude":"-117.1608785","latitude":"32.71667995","phone":"6197176622","website_url":"http://www.residentbrewing.com","updated_at":"2018-08-24T00:01:26.000Z","created_at":"2018-07-24T01:33:00.000Z"}
// ]


function getBreweryInfo( iBreweryIndex )
{

}

function displayBrewerySearch( sZip2Search )
{

    var elBreweryListEl = document.getElementById( "zipCodeSearch" );
    elBreweryListEl.innerHTML = "";
    
    var elBreweryListBtnEl = document.getElementById( "btnClearList" );
    elBreweryListBtnEl.innerHTML = "Clear"
                                    + ( (sZip2Search && sZip2Search.length > 0) ? " "+sZip2Search : "" )
                                    + " search:";
    
    if ( (aBreweries.length > 0) )
    {
        if ( bDebugging ) {
            console.log( "displaySearch(length=="+aBreweries.length+")" );
            console.log( aBreweries );
        }
        
        // Locate the zipCodeSearch form element so we can populate it with all breweries
        // found within that zip-code:
        // var elBreweryListEl = document.getElementById("zipCodeSearch");
        // elBreweryListEl.innerHTML = "";

        for( var i=0; i < aBreweries.length; i++ )
        {
            let elBrewery = document.createElement( "input" );
            elBrewery.setAttribute( "type", "text" );
            elBrewery.setAttribute( "readonly", true );
            // text-center:
            elBrewery.setAttribute( "class", "form-control d-block bg-white" );
            elBrewery.setAttribute( "value", aBreweries[i].name );
            elBrewery.addEventListener( "click", function()
            {
                getBreweryInfo( elBrewery.value );
            })
            elBreweryListEl.append( elBrewery );
        }
    
    } // endIf ( aBreweries.length > 0 )
    
} // endFunction: displayBrewerySearch()

function runQuery( sZip2Query )
{
    var sZipToQuery = ( sZip2Query ? sZip2Query.trim() : "" );
    if ( sZipToQuery.length > 0 )
    {

        var elBreweryTypeEl = document.getElementById( "breweryType" );
        var sBreweryType = elBreweryTypeEl.value;
        console.log( "breweryType: [" + sBreweryType + "]" );
        var sUrlBreweryType = "";
        if ( sBreweryType !== "all_types" ) {
            sUrlBreweryType = "&by_type="+sBreweryType;
        }

        sURL = "https://api.openbrewerydb.org/breweries"
                + "?by_postal=" + sZipToQuery
                + sUrlBreweryType
                ;
        
        
        if ( bDebugging ) {
            console.log( "=====================================================" );
            console.log( "Search URL: " + sURL );
        }
        
        axios.get( sURL )
        .then( function(response)
        {
            aBreweries = [];
            
            if ( bDebugging ) {
                console.log( "------------------------------------------------" );
                console.log( " OpenBreweryDB response: " );
                console.log( response );
            }
            
            // ---------------------------------------------------------------------------------------------------------------------
            
            var elCraftBeerHdrEl = document.getElementById( "beerHdr" );
            if ( response.data.length > 0 )
                elCraftBeerHdrEl.innerHTML = response.data[0].name;
            
            var elCurrentPicEl = document.getElementById( "beerPic" );
            elCurrentPicEl.setAttribute( "src", "./assets/images/BeerMug(xSmall).jpg" );
            elCurrentPicEl.setAttribute ("alt", "Beer Mug" );

            if ( bDebugging )
                console.log( "Search found [" + response.data.length + "] breweries! " );
            
            for( var i=0; i < response.data.length; i++ )
            {
                var recBreweryInfo = {
                    id : response.data[i].id,
                    name : response.data[i].name,
                    street : response.data[i].street,
                    city : response.data[i].city,
                    state : response.data[i].state,
                    zip : response.data[i].zip,
                    phone : response.data[i].phone,
                    websiteURL : response.data[i].websiteURL
                }
                aBreweries.push( recBreweryInfo );
            }
            
            if ( bDebugging ) {
                console.log( "Saving brewery info:" );
                console.log( aBreweries );
            }
            
            localStorage.setItem( locStorageKey, JSON.stringify(aBreweries) );
            
            displayBrewerySearch( sZipToQuery );
            
            // ---------------------------------------------------------------------------------------------------------------------
            
        }) // endThen axios.get response for a zip-code
        .catch( function(error) {
            if ( bDebugging ) {
                console.log( "------------------------------------------------" );
                console.log( error );
            }
            if ( sZip2Query === "" )
                alert( "Please enter a Zip Code to locate breweries for!" );
            else
                alert( "Problem encountered!  Unable to locate \"" + sZip2Query + "\"\n"
                        + "Error received: " + "[" + error + "]" );
        });
        
    }

} // endFunction: runQuery()

function start( sZip2Query )
{
    // https://api.openbrewerydb.org/breweries?by_postal=92101&by_type=micro
    
    let elSelectedZipcode = document.getElementById( "btnZipSearch" );
    let elClearBreweries = document.getElementById( "btnClearList" );
    
    aBreweries = JSON.parse( localStorage.getItem(locStorageKey) ) || [];
    if ( bDebugging )
        console.log( "START: Found a list of [" + aBreweries.length + "] breweries from the last search!" );
    if ( aBreweries.length > 0 )
        displayBrewerySearch();
    
    // When the search button is clicked, 
    // locate all breweries associated to the zip code typed by the user:
    elSelectedZipcode.addEventListener( "click", function()
    {
        let elZipCodeInput = document.getElementById( "zipCodeInput" );
        let sZipCode2Query = "";
        var sZipCodeInput = elZipCodeInput.value; // retrieve the user zip code input
        sZipCode2Query = sZipCodeInput.trim(); // remove any leading/trailing white space
        elZipCodeInput.value = "";  // clear the user input...
        elZipCodeInput.focus(); // place the cursor input back on the primary input field...
        
        if ( sZipCode2Query && (sZipCode2Query.length > 0) )
        {
            if ( bDebugging )
                console.log( "Obtaining breweries for: [" + sZipCode2Query + "]" );
            
            runQuery( sZipCode2Query );
            
            if ( bDebugging ) {
                console.log( "Adding breweries for zip [" + sZipCode2Query + "]:" );
                console.log( aBreweries );
            }
            
            localStorage.setItem( locStorageKey, JSON.stringify(aBreweries) );
        }
        
        // if ( bDebugging )
        //     console.log( "displaySearchHistory: elSelectedCity click()" );
        // displaySearchHistory();
    })
    
    elClearBreweries.addEventListener( "click",function()
    {
        aBreweries = [];
        localStorage.clear();
        displayBrewerySearch();
        window.location.replace("./index.html");
    })
    
}

start( "" );
