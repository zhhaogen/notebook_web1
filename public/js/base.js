/**
 * @author zhg
 * 创建于 2016-2-17 14:31:42
 */
function $(idstr)
{
    var ele = document.querySelectorAll(idstr);
    if (ele.length == 0)
    {
        return null;
    } else if (ele.length == 1)
    {
        return ele[0];
    } else
    {
        return ele;
    }
}
function id(idstr)
{
    return document.getElementById(idstr);
}

function tip(msg)
{
    window.alert(msg);
}

function makeDataStr(obj)
{
    var eles = Object.keys(obj);
    var data = "";
    for (var i = 0; i < eles.length; i++)
    {
        var ele = eles[i];
		var value=obj[ele];
        data = data + encodeURIComponent(ele) + "=" + encodeURIComponent(value) + "&";
    }
    return data;
}

/**
 *  post(url)
 *  post(url,data)
 *  post(url,data,success)
 *  post(url,data,success,err)
 *  post(url,success)
 *  post(url,success,err)
 */
function post()
{
    var url;
    var data;
    var success;
    var error;
    url = arguments[0];
    var urlencoded=false;
    if (typeof (arguments[1]) == "string")
    {
        data = arguments[1];
        success = arguments[2];
        error = arguments[3];
        urlencoded=true;
    }else if (arguments[1] instanceof FormData)
    {
        data = arguments[1];
        success = arguments[2];
        error = arguments[3];
    }else if (typeof (arguments[1]) == "object")
    {
        data =makeDataStr(arguments[1]);
        success = arguments[2];
        error = arguments[3];
    } else if (typeof (arguments[1]) == "function")
    {
        success = arguments[1];
        error = arguments[2];
    }
    var req = new XMLHttpRequest();
    req.open("post", url);
    if(urlencoded)
    {
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    req.responseType = "json";
    req.onload = function ()
    {
        if (req.status === 200)
        {
            if (success)
            { 
                if (typeof (req.response) === "string")
                {
                    success(JSON.parse(req.response));
                } else
                {
                    success(req.response);
                }
            }
        } else
        {
            if (error)
            {
                error(req.statusText);
            }
        }

    };
    req.onerror = function (err)
    {
        if (error)
        {
            error(err);
        }
    };
    req.send(data);
}
function get()
{
    //get url 
    //get url suceess
    //get url sucess error
    //get url type 
    //get url type success
    var url;
    var type;
    var success;
    var error;
    url = arguments[0];
    if (typeof (arguments[1]) == "string")
    {
        type = arguments[1];
        success = arguments[2];
        error = arguments[3];
    } else if (typeof (arguments[1]) == "function")
    {
        success = arguments[1];
        error = arguments[2];
    }

    var req = new XMLHttpRequest();
    req.open("get", url);
    if (type)
    {
        req.responseType = type;
    }
    req.onload = function ()
    {
        if (success)
        {
            success(req.response);
        }
    };
    req.onerror = function (err)
    {
        if (error)
        {
            error(err);
        }
    };
    req.send();
}

