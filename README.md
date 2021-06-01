# Online-Bookshop-Management-System
### Course project for Database System in PKU 2019 fall by Hanrong Liu，Jiafeng Wu，Han Zhang，Lichen Zhang

### Usage（尚未完善）

本项目为小型网上书店。
#For 用户：
用户可通过注册账号登录网站以购买书籍。
用户访问网站首页后若无账号，则需要点击“立即注册”并填写相应信息以注册；
注册成功后自动跳转至搜索页面。用户可通过书名（支持模糊查询）/作者/中英文简介（支持分词查询）多条件搜索精准定位到心仪书籍；
用户点击搜索结果中的图书ID即可跳转到图书详细信息页面，系统同时支持购买和加入购物车的功能，在图书详情页面点击购买即可跳转至支付页面；点击加入购物车即可跳转至购物车的详情页面；
在搜索页面除了有根据用户输入检索词的结果，还有根据用户购买记录和图书相似度推荐的图书，为用户提供更多的选择和更个性化的服务。


#For 管理员：
书店员工可通过注册账号成为管理员登录后台以维护数据。
书店员工访问网站首页后若想以管理员身份登录，则需点击“管理员入口”进入管理员登录界面。
若管理员尚无账号，需要点击“立即注册”并填写相应信息以注册；
注册成功后跳转回登录页面，登录后进入管理员功能页面，点击“信息管理”即可进入后台数据维护界面。
后台数据维护分图书信息/订单信息/客户信息/商品评论/进货信息/用户日志/后台参数管理七大功能，并提供条件查询供管理员快速定位至需要维护的信息。
管理员界面还包括“可视化统计功能”，目前已实现图书检索/浏览/下单次数的泡泡图可视化统计，基于d3.js。
<待续。。。>

### Code structure（尚未完善与整合）
#管理员部分：
index.html：数据维护界面（开始为图书信息管理）；
adminOrders.html:订单信息管理界面；
adminCustomers.html：顾客信息管理界面；
adminComments.html：评论信息管理界面；
adminPurchases.html：进货信息管理界面；
adminParameter.html：参数信息管理界面；
adminStatistics.html：可视化统计界面（暂为检索相关信息统计）；
管理员登录.html：管理员登陆界面；
管理员注册.html：管理员注册界面；
/css:存储必需的css模板；
/js:存储必需的js脚本文件：
	/js/adminBooks.js:与index.html（图书信息管理）有关的js脚本
	/js/adminOrders.js:与adminOrders.html（订单信息管理）有关的js脚本（需要修改！总价相关）
	/js/adminCustomers.js:与adminCustomers.html（顾客信息管理）有关的js脚本
	/js/adminComments.js:与adminComments.html（评论信息管理）有关的js脚本
	/js/adminPurchases.js:与adminPurchases.html（进货信息管理）有关的js脚本
	/js/adminParameter.js:与adminParameter.html（参数信息管理）有关的js脚本
	/js/bootstrap.js:响应式布局必需js脚本
	/js/jquery-3.1.1.min.js:ajax必需js脚本
	/js/d3-legend.min.js:可视化d3.js相关库
	/js/d3.min.js:可视化d3.js相关库
	/js/bubble1.js:图书检索信息统计可视化
	/js/bubble2.js:进入图书详细信息页面次数统计可视化
	/js/bubble2.js:图书购买信息统计可视化
/server：存储必需的php脚本文件：
	/server/connect.php:连接数据库
	/server/currentAuthors.php:编辑作者信息时显示当前作者信息
	/server/currentBooks.php:编辑图书信息时显示当前图书信息
	/server/currentItems.php:编辑订单购买商品信息时显示当前选中商品信息
	/server/currentOrders.php:编辑订单信息时显示当前订单信息
	/server/currentComments.php:编辑评论信息时显示当前评论信息
	/server/currentCustomers.php:编辑客户信息时显示当前客户信息
	/server/currentParameter.php:编辑参数信息时显示当前参数信息
	/server/currentPItems.php:编辑进货购买商品信息时显示当前商品信息
	/server/currentPurchases.php:编辑进货信息时显示当前进货信息
	/server/deleteAuthors.php:删除作者信息
	/server/deleteBooks.php:删除图书信息
	/server/deleteItems.php:删除购买单品信息
	/server/deleteOrders.php:删除订单信息
	/server/deleteCustomers.php:删除顾客信息
	/server/deleteComments.php:删除评论信息
	/server/deletePItems.php:删除进货商品信息
	/server/deletePurchases.php:删除进货信息
	/server/insertAuthors.php:从当前图书插入作者信息
	/server/insertBooks.php:插入图书信息
	/server/insertItems.php:从当前订单插入单品信息
	/server/insertOrders.php:插入订单信息
	/server/insertPItems.php:插入进货购买商品信息
	/server/insertPurchases.php:插入进货信息
	/server/queryBooks.php:查询图书信息
	/server/queryOrders.php:查询订单信息
	/server/queryComments.php:查询评论信息
	/server/queryCustomers.php:查询客户信息
	/server/queryPurchases.php:查询进货信息
	/server/querySearchAmount.php:查询图书检索次数（用于可视化统计）
	/server/updateAuthors.php:更新当前图书作者信息
	/server/updateBooks.php:更新图书信息
	/server/updateItems.php:更新当前订单单品信息（需要修改！总价相关）
	/server/updateComments.php:更新评论信息
	/server/updateCustomers.php:更新客户信息
	/server/updateParameter.php:更新参数信息
	/server/updatePItems.php:更新进货购买商品信息
	/server/updatePurchases.php:更新进货信息
	/server/updateOrders.php:更新订单信息（需要修改！总价相关）
	/server/RegisterForManager.php:管理员注册
	/server/SignInForManager.php：管理员登录
<待续。。。>

#用户部分：
index.html：用户主页（提供登录、注册入口）
customer_index.html：用户操作界面（提供图书查询、购买、购物车、订单界面的链接）
new_login.html：用户登陆界面
new_register.html：用户注册页面
new_query.html：图书查询界面
new_detail.html：图书详情界面
new_buy.html：购买/加入购物车界面
/css：存储网页页面的样式表
/server：存储必需的脚本文件：
	/server/customer_index.php：保存用户会话
	/server/new_login.php：用户登录
	/server/new_register.php：用户注册
	/server/new_query.php：返回用户查询的图书结果
	/server/new_detail：返回用户用户选择的图书信息
	/server/new_buy：获取用户的购买/加购行为并实现页面的跳转
recommend.py：是西安个性化推荐图书的程序
	
### Citation

If you find this code useful, please cite our project!