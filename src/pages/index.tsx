import { Text, Button, useToast, ListItem, UnorderedList } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
// import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../utils/nft'
import { TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI } from '../utils/token'
import { useEthersSigner, useEthersProvider } from '../hooks/ethersAdapter'

export default function Home() {
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  const signer = useEthersSigner()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [isError, setIsError] = useState<string>()

  useEffect(() => {
    const init = async () => {
      if (chain?.id !== 10243) {
        switchNetwork?.(10243)
      }
    }
    init()
    // console.log('isConnected:', isConnected)
    // console.log('network:', chain?.name)
    // console.log('signer:', signer)
    // console.log('signer.address:', signer?.address)
    console.log('Contract address:', TOKEN_CONTRACT_ADDRESS)
    // console.log('provider:', provider)
  }, [signer])

  const mint = async () => {
    try {
      if (!signer) {
        toast({
          title: 'No wallet',
          description: 'Please connect your wallet first.',
          status: 'error',
          position: 'bottom',
          variant: 'subtle',
          duration: 9000,
          isClosable: true,
        })
        return
      }
      setIsLoading(true)
      setTxHash('')
      setTxLink('')
      const nft = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer)
      const call = await nft.mint(ethers.parseEther('10000'))
      const receipt = await call.wait()
      console.log('tx:', receipt)
      setTxHash(receipt.hash)
      setTxLink('https://explorer.arthera.net/tx/' + receipt.hash)
      setIsLoading(false)
      toast({
        title: 'Successful mint',
        description: 'Successful mint! 🎉',
        status: 'success',
        position: 'bottom',
        variant: 'subtle',
        duration: 20000,
        isClosable: true,
      })
    } catch (e) {
      setIsLoading(false)
      setIsError('It seems like the wallet you just tested CANNOT interact with a balance of 0 AA.')
      console.log('error:', e)
      toast({
        title: 'Woops',
        description: 'Something went wrong during the minting process...',
        status: 'error',
        position: 'bottom',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h4">1. Connect to a wallet</HeadingComponent>
        <HeadingComponent as="h4">2. Add Arthera Mainnet to this wallet:</HeadingComponent>
        <UnorderedList mt={5} ml={8}>
          <ListItem>
            Network name: <strong>Arthera Mainnet</strong>
          </ListItem>
          <ListItem>
            RPC Endpoint URL: <strong>https://rpc.arthera.net</strong>
          </ListItem>
          <ListItem>
            Chain ID: <strong>10242</strong>
          </ListItem>
          <ListItem>
            Currency symbol: <strong>AA</strong>
          </ListItem>
          <ListItem>
            Block explorer URL: <strong>https://explorer.arthera.net</strong>
          </ListItem>
        </UnorderedList>

        <Text py={4} fontSize="16px" color="#45a2f8">
          <LinkComponent href={'https://docs.arthera.net/build/networks#arthera-mainnet'}>View the network details in our docs</LinkComponent>
        </Text>
        <HeadingComponent as="h4">3. Click on the &apos;mint&apos; button:</HeadingComponent>

        <Button
          mt={4}
          colorScheme="blue"
          variant="outline"
          type="submit"
          onClick={mint}
          isLoading={isLoading}
          loadingText="Minting..."
          spinnerPlacement="end">
          Mint
        </Button>
        {txHash && (
          <Text py={4} fontSize="16px" color="#45a2f8">
            Test successful ✅ <LinkComponent href={txLink ? txLink : ''}>{txHash}</LinkComponent>
          </Text>
        )}
        {isError && (
          <Text py={4} fontSize="16px" color="#FF0000">
            {isError}
          </Text>
        )}
        <HeadingComponent as="h4">4. Report the result</HeadingComponent>
      </main>
    </>
  )
}
