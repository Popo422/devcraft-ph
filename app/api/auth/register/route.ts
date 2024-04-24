import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/db/drizzle/db';
import { user } from '@/db/drizzle/schema/user';

import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();
    // validate email and password
    const hashedPassword = await hash(password, 10);
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (existingUser[0]) {
      throw new Error('User with this email or employee ID already exists.');
    }
    const resp = await db.insert(user).values({
      firstName,
      lastName, // Set to null if lastName is undefined
      email,
      password: hashedPassword,
    });
    console.log(resp)
    return NextResponse.json({ email, password });
  } catch (e) {
    console.log({ e });
  }
}
