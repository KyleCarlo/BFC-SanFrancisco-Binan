import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { BeverageModel } from "@models/Menu/Beverage";

import NameField from "./name-field";
import DescriptionField from "./desc-field";
import BeverageBaseField from "./beverageBase-field";
import FeatureField from "./feature-field";

export const formSchema = BeverageModel.pick({
  name: true,
  description: true,
  base: true,
  feature: true,
});

export default function AddItemForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        id="beverage"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <NameField {...form} />
        <DescriptionField {...form} />
        <div className="flex gap-2 my-2">
          <BeverageBaseField {...form} />
          <FeatureField {...form} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
