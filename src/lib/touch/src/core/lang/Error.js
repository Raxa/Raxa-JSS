Ext.Error = {
    raise: function(error) {
        throw new Error(error.msg);
    }
};
