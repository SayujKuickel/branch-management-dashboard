export async function deleteService(deleteFn, id) {
  try {
    console.log("Deleting: ", id);

    if (confirm("Are you sure you want to delete?")) await deleteFn(id);
  } catch (error) {
    console.error("Error while deleting", id, "\n", error);
    throw error;
  }
}
