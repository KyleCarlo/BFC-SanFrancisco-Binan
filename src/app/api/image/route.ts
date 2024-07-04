import { NextRequest, NextResponse } from "next/server";
import minioClient from "@/src/lib/minio";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const image = data.get("image") as File;
  const bucket = data.get("bucket") as string;
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const exists = await minioClient.bucketExists(bucket);
    if (!exists) {
      await minioClient.makeBucket(bucket, "us-east-1");
      console.log("Bucket " + bucket + ' created in "us-east-1".');
    }
    minioClient.putObject(bucket, image.name, buffer);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const bucket = req.nextUrl.searchParams.get("bucket") as string;
  const filename = req.nextUrl.searchParams.get("filename") as string;

  try {
    const presignedUrl = await minioClient.presignedGetObject(
      bucket,
      filename,
      24 * 60 * 60
    );
    console.log(presignedUrl);
    return NextResponse.json({ presignedUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching images" },
      { status: 500 }
    );
  }
}
