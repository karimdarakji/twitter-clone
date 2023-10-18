import tweets from "../models/tweets.js";
import User from "../models/User.js";
import tweetlikes from "../models/tweetlikes.js";
import tweetComments from "../models/tweetComments.js";

import mongoose from "mongoose";

export const createTweet = async (req, res) => {
  const data = req.body;
  const tweet = new tweets(data);

  try {
    await User.findOne(
      {
        _id: { $in: [mongoose.Types.ObjectId(data.user_id)] },
      },
      function (error, user) {
        if (user) {
          tweet.save();
          res.status(200).send("tweet sent");
        } else res.send({ message: "user not found" });
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllTweets = async (req, res) => {
  const { user_id } = req.body;

  try {
    /* const alltweets = await tweets.find({ userid }).populate('username') */

    const alltweets = await tweets.aggregate([
      {
        $lookup: {
          from: "usermessages", //must be collection name for posts
          let: { userid: "$user_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userid"] } } },
            { $project: { username: 1, name: 1 } },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      {
        $lookup: {
          from: "tweetlikes", //must be collection name for posts
          let: { tweetid: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user_id", mongoose.Types.ObjectId(user_id)] },
                    { $eq: ["$tweet_id", "$$tweetid"] },
                  ],
                },
              },
              /* {
                            tweet_id: "$$tweetid" , user_id: mongoose.Types.ObjectId(user_id)
                         } */
            },
          ],
          as: "is_liked",
        },
      },

      {
        $lookup: {
          from: "tweetlikes", //must be collection name for posts
          let: { tweetid: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$tweet_id", "$$tweetid"] }],
                },
              },
            },
          ],
          as: "likes",
        },
      },

      {
        $lookup: {
          from: "tweetcomments", //must be collection name for posts
          let: { tweetid: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$tweet_id", "$$tweetid"] }],
                },
              },
            },
          ],
          as: "comments",
        },
      },

      {
        $addFields: {
          is_liked: {
            $cond: {
              if: { $anyElementTrue: ["$is_liked"] },
              then: true,
              else: false,
            },
          },
          likes: { $size: "$likes" },
          comments: { $size: "$comments" },
        },
      },
    ]);

    if (alltweets) res.status(200).send(alltweets);
    else res.status(200).send({ message: "no tweets" });
  } catch (error) {
    console.log(error);
  }
};

export const getTweet = async (req, res) => {
  const { tweet_id } = req.body;

  const logged_user_id = req.user._id;

  try {
    const tweet = await tweets.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(tweet_id) } },
      {
        $lookup: {
          from: "usermessages", //must be collection name for posts
          let: { userid: "$user_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userid"] } } },
            { $project: { username: 1, name: 1 } },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      {
        $lookup: {
          from: "tweetlikes", //must be collection name for posts
          let: {
            tweetid: mongoose.Types.ObjectId(tweet_id),
            userid: mongoose.Types.ObjectId(logged_user_id),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user_id", "$$userid"] },
                    { $eq: ["$tweet_id", "$$tweetid"] },
                  ],
                },
              },
            },
          ],
          as: "is_liked",
        },
      },

      {
        $lookup: {
          from: "tweetlikes", //must be collection name for posts
          let: { tweetid: mongoose.Types.ObjectId(tweet_id) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$tweet_id", "$$tweetid"] }],
                },
              },
            },
          ],
          as: "likes",
        },
      },

      {
        $lookup: {
          from: "tweetcomments", //must be collection name for posts
          let: { tweetid: mongoose.Types.ObjectId(tweet_id) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$tweet_id", "$$tweetid"] }],
                },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "tweetcomments", //must be collection name for posts
          let: { tweetid: mongoose.Types.ObjectId(tweet_id) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$tweet_id", "$$tweetid"] }],
                },
              },
            },
            {
              $lookup: {
                from: "usermessages",
                let: { userid: "$user_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userid"] } } },
                  { $project: { _id: 1, picture: 1, username: 1, name: 1 } },
                ],
                as: "user",
              },
            },
            { $unwind: "$user" },
            { $project: { user_id: 0 } },
            { $sort: { createdAt: -1 } },
          ],
          as: "allcomments",
        },
      },

      {
        $addFields: {
          is_liked: {
            $cond: {
              if: { $anyElementTrue: ["$is_liked"] },
              then: true,
              else: false,
            },
          },
          likes: { $size: "$likes" },
          comments: { $size: "$comments" },
        },
      },
    ]);

    if (tweet) res.status(200).send(tweet);
    else res.status(200).send({ message: "no tweets" });
  } catch (error) {
    console.log(error);
  }
};

export const likeTweet = async (req, res) => {
  const { tweet_id, user_id } = req.body;

  try {
    await tweetlikes.findOne(
      {
        user_id: { $in: [mongoose.Types.ObjectId(user_id)] },
        tweet_id: { $in: [mongoose.Types.ObjectId(tweet_id)] },
      },
      function (error, liked) {
        if (liked) {
          liked.remove();
          res.status(200).send("like removed");
        } else {
          const liketweet = new tweetlikes({ tweet_id, user_id });
          liketweet.save();
          res.status(200).send("like success");
        }
      }
    );
  } catch (error) {}
};

export const commentTweet = async (req, res) => {
  const { tweet_id, user_id, comment } = req.body;

  try {
    const commenttweet = new tweetComments({ tweet_id, user_id, comment });
    await commenttweet
      .save()
      .then(() => {
        res.status(200).send("comment success");
      })
      .catch(err => res.status(200).send({ message: err }));
  } catch (error) {
    res.status(200).send({ message: error });
  }
};
