**UPDATE #2: 2011/01/29 – Documentation for overloading include_scripts paths.**
**UPDATE #1: 2011/01/17 – Split article to separate element and view information.**

**Cuploadify @ GitHub:** [Repository](https://github.com/achan/cuploadify) | [Download](https://github.com/achan/cuploadify/archives/1.0)

To install this plugin, simply unzip the latest stable build into your `/app/plugins/cuploadify` directory.

In my attempt to decouple all of my CakePHP projects into separate, reusable plugins, I’ve created a CakePHP plugin for Uploadify. For those of you who aren’t familiar with [Uploadify](http://uploadify.com/demos), they describe themselves as _“a powerful and highly-customizable file upload script.”_

## The Uploadify Element

At the heart of Cuploadify is the uploadify element which can be used in your views to quickly create a real-time file upload input box.

An Uploadify file input box can be inserted into your view like so:

    $this->element("uploadify", array(
      "plugin" => "cuploadify",
      "dom_id" => "file_upload",
      "session_id" => $this->Session->id(),
      "include_scripts" => array($string...),
      "options" => array("script" => "/users/upload_profile_pic", $mixed...))
    );

### Options for the Uploadify element

**`plugin*`**

The value here must be specified as "cuploadify" in order to let CakePHP know that the element resides in the cuploadify plugin.

**`dom_id*`**

The DOM id of the Uploadify file uploader element.

**`session_id`**

As described in Uploadify’s [FAQ](http://uploadify.com/faqs/how-do-i-send-the-session-id-to-the-back-end-script), “Since the Flash file is what is communicating with your back-end script, the session information is not sent when a file is being uploaded.” If you want to give the back-end script the current session, you can either pass the "`session_id`" key through the `scriptData` option, or by specifying the session id through this parameter.

If you’re using the `cuploadify` component in your controller, the switching of the sessions will be taken care of for you. Otherwise, you will need to manually switch the session before it has been started (ie. in your controller’s beforeFilter() method) like so:

    // this is not necessary if you're using the cuploadify component
    if (isset($_REQUEST["session_id"])) {
      $session_id = $_REQUEST["session_id"];
      $this->Session->id($session_id);
    }

**`include_scripts`**

In order to avoid including the same scripts multiple times — in the event that you have multiple uploadify inputs within the same page or are already including jquery/swfobject scripts — you can use this array to specify which scripts you wish to include when printing this element.
Possible values: `"jquery"`, `"swfobject"`, `"uploadify"`, `"uploadify_css"`.
_As of v0.1.6, all of these values can be overloaded as keys, whose value will specify a custom path to its corresponding script._
Default values: No scripts will be included by default.

Example:
    array("jquery" => "/path/to/jquery", "swfobject", "uploadify");

**`options`**

This associative array allows you to specify all the jquery options expected by Uploadify.
Possible values: View the [Uploadify documentation](http://uploadify.com/documentation#options) to see all the possible keys and their expected values.
Mandatory option(s): `script`
Default option(s): The `cancelImg` and `uploader` options will use the files provided by Uploadify. No other options will be included.

To my knowledge, all paths/urls can use the CakePHP routing URLs.

\* _denotes mandatory options._

## The Cuploadify Component

The `cuploadify` component contains helper methods to facilitate the back-end functionality likely to be used by an Uploadify input box. It is not required when using the `uploadify` element, but it’s purpose is to implement some of the basic actions generally used with Uploadify input boxes.

To use this plugin with your `uploadify` element, you will need to call the this component in the `action` specified by the `script` key of your element’s `options` parameter. In our current example, it would be like the following:

    // don't forget to import the Cuploadify component!
    App::import("Component", "Cuploadify.Cuploadify");
    class UsersController extends AppController {
      ...
      function upload_profile_pic() {
        $this->cuploadify->upload();
      }
    }

### The Cuploadify component methods

**`upload($options = array($key=>$value,...))`**

This method can be used to upload the files specified by the Uploadify input box (to the destination specified by the input box).
Options: The only option currently available is `"root"`, which allows the developer to specify a root directory to prepend to the upload directory specified by the `"folder"` key of the corresponding Uploadify input box. This gives a sort of sandbox effect to avoid certain XSS exploits.

And that’s it!

If there are any features missing or not working properly, [feel free to let me know](https://github.com/achan/cuploadify/issues). Or – better yet – send me a patch with the fix :P
