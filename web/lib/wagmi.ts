import { http, createConfig } from "wagmi";
import { polygonAmoy, sepolia } from "wagmi/chains";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export const config = createConfig({
  chains: [polygonAmoy, sepolia],
  transports: {
    [polygonAmoy.id]: http(`https://polygon-amoy.g.alchemy.com/v2/${alchemyKey}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`)
  }
});
