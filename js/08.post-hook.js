const { useState, useRef, useEffect } = React;
const { render } = ReactDOM;
const postURL = 'https://jsonplaceholder.typicode.com/posts';
const userURL = 'https://jsonplaceholder.typicode.com/users';

// 해볼만 한 것들
// 1. title 컴포넌트 만들어서 검색어 위에 붙여보기
// 2. img들 axios로 불러와서 gallary lists 구현 해보기(이 경우 제이슨 받았다는 가정을 하기위해 추가적인 작업이 필요할듯)

const Search = ({ changeInput }) => {
  const btClose = { right: '1em', cursor: 'pointer' };
  const [query, setQuery] = useState('');
  const queryRef = useRef(null);
  const onChange = (e) => {
    setQuery(e.target.value);
    changeInput(e.target.value);
  };
  const onClose = (e) => {
    setQuery('');
    queryRef.current.focus();
    changeInput('');
  };
  return (
    <form className="my-4 d-flex align-items-center position-relative">
      <h3 className="mr-3 font-weight-bold flex-shrink-0">검색어: </h3>
      <input
        onChange={onChange}
        ref={queryRef}
        type="text"
        className="form-control"
        autoFocus
        placeholder="검색할 단어를 적어주세요."
        value={query}
      />
      {query.length ? (
        <i
          className="fa fa-times position-absolute"
          style={btClose}
          onClick={onClose}
        />
      ) : (
        ''
      )}
    </form>
  );
};

const Lists = ({ posts, changeSort }) => {
  const caret = { cursor: 'pointer' };
  const [sort, setSort] = useState('asc');
  const onChangeDesc = (e) => {
    setSort('desc');
    changeSort('desc');
  };
  const onChangeAsc = (e) => {
    setSort('asc');
    changeSort('asc');
  };
  return (
    <table className="table my-3">
      <colgroup>
        <col width="80"></col>
        <col></col>
        <col width="180"></col>
        <col></col>
      </colgroup>
      <thead>
        <tr>
          <th>
            번호
            {sort === 'asc' ? (
              <i
                className="fa fa-caret-down"
                style={caret}
                onClick={onChangeDesc}
              />
            ) : (
              <i
                className="fa fa-caret-up"
                style={caret}
                onClick={onChangeAsc}
              />
            )}
          </th>
          <th>제목</th>
          <th>작성자</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, i) => (
          <List post={post} key={i} />
        ))}
      </tbody>
    </table>
  );
};

const List = ({ post }) => {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.name}</td>
      <td>{post.body}</td>
    </tr>
  );
};

// 다 완성 -> title 정도 추가해보자
const App = () => {
  const [query, setQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const changeInput = (value) => {
    setQuery(value);
    setSearchPosts(
      allPosts.filter(
        (post) => post.title.includes(value) || post.body.includes(value)
      )
    );
  };
  const changeSort = (value) => {
    const sortPosts =
      value === 'asc'
        ? _.sortBy(searchPosts, 'id')
        : _.sortBy(searchPosts, 'id').reverse();
    setSearchPosts(sortPosts);
  };
  useEffect(async () => {
    try {
      const { data: posts } = await axios.get(postURL);
      const { data: users } = await axios.get(userURL);
      posts.forEach((post) => {
        let [{ name }] = users.filter((user) => user.id === post.userId);
        post.name = name;
      });
      setAllPosts([...posts]);
      setSearchPosts([...posts]);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="container">
      <Search changeInput={changeInput} />
      <Lists posts={searchPosts} changeSort={changeSort} />
    </div>
  );
};

render(<App />, document.querySelector('#app'));
