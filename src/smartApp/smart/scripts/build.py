import re

from smart_client.common import rdf_ontology

X_MAP = [("record_id","_this.record.id"),
         ("user_id","_this.user.id"),
         ("smart_app_id","_this.manifest.id")]

FORMATS = {"Alert": None,
           "User": None,
           "UserPreferences": None,
           "AppManifest": "JSON",
           "Container": "JSON",
           "default": "RDF"}
           
CONTENT_TYPES = {"RDF": "application/rdf+xml",
                 "JSON": "application/json"}

def get_calls():
    f = open('../../../../../smart_server/smart/document_processing/schema/smart.owl').read()
    rdf_ontology.parse_ontology(f)

    out = []

    for t in rdf_ontology.api_calls:
        path = str(t.path)
        method = str(t.method)
        target = str(t.target).replace("http://smartplatforms.org/terms#","")
        category = str(t.category)
        by_internal_id = True if str(t.by_internal_id) == "true" else False
        if path not in ["/apps/{descriptor}/manifest",
        "/records/search?given_name={given_name}&family_name={family_name}&zipcode={zipcode}&birthday={birthday}&gender={gender}&medical_record_number={medical_record_number}",
        "/users/search?given_name={given_name}&family_name={family_name}"]:
            out.append({"path": path, "method": method, "category": category, "target": target, "by_internal_id": by_internal_id})

    return out
           
def plural (s):
    if s.endswith("s"):
        return s
    elif s.endswith("y"):
        return rreplace(s, 'y', 'ies', 1)
    else:
        return s + "s"
        
def singular (s):
    if s.endswith("ies"):
        return rreplace(s, 'ies', 'y', 1)
    elif s.endswith("s"):
        return rreplace(s, 's', '', 1)
    else:
        return s
        
def rreplace(s, old, new, occurrence):
    li = s.rsplit(old, occurrence)
    return new.join(li)

def call_name (path, method, category):
    terms = path.strip("/").split("/")
    terms = [t for t in terms if t.find("{") == -1]
    item = terms[-1]
    
    c = category.split("_")
    c = c[-1]
    
    if c.endswith("s"):
        name = plural(item)
    else:
        name = singular(item)
        
    return "_".join((name.upper(),method.lower()))
    
def js_format (path, external_id=False):
    for m in X_MAP:
        path = path.replace("".join(('{', m[0], '}')),"".join(('" + ', m[1], ' + "')))
        
    p = re.compile("{.*?}")
    vars = [s.replace("{","").replace("}","") for s in p.findall(path)]
    
    for m in vars:
        path = path.replace("".join(('{', m, '}')),"".join(('" + ', m, ' + "')))
    
    res = "".join(('"', path, '"'))
    
    if res.endswith(' + ""'):
        res = rreplace(res, ' + ""', '', 1)
        
    if external_id:
        res += ' + external_id'
        vars.append ("external_id")
    
    return res, vars
    
def get_format (target):
    if target in FORMATS.keys():
        return FORMATS[target]
    else:
        return FORMATS["default"]

def buildJS (call, path, vars, format, method, target, category):
    extra_lines = ""
    
    if method.upper() in ("PUT", "POST"):
        if format and CONTENT_TYPES[format]: 
            extra_lines = "        contentType: '%s',\n" % CONTENT_TYPES[format]
        else:
            vars = ["content_type"] + vars
            extra_lines = "        contentType: content_type,\n"
            
        vars = ["data"] + vars
        extra_lines += "        data: data\n"

    out = "SMART_CONNECT_CLIENT.prototype.%s = function(" % call
    out += ", ".join(vars + ["callback_success", "callback_error"])
    out += ") {\n"
    out += "    var _this = this,\n"
    out += "        dfd = $.Deferred(),\n"
    out += "        prm = dfd.promise();\n"
    out += "    prm.success = prm.done;\n"
    out += "    prm.error = prm.fail;\n"
    out += "    if (callback_success) {\n"
    out += "       prm.success(callback_success);\n"
    out += "       if (callback_error) prm.error(callback_error);\n"
    out += "    }\n"
    out += "    this.api_call({\n"
    out += "        method: '%s',\n" % method.upper()
    out += "        url: %s\n" % (path + ("," if method.upper() in ("PUT", "POST") else ""))
    out += extra_lines
    out += "    }, function(r) {\n"

    if method == "GET" and format == "JSON":    
        out += """        var json;
        try {
            json = JSON.parse(r.body);
        } catch(err) {}
        dfd.resolve({body: r.body, contentType: r.contentType, json: json});\n"""
    elif method == "GET" and format == "RDF":
        out += """        var rdf;
        try {
            rdf = _this.process_rdf(r.contentType, r.body);
        } catch(err) {}
        dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf});\n"""
    else:
        out += "        dfd.resolve({body: r.body, contentType: r.contentType});\n"
    
    out += """    }, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });\n"""
    out += "    return prm;\n"
    out += "};\n"
    out += """
SMART_CONNECT_CLIENT.prototype.register_method ("%s",
                  "%s", 
                  "http://smartplatforms.org/terms#%s",
                  "%s");""" % (call, method, target, category)
    
    return out
    
if __name__ == "__main__":

    f = open('smart-api-client-base.js').read()
    print f
    print

    res = get_calls()
    methods = {}
    
    
    for r in res:
        call = call_name(r["path"],r["method"],r["category"])
        path, vars = js_format(r["path"], not r["by_internal_id"])
        format = get_format(r["target"])

        methods[call] = buildJS (call, path, vars, format, r["method"], r["target"], r["category"])
        
    for m in sorted(methods.keys()):
        print methods[m]
        print

    # Alias for backwards compatibility
    print "SMART_CONNECT_CLIENT.prototype.MEDS_get = SMART_CONNECT_CLIENT.prototype.MEDICATIONS_get;\n"
    print "SMART_CONNECT_CLIENT.prototype.MEDS_get_all = SMART_CONNECT_CLIENT.prototype.MEDS_get;\n"
        
    print "SMART = new SMART_CONNECT_CLIENT(null, window.parent);"