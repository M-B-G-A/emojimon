import { MUDChain, latticeTestnet } from "@latticexyz/common/chains";
import { foundry } from "@wagmi/chains";

export const hackathonTestnet = {
    name: "Hackathon Testnet",
    id: 16464,
    network: "hackathon-testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: {
      default: {
        http: ["https://lattice-goerli-sequencer.optimism.io"],
        webSocket: ["wss://lattice-goerli-sequencer.optimism.io"],
      },
      public: {
        http: ["https://lattice-goerli-sequencer.optimism.io"],
        webSocket: ["wss://lattice-goerli-sequencer.optimism.io"],
      },
    },
    // modeUrl: "https://mode.testnet-mud-services.linfra.xyz",
    faucetUrl: "https://faucet.hackathon-mud-services.linfra.xyz",
  } as const satisfies MUDChain;

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = [foundry, latticeTestnet, hackathonTestnet];
