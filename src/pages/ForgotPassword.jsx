// @ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://app.expovix.com/reset-password"
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout icon={Mail} title="Reset password" subtitle="We'll send you a link to reset it"
      footer={
        <Link to="/login" className="text-primary font-medium hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3 h-3 inline mr-1" />Back to log in
        </Link>
      }>
      {sent ? (
        <p className="text-sm text-center text-gray-500">If an account exists with that email, you'll receive a password reset link shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}