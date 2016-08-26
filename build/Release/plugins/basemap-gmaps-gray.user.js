// ==UserScript==
// @id             iitc-plugin-basemap-gmaps-gray@jacob1123
// @name           IITC plugin: Gray Google Roads
// @category       Map Tiles
// @version        0.1.2.20160826.60012
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/basemap-gmaps-gray.meta.js
// @downloadURL    https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/basemap-gmaps-gray.user.js
// @description    [Release-2016-08-26-060012] Add a simplified gray Version of Google map tiles as an optional layer.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'Release';
plugin_info.dateTimeVersion = '20160826.60012';
plugin_info.pluginId = 'basemap-gmaps-gray';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.grayGMaps = function() {};
window.plugin.grayGMaps.addLayer = function() {
  var grayGMapsOptions = {
    backgroundColor: '#0e3d4e', //or #dddddd ? - that's the Google tile layer default
    styles: [
      {featureType:"landscape.natural",stylers:[{visibility:"simplified"},{saturation:-100},{lightness:-80},{gamma:2.44}]},
      {featureType:"road",stylers:[{visibility:"simplified"},{color:"#bebebe"},{weight:.6}]},
      {featureType:"poi",stylers:[{saturation:-100},{visibility:"on"},{gamma:.14}]},
      {featureType:"water",stylers:[{color:"#32324f"}]},
      {featureType:"transit",stylers:[{visibility:"off"}]},
      {featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},
      {featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},
      {featureType:"poi"},
      {featureType:"landscape.man_made",stylers:[{saturation:-100},{gamma:.13}]},
      {featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]}
    ]
  };

  var grayGMaps = new L.Google('ROA#DMAP',{maxZoom:21, mapOptions: grayGMapsOptions});

  layerChooser.addBaseLayer(grayGMaps, "Google Gray");
};

var setup =  window.plugin.grayGMaps.addLayer;
	
// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);

