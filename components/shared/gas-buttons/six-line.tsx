"use client";
import React from "react";

import { createPublicClient, http, formatGwei } from "viem";
import { katana, monadTestnet, morph, plumeMainnet, reddio } from "viem/chains";

import { Button } from "@/components/ui/button";
import { BiHide, BiShow } from "react-icons/bi";
import { Loader } from "lucide-react";
import Image from "next/image";

const networks = [
  {
    key: "katana",
    label: "Katana",
    chain: katana,
    logo: "/logos/katanaLogo.png",
    buttonVariant: "blastButton" as const,
  },

  {
    key: "morph",
    label: "Morph",
    chain: morph,
    logo: "/logos/morphLogo.png",
    buttonVariant: "abstractButton" as const,
  },
  {
    key: "plumeMainnet",
    label: "Plume Mainnet",
    chain: plumeMainnet,
    logo: "/logos/plumeLogo.png",
    buttonVariant: "optimismButton" as const,
  },
  {
    key: "reddio",
    label: "Reddio",
    chain: reddio,
    logo: "/logos/reddioLogo.png",
    buttonVariant: "optimismButton" as const,
  },
];

interface Props {
  globalVisible: boolean;
}

export const SixLine = ({ globalVisible }: Props) => {
  const [visible, setVisible] = React.useState<Record<string, boolean>>(
    Object.fromEntries(networks.map((n) => [n.key, true]))
  );
  const [gasPrices, setGasPrices] = React.useState<Record<string, string>>({});

  const toggle = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  React.useEffect(() => {
    setVisible(Object.fromEntries(networks.map((n) => [n.key, globalVisible])));
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
          results[net.key] = formatGwei(gp).slice(0, 9);
        } catch {
          results[net.key] = "N/A";
        }
      }
      setGasPrices(results);
    }
    fetchGas();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {networks.map((net) => {
          const isVisible = visible[net.key] && globalVisible;
          const price = gasPrices[net.key];

          return (
            <Button
              key={net.key}
              size="sm"
              variant={net.buttonVariant}
              className="flex items-center gap-2 mt-1 md:my-2"
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
