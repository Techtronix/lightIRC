/*
 * lightIRC configuration
 * www.lightIRC.com
 *
 * You can add or change these parameters to customize lightIRC.
 * Please see the full parameters list at http://redmine.lightirc.com/projects/lightirc/wiki/Customization_parameters
 *
 */

var params = {};

/* Change these parameters */
params.host                         = "irc.techtronix.net";
params.port                         = 6697;
params.policyPort                   = 8430;

/* Language for the user interface. Currently available translations: ar, bd, bg, br, cz, da, de, el, en, es, et, fi, fr, hu, hr, id, it, ja, lv, nl, no, pl, pt, ro, ru, sk, sl, sq, sr_cyr, sr_lat, sv, th, tr, uk */
/* params.language                     = "en"; */

/* Relative or absolute URL to a lightIRC CSS file.
 * The use of styles only works when you upload lightIRC to your webspace.
 * Example: css/lightblue.css 
 */
params.styleURL                     = "css/lightblue.css";

/* Nick to be used. A % character will be replaced by a random number */
params.nick                         = "Guest_%";
/* Channel to be joined after connecting. Multiple channels can be added like this: #lightIRC,#test,#help */
/* params.autojoin                     = "#lounge"; */
/* Commands to be executed after connecting. E.g.: /mode %nick% +x */
params.perform                      = "";

/* Whether the server window (and button) should be shown */
params.showServerWindow             = true;

/* Show a popup to enter a nickname */
params.showNickSelection            = true;
/* Adds a password field to the nick selection box */
params.showIdentifySelection        = true;

/* Show button to register a nickname */
params.showRegisterNicknameButton   = true;
/* Show button to register a channel */
params.showRegisterChannelButton    = true;

/* Opens new queries in background when set to true */
params.showNewQueriesInBackground   = false;

/* Position of the navigation container (where channel and query buttons appear). Valid values: left, right, top, bottom */
params.navigationPosition           = "bottom";


/* See more parameters at http://redmine.lightirc.com/projects/lightirc/wiki/Customization_parameters */
params.ssl                          = true;
params.rememberNickname             = true;
params.showNickPrefixIcons          = false;
params.realname                     = "Techtronix lightIRC User";
params.quitMessage                  = "Page closed";
params.defaultBanmask               = "*!*@%host%";
params.performContinuousWhoRequests = true;
params.identifyCommand              = "/ns identify %nick% %pass%";
params.registerNicknameCommand      = "/ns register %password% %mail%";
params.registerChannelCommand       = "/cs register %channel% %description%";


/* Use this method to send a command to lightIRC with JavaScript */
function sendCommand(command) {
  swfobject.getObjectById('lightIRC').sendCommand(command);
}

/* Use this method to send a message to the active chatwindow */
function sendMessageToActiveWindow(message) {
  swfobject.getObjectById('lightIRC').sendMessageToActiveWindow(message);
}

/* Use this method to set a random text input content in the active window */
function setTextInputContent(content) {
  swfobject.getObjectById('lightIRC').setTextInputContent(content);
}

/* This method gets called if you click on a nick in the chat area */
function onChatAreaClick(nick, ident, realname, channel, host) {
  //alert("onChatAreaClick: "+nick);
}

/* This method gets called if you use the parameter contextMenuExternalEvent */
function onContextMenuSelect(type, nick, ident, realname, channel, host) {
  alert("onContextMenuSelect: "+nick+" for type "+type);
}

/* This method gets called if you use the parameter loopServerCommands */
function onServerCommand(command) {
  return command;
}

/* This method gets called if you use the parameter loopClientCommands */
function onClientCommand(command) {
  return command;
}

/* This method gets called every time the user changes the active window */
function onActiveWindowChange(window) {
	//alert("Active window: "+window);
}

function onPolicyError() {
  alert('An error occured while trying to connect to Techtronix. Please contact us via our website for assistance.');
}

/* This event ensures that lightIRC sends the default quit message when the user closes the browser window */
window.onbeforeunload = function() {
  swfobject.getObjectById('lightIRC').sendQuit();
}

/* This loop escapes % signs in parameters. You should not change it */
for(var key in params) {
  params[key] = params[key].toString().replace(/%/g, "%25");
}

/* Stuff added by Techtronix */
var windowUrl = window.location.href; // Store the URL

if (getMyUri("autojoin", windowUrl) != "")
{
  params.autojoin = getMyUri("autojoin", windowUrl);
} else { params.autojoin = "#lounge" };


if (getMyUri("language", windowUrl) != "")
{
  params.language = getMyUri("language", windowUrl);
} else { params.language = "en" }; // Invalid languages default to "en"

/** Get a paramter out of a URL
 * @param n The key that you are looking up
 * @param s The URL
 * @return The value, if found, or an empty string
 */
function getMyUri(n,s)
{
  n = n.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
  var p = (new RegExp("[\\?&]"+n+"=([^&#]*)")).exec(s);
  return (p===null) ? "" : p[1];
}
