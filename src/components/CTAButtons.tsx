import { useState } from "react";
import EmailModal from "./EmailModal";

export default function CTAButtons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState<"creator" | "deployer" | null>(null);
  
  const openModal = (type: "creator" | "deployer") => {
    setUserType(type);
    setModalOpen(true);
  };
  
  return (
    <div id="cta-buttons">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 py-8">
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
      
      <EmailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        userType={userType}
      />
    </div>
  );
}