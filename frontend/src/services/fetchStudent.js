import { siteRoutes } from "@/utils/siteRoutes";
import { Button } from "@/components";

export async function getData(getterFunction, deleteHandler) {
  try {
    const res = await getterFunction;
    const { data } = res.data;

    const formattedData = data.map((item, index) => ({
      ...item,
      "sn.": index + 1,
      branch: item.branch_id
        ? `${item.branch.name}, ${item.branch.location}`
        : "Not in branch",
      name: `${item.first_name} ${item.last_name}`,
      options: (
        <div className="flex gap-1">
          <a href={`/${siteRoutes.student}/add?edit=${item.id}`}>
            <Button icon={"edit"} btnType="secondary" />
          </a>
          <a href={`/${siteRoutes.student}/${item.id}`}>
            <Button icon={"details"} btnType="secondary" />
          </a>
          <span
            className="cursor-pointer"
            onClick={() => deleteHandler(item.id)}
          >
            <Button icon={"delete"} btnType="secondary" />
          </span>
        </div>
      ),
    }));

    return formattedData;
  } catch (error) {
    throw error;
  }
}
