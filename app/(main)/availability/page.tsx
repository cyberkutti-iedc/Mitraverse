import React from "react";
import AvailabilityForm, { AvailabilityFormData } from "./_components/availability-form";
import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";

export default async function AvailabilityPage() {
  const availability: AvailabilityFormData | null = (await getUserAvailability()) as AvailabilityFormData | null;

  return <AvailabilityForm initialData={availability ?? defaultAvailability} />;
}
