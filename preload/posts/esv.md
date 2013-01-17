**Bible @ GitHub:** [Repository](http://github.com/achan/bible) | [Download](http://github.com/achan/bible/archives/master)

I’m happy to announce the release of the alpha version of my Bible plugin for CakePHP! It’s alpha because, well, it’s really limited right now… but if all you want is to retrieve passages from the Bible, this does the job.

The Bible plugin was created with the intentions of expanding support for various translations of the Bible. However, as it stands, it currently only supports the [English Standard Version](http://gnpcb.org/esv) (ESV).

## What’s in the Bible plugin?

    App::import("Component", "Bible.Bible");
    App::import("Helper", "Bible.Bible");
    class SermonsController extends AppController {
      var $components = array("Bible" => array(
          "Esv" => array("key" => "<your key>"),
      ));
           
      var $helpers = array("Bible");
      ...
           
      function passages($passage) {
        $this->layout = "ajax";
        $passages = $this->Bible->get_passage($passage);

        $this->set("passages", $passages);
      }
    }

### The Bible component

The `Bible` component is a dispatching component which will provide your controller with the functionality to lookup passages in the bible.

The `Bible` component’s `$settings` array is a key/value array where the key is the name of the translation-specific component and the value is said component’s `$settings` array. The purpose of this is to allow for us to easily add new translations in the future.

The “Esv” key refers to the `EsvBibleComponent` that the `BibleComponent` will dispatch its calls to when specified. Adding suport for “Niv”, “Nlt”, “Kjv” and so on would be as simple as creating `NivBibleComponent`, `NltBibleComponent`, `KjvBibleComponent` and implementing the functions dispatched by `BibleComponent`.

Currently, the only translation implemented is ESV. The component is basically a wrapper for the [ESV Bible Web Service](http://esvapi.org) (ESVBWS), so make sure to follow all of its conditions before using this plugin.

One of the conditions placed by the ESVBWS is that you can make no more than 5000 queries per day. The way they determine how many queries you’ve made is by your server’s IP or by [requesting an API Key with them](http://esvapi.org/signup). As you can see from the example above, the `EsvBibleComponent` takes a “key” parameter in its `$settings` array as well. The key field is optional and it will default to “IP” (meaning that the ESVBWS will log your query count by the querying server’s IP). They say that this is typically sufficient, but if you’re on a shared server and share your IP with many other sites (who also happen to use the ESVBWS or the mighty Bible plugin) then all your request counts will be summed up together. So, you can request an API key to make sure you get your 5000 queries a day (or an [annual price of $100](http://esvapi.org/#expanded) for more than 5000 queries a day).

### The Bible helper

Currently, all the `Bible` helper contains is a method to encode passages to be sent back to the controller’s actions.

    <?php echo $this->Html->link("[ESV]", "/sermons/passages/" . 
      $this->Bible->encode_passage("John 3:16")); ?>

Due to CakePHP’s named parameters, passing passages with colons is not possible (it will think you’re trying to pass a named parameter). As a result, you can use the Bible helper’s `encode_passage($passage)` function in order to encode the passage to be passed to your controller. Essentially, all this does is replace any occurrence of “:” with “|”.

To see a working example, unpack this plugin in your `plugins` directory and go to /bible/examples in your browser.
