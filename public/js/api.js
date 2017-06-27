function makeResfulUrl(obj)
{
	var eles = Object.keys(obj);
    var data = "";
    for (var i = 0; i < eles.length; i++)
    {
        var ele = eles[i];
		var value=obj[ele];
        data = data +  "/" + encodeURIComponent(value);
    }
    return data;
}
function method(methodName,obj,callback)
{
	var success=function(res)
	{
		if(res.code!=0)
		{
			tip(res.message);
		} 
		if(callback)
		{
			callback(res.data);
		}
	};
	var err=function()
	{
		tip("访问"+methodName+" Api错误!");
	};
	if(true)//test
	{ 
		post("../api/" + methodName+makeResfulUrl(obj), success, err);
	}else
	{
		post("../api/" + methodName, obj, success, err);
	}
	
}
/**
*注册用户
**/
function registeUser(userName,userEmail,userPwd,callback)
{
	method("../api/" + arguments.callee.name, {"name":userName,"email":userEmail,"pwd":userPwd},callback);
}
/**
*用户登陆
**/
function loginUser(userName,userPwd,callback)
{
	method("../api/" + arguments.callee.name, {"name":userName,"pwd":userPwd},callback);
}
/**
*返回用户信息
**/
function getUserInfo(callback)
{
	method("../api/" + arguments.callee.name, {}, callback);
}
/**
*返回所有笔记
**/
function getNoteList(callback)
{
	method("../api/" + arguments.callee.name, {}, callback);
}
/**
*添加笔记
*
**/
function addNote(title,content,callback)
{
	method("../api/" + arguments.callee.name, {"title":title,"content":content},callback);
}
/**
*修改笔记
*
**/
function editNote(id,title,content,callback)
{
	method("../api/" + arguments.callee.name, {"id":id,"title":title,"content":content}, callback);
}
/**
*删除笔记
*
**/
function delNote(id,callback)
{
	method("../api/" + arguments.callee.name, {"id":id}, callback);
}