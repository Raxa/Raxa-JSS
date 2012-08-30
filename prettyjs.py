#!/usr/bin/python

"""Pretty JS
    - Runs JsBeautifier on all files in entire tree
    - Can configure paths or specific files to ignore
    
    NOTE: You must install python jsbeautifier before use 
    https://github.com/einars/js-beautify
"""

import os 
import sys
import jsbeautifier

blacklist = [
    ".git/",
    "src/.DS_Store",
    "src/lib",
    "src/data",
    "src/smartApp",
    "test/lib",
]

CONFIRM_EACH_PRETTY = True

def main():
    global CONFIRM_EACH_PRETTY

    # Handle command-line arguments
    args = sys.argv[1:]
    if '--no-confirm' in args:
        print "wont confirmation each file beautification"
        CONFIRM_EACH_PRETTY = False

    # TODO: Add ability to "cleanup" -- removes .pbak files

    # Confirm that user wants to run beautifier
    if not confirm():
        return

    # Beautify... creates .pbak files just in case
    print "Beautifying files..."
    recursiveList('../Raxa-JSS')

def recursiveList(dirname):
    disallowedCount = 0
    allowedCount = 0
    jsCount = 0

    fileList = []
    rootdir = dirname
    for root, subFolders, files in os.walk(rootdir):
        for f in files:
            # Default to assume all files should be beautified
            # If not, should add path to the blacklist path
            flag = True
            for b in blacklist:
                p = dirname + '/' + b
                r = root[0:len(p)]
                if (p == r):
                    flag = False
                    disallowedCount += 1
                    break
            
            # If not in blacklist, then file passed the filter
            # Check if it's a .js file, and if so, mark for beautification
            if flag:
                allowedCount += 1
                filePath = os.path.join(root,f)
                fileName, fileExtension = os.path.splitext(filePath)
                #print 'fn: %s, fx: %s' % (fileName, fileExtension)
                if fileExtension == '.js':
                    jsCount += 1
                    print filePath
                    fileList.append(filePath)

    for f in fileList:
        beautifyFile(f)

    print ""
    print "RESULT SUMMARY"
    print "# of files scanned in total: %s" % (disallowedCount + allowedCount,)
    print "# of files blocked by blacklist filter: %s" % (disallowedCount,)
    print "# of files allowed by blacklist filter: %s" % (allowedCount,)
    print "# of '.js' files: %s" % (beautifiedCount,)
    #print "# of '.js' files with code delta due to beautification: %s" % (beautifiedCount,)
    print ""

# beautifies file "in place"
# overwrittes existing file with beautified version. careful!!
def beautifyFile(filename):
    global CONFIRM_EACH_PRETTY

    print filename + " ",
    before = open(filename, 'rw').read()
    after = jsbeautifier.beautify_file(filename)
    if before != after:
        makePretty = False
        if CONFIRM_EACH_PRETTY:
            print "...would change. Beautify?"
            if confirm():
                makePretty = True
        else:
            makePretty = True

        if makePretty:
            os.rename(filename, filename+".pbak") #prettification backup file
            w = open(filename, "w")
            w.write(after)
            print "Beautified."
        else:
            "Skipped." 

    # TODO: Allow showing diff from beautification.
    # For now, just see the diff via git

def confirm():
    user = None
    while not user:
        print "Are you sure you want to beautify? [Y / N]"
        user = raw_input()
        if user is 'Y' or user is 'y':
            return True 
        elif user is 'N' or user is 'n':
            return False
        else:
            user = None

def warning():
    print ""
    print "WARNING: You should only use this from base directory of Raxa-JSS repo"
    print "WARNING: Files will be updated 'in-place'."
    print "If you're working on these files, disaster may ensue."
    print "Recommend beautifying separately, afer all other changes have been saved."
    print ""

if __name__ == "__main__":
    main()
