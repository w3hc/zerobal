import { ThemingProps } from '@chakra-ui/react'
import { Chain } from '@wagmi/core'

export const SITE_NAME = 'Zerobal'
export const SITE_DESCRIPTION = 'Testing all wallets.'
export const SITE_URL = 'erobal.netlify.app'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'artherachain'
export const SOCIAL_GITHUB = 'w3hc/zerobal'

export const artheraDevnet: Chain = {
  id: 10245,
  name: 'Arthera Devnet',
  network: 'artheraDevnet',
  nativeCurrency: {
    decimals: 18,
    name: 'AA',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc-dev.arthera.net'] },
    default: { http: ['https://rpc-dev.arthera.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Arthera Devnet Explorer', url: 'https://explorer-dev.arthera.net' },
    default: { name: 'Arthera Devnet Explorer', url: 'https://explorer-dev.arthera.net' },
  },
} as const satisfies Chain

export const ETH_CHAINS = [artheraDevnet]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
