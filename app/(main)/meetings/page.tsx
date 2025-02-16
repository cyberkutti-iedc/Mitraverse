import { Suspense } from "react";
import { getUserMeetings } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";

interface Meeting {
  id: string;
  event: { title: string };
  name: string;
  additionalInfo: string;
  startTime: string;
  endTime: string;
  meetLink: string;
}

interface APIResponseMeeting {
  event: {
    id: string;
    title: string;
    user: { name?: string };
    description?: string;
  };
  startTime: string;
  endTime: string;
  meetLink: string;
}


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

function transformMeetings(apiMeetings: APIResponseMeeting[]): Meeting[] {
  return apiMeetings.map((m) => ({
    id: m.event.id,
    event: { title: m.event.title },
    name: m.event.user.name ?? "Unknown",
    additionalInfo: m.event.description ?? "",
    startTime: m.startTime,
    endTime: m.endTime,
    meetLink: m.meetLink,
  }));
}
