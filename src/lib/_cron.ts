import db from "@lib/db";

export async function deleteOTP(email: string) {
  setTimeout(async () => {
    try {
      db.deleteFrom("OTP").where("email", "=", email).execute();
      console.log(`OTP of ${email} Deleted.`);
    } catch {
      console.log("Unknown Error Occured in deleteOTP cron job.");
    }
  }, parseInt(process.env.OTP_EXPIRY as string));
}
