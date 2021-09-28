# Configuration
All configuration files can be found in a common folder "conf"

## Authentication
The application needs an API key to YouTube to be able to look up videos and playlists. This must be provided in the auth.json file on the form `key = "<your key>"`. An API key can be acquired at https://console.cloud.google.com/ where you will need to register as a developer.

## Define Your Video Search
To define which videos to save, the application uses the playlists structure in the config.json file. This structure should be a list of objects containing an id, policy, and a filter. the id variable should be the id of the playlist and the filter variable defines a filter that is used to decide which videos to include. This filter may be omitted, in which case all the videos in that playlist will be added. the policy variable should contain one of "fetch all", "fetch new", "overwrite" or "ignore". Fetch all will fetch all videos in the playlist matching the filter regardless of what videos are already saved. Fetch new will ignore all videos older than the most recent saved from the same playlist, this does not apply when the video was saved from a different playlist. Overwrite first delete all videos from the given playlist, then save all videos matching the filter.

To help users get started, the default config file aims to provide examples on how to use all the different features.

## Filter
The filter should contain a type variable which contains one of the following:
* "search string"
* "regex"
* "and"
* "or"
* "xor"
* "nor"
* "nand"
* "not"

### Search string
When filter type is search string variables called search and locations should be provided. The search variable should contain the search string and the locations variable should contain a list of which fields to search. The locations list may contain "title" and/or "description".

### Regex
When filter type is regex variables called regex, flags and locations should be provided. The regex variable should contain the regex to be matched, the flags should contain a string of flags, and the locations variable should contain a list of which fields to search. The locations list may contain "title" and/or "description".

### Logic Operators
When the filter type is and, xor, not, nor or nand a variable called filters should be provided. The filters variable should contain a list of filters following the same form as the main filter. The filter type not should be used the same way as other logic operators except instead of filters a variable called filter should contain a single filter object. Logic operators allow for multilevel nested filters.

## Header
To set the header and title of the application change the header variable in config.json.

## Database id
For the cases where multiple versions of this application are being used on the same system it is adviced to give each version its own database id so the databases do not overlap and cause conflicts. The id can be set in config.json.

## Image Files
The application uses some image files to provide some styling of the application. these can be edited or swapped with other files as long as they use the same file names:
* To change the application background change BG.png
* To change the application favicon (the icon on the browser tab) change favicon.png
* To change the image next to the header change favicon.png