import dbConnect from "@/libs/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/models/Comment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);

  if (method === "POST") {
    try {
      const data = await Comment.create(body);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  }

  if (method === "GET" && !req.query.isDetail) {
    try {
      const { page = 1, pageSize, sort, ...rest } = req.query;
      let filter: any = {};
      Object.entries(rest)?.map(([key, value]) => {
        if (!!value) {
          filter[key] = new RegExp(value as any, "i");
        }
      });
      const postList = await Comment.find(filter as any)
        .sort({ id: -1 })
        .limit(Number(pageSize) * 1)
        .skip((Number(page) - 1) * Number(pageSize))
        .exec();

      const total = Object.keys(filter).length
        ? postList?.length
        : await Comment.count();
      res.status(200).json({ data: postList, total });
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  }
  if (method === "GET" && req.query.isDetail) {
    try {
      const data = await Comment.findById(req.query.id);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  }
  if (method === "DELETE") {
    try {
      const { id } = req.body;
      const post = await Comment.findById(id);
      if (!post) {
        res.status(400).json("Post not found!");
      }
      await Comment.findByIdAndDelete(id);
      res.status(200).json("Delete succeed!");
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
  if (method === "PUT") {
    try {
      const { id } = req.body;
      const post = await Comment.findById(id);

      if (!post) {
        res.status(400).json("Post not found!");
      }

      const updatedPost = await Comment.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
};

export default handler;
