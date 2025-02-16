export interface Meeting {
    id: string;
    event: { title: string };
    name: string; // Ensures `name` is always a string
    additionalInfo: string; // Ensures `additionalInfo` is always a string
    startTime: string;
    endTime: string;
    meetLink: string;
  }
  
  export interface APIResponseMeeting {
    event: {
      id: string;
      title: string;
      user: { name?: string | null }; // Allow both `null` and `undefined`
      description?: string | null; // Allow both `null` and `undefined`
    };
    startTime: string;
    endTime: string;
    meetLink: string;
  }
  