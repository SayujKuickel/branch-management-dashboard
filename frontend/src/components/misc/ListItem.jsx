const icons = {
  id: "fi fi-br-hastag",
  name: "fi fi-rr-id-card-clip-alt",
  location: "fi fi-rr-marker",
};

const ListItem = ({ icon, name, label }) => {
  const iconStyle = icons[label] ? icons[label] : icon;

  return (
    <div>
      <p className="mb-1 uppercase text-sm font-bold flex items-center gap-2 text-accent/75">
        <i className={`${iconStyle} flex`} />
        <span>{label}</span>
      </p>
      <p className="text-2xl font-semibold text-text/95">{name} </p>
    </div>
  );
};

export default ListItem;
