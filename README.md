# Map of influences between philosophers

Visualization of influences between philosoophers made with d3.js library for JS. I made it on IT workshop in [ICM UW](http://www.icm.edu.pl/web/guest) organized by Polish Children's Fund with the mentorship of Piotr Migdał. Data extracted from Wikipedia through DBpedia, thanks to Łukasz Bolikowski -- without him it would have taken me ages to get data directly from Wikipedia. I parsed the JSON file with a C++ program using JsonCpp (getjson.cpp which, as the name suggests, puts the data in d3.js-readable *tsv* file) and a perl script (parse-names.pl). Then there's some d3.js graph drawing magic and baaam, we've got a nice visualisation.

### What I learned
* don't try to parse data directly from Wikipedia, seriously. It's completely unstructred. Trying to get the data took me two days until the DBpedia rescue came. (and even then there were problems with encoding etc.)
* d3.js is reaaaally nice and I'm defintely going to use it in future. 
* a surprisingly large part of making a visualisation is the so-called data mining.
* and many other useful things
