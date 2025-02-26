
"use client";

import React, { useEffect, useState } from "react"; 
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { usernameSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns";

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const [origin, setOrigin] = useState("");

  // ✅ Fix: Ensure `window.location.origin` is only accessed on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  const { loading: loadingUsername,  error, fn } = useFetch(updateUsername);

  const onSubmit = async (data: { username: string }) => {
    fn(data.username);
  };

  useEffect(() => {
    if (isLoaded) {
      setValue("username", user?.username || "");
    }
  }, [isLoaded, user?.username, setValue]); 

  interface Meeting {
    id: string;
    event: { title: string };
    startTime: string;
    name: string;
  }

  const {
    loading: loadingUpdates,
    data: upcomingMeetingsRaw,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  const upcomingMeetings: Meeting[] = upcomingMeetingsRaw ?? []; 

  useEffect(() => {
    fnUpdates();
  }, [fnUpdates]); 

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}!</CardTitle>
        </CardHeader>
        <CardContent>
          {!loadingUpdates ? (
            <div className="space-y-6 font-light">
              <div>
                {upcomingMeetings.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {upcomingMeetings.map((meeting: Meeting) => (
                      <li key={meeting.id}>
                        {meeting.event.title} on{" "}
                        {format(new Date(meeting.startTime), "MMM d, yyyy h:mm a")}{" "}
                        with {meeting.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No upcoming meetings</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading updates...</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{origin}/</span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
            </div>
            {loadingUsername && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
            <Button type="submit" disabled={loadingUsername}>
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
