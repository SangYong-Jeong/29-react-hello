// Component란 재사용 가능한 코드 조각
// Component는 항상 대문자로 시작한다. - 소문자로 시작하면 태그 판정

const app = document.querySelector('#app');
// 1. Class로 만들기
// Object.prototype.hi = function () {
//   console.log('hi');
// };

// class hihi {
//   constructor(_name) {
//     this.aname = _name;
//   }
// }

// hihi.prototype.isReactComponent = {};
class Hello extends React.Component {
  componentDidUpdate() {
    console.log('hi');
  }
  componentDidMount() {
    console.log('hi');
  }

  render() {
    const userName = 'booldook';
    return <h1>Hello {userName}</h1>;
  }
  hello() {
    console.log('hihi');
  }
}
// Hello.prototype.isReactComponent = { name: 'hi' };
// const hh = new hihi();

console.dir(Hello);
const hello = new Hello();
hello.hello();
console.log(hello.isReactComponent);
console.dir(arr);
console.dir(hello);
console.dir(hello.__proto__);
console.dir(Hello.__proto__);
console.dir(Hello.prototype.render);

// 2. Hooks(함수형)로 만들기
const Hello2 = () => {
  const userName = 'booldook2';
  return <h1>Hello {userName}</h1>;
};
console.dir(Hello2);

const el = (
  <div>
    <Hello />
    <Hello2 />
  </div>
);
ReactDOM.render(el, app);

const arr = [{ name: 'hi' }, { name: 'hi2' }];
console.log(
  arr.filter((v) => {
    v.name = '정상용';
    return true;
  })
);
console.log(arr);
// shallow copy
