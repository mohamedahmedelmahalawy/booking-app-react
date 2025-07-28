function Button({ icon, children, className }) {
  return (
    <button
      className={`flex justify-center items-center gap-2 p-3 font-medium text-sm ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <div>{children}</div>
    </button>
  );
}

export default Button;
