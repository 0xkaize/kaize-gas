"use client";
import React from "react";

import { createPublicClient, http, formatGwei } from "viem";
import { abstract, berachain, blast, mantle } from "viem/chains";

import { Button } from "@/components/ui/button";
import { BiHide, BiShow } from "react-icons/bi";
import { Loader } from "lucide-react";
import Image from "next/image";

const networks = [
  {
    key: "abs",
    label: "Abstract",
    chain: abstract,
    logo: "/logos/abstractLogo.png",
    buttonVariant: "abstractButton" as const,
  },
  {
    key: "berachain",
    label: "Berachain",
    chain: berachain,
    logo: "/logos/berachainLogo.png",
    buttonVariant: "berachainButton" as const,
  },
  {
    key: "blast",
    label: "Blast",
    chain: blast,
    logo: "/logos/blastLogo.png",
    buttonVariant: "blastButton" as const,
  },
  {
    key: "mantle",
    label: "Mantle",
    chain: mantle,
    logo: "/logos/mantleLogo.png",
    buttonVariant: "mantleButton" as const,
  },
];

interface Props {
  globalVisible: boolean;
}

export const FourthLine = ({ globalVisible }: Props) => {
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
