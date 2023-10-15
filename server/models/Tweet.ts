import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface TweetDocument extends Document {
  userId: string;
  content: {
    text: string;
    images?: Array<{ url: string; alt: string }>;
    gifs?: Array<{ url: string; alt: string }>;
    videos?: Array<{ url: string; description: string }>;
    polls?: Array<{
      url: string;
      options: Array<{ text: string; voteCount: number }>;
    }>;
  };
}

const tweetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    content: {
      text: {
        type: String,
        maxlength: 280, // Twitter's max character count, adjust as needed
      },
      images: [
        {
          url: String,
          alt: String, // Optional alt text for the image
        },
      ],
      gifs: [
        {
          url: String,
          alt: String, // Optional alt text for the gif
        },
      ],
      videos: [
        {
          url: String,
          description: String, // Optional description or caption
        },
      ],
      // For the polls and emojis, you can add placeholders for now
      polls: [
        {
          question: String,
          options: [
            {
              text: String,
              voteCount: { type: Number, default: 0 },
            },
          ],
          endTime: Date,
        },
      ],
    },
  },
  { timestamps: true }
);

const Tweet = mongoose.model<TweetDocument>("Tweet", tweetSchema);
export default Tweet;
