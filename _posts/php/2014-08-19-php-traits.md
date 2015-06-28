---

layout: post
title:  "PHP中的Traits详解"
date:   2014-08-19 15:08:00
tags: [php]

---

PHP是单继承的语言，在PHP 5.4 Traits出现之前，PHP的类无法同时从两个基类继承属性或方法。php的Traits和Go语言的组合功能类似，通过在类中使用use关键字声明要组合的Trait名称，而具体某个Trait的声明使用trait关键词，Trait不能直接实例化。具体用法请看下面的代码：

    <?php
        trait Drive {
            public $carName = 'trait';
            public function driving() {
                echo "driving {$this->carName}\n";
            }
        }
        class Person {
            public function eat() {
                echo "eat\n";
            }
        }
        class Student extends Person {
            use Drive;
            public function study() {
                echo "study\n";
            }
        }
        $student = new Student();
        $student->study();
        $student->eat();
        $student->driving();

输出结果如下：

    study
    eat
    driving trait

上面的例子中，Student类通过继承Person，有了eat方法，通过组合Drive，有了driving方法和属性carName。

如果Trait、基类和本类中都存在某个同名的属性或者方法，最终会保留哪一个呢？通过下面的代码测试一下：

    <?php 
        trait Drive {
            public function hello() {
                echo "hello drive\n";
            }
            public function driving() {
                echo "driving from drive\n";
            }
        }
        class Person {
            public function hello() {
                echo "hello person\n";
            }
            public function driving() {
                echo "driving from person\n";
            }
        }
        class Student extends Person {
            use Drive;
            public function hello() {
                echo "hello student\n";
            }
        }
        $student = new Student();
        $student->hello();
        $student->driving();

输出结果如下：

    hello student
    driving from drive

因此得出结论：当方法或属性同名时，当前类中的方法会覆盖 trait的 方法，而 trait 的方法又覆盖了基类中的方法。

如果要组合多个Trait，通过逗号分隔 Trait名称：

    use Trait1, Trait2;

如果多个Trait中包含同名方法或者属性时，会怎样呢？答案是当组合的多个Trait包含同名属性或者方法时，需要明确声明解决冲突，否则会产生一个致命错误。

    <?php
    trait Trait1 {
        public function hello() {
            echo "Trait1::hello\n";
        }
        public function hi() {
            echo "Trait1::hi\n";
        }
    }
    trait Trait2 {
        public function hello() {
            echo "Trait2::hello\n";
        }
        public function hi() {
            echo "Trait2::hi\n";
        }
    }
    class Class1 {
        use Trait1, Trait2;
    }

输出结果如下：

    PHP Fatal error:  Trait method hello has not been applied, because there are collisions with other trait methods on Class1 in ~/php54/trait_3.php on line 20


使用insteadof和as操作符来解决冲突，insteadof是使用某个方法替代另一个，而as是给方法取一个别名，具体用法请看代码：

    <?php
    trait Trait1 {
        public function hello() {
            echo "Trait1::hello\n";
        }
        public function hi() {
            echo "Trait1::hi\n";
        }
    }
    trait Trait2 {
        public function hello() {
            echo "Trait2::hello\n";
        }
        public function hi() {
            echo "Trait2::hi\n";
        }
    }
    class Class1 {
        use Trait1, Trait2 {
            Trait2::hello insteadof Trait1;
            Trait1::hi insteadof Trait2;
        }
    }
    class Class2 {
        use Trait1, Trait2 {
            Trait2::hello insteadof Trait1;
            Trait1::hi insteadof Trait2;
            Trait2::hi as hei;
            Trait1::hello as hehe;
        }
    }
    $Obj1 = new Class1();
    $Obj1->hello();
    $Obj1->hi();
    echo "\n";
    $Obj2 = new Class2();
    $Obj2->hello();
    $Obj2->hi();
    $Obj2->hei();
    $Obj2->hehe();

输出结果如下：

    Trait2::hello
    Trait1::hi

    Trait2::hello
    Trait1::hi
    Trait2::hi
    Trait1::hello

as关键词还有另外一个用途，那就是修改`方法`的访问控制：

    <?php
        trait Hello {
            public function hello() {
                echo "hello,trait\n";
            }
        }
        class Class1 {
            use Hello {
                hello as protected;
            }
        }
        class Class2 {
            use Hello {
                Hello::hello as private hi;
            }
        }
        $Obj1 = new Class1();
        $Obj1->hello(); # 报致命错误，因为hello方法被修改成受保护的
        $Obj2 = new Class2();
        $Obj2->hello(); # 原来的hello方法仍然是公共的
        $Obj2->hi();  # 报致命错误，因为别名hi方法被修改成私有的

Trait 也能组合Trait，Trait中支持抽象方法、静态属性及静态方法，测试代码如下：

    <?php
    trait Hello {
        public function sayHello() {
            echo "Hello\n";
        }
    }
    trait World {
        use Hello;
        public function sayWorld() {
            echo "World\n";
        }
        abstract public function getWorld();
        public function inc() {
            static $c = 0;
            $c = $c + 1;
            echo "$c\n";
        }
        public static function doSomething() {
            echo "Doing something\n";
        }
    }
    class HelloWorld {
        use World;
        public function getWorld() {
            return 'get World';
        }
    }
    $Obj = new HelloWorld();
    $Obj->sayHello();
    $Obj->sayWorld();
    echo $Obj->getWorld() . "\n";
    HelloWorld::doSomething();
    $Obj->inc();
    $Obj->inc();


输出结果如下：

    Hello
    World
    get World
    Doing something
    1
    2
