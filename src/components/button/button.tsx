interface ButtonProps {
  label: String;
  primary?: Boolean;
  size?: String;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { label, onClick } = props;

  return <button onClick={onClick}>{label}</button>;
};
