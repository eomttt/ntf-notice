import { useEffect, useState } from 'react';

// props - 부모로 부터 받는 변수 또는 함수
// interface - type 정의
interface CountButtonProps {
  initial: number;
}

export const CountButton = ({ initial }: CountButtonProps) => {
  // state - 내부적으로 관리하는 변수 와 함수
  const [count, setCount] = useState(initial);
  const [text, setText] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Component 가 처음 렌더링 될 때
    // 렌더링 - HTML Dom 에 붙음
    // 그때 실행됨!
    console.log('Mounted');
  }, []);

  useEffect(() => {
    // Component 가 처음 렌더링 될 때
    // count 가 바뀔때마다 실행됨.
    console.log('Count', count);
    // 여기에 있는 변수가 바뀔때마다 실행됨.
  }, [count]);

  useEffect(() => {
    console.log('Request server to text', text);
  }, [text]);

  useEffect(() => {
    // List 요청
    // 서버 요청
    setTimeout(() => {
      setList(['a', 'b', 'c']);
      setIsLoading(false);
    }, 2000);
  }, []);

  // 무조건 single element 나가야함
  return (
    <>
      <div>{count}</div>
      <button type="button" onClick={() => setCount(count + 1)}>
        아무거나 넣으셈
      </button>
      <input onChange={e => setText(e.target.value)} />
      <div>{isLoading ? 'Loading...' : list.map(item => item)}</div>
    </>
  );
};
