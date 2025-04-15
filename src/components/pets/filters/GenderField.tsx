
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface GenderFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const GenderField = ({ value, onChange }: GenderFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="gender">Gender</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="gender">
          <SelectValue placeholder="Any gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any gender</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
