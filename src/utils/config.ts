import { ThemingProps } from '@chakra-ui/react'
import { Chain } from '@wagmi/core'

export const SITE_NAME = 'Zerobal'
export const SITE_DESCRIPTION = 'Testing all wallets.'
export const SITE_URL = 'zerobal.netlify.app'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'artherachain'
export const SOCIAL_GITHUB = 'w3hc/zerobal'

export const artheraMainnet: Chain = {
  id: 10242,
  name: 'Arthera Mainnet',
  network: 'artheraMainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'AA',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc.arthera.net'] },
    default: { http: ['https://rpc.arthera.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Arthera Explorer', url: 'https://explorer.arthera.net' },
    default: { name: 'Arthera Explorer', url: 'https://explorer.arthera.net' },
  },
} as const satisfies Chain

export const ETH_CHAINS = [artheraMainnet]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
