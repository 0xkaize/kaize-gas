import { createPublicClient, http } from 'viem';
import { linea, mainnet } from 'viem/chains';

export const publicClient = createPublicClient({ 
  chain: mainnet,
  transport: http()
})

export const lineaClient = createPublicClient({
  chain: linea,
  transport: http(),
})