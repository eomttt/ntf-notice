import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  project: string[];
};

const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

export const SubscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const handleEmailValidation = (email: string) => isValidEmail(email);

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit<FormData>(onSubmit)}>
      <div className="my-4 relative">
        <p className="w-full text-left mb-1 text-s">이메일 주소</p>
        <input
          className="w-full h-12 rounded-lg border-2 px-1 outline-cyan-500"
          {...register('email', {
            required: true,
            validate: handleEmailValidation,
          })}
        />
        <p
          className={`text-red-500 text-xs absolute mt-2 transition-opacity duration-300 ${
            errors.email ? 'opacity-1' : 'opacity-0'
          }`}>
          {errors.email?.type === 'required' ? '이메일을 입력해주세요.' : '이메일 형식으로 입력해주세요.'}
        </p>
      </div>
      <div className="my-4">
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
