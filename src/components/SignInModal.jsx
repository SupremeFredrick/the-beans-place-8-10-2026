import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function SignInModal({ open, onClose }) {
  const { signIn, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setFeedback("");
    const res = await signIn(username, password);
    if (res.ok) {
      setFeedback("Signed in");
      onClose();
    } else {
      setFeedback(res.message || "Sign-in failed");
    }
  };

  return (
    <div className="fixed inset-0 z-60 grid place-items-center bg-black/50">
      <div className="bg-[var(--brown-900)] text-[var(--cream)] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Sign In</h3>
          <button onClick={onClose} className="text-[var(--cream)]/80">✕</button>
        </div>

        <form className="mt-4 flex flex-col gap-3" onSubmit={submit}>
          <Input id="signin-username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input id="signin-password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <Button type="submit" className="flex-1">Sign In</Button>
            <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          </div>
          {feedback && <p className="text-sm text-amber-400 mt-2">{feedback}</p>}
        </form>
      </div>
    </div>
  );
}
