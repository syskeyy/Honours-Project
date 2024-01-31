import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { connectToMongo } from '../../../lib/utils';
import { User } from '../../../lib/models';

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
      ],
      callbacks: {
        async session({session}) {
          return session
        },
        async signIn({profile}){
          console.log(profile);
          try {
            await connectToMongo();
            const userExists = await User.findOne({email: profile.email});

            if (!userExists) {
              const newUser = await User.create({
                name: profile.name,
                email: profile.email,
                image: profile.picture
              });
            }
            return true

          }
          catch(error){
            console.log(error);
            return false
          }
        },
      },

});

export { handler as GET, handler as POST };