
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import EmailModal from "./EmailModal";

export default function CtaBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState<"creator" | "deployer" | null>(null);
  const { ref, getParallaxStyle } = useScrollAnimation();
  
  const openModal = (type: "creator" | "deployer") => {
    setUserType(type);
    setModalOpen(true);
  };
  
  return (
    <>
      <section 
        ref={ref}
        className="py-16 w-full bg-black parallax"
        style={getParallaxStyle(0.08)}
      >
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <button
              onClick={() => openModal("creator")}
              className="w-64 py-3 px-6 bg-creator text-white font-semibold rounded-md hover:bg-creator-hover transition-all duration-300"
            >
              I Want to Create
            </button>
            <button
              onClick={() => openModal("deployer")}
              className="w-64 py-3 px-6 bg-deployer text-white font-semibold rounded-md hover:bg-deployer-hover transition-all duration-300"
            >
              I Want to Deploy
            </button>
          </div>
        </div>
      </section>
      
      <EmailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        userType={userType}
      />
    </>
  );
}
