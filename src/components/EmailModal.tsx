
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "creator" | "deployer" | null;
}

export default function EmailModal({ isOpen, onClose, userType }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you for joining!",
        description: "We'll be in touch soon.",
      });
      onClose();
      setEmail("");
    }, 1000);
  };
  
  const getTitle = () => {
    if (userType === "creator") return "Join the Creator Waitlist";
    if (userType === "deployer") return "Get Early Deployer Access";
    return "Join the Waitlist";
  };
  
  const getButtonColor = () => {
    if (userType === "creator") return "bg-creator hover:bg-creator-hover";
    if (userType === "deployer") return "bg-deployer hover:bg-deployer-hover";
    return "bg-primary hover:bg-primary/90";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-black border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{getTitle()}</h2>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Work email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          
          <Button
            type="submit"
            className={`w-full ${getButtonColor()} text-white font-semibold`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Join Now"}
          </Button>
        </form>
        
        <p className="text-xs text-gray-400 text-center mt-4">
          We value your privacy. No spam, just updates.
        </p>
      </DialogContent>
    </Dialog>
  );
}
