import { describe, expect, it } from 'vitest'

import { detectSocialMedia } from '../detect-social-media'

describe('detectSocialMedia', () => {
  describe('facebook', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.facebook.com/')).toEqual({
        platform: 'facebook',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.facebook.com/lukso')).toEqual({
        platform: 'facebook',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.messenger.com/')).toEqual({
        platform: 'facebook',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.fb.com/')).toEqual({
        platform: 'facebook',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.fb.me/')).toEqual({
        platform: 'facebook',
        type: 'profile',
      })
      expect(detectSocialMedia('https://fb.me/')).toEqual({
        platform: 'facebook',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://www.facebook.com/lukso/posts/123456789')
      ).toEqual({ platform: 'facebook', type: 'post' })
      expect(
        detectSocialMedia('https://www.facebook.com/watch/?v=123')
      ).toEqual({ platform: 'facebook', type: 'post' })
      expect(detectSocialMedia('https://www.facebook.com/reel/123456')).toEqual(
        { platform: 'facebook', type: 'post' }
      )
      expect(
        detectSocialMedia('https://www.facebook.com/lukso/videos/123456')
      ).toEqual({ platform: 'facebook', type: 'post' })
      expect(detectSocialMedia('https://www.facebook.com/photo/123')).toEqual({
        platform: 'facebook',
        type: 'post',
      })
      expect(
        detectSocialMedia('https://www.facebook.com/share/p/abc123/')
      ).toEqual({ platform: 'facebook', type: 'post' })
    })
  })

  describe('x', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.x.com/')).toEqual({
        platform: 'x',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.x.com/lukaborskiy')).toEqual({
        platform: 'x',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.twitter.com/')).toEqual({
        platform: 'x',
        type: 'profile',
      })
      expect(detectSocialMedia('https://t.co/')).toEqual({
        platform: 'x',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://x.com/lukaborskiy/status/1234567890')
      ).toEqual({ platform: 'x', type: 'post' })
      expect(
        detectSocialMedia('https://twitter.com/lukaborskiy/status/1234567890')
      ).toEqual({ platform: 'x', type: 'post' })
    })
  })

  describe('instagram', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.instagram.com/')).toEqual({
        platform: 'instagram',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.instagram.com/lukso')).toEqual({
        platform: 'instagram',
        type: 'profile',
      })
      expect(detectSocialMedia('https://instagram.com/lukso/')).toEqual({
        platform: 'instagram',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(detectSocialMedia('https://www.instagram.com/p/ABC123/')).toEqual({
        platform: 'instagram',
        type: 'post',
      })
      expect(
        detectSocialMedia('https://www.instagram.com/reel/ABC123/')
      ).toEqual({ platform: 'instagram', type: 'post' })
      expect(
        detectSocialMedia('https://www.instagram.com/stories/lukso/123456/')
      ).toEqual({ platform: 'instagram', type: 'post' })
    })
  })

  describe('medium', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.medium.com/')).toEqual({
        platform: 'medium',
        type: 'profile',
      })
      expect(detectSocialMedia('https://medium.com/@lukso')).toEqual({
        platform: 'medium',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://medium.com/@lukso/my-article-abc123def456ab')
      ).toEqual({ platform: 'medium', type: 'post' })
    })
  })

  describe('discord', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.discord.com/')).toEqual({
        platform: 'discord',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.discordapp.com/')).toEqual({
        platform: 'discord',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.discord.gg/')).toEqual({
        platform: 'discord',
        type: 'profile',
      })
      expect(detectSocialMedia('https://discord.gg/invite-code')).toEqual({
        platform: 'discord',
        type: 'profile',
      })
    })
  })

  describe('snapchat', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.snapchat.com/')).toEqual({
        platform: 'snapchat',
        type: 'profile',
      })
    })
  })

  describe('whatsapp', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.whatsapp.com/')).toEqual({
        platform: 'whatsapp',
        type: 'profile',
      })
      expect(detectSocialMedia('https://wa.me/')).toEqual({
        platform: 'whatsapp',
        type: 'profile',
      })
    })
  })

  describe('telegram', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.telegram.com/')).toEqual({
        platform: 'telegram',
        type: 'profile',
      })
      expect(detectSocialMedia('https://t.me/')).toEqual({
        platform: 'telegram',
        type: 'profile',
      })
      expect(detectSocialMedia('https://web.telegram.org/')).toEqual({
        platform: 'telegram',
        type: 'profile',
      })
      expect(detectSocialMedia('https://t.me/lukso_channel')).toEqual({
        platform: 'telegram',
        type: 'profile',
      })
    })
  })

  describe('linkedin', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.linkedin.com/')).toEqual({
        platform: 'linkedin',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.linkedin.com/in/username')).toEqual(
        { platform: 'linkedin', type: 'profile' }
      )
      expect(
        detectSocialMedia('https://www.linkedin.com/company/lukso')
      ).toEqual({ platform: 'linkedin', type: 'profile' })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://www.linkedin.com/posts/user_activity-123')
      ).toEqual({ platform: 'linkedin', type: 'post' })
      expect(
        detectSocialMedia('https://www.linkedin.com/pulse/my-article-user')
      ).toEqual({ platform: 'linkedin', type: 'post' })
      expect(
        detectSocialMedia(
          'https://www.linkedin.com/feed/update/urn:li:activity:123'
        )
      ).toEqual({ platform: 'linkedin', type: 'post' })
    })
  })

  describe('github', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.github.com/')).toEqual({
        platform: 'github',
        type: 'profile',
      })
      expect(detectSocialMedia('https://github.com/lukso-network')).toEqual({
        platform: 'github',
        type: 'profile',
      })
    })

    it('should detect post URLs (repos)', () => {
      expect(
        detectSocialMedia(
          'https://github.com/lukso-network/tools-web-components'
        )
      ).toEqual({ platform: 'github', type: 'post' })
      expect(
        detectSocialMedia(
          'https://github.com/lukso-network/tools-web-components/issues/1'
        )
      ).toEqual({ platform: 'github', type: 'post' })
    })
  })

  describe('universal-page', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.universal.page/')).toEqual({
        platform: 'universal-page',
        type: 'profile',
      })
      expect(detectSocialMedia('https://universal.page/some-profile')).toEqual({
        platform: 'universal-page',
        type: 'profile',
      })
    })
  })

  describe('youtube', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.youtube.com/')).toEqual({
        platform: 'youtube',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.youtube.com/@lukso')).toEqual({
        platform: 'youtube',
        type: 'profile',
      })
      expect(
        detectSocialMedia('https://www.youtube.com/channel/UC123')
      ).toEqual({ platform: 'youtube', type: 'profile' })
      expect(detectSocialMedia('https://www.youtube.com/c/lukso')).toEqual({
        platform: 'youtube',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.youtu.be/')).toEqual({
        platform: 'youtube',
        type: 'profile',
      })
      expect(detectSocialMedia('https://youtube-nocookie.com/')).toEqual({
        platform: 'youtube',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      ).toEqual({ platform: 'youtube', type: 'post' })
      expect(
        detectSocialMedia('https://www.youtube.com/shorts/ABC123')
      ).toEqual({ platform: 'youtube', type: 'post' })
      expect(detectSocialMedia('https://www.youtube.com/live/ABC123')).toEqual({
        platform: 'youtube',
        type: 'post',
      })
      expect(
        detectSocialMedia('https://youtube-nocookie.com/embed/dQw4w9WgXcQ')
      ).toEqual({ platform: 'youtube', type: 'post' })
    })
  })

  describe('spotify', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.spotify.com/')).toEqual({
        platform: 'spotify',
        type: 'profile',
      })
      expect(detectSocialMedia('https://open.spotify.com/')).toEqual({
        platform: 'spotify',
        type: 'profile',
      })
      expect(
        detectSocialMedia('https://open.spotify.com/artist/ABC123')
      ).toEqual({ platform: 'spotify', type: 'profile' })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://open.spotify.com/track/ABC123')
      ).toEqual({ platform: 'spotify', type: 'post' })
      expect(
        detectSocialMedia('https://open.spotify.com/episode/ABC123')
      ).toEqual({ platform: 'spotify', type: 'post' })
      expect(
        detectSocialMedia('https://open.spotify.com/album/ABC123')
      ).toEqual({ platform: 'spotify', type: 'post' })
    })
  })

  describe('soundcloud', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.soundcloud.com/')).toEqual({
        platform: 'soundcloud',
        type: 'profile',
      })
      expect(detectSocialMedia('https://soundcloud.com/artist-name')).toEqual({
        platform: 'soundcloud',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://soundcloud.com/artist-name/track-name')
      ).toEqual({ platform: 'soundcloud', type: 'post' })
    })
  })

  describe('warpcast', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.warpcast.com/')).toEqual({
        platform: 'warpcast',
        type: 'profile',
      })
      expect(detectSocialMedia('https://warpcast.com/username')).toEqual({
        platform: 'warpcast',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://warpcast.com/username/0xabc123')
      ).toEqual({ platform: 'warpcast', type: 'post' })
    })
  })

  describe('tiktok', () => {
    it('should detect profile URLs', () => {
      expect(detectSocialMedia('https://www.tiktok.com/')).toEqual({
        platform: 'tiktok',
        type: 'profile',
      })
      expect(detectSocialMedia('https://www.tiktok.com/@lukso')).toEqual({
        platform: 'tiktok',
        type: 'profile',
      })
    })

    it('should detect post URLs', () => {
      expect(
        detectSocialMedia('https://www.tiktok.com/@lukso/video/1234567890')
      ).toEqual({ platform: 'tiktok', type: 'post' })
    })
  })

  describe('unknown URLs', () => {
    it('should return undefined for non-social-media URLs', () => {
      expect(detectSocialMedia('https://www.example.com/')).toBeUndefined()
      expect(detectSocialMedia('https://burntpix.com/')).toBeUndefined()
      expect(detectSocialMedia('https://fast.co/')).toBeUndefined()
    })

    it('should return undefined for invalid input', () => {
      expect(detectSocialMedia('')).toBeUndefined()
      expect(detectSocialMedia()).toBeUndefined()
      expect(detectSocialMedia('test@gmail.com')).toBeUndefined()
    })
  })
})
