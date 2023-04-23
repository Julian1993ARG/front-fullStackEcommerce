import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'next-ecommerce-julian';
const accessKeyId = process.env.S3_ACCESS_KEY || '';
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || '';

export default async function handle (req:NextApiRequest, res:NextApiResponse) {
  const form = new multiparty.Form();
  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFileName = `${Date.now()}.${ext}`;
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
      ContentType: mime.lookup(file.path) as string
    }));
    const link = `https://${bucketName}.amazonaws.com/${newFileName}`;
    links.push(link);
  }
  res.json({ links });
}

export const config = {
  api: {
    bodyParser: false
  }
};
