import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  project: string[];
};

export const SubscriptionForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit<FormData>(onSubmit)}>
      <div className="my-2">
        <p className="w-full text-left mb-1 text-s">이메일 주소</p>
        <input className="w-full h-12 rounded-lg border-2 px-1 outline-cyan-500" {...register('email')} />
      </div>
      <div className="my-2">
        <p className="w-full text-left mb-1 text-s">알림받을 프로젝트 명</p>
        <input className="w-full h-12 rounded-lg border-2 px-1 outline-cyan-500" {...register('project')} />
      </div>
      <button
        className="w-full h-12 rounded-lg mt-5 border-solid border-2 p-2 text-white font-bold bg-cyan-500 active:bg-cyan-600"
        type="submit">
        구독 하기
      </button>
    </form>
  );
};
