import { useState } from "react";
import { Plus } from "lucide-react";
import EmailModal from "./EmailModal";

export default function FloatingCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState<"creator" | "deployer" | null>(null);
  const [expanded, setExpanded] = useState(false);
  
  const openModal = (type: "creator" | "deployer") => {
    setUserType(type);
    setModalOpen(true);
    setExpanded(false);
  };

  return (
    <>
      {/* Floating Button Group */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end space-y-3">
          {/* Expanded buttons */}
          {expanded && (
            <div className="flex flex-col space-y-2 animate-fade-in">
              <button
                onClick={() => openModal("creator")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 whitespace-nowrap"
              >
                I Want to Create
              </button>
              <button
                onClick={() => openModal("deployer")}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-lg hover:bg-secondary/80 transition-all duration-300 whitespace-nowrap"
              >
                I Want to Deploy
              </button>
            </div>
          )}
          
          {/* Main toggle button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center ${expanded ? 'rotate-45' : ''}`}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <EmailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        userType={userType}
      />
    </>
  );
}