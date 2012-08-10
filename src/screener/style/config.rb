# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# load the sencha-touch framework
load File.join(dir,'..','..','lib','touch','resources','themes')

# look for any *.scss files in same directory as this file
# Place compiled #.css fiels in the parent directory
sass_path = dir
css_path = File.join(dir, "..", "..", "resources", "css")
output_style = :expanded
environment = :development