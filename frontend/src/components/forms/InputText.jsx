const InputText = ({ label, name, value, onChange, placeholder, error }) => {
  return (
    <div className="mb-5">
      <p className="text-xs uppercase font-bold text-text mb-1">{label}</p>
      <input
        className={`px-4 py-3 rounded-lg border-2 border-secondary/25 bg-background w-full outline-none`}
        placeholder={placeholder}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-400 text-sm">{error}*</span>}
    </div>
  );
};

export default InputText;
