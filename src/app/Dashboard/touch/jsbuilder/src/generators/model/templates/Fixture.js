Ext.generator.Model.templates.Fixture = new Ext.XTemplate(
    '(function() \{\n',
    '    var {name} = Ext.ModelMgr.getModel("{name}");\n',
    '    \n',
    '    fixtures.{name} = \{\n',
    '        \n',
    '    \};\n',
    '\})();\n'
);