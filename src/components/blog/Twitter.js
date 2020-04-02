import React from "react"
import { TwitterTweetEmbed } from "react-twitter-embed"

const Twitter = ({ tweetId }) => {
  return <TwitterTweetEmbed tweetId={tweetId} />
}

export default Twitter
