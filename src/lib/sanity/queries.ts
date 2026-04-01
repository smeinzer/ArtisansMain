export const getSiteSettings = `*[_type == "siteSettings"][0]`;

export const getArtists = `*[_type == "artist"] | order(name asc)`;

export const getArtistBySlug = `*[_type == "artist" && slug.current == $slug][0]`;

export const getActiveAnnouncements = `*[_type == "announcement" && isActive == true && startDate <= now() && endDate >= now()]`;

export const getHomepageConfig = `*[_type == "homepageConfig"][0]`;

export const getPageBySlug = `*[_type == "page" && slug.current == $slug][0]`;
