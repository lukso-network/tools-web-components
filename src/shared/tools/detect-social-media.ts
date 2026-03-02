/**
 * Social media detection with profile vs post classification.
 *
 * Each platform has two regexes:
 * - `post`: matches individual content URLs (posts, videos, articles, etc.)
 * - `profile`: matches profile/channel/root URLs
 *
 * The function checks `post` first (more specific), then `profile`.
 *
 * Post patterns per platform:
 *
 * | Platform    | Post patterns                                          | Example post URL                          |
 * |-------------|--------------------------------------------------------|-------------------------------------------|
 * | Instagram   | /p/<id>, /reel/<id>, /stories/<user>/<id>               | instagram.com/p/ABC123                    |
 * | YouTube     | /watch, /shorts/<id>, /live/<id>                       | youtube.com/watch?v=xyz                   |
 * | X/Twitter   | /<user>/status/<id>                                    | x.com/user/status/123                     |
 * | Facebook    | /photo, /video, /posts/<id>, /watch, /reel, /share     | facebook.com/user/posts/123               |
 * | TikTok      | /<user>/video/<id>                                     | tiktok.com/@user/video/123                |
 * | LinkedIn    | /posts/<id>, /pulse/<slug>, /feed/update/              | linkedin.com/posts/user_123               |
 * | Medium      | path ending with -<12+ hex chars>                      | medium.com/@user/article-abc123def456     |
 * | GitHub      | /<user>/<repo> (2+ path segments)                      | github.com/lukso-network/tools            |
 * | Warpcast    | /<user>/0x<hash>                                       | warpcast.com/user/0xabc                   |
 * | Spotify     | /track/, /episode/, /album/                            | open.spotify.com/track/xyz                |
 * | SoundCloud  | /<user>/<track> (2 segments)                           | soundcloud.com/artist/song                |
 */

const SOCIAL_MEDIA: Record<string, { post: RegExp; profile: RegExp }> = {
  facebook: {
    post: /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/(photo|video|watch|reel|share|.+\/posts\/|.+\/videos\/)/i,
    profile:
      /^https?:\/\/(www\.)?(facebook\.com|messenger\.com|fb\.com|fb\.me)(\/|$)/i,
  },
  x: {
    post: /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[^/]+\/status\//i,
    profile: /^https?:\/\/(www\.)?(x\.com|twitter\.com|t\.co)(\/|$)/i,
  },
  instagram: {
    post: /^https?:\/\/(www\.)?instagram\.com\/(p|reel|stories)\//i,
    profile: /^https?:\/\/(www\.)?instagram\.com(\/|$)/i,
  },
  medium: {
    post: /^https?:\/\/(www\.)?medium\.com\/.*-[0-9a-f]{12,}/i,
    profile: /^https?:\/\/(www\.)?medium\.com(\/|$)/i,
  },
  discord: {
    post: /(?!)/,
    profile:
      /^https?:\/\/(www\.)?(discord\.com|discordapp\.com|discord\.gg)(\/|$)/i,
  },
  snapchat: {
    post: /(?!)/,
    profile: /^https?:\/\/(www\.)?snapchat\.com(\/|$)/i,
  },
  whatsapp: {
    post: /(?!)/,
    profile: /^https?:\/\/(www\.)?(whatsapp\.com|wa\.me)(\/|$)/i,
  },
  telegram: {
    post: /(?!)/,
    profile:
      /^https?:\/\/(www\.|web\.)?(telegram\.com|t\.me|telegram\.org)(\/|$)/i,
  },
  linkedin: {
    post: /^https?:\/\/(www\.)?linkedin\.com\/(posts|pulse|feed\/update)\//i,
    profile: /^https?:\/\/(www\.)?linkedin\.com(\/|$)/i,
  },
  github: {
    post: /^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+/i,
    profile: /^https?:\/\/(www\.)?github\.com(\/|$)/i,
  },
  'universal-page': {
    post: /(?!)/,
    profile: /^https?:\/\/(www\.)?universal\.page(\/|$)/i,
  },
  youtube: {
    post: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch|shorts\/|live\/|embed\/)/i,
    profile:
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)(\/|$)/i,
  },
  spotify: {
    post: /^https?:\/\/(www\.|open\.)?spotify\.com\/(track|episode|album)\//i,
    profile: /^https?:\/\/(www\.|open\.)?spotify\.com(\/|$)/i,
  },
  soundcloud: {
    post: /^https?:\/\/(www\.)?soundcloud\.com\/[^/]+\/[^/]+/i,
    profile: /^https?:\/\/(www\.)?soundcloud\.com(\/|$)/i,
  },
  warpcast: {
    post: /^https?:\/\/(www\.)?warpcast\.com\/[^/]+\/0x/i,
    profile: /^https?:\/\/(www\.)?warpcast\.com(\/|$)/i,
  },
  tiktok: {
    post: /^https?:\/\/(www\.)?tiktok\.com\/@[^/]+\/video\//i,
    profile: /^https?:\/\/(www\.)?tiktok\.com(\/|$)/i,
  },
}

/**
 * Detect social media from a given URL and classify as profile or post.
 *
 * @param url - The URL to check
 * @returns Object with `platform` and `type` ('profile' | 'post'), or undefined
 */
export const detectSocialMedia = (
  url?: string
): { platform: string; type: 'profile' | 'post' } | undefined => {
  if (!url) {
    return
  }

  try {
    // Validate URL
    new URL(url)

    for (const [platform, { post, profile }] of Object.entries(SOCIAL_MEDIA)) {
      if (post.test(url)) {
        return { platform, type: 'post' }
      }

      if (profile.test(url)) {
        return { platform, type: 'profile' }
      }
    }
  } catch {
    return
  }
}
