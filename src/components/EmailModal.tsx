
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "creator" | "deployer" | null;
}

export default function EmailModal({ isOpen, onClose, userType }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Store the email and user type directly in a 'waitlist' table
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email,
            user_type: userType,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error("Error storing contact:", error);
        throw new Error("Failed to submit. Please try again.");
      }
      
      toast({
        title: "Thank you for joining!",
        description: "We'll be in touch soon.",
      });
      
      onClose();
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <DialogTitle className="text-xl font-bold text-white">{getTitle()}</DialogTitle>
        
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
