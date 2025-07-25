function Button({ value, color, bgcolor }) {
  return <button className={`bg-[${bgcolor}] text-[${color}]`}>{value}</button>;
}

export default Button;
