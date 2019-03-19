// function Person(name,age) {
//     this.name=name;
//     this.age=age;

// }
// const p1 = new Person('王',10);
// console.log(p1)

class Animal {
    //类中的构造器，每一个类都有一个构造器
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const a1 = new Animal('大黄', 3);
console.log(a1)