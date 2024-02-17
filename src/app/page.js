//Solution to redirect from user Nico : https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page
import { redirect } from 'next/navigation';

export default async function Home({ params }) {
  redirect('/dashboard');
}
