type CheckBoxProps = {
  checked: boolean;
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
};

export const CheckBox = ({ checked, id, name, value, label, onChange }: CheckBoxProps) => (
  <label className="inline-flex items-center cursor-pointer" htmlFor={id}>
    <input
      type="checkbox"
      className="w-6 h-6 border-0 rounded-lg accent-primary cursor-pointer"
      checked={checked}
      id={id}
      name={name}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <span className="ml-2">{label}</span>
  </label>
);
