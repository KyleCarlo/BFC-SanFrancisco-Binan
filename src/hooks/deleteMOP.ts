import { toast } from "sonner";

export default async function onDelete(ids: number[], imageNames: string[]) {
  try {
    const response = await fetch(`/api/mop`, {
      method: "DELETE",
      body: JSON.stringify({
        ids,
      }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    const delete_response = await fetch(`/api/image?multiple=true&bucket=mop`, {
      method: "DELETE",
      body: JSON.stringify(imageNames),
    });

    const { message: delete_message } = await delete_response.json();

    if (!delete_response.ok) {
      toast.error(delete_message);
    } else {
      toast.success(delete_message);
    }

    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
