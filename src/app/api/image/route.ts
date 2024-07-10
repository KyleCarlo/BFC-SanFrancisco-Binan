import { NextRequest, NextResponse } from "next/server";
import minioClient from "@lib/minio";

export async function GET(req: NextRequest) {
  const bucket = req.nextUrl.searchParams.get("bucket") as string;
  const filename = req.nextUrl.searchParams.get("filename") as string;

  try {
    const presignedUrl = await minioClient.presignedGetObject(
      bucket,
      filename,
      24 * 60 * 60
    );

    return NextResponse.json({ presignedUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching image URLs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const image = data.get("image") as File;
  const bucket = data.get("bucket") as string;

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const bucketExists = await minioClient.bucketExists(bucket);

    if (!bucketExists) {
      await minioClient.makeBucket(bucket, "us-east-1");
      console.log("Bucket " + bucket + ' created in "us-east-1".');
    }

    await minioClient.putObject(bucket, image.name, buffer);
    const imageURL = await minioClient.presignedGetObject(
      bucket,
      image.name,
      24 * 60 * 60
    );

    return NextResponse.json(
      { imageURL, message: "Successful Image Upload." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.formData();
  const image = data.get("image") as File;
  const bucket = data.get("bucket") as string;
  const oldImage = data.get("oldName") as string;

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const bucketExists = await minioClient.bucketExists(bucket);

    if (!bucketExists) {
      await minioClient.makeBucket(bucket, "us-east-1");
      console.log("Bucket " + bucket + ' created in "us-east-1".');
    }

    await minioClient.removeObject(bucket, oldImage);

    await minioClient.putObject(bucket, image.name, buffer);
    const imageURL = await minioClient.presignedGetObject(
      bucket,
      image.name,
      24 * 60 * 60
    );

    return NextResponse.json(
      { imageURL, message: "Successful Image Update." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating image" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const bucket = req.nextUrl.searchParams.get("bucket") as string;
  const filename = req.nextUrl.searchParams.get("filename") as string;

  try {
    await minioClient.removeObject(bucket, filename);
    return NextResponse.json({ message: "Image Deleted." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Deleting Image" },
      { status: 500 }
    );
  }
}
