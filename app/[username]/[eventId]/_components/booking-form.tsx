/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// @ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/actions/booking"; // Ensure this exists
import { bookingSchema } from "@/app/lib/validators";
import "react-day-picker/style.css";
import useFetch from "@/hooks/use-fetch";

// Define Event and Availability types
interface EventData {
  id: string;
  duration: number; // In minutes
}

interface AvailabilitySlot {
  date: string;
  slots: string[];
}

// Define BookingForm Props
interface BookingFormProps {
  event: EventData;
  availability: AvailabilitySlot[];
}

// Define form data shape
interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
  additionalInfo?: string;
}

// Define API response type
interface BookingResponse {
  meetLink?: string;
}

export default function BookingForm({ event, availability }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  // Ensure `useFetch` type arguments match expected API response
  const { loading, data, fn: fnCreateBooking } = useFetch<void, BookingResponse>(createBooking);

  const onSubmit = async (formData: FormData) => {
    console.log("Form submitted with data:", formData);

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const startTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: formData.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find((day) => day.date === format(selectedDate, "yyyy-MM-dd"))?.slots || []
    : [];

  if (data && "meetLink" in data) {
    return (
      <div className="text-center p-10 border bg-white">
        <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
        {data.meetLink && (
          <p>
            Join the meeting:{" "}
            <a href={data.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {data.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-10 border bg-white">
      <div className="md:h-96 flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date ?? undefined);
              setSelectedTime(null); // Reset selected time when date changes
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: {
                background: "lightblue",
                borderRadius: 100,
              },
            }}
          />
        </div>
        <div className="w-full h-full md:overflow-scroll no-scrollbar">
          {selectedDate && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button key={slot} variant={selectedTime === slot ? "default" : "outline"} onClick={() => setSelectedTime(slot)}>
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register("name")} placeholder="Your Name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Input {...register("email")} type="email" placeholder="Your Email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Textarea {...register("additionalInfo")} placeholder="Additional Information" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
}
