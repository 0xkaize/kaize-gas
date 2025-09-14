export async function getEthPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch price");

    const data = await res.json();
    return data.ethereum.usd as number;
  } catch (e) {
    console.error("Error fetching ETH price:", e);
    return null;
  }
}
