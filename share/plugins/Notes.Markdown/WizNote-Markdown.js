
var WizMD_pluginPath = objApp.GetPluginPathByScriptFileName("WizNote-Markdown.js");

function WizIsMarkdown() {
    try {
        var title = objWindow.CurrentDocument.Title;

        if (-1 != title.indexOf(".md ")) {
            return true;
        }
        if (title.lastIndexOf(".md") == -1) {
            return false;
        }
        if (title.lastIndexOf(".md") == title.length - 3) {
            return true;
        }
        return false;
    }
    catch (err) {
        return false;
    }
}

//---------------------------------------------------------------
eventsHtmlDocumentComplete.add(OnMarkdownHtmlDocumentComplete);


function OnMarkdownHtmlDocumentComplete(doc) {
    if (WizIsMarkdown()) {
        InitMarkdown();
    }
}
//-----------------------------------------------------------------
//-----------------------------------------------------------------
function WizMDInsertElem(part, elem_type, callbackfunc) {
    var WizMD_pluginPath = WizMD_pluginPath;
    var oPart = objWindow.CurrentDocumentHtmlDocument.getElementsByTagName(part).item(0);
    var oElem = objWindow.CurrentDocumentHtmlDocument.createElement(elem_type);
    callbackfunc(oElem);
    //oHead.appendChild(oElem); 
    oPart.insertBefore(oElem, null);
    return oElem;
}
//--------------------------------------------

function WizMDAppendScriptSrc(part, script_type, str) {
    return WizMDInsertElem(part, "script", function(oScript) {
        oScript.type = script_type;
        oScript.src = ("file:///" + WizMD_pluginPath + str).replace(/\\/g, '/');
    }
  );
}

function WizMDAppendCssSrc(str) {
    WizMDInsertElem('HEAD', "link", function(oCss) {
        oCss.rel = "stylesheet";
        oCss.href = ("file:///" + WizMD_pluginPath + str).replace(/\\/g, '/');
    }
  );
}

function WizMDAppendScriptInnerHtml(part, script_type, innerHtmlStr) {
    WizMDInsertElem(part, "div", function(oDiv) {
        oDiv.innerHTML = "<input type=\"hidden\"><script defer=\"true\" type=\"" + script_type + "\">" + innerHtmlStr + "</scr" + "ipt>";
    }
  );
}
/*
*解析markdown内容
*/

function InitMarkdown() {
    WizMDAppendScriptSrc('HEAD', "text/javascript", "markdown\\marked.js");
    WizMDAppendScriptSrc('HEAD', "text/javascript", "markdown\\highlight.pack.js");
    var jqueryScript = WizMDAppendScriptSrc('HEAD', "text/javascript", "markdown\\jquery.min.js");
    WizMDAppendCssSrc("Markdown\\GitHub2.css");
    jqueryScript.onload = function() {
        WizMDAppendScriptSrc('HEAD', "text/javascript", "wiznote-markdown-inject.js");
    }

}


