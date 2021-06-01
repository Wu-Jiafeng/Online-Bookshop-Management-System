function getCookie(name) {
	var strCookie = document.cookie;//获取所有的cookie值
	var oArr = strCookie.split(';');
	for(var i=0;i<oArr.length;i++){
		var c = oArr[i].trim();
		var oArr2 = c.split('=');
		if(oArr2[0].indexOf(name)>-1) {
			return oArr2[1];
			}
	}
	return '';
}
document.getElementById("u_AdminName_cookie").innerHTML='<li><a>欢迎你！'+getCookie('u_AdminName_cookie')+'</a></li>';