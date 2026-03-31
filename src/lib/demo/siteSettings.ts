export interface DemoHours {
  day: string;
  open: string | null;
  close: string | null;
}

export interface DemoSocialLink {
  platform: string;
  url: string;
}

export interface DemoSiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: DemoHours[];
  socialLinks: DemoSocialLink[];
}

export const demoSiteSettings: DemoSiteSettings = {
  businessName: "Artisans On Main",
  tagline: "Handcrafted art from the heart of the Blue Ridge",
  phone: "(828) 555-0192",
  email: "hello@artisansonmain.com",
  address: "18 N Main St, Weaverville, NC 28787",
  hours: [
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "12:00 PM", close: "5:00 PM" },
  ],
  socialLinks: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/artisansonmain",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/artisansonmain",
    },
  ],
};
