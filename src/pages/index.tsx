import { Layout } from 'components/Layout';
import { ListItem, SubscribeList } from 'components/SubscribeList';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

const getListAPI = () =>
  new Promise<ListItem[]>(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: '1', check: false },
        { id: 2, title: '2', check: false },
        { id: 3, title: '3', check: false },
        { id: 4, title: '4', check: false },
        { id: 5, title: '5', check: false },
      ]);
    }, 100);
  });

const Home = () => {
  // const inputValueState = useState('');
  // const value = inputValueState[0]
  // const setValue = inputValueState[1];
  const [value, setValue] = useState('');

  const [subscribeList, setSubscribeList] = useState<ListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickSubscribe = async () => {
    if (!value) {
      alert('Input 을 입력하세요.');
    } else {
      setIsLoading(true);
      const result = await getListAPI();
      setSubscribeList(result);
      setIsLoading(false);
    }
  };

  const handleClickListItem = (itemId: number) => {
    const newSubScribeList = subscribeList.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          check: !item.check,
        };
      }
      return item;
    });

    setSubscribeList(newSubScribeList);
  };

  return (
    <Layout>
      <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-20">NFT NOTICE</h1>
      <h2 className="w-full text-center text-3xl font-bold my-10 pb-24">원하는 NFT 프로젝트 맞춤 알림 서비스</h2>
      <div className="border-2 border-gray-300 h-10 w-64 p-2 flex items-center rounded-md mt-28">
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          className="placeholder:text-gray-500 outline-none text-md flex-1"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full text-center">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 w-32 h-10 rounded-md "
          onClick={handleClickSubscribe}>
          구독하기
        </button>
      </div>
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && subscribeList.length > 0 && (
        <SubscribeList showChecked={false} subscribeList={subscribeList} onClickListItem={handleClickListItem} />
      )}
      <div>
        <p>CHECK LIST</p>
        <SubscribeList showChecked subscribeList={subscribeList} onClickListItem={handleClickListItem} />
      </div>
      <div className="w-full text-center pt-24 text-black underline">
        <Link href="/temporary">문의: jason@nftnotice.com</Link>
      </div>
    </Layout>
  );
};

export default Home;
