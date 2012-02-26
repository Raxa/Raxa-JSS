Filesystem = {
    exists : function(path) {
        return system.exists(path);
    },
    
    getFullPath: function(path) {
        var currentPath = system.setcwd(path);
        return system.setcwd(currentPath);
    },
    
    getPath: function(path){
        return path.replace(/\//g, Fs.sep);
    },

    mkdir: function(path) {
        if (Platform.isWindows) {
            system.mkdir(path);
        }
        else {
            Cmd.execute('mkdir -p ' + path);
        }
        return this.getFullPath(path);
    },
    
    readFile : function(file) {
        if (!Fs.exists(file)) {
            return '';
        }
        
        file = new Stream(file);
        var contents = file.readFile();
        file.close();
        
        return contents;
    },
    
    copy: function(src, dest) {
        src = Fs.getPath(src);
        dest = Fs.getPath(dest);
                
        if (Platform.isWindows) {
            if (Fs.endsWith(src, Fs.sep)) {
                // remove the trailing \
                src = src.substr(0, src.length - 1);
                
                var folders = src.split(Fs.sep),
                    folder = folders[folders.length - 1]; 
                        
                // Ensure we have a trailing \ on the directory
                dest += (Fs.endsWith(dest, Fs.sep) ? '' : Fs.sep) + folder + Fs.sep;
            }
            Cmd.execute('xcopy ' + src + ' ' + dest + ' /E /Y /I');
        }
        else {
            try {
                // q: quiet
                // r: recursive
                // u: only update if newer
                // p: keep permissions
                // L: copy the contents of symlinks
                Cmd.execute('rsync -qrupL ' + src + ' ' + dest);
            }
            catch(e) {
                Cmd.execute('cp -Rpf ' + src + ' ' + dest);
            }
        }
    },
    
    endsWith: function(str, last){
        return str.lastIndexOf(last) == str.length - 1;
    },

    split: function(file) {
        var split = [];
        if (!Fs.exists(file)) {
            return split;
        }
        file = new Stream(file);
        while (!file.eof) {
            split.push(file.readln().trim());
        }
        return split;
    }
};

// Create short alias
Fs = Filesystem;

Fs.sep = (Fs.getFullPath('.')[0] == '/') ? '/': '\\';
Fs.fileWorkingDir = Fs.getFullPath('.');