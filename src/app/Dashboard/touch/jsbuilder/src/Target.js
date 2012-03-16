Target = Ext.extend(Object, {
    constructor : function(config, project) {
        this.config = config || {};
        this.project = project;
    },
    
    create : function() {
        this.parseTarget();
        
        var project = this.project,
            builder = project.builder,
            verbose = builder.get('verbose'),
            file;

        if (verbose) {
            Logger.log('\nCreating the "' + this.get('name') + '" target as "' + this.get('target') + '"');
        }
        
        // Open the file stream
        file = new Stream(this.get('targetPath'), 'w');
        
        this.onCreate(file);
        this.writeIncludes(file);
        
        // Close the target file
        file.close();

        this.afterCreate();
    },

    afterCreate : function() {
        if (this.get('debug')) {
            this.project.compressTarget(this);
        }
    },
    
    onCreate : function(file) {},
      
    parseTarget : function() {
        if (this.parsed) {
            return;
        }
        
        // Backwards compatibility with JSB2
        var target = this.get('target') || this.get('file') || this.getDefaultTarget(),
            basePath = this.project.get('deployDir') + Fs.sep,
            dir;
            
        target = target.replace(/\//g, Fs.sep);
        
        if (target.indexOf('.js') != -1) {
            target = target.replace('.js', '');
            if (this.get('debug')) {
                target += this.project.builder.get('debugSuffix');
            }
            target += '.js';
        }

        this.set('target', target);
        
        // If the target is a path, then create the needed folders
        if (target.indexOf(Fs.sep) != -1) {
            dir = target.substr(0, target.lastIndexOf(Fs.sep));
            target = target.replace(dir, '').substr(1);
            target = Fs.mkdir(basePath + dir) + Fs.sep + target;
        }
        else {
            target = basePath + target;
        }
    
        this.set('targetPath', target);
        this.parsed = true;
    },
    
    writeIncludes : function(file) {
        var project = this.project,
            verbose = project.builder.get('verbose'),
            includes = this.get('files') || this.get('fileIncludes') || [],
            jsbDir = project.get('jsbDir') + Fs.sep;
        
        if (verbose && includes.length) {
            Logger.log('  - ' + includes.length + ' file(s) included in this target.');
        }
        
        // Loop over all file includes, read the contents, and write
        // it to our target file
        includes.forEach(function(include) {
            var path = this.getIncludePath(include),
                content = '', 
                filesStream, files;
            
            if (verbose) {
                Logger.log('    + ' + path);
            }
            
            
            if (!Fs.exists(jsbDir + path)) {
                if (Platform.isUnix) {
                    filesStream = new Stream('exec://ls -a ' + jsbDir + path);
                    files = filesStream.readFile().split('\n');
                    filesStream.close();
                    files.forEach(function(filePath) {
                        if (!Ext.isEmpty(filePath)) {
                            include = new Stream(filePath);
                            content += include.readFile() + '\n';
                            include.close();                            
                        }
                    });
                }
            }
            else {
                include = new Stream(jsbDir + path);
                content = include.readFile();
                include.close();
            }

                          
            
            file.writeln(content);
        }, this);        
    },
    
    getIncludePath : function(include) {
        return include.path.replace(/\//g, Fs.sep) + (include.name || include.text || '');
    },

    
    get : function(key) {
        return this.config[key] || false;
    },
        
    set : function(key, value, ifNotExists) {
        if (ifNotExists && this.get(key) !== false) {
            return;
        }
        this.config[key] = value;
    }
});