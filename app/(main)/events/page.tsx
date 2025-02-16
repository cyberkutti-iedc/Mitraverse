import { Suspense } from "react";
import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";




export default function EventsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[50vh]">
      <p className="text-gray-500">Loading events...</p>
    </div>}>
      <Events />
    </Suspense>
  );
}

async function Events() {
  const { events, username } = await getUserEvents();

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <p className="text-gray-500 text-lg">You haven&apos;t created any events yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          username={username ?? "Unknown"} 
        />
      ))}
    </div>
  );
}