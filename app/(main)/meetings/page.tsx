/* eslint-disable @typescript-eslint/ban-ts-comment */ 
// @ts-ignore
// @ts-nocheck

import { Suspense } from "react";
import { getUserMeetings } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";
import { Meeting, APIResponseMeeting } from "@/app/types"; // Import unified types

export const metadata = {
  title: "Your Meetings | Mitraverse",
  description: "View and manage your upcoming and past meetings.",
};

export default async function MeetingsPage() {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense fallback={<div>Loading upcoming meetings...</div>}>
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense fallback={<div>Loading past meetings...</div>}>
          <PastMeetings />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={transformMeetings(meetings)} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={transformMeetings(meetings)} type="past" />;
}

// Ensure proper type conversion
function transformMeetings(apiMeetings: APIResponseMeeting[]): Meeting[] {
  return apiMeetings.map((m) => ({
    id: m.event.id,
    event: { title: m.event.title },
    name: m.event.user.name ?? "Unknown", // Convert null/undefined to a string
    additionalInfo: m.event.description ?? "", // Convert null to an empty string
    startTime: m.startTime.toString(),
    endTime: m.endTime.toString(),
    meetLink: m.meetLink,
  }));
}
