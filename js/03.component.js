// Component란 재사용 가능한 코드 조각
// Component는 항상 대문자로 시작한다. - 소문자로 시작하면 태그 판정

const app = document.querySelector('#app');

// 1. Class로 만들기
class Hello extends React.Component {
  render() {
    const userName = 'booldook';
    return <h1>Hello {userName}</h1>;
  }
}

const hello = new Hello();
const arr = [];
console.dir(arr);
console.dir(hello);
console.dir(hello.__proto__);
console.dir(Hello);
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
