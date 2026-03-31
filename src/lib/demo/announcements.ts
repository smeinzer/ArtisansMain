export interface DemoAnnouncement {
  id: string;
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const demoAnnouncements: DemoAnnouncement[] = [
  {
    id: "announce-001",
    title: "Spring Gallery Opening: New Work by Margaret Chen & Thomas Blackwood",
    body: "Join us Saturday, April 12th from 5-8 PM for an evening celebrating new paintings by Margaret Chen and recent kiln work from Thomas Blackwood. Enjoy light refreshments, meet the artists, and be the first to see their latest pieces. The gallery will remain open late, and all exhibited work will be available for purchase.",
    startDate: "2026-03-25T00:00:00Z",
    endDate: "2026-04-12T23:59:59Z",
    isActive: true,
  },
  {
    id: "announce-002",
    title: "Now Accepting Consignment Applications for 2026",
    body: "We are currently reviewing portfolios from regional artists working in all media. If you are a maker based in Western North Carolina and are interested in placing your work in our gallery, we would love to hear from you. Please submit 10-15 images of recent work along with a brief artist statement to hello@artisansonmain.com. Applications are reviewed on a rolling basis.",
    startDate: "2026-03-01T00:00:00Z",
    endDate: "2026-06-30T23:59:59Z",
    isActive: true,
  },
];
