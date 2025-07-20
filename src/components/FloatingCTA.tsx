import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* Floating Action Button Group */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end gap-3">
          {/* Expanded Action Buttons */}
          <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${
            expanded 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}>
            <Button
              onClick={() => openModal("creator")}
              variant="default"
              size="default"
              className="shadow-lg backdrop-blur-sm whitespace-nowrap min-w-[140px]"
              aria-label="Open creator signup"
            >
              I Want to Create
            </Button>
            <Button
              onClick={() => openModal("deployer")}
              variant="secondary"
              size="default"
              className="shadow-lg backdrop-blur-sm whitespace-nowrap min-w-[140px]"
              aria-label="Open deployer signup"
            >
              I Want to Deploy
            </Button>
          </div>
          
          {/* Main Toggle Button */}
          <Button
            onClick={toggleExpanded}
            size="icon"
            className={`w-14 h-14 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
              expanded ? 'rotate-45' : 'rotate-0'
            }`}
            aria-label={expanded ? "Close action menu" : "Open action menu"}
            aria-expanded={expanded}
          >
            {expanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </Button>
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