import { toast } from "sonner";
import { securityQuestions } from "../lib/utils";
import { Dispatch, SetStateAction } from "react";

export async function checkUserIfExists(
  email: string,
  setQuestion: Dispatch<SetStateAction<string | null>>
) {
  const response = await fetch(`/api/customer/forget-pass?email=${email}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const { message } = await response.json();
    return toast.error(message);
  }

  const { user, securityQuestion } = await response.json();
  if (!user) {
    return toast.error("User not found.");
  }

  if (securityQuestion === undefined) {
    return toast.error("Security question not found.");
  }

  setQuestion(securityQuestions[securityQuestion]);
  return { user, securityQuestion };
}

export async function checkUserSecurityAnswer(
  email: string,
  answer: string,
  setIsSuccess: Dispatch<SetStateAction<boolean>>
) {
  const response = await fetch("/api/customer/forget-pass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, answer }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    return toast.error(message);
  }

  setIsSuccess(true);
}
