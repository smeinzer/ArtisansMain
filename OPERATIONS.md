# Artisans On Main -- Daily Operations Cheat Sheet

This guide covers everything you need to manage your website day-to-day. You will use two tools:

- **Shopify** -- where you manage products, pricing, and orders
- **Sanity Studio** -- where you manage everything else on the website (artist profiles, store hours, announcements, homepage content)

---

## Managing Your Shop

### Adding a New Product (Shopify)

1. Log in to your Shopify admin (your-store.myshopify.com/admin)
2. Go to **Products** then click **Add product**
3. Fill in the **Title** (name of the piece), **Description**, and **Price**
4. Upload photos -- at least 2-3 good photos. The first one will be the main image customers see
5. Set **Vendor** to the artist's name. This is important because it links the piece to their artist page on the website
6. Set **Product type** to the category. Use one of these: Painting, Ceramics, Jewelry, Textiles, Sculpture, Photography, Mixed Media
7. Make sure **Active** is selected under Status
8. Click **Save**
9. The product will appear on the website automatically within a few minutes

**Tip:** The Vendor name in Shopify must match the "Shopify Vendor Tag" on the artist's profile in Sanity Studio. If the names don't match exactly, the product won't show up on that artist's page.

### Marking a Product as Sold

1. Go to **Products** in Shopify admin
2. Find the product and click on it
3. Under **Inventory**, set the quantity to 0 -- or -- change the **Status** to "Draft"
4. Click **Save**
5. The product will show as "Sold" on the website

### Removing a Product

1. Go to **Products** in Shopify admin
2. Find the product and click on it
3. Scroll to the bottom and click **Delete product**
4. Confirm the deletion

### Updating a Price

1. Go to **Products** and find the product
2. Change the price in the **Pricing** section
3. Click **Save**

---

## Managing Content (Sanity Studio)

### Accessing the Studio

- Go to your website and add **/studio** to the end of the address (for example: www.artisansonmain.com/studio)
- Log in with your Sanity account

### Updating Store Hours

1. Open the Studio
2. Click **Site Settings** in the sidebar
3. Find the **Hours** section
4. Each row has a Day, Open time, and Close time -- edit whichever ones you need
5. Click the green **Publish** button at the bottom of the screen

### Adding or Editing an Artist

1. Open the Studio
2. Click **Artist** in the sidebar
3. To add a new artist, click the **Create new** button. To edit an existing artist, click their name in the list
4. Fill in:
   - **Name** (required)
   - **Slug** -- click "Generate" and it will create this automatically from the name
   - **Headshot** -- upload a photo of the artist
   - **Bio** -- a short paragraph or two about the artist
   - **Shopify Vendor Tag** -- this must match EXACTLY what you put as the "Vendor" in Shopify for their products
   - **Website** and **Instagram** (optional)
5. Click the green **Publish** button

### Posting an Announcement

Announcements are great for seasonal updates, new artist features, upcoming events, or holiday hours.

1. Open the Studio
2. Click **Announcement** in the sidebar
3. Click the **Create new** button
4. Fill in:
   - **Title** -- a short headline
   - **Body** -- the full message
   - **Start Date** -- the first day the announcement should appear on the website
   - **End Date** -- the day it should stop showing
   - **Is Active** -- make sure this is checked (it is by default)
5. Click the green **Publish** button
6. The announcement will appear on the homepage between the start and end dates

### Updating the Homepage

1. Open the Studio
2. Click **Homepage Config** in the sidebar
3. You can change:
   - **Hero Image** -- the large banner image at the top of the homepage
   - **Hero Headline** -- the big text over the banner image
   - **Hero Subline** -- the smaller text under the headline
   - **Featured Collection Handle** -- if you want to change which group of products is featured (ask your developer if you are unsure what to put here)
4. Click the green **Publish** button

### Updating the Store Address, Phone, or Email

1. Open the Studio
2. Click **Site Settings** in the sidebar
3. Edit the **Address**, **Phone**, or **Email** fields
4. You can also update **Social Links** here (Instagram, Facebook, etc.)
5. Click the green **Publish** button

---

## Contact Form Messages

When someone fills out the contact form on the website, the message is sent to your email through a service called Formspree.

- To see all past messages or change where they are sent, log in at **formspree.io**
- You can set it up so messages go directly to your regular email inbox

---

## Common Questions

### "I updated something but don't see the change on the website"

- Shopify changes usually appear within 1-5 minutes
- Sanity Studio changes usually appear within 1-2 minutes
- Try refreshing the page (Cmd+R on Mac, Ctrl+R on PC)
- If you are on your phone, try closing the browser completely and reopening it
- If the change still does not appear after 5 minutes, try opening the page in a private/incognito browser window -- this rules out old saved versions of the page

### "A customer says they can't check out"

- The checkout process is handled entirely by Shopify -- make sure your Shopify Payments are set up and working
- Check that the product they are trying to buy is in stock (quantity greater than 0) and has its Status set to "Active"

### "A product is not showing up on an artist's page"

- Make sure the **Vendor** field on the product in Shopify matches the **Shopify Vendor Tag** on the artist's profile in Sanity Studio. The spelling must be exactly the same, including capitalization

### "I want to change the store logo"

- Open the Studio, go to **Site Settings**, and upload a new image under **Logo**
- Click **Publish**

### "I want to add a new page to the website"

- Contact your developer -- new pages require code changes

### "The website is down"

- First, check if it is just your internet connection by trying another website
- If other websites work fine, the issue may be with the hosting service. Check vercel.com/status for any reported problems
- Contact your developer if the problem persists
