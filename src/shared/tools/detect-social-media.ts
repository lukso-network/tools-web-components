/**
 * Social media detection with profile vs post classification.
 *
 * Each platform has a list of domains and an optional `postPattern` regex
 * that matches the URL pathname for individual content (posts, videos, etc.).
 * If the pathname matches `postPattern`, type is 'post'; otherwise 'profile'.
 *
 * Post patterns per platform:
 *
 * | Platform    | Post patterns                                          | Example post URL                          |
 * |-------------|--------------------------------------------------------|-------------------------------------------|
 * | Instagram   | /p/<id>, /reel/<id>, /stories/<user>/<id>               | instagram.com/p/ABC123                    |
 * | YouTube     | /watch, /shorts/<id>, /live/<id>, /embed/<id>,         | youtube.com/watch?v=xyz                   |
 * |             | youtu.be/<videoId>                                     | youtu.be/dQw4w9WgXcQ                     |
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

type SocialMediaEntry = {
  domains: string[]
  postPattern?: RegExp | ((host: string, pathname: string) => boolean)
}

const SOCIAL_MEDIA = {
  facebook: {
    domains: ['facebook.com', 'messenger.com', 'fb.com', 'fb.me'],
    postPattern: /^\/(photo|video|watch|reel|share|.+\/posts\/|.+\/videos\/)/i,
  },
  x: {
    domains: ['x.com', 'twitter.com', 't.co'],
    postPattern: /^\/[^/]+\/status\//i,
  },
  instagram: {
    domains: ['instagram.com'],
    postPattern: /^\/(p|reel|stories)\//i,
  },
  medium: {
    domains: ['medium.com'],
    postPattern: /\/.*-[0-9a-f]{12,}/i,
  },
  discord: {
    domains: ['discord.com', 'discordapp.com', 'discord.gg'],
  },
  snapchat: {
    domains: ['snapchat.com'],
  },
  whatsapp: {
    domains: ['whatsapp.com', 'wa.me'],
  },
  telegram: {
    domains: ['telegram.com', 't.me', 'telegram.org'],
  },
  linkedin: {
    domains: ['linkedin.com'],
    postPattern: /^\/(posts|pulse|feed\/update)\//i,
  },
  github: {
    domains: ['github.com'],
    postPattern: /^\/[^/]+\/[^/]+/i,
  },
  'universal-page': {
    domains: ['universal.page'],
  },
  youtube: {
    domains: ['youtube.com', 'youtu.be', 'youtube-nocookie.com'],
    postPattern: (host: string, pathname: string) =>
      host === 'youtu.be'
        ? /^\/[A-Za-z0-9_-]+/.test(pathname)
        : /^\/(watch|shorts\/|live\/|embed\/)/i.test(pathname),
  },
  spotify: {
    domains: ['spotify.com'],
    postPattern: /^\/(track|episode|album)\//i,
  },
  soundcloud: {
    domains: ['soundcloud.com'],
    postPattern: /^\/[^/]+\/[^/]+/i,
  },
  warpcast: {
    domains: ['warpcast.com'],
    postPattern: /^\/[^/]+\/0x/i,
  },
  tiktok: {
    domains: ['tiktok.com'],
    postPattern: /^\/@[^/]+\/video\//i,
  },
} satisfies Record<string, SocialMediaEntry>

/**
 * Detect social media from a given URL and classify as profile or post.
 *
 * @param url - The URL to check
 * @returns Object with `platform` and `type` ('profile' | 'post'), or undefined
 */
type SocialMediaPlatform = keyof typeof SOCIAL_MEDIA

export const detectSocialMedia = (
  url?: string
): { platform: SocialMediaPlatform; type: 'profile' | 'post' } | undefined => {
  if (!url) {
    return
  }

  try {
    const { hostname, pathname } = new URL(url)
    const host = hostname.replace(/^www\./, '')

    for (const [platform, { domains, postPattern }] of Object.entries(
      SOCIAL_MEDIA
    ) as [SocialMediaPlatform, SocialMediaEntry][]) {
      const match = domains.some(
        domain => host === domain || host.endsWith(`.${domain}`)
      )

      if (match) {
        const isPost =
          typeof postPattern === 'function'
            ? postPattern(host, pathname)
            : postPattern?.test(pathname)
        return { platform, type: isPost ? 'post' : 'profile' }
      }
    }
  } catch {
    return
  }
}
