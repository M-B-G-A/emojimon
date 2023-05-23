import { MUDChain, latticeTestnet } from "@latticexyz/common/chains";
import { foundry } from "@wagmi/chains";

export const localTestnet = {
    name: "Foundry",
    id: 31337,
    network: "foundry",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: {
      default: {
        http: ["https://foundry.buidl.day"],
        webSocket: ["wss://foundry.buidl.day"],
      },
      public: {
        http: ["https://foundry.buidl.day"],
        webSocket: ["wss://foundry.buidl.day"],
      },
    },
    // modeUrl: "https://mode.testnet-mud-services.linfra.xyz",
    // faucetUrl: "https://faucet.hackathon-mud-services.linfra.xyz",
} as const satisfies MUDChain;

export const hackathonTestnet = {
  name: "Hackathon Testnet",
  id: 16464,
  network: "hackathon-testnet",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://lattice-goerli-sequencer.optimism.io"],
      webSocket: ["wss://lattice-goerli-sequencer.optimism.io", "wss://lattice-goerli-sequencer.optimism.io/ws"],
    },
    public: {
      http: ["https://lattice-goerli-sequencer.optimism.io"],
      webSocket: ["wss://lattice-goerli-sequencer.optimism.io", "wss://lattice-goerli-sequencer.optimism.io/ws"],
    },
  },
  // modeUrl: "https://mode.testnet-mud-services.linfra.xyz",
  faucetUrl: "https://faucet.hackathon-mud-services.linfra.xyz",
} as const satisfies MUDChain;


// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = [import.meta.env.PROD ? localTestnet : foundry, latticeTestnet, hackathonTestnet];
