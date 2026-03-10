/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero3D } from "./components/Hero3D";
import { ProductTypes3D } from "./components/ProductTypes3D";
import { DesignStudio3D } from "./components/DesignStudio3D";
import { FabricDetail } from "./components/FabricDetail";
import { SocialProof } from "./components/SocialProof";
import { BrandStory } from "./components/BrandStory";
import { ClientLogos } from "./components/ClientLogos";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-ink-bg text-ink-text min-h-screen selection:bg-accent-purple/30 selection:text-white">
      <Navbar />
      <main>
        <Hero3D />
        <ProductTypes3D />
        <DesignStudio3D />
        <FabricDetail />
        <SocialProof />
        <BrandStory />
        <ClientLogos />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
