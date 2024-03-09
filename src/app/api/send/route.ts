import { NextResponse} from 'next/server';
import { Resend } from 'resend';
import {fetchEmail} from "../../lib/data"

// Used guide from https://youtu.be/UqQxfpTQBaE
// Connecting to Resend API

  // Fetching user data and mapping it to emailData which will be used to send the email along with the email template I have below, I tried using react email template but didnt work, ended up just using plain html
  // I'm using typescript instead of jsx because the online solutions and official documentations show how its done through typescript.
const resend = new Resend(process.env.RESEND_API_KEY);

export function GET(): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await fetchEmail();

      const emailData = users.map(user => ({
        from: 'ChainSafe <noreply@chainsafe.pro>',
        to: [user.email],
        subject: `Your Weekly Recap, ${user.name}`,
        html: `
        <div style="font-family: 'Poppins'; padding: 20px; background-color: #ffffff;">
          <h2 style="color: #02a141;">Hello, ${user.name}!</h2>
          <p>Heres you weekly stat recap!</p>
          <p>As you continue to service your bicycle components you will earn experiance points</p>
          <h2 style="color: #02a141;">Your Stats:</h2>
          <p>Your current level: ${Math.floor(user.xp / 100).toString()[0]}</p>
          <p>Your current XP: ${user.xp}</p>
          <p>Best, The ChainSafe Team</p>
        </div>
        `,
      }));

      const data = await resend.batch.send(emailData);

      resolve(NextResponse.json('Success'));
    } catch (error) {
      reject(NextResponse.json({ 'error': error.message }));
    }
  });
}