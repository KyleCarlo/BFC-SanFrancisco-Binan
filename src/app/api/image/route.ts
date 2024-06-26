import { NextRequest, NextResponse } from "next/server";
import minioClient from "@/src/lib/minio";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const image = data.get("image") as File;
  const bucket = data.get("bucket") as string;
  const buffer = Buffer.from(await image.arrayBuffer());
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, "us-east-1");
    console.log("Bucket " + bucket + ' created in "us-east-1".');
  }
  minioClient.putObject(bucket, image.name, buffer);
  return NextResponse.json({ success: true }, { status: 200 });
}
