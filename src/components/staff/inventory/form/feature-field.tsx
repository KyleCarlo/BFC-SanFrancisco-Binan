import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { FeatureModel } from "@models/Menu";

export default function FeatureField(form: any) {
  return (
    <FormField
      control={form.control}
      name="feature"
      render={({ field }) => (
        <FormItem className="flex-1">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Item Feature" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(FeatureModel.Values).map((base) => {
                return (
                  <SelectItem key={base} value={base}>
                    {base}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="relative bottom-1.5" />
        </FormItem>
      )}
    />
  );
}
