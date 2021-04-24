
let bDebugging = true;

const locStorageKey = "BrewerySearchInfo";

let aBreweries = [];

document.addEventListener('DOMContentLoaded', function() {
    var options = "col s12 m5";
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
    console.log( "[select] initialization completed..." );
});    

// ----------------------------------------------------------

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

function locateBreweryInfo( sBreweryName )
{
    var iBreweryIndex=-1;
    for( var i=0; ( i < aBreweries.length ) && ( iBreweryIndex < 0 ) ; i++ )
    {
        if ( aBreweries[i].name === sBreweryName )
            iBreweryIndex = i;
    }
    return( iBreweryIndex );
}

function getBreweryInfo( sBreweryName )
{
    if ( bDebugging )
        console.log( "getBreweryInfo("+sBreweryName+")" );
    var iIdx = locateBreweryInfo(sBreweryName);
    
    if ( iIdx >= 0 )
    {
        if ( bDebugging )
            console.log( "Brewery [" + sBreweryName + "] clicked! : Index: [" + iIdx + "]" );
        
        var elCraftBeerHdrEl = document.getElementById( "beerHdr" );
        if ( aBreweries[iIdx].name.length > 0 ) {
            elCraftBeerHdrEl.innerHTML = aBreweries[iIdx].name;
        }
    }
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

        for( var i=0; i < aBreweries.length; i++ )
        {
            // <a class="waves-effect waves-light btn-large">Button</a>
            let elBrewery = document.createElement( "a" );
            elBrewery.setAttribute( "class", "col s12 waves-effect waves-light btn-large brewery-button" );
            elBrewery.textContent = aBreweries[i].name;
            
            // let elBrewery = document.createElement( "input" );
            // elBrewery.setAttribute( "type", "text" );
            // elBrewery.setAttribute( "readonly", true );
            // // text-center:
            // elBrewery.setAttribute( "class", "form-control d-block bg-white" );
            // elBrewery.setAttribute( "value", aBreweries[i].name );
            
            elBrewery.addEventListener( "click", function()
            {
                getBreweryInfo( elBrewery.textContent ); //.value );
            })
            elBreweryListEl.append( elBrewery );
        }
    
    } // endIf ( aBreweries.length > 0 )
    
} // endFunction: displayBrewerySearch()

function runQuery( sZip2Query )
{
    if ( bDebugging )
        console.log( "runQueryy("+sZip2Query+")" );
    var sZipToQuery = ( sZip2Query ? sZip2Query.trim() : "" );
    if ( sZipToQuery.length > 0 )
    {
        var elBreweryTypeEl = document.getElementById( "breweryType" );
        var sBreweryType = elBreweryTypeEl.value;
        if ( bDebugging )
            console.log( "breweryType: [" + sBreweryType + "]" );
        var sUrlBreweryType = "";
        if ( sBreweryType !== "all_types" ) {
            sUrlBreweryType = "&by_type="+sBreweryType;
        }
        
        // elStateList
        var elBreweryByStateEl = document.getElementById( "idBreweryState" );
        if ( elBreweryByStateEl )
        {
            var sBreweryState = elBreweryByStateEl.value;
            console.log( "State filter: [" + sBreweryState + "]" );
        }
        
        sURL = "https://api.openbrewerydb.org/breweries"
                + "?"
                // + "by_city=san%20diego"
                // + "&by_state=california"
                + "&by_postal=" + sZipToQuery
                + sUrlBreweryType
                ;
        
        if ( bDebugging ) {
            console.log( "===========================================================================" );
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
            
            var elCurrentPicEl = document.getElementById( "beerPic" );
            elCurrentPicEl.setAttribute( "src", "./assets/images/pint.png" );
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
                    longitude: response.data[i].longitude,
                    latitude: response.data[i].latitude,
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
    
    // Create a drop-down list of states to choose from:
    // Objective:
    //     <select name="breweryState" id="breweryState">
    //         <option value="california">California</option>
    //     </select>
    // let elSearchByStateDiv = document.getElementById( "searchByState" );
    // if ( elSearchByStateDiv )
    // {
    //     // <p class="mt-2 my-1"><strong>State:</strong></p>
    //     var elStatePrefix = document.createElement( "p" );
    //     elStatePrefix.setAttribute( "class", "mt-2 my-2" );
    //     elStatePrefix.textContent = "State:";
    //     elSearchByStateDiv.appendChild( elStatePrefix );

    //     var elStateList = document.createElement( "select" );
    //     elStateList.setAttribute( "name", "breweryState" );
    //     elStateList.setAttribute( "id", "idBreweryState" );
    //     // elStateList.setAttribute( "class", "form-control d-block bg-white" );
    //     elSearchByStateDiv.appendChild( elStateList );
        
    //         var elState = document.createElement( "option" );
    //         elState.setAttribute( "value", "california" );
    //         elState.textContent = "California";
    //         elStateList.appendChild( elState );

    //         elState = document.createElement( "option" );
    //         elState.setAttribute( "value", "texas" );
    //         elState.textContent = "Texas";
    //         elStateList.appendChild( elState );
    // }

    // =====================================================================================================
    // When the search button is clicked, 
    // locate all breweries associated to the zip code typed by the user:
    elSelectedZipcode.addEventListener( "click", function()
    {
        let elZipCodeInput = document.getElementById( "zipCodeInput" );
        let sZipCode2Query = "";
        var sZipCodeInput = elZipCodeInput.value; // retrieve the user zip code input
        sZipCode2Query = sZipCodeInput.trim(); // remove any leading/trailing white space
        if ( bDebugging )
            console.log( "Zip2Search: [" + sZipCode2Query + "]" );
        
        elZipCodeInput.value = "";  // clear the user input...
        elZipCodeInput.focus(); // place the cursor input back on the primary input field...
        
        if ( sZipCode2Query && (sZipCode2Query.length > 0) )
        {
            if ( bDebugging )
                console.log( "Obtaining breweries for: [" + sZipCode2Query + "]" );
            
            runQuery( sZipCode2Query );
        }
    })
    // =====================================================================================================
    
    // =====================================================================================================
    elClearBreweries.addEventListener( "click",function()
    {
        console.log( "Clearing the search list!" );
        aBreweries = [];
        localStorage.clear();
        displayBrewerySearch();
        window.location.replace( "./index.html" );
    })
    // =====================================================================================================
    
}

start( "" );
