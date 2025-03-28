import { formatTableHeaders } from "@/utils/formatTableHeaders";

const Table = ({ tableHeaders, data }) => {
  return (
    <section className="w-full overflow-x-scroll relative">
      <table className="w-full">
        <thead className="bg-accent/25">
          <tr>
            {tableHeaders.map((item) => (
              <td
                key={item}
                className="px-4 py-4 text-sm font-bold uppercase text-text"
              >
                {formatTableHeaders(item)}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className="bg-accent/5 hover:bg-accent/10"
            >
              {tableHeaders.map((el, i) => (
                <td key={i} className={`px-4 py-3`}>
                  {item[el]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
