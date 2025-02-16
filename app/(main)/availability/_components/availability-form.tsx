"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { updateAvailability } from "@/actions/availability";
import { availabilitySchema } from "@/app/lib/validators";
import { timeSlots } from "../data";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export interface AvailabilityFormData {
    timeGap: number;
    monday: { isAvailable: boolean; startTime?: string; endTime?: string };
    tuesday: { isAvailable: boolean; startTime?: string; endTime?: string };
    wednesday: { isAvailable: boolean; startTime?: string; endTime?: string };
    thursday: { isAvailable: boolean; startTime?: string; endTime?: string };
    friday: { isAvailable: boolean; startTime?: string; endTime?: string };
    saturday: { isAvailable: boolean; startTime?: string; endTime?: string };
    sunday: { isAvailable: boolean; startTime?: string; endTime?: string };
  }
  

// interface DayAvailability {
//   isAvailable: boolean;
//   startTime?: string;
//   endTime?: string;
// }




interface AvailabilityFormProps {
  initialData: AvailabilityFormData;
}

export default function AvailabilityForm({ initialData }: AvailabilityFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: initialData,
  });

  const { loading, fn: updateAvailabilityFn } = useFetch(updateAvailability);

  const onSubmit = async (data: AvailabilityFormData) => {
    try {
      await updateAvailabilityFn(data);
      toast.success("Availability updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update availability");
    }
  };
  

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {days.map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);
        const dayErrors = errors[day];

        return (
          <div key={day} className="flex items-center space-x-4 mb-4">
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${day}.isAvailable`, checked as boolean);
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                  aria-label={`${day} availability`}
                />
              )}
            />
            <span className="w-24 capitalize">{day}</span>
            {isAvailable && (
              <>
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!isAvailable}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <span className="text-muted-foreground">to</span>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!isAvailable}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {dayErrors?.endTime && (
                  <span className="text-destructive text-sm">
                    {dayErrors.endTime.message}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}

      <div className="flex items-center space-x-4">
        <span className="w-48">Minimum gap before booking (minutes):</span>
        <Input
          type="number"
          {...register("timeGap", { valueAsNumber: true })}
          className="w-32"
          min={0}
          max={120}
        />
        {errors.timeGap && (
          <span className="text-destructive text-sm">{errors.timeGap.message}</span>
        )}
      </div>
{/* 
      {error && (
        <div className="text-destructive text-sm rounded-md">
          {error.message}
        </div>
      )} */}

      <Button
        type="submit"
        disabled={loading || isSubmitting}
        className="w-full sm:w-auto"
      >
        {loading ? "Updating..." : "Update Availability"}
      </Button>
    </form>
  );
}