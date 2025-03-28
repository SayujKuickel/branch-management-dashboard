const InputText = ({ value, setValue, icon, placeholder, id }) => {
  return (
    <div className="bg-secondary/25 max-w-96 md:w-96 rounded-lg overflow-hidden relative">
      <input
        type="text"
        name={id}
        id={id}
        placeholder={placeholder}
        className="w-full h-full outline-none px-3 py-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {icon && (
        <i
          className={`${icon} flex absolute top-1/2 -translate-y-1/2 right-4 text-text`}
        ></i>
      )}
    </div>
  );
};

export default InputText;
