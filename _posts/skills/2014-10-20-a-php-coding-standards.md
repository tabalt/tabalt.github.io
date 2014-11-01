---

layout: post
title:  "一份PHP编码规范"
date:   2014-11-01 12:30:00
tags: [php]

keywords: php编码规范
description: 这是一份PHP编码规范

---


#### 编码


文件编码 : 使用 `UTF-8无BOM` 编码.  
数据库编码 : 使用`utf8_general_ci`  
页面编码 : 

    <meta http-equiv="Content-Type" content="text/html; charset="utf-8" />
    

#### 空格与换行


在代码中使用4个空格代替tab.  
换行符 设置为unix系列的`\n` 


#### 代码缩进


左大括号不独占一行, 与上一级右小括号同行.

    function foo($bar) {
        ...
    }
    if ($foo == $bar) {
        ...
    } else {
        ...
    }
    

#### PHP 闭合标签


PHP闭合标签`?>`在PHP中对PHP的分析器是可选的.但是, 如果使用闭合标签, 任何由开发者, 用户或者应用程序插入闭合标签后面的空格都有可能会引起多余的输出、PHP错误、之后的输出无法显示、空白页.  
因此, 所有的PHP文件应该省略这个PHP闭合标签.  


#### 类名/对象名/方法名/常量名/变量名命名规范


做到见名知意, 使用`名词`而不是动词.  
具体可以整理一份常用命名对应关系表做为参考.


#### 类名/对象命名规则


使用驼峰命名法. 首字母大写. (接口/基类需要使用_来标识. 如:`Module_Abstract` )

    class User{
        ...
    }
    $User = new UserModel();
    

#### 类内方法, 变量的命名规则


使用驼峰命名法. 首字母小写.

    public function getList() {
        ...
    }


#### 类外函数, 变量的命名规则


使用下划线命名法. 所有字母均为小写.

    function ip_to_long($ip_address) {
        return sprintf('%u', ip2long($ip_address));
    }

#### 常量命名规则


使用下划线命名法. 所有字母均为大写.

    define('API_KEY', '123456789');
    define('API_SECRET', 'abcdefg');
    

#### 关键字


所有字母均为小写.  
true, false, null等关键字应该总是完全小写的.


#### 逻辑运算符


使用! && ||, 避免使用NOT AND OR.


#### 比较返回值与类型映射


部分PHP函数执行失败时返回 false, 但也可能有一个有效的返回值''或0, 它在松散比较中会被计算为false.  在条件语句中使用这些返回值的时候, 为了确保返回值是你所预期的类型而不是一个有着松散类型的值, 请进行显式的比较.
    
    if (strpos($string, 'foo') === false) {
        ...
    }
    function build_string($string = '') {
        if ($string === ) {
            ...
        }
    }
    

#### 注释


类/方法/函数使用文档注释.  
在方法/函数内结合上下文添加相关行注释.  
行注释以"//"开头, 在所要标识的代码上一行填写.  

    /**
    * Super Class
    * @package Package Name
    * @subpackage Subpackage
    * @category Category
    * @author Author Name
    * @version Version 1.00
    * @date YYYY-MM-DD hh:ii:ss
    */
    class Super {
        /**
         * description
         * @author Author Name
         * @version Version 1.00
         * @date YYYY-MM-DD hh:ii:ss
         * @param string $userId
         * @return array $userInfo
         */
        public function getUserInfo($userId) {
            ...
        }
    }



#### 字符串


直使用单引号除非你需要解析变量, 如果需要解析变量请使用大括号. 如果字符串包含单引号的话你可以使用双引号, 这样就不用转义了. 尽量减少使用字符串拼接.

    'My String'
    "My string $foo"
    "SELECT `foo` FROM `bar` WHERE `bar` = '{$value}'"
    

#### 数组


    $data = array(
        'key1' => 'value1',
        'key2' => 'value2'
    );


#### SQL语句


关键字全部大写, 表名, 字段名, 用反引号标注, 值使用单引号标注.

    "SELECT `column` FROM `table` WHERE `foo` = 'bar'"
    

#### 括号之间的间距


    $array['foo'] = 'bar';
    function foo($bar) {
        ...
    }
    foreach ($query->result() as $row) {
        ...
    }


#### 运算符之间的间距


每个运算符的左右的间距为一个空格. 自增自减除外.

    $data = array();
    $string .= '1';
    for ($i = 1; $i < 1; $i++) {
        ...
    }


#### 参数之间的间距


当创建/调用一个方法或函数时, 如果为多个参数, 多个参数以逗号进行分隔时, 每个逗号后面追加一个空格.

    function foo($var1, $var2, $var3) {
        ...
    }
    array_merge($array1, $array2, $array3);
    var_dump($string, $boolean, $object)



#### 编辑器


Zend Studio



#### 代码格式化


依次打开 Project／Properties／Code Style／Formatter

Import ZendStudio.xml


#### SVN提交


* 不要批量提交
* 提交必须写注释
* 使用Zend Studio的svn插件

