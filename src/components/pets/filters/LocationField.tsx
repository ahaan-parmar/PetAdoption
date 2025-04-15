
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationField = ({ value, onChange }: LocationFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        placeholder="City or state"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
