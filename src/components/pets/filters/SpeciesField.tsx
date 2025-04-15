import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SpeciesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const SpeciesField = ({ value, onChange }: SpeciesFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="species">Animal Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="species">
          <SelectValue placeholder="All animals" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All animals</SelectItem>
          <SelectItem value="dog">Dogs</SelectItem>
          <SelectItem value="cat">Cats</SelectItem>
          <SelectItem value="bird">Birds</SelectItem>
          <SelectItem value="small">Small Animals</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
