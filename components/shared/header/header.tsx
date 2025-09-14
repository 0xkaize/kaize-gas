"use client";
import React from "react";

import { publicClient } from "@/client/publicClient";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaGasPump, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { formatGwei } from "viem/utils";
import { getEthPrice } from "@/utils/get-eth-price";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const [gas, setGas] = React.useState("");
  const [gasLoad, setGasLoad] = React.useState(false);

  const [price, setPrice] = React.useState<number | null>(null);
  const [priceLoad, setPriceLoad] = React.useState(false);

  React.useEffect(() => {
    async function fetchGas() {
      setGasLoad(true);
      try {
        const gs = await publicClient.getGasPrice();
        setGas(formatGwei(gs).slice(0, 5));
      } finally {
        setGasLoad(false);
      }
    }

    fetchGas();
    const interval = setInterval(fetchGas, 15000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    async function fetchPrice() {
      setPriceLoad(true);

      try {
        const p = await getEthPrice();
        setPrice(p);
      } finally {
        setPriceLoad(false);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-[oklch(0.16_0_0)] border-b border-b-[#202020]",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 py-3 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 text-sm sm:text-md font-extralight">
          <div className="flex items-center gap-1">
            <h3 className="text-[#aeaeae]">ETH price:</h3>
            <p className="text-blue-200">
              {priceLoad ? (
                <AiOutlineLoading3Quarters className="animate-spin w-4 h-4 text-blue-200" />
              ) : (
                `$${price}`
              )}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaGasPump className="text-[#aeaeae]" />
            <h3 className="text-[#aeaeae]">Gas:</h3>
            <p className="text-blue-200 flex gap-1 items-center">
              {gasLoad ? (
                <AiOutlineLoading3Quarters className="animate-spin w-4 h-4 text-blue-200" />
              ) : (
                `${gas} `
              )}
              Gwei
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://github.com/0xkaize/kaize-gas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="github" size="sm">
              <FaGithub />
              Github
            </Button>
          </a>
          <a
            href="https://x.com/0x_kaize"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="github" size="sm">
              <FaXTwitter />
              <span className="hidden sm:inline">Follow @0x_kaize</span>
              <span className="sm:hidden">Follow</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
