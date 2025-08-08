"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [tick, setTick] = useState(Date.now());
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.emailAddresses[0]?.emailAddress) {
      fetch(
        `/api/purchases?email=${encodeURIComponent(
          user.emailAddresses[0].emailAddress
        )}`
      )
        .then((res) => res.json())
        .then((data) => setPurchases(data))
        .catch((err) => console.error("Failed to fetch purchases", err));
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <>
      <div className="w-full bg-zinc-900 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50 shadow">
        <a href="/" className="text-lg font-semibold hover:text-gray-300 transition">
          ⬅
        </a>
        <button
          onClick={() => window.location.href = "/sign-out"}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="max-w-xl mx-auto pt-20 text-center px-6">
        <h1 className="text-3xl font-bold mb-4 mt-5">Logged In</h1>
        <p className="text-lg">
          Welcome back, {user?.emailAddresses[0]?.emailAddress}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your Purchases</h2>
          {purchases.length > 0 ? (
            <div className="grid gap-4">
              {purchases.map((purchase, index) => {
                const purchaseDate = new Date(purchase.date);
                const expiryDate = new Date(
                  purchaseDate.getTime() + 72 * 60 * 60 * 1000
                );
                const now = new Date();
                const timeLeft = Math.max(
                  expiryDate.getTime() - now.getTime(),
                  0
                );

                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor(
                  (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                return (
                  <div
                    key={index}
                    className="p-4 border rounded-md shadow-sm text-left bg-white dark:bg-zinc-900"
                  >
                    <h3 className="text-lg font-semibold">{purchase.itemName}</h3>
                    <p className="text-sm text-gray-500">
                      Order ID: {purchase.orderId}
                    </p>
                    <p className="text-sm text-gray-500">
                      Device UDID: {purchase.udid}
                    </p>
                    <p className="text-sm text-gray-500">
                      Instructions: {purchase.message}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Purchased: {purchaseDate.toLocaleString()}
                    </p>
                    {purchase.delivered ? (
                      <button
                        onClick={() => {
                          setActiveModal(index);
                          setActiveVideo(0);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Open Signing Guide
                      </button>
                    ) : timeLeft > 0 ? (
                      <p className="text-sm font-medium text-yellow-600">
                        Estimated arrival in {hours}h {minutes}m {seconds}s
                      </p>
                    ) : (
                      <button
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        disabled
                      >
                        Download Certificate
                      </button>
                    )}
                  </div>
                );
              })}
              {activeModal !== null && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-xl relative">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    >
                      ✕
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Download & Sign Your App</h2>

                    <a
                      href="/loyahdev-buyers-0.01.zip"
                      download
                      className="block w-full mb-4 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Download Certificate
                    </a>

                    <div className="mb-4">
                      {activeVideo === 0 && (
                        <video controls className="w-full rounded aspect-video">
                          <source src="/esigntutorial-2.mp4" type="video/mp4" />
                        </video>
                      )}
                      {activeVideo === 1 && (
                        <video controls className="w-full rounded aspect-video">
                          <source src="/scarlettutorial-2.mp4" type="video/mp4" />
                        </video>
                      )}
                      {activeVideo === 2 && (
                        <video controls className="w-full rounded aspect-video">
                          <source src="/feathertutorial-2.mp4" type="video/mp4" />
                        </video>
                      )}
                    </div>

                    <div className="flex justify-center gap-2 mb-4">
                      {["eSign", "Scarlet", "Feather"].map((label, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveVideo(i)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            activeVideo === i
                              ? "bg-blue-600 text-white"
                              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      <a
                        href="https://ipasign.pro/s/1745272322367_4nuxx7"
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded"
                        target="_blank"
                      >
                        Install eSign
                      </a>
                      <a
                        href="https://ipasign.pro/s/1745272423841_e6yswo"
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded"
                        target="_blank"
                      >
                        Install Scarlet
                      </a>
                      <a
                        href="https://ipasign.pro/s/1745272458948_836tfb"
                        className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded"
                        target="_blank"
                      >
                        Install Feather
                      </a>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                      Make sure to remove any DNS or VPN profiles that interfere with sideloading from enterprise certs. If you get a developer mode popup go to <strong>Settings &gt; Privacy and Security</strong> and enable it at the bottom.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No purchases found.</p>
          )}
        </div>
        <div className="mt-8">
          <a
            href="https://billing.stripe.com/p/login/dR64jJcko49o5vqeUU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-700 text-white font-medium rounded-full shadow-md hover:bg-purple-800 transition"
          >
            Manage Billing in Stripe
          </a>
        </div>
      </div>
    </>
  );
}
