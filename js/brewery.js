
let bDebugging = true;

const locStorageKey = "BrewerySearchInfo";

let aBreweries = [];
let sLastZipSearched = "";
let sLastBreweryType = "";



// variables to keep track of quiz state
// let currentQuestionIndex = 0;
// let time = questions.length * 15;
// let timerId;
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
        
        // var recBreweryInfo = {
        //     id : response.data[i].id,
        //     name : response.data[i].name,
        //     street : response.data[i].street,
        //     city : response.data[i].city,
        //     state : response.data[i].state,
        //     zip : response.data[i].zip,
        //     phone : response.data[i].phone,
        //     longitude: response.data[i].longitude,
        //     latitude: response.data[i].latitude,
        //     websiteURL : response.data[i].websiteURL
        // }
        
        var elBreweryNameEl = document.getElementById( "idBreweryName" );
        if ( aBreweries[iIdx].name.length > 0 ) {
            elBreweryNameEl.textContent = aBreweries[iIdx].name;
        }
        
        // idStreet
        var elBreweryStreetEl = document.getElementById( "idStreet" );
        if ( aBreweries[iIdx].street.length > 0 ) {
            elBreweryStreetEl.textContent = aBreweries[iIdx].street;
        }
        
        // idCityStateZip
        var elBreweryCityStateZipEl = document.getElementById( "idCityStateZip" );
        if ( aBreweries[iIdx].city && (aBreweries[iIdx].city.length > 0) )
        {
            var sCityStateZip = aBreweries[iIdx].city;
            if ( aBreweries[iIdx].state && (aBreweries[iIdx].state.length > 0) )
            {
                sCityStateZip += ", " + aBreweries[iIdx].state;
                if ( aBreweries[iIdx].zip && (aBreweries[iIdx].zip.length > 0) )
                {
                    sCityStateZip += "  " + aBreweries[iIdx].zip;
                }
            }
            elBreweryCityStateZipEl.textContent = sCityStateZip;
        }
        
        // idBreweryWebLink
        var elBreweryWebUrlEl = document.getElementById( "idBreweryWebLink" );
        elBreweryWebUrlEl.innerHTML = "";
        if ( aBreweries[iIdx].websiteURL && (aBreweries[iIdx].websiteURL.length > 0) )
        {
            // <a id="idBreweryWebLink" href="#">Link to brewery website</a>
            var elWebsiteURL = document.createElement( "a" );
            elWebsiteURL.setAttribute( "id", "idBrewerySite" );
            elWebsiteURL.setAttribute( "href", aBreweries[iIdx].websiteURL );
            elWebsiteURL.textContent = "Display " + elBreweryNameEl.textContent+" website";
            elBreweryWebUrlEl.appendChild( elWebsiteURL );
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

        var sLastBreweryName = "";
        var iDuplicateCount = 0;
        
        for( var i=0; i < aBreweries.length; i++ )
        {
            // <a class="waves-effect waves-light btn-large">Button</a>
            let elBrewery = document.createElement( "a" );
            elBrewery.setAttribute( "class", "col s12 waves-effect waves-light btn-large brewery-button" );
            
            if ( (sLastBreweryName.length === 0) && (iDuplicateCount === 0) ) {
                sLastBreweryName = aBreweries[i].name;
            }
            else if ( aBreweries[i].name === sLastBreweryName ) {
                iDuplicateCount++;
                var iBreweryNo = iDuplicateCount+1;
                aBreweries[i].name += " ("+iBreweryNo+")";
            }
            else {
                // reset:
                iDuplicateCount = 0;
                sLastBreweryName = aBreweries[i].name;
            }
            
            elBrewery.textContent = aBreweries[i].name;
            
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
        
        sLastBreweryType = sBreweryType;
        
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
            elCurrentPicEl.setAttribute( "src", "./assets/images/BeerMug(xSmall).jpg" );
            elCurrentPicEl.setAttribute ("alt", "Beer Mug" );

            if ( bDebugging )
                console.log( "Search found [" + response.data.length + "] breweries! " );
            
            for( var i=0; i < response.data.length; i++ )
            {
                //-----------------------------------------------------------
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
                //-----------------------------------------------------------
                var recBreweryInfo = {
                    id : response.data[i].id,
                    name : response.data[i].name,
                    street : response.data[i].street,
                    city : response.data[i].city,
                    state : response.data[i].state,
                    zip : response.data[i].postal_code,
                    phone : response.data[i].phone,
                    longitude: response.data[i].longitude,
                    latitude: response.data[i].latitude,
                    websiteURL : response.data[i].website_url
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
            
            sLastZipSearched = sZip2Query; // save in case we need to re-query...
            
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
        sLastZipSearched = "";
        sLastBreweryType = "";
        window.location.replace( "./index.html" );
    })
    // =====================================================================================================

}

function loadMap() {
  	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlcGUyMSIsImEiOiJja250ZnpoeW4wMjZ1Mm5vM3J3eG5iYjhqIn0.Jq0X-ynV1cZgyuhuSph0dA';
var map = new mapboxgl.Map({ 
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-117.161087,  32.715736],
zoom: 10
});
/* Given a query in the form "lng, lat" or "lat, lng"
* returns the matching geographic coordinate(s)
* as search results in carmen geojson format,
* https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */




map.on('load', function () {
// Add a GeoJSON source with 2 points
map.loadImage('assets/images/beermug.png'), 
function (error, loadImage) {
  if (error) throw error; 
  map.addImage('custom-marker', image);
}
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-116.9658891, 32.6230008]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-117.2499771118164,32.74620819091797 ]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-117.1320793, 32.5807248]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-117.0806457, 32.6426603]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>"
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-117.07943725585938, 32.6401252746582]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-116.9717023,32.8120347 ]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-116.95609283447266, 32.79490661621094]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-117.1434555053711, 32.70732879638672]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'description':
                    '<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-117.169738, 32.727777]
                }
              }
            ]
          }
        });

        // Add a layer showing the places.
        map.addLayer({
          'id': 'places',
          'type': 'circle',
          'source': 'places',
          'paint': {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
            



          }
        });

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.on('mouseenter', 'places', function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer';

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });
        
        map.on('mouseleave', 'places', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
          map.on('load', function() {

  });
        });
      })

}

loadMap();
start("");
