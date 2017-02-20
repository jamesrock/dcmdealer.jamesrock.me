<%@ include file="/taglibs.jsp"%>
<!DOCTYPE html>
<html class="page-login">
	<head>
    	<meta charset="utf-8">
    	<title><fmt:message key="login.title"/></title>
		<link rel="stylesheet" href="/css/DCMDealerComponents.css">
		<link rel="stylesheet" href="/css/resetpassword.css">
		<link rel="shortcut icon" href="/images/favicon.ico">
    </head>
    <body>
		<script src="/js/DCM.js"></script>
		<script src="/js/DCMDealerCore.js"></script>
		<script src="/js/DCMDealerComponents.js"></script>
		<script>
			DCM.ResetPassword();
		</script>
    </body>
</html>