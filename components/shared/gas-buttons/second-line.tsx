"use client";
import React from "react";
import Image from "next/image";

import { createPublicClient, http, formatGwei } from "viem";
import { avalanche, fantom } from "viem/chains";

import { Button } from "@/components/ui/button";
import { BiHide, BiShow } from "react-icons/bi";
import { Loader } from "lucide-react";

const networks = [
  {
    key: "avalanche",
    label: "Avalanche",
    chain: avalanche,
    logo: "/logos/avalancheLogo.png",
    buttonVariant: "optimismButton" as const,
  },
  {
    key: "fantom",
    label: "Fantom",
    chain: fantom,
    logo: "/logos/phantomLogo.png",
    buttonVariant: "fantomButton" as const,
  },
];

interface Props {
  globalVisible: boolean;
}

export const SecondLine = ({ globalVisible }: Props) => {
  const [visible, setVisible] = React.useState<Record<string, boolean>>(
    Object.fromEntries([
      ...networks.map((n) => [n.key, globalVisible]),
      ["Linea", globalVisible],
    ])
  );

  const [gasPrices, setGasPrices] = React.useState<Record<string, string>>({});

  const toggle = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  React.useEffect(() => {
    setVisible(
      Object.fromEntries([
        ...networks.map((n) => [n.key, globalVisible]),
        ["Linea", globalVisible],
      ])
    );
  }, [globalVisible]);

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
      <h3 className="mt-8 text-center text-3xl mb-4">Others</h3>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
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
