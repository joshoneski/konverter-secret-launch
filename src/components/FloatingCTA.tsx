import { useState } from "react";
import { Rocket, ChevronUp } from "lucide-react";
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
              : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}>
            <Button
              onClick={() => openModal("creator")}
              variant="default"
              size="default"
              className="shadow-xl backdrop-blur-sm whitespace-nowrap min-w-[140px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              aria-label="Open creator signup"
            >
              I Want to Create
            </Button>
            <Button
              onClick={() => openModal("deployer")}
              variant="secondary"
              size="default"
              className="shadow-xl backdrop-blur-sm whitespace-nowrap min-w-[140px]"
              aria-label="Open deployer signup"
            >
              I Want to Deploy
            </Button>
          </div>
          
          {/* Main Toggle Button */}
          <Button
            onClick={toggleExpanded}
            className={`w-16 h-16 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-500 bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 hover:scale-105 border-2 border-primary/20 ${
              expanded ? 'rotate-180' : 'rotate-0'
            }`}
            aria-label={expanded ? "Close action menu" : "Open action menu"}
            aria-expanded={expanded}
          >
            {expanded ? (
              <ChevronUp className="w-7 h-7" />
            ) : (
              <span className="text-sm font-semibold">Get Started</span>
            )}
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