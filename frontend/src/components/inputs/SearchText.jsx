import InputText from "./InputText";

const SearchText = ({ value, setValue }) => {
  return (
    <InputText
      placeholder={"Type here to search."}
      id={"search"}
      icon={"fi fi-rr-search"}
      value={value}
      setValue={setValue}
    />
  );
};

export default SearchText;
