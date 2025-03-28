import { siteRoutes } from "@/utils/siteRoutes";
import { Button } from "@/components";

export async function getData(getterFunction, deleteHandler) {
  try {
    const res = await getterFunction;
    const { data } = res.data;

    const formattedData = data.map((item, index) => ({
      ...item,
      "sn.": index + 1,
      branch: (
        <>
          {item.branch_id ? (
            <a href={`/${siteRoutes.branch}/${item.branch_id}`}>In branch</a>
          ) : (
            <a href={`/${siteRoutes.branch}/add?edit=${item.id}`}>
              Add to branch
            </a>
          )}
        </>
      ),
      options: (
        <div className="flex gap-1">
          <a href={`/${siteRoutes.branch}/add?edit=${item.id}`}>
            <Button icon={"edit"} btnType="secondary" />
          </a>
          <a href={`/${siteRoutes.branch}/${item.id}`}>
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
