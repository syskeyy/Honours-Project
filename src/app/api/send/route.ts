import { NextResponse} from 'next/server';
import { Resend } from 'resend';
import {fetchEmail} from "../../lib/data"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

  try {
    const users = await fetchEmail(); 

    const emailData = users.map(user => ({
      from: 'Acme <noreply@chainsafe.pro>',
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

    return NextResponse.json('Success');
  } catch (error) {
    return NextResponse.json({ 'error': error.message });
  }
}