/**
 * @private
 */
Ext.define('Ext.util.Timeline', {

    requires: ['Ext.Anim'],

    constructor: function(anims) {
        this.callParent();

        if (anims) {
            this.add(anims);
        }
    },

    play: function() {
        this.playing = true;
        this.queue = this.anims.slice();
        this.next();
    },

    next: function() {
        if (this.queue.length) {
            var anim = this.queue.shift();
            if (Ext.isObject(anim)) {
                anim = Ext.create('Ext.Anim', anim);
                anim.run(anim.target, {
                    after: function() {
                        this.next();
                    },
                    scope: this
                });
            }
            else if (Ext.isArray(anim)) {
                var anims = anim,
                    ln = anims.length,
                    i, longest = anims[0];

                for (i = 0; i < ln; i++) {
                    anim = anims[i];
                    anim = Ext.create('Ext.Anim', anim);
                    if ((anim.duration + anim.delay) >= (longest.duration + anim.delay)) {
                        longest = anim;
                    }
                    anims[i] = anim;
                }

                for (i = 0; i < ln; i++) {
                    anim = anims[i];
                    if (longest === anim) {
                        anim.after = function() {
                            this.next();
                        };
                        anim.scope = this;
                    }
                    anim.run(anim.target);
                }
            }
        }
    },

    pause: function() {
        // still needs to be implemented
    },

    reset: function() {
        // still needs to be implemented
    },

    clear: function() {
        if (this.playing) {
            // pause and remove anims
        }
        this.anims = [];
    },

    stop: function() {
        if (this.playing) {
            this.pause();
            // put all the animations to their original start location?
        }
    },

    add: function(anims) {
        this.anims = this.anims || [];
        if (Ext.isArray(anims)) {
            this.anims = this.anims.concat(anims);
        }
        else {
            this.anims.push(anims);
        }
    }
});