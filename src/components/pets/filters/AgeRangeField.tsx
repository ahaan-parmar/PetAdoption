
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface AgeRangeFieldProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const AgeRangeField = ({ value, onChange }: AgeRangeFieldProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Label>Age Range (years)</Label>
        <span className="text-sm text-muted-foreground">
          {value[0]} - {value[1]}
        </span>
      </div>
      <Slider
        defaultValue={[0, 10]}
        min={0}
        max={10}
        step={1}
        value={value}
        onValueChange={onChange}
      />
    </div>
  );
};
