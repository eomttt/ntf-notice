import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
};

interface InputEmailFromProps {
  label: string;
  disabled?: boolean;
  onSubmit: (email: string) => void;
}

const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

export const InputEmailFrom = ({ label, disabled, onSubmit }: InputEmailFromProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const handleEmailValidation = (email: string) => isValidEmail(email);

  return (
    <form className="flex items-end justify-between" onSubmit={handleSubmit<FormData>(e => onSubmit(e.email))}>
      <div className="relative flex-grow">
        <p className="w-full text-left mb-1 text-s">이메일 주소</p>
        <Input
          disabled={disabled}
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
      <Button
        className={`${disabled ? 'opacity-40' : 'opacity-1'} ml-5`}
        type="submit"
        label={label}
        disabled={disabled}
      />
    </form>
  );
};
