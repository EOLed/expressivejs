**Disclaimer:** _All credit goes to Jose Diaz-Gonzalez, whose post Adding a Helper/Behavior/Component on the fly, contains the 99% of the code I needed to create this component. He’s the one who came up with this idea, I just put it all into a component and added a few tweaks here and there. Thanks, Jose._

**FlyLoader @ GitHub:** [Source](https://github.com/achan/mcac/blob/master/www/app/Controller/Component/FlyLoaderComponent.php) (temporary location)

The FlyLoaderComponent will import and load Helpers, Components and Behaviors on the fly. Cases in which this may because useful is if the Helper/Component/Behavior is only needed in certain cases/actions.

## The FlyLoader Component

The FlyLoaderComponent consists of the following functions:

**`load($type, $name)`**
The `load()` function will import and initialize your Helper/Component/Behavior accordingly.

`$type` is the type of object you wish to load, as expected by the `$type` value in `App::import()`. The values currently supported are “Component”, “Helper” and “Behavior”.

`$name` is the name of the Component/Helper/Behavior you wish to load. $name can be String value or a key/value array where the key is the key is the Component/Helper/Behavior name and the value is a key/value array of options/settings passed to the Component/Helper/Behavior.

For example, if you wanted to load my [BibleComponent/BibleHelper](http://www.am05.com/2011/03/06/alpha-retrieve-bible-passages-with-the-bible-plugin-for-cakephp-esv) on the fly (shameless plug), it would look like the following:

    class PassageController extends AppController {
      function passages($passage) {
        //load BibleComponent
        $this->FlyLoader->load("Component", 
            array("Bible.Bible" => 
                array("Esv" => array("key" => "<your key>"))));
                             
        //load BibleHelper
        $this->FlyLoader->load("Helper", "Bible.Bible");
                                              
        $passages = $this->Bible->get_passage($passage);
                                                       
        $this->set("passages", $passages);
      }
    }

**`unload($type, $name)`**
The `unload()` function will unload your Helper/Component/Behavior accordingly. Currently, it will only unload Behaviors… Any other `$type` will simply do nothing. But the placeholders are there in the event that we find reasoning to unload a Helper/Component.

`$type` is the type of object you wish to unload. The values supported are “Component”, “Helper” and “Behavior”.

`$name` is the name of the Component/Helper/Behavior you wish to unload. `$name` is expected to be a `String` value.
