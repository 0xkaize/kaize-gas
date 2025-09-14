"use client";
import React from "react";
import Image from "next/image";

import { createPublicClient, http, formatGwei } from "viem";
import { mainnet, monadTestnet } from "viem/chains";

import { Button } from "@/components/ui/button";
import { BiHide, BiShow } from "react-icons/bi";
import { Loader } from "lucide-react";

const networks = [
  {
    key: "eth",
    label: "ETH",
    chain: mainnet,
    logo: "/logos/ethLogo.png",
    buttonVariant: "mainButton" as const,
  },
  {
    key: "monadTestnet",
    label: "Monad Testnet",
    chain: monadTestnet,
    logo: "/logos/monadLogo.png",
    buttonVariant: "monadButton" as const,
  },
];

interface Props {
  globalVisible: boolean;
}

export const FirstLine = ({ globalVisible }: Props) => {
  const [visible, setVisible] = React.useState<Record<string, boolean>>(
    Object.fromEntries(networks.map((n) => [n.key, true]))
  );

  const [gasPrices, setGasPrices] = React.useState<Record<string, string>>({});

  const toggle = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  React.useEffect(() => {
    async function fetchGas() {
      const results: Record<string, string> = {};
      for (const net of networks) {
        try {
          const client = createPublicClient({
            chain: net.chain,
            transport: http(),
          });

          const gp = await client.getGasPrice();
          results[net.key] = formatGwei(gp).slice(0, 5);
        } catch (e) {
          results[net.key] = "N/A";
        }
      }

      setGasPrices(results);
    }
    fetchGas();
  }, []);

  return (
    <>
      <h3 className="text-center text-3xl -mb-2">Favourite</h3>
      <div className="mt-6 flex flex-wrap justify-center gap-2 -my-3">
        {networks.map((net) => {
          const isVisible = visible[net.key] && globalVisible;
          const price = gasPrices[net.key];

          return (
            <Button
              key={net.key}
              size="sm"
              variant={net.buttonVariant}
              className="flex items-center gap-2"
              onClick={() => toggle(net.key)}
            >
              <Image
                src={net.logo ?? "/logos/default.png"}
                alt={net.label}
                width={16}
                height={16}
                className="w-4 h-4"
                draggable={false}
              />

              {price ? (
                isVisible ? (
                  `${net.label}: ${price} Gwei`
                ) : (
                  "•••"
                )
              ) : (
                <Loader className="w-4 h-4 animate-spin" />
              )}

              {price &&
                (isVisible ? (
                  <BiShow className="w-4 h-4" />
                ) : (
                  <BiHide className="w-4 h-4" />
                ))}
            </Button>
          );
        })}
      </div>
    </>
  );
};
