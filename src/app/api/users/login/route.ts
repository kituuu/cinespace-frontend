import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqDataBody = await request.json();
    // destructuring
    const { email, password } = reqDataBody;
    console.log(reqDataBody);
    // checking if user already exists
    const findResult = await User.findOne({ email });
    if (!findResult) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 404 }
      );
    } else {
      // checking if password is correct
      const passwordMatch = await bcryptjs.compare(
        password,
        findResult.password
      );
      if (!passwordMatch) {
        return NextResponse.json({
          error: "Password is incorrect",
        },{
            status: 401
        });
      } else {
        // after login we need to send a token to the user which will be saved in the user cookies (not local storage)
        // creating tokendata
        const tokenData = {
          id: findResult._id,
          username: findResult.username,
          email: findResult.email,
        };
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        // token is created but is not sent to cookies
        const response = NextResponse.json(
          {
            message: "User logged in successfully",
            success: true,
          },
          { status: 200 }
        );
        // nextresponse can access cookies
        response.cookies.set("token", token, {
          httpOnly: true,
        });
        return response;
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
